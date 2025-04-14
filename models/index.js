const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

const Post = require('./Post')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Post,
  Comment,
};
