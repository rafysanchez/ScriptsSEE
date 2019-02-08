


$(document).ready(function () {

    Mascaras();
    dadosCorretosFunction();
    ParticiparProjeto();

    $('#CodigoDiretoria').autoPreencher($('#contentPesquisa #CodigoEscola'), 'AplicativoDiarioClasse', 'ListaEscolas');
    $('#CodigoDiretoriaOpcional').autoPreencher($('#contentPesquisa #CodigoEscolaOpcional'), 'AplicativoDiarioClasse', 'ListaEscolas');


    $('#formIndex').validate({
        rules: {
            Nome: { required: true },
            Email: { required: true },
            //ConfirmarEmail: { required: true },
            Rg: { required: true },
            Cpf: { required: true },
            Celular: { required: true },
            TelefoneFixo: { required: true },
            ConfirmarEmail: {
                equalTo: Email
            },
            CodigoDiretoria: { required: true },
            CodigoEscola: { required: true }
        },
        messages: {
            Nome: ' Obrigatório',
            Email: ' Obrigatório',
            ConfirmarEmail: ' O e-mail e a confirmação do e-mail devem ser iguais ',
            Rg: ' Obrigatório',
            Cpf: ' Obrigatório',
            Celular: ' Obrigatório',
            TelefoneFixo: ' Obrigatório',
            CodigoDiretoria: { required: "Obrigatório" },
            CodigoEscola: { required: "Obrigatório" }
        }
    });


    $('#btnPesquisar').click(function () {
        var form = $('#formIndex');
        if (form.valid()) {
            $("#resultadosPesquisa").show();
        };
    });


    $('#formInteresse').validate({
        rules: {
            participar: { required: true },
            naoParticipar: { required: true },
            inputMotivoNaoParticipar: { required: true }

        },
        messages: {
            participar: 'Obrigatório',
            naoParticipar: 'Obrigatório',
            inputMotivoNaoParticipar: 'Obrigatório'

        }
    });
    
    $('#formParticipacao').validate({
        rules: {
            _partSim: { required: true },
            _partNaoUtilizou: { required: true },
            _partNao: { required: true }
        },
        messages: {
            _partSim: 'Obrigatório',
            _partNaoUtilizou: 'Obrigatório',
            _partNao: 'Obrigatório'
        }
    });

    $('#formCategoriaTurma').validate({
        rules: {
            inputOutraCategoria: { required: true }
        },
        messages: {
            inputOutraCategoria: 'Obrigatório'
        }
    });
    
    $('#formSO').validate({
        rules: {
            inputOutroSO: { required: true }
        },
        messages: {
            inputOutroSO: 'Obrigatório'
        }
    });

});

function renderPesquisa(data) {
    $('#resultadosPesquisa').html(data);

}

function Mascaras() {

    $('#contentPesquisa').find('#Cpf').mask('000.000.000-00');
    $('#Celular').mask('(99) 9999-9999?9').one('keypress onfocusout', MascaraTelefone);
    $('#TelefoneFixo').mask('(00)0000-0000');
    $('#Rg').mask('0000000000#', { maxlength: false });
}

function exibirOutraDiretEscola() {
    $("#outraEscolaDiretoria").show();
};

function dadosCorretosFunction() {

    $("#btnCadastrar").show();
    $("#participarProjeto").show();
    $("#formIndex").find("input").attr("disabled", false);
};

function plataforma() {
    if ($("#outros").is(":checked")) {
        $("#outroSO").show();
    } else {
        $("#outroSO").hide();
    }
}

function CategoriaTurma() {

    if ($("#outraTurma").is(":unchecked")) {
        $("#outraCategoriaTurma").hide();
    } else if ($("#outraTurma").is(":checked")) {
        $("#outraCategoriaTurma").show();
    }
};


function ParticiparProjeto() {

    if ($("#participar").is(":checked")) {
        $("#motivoNaoParticipar").hide();
    } else if ($("#naoParticipar").is(":checked")) {
        $("#motivoNaoParticipar").show();
    }
};

