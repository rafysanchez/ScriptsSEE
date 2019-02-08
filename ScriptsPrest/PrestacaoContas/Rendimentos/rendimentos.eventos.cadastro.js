'use strict'

$(document).ready(function () {

    AplicarMascaras();

    $("#IdCusteio").focusout(function (e) {
        e.preventDefault();
        calcularTotal(this, $("#IdCapital"), $("#vlTotal"));
    });

    $("#IdCapital").focusout(function (e) {
        e.preventDefault();
        calcularTotal($("#IdCusteio"), this, $("#vlTotal"));

    });

    //$("#frmRendimentos").validate({
    //    rules: {
    //        DtRendimento: { required: true },
    //        //Custeio: { required: true },
    //        //Capital: { required: true }
    //    },
    //    messages: {
    //    },
    //    submitHandler: function () {
    //        debugger;
    //        var vlC = $("#IdCusteio").val() == "" ? "0" : $("#IdCusteio").val();
    //        var vlK = $("#IdCapital").val() == "" ? "0" : $("#IdCapital").val();
  
    //        _rendimentos.salvar();
            
    //    }
    //});

    $("#frmRendimentos").validate({
        rules: {
            DtRendimento: {
                required: true
            }

        },
        messages: {
        },
        submitHandler: function () {

            if ($("#IdCusteio").val().length == 0 && $("#IdCapital").val().length == 0) {
                mensagemAlerta.Alerta('Informe um valor do Tipo Custeio ou do Tipo Capital');
            }
            else {
                debugger;
                _rendimentos.salvar();

            }
        }
    });


});