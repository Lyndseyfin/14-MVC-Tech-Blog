const router = require('express').Router();
// const { Association } = require('sequelize/types');
const { Tag, Product, ProductTag, Category } = require('../../models');
const { associations } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // JOIN with category
      include: [{ model: Product}, {model: Category}],
    });

    if (!tagData) { 
      res.status(404).json({ message: 'No products found with that ID.' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag= await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {
        category_name: req.body.tag_name,
      },
      {
        returning: true,
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tagData) {
      res.status(404).json({ message: "No tag ID found- tag not updated."});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tags found with this ID.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }

});

module.exports = router;
