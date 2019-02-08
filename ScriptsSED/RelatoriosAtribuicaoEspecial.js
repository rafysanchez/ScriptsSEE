var RelAcaoJudicial = {
    InicializarFiltros: function () {
        var f = new filtroDE();
        f.configurar({
        });
    },

    GerarRelatorio: function () {
        $.validator.addMethod('minValue', function (value, el, param) {
            return value >= param;
        });

        $('#formRelAtribJudicial').validate({
            rules: {
                'filtroDE-anoLetivo': { required: true, minValue: 1900 }
            },
            messages: {
                required: 'Obrigatório',
                minValue: "Ano Letivo deve ser maior ou igual a 1900"
            }
        });

        if (!$('#formRelAtribJudicial').valid())
            return;

        var params = {
            anoLetivo: parseInt($('#filtroDE-anoLetivo').val()),
            codigoRedeEnsino: parseInt($('#filtroDE-redeEnsino').val()),
            codigoDiretoria: parseInt($('#filtroDE-diretoria').val()),
            codigoDne: parseInt($('#filtroDE-municipio').val()),
            codigoEscola: parseInt($('#filtroDE-escola').val()),
            codigoTipoEnsino: parseInt($('#filtroDE-tipoEnsino').val())
        }
        $.ajax({
            type: 'POST',
            data: {
                anoLetivo: params.anoLetivo,
                codigoRedeEnsino: params.codigoRedeEnsino,
                codigoDiretoria: params.codigoDiretoria,
                codigoDne: params.codigoDne,
                codigoEscola: params.codigoEscola,
                codigoTipoEnsino: params.codigoTipoEnsino
            },
            url: '/Relatorios/RelAtribAcaoJudicial/GerarRelatorio',
            success: function (data) {
                $('#resultado').empty().html(data);
                $('#tbRelatorio').sedDataTable({
                    nomeExportacao: 'Relatório de Atribuições por Ação Judicial'
                });
            }
        })
    }
}