function Cadastrar() {

    var form = $('#formIndex');
    var form1 = $("#formInteresse");
    var form2 = $('#formParticipacao');
    var form3 = $('#formCategoriaTurma');
    var form4 = $('#formSO');

    if ($("#formParticipacao").find(":checked").val() == null) {
        alert("Selecione a(s) turma(s)");
        return;
    }
    if ($("#formSO").find(":checked").val() == null) {
        alert("Selecione o(s) sistema(s) operacional(is)");
        return;
    }

    if (form.valid() && form1.valid() && form2.valid() && form3.valid() && form4.valid()) {

        var interesse = $("#formInteresse").find(":checked").val();
        var motivo = "";
        var nome = $("#Nome").val();
        var rg = $("#Rg").val();
        var cpf = $("#Cpf").val();
        var celular = $("#Celular").val();
        var telefoneFixo = $("#TelefoneFixo").val();
        var email = $("#Email").val();
        var participacao = $("#formParticipacao").find(":checked").val();
        var codDiretoria = $("#CodigoDiretoria").find(":selected").val();
        var codEscola = $("#CodigoEscola").find(":selected").val();
        var codDiretoriaOpcional = $("#CodigoDiretoriaOpcional").find(":selected").val();
        var codEscolaOpcional = $("#CodigoEscolaOpcional").find(":selected").val();
        var SO = "";
        var categoria = "";


        if (interesse == "Não") {
            motivo = $("#inputMotivoNaoParticipar").val();
        }
        
        var arrayTurma = $('#formCategoriaTurma input:checked').map(function () {
            return this.value;
        }).get();
        categoria = arrayTurma.toString().replace("Outros", $("#inputOutraCategoria").val());

        var arraySistOp = $('#formSO input:checked').map(function () {
            return this.value;
        }).get();
        SO = arraySistOp.toString().replace("Outros", $("#inputOutroSO").val());



        $.ajax({
            url: '/AplicativoDiarioClasse/CadastroInteresse',
            type: 'POST',
            dataType: 'html',
            data: {
                nome: nome,
                rg: rg,
                cpf: cpf,
                celular: celular,
                telefoneFixo: telefoneFixo,
                email: email,
                interesse: interesse,
                motivoNaoParticipar: motivo,
                SO: SO,
                categoria: categoria,
                nivelParticipacao: participacao,
                codDiretoria: codDiretoria,
                codEscola: codEscola,
                codDiretoriaOpcional: codDiretoriaOpcional,
                codEscolaOpcional: codEscolaOpcional
            },
            success: function (result) {
                $('#CodigoDiretoria').autoPreencher($('#contentPesquisa #CodigoEscola'), 'AplicativoDiarioClasse', 'ListaEscolas');
                $('#CodigoDiretoriaOpcional').autoPreencher($('#contentPesquisa #CodigoEscolaOpcional'), 'AplicativoDiarioClasse', 'ListaEscolas');
                var textoModal = "";
                textoModal = "<p class='alinha_centro'>Seu cadastro foi realizado com sucesso.<br/><br/>Em breve, a equipe responsável entrará em contato com as orientações sobre o projeto.</p>";

                $('#modalMensagem').html(textoModal).dialog({
                    modal: true,
                    title: 'Cadastro Realizado',
                    width: 810,
                    position: ['center', 100],
                    buttons: {
                        Fechar: function () {
                            $(this).dialog("close");
                        }
                    },
                    open: function (event, ui) {
                        $(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar-close").remove();
                    },
                    close: function () {
                        window.location.href = '../Logon/LogOn';
                        element = null;
                        $('#modalVisualizar').html('');
                        $('#modalVisualizar').dialog('destroy');

                    },

                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop(function () {
                    Mensagem.Alert({
                        titulo: "Erro",
                        mensagem: "Ocorreu um erro durante o processo: " + errorThrown
                    });
                });
            }
        });
    } else {
        alert("Preencha todos os campos");
    };

}

