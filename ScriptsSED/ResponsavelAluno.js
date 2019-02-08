function Adicionar() {
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        dataType: 'html',
        url: '/ResponsavelAluno/Adicionar',
        success: function (data, textStatus, jqXHR) {
            $('#Adicionar').empty().html(data);

            var original = $('#Adicionar')[0];
            var clone = $(original).clone().attr('id', 'AdicionarClone');
            var saveHtml = $(original).html();
            $(original).html('');
            $(clone).dialog({
                //height: 770,
                title: 'Adicionar',
                width: 850,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                open: function () {
                    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
                    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino');
                    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino', 'AnoLetivo'], undefined);
                    AplicarMascaras();

                    $('#frmAdicionar').validate({
                        rules: {
                            txtCodigo: {
                                number: true
                            },
                            txtNome: {
                                nome: true
                            },
                            txtRa: {
                                number: true
                            },
                            //txtDigRa: {
                            //    number: true
                            //},
                            txtUfRa: {
                                letras: true
                            }
                        },
                        messages: {
                            txtCodigo: {
                                number: "Informe apenas números."
                            },
                            txtNome: {
                                nome: "Caracter inválido."
                            },
                            txtRa: {
                                number: "Informe apenas números."
                            },
                            //txtDigRa: {
                            //    number: "Informe apenas números."
                            //},
                            txtUfRa: {
                                letras: "Informe apenas letras."
                            }
                        }
                    });

                    $('#btnPesquisarAlunos').click(function (e) {
                        e.preventDefault();
                        if ($("#frmAdicionar").valid()) {
                            CarregarPesquisaAlunos();
                        }
                        else {
                            return false;
                        }
                    });
                },
                close: function () {
                    //$('#AlunosClone').dialog('close');
                    //$(clone).remove();
                    //$(original).empty();
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

function CarregarPesquisaAlunos() {
    var codigoDiretoria = $('#CodigoDiretoria').val();
    var codigoEscola = $('#CodigoEscola').val();
    var codigoTurma = $('#CodigoTurma').val();
    var nomeAluno = $('#txtNomeAluno').val();
    var ra = $('#txtRa').val();
    var digRa = $('#txtDigRa').val();
    var ufRa = $('#txtUfRa').val();
    var anoLetivo = $('#AnoLetivo').val();

    if (codigoDiretoria.length == 0) { codigoDiretoria = 0; }
    if (codigoEscola.length == 0) { codigoEscola = 0; }
    if (codigoTurma.length == 0) { codigoTurma = 0; }
    if (anoLetivo.length == 0) { anoLetivo = 0; }

    if ((anoLetivo != 0 && codigoDiretoria != 0 && codigoEscola != 0 && codigoTurma != 0) || (anoLetivo != 0 && codigoDiretoria != 0 && codigoEscola != 0 && nomeAluno.length > 0) || (anoLetivo != 0 && ra != "" && digRa != "" && ufRa != "")) {
        CarregarViewPesquisaAlunos(codigoDiretoria, codigoEscola, codigoTurma, nomeAluno, ra, digRa, ufRa, anoLetivo);
    }
    else {
        var msg = "Preencha o filtro mínimo.";
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: msg,
            tipo: "Aviso",
            botao: "Fechar"
        });
    }
}

function CarregarViewPesquisaAlunos(codigoDiretoria, codigoEscola, codigoTurma, nomeAluno, ra, digRa, ufRa, anoLetivo) {
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        dataType: 'html',
        data: ({
            codigoResponsavel: parseInt($('#hdnCodigoResponsavel').val()),
            codigoDiretoria: parseInt(codigoDiretoria),
            codigoEscola: parseInt(codigoEscola),
            codigoTurma: parseInt(codigoTurma),
            nomeAluno: nomeAluno,
            ra: ra,
            digRa: digRa,
            ufRa: ufRa, 
            anoLetivo: anoLetivo
        }),
        url: '/ResponsavelAluno/ListarAlunos',
        success: function (data, textStatus, jqXHR) {
            $('#dadosAluno').html(data);
            $("#tbAlunosAdicionar").sedDataTable( {
                columnDefs: [
			        { targets: [8,9], orderable: false },
                ],
                nomeExportacao: "Lista de Alunos",
                });

            location.hash = "#tbAlunosAdicionar";
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function Associar(codigoAluno, codigoResponsavel) {
    var tipo = $('#' + codigoAluno).find('#ddlTipo').val();

    if (tipo.length > 0) {
        $.ajax({
            type: 'POST',
            async: true,
            cache: false,
            data: ({
                codigoAluno: parseInt(codigoAluno),
                codigoResponsavel: parseInt(codigoResponsavel),
                tipo: parseInt(tipo)
            }),
            url: '/ResponsavelAluno/Associar',
            success: function (data, textStatus, jqXHR) {
                $('#' + codigoAluno).find('#ddlTipo').prop("disabled", "disabled");
                $('#' + codigoAluno).find('.add').remove();
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
    else {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "É preciso selecionar um tipo de responsabilidade para associar um aluno.",
            tipo: "Aviso",
            botao: "Fechar"
        });
    }
}

function Excluir(codigoAluno, codigoResponsavel) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Deseja realmente excluir o Aluno?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        type: 'POST',
                        cache: false,
                        async: true,
                        data: ({
                            codigoAluno: parseInt(codigoAluno),
                            codigoResponsavel: parseInt(codigoResponsavel)
                        }),
                        url: '/ResponsavelAluno/Excluir',
                        success: function (data, textStatus, jqXHR) {
                            $('#AlunosClone').dialog('close');
                            Alunos(codigoResponsavel);
                            $('#tbAlunosAdicionar').sedDataTable();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
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

function Alterar(ddlTipo, codigoAluno) {
    var tipo = parseInt($(ddlTipo).val());
    var codigoResponsavel = parseInt($('#hdnCodigoResponsavel').val());

    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        data: ({
            codigoAluno: parseInt(codigoAluno),
            codigoResponsavel: codigoResponsavel,
            tipo: tipo
        }),
        url: '/ResponsavelAluno/Alterar',
        success: function (data, textStatus, jqXHR) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function ZeraTurma() {
    $('#CodigoTurma option').each(function () {
        if ($(this).val() != '') {
            $(this).remove();
        }
    });

    $("#CodigoTipoEnsino option[value='']").attr("selected", "selected");
}