$(document).ready(function () {

    Mensagem.IgnorarMensagensAutomaticas = true;
    AplicarMascaras();
    utils.aplicarFiltros();

    $("#formPesquisar").validate({
        rules: {
            'AnoLetivo': {
                required: true, number: true
            },
            codigoDiretoria: {
                required: true
            },
            codigoEscola: {
                required: true
            },
            codigoTipoEnsino: {
                required: true
            },
            'DataAula': {
                required: true
            }
        },
        submitHandler: function (form) {
            var filtros = {
                AnoLetivo: $("#anoLetivo").val(),
                CodigoDiretoria: $("#codigoDiretoria").val(),
                CodigoEscola: $("#codigoEscola").val(),
                CodigoTipoEnsino: $("#codigoTipoEnsino").val(),
                'Turma.CD_TURMA': $("#codigoTurma").val(),
                DataAula: $("#dataAula").val()
            };

            if (filtros.AnoLetivo == "" || filtros.AnoLetivo == undefined) {
                $("#anoLetivo").addClass("error");
                return;
            }

            filtros.CodigoDiretoria = filtros.CodigoDiretoria == "" || filtros.CodigoDiretoria == undefined ? 0 : filtros.CodigoDiretoria;
            filtros.CodigoEscola = filtros.CodigoEscola == "" || filtros.CodigoEscola == undefined ? 0 : filtros.CodigoEscola;
            filtros.CodigoTurno = filtros.CodigoTurno == "" || filtros.CodigoTurno == undefined ? 0 : filtros.CodigoTurno;

            $.ajax({
                url: "/EventualBo/PesquisarAulas",
                type: "POST",
                async: true,
                data: filtros,
                success: function (data, textStatus, xhr) {
                    if (data.TipoException == "alerta") {
                        $("#resultadoPesquisa").empty();
                        Mensagem.Alert({
                            titulo: data.Title,
                            mensagem: data.Message,
                            tipo: data.TipoException, // aviso, erro, sucesso, alerta
                            botao: "Fechar"
                        });
                    } else {
                        $("#resultadoPesquisa").html(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#resultadoPesquisa").empty();
                    utils.mensagemAlert(
                        jqXHR.responseJSON.Message,
                        jqXHR.responseJSON.Title,
                        jqXHR.responseJSON.TipoException
                    );
                }
            });
            return;
        }
    });
})
controller = {
    obterHorarioAulaTurma: function (anoLetivo, codigoAula, dataAula) {
        var paramns = {
            AnoLetivo: anoLetivo,
            CodigoAula: codigoAula,
            DataAula: dataAula
        }
        $.ajax({
            url: "/EventualBo/ObterHorarioAulaProfessor",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(paramns),
            success: function (data, textStatus, xhr) {
                $("<div id='modalEventualBo'> " + data + "</div>").dialog({
                    title: "Cadastro Eventual",
                    focusElement: "cpfEventual",
                    width: "600px",
                    destroy: true
                });
                if ($("#hdnFreqNaoPermitida").val() !== undefined && $("#hdnFreqNaoPermitida").val() !== "") {
                    utils.mensagemAlert($("#hdnFreqNaoPermitida").val());
                }
                if ($("#hdnPermitirModificar").val() !== undefined && $("#hdnPermitirModificar").val() !== "") {
                    utils.mensagemAlert($("#hdnPermitirModificar").val());
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                utils.mensagemAlert(
                          jqXHR.responseJSON.Message,
                          jqXHR.responseJSON.Title,
                          jqXHR.responseJSON.TipoException
                      );
            }
        });
    },
    obterHorarioAulaTurmaNaoAtribuida: function (anoLetivo, codigoTurma, codigoHorarioAula, dataAula, horaAulaInicio) {
        var paramns = {
            AnoLetivo: anoLetivo,
            CodigoHorarioAula: codigoHorarioAula,
            DataAula: dataAula,
            HoraAulaInicio: horaAulaInicio,
            'Turma.CD_TURMA': codigoTurma
        }
        $.ajax({
            url: "/EventualBo/ObterHorarioAulaNaoAtribuida",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(paramns),
            success: function (data, textStatus, xhr) {
                $("<div id='modalEventualBo'> " + data + "</div>").dialog({
                    title: "Cadastro Eventual",
                    focusElement: "cpfEventual",
                    width: "600px",
                    destroy: true
                });
                if ($("#hdnFreqNaoPermitida").val() !== undefined && $("#hdnFreqNaoPermitida").val() !== "") {
                    utils.mensagemAlert($("#hdnFreqNaoPermitida").val());
                }
                if ($("#hdnPermitirModificar").val() !== undefined && $("#hdnPermitirModificar").val() !== "") {
                    utils.mensagemAlert($("#hdnPermitirModificar").val());
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                utils.mensagemAlert(
                          jqXHR.responseJSON.Message,
                          jqXHR.responseJSON.Title,
                          jqXHR.responseJSON.TipoException
                      );
            }
        });
    },

    exluirAulaEventual: function (codigo) {
        var span = $("<span></span>");
        $(span).html("Deseja realmente excluir o professor eventual?");
        Mensagem.Alert({
            titulo: "Excluir BO",
            mensagem: $(span)[0],
            tipo: "Alerta",
            botoes: [
                {
                    botao: "Confirmar",
                    callback: function () {
                        parametrosController = {
                            codigo: parseInt(codigo)
                        }
                        $.ajax({
                            url: "/EventualBo/ExcluirAulaEventual",
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(parametrosController),
                            success: function (data, textStatus, xhr) {
                                if (data.TipoException == "sucesso") {
                                    $("#modalEventualBo").dialog("destroy");
                                    var spanEventual = $("#linkNomeEventual[codigo='" + codigo + "']");
                                    var spanDisciplina = $("#linkNomeDisciplina[codigo='" + codigo + "']");
                                    var img = $("#imgExcluirAula[codigo='" + codigo + "']");


                                    if (spanEventual.length > 0) {
                                        spanEventual.remove();
                                        if (img.hasClass("imgExcluirSemProfessor"))
                                            spanDisciplina.remove();
                                        img.remove();
                                    }
                                    else {
                                        $("#formPesquisar").submit();
                                    }
                                    fecharMensagemDialogPesquisa = true;
                                }
                                utils.mensagemAlert(
                                    data.Message,
                                    data.Title,
                                    data.TipoException
                                );
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                utils.mensagemAlert(
                                          jqXHR.responseJSON.Message,
                                          jqXHR.responseJSON.Title,
                                          jqXHR.responseJSON.TipoException
                                      );
                            }
                        })
                    },
                },
                {
                    botao: "Cancelar"
                }
            ]
        });
    },
    listarEscola: function () {
        select = $("#formPesquisar #codigoEscola");
        select.empty();
        var codigoDiretoria = $("#codigoDiretoria option:selected").val() == "0" || $("#codigoDiretoria option:selected").val() == "" || $("#codigoDiretoria option:selected").val() == undefined ? 0 : parseInt($("#codigoDiretoria option:selected").val());

        var paramns = {
            id: codigoDiretoria,
            codRedeEnsino: 1,
            tipoIdentEscExcl: [53, 3]
        }
        if (codigoDiretoria != "") {
            $.ajax({
                url: '/Escola/CarregarListaEscolasPorTipo',
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(paramns),
                success: function (data) {

                    if (data != null) {
                        if (data.length == 0 || data.length > 1) {
                            select.append($('<option/>', {
                                value: "",
                                text: "Selecione..."
                            }));
                        }
                        $.each(data, function (index, itemData) {
                            select.append($('<option/>', {
                                value: itemData.value,
                                text: itemData.text
                            }));
                        });
                        select.trigger("change");
                    }
                    else {
                        select.append($('<option/>', {
                            value: "",
                            text: ""
                        }));
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    utils.mensagemAlert(
                        jqXHR.responseJSON.Message,
                        jqXHR.responseJSON.Title,
                        jqXHR.responseJSON.TipoException
                    );
                }
            });
        }
        else {
            select.trigger("change");
        }
    },

    listarTipoEnsino: function () {
        select = $("#formPesquisar #codigoTipoEnsino");
        select.empty();
        var codigoEscola = $("#codigoEscola option:selected").val() == "0" || $("#codigoEscola option:selected").val() == "" || $("#codigoEscola option:selected").val() == undefined ? 0 : parseInt($("#codigoEscola option:selected").val());
        var anoLetivo = $("#anoLetivo").val() == "0" || $("#anoLetivo").val() == "" || $("#anoLetivo").val() == undefined ? 0 : parseInt($("#anoLetivo").val());

        var paramns = {
            codEscola: codigoEscola,
            anoLetivo: anoLetivo
        }
        if (codigoEscola != "") {
            $.ajax({
                url: '/TipoEnsino/ListaTipoEnsinoPorEscola',
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(paramns),
                success: function (data) {
                    if (data != null) {
                        if (data.length == 0 || data.length > 1) {
                            select.append($('<option/>', {
                                value: "",
                                text: "Selecione..."
                            }));
                        }
                        $.each(data, function (index, itemData) {
                            select.append($('<option/>', {
                                value: itemData.value,
                                text: itemData.text
                            }));
                        });
                        select.trigger("change");
                    }
                    else {
                        select.append($('<option/>', {
                            value: "",
                            text: ""
                        }));
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    utils.mensagemAlert(
                        jqXHR.responseJSON.Message,
                        jqXHR.responseJSON.Title,
                        jqXHR.responseJSON.TipoException
                    );
                }
            });
        } else {
            select.trigger("change");
        }
    },

    listarTurma: function () {
        select = $("#formPesquisar #codigoTurma");
        select.empty();

        var codigoEscola = $("#codigoEscola option:selected").val() == "0" || $("#codigoEscola option:selected").val() == "" || $("#codigoEscola option:selected").val() == undefined ? 0 : parseInt($("#codigoEscola option:selected").val());
        var codigoTipoEnsino = $("#codigoTipoEnsino option:selected").val() == "0" || $("#codigoTipoEnsino option:selected").val() == "" || $("#codigoTipoEnsino option:selected").val() == undefined ? 0 : parseInt($("#codigoTipoEnsino option:selected").val());
        var anoLetivo = $("#anoLetivo").val() == "0" || $("#anoLetivo").val() == "" || $("#anoLetivo").val() == undefined ? 0 : parseInt($("#anoLetivo").val());

        var paramns = {
            CodigoEscola: codigoEscola,
            CodigoTipoEnsino: codigoTipoEnsino,
            AnoLetivo: anoLetivo
        }
        if (codigoEscola != "" && codigoTipoEnsino != "") {
            $.ajax({
                url: '/Turma/CarregarListaTurmaPorTipoEnsino',
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(paramns),
                success: function (data) {
                    if (data != null) {
                        if (data.length == 0 || data.length > 1) {
                            select.append($('<option/>', {
                                value: "",
                                text: "TODOS"
                            }));
                        }
                        $.each(data, function (index, itemData) {
                            select.append($('<option/>', {
                                value: itemData.value,
                                text: itemData.text
                            }));
                        });
                        select.trigger("change");
                    }
                    else {
                        select.append($('<option/>', {
                            value: "",
                            text: ""
                        }));
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    utils.mensagemAlert(
                        jqXHR.responseJSON.Message,
                        jqXHR.responseJSON.Title,
                        jqXHR.responseJSON.TipoException
                    );
                }
            });
        }
    }
}

utils = {

    aplicarFiltros: function () {
        $("#codigoDiretoria").change(function () {
            controller.listarEscola()
        });
        $("#codigoEscola").change(function () { controller.listarTipoEnsino() });
        $("#codigoTipoEnsino").change(function () { controller.listarTurma() });
        if ($("#codigoDiretoria option").length == 2) {
            $("#codigoDiretoria option:selected").remove();
            $("#codigoDiretoria").trigger("change");
        }



    },

    mensagemAlert: function (msg, titulo, tipo, escondido) {
        Mensagem.Alert({
            mensagem: msg,
            titulo: titulo === undefined ? "Eventual" : titulo,
            tipo: tipo === undefined ? "Aviso" : tipo,
            escondido: escondido === undefined ? undefined : "Detalhes: \n" + escondido,
            botao: "Fechar"
        })
    },

}

function mostrarAjudaPesquisa() {
    Mensagem.Alert({
        titulo: "Ajuda",
        mensagem: $("<span>1&ordm; Informe os campos (Ano Letivo, Diretoria, Escola, Tipo Ensino e Data Aula)<br/> 2&ordm; Depois clique em 'Pesquisar' para ser poss&iacute;vel substituir o professor/ eventual</span>")[0],
        tipo: "aviso",
        botao: "Fechar"
    });
}