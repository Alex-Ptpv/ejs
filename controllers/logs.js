const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../public', 'app.log');

function createLogFile() {
  // Check if the directory for the log file exists, if not, create it
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath));
    log(`Log file directory created at: ${path.dirname(logFilePath)}`);
    console.log(`Log file directory created at: ${path.dirname(logFilePath)}`);
  }
  // Check if the log file already exists
  else if (fs.existsSync(logFilePath)) {
    // Append logs to the existing file
    fs.appendFileSync(logFilePath, '\nAppending logs to an existing file\n');
    console.log(`Logs appended to existing file at: ${logFilePath}`);
  } else {
    // Create the log file and add some initial logs
    fs.writeFileSync(logFilePath, 'Creating a new log file\n');
    log(`New log file created at: ${logFilePath}`);
    console.log(`New log file created at: ${logFilePath}`);
  }
}

function log(message) {
  // Append the log message to the file
  fs.appendFileSync(logFilePath, `${getCurrentDateTime()} - ${message}\n`);
}

function getCurrentDateTime() {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Use 12-hour clock format
  };

  const now = new Date();
  const formattedDateTime = now.toLocaleString('en-US', options);

  return formattedDateTime;
}

module.exports = {
  createLogFile,
  log,
};
