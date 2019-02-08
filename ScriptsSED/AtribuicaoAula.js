var _cpf;
var _qtdeAulasPaa = 19; // Recebe a quantidade de Aulas PAA's permitidas.

$(document).ready(function () {
    AplicarMascaras();
    $('#ddlDiretoriaPesquisar').autoPreencher($('#ddlEscolaPesquisar'), 'Escola', 'CarregarListaEscolas');

    $('#btnInserirAssociacaoVisaoClasse').click(function () {

        if (!$('#formAssociacaoVisaoClasse').valid()) return;

        var cdDiretoria = $('#formAssociacaoVisaoClasse #filtroaba4-diretoria').val();
        var cdEscola = $('#formAssociacaoVisaoClasse #filtroaba4-escola').val();
        var cpf = $('#formAssociacaoVisaoClasse #cboProfessor').val();
        var nome = $('#formAssociacaoVisaoClasse #cboProfessor :selected').text();
        var flSituacao = "A";
        var di = $('#formAssociacaoVisaoClasse #cboDi').val();

        abrirFormAtribuicaoAtpc(cdDiretoria, cdEscola, cpf, di, nome, flSituacao);
    });

    $('#btnPesquisarAssociacaoVisaoClasse').click(function () {

        if (!$('#formAssociacaoVisaoClasse').valid()) return;

        var params = {
            cdDiretoria: $('#formAssociacaoVisaoClasse #filtroaba4-diretoria').val(),
            cdEscola: $('#formAssociacaoVisaoClasse #filtroaba4-escola').val(),
            cpf: $('#formAssociacaoVisaoClasse #cboProfessor').val(),
            di: $('#formAssociacaoVisaoClasse #cboDi').val(),
            anoLetivo: $('#formAssociacaoVisaoClasse #filtroaba4-anoLetivo').val()
        };

        $.post('/AtribuicaoAula/PesquisarAtpc', params, function (data) {
            $('#divPesquisaAtpc').empty().html(data);
            deletarAtcpAssociacao();
            listarAtcpAssociacaoProfessor();
            triggerEditarAulaAtpc();
            $("#PesquisaAtpc").sedDataTable({
                nomeExportacao: "Pesquisa ATPC",
                columnDefs: [
                     { targets: [8, 9], orderable: false },
                ]
            });
        });
    });

    $('#btnPesquisar').click(function () {
        var form = $('#formIndex');
        if (form.valid())
            form.submit();
    });

    $('#btnCadastrarAtribuicao').click(function () {
        $.ajax({
            url: '/AtribuicaoAula/Inserir',
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                $('#modalInserir')[0].innerHTML = data;
                $('#modalInserir').dialog({
                    modal: true,
                    width: 810,
                    position: ['center', 0],
                    close: function () {
                        //$('#modalInserir').html('');
                        //$('#modalInserir').dialog('close');
                    }
                });
                validacoes();
                FuncoesTile();

                // VERIFICAR NECESSIDADE
                AplicarMascaras();

                // VERIFICAR NECESSIDADE
                validacoes();

                $('#ddlDiretoriaCadastro').autoPreencher($('#ddlEscolaCadastro'), 'Escola', 'CarregarListaEscolas');
                $("#ddlEscolaCadastro").change(function () {
                    if ($(this).val() != 0)
                        $("div#cpf").fadeIn("slow");
                });

                $('#btnPesquisarCpf').click(function (event) {


                    var cdDiretoria = $('#ddlDiretoriaCadastro').val();
                    var cdEscola = $('#ddlEscolaCadastro').val();
                    var cpf = $('#txtCpfCadastro').val();

                    visualizarDis(cdDiretoria, cdEscola, cpf);
                });
            }
        });
    });


    //------------------------------------- ATRIBUICAO PAA --------------------------------------------------//

    var deletarAtcpAssociacao = function () {
        $('.deletarAssociacaoAtpc').click(function () {
            var cdAtrib = $(this).find('#hdnCdAssociacao').val()

            $("#divConfirmDeletarAtpc").dialog({
                resizable: false,
                height: 168,
                title: 'Exclusão de ATPC',
                modal: true,
                buttons: {
                    "Sim": function () {
                        $.post('/AtribuicaoAula/ExcluirAtribuicaoAtpc', { cdAtribuicao: cdAtrib }, function (data) {
                            if (data.Sucesso) {
                                $('#btnPesquisarAssociacaoVisaoClasse').click();
                                Mensagem.Alert({
                                    titulo: "Associação",
                                    mensagem: 'Registro excluído com sucesso!',
                                    tipo: "Sucesso",
                                    botao: "Fechar"
                                });
                            }
                            $("#divConfirmDeletarAtpc").dialog('close');
                        });
                    },
                    'Cancelar': function () {
                        $("#divConfirmDeletarAtpc").dialog('close');
                    }
                },
                close: function () {
                    //("#divConfirmDeletarAtpc").dialog('close');
                }
            });
        });

    };

    var listarAtcpAssociacaoProfessor = function () {
        $('.visualizarAssociacaoAtpc').click(function () {
            $.post('/AtribuicaoAula/ListarAssociacaoAtpcProfessor', { cpf: $(this).find('#hdnCdAssociacao').val(), anoLetivo: $('#formAssociacaoVisaoClasse #filtroaba4-anoLetivo').val() }, function (data) {

                $('#divListarAspcProfAssociacao').dialog({
                    title: "ATPCS",
                    width: 600,
                    position: ['center', 0]

                }).empty().html(data);
            });
        });

    };

    $("#tblHorasPAA tbody tr td i").on("click", function () {
        $(this).parent().parent().parent().remove();

        if ($('#tblHorasPAA tbody tr').length == 0) {

            $("#tblHorasPAA tbody").append(
                '<tr class="semResultado">'
                    + '<td colspan="7">Não há horários de PAA cadastrados</td>'
                + '</tr>'
            );
        }
        else {

            /* Ajuste do Número da Linha */
            fct_AtualizaLinhasTabela();

        }

        /* Atualiza os Indices dos Inputs da Tabela */
        fct_AtualizaInputsTabela();

        /* Verifica a Quantidade de Registros Inseridos na Tabela */
        fct_QuantidadeAulasPaa();
    });


});






function visualizarDis(cdDiretoria, cdEscola, cpf) {
    if (cdDiretoria == '' || cdEscola == '' || cpf == '') {
        alert('É obrigatória a seleção da diretoria, escola e preenchimento do CPF.');
        return;
    }

    $.ajax({
        url: '/AtribuicaoAula/PesquisarDi',
        type: 'POST',
        dataType: 'html',
        data: { cdDiretoria: cdDiretoria, cdEscola: cdEscola, cpf: cpf },
        success: function (html) {
            $("#resultadoPesquisaCpf").show().html(html);
            $("#resultadoPesquisaTile").hide();
            AplicarMascaras();
            fct_ListarAtribuicoes(cdDiretoria, cdEscola, cpf);
        }
    });
}

var element = null;
function visualizarAtribuicoes(elem) {
    element = elem;
    var td = elem.parent();
    var cpf = td.find('.selNumeroCpf').val();
    var cdDiretoria = td.find('.selCdDiretoria').val();
    var cdEscola = td.find('.selCdEscola').val();
    var di = td.find('.selDi').val();
    var anoLetivo = td.find('.selAnoLetivo').val();

    $.ajax({
        url: '/AtribuicaoAula/VisualizarAtribuicoes',
        type: 'POST',
        dataType: 'html',
        data: { cdDiretoria: cdDiretoria, cdEscola: cdEscola, cpf: cpf, di: di, AnoLetivo: anoLetivo },
        success: function (data) {
            $('#modalVisualizar').html(data).dialog({
                modal: true,
                width: 810,
                position: ['center', 0],
                close: function () {
                    element = null;
                    //$('#modalVisualizar').html('');
                    //$('#modalVisualizar').dialog('close');
                },

            });

            AplicarMascaras();
            triggerEditarAtribuicao();
            triggerExcluirAtribuicao();
            triggerEditarAtribuicaoAtpc();
            triggerExcluirAtribuicaoAtpc();
            triggerEditarAulaAtpc();

            if (flag) {
                HabilitarEdicao();
                flag = false;
            } else {
                $('.selInserirAtribuicao, .selEdicao, .selExclusao').hide();
            }

        }
    });
}

