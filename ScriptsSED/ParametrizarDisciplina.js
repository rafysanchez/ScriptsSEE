$().ready(function () {
    $.validator.addMethod("minimoAvaliacoes", function (value, elem) {
        var teste = !(value <= 0 && $(elem).parent().parent().find('.existe-avaliacao').prop('checked'));
        if (!teste)
            $(elem).focus();
        return teste;
    }, "<br />Deve ser maior que 0");

    $('body').on('change', '.input-necessario', function () {
        var input = $(this).parent().next().find('input');
        input.prop('disabled', !$(this).prop('checked'));
        if(!$(this).prop('checked'))
        {
            if (input.attr('type') == 'text')
                input.val(0);
            if (input.attr('type') == 'checkbox')
                input.prop('checked', false);
        }
    });

    $('#frmPesquisa #ddlTipoEnsino')
        .autoPreencher($('#frmPesquisa #ddlSerie'), 'TipoEnsino', 'CarregarListaSerie', null, null, null, null,
        function (e) {
            if (e.find('option').length <= 1) {
                CarregarLista($('#frmPesquisa #ddlTipoEnsino'));
                $('#divPesquisaSerie').hide();
            } else {
                $('#divPesquisaSerie').show();
            }
        });
    $('#frmPesquisa #ddlSerie').change(function () {
        CarregarLista($(this));
    });

    $('#btnCadastrar').click(function () {
        $('<div id="modal_content"></div>')
                .load("/ParametrizarDisciplina/Adicionar",
                    function (data) {
                        var modal = $(this);
                        modal.find('#ddlTipoEnsino')
                            .autoPreencher(modal.find('#ddlSerie'), 'TipoEnsino', 'CarregarListaSerie', null, null, null, null,
                            function (e) {
                                if (modal.find('#ddlSerie').find('option').length <= 1) {
                                    CarregarListaDisciplina(modal.find('#ddlTipoEnsino'));
                                    $('#divAdicionarSerie').hide();
                                } else {
                                    $('#divAdicionarSerie').show();
                                }
                            });
                        modal.find('#ddlSerie').change(function () {
                            CarregarListaDisciplina($(this));
                        });
                        modal.find('#btnGravar').click(function (e) {
                            e.preventDefault();
                            $.post("/ParametrizarDisciplina/Adicionar", $("#frmAdicionar").serialize())
                                .success(function () {
                                    $('#frmPesquisa #txtAnoLetivo').val($('#frmAdicionar #txtAnoLetivo').val());
                                    $('#frmPesquisa #ddlSerie').attr('selecionado', $('#frmAdicionar #ddlSerie').val());
                                    $('#frmPesquisa #ddlTipoEnsino').val($('#frmAdicionar #ddlTipoEnsino').val()).trigger('change');

                                    $("#modal_content").dialog("close");
                                })
                            ;
                        });

                        modal.dialog({
                            modal: true,
                            width: 900,
                            position: ['center', 0],
                            show: {
                                position: { top: 500 },
                            },
                            open: function (event, ui) {
                                $('.input-necessario').trigger('change');
                            },
                            close: function () {
                                $(this).dialog('destroy').remove()
                            }
                        });
                    }
                );
    });

    $('#listaParametrizacao')
        .on('click', '.btnVisualizar', function () {
            $('<div id="modal_content"></div>')
                .load("/ParametrizarDisciplina/Visualizar/" + $(this).parent().parent().attr('codigo-parametrizacao'),
                    function (data) {
                        $(this).find('.tabela').sedDataTable({ bPaginate: false });

                        $(this).dialog({
                            modal: true,
                            width: 900,
                            position: ['center', 0],
                            show: {
                                position: { top: 500 },
                            },
                            close: function () {
                                $(this).dialog('destroy').remove()
                            }
                        })
                    }
                );
        });
    $('#listaParametrizacao')
        .on('click', '.btnEditar', function () {
            AbrirEdição($(this).parent().parent().attr('codigo-parametrizacao'));
        });

    $('#listaParametrizacao')
        .on('click', '.btnExcluir', function () {
            var codigoParametrizacao = $(this).parent().parent().attr('codigo-parametrizacao');
            Mensagem.Alert({
                titulo: 'Parametrização de Disciplina', //obrigatório
                mensagem: 'Deseja mesmo excluir esta parametrização de Disciplina?', //obrigatório
                tipo: 'aviso',
                botoes: [
                           {
                               botao: 'Sim',
                               callback: function (a, b, c, d, e, f) {
                                   $.get("/ParametrizarDisciplina/Excluir/" + codigoParametrizacao)
                                        .success(function () {
                                            $('#frmPesquisa select:visible:last').trigger('change');
                                        });
                               }
                           },
                           {
                               botao: 'Não',
                               callback: function () { $.unblockUI(); }
                           }
                ]
            });
        });
});

