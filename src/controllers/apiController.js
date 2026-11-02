const InfyposData = require('../models/InfyposData');
const defaultDashboard = require('../data/defaultDashboard');
const productsData = require('../data/productsData');
const operationsData = require('../data/operationsData');

const appKey = 'infypos-admin-pos';
const collectionPaths = {
  products: ['productCatalog', 'products'],
  productCategories: ['productCatalog', 'productCategories'],
  variations: ['productCatalog', 'variations'],
  brands: ['productCatalog', 'brands'],
  units: ['productCatalog', 'units'],
  baseUnits: ['productCatalog', 'baseUnits'],
  adjustments: ['operations', 'adjustments'],
  transfers: ['operations', 'transfers'],
  quotations: ['operations', 'quotations'],
  purchases: ['operations', 'purchases'],
  purchaseReturns: ['operations', 'purchaseReturns'],
  sales: ['operations', 'sales'],
  salesReturns: ['operations', 'salesReturns'],
  expenses: ['operations', 'expenses'],
  expenseCategories: ['operations', 'expenseCategories'],
  suppliers: ['operations', 'suppliers'],
  customers: ['operations', 'customers'],
  users: ['operations', 'users'],
  walletRequests: ['operations', 'walletRequests'],
  roles: ['operations', 'roles'],
  stores: ['operations', 'stores'],
  warehouses: ['operations', 'warehouses'],
  currencies: ['operations', 'currencies'],
  languages: ['operations', 'languages'],
  paymentMethods: ['operations', 'paymentMethods'],
  smsTemplates: ['operations', 'smsTemplates'],
  emailTemplates: ['operations', 'emailTemplates']
};

function buildDefaultProjectDocument() {
  return {
    appKey,
    dashboard: defaultDashboard,
    productCatalog: productsData,
    operations: operationsData
  };
}

function normalizeProjectDocument(document = {}) {
  const defaults = buildDefaultProjectDocument();

  return {
    ...defaults,
    ...document,
    dashboard: {
      ...defaults.dashboard,
      ...(document.dashboard || {})
    },
    productCatalog: {
      ...defaults.productCatalog,
      ...(document.productCatalog || {})
    },
    operations: {
      ...defaults.operations,
      ...(document.operations || {})
    }
  };
}

function getCollectionPath(collection) {
  const path = collectionPaths[collection];

  if (!path) {
    const error = new Error(`Unsupported dynamic collection: ${collection}`);
    error.statusCode = 404;
    throw error;
  }

  return path;
}

function getNestedValue(source, path) {
  return path.reduce((value, key) => value?.[key], source);
}

function setNestedValue(source, path, value) {
  let target = source;

  path.slice(0, -1).forEach((key) => {
    target[key] = target[key] || {};
    target = target[key];
  });

  target[path[path.length - 1]] = value;
}

async function getProjectDocument() {
  let document = await InfyposData.findOne({ appKey }).lean();

  if (!document) {
    document = await InfyposData.create(buildDefaultProjectDocument());
    return document.toObject();
  }

  return document;
}

async function saveProjectDocument(projectData) {
  return InfyposData.findOneAndUpdate(
    { appKey },
    projectData,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
}

function requireMongoConnection(res) {
  if (InfyposData.db.readyState === 1) return false;

  res.status(503).json({
    message: 'MongoDB is not connected. Add your IP address in MongoDB Atlas Network Access, then restart the server.'
  });
  return true;
}

exports.getSnapshot = async (req, res, next) => {
  try {
    if (InfyposData.db.readyState !== 1) {
      return res.json(defaultDashboard);
    }

    const document = await getProjectDocument();
    res.json(document.dashboard || defaultDashboard);
  } catch (error) {
    next(error);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    if (InfyposData.db.readyState !== 1) {
      return res.json({
        appKey,
        dashboard: defaultDashboard,
        productCatalog: productsData,
        operations: operationsData
      });
    }

    const document = await getProjectDocument();
    res.json({
      appKey,
      dashboard: document.dashboard || defaultDashboard,
      productCatalog: document.productCatalog || productsData,
      operations: document.operations || operationsData
    });
  } catch (error) {
    next(error);
  }
};

exports.saveProject = async (req, res, next) => {
  try {
    if (requireMongoConnection(res)) return;

    const document = await InfyposData.findOneAndUpdate(
      { appKey },
      {
        appKey,
        dashboard: {
          ...defaultDashboard,
          ...(req.body.dashboard || {})
        },
        productCatalog: {
          ...productsData,
          ...(req.body.productCatalog || {})
        },
        operations: {
          ...operationsData,
          ...(req.body.operations || {})
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
};

exports.saveSnapshot = async (req, res, next) => {
  try {
    if (requireMongoConnection(res)) return;

    const payload = {
      ...defaultDashboard,
      ...req.body
    };

    const document = await InfyposData.findOneAndUpdate(
      { appKey },
      {
        appKey,
        dashboard: payload,
        $setOnInsert: {
          productCatalog: productsData,
          operations: operationsData
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(document.dashboard);
  } catch (error) {
    next(error);
  }
};

exports.listRecords = async (req, res, next) => {
  try {
    if (InfyposData.db.readyState !== 1) {
      const defaults = buildDefaultProjectDocument();
      return res.json(getNestedValue(defaults, getCollectionPath(req.params.collection)) || []);
    }

    const document = await getProjectDocument();
    res.json(getNestedValue(document, getCollectionPath(req.params.collection)) || []);
  } catch (error) {
    next(error);
  }
};

exports.createRecord = async (req, res, next) => {
  try {
    if (requireMongoConnection(res)) return;

    const path = getCollectionPath(req.params.collection);
    const document = normalizeProjectDocument(await getProjectDocument());
    const records = [...(getNestedValue(document, path) || [])];
    records.unshift(req.body.record || {});
    setNestedValue(document, path, records);

    const saved = await saveProjectDocument(document);
    res.status(201).json({
      record: records[0],
      records: getNestedValue(saved, path) || records
    });
  } catch (error) {
    next(error);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    if (requireMongoConnection(res)) return;

    const index = Number(req.params.index);
    const path = getCollectionPath(req.params.collection);
    const document = normalizeProjectDocument(await getProjectDocument());
    const records = [...(getNestedValue(document, path) || [])];

    if (!Number.isInteger(index) || index < 0 || index >= records.length) {
      return res.status(404).json({ message: 'Record not found.' });
    }

    records[index] = {
      ...records[index],
      ...(req.body.record || {})
    };
    setNestedValue(document, path, records);

    const saved = await saveProjectDocument(document);
    res.json({
      record: records[index],
      records: getNestedValue(saved, path) || records
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    if (requireMongoConnection(res)) return;

    const index = Number(req.params.index);
    const path = getCollectionPath(req.params.collection);
    const document = normalizeProjectDocument(await getProjectDocument());
    const records = [...(getNestedValue(document, path) || [])];

    if (!Number.isInteger(index) || index < 0 || index >= records.length) {
      return res.status(404).json({ message: 'Record not found.' });
    }

    records.splice(index, 1);
    setNestedValue(document, path, records);

    const saved = await saveProjectDocument(document);
    res.json({
      records: getNestedValue(saved, path) || records
    });
  } catch (error) {
    next(error);
  }
};
