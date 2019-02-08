$(document).ready(function () {
    "use strict";

    var btnImportar = document.getElementById("btnImportar");
    var fileUploadImportacao = document.getElementById("fileImportacao");

    fileUploadImportacao.addEventListener('change', function () {
        $("#idDiv").empty();
    });

    btnImportar.addEventListener('click', function () {

        if ($('#Programa').val() == "0") {
            Mensagem.Alert({
                titulo: "Programa não selecionado.",
                mensagem: "Selecione o Programa de acordo com o Programa que consta no arquivo.",
                escondido: "",
                tipo: "alerta", 
                botao: "Fechar",
            });
        }        
        else if (fileUploadImportacao.value == '')
        {
            Mensagem.Alert({
                titulo: "Nenhum arquivo selecionado",
                mensagem: "Selecione uma planilha para realizar a importação.",
                escondido: "",
                tipo: "aviso", 
                botao: "Fechar",

            });
        }
        else
        {
            Mensagem.Alert({
                titulo: "Confirme a Importação",
                mensagem: 'O arquivo escolhido corresponde realmente ao programa selecionado?',
                tipo: "alerta",
                botoes: [
                    {
                        botao: "Sim",
                        callback: function () {
                            ImportarPlanilha();                            
                        }
                    },
                    {
                        botao: "Não"
                    }
                ]
            });
        }
        
    });

});





    