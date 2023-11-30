
document.addEventListener('DOMContentLoaded', function () {
  // Your JavaScript logic here
  const form = document.getElementById('myForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Submit button clicked!');
    // Additional logic
  });
});