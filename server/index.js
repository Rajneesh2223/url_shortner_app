require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const urlRoutes = require('./routes/urlRoutes');
const connectDB = require('./config/database')

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests, please try again later.'
});
app.use('/shorten', limiter);




app.use('/', urlRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;