const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No data found" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No data found" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    if (!tagData) {
      res.status(404).json({ message: "Tag creation failed" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!tagData) {
      res.status(404).json({ message: "Tag update failed" });
      return;
    }
    res.status(200).json({ message: "Tag update successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    await Tag.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
