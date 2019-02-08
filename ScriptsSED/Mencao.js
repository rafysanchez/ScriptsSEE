
$(document).ready(function () {
    
    PesquisarMencao();

    
})

function IniciaTela() {
    

    $("#txtMencao").keypress(function (e) {
        return ValidaCampo(this, e);
    });

    $("#txtMencao").keyup(function (e) {
        if ($("#ddlTipoMencao").val() != "3") {
            $("#txtMenorValor").val($(this).val());
            $("#txtMaiorValor").val($(this).val());
        }
        else
        {
            $("#txtMenorValor").val(0);
            $("#txtMaiorValor").val(0);
        }
    });

    $("#txtMenorValor").keypress(function (e) {
        return ValidaCampo(this, e);
    });

    $("#txtMaiorValor").keypress(function (e) {
        return ValidaCampo(this, e);
    });

    $("#ddlTipoMencao").change(function (e) {
        $("#txtMencao").val('');
        $("#txtMenorValor").val('');
        $("#txtMaiorValor").val('');
    });

    $("#txtDataInicioVigencia").datepicker({
        numberOfMonths: 1,
        onSelect: function (selected) {
            $("#txtDataFimVigencia").datepicker("option", "minDate", selected);
        }
    });

    $("#txtDataFimVigencia").datepicker({
        numberOfMonths: 1,
        onSelect: function (selected) {
            $("#txtDataInicioVigencia").datepicker("option", "maxDate", selected);
        }
    });

    $("#spanMencao").hide();
    $("#spanMenorValor").hide();
    $("#spanMaiorValor").hide();

    $("#txtMencao").click(function () {
        $("#spanMencao").hide();
    });

    $("#txtMenorValor").click(function () {
        $("#spanMenorValor").hide();
    });

    $("#txtMaiorValor").click(function () {
        $("#spanMaiorValor").hide();
    });

    $("#ddlTipoMencao").change(function () {
        
        MostraEscondeVlMaiorMenor();

        RemoveColuna();

        MostraEscondeBotoes();

    });
    
}

var ContaRegistros = function () {
    
    var tabela = $("#tabelaDado");
    var result = tabela.children("tbody").children("tr").length;
    return result;
}

var MostraEscondeVlMaiorMenor = function () {
    var ddlTipoMencao = $("#ddlTipoMencao");
    if (ddlTipoMencao.val() == "1")
        $("#dvVlMedida").css("display", "");
    else
        $("#dvVlMedida").css("display", "none");
}

var MostraEscondeBotoes = function () {
    var ddlTipoMencao = $("#ddlTipoMencao");

    if (ddlTipoMencao.val() != "") {
        $("#cadastrarMencao").removeAttr("disabled");
        $("#txtMencao").removeAttr("disabled");
    }
    else {
        $("#cadastrarMencao").attr("disabled", "disabled");
        $("#txtMencao").attr("disabled", "disabled");
    }
    
    var rows = parseInt(ContaRegistros());
    if (rows == 0)
        $("#BotaoSalvar").css("display", "none");
    else
        $("#BotaoSalvar").css("display", "");

}


var RemoveColuna = function () {
    var tabela = $("#tabelaDado");
    if ($("#ddlTipoMencao").val() != "1") {
        $("#tabelaDado th:nth-child(3)").css("display", "none");
        $("#tabelaDado th:nth-child(4)").css("display", "none");
        $("#tabelaDado td:nth-child(3)").css("display", "none");
        $("#tabelaDado td:nth-child(4)").css("display", "none");
    }
    else
    {
        $("#tabelaDado th:nth-child(3)").css("display", "");
        $("#tabelaDado th:nth-child(4)").css("display", "");
        $("#tabelaDado td:nth-child(3)").css("display", "");
        $("#tabelaDado td:nth-child(4)").css("display", "");
    }
}


