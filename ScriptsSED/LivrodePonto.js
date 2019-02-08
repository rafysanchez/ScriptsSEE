$(document).ready(function () {
    AplicarMascaras();

    $("#formPesquisa").validate({
        rules: {
            AnoLetivo: { required: true },
            cboTpPesquisa: { required: true },
            txtCpf: { required: true },
            txtRg: { required: true },
        }
    });

    $('#btnPesquisar').click(function (e) {

        if ($("#txtCpf").val().length == 14) {
            $("#formPesquisa #txtRg").rules("add", { required: false });
        } else if ($("#txtRg").val().length == 8) {
            $("#formPesquisa #txtCpf").rules("add", { required: false });
        }

        Pesquisar();
    }); txtAnoLetivo

    $('#txtAnoLetivo').change(function (e) {
        if ($('#txtAnoLetivo').val() >= 2018) {
            $('#TpPesquisa').show();
        } else {
            $('#TpPesquisa').hide();
        }
    });
});

function Pesquisar() {
    if ($("#formPesquisa").valid())
        $.ajax({
            cache: false,
            url: "/LivrodePonto/Listar",
            type: "POST",
            datatype: "html",
            data: {
                nrRg: $("#txtRg").val(),
                anoRef: $("#txtAnoLetivo").val(),
                nrCpf: $("#txtCpf").val()
            },
            success: function (data) {
                $('#divResultadoPesquisa').html(data);

                $("#tDados").sedDataTable({
                    nomeExportacao: "Lista de Teste"
                });

                location.hash = "#tDados";
            }
        });
}

var DetalheConsulta = function (di, ano, cpf) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            nrDi: di,
            anoRef: ano,
            nrCpf: cpf,
            TpPesquisa: $("#cboTpPesquisa").val()
        }),
        url: "/LivrodePonto/DetalheConsulta",
        success: function (data, textStatus, jqXHR) {

            $('#umDialog').html(data);
            $('#umDialog').dialog({
                title: "Consulta digitação/frequência",
                width: 1300,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                close: function () {
                    location.hash = "#tabelaDados";
                }
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
};