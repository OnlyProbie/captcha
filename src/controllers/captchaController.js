const captchaService = require('../services/captchaService');

class CaptchaController {
  async generate(ctx) {
    // const { userId } = ctx.request.body;
    const userId = ctx.request.url.split('?')[1].split('=')[1];
    console.log(ctx, userId);
    
    if (!userId) {
      ctx.status = 400;
      ctx.body = { error: '缺少 userId 参数' };
      return;
    }

    const code = await captchaService.createCaptcha(userId);
    ctx.body = {
      success: true,
      data: { ...code }
    };
  }

  async verify(ctx) {
    // const { userId, code } = ctx.request.body;

    const paramsArr = ctx.request.url.split('?')[1].split('&')
    const params = {}
    paramsArr.forEach(item => { 
      params[item.split('=')[0]] = item.split('=')[1]
    })

    // if (!userId || !code) {
    //   ctx.status = 400;
    //   ctx.body = { error: '缺少必要参数' };
    //   return;
    // }

    const isValid = await captchaService.verifyCaptcha(params.userId, params.code);
    ctx.body = {
      success: true,
      data: { isValid }
    };
  }
}

module.exports = new CaptchaController();