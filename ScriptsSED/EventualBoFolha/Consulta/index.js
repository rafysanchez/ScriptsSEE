var dataTableBO = null;
var codigoFolha = 0;
$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    AplicarMascaras();

    $("#formPesquisar").validate({
        rules: {
            anoLetivo: {
                required: true
            }
        },
        submitHandler: function (form) {

            var filtros = {
                anoLetivo: $("#anoLetivo").val(),
                mes: $("#mes").val(),
                codigoEscola: $("#codigoEscola").val()
            };

            $.ajax({
                url: "/EventualBoFolha/PesquisarConsulta",
                type: "POST",
                dataType: "JSON",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    $("#tabelaPesquisa").sedDataTable({
                        botaoSelecionarColunas: false,
                        botaoImprimir: false,
                        botaoGerarCSV: false,
                        botaoGerarPDF: false,
                        data: data,
                        columns: [
                            { data: "NomeDiretoria" },
                            { data: "NomeEscola" },
                            { data: "RG" },
                            { data: "CpfDI" },
                            { data: "Nome" },
                            { data: "QtdeEnviada" },
                            { data: "SituacaoStr" },
                            { data: "Motivo" },
                            {
                                data: function () {
                                    return "<i class='icone-tabela-visualizar' title='Visualizar' onclick=\"visualizar(" + arguments[3].row + ")\"></i>";
                                }
                            }
                        ],
                        columnDefs: [{ targets: [8], orderable: false }]
                    });
                    dataTableBO = $("#tabelaPesquisa").DataTable();
                    dataTableBO.draw();
                    $("#tabelaPesquisa").show();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
                }
            });
            return;
        }
    });

    $("#mes option")[new Date().getMonth() + 1].selected = true;

    $("#codigoDiretoria").change(function () { listarEscola() });
    if ($("#codigoDiretoria option").length == 2) {
        $("#codigoDiretoria option:selected").remove();
        $("#codigoDiretoria").trigger("change");
    }
});
function listarEscola() {
    select = $("#formPesquisar #codigoEscola");
    select.empty();
    var codigoDiretoria = $("#codigoDiretoria option:selected").val() == "0" || $("#codigoDiretoria option:selected").val() == "" || $("#codigoDiretoria option:selected").val() == undefined ? 0 : parseInt($("#codigoDiretoria option:selected").val());

    var paramns = {
        id: codigoDiretoria
    }
    if (codigoDiretoria != "") {
        $.ajax({
            url: '/Escola/CarregarListaEscolasPorTipo',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(paramns),
            success: function (data) {
                if (data != null) {
                    if (data.length == 0 || data.length > 1) {
                        select.append($('<option/>', {
                            value: "",
                            text: "Selecione..."
                        }));
                    }
                    $.each(data, function (index, itemData) {
                        select.append($('<option/>', {
                            value: itemData.value,
                            text: itemData.text
                        }));
                    });
                    select.trigger("change");
                }
                else {
                    select.append($('<option/>', {
                        value: "",
                        text: ""
                    }));
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            }
        });
    }
    else {
        select.trigger("change");
    }
}