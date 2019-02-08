$(document).ready(function () {
    SetUp.Tabs();
    //SetUp.Combos();
    SetUp.Validacoes();
    SetUp.CadastroHorario.CarregarModal();
    HorarioAula.Pesquisa();
    //CadastroAssociacao.CarregarCombos();
    CadastroAssociacao.Validacaoes();
    CadastroAssociacao.PesquisarProfessor();
    CadastroAssociacao.PesquisarAssociacao();
    CadastroAssociacao.EditarAssociacao();
    CadastroAssociacao.ValidarEditar();
    CadastroAssociacao.SalvarEditar();
    //CadastroAssociacao.VerificaDocenteSubstituicao();
    AssociacaoClasse.CarregarCombos();
    AssociacaoClasse.ViewInserirAssocioacaoClasse();
    AssociacaoClasse.PesquisaAssociocaoClasse();
    AssociacaoClasseVisaoClasse.CarregarCombos();
    //AssociacaoClasseVisaoClasse.CarregarCombosAba5();
    AssociacaoClasseVisaoClasse.Validacao();
    AssociacaoClasse.Validacao();
    AplicarMascaras();
    PesquisaAssociacaoATPC.Combos();
    PesquisaAssociacaoATPC.Pesquisar();
    CloseWindowAssoAtpc();
});

var AssociacaoClasseVisaoClasse = {
    CarregarCombos: function () {

        //$('#formAssociacaoVisaoClasse #TipoDiretoriaVisaoClasse').autoPreencher($('#formAssociacaoVisaoClasse #cboDiretoriaVisaoClasse'), 'Diretoria', 'CarregarListaDiretoriasCompletoPorTipoAtribuicao', [{ id: "'TipoDiretoriaVisaoClasse'" }]);

        //$("#formAssociacaoVisaoClasse #cboDiretoriaVisaoClasse").autoPreencher($("#formAssociacaoVisaoClasse #cboEscolaVisaoClasse"), "Escola", "CarregaListaEscolasPorTipoDiretoriaMunicipioAtribuicao", [{ CodigoDiretoria: "'cboDiretoriaVisaoClasse'", TipoDiretoria: "'TipoDiretoriaVisaoClasse'" }]);


        //$('#formAssociacaoVisaoClasse #cboDiretoria').autoPreencher($('#formAssociacaoVisaoClasse #cboEscola'), 'Escola', 'CarregarListaEscolas');

        $('#formAssociacaoVisaoClasse #filtroaba4-escola').autoPreencher($('#formAssociacaoVisaoClasse #cboProfessor'), 'Professor', 'ComboProfessorComAula', null, null, null, null, null, function (dllAlvo, adicionarJson) {
            var params = {
                escola: $('#formAssociacaoVisaoClasse #filtroaba4-escola').val(),
                anoLetivo: $('#formAssociacaoVisaoClasse #filtroaba4-anoLetivo').val()
            };
            adicionarJson(params);
        });

        $('#formAssociacaoVisaoClasse #filtroaba4-tipoEnsino').autoPreencher($('#formAssociacaoVisaoClasse #cboProfessor'), 'Professor', 'ComboProfessorComAula', null, null, null, null, null, function (dllAlvo, adicionarJson) {
            $('#formAssociacaoVisaoClasse #cboProfessor').empty();
            $('#formAssociacaoVisaoClasse #cboProfessor').append('<option value="">Selecione...</option>');
            var params = {
                escola: $('#formAssociacaoVisaoClasse #filtroaba4-escola').val(),
                anoLetivo: $('#formAssociacaoVisaoClasse #filtroaba4-anoLetivo').val(),
                cdTipoEnsino: $('#formAssociacaoVisaoClasse #filtroaba4-tipoEnsino').val()
            };
            adicionarJson(params);
        });

        $('#formAssociacaoVisaoClasse #cboProfessor').autoPreencher($('#formAssociacaoVisaoClasse #cboDi'), 'AssociacaoProfessorClasse', 'ListaDiProfessor', null, null, null, null, null, function (dllAlvo, adicionarJson) {
            var json = {
                cdEscola: $('#formAssociacaoVisaoClasse #filtroaba4-escola').val(),
                cpf: $('#cboProfessor').val(),
                anoLetivo: $('#formAssociacaoVisaoClasse #filtroaba4-anoLetivo').val()
            };
            adicionarJson(json);
        });

    },
    CarregarCombosAba5: function () {
        $('#formPesquisaAssociacaoAtpcProf #filtroaba5-escola').autoPreencher($('#formPesquisaAssociacaoAtpcProf #cboProfessor'), 'Professor', 'ComboProfessorComAula', null, null, null, null, null, function (dllAlvo, adicionarJson) {
            var params = {
                escola: $('#formAssociacaoVisaoClasse #filtroaba5-escola').val(),
                anoLetivo: $('#formAssociacaoVisaoClasse #filtroaba5-anoLetivo').val()
            };
            adicionarJson(params);
        });

        $('#formPesquisaAssociacaoAtpcProf #cboProfessor').autoPreencher($('#formPesquisaAssociacaoAtpcProf #cboDi'), 'AssociacaoProfessorClasse', 'ListaDiProfessor', null, null, null, null, null, function (dllAlvo, adicionarJson) {
            var json = {
                cdEscola: $('#formPesquisaAssociacaoAtpcProf #filtroaba5-escola :selected').val(),
                cpf: $('#cboProfessor').val(),
                anoLetivo: $('#formPesquisaAssociacaoAtpcProf #filtroaba5-anoLetivo').val()
            };
            adicionarJson(json);
        });

    },
    Validacao: function () {
        $('#formAssociacaoVisaoClasse').validate({
            rules: {
                'filtroaba4-diretoria': { required: true },
                'filtroaba4-escola': { required: true },
                ProfessorEnsinoAssociacaoVisaoClasse: { required: true }
            },
            messages: {
                required: 'Obrigatório'
            }
        });
    }
};

var AssociacaoClasse = {
    CarregarCombos: function () {

        //$('#formAssociacaoClasse #TipoDiretoriaVisaoProfessor').autoPreencher($('#formAssociacaoClasse #cboDiretoriaVisaoProfessor'), 'Diretoria', 'CarregarListaDiretoriasCompletoPorTipoAtribuicao', [{ id: "'TipoDiretoriaVisaoProfessor'" }]);

        //$("#formAssociacaoClasse #cboDiretoriaVisaoProfessor").autoPreencher($("#formAssociacaoClasse #cboEscolaVisaoProfessor"), "Escola", "CarregaListaEscolasPorTipoDiretoriaMunicipioAtribuicao", [{ CodigoDiretoria: "'cboDiretoriaVisaoProfessor'", TipoDiretoria: "'TipoDiretoriaVisaoProfessor'" }]);

        // $('#formAssociacaoClasse #cboDiretoriaVisaoProfessor').autoPreencher($('#formAssociacaoClasse #cboEscolaVisaoProfessor'), 'Escola', 'CarregarListaEscolas');
        //$('#formAssociacaoClasse #cboEscolaVisaoProfessor').autoPreencher($('#formAssociacaoClasse #cboTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino');
        $('#formAssociacaoClasse #filtroaba3-tipoEnsino').autoPreencher($('#formAssociacaoClasse #cboTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsinoMaiusc', null, null, null, null, null, function (dllAlvo, adicionarJson) {
            var json = {
                CodigoEscola: $('#formAssociacaoClasse #filtroaba3-escola :selected').val(),
                AnoLetivo: $('#formAssociacaoClasse #filtroaba3-anoLetivo').val(),
                CodigoTipoEnsino: $('#formAssociacaoClasse #filtroaba3-tipoEnsino').val()
            };
            adicionarJson(json);
        });
        $('#formAssociacaoClasse #filtroaba3-anoLetivo').change(function () {
            if (this.value.length === 4 && $('#formAssociacaoClasse #filtroaba3-diretoria :selected').index() > 0) {
                $('#formAssociacaoClasse #filtroaba3-diretoria').get(0).selectedIndex = 0;
                $('#formAssociacaoClasse #filtroaba3-diretoria').change()
            }
        });

    },
    Validacao: function () {
        $('#formAssociacaoClasse').validate({
            rules: {
                'filtroaba3-diretoria': { required: true },
                'filtroaba3-escola': { required: true },
                CodigoTipoEnsinoAssociacaoClasse: { required: true },
                cboTurmaAssociacaoClasse: { required: true },
                cboDiaSemanaInserirAssociacao: { required: true },
                'filtroaba3-anoLetivo': { required: true, minlength: 4 }
            },
            messages: {
                required: 'Obrigatório',
                'filtroaba3-anoLetivo': { minlength: 'Ano inválido' }
            }
        });
    },

    ViewInserirAssocioacaoClasse: function () {
        $('#btnInserirAssociacaoClasse').click(function () {

            if (!$('#formAssociacaoClasse').valid()) return;

            var params = {
                cdTurma: $('#formAssociacaoClasse #cboTurma').val(),
                diaSemana: $('#formAssociacaoClasse #cboDiaSemana').val()
            }
            $.post('../../AssociacaoProfessorClasse/InserirAssociocaoClasse', params, function (data) {

                if (data.length > 0) {
                    $('#divInserirAssociacaoClasse').empty().html(data);
                    AssociacaoClasse.Salvar();
                    AssociacaoClasse.CarregarDatePickers();
                    AssociacaoClasse.PesquisarProfessoresEAula();
                    $('#divInserirAssociacaoClasse').dialog({
                        title: "Inserir associações na Classe",
                        width: ($(data).find('#MsgSemVigencia').length > 0 ? "md" : "lg"),
                        position: ['center', 0]

                    });
                    AplicarMascaras();
                    AssociacaoClasse.Validar();
                }
            }, 'html');

        });
    },
    IniciarDraggable: function (tipoOperacao) {
        var px, py;
        $("#tbScroll").mousemove(function (e) {
            var rect = $("#tbScroll")[0].getBoundingClientRect();
            px = e.clientX + $("#tbScroll")[0].scrollLeft - rect.left;
            py = e.clientY + $("#tbScroll")[0].scrollTop - rect.top;
        });

        var tableId = tipoOperacao > 1 ? 'tbAssociacaoClasseEdt' : 'tbAssociacaoClasse';
        $(".drog").draggable({
            appendTo: "#tbScroll",
            helper: "clone",
            revert: function (dropped) {
                return JSON.parse($('#hdnDrop').val());
            },
            refreshPositions: true,
            scroll: true,
            drag: function (event, ui) {
                ui.position.top = py - 60;
                ui.position.left = px - 95;
            },
            zIndex: 10000
        });
        $("#" + tableId + " tr .placeholder").droppable({
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: ":not(.ui-sortable-helper)",
            drop: function (event, ui) {
                $(this).find(".placeholder").remove();
                if (AssociacaoClasse.EhInvalido(ui, this)) {
                    $(ui.draggable).find('#hdnDrop').val(false);
                    $('#hdnDrop').val(true);
                    return;
                }
                var tile = $(ui.draggable).clone();
                $(tile).find('#imgDelete').show();
                if ((EhCiclo1($(tile).find('#hdnCdDisciplina').val()) || $(tile).find('#hdnCdTipoEnsino').val() == 39 || $(tile).find('#hdnCdTipoEnsino').val() == 9) && ($(tile).find('#hdnTipoAtribuicao').val() == '1' || $(tile).find('#hdnTipoAtribuicao').val() == '5')) {
                    var aux = 0;
                    $("#" + tableId + " tr .placeholder").each(function () {

                        if (aux < 25) {
                            if ($(this).find('.tile').find('#hdnCdDisciplina').val() != '1001' || $(this).find('.tile').find('#hdnCdDisciplina').val() != '1000' || $(this).find('.tile').find('#hdnCdDisciplina').val() != '1009') {
                                $(tile).clone().appendTo(this); return;
                            }

                            if ($(this).find('.tile').length == 0) {
                                $(tile).clone().appendTo(this);
                            }
                            aux++;
                        }
                    });
                }
                else {
                    $(tile).appendTo(this);
                }
                $('#hdnDrop').val(false);
                AssociacaoClasse.DeleteLocal();
                return;
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function () {
                $(this).removeClass("ui-state-default");
            }
        });
    },
    EhInvalido: function (ui, td) {
        var cpfInserir = $(ui.draggable).find('#hdnCpf').val();
        var tipoAtribuicaoInserir = $(ui.draggable).find('#hdnTipoAtribuicao').val();
        var cdDisciplinaInserir = $(ui.draggable).find('#hdnCdDisciplina').val();
        var retorno = false;
        if ($(td).find('.tile').length === 0) {
            retorno = AssociacaoClasse.NaoExisteResponsavel(tipoAtribuicaoInserir);
            if (retorno) return true;
        }
        $(td).find('.tile').each(function () {
            if (retorno) return;
            retorno = AssociacaoClasse.JaFoiAdicionado(cpfInserir, $(this).find('#hdnCpf').val());
            if (retorno) return;
            retorno = AssociacaoClasse.JaExisteMesmoTipoAtribuicao(tipoAtribuicaoInserir, $(this).find('#hdnTipoAtribuicao').val(), this, $(ui.draggable), td);
            if (retorno) return;
            retorno = AssociacaoClasse.AuxiliarNaoEhMesmaDisciplinaResponsavel(tipoAtribuicaoInserir, cdDisciplinaInserir, $(this).find('#hdnCdDisciplina').val());
            if (retorno) return;
            retorno = AssociacaoClasse.ExisteResponsavelAtribuicao(tipoAtribuicaoInserir, this, $(ui.draggable), td);
            if (retorno) return;
        });
        return retorno;
    },
    JaFoiAdicionado: function (cpfInserir, cpfInserido) {
        return cpfInserir === cpfInserido;
    },
    JaExisteMesmoTipoAtribuicao: function (tipoAtribuicaoInserir, tipoAtribuicaoInserido, tileExistente, tileAdicionar, td) {
        var cdDisciplinaExistente = $(tileExistente).find('#hdnCdDisciplina').val();
        var cpfExistente = $(tileExistente).find('#hdnCpf').val();

        var cdDisciplinaAdicionar = $(tileAdicionar).find('#hdnCdDisciplina').val();
        var cpfAdicionar = $(tileAdicionar).find('#hdnCpf').val();

        if ((cdDisciplinaAdicionar == '1000' || cdDisciplinaAdicionar == '1001' || cdDisciplinaAdicionar == '1009') && $(td).find('.tile').length === 1) return false;

        // se for ciclo 1 pode ter aula concomitante
        if ((cdDisciplinaExistente == 1000 || cdDisciplinaExistente == 1001 || cdDisciplinaExistente == 1009) && cpfExistente != cpfAdicionar && (cdDisciplinaExistente != 1000 || cdDisciplinaExistente != 1001 || cdDisciplinaExistente == 1009) && tipoAtribuicaoInserir != 5) {
            return $(td).find('.tile').length >= 3
        }

        return tipoAtribuicaoInserir === tipoAtribuicaoInserido;
    },
    NaoExisteResponsavel: function (tipoAtribuicaoInserir) {
        return (tipoAtribuicaoInserir != 1);
    },
    AuxiliarNaoEhMesmaDisciplinaResponsavel: function (tipoAtribuicaoInserir, cdDisciplinaResponsavel, cdDisciplinaAuxiliar) {
        if (tipoAtribuicaoInserir != 2) return false;
        if (cdDisciplinaResponsavel == '1000' || cdDisciplinaResponsavel == '1001' || cdDisciplinaResponsavel == '1009') return false;
        return cdDisciplinaResponsavel !== cdDisciplinaAuxiliar;
    },
    ExisteResponsavelAtribuicao: function (tipoAtribuicaoInserir, tileExistente, tileAdicionar, td) {
        if (tipoAtribuicaoInserir != 5) return false;

        var cdDisciplinaExistente = $(tileExistente).find('#hdnCdDisciplina').val();
        var cdDisciplinaAdicionar = $(tileAdicionar).find('#hdnCdDisciplina').val();
        var tipoAtribuicaoInserido = $(tileExistente).find('#hdnTipoAtribuicao').val();

        if ($(td).find('.tile').next().length >= 1 && (tipoAtribuicaoInserido == 0 || tipoAtribuicaoInserido == 1) && ($(td).find('.tile').next().find('#hdnCdDisciplina').val() == cdDisciplinaAdicionar || cdDisciplinaExistente == cdDisciplinaAdicionar)) {
            return false;
        }
        else {
            if (cdDisciplinaExistente != cdDisciplinaAdicionar)
                return;
        }
    },
    Salvar: function () {
        $('#btnCadastrarAssociacaoClasse').bind('click', function () {
            var naoexisteObjetoPrefessor = true;
            var params = '{ ';
            var indexAssocioacao = 0;
            var indexAula = 0;
            var associacaoesAdicionada = [];
            var td;

            $('#profs .inserirAco').each(function (i, ui) {
                naoexisteObjetoPrefessor = true;
                var cdAassociacao = $(this).find('#cdAssociacao').val();
                var cdDisciplina = $(this).find('#hdnCdDisciplina').val();
                var cpfProfs = $(this).find('#hdnCpf').val();
                var tipoAtribuicao = $(this).find('#hdnTipoAtribuicao').val();
                $('#tbAssociacaoClasse tr td').each(function () {
                    td = this;
                    var num;
                    var itemArray = cdAassociacao + ' ' + $(td).find('#hdnDiaSemana').val() + ' ' + $(this).parent().children().eq(0).find('#hdnHorarioInicio').val()
                                            + ' ' + $(this).parent().children().eq(0).find('#hdnHorarioTermino').val() + ' ' + $(this).parent().find('#hdnTipoAtribuicao').val();

                    if ($(this).find('.drog').length > 1)
                        num = $(this).find('.drog');
                    if (cdAassociacao != undefined && $.inArray(itemArray, associacaoesAdicionada) === -1) {
                        if ($(this).find('.drog').length > 0) {
                            var hdnDisciplina = $(this).find('.drog #hdnCdDisciplina').val();
                            var hdnCpf = $(this).find('.drog #hdnCpf').val();
                            $(this).find('.drog #cdAssociacao').each(function () {
                                if ((cdAassociacao === this.value || $(this).find('#hdnTipoAtribuicao').val() != tipoAtribuicao) && cdDisciplina === hdnDisciplina && cpfProfs === hdnCpf) {
                                    if (naoexisteObjetoPrefessor) {
                                        var cpf = $(this).parent().find('#hdnCpf').val();
                                        var di = $(this).parent().find('#di').val();
                                        var tipoAtrib = $(this).parent().find('#hdnTipoAtribuicao').val();
                                        if (associacaoesAdicionada.length > 0) {
                                            params += ',';
                                        }

                                        params += ' "listaAssociacao[' + indexAssocioacao + '].Professor.NumeroCpf": ' + '"' + cpf + '"';
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Id": ' + cdAassociacao;
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Di": ' + di;
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Tipo": ' + tipoAtrib;
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].TipoEnsino.CD_TIPO_ENSINO": ' + $('#hdnCdTipoEnsino').val();
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Turma.CD_TURMA":' + $('#hdnTurma').val();
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Turma.CD_TURNO":' + $('#hdnCdTurno').val();
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].AnoLetivo": "' + $('#formAssociacaoClasse #filtroaba3-anoLetivo').val() + '"';
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].TipoClasse": "' + $('#hdnCdTipoClasse').val() + '"';
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Escola.CD_ESCOLA": "' + $('#hdnCdEscola').val() + '"';

                                        naoexisteObjetoPrefessor = false;
                                        indexAssocioacao++;
                                        indexAula = 0;
                                        associacaoesAdicionada.push(cdAassociacao + ' ' + $(td).find('#hdnDiaSemana').val() + ' ' + $(td).parent().children().eq(0).find('#hdnHorarioInicio').val()
                                            + ' ' + $(td).parent().children().eq(0).find('#hdnHorarioTermino').val() + ' ' + $(this).parent().find('#hdnTipoAtribuicao').val());
                                    };
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].HoraDeInicioDasAulas":"' + $(td).parent().children().eq(0).find('#hdnHorarioInicio').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].HoraDeFimDasAulas":"' + $(td).parent().children().eq(0).find('#hdnHorarioTermino').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].DiaDaSemana": "' + $(td).find('#hdnDiaSemana').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].DtInicioVigencia": "' + $('#inserirAssociacaoClasse #txtInicioVigenciaVisaoProf').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].CodigoDisciplina": "' + $(this).parent().find('#hdnCdDisciplina').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].DtFimVigencia": "' + $('#inserirAssociacaoClasse #txtFimVigenciaVisaoProf').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].TpBaseCurric": "' + $(this).parent().find('#hdnTpBaseCurric').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].TpAtribuicao": ' + $(this).parent().find('#hdnTipoAtribuicao').val();
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].DataVigenciaQuadro": "' + $('#inserirAssociacaoClasse #txtFimVigenciaVisaoProf').val() + '"';
                                    indexAula++;
                                }
                            });
                        }
                    }
                });
            });

            params += '}';

            if ($('#tbAssociacaoClasse .tile').length == 0) {
                Mensagem.Alert({
                    titulo: "Associação",
                    mensagem: 'É necessário inserir professores na grade de aulas!',
                    tipo: "Alerta",
                    botao: "Fechar"
                });
                return;
            }

            var json = JSON.parse(params);
            $.post('../../AssociacaoProfessorClasse/SalvarAssociacaoClasse', json, function (data) {
                if (data) {
                    $("#divInserirAssociacaoClasse").empty().dialog('close');
                    $('#btnPesquisarAssociacaoClasse').click();
                }
            });
        });
    },

    Editar: function () {
        $('#btnEditarAssociacaoClasse').bind('click', function () {
            var naoexisteObjetoPrefessor = true;
            var params = '{ ';
            var indexAssocioacao = 0;
            var indexAula = 0;
            var associacaoesAdicionada = [];
            var td;
            $('#profsEdit .inserirAco').each(function (i, ui) {
                naoexisteObjetoPrefessor = true;
                var cdAassociacao = $(this).find('#cdAssociacao').val();
                var cdDisciplina = $(this).find('#hdnCdDisciplina').val();

                $('#tbAssociacaoClasseEdt tr td').each(function () {
                    if (cdAassociacao != undefined && $.inArray(cdAassociacao, associacaoesAdicionada) === -1) {
                        td = this;
                        if ($(this).find('.drog').length > 0) {
                            $(this).find('.drog #cdAssociacao').each(function () {
                                if (cdAassociacao === this.value && typeof $(this).parent().find('#hdnCdAula').val() === "undefined") {
                                    if (naoexisteObjetoPrefessor) {
                                        var cpf = $(this).parent().find('#hdnCpf').val();
                                        var di = $(this).parent().find('#di').val();
                                        var tipoAtrib = $(this).parent().find('#hdnTipoAtribuicao').val();

                                        if (associacaoesAdicionada.length > 0) {
                                            params += ',';
                                        }

                                        params += ' "listaAssociacao[' + indexAssocioacao + '].Professor.NumeroCpf": ' + '"' + cpf + '"';
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Id": ' + cdAassociacao;
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Di": ' + di;
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Tipo": ' + tipoAtrib;
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].TipoEnsino.CD_TIPO_ENSINO": ' + $('#hdnCdTipoEnsino').val();
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Turma.CD_TURMA":' + $('#hdnTurma').val();
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Turma.CD_TURNO":' + $('#hdnCdTurno').val();
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].AnoLetivo": "' + $('#formAssociacaoClasse #txtAnoLetivo').val() + '"';
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].TipoClasse": "' + $('#hdnCdTipoClasse').val() + '"';
                                        params += ' ,"listaAssociacao[' + indexAssocioacao + '].Escola.CD_ESCOLA": "' + $('#hdnCdEscola').val() + '"';

                                        naoexisteObjetoPrefessor = false;
                                        indexAssocioacao++;
                                        indexAula = 0;
                                        associacaoesAdicionada.push(cdAassociacao + ' ' + $(td).find('#hdnDiaSemana').val() + ' ' + $(td).parent().children().eq(0).find('#hdnHorarioInicio').val() + ' ' + $(td).parent().children().eq(0).find('#hdnHorarioTermino').val());
                                    };
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].HoraDeInicioDasAulas":"' + $(td).parent().children().eq(0).find('#hdnHorarioInicio').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].HoraDeFimDasAulas":"' + $(td).parent().children().eq(0).find('#hdnHorarioTermino').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].DiaDaSemana": "' + $(td).find('#hdnDiaSemana').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].DtInicioVigencia": "' + $('#editarAssociacaoClasse #dtIniVigEditar').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].CodigoDisciplina": "' + $(this).parent().find('#hdnCdDisciplina').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].DtFimVigencia": "' + $('#editarAssociacaoClasse #dtFimVigEditar').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].TpBaseCurric": "' + $(this).parent().find('#hdnTpBaseCurric').val() + '"';
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].TpAtribuicao": ' + $(this).parent().find('#hdnTipoAtribuicao').val();
                                    params += ', "listaAssociacao[' + (indexAssocioacao - 1) + '].ListaAula[' + indexAula + '].DataVigenciaQuadro": "' + $('#editarAssociacaoClasse #dtFimVigEditar').val() + '"';
                                    indexAula++;
                                }
                            });
                        }
                    }
                });
            });

            params += '}';

            if (params != "{ }") {
                var json = JSON.parse(params);
                $.post('../../AssociacaoProfessorClasse/SalvarAssociacaoClasse', json, function (data) {
                    if (data) {
                        $("#divEditarAssocicaoClasse").dialog('close');
                        $('#btnPesquisarAssociacaoClasse').click();
                    }
                });
            }

            if ($('#editarAssociacaoClasse #txtInicioVigenciaVisaoProf').val() != $('#editarAssociacaoClasse #dtIniVigEditar').val() || $('#editarAssociacaoClasse #txtFimVigenciaVisaoProf').val() != $('#editarAssociacaoClasse #dtFimVigEditar').val()) {
                var params = {
                    cdTurma: $('#hdnCdTurma').val(),
                    dtInicioVigencia: $('#editarAssociacaoClasse #txtInicioVigenciaVisaoProf').val(),
                    dtFimVigencia: $('#editarAssociacaoClasse #txtFimVigenciaVisaoProf').val()
                };

                $.post('../../AssociacaoProfessorClasse/EditarAssociacaoTurma', params, function (data) {
                    $('#btnPesquisarAssociacaoClasse').click();
                });
            }
        });
    },
    CarregarDatePickers: function () {
        $("#txtFimVigenciaVisaoProf").datepicker({ maxDate: new Date(2018, 11, 21) });
        //$("#txtFimVigenciaVisaoProf").datepicker();
        $("#txtInicioVigenciaVisaoProf").datepicker("disable");
    },
    Validar: function () {
        $('#inserirAssociacaoClasse').validate({
            rules: {
                txtInicioVigenciaVisaoProf: {
                    required: true,
                    minlength: 10,
                    validarDataInicio: $('#txtFimVigenciaVisaoProf'),
                    dataValida: true
                },

                txtFimVigenciaVisaoProf: { required: true, dataValida: true }
            },
            messages: {
                txtInicioVigenciaVisaoProf: {
                    required: 'Data Inválida',
                    minlength: 'Data Inválida'
                },
                txtFimVigenciaVisaoProf: {
                    required: 'Data Inválida',
                    minlength: 'Data Inválida'
                }
            }
        });
    },
    DeleteLocal: function () {
        $('.deleteLocal').click(function () {
            $(this).focus();
            var button = $(this);
            $("#divConfirmaExcluirAssociacaoClasse").dialog({
                resizable: false,
                height: 168,
                modal: true,
                buttons: {
                    "Sim": function () {
                        $("#divConfirmaExcluirAssociacaoClasse").dialog('close');

                        var idDisciplinaExcluida = $(button).parent().find('#hdnCdDisciplina').val();
                        var idDisciplinaLibras = $(button).parent().parent().find($('.verde')).find('#hdnCdDisciplina').val();

                        if (idDisciplinaExcluida == idDisciplinaLibras) {
                            $(button).parent().parent().find($('.verde')).remove();
                        }

                        $(button).parent().remove();
                    },
                    'Cancelar': function () {
                        $("#divConfirmaExcluirAssociacaoClasse").dialog('close');
                    }
                }
            });
        });
    },
    PesquisarProfessoresEAula: function () {
        //if (document.getElementById('DtInicioVigAnterior').value.length === 10 && document.getElementById('DtFimVigAnterior').value.length === 10) {

        if ($('#inserirAssociacaoClasse #DtInicioVigAnterior').length == 0 || $('#inserirAssociacaoClasse #DtFimVigAnterior').length == 0)
            return;

        var inicio = $('#inserirAssociacaoClasse #DtInicioVigAnterior').val().split('/');
        inicio = inicio[2] += inicio[1] += inicio[0];
        var fim = $('#inserirAssociacaoClasse #DtFimVigAnterior').val().split('/');
        fim = fim[2] += fim[1] += fim[0];

        if (fim < inicio) {
            $('#divPesquisaProfsAulas').empty();
            return;
        }
        var params = {
            cdTurma: $('#formAssociacaoClasse #cboTurma').val(),
            dtFimVigencia: $('#inserirAssociacaoClasse #txtFimVigenciaVisaoProf').val(),
            dtInicioVigencia: $('#inserirAssociacaoClasse #txtInicioVigenciaVisaoProf').val(),
            sabado: $('#formAssociacaoClasse #cboDiaSemana').val(),
            tipoOperacao: $('#btnInserirAssociacaoClasse').attr('data-tpOperacao')
        };

        $.post('../../AssociacaoProfessorClasse/PesquisaProfessoresEAulas', params, function (data) {

            if (data.length > 0) {
                $('#divPesquisaProfsAulas').empty().html(data);
                AssociacaoClasse.IniciarDraggable(1);
                AssociacaoClasse.DeleteLocal();
                $('#btnCadastrarAssociacaoClasse').show();
                //AssociacaoClasse.IniciaToolTip(); 
            }
            else {
                $('#btnCadastrarAssociacaoClasse').show();
            }
        }, 'html');

        //}
    },
    IniciaToolTip: function () {
        $(".tile").tooltip({
            content: function () {
                return $(this).prop('title');
            }
        });
    },

    PesquisaAssociocaoClasse: function () {
        $('#btnPesquisarAssociacaoClasse').click(function () {

            if (!$('#formAssociacaoClasse').valid()) return;
            var params = {
                cdEscola: $('#formAssociacaoClasse #filtroaba3-escola').val(),
                cdTipoEnsino: $('#formAssociacaoClasse #filtroaba3-tipoEnsino').val(),
                cdTurma: $('#formAssociacaoClasse #cboTurma').val(),
                anoLetivo: $('#formAssociacaoClasse #filtroaba3-anoLetivo').val(),
                ehSabado: $('#formAssociacaoClasse #cboDiaSemana').val()
            };

            var f = new Array();
            $("#formAssociacaoClasse .form-group").each(
                function (i, e) {
                    var v = $(e).children("label").next("div").children("input, textarea, select").eq(0);
                    console.log(v.val());
                    if (v.val() != null || v.val().trim().length > 0)
                        f.push({ nome: $(e).children("label").html().replace(":", ""), valor: $(v).children("option").length == 0 ? $(v).val() : $(v).children("option:selected").html() });
                });

            $.post('../../AssociacaoProfessorClasse/PesquisaAssociacaoClasse', params, function (data) {
                $('#divPesquisaAssocicaoClasse').empty().html(data);
                $('#tbPesquisaAssocicaoClasse').sedDataTable({
                    nomeExportacao: "Cadastro horário",
                    tituloFiltro: "     ",
                    filtros: f,
                    columnDefs: [
                         { targets: [5, 6], orderable: false },
                    ]
                });
                AssociacaoClasse.VisualizarAssociacaoClasse();
                AssociacaoClasse.EditarAssociacaoClasse();
                AssociacaoClasse.DeletarTodasAssociacaoClasse();
            }, 'html');
        });
    },
    VisualizarAssociacaoClasse: function () {

        $('.visualizarAssociacaoClasse').click(function () {
            var tr = $(this).parent().parent();
            var params = {
                cdTurma: $(this).parent().find('#hdnCdTurma').val(),
                dtInicioVigencia: $(this).parent().find('#hdnDtIniVigencia').val(),
                dtFimVigencia: $(this).parent().find('#hdnDtFimVigencia').val(),
                diaSemana: $(this).parent().find('#hdnDiaSemana').val()
            };
            $.post('../../AssociacaoProfessorClasse/VisualizarAssociacaoClasse', params, function (data) {

                $('#divVisualizarAssocicaoClasse').empty().html(data);
                $('#divVisualizarAssocicaoClasse').find('#pEscola').html($(tr).find('td').eq(0).html());
                $('#divVisualizarAssocicaoClasse').find('#pTipoEnsino').html($(tr).find('td').eq(1).html());
                $('#divVisualizarAssocicaoClasse').find('#pTurma').html($(tr).find('td').eq(2).html());
                $('#divVisualizarAssocicaoClasse').find('#pIniVig').html($(tr).find('td').eq(3).html());
                $('#divVisualizarAssocicaoClasse').find('#pFimVig').html($(tr).find('td').eq(4).html());

                $('#divVisualizarAssocicaoClasse').dialog({
                    width: "lg",
                    position: ['center', 0]

                });
                //AssociacaoClasse.IniciaToolTip();
            }, 'html');
        });
    },
    VisualizarAssociacaoClasseEdt: function (params) {

        $.post('../../AssociacaoProfessorClasse/PesquisaProfessoresEAulas', params, function (data) {

            if (data.length > 0) {
                $('#divVisualizarAssocicaoClasseEdt').empty().html(data);
                AssociacaoClasse.IniciarDraggable(2);
                AssociacaoClasse.DeletarAssociacaoClasseServer();
                $('#btnEditarAssociacaoClasse').show();
            }
            else {
                $('#btnEditarAssociacaoClasse').show();
            }
        }, 'html');
    },
    DeletarTodasAssociacaoClasse: function () {
        $('.excluirAssociacaoClasse').click(function () {

            var tr = $(this).parent().parent();
            var params = {
                cdTurma: $(this).parent().find('#hdnCdTurma').val(),
                dtInicioVigencia: $(tr).find('td').eq(3).html(),
                dtFimVigencia: $(tr).find('td').eq(4).html(),
                diaSemana: $(this).parent().find('#hdnDiaSemana').val()
            };

            $("#divConfirmaExcluirAssociacao").dialog({
                resizable: false,
                height: 168,
                modal: true,
                buttons: {
                    "Sim": function () {
                        $.post('../../AssociacaoProfessorClasse/DeletarTodasAssociacaoClasse', params, function (data) {
                            $('#btnPesquisarAssociacaoClasse').click();
                        });
                        $("#divConfirmaExcluirAssociacao").dialog('close');

                    },
                    'Cancelar': function () {
                        $("#divConfirmaExcluirAssociacao").dialog('close');
                    }
                },
                close: function () {
                    //$("#divConfirmaExcluirAssociacao").dialog('close');
                }
            });
        });
    },

    EditarAssociacaoClasse: function () {
        $('.editarAssociacaoClasse').click(function () {

            var tr = $(this).parent().parent();
            var params = {
                cdTurma: $(this).parent().find('#hdnCdTurma').val(),
                dtInicioVigencia: $(tr).find('td').eq(3).html(),
                dtFimVigencia: $(tr).find('td').eq(4).html(),
                sabado: $(this).parent().find('#hdnDiaSemana').val(),
                tipoOperacao: 2
            };

            $.post('../../AssociacaoProfessorClasse/EditarAssociacaoClasse', params, function (data) {
                $('#divEditarAssocicaoClasse').empty().html(data);
                AssociacaoClasse.Editar();
                AssociacaoClasse.CarregarDatePickers();
                AssociacaoClasse.VisualizarAssociacaoClasseEdt(params);
                $('#divEditarAssocicaoClasse').dialog({
                    width: "lg",
                    position: ['center', 0]

                });
                AplicarMascaras();
                AssociacaoClasse.Validar();
            }, 'html');
        });
    },
    DeletarAssociacaoClasseServer: function () {
        $('.deleteServer').click(function () {

            var params = {
                cdAula: $(this).parent().find('#hdnCdAula').val()
            };

            var button = $(this);
            $("#divConfirmaExcluirAulaClasse").dialog({
                resizable: false,
                height: 168,
                modal: true,
                buttons: {
                    "Sim": function () {
                        $.post('../../AssociacaoProfessorClasse/DeleteAssociacaoClasse', params, function () {
                            var idDisciplinaExcluida = $(button).parent().find('#hdnCdDisciplina').val();
                            var idDisciplinaLibras = $(button).parent().parent().find($('.verde')).find('#hdnCdDisciplina').val();

                            if (idDisciplinaExcluida == idDisciplinaLibras) {
                                $(button).parent().parent().find($('.verde')).remove();
                            }

                            $(button).parent().remove();
                        });
                        var idDisciplinaExcluida = $(button).parent().find('#hdnCdDisciplina').val();
                        var idDisciplinaLibras = $(button).parent().parent().find($('.verde')).find('#hdnCdDisciplina').val();

                        if (idDisciplinaExcluida == idDisciplinaLibras) {
                            $(button).parent().parent().find($('.verde')).remove();
                        }

                        $(button).parent().remove();
                        $("#divConfirmaExcluirAulaClasse").dialog('close');
                    },
                    'Cancelar': function () {
                        $("#divConfirmaExcluirAulaClasse").dialog('close');
                    }
                },
                close: function () {
                    //$("#divConfirmaExcluirAssociacaoClasse").dialog('close');
                }
            });
        });
    }
};

