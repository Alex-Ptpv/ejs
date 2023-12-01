// deleteCustomerController.js

const { getClient } = require('../db');
const { log } = require('./logs');

const client = getClient();

const renderDeleteCustomerPage = async (req, res) => {
  try {
    res.render('pages/delete-form', { message: '' });
    log('Rendering deleteCustomer page successful');
    console.log('Rendering deleteCustomer page successful');
  } catch (error) {
    console.error('Error rendering deleteCustomer page:', error);
    log(`Error rendering deleteCustomer page: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

const deleteCustomer = async (req, res) => {
  const customerId = req.body.customerId;
  console.log('customerId', customerId);

  const deleteQuery = 'DELETE FROM customers WHERE customer_id = $1';

  try {
    const result = await client.query(deleteQuery, [customerId]);
    console.log('Customer deleted successfully', result);
    log('Customer deleted successfully');
    res.render('pages/delete-form', { message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    log(`Error deleting customer: ${error.message}`);
    res.render('pages/error', { message: error.message });
  }
};

module.exports = {
  renderDeleteCustomerPage,
  deleteCustomer,
};
