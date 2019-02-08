var ex = {
    ajax: function (a, m, o, d, success) {
        var ao = {
            cache: false,
            url: a,
            type: m,
            data: o,
            dataType: d,
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop(function () { alert(errorThrown); });
            }
        };

        $.ajax(ao);
    },

    postfile: function (a, o, success) {
        var ao = {
            cache: false,
            url: a,
            type: "post",
            data: o,
            contentType: false,
            processData: false,
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop(function () { alert(errorThrown); });
            }
        };

        $.ajax(ao);
    },

    sajax: function (id, success) {
        var f = $("#" + id);
        var a = f.attr("action");
        var m = f.attr("method");
        var o = {};

        $("#" + id + " .form-control")
            .each(function (i, v) {
                o[$(v).attr("id")] = $(v).val();
            });

        var ao = {
            cache: false,
            url: a,
            type: m,
            data: o,
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop(function () { alert(errorThrown); });
            }
        };

        $.ajax(ao);
    },

    autofill: function (id, obj) {
        $("#" + id + " .form-control").each(function (i, v) {
            var pv = obj[$(v).attr("id")];
            if (pv != null) {
                //if ($(v).attr("id") == "senhaUsuario" || $(v).attr("id") == "Email" || $(v).attr("id") == "DescricaoCargo" || $(v).attr('id') == 'DataNascimento') {
                if ($(v).attr("id") == "senhaUsuario" || $(v).attr("id") == "Email" || $(v).attr('id') == 'DataNascimento') {
                    $(v).removeAttr("readonly");
                }
                else {
                    $(v).attr("readonly", "readonly");
                }

                if ($(v).attr('id') == 'DataNascimento' && pv == '01/01/0001')
                    $(v).val("");
                else
                    $(v).val(pv);
            }
            else
                $(v).val("");
        });
    },

    autocreate: function (id) {
        var o = {};
        $("#" + id + " .form-control").each(function (i, v) {
            var pn = $(v).attr("id");
            var pv = $(v).val();
            if ($(v).attr('id') != 'DataNascimento')
                o[pn] = pv;
        });

        return o;
    },

    clearform: function (id) {
        $("#" + id + " .form-control").each(function (i, v) {
            if (pv != null) $(v).val("");
        });
    },

    smsg: function (t, m, ti) {
        Mensagem.Alert({
            titulo: t,
            mensagem: m,
            tipo: ti == null ? "Erro" : ti,
            botao: "Fechar"
        });
    },
};

