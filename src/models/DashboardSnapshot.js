const mongoose = require('mongoose');

const statCardSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String, required: true },
    gradient: { type: String, required: true }
  },
  { _id: false }
);

const weeklyPointSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    sales: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    color: { type: String, default: '#6374f6' }
  },
  { _id: false }
);

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    total: { type: Number, default: 0 },
    color: { type: String, default: '#6374f6' }
  },
  { _id: false }
);

const recentSaleSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true },
    customer: { type: String, required: true },
    status: { type: String, default: 'Completed' },
    grandTotal: { type: String, required: true },
    paid: { type: String, required: true },
    due: { type: String, required: true },
    paymentStatus: { type: String, default: 'Paid' }
  },
  { _id: false }
);

const stockAlertSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    product: { type: String, required: true },
    warehouse: { type: String, required: true },
    quantity: { type: String, required: true },
    quantityUnit: { type: String, required: true },
    alertQuantity: { type: String, required: true },
    alertUnit: { type: String, required: true }
  },
  { _id: false }
);

const dashboardSnapshotSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: 'General Store' },
    adminName: { type: String, default: 'Admin POS' },
    rangeLabel: { type: String, default: '2083-01-18-2083-02-17' },
    statCards: [statCardSchema],
    weeklySalesPurchases: [weeklyPointSchema],
    topProductsYear: [productSchema],
    topProductsMonth: [productSchema],
    topCustomersMonth: [customerSchema],
    recentSales: [recentSaleSchema],
    stockAlerts: [stockAlertSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('DashboardSnapshot', dashboardSnapshotSchema);
