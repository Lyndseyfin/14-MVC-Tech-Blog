const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/categories', apiRoutes);
router.use('/products', homeRoutes);

module.exports = router;