function AbrirEdição(id) {
    $('<div id="modal_content"></div>')
        .load("/ParametrizarDisciplina/Editar/" + id,
            function (data) {
                var modal = $(this);
                modal.find('#frmEditar').validate();

                $.validator.addClassRules("min-avaliacao", {
                    minimoAvaliacoes: true,
                    required: true
                });
                modal.find('#frmEditar #btnGravar').click(function (e) {
                    e.preventDefault();

                    if ($('#frmEditar').valid()) {
                        $.post("/ParametrizarDisciplina/Editar", $("#frmEditar").serialize())
                            .success(function () {
                                $('#frmPesquisa select:visible:last').trigger('change');
                                $("#modal_content").dialog("close");
                            });
                    }
                });


                modal.dialog({
                    modal: true,
                    width: 900,
                    position: ['center', 0],
                    show: {
                        position: { top: 500 },
                    },
                    open: function (event, ui) {
                        $('.input-necessario').trigger('change');
                    },
                    close: function () {
                        $(this).dialog('destroy').remove()
                    }
                });
            }
        );
}

function CarregarLista(elem) {
    alvo = $('#listaParametrizacao');

    if (elem.val()) {
        var anoLetivo = $('#frmPesquisa #txtAnoLetivo').val();
        var codigoTipoEnsino = $('#frmPesquisa #ddlTipoEnsino').val();
        var serie = $('#frmPesquisa #ddlSerie').val();

        $.get("/ParametrizarDisciplina/ListaParcial",
            {
                anoLetivo: anoLetivo ? anoLetivo : 0,
                codigoTipoEnsino: codigoTipoEnsino ? codigoTipoEnsino : 0,
                serie: serie ? serie : 0
            },
            null, 'html'
        ).success(function (data) {
            alvo
                .html(data)
                .children('.tabela')
                    .sedDataTable();
        });
    }
    else {
        $('#listaParametrizacao').empty();
    }
}

function CarregarListaDisciplina(elem) {
    alvo = $('#listaDisciplina');
    if (elem.val()) {
        var anoLetivo = $('#frmAdicionar #txtAnoLetivo').val();
        var codigoTipoEnsino = $('#frmAdicionar #ddlTipoEnsino').val();
        var serie = $('#frmAdicionar #ddlSerie').val();

        $.get("/ParametrizarDisciplina/VerificaParametrizacao",
            {
                anoLetivo: anoLetivo ? anoLetivo : 0,
                codigoTipoEnsino: codigoTipoEnsino ? codigoTipoEnsino : 0,
                serie: serie ? serie : 0
            },
            null, 'html'
        ).success(function (id) {
            if (id == 0) {
                $.get("/ParametrizarDisciplina/ListaDisciplinaParcial",
                    {
                        anoLetivo: anoLetivo ? anoLetivo : 0,
                        codigoTipoEnsino: codigoTipoEnsino ? codigoTipoEnsino : 0,
                        serie: serie ? serie : 0
                    },
                    null, 'html'
                ).success(function (data) {
                    alvo
                        .html(data)
                        .children('.tabela')
                            .sedDataTable();
                });
            }
            else {
                Mensagem.Alert({
                    titulo: 'Parametrização de Disciplina', //obrigatório
                    mensagem: 'Já existe uma Parametrização de Disciplina para este Ano Letivo, Tipo de Ensino e Série. Deseja alterá-lo?', //obrigatório
                    tipo: 'aviso',
                    botoes: [
                               {
                                   botao: 'Sim',
                                   callback: function (a, b, c, d, e, f) {
                                       $.unblockUI();

                                       $('#frmPesquisa #txtAnoLetivo').val($('#frmAdicionar #txtAnoLetivo').val());
                                       $('#frmPesquisa #ddlSerie').attr('selecionado', $('#frmAdicionar #ddlSerie').val());
                                       $('#frmPesquisa #ddlTipoEnsino').val($('#frmAdicionar #ddlTipoEnsino').val()).trigger('change');

                                       $("#modal_content").dialog("close");
                                       AbrirEdição(id);
                                   }
                               },
                               {
                                   botao: 'Não',
                                   callback: function () {
                                       $('#frmAdicionar #ddlTipoEnsino').val('').trigger('change');
                                       $.unblockUI();
                                   }
                               }
                    ]
                });
            }
        })
        .error(function (data) {
            Mensagem.Alert({
                titulo: 'Parametrização de Disciplina', //obrigatório
                mensagem: 'Existem ' + data.responseText + " Parametrizações com esta configuração. Favor corrigir para que fique apenas uma.", //obrigatório
                tipo: 'aviso',
                botao: "Fechar",
                callback: function () {
                    $.unblockUI();
                    $("#modal_content").dialog("close");

                    $('#frmPesquisa #txtAnoLetivo').val(anoLetivo);
                    $('#frmPesquisa #ddlSerie').attr('selecionado', serie);
                    $('#frmPesquisa #ddlTipoEnsino').val(codigoTipoEnsino).trigger('change');
                }
            });
        });
    }
    else {
        $('#listaParametrizacao').empty();
    }
}