function visualizarHistoricoAtribuicoes(elem) {
    var td = elem.parent();
    var anoLetivo = td.find('.selAnoLetivo').val();
    var nome = td.find('.selNome').val();
    var cpf = td.find('.selNumeroCpf').val();
    var cdDiretoria = td.find('.selCdDiretoria').val();
    var cdEscola = td.find('.selCdEscola').val();
    var outrasEscolas = td.find('.selOutrasEscolas').val() == 0 ? 'false' : 'true';
    var exportaExcel = elem.val() == 'EXCEL' ? 1 : 0;
    //var outrasEscolas = td.find('.selOutrasEscolas').val();

    if (exportaExcel == 0) {
        $.ajax({
            url: '../../Relatorios/AtribuicaoRel/RelatorioHistoricoAtribuicoes',
            type: 'POST',
            dataType: 'html',
            data: { cdDiretoria: cdDiretoria, cdEscola: cdEscola, cpf: cpf, nome: nome, outrasEscolas: outrasEscolas, anoLetivo: anoLetivo, exportaExcel: exportaExcel },
            success: function (data) {
                $('#exportPDF').html(data);

                //dt = $('#tbAtribuicao').DataTable();                                      

                var config = {
                    pageOrientation: "portrait",
                    pageSize: "A4",
                    pageMargins: [10, 10, 10, 10],
                    title: "Relatório do Histórico de Atribuições"
                };

                sedPdfExporter.normalizeConfig(config);

                config.txtINrCpf = $("#txtCPF").text();
                config.txtINrRg = $("#txtRG").text();
                config.txtINome = $("#txtNome").text();

                var tblRelatorioTd = $('#tbAtribuicao tr:has(td)').map(function (i, v) {
                    var $td = $('td', this);
                    return {
                        DI: $td.eq(0).text(),
                        TipoAtribuicao: $td.eq(1).text(),
                        Escola: $td.eq(2).text(),
                        Diretoria: $td.eq(3).text(),
                        Fase: $td.eq(4).text(),
                        TipoEnsino: $td.eq(5).text(),
                        Turma: $td.eq(6).text(),
                        Disciplina: $td.eq(7).text(),
                        AulaSemana: $td.eq(8).text(),
                        IniVig: $td.eq(9).text(),
                        FimVig: $td.eq(10).text(),
                        Excluida: $td.eq(11).text(),
                        Substituicao: $td.eq(12).text(),
                        Inclusao: $td.eq(13).text(),
                        Alteracao: $td.eq(14).text()
                    }
                }).get();

                var tblRelatorioTh = $('#tbAtribuicao tr:has(th)').map(function (i, v) {
                    var $td = $('th', this);
                    return {
                        zero: $td.eq(0).text(),
                        um: $td.eq(1).text(),
                        dois: $td.eq(2).text(),
                        tres: $td.eq(3).text(),
                        quatro: $td.eq(4).text(),
                        cinco: $td.eq(5).text(),
                        seis: $td.eq(6).text(),
                        sete: $td.eq(7).text(),
                        oito: $td.eq(8).text(),
                        nove: $td.eq(9).text(),
                        dez: $td.eq(10).text(),
                        onze: $td.eq(11).text(),
                        doze: $td.eq(12).text(),
                        treze: $td.eq(13).text(),
                        quatorze: $td.eq(14).text()
                    }
                }).get();

                var tabelaRelatorio = [];
                tabelaRelatorio.push([{ text: 'Di', fillColor: '#ededed' }, { text: 'Tipo Atrib.', fillColor: '#ededed' }, { text: 'Escola', fillColor: '#ededed' }, { text: 'Diretoria', fillColor: '#ededed' }, { text: 'Fase', fillColor: '#ededed' }, { text: 'Tipo de Ensino', fillColor: '#ededed' }, { text: 'Turma', fillColor: '#ededed' }, { text: 'Disciplina', fillColor: '#ededed' }, { text: 'Hora Aula', fillColor: '#ededed' }, { text: 'Início Vigência', fillColor: '#ededed' }, { text: 'Fim Vigência', fillColor: '#ededed' }, { text: 'Excluída', fillColor: '#ededed' }, { text: 'Subst.', fillColor: '#ededed' }, { text: 'Data de Inclusão', fillColor: '#ededed' }, { text: 'Data de Alteração', fillColor: '#ededed' }]);

                for (var a = 0; a < tblRelatorioTd.length; a++)
                    tabelaRelatorio.push([{ text: tblRelatorioTd[a].DI }, { text: tblRelatorioTd[a].TipoAtribuicao }, { text: tblRelatorioTd[a].Escola }, { text: tblRelatorioTd[a].Diretoria }, { text: tblRelatorioTd[a].Fase }, { text: tblRelatorioTd[a].TipoEnsino }, { text: tblRelatorioTd[a].Turma }, { text: tblRelatorioTd[a].Disciplina }, { text: tblRelatorioTd[a].AulaSemana }, { text: tblRelatorioTd[a].IniVig }, { text: tblRelatorioTd[a].FimVig }, { text: tblRelatorioTd[a].Excluida }, { text: tblRelatorioTd[a].Substituicao }, { text: tblRelatorioTd[a].Inclusao }, { text: tblRelatorioTd[a].Alteracao }]);

                for (var z = 0; z < tblRelatorioTh.length; z++)
                    if (z == 1)
                        tabelaRelatorio.push([{ fillColor: '#ededed', text: tblRelatorioTh[1].zero }, { fillColor: '#ededed', text: tblRelatorioTh[1].um }, { fillColor: '#ededed', text: tblRelatorioTh[1].dois }, { fillColor: '#ededed', text: tblRelatorioTh[1].tres }, { fillColor: '#ededed', text: tblRelatorioTh[1].quatro }, { fillColor: '#ededed', text: tblRelatorioTh[1].cinco }, { fillColor: '#ededed', text: tblRelatorioTh[1].seis }, { fillColor: '#ededed', text: tblRelatorioTh[1].sete }, { fillColor: '#ededed', text: tblRelatorioTh[1].oito }, { fillColor: '#ededed', text: tblRelatorioTh[1].nove }, { fillColor: '#ededed', text: tblRelatorioTh[1].dez }, { fillColor: '#ededed', text: tblRelatorioTh[1].onze }, { fillColor: '#ededed', text: tblRelatorioTh[1].doze }, { fillColor: '#ededed', text: tblRelatorioTh[1].treze }, { fillColor: '#ededed', text: tblRelatorioTh[1].quatorze }]);

                config.tabelaRelatorio = tabelaRelatorio;

                config.docGenerator = function (config) {
                    var doc = {
                        pageMargins: [0, 100, 10, 10],
                        header: config.sedHeader,
                        footer: config.sedFooter,
                        content: [
                            {
                                margin: [10, 0, 0, 5],
                                text: "Relatório do Histórico de Atribuições", alignment: 'center', decoration: 'underline', bold: true
                            },
                            {
                                style: 'tableExample',
                                margin: [10, 0, 0, 0],
                                fontSize: 10,
                                stack: [
                                    {
                                        margin: [0, 0, 0, 5],
                                        text: [{ text: "Nome: ", bold: true }, { text: config.txtINome }]
                                    },
                                    {
                                        margin: [0, 0, 0, 5],
                                        text: [{ text: "CPF: ", bold: true }, { text: config.txtINrCpf }]
                                    },
                                    {
                                        margin: [0, 0, 0, 5],
                                        text: [{ text: "RG: ", bold: true }, { text: config.txtINrRg }]
                                    }
                                ]
                            },
                            {
                                style: 'tableExample',
                                margin: [5, 0, 0, 0],
                                fontSize: 7,
                                alignment: 'center',
                                table: {
                                    widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                                    body: config.tabelaRelatorio
                                }
                            }
                        ]
                    }

                    return doc;
                };

                sedPdfExporter.exportPdf(config);
            }
        });
    }
    else {
        var url = '/Relatorios/AtribuicaoRel/GerarExcel?';
        var params = "nome=" + nome + "&cpf=" + cpf + "&cdEscola=" + cdEscola + "&cdDiretoria=" + cdDiretoria + "&outrasEscolas=" + outrasEscolas + "&anoLetivo=" + anoLetivo;
        window.open(url + params);
    }
}

function GerarPdf(cpf) {

    window.open('/AtribuicaoAula/GerarPdf?cpfProfessor=' + cpf, '_self');

}

function fct_ListarAtribuicoes(cdDiretoria, cdEscola, cpf) {
    $.ajax({
        url: '/AtribuicaoAula/PesquisarAtribuicoes',
        type: 'POST',
        dataType: 'html',
        data: { cdDiretoria: cdDiretoria, cdEscola: cdEscola, cpf: cpf },
        success: function (data) {
            $('#ListaAtribuicoes').html(data);
            $('#tbAtribuicoes').find('.selEdicao').hide();
            $('#tbAtribuicoes').find('.selExclusao').hide();
            fct_ListarAtribuicoesAtpc(cdDiretoria, cdEscola, cpf);
        }
    });
}

function fct_ListarAtribuicoesAtpc(cdDiretoria, cdEscola, cpf) {
    $.ajax({
        url: '/AtribuicaoAula/PesquisarAtribuicoesAtpc',
        type: 'POST',
        dataType: 'html',
        data: { cdDiretoria: cdDiretoria, cdEscola: cdEscola, cpf: cpf },
        success: function (data) {
            $('#ListaAtribuicoesAtpc').html(data);
            $('#tbAtribuicoesAtpc').find('.selEdicao').hide();
            $('#tbAtribuicoesAtpc').find('.selExclusao').hide();
        }
    });
}

function renderPesquisa(data) {
    $('#resultadosPesquisa').html(data);
    $('#tblAtribuicoes').sedDataTable();

    $('#resultadosPesquisa').find('.cpf').mask('000.000.000-00');
}

function FuncoesTile() {
    $("#btnPesquisarProfessoresTile").click(function () {
        var codigoDiretoria = $("#ddlDiretoriaCadastro option:selected").val();
        var codigoEscola = $("#ddlEscolaCadastro option:selected").val();

        if (codigoDiretoria == "" || codigoEscola == "") {
            alert('É necessário primeiro selecionar uma Diretoria e uma Escola.');
            return;
        }

        $('#professoresTile').dialog({
            modal: true,
            width: 810,
            position: ['center', 0],
            show: {
                //effect: "slide",
                duration: 500,
                position: { top: 500 },
            },
            hide: {
                //effect: "fold",
                duration: 500
            },
            close: function () {
                //$('#professoresTile').dialog('close');
            }
        });
    });

    $(".tile").unbind('click').click(function () {
        var letraInicial = $(this).text();
        var codigoEscola = $("#ddlEscolaCadastro option:selected").val();
        var codigoDiretoria = $("#ddlDiretoriaCadastro option:selected").val();

        $.ajax({
            url: "/AtribuicaoAula/ResultadoPesquisa",
            type: "POST",
            dataType: 'html',
            data: { letraInicial: letraInicial, codigoEscola: codigoEscola, codigoDiretoria: codigoDiretoria },
            success: function (data) {
                $('#resultadoPesquisaCpf').hide();
                $("#resultadoPesquisaTile").show().html(data);
                $("#professoresTile").dialog('close');
            }
        });
    });
}

