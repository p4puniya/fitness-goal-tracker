document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
    
    // Retrieve the entered username and password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Perform validation (e.g., check if the username and password match the registered user's credentials)
    if (validateLogin(username, password)) {
      // Successful login, redirect to the dashboard or another page
      window.location.href = "dashboard.html";
    } else {
      // Display an error message for invalid credentials
      showError("Invalid username or password");
    }
  });
  
  function validateLogin(username, password) {
    // Add your logic here to validate the login credentials
    // This may involve checking against a database or an authentication service
    // Return true if the login is valid, otherwise false
    // Example code:
    if (username === "admin" && password === "password") {
      return true;
    } else {
      return false;
    }
  }
  
  function showError(message) {
    var errorContainer = document.createElement("div");
    errorContainer.className = "error";
    errorContainer.textContent = message;
    
    var form = document.getElementById("loginForm");
    form.appendChild(errorContainer);
  }
  