function AdicionarMencao() {
    if ($('input#txtMencao').val() != "") {
        $("#lblMencao").html("");
        
        if (Number($("input#txtMenorValor").val()) > Number($("input#txtMaiorValor").val())) {
            alert("O valor menor deve ser inferior ao valor maior");
        }
        else {
            var url = '/Mencao/AdicionarMencao';
            var chk = document.getElementById('chkMedia');
            if (chk.checked) {
                var media = 1
            }
            else {
                var media = 0
            }
            $.ajax({
                url: url,
                type: 'Post',
                data: {
                    CodigoMencao: $("input#hdfCodigoMencao").val(),
                    CodigoTipoMencao: $("input#hdfCodigoTipoMencao").val(),
                    NomeSimbolo: $('input#txtMencao').val(),
                    DescricaoMencao: $('input#txtDescricaoMencao').val(),
                    NumeroNotaMenor: $("input#txtMenorValor").val(),
                    NumeroNotaMaior: $("input#txtMaiorValor").val(),
                    Media: media
                },
                success: function (data) {
                    $("input#cadastrarMencao").val("Incluir Menção");
                    $("input#hdfCodigoMencao").val("0");
                    $('input#txtMencao').val("");
                    $("input#txtMenorValor").val(0);
                    $("input#txtMaiorValor").val(0);
                    $('input#txtDescricaoMencao').val("");
                    chk.checked = false;
                    $('div#dadosMencao').html(data);
                    $("#tabelaDados").sedDataTable();

                    MostraEscondeBotoes();
                }
            });

        }
    }
    else {
        $("#lblMencao").html("Obrigatório");
    }
}

function CarregarMencao() {
    var url = '/Mencao/AdicionarMencao';
    $.ajax({
        url: url,
        type: 'Post',
        data: {
            CodigoMencao: -1,
            CodigoTipoMencao: -1,
            NomeSimbolo: 0,
            DescricaoMencao: 0,
            NumeroNotaMenor: 0,
            NumeroNotaMaior: 0,
            Media: 0
        },
        success: function (data) {
            if (data != null) {
                $('div#dadosMencao').html(data);
                $('#dadosMencao').find("#tabelaDados").sedDataTable();
            }
        }
    });
}

function VisualizarMencao() {
    var url = '/Mencao/VisualizarMencao';
    $.ajax({
        url: url,
        type: 'Post',
        data: {
            CodigoMencao: -1,
            CodigoTipoMencao: -1,
            NomeSimbolo: 0,
            DescricaoMencao: 0,
            NumeroNotaMenor: 0,
            NumeroNotaMaior: 0,
            Media: 0
        },
        success: function (data) {
            if (data != null) {
                $('div#dadosMencao').html(data);
                $('#dadosMencao').find("#tabelaDados").sedDataTable();
            }
        }
    });
}

function ExcluirMencao(CodigoMencao) {
    if (confirm('Tem certeza que deseja excluir essa Menção?')) {
        var url = '/Mencao/ExcluirMencao';
        var chk = document.getElementById('chkMedia');
        if (chk.checked) {
            var media = 1
        }
        else {
            var media = 0
        }
        $.ajax({
            url: url,
            type: 'Post',
            data: {
                CodigoMencao: CodigoMencao
            },
            success: function (data) {
                $("input#cadastrarMencao").val("Incluir Menção");
                $("input#hdfCodigoMencao").val("0");
                $('input#txtMencao').val("");
                $('input#txtDescricaoMencao').val("");
                $("input#txtMenorValor").val(0);
                $("input#txtMaiorValor").val(0);
                chk.checked = false;
                $('div#dadosMencao').html(data);

                $("#tabelaDados").sedDataTable();
                MostraEscondeBotoes();
                RemoveColuna();
            }
        });
    }
}

function CarregarParcial() {

    var url = '/Mencao/CarregarParcial';

    $.ajax({
        url: url,
        type: 'Post',
        success: function (data) {
            $('div#dados').html(data);

            $("#tabelaDados").sedDataTable();
        }
    });
}


//valida numero inteiro com mascara
function mascaraInteiroVirgula() {
    if (event.keyCode != 44 && event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault();
        return false;
    }
    return true;
}

//valida numero inteiro com mascara
function mascaraInteiro() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault();
        return false;
    }
    return true;
}

//Válidar número com virgula
function ValidarNumero(Numero) {
    if (mascaraInteiroVirgula(Numero) == false)
        event.preventDefault();
}

//Preenche o mesmo valor da menção numárica na nota menor e na nota maior
function PreencheNotas() {
    var regra = /^[0-9]+$/;
    if ($("input#txtMencao").val().match(regra)) {
        $("input#txtMenorValor").val($("input#txtMencao").val())
        $("input#txtMaiorValor").val($("input#txtMencao").val())
    }
}

