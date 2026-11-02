require('dotenv').config();

const mongoose = require('mongoose');
const InfyposData = require('../src/models/InfyposData');
const defaultDashboard = require('../src/data/defaultDashboard');
const productsData = require('../src/data/productsData');
const operationsData = require('../src/data/operationsData');

async function seed() {
  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('<db_password>')) {
    throw new Error('MONGODB_URI is missing or still contains <db_password>. Add your real MongoDB Atlas password first.');
  }

  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'infypos' });
  await InfyposData.findOneAndUpdate(
    { appKey: 'infypos-admin-pos' },
    {
      appKey: 'infypos-admin-pos',
      dashboard: defaultDashboard,
      productCatalog: productsData,
      operations: operationsData
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  await mongoose.disconnect();
  console.log('All InfyPOS project data saved to MongoDB Atlas database "infypos", collection "Dashbord".');
}

seed().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
