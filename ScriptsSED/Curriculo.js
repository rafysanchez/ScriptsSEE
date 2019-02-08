
var anoLetivoAnterior;
var tipoEnsinoAnterior;
var serieAnterior;
var disciplinaAnterior;
var bimestreAnterior;
var anoLetivoAlterado;
var anoLetivoPesquisa;
var editado;

var ConfigurarCamposCurriculo = function () {

    anoLetivoPesquisa = 0;

    /* =========================== ANO LETIVO =============================== */

    $('#txtAnoLetivoCad').keyup(function (e) {
        ValidarAlteracaoAnoLetivo($(this), anoLetivoAnterior)
    });

    $('#txtAnoLetivoCad').keypress(function (e) {

        anoLetivoAlterado = false;

        if (!((e.charCode >= 48 && e.charCode <= 57) ||
             (e.keyCode >= 37 && e.keyCode <= 40) ||
             (e.keyCode == 8) ||
             (e.keyCode == 46))) {
            return false;
        }

        if ($(this).val().length >= 4 && (e.charCode >= 48 && e.charCode <= 57)) {
            return false;
        }

        anoLetivoAlterado = true;

        if ($(this).val() != '') {
            anoLetivoAnterior = $(this).val();
        }
    });

    $('#txtAnoLetivoCad').blur(function () {

        if (anoLetivoAlterado == true) {
            if (anoLetivoPesquisa != TratarValorNumerico($(this).val()) || $(this).val() == '') {
                //Bloco que controla a seleção do tipo de ensino de acordo com o ano letivo para a tela de inserção
                $("#txtAnoLetivoCad").unbind('blur');
                $("#txtAnoLetivoCad").unbind('change');
                $('#txtAnoLetivoCad').autoPreencher($('#ddlTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: '0', AnoLetivo: 'txtAnoLetivoCad' }]);
                $("#txtAnoLetivoCad").trigger('change');
                $("#txtAnoLetivoCad").trigger('blur');
                //

                VerificarCurriculoExistente();
                PesquisarDisciplina($('#txtAnoLetivoCad'), $('#ddlTipoEnsino'), $('#ddlSerie'));
            }
        }
    });

    $('#ddlTipoEnsino').change(function () {
        ValidarAlteracaoTipoEnsino($(this), tipoEnsinoAnterior);
    });

    $('#ddlDisciplina').change(function () {
        ValidarAlteracaoDisciplina($(this), disciplinaAnterior);
    });

    $('#ddlBimestre').change(function () {
        ValidarAlteracaoBimestre($(this), bimestreAnterior);
    });
}

var ValidarAlteracaoAnoLetivo = function (obj, valorAnterior) {
    if (($('#conteudo .tabelaItem').html() != '' || $('#habilidade .tabelaItem').html() != '') && editado == true) {
        anoLetivoAlterado = false;
        MensagemConfirmacaoAnoLetivo(obj, valorAnterior);
    }
}

var MensagemConfirmacaoAnoLetivo = function (obj, valorAnterior) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Ao alterar este valor todos os dados informados de Conteúdo e Habilidade serão perdidos. Deseja continuar?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    LimparCurriculo();
                    anoLetivoAlterado = true;
                    //anoLetivoPesquisa = TratarValorNumerico($(this).val());
                    //VerificarCurriculoExistente();
                    //PesquisarDisciplina($(obj), $('#ddlTipoEnsino'), $('#ddlSerie'));
                    $.unblockUI();
                    $(obj).focus();
                }
            },
            {
                botao: "Não",
                callback: function () {
                    $(obj).val(valorAnterior);
                    //PesquisarDisciplina($(obj), $('#ddlTipoEnsino'), $('#ddlSerie'));
                    $.unblockUI();
                    $(obj).focus();
                }
            }
        ]
    });
}

var ValidarAlteracaoTipoEnsino = function (obj, valorAnterior) {
    if (($('#conteudo .tabelaItem').html() != '' || $('#habilidade .tabelaItem').html() != '') && editado == true) {
        MensagemConfirmacaoTipoEnsino(obj, valorAnterior);
    }
    else {
        tipoEnsinoAnterior = $(obj).val();
        CarregarSerie(obj);
        PesquisarDisciplina($('#txtAnoLetivoCad'), $('#ddlTipoEnsino'), $('#ddlSerie'));
        VerificarCurriculoExistente();
    }
}

