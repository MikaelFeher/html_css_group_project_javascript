$(getItems());


//console.log(items);
//var items = new Array();

function Item(name, amount, price) {
    this.name = name;
    this.price = price;
    this.amount = amount;
    /**this.amount = function(amount) {
        if(this.amount === 0) {
            return this.amount = amount;
        }
        else {
            return this.amount++;
        }
    }*/
}

/**function addToArray(item) {
    if (items.contains("div")) {
        items.push(new item);
    }
    else {
        items[item].amount++;
    }
}

 addToArray(new Item("div", 1, 9.99));
 addToArray(new Item("div", 1, 9.99));*/



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
                amount: 3,
                price: 100
            }


        }];

    items.push = new Item("div", 1, 9.99);
    items.push = new Item("div", 1, 9.99);
    items.forEach(function (items) {
        console.log(items);
    });


    for (var i = 0; i < items.length; ++i) {
        for (var x in items[i]) {
            if (items[i][x].amount !== 0) {
                $('.check').parent().append(
                    '<tr>' + '<td>' + items[i][x].name
                    + '</td>'
                    + '<td>'
                    + items[i][x].amount
                    + '</td>'
                    + '<td>'
                    + (items[i][x].price * items[i][x].amount)
                    + '</td>'
                    + '<td class="table_button"><button class="delete_button"><span>ta bort</span></button></td></tr>');

                console.log("total: " + items[i][x].amount * items[i][x].price);
            } else {
                console.log("check")
            }
        }
    }

    $('.delete_button').click(function () {
        $(this).closest('tr').remove();
    });


    console.log(items.length);


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