const router = require('express').Router();
const userRoutes = require('../api/userRoutes');
const postRoutes= require('../api/postRoutespostRoutes');
const commentRoutes = require('../api/commentRoutescommentRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;