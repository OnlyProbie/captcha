const logger = require('../services/loggerService');
module.exports = async (ctx, next) => {
    const start = Date.now();
    const requestId = Math.random().toString(36).substring(7);
    // 记录请求信息
    logger.info(`[${ requestId }] 收到请求: ${ ctx.method } ${ ctx.url }`, {
        headers: ctx.headers,
        body: ctx.request.body,
        ip: ctx.ip
    });
    try {
        await next();
        // 记录响应信息
        const ms = Date.now() - start;
        logger.info(`[${ requestId }] 请求完成: ${ ctx.method } ${ ctx.url } ${ ctx.status } - ${ ms }ms`, {
            responseBody: ctx.body
        });
    } catch (error) {
        // 记录错误信息
        const ms = Date.now() - start;
        logger.error(`[${ requestId }] 请求错误: ${ ctx.method } ${ ctx.url } ${ error.status || 500 } - ${ ms }ms`, {
            error: error.message,
            stack: error.stack
        });
        throw error;
    }
};