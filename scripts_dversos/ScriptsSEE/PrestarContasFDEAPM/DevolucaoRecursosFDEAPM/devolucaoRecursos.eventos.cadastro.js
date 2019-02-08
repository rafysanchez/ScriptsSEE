"use strict";

$(document).ready(function () {

    var _saldoDevolvido = 1;
    var _devolucacaoTotal = 2;

    AplicarMascaras();

    $("#ValorDevolucao").maskMoney({ showSymbol: false, decimal: ",", thousands: "." });

    $('#rdbSaldoTotal').change(function (e) {
        e.preventDefault();
        $('#FlCriterioDevolucao').removeAttr('value');
        $('#FlCriterioDevolucao').attr('value', _devolucacaoTotal);
        _devolucaoRecuros.obterSaldos();
    });

    $('#rdbSaldoParcial').change(function (e) {
        $('#FlCriterioDevolucao').removeAttr('value');
        $('#ValorDevolucao').val('');
        $('#FlCriterioDevolucao').attr('value', _saldoDevolvido);
    });


    $.validator.addMethod("DtDeveEstarNoPeridodoPC", function (value, element) {
        debugger;
        var diaInicio, mesInicio, anoInicio, diaFim, mesFim, anoFim, diaRef, mesRef, anoRef = "";
        var dataReferencia = value;
        var dataInicio = $('#hdfInicio').val();
        var dataTermino = $('#hdfLimite').val();
        var dataFim = "";

        if (dataInicio == undefined || dataInicio == null || dataInicio == '01/01/0001')
            return true;

        if (dataTermino == undefined || dataTermino == null || dataTermino == "") {
            dataFim = $('#hdfFim').val();
        } else { dataFim = dataTermino;}
          
        if (dataInicio != undefined && dataInicio != null && dataInicio != "") {
            diaInicio = dataInicio.substr(0, 2);
            mesInicio = dataInicio.substr(3, 2);
            anoInicio = dataInicio.substr(6, 4);
        }
        if (dataFim != undefined && dataFim != null && dataFim != "") {
            diaFim = dataFim.substr(0, 2);
            mesFim = dataFim.substr(3, 2);
            anoFim = dataFim.substr(6, 4);
        }
        if (dataReferencia != undefined && dataReferencia != null && dataReferencia != "") {
            diaRef = dataReferencia.substr(0, 2);
            mesRef = dataReferencia.substr(3, 2);
            anoRef = dataReferencia.substr(6, 4);
        }

        var _inicioPC = new Date(anoInicio, mesInicio, diaInicio);
        var _fimPC = new Date(anoFim, mesFim, diaFim);
        var _ref = new Date(anoRef, mesRef, diaRef);

        return (_ref >= _inicioPC && _ref <= _fimPC);

    }, "Data deve estar dentro do periodo da PC.");


    $("#frmDevolucaoRecursos").validate({ 
        rules: {
            DtDevolucao: { required: true, DtDeveEstarNoPeridodoPC : true},
            NrGrDevolucao: { required: true },
            saldoDevolvido: { required: true },
            FlCriterioDevolucao: { required: true },
        },
        messages: {
        },
        submitHandler: function () {
            _devolucaoRecuros.salvar();
        }
    });

});
