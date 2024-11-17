const { Sequelize } = require('sequelize');
const config = require('../config/database');
const logger = require('../services/loggerService');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
  }
);

// 测试数据库连接
sequelize.authenticate()
  .then(() => {
    logger.info('数据库连接成功');
  })
  .catch(err => {
    logger.error('数据库连接失败:', err);
  });

module.exports = sequelize;