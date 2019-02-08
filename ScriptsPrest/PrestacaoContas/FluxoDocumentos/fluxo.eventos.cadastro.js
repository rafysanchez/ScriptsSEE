'use strict'

$(document).ready(function () {

    AplicarMascaras();

    $("#chkRecebido").change(function (e) {
        e.preventDefault();

        if ($(this).is(":checked")) {
            _fluxo.recuperarData(1);

            //$("#dtRecebimento").val(data);
            $("#dtRecebimento").removeAttr('disabled');
            $("#chkDevCAnalise").removeAttr('disabled');
            $("#chkDevSAnalise").removeAttr('disabled');

            $("#respRecebido").val($("#hdfNomeUsuarioRecebimento").val());
        }
        else {
            $("#dtRecebimento").val('');
            $("#dtRecebimento").attr('disabled', 'disabled');


            $("#dtDevSAnalise").val('');
            $("#dtDevSAnalise").attr('disabled', 'disabled');
            $("#dtDevCAnalise").val('');
            $("#dtDevCAnalise").attr('disabled', 'disabled');

            $("#chkDevCAnalise").attr('disabled', 'disabled');
            $("#chkDevCAnalise").prop('checked', false);
            $("#chkDevSAnalise").attr('disabled', 'disabled');
            $("#chkDevSAnalise").prop('checked', false);

            $("#respRecebido").val('');
            $("#respDevCAnalise").val('');
            $("#respDevSAnalise").val('');
        }
    });

    $("#chkDevCAnalise").change(function (e) {
        e.preventDefault();
        //Se um for checado, o outro não pode estar checado
        $("#chkDevSAnalise").prop('checked', false);
        $("#dtDevSAnalise").val('');

        if ($("#chkDevCAnalise").is(":checked")) {
            _fluxo.recuperarData(2);

            $("#dtDevCAnalise").removeAttr('disabled');
            $("#dtDevSAnalise").attr('disabled', 'disabled');

            $("#respDevCAnalise").val($("#hdfNomeUsuarioDevComAnalise").val());
            $("#respDevSAnalise").val('');
        }
        else {
            $("#dtDevCAnalise").val('');
            $("#dtDevCAnalise").attr('disabled', 'disabled');

            $("#respDevCAnalise").val('');
        }
    });

    $("#chkDevSAnalise").change(function (e) {
        e.preventDefault();
        //Se um for checado, o outro não pode estar checado
        $("#chkDevCAnalise").prop('checked', false);
        $("#dtDevCAnalise").val('');

        if ($("#chkDevSAnalise").is(":checked")) {
            _fluxo.recuperarData(3);

            $("#dtDevSAnalise").removeAttr('disabled');
            $("#dtDevCAnalise").attr('disabled', 'disabled');

            $("#respDevSAnalise").val($("#hdfNomeUsuarioDevSemAnalise").val());
            $("#respDevCAnalise").val('');
        }
        else {
            $("#dtDevSAnalise").val('');
            $("#dtDevSAnalise").attr('disabled', 'disabled');

            $("#respDevSAnalise").val('');
        }
    });

    $("#dtDevCAnalise").change(function (e) {
        if (!$("#chkDevCAnalise").is(":checked")) {
            $("#dtDevCAnalise").val('');
        }
    });

    $("#dtDevSAnalise").change(function (e) {
        if (!$("#chkDevSAnalise").is(":checked")) {
            $("#dtDevSAnalise").val('');
        }
    });
});