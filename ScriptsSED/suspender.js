
$(document).ready(function () {
    //carregar filtros
    //$('#filtroDE-anoExercicio').autoPreencher($('#filtroDE-diretoria'), 'Filtro', 'DiretoriasFiltradas', [{}]);
    //$('#filtroDE-diretoria').autoPreencher($('#filtroDE-escola'), 'Filtro', 'Escolas',
    //    [{ diretoria: "'filtroDEdiretoria'" }]);
    //$('#filtroDE-diretoria').autoPreencher($('#filtroDE-escola'), 'Escola', 'CarregarListaEscolasUA');
    $("#filtroDE-diretoria").autoPreencher($("#filtroDE-escola"), "Escola", "CarregarListaEscolasUA", [{ id: "'filtroDEdiretoria'"}]);

    $('#filtroDE-anoExercicio').trigger("change");

    Mensagem.IgnorarMensagensAutomaticas = true;
    AplicarMascaras();

    $("#formPesquisar").validate({
        rules: {
            filtroDEanoExercicio: {
                required: true
            },

            filtroDEdiretoria: {
                required: function () {
                    var cpf = $("#filtroDE-cpf").val();
                    var diretoria = $("#filtroDE-diretoria").val();
                    var rgNum = $("#filtroDE-rgNumero").val();
                    var rgDig = $("#filtroDE-rgDigito").val();
                    if ((cpf == "" || cpf == undefined) && (rgNum == "" || rgNum == undefined))
                        if (diretoria == "" || diretoria == undefined) {
                            return true;
                        }
                        else
                            return false;
                }
            },
            filtroDEescola: {
                required: function () {
                    var cpf = $("#filtroDE-cpf").val();
                    var escola = $("#filtroDE-escola").val();
                    var rgNum = $("#filtroDE-rgNumero").val();
                    var rgDig = $("#filtroDE-rgDigito").val();
                    if ((cpf == "" || cpf == undefined) && (rgNum == "" || rgNum == undefined))
                        if (escola == "" || escola == undefined) {
                            return true;
                        }
                        else
                            return false;
                }
            }
        },
        submitHandler: function (form) {
            var filtros = {
                anoExercicio: $('#filtroDE-anoExercicio').val(),
                codigoDiretoria: $("#filtroDE-diretoria").val(),
                escola: $("#filtroDE-escola").val(),
                cpf: $("#filtroDE-cpf").val().replace(/\./g, '').replace(/\-/g, ''),
                rgNumero: $("#filtroDE-rgNumero").val(),
                rgDigito: $("#filtroDE-rgDigito").val(),
                rgUf: $("#filtroDE-rgUf").val(),
                codigoStatus: $("#filtroDE-status").val()
            };



            filtros.codigoDiretoria = filtros.codigoDiretoria == "" || filtros.codigoDiretoria == undefined ? 0 : filtros.codigoDiretoria;
            filtros.codigoUA = filtros.codigoUA == "" || filtros.codigoUA == undefined ? 0 : filtros.codigoUA;
            filtros.codigoStatus = filtros.codigoStatus == "" || filtros.codigoStatus == undefined ? 0 : parseInt(filtros.codigoStatus);


            if (filtros == undefined)
                filtros.escola = "0";


            $("#filtroDE-anoExercicio").removeClass("error");
            $("#filtroDE-diretoria").removeClass("error");
            $("#filtroDE-escola").removeClass("error");

            $.ajax({
                url: "/Suspender/Pesquisar",
                type: "POST",
                data: filtros,
                success: function (data, textStatus, xhr) {

                    $("#divResulta").html(data);

                    $("#resultadoPesquisa").sedDataTable({
                        columnDefs: [{
                            targets: "nosort",
                            orderable: false
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


    $("#formCadastro").validate({
        rules: {},
        submitHandler: function (form) {
            alert("teste");

        }
    });
});


//VISULIZAR
function Visualizar(anoExercicio, cpf) {

    if (cpf == undefined || anoExercicio == undefined) {
        return;
    }

    $.ajax({
        url: "/Suspender/Visualizar",
        type: "POST",
        data: {
            anoExercicio: parseInt(anoExercicio),
            cpf: cpf
        },
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Visualizar - Suspensão/Encerramento de Contrato",
                width: 800,
                destroy: true
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}

//SUSPENDER
function Suspender(anoExercicio, cpf) {

    if (cpf == undefined || anoExercicio == undefined) {
        return;
    }

    $.ajax({
        url: "/Suspender/Suspender",
        type: "POST",
        data: {
            anoExercicio: parseInt(anoExercicio),
            cpf: cpf
        },
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Suspensão/Encerramento de Contrato",
                width: 800,
                destroy: true
            });
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