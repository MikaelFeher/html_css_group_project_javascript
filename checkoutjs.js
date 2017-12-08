$(getItems());

function getItems() {

    //var items = [];
    let items = JSON.parse(localStorage.getItem('shoppingCart'));

    var sum = 0;
    var tax = 20;
    var taxCalc = 1 + (tax / 100);
    var shipping;


    if (items.length > 0) {
        for (var i = 0; i < items.length; ++i) {
            if (items[i].amount !== 0) {
                $('.check').parent().append(
                    '<tr data-price=' + items[i].price + ' ' + 'data-amount=' + items[i].amount + '>' + '<td>' + items[i].name
                    + '</td>'
                    + '<td>'
                    + '<input class="amount" type="number"' + ' value=' + items[i].amount + '>'
                    + '</td>'
                    + '<td class="price">'
                    + (items[i].price * items[i].amount)
                    + '</td>'
                    + '<td class="table_button"><button class="delete_button"><span>ta bort</span></button></td></tr>');
                console.log(items[i].name + ': ' + +items[i].amount * items[i].price);


            } else {
                console.log("zero amounts given")
            }
        }

        writeTotal();
    }
    else {
        emptyCart();
    }


    //Functions
    function writeTotal() {
        $('.check').parent().append(
            '<tr>'
            + '<td>'
            + '</td>'
            + '<td>'
            + '</td>'
            + '<td>'
            + 'Totalt: '
            + '</td>'
            + '<td id="totalPrice">'
            + '</td>'
            + '</tr>'

            + '<tr>'
            + '<td>'
            + '</td>'
            + '<td>'
            + '</td>'
            + '<td>'
            + 'moms: '
            + '</td>'
            + '<td id="tax">'
            + '</td>'
            + '</tr>'

            + '<tr>'
            + '<td>'
            + '</td>'
            + '<td>'
            + '</td>'
            + '<td>'
            + 'Frakt: '
            + '</td>'
            + '<td id="shipping">'
            + '</td>'
            + '</tr>'

            + '<tr>'
            + '<td>'
            + '</td>'
            + '<td>'
            + '</td>'
            + '<td>'
            + 'Att betala: '
            + '</td>'
            + '<td id="finalPrice">'
            + '</td>'
            + '</tr>'
        );

        newTotPrice();

    }


    function newTotPrice() {
        sum = 0;

        $('.price').each(function (index, value) {
            sum = (sum + parseFloat(value.textContent));
            console.log(value.textContent);
        });

        $('#totalPrice').text((sum).toFixed(2) + "kr");
        $('#tax').text(tax + "%");

        if (shipping !== undefined) {
                $('#finalPrice').text(((sum * taxCalc) + shipping).toFixed(2) + 'kr');
            $('#shipping').text(shipping + "kr");
        } else {
            $('#finalPrice').text(parseFloat(sum*taxCalc).toFixed(2) + 'kr');
            $('#shipping').text("");
        }

    }


    function emptyCart() {
        sum = 0;
        $('.empty').hide();
        $('tr').remove();
        $('table').html('Varukorgen är tom');
        emptyCheckout();
    }


    //ClickEvents
    $('.shipping').click(function () {
        shipping = $(this).data('shipping');

        newTotPrice();
    });

    $('.amount').on('keyup change', function () {

        var amount = +$(this).val();

        $(this).parent().next().text((amount * +$(this).closest('tr').data('price')).toFixed(2));
        newTotPrice();

        if (amount === 0) {
            $(this).closest('tr').remove();
        }
        if (sum === 0) {
            emptyCart();
        }

    });


    $(".delete_button").click(deleteButton);


    $('.empty').click(function () {

        emptyCart();
    });

    $(".reset-button").click(function () {
        $('.empty').show();

        if ($(".all_items").parent().append === "<div class=\"all_items\">") {
            $(".all_items").parent().append("<div class=\"all_items\">");
        }

        $('table').html('<tr class="check">\n' +
            '        <th>Namn</th>\n' +
            '        <th>Antal</th>\n' +
            '        <th>Pris</th>\n' +
            '        <th></th>\n' +
            '      </tr>');
        for (var i = 0; i < items.length; ++i) {
            if (items[i].amount !== 0) {
                $('.check').parent().append(
                    '<tr data-price=' + items[i].price + ' ' + 'data-amount=' + items[i].amount + '>' + '<td>' + items[i].name
                    + '</td>'
                    + '<td>'
                    + '<input class="amount" type="number"' + ' value=' + items[i].amount + '>'
                    + '</td>'
                    + '<td class="price">'
                    + (items[i].price * items[i].amount)
                    + '</td>'
                    + '<td class="table_button"><button class="delete_button"><span>ta bort</span></button></td></tr>');
                console.log(items[i].name + ': ' + +items[i].amount * items[i].price);


            } else {
                console.log("zero amounts given")
            }
        }
        $('.amount').on('keyup change', function () {

            var amount = +$(this).val();

            $(this).parent().next().text(amount * +$(this).closest('tr').data('price'));
            newTotPrice();

            if (amount === 0) {
                $(this).closest('tr').remove();
            }
            if (sum === 0) {
                emptyCart();
            }

        });
        $(".delete_button").click(deleteButton);
        if (items.length >= 0) {
            $("form").show();
        }
        writeTotal();
    });

    function deleteButton() {
        $(this).closest('tr').remove();

        let subPrice = $(this).closest('.amount').val();
        let subAmount = $(this).closest('.amount').val();
        let subTotal = subPrice * subAmount;

        sum = sum - subTotal;

        newTotPrice();

        if (sum <= 0) {

            emptyCart();

        }
    }

    function emptyCheckout() {
        $("form").hide();
    }
}

