"use strict";

$(document).ready(function () {

    var _saldoDevolvido = 1;
    var _devolucacaoTotal = 2;


    AplicarMascaras();

    $("#ValDevCusteio").maskMoney({ showSymbol: false, decimal: ",", thousands: "." });
    $("#ValDevCapital").maskMoney({ showSymbol: false, decimal: ",", thousands: "." });
    $("#ValorTotalDevolvido").maskMoney({ showSymbol: false, decimal: ",", thousands: "." });

    $("#ValDevCusteio").focusout(function (e) {
        e.preventDefault();
        calcularTotal(this, $("#ValDevCapital"), $("#ValorTotalDevolvido"));
    });

    $("#ValDevCapital").focusout(function (e) {
        e.preventDefault();
        calcularTotal($("#ValDevCusteio"), this, $("#ValorTotalDevolvido"));
    });

    $('#rdbSaldoTotal').change(function (e) {
        e.preventDefault();
        $('#FlCriterioDevolucao').removeAttr('value');
        $('#ValDevCusteio').attr('readOnly', 'readOnly');
        $('#ValDevCapital').attr('readOnly', 'readOnly');
        $('#FlCriterioDevolucao').attr('value', _devolucacaoTotal);
        _devolucaoRecuros.obterSaldos();
    });

    $('#rdbSaldoParcial').change(function (e) {
        $('#FlCriterioDevolucao').removeAttr('value');
        $('#ValDevCusteio').removeAttr('readOnly');
        $('#ValDevCapital').removeAttr('readOnly');
        $('#ValDevCusteio').val('');
        $('#ValDevCapital').val('');
        $('#ValorTotalDevolvido').val('');
        $('#FlCriterioDevolucao').attr('value', _saldoDevolvido);
    });

    $("#frmDevolucaoRecursos").validate({ 
        rules: {
            DtDevolucao: {required: true},
            NrGrDevolucao: { required: true },
            saldoDevolvido: { required: true },
            FlCriterioDevolucao: {required: true}
        },
        messages: {
        },
        submitHandler: function () {
            _devolucaoRecuros.salvar();
        }
    });

});
