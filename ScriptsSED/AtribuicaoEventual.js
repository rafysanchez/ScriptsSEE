function Cadastrar() {
    $.ajax({
        cache: false,
        url: "/AtribuicaoEventual/Cadastrar",
        type: 'GET',
        data: {
        },
        success: function (data) {
            $('#Cadastro').empty().html(data);

            $('#Cadastro').find('#CodigoDiretoria').autoPreencher($('#Cadastro').find('#CodigoEscola'), 'Escola', 'CarregarListaEscolas', null, null, $('#Cadastro'));
            $('#Cadastro').find('#CodigoEscola').autoPreencher($('#Cadastro').find('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', null, null, $('#Cadastro'));
            $('#Cadastro').find('#CodigoTipoEnsino').autoPreencher($('#Cadastro').find('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino', 'AnoLetivo'], null, $('#Cadastro'));
            $('#Cadastro').find('#CodigoTurma').autoPreencher($('#Cadastro').find('#CodigoDisciplina'), 'Disciplina', "CarregarListaDisciplinas", null, null, $('#Cadastro'));
            AplicarMascaras();

            $('#Cadastro').dialog({
                width: 850,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top"
            });
        }
    });
}

function BuscarProfessor() {
    if ($('#CpfProfessor').val().length > 0) {
        $.ajax({
            cache: false,
            url: "/AtribuicaoEventual/BuscarProfessor",
            type: 'POST',
            data: {
                CpfProfessor: $('#CpfProfessor').val()
            },
            success: function (data) {
                $('#ListaProfessor').empty().html(data);
            }
        });
    }
}