var localStorageShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
var shoppingCart = localStorageShoppingCart ? localStorageShoppingCart : [];

$(document).ready(function () {
    if (!html.length) {
        $('#html_table').append(`Vi har tyvärr inga produkter i denna kategorin.`)
    } else {
        for (var i = 0; i < html.length; i++) {
            $('#html_table').append(`
				<tr>
					<td id="${html[i].name}">${html[i].name}</td>
					<td>${html[i].price}kr</td>
					<td><button class="product_buy_button" name="${html[i].name}" data-price="${html[i].price}">Köp</button></td>
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
					<td>${css[i].name}</td>
					<td>${css[i].price}kr</td>
					<td><button class="product_buy_button" name="${css[i].name}" data-price="${css[i].price}">Köp</button></td>
				</tr>`
            );
        }
    }

    $('.product_buy_button').on('click', function () {
        var itemName = $(this).attr('name');
        var itemPrice = $(this).data('price');
        console.log(itemName);
        console.log(itemPrice + "css price")
        var result = shoppingCart.filter((item) => item.name === itemName);
        ;

        if (result.length === 0) {
            console.log(`No item found`);
            shoppingCart.push(
                {
                    name: itemName,
                    amount: 1,
                    price: itemPrice
                }
            )
        } else {
            for (var variable in result) {
                console.log(`result: ${result[variable].name}`);
            }

            var itemToUpdate = shoppingCart.find((item) => item.name === itemName);

            console.log(itemToUpdate);
            itemToUpdate.amount++;
            console.log(itemToUpdate);
        }
        console.log('shoppingCart: ');
        for (var item in shoppingCart) {
            console.log(shoppingCart[item]);
        }
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

        shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
        console.log(`localStorage: ${shoppingCart}`);

        for (var cartItem in shoppingCart) {
            console.log(shoppingCart[cartItem]);
        }

    })

    // for(var item in lsShoppingCart) {
    // 	$('#test').append(
    // 		`<p>${item}</p>`
    // 	)
    // }


    // jQuery SPA maybe?**********************************
    // $('#products_link').on('click', function(event) {
    // 	event.preventDefault();
    // 	$.ajax({
    // 		url:"index.html",
    // 		type: "GET",
    // 		dataType: "text",
    // 		success: function(response) {
    // 			$('#content').html(response);
    // 		}
    // 	});
    // })

    // DOESN'T WORK AT THE MOMENT!
    // function showProducts(productTable) {
    // 	if (!productTable.length) {
    // 		$(`#${productTable}_table`).append(`Vi har tyvärr inga produkter i denna kategorin.`)
    // 	} else {
    // 		for (var i = 0; i < productTable.length; i++) {
    // 			$(`#${productTable}_table`).append(`
    // 				<tr>
    // 					<td>${productTable[i].name}</td>	<td>${productTable[i].price}kr</td><td><button class="product_buy_button">Köp</button></td>
    // 				</tr>`
    // 			);
    // 		}
    // 	}
    // }
});
