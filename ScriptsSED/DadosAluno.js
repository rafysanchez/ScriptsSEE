//Dados Aluno
function DadosAluno(codigoAluno) {

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        cache: false,
        data: ({
            codigoAluno: parseInt(codigoAluno)
        }),
        url: '/DadosAluno/Consultar',
        success: function (data, textStatus, jqXHR) {
            $('#EditarDadosAluno').html(data);

            ListarTelefonesAluno(codigoAluno);
            ListarTelefonesResponsavel(0);

            $('#EnderecoCEP').mask("99999-999");
            $('#END_CEP_IND').mask("99999-999");

            $('#EditarDadosAluno').dialog({ title: "Consulta do Aluno", width: 900 });

            if ($('#hdnEhAlunoLogado').val() == "Sim") {
                $("input").prop("disabled", true);
                $('#divTelResp').find('table > tbody > tr > td > a').removeAttr("onclick");
                $('#tabelaTelefone > tbody > tr > td >a').removeAttr("onclick");
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
}

function CadastrarTelAluno(codigoIdent, id, modo) {

    if (modo == 'Aluno') {
        ModalCadastroTelefone(0, 0, true);
    } else {
        ModalCadastroTelefone(codigoIdent, id, false);
    }
}

function EditarTelAluno(codigoIdent, id, modo) {

    if (modo == 'Aluno') {
        if (codigoIdent == 0 && id == 0)
            ModalCadastroTelefone(0, 0, true);
        else
            ModalCadastroTelefone(codigoIdent, id, true);
    } else {
        if (codigoIdent == 0 && id == 0)
            ModalCadastroTelefone(0, 0, false);
        else
            ModalCadastroTelefone(codigoIdent, id, false);
    }
}

function ExcluirTelAlunoResp(codigoIdent, id, modo) {

    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        data: ({
            codigoResponsavel: codigoIdent,
            codigoLinha: id,
            aluno: modo == "Aluno" ? true : false
        }),
        url: '/DadosAluno/ExcluirTelefoneResponsavelAluno',
        success: function (data, textStatus, jqXHR) {
            if (modo == "Aluno")
                ListarTelefonesAluno(codigoIdent);
            else
                ListarTelefonesResponsavel(codigoIdent);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function ModalCadastroTelefone(codigoIdentificacao, codigoLinha, ehTelAluno) {


    $.ajax({
        type: 'POST',
        async: false,
        data: ({
            codigoIdentificacao: codigoIdentificacao,
            condigoLinha: codigoLinha,
            aluno: ehTelAluno
        }),
        url: '/DadosAluno/CadastrarTelefone',
        success: function (data, textStatus, jqXHR) {
            $('#divTelefonesCad').html('');
            $('#divTelefonesCad').html(data);

            $('#divTelefonesCad').dialog({
                title: 'Telefone',
                width: 750,
            });

            var valorCombo = $('#hdnddlTipoTelefone').val();
            var idCombo = 0;
            if (valorCombo == 'Residencial')
                idCombo = 1;
            if (valorCombo == 'Comercial')
                idCombo = 2;
            if (valorCombo == 'Celular')
                idCombo = 3;
            if (valorCombo == 'Recado')
                idCombo = 4;

            $('#ddlTipoTelefone').val(idCombo);
            $('#txtDDD').val($('#hdntxtDDD').val());
            $('#txtNumTelefone').val($('#hdntxtNumTelefone').val());
            $('#txtComplTelefone').val($('#hdntxtComplTelefone').val());

            EhNumeroCelular($('#txtNumTelefone').val());
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

function ValidarNumeroCelularPorSMS(ddd, numero) {

    if ($(ddd).val() == null || $(ddd).val() == "") {
        $(ddd).css({ "border": "1px solid #F00", "padding": "2px" });
        return;
    } else {
        $(ddd).css({ "border": "", "padding": "" });
    }
    if ($(numero).val() == null || $(numero).val() == "") {
        $(numero).css({ "border": "1px solid #F00", "padding": "2px" });
        return;
    } else {
        $(numero).css({ "border": "", "padding": "" });
    }

    $.ajax({
        type: 'POST',
        async: false,
        data: ({
            ddd: $(ddd).val(),
            numeroTelefone: $(numero).val()
        }),
        url: '/DadosAluno/ValidarNumeroCelularPorSMS',
        success: function (data, textStatus, jqXHR) {

            $('#txtCodigoVerificador').html(data.CodigoRand);
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

function cadastrarTelefone() {

    var tipoTel = $('#ddlTipoTelefone').val();
    var ddd = $('#txtDDD').val();
    var numTel = $('#txtNumTelefone').val();
    var complementoTel = $('#txtComplTelefone').val();
    var envioSMS = $('#chkEnvioSMS').is(':checked');
    var codigoIdentificacao = $('#hdncodigoIdentificacao').val();
    var codigoLinha = $('#hdncondigoLinha').val();
    var ehTelAluno = $('#hdnaluno').val();
    var codigoVerificador = $('#txtCodigoVerificador').val();


    if (ehTelAluno == "Aluno" && codigoIdentificacao == null || codigoIdentificacao == "" || codigoIdentificacao == "0") {
        codigoIdentificacao = $('#CodigoAluno').val();
    }

    $.ajax({
        type: 'POST',
        async: false,
        data: ({
            tipoTelefone: parseInt(tipoTel),
            ddd: parseInt(ddd),
            numeroTelefone: numTel,
            complemento: complementoTel,
            envioSMS: false,
            codigoIdentificacao: codigoIdentificacao,
            codigoLinha: codigoLinha,
            ehTelAluno: ehTelAluno == "Aluno" ? true : false,
            codigoVerificador: codigoVerificador
        }),
        url: '/DadosAluno/CadastrarTelefoneGravar',
        success: function (data, textStatus, jqXHR) {

            // $('#divTelefonesCad').modal('toggle');
            $('#divTelefonesCad').dialog("close");

            if (ehTelAluno == "Aluno") {
                ListarTelefonesAluno(codigoIdentificacao);
            }
            else
                ListarTelefonesResponsavel(codigoIdentificacao);
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

function EhNumeroCelular(numero) {

    var identNumero = numero.substring(0, 1);

    if (identNumero >= "6" && identNumero <= "9") {
        $('#btnValidarTelefone').show(1000);
        $('#divAvisoValidacaoCelular').show(1000);
    } else {
        $('#btnValidarTelefone').hide(1000);
        $('#divAvisoValidacaoCelular').hide(1000);
    }
}

function ListarTelefonesAluno(codigoAluno) {

    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        dataType: 'html',
        data: ({
            codigoAluno: codigoAluno
        }),
        url: '/DadosAluno/ListaParcialTelefonesAluno',
        success: function (data, textStatus, jqXHR) {
            $('#divTelAluno').html('');
            $('#divTelAluno').html(data);
            $("#tabelaTelefoneAluno").sedDataTable({ embutida: true });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.href = "Index";
        }
    });
}

function ListarTelefonesResponsavel(codigoResponsavel) {
    $.ajax({
        type: 'POST',
        async: false,
        cache: false,
        dataType: 'html',
        data: ({
            codigoResponsavel: codigoResponsavel
        }),
        url: '/DadosAluno/ListaParcialTelefonesResponsavel',
        success: function (data, textStatus, jqXHR) {
            $('#divTelResp').html('');
            $('#divTelResp').html(data);
            $("#tabelaTelefone").sedDataTable({ embutida: true });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.href = "Index";
        }
    });
}
//Dados Aluno