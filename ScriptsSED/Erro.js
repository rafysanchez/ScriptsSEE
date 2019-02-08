$(document).ready(function () {
    ConfigurarPesquisa();
    PesquisarLog();
});

var ConfigurarPesquisa = function () {

    $('#ddlPeriodo').change(function () {
        $('#txtDataInicial').val('');
        $('#txtDataFinal').val('');

        if ($(this).val() == '') {
            $('#periodoPersonalizado').hide({
                effect: "drop",
                duration: 200
            });
            return;
        } else if ($(this).val() == '0') {
            $('#periodoPersonalizado').show({
                effect: "drop",
                duration: 200
            });
            return;
        } else {
            $('#periodoPersonalizado').hide({
                effect: "drop",
                duration: 200
            });
        }

        PesquisarLog();
    });
    $('#divDialogExcluir').hide();
    $('#periodoPersonalizado').hide();
    PesquisarLog();
    AplicarMascaras();
}

var PesquisarLog = function () {

    if ($('#periodoPersonalizado').is(":visible")) {02
        $('#periodoPersonalizado').validate({
            rules: {
                txtDataInicial: { required: true },
                txtDataFinal: { required: true }
                }
        });
        if ($('#periodoPersonalizado').valid() == false) {
            return;
        }
    }
    $.ajax({
        cache: false,
        url: '/Erro/LogEvento',
        type: 'POST',
        datatype: 'HTML',
        data: {
            tipoPeriodo: $('#ddlPeriodo').val(),
            dataInicial: $('#txtDataInicial').val(),
            dataFinal: $('#txtDataFinal').val()
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#grid').html(data);
            $('.tabela').sedDataTable({
                aaSorting: [[0, "desc"]],
                title: "Log de Erros",
                nomeExportacao: "Log de Erros"
            });
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

var ExcluirLog = function () {
    $('#divDialogExcluir').dialog({
        title: 'Excluir Log de Erros',
        destroy: false,
        beforeClose: function (event, ui) {
            $('#txtDataExclusao').val('');
        }
    });

    $('#btnExcluir').click(function () {
        $('#divFrmExclusao').validate({
            rules: {
                txtDataExclusao: { required: true },
            }
        });

        $('#divDialogExcluir').dialog({ title: "Excluir Log de Erros" });
    });

    $('#btnExcluirLog').click(function () {
        $.ajax({
            cache: false,
            url: '/Erro/ExcluirLog',
            type: 'POST',
            datatype: 'HTML',
            data: {
                dataLimite: $('#txtDataExclusao').val()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == true) {
                    $('#divDialogExcluir').dialog('close');
                }
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
