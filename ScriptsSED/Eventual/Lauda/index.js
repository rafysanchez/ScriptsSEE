$(document).ready(function () {
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
                mesPublicacao: $("#mes option:selected").val()
            };
           
            $.ajax({
                url: "/Eventual/PesquisarLauda",
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
});

function gerarLauda(codigoLauda) {
    var filtros = {
        codigoLauda: parseInt(codigoLauda)
    };
    $.ajax({
        url: "/Eventual/GerarLauda",
        type: "POST",
        data: filtros,
        success: function (data, textStatus, xhr) {
            $("<div id='modalLauda'>" + data + "</div>").dialog({
                title: "Lauda",
                destroy: true
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}
function exibirMsgDataPublicacao() {
    Mensagem.Alert({
        titulo: "Lauda",
        mensagem: "Essa lauda já teve a data de publicação alterada!",
        tipo: "aviso", // aviso, erro, sucesso, alerta
        botao: "Fechar"
    });
}
function baixarArquivo(codigoLauda, anoCriacao) {
    window.open("/eventual/BaixarArquivoLauda?codigoLauda=" + parseInt(codigoLauda) + "&anoCriacao=" + parseInt(anoCriacao), "_blank");
}
function visualizar(codigoLauda) {
    var filtros = {
        codigoLauda: parseInt(codigoLauda)
    };
    $.ajax({
        url: "/Eventual/GerarLauda",
        type: "POST",
        data: filtros,
        success: function (data, textStatus, xhr) {
            $("<div id='modalLauda'>" + data + "</div>").dialog({
                title: "Lauda",
                destroy: true
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}
function editar(codigoLauda) {
    var filtros = {
        codigoLauda: parseInt(codigoLauda)
    };
    $.ajax({
        url: "/Eventual/EditarLauda",
        type: "POST",
        data: filtros,
        success: function (data, textStatus, xhr) {
            $("<div id='modalLauda'>" + data + "</div>").dialog({
                title: "Lauda",
                focusElement: "dataPublicacaoAtualizada",
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
        botao:"Fechar"
    });
}