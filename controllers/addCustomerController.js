// addCustomerController.js
const { getClient } = require('../db');
const { log } = require('./logs');
const generateUniqueId = require('generate-unique-id');

// Define an SQL query to insert the data into the table
const insertQuery = `
  INSERT INTO customers (customer_id, customer_name, contact_name, address, city, postal_code, country)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
`;
const client = getClient();

const renderAddCustomerPage = async (req, res) => {
  try {
    res.render('pages/main-form');
    // Log success status
    log('Rendering addCustomer page successful');
    console.log('Rendering addCustomer page successful');
  } catch (error) {
    // Log error details
    console.error('Error rendering addCustomer page:', error);
    log(`Error rendering addCustomer page: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

const addCustomer = async (req, res) => {
  try {
    const formData = req.body;
    const id = generateUniqueId({
      length: 7,
      useLetters: false,
    });
    formData.customer_id = id;
    console.log(formData);
    const values = [
      formData.customer_id,
      formData.customer_name,
      formData.contact_name,
      formData.address,
      formData.city,
      formData.postal_code,
      formData.country,
    ];
    const result = await client.query(insertQuery, values);
    // Log success status
    console.log('Data inserted successfully', result);
    log('Data inserted successfully');
    // Redirect to '/addCustomer'
    res.redirect('/addCustomer');
  } catch (error) {
    // Log error details
    console.error('Error inserting data:', error);
    log(`Error inserting data: ${error.message}`);
    // Send internal server error status
    res.render('pages/error', { message: error.message });
  }
};

module.exports = {
  renderAddCustomerPage,
  addCustomer,
};
