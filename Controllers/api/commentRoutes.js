const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      description: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.postId
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


// const router = require('express').Router();
// // const { AsyncQueueError } = require('sequelize/types');
// const {Blog} = require('../../models');
// const withAuth = require('../../utils/auth')

// // The `/api/categories` endpoint

// router.get('/', withAuth, async (req, res) => {
//   // find all categories
//   try {
//     const createBlog = await Blog.create({
//     });
//     res.status(200).json(createBlog);
//   } catch (err) {
//     res.status(500).json(err);
//   }

// });

// router.get('/:id', async (req, res) => {
//   // find one category by its `id` value
//   // be sure to include its associated Products
//   try {
//     const categoryData = await Category.findByPk(req.params.id, {
//       include: [{ model: Product }]
//     });
//     if (!categoryData) {
//       res.status(404).json({ message: "There are no catergories that match this ID." });
//     }
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }

// });

// // router.post('/', async (req, res) => {
//   // create a new category
// //   try {
// //     const newCategory = await Category.create(req.body);
// //     res.status(200).json(newCategory);
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// router.post('/', (req, res) => {
//   Category.create(req.body)
//     .then(category => res.status(200).json(category))
//     .catch(err => res.status(400).json(err))
// });

// router.put('/:id', async (req, res) => {
//   // update a category by its `id` value
//   Category.update(req.body, {
//        where: {
//          id: req.params.id // get the id from the request
//        },
//      })
//     .then(category => res.status(200).json(category))
//     .catch(err => res.status(400).json(err))
// });

// router.delete('/:id', async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const categoryData = await Category.destroy({
//       where: {
//         id: req.params.id
//       }
//     });
//        
//     if (!categoryData) {
//       res.status(404).json({ message: 'Category ID not found-nothing deleted.' });
//       return;
//     }

//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }

// });

// module.exports = router;
