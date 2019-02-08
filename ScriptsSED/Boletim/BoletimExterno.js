var reload = false;
var dadosMatricula = null;

$(document).ready(function () {
    AplicarMascaras();

    $("#AnoLetivo").focus().on('focus', function () { $(this).select() });
    ValidarPesquisa();

    $('.pesquisaRA').blur(function () {
        carregarMatriculas();
    });

    $("#AnoLetivo").blur(function () {
        $('#CodEscola, #CodTurma').empty();
        $('#CodEscola, #CodTurma').find('option').remove().end().append('<option value="">Selecione...</option>').val("");
    });
});

function carregarListaTurmaPorAluno() {
    var codigoEscola = parseInt($('#CodEscola').val());

    $("#CodTurma").html("");
    $("#CodTurma").append("<option>Selecione...</option>")
    for (var i = 0; i < dadosMatricula.length; i++) {
        var ma = dadosMatricula[i];
        if (ma.CodigoEscola != codigoEscola) continue;
        var item = $("#CodTurma option[value='" + ma.CodigoMatriculaAluno + "']");
        if (item.length == 0) {
            $("#CodTurma").append("<option value='" + ma.CodigoMatriculaAluno + "'>" + ma.NomeTurma + "</option>");
        }
    }
}

function carregarMatriculas() {

    if ($("#RA_DataNascimento").val() == "" || $("#RA_Numero").val() == "")
        return;

    Mensagem.IgnorarMensagensAutomaticas = true;
    $.ajax({
        cache: false,
        url: '/Boletim/CarregarListaMatriculas',
        type: 'POST',
        datatype: 'json',
        data: $('#frmFiltroBoletim').serialize(),
        success: function (datasource, status, jqXHR) {
            dadosMatricula = JSON.parse(datasource);
            preencherEscolas();
        },
        error: window.tratadorJSONException,
    });
}

function preencherEscolas() {
    $("#CodEscola").html("");
    $("#CodEscola").append("<option>Selecione...</option>")
    for (var i = 0; i < dadosMatricula.length; i++) {
        var ma = dadosMatricula[i];
        var item = $("#CodEscola option[value='" + ma.CodigoEscola + "']");
        if (item.length == 0) {
            $("#CodEscola").append("<option value='" + ma.CodigoEscola + "'>" + ma.NomeEscola + "</option>");
        }
    }
}

var ValidarPesquisa = function () {
    $('#frmFiltroBoletim').validate({
        rules: {
            AnoLetivo: { required: true, number: true, min: 2007, max: new Date().getFullYear() },
            'RA.Numero': { required: true, number: true },
            'RA.Digito': { required: false, digRG: true },
            'RA.UF': { required: true },
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
                min: 'Informe um ano letivo igual ou maior a 2007',
                max: 'Informe um ano letivo igual ou menor que ' + new Date().getFullYear(),
                number: 'Somente números'
            },
        }
    });
}

function Pesquisar(data) {
    if (data != undefined) {
        if (data == true) {
            if ($('#frmFiltroBoletim').valid() == false) {
                return;
            }

            Mensagem.AdicionarCallback(function (msg) {
                if (msg.find('.aviso').length != 0) {
                    msg.find('button').click(function () {
                        location.reload();
                    });
                }
            });

            $.ajax({
                cache: false,
                url: '/Boletim/PesquisarBoletimExterno',
                type: 'POST',
                datatype: 'html',
                data: { AnoLetivo: $("#AnoLetivo").val(), CodigoMatriculaAluno: $("#CodTurma").val(), "RA.Numero": $("#RA_Numero").val(), "RA.Digito": $("RA_Digito").val(), "RA.UF": $("#RA_UF").val() },
                traditional: true,
                success: function (data) {
                    $('#resultado').hide();
                    $('#resultado').html(data);
                    $('#fdsPesquisa').slideUp(300);
                    $('#resultado').slideDown(300);
                }
            });
        }
        else {
            $.ajax({
                url: "/Boletim/PartialCaptcha",
                type: "GET",
                success: function (data) {
                    $(".sed-captcha").html(data);
                },
                error: function (data) {
                    $(".sed-captcha").html("ops...");
                }

            });
        }
    }
}

function voltar() {
    $('#resultado').slideUp(300, function () {
        $("#resultado").html("");
    });

    $('#fdsPesquisa').slideDown(300);
}