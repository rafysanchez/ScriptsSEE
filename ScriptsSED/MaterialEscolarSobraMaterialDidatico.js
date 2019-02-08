$(document).ready(function () {
    $("#btnPesquisarSaldo").click(function () {
        if (!$('#form').valid()) return;

        $.ajax({
            cache: false,
            url: '/MaterialEscolarSobra/PesquisaSaldoMaterialDidatico',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoDiretoria: $('#CodigoDiretoria').val(),
                codigoEscola: $("#CodigoEscola").val(),
                codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
                codigoDisciplina: $("#CodigoDisciplina").val(),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $("#divGridSaldoMaterialDidatico").html(data);
            }
        });
    });
});
