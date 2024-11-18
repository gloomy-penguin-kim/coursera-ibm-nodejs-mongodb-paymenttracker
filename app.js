const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vendorPaymentsRouter = require('./routes/vender_payment');

const app = express();
const port = 3000;

app.use(bodyParser.json());

require('dotenv').config();
 
// Connect to MongoDB   
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
const clientOptions = { dbName: 'customerDB', serverApi: { version: '1', strict: true, deprecationErrors: true } };  
mongoose.set('debug', true);
mongoose.connect(uri, clientOptions)
  .then(() => console.log('Connected to database:', mongoose.connection.name) );

// Use Vendor Payments routes
app.use('/vendorPayments', vendorPaymentsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/vendorPayments`);
});