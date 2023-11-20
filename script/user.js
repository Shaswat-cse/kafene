$(document).ready(function () {
  // Highlight the third navigation item as active
  var navItem = document.getElementsByClassName("nav-item");
  navItem[2].classList.add("active-nav-item");

  // Function to render user rows based on user data
  function renderuserRows(rowData) {
    var id = $("<td>").html(rowData.id);
    var userimage = $("<img>").attr("src", rowData.profilePic);
    var userAvatar = $("<td>").append(userimage);
    var userName = $("<td>").html(rowData.fullName);
    var formatDate = rowData.dob.split("-");
    var dob = $("<td>")
      .html(formatDate[0] + " " + formatDate[1] + ", " + formatDate[2] + "<br>")
      .attr("class", "primary-text");
    var gender = $("<td>").html(rowData.gender);
    var currentLocation = $("<td>").html(
      rowData.currentCity + ", " + rowData.currentCountry,
    );
    var tr = $("<tr>").append(
      id,
      userAvatar,
      userName,
      dob,
      gender,
      currentLocation,
    );

    return tr;
  }

  // Fetch initial user data from the API and render user rows
  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
    function (userData) {
      console.log(userData);
      for (var i = 0; i < userData.length; i++) {
        $("#user-rows").append(renderuserRows(userData[i]));
      }
    },
  );

  // Search functionality to filter displayed user rows
  var searchBox = document.getElementById("search-box");
  searchBox.onkeyup = function () {
    // Check if entered characters are 2 or more
    if (searchBox.value.length >= 2) {
      // Make an API call with the search query
      $.get(
        "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=" +
          searchBox.value,
        function (searchResults) {
          // Clear the table before rendering search results
          $("#user-rows").empty();

          // Render search result rows
          for (var i = 0; i < searchResults.length; i++) {
            $("#user-rows").append(renderuserRows(searchResults[i]));
          }
        },
      );
    } else {
      // Alert if less than 2 characters are entered
      alert("Please enter at least 2 characters for search.");
    }
  };

  // Reset button functionality to fetch and render all user rows
  var resetBtn = document.getElementById("reset-btn");
  resetBtn.onclick = function () {
    // Make an API call to fetch all users
    $.get(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
      function (userData) {
        // Clear the table before rendering all users
        $("#user-rows").empty();

        // Render all user rows
        for (var i = 0; i < userData.length; i++) {
          $("#user-rows").append(renderuserRows(userData[i]));
        }
      },
    );
  };
});