var CadastroAssociacao = {

    AbrirModalToolTipDisciplina: function () {
        $('#btn-tooltip-disciplina').click(function () {
            $("#divModalToolTipDisciplina1").dialog({
                resizable: false,
                height: 160,
                title: 'Disciplina',
                modal: true,
                buttons: {
                    "OK": function () {
                        $("#divModalToolTipDisciplina1").dialog('close');
                    }
                }
            });
        });
    },

    CarregarCombos: function () {
        //$('#formCadastroAssociocao #cboDiretoriaAssociacao').autoPreencher($('#formCadastroAssociocao #cboEscolaAssociacao'), 'Escola', 'CarregarListaEscolas');

        $('#formCadastroAssociocao #TipoDiretoriaAssociacao').autoPreencher($('#formCadastroAssociocao #cboDiretoriaAssociacao'), 'Diretoria', 'CarregarListaDiretoriasCompletoPorTipoAtribuicao',
          [{ id: "'TipoDiretoriaAssociacao'" }]);

        $("#formCadastroAssociocao #cboDiretoriaAssociacao").autoPreencher($("#formCadastroAssociocao #cboEscolaAssociacao"), "Escola", "CarregaListaEscolasPorTipoDiretoriaMunicipioAtribuicao",
            [{ CodigoDiretoria: "'cboDiretoriaAssociacao'", TipoDiretoria: "'TipoDiretoriaAssociacao'" }]);
    },

    CarregaCombosModal: function () {
        $('#cboTipoEnsinoAdicionar').autoPreencher($('#cboTurmaAdicionar'), 'Turma', 'CarregarListaTurmaPorTpAtribuicaoComAuxiliar', null, null, null, null, null, function (dllAlvo, jsonAdicionar) {
            var params = {
                CodigoEscola: $('#formCadastroAssociocao #filtroaba2-escola').val(),
                TpAtribuicao: $('#cboTipoAtribuicaoAdicionar').val(),
                AnoLetivo: $('#formAdiconarAssociacao  #sAnoLetivo').html(),
                CodigoTipoEnsino: $('#cboTipoEnsinoAdicionar').val(),
                EhAuxiliar: $('#cboDiAdicionar :selected').attr('data-ehauxiliar') == "True" && $('#EhMonitorEAuxiliar').val() == "False" ? true : false
            };
            jsonAdicionar(params);
        });

        $('#cboDiAdicionar').change(function () {
            if ($(this).val() > 0)
                $.ajax({
                    type: 'POST',
                    url: '/AssociacaoProfessorClasse/VerificaSeDocentePossuiArt22',
                    dataType: 'JSON',
                    data: {
                        cpf: $("#txtCpf").val().replace('.', '').replace('.', '').replace('-', ''),
                        di: $("#cboDiAdicionar").val(),
                        codEscola: $('#formCadastroAssociocao #filtroaba2-escola').val()
                    },
                    success: function (data) {
                        if (data)
                            $('#hdnEhArtigo22').val(true);
                        else
                            $('#hdnEhArtigo22').val(false);
                    }
                });

            if ($('#EhMonitorEAuxiliar').val() != 'True')
                if ($('#cboDiAdicionar :selected').attr('data-ehauxiliar') == "True") {
                    var i = 0;
                    $('#cboTipoEnsinoAdicionar option').each(function (i, e) {
                        if ($(e).val() == 14) {
                            $('#cboTipoEnsinoAdicionar').prop('selectedIndex', i).attr("disabled", true);
                            $("select#cboTipoEnsinoAdicionar").trigger("change");
                            return;
                        }
                        i++;
                    })
                } else {
                    $('#cboTipoEnsinoAdicionar').attr("disabled", false);
                    $("select#cboTipoEnsinoAdicionar").trigger("change");
                }
        });

        $('#cboTurmaAdicionar').autoPreencher($('#cboDisciplinaAdicionar'), 'Disciplina', 'CarregarDisciplinasPorCodigoTurma');

        $('#cboTurmaAdicionar').change(function () {
            var turma = $('#cboTurmaAdicionar').val();
            if (turma != "") {
                fct_CarregarSubTurmas(turma);
            }
            else {
                $('#checkEmSubstituicao').attr({ "checked": false, "disabled": false });
            }

            if ($(this).text().includes('INTEGRAL') || parseInt($('#cboTipoAtribuicaoAdicionar').val()) == 6
                || parseInt($('#cboTipoAtribuicaoAdicionar').val()) == 2) {
                $("[name='cboFase']").rules('add', {
                    required: false
                });
                $('#cboFase').removeClass('error');
            }
        });

        $('#checkEmSubstituicao').change(function () {
            if (!$('#checkEmSubstituicao').is(':checked'))
                $('#msgAfastamento').hide();
        });

        $('#cboTipoAtribuicaoAdicionar').change(function () { CadastroAssociacao.VerificaSubstituicao(this) });
        $('#txtVigenciaInicioAdicionar').change(function () { CadastroAssociacao.VerificaSubstituicao(this) });
        $('#txtVigenciaFimAdicionar').change(function () { CadastroAssociacao.VerificaSubstituicao(this) });

        $('#checkEmSubstituicao').change(function () {
            if (parseInt($('#cboTipoAtribuicaoAdicionar').val()) > 0) {
                var params = {
                    cdTurma: $('#formAdiconarAssociacao #cboTurmaAdicionar :selected').val(),
                    cdDisciplina: $('#formAdiconarAssociacao #cboDisciplinaAdicionar :selected').val(),
                    tpAtribuicao: $('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar :selected').val(),
                    InicioVig: $('#formAdiconarAssociacao #txtVigenciaInicioAdicionar').val(),
                    FimVigencia: $('#formAdiconarAssociacao #txtVigenciaFimAdicionar').val(),
                    CheckSubstituicao: $('#formAdiconarAssociacao #checkEmSubstituicao').is(':checked')
                };
                $.ajax({
                    type: 'POST',
                    url: '/AssociacaoProfessorClasse/VerificaSeJaExiste',
                    dataType: 'JSON',
                    data: {
                        cdTurma: params.cdTurma,
                        cdDisciplina: params.cdDisciplina,
                        tpAtribuicao: params.tpAtribuicao,
                        InicioVig: params.InicioVig,
                        FimVigencia: params.FimVigencia,
                        CheckSubstituicao: params.CheckSubstituicao,
                        cpf: $('#formCadastroAssociocao #txtCpf').val().replace('.', '').replace('.', '').replace('-', ''),
                        di: (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ?
                            $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').val()),
                        cdRedeEnsino: $('#formCadastroAssociocao #filtroaba2-redeEnsino').val()
                    },
                    success: function (data) {
                        if (data == 0)
                            $('#checkEmSubstituicao').prop('checked', '');
                    }
                });
                //Mensagem.IgnorarMensagensAutomaticas = false;
            }
        });


        $('#cboTurmaAdicionar :selected').change(function () {
            debugger
            $(this).text().indexOf('INTEGRAL') > -1 ?
            $('#cboFase').prop('required', false) : $('#cboFase').prop('required', true);
        });

        //$('#cboFase').change(function () {
        //    if ($(this).val() == 0)
        //        return;

        //    var params = {
        //        cpf: $('#formCadastroAssociocao #txtCpf').val().replace('.', '').replace('.', '').replace('.', '').replace('-', ''),
        //        di: $('#cboDiAdicionar :selected').val(),
        //        codFase: $('#formAdiconarAssociacao #cboFase :selected').val(),
        //        codDisciplina: $('#formAdiconarAssociacao #cboDisciplinaAdicionar :selected').val(),
        //        qtdeAulasInserir: CadastroAssociacao.ContaQtdeAulaSemanaInserir(),
        //        EhArtigo22: $('#hdnEhArtigo22').val()
        //    }

        //    $.post('../../AssociacaoProfessorClasse/VerificaJornadaAtribuida', params, function (data) {
        //        Mensagem.IgnorarMensagensAutomaticas = false;
        //        if (data)
        //            return;
        //        else
        //            $('#cboFase').val('');
        //    });
        //})
    },

    CarregarDatePickers: function () {
        $("#txtVigenciaFimAdicionar").datepicker();
        $("#txtVigenciaInicioAdicionar").datepicker();
    },

    CheckSubstituicao: function () {

    },

    ContaQtdeAulaSemanaInserir: function () {
        var cont = 0;
        $('#tdAdicionar').find('tbody tr').each(function (i, value) {
            if (!$(this).find('.icone-tabela-excluir').parent().hasClass('deletarAssociacaoServer') && $(this).find('.icone-tabela-aviso').length == 0
                && ($(this).find('#cboFase') == 1 || $(this).find('#cboFase') == 2 || $(this).find('#cboFase') == 4)) {
                cont += parseInt($(this).find('#nrHoraAulaSemana').val());
            }
        });
        return cont;
    },

    LimparCampos: function () {
        parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar').val('') : $('#cboDiAdicionar').val('');
        $('#cboTipoEnsinoAdicionar').val('');
        $('#cboTurmaAdicionar').val('');
        $('#cboSubTurma').val('');
        $('#cboDisciplinaAdicionar').val('');
        $('#cboTipoAtribuicaoAdicionar').val('');
        $('#txtVigenciaInicioAdicionar').val('');
        $('#txtVigenciaFimAdicionar').val('');
        $('#cboFase').val('');
        $('#checkEmSubstituicao').removeAttr('disabled').prop('checked', false);
    },

    Validacaoes: function () {
        $('#formCadastroAssociocao').validate({
            rules: {
                'filtroaba2-diretoria': { required: true },
                'filtroaba2-escola': { required: true },
                txtCpfAssociacao: { required: true },
                'filtroaba2-anoLetivo': { required: true, minlength: 4 }
            },

            messages: {
                required: 'Obrigatório',
                AnoLetivoAssociar: { minlength: 'Ano inválido' }
            }
        });
    },
    ValidarCadastro: function () {
        $('#formAdiconarAssociacao').validate({
            rules: {
                cboDiAdicionarAssociacao: { required: true },
                cboVinculoDocenteAdicionar: {
                    required: function () {
                        return $('#formCadastroAssociocao #filtroaba2-redeEnsino').val() > 1
                    }
                },
                cboTipoAtribuicaoAdicionarAssociacao: { required: true },
                cboQtdeAulasAdicionar: {
                    required: function () {
                        return $('#formCadastroAssociocao #filtroaba2-redeEnsino').val() > 1
                    }
                },
                cboTipoEnsinoAdicionarAssociacao: { required: true },
                cboTurmaAdicionarAssociacao: { required: true },
                cboDisciplinaAdicionarAssociacao: { required: true },
                cboFase: {
                    required: function (element) {
                        return $('#formCadastroAssociocao #filtroaba2-redeEnsino').val() == 1 ||
                            ($('#formCadastroAssociocao #filtroaba2-redeEnsino').val() == 1 && !($('#cboTurmaAdicionar :selected').text().includes('INTEGRAL')))
                    }
                },
                txtVigenciaInicioAdicionarAssociacao: { required: true, dataValida: true },
                txtVigenciaFimAdicionarAssociacao: { required: true, dataValida: true }
            },
            messages: 'Obrigatório'
        });
    },

    VerificaSubstituicao: function (e) {
        var params = {
            cdTurma: $('#formAdiconarAssociacao #cboTurmaAdicionar :selected').val(),
            cdDisciplina: $('#formAdiconarAssociacao #cboDisciplinaAdicionar :selected').val(),
            tpAtribuicao: $('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar :selected').val(),
            InicioVig: $('#formAdiconarAssociacao #txtVigenciaInicioAdicionar').val(),
            FimVigencia: $('#formAdiconarAssociacao #txtVigenciaFimAdicionar').val(),
            CheckSubstituicao: $('#formAdiconarAssociacao #checkEmSubstituicao').is(':checked')
        };

        if ($('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar :selected').text() == "Selecione..")
            $('#checkEmSubstituicao').prop('disabled', '');

        if (parseInt($(e).val()) == 6 || parseInt($(e).val()) == 2) {
            $('#formAdiconarAssociacao #cboFase').rules("remove", "required");
            $('#cboFase-error').remove();
            $('#cboFase').removeClass('error');
            $('#cboFase').removeClass('aria-required');
        }
        else
            $('#formAdiconarAssociacao #cboFase').rules('add', {
                required: true
            });

        if ($('#formCadastroAssociocao #filtroaba2-redeEnsino').val() == 1) {
            if (parseInt(params.tpAtribuicao) != 6) {
                if (params.cdTurma > 0 && params.cdDisciplina > 0 && params.tpAtribuicao > 0 &&
                    params.InicioVig != "" && params.FimVigencia != "") {
                    Mensagem.IgnorarMensagensAutomaticas = false;
                    VerificaSeEhSubstituicao(params);
                }
                else {
                    $('#cboTipoAtribuicaoAdicionar').val("");
                    $('#checkEmSubstituicao').prop('disabled', '').prop('checked', '');
                    $('#dadosSubstituido').empty();
                    $('#formAdiconarAssociacao #txtVigenciaInicioAdicionar').valid();
                    $('#formAdiconarAssociacao #txtVigenciaFimAdicionar').valid();
                }
            }
        }
    },

    SubstituiTodasAsAulasDoDocente: function (nrCpf, di, dtInicioVigencia, dtFimVigencia, nomeSubstituido, codFase,
        codTurma, codDisciplina) {
        var params = {
            nrCpf: nrCpf,
            nrDi: parseInt(di),
            codEscola: parseInt($('#formCadastroAssociocao #filtroaba2-escola').val()),
            codDiretoria: parseInt($('#formCadastroAssociocao #filtroaba2-diretoria').val()),
            codTurma: codTurma,
            anoLetivo: parseInt(($('#filtroDE-anoLetivo').text())),
            codDisciplina: codDisciplina,
            dtInicioVigencia: dtInicioVigencia,
            dtFimVigencia: dtFimVigencia,
            nomeSubstituido: nomeSubstituido,
            codFase: codFase
        }
        $.ajax({
            type: 'POST',
            url: '../../AssociacaoProfessorClasse/EscolherAulasSubstituicao',
            data: {
                nrCpf: params.nrCpf,
                nrDi: params.nrDi,
                codEscola: params.codEscola,
                codDiretoria: params.codDiretoria,
                anoLetivo: params.anoLetivo,
                dtInicioVigencia: params.dtInicioVigencia,
                dtFimVigencia: params.dtFimVigencia,
                nomeSubstituido: nomeSubstituido,
                codFase: params.codFase,
                codTurma: params.codTurma,
                codDisciplina: params.codDisciplina
            },
            success: function (data) {
                $('#dialogEscolherAulasSubstituicao').dialog({
                    resizable: false,
                    width: 1020,
                    height: 400,
                    modal: true,
                    title: 'Associação do Professor a Classe',
                    buttons: {
                        "Substituir": function () {
                            var substituicoes = $('#tdAdicionarSubstituicao');
                            var linhas = '';
                            $('#dialogEscolherAulasSubstituicao').dialog('close');
                            //$('#divConfirmaSubstituiTudo').dialog('close');
                            var i = 0;
                            $(substituicoes).find('tbody tr').each(function () {
                                debugger
                                if ($(this).find('input#check' + i.toString()).is(' :checked'))
                                    //if ($(this).find('#check' + i.toString()).val() == 'on')
                                    linhas += '<tr><td style="font-size: 12px;">' + $(this).find('td:nth-child(2)').text() + '<input type="hidden" id="hdnDi" value="' + $(this).find('td:nth-child(2)').text() + '">' + '</td>' +
                                          '<td style="font-size: 12px;">' + $(this).find('td:nth-child(3)').text() + '<input type="hidden" id="hdnTipoAtribuicao" value="' + $(this).find('#hdnTipoAtribuicao').val() + '">' + '</td>' +
                                          '<td style="font-size: 12px;">' + $(this).find('td:nth-child(4)').text() + '<input type="hidden" id="hdnTipoEnsino" value="' + $(this).find('#hdnTipoEnsino').val() + '">' + '</td>' +
                                          '<td style="font-size: 12px;">' + '<input type="hidden" id="CodigoFase" value="' + $(this).find('#hdnCodigoFase').val() + '">' + $(this).find('td:nth-child(5)').text() + '</td>' +
                                          '<td style="font-size: 12px;">' + $(this).find('td:nth-child(6)').text() + '<input type="hidden" id="hdnTurma" value="' + $(this).find('#hdnTurma').val() + '">' + '</td>' +
                                          '<td style="font-size: 12px;">' + $(this).find('td:nth-child(7)').text() + '<input type="hidden" id="hdnSubTurma" value="' + $(this).find('#hdnSubTurma').val() + '">' + '</td>' +
                                          '<td style="font-size: 12px;">' + $(this).find('td:nth-child(8)').text() + '<input type="hidden" id="hdnDisciplina" value="' + $(this).find('#hdnDisciplina').val() + '">' + '</td>' +
                                          '<td>Substituição<input type="hidden" id="hdnEhSubstituicao" value=' + true + '></td>' +
                                          '<td style="font-size: 12px;">' + $(this).find('td:nth-child(10)').text() + '<input type="hidden" id="hdnVigenciaInicio" value="' + $(this).find('td:nth-child(10)').text() + '">' + '</td>' +
                                          '<td style="font-size: 12px;">' + $(this).find('td:nth-child(11)').text() + '<input type="hidden" id="hdnVigenciaFim" value="' + $(this).find('td:nth-child(11)').text() + '">' + '</td>' +
                                          '<td style="font-size: 12px;">' + $(this).find('td:nth-child(12)').text() + '<input type="hidden" id="hdnNomeSubstituido" value="' + $(this).find('td:nth-child(12)').val() + '">' + '</td>' +
                                          '<td style="font-size: 12px;">' + $(this).find('td:nth-child(13)').text() + '<input type="hidden" id="hdnVigenciaFim" value="' + $(this).find('td:nth-child(13)').val() + '">' + '</td>' +
                                          '<td style="font-size: 12px;"><a class="deletarAssociacaoLocal"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
                                    '</tr>';
                                i++;
                            });
                            $('#tdAdicionar').append(linhas);
                            CadastroAssociacao.DeletarAssociacaoLocal();
                        },

                        'Cancelar': function () {
                            $("#dialogEscolherAulasSubstituicao").dialog('close');
                        }
                    }
                }).empty().append(data);

                $('#CheckSubstituiTodos').change(function (item) {
                    if (item.currentTarget.checked)
                        $('#tdAdicionarSubstituicao > tbody > tr > td > input').prop('checked', true);
                    else
                        $('#tdAdicionarSubstituicao > tbody > tr > td > input').prop('checked', false);
                });
            }
        });
    },

    PesquisarProfessor: function () {

        $('#btnCadastrarAssociacao').click(function () {

            $("[name='txtCpfAssociacao']").rules('add', {
                required: true
            });

            if (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino').val()) == 0) {

                $.validator.addMethod('minValue', function (value, el, param) {
                    return value >= param;
                });

                $("[name='filtroaba2-redeEnsino']").rules("add", {
                    minValue: 1,
                    messages: {
                        minValue: "É necessário selecionar uma rede de ensino para cadastrar"
                    }
                });
            }

            if (!$('#formCadastroAssociocao').valid()) return;

            var params = {
                cpf: String($('#txtCpf').val().replace('.', '').replace('.', '').replace('-', '')),
                cdEscola: $('#formCadastroAssociocao #filtroaba2-escola').val(),
                anoLetivo: $('#formCadastroAssociocao #filtroaba2-anoLetivo').val(),
                Di: 0,
                cdRedeEnsino: $('#formCadastroAssociocao #filtroaba2-redeEnsino').val(),
                cdDiretoria: $('#formCadastroAssociocao #filtroaba2-diretoria').val()
                //codTipoDiretoria: $('#formCadastroAssociocao #TipoDiretoriaAssociacao').val()
            };

            $.post('../../AssociacaoProfessorClasse/PesquisarProfessorAssociacao', params, function (data) {
                if (data.length > 0) {
                    $('#divGridCadastroAssociacao').empty().html(data);
                    $('#divGridCadastroAssociacao').dialog({
                        width: 1020,
                        title: "Associação de Professor a classe",
                        position: ['center', 0]

                    });
                    CadastroAssociacao.AdicionarAssociacao();
                    CadastroAssociacao.Salvar();
                    CadastroAssociacao.CarregaCombosModal();
                    CadastroAssociacao.CarregarDatePickers();
                    CadastroAssociacao.DeletarAssociacaoServer();
                    CadastroAssociacao.ValidarCadastro();
                    CadastroAssociacao.AbrirModalToolTipDisciplina();

                    $('#formAdiconarAssociacao #cboDisciplinaAdicionar').change(function () {
                        if ($('#cboDisciplinaAdicionar').val() > 0) {
                            //if (ValidarDisciplinaAtuacao()) {
                            if ($(this).find('option:selected').index() === 0) {
                                $('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar').empty();
                                $('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar').append('<option value="">Selecione...</option>');

                            }
                            else {
                                $('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar').val('');
                                var params = {
                                    cdTurma: $('#formAdiconarAssociacao #cboTurmaAdicionar :selected').val(),
                                    cdDisciplina: $('#formAdiconarAssociacao #cboDisciplinaAdicionar :selected').val(),
                                    cdRedeEnsino: $('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val(),
                                    ehAuxiliarDocente: $('#formAdiconarAssociacao #hdnAuxiliar').val(),
                                    ehMonitor: $('#formAdiconarAssociacao #hdnMonitor').val(),
                                    EhMonitorEAuxiliar: $('#formAdiconarAssociacao #EhMonitorEAuxiliar').val()
                                };

                                $('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar').empty();
                                $('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar').append('<option value="">Selecione...</option>');

                                $.post('../../AssociacaoProfessorClasse/ListaTipoAtribuicaoEhVigenciaQuadroAula', params, function (tiposAtribuicao) {
                                    $(tiposAtribuicao.ListComboTipoAtribuicao).each(function () {
                                        $('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar').append('<option value="' + this.Value + '">' + this.Text + '</option>');
                                    });
                                    teste = tiposAtribuicao;
                                    $('#formAdiconarAssociacao #txtVigenciaInicioAdicionar').val(tiposAtribuicao.InicioVigenciaQuadroAula);
                                    $('#formAdiconarAssociacao #txtVigenciaFimAdicionar').val(tiposAtribuicao.FimVigenciaQuadroAula != null ?
                                        tiposAtribuicao.FimVigenciaQuadroAula : "21/12/" + new Date().getFullYear().toString());
                                    $('#formAdiconarAssociacao #hdnNrHoraAula').val(tiposAtribuicao.NrHoraAulaSemanaQuadroAula);

                                    if (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino').val()) != 1) {
                                        var nrHoraAula = tiposAtribuicao.NrHoraAulaSemanaQuadroAula;
                                        var i = 1;
                                        $('#formAdiconarAssociacao #cboQtdeAulasAdicionar').empty();
                                        $('#formAdiconarAssociacao #cboQtdeAulasAdicionar').append('<option value="">Selecione</option>');
                                        while (i <= nrHoraAula) {
                                            $('#formAdiconarAssociacao #cboQtdeAulasAdicionar').append('<option value="' + i + '">' + i + '</option>');
                                            i++;
                                        }
                                    }
                                });
                            }

                            //if ($('#cboDisciplinaAdicionar').children('option').length > 1 && $('#cboTipoEnsinoAdicionar :selected').val() == 4
                            //    && parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) == 1) {
                            //    var disciplinasBlock = ['1813', '2500', '2100', '2200', '1400', '1100', '2700'];

                            //    for (x = 0; x <= disciplinasBlock.length; x++) {
                            //        $("#cboDisciplinaAdicionar option[value='" + disciplinasBlock[x] + "']").remove();
                            //    }
                            //}

                            if ($('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar :selected').text() == "Selecione...")
                                $('#checkEmSubstituicao').prop('disabled', '');
                            //}
                        }
                    });

                }
            });
        });

    },
    BindAdicionarAssociacao: function (ehPostBack) {
        if ($('#EhEscolaPEI').val() == "True") {
            $("#formAdiconarAssociacao #cboFase").rules('remove', 'required');
        }

        if (!$('#formAdiconarAssociacao').valid()) return;

        var dataInicioPermitida = $('#dataInicioPermitida').val()
        var dataInicioPermitidaF = ParseToDate(dataInicioPermitida);
        var dataDigitada = ParseToDate($('#txtVigenciaInicioAdicionar').val());

        var dataFimDigitada = ParseToDate($('#txtVigenciaFimAdicionar').val());

        if (dataFimDigitada < dataDigitada) {
            Mensagem.Alert({
                titulo: "Cadastrar Associação",
                mensagem: "A data fim da vigência deve ser maior que a data inicio",
                tipo: "alerta",
                botao: "Fechar"
            });
            return false;
        }

        if (ehPostBack != true && $('#hdnCHProcessada').val() == "True" && $('#hdnPermiteAlteracao').val() != "True" && dataDigitada < dataInicioPermitidaF) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Carga horária já processada para essa vigência. Deseja realmente adicionar esta atribuição?",
                tipo: "Aviso",
                botoes: [
                    {
                        botao: "Sim", callback: function () {
                            CadastroAssociacao.BindAdicionarAssociacao(true);
                        }
                    },
                    {
                        botao: "Não", callback: function () {
                            $.unblockUI();
                        }
                    }
                ]
            });
            return false;
        }

        //var parts = dataInicioPermitida.split('/');
        //var dataInicioFormatada = new Date(parts[2], parts[1] - 1, parts[0]);


        var params = {
            cdTurma: parseInt($('#cboTurmaAdicionar :selected').val()),
            nmTurma: $('#cboTurmaAdicionar :selected').text(),
            cdDisciplina: parseInt($('#cboDisciplinaAdicionar :selected').val()),
            nmDisciplina: $('#cboDisciplinaAdicionar :selected').text(),
            tpAtribuicao: parseInt($('#cboTipoAtribuicaoAdicionar').val()),
            InicioVig: $('#txtVigenciaInicioAdicionar').val(),
            di: (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').val()),
            dtFimVigencia: $('#txtVigenciaFimAdicionar').val(),
            codFase: $('#cboFase :selected').val(),
            CdRefAtriSubstituida: $('#hdnIdAtribuicaoSubstituido').val(),
            subTurma: $('#sub_turma :selected').val(),
            tipoEnsino: $('#cboTipoEnsinoAdicionar :selected').val(),
            cpf: $('#formCadastroAssociocao #txtCpf').val().replace('.', '').replace('.', '').replace('-', ''),
            qtdeAula: (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboQtdeAulasAdicionar :selected').val() : 0),
            flagSubstituicao: $('#checkEmSubstituicao').is(':checked'),
            ehCargaHorariaProcessada: ehPostBack
        }
        var msgDialog = '';

        if (params.cdTurma > 0 && params.cdDisciplina > 0 && params.tpAtribuicao > 0) {
            var jaAdicionou = false;
            var substituicaoInvalida = false;
            $('#tdAdicionar').find('tbody tr').each(function (i, value) {

                var d1 = $(this).find('#hdnVigenciaInicio').val().split("/");
                var d2 = $(this).find('#hdnVigenciaFim').val().split("/");
                var c1 = params.InicioVig.split("/");
                var c2 = params.dtFimVigencia.split("/");

                var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
                var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
                var check = new Date(c1[2], parseInt(c1[1]) - 1, c1[0]);
                var check2 = new Date(c2[2], parseInt(c2[1]) - 1, c2[0]);

                if (!params.flagSubstituicao && $(this).find('#hdnDi').val() == params.di && $(this).find('#hdnTurma').val() == params.cdTurma && $(this).find('#hdnDisciplina').val() == params.cdDisciplina
                    && $(this).find('#hdnTipoAtribuicao').val() == params.tpAtribuicao && $(this).find('#hdnTipoEnsino').val() == params.tipoEnsino
                    && ((check > from && check < to) || (check2 > from && check < to))) {
                    jaAdicionou = true;
                    return;
                }

                //if (params.flagSubstituicao && $(this).find('#hdnTurma').val() == params.cdTurma && $(this).find('#hdnDisciplina').val() == params.cdDisciplina
                //    && $(this).find('#hdnTipoEnsino').val() == params.tipoEnsino && $(this).find('#hdnDi').val() == params.di && ((check > from && check < to) || (check2 > from && check < to))) {
                //    substituicaoInvalida = true;
                //    return;
                //}
            });

            foiAdicionado = CadastroAssociacao.JaFoiAdicionado(params.di, params.tpAtribuicao, params.tipoEnsino, params.cdTurma, params.cdDisciplina, params.InicioVig, params.dtFimVigencia, params.subTurma);

            if (foiAdicionado || jaAdicionou) {
                $('#ModalAvisoJaAdicionou').dialog({
                    title: 'Associação do Professor à Classe',
                    width: 500,
                    position: ['center', 0],
                    close: function () {
                        //$('#ModalAvisoJaAdicionou').dialog('close');
                        //return;
                    }
                }).empty().append('<p>Associação já adicionada!</p>');
            }

            //if (substituicaoInvalida) {
            //    $('#ModalAvisoJaAdicionou').dialog({
            //        title: 'Associação do Professor à Classe',
            //        width: 620,
            //        position: ['center', 0],
            //        close: function () {
            //            //$('#ModalAvisoJaAdicionou').dialog('close');
            //            //return;
            //        }
            //    }).empty().append('<p>Não é possível fazer uma substituição utilizando o mesmo professor que será substituído!</p>');
            //}
            Mensagem.IgnorarMensagensAutomaticas = false;
            if (!foiAdicionado && !jaAdicionou && !substituicaoInvalida)
                if ($('#formCadastroAssociocao #filtroaba2-redeEnsino').val() == 1) {
                    if (parseInt($('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar :selected').val()) != 6) {
                        $.ajax({
                            type: 'POST',
                            url: '/AssociacaoProfessorClasse/VerificaSeJaExiste',
                            dataType: 'JSON',
                            data: {
                                cdTurma: params.cdTurma,
                                cdDisciplina: params.cdDisciplina,
                                tpAtribuicao: params.tpAtribuicao,
                                InicioVig: params.InicioVig,
                                FimVigencia: params.dtFimVigencia,
                                CheckSubstituicao: params.flagSubstituicao,
                                cpf: $('#formCadastroAssociocao #txtCpf').val().replace('.', '').replace('.', '').replace('-', ''),
                                di: (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ?
                                    $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').val()),
                                cdRedeEnsino: $('#formCadastroAssociocao #filtroaba2-redeEnsino').val()
                            },
                            success: function (data) {

                                if (data != null && data != 0) {
                                    if (data == 2)
                                        return;

                                    if (data == 3)
                                        return;

                                    if (data == 1 && $('#checkEmSubstituicao').is(':checked')) {
                                        $('#cboTipoAtribuicaoAdicionar').val('');
                                        $('#checkEmSubstituicao').prop('checked', false);
                                        msgDialog = '<div class="well" style="background-color: #FFDEAD;">Disciplina selecionada já está sendo substituída por outro docente!</div>';
                                        return 1;
                                    }

                                    if (data != null && data != 0) {
                                        if (data == 1 && $('#checkEmSubstituicao').is(':checked')) {
                                            $('#cboTipoAtribuicaoAdicionar').val('');
                                            $('#checkEmSubstituicao').prop('checked', false);
                                            msgDialog = '<div class="well" style="background-color: #FFDEAD;">Disciplina selecionada não é do mesmo campo de atuação do docente!</div>';
                                            return 1;
                                        }

                                        if ($('#checkEmSubstituicao').is(':checked')) {
                                            $('#DocenteSubstituido').val(true);
                                            $('#checkEmSubstituicao').prop('disabled', 'disabled');

                                            $("#divConfirmaSubstituiTudo").dialog({
                                                resizable: false,
                                                height: 148,
                                                modal: true,
                                                title: "Associação do professor a classe",
                                                buttons: {
                                                    "Sim": function () {
                                                        $('#divConfirmaSubstituiTudo').dialog('close');
                                                        CadastroAssociacao.SubstituiTodasAsAulasDoDocente(data.NrCpf, params.di, params.InicioVig,
                                                            params.dtFimVigencia, data.Nome, params.codFase, params.cdTurma, params.cdDisciplina);
                                                    },
                                                    'Não': function () {
                                                        $("#divConfirmaSubstituiTudo").dialog('close');
                                                    }
                                                }
                                            }).empty().append('<p>Deseja substituir o docente em todas as aulas?</p>');

                                            if (data.ID != null && data.CdAfastamento > 0)
                                                $('#dadosSubstituido').empty().append(
                                                    '<div id="dadosSubstituidoInterno" class="alert alert-warning">' +
                                                       '<input type="hidden" id="hdnIdAtribuicaoSubstituido" value="' + data.ID + '">' +
                                                       '<input type="hidden" id="hdnNmAfastamento" value="' + data.NmAfastamento + '">' +
                                                        '<p><b>Cód. Afastamento: </b><input type="hidden" id="hdnCdAfastamentoSubstituido" value="' + data.CdAfastamento + '">' + data.CdAfastamento + ' - ' + data.NmAfastamento + '</p>' +
                                                        '<p><b>Docente: </b><input type="hidden" id="hdnNomeSubstituido" value="' + data.Nome + '">' + data.Nome + ' </p>' +
                                                        '<p><b>Inicio: </b><input type="hidden" id="hdnDataInicioAfast" value="' + data.DataInicioAfast + '">' + data.DataInicioAfast + '</p>' +
                                                        '<p><b>Fim: </b><input type="hidden" id="hdnDataFimAfast" value="' + (data.DataFimAfast > new Date('0001-01-01') ? data.DataFimAfast : "") + '">' + (data.DataFimAfast > new Date('0001-01-01') ? data.DataFimAfast : "") + '</p>' +
                                                    '</div>'

                                            )
                                            else
                                                $('#dadosSubstituido').empty().append(
                                                    '<div id="dadosSubstituidoInterno" class="alert alert-warning">' +
                                                      '<input type="hidden" id="hdnIdAtribuicaoSubstituido" value="' + data.ID + '">' +
                                                      '<input type="hidden" id="hdnNmAfastamento" value="' + data.NmAfastamento + '">' +
                                                       '<p><b>Docente: </b><input type="hidden" id="hdnNomeSubstituido" value="' + data.Nome + '">' + data.Nome + ' - <b>DI: </b>' + data.Di + '</p>' +
                                                       '<p><b style="color: red">Importante!</b> <b>O professor também será substituído nas abas 3 (horário do professor) e 4 (ATPC).</b>' +
                                                    '</div>'
                                                   )
                                            $('#dadosSubstituido').css("display", "block");
                                        }
                                        else {

                                            if ($('#txtVigenciaInicioAdicionar').val() != "") {
                                                $('#cboTipoAtribuicaoAdicionar').val("");
                                                $('#checkEmSubstituicao').focus();
                                                msgDialog = '<div class="alert alert-warning" style="background-color: #FFDEAD;">A turma ' + params.nmTurma + ' e Disciplina ' +
                                                params.nmDisciplina + ' já foi atribuída para outro professor. Só é possível atribuir o ' +
                                                'docente para essa turma marcando a caixa de seleção <b>"Atribuição de Aula em Substituição"</b>, dessa forma as aulas serão atribuidas como substituição da atribuição já existente</div>';
                                            }

                                            $('#dadosSubstituido').empty();
                                            $('#dadosSubstituidoInterno').remove();
                                            $('#checkEmSubstituicao').prop('disabled', '');
                                            $('#dadosSubstituido').css("display", "none");
                                        }
                                    }
                                    else {
                                        $('#dadosSubstituido').empty();
                                        $('#checkEmSubstituicao').prop('checked', false);
                                        $('#checkEmSubstituicao').prop('disabled', 'disabled');
                                    }
                                    //}

                                    if (msgDialog != '' && msgDialog != null) {
                                        $('#ModalAvisoSubstituicao').dialog({
                                            title: 'Associação do Professor à Classe',
                                            width: 600,
                                            position: ['center', 0],
                                            close: function () {
                                                $('#cboTipoAtribuicaoAdicionar').val('');
                                                $('#checkEmSubstituicao').prop('checked', false);
                                                return;
                                            }
                                        }).empty().append(msgDialog);
                                        return;
                                    }
                                }
                            }
                        });
                    }

                    var vigenciaInicioDigitada = $('#txtVigenciaInicioAdicionar').val().substring(6, 10);
                    vigenciaInicioDigitada += $('#txtVigenciaInicioAdicionar').val().substring(3, 5);
                    vigenciaInicioDigitada += $('#txtVigenciaInicioAdicionar').val().substring(0, 2);
                    var fimVigenciaDigitada = $('#txtVigenciaFimAdicionar').val().substring(6, 10);
                    fimVigenciaDigitada += $('#txtVigenciaFimAdicionar').val().substring(3, 5);
                    fimVigenciaDigitada += $('#txtVigenciaFimAdicionar').val().substring(0, 2);

                    if ($('#txtVigenciaInicioAdicionar').val().substring(6, 10) != $('#sAnoLetivo').text() || vigenciaInicioDigitada > fimVigenciaDigitada/*|| $('#txtVigenciaFimAdicionar').val().substring(6, 10) != $('#sAnoLetivo').text()*/) {
                        Mensagem.Alert({
                            titulo: "Cadastrar Associação",
                            mensagem: "Data de Início/Fim da vigência inválida!",
                            tipo: "alerta",
                            botao: "Fechar"
                        });
                        return false;
                    }

                    if (!$('#formAdiconarAssociacao').valid()) return;
                    var table = $('#tdAdicionar');

                    var subTurma = $('#sub_turma :selected').text() === "Selecione..." ? "" : $('#sub_turma :selected').text();

                    var tr;
                    var afast = new Object();
                    afast.CdAfastamento = $('#CdAfastamento').val();
                    afast.NmAfastamento = $('#NmAfastamento').val();
                    var ehSubstituicao = $('#DocenteSubstituido').val();
                    if ($(table).length === 0) {

                        var createTable = '<fieldset class="fieldset" id="fdAdicionar"><legend class="legend"></legend>' +
                                        '<div class="tabela-responsiva">' +
                                        '<table id="tdAdicionar" class="tabela tabela-full">' +
                                          '<thead>' +
                                            '<tr>' +
                                                '<th style="font-size: 12px;">Di</th>' +
                                                '<th style="font-size: 12px;">Tipo de Atribuição</th>' +
                                                '<th style="font-size: 12px;">Tipo de Ensino</th>' +
                                                '<th style="font-size: 12px;">Fase da Atribuição</th>' +
                                                '<th style="font-size: 12px;">Turma</th>' +
                                                '<th style="font-size: 12px;">SubTurma</th>' +
                                                '<th style="font-size: 12px;">Disciplina</th>' +
                                                '<th style="font-size: 12px;">Livre/Substituição</th>' +
                                                '<th style="font-size: 12px;">Inicio de Vigência</th>' +
                                                '<th style="font-size: 12px;">Fim de Vigência</th>' +
                                                '<th style="font-size: 12px;">Professor Substituido</th>' +
                                                '<th style="font-size: 12px;">Afastamento</th>' +
                        '<th style="font-size: 12px;">Excluir</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '</tbody>' +
            '</table>' +
            '</div>' +
            '</fieldset>';

                        tr = '<tr><td style="font-size: 12px;">' + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').text())
                                + '<input type="hidden" id="hdnDi" value="' + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').text()) + '">' + '</td>' +
                                 '<td style="font-size: 12px;">' + $('#cboTipoAtribuicaoAdicionar :selected').text() + '<input type="hidden" id="hdnTipoAtribuicao" value="' + $('#cboTipoAtribuicaoAdicionar :selected').val() + '">' + '</td>' +
                                 '<td style="font-size: 12px;">' + $('#cboTipoEnsinoAdicionar :selected').text() + '<input type="hidden" id="hdnTipoEnsino" value="' + $('#cboTipoEnsinoAdicionar :selected').val() + '">' + '</td>' +
                                 '<td style="font-size: 12px;">' + '<input type="hidden" id="CodigoFase" value="' + $('#cboFase').val() + '">' + ($('#cboFase').val() > 0 ? $('#cboFase :selected').text() : '') + '</td>' +
                                 '<td style="font-size: 12px;">' + $('#cboTurmaAdicionar :selected').text() + '<input type="hidden" id="hdnTurma" value="' + $('#cboTurmaAdicionar :selected').val() + '">' + '</td>' +
                                 '<td style="font-size: 12px;">' + subTurma + '<input type="hidden" id="hdnSubTurma" value="' + $('#sub_turma :selected').val() + '">' + '</td>' +
                                 '<td style="font-size: 12px;">' + $('#cboDisciplinaAdicionar :selected').text() + '<input type="hidden" id="hdnDisciplina" value="' + $('#cboDisciplinaAdicionar :selected').val() + '">'
                                 + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? '<input type="hidden" id="hdnQtdeAulasQA" value="' + $('#cboQtdeAulasAdicionar :selected').val() + '">' : '') + '</td>' +
                                 //'<td style="font-size: 12px;">' + /*(ehSubstituicao == "False" ? 'Livre' : 'Substituído')*/'Livre' + '</td>' +
                                 //'<td>' + ($('#checkEmSubstituicao').is(':checked') ? 'Substituído' : 'Livre') + '</td>' +
                                 '<td>' + ($('#checkEmSubstituicao').is(':checked') ? 'Substituição' : 'Livre') + '<input type="hidden" id="hdnEhSubstituicao" value="' + ($('#checkEmSubstituicao').is(':checked') ? true : false) + '">' + '</td>' +
                                 '<td style="font-size: 12px;">' + $('#txtVigenciaInicioAdicionar').val() + '<input type="hidden" id="hdnVigenciaInicio" value="' + $('#txtVigenciaInicioAdicionar').val() + '">' + '</td>' +
                                 '<td style="font-size: 12px;">' + $('#txtVigenciaFimAdicionar').val() + '<input type="hidden" id="hdnVigenciaFim" value="' + $('#txtVigenciaFimAdicionar').val() + '">' + '</td>' +
                                 //(ehSubstituicao && afast.CdAfastamento > 0 ? '<td style="font-size: 12px;">' + afast.CdAfastamento + ' - ' + afast.NmAfastamento + '<input type="hidden" id="hdnVigenciaFim" value="' + afast.CdAfastamento + '">' + '</td>' : '<td> </td>') +
                                 '<td style="font-size: 12px;">' + '<input type="hidden" id="hdnIdAtribuicaoSubstituido" value="' + params.CdRefAtriSubstituida + '">' + ($('#hdnNomeSubstituido').val() != undefined ? $('#hdnNomeSubstituido').val() : "") + '<input type="hidden" id="hdnNomeSubstituido" value="' + ($('#hdnNomeSubstituido').val() != undefined ? $('#hdnNomeSubstituido').val() : "") + '">' + '</td>' +
                        '<td style="font-size: 12px;">' + ($('#hdnCdAfastamentoSubstituido').val() != undefined ? $('#hdnCdAfastamentoSubstituido').val() + ' - ' + $('#hdnNmAfastamento').val() : "") + '<input type="hidden" id="hdnVigenciaFim" value="' + ($('#hdnNmAfastamento').val() != undefined ? $('#hdnNmAfastamento').val() : "") + '">' + '</td>' +
                        '<td style="font-size: 12px;"><a class="deletarAssociacaoLocal"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
                   '</tr>';
                        $('#divAssocioacao').append(createTable);
                        $('#divAssocioacao').find('#tdAdicionar').append(tr);
                        $('#btnSavarAssociacao').show();
                    } else {

                        var foiAdicionado = false;

                        $(table).find('tbody tr').each(function () {

                            var di = $(this).find('#hdnDi').val();
                            var cdTipoAtribuicao = $(this).find('#hdnTipoAtribuicao').val();
                            var cdTipoEnsino = $(this).find('#hdnTipoEnsino').val();
                            var cdTurma = $(this).find('#hdnTurma').val();
                            var cdDisciplina = $(this).find('#hdnDisciplina').val();
                            var cdSubTurma = $(this).find('#hdnSubTurma').val();

                            var dtInicioVigencia = $(this).find('#hdnVigenciaInicio').val().substring(6, 10);
                            dtInicioVigencia += $(this).find('#hdnVigenciaInicio').val().substring(3, 5);
                            dtInicioVigencia += $(this).find('#hdnVigenciaInicio').val().substring(0, 2);

                            var dtFimVigencia = $(this).find('#hdnVigenciaFim').val().substring(6, 10);
                            dtFimVigencia += $(this).find('#hdnVigenciaFim').val().substring(3, 5);
                            dtFimVigencia += $(this).find('#hdnVigenciaFim').val().substring(0, 2);

                            if (foiAdicionado) return;
                            foiAdicionado = CadastroAssociacao.JaFoiAdicionado(di, cdTipoAtribuicao, cdTipoEnsino, cdTurma, cdDisciplina, dtInicioVigencia, dtFimVigencia, cdSubTurma);

                        });

                        if (foiAdicionado) {
                            Mensagem.Alert({
                                titulo: "Associação",
                                mensagem: 'Associação já adicionada!',
                                tipo: "Aviso",
                                botao: "Fechar"
                            });
                            return;
                        }

                        tr = '<tr><td>' + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').text()) +
                            '<input type="hidden" id="hdnDi" value="' + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').text()) + '">' + '</td>' +
                                  '<td>' + $('#cboTipoAtribuicaoAdicionar :selected').text() + '<input type="hidden" id="hdnTipoAtribuicao" value="' + $('#cboTipoAtribuicaoAdicionar :selected').val() + '">' + '</td>' +
                                  '<td>' + $('#cboTipoEnsinoAdicionar :selected').text() + '<input type="hidden" id="hdnTipoEnsino" value="' + $('#cboTipoEnsinoAdicionar :selected').val() + '">' + '</td>' +
                                  '<td style="font-size: 12px;">' + '<input type="hidden" id="CodigoFase" value="' + $('#cboFase').val() + '">' + ($('#cboFase').val() > 0 ? $('#cboFase :selected').text() : '') + '</td>' +
                                  '<td>' + $('#cboTurmaAdicionar :selected').text() + '<input type="hidden" id="hdnTurma" value="' + $('#cboTurmaAdicionar :selected').val() + '">' + '</td>' +
                                   '<td>' + subTurma + '<input type="hidden" id="hdnSubTurma" value="' + $('#sub_turma :selected').val() + '">' + '</td>' +
                                  '<td>' + $('#cboDisciplinaAdicionar :selected').text() + '<input type="hidden" id="hdnDisciplina" value="' + $('#cboDisciplinaAdicionar :selected').val() + '">'
                                    + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? '<input type="hidden" id="hdnQtdeAulasQA" value="' + $('#cboQtdeAulasAdicionar :selected').val() + '">' : '') + '</td>' +
                                  //'<td>' + (ehSubstituicao ? 'Substituído' : 'Livre') + '</td>' +
                                  '<td>' + ($('#checkEmSubstituicao').is(':checked') ? 'Substituição' : 'Livre') + '<input type="hidden" id="hdnEhSubstituicao" value="' + ($('#checkEmSubstituicao').is(':checked') ? true : false) + '">' + '</td>' +
                                  '<td>' + $('#txtVigenciaInicioAdicionar').val() + '<input type="hidden" id="hdnVigenciaInicio" value="' + $('#txtVigenciaInicioAdicionar').val() + '">' + '</td>' +
                                  '<td>' + $('#txtVigenciaFimAdicionar').val() + '<input type="hidden" id="hdnVigenciaFim" value="' + $('#txtVigenciaFimAdicionar').val() + '">' + '</td>' +
                                  //(ehSubstituicao && afast.CdAfastamento > 0 ? '<td style="font-size: 12px;">' + afast.CdAfastamento + ' - ' + afast.NmAfastamento + '<input type="hidden" id="hdnVigenciaFim" value="' + afast.CdAfastamento + '">' + '</td>' : '<td></td>') +
                                 '<td style="font-size: 12px;">' + '<input type="hidden" id="hdnIdAtribuicaoSubstituido" value="' + params.CdRefAtriSubstituida + '">' + ($('#hdnNomeSubstituido').val() != undefined ? $('#hdnNomeSubstituido').val() : "") + '<input type="hidden" id="hdnNomeSubstituido" value="' + ($('#hdnNomeSubstituido').val() != undefined ? $('#hdnNomeSubstituido').val() : "") + '">' + '</td>' +
                        '<td style="font-size: 12px;">' + ($('#hdnCdAfastamentoSubstituido').val() != undefined ? $('#hdnCdAfastamentoSubstituido').val() + ' - ' + $('#hdnNmAfastamento').val() : "") + '<input type="hidden" id="hdnVigenciaFim" value="' + ($('#hdnNmAfastamento').val() != undefined ? $('#hdnNmAfastamento').val() : "") + '">' + '</td>' +
                        '<td><a class="deletarAssociacaoLocal"><i class="icone-tabela-excluir" title="Excluir"></i></a></td><td style="display: none"><input type="hidden" id="hdnEhCargaHorariaProcessada" value="' + (ehPostBack == true ? true : false) + '"></td>' +
                   '</tr>';
                        $('#tdAdicionar').append(tr);
                        $('#btnSavarAssociacao').show();
                    }
                    CadastroAssociacao.LimparCampos();
                    CadastroAssociacao.DeletarAssociacaoLocal();
                    $('#dadosSubstituidoInterno').remove();
                    $('#dadosSubstituido').empty();

                }
                else {
                    $.ajax({
                        type: 'POST',
                        url: '/AssociacaoProfessorClasse/VerificaQtdeQuadroAula',
                        dataType: 'JSON',
                        data: {
                            cpf: params.cpf,
                            cdTurma: params.cdTurma,
                            cdDisciplina: params.cdDisciplina,
                            //tpAtribuicao: params.tpAtribuicao,
                            InicioVig: params.InicioVig,
                            FimVigencia: params.dtFimVigencia,
                            qtdeAula: params.qtdeAula
                        },
                        success: function (data) {
                            if (!data)
                                return;
                            else
                                CadastroAssociacao.InsereGrid();
                        }
                    });
                }

            $('#formAdiconarAssociacao #cboFase').rules('add', {
                required: true
            });
        }

    },
    AdicionarAssociacao: function () {
        $('#btnAdicionarAssociacao').click(function () {
            CadastroAssociacao.BindAdicionarAssociacao();
        });
    },
    InsereGrid: function () {
        var params = {
            cdTurma: parseInt($('#cboTurmaAdicionar :selected').val()),
            nmTurma: $('#cboTurmaAdicionar :selected').text(),
            cdDisciplina: parseInt($('#cboDisciplinaAdicionar :selected').val()),
            nmDisciplina: $('#cboDisciplinaAdicionar :selected').text(),
            tpAtribuicao: parseInt($('#cboTipoAtribuicaoAdicionar').val()),
            InicioVig: $('#txtVigenciaInicioAdicionar').val(),
            di: (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').val()),
            dtFimVigencia: $('#txtVigenciaFimAdicionar').val(),
            codFase: $('#cboFase :selected').val(),
            CdRefAtriSubstituida: $('#hdnIdAtribuicaoSubstituido').val(),
            subTurma: $('#sub_turma :selected').val(),
            tipoEnsino: $('#cboTipoEnsinoAdicionar :selected').val(),
            cpf: $('#formCadastroAssociocao #txtCpf').val().replace('.', '').replace('.', '').replace('-', ''),
            qtdeAula: (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboQtdeAulasAdicionar :selected').val() : 0)
        }

        var vigenciaInicioDigitada = $('#txtVigenciaInicioAdicionar').val().substring(6, 10);
        vigenciaInicioDigitada += $('#txtVigenciaInicioAdicionar').val().substring(3, 5);
        vigenciaInicioDigitada += $('#txtVigenciaInicioAdicionar').val().substring(0, 2);
        var fimVigenciaDigitada = $('#txtVigenciaFimAdicionar').val().substring(6, 10);
        fimVigenciaDigitada += $('#txtVigenciaFimAdicionar').val().substring(3, 5);
        fimVigenciaDigitada += $('#txtVigenciaFimAdicionar').val().substring(0, 2);

        if ($('#txtVigenciaInicioAdicionar').val().substring(6, 10) != $('#sAnoLetivo').text() || vigenciaInicioDigitada > fimVigenciaDigitada/*|| $('#txtVigenciaFimAdicionar').val().substring(6, 10) != $('#sAnoLetivo').text()*/) {
            Mensagem.Alert({
                titulo: "Cadastrar Associação",
                mensagem: "Data de Início/Fim da vigência inválida!",
                tipo: "alerta",
                botao: "Fechar"
            });
            return false;
        }

        if (!$('#formAdiconarAssociacao').valid()) return;
        var table = $('#tdAdicionar');

        var subTurma = $('#sub_turma :selected').text() === "Selecione..." ? "" : $('#sub_turma :selected').text();

        var tr;
        var afast = new Object();
        afast.CdAfastamento = $('#CdAfastamento').val();
        afast.NmAfastamento = $('#NmAfastamento').val();
        var ehSubstituicao = $('#DocenteSubstituido').val();
        if ($(table).length === 0) {

            var createTable = '<fieldset class="fieldset" id="fdAdicionar"><legend class="legend"></legend>' +
                            '<div class="tabela-responsiva">' +
                            '<table id="tdAdicionar" class="tabela tabela-full">' +
                              '<thead>' +
                                '<tr>' +
                                    '<th style="font-size: 12px;">Di</th>' +
                                    '<th style="font-size: 12px;">Tipo de Atribuição</th>' +
                                    '<th style="font-size: 12px;">Tipo de Ensino</th>' +
                                    '<th style="font-size: 12px;">Fase da Atribuição</th>' +
                                    '<th style="font-size: 12px;">Turma</th>' +
                                    '<th style="font-size: 12px;">SubTurma</th>' +
                                    '<th style="font-size: 12px;">Disciplina</th>' +
                                    '<th style="font-size: 12px;">Livre/Substituição</th>' +
                                    '<th style="font-size: 12px;">Inicio de Vigência</th>' +
                                    '<th style="font-size: 12px;">Fim de Vigência</th>' +
                                    '<th style="font-size: 12px;">Professor Substituido</th>' +
                                    '<th style="font-size: 12px;">Afastamento</th>' +
            '<th style="font-size: 12px;">Excluir</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</fieldset>';

            tr = '<tr><td style="font-size: 12px;">' + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').text())
                    + '<input type="hidden" id="hdnDi" value="' + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').text()) + '">' + '</td>' +
                     '<td style="font-size: 12px;">' + $('#cboTipoAtribuicaoAdicionar :selected').text() + '<input type="hidden" id="hdnTipoAtribuicao" value="' + $('#cboTipoAtribuicaoAdicionar :selected').val() + '">' + '</td>' +
                     '<td style="font-size: 12px;">' + $('#cboTipoEnsinoAdicionar :selected').text() + '<input type="hidden" id="hdnTipoEnsino" value="' + $('#cboTipoEnsinoAdicionar :selected').val() + '">' + '</td>' +
                     '<td style="font-size: 12px;">' + '<input type="hidden" id="CodigoFase" value="' + $('#cboFase').val() + '">' + ($('#cboFase').val() > 0 ? $('#cboFase :selected').text() : '') + '</td>' +
                     '<td style="font-size: 12px;">' + $('#cboTurmaAdicionar :selected').text() + '<input type="hidden" id="hdnTurma" value="' + $('#cboTurmaAdicionar :selected').val() + '">' + '</td>' +
                     '<td style="font-size: 12px;">' + subTurma + '<input type="hidden" id="hdnSubTurma" value="' + $('#sub_turma :selected').val() + '">' + '</td>' +
                     '<td style="font-size: 12px;">' + $('#cboDisciplinaAdicionar :selected').text() + '<input type="hidden" id="hdnDisciplina" value="' + $('#cboDisciplinaAdicionar :selected').val() + '">'
                     + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? '<input type="hidden" id="hdnQtdeAulasQA" value="' + $('#cboQtdeAulasAdicionar :selected').val() + '">' : '') + '</td>' +
                     //'<td style="font-size: 12px;">' + /*(ehSubstituicao == "False" ? 'Livre' : 'Substituído')*/'Livre' + '</td>' +
                     //'<td>' + ($('#checkEmSubstituicao').is(':checked') ? 'Substituído' : 'Livre') + '</td>' +
                     '<td>' + ($('#checkEmSubstituicao').is(':checked') ? 'Substituição' : 'Livre') + '<input type="hidden" id="hdnEhSubstituicao" value="' + ($('#checkEmSubstituicao').is(':checked') ? true : false) + '">' + '</td>' +
                     '<td style="font-size: 12px;">' + $('#txtVigenciaInicioAdicionar').val() + '<input type="hidden" id="hdnVigenciaInicio" value="' + $('#txtVigenciaInicioAdicionar').val() + '">' + '</td>' +
                     '<td style="font-size: 12px;">' + $('#txtVigenciaFimAdicionar').val() + '<input type="hidden" id="hdnVigenciaFim" value="' + $('#txtVigenciaFimAdicionar').val() + '">' +
                     '<input type="hidden" id="hdnEhArtigo22" value="' + $('#hdnEhArtigo22').val() + '</td>' +
                     //(ehSubstituicao && afast.CdAfastamento > 0 ? '<td style="font-size: 12px;">' + afast.CdAfastamento + ' - ' + afast.NmAfastamento + '<input type="hidden" id="hdnVigenciaFim" value="' + afast.CdAfastamento + '">' + '</td>' : '<td> </td>') +
                     '<td style="font-size: 12px;">' + '<input type="hidden" id="hdnIdAtribuicaoSubstituido" value="' + params.CdRefAtriSubstituida + '">' + ($('#hdnNomeSubstituido').val() != undefined ? $('#hdnNomeSubstituido').val() : "") + '<input type="hidden" id="hdnNomeSubstituido" value="' + ($('#hdnNomeSubstituido').val() != undefined ? $('#hdnNomeSubstituido').val() : "") + '">' + '</td>' +
            '<td style="font-size: 12px;">' + ($('#hdnCdAfastamentoSubstituido').val() != undefined ? $('#hdnCdAfastamentoSubstituido').val() + ' - ' + $('#hdnNmAfastamento').val() : "") + '<input type="hidden" id="hdnVigenciaFim" value="' + ($('#hdnNmAfastamento').val() != undefined ? $('#hdnNmAfastamento').val() : "") + '">' + '</td>' +
            '<td style="font-size: 12px;"><a class="deletarAssociacaoLocal"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
       '</tr>';
            $('#divAssocioacao').append(createTable);
            $('#divAssocioacao').find('#tdAdicionar').append(tr);
            $('#btnSavarAssociacao').show();
        } else {

            var foiAdicionado = false;

            $(table).find('tbody tr').each(function () {

                var di = $(this).find('#hdnDi').val();
                var cdTipoAtribuicao = $(this).find('#hdnTipoAtribuicao').val();
                var cdTipoEnsino = $(this).find('#hdnTipoEnsino').val();
                var cdTurma = $(this).find('#hdnTurma').val();
                var cdDisciplina = $(this).find('#hdnDisciplina').val();
                var cdSubTurma = $(this).find('#hdnSubTurma').val();

                var dtInicioVigencia = $(this).find('#hdnVigenciaInicio').val().substring(6, 10);
                dtInicioVigencia += $(this).find('#hdnVigenciaInicio').val().substring(3, 5);
                dtInicioVigencia += $(this).find('#hdnVigenciaInicio').val().substring(0, 2);

                var dtFimVigencia = $(this).find('#hdnVigenciaFim').val().substring(6, 10);
                dtFimVigencia += $(this).find('#hdnVigenciaFim').val().substring(3, 5);
                dtFimVigencia += $(this).find('#hdnVigenciaFim').val().substring(0, 2);

                if (foiAdicionado) return;
                foiAdicionado = CadastroAssociacao.JaFoiAdicionado(di, cdTipoAtribuicao, cdTipoEnsino, cdTurma, cdDisciplina, dtInicioVigencia, dtFimVigencia, cdSubTurma);

            });

            if (foiAdicionado) {
                Mensagem.Alert({
                    titulo: "Associação",
                    mensagem: 'Associação já adicionada!',
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }

            tr = '<tr><td>' + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').text()) +
                '<input type="hidden" id="hdnDi" value="' + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').text()) + '">' + '</td>' +
                      '<td>' + $('#cboTipoAtribuicaoAdicionar :selected').text() + '<input type="hidden" id="hdnTipoAtribuicao" value="' + $('#cboTipoAtribuicaoAdicionar :selected').val() + '">' + '</td>' +
                      '<td>' + $('#cboTipoEnsinoAdicionar :selected').text() + '<input type="hidden" id="hdnTipoEnsino" value="' + $('#cboTipoEnsinoAdicionar :selected').val() + '">' + '</td>' +
                      '<td style="font-size: 12px;">' + '<input type="hidden" id="CodigoFase" value="' + $('#cboFase').val() + '">' + ($('#cboFase').val() > 0 ? $('#cboFase :selected').text() : '') + '</td>' +
                      '<td>' + $('#cboTurmaAdicionar :selected').text() + '<input type="hidden" id="hdnTurma" value="' + $('#cboTurmaAdicionar :selected').val() + '">' + '</td>' +
                       '<td>' + subTurma + '<input type="hidden" id="hdnSubTurma" value="' + $('#sub_turma :selected').val() + '">' + '</td>' +
                      '<td>' + $('#cboDisciplinaAdicionar :selected').text() + '<input type="hidden" id="hdnDisciplina" value="' + $('#cboDisciplinaAdicionar :selected').val() + '">'
                        + (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ? '<input type="hidden" id="hdnQtdeAulasQA" value="' + $('#cboQtdeAulasAdicionar :selected').val() + '">' : '') + '</td>' +
                      //'<td>' + (ehSubstituicao ? 'Substituído' : 'Livre') + '</td>' +
                      '<td>' + ($('#checkEmSubstituicao').is(':checked') ? 'Substituição' : 'Livre') + '<input type="hidden" id="hdnEhSubstituicao" value="' + ($('#checkEmSubstituicao').is(':checked') ? true : false) + '">' + '</td>' +
                      '<td>' + $('#txtVigenciaInicioAdicionar').val() + '<input type="hidden" id="hdnVigenciaInicio" value="' + $('#txtVigenciaInicioAdicionar').val() + '">' + '</td>' +
                      '<td>' + $('#txtVigenciaFimAdicionar').val() + '<input type="hidden" id="hdnVigenciaFim" value="' + $('#txtVigenciaFimAdicionar').val() + '">'
                      + '<input type="hidden" id="hdnEhArtigo22" value="' + $('#hdnEhArtigo22').val() + '">' + '</td>' +
                      //(ehSubstituicao && afast.CdAfastamento > 0 ? '<td style="font-size: 12px;">' + afast.CdAfastamento + ' - ' + afast.NmAfastamento + '<input type="hidden" id="hdnVigenciaFim" value="' + afast.CdAfastamento + '">' + '</td>' : '<td></td>') +
                     '<td style="font-size: 12px;">' + '<input type="hidden" id="hdnIdAtribuicaoSubstituido" value="' + params.CdRefAtriSubstituida + '">' + ($('#hdnNomeSubstituido').val() != undefined ? $('#hdnNomeSubstituido').val() : "") + '<input type="hidden" id="hdnNomeSubstituido" value="' + ($('#hdnNomeSubstituido').val() != undefined ? $('#hdnNomeSubstituido').val() : "") + '">' + '</td>' +
            '<td style="font-size: 12px;">' + ($('#hdnCdAfastamentoSubstituido').val() != undefined ? $('#hdnCdAfastamentoSubstituido').val() + ' - ' + $('#hdnNmAfastamento').val() : "") + '<input type="hidden" id="hdnVigenciaFim" value="' + ($('#hdnNmAfastamento').val() != undefined ? $('#hdnNmAfastamento').val() : "") + '">' + '</td>' +
            '<td><a class="deletarAssociacaoLocal"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
       '</tr>';
            $('#tdAdicionar').append(tr);
            $('#btnSavarAssociacao').show();
        }
        CadastroAssociacao.LimparCampos();
        CadastroAssociacao.DeletarAssociacaoLocal();
        $('#dadosSubstituidoInterno').remove();
        $('#dadosSubstituido').empty();

    },
    JaFoiAdicionado: function (di, cdTipoAtribuicao, cdTipoEnsino, cdTurma, cdDisciplina, inicioVigencia, fimVigencia, cdSubTurma) {

        if ($('#formAdiconarAssociacao #cboTipoAtribuicaoAdicionar :selected').val() == "Selecione...") return true;

        var vigenciaInicioDigitada = $('#txtVigenciaInicioAdicionar').val().substring(6, 10);
        vigenciaInicioDigitada += $('#txtVigenciaInicioAdicionar').val().substring(3, 5);
        vigenciaInicioDigitada += $('#txtVigenciaInicioAdicionar').val().substring(0, 2);

        var fimVigenciaFigitada = $('#txtVigenciaFimAdicionar').val().substring(6, 10);
        fimVigenciaFigitada += $('#txtVigenciaFimAdicionar').val().substring(3, 5);
        fimVigenciaFigitada += $('#txtVigenciaFimAdicionar').val().substring(0, 2);

        //Verifica se os parametros que foram inserirdo e se esta fora do invervalo de data já registrado
        return di === (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino').val()) > 1 ? $('#filtroaba2-redeEnsino :selected').val() : $('#cboDiAdicionar :selected').val()) && cdTipoAtribuicao === $('#cboTipoAtribuicaoAdicionar :selected').val() &&
            cdTipoEnsino === $('#cboTipoEnsinoAdicionar :selected').val() && cdTurma === $('#cboTurmaAdicionar :selected').val() &&
            cdDisciplina === $('#cboDisciplinaAdicionar :selected').val() &&
         ((vigenciaInicioDigitada >= inicioVigencia && vigenciaInicioDigitada <= fimVigencia) &&
        (fimVigenciaFigitada >= inicioVigencia && fimVigenciaFigitada <= fimVigencia)) && ($('#sub_turma :selected').val() === "" || $('#sub_turma :selected').val() === cdSubTurma);
    },

    VerificaSeJaAssociou: function (params) {
        var listaAssociados = $('#tdAdicionar');
        $(listaAssociados).find('tbody tr').each(function (i, value) {
            if ($(this).find('#hdnDi').val() == params.di && $(this).find('#hdnTurma').val() == params.cdTurma && $(this).find('#hdnDisciplina').val() == params.cdDisciplina
                && $(this).find('#hdnTipoAtribuicao').val() == params.tpAtribuicao && $(this).find('#hdnTipoEnsino').val() == params.tipoEnsino)
                return true;
        });
    },

    Salvar: function () {
        $('#btnSavarAssociacao').click(function () {
            var index = 0;
            var table = $('#tdAdicionar');
            var params = '{';
            var paramsTurma = '{';

            //$(table).find('tbody tr').each(function (i, value) {
            //    paramsTurma += '"listAssociacao[' + index + '].Escola.CD_ESCOLA" : ' + $('#formCadastroAssociocao #cboEscola :selected').val() + ' , ';
            //    paramsTurma += '"listAssociacao[' + index + '].Diretoria.CD_DIRETORIA" : ' + $('#formCadastroAssociocao #cboDiretoria :selected').val() + ' , ';
            //    paramsTurma += '"listAssociacao[' + index + '].Professor.NumeroCpf" : "' + $('#formCadastroAssociocao #txtCpf').val().replace('.', '').replace('.', '').replace('-', '') + '"  ,';
            //    paramsTurma += '"listAssociacao[' + index + '].Di" : ' + $(this).find('#hdnDi').val() + ' , ';
            //    paramsTurma += '"listAssociacao[' + index + '].Turma.CD_TURMA" : ' + $(this).find('#hdnTurma').val() + ',';
            //    index++;
            //});

            //paramsTurma = paramsTurma.substr(0, paramsTurma.length - 1);
            //paramsTurma += '}';
            //var json = JSON.parse(paramsTurma);
            //var atingiuMax = true;

            //$.post('../../AssociacaoProfessorClasse/VerificaQtdeAulasMax', json, function (data) {
            //    if (data != true) {
            //        $('#ModalAvisoSubstituicao').dialog({
            //            title: 'Associação do Professor à Classe',
            //            width: 810,
            //            position: ['center', 0],
            //            close: function () {
            //                //atingiuMax = true;
            //                return;
            //            }
            //        }).empty().append('<div class="well" style="background-color: #FFDEAD;"> Professor já atribuiu ' + data.QtdeAulasAtribuidas + ' aulas, sendo que o máximo é ' + data.JornadaInscricao +
            //        ' .Portando não é possível atribuir mais aulas a essa professor</div>');
            //        //atingiuMax = true;
            //    }
            //    else {
            index = 0;
            $(table).find('tbody tr').each(function (i, value) {

                if (!$(this).find('.icone-tabela-excluir').parent().hasClass('deletarAssociacaoServer') && $(this).find('.icone-tabela-aviso').length == 0) {
                    var cdSubTurma = $(this).find('#hdnSubTurma').val() === "" ? "0" : $(this).find('#hdnSubTurma').val();
                    var cdDisciplina = $(this).find('#hdnDisciplina').val() == null ? "0" : $(this).find('#hdnDisciplina').val();

                    params += '"listAssociacao[' + index + '].Di" : ' + (isNaN(parseInt($(this).find('#hdnDi').val())) ? 0 : parseInt($(this).find('#hdnDi').val())) + ' , ';
                    params += '"listAssociacao[' + index + '].Tipo" : ' + $(this).find('#hdnTipoAtribuicao').val() + ' , ';
                    params += '"listAssociacao[' + index + '].TipoEnsino.CD_TIPO_ENSINO":' + $(this).find('#hdnTipoEnsino').val() + ' , ';
                    params += '"listAssociacao[' + index + '].Turma.CD_TURMA" :' + $(this).find('#hdnTurma').val() + ' , ';
                    params += '"listAssociacao[' + index + '].SubTurma.Codigo" :' + cdSubTurma + ' , ';
                    params += '"listAssociacao[' + index + '].Disciplina.CD_DISCIPLINA" :' + cdDisciplina + ' , ';
                    params += '"listAssociacao[' + index + '].Disciplina.NOME_DISCIPLINA" : "' + $(this).find('td').eq(5).text() + '" , ';
                    params += '"listAssociacao[' + index + '].InicioVigencia" :' + '"' + $(this).find('#hdnVigenciaInicio').val() + '"  , ';
                    params += '"listAssociacao[' + index + '].FimVigencia" :' + '"' + $(this).find('#hdnVigenciaFim').val() + '" , ';
                    params += '"listAssociacao[' + index + '].Escola.CD_ESCOLA" :' + $('#formCadastroAssociocao #filtroaba2-escola :selected').val() + ' , ';
                    params += '"listAssociacao[' + index + '].Diretoria.CD_DIRETORIA" :' + $('#formCadastroAssociocao #filtroaba2-diretoria :selected').val() + ' , ';
                    params += '"listAssociacao[' + index + '].Professor.NumeroCpf" : "' + $('#formCadastroAssociocao #txtCpf').val().replace('.', '').replace('.', '').replace('-', '') + '"  ,';
                    params += '"listAssociacao[' + index + '].AnoLetivo" : "' + $('#sAnoLetivo').text() + '"  ,';
                    params += '"listAssociacao[' + index + '].TipoClasse" : "' + (isNaN(parseInt($('#hdnCdTipoClasse').val())) ? 0 : parseInt($('#hdnCdTipoClasse').val())) + '"  ,';
                    params += '"listAssociacao[' + index + '].CdAfastamento" : "' + ($('#checkEmSubstituicao').is(':checked') ? $('#CdAfastamento').val() : '') + '"  ,';
                    params += '"listAssociacao[' + index + '].EhSubstituicao" : "' + $(this).find('#hdnEhSubstituicao').val() + '"  ,';
                    params += '"listAssociacao[' + index + '].CdAtribSubstituida" : "' + (isNaN(parseInt($(this).find('#hdnIdAtribuicaoSubstituido').val())) ? 0 : parseInt($(this).find('#hdnIdAtribuicaoSubstituido').val())) + '"  ,';
                    params += '"listAssociacao[' + index + '].CodigoFase": "' + (isNaN(parseInt($(this).find('#CodigoFase').val())) ? 0 : parseInt($(this).find('#CodigoFase').val())) + '"  ,';
                    params += '"listAssociacao[' + index + '].CdRedeEnsino": "' + parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino').val()) + '"  ,';
                    params += '"listAssociacao[' + index + '].EhCargaHorariaProcessada": "' + ($(this).find('#hdnEhCargaHorariaProcessada').val() == "true" ? true : false) + '"  ,';
                    params += '"listAssociacao[' + index + '].EhArtigo22": "' + ($(this).find('#hdnEhArtigo22').val() == "true" ? true : false) + '"  ,';
                    parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino').val()) > 1 ? params += '"listAssociacao[' + index + '].QtdeAulaAtribuidaQa": "' + parseInt($(this).find('#hdnQtdeAulasQA').val()) + '"  ,' : '';
                    index++;
                }
            });

            params = params.substr(0, params.length - 1);

            if (params == "")
                return;

            params += '}';
            var json = JSON.parse(params);
            Mensagem.IgnorarMensagensAutomaticas = false;
            $.post('../../AssociacaoProfessorClasse/SalvarAssociacao', json, function (data) {
                if (data.fecharModal)
                    $('#divGridCadastroAssociacao').empty().dialog('close');

                Mensagem.Alert({
                    titulo: data.title,
                    mensagem: data.mensagem,
                    tipo: data.tipo,
                    botao: "Fechar"
                });
            });
        });
    },
    DeletarAssociacaoLocal: function () {
        $('.deletarAssociacaoLocal').click(function () {
            var tr = $(this).parent().parent()
            $("#divConfirmaExcluirAssociacao").dialog({
                resizable: false,
                height: 168,
                modal: true,
                buttons: {
                    "Sim": function () {

                        if ($('#tdAdicionar tr').length === 2) {
                            $('#tdAdicionar').remove();
                            $('#fdAdicionar').remove();
                            $('#btnSavarAssociacao').hide();
                        } else {
                            $(tr).remove();
                        }
                        $("#divConfirmaExcluirAssociacao").dialog('close');

                    },
                    'Cancelar': function () {
                        $("#divConfirmaExcluirAssociacao").dialog('close');
                    }
                },
                close: function () {
                    //$("#divConfirmaExcluirAssociacao").dialog('close');
                }
            });


        });
    },
    DeletarAssociacaoServer: function () {
        $('.deletarAssociacaoServer').click(function () {
            var cdAssociacao = $(this).find('#hdnCdAtribuicao').val();
            var tr = $(this);



            $("#divConfirmaExcluirAssociacao").dialog({
                resizable: false,
                height: 168,
                modal: true,
                buttons: {
                    "Sim": function () {
                        $.post("../../AssociacaoProfessorClasse/DeletarAssociacao", {
                            cdAssociacao: cdAssociacao
                        }, function (data) {
                            if (data.length != 0) {
                                Mensagem.Alert({
                                    titulo: data[0],
                                    mensagem: data[1],
                                    tipo: data[2],
                                    botao: "Fechar"
                                });
                            }

                            if ($('#tdAdicionar tr').length === 2) {
                                $('#tdAdicionar').remove();
                            } else {
                                $(tr).parent().parent().remove();
                            }
                            $("#divConfirmaExcluirAssociacao").dialog('close');
                        });
                    },
                    'Cancelar': function () {
                        $("#divConfirmaExcluirAssociacao").dialog('close');
                    }
                },
                close: function () {
                    //$("#divConfirmaExcluirAssociacao").dialog('close');
                }
            });
        });
    },
    PesquisarAssociacao: function () {
        $('#btnPesquisarCadastrarAssociacao').click(function () {

            $("[name='txtCpfAssociacao']").rules('add', {
                required: false
            });

            if (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino').val()) == 0) {
                $("#formCadastroAssociocao #filtroaba2-redeEnsino").rules('remove', 'minValue');
            }

            if (!$('#formCadastroAssociocao').valid()) return;

            var params = {
                cdDiretoria: $('#formCadastroAssociocao #filtroaba2-diretoria').val(),
                cpf: String($('#formCadastroAssociocao #txtCpf').val()),
                cdEscola: $('#formCadastroAssociocao #filtroaba2-escola').val(),
                anoLetivo: $('#formCadastroAssociocao #filtroaba2-anoLetivo').val(),
                cdTipoEnsino: $('#formCadastroAssociocao #filtroaba2-tipoEnsino').val(),
                cdRedeEnsino: $('#formCadastroAssociocao #filtroaba2-redeEnsino').val()
            };


            var f = new Array();
            $("#formCadastroAssociocao .form-group").each(
                function (i, e) {
                    var v = $(e).children("label").next("div").children("input, textarea, select").eq(0);
                    console.log(v.val());
                    if (v.val() != null || v.val().trim().length > 0)
                        f.push({
                            nome: $(e).children("label").html().replace(":", ""), valor: $(v).children("option").length == 0 ? $(v).val() : $(v).children("option:selected").html()
                        });
                });

            $.post('../../AssociacaoProfessorClasse/PesquisaAssociacao', params, function (data) {
                $('#divPesquisaAssociacao').empty().html(data);
                CadastroAssociacao.DeletarAssociacao();
                CadastroAssociacao.EditarAssociacao();
                CadastroAssociacao.EditarDeletarAssociacaoSemQuadroAula();
                $('#tbPesquisaAssocicao').sedDataTable({
                    nomeExportacao: "Cadastro Associações",
                    filtros: f,
                    columnDefs: [
                         { targets: [14, 15], orderable: false },
                    ]
                });

            }, 'html');
        });
    },
    DeletarAssociacao: function () {
        $('.deletarAssociacao').click(function () {
            var cdAssociacao = $(this).find('#hdnCdAssociacao').val();
            var nrCpf = $(this).find('#hdnCdAssociacao').attr('data-cpf');
            var nrDi = $(this).find('#hdnCdAssociacao').attr('data-di');

            $.post("../../AssociacaoProfessorClasse/ExibeMsgAlteracaoExclusao", {
                cdAssociacao: cdAssociacao,
                nrCpf: nrCpf,
                nrDi: nrDi
            }, function (data) {
                Mensagem.IgnorarMensagensAutomaticas = true;
                if (data == true) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "Carga horária já processada para essa vigência. Deseja realmente excluir esta atribuição?",
                        tipo: "Aviso",
                        botoes: [
                            {
                                botao: "Sim", callback: function () {
                                    $.unblockUI();
                                    $("#divConfirmaExcluirAssociacao").dialog({
                                        resizable: false,
                                        height: 168,
                                        modal: true,
                                        buttons: {
                                            "Sim": function () {
                                                $.post("../../AssociacaoProfessorClasse/DeletarAssociacao", {
                                                    cdAssociacao: cdAssociacao,
                                                    nrCpf: nrCpf,
                                                    nrDi: nrDi

                                                }, function () {
                                                    if (data.length != 0) {
                                                        Mensagem.Alert({
                                                            titulo: data[0],
                                                            mensagem: data[1],
                                                            tipo: data[2],
                                                            botao: "Fechar"
                                                        });
                                                    }
                                                    $('#btnPesquisarCadastrarAssociacao').click();
                                                });
                                                $("#divConfirmaExcluirAssociacao").dialog('close');
                                                Mensagem.IgnorarMensagensAutomaticas = false;
                                            },
                                            'Cancelar': function () {
                                                $("#divConfirmaExcluirAssociacao").dialog('close');
                                                Mensagem.IgnorarMensagensAutomaticas = false;
                                            }
                                        },
                                        close: function () {
                                            //$("#divConfirmaExcluirAssociacao").dialog('close');
                                        }
                                    });
                                }
                            },
                            {
                                botao: "Não", callback: function () {
                                    $.unblockUI();
                                }
                            }
                        ]
                    });
                }
                else {
                    $("#divConfirmaExcluirAssociacao").dialog({
                        resizable: false,
                        height: 168,
                        modal: true,
                        buttons: {
                            "Sim": function () {
                                $.post("../../AssociacaoProfessorClasse/DeletarAssociacao", {
                                    cdAssociacao: cdAssociacao,
                                    nrCpf: nrCpf,
                                    nrDi: nrDi
                                }, function (data) {
                                    if (data.length != 0) {
                                        Mensagem.Alert({
                                            titulo: data[0],
                                            mensagem: data[1],
                                            tipo: data[2],
                                            botao: "Fechar"
                                        });
                                    }
                                    $('#btnPesquisarCadastrarAssociacao').click();
                                });
                                $("#divConfirmaExcluirAssociacao").dialog('close');
                                Mensagem.IgnorarMensagensAutomaticas = false;
                            },
                            'Cancelar': function () {
                                $("#divConfirmaExcluirAssociacao").dialog('close');
                                Mensagem.IgnorarMensagensAutomaticas = false;
                            }
                        },
                        close: function () {
                            //$("#divConfirmaExcluirAssociacao").dialog('close');
                        }
                    });
                }
            }
           );
        });
    },

    //Inicio Página Editar Associação Professor

    EditarAssociacao: function () {
        $('.editarAssociacao').click(function () {
            var params = {
                idAtribuicao: $(this).find('#hdnCdAssociacao').val(),
                anoLetivo: $('#formCadastroAssociocao #filtroaba2-anoLetivo').val(),
                cdRedeEnsino: $('#formCadastroAssociocao #filtroaba2-redeEnsino').val()
            };

            $.ajax({
                cache: false,
                url: '../../AssociacaoProfessorClasse/EditarProfessorAssociacao',
                type: 'POST',
                datatype: 'html',
                data: params,
                traditional: true,
                success: function (data, textStatus, jqXHR) {
                    if (data.length > 0) {
                        $('#divGridCadastroAssociacao').empty().html(data);
                        $('#divGridCadastroAssociacao').dialog({
                            title: "Associação do professor a classe",
                            width: 910,
                            position: ['center', 0]

                        });

                        //Adicionando calendario na edição de vigencia do professor.
                        $("#InicioVigencia").datepicker();
                        $("#FimVigencia").datepicker();
                        CadastroAssociacao.ValidarEditar();
                        CadastroAssociacao.SalvarEditar();

                        $('#formEditarAssociacao #cboQtdeAulasEditar').change(function () {
                            $('#QtdeAulaAtribuidaQa').val($(this).val())
                        })
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $(document).ajaxStop();
                }
            });
        });

        $('#CodigoFase').change(function (item) {
            $('#CodigoFase').val(item.val());
        });
    },
    EditarDeletarAssociacaoSemQuadroAula: function () {
        $('.editarDeletarAssociacaoSemQuadroAula').click(function () {
            $('#divMsgAssociacaoSemQuadroAula').dialog({
                resizable: false,
                height: 168,
                modal: true,
                title: 'Associação do Professor à Classe',
                buttons: {
                    "Ok": function () {
                        $("#divMsgAssociacaoSemQuadroAula").dialog('close');
                    }
                },
            }).empty().append("<p>Foi homologada uma nova matriz curricular deste tipo de ensino, a qual gerou um novo Quadro de Aulas (QA)." +
            "A Associação do Professor é baseada no Quadro de Aulas. Quando é gerado um novo QA, as associações anteriores são invalidadas " +
            "e é necessário associar os professores novamente.</p>")
        });
    },

    ValidarEditar: function () {
        $('#formEditarAssociacao').validate({
            rules: {
                txtVigenciaInicioAdicionarAssociacao: { required: true, dataValida: true },
                txtVigenciaFimAdicionarAssociacao: { required: true, dataValida: true }
            },

            messages: 'Obrigatório'
        });
    },

    SalvarEditar: function () {
        $('#formEditarAssociacao #btnEditarAssociacao').click(function () {
            CadastroAssociacao.BindSalvarEditar();
        });
    },
    BindSalvarEditar: function (postback) {
        //if ($('#formEditarAssociacao #InicioVigencia').val().substring(6, 10) != $('#sAnoLetivo').text() || $('#formEditarAssociacao #FimVigencia').val().substring(6, 10) != $('#sAnoLetivo').text()) {
        //    Mensagem.Alert({
        //        titulo: "Editar Associação",
        //        mensagem: "Data de Início/Fim da vigência inválida!",
        //        tipo: "alerta",
        //        botao: "Fechar"
        //    });
        //    return false;
        //}

        var form = $('#formEditarAssociacao');

        if (form.valid()) {
            if (postback != true && $('#hdnPermiteAlteracaoCH').val() == "False") {
                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "Carga horária já processada para essa vigência. Deseja realmente editar esta atribuição?",
                    tipo: "Aviso",
                    botoes: [
                        {
                            botao: "Sim", callback: function () {
                                CadastroAssociacao.BindSalvarEditar(true);
                            }
                        },
                        {
                            botao: "Não", callback: function () {
                                $.unblockUI();
                            }
                        }
                    ]
                });
                return false;
            }

            if (postback == true)
                $('#hdnEhCargaHorariaProcessada').val('true')

            var json = form.serialize();
            $.post('../../AssociacaoProfessorClasse/SalvarEditarProfessorAssociacao', json, function (data) {
                Mensagem.IgnorarMensagensAutomaticas = true;
                if (data.fecharModal) {
                    $('#divGridCadastroAssociacao').empty();
                    $('#divGridCadastroAssociacao').dialog('close');
                    $('#btnPesquisarCadastrarAssociacao').click();
                }
                Mensagem.Alert({
                    titulo: data.title,
                    mensagem: data.mensagem,
                    tipo: data.tipo,
                    botao: "Fechar"
                });
                //Mensagem.IgnorarMensagensAutomaticas = false;
            })
        }
    },
    VerificaDocenteSubstituicao: function () {
        if ($('#DocenteSubstituido').val())
            $('#cboDiAdicionar').attr("disabled");
    }
    //Fim Página Editar Associação Professor
};