function validacoes() {
    $('#formAdicionarAtribuicao').validate({
        rules: {
            CdTipoEnsino: 'required',
            CdTurma: 'required',
            CdDisciplina: 'required',
            DtInicioVigencia: 'required',
            DtFimVigencia: 'required'
        },
        messages: {
            CdTipoEnsino: 'Obrigatório',
            CdTurma: 'Obrigatório',
            CdDisciplina: 'Obrigatório',
            DtInicioVigencia: 'Obrigatório',
            DtFimVigencia: 'Obrigatório'
        }
    });

    $('#formAdicionarEditarAula').validate({
        rules: {
            ddlDiaDaSemanaAula: 'required',
            HoraDeInicioDasAulas: { required: true },
            HoraDeFimDasAulas: { required: true },
            DtInicioVigencia: 'required',
            DtFimVigencia: 'required'
        },
        messages: {
            DiaDaSemana: 'Obrigatório',
            HoraDeInicioDasAulas: 'Obrigatório',
            HoraDeFimDasAulas: 'Obrigatório',
            DtInicioVigencia: 'Obrigatório',
            DtFimVigencia: 'Obrigatório'
        }
    });
}

function alterarAtribuicao() {
    if (!$('#FormListarEditarAtribuicaoAulA').valid())
        return;

    var objAtribuicaoAula = {
        CdAtribuicao: $('.selCdAtribuicao').val(),
        DtInicioVigencia: $('#DtInicioVigenciaEditar').val(),
        DtFimVigencia: $('#DtFimVigenciaEditar').val(),
        Cpf: $('#txtCpf').val(),
        Di: $('.selDi').val(),
        CdDisciplina: $('#ddlDisciplinaCadastro').val(),
        CdTurma: $('#ddlTurmaCadastro').val(),
        'SubTurma.Codigo': $('#ddlSubTurmaCadastro').val(),
        Tp_Atrib: $('#ddlTpAtrib').val()
    };

    $.post('/AtribuicaoAula/EditarAtribuicao', objAtribuicaoAula);
}

function fct_CarregarSubTurmas(turma) {
    var select = $("#cboSubTurma");
    select.empty();
    select.append(new Option("Selecione...", "", true, true));

    if (turma > 0) {
        $.getJSON('/AtribuicaoAula/SubTurmas', { turma: turma }, function (myData) {
            fct_ValidarSubTurma(myData.length);

            $.each(myData, function (index, itemData) {
                select.append($('<option/>', {
                    value: itemData.Value,
                    text: itemData.Text
                }));
            });
        });
    }
}

function fct_ValidarSubTurma(quantidade) {
    if (quantidade > 0) {
        $("#sub_turma").show();
    } else {
        $("#sub_turma").hide();
    }
}


var flag = false;
function abrirFormAtribuicao(cdDiretoria, cdEscola, cpf, di, nome, flSituacao) {
    $.ajax({
        url: '/AtribuicaoAula/ViewAdicionarAtribuicao',
        type: 'POST',
        data: { cdDiretoria: cdDiretoria, cdEscola: cdEscola, cpf: cpf, di: di, nome: nome, flSituacao: flSituacao },
        success: function (html) {
            $('#formAtribuicao').html(html).dialog({
                modal: true,
                draggable: false,
                width: 685,
                position: ['center', 0],
                close: function () {
                    if (element == null) {
                        PesquisarDi(cdDiretoria, cdEscola, cpf, di, nome, flSituacao);
                    } else {
                        visualizarAtribuicoes(element);
                        flag = true;
                    }
                    //$('#formAtribuicao').html('');
                    //$('#formAtribuicao').dialog('close');

                }
            });

            AplicarMascaras();

            $('#ddlTipoEnsinoCadastro').autoPreencher($('#ddlTurmaCadastro'), 'Turma', 'CarregarListaTurmaPorTpAtribuicao', [{ CodigoEscola: 'CdEscola', CodigoTipoEnsino: 'CdTipoEnsino', TpAtribuicao: 'Tp_atrib' }], null, $('#formAtribuicao'));
            $('#ddlTurmaCadastro').autoPreencher($('#ddlDisciplinaCadastro'), 'Disciplina', 'CarregarListaDisciplinas');

            $('#ddlTpAtrib').change(function () {
                switch ($(this).val()) {
                    case "3":
                    case "4":
                        $('.selCamposAtribuicao').hide();
                        $('#divCamposAtribuicaoPaa').hide();
                        $('#divCadastrarAtribuicaoPAA').hide();

                        $('.selCamposAtribuicao select').each(function () {
                            $(this).find('option:first').prop('selected', true);
                        });

                        $('#divCamposAtribuicaoPaa select').each(function () {
                            $(this).find('option:first').prop('selected', true);
                        });

                        $('#fieldsetListaDeAula').show();
                        break;

                    case "6":
                        $('.selCamposAtribuicao').hide();
                        $('#fieldsetListaDeAula').hide();

                        $('.selCamposAtribuicao select').each(function () {
                            $(this).find('option:first').prop('selected', true);
                        });

                        $('#divCamposAtribuicaoPaa select').each(function () {
                            $(this).find('option:first').prop('selected', true);
                        });

                        $('#divCamposAtribuicaoPaa').show();
                        $('#divCadastrarAtribuicaoPAA').show();
                        $('#ddlTipoEnsinoCadastro').show();

                        var currentYear = (new Date).getFullYear();

                        $('#DtInicioVigenciaInserir').datepicker("option", "yearRange", currentYear + ":" + currentYear);
                        $('#DtFimVigenciaInserir').datepicker("option", "yearRange", currentYear + ":" + currentYear);

                        fct_CarregarTurnoPaa(cdEscola);
                        break;

                    default:
                        $('.selCamposAtribuicao').show();
                        $('#fieldsetListaDeAula').show();
                        $('#divCamposAtribuicaoPaa').hide();
                        $('#divCadastrarAtribuicaoPAA').hide();
                        break;
                }
                $('#ddlTipoEnsinoCadastro').val('');
                $("#ddlTipoEnsinoCadastro").trigger("change");
                //var select = $("#ddlTurmaCadastro");
                //select.empty();
                //select.append(new Option("Selecione...", "", true, true));

                //$.getJSON('/Turma/CarregarListaTurmaPorTpAtribuicao', { CodigoEscola: $("CdEscola").val(), CodigoTipoEnsino: $("#CdTipoEnsino").val(), TpAtribuicao: $(this).val() }, function (myData) {
                //    $.each(myData, function (index, itemData) {
                //        select.append($('<option/>', {
                //            value: itemData.Value,
                //            text: itemData.Text
                //        }));
                //    });
                //});
            });

            $("#DtInicioVigenciaInserir")
                .datepicker("option", "numberOfMonths", 1)
                .datepicker('setDate', null);

            $("#DtFimVigenciaInserir")
                .datepicker("option", "numberOfMonths", 1)
                .datepicker('setDate', null);

            $('#ddlTurmaCadastro').change(function () {
                fct_CarregarSubTurmas($(this).val());
            });

            //seta a data inicial e final da vigência com as datas gravadas na tabela ATRIBUICAODIGITAL.TB_QUADRO_AULA
            $("#ddlDisciplinaCadastro").change(function () {
                if ($("#ddlDisciplinaCadastro").val() != "") {
                    $.ajax({
                        url: '/AtribuicaoAula/SelecionarDatasInicialFinalVigencia',
                        type: 'GET',
                        dataType: "json",
                        data: {
                            cdTurma: $('#ddlTurmaCadastro option:selected').val(),
                            cdDisciplina: $("#ddlDisciplinaCadastro option:selected").val()
                        },
                        success: function (data) {
                            if (data[0] == null) {
                                var d = new Date();
                                var ano = d.getFullYear();
                                var dataInicialVigencia = new Date(ano, 01, 27);
                                var dataFinalVigencia = new Date(ano, 12, 19);

                                //$("#DtInicioVigenciaInserir")
                                //  .datepicker('setDate', dataInicialVigencia)
                                //  .datepicker("option", "minDate", dataInicialVigencia)
                                //  .datepicker("option", "maxDate", dataFinalVigencia);

                                //$("#DtFimVigenciaInserir")
                                //    .datepicker('setDate', dataFinalVigencia)
                                //    .datepicker("option", "minDate", dataInicialVigencia)
                                //    .datepicker("option", "maxDate", dataFinalVigencia);

                            }
                            else {
                                var dataInicialVigencia = new Date(parseInt(data[0].dtInicioVigencia.substr(6)));
                                var dataFinalVigencia = new Date(parseInt(data[0].dtFimVigencia.substr(6)));

                                $("#DtInicioVigenciaInserir")
                                    .datepicker('setDate', dataInicialVigencia)
                                    .datepicker("option", "minDate", dataInicialVigencia)
                                    .datepicker("option", "maxDate", dataFinalVigencia);

                                $("#DtFimVigenciaInserir")
                                    .datepicker('setDate', dataFinalVigencia)
                                    .datepicker("option", "minDate", dataInicialVigencia)
                                    .datepicker("option", "maxDate", dataFinalVigencia);
                            }
                        }
                    });
                }
                else {
                    $("#DtInicioVigenciaInserir").datepicker('setDate', null);
                    $("#DtFimVigenciaInserir").datepicker('setDate', null);
                }
            });
        },
    });
}

function PesquisarDi(cdDiretoria, cdEscola, cpf, di, nome, flSituacao) {
    $.ajax({
        url: "/AtribuicaoAula/PesquisarAtribuicoes",
        type: "POST",
        dataType: 'html',
        data: { cdDiretoria: cdDiretoria, cdEscola: cdEscola, cpf: cpf },
        success: function () {
            $('#ddlDiretoriaCadastro').val(cdDiretoria);
            $('#ddlEscolaCadastro').val(cdEscola);
            $('#txtCpfCadastro').val(cpf);

            visualizarDis(cdDiretoria, cdEscola, cpf);
        }
    });
}

