'use strict'

$(document).ready(function () {

    $('.valorMonetario').priceFormat({
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

    AplicarMascaras();

    $("#txtAnoBase").val($("#IdExercicio :selected").text());
    $("#txtVlPorTurma").maskMoney({ showSymbol: false, decimal: ",", thousands: "." });
    $("#txtVlTotal").maskMoney({ showSymbol: false, decimal: ",", thousands: "." });

    $("#txtNrTurmasMonitoradas").focusout(function (e) {
        e.preventDefault();
        var _total = calcularValorTotal($(this).val(), $("#txtVlPorTurma").val());
        $("#txtVlTotal").val(_total);
    });

    $("#txtVlPorTurma").focusout(function (e) {
        e.preventDefault();
        var _total = calcularValorTotal($("#txtNrTurmasMonitoradas").val(), $(this).val());
        $("#txtVlTotal").val(_total);
    });

    $("#frmRecibo").validate({
        rules: {
            DtReciboMonitoria: { required: true },
            NrCpfMonitor: { required: true },
            NmMonitor: { required: true },
            NrCheque: { required: true },
            NrTurmasMonitoradas: { required: true },
            ValorPorTurma: { required: true }
        },
        messages: {
        },
        submitHandler: function () {
            var cpf = $("#NrCpfMonitor").val().replace(/[^\d]+/g, '');
            $("#NrCpfMonitor").val(cpf);
            
            if ($('#FlReprova').val() == '1') {

                var listaTipoGlosa = "";
                var checkGlosa = $('#chkGlosa');

                $('#tblGlosa > tbody > tr').each(function () {

                    checkGlosa = $(this).find('#chkGlosa');

                    if (checkGlosa.is(':checked')) {

                        if (listaTipoGlosa == "") {
                            listaTipoGlosa = checkGlosa.attr('data-id');
                        } else {
                            listaTipoGlosa += "," + checkGlosa.attr('data-id');
                        }
                    }
                });

                if (listaTipoGlosa == "") {
                    mensagemAlerta.Alerta('Informe o motivo da reprovação!');
                }
                else {
                    $('#hdfListaTipoGlosa').val(listaTipoGlosa);
                    _recibo.reprova();
                }
            } else {
                _recibo.salvar();
            }
        }
    });

});