var HorarioAula = {
    Salvar: function () {
        $('#btnCadatroPreAula').click(function () {

            if (!$('#formHoraAula').valid()) return;

            if ($("#cboTurno option:selected").val() == 103 && !$('#checkIntervalo').prop('checked') && !$('#checkIntervalo2').prop('checked')) {
                var params = '{ "duracaoAula":' + $('#cboDuracaoAula').val() + ' , ';

                //var valuesTurma = $('#cboTurmaHorarioAula').multipleSelect("getSelects");
                var valuesTurma;
                $('.ui-multiselect-menu ul li input:checked').filter(function () {
                    valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                });

                if (valuesTurma == null) {
                    $('#ModalHorarioAula #cboTurmaHorarioAula').filter(function () {
                        valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                    });
                }

                valuesTurma = valuesTurma.split(",");
                valuesTurma = valuesTurma.slice(0, valuesTurma.length - 1);

                var cdTurno = $('#cboTurno').length > 0 ? $('#cboTurno').val() : 0;

                $(valuesTurma).each(function (i, value) {
                    params += '"preAula[' + i + '].Turma.CD_TURMA":' + value + ' , ';
                });

                params += '"inicioAulas":' + '"' + $('#txtHoraInicio').val() + '"' + ' , ';
                params += '"inicioIntervalo":' + '"' + $('#txtHoraInicioIntervalo').val() + '"' + ' , ';
                params += '"terminoIntervalo":' + '"' + $('#txtDuracaoIntervalo').val() + '"' + ' , ';
                params += '"terminoAulas":' + '"' + $('#txtHoraTermino').val() + '"' + ' , ';
                params += '"inicioAulas2":' + '"' + $('#txtHoraInicio2').val() + '"' + ' , ';
                params += '"inicioIntervalo2":' + '"' + $('#txtHoraInicioIntervalo2').val() + '"' + ' , ';
                params += '"terminoIntervalo2":' + '"' + $('#txtDuracaoIntervalo2').val() + '"' + ' , ';
                params += '"terminoAulas2":' + '"' + $('#txtHoraTermino2').val() + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formHoraAula #pAnoLetivo').html() + '"' + ' , ';
                params += '"cdTurno":' + '"' + cdTurno + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val() + '"' + ' , ';

                params += '"listaDiaSemana[0].segunda":' + $('#chkSegunda').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].terca":' + $('#chkTerca').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quarta":' + $('#chkQuarta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quinta":' + $('#chkQuinta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sexta":' + $('#chkSexta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sabado":' + ($('#ModalHorarioAula #cboDiaSemana :selected').val() == 1 ? true : false) + ' , ';

                if ($('#formHoraAula #cboDiaSemana option:selected').val() == '1')
                    params += '"ehFimSemana":' + true;
                else
                    params += '"ehFimSemana":' + false;

                params += ' } ';

                var json = JSON.parse(params);

                $.post('../../AssociacaoProfessorClasse/SalvarPreAulaIntegral', json, function (data) {
                    if (data) {
                        $("#ModalHorarioAula").empty().dialog('close');
                    }
                });

            }
            else if ($('#checkIntervalo').prop('checked') && $("#cboTurno option:selected").val() == 103 && !$('#checkIntervalo2').prop('checked')) {
                var params = '{ "duracaoAula":' + $('#cboDuracaoAula').val() + ' , ';

                //var valuesTurma = $('#cboTurmaHorarioAula').multipleSelect("getSelects");
                var valuesTurma;
                $('.ui-multiselect-menu ul li input:checked').filter(function () {
                    valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                });

                if (valuesTurma == null) {
                    $('#ModalHorarioAula #cboTurmaHorarioAula').filter(function () {
                        valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                    });
                }

                valuesTurma = valuesTurma.split(",");
                valuesTurma = valuesTurma.slice(0, valuesTurma.length - 1);

                var cdTurno = $('#cboTurno').length > 0 ? $('#cboTurno').val() : 0;

                $(valuesTurma).each(function (i, value) {
                    params += '"preAula[' + i + '].Turma.CD_TURMA":' + value + ' , ';
                });

                params += '"inicioAulas":' + '"' + $('#txtHoraInicio').val() + '"' + ' , ';
                params += '"terminoAulas":' + '"' + $('#txtHoraTermino').val() + '"' + ' , ';
                params += '"inicioAulas2":' + '"' + $('#txtHoraInicio2').val() + '"' + ' , ';
                params += '"inicioIntervalo2":' + '"' + $('#txtHoraInicioIntervalo2').val() + '"' + ' , ';
                params += '"terminoIntervalo2":' + '"' + $('#txtDuracaoIntervalo2').val() + '"' + ' , ';
                params += '"terminoAulas2":' + '"' + $('#txtHoraTermino2').val() + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formHoraAula #pAnoLetivo').html() + '"' + ' , ';
                params += '"cdTurno":' + '"' + cdTurno + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val() + '"' + ' , ';

                params += '"listaDiaSemana[0].segunda":' + $('#chkSegunda').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].terca":' + $('#chkTerca').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quarta":' + $('#chkQuarta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quinta":' + $('#chkQuinta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sexta":' + $('#chkSexta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sabado":' + ($('#ModalHorarioAula #cboDiaSemana :selected').val() == 1 ? true : false) + ' , ';

                if ($('#formHoraAula #cboDiaSemana option:selected').val() == '1')
                    params += '"ehFimSemana":' + true;
                else
                    params += '"ehFimSemana":' + false;

                params += ' } ';

                var json = JSON.parse(params);

                $.post('../../AssociacaoProfessorClasse/SalvarPreAulaIntegralSemIntervalo', json, function (data) {
                    if (data) {
                        $("#ModalHorarioAula").empty().dialog('close');
                    }
                });

            }
            else if ($('#checkIntervalo').prop('checked') && !$('#checkIntervalo2').prop('checked')) {
                var params = '{ "duracaoAula":' + $('#cboDuracaoAula').val() + ' , ';

                //var valuesTurma = $('#cboTurmaHorarioAula').multipleSelect("getSelects");
                var valuesTurma;
                $('.ui-multiselect-menu ul li input:checked').filter(function () {
                    valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                });

                if (valuesTurma == null) {
                    $('#ModalHorarioAula #cboTurmaHorarioAula').filter(function () {
                        valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                    });
                }

                valuesTurma = valuesTurma.split(",");
                valuesTurma = valuesTurma.slice(0, valuesTurma.length - 1);

                var cdTurno = $('#cboTurno').length > 0 ? $('#cboTurno').val() : 0;

                $(valuesTurma).each(function (i, value) {
                    params += '"preAula[' + i + '].Turma.CD_TURMA":' + value + ' , ';
                });

                params += '"inicioAulas":' + '"' + $('#txtHoraInicio').val() + '"' + ' , ';
                params += '"terminoAulas":' + '"' + $('#txtHoraTermino').val() + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formHoraAula #pAnoLetivo').html() + '"' + ' , ';
                params += '"cdTurno":' + '"' + cdTurno + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val() + '"' + ' , ';

                params += '"listaDiaSemana[0].segunda":' + $('#chkSegunda').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].terca":' + $('#chkTerca').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quarta":' + $('#chkQuarta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quinta":' + $('#chkQuinta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sexta":' + $('#chkSexta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sabado":' + ($('#ModalHorarioAula #cboDiaSemana :selected').val() == 1 ? true : false) + ' , ';

                if ($('#formHoraAula #cboDiaSemana option:selected').val() == '1')
                    params += '"ehFimSemana":' + true;
                else
                    params += '"ehFimSemana":' + false;

                params += ' } ';

                var json = JSON.parse(params);

                $.post('../../AssociacaoProfessorClasse/SalvarPreAulaSemIntervalo', json, function (data) {
                    if (data) {
                        $("#ModalHorarioAula").empty().dialog('close');
                    }
                });
            }
            else if (!$('#checkIntervalo').prop('checked') && $("#cboTurno option:selected").val() == 103 && $('#checkIntervalo2').prop('checked')) {
                var params = '{ "duracaoAula":' + $('#cboDuracaoAula').val() + ' , ';

                //var valuesTurma = $('#cboTurmaHorarioAula').multipleSelect("getSelects");
                var valuesTurma;
                $('.ui-multiselect-menu ul li input:checked').filter(function () {
                    valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                });

                if (valuesTurma == null) {
                    $('#ModalHorarioAula #cboTurmaHorarioAula').filter(function () {
                        valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                    });
                }

                valuesTurma = valuesTurma.split(",");
                valuesTurma = valuesTurma.slice(0, valuesTurma.length - 1);

                var cdTurno = $('#cboTurno').length > 0 ? $('#cboTurno').val() : 0;

                $(valuesTurma).each(function (i, value) {
                    params += '"preAula[' + i + '].Turma.CD_TURMA":' + value + ' , ';
                });

                params += '"inicioAulas2":' + '"' + $('#txtHoraInicio2').val() + '"' + ' , ';
                params += '"terminoAulas2":' + '"' + $('#txtHoraTermino2').val() + '"' + ' , ';
                params += '"inicioAulas":' + '"' + $('#txtHoraInicio').val() + '"' + ' , ';
                params += '"inicioIntervalo":' + '"' + $('#txtHoraInicioIntervalo').val() + '"' + ' , ';
                params += '"terminoIntervalo":' + '"' + $('#txtDuracaoIntervalo').val() + '"' + ' , ';
                params += '"terminoAulas":' + '"' + $('#txtHoraTermino').val() + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formHoraAula #pAnoLetivo').html() + '"' + ' , ';
                params += '"cdTurno":' + '"' + cdTurno + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val() + '"' + ' , ';

                params += '"listaDiaSemana[0].segunda":' + $('#chkSegunda').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].terca":' + $('#chkTerca').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quarta":' + $('#chkQuarta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quinta":' + $('#chkQuinta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sexta":' + $('#chkSexta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sabado":' + ($('#ModalHorarioAula #cboDiaSemana :selected').val() == 1 ? true : false) + ' , ';

                if ($('#formHoraAula #cboDiaSemana option:selected').val() == '1')
                    params += '"ehFimSemana":' + true;
                else
                    params += '"ehFimSemana":' + false;

                params += ' } ';

                var json = JSON.parse(params);

                $.post('../../AssociacaoProfessorClasse/SalvarPreAulaIntegralSemIntervalo2', json, function (data) {
                    if (data) {
                        $("#ModalHorarioAula").empty().dialog('close');
                    }
                });

            }
            else if (!$('#checkIntervalo').prop('checked') && $('#checkIntervalo2').prop('checked')) {
                var params = '{ "duracaoAula":' + $('#cboDuracaoAula').val() + ' , ';

                //var valuesTurma = $('#cboTurmaHorarioAula').multipleSelect("getSelects");
                var valuesTurma;
                $('.ui-multiselect-menu ul li input:checked').filter(function () {
                    valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                });

                if (valuesTurma == null) {
                    $('#ModalHorarioAula #cboTurmaHorarioAula').filter(function () {
                        valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                    });
                }

                valuesTurma = valuesTurma.split(",");
                valuesTurma = valuesTurma.slice(0, valuesTurma.length - 1);

                var cdTurno = $('#cboTurno').length > 0 ? $('#cboTurno').val() : 0;

                $(valuesTurma).each(function (i, value) {
                    params += '"preAula[' + i + '].Turma.CD_TURMA":' + value + ' , ';
                });

                params += '"inicioAulas2":' + '"' + $('#txtHoraInicio2').val() + '"' + ' , ';
                params += '"terminoAulas2":' + '"' + $('#txtHoraTermino2').val() + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formHoraAula #pAnoLetivo').html() + '"' + ' , ';
                params += '"cdTurno":' + '"' + cdTurno + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val() + '"' + ' , ';

                params += '"listaDiaSemana[0].segunda":' + $('#chkSegunda').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].terca":' + $('#chkTerca').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quarta":' + $('#chkQuarta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quinta":' + $('#chkQuinta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sexta":' + $('#chkSexta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sabado":' + ($('#ModalHorarioAula #cboDiaSemana :selected').val() == 1 ? true : false) + ' , ';

                if ($('#formHoraAula #cboDiaSemana option:selected').val() == '1')
                    params += '"ehFimSemana":' + true;
                else
                    params += '"ehFimSemana":' + false;

                params += ' } ';

                var json = JSON.parse(params);

                $.post('../../AssociacaoProfessorClasse/SalvarPreAulaSemIntervalo2', json, function (data) {
                    if (data) {
                        $("#ModalHorarioAula").empty().dialog('close');
                    }
                });
            }
            else {

                var params = '{ "duracaoAula":' + $('#cboDuracaoAula').val() + ' , ';

                //var valuesTurma = $('#cboTurmaHorarioAula').multipleSelect("getSelects");
                var valuesTurma;
                $('.ui-multiselect-menu ul li input:checked').filter(function () {
                    valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                });

                if (valuesTurma == null) {
                    $('#ModalHorarioAula #cboTurmaHorarioAula').filter(function () {
                        valuesTurma == undefined ? valuesTurma = this.value + ',' : valuesTurma += this.value + ',';
                    });
                }

                valuesTurma = valuesTurma.split(",");
                valuesTurma = valuesTurma.slice(0, valuesTurma.length - 1);

                var cdTurno = $('#cboTurno').length > 0 ? $('#cboTurno').val() : 0;

                $(valuesTurma).each(function (i, value) {
                    params += '"preAula[' + i + '].Turma.CD_TURMA":' + value + ' , ';
                });

                params += '"inicioAulas":' + '"' + $('#txtHoraInicio').val() + '"' + ' , ';
                params += '"inicioIntervalo":' + '"' + $('#txtHoraInicioIntervalo').val() + '"' + ' , ';
                params += '"terminoIntervalo":' + '"' + $('#txtDuracaoIntervalo').val() + '"' + ' , ';
                params += '"terminoAulas":' + '"' + $('#txtHoraTermino').val() + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formHoraAula #pAnoLetivo').html() + '"' + ' , ';
                params += '"cdTurno":' + '"' + cdTurno + '"' + ' , ';
                params += '"anoLetivo":' + '"' + $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val() + '"' + ' , ';

                params += '"listaDiaSemana[0].segunda":' + $('#chkSegunda').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].terca":' + $('#chkTerca').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quarta":' + $('#chkQuarta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].quinta":' + $('#chkQuinta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sexta":' + $('#chkSexta').prop('checked') + ' , ';
                params += '"listaDiaSemana[0].sabado":' + ($('#ModalHorarioAula #cboDiaSemana :selected').val() == 1 ? true : false) + ' , ';

                if ($('#formHoraAula #cboDiaSemana option:selected').val() == '1')
                    params += '"ehFimSemana":' + true;
                else
                    params += '"ehFimSemana":' + false;

                params += ' } ';

                var json = JSON.parse(params);

                $.post('../../AssociacaoProfessorClasse/SalvarPreAula', json, function (data) {
                    if (data) {
                        $("#ModalHorarioAula").empty().dialog('close');
                    }
                });

            }
        });
    },

    Validacoes: function () {
        $('#ModalHorarioAula #btnCadatroPreAula').click(function () {
            $('#formHoraAula').validate({
                rules: {
                    cboDiaSemana: {
                        required: true
                    },
                    cboTurno: {
                        required: true
                    },
                    cboDuracaoAula: {
                        required: true
                    },
                    HoraInicioIntervalo: {
                        required: true, horaValidaDe5Em5Minutos: true, ValidaHoraInicioIntervalo: $('#txtHoraInicio')
                    },
                    terminoIntervalo: {
                        required: true, horaValidaDe5Em5Minutos: true, ValidaHoraTerminoIntervalo: $('#txtHoraTermino'), ValidarHoraInicioTerminoIntervalo: $('#txtDuracaoIntervalo')
                    },
                    HoraInicio: { required: true, horaValidaDe5Em5Minutos: true, ValidarHoraDuracaoInicio: $('#txtHoraInicio'), ValidarHoraDuracaoInicioSemIntervalo: $('#txtHoraInicio') },
                    HoraTermino: { required: true, horaValidaDe5Em5Minutos: true, ValidarHoraDuracaoTermino: $('#txtHoraInicio'), ValidarHoraDuracaoTerminoSemIntervalo: $('#txtHoraInicio'), ValidarHoraFimMenorInicio: $('#txtHoraInicio') },
                    HoraInicioIntervalo2: {
                        required: true, horaValidaDe5Em5Minutos: true, ValidaHoraInicioIntervaloIntegral: $('#txtHoraInicio2')
                    },
                    terminoIntervalo2: {
                        required: true, horaValidaDe5Em5Minutos: true, ValidaHoraTerminoIntervaloIntegral: $('#txtHoraTermino2'), ValidarHoraInicioTerminoIntervaloIntegral: $('#txtDuracaoIntervalo2')
                    },
                    HoraInicio2: { required: true, horaValidaDe5Em5Minutos: true, ValidarHoraDuracaoInicioIntegral: $('#txtHoraInicio2'), ValidarHoraInicioTurnoTardeIntegral: $('#txtHoraInicio2') },
                    HoraTermino2: { required: true, horaValidaDe5Em5Minutos: true, ValidarHoraDuracaoTerminoIntegral: $('#txtHoraInicio2') }
                },
                messages: {
                    cboDiaSemana: "Obrigatório",
                    cboTurno: "Obrigatório",
                    cboDuracaoAula: "Obrigatório",
                    HoraInicioIntervalo: {
                        required: "Obrigatório", ValidaHoraInicioIntervalo: 'O início do intervalo não pode ser menor que o início de aula'
                    },
                    terminoIntervalo: {
                        required: "Obrigatório", ValidaHoraTerminoIntervalo: 'O término do intervalo não pode ser maior que o termino da aula',
                        ValidarHoraInicioTerminoIntervalo: 'O fim do intervalo deve ser menor que o início do intervalo'
                    },
                    HoraInicio: {
                        required: "Obrigatório", ValidarHoraDuracaoInicio: 'Hora digitada não corresponde com a duração selecionada',
                        ValidarHoraDuracaoInicioSemIntervalo: 'Hora digitada não corresponde com a duração selecionada'
                    },
                    HoraTermino: {
                        required: "Obrigatório", ValidarHoraDuracaoTermino: 'Hora digitada não corresponde com a duração selecionada', ValidarHoraDuracaoTerminoSemIntervalo: 'Hora digitada não corresponde com a duração selecionada', ValidarHoraFimMenorInicio: "Termino da aula não pode ser menor que início da aula"
                    },

                    HoraInicioIntervalo2: {
                        required: "Obrigatório", ValidaHoraInicioIntervaloIntegral: 'O início do intervalo não pode ser menor que o início de aula'
                    },
                    terminoIntervalo2: {
                        required: "Obrigatório", ValidaHoraTerminoIntervaloIntegral: 'O término do intervalo não pode ser maior que o término da aula',
                        ValidarHoraInicioTerminoIntervaloIntegral: 'O fim do intervalo deve ser menor que o início do intervalo'
                    },
                    HoraInicio2: {
                        required: "Obrigatório", ValidarHoraDuracaoInicioIntegral: 'Hora digitada não corresponde com a duração selecionada',
                        ValidarHoraInicioTurnoTardeIntegral: 'O início das aulas dever ser maior que o fim da aulas do turno da manhã'
                    },
                    HoraTermino2: {
                        required: "Obrigatório", ValidarHoraDuracaoTerminoIntegral: 'Hora digitada não corresponde com a duração selecionada'
                    }

                }
            });

            if ($('#checkIntervalo').prop('checked') && !$('#checkIntervalo2').prop('checked')) {
                $('#txtHoraInicio').rules('add', {
                    required: true,
                    ValidarHoraDuracaoInicio: false,
                    ValidarHoraDuracaoInicioSemIntervalo: false,
                    horaValidaDe5Em5Minutos: true
                });

                $('#txtHoraTermino').rules('add', {
                    required: true,
                    ValidarHoraDuracaoTermino: false,
                    ValidarHoraDuracaoTerminoSemIntervalo: false,
                    horaValidaDe5Em5Minutos: true
                });
            }
            else if ($('#checkIntervalo2').prop('checked') && !$('#checkIntervalo').prop('checked')) {
                $('#txtHoraInicio2').rules('add', {
                    required: true,
                    ValidarHoraDuracaoInicio: false,
                    ValidarHoraDuracaoInicioSemIntervalo: false,
                    horaValidaDe5Em5Minutos: true
                });

                $('#txtHoraTermino2').rules('add', {
                    required: true,
                    ValidarHoraDuracaoTermino: false,
                    ValidarHoraDuracaoTerminoSemIntervalo: false,
                    horaValidaDe5Em5Minutos: true
                });
            }
            else if (!$('#checkIntervalo').prop('checked') && !$('#checkIntervalo2').prop('checked') && $('#formHoraAula #cboTurno').val() == '103') {
                $('#txtHoraInicio').rules('add', {
                    required: true,
                    ValidarHoraDuracaoInicio: false,
                    ValidarHoraDuracaoInicioSemIntervalo: false,
                    horaValidaDe5Em5Minutos: true
                });

                $('#txtHoraTermino').rules('add', {
                    required: true,
                    ValidarHoraDuracaoTermino: false,
                    ValidarHoraDuracaoTerminoSemIntervalo: false,
                    horaValidaDe5Em5Minutos: true
                });

                $('#txtHoraInicio2').rules('add', {
                    required: true,
                    ValidarHoraDuracaoInicio: false,
                    ValidarHoraDuracaoInicioSemIntervalo: false,
                    horaValidaDe5Em5Minutos: true
                });

                $('#txtHoraTermino2').rules('add', {
                    required: true,
                    ValidarHoraDuracaoTermino: false,
                    ValidarHoraDuracaoTerminoSemIntervalo: false,
                    horaValidaDe5Em5Minutos: true
                });
            }
            else {
                $('#txtHoraInicio').rules('add', {
                    required: true,
                    ValidarHoraDuracaoInicio: true,
                    ValidarHoraDuracaoInicioSemIntervalo: false
                });

                $('#txtHoraTermino').rules('add', {
                    required: true,
                    ValidarHoraDuracaoTermino: true,
                    ValidarHoraDuracaoTerminoSemIntervalo: false
                });

                $('#txtHoraInicio2').rules('add', {
                    required: true,
                    ValidarHoraDuracaoInicio: true,
                    ValidarHoraDuracaoInicioSemIntervalo: false
                });

                $('#txtHoraTermino2').rules('add', {
                    required: true,
                    ValidarHoraDuracaoTermino: true,
                    ValidarHoraDuracaoTerminoSemIntervalo: false
                });
            }
        });

    },

    Intervalo: function () {
        $('#checkIntervalo').change(function () {
            if ($('#checkIntervalo').prop('checked')) {
                $('#divIntervalo').show();
            }
            else {
                $('#divIntervalo').hide();
            }

        });

        $('#checkIntervalo2').change(function () {
            if ($('#checkIntervalo2').prop('checked')) {
                $('#divIntervalo2').show();
            }
            else {
                $('#divIntervalo2').hide();
            }

        });
    },


    ValidaHoraInicioIntervalo: function () {

        jQuery.validator.addMethod("ValidaHoraInicioIntervalo", function (horaInicioIntervaloValue, horaInicioIntervalo, horaInicioAula) {

            horaInicioIntervaloValue = parseInt(horaInicioIntervaloValue.substring(0, 2) + horaInicioIntervaloValue.substring(3, 5));
            horaInicioAula = parseInt($(horaInicioAula).val().replace(':', ''));

            return horaInicioAula < horaInicioIntervaloValue;
        },
           'Início de intervalo não pode ser menor do que o inicio da aula'
       );
    },

    ValidaHoraTerminoIntervalo: function () {

        jQuery.validator.addMethod("ValidaHoraTerminoIntervalo", function (horaTerminoIntervaloValue, horaTerminoIntervalo, horaTerminoAula) {

            horaTerminoIntervaloValue = parseInt(horaTerminoIntervaloValue.substring(0, 2) + horaTerminoIntervaloValue.substring(3, 5));
            horaTerminoAula = parseInt($(horaTerminoAula).val().replace(':', ''));

            return horaTerminoIntervaloValue < horaTerminoAula;
        },
           'Início de intervalo não pode ser menor do que o inicio da aula'
       );
    },

    ValidarHoraDuracaoTerminoSemIntervalo: function () {
        jQuery.validator.addMethod("ValidarHoraDuracaoTerminoSemIntervalo", function () {
            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            /////////////////Valida hora depois do intervalo /////////////////////////////////////////////////////////////////////////

            /////Pego só as horas do termino de aula e inicio de intervalo
            var horaTermino = parseInt($('#txtHoraTermino').val()[0] + $('#txtHoraTermino').val()[1]);
            var horaTerminoIntervalo = parseInt($('#txtHoraInicio').val()[0] + $('#txtHoraInicio').val()[1]);

            //// pego só os minutos de inicio de aula e inicio de intervalo
            var minutoTermino = parseInt($('#txtHoraTermino').val()[3] + $('#txtHoraTermino').val()[4]);
            var minutoTerminoIntervalo = parseInt($('#txtHoraInicio').val()[3] + $('#txtHoraInicio').val()[4]);

            ///// transformo as horas em minuto
            var totalMinutosHorasTermino = horaTermino * 60;
            var totalMinutosHorasTerminoIntervalo = horaTerminoIntervalo * 60;

            ////somo os minutos das horas como os minutos termino digitado
            var totalMinutosTermino = totalMinutosHorasTermino + minutoTermino;
            var totalMinutosTerminoIntervalo = totalMinutosHorasTerminoIntervalo + minutoTerminoIntervalo;

            //// subtrai o total de minutos  inicio da aula com o termino do intervalo e pego o resto da divisão pelo a duração selecionada no combo se o resto der > 0 é invalido tem que dar 0 

            return (totalMinutosTermino - totalMinutosTerminoIntervalo) % duracaoAula == 0
        },
           'Início de intervalo não pode ser menor do que o inicio da aula'
       );
    },

    ValidarHoraDuracaoTermino: function () {
        jQuery.validator.addMethod("ValidarHoraDuracaoTermino", function () {
            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            /////////////////Valida hora depois do intervalo /////////////////////////////////////////////////////////////////////////

            /////Pego só as horas do termino de aula e inicio de intervalo
            var horaTermino = parseInt($('#txtHoraTermino').val()[0] + $('#txtHoraTermino').val()[1]);
            var horaTerminoIntervalo = parseInt($('#txtDuracaoIntervalo').val()[0] + $('#txtDuracaoIntervalo').val()[1]);

            //// pego só os minutos de inicio de aula e inicio de intervalo
            var minutoTermino = parseInt($('#txtHoraTermino').val()[3] + $('#txtHoraTermino').val()[4]);
            var minutoTerminoIntervalo = parseInt($('#txtDuracaoIntervalo').val()[3] + $('#txtDuracaoIntervalo').val()[4]);

            ///// transformo as horas em minuto
            var totalMinutosHorasTermino = horaTermino * 60;
            var totalMinutosHorasTerminoIntervalo = horaTerminoIntervalo * 60;

            ////somo os minutos das horas como os minutos termino digitado
            var totalMinutosTermino = totalMinutosHorasTermino + minutoTermino;
            var totalMinutosTerminoIntervalo = totalMinutosHorasTerminoIntervalo + minutoTerminoIntervalo;

            //// subtrai o total de minutos  inicio da aula com o termino do intervalo e pego o resto da divisão pelo a duração selecionada no combo se o resto der > 0 é invalido tem que dar 0 

            return (totalMinutosTermino - totalMinutosTerminoIntervalo) % duracaoAula == 0
        },
           'Início de intervalo não pode ser menor do que o inicio da aula'
       );
    },

    ValidarHoraDuracaoInicioSemIntervalo: function () {

        jQuery.validator.addMethod("ValidarHoraDuracaoInicioSemIntervalo", function (value, control, params) {

            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            /////////////////Valida hora antes do intervalo /////////////////////////////////////////////////////////////////////////

            /////Pego só as horas do inicio de aula e inicio de intervalo
            var horaInicio = parseInt($('#txtHoraInicio').val()[0] + $('#txtHoraInicio').val()[1]);
            var horaInicioIntervalo = parseInt($('#txtHoraTermino').val()[0] + $('#txtHoraTermino').val()[1]);

            //// pego só os minutos de inicio de aula e inicio de intervalo
            var minutoInicio = parseInt($('#txtHoraInicio').val()[3] + $('#txtHoraInicio').val()[4]);
            var minutoInicioIntervalo = parseInt($('#txtHoraTermino').val()[3] + $('#txtHoraTermino').val()[4]);

            ///// transformo as horas em minuto
            var totalMinutosHorasInicio = horaInicio * 60;
            var totalMinutosHorasInicioIntervalo = horaInicioIntervalo * 60;

            ////somo os minutos das horas com os minutos inicio digitado
            var totalMinutosInicio = totalMinutosHorasInicio + minutoInicio;
            var totalMinutosInicioIntervalo = totalMinutosHorasInicioIntervalo + minutoInicioIntervalo;

            //// subtrai o total de minutos  inicio da aula com o inicio do intervalo e pego o resto da divisão pelo a duração selecionada no combo se o resto der > 0 é invalido 

            return (totalMinutosInicioIntervalo - totalMinutosInicio) % duracaoAula == 0;
        },
          'Início de intervalo não pode ser menor do que o inicio da aula'
      );
    },

    ValidarHoraDuracaoInicio: function () {

        jQuery.validator.addMethod("ValidarHoraDuracaoInicio", function (value, control, params) {

            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            /////////////////Valida hora antes do intervalo /////////////////////////////////////////////////////////////////////////

            /////Pego só as horas do inicio de aula e inicio de intervalo
            var horaInicio = parseInt($('#txtHoraInicio').val()[0] + $('#txtHoraInicio').val()[1]);
            var horaInicioIntervalo = parseInt($('#txtHoraInicioIntervalo').val()[0] + $('#txtHoraInicioIntervalo').val()[1]);

            //// pego só os minutos de inicio de aula e inicio de intervalo
            var minutoInicio = parseInt($('#txtHoraInicio').val()[3] + $('#txtHoraInicio').val()[4]);
            var minutoInicioIntervalo = parseInt($('#txtHoraInicioIntervalo').val()[3] + $('#txtHoraInicioIntervalo').val()[4]);

            ///// transformo as horas em minuto
            var totalMinutosHorasInicio = horaInicio * 60;
            var totalMinutosHorasInicioIntervalo = horaInicioIntervalo * 60;

            ////somo os minutos das horas com os minutos inicio digitado
            var totalMinutosInicio = totalMinutosHorasInicio + minutoInicio;
            var totalMinutosInicioIntervalo = totalMinutosHorasInicioIntervalo + minutoInicioIntervalo;

            //// subtrai o total de minutos  inicio da aula com o inicio do intervalo e pego o resto da divisão pelo a duração selecionada no combo se o resto der > 0 é invalido 

            return (totalMinutosInicioIntervalo - totalMinutosInicio) % duracaoAula == 0;
        },
          'Início de intervalo não pode ser menor do que o inicio da aula'
      );
    },

    ValidarHoraFimMenorInicio: function () {
        //Verifica se o inicio do tarno da tarde é maior que o fim do turno da manhã
        jQuery.validator.addMethod("ValidarHoraFimMenorInicio", function (value, control, params) {

            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            var horaInicioIntervalo = parseInt($('#txtHoraInicio').val()[0] + $('#txtHoraInicio').val()[1]);
            var horaFimIntervalo = parseInt($('#txtHoraTermino').val()[0] + $('#txtHoraTermino').val()[1]);


            var minutoInicioIntervalo = parseInt($('#txtHoraInicio').val()[3] + $('#txtHoraInicio').val()[4]);
            var minutoFimIntervalo = parseInt($('#txtHoraTermino').val()[3] + $('#txtHoraTermino').val()[4]);


            var totalMinutosHorasInicioIntervalo = horaInicioIntervalo * 60;
            var totalMinutosHorasFimIntervalo = horaFimIntervalo * 60;


            var totalMinutosInicioIntervalo = totalMinutosHorasInicioIntervalo + minutoInicioIntervalo;
            var totalMinutosFimIntervalo = totalMinutosHorasFimIntervalo + minutoFimIntervalo;




            return (totalMinutosFimIntervalo - totalMinutosInicioIntervalo) > 0;


            //return (totalMinutosInicioIntervalo - totalMinutosInicio) % duracaoAula == 0 || (totalMinutosInicio - totalMinutosFim) > 0;
        },
          'O fim do intervalo deve ser menor que o início do intervalo'
      );
    },

    ValidarHoraInicioTerminoIntervalo: function () {
        //Verifica se o inicio do tarno da tarde é maior que o fim do turno da manhã
        jQuery.validator.addMethod("ValidarHoraInicioTerminoIntervalo", function (value, control, params) {

            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            var horaInicioIntervalo = parseInt($('#txtHoraInicioIntervalo').val()[0] + $('#txtHoraInicioIntervalo').val()[1]);
            var horaFimIntervalo = parseInt($('#txtDuracaoIntervalo').val()[0] + $('#txtDuracaoIntervalo').val()[1]);


            var minutoInicioIntervalo = parseInt($('#txtHoraInicioIntervalo').val()[3] + $('#txtHoraInicioIntervalo').val()[4]);
            var minutoFimIntervalo = parseInt($('#txtDuracaoIntervalo').val()[3] + $('#txtDuracaoIntervalo').val()[4]);


            var totalMinutosHorasInicioIntervalo = horaInicioIntervalo * 60;
            var totalMinutosHorasFimIntervalo = horaFimIntervalo * 60;


            var totalMinutosInicioIntervalo = totalMinutosHorasInicioIntervalo + minutoInicioIntervalo;
            var totalMinutosFimIntervalo = totalMinutosHorasFimIntervalo + minutoFimIntervalo;




            return (totalMinutosFimIntervalo - totalMinutosInicioIntervalo) > 0;


            //return (totalMinutosInicioIntervalo - totalMinutosInicio) % duracaoAula == 0 || (totalMinutosInicio - totalMinutosFim) > 0;
        },
          'O fim do intervalo deve ser menor que o início do intervalo'
      );
    },


    //Validação periodo integral
    ValidaHoraInicioIntervaloIntegral: function () {

        jQuery.validator.addMethod("ValidaHoraInicioIntervaloIntegral", function (horaInicioIntervaloValue, horaInicioIntervalo, horaInicioAula) {

            horaInicioIntervaloValue = parseInt(horaInicioIntervaloValue.substring(0, 2) + horaInicioIntervaloValue.substring(3, 5));
            horaInicioAula = parseInt($(horaInicioAula).val().replace(':', ''));

            return horaInicioAula < horaInicioIntervaloValue;
        },
           'Início de intervalo não pode ser menor do que o início da aula (Integral)'
       );
    },
    ValidaHoraTerminoIntervaloIntegral: function () {

        jQuery.validator.addMethod("ValidaHoraTerminoIntervaloIntegral", function (horaTerminoIntervaloValue, horaTerminoIntervalo, horaTerminoAula) {

            horaTerminoIntervaloValue = parseInt(horaTerminoIntervaloValue.substring(0, 2) + horaTerminoIntervaloValue.substring(3, 5));
            horaTerminoAula = parseInt($(horaTerminoAula).val().replace(':', ''));

            return horaTerminoIntervaloValue < horaTerminoAula;
        },
           'Início de intervalo não pode ser menor do que o início da aula (integral)'
       );
    },
    ValidarHoraDuracaoTerminoIntegral: function () {
        jQuery.validator.addMethod("ValidarHoraDuracaoTerminoIntegral", function () {
            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            /////////////////Valida hora depois do intervalo /////////////////////////////////////////////////////////////////////////

            /////Pego só as horas do termino de aula e inicio de intervalo
            var horaTermino = parseInt($('#txtHoraTermino2').val()[0] + $('#txtHoraTermino2').val()[1]);
            var horaTerminoIntervalo = parseInt($('#txtDuracaoIntervalo2').val()[0] + $('#txtDuracaoIntervalo2').val()[1]);

            //// pego só os minutos de inicio de aula e inicio de intervalo
            var minutoTermino = parseInt($('#txtHoraTermino2').val()[3] + $('#txtHoraTermino2').val()[4]);
            var minutoTerminoIntervalo = parseInt($('#txtDuracaoIntervalo2').val()[3] + $('#txtDuracaoIntervalo2').val()[4]);

            ///// transformo as horas em minuto
            var totalMinutosHorasTermino = horaTermino * 60;
            var totalMinutosHorasTerminoIntervalo = horaTerminoIntervalo * 60;

            ////somo os minutos das horas como os minutos termino digitado
            var totalMinutosTermino = totalMinutosHorasTermino + minutoTermino;
            var totalMinutosTerminoIntervalo = totalMinutosHorasTerminoIntervalo + minutoTerminoIntervalo;

            //// subtrai o total de minutos  inicio da aula com o termino do intervalo e pego o resto da divisão pelo a duração selecionada no combo se o resto der > 0 é invalido tem que dar 0 

            return (totalMinutosTermino - totalMinutosTerminoIntervalo) % duracaoAula == 0
        },
           'Início de intervalo não pode ser menor do que o início da aula (Integral)'
       );
    },
    ValidarHoraDuracaoInicioIntegral: function () {

        jQuery.validator.addMethod("ValidarHoraDuracaoInicioIntegral", function (value, control, params) {

            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            /////////////////Valida hora antes do intervalo /////////////////////////////////////////////////////////////////////////
            //var horaFimManha = parseInt($('#txtHoraTermino').val()[0] + $('#txtHoraTermino').val()[1]);
            /////Pego só as horas do inicio de aula e inicio de intervalo
            var horaInicio = parseInt($('#txtHoraInicio2').val()[0] + $('#txtHoraInicio2').val()[1]);
            var horaInicioIntervalo = parseInt($('#txtHoraInicioIntervalo2').val()[0] + $('#txtHoraInicioIntervalo2').val()[1]);

            // var minutoFimManha = parseInt($('#txtHoraTermino').val()[3] + $('#txtHoraTermino').val()[4]);
            //// pego só os minutos de inicio de aula e inicio de intervalo
            var minutoInicio = parseInt($('#txtHoraInicio2').val()[3] + $('#txtHoraInicio2').val()[4]);
            var minutoInicioIntervalo = parseInt($('#txtHoraInicioIntervalo2').val()[3] + $('#txtHoraInicioIntervalo2').val()[4]);

            //var totalMinutosHorasFim = horaFimManha * 60;
            ///// transformo as horas em minuto
            var totalMinutosHorasInicio = horaInicio * 60;
            var totalMinutosHorasInicioIntervalo = horaInicioIntervalo * 60;

            //var totalMinutosFim= totalMinutosHorasFim + minutoFimManha;
            ////somo os minutos das horas com os minutos inicio digitado
            var totalMinutosInicio = totalMinutosHorasInicio + minutoInicio;
            var totalMinutosInicioIntervalo = totalMinutosHorasInicioIntervalo + minutoInicioIntervalo;

            //// subtrai o total de minutos  inicio da aula com o inicio do intervalo e pego o resto da divisão pelo a duração selecionada no combo se o resto der > 0 é invalido 



            return (totalMinutosInicioIntervalo - totalMinutosInicio) % duracaoAula == 0;
        },
          'Início de intervalo não pode ser menor do que o início da aula (Integral)'
      );
    },

    ValidarHoraInicioTurnoTardeIntegral: function () {
        //Verifica se o inicio do tarno da tarde é maior que o fim do turno da manhã
        jQuery.validator.addMethod("ValidarHoraInicioTurnoTardeIntegral", function (value, control, params) {

            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            var horaFimManha = parseInt($('#txtHoraTermino').val()[0] + $('#txtHoraTermino').val()[1]);
            var horaInicio = parseInt($('#txtHoraInicio2').val()[0] + $('#txtHoraInicio2').val()[1]);


            var minutoFimManha = parseInt($('#txtHoraTermino').val()[3] + $('#txtHoraTermino').val()[4]);
            var minutoInicio = parseInt($('#txtHoraInicio2').val()[3] + $('#txtHoraInicio2').val()[4]);


            var totalMinutosHorasFim = horaFimManha * 60;
            var totalMinutosHorasInicio = horaInicio * 60;


            var totalMinutosFim = totalMinutosHorasFim + minutoFimManha;
            var totalMinutosInicio = totalMinutosHorasInicio + minutoInicio;




            return (totalMinutosInicio - totalMinutosFim) > 0;


            //return (totalMinutosInicioIntervalo - totalMinutosInicio) % duracaoAula == 0 || (totalMinutosInicio - totalMinutosFim) > 0;
        },
          'O início das aulas dever ser maior que o fim da aulas do turno da manhã'
      );
    },


    ValidarHoraInicioTerminoIntervaloIntegral: function () {
        //Verifica se o inicio do tarno da tarde é maior que o fim do turno da manhã
        jQuery.validator.addMethod("ValidarHoraInicioTerminoIntervaloIntegral", function (value, control, params) {

            var duracaoAula = parseInt($('#cboDuracaoAula').val());

            var horaInicioIntervalo = parseInt($('#txtHoraInicioIntervalo2').val()[0] + $('#txtHoraInicioIntervalo2').val()[1]);
            var horaFimIntervalo = parseInt($('#txtDuracaoIntervalo2').val()[0] + $('#txtDuracaoIntervalo2').val()[1]);


            var minutoInicioIntervalo = parseInt($('#txtHoraInicioIntervalo2').val()[3] + $('#txtHoraInicioIntervalo2').val()[4]);
            var minutoFimIntervalo = parseInt($('#txtDuracaoIntervalo2').val()[3] + $('#txtDuracaoIntervalo2').val()[4]);


            var totalMinutosHorasInicioIntervalo = horaInicioIntervalo * 60;
            var totalMinutosHorasFimIntervalo = horaFimIntervalo * 60;


            var totalMinutosInicioIntervalo = totalMinutosHorasInicioIntervalo + minutoInicioIntervalo;
            var totalMinutosFimIntervalo = totalMinutosHorasFimIntervalo + minutoFimIntervalo;




            return (totalMinutosFimIntervalo - totalMinutosInicioIntervalo) > 0;


            //return (totalMinutosInicioIntervalo - totalMinutosInicio) % duracaoAula == 0 || (totalMinutosInicio - totalMinutosFim) > 0;
        },
          'O fim do intervalo deve ser menor que o início do intervalo'
      );
    },

    Pesquisa: function () {
        $('#btnPesquisarHorario').click(function () {

            if (!$('#formPesquisaHoraAula').valid()) return;
            var params = {
                cdEscola: $('#formPesquisaHoraAula #filtroaba1-escola').val(),
                cdTipoEnsino: $('#formPesquisaHoraAula #filtroaba1-tipoEnsino').val(),
                anoLetivo: $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val()
            }

            $.post("../../AssociacaoProfessorClasse/PesquisarHorario", params, function (data) {
                $('#divResultadoPesquisaHorario').empty().html(data);
                HorarioAula.CriarConfirmDeletar();
                HorarioAula.DeletarHorarioTurma();

            }, 'html');
        });
    },


    CarregaCombos: function () {
        //if ($('#cboTurno').length > 0) {
        //    $('#cboTurno').autoPreencher($('#cboTurmaHorarioAula'), 'AssociacaoProfessorClasse', 'CarregarListaTurmas', null, null, null, null, function (ddlAlvo) {
        //        // $(ddlAlvo).sedMultipleSelect();
        //    }, function (dllAlvo, adicionarJson) {
        //        var params = {
        //            config: 'cdTurno',
        //            cdEscola: $('#formPesquisaHoraAula #cboEscola').val(),
        //            cdTipoEnsino: $('#formPesquisaHoraAula #cboTipoEnsino').val(),
        //            anoLetivo: $('#formHoraAula #pAnoLetivo').html(),
        //            cdTurno: ''
        //        };
        //        adicionarJson(params);
        //    });
        //} else {
        //    //$('#cboTurmaHorarioAula').sedMultipleSelect();
        //}

    },
    Deletar: function (cdTurma, cdHorarioAula) {

        var parmas = {
            'preAula.Turma.CD_TURMA': cdTurma,
            'preAula.CdHorarioAula': cdHorarioAula
        };

        $.post('../../AssociacaoProfessorClasse/Deletar', parmas, function () {

        });
    },
    CriarConfirmDeletar: function () {
        $('.btnDeletarHorarioAula').click(function () {
            var cdTurma = $(this).next().val();
            var cdHorarioAula = $(this).next().next().val();

            $("#divConfirmaExcluirHorarioAula").dialog({
                resizable: false,
                height: 148,
                modal: true,
                title: "Associação do professor a classe",
                buttons: {
                    "Sim": function () {
                        HorarioAula.Deletar(cdTurma, cdHorarioAula);
                        $("#divConfirmaExcluirHorarioAula").dialog('close');
                        $('#btnPesquisarHorario').click();
                    },
                    'Cancelar': function () {
                        $("#divConfirmaExcluirHorarioAula").dialog('close');
                    }
                },
                close: function () {
                    //$("#divConfirmaExcluirHorarioAula").dialog('close');
                }
            });

        });
    },

    DeletarHorarioTurma: function () {
        $('.btnDeletarHorarioAulaTurma').click(function () {
            var cdTurma = $(this).val();
            var cdHorarioAula = $(this).next().val();

            $("#divConfirmaExcluirHorarioAula").dialog({
                resizable: false,
                height: 158,
                modal: true,
                buttons: {
                    "Sim": function () {
                        HorarioAula.Deletar(cdTurma, cdHorarioAula);
                        $("#divConfirmaExcluirHorarioAula").dialog('close');
                        $('#btnPesquisarHorario').click();
                    },
                    'Cancelar': function () {
                        $("#divConfirmaExcluirHorarioAula").dialog('close');
                    }
                },
                close: function () {
                    //$("#divConfirmaExcluirHorarioAula").dialog('close');
                }
            });

        });
    },

    CarregaTurmaComTurno: function () {
        $('#ModalHorarioAula #cboTurno').change(function () {
            if ($('#ModalHorarioAula #cboDiaSemana :selected').index() > 0 && $('#ModalHorarioAula #cboTurno :selected').index() > 0) {
                var params = {
                    cdEscola: $('#formPesquisaHoraAula #filtroaba1-escola').val(),
                    cdTipoEnsino: $('#formPesquisaHoraAula #filtroaba1-tipoEnsino').val(),
                    anoLetivo: $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val(),
                    sabado: $('#ModalHorarioAula #cboDiaSemana').val(),
                    turnoSelecionado: $('#ModalHorarioAula #cboTurno :selected').val()
                };

                if ($('#ModalHorarioAula #cboTurno :selected').val() != "") {
                    $.post('../../AssociacaoProfessorClasse/CarregarComboTurma', params, function (data) {
                        $('#ModalHorarioAula #cboTurmaHorarioAula').empty();

                        //bloqueando turmas que possuem aula
                        $(data.Turmas).each(function () {
                            debugger;
                            var aux = false;
                            for (var i = 0; i < data.TurmasExisteHorario.length; i++) {
                                if (this.Value == data.TurmasExisteHorario[i].Value && this.Text.includes($('#ModalHorarioAula #cboTurno :selected').text())) {
                                    //$('#ModalHorarioAula #cboTurmaHorarioAula').append(' <option value="' + this.Value + '" disabled="disabled" checked="checked">' + this.Text + '</option>');
                                    $('#ModalHorarioAula #cboTurmaHorarioAula').append(' <option value="' + this.Value + '">' + this.Text + '</option>');
                                    aux = true;
                                }
                            }

                            $('#ModalHorarioAula #cboTurmaHorarioAula').append(' <option value="' + this.Value + '">' + this.Text + '</option>');
                        });

                        //$('#ModalHorarioAula #cboTurmaHorarioAula').sedMultipleSelect({ selectAll: false });
                        $('#ModalHorarioAula #cboTurmaHorarioAula').multiselect('refresh');

                        $('[name="selectItemcboTurno"]').each(function (indexTuma, turma) {
                            var obj = this;
                            $(data.TurmasExisteHorario).each(function (iTurmaExiste, turmaExiste) {
                                if (turma.value == turmaExiste.Value) {
                                    $(obj).attr('disabled', 'disabled');
                                }
                            });
                        });

                    });
                }
            }
        });

        $('#ModalHorarioAula #cboDiaSemana').change(function () {
            if ($('#ModalHorarioAula #cboTurno :selected').index() > 0 && $('#ModalHorarioAula #cboDiaSemana :selected').index() > 0) {
                var params = {
                    cdEscola: $('#formPesquisaHoraAula #filtroaba1-escola').val(),
                    cdTipoEnsino: $('#formPesquisaHoraAula #filtroaba1-tipoEnsino').val(),
                    anoLetivo: $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val(),
                    sabado: $('#ModalHorarioAula #cboDiaSemana').val(),
                    turnoSelecionado: $('#ModalHorarioAula #cboTurno :selected').val()
                };

                if ($('#ModalHorarioAula #cboTurno :selected').val() != "") {
                    $.post('../../AssociacaoProfessorClasse/CarregarComboTurma', params, function (data) {
                        $('#ModalHorarioAula #cboTurmaHorarioAula').empty();

                        //bloqueando turmas que possuem aula
                        $(data.Turmas).each(function () {
                            var aux = false;
                            for (var i = 0; i < data.TurmasExisteHorario.length; i++) {
                                if (this.Value == data.TurmasExisteHorario[i].Value && this.Text.includes($('#ModalHorarioAula #cboTurno :selected').text())) {
                                    //$('#ModalHorarioAula #cboTurmaHorarioAula').append(' <option value="' + this.Value + '" disabled="disabled" checked="checked">' + this.Text + '</option>');
                                    $('#ModalHorarioAula #cboTurmaHorarioAula').append(' <option value="' + this.Value + '">' + this.Text + '</option>');
                                    aux = true;
                                }
                            }

                            $('#ModalHorarioAula #cboTurmaHorarioAula').append(' <option value="' + this.Value + '">' + this.Text + '</option>');
                        });

                        $('#ModalHorarioAula #cboTurmaHorarioAula').multiselect({
                            selectAll: false
                        });
                        $('#ModalHorarioAula #cboTurmaHorarioAula').multiselect('refresh');

                        $('[name="selectItemcboTurno"]').each(function (indexTuma, turma) {
                            var obj = this;
                            $(data.TurmasExisteHorario).each(function (iTurmaExiste, turmaExiste) {
                                if (turma.value == turmaExiste.Value) {
                                    $(obj).attr('disabled', 'disabled');
                                }
                            });
                        });

                    });
                }
            }

            if ($('#ModalHorarioAula #cboDiaSemana :selected').val() == 0) {
                $('#DiasUteis').show();
            }
            else {
                $('#DiasUteis').hide();
            }
        });


        $('#ModalHorarioAula #chkSelecionarTodos').change(function () {

            if ($('#ModalHorarioAula #chkSelecionarTodos').prop('checked')) {
                $('#chkSegunda').prop('checked', true);
                $('#chkTerca').prop('checked', true);
                $('#chkQuarta').prop('checked', true);
                $('#chkQuinta').prop('checked', true);
                $('#chkSexta').prop('checked', true);
            }
            else {
                $('#chkSegunda').prop('checked', false);
                $('#chkTerca').prop('checked', false);
                $('#chkQuarta').prop('checked', false);
                $('#chkQuinta').prop('checked', false);
                $('#chkSexta').prop('checked', false);
            }
        });
    },
    CarregaTurmaSemTurno: function () {
        $('#ModalHorarioAula #cboDiaSemana').change(function () {
            if ($('#ModalHorarioAula #cboDiaSemana :selected').index() > 0) {

                var params = {
                    cdEscola: $('#formPesquisaHoraAula #filtroaba1-escola').val(),
                    cdTipoEnsino: $('#formPesquisaHoraAula #filtroaba1-tipoEnsino').val(),
                    anoLetivo: $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val(),
                    sabado: $('#ModalHorarioAula #cboDiaSemana').val()
                };

                $.post('../../AssociacaoProfessorClasse/CarregarComboTurma', params, function (data) {
                    $('#ModalHorarioAula #cboTurmaHorarioAula').empty();

                    //bloqueando turmas que possuem aula
                    $(data.Turmas).each(function () {
                        var aux = false;
                        for (var i = 0; i < data.TurmasExisteHorario.length; i++) {
                            if (this.Value == data.TurmasExisteHorario[i].Value && this.Text.includes($('#ModalHorarioAula #cboTurno :selected').text())) {
                                //$('#ModalHorarioAula #cboTurmaHorarioAula').append(' <option value="' + this.Value + '" disabled="disabled" checked="checked">' + this.Text + '</option>');
                                $('#ModalHorarioAula #cboTurmaHorarioAula').append(' <option value="' + this.Value + '">' + this.Text + '</option>');
                                aux = true;
                            }
                        }

                        $('#ModalHorarioAula #cboTurmaHorarioAula').append(' <option value="' + this.Value + '">' + this.Text + '</option>');
                    });

                    //$('#ModalHorarioAula #cboTurmaHorarioAula').sedMultipleSelect({ selectAll: false });
                    //$('#ModalHorarioAula #cboTurmaHorarioAula').multiselect('refresh');

                    $('[name="selectItemcboTurno"]').each(function (indexTuma, turma) {
                        var obj = this;
                        $(data.TurmasExisteHorario).each(function (iTurmaExiste, turmaExiste) {
                            if (turma.value == turmaExiste.Value) {
                                $(obj).attr('disabled', 'disabled');
                            }
                        });
                    });
                });
            }
            if ($('#ModalHorarioAula #cboDiaSemana :selected').val() == 0) {
                $('#DiasUteis').show();
            }
            else {
                $('#DiasUteis').hide();
            }
        });
    }

};