function abrirAgendaProfessor(cpf) {
    _cpf = cpf;
    var escola = $("#ddlEscolaCadastro").val() == null ? $('#cboEscolPesquisaAssociacaoAtpcProfa').val() : $("#ddlEscolaCadastro").val();
    $.ajax({
        url: "/AtribuicaoAula/AgendaProfessor",
        dataType: "html",
        type: "POST",
        data: { cpf: cpf, escola: escola },
        success: function (data) {

            $("#ResultHoras").html(data).dialog({
                modal: true,
                resizable: false,
                width: 1000,
                position: ['center', 0],
                close: function () {
                    //$("#ResultHoras").html('');
                    //$("#ResultHoras").dialog('close');
                }
            });
            var tabGradeAulaFontSize = Cookies.get('tabGradeAula_font-size');

            if (tabGradeAulaFontSize != undefined && tabGradeAulaFontSize > 9) {
                $('#TabelaGradeAulaProfessor').sedDataTable({
                    "sZeroRecords": "Não foram encontrados resultados",
                    "bPaginate": false
                });
            }
            else {
                $('#TabelaGradeAulaProfessor').sedDataTable({
                    "sZeroRecords": "Não foram encontrados resultados",
                    "bPaginate": false
                });
            }

        }
    });
}

function adicionarAtribuicao(data) {
    if (!data.Sucesso)
        return;

    var cpf = $("#Cpf").val();
    var cdDiretoria = $('#ddlDiretoriaCadastro').val();
    var cdEscola = $('#ddlEscolaCadastro').val();
    var di = $('#txtDi').val();
    var anoLetivo = $('.selAnoLetivo').val();


    //$.ajax({
    //    url: "/AtribuicaoAula/ListarParcialListaAtribuicoes",
    //    dataType: "html",
    //    type: "POST",
    //    data: { cpf: cpf, cdDiretoria: cdDiretoria, cdEscola: cdEscola, di: di, anoLetivo: anoLetivo },
    //    success: function (data) {
    //        $('#ListaAtribuicoes').html(data);
    //    }
    //});

    triggerEditarAtribuicao();
    triggerExcluirAtribuicao();

}

function editarAula(data) {
    if (!data.Sucesso)
        return;

    var form = $('#formEditarAula');

    var tr = $('tr[cdAula=' + data.DadosAula[0].CodigoAula + ']');
    tr.find('.selDataInicio').text(data.DadosAula[0].DataInicioVigencia);
    tr.find('.selDataFim').text(data.DadosAula[0].DataFimVigencia);
    tr.find('.selDiaDaSemana').text(form.find('.ddlDiaDaSemana option:selected').text());
    tr.find('.selHoraDeInicioDasAulas').text(data.DadosAula[0].HoraInicio);
    tr.find('.selHoraDeFimDasAulas').text(data.DadosAula[0].HoraFim);

    var table = $('table.tbAulas');
    table.find('.semResultado').hide();

    for (var x = 1; x < data.length; x++) {

        for (var i = 0; i < data[x].DadosAula.length; i++) {
            table.append(
                '<tr cdAula="' + data[x].DadosAula[i].CodigoAula + '" cdAtrib="' + data[x].DadosAula[i].CodigoAtribuicao + '" >' +
                '<td style="text-align: center !important; font-size: 14px;" class="selDataFim">' + data[x].DadosAula[i].DataInicioVigencia + '</td>' +
                '<td style="text-align: center !important; font-size: 14px;" class="selDataFim">' + data[x].DadosAula[i].DataFimVigencia + '</td>' +
                '<td style="text-align: center !important; font-size: 14px;" class="selDiaDaSemana">' + data[x].DadosAula[i].NomeSemana + '</td>' +
                '<td style="text-align: center !important; font-size: 14px;" class="selHoraDeInicioDasAulas">' + data[x].DadosAula[i].HoraInicio + '</td>' +
                '<td style="text-align: center !important; font-size: 14px;" class="selHoraDeFimDasAulas">' + data[x].DadosAula[i].HoraFim + '</td>' +
                '<td style="text-align: center">' +
                '<a class="selEditarAula"><i class="icone-tabela-editar" title="Editar"></i></a>' +
                '</td>' +
                '<td style="text-align: center">' +
                '<a class="selExcluirAula"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
                '</tr>');
        }
    }

    form.html('');
    form.dialog('close');
}

function ObterFormAtribuicao() {
    return $('#formAtribuicao').find('.selCdAtribuicao').length > 0 ? $('#formAtribuicao') : $('#formEditarAtribuicao');
}

var dataExterno;
var adicionarAula = function (data) {

    dataExterno = data;

    console.log("data.length: " + data.length);
    console.log("data[0]: " + data[0]);

    data2 = data;

    if (data.length > 0)
        data2 = data[0];

    console.log("data2: " + data2);

    if (!data2.Sucesso)
        return;

    var formAtribuicao = ObterFormAtribuicao();
    var hdnCdAtribuicao = formAtribuicao.find('.selCdAtribuicao');

    if (hdnCdAtribuicao.val() == "0" && $('#tbAtribuicoes tr[cdAtribuicao=' + data2.DadosAula[0].CodigoAtribuicao + ']').length == 0)
        adicionarAtribuicao({ Sucesso: true, CdAtribuicao: data2.DadosAula[0].CodigoAtribuicao });

    hdnCdAtribuicao.val(data2.DadosAula[0].CodigoAtribuicao);

    // Desabilitando campos da atribuição
    formAtribuicao.find('#ddlTpAtrib, #ddlTipoEnsinoCadastro, #ddlTurmaCadastro, #ddlDisciplinaCadastro, #DtInicioVigenciaInserir, #DtFimVigenciaInserir').prop('disabled', true);

    // Incrementando o contador, se existir
    if ($('#nrAulas').length > 0) {
        var nrAtual = parseInt($.trim($('#nrAulas').text()));
        $('#nrAulas').text(nrAtual + (data2.DadosAula.length));
    }

    if (data2.DadosAula[0].NomeSemana == "")
        data2.DadosAula[0].NomeSemana = form.find('.ddlDiaDaSemana :selected').text();

    var form = $('#formAula');

    var table = $('table.tbAulas');
    table.find('.semResultado').hide();

    for (var i = 0; i < data.length; i++) {
        table.append(
            '<tr cdAula="' + data[i].DadosAula[0].CodigoAula + '" cdAtrib="' + data[i].DadosAula[0].CodigoAtribuicao + '" >' +
            '<td style="text-align: center !important; font-size: 14px;" class="selDataInicio">' + data[i].DadosAula[0].DataInicioVigencia + '</td>' +
            '<td style="text-align: center !important; font-size: 14px;" class="selDataFim">' + data[i].DadosAula[0].DataFimVigencia + '</td>' +
            '<td style="text-align: center !important; font-size: 14px;" class="selDiaDaSemana">' + data[i].DadosAula[0].NomeSemana + '</td>' +
            '<td style="text-align: center !important; font-size: 14px;" class="selHoraDeInicioDasAulas">' + data[i].DadosAula[0].HoraInicio + '</td>' +
            '<td style="text-align: center !important; font-size: 14px;" class="selHoraDeFimDasAulas">' + data[i].DadosAula[0].HoraFim + '</td>' +
            '<td style="text-align: center">' +
            '<a class="selEditarAula"><i class="icone-tabela-editar" title="Editar"></i></a>' +
            '</td>' +
            '<td style="text-align: center">' +
            '<a class="selExcluirAula"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
            '</tr>');
    }

    triggerEditarAula();
    triggerExcluirAula();

    form.html('');
    form.dialog('close');
}

