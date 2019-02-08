$(document).ready(function () {
    AplicarMascaras();
    Mensagem.IgnorarMensagensAutomaticas = true;
    var teste = $("#FormInserir").validate({
        rules: {
            'Ano': {
                required: true, number: true
            }
        }, 
        submitHandler: function () {
            return;
        } 
    });

    $('#arquivotexto').on('change', function (e) {
        var files = e.target.files;
        var ano = $('#Ano').val();
        var myID = 1;

        if (files.length > 0) {
            if (window.FormData !== undefined) {
                var data = new FormData();

                for (var x = 0; x < files.length; x++) {
                    data.append("file" + x, files[x]);
                };

                if (ano == "" || files.length == 0) {
                    $('#arquivotexto').val("");
                    Mensagem.Alert({
                        titulo: "Ajuda",
                        mensagem: $("<span>Favor informar o ano</span>")[0],
                        tipo: "aviso",
                        botao: "Fechar"
                    });
                }
                else {

                    $.ajax({
                        type: "POST",
                        url: '/EventualCargaRetornoFolha/UploadFile',
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
     
                        },
                        error: function (xhr, status, p3, p4) {
                            var err = "Error " + " " + status + " " + p3 + " " + p4;
                            if (xhr.responseText && xhr.responseText[0] == "{")
                                err = JSON.parse(xhr.responseText).Message;
                            console.log(err);
                        }
                    });
                }
            } else {
                alert("Este navegador não suporta upload de arquivo!");
            }
        };
    })
})


//FUNCOES COMUM
utils = {
    ajax: function (url, parametroController, retorno, dataType) {
        var ajaxExecucao = {
            cache: false,
            async: false,
            url: url,
            data: parametroController,
            type: "POST",
            dataType: dataType != undefined ? dataType : "html",
            sucess: retorno,
            error: utils.ajaxErro
        }
    },
    ajaxErro: function (erro) {
        $(document).ajaxStop(function () {
            Mensagem.Alert({
                titulo: "Erro",
                mensagem: "Ocorreu um erro durante o processamento: Detalhe: " + erro,
                tipo: "Erro",
                botao: "Fechar"
            });
        });
    },
    SetModal: function () {
        $("#dialog").dialog({
            autoOpen: false,
            modal: true,
            width: 800,
            title: "Carga de Retorno Folha Eventual",
            position: ["center", "top"],
            resizable: false,
            dragable: false,
            show: {
                effect: "blind",
                duration: 200
            },
            beforeClose: function (event, ui) {
            },
            close: function (event, ui) {
            }
        });
    }


};



function Importar() {
    var ano = $('#Ano').val();
    var arquivos = $('#arquivotexto').val();

    if (ano == "" || arquivos == "") {
        $('#arquivotexto').val("");
        Mensagem.Alert({
            titulo: "Ajuda",
            mensagem: $("<span>Favor informar o ano ou arquivo</span>")[0],
            tipo: "aviso",
            botao: "Fechar"
        });
        return false;
    }

        $.ajax({
            type: 'POST',
            url: '/EventualCargaRetornoFolha/Importar?ano=' + ano,
            success: function (data, textStatus, xhr) {
                if (data.TipoException == "sucesso") {
                    Mensagem.Alert({
                        titulo: data.Title,
                        mensagem: data.Message,
                        tipo: "sucesso",
                        botao: "Fechar"
                    });
                } else {
                    Mensagem.Alert({
                        titulo: data.Title,
                        mensagem: data.Message,
                        tipo: data.TipoException,
                        botao: "Fechar"
                    });
                }
            },
            error: function (data, textStatus, xhr) {
                Mensagem.Alert({
                    titulo: data.Title,
                    mensagem: data.Message,
                    tipo: data.TipoException,
                    botao: "Fechar"
                });
            }

        });

    $('#arquivotexto').val("");
};

function Pesquisar() {
    var ano = $('#Ano').val();
    var arquivos = $('#arquivotexto').val();

    if (ano == "") {
        alert('Preencha o campo ano');
        $('#Ano').focus();
        return false;
    }
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
