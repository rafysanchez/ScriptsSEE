﻿var ex = {
    ajax: function (method, url, data, success) {
        var ajaxObj = {
            cache: false,
            url: url,
            type: method,
            data: data,
            success: success,
            error: window.tratadorJSONException
        };

        if (url.indexOf("Salvar") > -1) {
            ajaxObj.data = { str: JSON.stringify(data) };
            ajaxObj.dataType = "json";
        }

        $.ajax(ajaxObj);
    },

    erro: function (msg, tipo) {
        Mensagem.Alert({ titulo: "Erro", mensagem: msg, tipo: tipo == null ? "Erro" : tipo, botao: "Fechar" });
    },

    msg: function (msg, tipo) {
        Mensagem.Alert({ titulo: tipo, mensagem: msg, tipo: tipo, botao: "Fechar" });
    },

    sucesso: function (msg, fcb) {
        if (fcb)
            Mensagem.Alert({
                titulo: "Sucesso", mensagem: msg, tipo: "Sucesso", botao: "Fechar",
                callback: function () {
                    fcb();
                    $.unblockUI();
                }
            });
        else
            Mensagem.Alert({ titulo: "Sucesso", mensagem: msg, tipo: "Sucesso", botao: "Fechar" });
    },

    combos: function () {
        $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
        $('#CodigoDiretoriaCalen').autoPreencher($('#CodigoEscolaCalen'), 'Escola', 'CarregarListaEscolas');
        $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'txtAnoLetivo' }]);
        $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "CodigoEscola", CodigoTipoEnsino: "CodigoTipoEnsino", AnoLetivo: 'txtAnoLetivo' }]);
        $('#CodigoTurma').autoPreencher($('#CodigoDisciplina'), 'Disciplina', 'CarregarListaDisciplinas');

        //Tab homologação.
        $('#TipoDiretoriaHomolog').change(function () {
            if ($('#TipoDiretoriaHomolog :selected').val() === "7") {
                $('#CodigoDiretoriaCalen').prop('selectedIndex', 0);
                $('#CodigoEscolaCalen').prop('selectedIndex', 0);
                $('#dvDiretoriaHomolog').hide();
                $('#dvDiretoriaMunicipalHomolog').show();
                //$('#CodigoDiretoriaCalenMunic').autoPreencher($('#CodigoEscolaCalen'), 'Escola', 'CarregaListaEscolasPorDiretoriaMunicipio', [{ codigoDiretoria: "CodigoDiretoriaCalenMunic" }]);
                $('#CodigoDiretoriaCalenMunic').autoPreencher($('#CodigoEscolaCalen'), 'Escola', 'CarregaListaEscolasPorDiretoriaMunicipal', null, null, null, null, null, function (dllAlvo, adicionarJson) {
                    var params = {
                        CodDiretoria: $('#CodigoDiretoriaCalenMunic').val(),
                        TipoDiretoria: "7",
                        CodigoRedeEnsino: "2"
                    };
                    adicionarJson(params);
                });
            } else {
                $('#CodigoDiretoriaCalenMunic').prop('selectedIndex', 0);
                $('#CodigoEscolaCalen').prop('selectedIndex', 0);
                $('#dvDiretoriaMunicipalHomolog').hide();
                $('#dvDiretoriaHomolog').show();
            }
        });

        //Tab calendário.
        $('#TipoDiretoria').change(function () {
            if ($('#TipoDiretoria').val() === '7') {
                $('#CodigoDiretoria').prop('selectedIndex', 0);
                $('#CodigoEscola').prop('selectedIndex', 0);
                $('#dvDiretoria').hide();
                $('#dvDiretoriaMunicipal').show();
                //$('#CodigoDiretoriaMunic').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregaListaEscolasPorDiretoriaMunicipio', [{ codigoDiretoria: "CodigoDiretoriaMunic" }]);
                $('#CodigoDiretoriaMunic').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregaListaEscolasPorDiretoriaMunicipal', null, null, null, null, null, function (dllAlvo, adicionarJson) {
                    var params = {
                        CodDiretoria: $('#CodigoDiretoriaMunic').val(),
                        TipoDiretoria: "7",
                        CodigoRedeEnsino: "2"
                    };
                    adicionarJson(params);
                });
            } else {
                $('#CodigoDiretoriaMunic').prop('selectedIndex', 0);
                $('#CodigoEscola').prop('selectedIndex', 0);
                $('#dvDiretoriaMunicipal').hide();
                $('#dvDiretoria').show();
            }

        });

        //Tipo de evento.
        $('#TpEventoTipoDiretoria').change(function () {
            if ($('#TpEventoTipoDiretoria :selected').val() === '7') {
                //$('#dvTpEventoDiretoria').hide();
                $('#dvTpEventoDiretoriaMunicipal').show();
            } else {
                $('#dvTpEventoDiretoriaMunicipal').hide();
                //$('#dvTpEventoDiretoria').show();
            }
        });

        //Bimestre
        $('#BimTipoDiretoria').change(function () {
            if ($('#BimTipoDiretoria :selected').val() === '7') {
                $('#CodigoDiretoriaMunic').prop('selectedIndex', 0);
                $('#CodigoEscola').prop('selectedIndex', 0);
                //$('#CodigoDiretoriaMunic').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregaListaEscolasPorDiretoriaMunicipio', [{ codigoDiretoria: "CodigoDiretoriaMunic" }]);
                $('#CodigoDiretoriaMunic').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregaListaEscolasPorDiretoriaMunicipal', null, null, null, null, null, function (dllAlvo, adicionarJson) {
                    var params = {
                        CodDiretoria: $('#CodigoDiretoriaMunic').val(),
                        TipoDiretoria: "7",
                        CodigoRedeEnsino: "2"
                    };
                    adicionarJson(params);
                });
                $('#dvDiretoria').hide();
                $('#dvDiretoriaMunic').show();
            } else {
                $('#CodigoDiretoria').prop('selectedIndex', 0);
                $('#CodigoEscola').prop('selectedIndex', 0);
                $('#dvDiretoriaMunic').hide();
                $('#dvDiretoria').show();
            }
        });

        //Fluxo
        $('#TipoDiretoria').change(function () {
            if ($('#TipoDiretoria :selected').val() === '7') {
                $('#CodigoDiretoriaMunic').prop('selectedIndex', 0);
                $('#CodigoEscola').prop('selectedIndex', 0);
                //$('#CodigoDiretoriaMunic').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregaListaEscolasPorDiretoriaMunicipio', [{ codigoDiretoria: "CodigoDiretoriaMunic" }]);
                $('#CodigoDiretoriaMunic').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregaListaEscolasPorDiretoriaMunicipal', null, null, null, null, null, function (dllAlvo, adicionarJson) {
                    var params = {
                        CodDiretoria: $('#CodigoDiretoriaMunic').val(),
                        TipoDiretoria: "7",
                        CodigoRedeEnsino: "2"
                    };
                    adicionarJson(params);
                });
                $('#dvDiretoria').hide();
                $('#dvDiretoriaMunic').show();
            } else {
                $('#CodigoDiretoria').prop('selectedIndex', 0);
                $('#CodigoEscola').prop('selectedIndex', 0);
                $('#dvDiretoriaMunic').hide();
                $('#dvDiretoria').show();
            }
        });

        //Fundamento
        $('#TipoDiretoriaFundamento').change(function () {
            if ($('#TipoDiretoriaFundamento :selected').val() === '7') {
                $('#CodigoDiretoriaMunicFundamento').prop('selectedIndex', 0);
                $('#dvDiretoriaMunicFundamental').show();
            } else
                $('#dvDiretoriaMunicFundamental').hide();
        });
    },

    dialog: function (cs, data, title, width, fnclose, fnsave, btn) {
        $("." + cs).html(data);

        if (!btn)
            btn = { "Salvar": function () { fnsave(); } };

        $("." + cs).dialog({ modal: true, width: width, title: title, close: function () { fnclose(); }, buttons: btn });
    },

    alertsn: function (tipo, titulo, msg, simfn) {
        Mensagem.Alert({
            titulo: titulo,
            mensagem: msg,
            tipo: tipo,
            botoes: [
                { botao: "Sim", callback: function () { simfn(); } },
                { botao: "Não", callback: function () { $.unblockUI(); } }
            ]
        });
    }
}

