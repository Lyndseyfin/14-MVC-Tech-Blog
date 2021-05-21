const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const commentData = require('./userData.json');
const postData = require('./blogData.json');
const userData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Comment.bulkCreate(commentData, {
    returning: true
  });

  await Post.bulkCreate(postData, {
    returning: true
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  process.exit(0);
};

seedDatabase();
