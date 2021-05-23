const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const commentData = require('./commentData.json');
const postData = require('./postData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });


  const seedDatabase = async () => {
    await sequelize.sync({
      force: true
    });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const post of postData) {
      await post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    const comments = await Comment.bulkCreate(commentData, {
      individualHooks: true,
      returning: true,
    });
  
    process.exit(0);
  };
}
  
  seedDatabase();