function abrirFormAula(nomeForm) {

    var formAtribuicao = $('#' + nomeForm);

    if ($(formAtribuicao).validate().checkForm() == false) {
        event.defaultPrevented();
    };

    var tpAtrib = formAtribuicao.find('#ddlTpAtrib').val();
    var tpEnsino = formAtribuicao.find('#ddlTipoEnsinoCadastro').val();
    var cdTurma = formAtribuicao.find('#ddlTurmaCadastro').val();
    var cdSubTurma = formAtribuicao.find('#ddlSubTurmaCadastro').val();
    var cdDisciplina = formAtribuicao.find('#ddlDisciplinaCadastro').val();
    var cdAtribuicao = formAtribuicao.find('.selCdAtribuicao').val();
    var cdDiretoria = formAtribuicao.find('.selCdDiretoria').val();
    var cdEscola = formAtribuicao.find('.selCdEscola').val();
    var cpf = formAtribuicao.find('.selCpf').val();
    var di = formAtribuicao.find('.selDi').val();
    var dtInicioVigencia = nomeForm == "formAtribuicao" ? formAtribuicao.find('#DtInicioVigenciaInserir').val() : formAtribuicao.find('#DtInicioVigenciaEditar').val();
    var dtFimVigencia = nomeForm == "formAtribuicao" ? formAtribuicao.find('#DtFimVigenciaInserir').val() : formAtribuicao.find('#DtFimVigenciaEditar').val();
    var cdTurnoPaa = nomeForm == "formAtribuicao" ? formAtribuicao.find('#ddlTurnosPaa').val() : formAtribuicao.find('#CdTurnoPaa').val();

    if (cdEscola == 0) {
        if (tpAtrib == 6) {
            cdEscola = $("#formIndex").find("#ddlEscolaPesquisar").val();
        }
    }


    if (tpAtrib == "" ||
        ((tpAtrib == "1" || tpAtrib == "2") && (tpEnsino == "" || cdTurma == "" || cdDisciplina == "")) ||
        ((tpAtrib == "3" || tpAtrib == "4") && (dtInicioVigencia == "" || dtFimVigencia == "")) ||
        ((tpAtrib == "6") && (cdTurnoPaa == "" || dtInicioVigencia == "" || dtFimVigencia == ""))) {
        alert("É necessário preencher todos os dados da atribuição");
        return;
    }

    $.ajax({
        url: '/AtribuicaoAula/ViewAdicionarAula',
        type: 'POST',
        dataType: 'html',
        data: {
            CdAtribuicao: cdAtribuicao,
            CdDiretoria: cdDiretoria,
            CdEscola: cdEscola,
            Cpf: cpf,
            Di: di,
            DtInicioVigencia: dtInicioVigencia,
            DtFimVigencia: dtFimVigencia,
            Tp_atrib: tpAtrib,
            CdTipoEnsino: tpEnsino,
            CdTurma: cdTurma,
            CdDisciplina: cdDisciplina,
            "SubTurma.Codigo": cdSubTurma,
            CdTurnoPaa: cdTurnoPaa
        },
        success: function (data) {

            if (tpAtrib != 6) {

                $('#formAula').html(data).dialog({
                    modal: true,
                    draggable: false,
                    width: 600,
                    position: ['center', 0],
                    close: function () {
                        //$('#formAula').html('');
                        //$('#formAula').dialog('close');
                    }
                });

                ValidacoesHoraAula();

                AplicarMascaras();

                InserirAlterarAula();

            }
            else {
                CarregarModalAtribuicaoPaa(data);
            }

            // seta a data inicial e final da vigência com as datas gravadas na modal anterior (inserção e edição)
            if ($('#formAtribuicao').find(".selInsercao").val() == "True") {
                $("#DtInicioVigenciaInserir2")
                    .datepicker("option", "numberOfMonths", 1)
                    .datepicker('setDate', null);

                $("#DtFimVigenciaInserir2")
                    .datepicker("option", "numberOfMonths", 1)
                    .datepicker('setDate', null);

                if ($("#DtInicioVigenciaInserir").val() != "") {
                    var dataInicialVigencia2 = $("#DtInicioVigenciaInserir").val();
                    var dataFinalVigencia2 = $("#DtFimVigenciaInserir").val();

                    $("#DtInicioVigenciaInserir2")
                        .datepicker('setDate', dataInicialVigencia2)
                        .datepicker("option", "minDate", dataInicialVigencia2)
                        .datepicker("option", "maxDate", dataFinalVigencia2);

                    $("#DtFimVigenciaInserir2")
                        .datepicker('setDate', dataFinalVigencia2)
                        .datepicker("option", "minDate", dataInicialVigencia2)
                        .datepicker("option", "maxDate", dataFinalVigencia2);
                }
            }
            else {
                if ($("#DtInicioVigenciaEditar").val() != "") {
                    var dataInicialVigencia3 = $("#DtInicioVigenciaEditar").val();
                    var dataFinalVigencia3 = $("#DtFimVigenciaEditar").val();

                    $("#DtInicioVigenciaInserir2")
                        .datepicker('setDate', dataInicialVigencia3)
                        .datepicker("option", "minDate", dataInicialVigencia3)
                        .datepicker("option", "maxDate", dataFinalVigencia3);

                    $("#DtFimVigenciaInserir2")
                        .datepicker('setDate', dataFinalVigencia3)
                        .datepicker("option", "minDate", dataInicialVigencia3)
                        .datepicker("option", "maxDate", dataFinalVigencia3);
                }
            }
        }
    });
}

function ValidacoesHoraAula() {
    $("#txtHoraDeInicioDasAulasAula").focusout(function () {
        CalcularHoraAula();
    });

    $("#txtHoraDeFimDasAulasAula").focusout(function () {
        CalcularHoraAula();
    });

    $('#ddlTempoDeAula').change(function () {
        CalcularHoraAula();
    });
}

function CalcularHoraAula() {
    if ($('#txtHoraDeInicioDasAulasAula').val() == '') {
        $("#txtHoraDeFimDasAulasAula").val('');
        return;
    }

    if ($('#ddlTempoDeAula').val() == '') {
        return;
    }

    var horaAula = $("#txtHoraDeInicioDasAulasAula").val().split(":");
    var horaCalculada = parseInt(horaAula[0]);
    var minutosCalculados = parseInt(horaAula[1]) + parseInt($('#ddlTempoDeAula').val());

    if (minutosCalculados > 59) {
        minutosCalculados = minutosCalculados - 60;
        horaCalculada = horaCalculada + 1;
    }

    if (horaCalculada == 23) {
        if (minutosCalculados > 19) {
            $("#txtHoraDeFimDasAulasAula").val('23:59');
            return;
        }
    } else if (horaCalculada > 23) {
        $("#txtHoraDeFimDasAulasAula").val('23:59');
        return;
    }
};

function triggerEditarAtribuicao() {
    $('.selEditarAtribuicao').unbind('click').click(function (event) {
        event.stopPropagation();

        var tr = $(this).parents('tr');

        $.ajax({
            url: '/AtribuicaoAula/ViewEditarAtribuicao',
            type: 'POST',
            dataType: 'html',
            data: { cdAtribuicao: tr.attr('cdAtribuicao'), di: $('#hdnNr_di').val() },
            success: function (data) {
                $('#formEditarAtribuicao').html(data).dialog({
                    modal: true,
                    draggable: false,
                    width: 685,
                    position: ['center', 0],
                    close: function () {
                        if (element == null) {
                            PesquisarDi(cdDiretoria, cdEscola, cpf, di, nome, flSituacao);
                        } else {
                            visualizarAtribuicoes(element);
                            flag = true;
                        }
                        //$('#formEditarAtribuicao').html('');
                        //$('#formEditarAtribuicao').dialog('close');
                    }
                });

                AplicarMascaras();

                triggerEditarAula();
                triggerExcluirAula();
            }
        });
    });
}

function triggerExcluirAtribuicao() {
    $('.selExcluirAtribuicao').unbind('click').click(function (event) {
        event.stopPropagation();

        if (!confirm('Tem certeza que deseja excluir essa atribuição?'))
            return;

        var tr = $(this).parents('tr');

        $.ajax({
            url: '/AtribuicaoAula/ExcluirAtribuicao',
            type: 'POST',
            data: { cdAtribuicao: tr.attr('cdAtribuicao') },
            success: function (data) {
                if (!data.Sucesso)
                    return;

                tr.remove();

                // Decrementa o contador de aulas, se existir
                if ($('#nrAulas').length > 0) {
                    var nrAtual = parseInt($.trim($('#nrAulas').text()));
                    $('#nrAulas').text(nrAtual - data.NumeroAulas);
                }
            }
        });
    });
}

function triggerEditarAula() {
    $('.selEditarAula').unbind('click').click(function (event) {
        event.stopPropagation();

        var tr = $(this).parents('tr').eq(0);
        var _cdAula = tr.attr('cdAula');
        var _cdAtrib = $('.selCdAtribuicao').val();

        $.ajax({
            url: '/AtribuicaoAula/ViewEditarAula',
            type: 'POST',
            dataType: 'html',
            data: { cdAula: _cdAula, cdAtrib: _cdAtrib },
            success: function (data) {
                $('#formEditarAula').html(data).dialog({
                    modal: true,
                    draggable: false,
                    width: 600,
                    position: ['center', 0],
                    close: function () {
                        //$('#formEditarAula').html('');
                        //$('#formEditarAula').dialog('close');
                    }
                });

                validacoes();
                AplicarMascaras();
                $('#ddlDiaDaSemanaAula').val($('#diaSemana').val());
                $('#ddlTempoDeAula').val($('#tempoAula').val());
                InserirAlterarAula();
            }
        });
    });
}

function triggerExcluirAula() {
    $('.selExcluirAula').unbind('click').click(function (event) {
        event.stopPropagation();

        var tr = $(this).parents('tr').eq(0);
        var cdAula = tr.attr('cdAula');
        var cdAtrib = $('.selCdAtribuicao').val();

        if (!confirm('Tem certeza que deseja excluir essa Aula?'))
            return;

        $.ajax({
            url: '/AtribuicaoAula/ExcluirAula',
            type: 'POST',
            data: { cdAula: cdAula, cdAtrib: cdAtrib },
            success: function (data) {
                if (!data.Sucesso)
                    return;

                tr.remove();

                // Decrementa o contador de aulas, se existir
                if ($('#nrAulas').length > 0) {
                    var nrAtual = parseInt($.trim($('#nrAulas').text()));
                    $('#nrAulas').text(nrAtual - 1);
                }

                // Se foi a última aula, a atribuição foi excluída
                if (data.UltimaAula != undefined && data.UltimaAula) {
                    $('#tbAtribuicoes').find('tr[cdAtribuicao=' + cdAtrib + ']').remove();
                    $('.selCdAtribuicao').val(0);
                }
            }
        });
    });
}

function HabilitarEdicao() {
    triggerEditarAtribuicao();
    triggerExcluirAtribuicao();
    triggerEditarAulaAtpc();
    triggerExcluirAulaAtpc();
    $('.selInserirAtribuicao, .selEdicao, .selExclusao').show();
    $('#spanTitulo').html('Edição de Atribuição de Aula');
    $('#btnHabilitarEdicao').hide();
}

function validarHoraAtpc() {
    if ($('#txtHoraDeInicioDasAulasAulaAtpc').val().length != 5 || $('#txtHoraDeFimDasAulasAulaAtpc').val().length != 5) {
        alert('Hora inválida');
        return false;
    }

    var horaInicio = $('#txtHoraDeInicioDasAulasAulaAtpc').val().split(":")[0];
    var minutosInicio = $('#txtHoraDeInicioDasAulasAulaAtpc').val().split(":")[1];
    var horaFim = $('#txtHoraDeFimDasAulasAulaAtpc').val().split(":")[0];
    var minutosFim = $('#txtHoraDeFimDasAulasAulaAtpc').val().split(":")[1];

    var valido = horaInicio >= "00" && horaInicio <= "23" && minutosInicio >= "00" && minutosInicio <= "59" &&
        horaFim >= "00" && horaFim <= "23" && minutosFim >= "00" && minutosFim <= "59";

    if (!valido) {
        alert('Hora inválida');
        return false;
    }

    return valido;
}