var bimestre = {
    id: 0,
    wf: false,
    cadastrar: function (id, from) {
        var escola = $("#filt-escola").val();
        if (escola == null || escola == 0) {
            ex.erro("Escola não foi selecionada");
            return;
        }

        ex.ajax("GET", "/CalendarioNovo/Bimestre/Cadastrar", { codigo: id, codigoEscola: escola, ano: $("#filt-anoLetivo").val() },
            function (data) {
                $(".dialogBimestre").html(data);
                bimestre.id = id;
                if (!from)
                    ex.dialog("dialogBimestre", data, "Bimestre", 450,
                        function () {
                            bimestre.carregar();
                            bimestre.id = 0;
                        },
                        function () {
                            var cb = function () {
                                bimestre.salvar();
                                $(".dialogBimestre").dialog("close");
                                bimestre.carregar($("#filt-escola").val(), $("#filt-anoLetivo").val());
                            }

                            if (workflow.homologado)
                                ex.alertsn("Aviso", "Aviso",
                                    "O calendário está homologado. " +
                                    "Caso haja alguma alteração no bimestre, o mesmo terá de passar pelo fluxo de aprovação novamente. " +
                                    "Deseja continuar?", cb);
                            else
                                cb();

                        }, bimestre.wf ? [
                            {
                                "Fechar": function () {
                                    $(".dialogBimestre").dialog("close");
                                    bimestre.id = 0;
                                }
                            }
                        ] : null);
                else {
                    var btn = bimestre.wf
                    ? {
                        "Fechar": function () {
                            $(".dialogBimestre").dialog("close");
                        }
                    }
                    : {
                        "Salvar": function () {
                            var cb = function () {
                                bimestre.salvar();
                                $(".dialog").dialog("close");
                                workflow.homologado = false;
                            }

                            if (workflow.homologado)
                                ex.alertsn("Aviso", "Aviso",
                                    "O calendário está homologado. " +
                                    "Caso haja alguma alteração no bimestre, o mesmo terá de passar pelo fluxo de aprovação novamente. " +
                                    "Deseja continuar?", cb);
                            else
                                cb();
                        }
                    };

                    $(".dialogBimestre").dialog({ modal: true, width: 450, title: "Bimestre", close: function () { evento.carregar(); bimestre.id = 0; }, buttons: btn });
                }
            });
    },

    salvar: function () {
        var postData = {
            Codigo: bimestre.id,
            CodigoEscola: $("#filt-escola").val(),
            Numero: $("#Numero").val(),
            Inicio: $(".dialogBimestre #Inicio").val(),
            Fim: $(".dialogBimestre #Fim").val(),
            AnoLetivo: $("#AnoLetivo").val()
        };
        ex.ajax("POST", "/CalendarioNovo/Bimestre/Cadastrar", postData,
            function (data) {
                if (data.Tipo == "Sucesso" && bimestre.id == 0)
                    bimestre.id = data;

                ex.msg(data.Mensagem, data.Tipo);
            });
    },

    carregar: function (esc, anoLetivo, erro) {
        if (esc == null || esc == 0) {
            if (erro)
                ex.erro("Os filtros são obrigatórios", "Aviso");
            return;
        }

        ex.ajax("GET", "/CalendarioNovo/Bimestre/ParcialTabela", { escola: esc, ano: anoLetivo },
            function (data) {
                $("#parcialTabela").html(data);
                $("#tabelaDados").sedDataTable({
                    columnDefs: [{ targets: [4, 5], orderable: false }],
                    nomeExportacao: "Bimestres",
                    tituloFiltro: "Informações Extras",
                    filtros: [
                        { nome: "Ano Letivo", valor: $('#filt-anoLetivo').val() },
                        { nome: "Diretoria", valor: $('#filt-diretoria option:selected').text() },
                        { nome: "Escola", valor: $('#filt-escola option:selected').text() },
                    ]
                });
            });
    },

    excluir: function (id) {
        var AnoLetivo = $('#filt-anoLetivo').val();
        ex.alertsn("Alerta", "Aviso", "Tem certeza que deseja excluir o bimestre selecionado?",
            function () {
                ex.ajax("POST", "/CalendarioNovo/Bimestre/Excluir", { codigo: id, ano: AnoLetivo },
                    function (data) {
                        $.unblockUI();
                        Mensagem.Alert({ titulo: "Sucesso", mensagem: data, tipo: "Sucesso", botao: "Fechar" });
                        bimestre.carregar($("#filt-escola").val(), $("#filt-anoLetivo").val());
                    });
            });
    }
};

var tipoEvento = {
    id: 0,
    cadastrar: function (id) {
        ex.ajax("GET", "/CalendarioNovo/TipoEvento/Cadastrar", { codigo: id },
            function (data) {
                ex.dialog("dialog", data, "Tipo de Evento", 600,
                function () { tipoEvento.id = 0; },
                function () { if (tipoEvento.salvar()) $(".dialog").dialog("close"); });
            });
    },

    salvar: function (id) {
        var postData = {
            Codigo: tipoEvento.id,
            Nome: $("#Nome").val(),
            Abreviacao: $("#Abreviacao").val(),
            Obrigatorio: $("#Obrigatorio").is(":checked"),
            Ativo: $("#Ativo").is(":checked"),
            TipoCalendario: $("#TipoCalendario").val(),
            Editavel: $("#Editavel").is(":checked"),
            TipoLetivo: $("#TipoLetivo").val(),
            QuantidadeEventos: $("#QuantidadeEventos").val(),
            Cor: $("#Cor").val(),
            DtAnoLetivo: $("#DtAnoLetivo").val(),
            TipoDiretoria: $('#Cadastro-redeEnsino').val(),
            codigoDiretoria: $("#Cadastro-diretoria").val(),
            CodigoEscola: $("#Cadastro-escola").val(),
        };

        $('#form-cadastro').validate({
            rules: {
                DtAnoLetivo: { required: true },
                Nome: { required: true },
                Abreviacao: { required: true },
                'TipoCalendario': {
                    required: function () {
                        return $("#TipoCalendario option:selected").val() == "" || $("#TipoCalendario option:selected").val() == 0 || $("#TipoCalendario option:selected").val() == undefined
                    }
                },
                'TipoLetivo': {
                    required: true
                },
                Cor: {
                    required: true
                },
                'Cadastro-redeEnsino': {
                    required: true
                },
                'Cadastro-diretoria': {
                    required: function () {
                        return ($("#Cadastro-redeEnsino").val() == 2 || $("#Cadastro-redeEnsino").val() == 3 || $("#Cadastro-redeEnsino").val() == 4)
                    }
                },
                'Cadastro-escola': {
                    required: function () {
                        return ($("#Cadastro-redeEnsino").val() == 3 || $("#Cadastro-redeEnsino").val() == 4)
                    }
                },

            }
        });

        if (!$('#form-cadastro').valid())
            return false;

        if ($('#Cadastro-redeEnsino :selected').val() === '1' && $("#dados-tipoescola .checkescolas:checked").length == 0) {
            ex.msg("Preencha o tipo de escola", "Alerta", "Campos obrigatórios");
            $("#tabs").sedTabControl("atual", "dados-tipoescola");
            return false;
        }

        postData.Obs = "";

        if ($('#Cadastro-redeEnsino :selected').val() === '1')
            $("#dados-tipoescola input[type=checkbox]:checked").each(function (i, e) { postData.Obs += $(e).attr("id").replace("te-", "") + ","; });

        ex.ajax("POST", "/CalendarioNovo/TipoEvento/Cadastrar", postData,
            function (data) {
                if (tipoEvento.id == 0)
                    tipoEvento.id = data;
                if (tipoEvento.id > 0) {
                    if (postData.DtAnoLetivo != null && postData.TipoDiretoria != null && postData.CodigoDiretoria != null)
                        tipoEvento.pesquisar(postData.DtAnoLetivo, postData.TipoDiretoria, postData.CodigoDiretoria);
                    else
                        tipoEvento.carregar();
                }
            });
        return true;
    },

    carregar: function () {
        if ($("#filtro-anoLetivo").val() <= 0 || $("#filtro-redeEnsino").val() <= 0) {
            ex.msg("Favor selecione o ano e a rede de ensino.", "Alerta");
            return;
        }

        if ($("#filtro-redeEnsino").val() == 2) {
            if ($("#filtro-diretoria").val() <= 0 || $("#filtro-municipio").val() <= 0) {
                ex.msg("Favor selecione a diretoria e a rede de ensino.", "Alerta");
                return;
            }
        }
        //filtro-municipio
        if ($("#filtro-redeEnsino").val() == 3 || $("#filtro-redeEnsino").val() == 4) {
            if ($("#filtro-diretoria").val() <= 0 || $("#filtro-escola").val() <= 0 || $("#filtro-municipio").val() <= 0) {
                ex.msg("Favor selecione o diretoria,escola e município.", "Alerta");
                return;
            }
        }

        if ($("#filtro-redeEnsino").val() == 4) {
            if ($("#filtro-diretoria").val() <= 0 || $("#filtro-municipio").val() <= 0) {
                ex.msg("Favor selecione o diretoria e o município.", "Alerta");
                return;
            }
        }

        ex.ajax("GET", "/CalendarioNovo/TipoEvento/ParcialTabela", {
            anoLetivo: $("#filtro-anoLetivo").val(),
            codigoRedeEnsino: $("#filtro-redeEnsino").val(),
            codigoDiretoria: $("#filtro-diretoria").val(),
            codigoEscola: $("#filtro-escola").val(),

        },
            function (data, textStatus, jqXHR) {
                $("#parcialTabela").html(data);
                $("#tabelaDados").sedDataTable({ columnDefs: [{ targets: [7, 8], orderable: false }] });
            });
    },

    pesquisar: function (anoLetivo, cdTipoDiretoria, cdDiretoria) {
        if (anoLetivo == null)
            return;

        ex.ajax("GET", "/CalendarioNovo/TipoEvento/ParcialTabela", { anoLetivo: anoLetivo, tipoDiretoria: cdTipoDiretoria, codigoDiretoria: cdDiretoria },
            function (data) {
                $("#parcialTabela").html(data);
                $("#tabelaDados").sedDataTable({ columnDefs: [{ targets: [7, 8], orderable: false }] });
            });
    },

    excluir: function (id) {
        ex.alertsn("Alerta", "Importante",
            "O tipo de evento só poderá ser excluído caso não possua nenhum calendário vinculado, caso contrário o tipo de evento poderá ser excluído. " +
            "Essa ação é irreversível. Deseja continuar?",
            function () { ex.ajax("POST", "/CalendarioNovo/TipoEvento/Excluir", { codigo: id }, function () { tipoEvento.carregar(); }); });
    },

    validarLetivo: function (el) {
        if ($(el).find("option:selected").length === 0) return;
        if ($(el).find("option:selected").val().split("-")[1] === "2")
            $("#evento-letivo").slideDown(150);
        else
            $("#evento-letivo").slideUp(150);
    }
};

