const defaultDashboard = {
  storeName: process.env.STORE_NAME || 'General Store',
  adminName: process.env.ADMIN_NAME || 'Admin POS',
  rangeLabel: '2083-01-18-2083-02-17',
  statCards: [
    { label: 'Sales', value: '$ 27.9K', icon: 'shopping-cart', gradient: 'gradient-teal-blue', href: '/sales' },
    { label: 'Purchases', value: '$ 4.9K', icon: 'shopping-cart-plus', gradient: 'gradient-purple', href: '/purchases' },
    { label: 'Sales Returns', value: '$ 649,7', icon: 'arrow-right', gradient: 'gradient-coral', href: '/sales-returns' },
    { label: 'Purchases Returns', value: '$ 250,0', icon: 'arrow-left', gradient: 'gradient-violet-cyan', href: '/purchase-returns' },
    { label: 'Today Total Sales', value: '$ 0,0', icon: 'dollar-sign', gradient: 'gradient-pink-gold', href: '/sales' },
    { label: 'Today Total Received(Sales)', value: '$ 1.8K', icon: 'banknote', gradient: 'gradient-cyan-green' },
    { label: 'Today Total Purchases', value: '$ 0,0', icon: 'shopping-cart-plus', gradient: 'gradient-plum-red', href: '/purchases' },
    { label: 'Today Total Expense', value: '$ 0,0', icon: 'minus-square', gradient: 'gradient-blue-magenta', href: '/expenses' }
  ],
  weeklySalesPurchases: [
    { date: '2083-01-19', sales: 2600, purchases: 0 },
    { date: '2083-01-20', sales: 8200, purchases: 0 },
    { date: '2083-01-21', sales: 2650, purchases: 0 },
    { date: '2083-01-22', sales: 1550, purchases: 0 },
    { date: '2083-01-23', sales: 800, purchases: 420 },
    { date: '2083-01-24', sales: 3000, purchases: 4650 },
    { date: '2083-01-25', sales: 4450, purchases: 0 }
  ],
  topProductsYear: [
    { name: 'Apple', quantity: 180, grandTotal: 9400, color: '#5872cf' },
    { name: 'Banana', quantity: 140, grandTotal: 7600, color: '#8cc970' },
    { name: 'Potato', quantity: 94, grandTotal: 3900, color: '#f9c956' },
    { name: 'Tomato', quantity: 72, grandTotal: 2800, color: '#f45f63' },
    { name: 'Orange', quantity: 40, grandTotal: 1600, color: '#6bc6dc' }
  ],
  topProductsMonth: [
    { name: 'Apple', quantity: 62, grandTotal: 3700, color: '#5872cf' },
    { name: 'Banana', quantity: 49, grandTotal: 2900, color: '#8cc970' },
    { name: 'Potato', quantity: 35, grandTotal: 1800, color: '#f9c956' },
    { name: 'Orange', quantity: 24, grandTotal: 1300, color: '#6bc6dc' },
    { name: 'Tomato', quantity: 21, grandTotal: 950, color: '#f45f63' }
  ],
  topCustomersMonth: [
    { name: 'walk-in-customer', total: 5200, color: '#5872cf' },
    { name: 'John Retail', total: 3100, color: '#8cc970' },
    { name: 'Mary Market', total: 2600, color: '#f9c956' },
    { name: 'Alex Foods', total: 1900, color: '#f45f63' },
    { name: 'City Buyer', total: 1200, color: '#6bc6dc' }
  ],
  recentSales: [
    {
      reference: 'SA_1113643',
      customer: 'walk-in-customer',
      status: 'Completed',
      grandTotal: '$ 1,469,6',
      paid: '$ 1,469,6',
      due: '$ 0,0',
      paymentStatus: 'Paid'
    },
    {
      reference: 'SA_1113642',
      customer: 'walk-in-customer',
      status: 'Completed',
      grandTotal: '$ 282,4',
      paid: '$ 282,4',
      due: '$ 0,0',
      paymentStatus: 'Paid'
    },
    {
      reference: 'SA_1113641',
      customer: 'Meera Nair',
      status: 'Completed',
      grandTotal: '$ 591,1',
      paid: '$ 0,0',
      due: '$ 591,1',
      paymentStatus: 'Unpaid'
    },
    {
      reference: 'SA_1113640',
      customer: 'walk-in-customer',
      status: 'Completed',
      grandTotal: '$ 96,6',
      paid: '$ 96,6',
      due: '$ 0,0',
      paymentStatus: 'Paid'
    },
    {
      reference: 'SA_1113639',
      customer: 'walk-in-customer',
      status: 'Completed',
      grandTotal: '$ 2,858,2',
      paid: '$ 2,858,2',
      due: '$ 0,0',
      paymentStatus: 'Paid'
    }
  ],
  stockAlerts: [
    {
      code: '111',
      product: 'DO5AN',
      warehouse: 'warehouse',
      quantity: '0',
      quantityUnit: 'piece',
      alertQuantity: 'null',
      alertUnit: 'piece'
    },
    {
      code: 'CASE001-RED',
      product: 'Phone Case',
      warehouse: 'General Warehouse',
      quantity: '1',
      quantityUnit: 'piece',
      alertQuantity: '20',
      alertUnit: 'piece'
    },
    {
      code: 'ROFJE0942X',
      product: 'Radish',
      warehouse: 'General Warehouse',
      quantity: '3',
      quantityUnit: 'kilogram',
      alertQuantity: '10',
      alertUnit: 'kilogram'
    },
    {
      code: 'pssx',
      product: 'psso',
      warehouse: 'General Warehouse',
      quantity: '1',
      quantityUnit: 'kilogram',
      alertQuantity: '2',
      alertUnit: 'kilogram'
    },
    {
      code: 'cosmetics',
      product: 'shakeel',
      warehouse: 'warehouse',
      quantity: '0',
      quantityUnit: 'piece',
      alertQuantity: '10',
      alertUnit: 'piece'
    },
    {
      code: 'Y9ITSIED',
      product: 'Guava',
      warehouse: 'General Warehouse',
      quantity: '0',
      quantityUnit: 'kilogram',
      alertQuantity: '10',
      alertUnit: 'kilogram'
    },
    {
      code: 'WADCWOIWD',
      product: 'monagos',
      warehouse: 'General Warehouse',
      quantity: '5',
      quantityUnit: 'piece',
      alertQuantity: '10',
      alertUnit: 'piece'
    },
    {
      code: '34235-GREEN',
      product: 'dfasd',
      warehouse: 'General Warehouse',
      quantity: '2',
      quantityUnit: 'meter',
      alertQuantity: '02345',
      alertUnit: 'meter'
    },
    {
      code: 'WC7LTSRPHE',
      product: 'Zyneb.ma',
      warehouse: 'General Warehouse',
      quantity: '2',
      quantityUnit: 'piece',
      alertQuantity: '2',
      alertUnit: 'piece'
    },
    {
      code: 'WFEKEFH2X9',
      product: 'polo',
      warehouse: 'warehouse',
      quantity: '0',
      quantityUnit: 'piece',
      alertQuantity: '0',
      alertUnit: 'piece'
    }
  ]
};

module.exports = defaultDashboard;
