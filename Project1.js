window.onload = function () {

    var subtotal = 0.00;
    var tax = 0.00;
    var shipping = 40;
    var grandTotal = 0;
    var totalValues;
    var totalNames = ["Subtotal", "Tax", "Shipping", "Grand Total"];
    
    var files = ["106020.jpg", "116010.jpg", "120010.jpg"];
    var names = ["Girl with a Pearl Earring", "Artist Holding a Thistle", "Portrait of Eleanor of Toledo"];
    var amounts = [0, 0, 0];
    var prices = [80.00, 125.00, 75.00];
    var totals = [0.00, 0.00, 0.00];

    myFunction();

    function calculateTotal(quantity, price) {
        var result = quantity * price;
        return result;
    }
    
    function calculateGrandTotal() {
        tax = subtotal * 0.10;
        if (subtotal > 1000) {
            shipping = 0;
        }
        totalValues = [subtotal, tax, shipping, grandTotal];
    }

    function outputCartRow(file, title, quantity, price, total) {
        document.write("<tr><td><img src=" + file + "></td>");
        document.write("<td>" + title + "</td>");
        document.write('<td><input name="amount" type="number" /></td>');
        document.write("<td>$" + price + "</td>");
        outputTotal(total);
        document.write("</tr>");
    }

    function outputTotal(total) {
        document.write("<td>$" + total + "</td>");
    }

    function outputGrandTotal(name, value) {
        document.write('<tr><td colspan="4">' + name + "</td>");
        document.write("<td>" + value + "</td>");
    }

    function myFunction() {
        document.write("<h1>SHOPPING CART</h1>")

        // Write the header row
        document.write('<table><tr><th colspan="2">Product</th>');
        document.write("<th>#</th>");
        document.write("<th>Price</th>");
        document.write("<th>Amount</th></tr>");
        
        // Output each initial row in the cart
        for (var i = 0; i < 3; i++) {
            var file = files[i];
            var name = names[i];
            var amount = amounts[i];
            var price = prices[i].toFixed(2);
            totals[i] = calculateTotal(amount, price).toFixed(2);
            subtotal += totals[i];
            outputCartRow(file, name, amount, price, totals[i]);
        }
        
        // Add listener for when the amount of an item changes
        amounts = document.getElementsByName("amount");
        
        for (var k = 0; k < totals.length; k++) {
            amounts[k].addEventListener("change", getTotal);
            function getTotal() {
                for (var m = 0; m < 3; m++) {
                    totals[m].value = calculateTotal(amount[m], price[m]);
                    outputTotal(totals[m]);
                }
            }
        }
        
        // Calculate and output the subtotal, tax, shipping and grand total 
        calculateGrandTotal();

        for (var j = 1; j < 4; j++) {
            outputGrandTotal(totalNames[j], totalValues[j])
        }

        document.write("</table>");
    }
}
