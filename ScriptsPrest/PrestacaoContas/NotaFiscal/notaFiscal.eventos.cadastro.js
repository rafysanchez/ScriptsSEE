
"use strict";

$(document).ready(function () {

    $.validator.addMethod("DataEntregaMaiorQueDataEmissao", function (value, element) {

        var _inicio = $("#DtEmissao").val();
        var _fim = value;
        var inicio = parseDiaMesAno(_inicio);
        var fim = parseDiaMesAno(_fim);

        if (inicio < fim)
            return true;
        return false;
    }, "Data Entrega não pode ser menor que a Data de Emissão");

    $.validator.addMethod("ValorNotaFiscalMaiorZero", function (value, element) {
   
        var vl = parseInt($('#txtVlTotal').val());
        if (vl > 0)
            return true;
        return false;
    }, "Valor Nota Fiscal inválido");


    $("#frmNotaFiscal").validate({
        rules: {
            NrNotaFiscal: { required: true },
            IdGrupoDespesa: { required: true },
            NrNotaFiscal: { required: true },
            IdTipoDocumento: { required: true },
            IdTipoPagamento: { required: true },
            IdTipoPagamentoINSS: { required: true },
            DtEmissao: { required: true },
            DtEntrega: {
                required: true, DataEntregaMaiorQueDataEmissao: true
                      },
            NrCheque: { required: true },
            ValorNotaFiscal: { required: true, ValorNotaFiscalMaiorZero : true},
        },
        messages: {
        },
        submitHandler: function (e)
        {
            if ($(this).valid())
            {
                _notaFiscal.salvar();
            }
            else
            {
                return false;
            }
        }
    });

});

