var texto;
$(document).ready(function () {
    Inicio();
    ajax.Pesquisa();
    gerarPdf();
    validacao();
    configurar.AnoLetivo();
});


var Inicio = function () {
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'Caderno', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }]);
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino', 'AnoLetivo'], undefined, undefined, undefined);
    $('#CodigoTurma').change(function () {
        $('#serie').val($("#CodigoTurma :selected").text().replace(/[^0-9\.]/g, '').replace('0', '')[0]);
    });
    //$('#CodigoTurma').autoPreencher($('#CodigoDisciplina'), 'Disciplina', 'CarregarListaDiciplinasQuebraPorTipoEnsino_Serie', [{ CodigoTipoEnsino: 'CodigoTipoEnsino', NrSerie: 'NrSerie', AnoLetivo: 'AnoLetivo' }], undefined);
    //$('#CodigoTurma').autoPreencher($('#CodigoDisciplina'), 'Disciplina', 'CarregarListaDisciplinas', [{ id: 'CodigoTurma' }], undefined);
    $('#CodigoTurma').autoPreencher($('#CodigoDisciplina'), 'Disciplina', 'ListaDisciplinasComParametrizacaoeQuebra', [{ codigoTurma: 'CodigoTurma', anoLetivo: 'AnoLetivo' }], undefined);

}

var ajax = {
    Pesquisa: function () {

        $('#btnPesquisar').click(function () {
            if (!$('#form').valid()) return;
            $.post("/Caderno/ParcialPesquisaAlunoCaderno", {
                codigoTurma: $('#CodigoTurma').val(),
                anoLetivo: $('#AnoLetivo').val(),
                cdDisciplina: $('#CodigoDisciplina').val(),
                codigoSemestre: $('#CodigoSemestre').val(),
            }).done(function (data) {
                $("#divResultado").empty().html(data);

                if ($('#tabelaAlunosRecebimento').length > 0){
                    $('#tabelaAlunosRecebimento').sedDataTable({
                        embutida: true,
                        pageLength: 50,
                        nomeExportacao: "Lista de Recebimento de Caderno",
                        tituloFiltro: " ",

                        filtros: [
                            { nome: "Ano Letivo", valor: $("#AnoLetivo").val() },
                            { nome: "Semestre", valor: $("#CodigoSemestre option:selected").text() },
                            { nome: "Diretoria", valor: $("#CodigoDiretoria option:selected").text() },
                            { nome: "Escola", valor: $("#CodigoEscola option:selected").text() },
                            { nome: "Tipo de Ensino", valor: $("#CodigoTipoEnsino option:selected").text() },
                            { nome: "Turma", valor: $("#CodigoTurma option:selected").text() },
                            { nome: "Disciplina", valor: $("#CodigoDisciplina option:selected").text() },

                        ]
                    });
                }

                $('#cdDisciplina').val($('#CodigoDisciplina').val());
                $('#hdnAnoLetivo').val($('#AnoLetivo').val());
                $('#cdSemestre').val($('#CodigoSemestre').val());
                configurar.checkBoxTodos();
            });
        });
    }
}

var configurar = {
    checkBoxTodos: function () {

        $('#chkTodos').click(function () {
            $('.todos').prop('checked', this.checked);
        });

    },
    AnoLetivo: function () {
        $('#AnoLetivo').focus(function () {
            texto = $(this).val();
        });
        $('#AnoLetivo').blur(function () {
            if (texto != $(this).val()) {
                $('#CodigoDiretoria').change();
            }
        });
    },
    limparCombos: function () {

    }
}

var Success = function () {
    $('#btnPesquisar').click();
};

var gerarPdf = function () {
    $('#btnPdf').click(function () {
        if (!$('#form').valid()) return;
        var cdTurma = $('#CodigoTurma').val();
        var cdDisciplina = $('#CodigoDisciplina').val();
        window.open("/Caderno/RegistroAlunoManual?codigoTurma=" + cdTurma + '&' + 'cdDisciplina=' + cdDisciplina, '_self');
    });
}

var validacao = function () {
    $('#form').validate({
        rules: {
            AnoLetivo: { required: true, minlength: 4 },
            CodigoDiretoria: { required: true },
            CodigoEscola: { required: true },
            CodigoTipoEnsino: { required: true },
            CodigoTurma: { required: true },
            CodigoDisciplina: { required: true },
            CodigoSemestre: { required: true }
        },
        messages:
        {
            AnoLetivo: { required: 'Obrigatório', minlength: 'Ano inválido' },
            CodigoDiretoria: { required: 'Obrigatório' },
            CodigoEscola: { required: 'Obrigatório' },
            CodigoTipoEnsino: { required: 'Obrigatório' },
            CodigoTurma: { required: 'Obrigatório' },
            CodigoDisciplina: { required: 'Obrigatório' },
            CodigoSemestre: { required: 'Obrigatório' }

        }
    });
};