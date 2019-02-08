$(document).ready(function () {
    AplicarMascaras();
    Mensagem.IgnorarMensagensAutomaticas = true;
    var teste = $("#FormInserir").validate({
        rules: {
            'Ano': {
                required: true, number: true
            },
            'Semestre': {
                required: true
            }
        },
        submitHandler: function () {
            return;
        }
    });

    $('#arquivoexcel').on('change', function (e) {
        var files = e.target.files;
        var ano = $('#Ano').val();
        var semestre = $('#Semestre').val();
        var myID = 1;

        if (files.length > 0) {
            if (window.FormData !== undefined) {
                var data = new FormData();

                for (var x = 0; x < files.length; x++) {
                    data.append("file" + x, files[x]);
                };

                if (ano == "" || semestre == "" || files.length == 0) {
                    $('#arquivoexcel').val("");
                    Mensagem.Alert({
                        titulo: "Ajuda",
                        mensagem: $("<span>Favor informar o ano ou semestre</span>")[0],
                        tipo: "aviso",
                        botao: "Fechar"
                    });
                }
                else {

                    $.ajax({
                        type: "POST",
                        url: '/MaterialEscolarCarga/UploadFile?ano=' + ano + '&semestre=' + semestre,
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            $("#divConfirmaExcluirCarga").dialog({
                                resizable: false,
                                height: 148,
                                modal: true,
                                title: "Material Escolar Carga",
                                buttons: {
                                    "Manter": function () {
                                        $('#divConfirmaExcluirCarga').dialog('close');
                                        Confirmar(0);
                                    },
                                    'Substituir': function () {
                                        $("#divConfirmaExcluirCarga").dialog('close');
                                        Confirmar(1);
                                    }
                                }
                            }).empty().append('<p>Manter ou substituir os itens se existirem?</p>');
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

function mostrarAjudaCarga() {
    Mensagem.Alert({
        titulo: "Ajuda",
        mensagem: $("<span>Planilha Excel .xlsx com os seguintes campos coluna (A) - código escola (número),  coluna (B) - código diretoria (número), coluna (C) - tipo de escola (número), coluna (D) - quantidade (número), coluna (E) - ano (número), coluna (F) - disciplina (número), coluna (G) - tipo de ensino, coluna (H) - previsão de entrega (data) Ex. 31.07.2018</span>")[0],
        tipo: "aviso",
        botao: "Fechar"
    });
}

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
            title: "Material Escolar Carga",
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


function Confirmar(parametro, files) {
    var ano = $('#Ano').val();
    var semestre = $('#Semestre').val();
    var arquivos = $('#arquivoexcel').val();

    if (parametro == 0) {
        $.ajax({
            type: 'POST',
            url: '/MaterialEscolarCarga/Importar?ano=' + ano + '&semestre=' + semestre + '&sobrescrever=0' + '&arquivo=' + files,
            success: function () {
            },
            error: function () {
            }
        });
    }
    else {
        $.ajax({
            type: 'POST',
            url: '/MaterialEscolarCarga/Importar?ano=' + ano + '&semestre=' + semestre + '&sobrescrever=1' + '&arquivo=' + files,
            success: function () {
            },
            error: function () {
            }
        });
    }


};

function Pesquisar() {
    var ano = $('#Ano').val();
    var semestre = $('#Semestre').val();
    var arquivos = $('#arquivoexcel').val();

    if (ano == "") {
        alert('Preencha o campo ano');
        $('#Ano').focus();
        return false;
    }
}