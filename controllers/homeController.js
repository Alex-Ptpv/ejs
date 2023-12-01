// homeController.js
const { getClient } = require('../db'); 
const { appStore } = require('../public/store');
const { log } = require('./logs');

const client = getClient();

const renderHomePage = async (req, res) => {
  try {
    // Fetch data from the database
    const result = await client.query('SELECT * FROM customers');
    
    // Extract customers from the result
    const customers = result.rows;

    // Render the 'pages/index' view with data
    res.render('pages/index', {
      data: {
        customers,
      },
    });

    // Log success status
    log('Rendering home page successful');
    console.log('Rendering home page successful');
  } catch (error) {
    // Log error details
    console.error('Error executing SQL query:', error);
    log(`Error executing SQL query:, ${error}`);

    // Send internal server error status
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  renderHomePage,
};
