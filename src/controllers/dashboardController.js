const DashboardSnapshot = require('../models/DashboardSnapshot');
const ProductCatalog = require('../models/ProductCatalog');
const InfyposData = require('../models/InfyposData');
const defaultDashboard = require('../data/defaultDashboard');
const productsData = require('../data/productsData');
const operationsData = require('../data/operationsData');

function buildDefaultProjectData() {
  return {
    dashboard: defaultDashboard,
    productCatalog: productsData,
    operations: operationsData
  };
}

async function getProjectData() {
  const defaults = buildDefaultProjectData();

  if (InfyposData.db.readyState !== 1) {
    return defaults;
  }

  let document = await InfyposData.findOne({ appKey: 'infypos-admin-pos' }).lean();

  if (!document) {
    document = await InfyposData.create({
      appKey: 'infypos-admin-pos',
      ...defaults
    });
    return document.toObject();
  }

  return {
    dashboard: {
      ...defaultDashboard,
      ...(document.dashboard || {})
    },
    productCatalog: {
      ...productsData,
      ...(document.productCatalog || {})
    },
    operations: {
      ...operationsData,
      ...(document.operations || {})
    }
  };
}

async function getDashboardData() {
  const projectData = await getProjectData();
  return projectData.dashboard;
}

async function getLegacyDashboardData() {
  if (DashboardSnapshot.db.readyState !== 1) {
    return defaultDashboard;
  }

  let snapshot = await DashboardSnapshot.findOne().sort({ updatedAt: -1 }).lean();

  if (!snapshot) {
    snapshot = await DashboardSnapshot.create(defaultDashboard);
    return snapshot.toObject();
  }

  return {
    ...defaultDashboard,
    ...snapshot,
    statCards: snapshot.statCards?.length ? snapshot.statCards : defaultDashboard.statCards,
    weeklySalesPurchases: snapshot.weeklySalesPurchases?.length
      ? snapshot.weeklySalesPurchases
      : defaultDashboard.weeklySalesPurchases,
    topProductsYear: snapshot.topProductsYear?.length
      ? snapshot.topProductsYear
      : defaultDashboard.topProductsYear,
    topProductsMonth: snapshot.topProductsMonth?.length
      ? snapshot.topProductsMonth
      : defaultDashboard.topProductsMonth,
    topCustomersMonth: snapshot.topCustomersMonth?.length
      ? snapshot.topCustomersMonth
      : defaultDashboard.topCustomersMonth,
    recentSales: snapshot.recentSales?.length ? snapshot.recentSales : defaultDashboard.recentSales,
    stockAlerts: snapshot.stockAlerts?.length ? snapshot.stockAlerts : defaultDashboard.stockAlerts
  };
}

