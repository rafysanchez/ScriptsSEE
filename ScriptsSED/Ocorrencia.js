var textoAnterior = "";

$().ready(function () {

    //txtAnoLetivo aceitando apenas números
    $(document).ready(function () {
        $("#txtAnoLetivo").keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }
        });
    });

    // valida o formulário de cadastro
    $(".formCadastro").validate({
        rules: {
            CodigoDiretoria: {
                required: true,
            },
            CodigoEscola: {
                required: true,
            },
            DataOcorrencia: {
                required: true,
                dataValida: true
            },
            CodigoTipoOcorrencia: {
                required: true
            },
            DescricaoOcorrencia: {
                required: true
            },
            CodigoPerfilLimite: {
                required: true,
            }
        },
        messages: {
            CodigoDiretoria: {
                required: "Obrigatório",
            },
            CodigoEscola: {
                required: "Obrigatório",
            },
            DataOcorrencia: {
                required: "Obrigatório",
                dataValida: "Data inválida"
            },
            CodigoTipoOcorrencia: {
                required: "Obrigatório"
            },
            DescricaoOcorrencia: {
                required: "Obrigatório"
            },
            CodigoPerfilLimite: {
                required: "Obrigatório"
            },
        }
    });

    $("#CodigoDiretoria").change(function (e, n) {
        $("#CodigoEscola").trigger("change");
    });

    $("#CodigoEscola").change(function () {
        BloquarCamposCadastroAluno(this);
    });

    $("#CodigoDiretoriaFiltro").change(function (e, n) {
        $("#CodigoEscolaFiltro").trigger("change");
    });

    $("#CodigoEscolaFiltro").change(function () {
        BloquarCamposCadastroAluno(this);
    });

    $("#btnCadastrarOcorrencia").click(function (e) {
        e.preventDefault();

        if ($(".formCadastro").valid() == false) {
            return;
        }

        if ($("#tabelaDados tbody tr").length == undefined) {
            Mensagem.Alert({
                //titulo: "Ocorrência",
                mensagem: "Nenhum aluno informado.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            e.preventDefault();

            return;
        }

        if ($("#tabelaDados").DataTable().rows().count() == 0) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Nenhum aluno informado.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            e.preventDefault();
            return;
        }

        CadastrarOcorrencia();
    });

    AutoCompeltarAluno();

    /* ===========================================================================
    ==============================================================================
    ============================================================================ */

    // Atribui a div a função de modal.
    //$(" #dialogDetalhe").dialog({
    //    autoOpen: false,
    //    title: 'Ocorrência',
    //    position: 'top',
    //    height: 700,
    //    width: 820,
    //    resizable: false,
    //    modal: true,
    //    dragable: false,
    //    show: {
    //        effect: "blind",
    //        duration: 200
    //    },
    //    beforeClose: function (event, ui) {
    //        CodigoPerfil = $('#hdfCodigoPerfil').val()
    //        if ($('#CodigoEscola').val() != undefined) {
    //            PesquisarOcorrencias();
    //        }
    //    }
    //});
});

// Função genérica para tratar valores numéricos.
var TratarValorNumerico = function (valor) {
    if (valor == undefined) {
        return 0;
    }

    if (valor == "") {
        return 0;
    }

    if (isNaN(valor)) {
        return 0;
    }

    return parseInt(valor);
}

var BloquarCamposCadastroAluno = function (obj) {

    if ($(obj).val() == "") {
        $(".camposBloqueioEscola").each(function () {
            $(this).attr("disabled", "disabled");
        });

        $(".camposBloqueioDiretoria").each(function () {
            $(this).removeAttr("disabled", "disabled");
        });

        $(".avisoDiretoria").attr("hidden", "hidden");
        $(".avisoEscola").removeAttr("hidden", "hidden");

        return;
    }

    if (parseInt($(obj).val()) <= 0) {
        $(".camposBloqueioEscola").each(function () {
            $(this).attr("disabled", "disabled");
        });

        $(".camposBloqueioDiretoria").each(function () {
            $(this).removeAttr("disabled", "disabled");
        });

        $(".avisoDiretoria").attr("hidden", "hidden");
        $(".avisoEscola").removeAttr("hidden", "hidden");

        return;
    }

    var itens = $("#tabelaDados tbody tr");

    if (itens.length > 0) {

        $(".camposBloqueioEscola").each(function () {
            $(this).removeAttr("disabled", "disabled");
        });

        $(".camposBloqueioDiretoria").each(function () {
            $(this).attr("disabled", "disabled");
        });

        $(".avisoDiretoria").removeAttr("hidden", "hidden");
        $(".avisoEscola").attr("hidden", "hidden");
        return;
    }

    $(".camposBloqueioEscola").each(function () {
        $(this).removeAttr("disabled", "disabled");
    });

    $(".camposBloqueioDiretoria").each(function () {
        $(this).removeAttr("disabled", "disabled");
    });

    $(".avisoDiretoria").attr("hidden", "hidden");
    $(".avisoEscola").attr("hidden", "hidden");
}

