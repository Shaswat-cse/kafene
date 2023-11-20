$(document).ready(function () {
  // Set the first navigation item as active
  var navItem = document.getElementsByClassName("nav-item");
  navItem[0].classList.add("active-nav-item");

  // Function to render order rows
  function renderOrderRows(rowData) {
    // Create table cells for order data
    var id = $("<td>").html(rowData.id);
    var customer = $("<td>")
      .html(rowData.customerName)
      .attr("class", "primary-text");
    var time = $("<span>").html(rowData.orderTime);
    var formatDate = rowData.orderDate.split("-");
    var date = $("<td>")
      .html(formatDate[0] + " " + formatDate[1] + ", " + formatDate[2] + "<br>")
      .attr("class", "primary-text");
    date.append(time);
    var amount = $("<td>").html("$" + rowData.amount);
    var status = $("<td>")
      .html(rowData.orderStatus)
      .attr("class", "primary-text");

    // Create a table row and append cells
    var tr = $("<tr>").append(id, customer, date, amount, status);

    return tr;
  }

  // Fetch orders data from the API
  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
    function (orderData) {
      console.log(orderData);
      // Loop through the data and render order rows
      for (var i = 0; i < orderData.length; i++) {
        $("#order-rows").append(renderOrderRows(orderData[i]));
      }
    },
  );

  // Counter for displaying the number of rows
  var rowCounter = document.getElementById("row-counter");

  // Event handler for the "New" order filter

  var newOrder = document.getElementsByName("orders-new");
  newOrder[0].onclick = function () {
    var table = document.getElementById("order-rows");
    var userRow = table.getElementsByTagName("tr");
    for (i = 0; i < userRow.length; i++) {
      var td = userRow[i].getElementsByTagName("td")[4];
      if (td) {
        var tdTxtValue = td.textContent || td.innerText;
        if (tdTxtValue.toUpperCase() == "NEW") {
          if (newOrder[0].checked == true) {
            userRow[i].style.display = "";
          } else {
            userRow[i].style.display = "none";
          }
        }
      }
    }
    // Update the row counter
    var rowCount = 0;
    for (j = 0; j < userRow.length; j++) {
      if (userRow[j].style.display == "none") {
      } else {
        rowCount++;
      }
    }
    rowCounter.innerText = "Count: " + rowCount;
  };

  // Event handler for the "Packed" order filter

  var packedOrder = document.getElementsByName("orders-packed");
  packedOrder[0].onclick = function () {
    var table = document.getElementById("order-rows");
    var userRow = table.getElementsByTagName("tr");
    for (i = 0; i < userRow.length; i++) {
      var td = userRow[i].getElementsByTagName("td")[4];
      if (td) {
        var tdTxtValue = td.textContent || td.innerText;
        if (tdTxtValue.toUpperCase() == "PACKED") {
          if (packedOrder[0].checked == true) {
            userRow[i].style.display = "";
          } else {
            userRow[i].style.display = "none";
          }
        }
      }
    }
    var rowCount = 0;
    for (j = 0; j < userRow.length; j++) {
      if (userRow[j].style.display == "none") {
      } else {
        rowCount++;
      }
    }
    rowCounter.innerText = "Count: " + rowCount;
  };

  // Event handler for the "InTransit" order filter

  var inTransitOrder = document.getElementsByName("orders-transit");
  inTransitOrder[0].onclick = function () {
    var table = document.getElementById("order-rows");
    var userRow = table.getElementsByTagName("tr");
    for (i = 0; i < userRow.length; i++) {
      var td = userRow[i].getElementsByTagName("td")[4];
      if (td) {
        var tdTxtValue = td.textContent || td.innerText;
        if (tdTxtValue.toUpperCase() == "INTRANSIT") {
          if (inTransitOrder[0].checked == true) {
            userRow[i].style.display = "";
          } else {
            userRow[i].style.display = "none";
          }
        }
      }
    }
    var rowCount = 0;
    for (j = 0; j < userRow.length; j++) {
      if (userRow[j].style.display == "none") {
      } else {
        rowCount++;
      }
    }
    rowCounter.innerText = "Count: " + rowCount;
  };

  // Event handler for the "Delivered" order filter

  var deliveredOrder = document.getElementsByName("orders-delivered");
  deliveredOrder[0].onclick = function () {
    var table = document.getElementById("order-rows");
    var userRow = table.getElementsByTagName("tr");
    for (i = 0; i < userRow.length; i++) {
      var td = userRow[i].getElementsByTagName("td")[4];
      if (td) {
        var tdTxtValue = td.textContent || td.innerText;
        if (tdTxtValue.toUpperCase() == "DELIVERED") {
          if (deliveredOrder[0].checked == true) {
            userRow[i].style.display = "";
          } else {
            userRow[i].style.display = "none";
          }
        }
      }
    }
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