//Valida Tipo de Campo e formata
function ValidaCampo(campo, evento) {
    
    var ddlTipoMencao = $("#ddlTipoMencao");
    $("input#txtMenorValor").removeAttr("maxlength");
    $("input#txtMaiorValor").removeAttr("maxlength");
    $(campo).removeAttr("maxlength");
    if (ddlTipoMencao.val() === "1") {
        $(campo).attr("maxlength", "5");
        $("input#txtMenorValor").attr("maxlength", "5");
        $("input#txtMaiorValor").attr("maxlength", "5");
        return MascaraMoeda(campo, '.', ',', evento);
    }
    else if (ddlTipoMencao.val() === "2") {
        $(campo).attr("maxlength", "4");
        $("input#txtMenorValor").attr("maxlength", "4");
        $("input#txtMaiorValor").attr("maxlength", "4");
        return NumeroInteiro(this, evento);
    }
    else
        return true
}

function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e) {

    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;
    key = String.fromCharCode(whichCode); // Valor para o código da Chave
    if (strCheck.indexOf(key) == -1) return false; // Chave inválida
    len = objTextBox.value.length;
    for (i = 0; i < len; i++)
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
    aux = '';
    for (; i < len; i++)
        if (strCheck.indexOf(objTextBox.value.charAt(i)) != -1) aux += objTextBox.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) objTextBox.value = '';
    if (len == 1) objTextBox.value = '0' + SeparadorDecimal + '0' + aux;
    if (len == 2) objTextBox.value = '0' + SeparadorDecimal + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += SeparadorMilesimo;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        objTextBox.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            objTextBox.value += aux2.charAt(i);
        objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
    }
    return false;
}

function NumeroInteiro(campo, e) {

    var key = '';
    var strCheck = '0123456789';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;
    key = String.fromCharCode(whichCode); // Valor para o código da Chave
    if (strCheck.indexOf(key) == -1) return false; // Chave inválida
    else return true;

}
//-----------------------------------


//Preenche o mesmo valor da nota menor na nota maior
function PreencheNotaMaior() {
    if (Number($("input#txtMenorValor").val().replace(',', '.')) > Number($("input#txtMaiorValor").val().replace(',', '.'))) {
        $("input#txtMaiorValor").val($("input#txtMenorValor").val());
    }
}

function ExibirErro(msg) {
    $(function () {
        $("#MensagemErro").html(msg);
        $("#MensagemErro").fadeIn(1000);
        $("#MensagemErro").dialog({
            resizable: false,
            modal: true
        });
    });
}

function SomenteNumero(e) {
    var tecla = (window.event) ? event.keyCode : e.which;
    if (tecla == 44) return true;
    else {
        if ((tecla > 47 && tecla < 58)) return true;
        else {
            if (tecla == 8 || tecla == 0) return true;
            else return false;
        }
    }
}


