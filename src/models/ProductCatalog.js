const mongoose = require('mongoose');

const ProductCatalogSchema = new mongoose.Schema(
  {
    products: { type: Array, default: [] },
    productCategories: { type: Array, default: [] },
    variations: { type: Array, default: [] },
    brands: { type: Array, default: [] },
    units: { type: Array, default: [] },
    baseUnits: { type: Array, default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProductCatalog', ProductCatalogSchema);
