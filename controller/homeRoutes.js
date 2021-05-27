const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// app.engine('handlebars', )


// router.get('/', async (req, res) => {
//   // Send the rendered Handlebars.js template back as the response
//   res.render('homepage');
// });      

router.get('/', async (req, res) => {
    try {
      // Get all postss and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
        order: [
            ['date_created', 'DESC'],
        ],
      });
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in,
        userName: req.session.userName,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // GET MY POSTS
  router.get('/myposts', async (req, res) => {
    try {
      // Get all postss and JOIN with user data
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
        order: [
            ['date_created', 'DESC'],
        ],
      });
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in,
        userName: req.session.userName,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      const post = postData.get({ plain: true });
  
      const commentData = await Comment.findAll({
          include: [
          {
            model: User,
            attributes: ['name'],
          },
          ],  
          where: {
              post_id: req.params.id
          },
      });
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      // console.log('>>>>>>>>>>',comments)
      if (req.session.user_id == post.user_id) {
          var showDelete = true;
      };

      res.render('post', {
        ...post,
        comments,
        logged_in: req.session.logged_in,
        userName: req.session.userName,
        showDelete: showDelete,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // EDIT POST
  router.get('/editpost/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      const post = postData.get({ plain: true });
  
      const commentData = await Comment.findAll({
          where: {
              post_id: req.params.id
          }
      });
      const comments = commentData.map((comment) => comment.get({ plain: true }));

      if (req.session.user_id == post.user_id) {
          var showDelete = true;
        //   console.log('req.session.user_id: '+ req.session.user_id + 'post.user_id: '+post.user_id+'???: '+showDelete);
      };

      res.render('editpost', {
        ...post,
        comments,
        logged_in: req.session.logged_in,
        userName: req.session.userName,
        showDelete: showDelete,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



  // Use withAuth middleware to prevent access to route THIS WAS '/profile... but temporarily changed to homepage
  router.get('/homepage', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
      // was 'profile' below... 
      res.render('homepage', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
    //   res.render('homepage');
      return;
    }
    res.render('login');
  });
  
  router.get('/newpost', (req, res) => {
    res.render('newpost', {
        logged_in: req.session.logged_in,
        userName: req.session.userName,
      });

  });
  

module.exports = router;






// const router = require("express").Router();
// const { Post, Comment, User } = require("../models");
// const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//   // retrieving all posts
//   try {
//     const postData = await Post.findAll({
//       include: [{ model: User, attributes: ["email"]},],
      
//     });

//     // Serialize data so the template can read it
//     const posts = postData.map((post) => post.get({ plain: true }));
//     // console.log(posts);

//     // Pass serialized data and logged in flag into template
//     res.render("homepage", {
//       posts,
//       logged_in: req.session.logged_in,
//       userName: req.session.userName,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // login
// router.get("/login", (req, res) => {
//   // If a session exists, redirect the request to the homepage
//   if (req.session.logged_in) {  res.redirect("/");
//     return;
//   }
  
//   console.log("redirecting from login route")
//   // else{
//  res.render("login");
  
// });

// //signup
// router.get("/signup", (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect("/");
//     return;
//   }

//   res.render("signup");
// });

// router.get("/dashboard", withAuth, async (req, res) => {
//   try {
//     // Get all posts and JOIN with user data
//     const postData = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["email"],
//         },
//       ],
//       where: {
//         user_id: req.session.user_id,
//       },
//     });

//     // Serialize data so the template can read it
//     const posts = postData.map((post) => post.get({ plain: true }));
//     console.log(posts);

//     // Pass serialized data and session flag into template
//     res.render("dashboard", {
//       posts,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/newpost", (req, res) => {
//   if (!req.session.logged_in) {
//     res.redirect("/login");
//     return;
//   }

//   res.render("newpost");
// });

// router.get("/updatePost", (req, res) => {
//   if (!req.session.logged_in) {
//     res.redirect("/login");
//     return;
//   }

//   res.render("updatePost");
// });

// //get request for single post
// router.get("/:id", withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//       ],
//     });

//     const post = postData.get({ plain: true });
//     console.log(post);

//     res.render("post", {
//       ...post,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// module.exports = router;
