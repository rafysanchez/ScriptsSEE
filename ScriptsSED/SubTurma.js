$(document).ready(function () {
    AplicarMascaras();
    //$('#turma-dialog').dialog({
    //    autoOpen: false,
    //    //title: '',
    //    position: ['middle', 'top'],
    //    width: 820,
    //    resizable: false,
    //    modal: true,
    //    dragable: false,
    //    show: {
    //        effect: "blind",
    //        duration: 200
    //    }
    //});

    //$('#subturma-dialog').dialog({
    //    autoOpen: false,
    //    //title: '',
    //    position: ['middle', 'top'],
    //    width: 820,
    //    resizable: false,
    //    modal: true,
    //    dragable: false,
    //    show: {
    //        effect: "blind",
    //        duration: 200
    //    }
    //});

    $('#frmFiltro').validate({
        rules: {
            "Turma.DT_ANO_LETIVO": { required: true },
            "Turma.Escola.CD_DIRETORIA": { required: true },
            "Turma.Escola.CD_ESCOLA": { required: true }
        }
    });

    $('#Turma_DT_ANO_LETIVO').verificarAnoLetivo($('#Turma_Escola_CD_DIRETORIA'), 'Diretoria', 'CarregarListaDiretorias');
    $('#Turma_Escola_CD_DIRETORIA').autoPreencher($('#Turma_Escola_CD_ESCOLA'), 'Escola', 'CarregarListaEscolas');
    $('#Turma_Escola_CD_ESCOLA').autoPreencher($('#Turma_CD_TIPO_ENSINO'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: "'Turma.Escola.CD_ESCOLA'", AnoLetivo: "'Turma.DT_ANO_LETIVO'" }]);
    $('#Turma_CD_TIPO_ENSINO').autoPreencher($('#Turma_CD_TURMA'), 'Turma', 'CarregarListaTurmaIntegralPorTipoEnsino', [{ CodigoEscola: "'Turma.Escola.CD_ESCOLA'", CodigoTipoEnsino: "'Turma.CD_TIPO_ENSINO'", AnoLetivo: "'Turma.DT_ANO_LETIVO'" }]);
    $('#Turma_CD_TURMA').autoPreencher($('#Turma_SubTurma_Codigo'), 'SubTurma', 'CarregarListaSubTurma', [{ CodigoTurma: "'Turma.CD_TURMA'" }]);
});

function fct_PesquisarEscolas() {
    if ($('#frmFiltro').valid() == true) {
        $('#pesquisaGV').load("/SubTurma/Pesquisar/", $("#frmFiltro").serialize(), function (data) {
            $('#pesquisaGV').html(data);
            $('#turmas').sedDataTable({
                columnDefs: [
			        { targets: [3, 4], orderable: false },
                ],
                nomeExportacao: "Lista de Turmas",
            });
        });
    }
}

function fct_EditarTurma(codigo) {
    $("#turma-dialog").html("")
        .load('/SubTurma/EditarTurma/' + codigo, function () {
            $("#turma-dialog").dialog({ title: "Edição de Subturmas" }); $('#subturmas').sedDataTable({
                columnDefs: [
                                { targets: [1, 2, 3], orderable: false },
                ], nomeExportacao: "Lista de Subturmas",
            });
        });
}

function fct_DetalharTurma(codigo) {
    $("#turma-dialog").html("")
        .load('/SubTurma/DetalharTurma/' + codigo, function () {
            $("#turma-dialog").dialog({ title: "Visualização de Subturmas" }); $('#subturmas').sedDataTable({
                columnDefs: [
                        { targets: [1], orderable: false },
                ], nomeExportacao: "Lista de Subturmas",
            });
        });
}


function mensagemAlerta(mensagem) {
    Mensagem.Alert({
        titulo: "Aviso",
        mensagem: mensagem,
        tipo: "Aviso",
        botao: "Fechar"
    });
}

function fct_Cadastrar(codigo) {

    var ano = $('#Turma_DT_ANO_LETIVO').val();
    var diretoria = $('#Turma_Escola_CD_DIRETORIA').val();
    var escola = $('#Turma_Escola_CD_ESCOLA').val();
    var tipoEnsino = $('#Turma_CD_TIPO_ENSINO').val();
    var turma = $('#Turma_CD_TURMA').val();

    if (diretoria == "") {
        mensagemAlerta("Selecione a diretoria");
        return;
    }
    if (escola == "") {
        mensagemAlerta("Selecione a escola");
        return;
    }
    if (tipoEnsino == "") {
        mensagemAlerta("Selecione o tipo de ensino");
        return;
    }
    if (turma == "") {
        mensagemAlerta("Selecione a turma");
        return;
    }
    
    $("#subturma-dialog").html("")
        .load('/SubTurma/Cadastrar/' + turma, function () { $("#subturma-dialog").dialog({ title: "Cadastro de Subturma" }); $('#alunos').sedDataTable({ nomeExportacao: "Lista de Alunos" }); });
}


function fct_Editar(codigo) {
    $("#subturma-dialog").html("")
        .dialog()
        .load('/SubTurma/Editar/' + codigo, function () { $("#subturma-dialog").dialog("open"); $('#alunos').sedDataTable(); });
}

function fct_Detalhar(codigo) {
    $("#subturma-dialog").html("")
        .dialog()
        .load('/SubTurma/Detalhar/' + codigo, function () { $("#subturma-dialog").dialog("open"); $('#alunos').sedDataTable(); });
}

function fct_Excluir(codigo) {
    Mensagem.Alert({
        titulo: "Exclusão",
        mensagem: "Deseja excluir esta subturma?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        cache: false,
                        url: '/SubTurma/Excluir/' + codigo,
                        type: 'POST',
                        data: { codigoTurma: $('#Turma_CD_TURMA').val() },
                        datatype: 'HTML',
                        success: function (data) {
                            $('#subturmasGV').html(data);
                            $('#subturmas').sedDataTable();

                            fct_PesquisarEscolas();
                        }
                    });
                }
            },
            {
                botao: "Não"
            }
        ]
    });
}

var quantidade = 5;

jQuery.validator.addMethod("alunos", function (value, element, param) {
    return $("input[id=Alunos]:checked").size() > 0;
}, "Escolha ao menos um Aluno.");

function fct_Salvar() {
    if ($("#frmSubTurma").validate().form()) {
        $.ajax({
            cache: false,
            url: '/SubTurma/Salvar/',
            type: 'POST',
            datatype: 'HTML',
            data: $("#frmSubTurma").serialize(),
            success: function (data) {
                $('#subturmasGV').html(data);
                $('#subturmas').sedDataTable();

                fct_PesquisarEscolas();

                $("#subturma-dialog").dialog("close");
            }
        });
    }
}