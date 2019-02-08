$(document).ready(function () {

    $('#CdDiretoria').autoPreencher($('#CdEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CdEscola').autoPreencher($('#CdTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    $('#CdTipoEnsino').autoPreencher($('#CdTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: 'CdEscola', CodigoTipoEnsino: 'CdTipoEnsino' }]);
    $('#CdTurma').autoPreencher($('#CdDisciplina'), 'Disciplina', 'CarregarListaDisciplinas');

    $('#btnPesquisarDi').click(function (event) {
        event.preventDefault();

        var cdDiretoria = $('#CdDiretoria').val();
        var cdEscola = $('#CdEscola').val();
        var cpf = $('#Cpf').val();

        if (cdDiretoria == '' || cdEscola == '' || cpf == '') {
            alert('É obrigatória a seleção da diretoria, escola e preenchimento do CPF.');
            return;
        }

        $.ajax({
            url: '/AtribuicaoDireta/PesquisarDi',
            type: 'POST',
            dataType: 'html',
            data: { cdDiretoria: cdDiretoria, cdEscola: cdEscola, cpf: cpf },
            success: function (html) {
                $('#listaDi').html(html);
                $('#btnAdicionar').show();
                AplicarMascaras();
            }
        });
    });

    $('#formAdicionarAtribuicao').validate({
        rules: {
            CdDiretoria: 'required',
            CdEscola: 'required',
            CdTipoEnsino: 'required',
            CdTurma: 'required',
            CdDisciplina: 'required',
            Cpf: 'required'
        },
        messages: {
            CdDiretoria: 'Obrigatório',
            CdEscola: 'Obrigatório',
            CdTipoEnsino: 'Obrigatório',
            CdTurma: 'Obrigatório',
            CdDisciplina: 'Obrigatório',
            Cpf: 'Obrigatório'
        }
    });

    AplicarMascaras();

    $('#btnAdicionar').click(function (event) {
        event.preventDefault();

        var selecionouDi = false;

        $('[name=Di]').each(function () {
            if ($(this).prop('checked'))
                selecionouDi = true;
        });

        if (!selecionouDi) {
            alert("É necessária a seleção de ao menos um Di");
            return;
        }

        var form = $('#formAdicionarAtribuicao');

        if (form.valid())
            form.submit();
    });
});

