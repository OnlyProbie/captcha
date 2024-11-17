const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const captchaRouter = require('./routes/captcha');
const logger = require('./services/loggerService');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const captchaService = require('./services/captchaService');
require('dotenv').config();

const app = new Koa();
const port = process.env.PORT || 3000;

// 中间件
app.use(bodyParser());
app.use(loggerMiddleware);

// 路由
app.use(captchaRouter.routes());
app.use(captchaRouter.allowedMethods());

// 错误处理
app.on('error', (err, ctx) => {
  logger.error('服务器错误', {
    error: err.message,
    stack: err.stack,
    url: ctx.url,
    method: ctx.method
  });
});

// 定时清理过期验证码（每半小时执行一次）
setInterval(() => {
  captchaService.cleanupExpiredCaptchas();
}, 30 * 60 * 1000);

app.listen(port, () => {
  logger.info(`验证码服务启动在 http://localhost:${port}`);
});