//function PermiteReposicao(id) {
//    $("#divReposicao").hide();
//    if (id == 1) {
//        $("#divReposicao").show();
//    }
//}

//function ConfiguraReposicao(id) {

//    var check = document.getElementById("checkReposicao").checked;

//    $('#checkIntervalo').click();

//    if (check) {
//        $("#checkIntervalo").prop("disabled", true);
//    }
//    else {
//        $("#checkIntervalo").prop("disabled", false);
//        $('#checkIntervalo').click();
//    }
//}

var SetUp = {
    Tabs: function () {
        $("#tabs").sedTabControl();
        $("#tabsAssociacaoClasse").sedTabControl();
    },
    Combos: function () {

        $('#formPesquisaHoraAula #TipoDiretoria').autoPreencher($('#formPesquisaHoraAula #cboDiretoria'), 'Diretoria', 'CarregarListaDiretoriasCompletoPorTipoAtribuicao', [{
            id: "'TipoDiretoria'"
        }]);

        $("#formPesquisaHoraAula #cboDiretoria").autoPreencher($("#formPesquisaHoraAula #cboEscola"), "Escola", "CarregaListaEscolasPorTipoDiretoriaMunicipioAtribuicao", [{
            CodigoDiretoria: "'cboDiretoria'", TipoDiretoria: "'TipoDiretoria'"
        }]);

        //Preencher GOE
        if ($('#formPesquisaHoraAula #cboEscola').val() != "") {
            var params =
            {
                id: $('#formPesquisaHoraAula #cboEscola').val(),
                AnoLetivo: $('#formPesquisaHoraAula #txtAnoLetivo').val()
            };

            $.post('../../TipoEnsino/CarregarListaTiposEnsino', params, function (data) {
                $.each(data, function (i, data) {
                    $('#cboTipoEnsino').append($('<option>', {
                        value: data.value,
                        text: data.text
                    }));
                });
            });
        }

        $('#formPesquisaHoraAula #cboEscola').autoPreencher($('#cboTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    },
    CadastroHorario: {
        CarregarModal: function () {
            $('#btnCadastrarHorario').click(function () {

                if (!$('#formPesquisaHoraAula').valid()) return;
                $('#btnPesquisarHorario').click();

                var params =
                    {
                        cdEscola: $('#formPesquisaHoraAula #filtroaba1-escola').val(),
                        cdTipoEnsino: $('#formPesquisaHoraAula #filtroaba1-tipoEnsino').val(),
                        anoLetivo: $('#formPesquisaHoraAula #filtroaba1-anoLetivo').val()
                    };

                $.post('../../AssociacaoProfessorClasse/HorarioAula', params, function (data) {
                    $('#ModalHorarioAula').empty().html(data);
                    $('#pEscola').html($('#formPesquisaHoraAula #filtroaba1-escola :selected').text());
                    $('#pTipoEnsino').html($('#formPesquisaHoraAula #filtroaba1-tipoEnsino :selected').text());
                    $('#pAnoLetivo').html($('#formPesquisaHoraAula #filtroaba1-anoLetivo').val());
                    $('#ModalHorarioAula').dialog({
                        width: 810,
                        position: ['center', 0]

                    });

                    if ($('#cboTurno').length == 0) {

                    }

                    HorarioAula.CarregaCombos();
                    HorarioAula.ValidaHoraInicioIntervalo();
                    HorarioAula.ValidarHoraDuracaoInicio();
                    HorarioAula.ValidarHoraDuracaoInicioSemIntervalo();
                    HorarioAula.ValidaHoraTerminoIntervalo();
                    HorarioAula.ValidarHoraDuracaoTermino();
                    HorarioAula.ValidarHoraDuracaoTerminoSemIntervalo();
                    HorarioAula.ValidarHoraInicioTerminoIntervalo();
                    HorarioAula.ValidarHoraFimMenorInicio();
                    //Integral
                    HorarioAula.ValidaHoraInicioIntervaloIntegral();
                    HorarioAula.ValidarHoraDuracaoInicioIntegral();
                    HorarioAula.ValidaHoraTerminoIntervaloIntegral();
                    HorarioAula.ValidarHoraDuracaoTerminoIntegral();
                    HorarioAula.ValidarHoraInicioTurnoTardeIntegral();
                    HorarioAula.ValidarHoraInicioTerminoIntervaloIntegral();

                    HorarioAula.Validacoes();
                    HorarioAula.Salvar();

                    AplicarMascaras();

                    if ($('#cboTurno').length > 0) {
                        HorarioAula.CarregaTurmaComTurno();
                    }
                    else {
                        HorarioAula.CarregaTurmaSemTurno();
                    }

                    $('#formHoraAula #cboTurno').change(function () {
                        if ($(this).val() == '103') {
                            $('#formHoraAula').validate({
                                rules: {
                                    HoraInicioIntervalo: {
                                        required: false, horaValidaDe5Em5Minutos: false, ValidaHoraInicioIntervaloIntegral: false
                                    },
                                    terminoIntervalo: {
                                        required: false, horaValidaDe5Em5Minutos: false, ValidaHoraTerminoIntervaloIntegral: false
                                    },
                                    HoraInicio: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    },
                                    HoraTermino: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    },
                                    HoraInicioIntervalo2: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    },
                                    terminoIntervalo2: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    },
                                    HoraInicio2: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    },
                                    HoraTermino2: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    }
                                }
                            });
                        }

                        $('#checkIntervalo').prop('disabled', false);
                        $('#checkIntervalo2').prop('disabled', false);
                    });

                    $('#checkIntervalo').change(function () {
                        if ($('#checkIntervalo').prop('checked')) {
                            $('#divIntervalo').hide()
                            $('#formHoraAula').validate({
                                rules: {
                                    HoraInicioIntervalo2: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    },
                                    terminoIntervalo2: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    },
                                    HoraInicio2: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    },
                                    HoraTermino2: {
                                        required: false, horaValidaDe5Em5Minutos: false
                                    }
                                }
                            });
                        }

                        else
                            $('#divIntervalo').show()

                    });
                    $('#checkIntervalo2').change(function () {
                        if ($('#checkIntervalo2').prop('checked')) {
                            $('#divIntervalo2').hide();
                        }
                        else
                            $('#divIntervalo2').show()
                    });

                }, 'html');
            });
        }
    },
    Validacoes: function () {
        $('#formPesquisaHoraAula').validate({
            rules: {
                'filtroaba1-diretoria': {
                    required: true
                },
                'filtroaba1-escola': {
                    required: true
                },
                'filtroaba1-tipoEnsino': {
                    required: true
                },
                'filtroaba1-anoLetivo': {
                    required: true, minlength: 4
                }

            },

            messages: {
                required: 'Obrigatório',
                'filtroaba1-anoLetivo': {
                    minlength: 'Ano inválido'
                }
            }
        });
    },
};

