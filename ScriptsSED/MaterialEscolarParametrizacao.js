
function PesquisarFechamentoParametros() {

    var anoLetivo = $("#txtAnoLetivo").val();
    var dataInicial = $("#txtDataInicial").val();
    var dataFinal = $("#txtDataFinal").val();

    $.ajax({
        url: '/MaterialEscolarParametrizacao/ConsultaMaterialEscolarParamParcial',
        type: 'GET',
        data: {
            anoLetivo: anoLetivo,
            dataInicioVigencia: dataInicial,
            dataFimVigencia: dataFinal
        },
        success: function (data) {
            IniciaTela();
            $("#dados").html(data);
            $("#tabelaDados").sedDataTable({ bSort: false });
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

function IniciaTela() {

    $("#txtDataInicial").datepicker({
        numberOfMonths: 1,
        onSelect: function (selected) {
            $("#txtDataFinal").datepicker("option", "minDate", selected);
        }
    });

    $("#txtDataFimVigencia").datepicker({
        numberOfMonths: 1,
        onSelect: function (selected) {
            $("#txtDataFinal").datepicker("option", "maxDate", selected);
        }
    });
}

function Inserir() {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/MaterialEscolarParametrizacao/Inserir',
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 600,
                title: "Parametrização Material Didático",
                width: 820,
                draggable: true,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 200
                },
                position: "top"
            });

            IniciaTela();
            $("#AnoLetivo").val((new Date).getFullYear());

            //validações do form
            $('#formInserir').validate({
                rules: {
                    'AnoLetivo': {
                        required: true,
                        minlength: 4
                    },
                    'CodigoTipoFechamento': {
                        required: true
                    },
                    DataInicioVigencia: {
                        required: true,
                        dataValida: true
                    },
                    DataFimVigencia: {
                        required: true,
                        dataValida: true
                    }
                },
                messages: {
                    AnoLetivo: "Obrigatório",
                    CodigoTipoFechamento: "Obrigatório",
                    DataInicioVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DataFimVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    }
                }
            });

            $('#btnSalvar').click(function (e) {
                  e.preventDefault();
                if ($("#formInserir").valid()) {
                    validarParametro("Inserir");
                }
                else {
                    return false;
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

function Editar(id) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/MaterialEscolarParametrizacao/Editar/' + id,
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 600,
                title: "Parametrização Material Didático",
                width: 820,
                draggable: true,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 200
                },
                position: "top"
            });

            IniciaTela();

            //validações do form
            $('#formEditar').validate({
                rules: {
                    'AnoLetivo': {
                        required: true,
                        minlength: 4
                    },
                    'CodigoTipoFechamento': {
                        required: true
                    },
                    DataInicioVigencia: {
                        required: true,
                        dataValida: true
                    },
                    DataFimVigencia: {
                        required: true,
                        dataValida: true
                    }
                },
                messages: {
                    AnoLetivo: "Obrigatório",
                    CodigoTipoFechamento: "Obrigatório",
                    DataInicioVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DataFimVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    }
                }
            });

            $('#BtnSalvar').click(function (e) {
                e.preventDefault();
                if ($("#formEditar").valid()) {
                    validarParametro("Editar");
                }
                else {
                    return false;
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

function validarParametro(form) {

    var anoLetivo = $("input#AnoLetivo").val();
    var codigoParametro = $("#CodigoParametro").val();
    var dataInicioVigencia = $("input#txtDataInicioVigencia").val();
    var dataFimVigencia = $("input#txtDataFimVigencia").val();

    $.ajax({
        url: "/MaterialEscolarParametrizacao/IsParametroValido",
        type: 'GET',
        data: {
            anoLetivo: anoLetivo,
            codigoParametro: codigoParametro,
            dataInicioVigencia: dataInicioVigencia,
            dataFimVigencia: dataFimVigencia,
            formulario: form
        },
        success: function (data) {
            if (data == true) {
                if (form == "Inserir") {
                    InserirMaterialEscolarParametro();
                }
                else if (form == "Editar") {
                    EditarMaterialEscolarParametro();
                }
            }
        }
    });
}

function InserirMaterialEscolarParametro() {

    var anoLetivo = $("input#AnoLetivo").val();
    var codigoParametro = $("#CodigoParametro").val();
    var dataInicioVigencia = $("input#txtDataInicioVigencia").val();
    var dataFimVigencia = $("input#txtDataFimVigencia").val();

    $.ajax({
        type: 'POST',
        data: ({
            AnoLetivo: anoLetivo,
            codigoParametro: codigoParametro,
            DataInicioVigencia: dataInicioVigencia,
            DataFimVigencia: dataFimVigencia
        }),
        url: '/MaterialEscolarParametrizacao/InserirMaterialEscolarParametro/',
        success: function (data, textStatus, jqXHR) {
            $("#formDialog").dialog("close");
            $("#btnPesquisar").trigger("click");
        }
    });
}

function EditarMaterialEscolarParametro() {

    var codigoFechamentoParametro = $("#hdfCodigoEventoCalendario").val();
    var anoLetivo = $("input#AnoLetivo").val();
    var codigoParametro = $("#CodigoParametro").val();
    var dataInicioVigencia = $("input#txtDataInicioVigencia").val();
    var dataFimVigencia = $("input#txtDataFimVigencia").val();

    $.ajax({
        type: 'POST',
        data: ({
            codigoRecEscolarParametro: codigoFechamentoParametro,
            anoLetivo: anoLetivo,
            codigoParametro: codigoParametro,
            dataInicioVigencia: dataInicioVigencia,
            dataFimVigencia: dataFimVigencia
        }),
        url: '/MaterialEscolarParametrizacao/EditarMaterialEscolarParametro/',
        success: function (data, textStatus, jqXHR) {
            $("#formDialog").dialog("close");
            $("#btnPesquisar").trigger("click");
        }
    });
}



function Excluir(id) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Tem certeza que deseja excluir este parâmetro?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {

                    $.ajax({
                        url: '/MaterialEscolarParametrizacao/ExcluirMaterialEscolarParametro',
                        type: 'Post',
                        data: {
                            codigoMaterialEscolarParametro: id
                        },
                        success: function (data) {
                            $("#btnPesquisar").trigger("click");
                        }
                    });

                }
            },
            {
                botao: "Não",
                callback: function () {
                    $.unblockUI();
                }
            }
        ]
    });

}


function Visualizar(id) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/MaterialEscolarParametrizacao/Visualizar/' + id,
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 600,
                title: "Parametrização Material Didático",
                width: 820,
                draggable: true,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 200
                },
                position: "top"
            });
            IniciaTela();
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

function isNumberKey(evt, crtl) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 44) {
        evt.preventDefault();
        return false;
    }
    else {
        var len = document.getElementById(crtl).value.length;
        var index = document.getElementById(crtl).value.indexOf('.');

        if (index > 0 && charCode == 44) {
            evt.preventDefault();
            return false;
        }
        if (index > 0) {
            var CharAfterdot = (len + 1) - index;
            if (CharAfterdot > 3) {
                evt.preventDefault();
                return false;
            }
        }

    }
    return true;
}