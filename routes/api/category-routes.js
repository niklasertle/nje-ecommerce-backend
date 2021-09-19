const router = require("express").Router();
const { Category, Product } = require("../../models");

// Gets alll categories
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No data found" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets a single category by ID
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No data found" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    if (!categoryData) {
      res.status(404).json({ message: "Category creation failed" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a category
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!categoryData) {
      res.status(404).json({ message: "Category update failed" });
      return;
    }
    res.status(200).json({ message: "Category update successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
