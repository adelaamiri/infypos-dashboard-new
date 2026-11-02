const mongoose = require('mongoose');

const infyposDataSchema = new mongoose.Schema(
  {
    appKey: { type: String, default: 'infypos-admin-pos', index: true },
    dashboard: { type: Object, default: {} },
    productCatalog: { type: Object, default: {} },
    operations: { type: Object, default: {} }
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model('InfyposData', infyposDataSchema, 'Dashbord');
