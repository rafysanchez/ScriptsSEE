"use strict";

$(document).ready(function () {

    $("#btnSalvarFluxo").click(function (e) {

        var dtDevCAnalise = $("#dtDevCAnalise").val();
        var dtDevSAnalise = $("#dtDevSAnalise").val();

        if (dtDevCAnalise == '') {
            $("#hdfIdUsuarioDevComAnalise").val('0');
            $("#hdfNomeUsuarioDevComAnalise").val('');
        }

        if (dtDevSAnalise == '') {
            $("#hdfIdUsuarioDevSemAnalise").val('0');
            $("#hdfNomeUsuarioDevSemAnalise").val('');
        }

        _fluxo.salvar();
    });

});