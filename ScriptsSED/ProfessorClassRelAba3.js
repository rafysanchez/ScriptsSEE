$(document).ready(function () {
    $("#filtroDE-diretoria").autoPreencher($("#filtroDE-escola"), "Escola", "CarregarListaEscolasUA", [{ id: "'filtroDEdiretoria'" }]);

    Mensagem.IgnorarMensagensAutomaticas = true;
    AplicarMascaras();

    $("#formPesquisar").validate({
        rules: {
            filtroDEanoExercicio: {
                required: true
            }
        },
        submitHandler: function (form) {
            if ($('#filtroDE-anoExercicio').val() == "") {
                return;
            }

            $("#filtroDE-anoExercicio").removeClass("error");

            var t = 0;

            if ($("#filtroDE-diretoria").val() == "")
                t = 1;
            else if ($("#filtroDE-diretoria").val() != "" && $("#filtroDE-escola").val() == "")
                t = 2;
            else
                t = 3;


            var filtros = {
                anoExercicio: $('#filtroDE-anoExercicio').val(),
                codigoDiretoria: $("#filtroDE-diretoria").val(),
                CD_UNIDADE_ADMIN: $("#filtroDE-escola").val(),
                tela: t
            };
            $.ajax({
                url: "/ProfessorClassRelAba3/Pesquisar",
                type: "POST",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    if (data == "") {
                        mensagemAlert("Não há informações, tente novamente.", "Detalhes", "alerta", "A sua busca foi bem sucedida, porém não existe nenhuma informação para ser exibida.");
                        return;
                    }

                    $("#divResulta").html(data);

                    $("#resultadoPesquisa1").sedDataTable({
                        columnDefs: [{
                            targets: "nosort",
                            orderable: true
                        }]
                    });

                    $("#resultadoPesquisa2").sedDataTable({
                        columnDefs: [{
                            targets: "nosort",
                            orderable: true
                        }]
                    });

                    $("#resultadoPesquisa3").sedDataTable({
                        columnDefs: [{
                            targets: "nosort",
                            orderable: true
                        }]
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
                }
            });
            return;
        }
    });

});

//Detalhes
function Detalhes(ano, codigo, codigoDiretoria, id) {
    var filtros = {
        anoExercicio: ano,
        codigoDiretoria: codigoDiretoria,
        CD_UNIDADE_ADMIN: codigo,
        tela: id
    };

    $.ajax({
        url: "/ProfessorClassRelAba3/Pesquisar",
        type: "POST",
        data: filtros,
        success: function (data, textStatus, xhr) {
            if (data == "") {
                mensagemAlert("Não há informações, tente novamente.", "Detalhes", "alerta", "A sua busca foi bem sucedida, porém não existe nenhuma informação para ser exibida.");
                return;
            }

            $("<div id='modalDetalhes'><div id=\"conteudo\"> <div id=\"gridmodal\">" + data + "</div></div></div>").dialog({
                title: "Detalhes",
                width: 1000,
                destroy: true
            });

            $("#resultadoPesquisa" + id).sedDataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
    
}

//SE PASSAR APENAS A MENSAGEM O RESTANTE É 
function mensagemAlert(msg, titulo, tipo, escondido) {
    Mensagem.Alert({
        mensagem: msg,
        titulo: titulo === undefined ? "Eventual" : titulo,
        tipo: tipo === undefined ? "Aviso" : tipo,
        escondido: escondido === undefined ? undefined : "Detalhes: \n" + escondido,
        botao: "Fechar"
    });
}