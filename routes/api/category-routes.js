const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No data found' });
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    if (!categoryData) {
      res.status(404).json({ message: 'Category creation failed' });
      return;
    }
    res.status(200).json(categoryData, { message: 'Category created' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const categoryData = await Category.update(req.body);
    if (!categoryData) {
      res.status(404).json({ message: 'Category update failed' });
      return;
    }
    res.status(200).json(categoryData, { message: 'Category updated' })
  }
});

router.delete('/:id', (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
