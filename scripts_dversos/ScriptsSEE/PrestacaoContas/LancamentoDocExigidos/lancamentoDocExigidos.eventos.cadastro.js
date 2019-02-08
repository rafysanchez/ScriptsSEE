'use strict'

$(document).ready(function () {

    $("#frmLancamentoDocExigidos").validate({
        rules: {
            //FlRecebido: { required: true }
        },
        messages: {
        },
        submitHandler: function () {
            debugger;
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
                mensagemAlerta.Alerta('Selecione ao menos um motivo de glosa!');
            } else {
                $('#hdfListaTipoGlosa').val(listaTipoGlosa);
                _lancamentoDocExigidos.reprovarDocRecebido();
            }
 
        }
    });
});