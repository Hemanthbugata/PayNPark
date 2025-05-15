const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;


const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    });
