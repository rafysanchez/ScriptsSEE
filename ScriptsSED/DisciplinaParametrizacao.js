var nrMinimoAvaliacoes = 0;
var nrLimiteFalta = 0;
var dicaExibida = false;
var anoLetivo;

$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    $('#ddlAnoLetivoPesquisa').blur(function () {
        if ($('#ddlAnoLetivoPesquisa').val().length == 4) {
            $.ajax({
                url: "../TipoEnsino/CarregarListaTiposEnsino",
                data: { id: 0, AnoLetivo: $('#ddlAnoLetivoPesquisa').val() },
                type: "POST",
                success: function (data) {
                    $('#ddlTipoEnsinoPesquisa').empty();
                    $('#ddlTipoEnsinoPesquisa').append('<option>Selecione...</option>');
                    $(data).each(function () {
                        $('#ddlTipoEnsinoPesquisa').append('<option value = "' + this.value + '">' + this.text + '</option>');
                    });
                }
            });
        }
    });

    $('#ddlAnoLetivo').blur(function () {
        if ($('#ddlAnoLetivo').val().length == 4 && $('#ddlAnoLetivo').val() != anoLetivo) {
            anoLetivo = $('#ddlAnoLetivo').val();
            $.ajax({
                url: "../TipoEnsino/CarregarListaTiposEnsino",
                data: { id: 0, AnoLetivo: $('#ddlAnoLetivo').val() },
                type: "POST",
                success: function (data) {
                    $('#ddlTipoEnsinoCadastro').empty();
                    $('#ddlTipoEnsinoCadastro').append('<option>Selecione...</option>');
                    $(data).each(function () {
                        $('#ddlTipoEnsinoCadastro').append('<option value = "' + this.value + '">' + this.text + '</option>');
                    });
                }
            });
        }
    });

    $('#ddlTipoEnsinoPesquisa').autoPreencher($('#NR_SERIE'), 'TipoEnsino', 'CarregarListaSerie', undefined, undefined, undefined, undefined, function (e) {
        if ($('#NR_SERIE').children().length > 1 == "") {
            $('#divPesquisaSerie').hide();
        } else {
            $('#divPesquisaSerie').show();
        }
    });

    $('#ddlTipoEnsinoCadastro').autoPreencher($('#ddlSerieCadastro'), 'TipoEnsino', 'CarregarListaSerie', undefined, undefined, undefined, undefined, function (e) {
        $('#divListaDisciplinaParametrizacaoCadastro').empty();
        if ($('#ddlSerieCadastro').children().length == 1) {
            $('#dvTipoEnsino').hide();
            $.ajax({
                type: 'POST',
                url: 'ValidaSerie',
                data: { anoLetivo: $('#ddlAnoLetivo').val(), nrSerie: null, cdTipoEnsino: $('#ddlTipoEnsinoCadastro').val() },
                success: function (data) {
                    if (data)
                        $('#btnPesquisar').show();
                    else
                        $('#btnPesquisar').hide();
                }
            });
            $('.btnPesquisarCadastrar').show();
        } else {
            $('#dvTipoEnsino').show();
        }
    });

    $('.nrfaltas').val("");

    $("#btnPesquisar").click(function (e) {
        jQuery.validator.addClassRules('salva', {
            required: false
        });
        if ($(".formCadastro").valid()) {
            var url = "ListarDisciplinaParaParametrizacao";
            $.ajax({
                url: url,
                type: "POST",
                dataType: "html",
                data: {
                    AnoLetivo: $('#ddlAnoLetivo').val(),
                    NR_SERIE: $("#ddlSerieCadastro").val(),
                    cd_tipo_Ensino: $("#ddlTipoEnsinoCadastro").val()
                },
                success: function (data) {
                    $("#divListaDisciplinaParametrizacaoCadastro").empty().html(data);
                    $('#tabelaDadosCadastrar').sedDataTable({ "bPaginate": false, "bFilter": false });
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
        }
    });

    $('#btnCadastrar').click(function () {
        $('#ModalCadastrar').dialog({
            modal: true,
            draggable: true,
            title: "Cadastro de Parametrização de Disciplinas",
            width: 900,
            position: ['center', 0],
            show: {
                //effect: "slide",
                //duration: 500,
                position: { top: 500 },
            },
            hide: {
                //effect: "fold",
                //duration: 500
            },
            close: function () {
                $("#formCadastro :text").not('#ddlAnoLetivo').val("");
                $("#ddlTipoEnsinoCadastro  option:first").prop('selected', true).parent().trigger('change');
                $('#divListaDisciplinaParametrizacaoCadastro').empty();
            }
        });
    });
});

function ValidarAvaliacaoFrequencia(form) {

    var avaliacoes = form.find('.exiteAvaliacao').length;
    var avaliacoesCheckadas = form.find('.exiteAvaliacao:checked').length;
    var frequencias = form.find('.exiteFrequencia').length;
    var frequenciasCheckadas = form.find('.exiteFrequencia:checked').length;

    if (avaliacoesCheckadas < avaliacoes && frequenciasCheckadas < frequencias) {
        MarcarValidacoes(form);
        return confirm('Uma ou mais disciplina(s) consta(m) que não exige(m) avaliação(ões) e não exige(m) Frequência(s). Deseja continuar?');
    }

    if (avaliacoes === avaliacoesCheckadas && frequenciasCheckadas < frequencias) {
        MarcarValidacoes(form);
        return confirm('Uma ou mais disciplina(s) consta(m) que não exige(m) Frequência(s). Deseja continuar?');
    }

    if (avaliacoesCheckadas < avaliacoes && frequencias === frequenciasCheckadas) {
        MarcarValidacoes(form);
        return confirm('Uma ou mais disciplina(s) consta(m) que não exige(m) avaliação(ões). Deseja continuar?');
    }
    return true;
}

function MarcarValidacoes(form) {
    //var checkBoxes = form.find('.exiteAvaliacao, .exiteFrequencia').not(':checked');
    //checkBoxes.parents('tr').addClass('semAvaliacaoFrequencia');
    //checkBoxes.one('change', function () {
    //    $(this).parents('tr').removeClass('semAvaliacaoFrequencia');
    //});
}