$(document).ready(function () {
    $("#btnPesquisar").click(function () {
        if (!$('#form').valid()) return;

        $.ajax({
            cache: false,
            url: '/MaterialEscolarSobra/Pesquisar',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoDiretoria: $('#CodigoDiretoria').val(),
                codigoEscola: $("#CodigoEscola").val() == undefined ? 0 : $("#CodigoEscola").val(),
                codigoTipoEnsino: $("#CodigoTipoEnsino").val()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $("#divGrid").html(data);
            }
        });
    });
});

Salvar = function () {
    $.ajax({
        cache: false,
        url: '/MaterialEscolarSobra/Salvar',
        type: 'POST',
        //datatype: 'JSON',
        data: { "disciplinas": RecuperarQuadroDisciplina() },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            if (data.sucesso) {
                //$('#btnPesquisar').trigger('click');
                //$('#dialog').dialog('close');
                //controller.EfetuarPesquisa();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop();
        }
    });
}

var RecuperarQuadroDisciplina = function () {
    var QuadroDisciplina = [];
    $('.tblResultado tbody tr').each(function (e) {
        var CodigoDisciplina = $(this).find(".codigoDisciplina").val();
        var CodigoDiretoria = $('#CodigoDiretoria').val();
        var CodigoEscola = $('#CodigoEscola').val() == undefined ? 0 : $('#CodigoEscola').val();
        var CodigoTipoEnsino = $('#CodigoTipoEnsino').val();
        var qt_serie1_vol1 = $(this).find('.qt_serie1_vol1').val();
        var qt_serie1_vol2 = $(this).find('.qt_serie1_vol2').val();

        var qt_serie2_vol1 = $(this).find('.qt_serie2_vol1').val();
        var qt_serie2_vol2 = $(this).find('.qt_serie2_vol2').val();

        var qt_serie3_vol1 = $(this).find('.qt_serie3_vol1').val();
        var qt_serie3_vol2 = $(this).find('.qt_serie3_vol2').val();

        var qt_serie4_vol1 = $(this).find('.qt_serie4_vol1').val();
        var qt_serie4_vol2 = $(this).find('.qt_serie4_vol2').val();

        QuadroDisciplina.push({
            "CodigoDisciplina": CodigoDisciplina,
            "CodigoDiretoria": CodigoDiretoria,
            "CodigoEscola": CodigoEscola,
            "CodigoTipoEnsino": CodigoTipoEnsino,
            "qt_serie1_vol1": qt_serie1_vol1,
            "qt_serie1_vol2": qt_serie1_vol2,
            "qt_serie2_vol1": qt_serie2_vol1,
            "qt_serie2_vol2": qt_serie2_vol2,
            "qt_serie3_vol1": qt_serie3_vol1,
            "qt_serie3_vol2": qt_serie3_vol2,
            "qt_serie4_vol1": qt_serie4_vol1,
            "qt_serie4_vol2": qt_serie4_vol2,
        });
    });
    return JSON.stringify(QuadroDisciplina);
}

