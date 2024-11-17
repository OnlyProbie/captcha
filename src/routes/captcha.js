const Router = require('koa-router');
const captchaController = require('../controllers/captchaController');

const router = new Router({ prefix: '/api/captcha' });

router.post('/generate', captchaController.generate);
router.post('/verify', captchaController.verify);

module.exports = router;