var concluinte = {

    pesquisar: function () {
        var nomeUsuario = $('#nome').val();
        var loginUsuario = $('#login').val();
        var cpf = $('#cpf').val();
        var rg = $('#rg').val();

        if (nomeUsuario.trim() == "" && loginUsuario.trim() == "" && cpf.trim() == "" && rg.trim() == "") {
            Mensagem.Alert({
                titulo: "Pesquisar Usuário",
                mensagem: "Preencha ao menos um dos filtros de pesquisa.",
                tipo: "alerta",
                botao: "Fechar"
            });

            return false;
        }

        ex.sajax("pesquisarConcluinte", function (data) {
            $("#resultadoPesquisa").html(data);
            $("#tabelaResultado").sedDataTable({
                nomeExportacao: "Usuario",
                columnDefs: [{ targets: [4], orderable: false }]
            });
        });
        return false;
    },

    cadastrar: function (codigo) {
        var title = "Cadastrar Usuário";

        ex.ajax("/Concluinte/BuscarPorCodigo", "get", { codigo: codigo }, null,
            function (data) {
                var obj = JSON.parse(data);

                if (obj.success != null && !obj.success) {
                    Mensagem.Alert({
                        titulo: "Atenção",
                        mensagem: obj.error,
                        tipo: "aviso",
                        botao: "Fechar"
                    });
                    return;
                }

                if (codigo > 0) {
                    $('#tab_perfis').show();
                    $('#tab_arquivo').show();
                    $("#inserirPerfil").removeAttr("disabled");
                    $("#upload").removeAttr("disabled");
                    if (obj.LinkArquivo != null && obj.LinkArquivo.length > 0) {
                        $("#LinkArquivo").removeAttr("disabled");
                        $("#LinkArquivo").val(obj.LinkArquivo.split("/").reverse()[0]);
                        $("#LinkArquivo").on("click", function () {
                            window.open(obj.LinkArquivo, '_blank');
                        });
                    }

                    title = "Editar Usuário: " + obj.Nome;
                }
                else {
                    $("#LinkArquivo").attr("disabled", "disabled");
                    $("#LinkArquivo").val("Não encontrado");
                    $('#tab_perfis').hide();
                    $('#tab_arquivo').hide();
                }

                $("#cadastro").dialog({
                    title: title,
                    width: 700,
                });

                ex.autofill("cadastrarConcluinte", obj);

                concluinte.bloquearcampos(obj);
                if ($('#diretoria option').length == 2) {
                    $('#diretoria').prop('selectedIndex', 1);
                    $('#diretoria').prop("disabled", true);
                }
                perfil.pesquisar(codigo);
                if (obj.CodigoPerfil == 1403) {
                    $("#divComboDiretoria").hide();
                }
                $("#divComboEscola").hide();
                $("#divComboRedeEnsino").hide();
                $("#divComportamentoDiretorSecretario").hide();
            });
    },

    salvar: function () {
        concluinte.gerarLoginRg();
        concluinte.gerarLoginRne();
        var obj = ex.autocreate("cadastrarConcluinte");

        ex.ajax("/Concluinte/Cadastrar", "post", {
            json: JSON.stringify(obj),
            pass: $("#senhaUsuario").val(),
            dtNascimento: $("#DataNascimento").val(),
        }, "json",
            function (data) {
                if (parseInt(data) == 0) {
                    ex.smsg("Atenção", "O usuário não foi salvo pois já existe um usuário cadastrado com esse CPF / Login", "Alerta");
                }
                else {
                    $("#ID").val(data);
                    ex.smsg("Sucesso", "Usuário salvo com sucesso!", "Sucesso");
                }
            });

        return false;
    },

    gerarLoginRg: function () {
        //var id = parseInt($("#ID").val());
        //if (id > 0) return;
        if ($("#NumeroRNE").val().trim() != "") return;

        var login = "rg" + $("#NumeroRG").val() + $("#DigitoRG").val() + $("#EstadoRG").val();
        $("#Login").val(login.toLowerCase());
    },

    gerarLoginRne: function () {
        //var id = parseInt($("#ID").val());
        //if (id > 0) return;

        if ($("#NumeroRG").val().trim() != "") return;

        var login = "rne" + $("#NumeroRNE").val();
        $("#Login").val(login.toLowerCase());
    },

    bloquearcampos: function (obj) {
        var id = parseInt($("#ID").val());

        if (id > 0 && !obj.PermiteEdicaoCompleta) {
            $("#Nome").attr("readonly", "readonly");
            $("#NumeroRNE").attr("readonly", "readonly");
            $("#NumeroRG").attr("readonly", "readonly");
            $("#DigitoRG").attr("readonly", "readonly");
            $("#EstadoRG").attr("readonly", "readonly");
            $("#CPF").attr("readonly", "readonly");
            //$("#Endereco").attr("readonly", "readonly");
            //$("#TituloEleitoral").attr("readonly", "readonly");
            //$("#TelefoneFixo").attr("readonly", "readonly");
            //$("#TelefoneComercial").attr("readonly", "readonly");
            //$("#TelefoneCelular").attr("readonly", "readonly");
        }
        else {
            $("#Nome").removeAttr("readonly");
            $("#NumeroRNE").removeAttr("readonly");
            $("#NumeroRG").removeAttr("readonly");
            $("#DigitoRG").removeAttr("readonly");
            $("#EstadoRG").removeAttr("readonly");
            $("#CPF").removeAttr("readonly");
            //$("#Endereco").removeAttr("readonly");
            //$("#TituloEleitoral").removeAttr("readonly");
            //$("#TelefoneFixo").removeAttr("readonly");
            //$("#TelefoneComercial").removeAttr("readonly");
            //$("#TelefoneCelular").removeAttr("readonly");
        }
    }
};

