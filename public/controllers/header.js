const appStore = require('../store');

// Define a function to handle the click event for all links
function handleNavLinkClick(event) {
  // Prevent the default behavior of the link to avoid page reload
  event.preventDefault();

  // Get the id attribute of the clicked link
  const linkId = event.target.getAttribute('id');

  // Set the current page in the MobX store based on the link's id
  appStore.setCurrentPage(linkId);
}

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => handleNavLinkClick(event));
  });
})

module.exports = handleNavLinkClick;