var evento = {
    impedirReload: false,
    id: 0,
    dtpadrao: "",

    cadastrar: function (dt, impedirReload) {
        var escola = $("#filt-escola").val() == "" ? 0 : $("#filt-escola").val();
        var ano = $("#filt-anoLetivo").val() == "" ? 0 : $("#filt-anoLetivo").val();
        var diretoria = $('#filt-diretoria').val() == "" ? 0 : $('#filt-diretoria').val()

        ex.ajax("GET", "/CalendarioNovo/Evento/Cadastrar", { dia: dt, escola: escola, ano: ano, codigoDiretoria: diretoria },
            function (data) {
                $(".dialogEvento").html(data);
                if (!impedirReload)
                    $(".dialogEvento").dialog({ modal: true, width: 800, title: "Eventos", close: function () { if (!evento.impedirReload) evento.carregar(); } });
            });
    },

    listarEventos: function () {
        var escola = $("#filt-escola").val() === "" ? "0" : $("#filt-escola").val();
        var ano = $("#filt-anoLetivo").val() === "" ? "0" : $("#filt-anoLetivo").val();

        ex.ajax("GET", "/CalendarioNovo/Evento/ListarEventos", { escola: escola, ano: ano },
            function (data) {
                $(".dialogListaEventos").html(data);
                $(".dialogListaEventos").dialog({ modal: true, width: 900, title: "Lista de Eventos" });
                $("#tabelaEvento").sedDataTable({ embutida: true });
            });
    },

    salvar: function () {
        var cb = function () {
            if (!$("#form-cadastro").valid())
                return;

            var postData = {
                AnoLetivo: $("#filt-anoLetivo").val(),
                Codigo: evento.id,
                CodigoEscola: $("#filt-escola").val(),
                CodigoTipoEvento: $(".dialogEvento #CodigoTipoEvento").val().split("-")[0],
                Descricao: $(".dialogEvento #Descricao").val(),
                Inicio: $(".dialogEvento #InicioEvento").val(),
                Fim: $(".dialogEvento #FimEvento").val(),
                Letivo: $(".dialogEvento #Letivo").is(":checked")
            };
            ex.ajax("POST", "/CalendarioNovo/Evento/Cadastrar", postData,
                function (data) {
                    if (evento.id == 0) {
                        if (data >= 0) {
                            evento.id = data;
                            ex.sucesso("Evento cadastrado com sucesso!", function () {
                                $(".dialogEvento").dialog("close");
                                evento.cadastrar($("#InicioEvento").val().split("/")[2] + "-" + $("#InicioEvento").val().split("/")[1] + "-" + $("#InicioEvento").val().split("/")[0], true);
                            });
                        }
                        evento.carregar();
                    }
                    else {
                        ex.sucesso("Evento editado com sucesso!", function () {
                            $(".dialogEvento").dialog("close");
                            evento.cadastrar($("#InicioEvento").val().split("/")[2] + "-" + $("#InicioEvento").val().split("/")[1] + "-" + $("#InicioEvento").val().split("/")[0], true);
                        });
                        evento.carregar();
                    }

                    switch (parseInt(data)) {
                        case -1:
                            ex.msg("Este evento não pode ser editado", "aviso");
                            break;
                        case -2:
                            ex.msg("Não é possível cadastrar dois eventos do mesmo tipo no mesmo dia", "aviso");
                            break;
                        case -3:
                            ex.msg("Não é possível cadastrar eventos com data de início e fim diferente do ano atual", "aviso");
                            break;
                        case -4:
                            ex.msg("A data inicial não pode ser maior que a final.", "aviso");
                            break;
                        case -5:
                            ex.msg("Usuário não possui vínculo com escola.", "aviso");
                            break;
                        case -6:
                            ex.msg("Descrição deve ter no máximo 200 caracteres.", "aviso");
                            break;
                    }
                });
        };

        if (workflow.homologado)
            ex.alertsn("Aviso", "Aviso",
                "O calendário está homologado. " +
                "Caso haja alguma alteração no evento, o mesmo terá de passar pelo fluxo de aprovação novamente. " +
                "Deseja continuar?", cb);
        else
            cb();
    },

    excluir: function (id) {
        var ano = $('#filt-anoLetivo').val();
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Tem certeza que deseja excluir o evento selecionado?",
            tipo: "Aviso",
            botoes: [
                {
                    botao: "Sim", callback: function () {
                        ex.ajax("POST", "/CalendarioNovo/Evento/Excluir", { codigo: id, ano: ano },
                        function () {
                            $(".dialogEvento").dialog("close");
                            //evento.cadastrar($("#InicioEvento").val().split("/")[2] + "-" + $("#InicioEvento").val().split("/")[1] + "-" + $("#InicioEvento").val().split("/")[0]);
                            evento.carregar();
                            //ex.sucesso("Evento excluido com sucesso!");
                        });
                    }
                },
                { botao: "Não", callback: function () { $.unblockUI(); } }
            ]
        });

    },

    alterarContexto: function (el) {
        if (el == null) {
            evento.id = 0;
            $("#Descricao").val("");
            $("#CodigoTipoEvento").val($("#CodigoTipoEvento").children().eq(0).val());
            $("#evento-edit").html("Inserir novo Evento");
            $("#InicioEvento").val(evento.dtpadrao);
            $("#FimEvento").val(evento.dtpadrao);
            tipoEvento.validarLetivo($("#CodigoTipoEvento"));
            return;
        }

        var tr = $(el).parent().parent();
        evento.id = $(tr).attr("data-id");
        $("#evento-edit").html("Editar Evento");
        $("#Descricao").val($(tr).attr("data-desc"));
        var cdtp = $(tr).children("td").eq(0).attr("data-cdtp");
        $("#CodigoTipoEvento").val($("#CodigoTipoEvento option[value^=" + cdtp + "]").val());
        $("#InicioEvento").val($(tr).children("td").eq(3).text());
        $("#FimEvento").val($(tr).children("td").eq(4).text());
        tipoEvento.validarLetivo($("#CodigoTipoEvento"));
        $("#Letivo").prop("checked", $(tr).children("td").eq(0).attr("data-letivo").toLowerCase() === "true");
    },

    carregar: function (id, ed) {
        if (ed == null)
            ed = true;

        var escola = $("#filt-escola").val() === "" ? "0" : $("#filt-escola").val();
        var ano = $("#filt-anoLetivo").val() === "" ? "0" : $("#filt-anoLetivo").val();
        var diretoria = $("#filt-diretoria").val();

        if (escola === "0" || ano === "0")
            ex.msg("Escola e ano são campos obrigatórios.", "Alerta");
        else
            ex.ajax("GET", "/CalendarioNovo/Evento/ParcialTabela", { editavel: ed, escola: escola, ano: ano, codigoDiretoria: diretoria },
                function (data) {
                    if (id == undefined)
                        $("#parcialTabela").html(data);
                    else
                        $("#" + id).html(data);
                });
    },

    homologado: function (id) {
        var escola = $("#filtHomolog-escola").val() === "" ? "0" : $("#filtHomolog-escola").val();
        var ano = $("#filtHomolog-anoLetivo").val() === "" ? "0" : $("#filtHomolog-anoLetivo").val();
        var diretoria = $("#filtHomolog-diretoria").val();

        if (escola === "0" || ano === "0")
            ex.msg("Escola e ano são obrigatórios.", "Alerta");
        else
            ex.ajax("GET", "/CalendarioNovo/Evento/Visualizar", { escola: escola, ano: ano, codigoDiretoria: diretoria },
                function (data) {
                    if (id == undefined)
                        $("#calendarioHomologado_").html(data);
                    else
                        $("#" + id).html(data);
                });
    },

    visualizar: function () {
        var escola = $("#filt-escola").val();
        var ano = $("#filt-anoLetivo").val();
        var diretoria = $("#filt-diretoria").val();

        ex.ajax("GET", "/CalendarioNovo/Evento/Visualizar", { escola: escola, ano: ano, codigoDiretoria: diretoria },
            function (data) {
                if (data != null) {
                    $("#calendarioHomologado").html(data);
                    $("#calendarioHomologado").dialog({ modal: true, width: 1100, title: "Último calendário homologado" });
                } else
                    ex.msg("Não há calendário homologado.", "Alerta");
            });
    },

    consultaHomologado: function (dt, impedirReload) {
        var escola = 0;
        var ano = 0;
        var tipocal = 0;
        var codigoDiretoria = 0;

        if ($("#home").hasClass("active")) {
            //CALENDARIO HOMOLOGADO
            escola = $("#filtHomolog-escola").val() === "" ? "0" : $("#filtHomolog-escola").val();
            ano = $("#filtHomolog-anoLetivo").val() === "" ? "0" : $("#filtHomolog-anoLetivo").val();
            tipocal = 1;
            codigoDiretoria = $('#filtHomolog-diretoria').val();
        }
        else {
            //CALENDARIO
            escola = $("#filt-escola").val() === "" ? "0" : $("#filt-escola").val();
            ano = $("#filt-anoLetivo").val() === "" ? "0" : $("#filt-anoLetivo").val();
            tipocal = 0;
            codigoDiretoria = $("#filt-diretoria").val();
        }

        ex.ajax("GET", "/CalendarioNovo/Evento/ConsultaHomologado", { dia: dt, escola: escola, ano: ano, tipoCal: tipocal, codigoDiretoria: codigoDiretoria },
            function (data) {
                $(".dialogEvento").html(data);
                if (!impedirReload)
                    $(".dialogEvento").dialog({ modal: true, width: 800, title: "Eventos" });
            });
    }
}

