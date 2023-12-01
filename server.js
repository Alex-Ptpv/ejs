const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const generateUniqueId = require('generate-unique-id');
const appStore = require('./public/store'); 
const { log } = require('./controllers/logs');
const { connect, getClient } = require('./db');
const { renderHomePage } = require('./controllers/homeController');
const { renderAboutPage } = require('./controllers/aboutController');
const { renderAddCustomerPage, addCustomer } = require('./controllers/addCustomerController');
const { renderDeleteCustomerPage, deleteCustomer } = require('./controllers/deleteCustomerController');
const { renderUpdateCustomerPage, updateCustomer } = require('./controllers/updateCustomerController');
const { renderSearchPage, searchCustomers } = require('./controllers/searchController');

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static('./views/partials'));
app.use(express.static('./views/pages'));
app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
connect();

const client = getClient();

app.get('/', renderHomePage);
app.get('/about', renderAboutPage);
app.get('/addCustomer', renderAddCustomerPage);
app.post('/addCustomer', addCustomer);
app.get('/deleteCustomer', renderDeleteCustomerPage);
app.post('/deleteCustomer', deleteCustomer);
app.get('/updateCustomer', renderUpdateCustomerPage);
app.post('/updateCustomer', updateCustomer);
app.get('/search', renderSearchPage);
app.post('/search', searchCustomers);




app.listen(8080);
console.log('Server is listening on port 8080');