function ValidarCamposAdicionarAula() {

    var diasCbox = $('.cbDiasSemana:checked').size();
    var diasDdl = $('.ddlDiaDaSemana').size();
    var horaInicio = parseInt($('#txtHoraDeInicioDasAulasAula').val().split(":")[0]);
    var minutosInicio = parseInt($('#txtHoraDeInicioDasAulasAula').val().split(":")[1]);
    var horaFim = parseInt($('#txtHoraDeFimDasAulasAula').val().split(":")[0]);
    var minutosFim = parseInt($('#txtHoraDeFimDasAulasAula').val().split(":")[1]);
    var qtdMinutos = parseInt($('.ddlQuantidadeMinutos').val());

    ////Contagem para saber se o horario de aula informado bate com o a quantidade de minutos selecionada no dropdownlist
    //var aulaHoraemMinutos = (horaFim - horaInicio) * 60; //Transforma as Horas em Minutos.
    //var aulaMinutos = (minutosInicio + minutosFim) <= 60 ? (minutosInicio + minutosFim) : (minutosInicio + minutosFim) - 60 && aulaHoraemMinutos + 60;
    //var aulaSomaMinutos = (aulaHoraemMinutos + aulaMinutos);
    //// se o horario informado de aula for correspondente a quantidade de minutos selecionada o resultado da variavel totalMinutosAula tem que ser 1 digito. Valor redondo da conta. 
    //var totalMinutosAula = aulaSomaMinutos / qtdMinutos;

    var valido = horaInicio >= 00 && horaInicio <= 23 && minutosInicio >= 00 && minutosInicio <= 59 &&
          horaFim >= 00 && horaFim <= 23 && minutosFim >= 00 && minutosFim <= 59;

    if (diasCbox == 0 && diasDdl == 0) {
        alert('Campo Dias da Semana é obrigatório.');
        return false;
    }

    if ($('.ddlQuantidadeMinutos').val() == "") {
        alert('Campo Tempo de Aula é obrigatório.');
        return false;
    }

    if (!valido) {
        alert('Hora inválida');
        return false;
    }

    //totalMinutosAula tem que ser um valor redondo, caso for um resultado de numero quebrado os horarios informados estão errados de acrodo com a qtdMinutos.
    //if (totalMinutosAula.toString().length > 1) {
    //    alert('Hora inválida');
    //    return false;
    //}

    if ($('#txtHoraDeInicioDasAulasAula').val() == $('#txtHoraDeFimDasAulasAula').val()) {
        alert('A hora início não pode ser igual a hora final');
        return false;
    }

    if ($('#DtInicioVigenciaInserir2').val() == "") {
        alert('Campo Início de Vigência é obrigatório.');
        return false;
    }

    if ($('#DtFimVigenciaInserir2').val() == "") {
        alert('Campo Início de Vigência é obrigatório.');
        return false;
    }

    return true;
}


var t;
var InserirAlterarAula = function () {

    $('#btnAdicionarEditarAula').click(function (event) {

        event.preventDefault();

        if (!ValidarCamposAdicionarAula()) {
            return false;
        } else {
            // $('#formAdicionarEditarAula').submit();

            var url = '';

            if ($('#btnAdicionarEditarAula').val() == 'Adicionar')
                url = '/AtribuicaoAula/AdicionarAula';
            else {
                url = '/AtribuicaoAula/EditarAula';
            }

            $.ajax({
                cache: false,
                url: url,
                type: 'POST',
                dataType: 'JSON',
                data: $('#formAdicionarEditarAula').serialize(),
                success: function (data) {

                    console.log("data.length: " + data.length);

                    var data2 = data;
                    if (data.length > 0)
                        data2 = data[0];

                    console.log("data2: " + data2);
                    console.log("data2.Sucesso: " + data2.Sucesso);

                    if (data2.Sucesso) {
                        if ($('#btnAdicionarEditarAula').val() == 'Adicionar') {
                            adicionarAula(data);
                        } else {
                            console.log('sucesso editar');
                            editarAula(data);
                        }

                    }
                },
                error: function () {
                    $.ajaxStop();
                }
            });
        }


    });
    ValidarInserirAula();
}

function ValidarInserirAula() {
    $('#formAdicionarEditarAula').validate({
        rules: {
            'ListaAula[0].DiaDaSemana': 'required',
            'ListaAula[0].DtInicioVigencia': 'required',
            'ListaAula[0].DtFimVigencia': 'required',
            'ListaAula[0].HoraDeInicioDasAulas': 'required',
            'ListaAula[0].HoraDeFimDasAulas': 'required'
        },
        messages: {
            'ListaAula[0].DiaDaSemana': 'Obrigatório',
            'ListaAula[0].DtInicioVigencia': 'Obrigatório',
            'ListaAula[0].DtFimVigencia': 'Obrigatório',
            'ListaAula[0].HoraDeInicioDasAulas': 'Obrigatório',
            'ListaAula[0].HoraDeFimDasAulas': 'Obrigatório'
        }
    });

}


//------------------------------------- ATRIBUICAO PAA --------------------------------------------------//

function CarregarModalAtribuicaoPaa(data) {

    $('#formAulaPaa').html(data).dialog({
        modal: true,
        draggable: false,
        width: 600,
        position: ['center', 0],
    });

    ValidacoesHoraAula();

    AplicarMascaras();

    ValidarAulaPaa();

    InserirAulasPaa();

}

function ValidarAulaPaa() {

    $('#btnAdicionarAulaPaa').click(function (event) {
        event.preventDefault();

        if (!ValidarCamposAdicionarAula()) {
            return false;
        } else {

            $.ajax({
                cache: false,
                url: '/AtribuicaoAula/ValidarAulaPaa',
                type: 'POST',
                dataType: 'JSON',
                data: $('#formAdicionarEditarAula').serialize(),
                success: function (data) {
                    if (data.Sucesso) {
                        fct_AdicionarAulaPaaNaTabela(data);
                    }
                },
                error: function () {
                    $.ajaxStop();
                }
            });
        }
    });

    /* Função para Determinar Obrigatóriedade dos Campos da Tela */
    ValidarInserirAula();

}

function InserirAulasPaa() {

    $('#btnSalvarAulasPaa').click(function (event) {

        $.ajax({
            cache: false,
            url: '/AtribuicaoAula/InserirEditarAulaPaa',
            type: 'POST',
            dataType: 'JSON',
            data: $('#formAdicionarEditarAula').serialize(),

            success: function (data) {
                //if (data.Sucesso) {
                //fct_AdicionarAulaPaaNaTabela(data);
                //}

                $('#formAulaPaa').dialog('close');
                $('#formAtribuicao').dialog('close');

            },
            error: function () {
                $.ajaxStop();
            }
        });

    });

};

function EditarAulasPaa() {

};


/* Adiciona o Registro Inserido Pelo Usuário na Table tblHorasPAA  */
function fct_AdicionarAulaPaaNaTabela(data) {

    if (!data.Sucesso)
        return;


    /* Carga das Variáveis */
    var diaSemana = $("#ddlDiaDaSemanaAula option:selected").val();
    var tempoAula = $("#ListaAula_0__QuantidadeMinutos option:selected").val();


    /* Caso não haja registros na tabela, a linha com a essa indicação é removida */
    if ($("#tblHorasPAA").find('tr')[1].cells.length == 1) {
        $("#tblHorasPAA tbody tr").remove();
    }


    /* Inseri a linha com conteúdo da Aula PAA na Table tblHorasPAA */
    for (var i = 0; i < data.DadosAula.length; i++) {

        $("#tblHorasPAA tbody").append
            ('<tr>'

                + '<td style="text-align: center !important;">'
                    + '0'
                + '</td>'

                + '<td style="text-align: center !important;" class="selDataInicio">' + data.DadosAula[i].DataInicioVigencia
                    + '<input id="Codigo" type="hidden" name="AulaPaa[0].Codigo" value="' + data.DadosAula[i].CodigoAula + '" />'
                    + '<input id="InicioVigencia" type="hidden" name="AulaPaa[0].DtInicioVigencia" value="' + data.DadosAula[i].DataInicioVigencia + '" />'
                + '</td>'

                + '<td style="text-align: center !important;" class="selDataFim">' + data.DadosAula[i].DataFimVigencia
                    + '<input id="FimVigencia" type="hidden" name="AulaPaa[0].DtFimVigencia" value="' + data.DadosAula[i].DataFimVigencia + '" />'
                + '</td>'

                + '<td style="text-align: center !important;" class="selDiaDaSemana">' + data.DadosAula[i].NomeSemana
                    + '<input id="DiaDaSemana" type="hidden" name="AulaPaa[0].DiaDaSemana" value="' + diaSemana + '" />'
                + '</td>'

                + '<td style="text-align: center !important;" class="selHoraDeInicioDasAulas">' + data.DadosAula[i].HoraInicio
                    + '<input id="HoraInicio" type="hidden" name="AulaPaa[0].HoraDeInicioDasAulas" value="' + data.DadosAula[i].HoraInicio + '" />'
                + '</td>'

                + '<td style="text-align: center !important;" class="selHoraDeFimDasAulas">' + data.DadosAula[i].HoraFim
                    + '<input id="HoraFim" type="hidden" name="AulaPaa[0].HoraDeFimDasAulas" value="' + data.DadosAula[i].HoraFim + '" />'
                + '</td>'

                + '<td style="text-align: center !important;">'
                    + '<a class="selExcluirAula">'
                        + '<i class="icone-tabela-excluir" title="Excluir"></i>'
                    + '</a>'
                + '</td>'

            + '</tr>');
    }


    /* Ajuste do Número da Linha */
    fct_AtualizaLinhasTabela();

    /* Atualiza os Indices dos Inputs da Tabela */
    fct_AtualizaInputsTabela();

    /* Verifica a Quantidade de Registros Inseridos na Tabela */
    fct_QuantidadeAulasPaa();

}

