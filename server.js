const express = require('express');
const app = express();
const { Client } = require('pg');
const bodyParser = require('body-parser');
const generateUniqueId = require('generate-unique-id');
const appStore = require('./public/store');

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static('./views/partials'));
app.use(express.static('./views/pages'));
app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Omega313131',
  port: 5432,
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


let customers = []

app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM customers');
    customers = result.rows;
    if (!appStore.currentPage || appStore.currentPage != 'home') {
      appStore.setCurrentPage('home')
    }
    console.log( 'current page', appStore.currentPage);
    res.render('pages/index', { data: {
      customers,
      currentPage: appStore.currentPage, 
      setPage: appStore.setCurrentPage,
      }
    });

    res.status(200);
                
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/about', (req, res) => {
  appStore.setCurrentPage('about');
  res.render('pages/about'); // Render the 'about.ejs' template
});

// Define an SQL query to insert the data into  table
const insertQuery = `
  INSERT INTO customers (customer_id, customer_name, contact_name, address, city, postal_code, country)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
`;

// Use the client.query method to execute the SQL query
app.get('/addCustomer', (req, res) => {
  appStore.setCurrentPage('addCustomer');
  res.render('partials/main-form'); // Render the 'create.ejs' template
});

app.post('/addCustomer', (req, res) => {
  const formData = req.body;
  const id = generateUniqueId({
    length: 7,
    useLetters: false
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
  client.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Data inserted successfully');
    }
  });
  res.redirect('/addCustomer');
});

app.get('/deleteCustomer', (req, res) => {
  appStore.setCurrentPage('deleteCustomer');
  res.render('partials/delete-form', {message: ''}); // Render the 'delete.ejs' template
});

app.post('/deleteCustomer', (req, res) => {
  const customerId = req.body.customerId;
  console.log('customerId', customerId)
  // Use a parameterized query to prevent SQL injection
  const deleteQuery = 'DELETE FROM customers WHERE customer_id = $1';

  client.query(deleteQuery, [customerId], (err, result) => {
    if (err) {
      console.error('Error deleting customer:', err);
      res.status(500).send('Error deleting customer');
    } else {
      console.log('Customer deleted successfully', res);
      res.render('partials/delete-form', {message: 'Customer deleted successfully'}); // Render the 'delete.ejs' template
    }
  });
});

app.get('/updateCustomer', (req, res) => {
  appStore.setCurrentPage('updateCustomer');
  res.render('partials/update-form'); // Render the 'delete.ejs' template
});

app.post('/updateCustomer', (req, res) => {
  const customerId = req.body.customerId;
  const customerName = req.body.customer_name;
  const contactName = req.body.contact_name;
  const address = req.body.address;
  const city = req.body.city;
  const postalCode = req.body.postal_code;
  const country = req.body.country;

  // Perform the update logic using the received data (assuming you have a database)
  // Use a parameterized query to prevent SQL injection
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

  // Assuming you have a database client (e.g., PostgreSQL client)
  client.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating customer:', err);
      res.status(500).send('Error updating customer');
    } else {
      console.log('Customer updated successfully');
      res.render('partials/update-form'); 
    }
  });
});

app.get('/search', (req, res) => {
  appStore.setCurrentPage('search');
  const customers = []
  const searchQuery = ''
  res.render('partials/search', { customers, searchQuery }); // Render the 'delete.ejs' template
});

app.post('/search', (req, res) => {
  const searchQuery = req.body.searchQuery;

  // Use ILIKE for case-insensitive search
  const query = {
    text: 'SELECT * FROM customers WHERE customer_name ILIKE $1',
    values: [`%${searchQuery}%`],
  };

  // Execute the query
  client.query(query, (err, result) => {
    if (err) {
      console.error('Error executing search query:', err);
      res.status(500).send('Error searching for customers');
    } else {
      const customers = result.rows;
      console.log(customers)
      res.render('partials/search', { customers, searchQuery });
    }
  });
});
app.listen(8080);
console.log('Server is listening on port 8080');