var workflow = {
    homologado: false,
    carregar: function () {
        
        var ano = $("#filt-anoLetivo").val() == "" ? 0 : $("#filt-anoLetivo").val();
        var redeEnsino = $("#filt-redeEnsino").val() == "" ? 0 : $("#filt-redeEnsino").val();
        var escola = $("#filt-escola").val() == "" ? 0 : $("#filt-escola").val();
        var diretoria = $("#filt-diretoria").val() == "" ? 0 : $("#filt-diretoria").val();
        var municipio = $("#filt-municipio").val() == "" ? 0 : $("#filt-municipio").val();
        var status = $("#status").val() == "" ? 1 : $("#status").val();
                
        if (ano === 0)
            ex.msg("Ano é obrigatórios.", "Alerta");
        else if (redeEnsino === 0)
            ex.msg("Rede de Ensino é obrigatórios.", "Alerta");
        else if(diretoria === 0)
            ex.msg("Diretoria é obrigatórios.", "Alerta");
        else if(municipio === 0)
            ex.msg("Município é obrigatórios.", "Alerta");
        else if (escola === 0)
            ex.msg("Escola é obrigatórios.", "Alerta");
        else
            ex.ajax("GET", "/CalendarioNovo/Fluxo/ParcialTabela", { escola: escola, ano: ano, status: status },
                function (data, textStatus, jqXHR) {
                    $("#parcialTabela").html(data);
                });
    },

    gerar: function (ano) {
        var escola = $("#filt-escola").val() == "" ? 0 : $("#filt-escola").val();
        var ano = $("#filt-anoLetivo").val() == "" ? 0 : $("#filt-anoLetivo").val();
        //var tipoDiretoria = $('#TipoDiretoria').val() == "" ? 0 : $('#TipoDiretoria').val();
        var diretoria = $('#filt-diretoria').val();

        ex.ajax("POST", "/CalendarioNovo/Fluxo/Gerar", { escola: escola, ano: ano, codigoDiretoria: diretoria },
            function (data, textStatus, jqXHR) {
                if (data.Tipo == "Sucesso" && bimestre.id == 0)
                    bimestre.id = data;
                ex.msg(data.Mensagem, data.Tipo);
                setTimeout(function () { $(".msg-texto").html(new DOMParser().parseFromString($(".msg-texto").html(), "text/html").body.textContent); }, 30);
                evento.carregar();
            });
    },

    editar: function (passo) {
        var diretoria = $('#filt-diretoria').val();
        
        ex.ajax("GET", "/CalendarioNovo/Fluxo/Editar", { codigoPasso: passo, codigoDiretoria: diretoria },
           function (data) {
               $(".dialog").html(data);
               $(".dialog").dialog({ modal: true, width: 1100, title: "Fluxo", close: function () { } });
           });
    },

    avancar: function (passo, aprovado) {
        
        ex.ajax("POST", "/CalendarioNovo/Fluxo/Avancar",
            {
                codigoPasso: passo,
                aprovado: aprovado,
                obs: $("#Observacao").val()
            },
            function (data) {
                $(".dialog").dialog("close");
                ex.msg(data.Msg, data.Tipo);
                workflow.carregar();
            });
    },

    listarEventos: function () {

        var escola = $("#filt-escola").val() == "" ? 0 : $("#filt-escola").val();
        var ano = $("#filt-anoLetivo").val() == "" ? 0 : $("#filt-anoLetivo").val();

        ex.ajax("GET", "/CalendarioNovo/Fluxo/ListarEventos", { escola: escola, ano: ano },
            function (data) {
                $(".dialogListaEventos").html(data);
                $(".dialogListaEventos").dialog({ modal: true, width: 900, title: "Lista de Eventos" });
                $("#tabelaEvento").sedDataTable({ embutida: true });
            });
    }
}

