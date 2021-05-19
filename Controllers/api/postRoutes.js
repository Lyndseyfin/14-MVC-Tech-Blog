const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
          title: req.body.title,
          description: req.body.description,
          user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
      }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const newPost = await Post.update(
      {
        title: req.body.title,
        description: req.body.description
      },{
        where: {
          id:req.params.id
        }
      }
      );
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
    
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
    
        res.status(200).json(postData);
      } catch (err) {
        res.status(500).json(err);
      }
    });
    
module.exports = router;