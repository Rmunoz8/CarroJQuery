$(function () {

    var compras = 0;
    var precio = 0;

    $('div.item').dblclick(function (event) {
        let stock = $(this).find('label.stock').text();
        stock = stock.split(" ");
        let num = parseInt(stock[1]);
        let id = $(this).attr("id");
        id = "c" + id;
        var $delete = $('<a href="" class="delete"></a>');


        if (num > 0) {

            num--;
            compras++;
            let precioItem = $(this).find('label.price').text();
            precioItem = precioItem.split(" ");
            precioItem = parseInt(precioItem);
            precio = precio + precioItem;

            $(this).find('label.stock').text("Stock " + num);

            if (num == 0) {
                $(this).find('label.stock').addClass("agotado");
            }

            $('span.sptext').find('input#citem').val(compras);
            $('span.sptext').find('input#cprice').val(precio + " €");

            let clonado = $(this).clone();
            clonado.attr("id", id);
            clonado.addClass("icart");
            clonado.find('label.stock').hide();
            clonado.children().css("cursor", "default");
            $delete.click(borrar);
            clonado.append($delete);
            $('#cart_items').prepend(clonado);

        }



    });

    function borrar(event) {
        event.preventDefault();

        let idP = $(this).parent().attr("id");
        let id = idP.substr(1);

        let numStock = $('#' + id).find('label.stock').text();
        numStock = numStock.split(" ");
        numStock = numStock[1];
        numStock = parseInt(numStock);
        if (numStock == 0) {
            $('#' + id).find('label.stock').removeClass("agotado");
        }
        numStock++;
        $('#' + id).find('label.stock').text("Stock " + numStock);

        compras--;
        $('span.sptext').find('input#citem').val(compras);

        let precioItem = $("#" + id).find('label.price').text();
        precioItem = precioItem.split(" ");
        precioItem = precioItem[0];
        precioItem = parseInt(precioItem);
        precio -= precioItem;
        $('span.sptext').find('input#cprice').val(precio + " €");

        $(this).parent().remove();

    }

});
