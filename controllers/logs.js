const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../public', 'app.log');

function createLogFile() {
  // Create a logs directory if it doesn't exist
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath));
  }

  // Create or append to the log file
  fs.appendFileSync(logFilePath, '');

  console.log(`Log file created at: ${logFilePath}`);
}

function log(message) {
  // Append the log message to the file
  fs.appendFileSync(logFilePath, `${getCurrentDateTime()} - ${message}\n`);
}

function getCurrentDateTime() {
  const now = new Date();
  return now.toISOString();
}

module.exports = {
  createLogFile,
  log,
};
