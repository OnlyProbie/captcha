const sequelize = require('../models/index');
const Captcha = require('../models/captcha');
const logger = require('../services/loggerService');

async function initDatabase() {
  try {
    // 同步所有模型到数据库
    await sequelize.sync({ force: true });
    logger.info('数据库表创建成功');
  } catch (error) {
    logger.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

initDatabase();