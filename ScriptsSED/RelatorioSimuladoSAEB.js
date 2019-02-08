$(document).ready(function () {
   
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'SimuladoSAEB', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'anoLetivo' }]);
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'SimuladoSAEB', 'CarregarListaTurmaPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino', 'anoLetivo'], undefined, undefined, undefined);
    $('#anoLetivo').autoPreencher($('#CodigoTipoEnsino'), 'SimuladoSAEB', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'anoLetivo' }]);
    


    //$("#CodigoTurma").change(function () {
    //    if ($('#CodigoTurma :selected').val() == 'selected' || $('#CodigoTurma :selected').val() == "") return;
    //    cdTurma = $("#CodigoTurma option:selected").val();
    //    $.ajax({
    //        method: "POST",
    //        url: "../SimuladoSAEB/Relatorio",
    //        async: true,
    //        dataType: 'html',
    //        data: ({
    //            codTurma: cdTurma,
    //        }),
    //        success: function (result) {
    //            $("#passo2").show();
    //            $("#partialRelatorio").html(result);


    //        }
    //    });
    //});
    $("#CodigoTurma").change(function () {
        if ($('#CodigoTurma :selected').val() == 'selected' || $('#CodigoTurma :selected').val() == "") return;
        $.post("../SimuladoSAEB/Relatorio", { codTurma: $("#CodigoTurma option:selected").val(), anoLetivo: $("#anoLetivo").val() }, function (data) {
            $("#passo2").show();
            $("#partialRelatorio").html(data);
        }, 'html');
    });
});