/* Ajuste do Número da Linha */
function fct_AtualizaLinhasTabela() {

    var x = 0;

    $('#tblHorasPAA tr').each(function () {
        $(this).find('td').eq(0).text(x);
        x++;
    });

};

/* Atualiza os Indices dos Inputs da Tabela */
function fct_AtualizaInputsTabela() {

    fct_Index("Codigo", "Codigo");

    fct_Index("InicioVigencia", "DtInicioVigencia");

    fct_Index("FimVigencia", "DtFimVigencia");

    fct_Index("DiaDaSemana", "DiaDaSemana");

    fct_Index("HoraInicio", "HoraDeInicioDasAulas");

    fct_Index("HoraFim", "HoraDeFimDasAulas");

    function fct_Index(id, campo) {

        var contador = 0;

        $('input[id=' + id + ']').each(function () {
            $(this).prop("name", "AulaPaa[" + contador + "]." + campo);
            contador++;
        });
    }
}

/* Verifica a Quantidade de Registros Inseridos na Tabela */
function fct_QuantidadeAulasPaa() {

    if ($("table#tblHorasPAA > tbody >tr").length >= _qtdeAulasPaa) {

        $('#btnSalvarAulasPaa').prop("disabled", false);
        $('#btnAdicionarAulaPaa').prop("disabled", true);

    }
    else {

        $('#btnSalvarAulasPaa').prop("disabled", true);
        $('#btnAdicionarAulaPaa').prop("disabled", false);

    }

};

/* Carrega os Turnos que a Escola que Podem ter Professor com a Atribuição de PAA */
function fct_CarregarTurnoPaa(codigoEscola) {

    var select = $("#FormListarEditarAtribuicaoAulA select#ddlTurnosPaa");
    select.empty();
    select.append(new Option("Selecione", "", true, true));

    $.getJSON('/Turno/CarregarTurnoPorEscola', { CodigoEscola: codigoEscola }, function (myData) {

        $.each(myData, function (index, itemData) {
            select.append($('<option/>', {
                value: itemData.value,
                text: itemData.text
            }));
        });

    });
}




//----------------------------ATPC ATRIBUICAO--------------------------------------------------



function abrirFormAtribuicaoAtpc(cdDiretoria, cdEscola, cpf, di, nome, flSituacao) {
    var url;
    var titleModal;

    if ($('#hdnAssociacao') != undefined || $('#hdnAssociacao').val() == true) {
        url = '/AtribuicaoAula/CadastroAtpc';
        titleModal = 'Cadastrar ATPC';
    }
    else url = '/AtribuicaoAula/ViewAdicionarAtribuicaoAtpc';

    var redeEnsino = $("#filtroaba4-redeEnsino").val();

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: { cdDiretoria: cdDiretoria, cdEscola: cdEscola, cpf: cpf, di: di, nome: nome, flSituacao: flSituacao, CdRedeEnsino: redeEnsino },
        success: function (html) {
            $('#formAtribuicaoAtpc').html(html).dialog({

                modal: true,
                draggable: false,
                width: 685,
                position: ['center', 0],
                title: titleModal,
                close: function () {

                    if ($('#hdnAssociacao') == undefined || !$('#hdnAssociacao').val()) {
                        if (element == null) {
                            PesquisarDi(cdDiretoria, cdEscola, cpf, di, nome, flSituacao);
                        } else {
                            visualizarAtribuicoes(element);
                            flag = true;
                        }
                    }
                    //$('#formAtribuicaoAtpc').html('');
                    //$('#formAtribuicaoAtpc').dialog('close');
                }
            });

            $("#_DtInicioVigenciaInserir").datepicker({ dateFormat: 'dd/mm/yy' });
            $("#_DtFimVigenciaInserir").datepicker({ dateFormat: 'dd/mm/yy' });

            //$("#_DtInicioVigenciaInserir").datepicker("option", "numberOfMonths", 1).datepicker('setDate', null);
            //$("#_DtFimVigenciaInserir").datepicker("option", "numberOfMonths", 1).datepicker('setDate', null);
        }
    });
    //    AplicarMascaras();
}

function adicionarAtribuicaoAtpc(data) {
    if (!data.Sucesso)
        return;

    var professor = $("#txtNmProfessor").val();
    var di = $("#txtDi").val();

    //$('#tbAtribuicoesAtpc').find('.semResultado').hide();
    //$('#tbAtribuicoesAtpc').append(
    //    '<tr class="atribuicao adicionada" cdAtribuicao="' + data.CdAtribuicao + '">' +
    //    '<td style="text-align: center;" class="ellipsis" title="' + professor + '">' + professor + '</td>' +
    //    '<td style="text-align: center;" class="ellipsis" title="' + di + '">' + di + '</td>' +
    //    '<td class="selEdicaoAtpc" style="text-align: center;">' +
    //    '<a class="selEditarAtribuicaoAtpc"><i class="icone-tabela-editar" title="Editar"></i></a>' +
    //    '</td>' +
    //    '<td class="selExclusaoAtpc" style="text-align: center;">' +
    //    '<a class="selExcluirAtribuicaoAtpc"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
    //    '</tr>');

    triggerEditarAtribuicaoAtpc();
    triggerExcluirAtribuicaoAtpc();
}

function triggerExcluirAtribuicaoAtpc() {
    $('.selExcluirAtribuicaoAtpc').unbind('click').click(function (event) {
        event.stopPropagation();

        if (!confirm('Tem certeza que deseja excluir essa Atpc?'))
            return;

        var tr = $(this).parents('tr');

        $.ajax({
            url: '/AtribuicaoAula/ExcluirAtribuicaoAtpc',
            type: 'POST',
            data: { cdAtribuicao: tr.attr('cdAtribuicao') },
            success: function (data) {
                if (data.Sucesso)
                    tr.remove();
            }
        });
    });
}

function triggerEditarAtribuicaoAtpc() {
    $('.selEditarAtribuicaoAtpc').unbind('click').click(function (event) {
        event.stopPropagation();
        var tr = $(this).parents('tr');
        $.ajax({
            url: '/AtribuicaoAula/ViewEditarAtribuicaoAtpc',
            type: 'POST',
            dataType: 'html',
            data: { cdAtribuicao: tr.attr('cdAtribuicao') },
            success: function (data) {
                $('#formEditarAtribuicaoAtpc').html(data).show().dialog({
                    modal: true,
                    draggable: false,
                    width: 685,
                    position: ['center', 0],
                    close: function () {
                        //$('#formEditarAtribuicaoAtpc').html('');
                        //$('#formEditarAtribuicaoAtpc').dialog('close');
                    }
                });

                AplicarMascaras();

                triggerEditarAulaAtpc();
                triggerExcluirAulaAtpc();

                $('#btnAdicionarAtribuicaoAtpc').click(function (e) {
                    var texto = $("#tbAtribuicoesAtpc").find("tbody").children().find("td").text();
                    if (texto != "") {
                        $("#btnFinalizarCadastro").show();
                        $("#tabelaDi").find(".selEdicaoAtpc").show();
                    }


                    $('#formEditarAtribuicaoAtpc').html('');
                    $('#formEditarAtribuicaoAtpc').dialog('close');
                    $('#tbAtribuicoesAtpc').find('tr[cdAtribuicao=' + tr.attr('cdAtribuicao') + ']').addClass('adicionada');
                });
            }
        });
    });
}

//---------------------------ATPC AULA---------------------------------------------------------
function adicionarAulaAtpc(data) {
    if (!data.Sucesso)
        return;

    var hdnCdAtribuicaoAtpc = $('.selCdAtribuicaoAtpc');

    if (hdnCdAtribuicaoAtpc.val() == "0" && $('#tbAtribuicoesAtpc tr[cdAtribuicao=' + data.DadosAula[0].CodigoAtribuicao + ']').length == 0)
        adicionarAtribuicaoAtpc({ Sucesso: true, CdAtribuicao: data.DadosAula[0].CodigoAtribuicao });

    hdnCdAtribuicaoAtpc.val(data.DadosAula[0].CodigoAtribuicao);

    var form = $('#formAulaAtpc');

    var diaDaSemana = $('.ddlDiaDaSemanaAtpc :selected').text();
    var horaInicio = form.find('#txtHoraDeInicioDasAulasAulaAtpc').val();
    var horaFim = form.find('#txtHoraDeFimDasAulasAulaAtpc').val();
    var dataInicio = $("#DtInicioVigenciaInserir").val();
    var dataFim = $("#DtFimVigenciaInserir").val();

    if (data.DadosAula[0].NomeSemana == "")
        data.DadosAula[0].NomeSemana = form.find('.ddlDiaDaSemanaAtpc :selected').text();

    var table = $('#TabelaDeHorasAtpc');

    table.find('.semResultado').hide();
    for (var i = 0; i < data.DadosAula.length; i++) {
        table.append(
            '<tr cdAula="' + data.DadosAula[i].CodigoAula + '" cdAtrib="' + data.DadosAula[i].CodigoAtribuicao + '" >' +
             '<td style="text-align: center !important; font-size: 14px;" class="selDiretoria">' + $('#formAssociacaoVisaoClasse #filtroaba4-diretoria :selected').text() + '</td>' +
              '<td style="text-align: center !important; font-size: 14px;" class="selEscola">' + $('#formAssociacaoVisaoClasse #filtroaba4-escola :selected').text() + '</td>' +
            '<td style="text-align: center !important; font-size: 14px;" class="selDataInicio">' + data.DadosAula[i].DataInicioVigencia + '</td>' +
            '<td style="text-align: center !important; font-size: 14px;" class="selDataFim">' + data.DadosAula[i].DataFimVigencia + '</td>' +
            '<td style="text-align: center !important; font-size: 14px;" class="selDiaDaSemanaAtpc">' + data.DadosAula[i].NomeSemana + '</td>' +
            '<td style="text-align: center !important; font-size: 14px;" class="selHoraDeInicioDasAulasAtpc">' + data.DadosAula[i].HoraInicio + '</td>' +
            '<td style="text-align: center !important; font-size: 14px;" class="selHoraDeFimDasAulasAtpc">' + data.DadosAula[i].HoraFim + '</td>' +
            //'<td style="text-align: center">' +
            //'<a class="selEditarAulaAtpc"><i class="icone-tabela-editar" title="Editar"></i></a>' +
            //'</td>' +
            //'<td style="text-align: center">' +
            //'<a class="selExcluirAulaAtpc"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
            '</tr>');
    }

    triggerEditarAulaAtpc();
    triggerExcluirAulaAtpc();

    form.html('');
    form.dialog('close');
}

