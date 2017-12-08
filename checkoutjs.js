$('.modal').hide();

$(getItems());

function getItems() {

    var items = [];
    items = JSON.parse(localStorage.getItem('shoppingCart'));

    var sum = 0;
    var tax = 20;
    var taxCalc = 1 + (tax / 100);
    var shipping;
	var tempShoppingCartForRestoring = items;
	var customer = {
		first_name: '',
		last_name: '',
		adress: '',
		zip_code: '',
		city: '',
		email: '',
		shipping_method: ''
	}
	var order = [];

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
            $('#finalPrice').text(parseFloat(sum * taxCalc).toFixed(2) + 'kr');
            $('#shipping').text("");
        }

    }


    function emptyCart() {
        sum = 0;
        $('.empty').hide();
        $('tr').remove();
        $('table').html('Varukorgen är tom');
        emptyCheckout();
		localStorage.removeItem('shoppingCart');
		localStorage.setItem('tempShoppingCartForRestoring', JSON.stringify(items));
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

        if (amount === 0 || amount < 0) {
            $(this).closest('tr').remove();
        }
        if (sum === 0 || sum < 0) {
            emptyCart();
        }

    });


    $(".delete_button").click(deleteButton);


    $('.empty').click(function () {

        emptyCart();
    });

    $(".reset-button").click(function () {
        $('.empty').show();

		var tempShoppingCartForRestoringLocalStorage = JSON.parse(localStorage.getItem('tempShoppingCartForRestoring'));

		items = tempShoppingCartForRestoringLocalStorage.length > 0 ? tempShoppingCartForRestoringLocalStorage : tempShoppingCartForRestoring;



        // if ($(".all_items").parent().append === "<div class=\"all_items\">") {
        //     $(".all_items").parent().append("<div class=\"all_items\">");
        // }

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

        var subPrice = $(this).closest('.amount').val();
        var subAmount = $(this).closest('.amount').val();
        var subTotal = subPrice * subAmount;

        sum = sum - subTotal;

        newTotPrice();

        if (sum <= 0) {

            emptyCart();

        }
    }

    function emptyCheckout() {

        $("form").hide();

    }

    $(".purchase_button").click(function (e) {
        e.preventDefault();
        var errorMessage = "";
        var radioButtonChecked = true;
        var inputs = $(".contactForm").find("input");
        var errors = $('.errorMessage');
        $('.errorMessage').html("");

        for (var i = 0; i < inputs.length; ++i) {

            if (!inputs[i].checkValidity()) {
                if (inputs[i].type === 'radio') {
                    console.log('tjenA');
                    radioButtonChecked = false;
                } else {
                    console.log(inputs[i].validationMessage);
                    errorMessage = inputs[i].validationMessage;

                    errors.get(i).append(errorMessage);
                    console.log(errors.get(i))
                }
            } else {
                console.log("Input OK");
            }
        }

        if (!radioButtonChecked) {
            $('.right_side > .errorMessage').append("Välj leverans")
        }

		if (!errorMessage) {
			getCustomerDetails();
			renderOrderConfirmation();
		}
    });

	function renderOrderConfirmation() {
		$('.modal').show();
		$('#order_modal_container').append(
			`<div>
				<span class="modal_close_button">Stäng</span>
			</div>
			<h1>Orderbekräftelse</h1>
			<p>Ordernummer: 0123456789</p>
			<h3>Din order:</h3>
			<table>
				<thead>
					<tr>
						<th>Vara</th>
						<th>Antal</th>
						<th>Pris</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>&lt;p&gt;</td>
						<td>3</td>
						<td>29.97kr</td>
					</tr>
					<tr>
						<!-- Empty row. Leave it in... that's what she said... -->
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td>Pris: 29.97kr</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td>Frakt: 50kr</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td>Totalsumma: 79.97kr</td>
					</tr>
				</tbody>
			</table>
			<p>Beräknat leveransdatum: 2020-12-25</p>
			<div>
				<h3>Leveransaddress:</h3>
				<ul>
					<li>${customer.first_name} ${customer.last_name}</li>
					<li>${customer.adress}</li>
					<li>${customer.zip_code} ${customer.city}</li>
					<li>${customer.email}</li>
				</ul>
			</div>`
		)
		$('.modal_close_button').on('click', function() {
			console.log('clicked');
			$('.modal').hide();
			$('.modal_container').html('');
		})
	}

	function getCustomerDetails() {
		customer = {
			first_name: $('#first_name').val(),
			last_name: $('#last_name').val(),
			adress: $('#adress').val(),
			zip_code: $('#zip_code').val(),
			city: $('#city').val(),
			email: $('#email').val(),
			shipping_method: ''
		}
		console.log(customer);
	}
}