var MensagemConfirmacaoTipoEnsino = function (obj, valorAnterior) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Ao alterar este valor todos os dados informados de Conteúdo e Habilidade serão perdidos. Deseja continuar?",
        tipo: "aviso",
        async: false,
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    LimparCurriculo();
                    tipoEnsinoAnterior = $(obj).val();
                    CarregarSerie(obj);
                    PesquisarDisciplina($('#txtAnoLetivoCad'), $('#ddlTipoEnsino'), $('#ddlSerie'));
                }
            },
            {
                botao: "Não",
                callback: function () {
                    $(obj).val(valorAnterior);
                    $.unblockUI();
                }
            }
        ]
    });
}

var ValidarAlteracaoSerie = function (obj, valorAnterior) {
    if (($('#conteudo .tabelaItem').html() != '' || $('#habilidade .tabelaItem').html() != '') && editado == true) {
        MensagemConfirmacaoSerie(obj, valorAnterior);
    }
    else {
        serieAnterior = $(obj).val();
        PesquisarDisciplina($('#txtAnoLetivoCad'), $('#ddlTipoEnsino'), $('#ddlSerie'));
        VerificarCurriculoExistente();
    }
}

var MensagemConfirmacaoSerie = function (obj, valorAnterior) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Ao alterar este valor todos os dados informados de Conteúdo e Habilidade serão perdidos. Deseja continuar?",
        tipo: "aviso",
        async: false,
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    LimparCurriculo();
                    serieAnterior = $(obj).val();
                    PesquisarDisciplina($('#txtAnoLetivoCad'), $('#ddlTipoEnsino'), $('#ddlSerie'));
                }
            },
            {
                botao: "Não",
                callback: function () {

                    $(obj).val(valorAnterior);
                    $.unblockUI();
                }
            }
        ]
    });
}

var ValidarAlteracaoDisciplina = function (obj, valorAnterior) {
    if (($('#conteudo .tabelaItem').html() != '' || $('#habilidade .tabelaItem').html() != '') && editado == true) {
        MensagemConfirmacaoDisciplina(obj, valorAnterior);
    }
    else {
        disciplinaAnterior = $(obj).val();
        VerificarCurriculoExistente();
    }
}

var MensagemConfirmacaoDisciplina = function (obj, valorAnterior) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Ao alterar este valor todos os dados informados de Conteúdo e Habilidade serão perdidos. Deseja continuar?",
        tipo: "aviso",
        async: false,
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    LimparCurriculo();
                    disciplinaAnterior = $(obj).val();
                    $.unblockUI();
                }
            },
            {
                botao: "Não",
                callback: function () {
                    $(obj).val(valorAnterior);
                    $.unblockUI();
                }
            }
        ]
    });
}

var ValidarAlteracaoBimestre = function (obj, valorAnterior) {
    if (($('#conteudo .tabelaItem').html() != '' || $('#habilidade .tabelaItem').html() != '') && editado == true) {
        MensagemConfirmacaoBimestre(obj, valorAnterior);
    }
    else {
        bimestreAnterior = $(obj).val();
        VerificarCurriculoExistente();
    }
}

var MensagemConfirmacaoBimestre = function (obj, valorAnterior) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Ao alterar este valor todos os dados informados de Conteúdo e Habilidade serão perdidos. Deseja continuar?",
        tipo: "aviso",
        async: false,
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    LimparCurriculo();
                    bimestreAnterior = $(obj).val();
                    $.unblockUI();
                }
            },
            {
                botao: "Não",
                callback: function () {
                    $(obj).val(valorAnterior);
                    $.unblockUI();
                }
            }
        ]
    });
}

