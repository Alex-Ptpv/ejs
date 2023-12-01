const { getClient } = require('../db'); 
const { log } = require('./logs');

const renderAboutPage = (req, res) => {
  res.render('pages/about');
  log('Rendering about page successful');
  console.log('Rendering about page successful');
};

module.exports = {
  renderAboutPage,
};