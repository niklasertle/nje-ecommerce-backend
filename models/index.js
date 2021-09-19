// Import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Set up database relationships
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

Product.belongsToMany(Tag, {
  through: {
    model: "product_tag",
    unique: false,
  },
  as: "product_id",
});

Tag.belongsToMany(Product, {
  through: {
    model: "product_tag",
    unique: false,
  },
  as: "tag_id",
})

// Export to be used else where in the app
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