var fundamento = {
    ano: 0,
    carregar: function () {
        anoLetivo = $("#filtro-anoLetivo").val();
        if (anoLetivo == null)
            return;

        ex.ajax("GET", "/CalendarioNovo/Fundamento/ParcialTabela", {
            anoLetivo: $("#filtro-anoLetivo").val(),
            codigoRedeEnsino: $("#filtro-redeEnsino").val(),
            codigoDiretoria: $("#filtro-diretoria").val(),
            codigoEscola: $("#filtro-escola").val()
        },
        function (data) {
            $("#parcialTabela").html(data);
            $("#tabelaDados").sedDataTable();
        });
    },

    cadastrar: function (anoLetivo, codigoDiretoria, codigoRedeEnsino, codigoEscola) {
        ex.ajax("GET", "/CalendarioNovo/Fundamento/Cadastrar", {
            anoLetivo: anoLetivo,
            codigoRedeEnsino: codigoRedeEnsino,
            codigoDiretoria: codigoDiretoria,
            codigoEscola: codigoEscola
        },
            function (data) {
                fundamento.ano = anoLetivo;
                ex.dialog("dialog", data, "Resolução", 500,
                    function () {
                        //fundamento.carregar(0);
                        fundamento.ano = 0;
                    },
                    function () {
                        if (fundamento.salvar())
                            $(".dialog").dialog("close");
                        //fundamento.carregar($("#ano-letivo").val());
                    });
            });
    },

    salvar: function () {
        
        var postData = {
            Ano: $("#Ano").val(),
            Descricao: $("#Descricao").val(),
            TipoDiretoria: $("#Cadastro-redeEnsino").val() == undefined ? $("#Cadastro-redeEnsinoEdit").val() : $("#Cadastro-redeEnsino").val(),
            CodigoDiretoria: $("#Cadastro-redeEnsino").val() == undefined ? $("#Cadastro-diretoriaEdit").val() : $('#Cadastro-diretoria').val(),
            CodigoEscola: $("#Cadastro-redeEnsino").val() == undefined ? $("#Cadastro-escolaEdit").val() : $("#Cadastro-escola").val(),
        };

        $('#form-cadastro-fundamento').validate({
            rules: {
                Ano: { required: true },
                'Cadastro-redeEnsino': { required: true },
                Descricao: { required: true },
                
            }
        });

        if ($('#form-cadastro-fundamento').valid() == false)
            return false;

        ex.ajax("POST", "/CalendarioNovo/Fundamento/Cadastrar", postData,
            function (data) {
                fundamento.carregar();
                if (bimestre.ano == 0)
                    bimestre.ano = data;
            });
        return true;
    },

    excluir: function (ano, codigoDiretoria, codigoEscola) {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Tem certeza que deseja excluir a resolução selecionada?",
            tipo: "Aviso",
            botoes: [
                {
                    botao: "Sim", callback: function () {
                        ex.ajax("POST", "/CalendarioNovo/Fundamento/Excluir", { anoLetivo: ano, codigoDiretoria: codigoDiretoria, codigoEscola: codigoEscola },
                        function () {
                            $.unblockUI();
                            fundamento.carregar();
                        });
                    }
                },
                { botao: "Não", callback: function () { $.unblockUI(); } }
            ]
        });
    }
}

