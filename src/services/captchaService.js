const logger = require('./loggerService');
const Captcha = require('../models/captcha');
const { Op } = require('sequelize');

class CaptchaService {
  constructor() {
    this.validDuration = 5 * 60 * 1000; // 5分钟
  }

  generateCode(length = 6) {
    const chars = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  async createCaptcha(userId) {
    try {
      // 使任何现有的未使用验证码失效
      await Captcha.update(
        { isUsed: true },
        {
          where: {
            userId,
            isUsed: false,
            expireAt: { [Op.gt]: new Date() }
          }
        }
      );

      const code = this.generateCode();
      const expireAt = new Date(Date.now() + this.validDuration);

      const captcha = await Captcha.create({
        userId,
        code,
        expireAt
      });

      logger.info(`生成验证码: userId=${userId}, code=${code}, ${captcha}`);
      return {
        userId,
        code
      };
    } catch (error) {
      logger.error('创建验证码失败:', error);
      throw error;
    }
  }

  async verifyCaptcha(userId, inputCode) {
    try {
      const captcha = await Captcha.findOne({
        where: {
          userId,
          code: inputCode,
          isUsed: false,
          expireAt: { [Op.gt]: new Date() }
        }
      });

      console.log('---- -captcha ', Captcha.findOne)

      if (!captcha) {
        logger.warn(`验证码验证失败: userId=${userId}, inputCode=${inputCode}`);
        return false;
      }

      // 标记验证码为已使用
      await captcha.update({ isUsed: true });
      
      logger.info(`验证码验证成功: userId=${userId}`);
      return true;
    } catch (error) {
      logger.error('验证码验证失败:', error);
      throw error;
    }
  }

  // 清理过期验证码
  async cleanupExpiredCaptchas() {
    try {
      const deleted = await Captcha.destroy({
        where: {
          [Op.or]: [
            { expireAt: { [Op.lt]: new Date() } },
            { isUsed: true }
          ]
        }
      });
      logger.info(`清理了 ${deleted} 个过期验证码`);
    } catch (error) {
      logger.error('清理过期验证码失败:', error);
    }
  }
}

module.exports = new CaptchaService();