function Inserir() {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/Mencao/Inserir',
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                title: "Cadastro de Tipo de Menção",
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
            $('#formInserir').validate({
                rules: {
                    NomeTipoMencao: "required",
                    DataInicioVigencia: {
                        required: true,
                        dataValida: true
                    },
                    DataFimVigencia: {
                        dataValida: true
                    }
                },
                messages: {
                    NomeTipoMencao: "Obrigatório",
                    DataInicioVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DataFimVigencia: {
                        dataValida: "Data Inválida"
                    }
                }
            });

            $('#BotaoSalvar').click(function (e) {
                e.preventDefault();
                if ($("#formInserir").valid()) {
                    VerificaInserir("Inserir");
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


function Visualizar(id) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/Mencao/Visualizar/' + id,
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                title: "Visualização de Tipo de Menção",
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
            VisualizarMencao();

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
        url: '/Mencao/Editar/' + id,
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                title: "Edição de Tipo de Menção",
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
            CarregarMencao();

            //validações do form
            $('#formEditar').validate({
                rules: {
                    NomeTipoMencao: "required",
                    DataInicioVigencia: {
                        required: true,
                        dataValida: true
                    },
                    DataFimVigencia: {
                        dataValida: true
                    }
                },
                messages: {
                    NomeTipoMencao: "Obrigatório",
                    DataInicioVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DataFimVigencia: {
                        dataValida: "Data Inválida"
                    }
                }
            });

            $('#BotaoSalvar').click(function (e) {
                e.preventDefault();
                if ($("#formEditar").valid()) {
                    VerificaInserir("Editar");
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

function Duplicar(id) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/Mencao/Duplicar/' + id,
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 600,
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

            CarregarMencao();

            //validações do form
            $('#formDuplicar').validate({
                rules: {
                    NomeTipoMencao: "required",
                    DataInicioVigencia: {
                        required: true,
                        dataValida: true
                    },
                    DataFimVigencia: {
                        dataValida: true
                    }
                },
                messages: {
                    NomeTipoMencao: "Obrigatório",
                    DataInicioVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DataFimVigencia: {
                        dataValida: "Data Inválida"
                    }
                }
            });

            $('#BotaoSalvar').click(function (e) {
                e.preventDefault();
                if ($("#formDuplicar").valid()) {
                    VerificaInserir("Duplicar");
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


function VerificaInserir(form) {
    var url = '/Mencao/VerificaInserir';
    $.ajax({
        url: url,
        type: 'GET',
        data: {
            CodigoTipoMencao: $("#CodigoTipoMencao").val(),
            NomeTipoMencao: $("input#NomeTipoMencao").val(),
            DataInicioVigencia: $("input#txtDataInicioVigencia").val(),
            DataFimVigencia: $("input#txtDataFimVigencia").val()
        },
        success: function (data) {
            if (data == true) {
                
                if (form == "Inserir") {
                    InserirMencao();
                }
                else if (form == "Editar") {
                    EditarMencao();
                }
                else if (form == "Duplicar") {
                    DuplicarMencao();
                }
            }
        }
    });
}

function PesquisarMencao() {
    var dataInicio = $("#txtDataInicioMencao").val();
    var dataFim = $("#txtDataFimMencao").val();
    var url = '/Mencao/ConsultaMencaoParcial';
    $.ajax({
        url: url,
        type: 'GET',
        data: { dataInicio: dataInicio, dataFim: dataFim },
        success: function (data) {
            IniciaTela();
            $("#dados").html(data);
            $("#tabelaDados").sedDataTable({
                nomeExportacao: "Menções",
                filtros: [
                    { nome: "Início da Vigência", valor: $("#txtDataInicioMencao").val() },
                    { nome: "Fim da Vigência", valor: $("#txtDataFimMencao").val() }
                ],

                columnDefs: [
                    { targets: [3, 4, 5, 6], orderable: false }
                ]
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

function DeletarMencao(id) {
    if (confirm('Tem certeza que deseja excluir esse Tipo de Menção?')) {
        $.ajax({
            type: 'POST',
            data: ({
                id: id
            }),
            url: '/Mencao/Deletar/',
            success: function (data, textStatus, jqXHR) {
                $("#btnPesquisar").trigger("click");
            }
        });
    }
}

function InserirMencao() {
    $.ajax({
        type: 'POST',
        data: ({
            NomeTipoMencao: $("input#NomeTipoMencao").val(),
            DataInicioVigencia: $("input#txtDataInicioVigencia").val(),
            DataFimVigencia: $("input#txtDataFimVigencia").val(),
            TipoDaMencao: $("#ddlTipoMencao").val()
        }),
        url: '/Mencao/InserirMencao/',
        success: function (data, textStatus, jqXHR) {
            $("#formDialog").dialog("close");
            $("#btnPesquisar").trigger("click");
        }
    });
}

function EditarMencao() {
    $.ajax({
        type: 'POST',
        data: ({
            CodigoTipoMencao: $("#CodigoTipoMencao").val(),
            NomeTipoMencao: $("input#NomeTipoMencao").val(),
            DataInicioVigencia: $("input#txtDataInicioVigencia").val(),
            DataFimVigencia: $("input#txtDataFimVigencia").val(),
            TipoDaMencao: $("#ddlTipoMencao").val()
        }),
        url: '/Mencao/EditarMencao/',
        success: function (data, textStatus, jqXHR) {
            $("#formDialog").dialog("close");
            $("#btnPesquisar").trigger("click");
        }
    });
}

function DuplicarMencao() {
    $.ajax({
        type: 'POST',
        data: ({
            NomeTipoMencao: $("input#NomeTipoMencao").val(),
            DataInicioVigencia: $("input#txtDataInicioVigencia").val(),
            DataFimVigencia: $("input#txtDataFimVigencia").val(),
            TipoDaMencao: $("#ddlTipoMencao").val()
        }),
        url: '/Mencao/DuplicarMencao/',
        success: function (data, textStatus, jqXHR) {
            $("#formDialog").dialog("close");
            $("#btnPesquisar").trigger("click");
        }
    });
}


