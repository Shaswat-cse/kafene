$(document).ready(function () {
  // Highlight the active navigation item
  var navItem = document.getElementsByClassName("nav-item");
  navItem[1].classList.add("active-nav-item");

  // Function to render product rows
  function renderProductRows(rowData) {
    var id = $("<td>").html(rowData.id);
    var productName = $("<td>")
      .html(rowData.medicineName)
      .attr("class", "primary-text");
    var productBrand = $("<td>").html(rowData.medicineBrand);
    var formatDate = rowData.expiryDate.split("-");
    var expiryDate = $("<td>")
      .html(formatDate[0] + " " + formatDate[1] + ", " + formatDate[2] + "<br>")
      .attr("class", "primary-text");
    var unitPrice = $("<td>").html("$" + rowData.unitPrice);
    var stock = $("<td>").html(rowData.stock);
    var tr = $("<tr>").append(
      id,
      productName,
      productBrand,
      expiryDate,
      unitPrice,
      stock,
    );

    return tr;
  }

  // Fetch product data from the API
  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
    function (productData) {
      console.log(productData);

      // Render product rows
      for (var i = 0; i < productData.length; i++) {
        $("#product-rows").append(renderProductRows(productData[i]));
      }
    },
  );

  // Row counter element
  var rowCounter = document.getElementById("row-counter");

  // Event handler for the "Expired" checkbox
  var productExpired = document.getElementsByName("product-expired");
  productExpired[0].onclick = function () {
    var table = document.getElementById("product-rows");
    var userRow = table.getElementsByTagName("tr");

    // Get the current year
    var todayYear = new Date().getFullYear();

    for (i = 0; i < userRow.length; i++) {
      var td = userRow[i].getElementsByTagName("td")[3];
      if (td) {
        var tdTxtValue = td.textContent || td.innerText;
        var expiryYear = parseInt(tdTxtValue.split(",")[1]); // Parse expiry year as an integer

        // Check if the expiry year is less than the current year
        if (expiryYear < todayYear) {
          if (productExpired[0].checked == true) {
            userRow[i].style.display = "";
          } else {
            userRow[i].style.display = "none";
          }
        }
      }
    }

    // Count and display the visible rows
    var rowCount = 0;
    for (j = 0; j < userRow.length; j++) {
      if (userRow[j].style.display == "none") {
      } else {
        rowCount++;
      }
    }
    rowCounter.innerText = "Count: " + rowCount;
  };

  // Event handler for the "Low Stock" checkbox
  var productStock = document.getElementsByName("product-stock");
  productStock[0].onclick = function () {
    var table = document.getElementById("product-rows");
    var userRow = table.getElementsByTagName("tr");

    for (i = 0; i < userRow.length; i++) {
      var td = userRow[i].getElementsByTagName("td")[5];
      if (td) {
        var tdTxtValue = parseInt(td.textContent || td.innerText); // Parse stock as an integer

        // Compare the stock value with the threshold (e.g., 100)
        if (tdTxtValue < 100) {
          if (productStock[0].checked == true) {
            userRow[i].style.display = "";
          } else {
            userRow[i].style.display = "none";
          }
        }
      }
    }

    // Count and display the visible rows
    var rowCount = 0;
    for (j = 0; j < userRow.length; j++) {
      if (userRow[j].style.display == "none") {
      } else {
        rowCount++;
      }
    }
    rowCounter.innerText = "Count: " + rowCount;
  };
});
