const captchaService = require('../services/captchaService');

class CaptchaController {
  async generate(ctx) {
    const { userId } = ctx.request.body;
    // const userId = ctx.request.url.split('?')[1].split('=')[1];
    // console.log(ctx, userId);
    // 合法性校验
    if (!userId) {
      ctx.status = 400;
      ctx.body = { error: '缺少 userId 参数' };
      return;
    }
    // 生成验证码
    const captcha = await captchaService.createCaptcha(userId);
    ctx.set("Content-Type","image/svg+xml");
    ctx.body = captcha.data
  }

  async verify(ctx) {
    const { userId, code } = ctx.request.body;

    // const paramsArr = ctx.request.url.split('?')[1].split('&')
    // const params = {}
    // paramsArr.forEach(item => { 
    //   params[item.split('=')[0]] = item.split('=')[1]
    // })
    // 合法性校验
    if (!userId || !code) {
      ctx.status = 400;
      ctx.body = { error: '缺少必要参数' };
      return;
    }
    // 验证
    // const isValid = await captchaService.verifyCaptcha(params.userId, params.code);
    const isValid = await captchaService.verifyCaptcha(userId, code);
    ctx.body = {
      success: true,
      data: { isValid }
    };
  }
}

module.exports = new CaptchaController();