//
//Formulário de cadastro de atividade para solicitação
//
// parametro "content" = objeto html que conterá a lista
// parametro "codigoSolicitacao" = Código da Solicitação
// parametro "codigoPasso" = Código do passo da solicitação
// retorna html do formulário
function InserirAtividadeSolicitacao(content, codigoSolicitacao, codigoPasso) {
    $.ajax({
        type: 'GET',
        async: true,
        cache: false,
        url: '/SolicitacaoAtividade/InserirAtividadeSolicitacao',
        success: function (data, textStatus, jqXHR) {
            $(content).empty().html(data);

            $('#inserir #Aluno_sgUfRa').css("text-transform", "uppercase");
            $('#inserir #hdnCodigoSolicitacao').prop("value", codigoSolicitacao);
            $('#inserir #hdnCodigoPasso').prop("value", codigoPasso);

            $('#inserir #divCpf').css("display", "none");

            $('#inserir #Evento_DataDeInicioPlanejado')
            .mask('99/99/9999')
            .datepicker();

            AplicarMascaras();

            $("#frmAtividade").validate({
                rules: {
                    'Evento.NomeDoEvento': {
                        required: true
                    },
                    'Evento.DataDeInicioPlanejado': {
                        required: true,
                        dataValida: true
                    },
                    'Evento.HoraDeInicioPlanejado': {
                        required: true
                    },
                    'Evento.HoraDeFimPlanejado': {
                        required: true
                    },
                    'Evento.DescricaoEventos': {
                        required: true
                    },
                    'Aluno.nrRa': {
                        number: true
                    },
                    'Aluno.nrDigRa': {
                        number: true
                    },
                    'Aluno.sgUfRa': {
                        letras: true
                    },
                    CpfResponsavel: {
                        cpf: true
                    }
                },
                messages: {
                    'Evento.NomeDoEvento': {
                        required: "Obrigatório"
                    },
                    'Evento.DataDeInicioPlanejado': {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    'Evento.HoraDeInicioPlanejado': {
                        required: "Obrigatório"
                    },
                    'Evento.HoraDeFimPlanejado': {
                        required: "Obrigatório"
                    },
                    'Evento.DescricaoEventos': {
                        required: "Obrigatório"
                    },
                    'Aluno.nrRa': {
                        number: "Apenas números"
                    },
                    'Aluno.nrDigRa': {
                        number: "Apenas números"
                    },
                    'Aluno.sgUfRa': {
                        letras: "UF inválida"
                    },
                    CpfResponsavel: {
                        cpf: "CPF inválido."
                    }
                }
            });

            $('#inserir #btnSalvar').click(function (e) {
                e.preventDefault();
                if ($("#frmAtividade").valid()) {
                    SalvarNovaAtividade()
                }
                else {
                    return false;
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.CarregarMensagens("Fechar");
        }
    });
}

function SalvarNovaAtividade() {
    var cpf = $('#inserir #CpfResponsavel').val();
    var ra = $('#inserir #Aluno_nrRA').val();
    var digRa = $('#inserir #Aluno_nrDigRa').val();
    var ufRa = $('#inserir #Aluno_sgUfRa').val();

    if ((ra.length == 0 ||
          digRa.length == 0 ||
          ufRa.length == 0) &&
        cpf.length == 0) {
        Mensagem.Alert({
            titulo: "Atividade",
            mensagem: "Informe o R.A.  do Aluno com dígito e UF. Caso não o possua, informe o CPF do Responsável.",
            tipo: "Erro",
            botao: "Fechar"
        });
    }
    else {
        $.ajax({
            type: 'POST',
            async: true,
            cache: false,
            data: {
                'atividade.CodigoSolicitacao': $('#inserir #hdnCodigoSolicitacao').val(),
                'atividade.CodigoPasso': $('#inserir #hdnCodigoPasso').val(),
                'atividade.CpfResponsavel': cpf,
                'atividade.Evento.NomeDoEvento': $('#inserir #Evento_NomeDoEvento').val(),
                'atividade.Evento.DataDeInicioPlanejado': $('#inserir #Evento_DataDeInicioPlanejado').val(),
                'atividade.Evento.HoraDeInicioPlanejado': $('#inserir #Evento_HoraDeInicioPlanejado').val(),
                'atividade.Evento.HoraDeFimPlanejado': $('#inserir #Evento_HoraDeFimPlanejado').val(),
                'atividade.Evento.DescricaoEventos': $('#inserir #Evento_DescricaoEventos').val(),
                'atividade.Aluno.nrRA': ra,
                'atividade.Aluno.nrDigRa': digRa,
                'atividade.Aluno.sgUfRa': ufRa
            },
            url: '/SolicitacaoAtividade/InserirAtividadeSolicitacao',
            success: function (data, textStatus, jqXHR) {
                Mensagem.CarregarMensagens("Fechar");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.CarregarMensagens("Fechar");
            }
        });
    }
}

// 
// Lista Atividades da Solicitação/Passo para Consulta e Alteração. Para NÃO filtrar pelo passo da solicitação, informe 0 como codigoPasso.
// 
// parametro "content" = objeto html que conterá a lista
// parametro "codigoSolicitacao" = Código da Solicitação
// parametro "codigoPasso" = Código do passo da solicitação
// parametro "podeAlterar" = flag (true ou false) que indica se o usuário poderá inserir/alterar uma avaliação da lista
// retorna html da lista
function ListarAtividadesSolicitacao(content, codigoSolicitacao, codigoPasso, podeAlterar) {
    if (codigoSolicitacao > 0) {
        $.ajax({
            type: 'GET',
            async: true,
            cache: false,
            data: {
                codigoSolicitacao: parseInt(codigoSolicitacao),
                codigoPasso: parseInt(codigoPasso)
            },
            url: '/SolicitacaoAtividade/ListarAtividadesSolicitacao',
            success: function (data, textStatus, jqXHR) {
                $(content).empty().html(data);
                $('#hdnPodeAlterar').prop("value", podeAlterar);
                $('#tbAtividade').sedDataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.CarregarMensagens("Fechar");
            }
        });
    }
}

function VisualizarAtividade(codigoAtividade) {
    $.ajax({
        type: 'GET',
        async: true,
        cache: false,
        data: {
            codigoAtividade: parseInt(codigoAtividade)
        },
        url: '/SolicitacaoAtividade/VisualizarAtividadeSolicitacao',
        success: function (data, textStatus, jqXHR) {
            $('#visualizar').empty().html(data);

            var cpf = $('#visualizar #CpfResponsavel').val();

            if (cpf.length > 0) {
                $('#visualizar #divRa').css("display", "none");
                $('#visualizar #divCpf').css("display", "")
            }
            else {
                $('#visualizar #divCpf').css("display", "none");
                $('#visualizar #divRa').css("display", "");
            }

            $('#visualizar input').prop("disabled", "disabled");
            $('#visualizar textarea').prop("disabled", "disabled");

            var podeAlterar = $('#hdnPodeAlterar').val();
            if (podeAlterar == 'true') {
                $('#visualizar #btnAlterar').prop("disabled", "");
            }
            else {
                $('#visualizar #btnAlterar').remove();
            }

            $('#visualizar').dialog({
                width: 820,
                height: 640
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.CarregarMensagens("Fechar");
        }
    });
}

function AlterarAtividade(codigoAtividade) {
    var codigoEscola = $('#hdnCodigoEscola').val();

    $.ajax({
        type: 'GET',
        async: true,
        cache: false,
        data: {
            codigoAtividade: parseInt(codigoAtividade)
        },
        url: '/SolicitacaoAtividade/AlterarAtividadeSolicitacao',
        success: function (data, textStatus, jqXHR) {
            $('#visualizar').dialog('close');
            $('#alterar').empty().html(data);

            $('#alterar #Aluno_sgUfRa').css("text-transform", "uppercase");

            var cpf = $('#alterar #CpfResponsavel').val();

            if (cpf.length > 0) {
                $('#alterar #divRa').css("display", "none");
                $('#alterar #divCpf').css("display", "");
                $('#alterar #chkPossuiRa').prop("checked", "checked");
            }
            else {
                $('#alterar #divCpf').css("display", "none");
                $('#alterar #divRa').css("display", "");
            }

            $('#alterar #Evento_DataDeInicioPlanejado')
            .mask('99/99/9999')
            .datepicker();

            AplicarMascaras();

            $("#frmAlterarAtividade").validate({
                rules: {
                    'Evento.NomeDoEvento': {
                        required: true
                    },
                    'Evento.DataDeInicioPlanejado': {
                        required: true,
                        dataValida: true
                    },
                    'Evento.HoraDeInicioPlanejado': {
                        required: true
                    },
                    'Evento.HoraDeFimPlanejado': {
                        required: true
                    },
                    'Evento.DescricaoEventos': {
                        required: true
                    },
                    'Aluno.nrRa': {
                        number: true
                    },
                    'Aluno.nrDigRa': {
                        number: true
                    },
                    'Aluno.sgUfRa': {
                        letras: true
                    },
                    CpfResponsavel: {
                        cpf: true
                    }
                },
                messages: {
                    'Evento.NomeDoEvento': {
                        required: "Obrigatório"
                    },
                    'Evento.DataDeInicioPlanejado': {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    'Evento.HoraDeInicioPlanejado': {
                        required: "Obrigatório"
                    },
                    'Evento.HoraDeFimPlanejado': {
                        required: "Obrigatório"
                    },
                    'Evento.DescricaoEventos': {
                        required: "Obrigatório"
                    },
                    'Aluno.nrRa': {
                        number: "Apenas números"
                    },
                    'Aluno.nrDigRa': {
                        number: "Apenas números"
                    },
                    'Aluno.sgUfRa': {
                        letras: "UF inválida"
                    },
                    CpfResponsavel: {
                        cpf: "CPF inválido."
                    }
                }
            });

            $('#alterar #btnSalvar').click(function (e) {
                e.preventDefault();
                if ($("#frmAlterarAtividade").valid()) {
                    SalvarAtividade()
                }
                else {
                    return false;
                }
            });

            $('#alterar').dialog({
                width: 820,
                height: 660
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.CarregarMensagens("Fechar");
        }
    });
}

function SalvarAtividade() {
    var codigoAtividade = $('#alterar #hdnCodigoAtividade').val();
    var codigoEvento = $('#alterar #hdnCodigoEvento').val();
    var cpf = $('#alterar #CpfResponsavel').val();
    var ra = $('#alterar #Aluno_nrRA').val();
    var digRa = $('#alterar #Aluno_nrDigRa').val();
    var ufRa = $('#alterar #Aluno_sgUfRa').val();

    if ((ra.length == 0 ||
          digRa.length == 0 ||
          ufRa.length == 0) &&
        cpf.length == 0) {
        Mensagem.Alert({
            titulo: "Atividade",
            mensagem: "Informe o R.A.  do Aluno com dígito e UF. Caso não o possua, informe o CPF do Responsável.",
            tipo: "Erro",
            botao: "Fechar"
        });
    }
    else {
        $.ajax({
            type: 'POST',
            async: true,
            cache: false,
            data: {
                'atividade.Codigo': parseInt(codigoAtividade),
                'atividade.CodigoSolicitacao': $('#alterar #hdnCodigoSolicitacao').val(),
                'atividade.CpfResponsavel': cpf,
                'atividade.Evento.CodigoEventoCalendario': parseInt(codigoEvento),
                'atividade.Evento.NomeDoEvento': $('#alterar #Evento_NomeDoEvento').val(),
                'atividade.Evento.DataDeInicioPlanejado': $('#alterar #Evento_DataDeInicioPlanejado').val(),
                'atividade.Evento.HoraDeInicioPlanejado': $('#alterar #Evento_HoraDeInicioPlanejado').val(),
                'atividade.Evento.HoraDeFimPlanejado': $('#alterar #Evento_HoraDeFimPlanejado').val(),
                'atividade.Evento.DescricaoEventos': $('#alterar #Evento_DescricaoEventos').val(),
                'atividade.Aluno.nrRA': ra,
                'atividade.Aluno.nrDigRa': digRa,
                'atividade.Aluno.sgUfRa': ufRa
            },
            url: '/SolicitacaoAtividade/AlterarAtividadeSolicitacao',
            success: function (data, textStatus, jqXHR) {
                $('#alterar').dialog('close');
                Mensagem.CarregarMensagens("Fechar");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.CarregarMensagens("Fechar");
            }
        });
    }
}

function TrocarRaPorCpf(chk) {
    var content = $(chk).parent();
    var parent = $(content).parent();

    if ($(chk).prop("checked")) {
        $(parent).find('#divCpf').css("display", "");
        $(parent).find('#divRA').css("display", "none");

        $(parent).find('#txtRa').val('');
        $(parent).find('#txtDigRa').val('');
        $(parent).find('#txtUfRa').val('');
    }
    else {
        $(parent).find('#divCpf').css("display", "none");
        $(parent).find('#divRA').css("display", "");

        $(parent).find('#txtCpf').val('');
    }
}




// 
// Lista Atividades da Solicitação/Passo para Avaliação. Para NÃO filtrar pelo passo da solicitação, informe 0 como codigoPasso.
// 
// parametro "content" = objeto html que conterá a lista
// parametro "codigoEscola" = Código da escola para carga da lista de bancas na avaliação.
// parametro "codigoSolicitacao" = Código da Solicitação
// parametro "codigoPasso" = Código do passo da solicitação
// parametro "podeAlterar" = flag (true ou false) que indica se o usuário poderá inserir/alterar uma avaliação da lista
// retorna html da lista
function ListarAtividadesSolicitacaoAvaliacao(content, codigoEscola, codigoSolicitacao, codigoPasso, podeAlterar) {
    if (codigoSolicitacao > 0) {
        $.ajax({
            type: 'GET',
            async: true,
            cache: false,
            data: {
                codigoSolicitacao: parseInt(codigoSolicitacao),
                codigoPasso: parseInt(codigoPasso)
            },
            url: '/SolicitacaoAtividade/ListarAtividadesSolicitacaoAvaliacao',
            success: function (data, textStatus, jqXHR) {
                $(content).empty().html(data);
                $('#hdnCodigoEscola').prop("value", codigoEscola);
                $('#hdnPodeAlterar').prop("value", podeAlterar);

                $('#tbAtividadeAvaliacao').sedDataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.CarregarMensagens("Fechar");
            }
        });
    }
}

function VisualizarAvaliacao(codigoAtividade) {
    $.ajax({
        type: 'GET',
        async: true,
        cache: false,
        data: {
            codigoAtividade: parseInt(codigoAtividade)
        },
        url: '/SolicitacaoAtividade/VisualizarAtividadeAvaliacao',
        success: function (data, textStatus, jqXHR) {
            $('#visualizarAvaliacao').empty().html(data);

            $('#visualizarAvaliacao input').prop("disabled", "disabled");

            var podeAlterar = $('#hdnPodeAlterar').val();

            if (Boolean(podeAlterar) == true)
                $('#visualizarAvaliacao #btnAlterar').prop("disabled", "");
            else
                $('#visualizarAvaliacao #btnAlterar').remove();

            $('#visualizarAvaliacao').dialog({
                width: 820,
                height: 640
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.CarregarMensagens("Fechar");
        }
    });
}

function AlterarAvaliacao(codigoAtividade) {
    var codigoEscola = $('#hdnCodigoEscola').val();

    if (codigoEscola.length > 0) {
        $.ajax({
            type: 'GET',
            async: true,
            cache: false,
            data: {
                codigoEscola: parseInt(codigoEscola),
                codigoAtividade: parseInt(codigoAtividade)
            },
            url: '/SolicitacaoAtividade/AlterarAtividadeAvaliacao',
            success: function (data, textStatus, jqXHR) {
                $('#visualizarAvaliacao').dialog('close');
                $('#avaliar').empty().html(data);

                $("#frmAlterarAvaliacao").validate({
                    rules: {
                        'Banca.CodigoBanca': {
                            required: true
                        },
                        Nota: {
                            required: true
                        }
                    },
                    messages: {
                        'Banca.CodigoBanca': {
                            required: 'Obrigatório'
                        },
                        Nota: {
                            required: 'Obrigatório'
                        }
                    }
                });

                $('#btnAlterarAvaliacao').click(function (e) {
                    e.preventDefault();
                    if ($("#frmAlterarAvaliacao").valid()) {
                        SalvarAvaliacao();
                    }
                    else {
                        return false;
                    }
                });

                $('#avaliar').dialog({
                    width: 820,
                    height: 640
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.CarregarMensagens("Fechar");
            }
        });
    }
}

function SalvarAvaliacao() {
    var codigoAtividade = $('#hdnCodigoAtividade').val();

    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        data: {
            Codigo: parseInt(codigoAtividade),
            CodigoBanca: $('#avaliar #Banca_CodigoBanca').val(),
            Nota: $('#avaliar #Nota').val(),
            Aprovado: $('#avaliar #Aprovado').prop("checked")
        },
        url: '/SolicitacaoAtividade/AlterarAtividadeAvaliacao',
        success: function (data, textStatus, jqXHR) {
            $('#avaliar').dialog('close');
            Mensagem.CarregarMensagens("Fechar");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.CarregarMensagens("Fechar");
        }
    });
}