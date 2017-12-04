$(document).ready(function() {

	for (var i = 0; i < html.length; i++) {
		// console.log(html[i]);
		// console.log(`${html[i].name} kostar ${html[i].price}kr och lite info: ${html[i].info}`);

		$('#html_table').append(`
			<tr>
				<td>${html[i].name}</td>
				<td>${html[i].price}kr</td>
				<td><button class="product_buy_button">Köp</button></td>
			</tr>`
		);

	}
	for (var i = 0; i < css.length; i++) {
		// console.log(html[i]);
		// console.log(`${css[i].name} kostar ${css[i].price}kr och lite info: ${css[i].info}`);

		$('#css_table').append(`
			<tr>
				<td>${css[i].name}</td>
				<td>${css[i].price}kr</td>
				<td><button class="product_buy_button">Köp</button></td>
			</tr>`
		);
	}
});
