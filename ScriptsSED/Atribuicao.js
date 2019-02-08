function PesquisarAtribuicao() {
    var url = '/Atribuicao/AtribuicaoParcial';
    var nome = $("#txtNomePesquisa").val();
    var cpf = $("#txtCpfPesquisa").val();
    //var cdTurma = $('#dllTurmaPesquisa').val();
    //var cdDisciplina = $('#dllDisciplinaPesquisa').val();
    var cdEscola = $('#CodigoEscola').val();

    $.ajax({
        url: url,
        type: 'Post',
        data: { nome: nome, cpf: cpf, cdEscola: cdEscola },// cdTurma: cdTurma, cdDisciplina: cdDisciplina,
        success: function (data) {
            $('#dadosAtribuicao').html(data);
            $("#tabelaDados").sedDataTable();
        },
    });
}





$(document).ready(function () {
    //$('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    //$('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    //$('#CodigoTipoEnsino').autoPreencher($('#dllTurmaPesquisa'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "'QuadroAula.Turma.Escola.CD_ESCOLA'", CodigoTipoEnsino: 'CodigoTipoEnsino' }], null, $('#contentPesquisa'));
    //$('#dllTurmaPesquisa').autoPreencher($('#dllDisciplinaPesquisa'), 'Disciplina', 'CarregarListaDisciplinas');

    $('#dllDiretoriaCadastro').autoPreencher($('#dllEscolaCadastro'), 'Escola', 'CarregarListaEscolas');
    $('#dllEscolaCadastro').autoPreencher($('#CodigoTipoEnsinoInserirAtribuicao'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    $('#CodigoTipoEnsinoInserirAtribuicao').autoPreencher($('#dllTurmaCadastro'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "'QuadroAula.Turma.Escola.CD_ESCOLA'", CodigoTipoEnsino: 'CodigoTipoEnsinoInserirAtribuicao' }], null, $('#formInserir'));
    $('#dllTurmaCadastro').autoPreencher($('#dllDisciplinaCadastro'), 'Disciplina', 'CarregarListaDisciplinas');

    //$("#dllDisciplinaCadastro").change(function () {
    //    CarregaDataVigenciaQuadroAula();
    //});
});


//function CarregaDataVigenciaQuadroAula() {
//    if ($("#dllDisciplinaCadastro").val() != "") {
//        $.ajax({
//            url: '/Atribuicao/CarregaPeriodoVigenciaQuadroAula',
//            dataType: 'json',
//            type: 'Post',
//            async: true,
//            data: {
//                cd_disciplina: $("#dllDisciplinaCadastro").val(),
//                cd_turma: $("#dllTurmaCadastro").val()
//            },
//            success: function (data) {

//                $("#txtInicioVigenciaCadastro")
//                .datepicker("option", "minDate", data.DtInicioVigencia)
//                .datepicker("option", "numberOfMonths", 1)
//                .datepicker("option", "onSelect", function (selected) {
//                $("#txtFimVigenciaCadastro").datepicker("option", "minDate", selected);
// });

//                $("#txtFimVigenciaCadastro")
//                    .datepicker("option", "numberOfMonths", 1)
//                        $("#txtFimVigenciaCadastro").datepicker("option", "maxDate", data.DtFimVigencia);
                    

//                $("#txtInicioVigenciaCadastro").val(data.DtInicioVigencia);
//                $("#txtFimVigenciaCadastro").val(data.DtFimVigencia);
//                //$("#txtInicioVigenciaCadastro").datepicker("option", "minDate", new Date(data.DtInicioVigencia));
//                //$("#txtFimVigenciaCadastro").datepicker("option", "maxDate", new Date(data.DtFimVigencia));
//            },
//            error: function () {

//            }
//        });
//    }
//}


function CarregaListaEscola(objeto) {
    var url = '/Atribuicao/CarregaListaEscola';

    $.ajax({
        url: url,
        type: 'Post',
        data: { CodigoDiretoria: objeto[objeto.selectedIndex].value },
        success: function (data) {
            var items = "";
            items += "<option value=''>Selecione a Escola</option>";
            $.each(data, function (i, val) {
                items += "<option value='" + val.CD_ESCOLA + "' title='" + val.NOME_ESCOLA + "'>" + val.NOME_ABREV + "</option>";
            });

            $("select#QuadroAula_Turma_Escola_CD_ESCOLA").empty().html(items);
            $("select#QuadroAula_Turma_CD_TURMA").empty();
            $("select#QuadroAula_CdQuadroAula").empty();
            $("select#professor").empty();
        }
    });
}


function CarregaListaTurma(objeto) {
    var url = '/Atribuicao/CarregaListaTurma';

    $.ajax({
        url: url,
        type: 'Post',
        data: {
            CodigoDiretoria: $("select#QuadroAula_Turma_Escola_Diretoria_CD_DIRETORIA").val(),
            CodigoEscola: objeto[objeto.selectedIndex].value
        },
        success: function (data) {
            var items = "";
            items += "<option value=''>Selecione a Turma</option>";
            $.each(data, function (i, val) {
                items += "<option value='" + val.CD_TURMA + "' title='" + val.DS_TURMA + "'>" + val.DS_TURMA + "</option>";
            });

            $("select#QuadroAula_Turma_CD_TURMA").empty().html(items);
            $("select#QuadroAula_CdQuadroAula").empty();
            $("select#professor").empty();
        }
    });
}


function CarregaListaDisciplina(objeto) {
    var url = '/Atribuicao/CarregaListaDisciplina';

    $.ajax({
        url: url,
        type: 'Post',
        data: {
            CodigoTurma: $("#QuadroAula_Turma_CD_TURMA").val()
        },
        success: function (data) {
            var items = "";
            items += "<option value=''>Selecione a Disciplina</option>";
            $.each(data, function (i, val) {
                items += "<option cdQuadroAula = '" + val.cdQuadroAula + "' value='" + val.cdQuadroAula + "' title='" + val.NOME_DISCIPLINA + "'>" + val.NOME_DISCIPLINA + "</option>";
            });

            $("select#QuadroAula_CdQuadroAula").empty().html(items);
            $("select#professor").empty();
        }
    });
}


function CarregaListaProfessor(objeto) {
    var url = '/Atribuicao/CarregaListaProfessor';

    $.ajax({
        url: url,
        type: 'Post',
        data: {
            CodigoDisciplina: objeto[objeto.selectedIndex].value,
            CodigoDiretoria: $("select#QuadroAula_Turma_Escola_Diretoria_CD_DIRETORIA").val(),
            CodigoEscola: $("select#QuadroAula_Turma_Escola_CD_ESCOLA").val(),
            CodigoTurma: $("select#QuadroAula_Turma_CD_TURMA").val()
        },
        success: function (data) {
            var items = "";
            items += "<option value=''>Selecione o Professor</option>";
            $.each(data, function (i, val) {
                items += "<option value='" + val.NR_INSCRICAO + "' title='" + val.NM_DOCENTE + "'>" + val.NM_DOCENTE + "</option>";
            });

            $("select#professor").empty().html(items);
        }
    });
}


$(document).ready(function () {

    AplicarMascaras();

    $(".cpf").VerificaNumero();
    $(".di").VerificaNumero();
    $(".hora").VerificaNumero();

    //$("#btnConfirmarInclusao").click(function () {

    //    $().ready(function () {
    //        if ($('.central_mensagem:visible').attr('id') == undefined) {
    //            GravarAtribuicao();
    //        }
    //        else
    //            $('.central_mensagem:visible button').click(function () {
    //                GravarAtribuicao();
    //            });
    //    });

    //});


    //function GravarAtribuicao() {
    //    if ($(".form").valid()) {
    //        var url = '/Atribuicao/ConfirmarInclusao';
    //        var di = $("#txtDi").val();
    //        var cpf = $("#txtCpf").val();
    //        var dtInicioVigencia = $("#txtDtInicioVigencia").val();
    //        var dtFimVigencia = $("#txtDtFimVigencia").val();
    //        var cdTipoAtribuicao = $('select#TipoAtribuicao').val();
    //        var cdQuadroAula = $("#QuadroAula_CdQuadroAula").val;

    //        $.ajax({
    //            url: url,
    //            type: 'post',
    //            data: { di: di, cpf: cpf, dtInicioVigencia: dtInicioVigencia, dtFimVigencia: dtFimVigencia, cdTipoAtribuicao: cdTipoAtribuicao, cdQuadroAula: cdQuadroAula },
    //            success: function () {
    //                $("#txtDi").val('');
    //                $("#txtCpf").val('');
    //                $("#txtDtInicioVigencia").val('');
    //                $("#txtDtFimVigencia").val('');
    //                $("#QuadroAula_Turma_Escola_Diretoria_CD_DIRETORIA").val('1');
    //                $("#QuadroAula_Turma_Escola_Diretoria_CD_DIRETORIA").val('0');
    //            }
    //        });
    //    }
    //}


    $("#DataPrevistaI").datepicker({
        numberOfMonths: 1,
        onSelect: function (selected) {
            $("#DataPrevistaI").datepicker("option", "minDate", dataAtual);
            $("#DataPrevistaF").datepicker("option", "minDate", dataAtual);
            $("#DataRealizacaoI").datepicker("option", "minDate", dataAtual);
            $("#DataRealizacaoF").datepicker("option", "minDate", dataAtual);
        }
    });


    $(function () {
        var dataAtual = new Date();
        $("#DtInicioVigencia").datepicker({
            numberOfMonths: 1,
            onSelect: function (selected) {
                $("#DtInicioVigencia").datepicker("option", "minDate", dataAtual);
            }

        });

        $("#DtFimVigencia").datepicker({
            numberOfMonths: 1,

        });

        $("#txtDtInicioVigencia").datepicker({
            numberOfMonths: 1,

        });
        $("#txtDtFimVigencia").datepicker({
            numberOfMonths: 1,
        });
    });
});