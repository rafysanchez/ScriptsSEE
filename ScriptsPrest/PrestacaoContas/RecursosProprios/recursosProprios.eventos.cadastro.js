"use strict";

$(document).ready(function () {

    AplicarMascaras();

    $("#Custeio").focusout(function (e) {
        e.preventDefault();
        calcularTotal(this, $("#Capital"), $("#txtVlTotal"));
    });

    $("#Capital").focusout(function (e) {
        e.preventDefault();
        calcularTotal($("#Custeio"), this, $("#txtVlTotal"));
    });

    $("#frmRecursoProprio").validate({
        rules: {
            DtLiberacao: {
                required: true
            },
        },
        messages: {
        },
        submitHandler: function () {
            debugger;
            var vlC = valorInformadoMaiorQueZero($("#Custeio").val()); 
            var vlK = valorInformadoMaiorQueZero($("#Capital").val());
          
            if (!vlC && !vlK) {
                mensagemAlerta.Alerta('Valor Custeio ou Capital é necessário!');
            }
            else {
               var c =  $("#Custeio").val();
               var k = $("#Capital").val();

               if (c == undefined || c == "")
                   $("#Custeio").val(0);

               if (k == undefined || k == "")
                   $("#Capital").val(0);
                    
                _recursosProprios.salvar();
            }
        }
    });

});