var AutoCompeltarAluno = function () {
    $("#btnAdicionarAluno").click(function () {
        AdicionarAluno();
    });

    $("#txtNomeAlunoFiltro").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Ocorrencia/ConsultarAlunosAutoCompletar",
                dataType: "json",
                global: false,
                cache: true,
                async: true,
                data: {
                    dataOcorrencia: $("#DataOcorrencia").val(),
                    codigoEscola: parseInt($("#CodigoEscolaFiltro").val() == undefined ? $("#CodigoEscola").val() : $("#CodigoEscolaFiltro").val()),
                    nomeAluno: $("#txtNomeAlunoFiltro").val(),
                    nrRA: parseInt($("#txtRaAlunoFiltro").val()),
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.NomeAluno.trim(), value: item.NomeAluno.trim(), id: item.CodigoAluno, nrRA: item.nrRA, nrDigRa: item.nrDigRa, sgUfRa: item.sgUfRa }
                    }));
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Mensagem.Alert({
                        titulo: "Erro",
                        mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                        tipo: "Erro",
                        botao: "Fechar"
                    });
                }
            });
        },
        minLength: 4,
        select: function (event, ui) {
            $("input[name='txtNomeAlunoFiltro']").val(ui.item.label);
            $("input[name='hdnCodigoAluno']").val(ui.item.id);
            $("input[name='txtRaAlunoFiltro']").val(ui.item.nrRA);
            $("input[name='txtDigRaFiltro']").val(ui.item.nrDigRa);
            $("input[name='txtUfRaFiltro']").val(ui.item.sgUfRa);

            $.ajax({
                url: "/Ocorrencia/ConsultarTurmaAluno",
                dataType: "json",
                global: false,
                cache: true,
                async: true,
                data: {
                    codigoEscola: parseInt($("#CodigoEscolaFiltro").val() == undefined ? $("#CodigoEscola").val() : $("#CodigoEscolaFiltro").val()),
                    codigoAluno: parseInt(ui.item.id),
                },
                success: function (data) {
                    $("#ddlTurmaAluno").html("");

                    if (data.length > 1) {
                        $("#ddlTurmaAluno").append("<option value=''>Selecione...</option>");
                    }

                    for (var i = 0; i < data.length; i++) {
                        $("#ddlTurmaAluno").append("<option value='" + data[i].CD_TURMA + "'>" + data[i].DS_TURMA + "</option>");
                    }
                },
            });
        },
        search: function (event, ui) {
            $("input[name='hdnCodigoAluno']").val("");
            $("input[name='txtRaAlunoFiltro']").val("");
            $("input[name='txtDigRaFiltro']").val("");
            $("input[name='txtUfRaFiltro']").val("");
            $("#ddlTurmaAluno").html("");
        }
    });

    $("#txtRaAlunoFiltro").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Ocorrencia/ConsultarAlunosAutoCompletar",
                dataType: "json",
                global: false,
                cache: true,
                async: true,
                data: {
                    dataOcorrencia: $("#DataOcorrencia").val(),
                    codigoEscola: parseInt($("#CodigoEscolaFiltro").val() == undefined ? $("#CodigoEscola").val() : $("#CodigoEscolaFiltro").val()),
                    nomeAluno: $("#txtNomeAlunoFiltro").val(),
                    nrRA: parseInt($("#txtRaAlunoFiltro").val()),
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.nrRA, value: item.nrRA, id: item.CodigoAluno, nomeAluno: item.NomeAluno, nrDigRa: item.nrDigRa, sgUfRa: item.sgUfRa }
                    }));
                }
            });
        },
        minLength: 4,
        select: function (event, ui) {
            $("input[name='txtNomeAlunoFiltro']").val(ui.item.nomeAluno);
            $("input[name='hdnCodigoAluno']").val(ui.item.id);
            $("input[name='txtRaAlunoFiltro']").val(ui.item.label);
            $("input[name='txtDigRaFiltro']").val(ui.item.nrDigRa);
            $("input[name='txtUfRaFiltro']").val(ui.item.sgUfRa);

            $.ajax({
                url: "/Ocorrencia/ConsultarTurmaAluno",
                dataType: "json",
                global: false,
                cache: true,
                async: true,
                data: {
                    codigoEscola: parseInt($("#CodigoEscolaFiltro").val() == undefined ? $("#CodigoEscola").val() : $("#CodigoEscolaFiltro").val()),
                    codigoAluno: parseInt(ui.item.id),
                },
                success: function (data) {
                    $("#ddlTurmaAluno").html("");

                    if (data.length > 1) {
                        $("#ddlTurmaAluno").append("<option value=''>Selecione...</option>");
                    }

                    for (var i = 0; i < data.length; i++) {
                        $("#ddlTurmaAluno").append("<option value='" + data[i].CD_TURMA + "'>" + data[i].DS_TURMA + "</option>");
                    }
                },
            });
        },
        search: function (event, ui) {
            $("input[name='hdnCodigoAluno']").val("");
            $("input[name='txtNomeAlunoFiltro']").val("");
            $("input[name='txtDigRaFiltro']").val("");
            $("input[name='txtUfRaFiltro']").val("");
        }
    });
}

