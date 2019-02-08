$(document).ready(function () {
    AplicarMascaras();
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#formCadastro").validate({
        rules: {
            codigoDiretoriaCadastro: {
                required: true
            },
            codigoDisciplinaCadastro: {
                required:true
            },
            comboDisciplinaCadastro: {
                required: true
            },
            codigoEscolaCadastro: {
                required: true
            },
            codigoTipoEnsinoCadastro: {
                required: true
            },
            codigoTurmaCadastro: {
                required: true
            },
            dataAula: {
                required: true
            },
            'HoraAulaInicio': {
                required: true
            },
            'HoraAulaFim': {
                required: true
            },
            'NomeDisciplina': {
                required: true
            },
            'CpfEventual': {
                required: true
            },
        },
        messages: {
            'HoraAulaInicio': {
                required: '*',
            },
            'HoraAulaFim': {
                required: '*',
            },
            'CpfEventual': {
                required: '*'
            }
        },
        submitHandler: function (form) {
            var data = $(form).serializeArray(); // convert form to array
            var nrCpf = $("#cpfEventual").val().replace(/\./g, '').replace(/\-/g, '');
            var nomeEventual = $("#nomeEventual").val();

            if (cpfEventual == "") {
                mensagemAlert("CPF obrigatório");
                return false;
            }
            if (nomeEventual == "") {
                mensagemAlert("Nome do eventual obrigatório. Verifique o CPF digitado");
                return false;
            }
            data.push({
                name: "CodigoDiretoria", value: $("#codigoDiretoriaCadastro").attr("data-codigo")
            });
            data.push({
                name: "CodigoEscola", value: $("#codigoEscolaCadastro").attr("data-codigo")
            });
            data.push({
                name: "Turma.CD_TURMA", value: $("#codigoTurmaCadastro").attr("data-codigo")
            });
            data.push({
                name: "Turma.NR_SERIE", value: $("#codigoTurmaCadastro").attr("data-serie")
            });
            data.push({
                name: "CodigoTipoEnsino", value: $("#codigoTipoEnsinoCadastro").attr("data-codigo")
            });
            data.push({
                name: "Cpf", value: nrCpf
            })
            if ($("#codigoDisciplinaCadastro").val() != undefined && $("#codigoDisciplinaCadastro").attr("data-codigo") != "") {
                data.push({
                    name: "Turma.Disciplina.CD_DISCIPLINA", value: $("#codigoDisciplinaCadastro").attr("data-codigo")
                });
                data.push({
                    name: "Turma.Disciplina.NOME_DISCIPLINA", value: $("#codigoDisciplinaCadastro").attr("data-nome")
                });
            }
            else {           
                data.push({
                    name: "Turma.Disciplina.CD_DISCIPLINA", value: $("#comboDisciplinaCadastro option:selected").val()
                });
                data.push({
                    name: "Turma.Disciplina.NOME_DISCIPLINA", value: $("#comboDisciplinaCadastro option:selected").text()
                });
            }
            data.push({
                name: "CpfProfessor", value: $("#professorCadastro").attr("data-cpf")
            })
            data.push({
                name: "NrDIProfessor", value: $("#professorCadastro").attr("data-di")
            })
            data.push({
                name: "Codigo", value: $("#nomeEventual").attr("data-codigo")
            })
            $.ajax({
                url: "/EventualBo/Salvar",
                type: "POST",
                data: $.param(data),
                success: function (data, textStatus, xhr) {
                    if (data.TipoException == "sucesso") {
                        $("#modalEventualBo").dialog("destroy");
                        var td = null;
                        if (data.retorno.CodigoAula > 0) {
                            td = $("#hiperLinkButton[codigo='" + data.retorno.CodigoAula + "']");
                        }
                        else {
                            td = $("#hiperLinkButton[data-codigo='" + data.retorno.CodigoHorarioAula + "'][data-hora='" + data.retorno.HoraInicio + "'][data-turma='" + data.retorno.CodigoTurma + "']");
                        }
                        var spanEventual = $(td).find("#linkNomeEventual");
                        var spanDisciplina = $(td).find("#linkNomeDisciplina");
                        var imgExcluir = $(td).find("#imgExcluirAula[codigo='" + data.retorno.Codigo + "']");
                        spanEventual.remove();
                        spanDisciplina.remove();
                        imgExcluir.remove();
                        td.find("#linkAulaEventual").append("<span id='linkNomeDisciplina' codigo='" + data.retorno.Codigo + "' style='font-size:8px;'> (" + data.retorno.NomeDisciplina + " ) </span>");
                        td.find("#linkAulaEventual").append("<span id='linkNomeEventual' codigo='" + data.retorno.Codigo + "' style='font-size:9px; color:crimson'> <b> Eventual: " + data.retorno.Nome + " </b> </span>");
                        if (data.retorno.CodigoAula > 0) {
                            td.append("<span id='imgExcluirAula'  codigo='" + data.retorno.Codigo + "' class='icone-tabela-excluir col-xs-1' style='float:right;' title='Excluir Eventual' </span>");
                        } else {
                            td.append("<span id='imgExcluirAula'  codigo='" + data.retorno.Codigo + "' class='icone-tabela-excluir col-xs-1 imgExcluirSemProfessor' style='float:right;' title='Excluir Eventual' </span>");
                        }

                        $(td.find("#imgExcluirAula")).bind('click', function () { controller.exluirAulaEventual(data.retorno.Codigo); });

                        fecharMensagemDialogPesquisa = true;
                    }
                    mensagemAlert(
                        data.Message,
                        data.Title,
                        data.TipoException
                    );
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlert(
                        jqXHR.responseJSON.Message,
                        jqXHR.responseJSON.Title,
                        jqXHR.responseJSON.TipoException
                    );
                }

            })
            return;
        }

    })

    $('#cpfEventual').autocomplete({

        source: function (request, response) {
            var nrCpf = $("#cpfEventual").val().replace(/\./g, '').replace(/\-/g, '');
            $('#nrDI').val('');
            $('#nomeEventual').val('');
            $('#btnSalvar').attr('disabled', 'disabled');
            $.ajax({
                url: '/EventualBo/PesquisarNome',
                dataType: 'json',
                global: false,
                cache: false,
                data: {
                    cpf: nrCpf
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        if (item != "") {
                            $('#nomeEventual').val(item);
                            $('#btnSalvar').removeAttr("disabled");
                        }
                        else {
                            mensagemAlert("Eventual não encontrado para este CPF. Verifique se existe no sistema 'Dados Pessoais'");
                        }
                        return;
                    }));
                }
            });
        },
        select: function (event, ui) {
            //$('#nomeEventual').val(ui.item.label);
            //$("#cpfEventual").val(ui.item.value);
        },
        minLength: 14
    });
});
function mensagemAlert(msg, titulo, tipo, escondido) {
    Mensagem.Alert({
        mensagem: msg,
        titulo: titulo === undefined ? "Eventual" : titulo,
        tipo: tipo === undefined ? "alerta" : tipo,
        escondido: escondido === undefined ? undefined : "Detalhes: \n" + escondido,
        botao: "Fechar"
    });
}
function mostrarAjudaCadastro() {
    Mensagem.Alert({
        titulo: "Ajuda",
        mensagem: $("<span>1º Informe o CPF para exibir o nome no campo 'Eventual'</span>")[0],
        tipo: "aviso",
        botao: "Fechar"
    });
}
