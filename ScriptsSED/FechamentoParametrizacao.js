
function PesquisarFechamentoParametros() {

    var anoLetivo = $("#txtAnoLetivo").val();
    var dataInicial = $("#DataInicioVigencia").val();
    var dataFinal = $("#DataFimVigencia").val();

    $.ajax({
        url: '/FechamentoParametrizacao/ConsultaFechtoParamParcial',
        type: 'GET',
        data: {
            anoLetivo: anoLetivo,
            dataInicioVigencia: dataInicial,
            dataFimVigencia: dataFinal
        },
        success: function (data) {
            $("#dados").html(data);

            ////define a quantidade de colunas que não terá ordenação, caso passe um index errado a tabela não carrega.
            var columns;
            if (("#tabelaDados .icone-tabela-editar").length != 0 && ("#tabelaDados .icone-tabela-excluir").length != 0) {
                columns = [3, 4, 5];
            } else if (("#tabelaDados .icone-tabela-editar").length != 0 || ("#tabelaDados .icone-tabela-excluir").length != 0) {
                columns = [3, 4];
            } else {
                columns = [3];
            }
            $("#tabelaDados").sedDataTable({

                columnDefs: [
			{ targets: columns, orderable: false }],
                nomeExportacao: "Consulta Parametro Fechamento",
                tituloFiltro: "Consulta Parâmetro Fechamento"
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
function Inserir() {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/FechamentoParametrizacao/Inserir',
        success: function (data) {
            $("<div id='divDialogInserir'>"+data+"</div>").dialog({
                title: "Cadastro de Parâmetros do Fechamento",
                destroy: true
            });
            AplicarMascaras();
            $('.formInserirParametro').validate({
                rules: {
                    'DialogAnoLetivo': {
                        required: true,
                        minlength: 4
                    },
                    'DialogCodigoTipoFechamento': {
                        required: true
                    },
                    DialogDataInicioVigencia: {
                        required: true,
                        dataValida: true
                    },
                    DialogDataFimVigencia: {
                        required: true,
                        dataValida: true
                    }
                },
                messages: {
                    DialogAnoLetivo: "Obrigatório",
                    DialogCodigoTipoFechamento: "Obrigatório",
                    DialogDataInicioVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DialogDataFimVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    }
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
}
function salvarParametro() {
    if ($(".formInserirParametro").valid())
        validarParametro("Inserir");
    else {
        return false;
    }

};
function Editar(id) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/FechamentoParametrizacao/Editar/' + id,
        success: function (data) {
            $("<div id='divDialogEditar'>" + data + "</div>").dialog({
                title: "Edição da Parametrização do Fechamento",
                destroy: true
            });
            AplicarMascaras();
            $('.formEditarParametro').validate({
                rules: {
                    'DialogAnoLetivo': {
                        required: true,
                        minlength: 4
                    },
                    'DialogCodigoTipoFechamento': {
                        required: true
                    },
                    DialogDataInicioVigencia: {
                        required: true,
                        dataValida: true
                    },
                    DialogDataFimVigencia: {
                        required: true,
                        dataValida: true
                    }
                },
                messages: {
                    DialogAnoLetivo: "Obrigatório",
                    DialogCodigoTipoFechamento: "Obrigatório",
                    DialogDataInicioVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DialogDataFimVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    }
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
}
function editarParametro() {
    if ($(".formEditarParametro").valid())
        validarParametro("Editar");
    else {
        return false;
    }
}
function validarParametro(form) {

    var anoLetivo = $("#DialogAnoLetivo").val();
    var codigoTipoFechamento = $("#DialogCodigoTipoFechamento").val();
    var dataInicioVigencia = $("#DialogDataInicioVigencia").val();
    var dataFimVigencia = $("#DialogDataFimVigencia").val();

    $.ajax({
        url: "/FechamentoParametrizacao/IsParametroValido",
        type: 'POST',
        data: {
            anoLetivo: anoLetivo,
            codigoTipoFechamento: codigoTipoFechamento,
            dataInicioVigencia: dataInicioVigencia,
            dataFimVigencia: dataFimVigencia,
            formulario: form
        },
        success: function (data) {
            if (data == true) {
                if (form == "Inserir") {
                    InserirFechamentoParametro();
                }
                else if (form == "Editar") {
                    EditarFechamentoParametro();
                }
            } else {
                return false;
            }
        }
    });
}
function InserirFechamentoParametro() {

    var anoLetivo = $("#DialogAnoLetivo").val();
    var codigoTipoFechamento = $("#DialogCodigoTipoFechamento").val();
    var nomeParametro = $("#DialogCodigoTipoFechamento option:selected").text();
    var dataInicioVigencia = $("#DialogDataInicioVigencia").val();
    var dataFimVigencia = $("#DialogDataFimVigencia").val();

    $.ajax({
        type: 'POST',
        data: ({
            AnoLetivo: anoLetivo,
            CodigoTipoFechamento: codigoTipoFechamento,
            nomeParametro: nomeParametro,
            DataInicioVigencia: dataInicioVigencia,
            DataFimVigencia: dataFimVigencia
        }),
        url: '/FechamentoParametrizacao/InserirFechamentoParametro/',
        success: function (data) {
            $("#divDialogInserir").dialog("close");
            $("#btnPesquisar").trigger("click");
        }
    });
}
function EditarFechamentoParametro() {

    var codigoFechamentoParametro = $("#hdfCodigoEventoCalendario").val();
    var anoLetivo = $("#DialogAnoLetivo").val();
    var codigoTipoFechamento = $("#DialogCodigoTipoFechamento").val();
    var nomeParametro = $("#DialogCodigoTipoFechamento option:selected").text();
    var dataInicioVigencia = $("#DialogDataInicioVigencia").val();
    var dataFimVigencia = $("#DialogDataFimVigencia").val();
    $.ajax({
        type: 'POST',
        data: ({
            codigoFechamentoParametro: codigoFechamentoParametro,
            anoLetivo: anoLetivo,
            codigoTipoFechamento: codigoTipoFechamento,
            nomeParametro: nomeParametro,
            dataInicioVigencia: dataInicioVigencia,
            dataFimVigencia: dataFimVigencia
        }),
        url: '/FechamentoParametrizacao/EditarFechamentoParametro/',
        success: function () {
            $("#divDialogEditar").dialog("close");
            $("#btnPesquisar").trigger("click");
        }
    });
}
function Excluir(id) {
    Mensagem.Alert({
        titulo: "Parâmetro Fechamento",
        mensagem: "Tem certeza que deseja excluir essa parâmetro?",
        tipo: "alerta",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        url: '/FechamentoParametrizacao/ExcluirFechamentoParametro',
                        type: 'Post',
                        data: {
                            codigoFechamentoParametro: id
                        },
                        success: function (data) {
                            $("#btnPesquisar").trigger("click");
                        }
                    });
                    Mensagem.Fechar();
                }
            },
            {
                botao: "Não"
            }
        ]
    });
}
function Visualizar(id) {
    $.ajax({
        dataType: 'html',
        url: '/FechamentoParametrizacao/Visualizar/' + id,
        success: function (data) {
            $("<div id='divDialogVisualizar'> " +  data +"<div/>").dialog({
                title: "Visualizar Parametrização de Fechamento",
                destroy: true
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

$(document).ready(function () {
    AplicarMascaras();
});
