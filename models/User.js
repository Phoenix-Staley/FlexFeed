const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