var AdicionarAluno = function () {

    if ($("#hdnCodigoAluno").val() == "" || $("#ddlTurmaAluno").val() == null || $("#ddlTurmaAluno").val() == "") {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Informe o Aluno e Turma.",
            tipo: "Aviso",
            botao: "Fechar"
        });
        return;
    }

    if (TratarValorNumerico($("#hdnCodigoAluno").val()) <= 0) {
        return;
    }

    var itens = $("#tabelaDados tbody tr");

    var totalElementos = itens.length;

    if (itens.length > 0) {
        totalElementos++;
    }

    var array = new Array(totalElementos);

    existe = false;

    var codigoNovoAluno = $("#hdnCodigoAluno").val();
    $(itens).each(function (i) {
        codigoAluno = $(this).find("input[name='hdfCodigoAluno']").val();
        codigoTurma = $(this).find("input[name='hdfCodigoTurma']").val();

        if (codigoAluno == codigoNovoAluno && !existe) {
            existe = true;
        }

        array[i] = codigoAluno + "|" + codigoTurma;
    });

    if (!existe) {
        array[totalElementos] = $("#hdnCodigoAluno").val() + "|" + $("#ddlTurmaAluno").val();
    }
    else {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Aluno já informado.",
            tipo: "Aviso",
            botao: "Fechar"
        });
    }

    setTimeout(function () {
        $.ajax({
            cache: false,
            url: "/Ocorrencia/AdicionarAlunoParcial",
            type: "POST",
            datatype: "html",
            data: { dadosAlunoTurma: array },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $(".alunosSelecionados").html(data);
                $("#tabelaDados").sedDataTable({ embutida: true });
                BloquarCamposCadastroAluno();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            }
        });

        $("#txtNomeAlunoFiltro").val("");
        $("#txtRaAlunoFiltro").val("");
        $("#txtDigRaFiltro").val("");
        $("#txtUfRaFiltro").val("");
        $("#ddlTurmaAluno").html("");
    }, 1500);
}

