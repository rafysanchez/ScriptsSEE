var controle = {
    salvar: function () {
        var form = $('#formQuestionario').serialize();
        $.ajax({
            url: "/QuestionarioSed/Salvar",
            type: "POST",
            dataType: "json",
            data: form,
            success: function (data) {
                Mensagem.Alert({ mensagem: data.mensagem, tipo: data.tipo, titulo: data.titulo, botao: "Fechar" });
            },
            error: function (data) {
                Mensagem.Alert({ mensagem: data.mensagem, tipo: data.tipo, titulo: "Erro", botao: "Fechar" });
            }
        });
    },
    MarcarRespostaRadio: function (cd_pergunta, cd_alternativa, fl_obsevacao, tipo) {
        $("#obs_" + cd_pergunta).prop("disabled", true);
        if (tipo == "RADIO") {
            $("#obs_" + cd_pergunta).val("");
            if (fl_obsevacao == "True") {
                $("#obs_" + cd_pergunta).prop("disabled", false);
            }
            $("#hdnRespAlt_" + cd_pergunta).val(cd_alternativa);
        }
        else if (tipo == "CHECKBOX") {
            $("#obs_" + cd_pergunta + cd_alternativa).val("");
            if (fl_obsevacao == "True") {
                $("#obs_" + cd_pergunta + cd_alternativa).prop("disabled", false);
            }
        }
    },

    PesquisaQuestionarioMobiliario: function () {
        $.ajax({
            cache: false,
            url: '/QuestionarioSED/PartialMobiliario',
            type: 'POST',
            datatype: 'json',
            data: {
                AnoLetivo: $('#filt-anoLetivo').val(),
                CodigoRedeEnsino: $('#filt-redeEnsino').val(),
                CodigoDiretoria: $('#filt-diretoria').val(),
                CodigoMunicipio: $('#filt-municipio').val(),
                CodigoEscola: $('#filt-escola').val()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#resultado').html(data);
                $('#tbQuestMobil').sedDataTable({
                    columnDefs: [
			        { targets: [2], orderable: false },
                    ],
                    nomeExportacao: "Questionario Mobiliario"
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        })
    },

    CadastraQuestionarioMobiliario: function () {
        $.ajax({
            cache: false,
            url: '/QuestionarioSED/CadastraQuestionarioMobiliario',
            type: 'POST',
            datatype: 'json',
            data: {
                AnoLetivo: $('#filt-anoLetivo').val(),
                CodigoRedeEnsino: $('#filt-redeEnsino').val(),
                CodigoDiretoria: $('#filt-diretoria').val(),
                CodigoMunicipio: $('#filt-municipio').val(),
                CodigoEscola: $('#filt-escola').val()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                debugger
                $('#dialog').html(data).dialog({
                    width: 700,
                    title: "Responder Questionário",
                    draggable: false,
                    modal: true,
                    resizable: false,
                    position: 'top',
                    close: function () {
                        $("#dialog").html('');

                        if ($('#resultado').html() != '') {
                            controle.PesquisaQuestionarioMobiliario();
                        }
                    }
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        })
    },

    EditarQuestionarioMobiliario: function (anoLetivo, codigoRedeEnsino, codigoDiretoria, codigoMunicipio, codigoEscola) {
        $.ajax({
            cache: false,
            url: '/QuestionarioSED/EditarQuestionarioMobiliario',
            type: 'POST',
            datatype: 'json',
            data: {
                AnoLetivo: anoLetivo,
                CodigoRedeEnsino: codigoRedeEnsino,
                CodigoDiretoria: codigoDiretoria,
                CodigoMunicipio: codigoMunicipio,
                CodigoEscola: codigoEscola
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {

                $('#dialog').html(data).dialog({
                    width: 700,
                    title: "Editar Questionário",
                    draggable: false,
                    modal: true,
                    resizable: false,
                    position: 'top',
                    close: function () {
                        $("#dialog").html('');

                        if ($('#resultado').html() != '') {
                            controle.PesquisaQuestionarioMobiliario();
                        }
                    }
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        })
    },

    SalvarQuertionarioMobiliario: function () {

        var dados = [];
        var count = 0;
        var validade = true;

        $(".modal-content input[type='text']").each(function () {
            
            dados.push({
                CodigoQuestionario: parseInt($(this).attr("id")),
                CodigoRedeEnsino: parseInt($('#filt-redeEnsino').val()),
                CodigoDiretoria: parseInt($('#filt-diretoria').val()),
                CodigoMunicipio: parseInt($('#filt-municipio').val() == '' ? '0' : $('#filt-municipio').val()),
                CodigoEscola: parseInt($('#filt-escola').val() == '' ? '0' : $('#filt-escola').val()),
                CodigoUsuario: 0,
                AnoLetivo: parseInt($('#filt-anoLetivo').val()),
                Resposta: $(this).val(),
                DataAlteracao: '1900-01-01'
            })

            if($(this).val() == "")
            {
                var div = $("#divQuestao_" + $(this).attr("id"));
                div.addClass("bordaAlert");
                $("input[id='" + $(this).attr("id") + "']").bind("blur", function () {
                    RemoveBordaAlerta(this, div);
                });
                validade = false;

            }

        });

        if (validade)
            $.ajax({
                cache: false,
                contentType: "application/json; charset=utf-8",
                url: '/QuestionarioSED/SalvaQuestionarioMobiliario',
                type: 'POST',
                datatype: 'json',
                data: JSON.stringify({ 'dados': dados }),
                success: function (data, textStatus, jqXHR) {
                    Mensagem.Alert({ mensagem: data.mensagem, tipo: data.tipo, titulo: data.titulo, botao: "Fechar" });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $(document).ajaxStop();
                }
            });
        else
            Mensagem.Alert({ mensagem: 'Questionário não pode ser salvo. Todas os campos devem ser preenchidos!', tipo: 'Aviso', titulo: 'Aviso', botao: "Fechar" });
    }
};


function RemoveBordaAlerta(campo, div)
{   debugger
    if ($(campo).val().trim() != "")
        $(div).removeClass("bordaAlert");
}


$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;

    $("#btnPesquisarQuestionarioMobiliario").click(function () {
        controle.PesquisaQuestionarioMobiliario();
    });

    $('.detalhar').click(function () {
        controle.EditarQuestionarioMobiliario();
    });

});