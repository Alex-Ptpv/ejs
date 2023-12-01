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

module.exports = {
  connect,
  getClient,
};
