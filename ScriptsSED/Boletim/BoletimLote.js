$(document).ready(function () {
    $('#filt-anoLetivo').prop('disabled', false).blur(function () {
        if ($('#filt-tipoEnsino').val() != "") {
            $('#filt-tipoEnsino').trigger("change");
        }
    });

    //$('#Diretoria').autoPreencher($('#Escola'), 'Escola', 'CarregarListaEscolas');
    //$('#Escola').autoPreencher($('#TipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'Escola', AnoLetivo: 'AnoLetivo' }]);
    //$('#TipoEnsino').autoPreencher($('#Turma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: 'Escola', CodigoTipoEnsino: 'TipoEnsino', AnoLetivo: 'AnoLetivo' }], undefined);

    $('#formFiltro').validate({
        rules: {
            AnoLetivo: { required: true, number: true, min: 2014, max: new Date().getFullYear() },
            Diretoria: { required: true },
            Escola: { required: true },
            TipoEnsino: { required: true },
            Turma: { required: true }
        },
        messages: {
            AnoLetivo: {
                number: "Somente números",
                min: "Inserir ano letivo maior ou igual a 2014",
                max: 'Informe um ano letivo igual ou menor que ' + new Date().getFullYear(),
            },
        },
        submitHandler: function (form) {
            gerarBoletim($('#filt-anoLetivo').val(), $("#filt-turma").val());
            return;
        }
    });

    Mensagem.IgnorarMensagensAutomaticas = true;
});

function gerarBoletim(anoLetivo, turma) {
    $.ajax({
        cache: false,
        url: '/Boletim/BoletimLotePdf',
        type: 'POST',
        datatype: 'JSON',
        data: {
            codigoTurma: turma,
            anoLetivo: anoLetivo
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            if (data.AnoLetivo == 0) {
                Mensagem.IgnorarMensagensAutomaticas = true;

                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "Não foram encontradas informações para a geração do boletim",
                    tipo: "alerta",
                    botao: "Fechar",
                    callback: function(){
                        Mensagem.IgnorarMensagensAutomaticas = false;
                    	Mensagem.Fechar();
                    }
                });
            } else {
                boletimPdf.gerar(data);
            }
            
        },
        error: window.tratadorJSONException
    });
};