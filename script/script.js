$(document).ready(function () {
  var form = document.getElementById("login-form");
  form.onsubmit = function (e) {
    e.preventDefault();
  };
  // Get references to HTML elements
  var form = document.getElementById("login-form");
  var username = document.getElementById("username");
  var password = document.getElementById("password");
  var loginBtn = document.getElementById("login-btn");

  // Handle login button click
  loginBtn.onclick = function () {
    if (username.value === password.value) {
      // Login Successful
      alert("Login Successfully");

      // Store login status in localStorage
      localStorage.setItem("isLoggedIn", true);

      // Store user info in localStorage
      var userInfo = {
        username: username.value,
        password: password.value,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // Redirect to the orders page or any other authenticated page
      location.assign("/orders-page.html");
    } else {
      // Login Failed
      alert("Please enter valid credentials!");
    }
  };
});
