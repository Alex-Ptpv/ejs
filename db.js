const { Client } = require('pg');
const { createLogFile, log } = require('./controllers/logs');


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Omega313131',
  port: 5432,
});

createLogFile();

async function connect() {
  try {
    await client.connect();
    log('Connected to the database!');
    console.log('Connected to the database!');
  } catch (error) {
    log(`Error connecting to the database: ${error}`);
    console.error('Error connecting to the database:', error);
  }
}

function getClient() {
  return client;
}

// db.js or config.js
const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'test.db');

const db = new sqlite3.Database(dbPath);

const insertDataQuery = `
  INSERT INTO customers (customer_id, customer_name, contact_name, address, city, postal_code, country)
  VALUES (?, ?, ?, ?, ?, ?, ?);
`;

// Sample data
const data = {
  customer_id: '1244567',
  customer_name: 'John Doe',
  contact_name: 'John',
  address: '123 Main St',
  city: 'Cityville',
  postal_code: '12345',
  country: 'Countryland',
};

// Execute the query with parameters
db.run(
  insertDataQuery,
  [
    data.customer_id,
    data.customer_name,
    data.contact_name,
    data.address,
    data.city,
    data.postal_code,
    data.country,
  ],
  function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
    } else {
      console.log('Data inserted successfully asdda');
    }
  }
);

const selectDataQuery = 'SELECT * FROM customers';

// Execute the query
db.all(selectDataQuery, [], (err, rows) => {
  if (err) {
    console.error('Error selecting data:', err.message);
  } else {
    console.log('Selected data:', rows);
  }
});

module.exports = {
  connect,
  getClient,
  db
};


