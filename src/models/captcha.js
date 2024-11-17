const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Captcha = sequelize.define('Captcha', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'user_id'
  },
  code: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_used'
  },
  expireAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expire_at'
  }
}, {
  tableName: 'captchas',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Captcha;