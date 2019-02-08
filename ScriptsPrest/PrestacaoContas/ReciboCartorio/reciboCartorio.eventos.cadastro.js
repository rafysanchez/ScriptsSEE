'use strict'

$(document).ready(function () {

    $('.valorMonetario').priceFormat({
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

    AplicarMascaras();
    $("#Cnpj").mask("99.999.999/9999-99");

    $("#frmReciboCartorio").validate({
        rules: {
            Data: { required: true },
            NrRecibo: { required: true },
            Cnpj: { required: true },
            Fornecedor: { required: true },
            NrCheque: { required: true },
            DataCheque: { required: true },
            Valor: { required: true }
        },
        messages: {
        },
        submitHandler: function () {
            var cpf = $("#Cnpj").val().replace(/[^\d]+/g, '');
            $("#Cnpj").val(cpf);

            _reciboCartorio.salvar();

        }
    });

});