var PesquisaAssociacaoATPC = {
    Pesquisar: function () {
        $('#btnPesquisarPesquisaAssociacaoAtpcProf').click(function () {
            params = {
                cpf: $('#cboProfessorPesquisaAssociacaoAtpcProf').val(),
                escola: $('#filtroaba5-escola').val(),
                anoLetivo: $('#filtroaba5-anoLetivo').val()
            };

            $.post('../../AssociacaoProfessorClasse/PesquisaAssociacaoEAtpcEscola', params, function (data) {
                $('#divPesquisaAssoAtpc').empty().html(data);
                PesquisaAssociacaoATPC.Visualizar();
                $("#tbPesquisaAssocicaoAtpcPro").sedDataTable({
                    nomeExportacao: "Lista de Professor com Associação",
                    columnDefs: [{
                        targets: [5, 6], orderable: false
                    },
                    ]
                });
            });
        });
    },
    Combos: function () {

        //$('#formPesquisaAssociacaoAtpcProf #TipoDiretoriaAssociacaoAtpcPr')
        //     .autoPreencher($('#formPesquisaAssociacaoAtpcProf #cboDiretoriaPesquisaAssociacaoAtpcProf'), 'Diretoria', 'CarregarListaDiretoriasCompletoPorTipoAtribuicao',
        //     [{ id: "'TipoDiretoriaAssociacaoAtpcPr'" }]);

        //$("#formPesquisaAssociacaoAtpcProf #cboDiretoriaPesquisaAssociacaoAtpcProf")
        //    .autoPreencher($("#formPesquisaAssociacaoAtpcProf #cboEscolPesquisaAssociacaoAtpcProfa"), "Escola", "CarregaListaEscolasPorTipoDiretoriaMunicipioAtribuicao",
        //    [{ CodigoDiretoria: "'cboDiretoriaPesquisaAssociacaoAtpcProf'", TipoDiretoria: "'TipoDiretoriaAssociacaoAtpcPr'" }]);


        //$('#formPesquisaAssociacaoAtpcProf #cboDiretoriaPesquisaAssociacaoAtpcProf').autoPreencher($('#formPesquisaAssociacaoAtpcProf #cboEscolPesquisaAssociacaoAtpcProfa'), 'Escola', 'CarregarListaEscolas');

        $('#formPesquisaAssociacaoAtpcProf #filtroaba5-escola').autoPreencher($('#formPesquisaAssociacaoAtpcProf #cboProfessorPesquisaAssociacaoAtpcProf'), 'Professor', 'ComboProfessorComAula', null, null, null, null, null, function (dllAlvo, adicionarJson) {
            var params = {
                escola: $('#formPesquisaAssociacaoAtpcProf #filtroaba5-escola').val(),
                anoLetivo: $('#formPesquisaAssociacaoAtpcProf #filtroaba5-anoLetivo').val()
            };
            adicionarJson(params);
        });

        $('#formPesquisaAssociacaoAtpcProf #filtroaba5-tipoEnsino').autoPreencher($('#formPesquisaAssociacaoAtpcProf #cboProfessor'), 'Professor', 'ComboProfessorComAula', null, null, null, null, null, function (dllAlvo, adicionarJson) {
            $('#formPesquisaAssociacaoAtpcProf #cboProfessor').empty();
            $('#formPesquisaAssociacaoAtpcProf #cboProfessor').append('<option value="">Selecione...</option>');
            var params = {
                escola: $('#formPesquisaAssociacaoAtpcProf #filtroaba5-escola').val(),
                anoLetivo: $('#formPesquisaAssociacaoAtpcProf #filtroaba5-anoLetivo').val(),
                cdTipoEnsino: $('#formPesquisaAssociacaoAtpcProf #filtroaba5-tipoEnsino').val()
            };
            adicionarJson(params);
        });
    },
    Visualizar: function () {
        $('.visualizarAssoAtpc').click(function () {
            var params = {
                cpf: $(this).find('#hdnCpfProfAssoAtpc').val(),
                anoLetivo: $('#formPesquisaAssociacaoAtpcProf #filtroaba5-anoLetivo').val(),
                cdEscola: $('#filtroaba5-escola').val()
            };

            $.post('../../AssociacaoProfessorClasse/VizualizarAssociacaoAtpc', params, function (data) {
                $('#visualizarAssoAtpcProf').empty().html(data);
                $('#visualizarAssoAtpcProf').dialog({
                    width: 800,
                    position: ['center', 0]

                });
            });
        });
    }
};

