$(document).ready(function () {
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ["CodigoEscola", "CodigoTipoEnsino"]);

    ValidacaoFormulario();
    // $("#txtInicioVigencia").datepicker();
    // $("#txtFimVigencia").datepicker();
    Cadastrar();
    AplicarMascaras();
});

// Função genérica para tratar valores numéricos.
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

var ValidacaoFormulario = function () {

    $('.form').validate({
        rules: {
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
            },
            CodigoDisciplina: {
                required: true
            },
            txtInicioVigencia: {
                dataValida: true
            },
            txtFimVigencia: {
                dataValida: true
            },
            txtCodigoCurso: {
                digits: true
            },
            txtHoraAula: {
                required: true,
                digits: true
            },
            txtNumeroGrade: {
                required: true,
                digits: true
            }
        },
        messages: {
            CodigoDiretoria: {
                required: "Obrigatório"
            },
            CodigoEscola: {
                required: "Obrigatório"
            },
            CodigoTipoEnsino: {
                required: "Obrigatório"
            },
            CodigoTurma: {
                required: "Obrigatório"
            },
            CodigoDisciplina: {
                required: "Obrigatório"
            },
            txtInicioVigencia: {
                dataValida: "Data inválida"
            },
            txtFimVigencia: {
                dataValida: "Data inválida"
            },
            txtCodigoCurso: {
                digits: "Somente números"
            },
            txtHoraAula: {
                required: "Obrigatório",
                digits: "Somente números"
            },
            txtNumeroGrade: {
                required: "Obrigatório",
                digits: "Somente números"
            }
        }
    });
}

var Cadastrar = function () {
    $('#btnCadastrarQuadroAula').click(function (e) {
        e.preventDefault();

        if ($('.form').valid() == false) {
            return;
        }

        $.ajax({
            cache: false,
            url: '/QuadroAula/Cadastrar',
            type: 'POST',
            datatype: 'json',
            data: {
                codigoTipoEnsino: TratarValorNumerico($('#CodigoTipoEnsino').val()),
                codigoTurma: TratarValorNumerico($('#CodigoTurma').val()),
                codigoDisciplina: TratarValorNumerico($('#CodigoDisciplina').val()),
                codigoTurno: TratarValorNumerico($('#CodigoTurno').val()),
                dtInicioVigencia: $('#txtInicioVigencia').val(),
                dtFimVigencia: $('#txtFimVigencia').val(),
                horaAulaSemana: TratarValorNumerico($('#txtHoraAula').val()),
                numeroGrade: TratarValorNumerico($('#txtNumeroGrade').val()),
                codigoCurso: TratarValorNumerico($('#txtCodigoCurso').val()),
                inIntegral: $('#chkIntegrado').is(':checked'),
                inOficina: $('#chkOficina').is(':checked'),
            },
            traditional: true,
            success: function () {
                window.location.href = "/QuadroAula/Index";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop(function () {
                    Mensagem.Alert({
                        titulo: "Erro",
                        mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                        tipo: "Erro",
                        botao: "Fechar"
                    });
                });
            }
        });
    });
}