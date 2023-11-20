$(document).ready(function () {
  var logOut = document.getElementById("logout");
  logOut.onclick = function () {
    alert("logout Successfully");

    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("userInfo");
    location.assign("index.html");
  };
});