exports.index = async (req, res, next) => {
  try {
    const dashboard = await getDashboardData();

    res.render('pages/dashboard', {
      title: 'Dashboard',
      dashboard,
      chartData: JSON.stringify({
        weeklySalesPurchases: dashboard.weeklySalesPurchases,
        topProductsYear: dashboard.topProductsYear,
        topCustomersMonth: dashboard.topCustomersMonth
      })
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const dashboard = await getDashboardData();

    res.render('pages/profile', {
      title: 'Profile Details',
      activePageTitle: 'Profile Details',
      dashboard
    });
  } catch (error) {
    next(error);
  }
};

exports.login = (req, res) => {
  res.render('pages/login', {
    title: 'Sign In'
  });
};

async function renderOperationPage(res, pageConfig) {
  const projectData = await getProjectData();
  const dashboard = projectData.dashboard;
  const operations = projectData.operations;
  const data = typeof pageConfig.data === 'function' ? pageConfig.data(operations) : pageConfig.data;

  res.render(`pages/${pageConfig.view}`, {
    title: pageConfig.title,
    activePageTitle: pageConfig.title,
    activeSection: pageConfig.activeSection || pageConfig.title,
    activeExpenseSub: pageConfig.activeExpenseSub,
    activePurchaseSub: pageConfig.activePurchaseSub,
    activeSalesSub: pageConfig.activeSalesSub,
    activePeopleSub: pageConfig.activePeopleSub,
    activeTemplateSub: pageConfig.activeTemplateSub,
    topbarTabs: pageConfig.topbarTabs,
    dashboard,
    ...data
  });
}

async function getProductCatalogData() {
  const projectData = await getProjectData();
  return projectData.productCatalog;
}

async function getLegacyProductCatalogData() {
  if (ProductCatalog.db.readyState !== 1) {
    return productsData;
  }

  let catalog = await ProductCatalog.findOne().sort({ updatedAt: -1 }).lean();

  if (!catalog) {
    catalog = await ProductCatalog.create(productsData);
    return catalog.toObject();
  }

  return {
    ...productsData,
    ...catalog,
    products: catalog.products?.length ? catalog.products : productsData.products,
    productCategories: catalog.productCategories?.length ? catalog.productCategories : productsData.productCategories,
    variations: catalog.variations?.length ? catalog.variations : productsData.variations,
    brands: catalog.brands?.length ? catalog.brands : productsData.brands,
    units: catalog.units?.length ? catalog.units : productsData.units,
    baseUnits: catalog.baseUnits?.length ? catalog.baseUnits : productsData.baseUnits
  };
}

async function renderProductPage(res, pageConfig) {
  const dashboard = await getDashboardData();
  const catalog = await getProductCatalogData();

  res.render(`pages/${pageConfig.view}`, {
    title: pageConfig.title,
    activePageTitle: pageConfig.title,
    activeSection: 'Products',
    activeProductSub: pageConfig.activeProductSub,
    dashboard,
    catalog,
    ...pageConfig.data(catalog)
  });
}

exports.products = async (req, res, next) => {
  try {
    await renderProductPage(res, {
      view: 'products',
      title: 'Products',
      activeProductSub: 'Products',
      data: (catalog) => ({ products: catalog.products })
    });
  } catch (error) {
    next(error);
  }
};

exports.productCategories = async (req, res, next) => {
  try {
    await renderProductPage(res, {
      view: 'product-categories',
      title: 'Product Categories',
      activeProductSub: 'Product Categories',
      data: (catalog) => ({ categories: catalog.productCategories })
    });
  } catch (error) {
    next(error);
  }
};

exports.variations = async (req, res, next) => {
  try {
    await renderProductPage(res, {
      view: 'variations',
      title: 'Variations',
      activeProductSub: 'Variations',
      data: (catalog) => ({ variations: catalog.variations })
    });
  } catch (error) {
    next(error);
  }
};

exports.brands = async (req, res, next) => {
  try {
    await renderProductPage(res, {
      view: 'brands',
      title: 'Brands',
      activeProductSub: 'Brands',
      data: (catalog) => ({ brands: catalog.brands })
    });
  } catch (error) {
    next(error);
  }
};

exports.units = async (req, res, next) => {
  try {
    await renderProductPage(res, {
      view: 'units',
      title: 'Units',
      activeProductSub: 'Units',
      data: (catalog) => ({ units: catalog.units })
    });
  } catch (error) {
    next(error);
  }
};

exports.baseUnits = async (req, res, next) => {
  try {
    await renderProductPage(res, {
      view: 'base-units',
      title: 'Base Units',
      activeProductSub: 'Base Units',
      data: (catalog) => ({ baseUnits: catalog.baseUnits })
    });
  } catch (error) {
    next(error);
  }
};

exports.printBarcode = async (req, res, next) => {
  try {
    await renderProductPage(res, {
      view: 'print-barcode',
      title: 'Print Barcode',
      activeProductSub: 'Print Barcode',
      data: () => ({})
    });
  } catch (error) {
    next(error);
  }
};

exports.adjustments = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'adjustments',
      title: 'Adjustments',
      data: (operations) => ({ adjustments: operations.adjustments })
    });
  } catch (error) {
    next(error);
  }
};

exports.transfers = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'transfers',
      title: 'Transfers',
      data: (operations) => ({ transfers: operations.transfers })
    });
  } catch (error) {
    next(error);
  }
};

exports.quotations = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'quotations',
      title: 'Quotations',
      data: (operations) => ({ quotations: operations.quotations })
    });
  } catch (error) {
    next(error);
  }
};

exports.purchases = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'purchases',
      title: 'Purchases',
      activeSection: 'Purchases',
      activePurchaseSub: 'Purchases',
      data: (operations) => ({ purchases: operations.purchases })
    });
  } catch (error) {
    next(error);
  }
};

exports.purchaseReturns = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'purchase-returns',
      title: 'Purchases Returns',
      activeSection: 'Purchases',
      activePurchaseSub: 'Purchases Returns',
      data: (operations) => ({ purchaseReturns: operations.purchaseReturns })
    });
  } catch (error) {
    next(error);
  }
};

exports.sales = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'sales',
      title: 'Sales',
      activeSection: 'Sales',
      activeSalesSub: 'Sales',
      data: (operations) => ({ sales: operations.sales })
    });
  } catch (error) {
    next(error);
  }
};

exports.salesReturns = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'sales-returns',
      title: 'Sales Returns',
      activeSection: 'Sales',
      activeSalesSub: 'Sales Returns',
      data: (operations) => ({ salesReturns: operations.salesReturns })
    });
  } catch (error) {
    next(error);
  }
};

exports.expenses = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'expenses',
      title: 'Expenses',
      activeSection: 'Expenses',
      activeExpenseSub: 'Expenses',
      data: (operations) => ({ expenses: operations.expenses })
    });
  } catch (error) {
    next(error);
  }
};

