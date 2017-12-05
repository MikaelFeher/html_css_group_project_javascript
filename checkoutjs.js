$(getItems());

function getItems() {

    console.log("hej");
    var items = [{
        div: {
            name: "div",
            amount: 3,
            price: 9.99
        }
    }, {
        p: {
            name: "p",
            amount: 2,
            price: 10
        }
    }, {
        img: {
            name: 'img',
            amount: 0,
            price: 20
        }
    },
        {
            table: {
                name: 'table',
                amount: 12,
                price: 100
            }

        }];


    var total = 0;
    for (var i = 0; i < items.length; ++i) {
        for (var x in items[i]) {
            if (items[i][x].amount !== 0) {
                $('.check').parent().append(
                    '<tr data-price=' + items[i][x].price
                    + ' '
                    + 'data-amount=' + items[i][x].amount
                    + '>'
                    + '<td>'
                    + items[i][x].name
                    + '</td>'
                    + '<td>'
                    + items[i][x].amount
                    + '</td>'
                    + '<td>'
                    + (items[i][x].price * items[i][x].amount)
                    + '</td>'
                    + '<td class="table_button"><button class="delete_button"><span>ta bort</span></button></td></tr>');

                total += items[i][x].amount * items[i][x].price;


            } else {
                console.log("zero amounts given")
            }
        }
    }
    totPrice();

    function totPrice() {
        $('.check').parent().append('<td>'
            + '</td>'
            + '<td>'
            + '</td>'
            + '<td>'
            + 'Totalt: '
            + '</td>'
            + '<td id="totalPrice">'
            + total
            + ' kr'
            + '</td>');
    }


    $('.delete_button').click(function () {
        $(this).closest('tr').remove();
        var subPrice = $(this).closest('tr').data('price');
        var subAmount = $(this).closest('tr').data('amount');

        var subTotal = subPrice * subAmount;
        total = Math.round(total - subTotal).toFixed(2);
        $('#totalPrice').text(total + " kr");
        console.log(total);
        if (total < 1) {
            emptyCart();
        }
    });


    $('.empty').click(function () {
        emptyCart();
    });

    function emptyCart() {
        total = 0;
        console.log(total)
        $('#totPrice').empty();
        $('tr').remove();
        $(this).remove();
        $('table').html('Varukorgen är tom');
    }


    var divAmount = 0;
    var pAmount = 0;
    for (var j = 0; j < items.length; ++j) {
        if (items[j].name === "div") {
            ++divAmount;
        }
        else if (items[j].name === "p") {
            ++pAmount;
        }
    }
    items.includes("div");

    /**if(items[0].includes("div") || items[0].contains("p")) {
        if(items.contains("div")) {
            var all_items = $(".all_items");
            all_items.append("<tr>");
            all_items.append("<td>${items.name}</td>");
            all_items.append("<td>${items.amount}</td>");
            all_items.append("<td>${items.amount * items.price}</td>");
            all_items.append("</tr>")
        }

    }*/
}