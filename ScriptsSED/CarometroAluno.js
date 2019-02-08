$(document).ready(function () {
    PreenchimentoAutomatico();
    AplicarMascaras();
    ValidarFiltro();
    Pesquisar();    
});

var PreenchimentoAutomatico = function () {
    $('#AnoLetivo').verificarAnoLetivo($('#CodigoDiretoria'), 'Diretoria', 'CarregarListaDiretorias');
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: "'CodigoEscola'", AnoLetivo: "'AnoLetivo'" }]);
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "'CodigoEscola'", CodigoTipoEnsino: "'CodigoTipoEnsino'", AnoLetivo: "'AnoLetivo'" }]);
    $('#CodigoTurma').autoPreencher($('#CodigoSubTurma'), 'SubTurma', 'CarregarListaSubTurma', [{ CodigoTurma: "'CodigoTurma'" }]);
}

var TratarValorNumerico = function (valor) {
    if (valor == undefined) {
        return 0;
    }

    if (valor == '') {
        return 0;
    }

    if (isNaN(valor)) {
        return 0;
    }

    return parseInt(valor);
}

var ValidarFiltro = function () {
    $('#frmFiltro').validate({
        rules: {
            AnoLetivo: { 
                required: true 
            },
            CodigoDiretoria: { 
                required: true 
            },
            CodigoEscola: {
                required: true 
            },
            CodigoTipoEnsino: { 
                required: true 
            },
            CodigoTurma: { 
                required: true 
            }
        }
    });
}

var Pesquisar = function () {
    $('#btnPesquisar').click(function () {
        if ($('#frmFiltro').valid() == false) {
            return;
        }

        $.ajax({
            cache: false,
            url: '/CarometroAluno/Pesquisar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigoTurma: TratarValorNumerico($('#CodigoTurma').val()),
                codigoSubTurma: TratarValorNumerico($('#CodigoSubTurma').val())
            },
            success: function (data) {
                $('#resultado').html(data);
                PesquisarFoto();                
            }
        });
    });
}

var PesquisarFoto = function () {
    $('.aluno').each(function () {
        var CodigoAluno = $(this).attr('codigoAluno');
        var imagem = $(this).find('img');

        $.ajax({
            async: true,
            global: false,
            cache: false,
            url: '/CarometroAluno/RecuperarFotoAluno',
            data: {
                codigoAluno: CodigoAluno
            },
            success: function (data) {
                if (data.UrlFoto == '') {
                    $(imagem).attr('src', 'https://sedseecdn.azureedge.net/sed/imagens/img_fotoAusente.gif');
                } else {
                    $(imagem).attr('src', data.UrlFoto);
                }

                VerificarBotaoImprimir();
            },
            error: function () {
                $(imagem).attr('src', 'https://sedseecdn.azureedge.net/sed/imagens/img_fotoErro.gif');
                VerificarBotaoImprimir();
            }
        })
    });
}

var VerificarBotaoImprimir = function () {
    if ($('.fotoAluno[src="https://sedseecdn.azureedge.net/sed/imagens/img_fotoCarregando.gif"]').length == 0) {
        $('#btnImprimir').removeAttr('disabled');
        $('#btnImprimir').attr('href', '/CarometroAluno/Imprimir');
    }
}