exports.expenseCategories = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'expense-categories',
      title: 'Expense Categories',
      activeSection: 'Expenses',
      activeExpenseSub: 'Expense Categories',
      data: (operations) => ({ expenseCategories: operations.expenseCategories })
    });
  } catch (error) {
    next(error);
  }
};

exports.suppliers = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'suppliers',
      title: 'Suppliers',
      activeSection: 'Peoples',
      activePeopleSub: 'Suppliers',
      data: (operations) => ({ suppliers: operations.suppliers })
    });
  } catch (error) {
    next(error);
  }
};

exports.editSupplier = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'edit-supplier',
      title: 'Suppliers',
      activeSection: 'Peoples',
      activePeopleSub: 'Suppliers',
      data: (operations) => ({ supplier: operations.suppliers[0] })
    });
  } catch (error) {
    next(error);
  }
};

exports.customers = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'customers',
      title: 'Customers',
      activeSection: 'Peoples',
      activePeopleSub: 'Customers',
      data: (operations) => ({ customers: operations.customers })
    });
  } catch (error) {
    next(error);
  }
};

exports.users = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'users',
      title: 'Users',
      activeSection: 'Peoples',
      activePeopleSub: 'Users',
      data: (operations) => ({ users: operations.users })
    });
  } catch (error) {
    next(error);
  }
};

exports.walletRequests = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'wallet-requests',
      title: 'Wallet Requests',
      activeSection: 'Wallet Requests',
      data: (operations) => ({ walletRequests: operations.walletRequests })
    });
  } catch (error) {
    next(error);
  }
};

exports.roles = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'roles',
      title: 'Roles',
      activeSection: 'Roles/Permissions',
      data: (operations) => ({ roles: operations.roles })
    });
  } catch (error) {
    next(error);
  }
};

exports.warehouse = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'warehouse',
      title: 'Warehouse',
      activeSection: 'Warehouse',
      data: (operations) => ({ warehouses: operations.warehouses })
    });
  } catch (error) {
    next(error);
  }
};

exports.reports = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'reports',
      title: 'Warehouse Reports',
      activePageTitle: 'Warehouse Reports',
      activeSection: 'Reports',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

exports.stores = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'stores',
      title: 'Stores',
      activeSection: 'Stores',
      data: (operations) => ({ stores: operations.stores })
    });
  } catch (error) {
    next(error);
  }
};

exports.currencies = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'currencies',
      title: 'Currencies',
      activeSection: 'Currencies',
      data: (operations) => ({ currencies: operations.currencies })
    });
  } catch (error) {
    next(error);
  }
};

exports.languages = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'languages',
      title: 'Languages',
      activeSection: 'Languages',
      data: (operations) => ({ languages: operations.languages })
    });
  } catch (error) {
    next(error);
  }
};

exports.paymentMethods = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'payment-methods',
      title: 'Payment Methods',
      activeSection: 'Payment Methods',
      data: (operations) => ({ paymentMethods: operations.paymentMethods })
    });
  } catch (error) {
    next(error);
  }
};

exports.fieldConfiguration = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'field-configuration',
      title: 'Field Configuration',
      activeSection: 'Field Configuration',
      data: (operations) => ({ fieldConfiguration: operations.fieldConfiguration })
    });
  } catch (error) {
    next(error);
  }
};

exports.emailTemplates = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'templates',
      title: 'Email Templates',
      activeSection: 'Templates',
      activeTemplateSub: 'Email Templates',
      data: (operations) => ({ templates: operations.emailTemplates, pageCount: '1-2 of 2' })
    });
  } catch (error) {
    next(error);
  }
};

exports.smsTemplates = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'templates',
      title: 'SMS Templates',
      activeSection: 'Templates',
      activeTemplateSub: 'SMS Templates',
      data: (operations) => ({ templates: operations.smsTemplates, pageCount: '1-2 of 2' })
    });
  } catch (error) {
    next(error);
  }
};

exports.smsApi = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'sms-api',
      title: 'SMS API',
      activeSection: 'Templates',
      activeTemplateSub: 'SMS API',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

exports.settings = async (req, res, next) => {
  try {
    await renderOperationPage(res, {
      view: 'settings',
      title: 'Settings',
      activeSection: 'Settings',
      topbarTabs: [
        ['Settings', '/settings'],
        ['Prefixes', '#'],
        ['Taxes', '#'],
        ['Mail Settings', '#'],
        ['Receipt Settings', '#'],
        ['POS Settings', '#'],
        ['Currency Settings', '#'],
        ['Dual Screen Settings', '#']
      ],
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

exports.getDashboardData = getDashboardData;
exports.getProductCatalogData = getProductCatalogData;
exports.getProjectData = getProjectData;
exports.getLegacyDashboardData = getLegacyDashboardData;
exports.getLegacyProductCatalogData = getLegacyProductCatalogData;
