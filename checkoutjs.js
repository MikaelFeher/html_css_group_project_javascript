$(getItems());

function getItems() {

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
    }, {
        table: {
            name: 'table',
            amount: 12,
            price: 100
        }

    }];


    var sum = 0;
    for (var i = 0; i < items.length; ++i) {
        for (var x in items[i]) {
            if (items[i][x].amount !== 0) {
                $('.check').parent().append(
                    '<tr data-price=' + items[i][x].price + ' ' + 'data-amount=' + items[i][x].amount + '>' + '<td>' + items[i][x].name
                    + '</td>'
                    + '<td>'
                    + '<input class="amount" type="number"' + ' value=' + items[i][x].amount + '>'
                    + '</td>'
                    + '<td class="price">'
                    + (items[i][x].price * items[i][x].amount)
                    + '</td>'
                    + '<td class="table_button"><button class="delete_button"><span>ta bort</span></button></td></tr>');
                console.log(items[i][x].name + ': ' + +items[i][x].amount * items[i][x].price);


            } else {
                console.log("zero amounts given")
            }
        }
    }

    $('.check').parent().append('<td>'
        + '</td>'
        + '<td>'
        + '</td>'
        + '<td>'
        + 'Totalt: '
        + '</td>'
        + '<td id="totalPrice">'
        + '</td>');

    newTotPrice();

    //Functions
    function newTotPrice() {
        sum = 0;
        $('.price').each(function (index, value) {
            sum = sum + parseInt(value.textContent);
            console.log(value.textContent);
        });
        $('#totalPrice').text(sum + " kr")

    }


    function emptyCart() {
        sum = 0;
        $('.empty').hide();
        $('tr').remove();
        $('table').html('Varukorgen är tom');
    }


    //ClickEvents
    $('.amount').on('keyup change', function () {
        var amount = +$(this).val();

        $(this).parent().next().text(amount * +$(this).closest('tr').data('price'));
        newTotPrice();

        if (amount === 0) {
            $(this).closest('tr').remove();
        }
        if (sum === 0) {
            emptyCart()
        }

    });


    $('.delete_button').click(function () {
        $(this).closest('tr').remove();

        var subPrice = $(this).closest('.amount').val();
        var subAmount = $(this).closest('.amount').val();
        var subTotal = subPrice * subAmount;

        sum = Math.round(sum - subTotal).toFixed(2);

        newTotPrice();

        if (sum === 0) {

            emptyCart();

        }
    });


    $('.empty').click(function () {

        emptyCart();

    });

    $(".reset-button").click(function() {
        $('.empty').show();
        if($(".all_items").parent().append === "<div class=\"all_items\">")
        $(".all_items").parent().append("<div class=\"all_items\">");
        $('table').html('<tr class="check">\n' +
            '        <th>Namn</th>\n' +
            '        <th>Antal</th>\n' +
            '        <th>Pris</th>\n' +
            '        <th></th>\n' +
            '      </tr>');
        for (var i = 0; i < items.length; ++i) {
            for (var x in items[i]) {
                if (items[i][x].amount !== 0) {
                    $('.check').parent().append(
                        '<tr data-price=' + items[i][x].price + ' ' + 'data-amount=' + items[i][x].amount + '>' + '<td>' + items[i][x].name
                        + '</td>'
                        + '<td>'
                        + '<input class="amount" type="number"' + ' value=' + items[i][x].amount + '>'
                        + '</td>'
                        + '<td class="price">'
                        + (items[i][x].price * items[i][x].amount)
                        + '</td>'
                        + '<td class="table_button"><button class="delete_button"><span>ta bort</span></button></td></tr>');
                    console.log(items[i][x].name + ': ' + +items[i][x].amount * items[i][x].price);


                } else {
                    console.log("zero amounts given")
                }
            }
        }
    })
}