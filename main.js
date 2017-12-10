var localStorageShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
var shoppingCart = localStorageShoppingCart ? localStorageShoppingCart : [];

$('.modal').hide();

$(document).ready(function () {
    if (!html.length) {
        $('#html_table').append(`Vi har tyvärr inga produkter i denna kategorin.`)
    } else {
        for (var i = 0; i < html.length; i++) {
            $('#html_table').append(`
				<tr>
					<td class="product_name" data-productType="html" title="Klicka för mer info">${html[i].name}</td>
					<td>${html[i].price}kr</td>
					<td><button class="product_buy_button" data-name="${html[i].name}" data-price="${html[i].price}">Köp</button></td>
				</tr>`
            );
        }
    }

    if (!css.length) {
        $('#css_table').append(`Vi har tyvärr inga produkter i denna kategorin.`)
    } else {
        for (var i = 0; i < css.length; i++) {
            $('#css_table').append(`
				<tr>
					<td class="product_name" data-productType="css" title="Klicka för mer info">${css[i].name}</td>
					<td>${css[i].price}kr</td>
					<td><button class="product_buy_button" data-name="${css[i].name}" data-price="${css[i].price}">Köp</button></td>
				</tr>`
            );
        }
    }

	$('.product_name').on('click', function() {
		var productName = $(this).text();
		var productListToSearch = $(this).attr('data-productType');
		var itemToPresent = findItemInProducts(productListToSearch, productName);

		$('.modal').show();

		$('.modal_container').html(
			`<div class="modal_wrapper">
				<div>
					<span class="modal_close_button">Stäng</span>
				</div>
				<div id="info_header">
					<h1>${itemToPresent.name}</h1>
					<hr>
				</div>
				<div id="info_text">
					<p>${itemToPresent.info}</p>
					<p>Detta ingår:<br>
						<span>&lt;${itemToPresent.name}&gt;&lt;/${itemToPresent.name}&gt;</span>
					</p>
				</div>
				<div id="info_price">
					<hr>
					<h2>${itemToPresent.price}kr</h2>
				</div>
			</div>`
		);

		$('.modal_close_button').on('click', function() {
			$('.modal').hide();
			$('.modal_container').html('');
		})
	});

    $('.product_buy_button').on('click', function () {
        var itemName = $(this).attr('data-name');
        var itemPrice = $(this).attr('data-price');
        var result = shoppingCart.filter((item) => item.name === itemName);

        if (result.length === 0) {
            shoppingCart.push(
                {
                    name: itemName,
                    amount: 1,
                    price: itemPrice
                }
            )
        } else {
            var itemToUpdate = shoppingCart.find((item) => item.name === itemName);
            itemToUpdate.amount++;
        }

        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

        shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    })

	function findItemInProducts(list, name) {
		var result;
		if (list === 'html') {
			result = html.find((item) => item.name === name);
		} else {
			result = css.find((item) => item.name === name);
		}
		return result;
	};
});
