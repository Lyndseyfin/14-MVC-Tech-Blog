const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
  // retrieving all posts
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["email"]},],
      
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(posts);

    // Pass serialized data and logged in flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
       username: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {  res.redirect("/");
    return;
  }
  
  console.log("redirecting from login route")
  // else{
 res.render('login');
  
});

//signup
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    // Pass serialized data and session flag into template
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render('newpost', {
    logged_in: req.session.logged_in
  })
});

router.get('/updatePost', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('updatePost');
});

//get request for single post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