//var PegaDataAtual = function () {
//    var n = new Date();
//    var dia = n.getDate() < 10 ? + "0" + n.getDate().toString() : n.getDate();
//OBS.: NÃO ESTÁ FUNCIONANDO O MÊS < 10 - VALIDAR CASO FOR USAR
//    var mes = n.getMonth() < 10 ? + "0" + (n.getMonth() + 1).toString() : n.getMonth() + 1;
//    var ano = n.getFullYear();
//    var dataAtual = ano + "-" + mes + "-" + dia;

//    return dataAtual;
//}

function EhCiclo1(cdDisciplina) {
    return cdDisciplina == 1000 || cdDisciplina == 1001 || cdDisciplina == 1009;
}

function fct_CarregarSubTurmas(turma) {
    var select = $("#cboSubTurma");
    select.empty();
    select.append(new Option("Selecione...", "", true, true));

    if (turma > 0) {
        $.getJSON('/AtribuicaoAula/SubTurmas', {
            turma: turma
        }, function (myData) {
            fct_ValidarSubTurma(myData.length); d

            $.each(myData, function (index, itemData) {
                select.append($('<option/>', {
                    value: itemData.Value,
                    text: itemData.Text
                }));
            });
        });
    }
}

function VerificaSeEhSubstituicao(params) {
    Mensagem.IgnorarMensagensAutomaticas = false;
    $('#dadosSubstituidoInterno').remove();
    $.ajax({
        type: 'POST',
        url: '/AssociacaoProfessorClasse/VerificaSeJaExiste',
        dataType: 'JSON',
        data: {
            cdTurma: params.cdTurma,
            cdDisciplina: params.cdDisciplina,
            tpAtribuicao: params.tpAtribuicao,
            InicioVig: params.InicioVig,
            FimVigencia: params.FimVigencia,
            CheckSubstituicao: params.CheckSubstituicao,
            cpf: $('#formCadastroAssociocao #txtCpf').val().replace('.', '').replace('.', '').replace('-', ''),
            di: (parseInt($('#formCadastroAssociocao #filtroaba2-redeEnsino :selected').val()) > 1 ?
                $('#cboVinculoDocenteAdicionar :selected').val() : $('#cboDiAdicionar :selected').val()),
            cdRedeEnsino: $('#formCadastroAssociocao #filtroaba2-redeEnsino').val(),
            nrHoraAula: $('#hdnNrHoraAula').val()
        },
        success: function (data) {
            if (data == 0) {
                if ($('#checkEmSubstituicao').is(':checked'))
                    $('#cboTipoAtribuicaoAdicionar').val("");

                $('#checkEmSubstituicao').prop('disabled', '');
                $('#checkEmSubstituicao').prop('checked', '');
                return;
            }

            if (data == 1) {
                $('#checkEmSubstituicao').prop('disabled', '');
                $('#checkEmSubstituicao').prop('checked', '');
                return;
            }

            if (data == 2)
                return;
            if (data == 3) {
                $('#cboTipoAtribuicaoAdicionar').val("");
                $('#checkEmSubstituicao').prop('checked', '');
                return;
            }

            if ($('#checkEmSubstituicao').is(':checked')) {
                $('#DocenteSubstituido').val(true);
                $('#checkEmSubstituicao').prop('disabled', 'disabled');

                if (data.ID != null && data.CdAfastamento > 0)
                    $('#dadosSubstituido').empty().append(
                        '<div id="dadosSubstituidoInterno" class="alert alert-warning">' +
                           '<input type="hidden" id="hdnIdAtribuicaoSubstituido" value="' + data.ID + '">' +
                           '<input type="hidden" id="hdnNmAfastamento" value="' + data.NmAfastamento + '">' +
                            '<p><b>Cód. Afastamento: </b><input type="hidden" id="hdnCdAfastamentoSubstituido" value="' + data.CdAfastamento + '">' + data.CdAfastamento + ' - ' + data.NmAfastamento + '</p>' +
                            '<p><b>Docente: </b><input type="hidden" id="hdnNomeSubstituido" value="' + data.Nome + '">' + data.Nome + ' </p>' +
                            '<p><b>Inicio: </b><input type="hidden" id="hdnDataInicioAfast" value="' + data.DataInicioAfast + '">' + data.DataInicioAfast + '</p>' +
                            '<p><b>Fim: </b><input type="hidden" id="hdnDataFimAfast" value="' + (data.DataFimAfast > new Date('0001-01-01') ? data.DataFimAfast : "") + '">' + (data.DataFimAfast > new Date('0001-01-01') ? data.DataFimAfast : "") + '</p>' +
                        '</div>'
                )
                else
                    $('#dadosSubstituido').empty().append(
                        '<div id="dadosSubstituidoInterno" class="alert alert-warning">' +
                          '<input type="hidden" id="hdnIdAtribuicaoSubstituido" value="' + data.ID + '">' +
                          '<input type="hidden" id="hdnNmAfastamento" value="' + data.NmAfastamento + '">' +
                           '<p><b>Docente: </b><input type="hidden" id="hdnNomeSubstituido" value="' + data.Nome + '">' + data.Nome + ' - <b>DI: </b>' + data.Di + '</p>' +
                           '<p><b style="color: red">Importante!</b> <b>O professor também será substituído nas abas 3 (horário do professor) e 4 (ATPC).</b>' +
                        '</div>'
                       )
                $('#dadosSubstituido').css("display", "block");
            }
            else {
                if (data != null && data.ID > 0)
                    $('#ModalAvisoSubstituicao').dialog({
                        title: 'Associação do Professor à Classe',
                        width: 600,
                        position: ['center', 0],
                        close: function () {
                            $('#cboTipoAtribuicaoAdicionar').val('');
                            $('#checkEmSubstituicao').prop('checked', false);
                            return;
                        }
                    }).empty().append('<div class="alert alert-warning" style="background-color: #FFDEAD;">A turma ' + $('#cboTurmaAdicionar :selected').text() + ' e Disciplina ' +
                                            $('#cboDisciplinaAdicionar :selected').text() + ' já foi atribuída para outro professor. Só é possível atribuir o ' +
                                            'docente para essa turma marcando a caixa de seleção <b>"Atribuição de Aula em Substituição"</b>,' +
                                            'dessa forma as aulas serão atribuidas como substituição da atribuição já existente</div>');
                return;
            }
        }
    });
}