var LimparCurriculo = function () {
    $.ajax({
        cache: false,
        url: '/Curriculo/LimparCurriculo',
        type: 'POST',
        datatype: 'HTML',
        data: {
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            AtualizarConteudo();
            AtualizarHabilidade();
            AlterarConteudo();
            RemoverConteudo();
            RemoverHabilidade();

            VerificarCurriculoExistente();
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

var VerificarCurriculoExistente = function () {

    var anoLetivo = TratarValorNumerico($('#txtAnoLetivoCad').val());
    var codigoDisciplina = TratarValorNumerico($('#ddlDisciplina').val());
    var tipoEnsino = TratarValorNumerico($('#ddlTipoEnsino').val());
    var serie = TratarValorNumerico($('#ddlSerie').val());
    var bimestre = TratarValorNumerico($('#ddlBimestre').val());

    var existeSerie = $('#ddlSerie').val() != undefined;

    if (anoLetivo != 0 &&
        codigoDisciplina != 0 &&
        tipoEnsino != 0 &&
        bimestre != 0 &&
        ((serie != 0) == existeSerie)
        ) {
        var ConteudoSelecionado = 0;

        $.ajax({
            cache: false,
            url: '/Curriculo/VerificarCurriculoExistente',
            type: 'POST',
            datatype: 'HTML',
            async: false,
            data: {
                anoLetivo: TratarValorNumerico($('#txtAnoLetivoCad').val()),
                codigoDisciplina: TratarValorNumerico($('#ddlDisciplina').val()),
                tipoEnsino: TratarValorNumerico($('#ddlTipoEnsino').val()),
                serie: TratarValorNumerico($('#ddlSerie').val()),
                bimestre: TratarValorNumerico($('#ddlBimestre').val())
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {

                $.ajax({
                    cache: false,
                    url: '/Curriculo/AtualizarConteudo',
                    type: 'POST',
                    datatype: 'HTML',
                    data: {
                        conteudoSelecionado: ConteudoSelecionado,
                    },
                    traditional: true,
                    success: function (data, textStatus, jqXHR) {
                        $('#conteudo').html(data);
                        RemoverConteudo();
                        AlterarConteudo();

                        $('.editarConteudo').click(function () { EditarConteudo($(this), 'Editar Conteúdo'); });

                        $.ajax({
                            cache: false,
                            url: '/Curriculo/AtualizarHabilidade',
                            type: 'POST',
                            datatype: 'HTML',
                            data: {
                                conteudoSelecionado: ConteudoSelecionado,
                            },
                            traditional: true,
                            success: function (data, textStatus, jqXHR) {
                                $('#habilidade').html(data);
                                $('.editarHabilidade').click(function () { EditarHabilidade($(this), 'Editar Habilidade'); });
                                RemoverHabilidade();
                                AssociarConteudoHabilidade();

                                if ($('.rdbConteudo').length > 0) {
                                    editado = false;
                                };
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
}

// Função genérica para tratar valores numéricos.
var TratarValorNumerico = function (valor) {
    if (valor == undefined) {
        return 0;
    }

    if (valor == '') {
        return 0;
    }

    if (isNaN(valor)) {
        return 0;
    }

    return parseInt(valor);
}

$(document).ready(function () {
    Cadastrar();
    ConfigurarModal();
    CarregarSerieFiltro();
    CarregarDisciplinaPorAnoLetivoFiltro();
    ValidarFormularioPesquisa();
    PesquisarCurriculo();

    $('#txtAnoLetivoFiltro').autoPreencher($('#ddlTipoEnsinoFiltro'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: '0', AnoLetivo: 'txtAnoLetivoFiltro' }]).trigger("change");
    $('#ddlTipoEnsinoFiltro').change(function () {
        PesquisarDisciplinaFiltro($('#txtAnoLetivoFiltro'), $('#ddlTipoEnsinoFiltro'), $('#ddlSerieFiltro'));
    });
});

var ConfigurarModal = function () {
    //$("#dialog").dialog({
    //    autoOpen: false,
    //    position: 'top',
    //    //height: 750,
    //    width: 820,
    //    resizable: false,
    //    modal: true,
    //    dragable: false,
    //    show: {
    //        //effect: "blind",
    //        //duration: 200
    //    },
    //    beforeClose: function (event, ui) {
    //        if ($('#result').html() != '') {
    //            $('#btnPesquisar').trigger('click');
    //        }
    //    }
    //});
}

var Cadastrar = function () {
    $('#btnCadastrar').click(function () {
        $.ajax({
            cache: false,
            url: '/Curriculo/Cadastrar',
            type: 'POST',
            datatype: 'HTML',
            data: {
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialog').html(data);

                $('.serie').hide();
                $('#serie').html('');

                RemoverConteudo();
                RemoverHabilidade();
                AlterarConteudo();

                ConfigurarCamposCurriculo();

                /*
                CarregarSerie();
                CarregarDisciplinaPorAnoLetivo(); */

                ConfigurarModalConteudo();
                ConfigurarModalHabilidade();
                ValidarFormularioCadastro();

                SalvarCadastro();
                AplicarMascaras();

                $('#dialog').dialog({ title: 'Cadastro de Currículo' });
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
    });
}

var CarregarSerie = function (obj) {
    // $('#ddlTipoEnsino').change(function () {
    var CodigoTipoEnsino = TratarValorNumerico($(obj).val());

    $('.serie').hide();
    $('#serie').html('');

    if (CodigoTipoEnsino == 0) {
        return;
    }

    var htmlSerie = ' ';
    htmlSerie = htmlSerie + '<select id="ddlSerie" name="ddlSerie" class="form-control" > ';
    htmlSerie = htmlSerie + '   <option value="">Selecione...</option> ';

    $.ajax({
        cache: false,
        url: '/TipoEnsino/CarregarListaSerie',
        type: 'POST',
        datatype: 'JSON',
        data: {
            id: CodigoTipoEnsino
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    htmlSerie = htmlSerie + '   <option value="' + data[i].value + '">' + data[i].text + '</option> ';
                }
                htmlSerie = htmlSerie + '</select> ';
                $('#serie').html(htmlSerie);

                $('#ddlSerie').change(function () {
                    ValidarAlteracaoSerie($('#ddlSerie'), serieAnterior);
                });

                $('.serie').show();
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

    // CarregarDisciplinaPorAnoLetivo();
    // });
}

var CarregarDisciplinaPorAnoLetivo = function (obj) {

    /*
    $('#txtAnoLetivoCad').blur(function () {

        var anoLetivo = TratarValorNumerico($('#txtAnoLetivoCad').val());

        if (anoLetivo == anoLetivoAnterior && anoLetivo == 0) {
            return;
        }

        if (anoLetivo == anoLetivoAnterior) {
            FecharMensagemCarregandoPagina();
            return;
        }

        anoLetivoAnterior = anoLetivo;

        PesquisarDisciplina($('#txtAnoLetivoCad'), $('#ddlTipoEnsino'), $('#ddlSerie'));
    });

    $('#ddlTipoEnsino').change(function () { PesquisarDisciplina($('#txtAnoLetivoCad'), $('#ddlTipoEnsino'), $('#ddlSerie')); });

    $('#ddlSerie').change(function () { PesquisarDisciplina($('#txtAnoLetivoCad'), $('#ddlTipoEnsino'), $('#ddlSerie')); }); */
}

var PesquisarDisciplina = function (txtAnoLetivo, ddlTipoEnsino, ddlSerie) {
    // return;

    AbrirMensagemCarregandoPagina();

    var anoLetivo = TratarValorNumerico($(txtAnoLetivo).val());
    var codigoTipoEnsino = TratarValorNumerico($(ddlTipoEnsino).val());
    var serie = TratarValorNumerico($(ddlSerie).val());

    var htmlDisciplina = '<option value="">Selecione...</option>';

    anoLetivoPesquisa = anoLetivo;

    if (anoLetivo > 1000) {

        $.ajax({
            cache: false,
            url: '/Disciplina/CarregarListaDiciplinasQuebraPorTipoEnsino_Serie',
            type: 'POST',
            datatype: 'JSON',
            data: {
                CodigoTipoEnsino: codigoTipoEnsino,
                NrSerie: serie,
                AnoLetivo: anoLetivo
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        htmlDisciplina = htmlDisciplina + '   <option value="' + data[i].value + '">' + data[i].text + '</option> ';
                    }
                }
                $('#ddlDisciplina').html(htmlDisciplina);
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
        $('#ddlDisciplina').html(htmlDisciplina);
        FecharMensagemCarregandoPagina();
    }
}

var PesquisarDisciplinaFiltro = function (txtAnoLetivo, ddlTipoEnsino, ddlSerie) {
    // return;
    var anoLetivo = TratarValorNumerico($(txtAnoLetivo).val());
    var codigoTipoEnsino = TratarValorNumerico($(ddlTipoEnsino).val());
    var serie = TratarValorNumerico($(ddlSerie).val());

    var htmlDisciplina = '<option value="">Selecione...</option>';

    if (anoLetivo > 1000) {
        $.ajax({
            cache: false,
            url: '/Disciplina/CarregarListaDiciplinasQuebraPorTipoEnsino_Serie',
            type: 'POST',
            datatype: 'JSON',
            data: {
                CodigoTipoEnsino: codigoTipoEnsino,
                NrSerie: serie,
                AnoLetivo: anoLetivo
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        htmlDisciplina = htmlDisciplina + '   <option value="' + data[i].value + '">' + data[i].text + '</option> ';
                    }
                }
                $('#ddlDisciplinaFiltro').html(htmlDisciplina);
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
        $('#ddlDisciplinaFiltro').html(htmlDisciplina);
        FecharMensagemCarregandoPagina();
    }
}

//controla os itens de conteúdo
var ConfigurarModalConteudo = function () {
    //$("#dialogConteudo").dialog({
    //    autoOpen: false,
    //    //title: 'Conteúdo',
    //    position: 'middle',
    //    //height: 200,
    //    width: 450,
    //    resizable: false,
    //    modal: true,
    //    dragable: false,
    //    show: {
    //        //effect: "blind",
    //        //duration: 200
    //    },
    //    beforeClose: function (event, ui) {
    //    }
    //});

    $('.adicionarConteudo').click(function () { EditarConteudo($(this), 'Adicionar Conteúdo'); });

    $('.editarConteudo').click(function () { EditarConteudo($(this), 'Editar Conteúdo'); });
}

var EditarConteudo = function (obj, titulo) {

    var CodigoControle = TratarValorNumerico($(obj).attr('codigoControle'));

    $.ajax({
        cache: false,
        url: '/Curriculo/EditarConteudo',
        type: 'POST',
        datatype: 'HTML',
        data: {
            codigoControle: CodigoControle,
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#dialogConteudo').html(data);
            //$('.tituloCont').html(titulo);
            SalvarConteudo();
            $("#dialogConteudo").dialog({ title: titulo });
            $('#txtConteudo').focus();
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

var SalvarConteudo = function () {
    $('#btnSalvarConteudo').click(function () {
        var textoConteudo = $('#txtConteudo').val();
        if (textoConteudo == '') {
            return;
        }

        var ConteudoSelecionado = TratarValorNumerico($('.rdbConteudo:checked').attr('codigoControle'));
        var CodigoControle = TratarValorNumerico($(this).attr('codigoControle'));

        $.ajax({
            cache: false,
            url: '/Curriculo/SalvarConteudo',
            type: 'POST',
            datatype: 'HTML',
            data: {
                conteudoSelecionado: ConteudoSelecionado,
                codigoControle: CodigoControle,
                descricao: textoConteudo
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#conteudo').html(data);

                AtualizarHabilidade();
                RemoverConteudo();
                AlterarConteudo();

                editado = true;

                $('.editarConteudo').click(function () { EditarConteudo($(this), 'Editar Conteúdo'); });

                $("#dialogConteudo").dialog('close');
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
    });
}

var RemoverConteudo = function () {
    $('.removerConteudo').click(function () {
        var CodigoControle = parseInt($(this).attr('codigoControle'));
        var ConteudoSelecionado = TratarValorNumerico($('.rdbConteudo:checked').attr('codigoControle'));

        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: "Deseja realmente excluir o Conteúdo?",
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            cache: false,
                            url: '/Curriculo/RemoverConteudo',
                            type: 'POST',
                            datatype: 'HTML',
                            data: {
                                conteudoSelecionado: ConteudoSelecionado,
                                codigoControle: CodigoControle
                            },
                            traditional: true,
                            success: function (data, textStatus, jqXHR) {
                                $('#conteudo').html(data);
                                $('.editarConteudo').click(function () { EditarConteudo($(this), 'Editar Conteúdo'); });
                                AtualizarHabilidade();
                                RemoverConteudo();
                                AlterarConteudo();

                                editado = true;
                            },
                            //error: function (jqXHR, textStatus, errorThrown) {
                            //    $(document).ajaxStop(function () {
                            //        Mensagem.Alert({
                            //            titulo: "Erro",
                            //            mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                            //            tipo: "Erro",
                            //            botao: "Fechar"
                            //        });
                            //    });
                            //}
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
    });
}

var AtualizarConteudo = function () {

    var ConteudoSelecionado = TratarValorNumerico($('.rdbConteudo:checked').attr('codigoControle'));

    $.ajax({
        cache: false,
        url: '/Curriculo/AtualizarConteudo',
        type: 'POST',
        datatype: 'HTML',
        data: {
            conteudoSelecionado: ConteudoSelecionado,
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#conteudo').html(data);
            RemoverConteudo();
            AlterarConteudo();
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

//  Controla os itens de habilidade
var ConfigurarModalHabilidade = function () {
    //$("#dialogHabilidade").dialog({
    //    autoOpen: false,
    //    //title: 'Habilidade',
    //    position: 'middle',
    //    //height: 200,
    //    width: 450,
    //    resizable: false,
    //    modal: true,
    //    dragable: false,
    //    show: {
    //        //effect: "blind",
    //        //duration: 200
    //    },
    //    beforeClose: function (event, ui) {
    //    }
    //});

    $('.adicionarHabilidade').click(function () { EditarHabilidade($(this), 'Adicionar Habilidade'); });

    $('.editarHabilidade').click(function () { EditarHabilidade($(this), 'Editar Habilidade'); });
}

var EditarHabilidade = function (obj, titulo) {

    var CodigoControle = TratarValorNumerico($(obj).attr('codigoControle'));

    $.ajax({
        cache: false,
        url: '/Curriculo/EditarHabilidade',
        type: 'POST',
        datatype: 'HTML',
        data: {
            codigoControle: CodigoControle,
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#dialogHabilidade').html(data);
            //$('.tituloHab').html(titulo);
            SalvarHabilidade();
            $("#dialogHabilidade").dialog({ title: titulo });
            $('#txtHabilidade').focus();
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

var SalvarHabilidade = function () {
    $('#btnSalvarHabilidade').click(function () {
        var textoHabilidade = $('#txtHabilidade').val();
        if (textoHabilidade == '') {
            return;
        }

        var ConteudoSelecionado = TratarValorNumerico($('.rdbConteudo:checked').attr('codigoControle'));
        var CodigoControle = TratarValorNumerico($(this).attr('codigoControle'));

        $.ajax({
            cache: false,
            url: '/Curriculo/SalvarHabilidade',
            type: 'POST',
            datatype: 'HTML',
            data: {
                conteudoSelecionado: ConteudoSelecionado,
                codigoControle: CodigoControle,
                descricao: textoHabilidade
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#habilidade').html(data);

                editado = true;

                RemoverHabilidade();
                AssociarConteudoHabilidade();

                $('.editarHabilidade').click(function () { EditarHabilidade($(this), 'Editar Habilidade'); });

                $("#dialogHabilidade").dialog('close');
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
    });
}
var teste;
var RemoverHabilidade = function () {
    $('.removerHabilidade').click(function () {
        var CodigoControle = parseInt($(this).attr('codigoControle'));
        var ConteudoSelecionado = TratarValorNumerico($('.rdbConteudo:checked').attr('codigoControle'));

        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: "Deseja realmente excluir a Habilidade?",
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            cache: false,
                            url: '/Curriculo/RemoverHabilidade',
                            type: 'POST',
                            datatype: 'HTML',
                            data: {
                                conteudoSelecionado: ConteudoSelecionado,
                                codigoControle: CodigoControle
                            },
                            traditional: true,
                            success: function (data, textStatus, jqXHR) {
                                $('#habilidade').html(data);
                                $('.editarHabilidade').click(function () { EditarHabilidade($(this), 'Editar Habilidade'); });
                                RemoverHabilidade();
                                AssociarConteudoHabilidade();

                                editado = true;
                            },
                            //error: function (jqXHR, textStatus, errorThrown) {
                            //    $(document).ajaxStop(function () {
                            //        Mensagem.Alert({
                            //            titulo: "Curriculo",
                            //            mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                            //            tipo: "Erro",
                            //            botao: "Fechar"
                            //        });
                            //    });
                            //}
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
    });
}

var AtualizarHabilidade = function () {
    var ConteudoSelecionado = TratarValorNumerico($('.rdbConteudo:checked').attr('codigoControle'));

    $.ajax({
        cache: false,
        url: '/Curriculo/AtualizarHabilidade',
        type: 'POST',
        datatype: 'HTML',
        data: {
            conteudoSelecionado: ConteudoSelecionado,
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#habilidade').html(data);
            $('.editarHabilidade').click(function () { EditarHabilidade($(this), 'Editar Habilidade'); });
            RemoverHabilidade();
            AssociarConteudoHabilidade();
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

// Dispara os eventos de controle e associacao de conteudo/habilidade
var AssociarConteudoHabilidade = function () {
    $('.chkHabilidade').change(function () {

        var ConteudoSelecionado = TratarValorNumerico($('.rdbConteudo:checked').attr('codigoControle'));
        var CodigoHabilidade = TratarValorNumerico($(this).attr('codigoControle'));

        $.ajax({
            cache: false,
            url: '/Curriculo/AssociarConteudoHabilidade',
            type: 'POST',
            datatype: 'HTML',
            data: {
                conteudoSelecionado: ConteudoSelecionado,
                codigoHabilidade: CodigoHabilidade
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                AtualizarHabilidade();
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
    });
}

var AlterarConteudo = function () {
    $('.rdbConteudo').change(function () {
        AtualizarHabilidade();
    });
}

var ValidarFormularioCadastro = function () {
    $('.form').validate({
        rules: {
            txtAnoLetivoCad: {
                required: true
            },
            ddlDisciplina: {
                required: true
            },
            ddlTipoEnsino: {
                required: true
            },
            ddlSerie: {
                required: true
            },
            ddlBimestre: {
                required: true
            }
        },
        messages: {
            txtAnoLetivoCad: {
                required: "Obrigatório",
            },
            ddlDisciplina: {
                required: "Obrigatório"
            },
            ddlTipoEnsino: {
                required: "Obrigatório"
            },
            ddlSerie: {
                required: "Obrigatório"
            },
            ddlBimestre: {
                required: "Obrigatório"
            }
        }
    });
}

var SalvarCadastro = function () {
    $('#btnSalvarCadastro').click(function (e) {
        e.preventDefault();

        if ($('.form').valid() == false) {
            return;
        }

        $.ajax({
            cache: false,
            url: '/Curriculo/SalvarCadastro',
            type: 'POST',
            datatype: 'HTML',
            data: {
                anoLetivo: TratarValorNumerico($('#txtAnoLetivoCad').val()),
                codigoDisciplina: TratarValorNumerico($('#ddlDisciplina').val()),
                tipoEnsino: TratarValorNumerico($('#ddlTipoEnsino').val()),
                serie: TratarValorNumerico($('#ddlSerie').val()),
                bimestre: TratarValorNumerico($('#ddlBimestre').val())
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == "1") {
                    $('#dialog').dialog('close');
                    $('#dialog').html('');
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
    });
}

/* ==============================  FILTRO ====================================== */

var CarregarSerieFiltro = function () {

    $('.serieFiltro').hide();
    $('#serieFiltro').html('');

    $('#ddlTipoEnsinoFiltro').change(function () {
        var CodigoTipoEnsino = TratarValorNumerico($(this).val());

        $('.serieFiltro').hide();
        $('#serieFiltro').html('');

        if (CodigoTipoEnsino == 0) {
            return;
        }

        var htmlSerie = ' ';
        htmlSerie = htmlSerie + '<select id="ddlSerieFiltro" name="ddlSerieFiltro" class="form-control" > ';
        htmlSerie = htmlSerie + '   <option value="">Selecione...</option> ';

        $.ajax({
            cache: false,
            url: '/TipoEnsino/CarregarListaSerie',
            type: 'POST',
            datatype: 'JSON',
            data: {
                id: CodigoTipoEnsino
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {

                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        htmlSerie = htmlSerie + '   <option value="' + data[i].value + '">' + data[i].text + '</option> ';
                    }
                    htmlSerie = htmlSerie + '</select> ';
                    $('#serieFiltro').html(htmlSerie);
                    $('.serieFiltro').show();

                    $('#ddlSerieFiltro').change(function () {
                        PesquisarDisciplinaFiltro($('#txtAnoLetivoFiltro'), $('#ddlTipoEnsinoFiltro'), $('#ddlSerieFiltro'));
                    });

                    //CarregarDisciplinaPorAnoLetivoFiltro();
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

        //CarregarDisciplinaPorAnoLetivoFiltro();
    });
}

var CarregarDisciplinaPorAnoLetivoFiltro = function (obj) {

    $('#txtAnoLetivoFiltro').blur(function () {

        //var anoLetivo = TratarValorNumerico($('#txtAnoLetivoFiltro').val());

        //if (anoLetivo == anoLetivoAnterior && anoLetivo == 0) {
        //    return;
        //}

        //if (anoLetivo == anoLetivoAnterior) {
        //    FecharMensagemCarregandoPagina();
        //    return;
        //}

        //anoLetivoAnterior = anoLetivo;

        //PesquisarDisciplinaFiltro($('#txtAnoLetivoFiltro'), $('#ddlTipoEnsinoFiltro'), $('#ddlSerieFiltro'));

        //Bloco que controla a seleção do tipo de ensino de acordo com o ano letivo para a tela de pesquisa
        //$("#txtAnoLetivoFiltro").unbind('blur');
        //$("#txtAnoLetivoFiltro").unbind('change');
        //$('#txtAnoLetivoFiltro').autoPreencher($('#ddlTipoEnsinoFiltro'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: '0', AnoLetivo: 'txtAnoLetivoFiltro' }]);
        //$("#txtAnoLetivoFiltro").trigger('change');
        //$("#txtAnoLetivoFiltro").trigger('blur');
        //
    });




}

var ValidarFormularioPesquisa = function () {
    $('.formFiltro').validate({
        rules: {
            txtAnoLetivoFiltro: {
                required: true
            },
            ddlTipoEnsinoFiltro: {
                required: true
            }
        },
        messages: {
            txtAnoLetivoFiltro: {
                required: "Obrigatório",
            },
            ddlTipoEnsinoFiltro: {
                required: "Obrigatório"
            }
        }
    });
}

var PesquisarCurriculo = function () {
    $('#btnPesquisar').click(function (e) {
        e.preventDefault();

        if ($('.formFiltro').valid() == false) {
            return;
        }

        $.ajax({
            cache: false,
            url: '/Curriculo/PesquisarCurriculo',
            type: 'POST',
            datatype: 'HTML',
            data: {
                anoLetivo: TratarValorNumerico($('#txtAnoLetivoFiltro').val()),
                codigoDisciplina: TratarValorNumerico($('#ddlDisciplinaFiltro').val()),
                tipoEnsino: TratarValorNumerico($('#ddlTipoEnsinoFiltro').val()),
                serie: TratarValorNumerico($('#ddlSerieFiltro').val()),
                bimestre: TratarValorNumerico($('#ddlBimestreFiltro').val())
            },
            traditional: true,

            success: function (data, textStatus, jqXHR) {
                $('#result').html(data);
                DetalharCurriculo();
                EditarCurriculo();
                Excluir();
                $('#tabelaCurriculo').sedDataTable({
                    columnDefs: [
			            { targets: [0, 6, 7, 8], orderable: false },
                    ],
                    order: [[1, "asc"]],
                    nomeExportacao: "Currículo",
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
    });
}

/* ============================================================================== */

/* =========================  ACOES GRID PESQUISA =============================== */

var DetalharCurriculo = function () {
    $('.detalhar').click(function () {

        var codigoCurriculo = TratarValorNumerico($(this).children().first().val());

        $.ajax({
            cache: false,
            url: '/Curriculo/Detalhar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigo: codigoCurriculo
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialog').html(data);
                $('#dialog').dialog({ title: 'Visualização do Currículo' });
                DetalharHabilidade();
                Duplicar();
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
    });
}

var DetalharHabilidade = function () {

    $('.rdbConteudo').change(function () {

        var ConteudoSelecionado = TratarValorNumerico($('.rdbConteudo:checked').attr('codigoControle'));

        $.ajax({
            cache: false,
            url: '/Curriculo/DetalharHabilidade',
            type: 'POST',
            datatype: 'HTML',
            data: {
                conteudoSelecionado: ConteudoSelecionado,
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#habilidade').html(data);
                DetalharHabilidade();
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
    });
}

var EditarCurriculo = function () {
    $('.editar').click(function () {

        var codigoCurriculo = TratarValorNumerico($(this).children().first().val());

        $.ajax({
            cache: false,
            url: '/Curriculo/Editar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigo: codigoCurriculo
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialog').html(data);
                $('#dialog').dialog({
                    title: 'Edição de Currículo',
                    open: function () {
                        AssociarConteudoHabilidade();
                    }
                });

                ConfigurarModalConteudo();
                ConfigurarModalHabilidade();

                RemoverConteudo();
                RemoverHabilidade();

                $('.rdbConteudo').change(function () { AtualizarHabilidade(); });

                SalvarAlteracao();



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
    });
}

var SalvarAlteracao = function () {
    $('#btnAtualizar').click(function (e) {
        e.preventDefault();

        $.ajax({
            cache: false,
            url: '/Curriculo/SalvarAlteracao',
            type: 'POST',
            datatype: 'HTML',
            data: {
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == "1") {
                    $('#dialog').dialog('close');
                    $('#dialog').html('');
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
    });
}

var Excluir = function () {

    $('.excluir').click(function () {

        var CodigoCurriculo = TratarValorNumerico($(this).children().first().val());

        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: "Deseja realmente excluir o Currículo?",
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            url: '/Curriculo/Excluir',
                            type: 'POST',
                            dataType: 'HTML',
                            async: true,
                            data: ({
                                codigo: CodigoCurriculo,
                            }),
                            success: function (data, textStatus, jqXHR) {
                                if (data == "1") {
                                    $('#btnPesquisar').trigger('click');
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                Mensagem.CarregarMensagens("Fechar");
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
    });
}

var Duplicar = function () {
    $('#btnDuplicar').click(function () {
        $.ajax({
            url: '/Curriculo/Duplicar',
            type: 'POST',
            dataType: 'HTML',
            async: true,
            data: ({
            }),
            success: function (data, textStatus, jqXHR) {
                $('#dialog').html(data);
                anoLetivoAnterior = 0;
                RemoverConteudo();
                RemoverHabilidade();
                AlterarConteudo();
                CarregarSerie();
                CarregarDisciplinaPorAnoLetivo();
                ConfigurarModalConteudo();
                ConfigurarModalHabilidade();

                AplicarMascaras();
                ValidarFormularioCadastro();
                SalvarCadastro();
                VoltarDuplicacao();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.CarregarMensagens("Fechar");
            }
        });

    });
}

var VoltarDuplicacao = function () {
    $('#btnVoltar').click(function () {

        var codigoCurriculo = TratarValorNumerico($(this).attr('codigoCurriculo'));

        $.ajax({
            cache: false,
            url: '/Curriculo/Detalhar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigo: codigoCurriculo
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialog').html(data);
                $('#dialog').dialog('open');
                DetalharHabilidade();
                Duplicar();
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
    });
}