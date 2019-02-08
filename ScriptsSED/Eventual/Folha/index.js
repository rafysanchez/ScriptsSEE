$(document).ready(function () {
    AplicarMascaras();
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#formPesquisar").validate({
        rules: {
            anoExercicio: {
                required: true
            },
        },
        submitHandler: function (form) {

            var filtros = {
                anoExercicio: $("#anoExercicio").val(),
                mesPublicacao: $("#mesPublicacao option:selected").val()
            };

            $.ajax({
                url: "/Eventual/PesquisarArquivoFolha",
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

    $("#tbFolhaEventual").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });

});
function visualizar(codigoArquivoFolha) {
    var filtros = {
        codigoFolha: parseInt(codigoArquivoFolha)
    };
    $.ajax({
        url: "/Eventual/VisualizarArquivoFolha",
        type: "POST",
        data: filtros,
        success: function (data, textStatus, xhr) {
            $("<div id='modalFolha'>" + data + "</div>").dialog({
                title: "Eventuais",
                destroy: true
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}

function baixarArquivo(codigoArquivoFolha, anoCriacao, dataCriacao) {

    //window.open("/Eventual/BaixarArquivoFolha?codigoArquivoFolha=" + parseInt(codigoArquivoFolha) + "&anoCriacao=" + parseInt(anoCriacao), "_blank");

    //var openedAds = 0;
    //var AdsToOpen = ["/Eventual/BaixarArquivoFolha?codigoArquivoFolha=" + parseInt(codigoArquivoFolha) + "&anoCriacao=" + parseInt(anoCriacao),
    //                "/Eventual/BaixarArquivoCadastroManual?codigoArquivoFolha=" + parseInt(codigoArquivoFolha) + "&anoCriacao=" + parseInt(anoCriacao)];
    //var interval;

    //var interval = setInterval(function () {
    //    window.open(AdsToOpen[openedAds], "_blank");
    //    //window.location.href = AdsToOpen[openedAds]
    //    openedAds += 1;
    //    if (openedAds === AdsToOpen.length) {
    //        clearInterval(interval);
    //    }
    //}, 2000);


    var filtros = {
        codigoArquivoFolha: parseInt(codigoArquivoFolha),
        anoCriacao: parseInt(anoCriacao),
        dataCriacao: dataCriacao
    };
    $.ajax({
        url: "/Eventual/BaixarArquivoFolha",
        type: "POST",
        data: filtros,
        success: function (data, textStatus, xhr) {
            if (data.status == "OK") {
                window.location.href = "/Eventual/DownLoad";
            }
            var interval = setInterval(function () {
                baixaArquivoCadastroManual(codigoArquivoFolha, anoCriacao, dataCriacao);
                clearInterval(interval);
            }, 2000);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}

function baixaArquivoCadastroManual(codigoArquivoFolha, anoCriacao, dataCriacao) {
    var filtros = {
        codigoArquivoFolha: parseInt(codigoArquivoFolha),
        anoCriacao: parseInt(anoCriacao),
        dataCriacao: dataCriacao
    };
    $.ajax({
        url: "/Eventual/BaixarArquivoCadastroManual",
        type: "POST",
        data: filtros,
        success: function (data, textStatus, xhr) {
            if (data.status == "OK") {
                window.location.href = "/Eventual/DownLoadCadastroManual"
            }
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