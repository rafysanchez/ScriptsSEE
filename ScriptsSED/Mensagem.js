var ex = {
    get: function (url, obj, cbSuccess, cbError) {
        $.ajax({
            url: url,
            type: "GET",
            data: obj,
            success: function (data) { cbSuccess(data); },
            error: function (data) { cbError(data) }
        });
    },

    msg: function (titulo, msg, tipo, botoes) {
        if (botoes == null) {
            Mensagem.Alert({ mensagem: msg, tipo: tipo, titulo: titulo, botao: "Fechar" });
        }
        else {
            Mensagem.Alert({ mensagem: msg, tipo: tipo, titulo: titulo, botoes: botoes });
        }
    }
}

var mensagem = {
    cadastrar: function (codigo) {
        ex.get("/Mensageria/Cadastrar", { codigo: codigo },
            function (data) {
                $("#dialogMensagem").html(data);
                var title = codigo == 0 ? "Cadastrar Mensagem" : "Editar Mensagem";
                $("#dialogMensagem").dialog({ modal: true, title: title, width: 900 });
            },
            function (data) {
                ex.msg("Erro", data.statusText, "Erro");
            });
    },

    adicionarAbrangencia: function () {
        var linha = $("<tr></tr>");
        
        if ($("#diretoriaCadastro").val() == "Todas" || $("#diretoriaCadastro").val() == null || $("#diretoriaCadastro").val() == "") {
            ex.msg("Abrangência", "Favor selecionar uma diretoria!!", "Alerta");
            return;
        }
        
        var dir = $("<td></td>");
        dir.attr("data-diretoria", $("#diretoriaCadastro").val());
        dir.html($("#diretoriaCadastro option:selected").text());

        var esc = $("<td></td>");
        esc.attr("data-escola", $("#escolaCadastro").val());
        if ($("#escolaCadastro").val() != "") {
            esc.html($("#escolaCadastro option:selected").text());
        }
        else {
            esc.html("Todas");
        }

        var ser = $("<td></td>");
        ser.attr("data-serie", $("#serieCadastro").val());
        if ($("#serieCadastro").val() != "") {
            ser.html($("#serieCadastro option:selected").text());
        }
        else {
            ser.html("Todas");
        }

        var rem = $("<td><i class='icone-tabela-excluir' onclick='$(this).parent().parent().remove()'></i></td>")

        linha.append(dir);
        linha.append(esc);
        linha.append(ser);
        linha.append(rem);

        $("#abrangencia tbody").append(linha);

        //$("#diretoriaCadastro").val("0");
        $("#diretoriaCadastro")[0].selectedIndex = 0;
        $("#diretoriaCadastro").trigger("change");
        $("#escolaCadastro").val("");
        $("#escolaCadastro").trigger("change");
        $("#serieCadastro").val("");
    },

    salvar: function () {
        var perfis = [];
        $("[name=perfil]:checked").each(function (i, e) {
            perfis.push($(e).val());
        });

        var model = {
            Codigo: $("#codigo").val(),
            Descricao: $("#descricao").val(),
            Inicio: $("#inicio").val(),
            Fim: $("#fim").val(),
            Periodicidade: $("#periodicidade").val(),
            Horario: $("#horario").val(),
            Perfis: perfis,
            DiretoriasEscolas: []
        };

        $("#abrangencia tbody tr").each(function (i, e) {
            var diretoria = $(e).find("td").eq(0).attr("data-diretoria");
            var escola = $(e).find("td").eq(1).attr("data-escola");
            var ste = $(e).find("td").eq(2).attr("data-serie");
            var serie = ste.split("-")[0];
            var tipoEnsino = ste.split("-")[1];
            var o = {};
            o.CodigoDiretoria = diretoria == "Todas" ? 0 : parseInt(diretoria);
            o.CodigoEscola = escola == "" ? 0 : parseInt(escola);
            o.CodigoSerie = serie == "" ? 0 : parseInt(serie);
            o.CodigoTipoEnsino = tipoEnsino == "" ? 0 : parseInt(tipoEnsino);
            model.DiretoriasEscolas.push(o);
        });

        $.ajax({
            url: "/Mensageria/Salvar",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(model),
            success: function (data) {
                ex.msg("Sucesso", "Mensagem salva com sucesso", "sucesso",
                    [{
                        botao: "Fechar",
                        callback: function () {
                            mensagem.pesquisar();
                            $("#dialogMensagem").dialog("close");
                        }
                    }]);
            },
            error: function (data) {
                ex.msg("Erro", data.statusText, "Erro");
            }
        });
    },

    pesquisar: function () {
        ex.get("/Mensageria/Pesquisar", {
            codigoDiretoria: $("#codigoDiretoria").val(),
            codigoEscola: $("#codigoEscola").val(),
            codigoPerfil: $("#codigoPerfil").val()
        },
        function (data) {
            $("#parcialTabela").html(data);
            $("#tabelaDados").sedDataTable();
        },
        function (data) {
            ex.msg("Erro", data.statusText, "Erro");
        });
    },

    excluir: function (codigo) {

        ex.msg("Excluir Mensagem", "Tem certeza que deseja excluir a mensagem selecionada?", "alerta",
            [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        url: "/Mensageria/Excluir",
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({ codigo: codigo }),
                        success: function (data) {
                            ex.msg("Sucesso", "Mensagem excluida com sucesso", "sucesso",
                                [{
                                    botao: "Fechar",
                                    callback: function () {
                                        mensagem.pesquisar();
                                    }
                                }]);
                        },
                        error: function (data) {
                            ex.msg("Erro", data.statusText, "Erro");
                        }
                    });
                }
            },
            {
                botao: "Não",
                callback: function () { $.unblockUI(); }
            }
            ])

        
    }
}
$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#codigoDiretoria").autoPreencher($("#codigoEscola"), "Escola", "CarregarListaEscolas", null, null, null, null, function () {

    });
})