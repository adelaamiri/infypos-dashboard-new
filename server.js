const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./src/config/db');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const apiRoutes = require('./src/routes/apiRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboardRoutes);
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).render('pages/error', {
    title: 'Not Found',
    message: 'The page you requested could not be found.'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('pages/error', {
    title: 'Server Error',
    message: 'Something went wrong while loading the dashboard.'
  });
});

app.listen(port, () => {
  console.log(`InfyPOS dashboard running at http://localhost:${port}`);
});