var perfil = {
    pesquisar: function (codigo) {
        ex.ajax("/Concluinte/PerfisCadastrados", "get", { codigo: codigo }, null,
            function (data) {
                $("#perfisCadastrados").html(data);
            });
    },

    salvar: function () {
        var obj = {
            usuario: $("#ID").val() == "" ? 0 : parseInt($("#ID").val()),
            perfil: $("#ddlPerfil").val() == "" ? 0 : parseInt($("#ddlPerfil").val().split("|")[0]),
            diretoria: $("#diretoria").val() == "" ? 0 : parseInt($("#diretoria").val()),
            redeEnsino: $("#redeEnsino").val() == "" ? 0 : parseInt($("#redeEnsino").val()),
            codigoEscola: $("#escola").val() == "" ? 0 : parseInt($("#escola").val())
        };
        if ($("#divComboEscola:visible").length > 0) {
            if (obj.usuario == 0 || obj.perfil == 0 || obj.diretoria == 0 || obj.redeEnsino == 0 || obj.codigoEscola == 0) {
                ex.smsg("Campos obrigatórios", "Preencha o Perfil, Diretoria, Rede de Ensino e Escola", "Aviso");
                return;
            }
        }
        if ((obj.usuario == 0 || obj.perfil == 0 || obj.diretoria == 0) && $("#divComboDiretoria:visible").length > 0) {
            ex.smsg("Campos obrigatórios", "Preencha o Perfil e Diretoria", "Aviso");
            return;
        }

        if ($("#divAssociadosEscola:visible").length <= 0 && $("#ddlPerfil").val().split("|")[1] === "2") {
            obj.codigoEscola = 0;
        }
        ex.ajax("/Concluinte/InserirPerfil", "post", obj, "json",
            function (data) {
                if (!data.sucesso) {
                    //jlima - regra substituir
                    //if (data.substituir) {
                    //    $("#perfilSubstituir").dialog({ title: "Substituir Perfil" });
                    //    $("#perfilSubstituir").dialog.show();
                    //    ex.smsg("Substituir Perfil", data.erromsg, "Alerta");
                    //}
                    //else
                    ex.smsg("Perfil", data.erromsg, "Alerta");
                }

                perfil.pesquisar($("#ID").val());
                perfil.buscarConcluintes();
            });

        //ex.ajax("/Concluinte/InserirPerfil", "post", obj, null,
        //    function (data) {


        //        perfil.pesquisar($("#ID").val());
        //    });

    },

    excluir: function (codigo, diretoria, codigoEscola) {
        var obj = {
            usuario: parseInt($("#ID").val()),
            perfil: codigo,
            diretoria: diretoria,
            codigoEscola: codigoEscola
        };

        ex.ajax("/Concluinte/ExcluirPerfil", "post", obj, null,
            function (data) {
                perfil.pesquisar($("#ID").val());
                perfil.buscarConcluintes();
            });

    },
    //jlima - regra substituir
    substituir: function () {
        var usuarioSubstituir = $("input[name=concluinte]").checked().val().split('|');
        var obj = {
            usuario: parseInt(usuarioSubstituir[0]),
            perfil: parseInt(usuarioSubstituir[1]),
            diretoria: parseInt($("#diretoria").val()),
            codigoEscola: parseInt($("#escola").val())
        };
        ex.ajax("/Concluinte/ExcluirPerfil", "post", obj, null,
            function (data) {
                perfil.salvar();
                perfil.buscarConcluintes();
            });

    },

    buscarConcluintes: function () {
        var obj = {
            usuario: $("#ID").val() == "" ? 0 : parseInt($("#ID").val()),
            perfil: $("#ddlPerfil").val() == "" ? 0 : parseInt($("#ddlPerfil").val().split("|")[0]),
            diretoria: $("#diretoria").val() == "" ? 0 : parseInt($("#diretoria").val()),
            codigoEscola: $("#escola").val() == "" ? 0 : parseInt($("#escola").val())
        };

        //if (obj.usuario == 0 || obj.perfil == 0 || obj.diretoria == 0 || obj.codigoEscola == 0)
        //    return false;

        ex.ajax("/Concluinte/BuscarConcluintesAssociados", "post", obj, null,
            function (data) {
                if (data.qtde_permitido > 0) {
                    $("#divListaPerfis").html("Você só poderá associar " + data.qtde_permitido + (data.codigoEscola > 0 ? " escola(s) para " : data.codigoDiretoria > 0 ? " usuário(s) para " : " usuários para ") + $("#ddlPerfil option:selected").text());
                    if (data.sucesso == false) {
                        $("#divAssociadosEscola").empty();
                    }
                    else if (data.sucesso == true && data.qtde == 0) {
                        $("#divAssociadosEscola").empty();
                        $("#divAssociadosEscola").append("<p>Não existem usuários atribuídos a este perfil " + (data.codigoEscola > 0 ? " para escola " : data.codigoDiretoria > 0 ? " para diretoria " : "") + (data.codigoDiretoria == 0 ? "</p>" : "selecionada</p>"));
                        $("#divAssociadosEscola").show();
                    }
                    else {
                        if (($("#divComboEscola:visible").length > 0 && $("#escola").val() != "") || $("#divComboEscola:visible").length ==0) {
                            $("#divAssociadosEscola").empty();
                            $("#divAssociadosEscola").append("<p>Existe(m) " + data.qtde + " " + $("#ddlPerfil option:selected").text() + (data.codigoDiretoria > 0 ? " atribuído(s) a esta " + (data.codigoEscola > 0 ? " escola" : " diretoria") : " atribuído(s)") + " <br/>");
                            var obj = JSON.parse(data.pessoas);
                            $.each(obj, function () {
                                $("#divAssociadosEscola").append("<br/>");
                                $("#divAssociadosEscola").append("Nome: " + this.Nome + "<br/>" + "CPF: " + this.CPF);
                                $("#divAssociadosEscola").append("</p>");
                                $("#divAssociadosEscola").show();
                            });
                        }
                        else
                        {
                            $("#divAssociadosEscola").hide();
                        }
                    }
                }

            });
    }
};

