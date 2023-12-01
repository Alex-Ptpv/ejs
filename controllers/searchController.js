// searchController.js
const { getClient } = require('../db');
const { log } = require('./logs');

const client = getClient();

const renderSearchPage = (req, res) => {
  const customers = [];
  const searchQuery = '';
  
  res.render('pages/search', { customers, searchQuery });

  // Log success status
  log('Rendering search page successful');
  console.log('Rendering search page successful');
};

const searchCustomers = (req, res) => {
  const searchQuery = req.body.searchQuery;

  // Use ILIKE for case-insensitive search
  const query = {
    text: 'SELECT * FROM customers WHERE customer_name ILIKE $1',
    values: [`%${searchQuery}%`],
  };

  // Execute the query
  client.query(query, (err, result) => {
    if (err) {
      // Log error details
      console.error('Error executing search query:', err);
      log(`Error executing search query: ${err}`);

      // Send internal server error status
      res.status(500).send('Error searching for customers');
    } else {
      const customers = result.rows;

      // Log success status
      console.log(customers);
      log('Search query successful');

      // Render the 'pages/search' template with the search results
      res.render('pages/search', { customers, searchQuery });
    }
  });
};

module.exports = {
  renderSearchPage,
  searchCustomers,
};
