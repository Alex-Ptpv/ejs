// updateCustomerController.js

const { getClient } = require('../db');
const { log } = require('./logs');

const client = getClient();

const renderUpdateCustomerPage = async (req, res) => {
  try {
    res.render('pages/update-form');
    log('Rendering updateCustomer page successful');
    console.log('Rendering updateCustomer page successful');
  } catch (error) {
    console.error('Error rendering updateCustomer page:', error);
    log(`Error rendering updateCustomer page: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

const updateCustomer = async (req, res) => {
  const customerId = req.body.customerId;
  const customerName = req.body.customer_name;
  const contactName = req.body.contact_name;
  const address = req.body.address;
  const city = req.body.city;
  const postalCode = req.body.postal_code;
  const country = req.body.country;

  const updateQuery = `
    UPDATE customers
    SET
      customer_name = $1,
      contact_name = $2,
      address = $3,
      city = $4,
      postal_code = $5,
      country = $6
    WHERE customer_id = $7
  `;

  const values = [customerName, contactName, address, city, postalCode, country, customerId];

  try {
    const result = await client.query(updateQuery, values);
    console.log('Customer updated successfully', result);
    log('Customer updated successfully');
    res.render('pages/update-form');
  } catch (error) {
    console.error('Error updating customer:', error);
    log(`Error updating customer: ${error.message}`);
    res.render('pages/error', { message: error.message });
  }
};

module.exports = {
  renderUpdateCustomerPage,
  updateCustomer,
};
