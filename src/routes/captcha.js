const Router = require('koa-router');
const captchaController = require('../controllers/captchaController');

const router = new Router({ prefix: '/api/captcha' });

router.get('/generate', captchaController.generate);
router.get('/verify', captchaController.verify);

module.exports = router;