var arquivo = {
    salvar: function () {
        var fd = new FormData();
        fd.append("arq", $("#input-upload")[0].files[0]);
        fd.append("codigoUsuario", $("#ID").val());
        ex.postfile("/Concluinte/Upload", fd,
            function (data) {
                ex.smsg(data.Titulo, data.Texto, data.Escondido);
            });
    }
}



$(document).ready(function () {
    AplicarMascaras();
    $("#tabs").sedTabControl();

    $("#login-rg .form-control").on("keyup keypress blur change", function () {
        concluinte.gerarLoginRg();
    });

    $("#NumeroRNE").on("keyup keypress blur change", function () {
        concluinte.gerarLoginRne();
    });
    Mensagem.IgnorarMensagensAutomaticas = true;

    $("#divComboEscola").hide();
    $("#divComboRedeEnsino").hide();
    $("#divComportamentoDiretorSecretario").hide();

    $("#ddlPerfil").change(function () {
        var perfilAtual = $("#ddlPerfil").val().split("|");
        if (perfilAtual[1] === "3") {
            if ($("#escola").val() == "") {
                $("#divAssociadosEscola").hide();
            } else {
                $("#divAssociadosEscola").show();

            }
            $("#divAssociadosEscola").empty();
            $("#divComboEscola").show();
            $("#divComboRedeEnsino").show();
            $("#divComportamentoDiretorSecretario").show();
            perfil.buscarConcluintes();
        } else {
            if (perfilAtual[0] != 1403) {
                $("#divComboDiretoria").hide();
            }
            else {
                $("#divComboDiretoria").show();
            }

            $("#divComboEscola").hide();
            $("#divComboRedeEnsino").hide();
            $('#escola').val("");
            $("#divComportamentoDiretorSecretario").hide();
        }

        if (perfilAtual[1] === "2") {
            $("#divAssociadosEscola").show();
            $("#divComportamentoDiretorSecretario").show();
            perfil.buscarConcluintes();
        }
        if (perfilAtual[1] === "1" && perfilAtual[0] != 1215) {
            $("#divAssociadosEscola").show();
            $("#divComportamentoDiretorSecretario").show();
            perfil.buscarConcluintes();
        }
    });
    $('#diretoria').autoPreencher($('#redeEnsino'), 'RedeEnsino', 'CarregarListaRedeEnsinoPorDiretoriaTipo', [{ codDiretoria: 'diretoria' }]);
    $('#redeEnsino').autoPreencher($('#escola'), 'Escola', 'CarregarListaEscolaTodaRedeEnsino', [{ CodigoDiretoria: 'diretoria', CodigoRedeEnsino: 'redeEnsino', FlParalisada: 'hdnParalisada' }]);
    //$('#diretoria').autoPreencher($('#escola'), 'Escola', 'CarregarListaEscolaTodaRedeEnsino', [{ CodigoDiretoria: 'diretoria', CodigoRedeEnsino: 1, FlParalisada: 'hdnParalisada' }]);
    
    $('#diretoria').change(function () {
        if ($("#divAssociadosEscola:visible").length > 0) {
            perfil.buscarConcluintes();
        }
    });

    $('#escola').change(function () {
        perfil.buscarConcluintes();
    });
});