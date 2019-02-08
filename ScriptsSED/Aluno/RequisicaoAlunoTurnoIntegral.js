var reload = false;

$(document).ready(function () {
    
    $("#AnoLetivo").focus().on('focus', function () { $(this).select() });
    ValidarPesquisa();
    //Pesquisar(); //Comentar ao utilizar captcha

    $('.pesquisaRA').blur(function () {
        carregarListaEscolas();
    });

    $('#CodTurma, #CodEscola').change(function () {
        $(this).removeClass('fundoDestaqueAmarelo');
    });

    $('#btnPesquisar').click(function () {

                if ($('#frmFiltroBoletim').valid() == false) {
                    return;
                }

                $.ajax({
                    cache: false,
                    url: '/Aluno/PesquisarManifestacaoRequisicaoTurnoIntegral',
                    type: 'POST',
                    datatype: 'html',
                    data: $('#frmFiltroBoletim').serialize(),
                    traditional: true,
                    success: function (data) {
                        console.log(data);
                        if (data == "") {
                            return;
                        }

                        $('#fdsPesquisa').hide();
                        $('#resultado').html(data);

                        $('#resultado').show({
                            effect: 'bind',
                            duration: 100
                        });
                    }
                });
    });
});


function carregarListaEscolas() {

    var retornoforEach = false;
    $('.pesquisaRA').each(function () {
        if ($(this).val() == "" || $(this).val() == "0" || $(this).val() == "000000000000")
            retornoforEach = true;
    })
    if (retornoforEach) return;

    $.ajax({
        cache: false,
        url: '/Aluno/CarregaListaEscolas',
        type: 'POST',
        datatype: 'json',
        data: $('#frmFiltroBoletim').serialize(),
        tradicional: true,
        success: function (datasource, status, jqXHR) {
            if (status == "success") {
                $('#CodEscola, #CodTurma')
                    .addClass('fundoDestaqueAmarelo')
                    .find('option').remove().end().append('<option value="">Selecione...</option>').val("");

                if (datasource != null && datasource != "") {
                    var options = "<option value ='' selected='selected'>Selecione...</option>";
                    for (var i = 0; i < datasource.length; i++) {
                        options += '<option value="' + datasource[i].Value + '">' + datasource[i].Text + '</option>';
                    }
                    $("#CodEscola").html(options).focus();
                }
            }
        }
    });
}

function carregarListaTurmaPorAluno() {

    var codigoEscola = $("#CodEscola option:selected").val();
    var anoLetivo = $("#AnoLetivo").val();
    var ra = $("#RA_Numero").val();

    if (codigoEscola != "") {

        $.ajax({
            cache: false,
            url: '/Turma/CarregarListaTurmaPorEscola',
            type: 'POST',
            datatype: 'json',
            data: {
                'CodigoEscola': codigoEscola,
                'RA': ra,
                'AnoLetivo': anoLetivo
            },
            tradicional: true,
            success: function (datasource, status, jqXHR) {
                if (status == "success") {
                    $('#CodTurma')
                            .addClass('fundoDestaqueAmarelo')
                            .find('option').remove().end().append('<option value="">Selecione...</option>').val("");

                    if (datasource != null && datasource != "") {
                        var options = "<option value ='' selected='selected'>Selecione...</option>";
                        for (var i = 0; i < datasource.length; i++) {
                            options += '<option value="' + datasource[i].value + '">' + datasource[i].text + '</option>';
                        }
                        $("#CodTurma").html(options).focus();
                    }
                }
            }
        });
    }
}


var ValidarPesquisa = function () {
    $('#frmFiltroBoletim').validate({
        rules: {
            AnoLetivo: { required: true, number:true, min: 2014 },
            'RA.Numero': { required: true, number: true },
            'RA.UF':     { required: true },
            'RA.DataNascimento': { required: true, dataValida: true },
            CodEscola: { required: true },
            CodTurma: { required: true },
            CaptchaInputText: { required: true }
        },
        messages: {
            RA_Numero: {
                number: 'Somente números'
            },
            AnoLetivo: {
                min: 'Informe um ano letivo igual ou maior a 2014',
                number: 'Somente números'
            },
        }
    });
}