var pdf = {
    gerar: function () {
        var escola = $("#filtHomolog-escola").val() === "" ? "0" : $("#filtHomolog-escola").val();
        var ano = $("#filtHomolog-anoLetivo").val() === "" ? "0" : $("#filtHomolog-anoLetivo").val();
        var diretoria = $("#filtHomolog-diretoria").val();

        if (escola === "0" || ano === "0") {
            ex.msg("Os campos diretoria, escola e ano letivo são obrigatórios.", "Alerta");
            return;
        }

        ex.ajax("POST", "/CalendarioNovo/Evento/ModelEventos", { escola: escola, ano: ano, codigoDiretoria: diretoria },
            function (data) {
                if (data.Msg === "Não há um calendário homologado.")
                    ex.msg(data.Msg, "Alerta");
                else if (data.Msg === "Os bimestres não foram cadastrados")
                    ex.msg("Não há um calendário homologado.", "Alerta");
                else {
                    data.EmAndamento = false;
                    pdf.data = data;
                    pdf.montar(data);
                }
            });
    },

    gerarEmAndamento: function () {
        var escola = $("#filt-escola").val() === "" ? "0" : $("#filt-escola").val();
        var ano = $("#filt-anoLetivo").val() === "" ? "0" : $("#filt-anoLetivo").val();
        var diretoria = $("#filt-diretoria").val();

        if (escola === "0" || ano === "0") {
            ex.msg("Os campos diretoria, escola e ano letivo são obrigatórios.", "Alerta");
            return;
        }

        ex.ajax("POST", "/CalendarioNovo/Evento/ModelEventosEmAndamento", { escola: escola, ano: ano, codigoDiretoria: diretoria },
            function (data) {
                if (data.Msg === "Não há calendário em processo de aprovação no momento para gerar o PDF.")
                    ex.msg(data.Msg, "Alerta");
                else {
                    data.EmAndamento = true;
                    pdf.data = data;
                    pdf.montar(data);
                }
            });
    },

    montar: function (data) {
        var config = {
            pageOrientation: "landscape",
            pageSize: "A4",
            pageMargins: [8, 8, 8, 8],
            title: "Calendario.pdf"
        };

        sedPdfExporter.normalizeConfig(config);

        config.data = data;
        config.nomeDiretoria = $("#home").hasClass("active") ? $("#filtHomolog-diretoria option:selected").html() : $("#filt-diretoria option:selected").html();
        config.nomeEscola = $("#home").hasClass("active") ? $("#filtHomolog-escola option:selected").html() : $("#filt-escola option:selected").html();

        config.docGenerator = function (config) {
            var parseToString = function (o, t) { return o === null || o === undefined ? (t ? "    " : "") : o.toString(); };
            var tohex = function (cor) {
                var a = cor.split("(")[1].split(")")[0];
                a = a.split(",");
                var b = a.map(function (x) {
                    x = parseInt(x).toString(16);
                    return (x.length === 1) ? "0" + x : x;
                });
                return "#" + b.join("");
            };

            var content = [];
            var tabelaHeader = {
                layout: 'noBorders',
                fontSize: 10,
                alignment: 'center',
                margin: [0, -8, 0, 0],
                table: {
                    widths: [100, '*', 180],
                    body:
                    [
                        [
                            { image: 'logo', width: 100, rowSpan: 2 },
                            { text: 'SECRETARIA DE ESTADO DA EDUCAÇÃO', fontSize: 14, bold: true },
                            {
                                table: {
                                    widths: [55, '*', 15],
                                    body: [
                                        ['1º Bimestre', config.data.Bimestres[0].DatasStr, '' + config.data.Bimestres[0].Dias],
                                        ['2º Bimestre', config.data.Bimestres[1].DatasStr, '' + config.data.Bimestres[1].Dias],
                                        ['3º Bimestre', config.data.Bimestres[2].DatasStr, '' + config.data.Bimestres[2].Dias],
                                        ['4º Bimestre', config.data.Bimestres[3].DatasStr, '' + config.data.Bimestres[3].Dias]
                                    ]
                                },
                                rowSpan: 1
                            }
                        ],
                        [
                            '',
                            { text: 'DIRETORIA DE ENSINO - ' + config.nomeDiretoria, fontSize: 14, bold: true },
                            { text: 'LETIVOS: ' + config.data.TotalDiasLetivos.toString() }
                        ],
                        [
                            { text: config.nomeEscola, bold: true },
                            { text: 'MUNICÍPIO ' + config.data.Municipio, bold: true },
                            ''
                        ],
                        [
                            { text: 'CALENDÁRIO ESCOLAR ' + '' + config.data.Ano, bold: true, colSpan: 2, alignment: 'left' },
                            '',
                            { text: parseToString(config.data.DescricaoFundamento), bold: true }
                        ]
                    ]
                }
            }

            var tN1 = (config.data.IniciadoPor != null && (config.data.IniciadoPor.Nome != null || config.data.IniciadoPor.Rg != null));
            var tN2 =
                (config.data.Passos != null && config.data.Passos.length === 3
                        && (
                            config.data.Passos[0].Nome != null || config.data.Passos[0].Rg != null
                                ||
                            config.data.Passos[1].Nome != null || config.data.Passos[1].Rg != null
                                ||
                            config.data.Passos[2].Nome != null || config.data.Passos[2].Rg != null
                        )
                );

            var tabelaHeader2 = {
                layout: 'noBorders',
                fontSize: 10,
                pageBreak: (!tN1 && !tN2 ? 'before' : undefined),
                alignment: 'center',
                margin: [0, -8, 0, 0],
                table: {
                    widths: [100, '*', 180],
                    body:
                    [
                        [
                            {
                                image: 'logo', width: 100, rowSpan: 2
                            },
                            { text: 'SECRETARIA DE ESTADO DA EDUCAÇÃO', fontSize: 14, bold: true },
                            {
                                table: {
                                    widths: [55, '*', 15],
                                    body: [
                                        ['1º Bimestre', config.data.Bimestres[0].DatasStr, '' + config.data.Bimestres[0].Dias],
                                        ['2º Bimestre', config.data.Bimestres[1].DatasStr, '' + config.data.Bimestres[1].Dias],
                                        ['3º Bimestre', config.data.Bimestres[2].DatasStr, '' + config.data.Bimestres[2].Dias],
                                        ['4º Bimestre', config.data.Bimestres[3].DatasStr, '' + config.data.Bimestres[3].Dias]
                                    ]
                                },
                                rowSpan: 1
                            }
                        ],
                        [
                            '',
                            { text: 'DIRETORIA DE ENSINO - ' + config.nomeDiretoria, fontSize: 14, bold: true },
                            { text: 'LETIVOS: ' + config.data.TotalDiasLetivos.toString() }
                        ],
                        [
                            { text: config.nomeEscola, bold: true },
                            { text: 'MUNICÍPIO ' + config.data.Municipio, bold: true },
                            ''
                        ],
                        [
                            { text: 'CALENDÁRIO ESCOLAR ' + '' + config.data.Ano, bold: true, colSpan: 2, alignment: 'left' },
                            '',
                            { text: parseToString(config.data.DescricaoFundamento), bold: true }
                        ]
                    ]
                }
            }

            var tabelaCalendario = {
                fontSize: 6,
                margin: [0, 8, 0, 0],
                alignment: 'center',
                table: {
                    widths: [50, 0,
                        14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
                        14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
                        14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
                        14, 13, 13
                    ],
                    body: []
                }
            };

            var tabelaCalendario2Semestre = {
                fontSize: 6,
                margin: [0, 8, 0, 0],
                alignment: 'center',
                table: {
                    widths: [50, 0,
                        14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
                        14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
                        14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
                        14, 13, 13
                    ],
                    body: []
                }
            };

            // HEADER DA TABELA DE CALENDÁRIO
            var header = [{ fillColor: '#DDD', text: 'DIA / MÊS', rowSpan: 2, margin: [0, 7, 0, 0] }, { text: '', rowSpan: 20 }];
            var header2 = [{ fillColor: '#DDD', text: 'DIA / MÊS', rowSpan: 2, margin: [0, 7, 0, 0] }, { text: '', rowSpan: 20 }];

            for (var i = 1; i <= 31; i++) {
                var dia = { fillColor: '#DDD', text: i.toString(), rowSpan: 2, margin: [0, 7, 0, 0] };
                var dia2 = { fillColor: '#DDD', text: i.toString(), rowSpan: 2, margin: [0, 7, 0, 0] };
                header.push(dia);
                header2.push(dia2);
            }
            header.push({ fillColor: '#DDD', text: 'LETIVOS', colSpan: 2 });
            header.push('');
            header2.push({ fillColor: '#DDD', text: 'LETIVOS', colSpan: 2 });
            header2.push('');

            tabelaCalendario.table.body.push(header);
            tabelaCalendario.table.body.push(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                { fillColor: '#DDD', text: '1º' }, { fillColor: '#DDD', text: '2º' }]);

            tabelaCalendario2Semestre.table.body.push(header2);
            tabelaCalendario2Semestre.table.body.push(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                { fillColor: '#DDD', text: '1º' }, { fillColor: '#DDD', text: '2º' }]);

            // MESES / DIAS DA TABELA DE CALENDÁRIO
            for (var m = 1; m <= 12; m++) {
                var model = config.data.Meses[m - 1];
                var mes = [{ fillColor: '#DDD', text: model.Nome, rowSpan: 3, margin: [0, 12, 0, 12] }, ''];
                var mes1 = [{ fillColor: '#DDD', text: "" }, ''];
                var mes2 = [{ fillColor: '#DDD', text: "" }, ''];

                for (var d = 1; d <= 31; d++) {
                    var dia = null;
                    var dia1 = null;
                    var dia2 = null;
                    var dia3 = null;

                    // encontra o model de dia necessário
                    for (var w = 0; w < config.data.Dias.length; w++) {
                        var data = new Date(parseInt(config.data.Dias[w].Data.replace("/Date(", "").replace(")/", ""), 10));
                        if (data.getDate() == d && (data.getMonth() + 1) == m) {
                            dia = config.data.Dias[w];

                            if (dia.Cor.indexOf("rgb") > -1) {
                                if (dia1 == null) {
                                    dia1 = dia;
                                    dia1.Cor = tohex(dia.Cor);
                                }
                                else if (dia2 == null) {
                                    dia2 = dia;
                                    dia2.Cor = tohex(dia.Cor);
                                }
                                else if (dia3 == null) {
                                    dia3 = dia;
                                    dia3.Cor = tohex(dia.Cor);
                                }
                            }
                            else
                                dia1 = dia;
                        }
                    }

                    if (dia == null && dia1 == null && dia2 == null && dia3 == null) {
                        mes.push({ fillColor: "#DDD", text: "", rowSpan: 3 });
                        mes1.push({ fillColor: "#DDD", text: "" });
                        mes2.push({ fillColor: "#DDD", text: "" });
                    }
                    else {
                        if (dia1 != null && dia1.Abreviacao == "L") {
                            mes.push({ fillColor: dia1.Cor, text: dia1.Abreviacao, rowSpan: 3, margin: [0, 12, 0, 12] });
                            mes1.push({ fillColor: dia1.Cor, text: "" });
                            mes2.push({ fillColor: dia1.Cor, text: "" });
                        }
                        else {
                            var rowSpann = 3;
                            rowSpann = rowSpann + (dia2 != null ? -1 : 0) + (dia3 != null ? -1 : 0);
                            //console.log('dia:' + d + '/mes:' + m + '/rowSpan' + rowSpann);
                            if (rowSpann == 3) {
                                mes.push({ fillColor: dia1.Cor, text: dia1.Abreviacao, rowSpan: rowSpann, margin: [0, 12, 0, 12] });
                                mes1.push({ fillColor: dia1.Cor, text: " " });
                                mes2.push({ fillColor: dia1.Cor, text: " " });
                            }
                            else if (rowSpann == 2) {
                                mes.push({ fillColor: dia1.Cor, text: dia1.Abreviacao, rowSpan: rowSpann, margin: [0, 3, 0, 3] });
                                mes1.push('');
                                mes2.push({ fillColor: dia2.Cor, text: dia2.Abreviacao, margin: [0, 3, 0, 3] });
                            }
                            else {
                                mes.push({ fillColor: dia1.Cor, text: dia1.Abreviacao });
                                mes1.push({ fillColor: dia2.Cor, text: dia2.Abreviacao });
                                mes2.push({ fillColor: dia3.Cor, text: dia3.Abreviacao });
                            }
                        }
                    }
                }

                // contagem de dias mensais para o primeiro e segundo semestre.
                mes.push({ text: model.Dias1Sem.toString(), rowSpan: 3, margin: [0, 12, 0, 12] });
                mes.push({ text: model.Dias2Sem.toString(), rowSpan: 3, margin: [0, 12, 0, 12] });
                mes1.push('');
                mes1.push('');
                mes2.push('');
                mes2.push('');

                if (m <= 6) {
                    tabelaCalendario.table.body.push(mes);
                    tabelaCalendario.table.body.push(mes1);
                    tabelaCalendario.table.body.push(mes2);
                }
                else {
                    tabelaCalendario2Semestre.table.body.push(mes);
                    tabelaCalendario2Semestre.table.body.push(mes1);
                    tabelaCalendario2Semestre.table.body.push(mes2);
                }
            };

            //LEGENDA 1 SEMESTRE
            var tabelaLegenda = {
                fontSize: 6,
                margin: [0, 8, 0, 0],
                table: {
                    widths: [15, 132, 15, 132, 15, 132, 15, 132, 15, 132],
                    height: 40,
                    body: []
                }
            };

            var linha = [];
            for (var i = 0; i < config.data.TiposEvento.length; i++) {
                if (i % 5 == 0 && i > 0) {
                    tabelaLegenda.table.body.push(linha);
                    linha = [];
                    linha2 = [];
                }

                if (config.data.TiposEvento[i].Cor.indexOf("rgb") > -1)
                    linha.push({ fillColor: tohex(config.data.TiposEvento[i].Cor), text: config.data.TiposEvento[i].Abreviacao, alignment: 'center', margin: [0, 4, 0, 4] });
                else
                    linha.push({ fillColor: config.data.TiposEvento[i].Cor, text: config.data.TiposEvento[i].Abreviacao, alignment: 'center', margin: [0, 4, 0, 4] });

                linha.push(config.data.TiposEvento[i].Nome);
            }

            if (linha.length > 0) {
                while (linha.length < 10)
                    linha.push('');
                tabelaLegenda.table.body.push(linha);
            }

            //LEGENDA 2 SEMESTRE
            var tabelaLegenda2 = {
                fontSize: 6,
                margin: [0, 8, 0, 0],
                table: {
                    widths: [15, 132, 15, 132, 15, 132, 15, 132, 15, 132],
                    height: 40,
                    body: []
                }
            };

            var linha2 = [];
            for (var i = 0; i < config.data.TiposEvento2.length; i++) {
                if (i % 5 == 0 && i > 0) {
                    tabelaLegenda2.table.body.push(linha2);
                    linha2 = [];
                }

                if (config.data.TiposEvento2[i].Cor.indexOf("rgb") > -1)
                    linha2.push({ fillColor: tohex(config.data.TiposEvento2[i].Cor), text: config.data.TiposEvento2[i].Abreviacao, alignment: 'center', margin: [0, 4, 0, 4] });
                else
                    linha2.push({ fillColor: config.data.TiposEvento2[i].Cor, text: config.data.TiposEvento2[i].Abreviacao, alignment: 'center', margin: [0, 4, 0, 4] });

                linha2.push(config.data.TiposEvento2[i].Nome);
            }

            if (linha2.length > 0) {
                while (linha2.length < 10)
                    linha2.push('');
                tabelaLegenda2.table.body.push(linha2);
            }

            //1º SEMESTRE
            content.push(tabelaHeader);
            content.push({ text: [{ text: '1º SEMESTRE', width: [100], fontSize: 15, alignment: 'center' }] });
            content.push(tabelaCalendario);
            if (config.data.TiposEvento.length > 0)
                content.push(tabelaLegenda);

            if (tN1 || tN2)
                content.push({
                    fontSize: 9,
                    margin: [0, 8, 0, 0],
                    alignment: 'center',
                    pageBreak: 'after',
                    table: {
                        widths: ['*', '*', '*', '*'],
                        body: [
                            [
                                parseToString(tN1 ? config.data.IniciadoPor.Nome : ""),
                                parseToString(tN2 ? config.data.Passos[0].Nome : ""),
                                parseToString(tN2 ? config.data.Passos[1].Nome : ""),
                                parseToString(tN2 ? config.data.Passos[2].Nome : "")
                            ],
                            [
                                parseToString(tN1 ? config.data.IniciadoPor.Rg : ""),
                                parseToString(tN2 ? config.data.Passos[0].Rg : ""),
                                parseToString(tN2 ? config.data.Passos[1].Rg : ""),
                                parseToString(tN2 ? config.data.Passos[2].Rg : "")
                            ]
                        ]
                    }
                });

            //2º SEMESTRE
            content.push(tabelaHeader2);
            content.push({ text: [{ text: '2º SEMESTRE', width: [100], fontSize: 15, alignment: 'center' }] });
            content.push(tabelaCalendario2Semestre);
            if (config.data.TiposEvento2.length > 0)
                content.push(tabelaLegenda2);

            if (tN1 || tN2)
                content.push({
                    fontSize: 9,
                    margin: [0, 8, 0, 0],
                    alignment: 'center',
                    table: {
                        widths: ['*', '*', '*', '*'],
                        body: [
                            [parseToString(tN1 ? config.data.IniciadoPor.Nome : ""),
                                parseToString(tN2 ? config.data.Passos[0].Nome : ""),
                                parseToString(tN2 ? config.data.Passos[1].Nome : ""),
                                parseToString(tN2 ? config.data.Passos[2].Nome : "")],
                            [parseToString(tN1 ? config.data.IniciadoPor.Rg : ""),
                                parseToString(tN2 ? config.data.Passos[0].Rg : ""),
                                parseToString(tN2 ? config.data.Passos[1].Rg : ""),
                                parseToString(tN2 ? config.data.Passos[2].Rg : "")]
                        ]
                    }
                });

            if (config.data.EmAndamento)
                return {
                    watermark: { text: 'Calendário em processo de aprovação', color: 'blue', opacity: 0.3, bold: true, italics: false },
                    content: content,
                    images: {
                        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOUAAADDCAYAAAB9PNY9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAHKrSURBVHhe7d0JvG5VWT/wVyPTFCdKEVEUUSw1MBTEIVTADEVlEFCUQQQViaCAwAFQEFMEghgcUPFKKgQCgTggRIoDMiipEImQZoFhihI2t//r+3h/h3WPlyHuxf/7nrufz2efvd+9117j83umtdY+9xgaTUYaaaSpoXsuPo800khTQiMoRxppymgE5UgjTRmNoBxppCmjEZQjjTRlNIJypJGmjEZQjjTSlNEIyhmgfir5lltuqfN//dd/1RnluXuu8/u///u/6zzSbNEIyhkgIPvP//zPur7vfe9b4Pvf//3f+v2Tn/xkco973KMA+Mu//Mt17dn//M//TFZaaaVKM9Js0QjKGSAgA7jQPe95z8mv/MqvFFjvf//7171oRfd+6Zd+adSSM0zjMrsZo//4j/+YAyRtSGve5z73qWeACLAOQHYeafZoHLUpJ8BDzNd///d/L0Ai11/96lcnBx988Jx/CYSRsSMgZ5dGTTnlBJTM0WhGfmK04Pbbbz/5xCc+Mbn22msnD37wgyt9ryFHbTmbNI7YlBNQAZcADkCKvrp31VVXTU477bTJj3/848lHP/rROQ3Zy9ho2ZFmi0ZQTjlF2/El0b3vfe86H3/88WXSAutb3/rWOqNoVNQHh0aaHRpBOeXEdOUz8iUB1G/TIIsWLZqstdZak3XWWWfyz//8z5MTTzyx0ksrDRo9k9mkEZRTToBI49GUMWVPOOGEmgrZYostJiuvvPJkl112mXzkIx8pEIrESjPS7NIY6JkBYo4CZBYG0JA77bRTTYFcdNFFk/e85z2Txz3ucZPLL7988uQnP3nxWz/TlDFrR5odGjXllFNkJnAB4emnnz657rrrJrvvvnsFfpirj33sYycbbrjh5M/+7M8qfTTlqDFnk0ZQTjllSsS8JDr66KMnO+yww+RBD3pQ3adBAfHAAw+cnHTSSZO/+7u/q3toNIJmk0ZQTjnF/ATOyy67bHLJJZdMDj300LpnOoS2FIXdZJNNJmusscbkgx/8YD2jQce1r7NJIyinnGhDZqiF6EceeeRk/fXXnzziEY+o+4I9tKHIrN8HHHDA5NRTT5380z/907j2dYZpBOUMEHP0O9/5zuQv/uIvJn/yJ39S90RjgTXgA86XvexlkxtuuGFy3nnnza2HHWn2aATlciD+3tL8N6DJlqtM/qN/+7d/q3PeyblfgfPTn/60zgHdEUccMXnkIx852WCDDea0o3P/zr3uda/Ja1/72skb3vCGuSBP9l+mHijX8p5f7/nBIb+l6TVv35aRlj+NoFxGAgqrbOL7Aeh8oCDmZQBAi7kGDgDNu/zAML80rvmFFguYh9xnn33qt/TKAJiko00BFSh/9KMfTb785S9PbrrppjJ7AVM9lKl+rpO3vOQDaOqTuoT8zuFdabIofgTn3UMjKJeRgA2Yon0A1D2UyGgA4DrAxOSYG6j+9V//te55F9iieZPP+9///rq2SAABst8OgApgXJuvfNGLXjTZf//9Jw984AMrPWDKT7os05MWRYCoC7BKA2zSa5ffSFlpm3c9DzhHWr40gnIZCVNbcRNNhGHD6M6YOlHQPM/ZwUy93/3uV/cAC6MHON4F9ve+972Tl7/85XN+orO8Uw7QB9DoNa95zeTiiy+u6ZFos+QvjXJ7DU543HzzzfUb4AM27eq1d/KXXt08G2n507iiZzkQJsf8AQ1mzWJwQAjIQhg/aUOGwRQHIImeWs/67W9/e3LNNddMPv7xj8+BJSD51V/91cnb3va2ydlnn12mKsAAWOiJT3xilfvCF76wgG3KxPYu9XrCE56wONXPyo02DKkz0AIfChiTv9/qMb9dIy0fGkG5jBSmzhnDOmPoABJgaS6+HuCJpN54442Tb3zjG8Xczvw/TO9976y33nqlQVdZZZXJKaecUtryVa961RJl7rvvvpOvfe1rtYXrAQ94QJnB3rnyyisLeDvuuOPkH/7hHwrEwC4y2wNXGYBqIQIQe5f56+x99wkcbVEvRzRs7o+0/GkE5TJSr/XiO6K/+qu/qqBLVthgYovHf/3Xf72iqI9//OPrt3c32mijYnYgiBaLZvSurVnHHHPM5MILL5z8xm/8RgELAG3f+uxnPzv51Kc+NQcQGhbYrIH9y7/8y7oXHxHYgVSdlPf1r3+9luzRpMDtfOmll5YPSngAvjnRP//zP58885nPrLzCLp71FsFIy5GAcqRlowa4oTFoXTcA1Bk1EA0NhLi4jjXWWGP4oz/6o+Gyyy5bIl3TQEPTqot/DUtcI2mf+9znDuuuu279TllveMMbhmc961lDA1P9dn/LLbccHv3oRw8NVEMTEnNp0fwy+2euTz/99GGHHXYYmqacq/OiRYvqeV/HJjDqPNLdQyMol5EwK1AA5nzC6E0DDU0DDk3rDQcffPDwm7/5m0PTLsNaa601vP71rx+uuOKKOXDIo8+n/91M3qH5kcPv//7v12/3DzrooOEZz3hG/VaHk08+ucq56KKL5u6hgCi/gUu90VlnnTXsuuuuQ9PaVa/f/d3fHZpJW8C84IIL5t5BygyYAX6ku4dGUC5Hwqw9wyP3AAp41llnneFv/uZvhmY+DocddlhpvmaKDs2cHfbaa6/hkksuqXfk4Qggk18zR4dmdg5f+MIXCixASVOir3zlK0MzT4c3v/nN9bvXZtIGXM3sHc4999wCIpDThltsscXwwQ9+cLj66quHpz3tacP973//0uY9Rfj0NGrMu4dGUC4HwrC9aYgwbG/uNV9u2GCDDUoDfeMb36j7QPf3f//3w7ve9a6h+YpD8y+H5sMN++yzz/Dtb3+7tFGAGW26yy67FJDlHfMVef95z3teXQPPLbfcUtfyYMp++MMfLi2ojAc84AHDi1/84uHEE08skEpz4403luBYddVVS7vH9JWX+qceyLNe8Iy0fGkE5TISpu0ZFrmHcUMBLEZ+1ateVRrqlFNOqd89c19zzTXDIYccMjz1qU+d80GZuKeeeuriFMNw8803D095ylOGTTbZpLTic57znNKyD3/4w4frrrtuDrxAyR/cbLPNyqR94AMfOLz85S8fPv7xj8+lCX3961+v5+utt97wgx/8YPHdW0n70p4RkHc/jaBcRupNumiWMDENk+eA6T4NB5g05vvf//65Z46AJe/RZFtvvfWw0korlXZ7xSteMZxxxhmlyZixq6++epmaAAzk8pAnwLp33/vet0CdZ0gZESIAzmRWFxoXkNVbGvV0LU3S9+BE88E90vKhEZTLgTB8D86eolUALSQ9Hw7Y/uAP/mDuHgKMML8zxr/hhhuGD33oQ+X7eYcJKhjDh2TKrrnmmsMLXvCCOe0K9GeeeWa9zzxFqYd7ueabPuQhDxl22mmnSpc63pEmlMdttXekZacRlMuBesBh1mgT9wV2BGS233774WEPe1hpOQSEH/jAB8qUpQHR/HdDAUmAc+CBB9Z7AAmIDpruU5/6VGk4QL4j0Bx77LH13jbbbLP4zpKab//99x/e9KY3zd1T3wAcRYiMtPxpBOVyIJoDYdQw8Ze//OVhq622KjC+7W1vK80FOHke0AEt0/TpT3/68MMf/rDuJT9gTLBIQOjII48cnvSkJ5W2vMc97jEHSL+dmbI777xzRWmRdwMeYA9QmbgAfcwxx9TvBIVQhMIb3/jG4TWveU2Zwp/73OfqHsrz1HGk5U8jKO8EBRioN//C8PPPb33rW4eNNtqophWYpwIsH/vYxypa6n2M3TO16YzHP/7xNYd500031T1prr322uGoo44afuu3fmu45z3vWaapecrjjz++QAigAjSuAVaEVVRVWvcJhNNOO63yizDYcccdK73gEZCmPsg5bVPfT37ykxUEevKTnzycdNJJdb8XPP057+UeynVfhuu0Pe+MtCSNoLwD6s1IDBmG6k05BLiYzLTE29/+9rp3wAEH1DTId7/73WG33XYrBg9wk0/O0mB+vuIf/uEflq9nMl+k1e8vfelLlU65NKL8LEagyf74j/+40ssfff/73x8++tGPlg8KoAI+/MwXvvCFBVb+ad+uaNAeUJ/4xCcK/O95z3uGiy++uOpAc/7Lv/xLPf/pT3+6xLkHmDYl3XwBlLIC0pF+nsa1r3eSLCa3NlV3NYaq9aeN2Wqta2O0uv/c5z53svfee9cOjqbRJg1o9fud73zn5BnPeMbkT//0T+u9xrC1VtXRwDRZc801aw2s/JrfWeW95S1vqfx8DMs7ykF2e1jfam2tL9v57usFF1xQXySQrpmatS7VdQNZbXBuGm/y13/91/V92M9//vO1z/KLX/xi1cOWLd/6sS523XXXnfzar/3aZO21165F8p/+9Kcnm2++eX0byCcsLV633tZa2Ic+9KFVnwbGKit90sBe7Q+FvdSpJ+mUOf/+SON+yjskgEMAiTBZFmF7hhkt7j7ssMMmm222We2y8MW55gNOmpYrQPrPWH/7t39b39ixgBwzWlwOQK973etqsXfzLWtvpXJ8h8didnlZlA6QygUO7/lind0jnmFqwPPBrG9961slBAJI9QTA7bbbrsB0v/vdr+r1ve99b9K0ZS1abybzpPmzBUR18IWD5z//+VXGWWedVdvHLGzfdddda7G8//TlW0B2tSBlNe1f1+oCkPokpN7ua5s6NYui7uuzEZBLpxGUd0CYJ4zkTJvZtYHR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'
                    }
                };
            else
                return {
                    content: content,
                    images: {
                        logo: 'data:image/png;base64,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7LH13jbbbLP4zpKab//99x/e9KY3zd1T3wAcRYiMtPxpBOVyIJoDYdQw8Ze//OVhq622KjC+7W1vK80FOHke0AEt0/TpT3/68MMf/rDuJT9gTLBIQOjII48cnvSkJ5W2vMc97jEHSL+dmbI777xzRWmRdwMeYA9QmbgAfcwxx9TvBIVQhMIb3/jG4TWveU2Zwp/73OfqHsrz1HGk5U8jKO8EBRioN//C8PPPb33rW4eNNtqophWYpwIsH/vYxypa6n2M3TO16YzHP/7xNYd500031T1prr322uGoo44afuu3fmu45z3vWaapecrjjz++QAigAjSuAVaEVVRVWvcJhNNOO63yizDYcccdK73gEZCmPsg5bVPfT37ykxUEevKTnzycdNJJdb8XPP057+UeynVfhuu0Pe+MtCSNoLwD6s1IDBmG6k05BLiYzLTE29/+9rp3wAEH1DTId7/73WG33XYrBg9wk0/O0mB+vuIf/uEflq9nMl+k1e8vfelLlU65NKL8LEagyf74j/+40ssfff/73x8++tGPlg8KoAI+/MwXvvCFBVb+ad+uaNAeUJ/4xCcK/O95z3uGiy++uOpAc/7Lv/xLPf/pT3+6xLkHmDYl3XwBlLIC0pF+nsa1r3eSLCa3NlV3NYaq9aeN2Wqta2O0uv/c5z53svfee9cOjqbRJg1o9fud73zn5BnPeMbkT//0T+u9xrC1VtXRwDRZc801aw2s/JrfWeW95S1vqfx8DMs7ykF2e1jfam2tL9v57usFF1xQXySQrpmatS7VdQNZbXBuGm/y13/91/V92M9//vO1z/KLX/xi1cOWLd/6sS523XXXnfzar/3aZO21165F8p/+9Kcnm2++eX0byCcsLV633tZa2Ic+9KFVnwbGKit90sBe7Q+FvdSpJ+mUOf/+SON+yjskgEMAiTBZFmF7hhkt7j7ssMMmm222We2y8MW55gNOmpYrQPrPWH/7t39b39ixgBwzWlwOQK973etqsXfzLWtvpXJ8h8didnlZlA6QygUO7/lind0jnmFqwPPBrG9961slBAJI9QTA7bbbrsB0v/vdr+r1ve99b9K0ZS1abybzpPmzBUR18IWD5z//+VXGWWedVdvHLGzfdddda7G8//TlW0B2tSBlNe1f1+oCkPokpN7ua5s6NYui7uuzEZBLpxGUd0CYJ4zkTJvZtYHR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'
                    }
                };
        };

        sedPdfExporter.exportPdf(config);
    }
}

$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    if ($.fn.autoPreencher)
        ex.combos();
});