function ValidarDisciplinaAtuacao() {
    var CdDisciplina = $('#cboDisciplinaAdicionar :selected').val();
    var cpf = String($('#txtCpf').val().replace('.', '').replace('.', '').replace('-', ''));
    var di = $('#cboDiAdicionar').val();
    if (CdDisciplina != "" && CdDisciplina > 0 && di > 0)
        $.ajax({
            type: 'POST',
            url: '../../AssociacaoProfessorClasse/ValidarDisciplinaAtuacao',
            async: false,
            data: {
                CdDisciplina: CdDisciplina,
                cpf: cpf,
                di: di
            },
            success: function (data) {
                if (!data) {
                    $('#ModalAvisoSubstituicao').dialog({
                        title: 'Associação do Professor à Classe',
                        width: 810,
                        position: ['center', 0],
                        close: function () {
                            $('#cboTipoAtribuicaoAdicionar').val("");
                            $('#checkEmSubstituicao').focus();
                        }
                    }).empty().append('<div class="alert alert-warning" style="background-color: #FFDEAD;">Disciplina selecionada não é do mesmo campo de atuação do docente!</div>');
                    $("#cboDisciplinaAdicionar").val("");
                    return;
                }
                else
                    return true;
            }
        });
}

function fct_ValidarSubTurma(quantidade) {
    if (quantidade > 0) {
        $("#sub_turma").show();
    } else {
        $("#sub_turma").hide();
    }
}