function triggerEditarAulaAtpc() {
    $('.selEditarAulaAtpc').unbind('click').click(function (event) {
        event.stopPropagation();

        var tr = $(this).parents('tr').eq(0);

        $.ajax({
            url: '/AtribuicaoAula/ViewEditarAulaAtpc',
            type: 'POST',
            dataType: 'html',
            data: { cdAula: tr.attr('cdAula') },
            success: function (data) {
                $('#formEditarAulaAtpc').html(data).dialog({
                    title: "Horário ATPC",
                    modal: true,
                    draggable: false,
                    width: 600,
                    position: ['center', 0],
                    close: function () {
                        //$('#formEditarAulaAtpc').html('');
                        //$('#formEditarAulaAtpc').dialog('close');
                    }
                });

                AplicarMascaras();
                InserirAlterarAulaAtpc();
            }
        });
    });
}

function editarAulaAtpc(data) {
    if (!data.Sucesso)
        return;
    var form = $('#formEditarAulaAtpc');
    var tr = $('tr[cdAula=' + data.DadosAula[0].CodigoAula + ']');

    tr.find('.selDiaDaSemanaAtpc').text(data.DadosAula[0].NomeSemana);
    tr.find('.selDataInicio').text(data.DadosAula[0].DataInicioVigencia);
    tr.find('.selDataFim').text(data.DadosAula[0].DataFimVigencia);
    tr.find('.selHoraDeInicioDasAulasAtpc').text(data.DadosAula[0].HoraInicio);
    tr.find('.selHoraDeFimDasAulasAtpc').text(data.DadosAula[0].HoraFim);

    form.html('');
    form.dialog('close');
}

function abrirFormAulaAtpc(cdDiretoria, cdEscola, cpf, di, form) {

    var cdAtribuicao = $('.selCdAtribuicaoAtpc').val();
    form = form == null ? 0 : form;
    var CdRedeEnsino = $("#filtroaba4-redeEnsino").val();

    $.ajax({
        url: '/AtribuicaoAula/ViewAdicionarAulaAtpc',
        type: 'POST',
        data: {
            //cdAtribuicao: cdAtribuicao,
            cdDiretoria: cdDiretoria,
            cdEscola: cdEscola,
            cpf: cpf,
            di: di,
            CdRedeEnsino: CdRedeEnsino,
            dtInicioVig: (form > 0 ? $("#DtInicioVigenciaInserir").val() : $("#_DtInicioVigenciaInserir").val()),
            dtFimVig: (form > 0 ? $("#DtFimVigenciaInserir").val() : $("#_DtFimVigenciaInserir").val())
        },
        success: function (data) {
            if ((typeof data) == "object" && !data.PodeAdicionar)
                return;

            $('#formAulaAtpc').html(data).dialog({
                title: "Horário ATPC",
                modal: true,
                draggable: false,
                width: 600,
                position: ['center', 0],
                close: function () {
                    //$('#formAulaAtpc').html('');
                    //$('#formAulaAtpc').dialog('close');
                }
            });

            validacoes();
            AplicarMascaras();
        }
    });
}

function triggerExcluirAulaAtpc() {
    $('.selExcluirAulaAtpc').unbind('click').click(function (event) {
        event.stopPropagation();

        if (!confirm('Tem certeza que deseja excluir esse Horário de Atpc?'))
            return;

        var tr = $(this).parents('tr').eq(0);

        $.ajax({
            url: '/AtribuicaoAula/ExcluirAulaAtpc',
            type: 'POST',
            data: { cdAula: tr.attr('cdAula') },
            success: function (data) {
                if (!data.Sucesso)
                    return;
                tr.remove();

                if (data.CdAtribuicao > 0) {
                    var trAtribuicao = $('tr[cdAtribuicao=' + data.CdAtribuicao + ']');

                    trAtribuicao.remove();

                    var formAtribuicaoAtpc = $('#formAtribuicaoAtpc');
                    if (formAtribuicaoAtpc.attr('class') == 'ui-dialog-content ui-widget-content') {
                        formAtribuicaoAtpc.html('');
                        formAtribuicaoAtpc.dialog('close');
                    }

                    var formEditarAtribuicaoAtpc = $('#formEditarAtribuicaoAtpc');
                    if (formEditarAtribuicaoAtpc.attr('class') == 'ui-dialog-content ui-widget-content') {
                        formEditarAtribuicaoAtpc.html('');
                        formEditarAtribuicaoAtpc.dialog('close');
                    }
                }
            }
        });
    });
}

function InserirAlterarAulaAtpc() {
    $('#btnAdicionarEditarAulaAtpc').click(function (event) {
        event.preventDefault();

        if (!ValidarCamposAdicionarAulaAtpc()) {
            return false;
        } else {
            // $('#formAdicionarEditarAula').submit();

            var url = '';

            if ($('#btnAdicionarEditarAulaAtpc').val() == 'Adicionar')
                url = '/AtribuicaoAula/AdicionarAulaAtpc';
            else {
                url = '/AtribuicaoAula/EditarAulaAtpc';
            }

            $.ajax({
                cache: false,
                url: url,
                type: 'POST',
                dataType: 'JSON',
                data: $('#formAdicionarEditarAulaAtpc').serialize(),
                success: function (data) {
                    if (data.Sucesso) {
                        if ($('#btnAdicionarEditarAulaAtpc').val() == 'Adicionar')
                            adicionarAulaAtpc(data);
                        else
                            editarAulaAtpc(data);

                        Mensagem.Alert({
                            titulo: "Associação",
                            mensagem: 'Registro alterado com sucesso!',
                            tipo: "Sucesso",
                            botao: "Fechar"
                        });
                    }
                },
                error: function () {
                    $.ajaxStop();
                }
            });
        }


    });
    ValidarInserirAulaAtpc();

}

function ValidarInserirAulaAtpc() {
    $('#formAdicionarEditarAula').validate({
        rules: {
            'ListaAula[0].DiaDaSemana': 'required',
            'ListaAula[0].DtInicioVigencia': 'required',
            'ListaAula[0].DtFimVigencia': 'required',
            'ListaAula[0].HoraDeInicioDasAulas': 'required',
            'ListaAula[0].HoraDeFimDasAulas': 'required'
        },
        messages: {
            'ListaAula[0].DiaDaSemana': 'Obrigatório',
            'ListaAula[0].DtInicioVigencia': 'Obrigatório',
            'ListaAula[0].DtFimVigencia': 'Obrigatório',
            'ListaAula[0].HoraDeInicioDasAulas': 'Obrigatório',
            'ListaAula[0].HoraDeFimDasAulas': 'Obrigatório'
        }
    });
}

function ValidarCamposAdicionarAulaAtpc() {


    var diasDdl = $('#ddlDiaDaSemanaAulaAtpc').size();
    var horaInicio = parseInt($("#txtHoraDeInicioDasAulasAulaAtpc").val().split(":")[0]);
    var minutosInicio = parseInt($("#txtHoraDeInicioDasAulasAulaAtpc").val().split(":")[1]);
    var horaFim = parseInt($("#txtHoraDeFimDasAulasAulaAtpc").val().split(":")[0]);
    var minutosFim = parseInt($("#txtHoraDeFimDasAulasAulaAtpc").val().split(":")[1]);



    var valido = horaInicio >= 00 && horaInicio <= 23 && minutosInicio >= 00 && minutosInicio <= 59 &&
          horaFim >= 00 && horaFim <= 23 && minutosFim >= 00 && minutosFim <= 59;

    if (diasDdl == 0) {
        alert('Campo Dias da Semana é obrigatório!');
        return false;
    }

    if (!valido) {
        Mensagem.Alert({
            titulo: "Editar ATPC",
            mensagem: "Hora inválida!",
            tipo: "alerta",
            botao: "Fechar"
        });
        return false;
    }

    if ($('#txtHoraDeInicioDasAulasAulaAtpc').val() == $('#txtHoraDeFimDasAulasAulaAtpc').val()) {
        Mensagem.Alert({
            titulo: "Editar ATPC",
            mensagem: "A hora início não pode ser igual a hora final!",
            tipo: "alerta",
            botao: "Fechar"
        });
        return false;
    }

    if ($('#DtInicioVigenciaInserir').val() == "") {
        Mensagem.Alert({
            titulo: "Editar ATPC",
            mensagem: "Campo Início de Vigência é obrigatório!",
            tipo: "alerta",
            botao: "Fechar"
        });
        return false;
    }

    if ($('#DtFimVigenciaInserir').val() == "") {
        Mensagem.Alert({
            titulo: "Editar ATPC",
            mensagem: "Campo Fim de Vigência é obrigatório!",
            tipo: "alerta",
            botao: "Fechar"
        });
        return false;
    }

    if ($('#formEditarAulaAtpc #DtInicioVigenciaInserir').val().substring(6, 10) != $('#filtroaba4-anoLetivo').val() ||
            $('#formEditarAulaAtpc #DtFimVigenciaInserir').val().substring(6, 10) != $('#filtroaba4-anoLetivo').val()) {
        Mensagem.Alert({
            titulo: "Editar ATPC",
            mensagem: "Data de Início/Fim da vigência inválida!",
            tipo: "alerta",
            botao: "Fechar"
        });
        return false;
    }

    return true;
}
