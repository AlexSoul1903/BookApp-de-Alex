$(document).ready(function() {


    $(".delete-pokemon").on('click', function(e) {

        e.preventDefault();
        if (confirm("Estas seguro que deseas eliminar este pokemon?")) {

            $(this).closest("#form-delete").submit();

        }

    });

    $(".delete-region").on('click', function(e) {

        e.preventDefault();

        if (confirm("Estas seguro que deseas eliminar esta region?")) {

            $(this).closest("#form-delete2").submit();

        }

    });

    $(".delete-type").on('click', function(e) {

        e.preventDefault();

        if (confirm("Estas seguro que deseas eliminar este tipo?")) {

            $(this).closest("#form-delete3").submit();

        }

    });



});