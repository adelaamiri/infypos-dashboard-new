const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_password>')) {
    console.warn('MONGODB_URI is missing or still contains a placeholder. The app will run with local fallback data.');
    return;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { dbName: 'infypos' });
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

module.exports = connectDB;