var EditarAssociacao = function (cdAtribuicao, anoLetivo) {
    var params = {
        idAtribuicao: cdAtribuicao,
        anoLetivo: anoLetivo,
        cdRedeEnsino: $('#formCadastroAssociocao #filtroaba2-redeEnsino').val()
    };

    $.ajax({
        cache: false,
        url: '../../AssociacaoProfessorClasse/EditarProfessorAssociacao',
        type: 'POST',
        datatype: 'html',
        data: params,
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            if (data.length > 0) {
                $('#divEditarAssoAtpc').empty().html(data);
                $('#divEditarAssoAtpc').dialog({
                    width: 910,
                    position: ['center', 0]
                });

                CloseWindowAssoAtpc();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop();
        }
    });
}

function CloseWindowAssoAtpc() {
    $('#formEditarAssociacao #btnEditarAssociacao').click(function () {

        var form = $('#formEditarAssociacao');

        if (form.valid()) {
            form.submit();
            $('#divEditarAssoAtpc').empty();
            $('#divEditarAssoAtpc').dialog('close');
            $('#visualizarAssoAtpcProf').empty();
            $('#visualizarAssoAtpcProf').dialog('close');
            btnPesquisarPesquisaAssociacaoAtpcProf.click();
            //visualizarAssoAtpc.click();
        }
    });
}

function ParseToDate(data) {
    var parts = data.split("/");
    var dataFormatada = new Date(parts[2], parts[1] - 1, parts[0]);

    return dataFormatada;
}
