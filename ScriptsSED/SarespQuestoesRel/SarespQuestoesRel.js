$(document).ready(function () {


    //$('#Diretoria').autoPreencher($('#Escola'), 'Escola', 'CarregarListaEscolas');
    //$('#Escola').autoPreencher($('#TipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'Escola', AnoLetivo: 'AnoLetivo' }]);

    $('#formFiltro').validate({
        rules: {
            AnoLetivo: { required: true, number: true, min: 2014, max: new Date().getFullYear() },
            Diretoria: { required: true }

            //Diretoria: { required: true },
            //Escola: { required: true }
        },
        messages: {
            AnoLetivo: {
                number: "Somente números",
                min: "Inserir ano letivo maior ou igual a 2014",
                max: 'Informe um ano letivo igual ou menor que ' + new Date().getFullYear(),
            },
        },
        submitHandler: function (form) {
            gerarSarespQuestoesRel($('#AnoLetivo').val(), $("#Diretoria").val());
            return;
        }
    });

    Mensagem.IgnorarMensagensAutomaticas = true;
});

function gerarSarespQuestoesRel(anoLetivo,diretoria) {
    $.ajax({
        cache: false,
        url: '/SarespQuestoesRel/SarespQuestoesRelPdf',
        type: 'POST',
        datatype: 'JSON',
        data: {
            codigoDiretoria: diretoria,
            anoLetivo: anoLetivo
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            if (data.AnoLetivo == 0) {
                Mensagem.IgnorarMensagensAutomaticas = true;

                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "Não foram encontradas informações para a geração do Relatório Questionários Alunos/Responsáveis",
                    tipo: "alerta",
                    botao: "Fechar",
                    callback: function () {
                        Mensagem.IgnorarMensagensAutomaticas = false;
                        Mensagem.Fechar();
                    }
                });
            } else {
                try { // statements to try
                    SarespQuestoesRelPdf.gerar(data);
                }
                catch (e) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "Não foi possível a geração do PDF. Favor tentar novamente.",
                        tipo: "alerta",
                        botao: "Fechar",
                        callback: function () {
                            Mensagem.IgnorarMensagensAutomaticas = false;
                            Mensagem.Fechar();
                        }
                    });
                }

            }

        },
        error: window.tratadorJSONException
    });
};