var ExcluirAluno = function (codigoAluno) {

    codigoAluno = codigoAluno.toString();

    var itens = $("#tabelaDados tbody tr");

    var totalElementos = itens.length;

    var array = new Array(totalElementos);

    $(itens).each(function (i) {
        codigoAlunoGrid = $(this).find("input[name='hdfCodigoAluno']").val();
        codigoTurmaGrid = $(this).find("input[name='hdfCodigoTurma']").val();

        if (codigoAlunoGrid != codigoAluno) {
            array[i] = codigoAlunoGrid + "|" + codigoTurmaGrid;
        }
    });

    $.ajax({
        cache: false,
        url: "/Ocorrencia/AdicionarAlunoParcial",
        type: "POST",
        datatype: "html",
        data: { dadosAlunoTurma: array },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $(".alunosSelecionados").html(data);
            $("#tabelaDados").sedDataTable({ embutida: true });
            BloquarCamposCadastroAluno();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}

var CadastrarOcorrencia = function () {
    var itens = $("#tabelaDados tbody tr");

    var array = new Array(itens.length);

    $(itens).each(function (i) {
        codigoAlunoGrid = $(this).find("input[name='hdfCodigoAluno']").val();
        codigoTurmaGrid = $(this).find("input[name='hdfCodigoTurma']").val();

        array[i] = codigoAlunoGrid + "|" + codigoTurmaGrid;
    });

    var codigoEscolaSelecionado = 0;

    if ($("#CodigoEscola").val() != undefined) {
        codigoEscolaSelecionado = $("#CodigoEscola").val();
    } else {
        codigoEscolaSelecionado = $("#CodigoEscolaFiltro").val();
    }

    $.ajax({
        cache: false,
        url: "/Ocorrencia/InserirOcorrencia",
        type: "POST",
        datatype: "json",
        data: {
            codigoEscola: TratarValorNumerico(codigoEscolaSelecionado),
            cpfProfessor: $("#CpfProfessor").val(),
            dataOcorrencia: $("#DataOcorrencia").val(),
            codigoTipoOcorrencia: TratarValorNumerico($("#CodigoTipoOcorrencia").val()),
            descricaoOcorrencia: $("#DescricaoOcorrencia").val(),
            codigoAbrangencia: TratarValorNumerico($("#CodigoPerfilLimite").val()),
            listaAluno: array,
        },
        traditional: true,
        success: function () {
            window.location.href = "/Ocorrencia/Cadastro";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}

var DetalharOcorrencia = function (codigoOcorrencia) {
    $.ajax({
        async: false,
        cache: false,
        url: "/Ocorrencia/Detalhe",
        type: "POST",
        datatype: "html",
        data: {
            id: parseInt(codigoOcorrencia),
        },
        success: function (data, textStatus, jqXHR) {
            $("#dialogDetalhe").html(data);
            $("#tabelaDados").sedDataTable({embutida: true});
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}

var Excluir = function () {
    var CodigoOcorrencia = $("#CodigoOcorrencia").val();

    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Deseja realmente excluir a Ocorrência?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        type: "POST",
                        dataType: "HTML",
                        async: true,
                        data: ({
                            codigoOcorrencia: TratarValorNumerico(CodigoOcorrencia),
                        }),
                        url: "/Ocorrencia/Excluir",
                        success: function () {
                            $(this).dialog("destroy");
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Mensagem.CarregarMensagens("Fechar");
                        }
                    });
                }
            },
            {
                botao: "Não",
                callback: function () {
                    $.unblockUI();
                }
            }
        ]
    });
}

var Editar = function (codigoOcorrencia) {
    $.ajax({
        async: false,
        cache: false,
        url: "/Ocorrencia/Editar",
        type: "POST",
        datatype: "html",
        data: {
            id: parseInt(codigoOcorrencia),
        },
        success: function (data, textStatus, jqXHR) {
            //$("#dialogDetalhe").html(data);
            $("<div id='dialogEditar'>" + data + "</div>").dialog({
                title: "Edição de Ocorrência",
            });

            $("#CpfProfessorEdt").val($("#hdfCpfProfessor").val());
            $("#CodigoTipoOcorrencia").val($("#hdfTipoOcorrencia").val());
            $("#CodigoPerfilLimite").val($("#hdfPerfil").val());
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.Alert({
                titulo: "Erro",
                mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                tipo: "Erro",
                botao: "Fechar"
            });
        },
        complete: function (jqXHR, textStatus) {
            $("#tabelaDados").sedDataTable({embutida: true});

            AutoCompeltarAluno();

            // valida o formulário de cadastro
            $(".formEdicao").validate({
                rules: {
                    DataOcorrencia: {
                        required: true,
                        dataValida: true
                    },
                    CodigoTipoOcorrencia: {
                        required: true
                    },
                    DescricaoOcorrencia: {
                        required: true
                    },
                    CodigoPerfilLimite: {
                        required: true,
                    }
                },
                messages: {
                    DataOcorrencia: {
                        required: "Obrigatório",
                        dataValida: "Data inválida"
                    },
                    CodigoTipoOcorrencia: {
                        required: "Obrigatório"
                    },
                    DescricaoOcorrencia: {
                        required: "Obrigatório"
                    },
                    CodigoPerfilLimite: {
                        required: "Obrigatório"
                    },
                }
            });

            $("#btnEditarOcorrencia").click(function (e) {
                e.preventDefault();

                if ($(".formEdicao").valid() == false) {
                    return;
                }

                if ($("#tabelaDados").DataTable().rows().count() <= 0) {
                    Mensagem.Alert({
                        titulo: "Aluno",
                        mensagem: "Nenhum aluno informado.",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });

                    return;
                }

                EditarOcorrencia();
            });
        },
    });
}

var EditarOcorrencia = function () {

    var CodigoOcorrencia = $("#CodigoOcorrencia").val();
    var itens = $("#tabelaDados tbody tr");
    var array = new Array(itens.length);
    $(itens).each(function (i) {
        codigoAlunoGrid = $(this).find("input[name='hdfCodigoAluno']").val();
        codigoTurmaGrid = $(this).find("input[name='hdfCodigoTurma']").val();

        if (codigoAlunoGrid != undefined && codigoTurmaGrid != undefined) {
            array[i] = codigoAlunoGrid + "|" + codigoTurmaGrid;
        };
    });

    $.ajax({
        cache: false,
        url: "/Ocorrencia/EditarOcorrencia",
        type: "POST",
        datatype: "json",
        data: {
            codigoOcorrencia: TratarValorNumerico(CodigoOcorrencia),
            cpfProfessor: $("#CpfProfessorEdt").val(),
            codigoTipoOcorrencia: TratarValorNumerico($("#CodigoTipoOcorrencia").val()),
            descricaoOcorrencia: $("#DescricaoOcorrencia").val(),
            codigoAbrangencia: TratarValorNumerico($("#CodigoPerfilLimite").val()),
            listaAluno: array,
        },
        traditional: true,
        success: function () {
            DetalharOcorrencia(TratarValorNumerico(CodigoOcorrencia));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
};

var PesquisarOcorrencias = function () {

    var anoLetivo = TratarValorNumerico($("#txtAnoLetivo").val());
    var codigoDiretoria = TratarValorNumerico($("#CodigoDiretoria").val());
    var codigoEscola = TratarValorNumerico($("#CodigoEscola").val());
    var codigoTipoEnsino = TratarValorNumerico($("#CodigoTipoEnsino").val());
    var codigoTurma = TratarValorNumerico($("#CodigoTurma").val());
    var cpf = $("#CpfProfessor").val();
    var nomeAluno = $("#txtNomeAluno").val();
    var ra = $("#txtRaAluno").val();
    var digRa = $("#txtDigRa").val();
    var ufRa = $("#txtUfRa").val();

    if ((nomeAluno == "" && (ra == "" || ufRa == "")) || anoLetivo <= 0) {
        var msg = "Preencha um dos filtros obrigatórios.";
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: msg,
            tipo: "Aviso",
            botao: "Fechar"
        });
    } else {
        CarregarPesquisaOcorrencias(anoLetivo, codigoDiretoria, codigoEscola, codigoTipoEnsino, codigoTurma, cpf, nomeAluno, ra, digRa, ufRa);
    }
};

var CarregarPesquisaOcorrencias = function (anoLetivo, codigoDiretoria, codigoEscola, codigoTipoEnsino, codigoTurma, cpf, nomeAluno, ra, digRa, ufRa) {
    $.ajax({
        cache: false,
        url: "/Ocorrencia/ConsultaOcorrenciaParcial",
        type: "POST",
        datatype: "html",
        data: {
            anoLetivo: parseInt(anoLetivo),
            codigoDiretoria: parseInt(codigoDiretoria),
            codigoEscola: parseInt(codigoEscola),
            codigoTipoEnsino: parseInt(codigoTipoEnsino),
            codigoTurma: parseInt(codigoTurma),
            cpf: cpf,
            nomeAluno: nomeAluno,
            ra: ra,
            digRa: digRa,
            ufRa: ufRa,
        },
        success: function (data, textStatus, jqXHR) {
            $("#dadosOcorrencias").html(data);

            $("#tabelaDadosAlunos").sedDataTable({
                nomeExportacao: "Lista de Ocorrências",
                columnDefs: [{ targets: [8], orderable: false },]
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
};

function acaoGrid(codigoOcorrencia) {
    $.ajax({
        async: false,
        cache: false,
        url: "/Ocorrencia/Detalhe",
        type: "POST",
        datatype: "html",
        data: {
            id: parseInt(codigoOcorrencia),
        },
        success: function (data, textStatus, jqXHR) {
            //$("#dialogDetalhe").html(data);

            $("<div id='dialogDetalhe'>" + data + "</div>").dialog({
                title: "Consulta de Ocorrência",
                buttons: {
                    "Voltar": function () {
                        $(this).dialog("close");
                    }
                },
                beforeClose: function (event, ui) {
                    CodigoPerfil = $("#hdfCodigoPerfil").val()
                    if ($("#CodigoEscola").val() != undefined) {
                        PesquisarOcorrencias();
                    }
                }
            });
            //$("#dialogDetalhe").dialog("open");
            $("#tabelaDados").sedDataTable({
                nomeExportacao: "Lista Alunos",
                embutida: true
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}

var AtualizarInformacaoAluno = function () {

    AnoLetivo = $("#txtAnoLetivo").val();

    $.ajax({
        cache: false,
        url: "/Ocorrencia/AtualizarInformacaoAluno",
        type: "POST",
        datatype: "html",
        data: {
            anoLetivo: parseInt(AnoLetivo),
        },
        success: function (data, textStatus, jqXHR) {
            $("#dadosTurma").html(data);
            $("#tabelaDadosAlunos").sedDataTable();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}


var AutoCompletarEscolaPorAnoLetivo = function (txtBoxAnoLetivo, ddlEscola) {
    $(txtBoxAnoLetivo).focus(function () {
        textoAnterior = $(this).val();
    })

    $(txtBoxAnoLetivo).blur(function () {
        if ($(this).val() == textoAnterior) {
            return;
        }

        ConsultaEscolaPorAnoLetivo(txtBoxAnoLetivo, ddlEscola)
    });
}


function ConsultaEscolaPorAnoLetivo(txtBoxAnoLetivo, ddlEscola) {
    $(ddlEscola).html("");
    $(ddlEscola).append("<option value=''>Selecione...</option>");

    // objeto nao encontrado.
    if ($(txtBoxAnoLetivo).val() == undefined) {
        return;
    }

    // O valor não possúi o tamanho mínimo.
    if ($(txtBoxAnoLetivo).val().length < 4) {
        return;
    }

    var AnoLetivo = TratarValorNumerico($(txtBoxAnoLetivo).val());

    $.ajax({
        cache: false,
        url: "/Ocorrencia/ConsultarEscolaPorAnoLetivo",
        type: "POST",
        datatype: "JSON",
        data: {
            anoLetivo: parseInt(AnoLetivo),
        },
        success: function (data, textStatus, jqXHR) {
            for (var i = 0; i < data.length; i++) {
                $(ddlEscola).append("<option value='" + data[i].CD_ESCOLA + "'>" + data[i].NOME_ESCOLA + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}


function AbrirOcorrenciaAluno(anoLetivo, codigoAluno, codigoTurma) {
    $.ajax({
        url: "/Ocorrencia/OcorrenciaAluno",
        data: {
            anoLetivo: anoLetivo,
            codigoAluno: codigoAluno,
            codigoTurma: codigoTurma
        },
        success: function (data) {
            $("#index").hide();
            $("#ocorrenciaAluno").empty().html(data);
            $("#dadosOcorrencia #tabelaDadosAlunos").sedDataTable();
        }
    });
}