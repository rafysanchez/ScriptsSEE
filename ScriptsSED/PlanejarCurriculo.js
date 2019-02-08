var InicializarPlanejamentoConteudo = function () {
    BloquearHabilidade();

    SelecionarConteudoAtivo();
    SelecionarConteudo();
    SelecionarHabilidade();

    $('.abas').tabs();
}

var InicializarVisualizacaoPlanejamentoConteudo = function () {
    $('.conteudoAtivo').change(function () {

        var conteudo = $(this).attr('conteudo');

        var habilidadePlanejada = $('.habilidadePlanejadaConteudo[conteudo=' + conteudo + ']').val();
        var habilidadeRealizada = $('.habilidadeRealizadaConteudo[conteudo=' + conteudo + ']').val();

        if (habilidadePlanejada != '') {
            var itens = habilidadePlanejada.split('|');

            $('.habilidadePlanejada').each(function () {

                var selecionado = false;

                for (var i = 0; i < itens.length; i++) {
                    selecionado = selecionado || $(this).attr('habilidade') == itens[i]
                }

                // Marca/Desmarca o checkbox da habilidade.
                if (selecionado) {
                    $(this).attr('checked', 'checked');
                } else {
                    $(this).removeAttr('checked');
                }
            });
        }
        else
        {
            $('.habilidadePlanejada').each(function () { $(this).removeAttr('checked'); });
        }

        if (habilidadeRealizada != '') {
            var itens = habilidadeRealizada.split('|');

            $('.habilidadeRealizada').each(function () {

                var selecionado = false;

                for (var i = 0; i < itens.length; i++) {
                    selecionado = selecionado || $(this).attr('habilidade') == itens[i]
                }

                // Marca/Desmarca o checkbox da habilidade.
                if (selecionado) {
                    $(this).attr('checked', 'checked');
                } else {
                    $(this).removeAttr('checked');
                }
            });
        }
        else {
            $('.habilidadeRealizada').each(function () { $(this).removeAttr('checked'); });
        }
    });

    $('.abas').tabs();
}

var InicializarRealizacaoConteudo = function () {
    BloquearHabilidade();

    SelecionarConteudoAtivoRealizacao();
    SelecionarConteudoRealizacao();
    SelecionarHabilidadeRealizacao();

    $('.abas').tabs();
}

var InicializarVisualizacaoPlanejamentoAtividade = function () {

    $('.conteudoAtivo').change(function () {

        var conteudo = $(this).attr('conteudo');

        var habilidadePlanejada = $('.habilidadeSelecionada[conteudo=' + conteudo + ']').val();

        if (habilidadePlanejada != '') {
            var itens = habilidadePlanejada.split('|');

            $('.habilidade').each(function () {

                var selecionado = false;

                for (var i = 0; i < itens.length; i++) {
                    selecionado = selecionado || $(this).attr('habilidade') == itens[i];
                }

                // Marca/Desmarca o checkbox da habilidade.
                if (selecionado) {
                    $(this).attr('checked', 'checked');
                } else {
                    $(this).removeAttr('checked');
                }
            });
        }
        else {
            $('.habilidade').each(function () { $(this).removeAttr('checked'); });
        }

        $('.conteudo').attr('disabled', 'disabled');
        $('.habilidade').attr('disabled', 'disabled');
    });

    $('.conteudo').attr('disabled', 'disabled');
    $('.habilidade').attr('disabled', 'disabled');

    $('.abas').tabs();
}

/* ================  Eventos   ========================================= */

var SelecionarConteudoAtivo = function () {
    $('.conteudoAtivo').change(function () {
        HabilitarHabilidade($(this));
    });
}

var SelecionarConteudoAtivoRealizacao = function () {
    $('.conteudoAtivo').change(function () {
        HabilitarHabilidadeRealizacao($(this));
    });
}

var SelecionarConteudo = function () {
    $('.conteudo').change(function () {

        var conteudoAnteriorAtivo = $('.conteudoAtivo:checked').attr('conteudo');

        var conteudoAtivo = $('.conteudoAtivo[conteudo=' + $(this).attr('conteudo') + ']');
        $(conteudoAtivo).attr('checked', 'checked');

        var checkBoxAtivo = $(this);

        if ($(this).is(':checked') == false && conteudoAnteriorAtivo != $(this).attr('conteudo')) {
            Mensagem.Alert({
                titulo: "Atenção!",
                mensagem: "Deseja remover a seleção do conteúdo?",
                tipo: "aviso",
                botoes: [
                    {
                        botao: "Sim",
                        callback: function () {
                            $('.habilidadeSelecionada[conteudo=' + $(checkBoxAtivo).attr('conteudo') + ']').val('');
                            HabilitarHabilidade(conteudoAtivo);
                            $.unblockUI();
                        }
                    },
                    {
                        botao: "Não",
                        callback: function () {
                            $(checkBoxAtivo).attr('checked', 'checked');
                            HabilitarHabilidade(conteudoAtivo);
                            $.unblockUI();
                        }
                    }
                ]
            });
        }
        else if ($(this).is(':checked') == false) {
            $('.habilidadeSelecionada[conteudo=' + $(checkBoxAtivo).attr('conteudo') + ']').val('');
        }

        HabilitarHabilidade(conteudoAtivo);
    });
}

var SelecionarConteudoRealizacao = function () {
    $('.conteudoRealizado').change(function () {

        var conteudoAnteriorAtivo = $('.conteudoAtivo:checked').attr('conteudo');

        var conteudoAtivo = $('.conteudoAtivo[conteudo=' + $(this).attr('conteudo') + ']');
        $(conteudoAtivo).attr('checked', 'checked');

        var checkBoxAtivo = $(this);

        if ($(this).is(':checked') == false && conteudoAnteriorAtivo != $(this).attr('conteudo')) {
            Mensagem.Alert({
                titulo: "Atenção!",
                mensagem: "Deseja remover a seleção do conteúdo?",
                tipo: "aviso",
                botoes: [
                    {
                        botao: "Sim",
                        callback: function () {
                            $('.habilidadeRealizadaConteudo[conteudo=' + $(checkBoxAtivo).attr('conteudo') + ']').val('');
                            HabilitarHabilidadeRealizacao(conteudoAtivo);
                            $.unblockUI();
                        }
                    },
                    {
                        botao: "Não",
                        callback: function () {
                            $(checkBoxAtivo).attr('checked', 'checked');
                            HabilitarHabilidadeRealizacao(conteudoAtivo);
                            $.unblockUI();
                        }
                    }
                ]
            });
        }
        else if ($(this).is(':checked') == false) {
            $('.habilidadeRealizadaConteudo[conteudo=' + $(checkBoxAtivo).attr('conteudo') + ']').val('');
        }

        HabilitarHabilidadeRealizacao(conteudoAtivo);
    });
}

var SelecionarHabilidade = function () {
    
    $('.habilidade').change(function () {
        var habilidadeSelecionada = $('.habilidadeSelecionada[conteudo=' + $('.conteudoAtivo:checked').attr('conteudo') + ']').val();

        if ($(this).is(':checked')) {
            habilidadeSelecionada = habilidadeSelecionada + (habilidadeSelecionada == '' ? $(this).attr('habilidade') : '|' + $(this).attr('habilidade'));
        } else {
            if (habilidadeSelecionada != '') {
                var habilidadeAuxiliar = ''
                var listahabilidadeSelecionada = habilidadeSelecionada.split('|');

                for (var i = 0; i < listahabilidadeSelecionada.length; i++) {
                    if (listahabilidadeSelecionada[i] != $(this).attr('habilidade')) {
                        habilidadeAuxiliar = habilidadeAuxiliar + (habilidadeAuxiliar == '' ? listahabilidadeSelecionada[i] : '-' + listahabilidadeSelecionada[i]);
                    }
                }

                habilidadeSelecionada = habilidadeAuxiliar;
            }
        }

        $('.habilidadeSelecionada[conteudo=' + $('.conteudoAtivo:checked').attr('conteudo') + ']').val(habilidadeSelecionada);
    });
}

var SelecionarHabilidadeRealizacao = function () {

    $('.habilidadeRealizada').change(function () {
        var habilidadeSelecionada = $('.habilidadeRealizadaConteudo[conteudo=' + $('.conteudoAtivo:checked').attr('conteudo') + ']').val();

        if ($(this).is(':checked')) {
            habilidadeSelecionada = habilidadeSelecionada + (habilidadeSelecionada == '' ? $(this).attr('habilidade') : '|' + $(this).attr('habilidade'));
        } else {
            if (habilidadeSelecionada != '') {
                var habilidadeAuxiliar = ''
                var listahabilidadeSelecionada = habilidadeSelecionada.split('|');

                for (var i = 0; i < listahabilidadeSelecionada.length; i++) {
                    if (listahabilidadeSelecionada[i] != $(this).attr('habilidade')) {
                        habilidadeAuxiliar = habilidadeAuxiliar + (habilidadeAuxiliar == '' ? listahabilidadeSelecionada[i] : '-' + listahabilidadeSelecionada[i]);
                    }
                }

                habilidadeSelecionada = habilidadeAuxiliar;
            }
        }

        $('.habilidadeRealizadaConteudo[conteudo=' + $('.conteudoAtivo:checked').attr('conteudo') + ']').val(habilidadeSelecionada);
    });
}

/* ================  Ações  ============================================= */

var HabilitarHabilidade = function (radioConteudoAtivo) {
    // Se o conteudo não possui habilidades, bloqueia todas as habilidades
    if ($(radioConteudoAtivo).attr('listaHabilidade') == '') {
        $('.habilidade').each(function () {
            $(this).attr('disabled', 'disabled');
            $(this).removeAttr('checked');
        });

        return;
    }

    // Recupera a lista de habilidade.
    var listaHabilidade = $(radioConteudoAtivo).attr('listaHabilidade').split('|');
    var listaHabilidadeSelecionada = $('.habilidadeSelecionada[conteudo=' + $(radioConteudoAtivo).attr('conteudo') + ']').val().split('|');
    var conteudoChecado = $('.conteudo[conteudo=' + $(radioConteudoAtivo).attr('conteudo') + ']').is(':checked');

    $('.habilidade').each(function () {

        var conteudoHabilidade = false;
        var selecionado = false;

        // Verifica se a habilidade pertence ao conteudo.
        for (var i = 0; i < listaHabilidade.length; i++) {
            conteudoHabilidade = conteudoHabilidade || $(this).attr('habilidade') == listaHabilidade[i];
        }

        // Verifica se a habilidade foi selecionada para o conteudo.
        for (var i = 0; i < listaHabilidadeSelecionada.length; i++) {
            selecionado = selecionado || $(this).attr('habilidade') == listaHabilidadeSelecionada[i]
        }

        // Habilita/Desabilita o checkbox da habilidade.
        if (conteudoHabilidade && conteudoChecado) {
            $(this).removeAttr('disabled');
        } else {
            $(this).attr('disabled', 'disabled');
        }

        // Marca/Desmarca o checkbox da habilidade.
        if (selecionado) {
            $(this).attr('checked', 'checked');
        } else {
            $(this).removeAttr('checked');
        }
    });

}

var HabilitarHabilidadeRealizacao = function (radioConteudoAtivo) {
    // Se o conteudo não possui habilidades, bloqueia todas as habilidades
    if ($(radioConteudoAtivo).attr('listaHabilidade') == '') {
        $('.habilidadeRealizada').each(function () {
            $(this).attr('disabled', 'disabled');
            $(this).removeAttr('checked');
        });

        $('.habilidadePlanejada').each(function () {
            $(this).attr('disabled', 'disabled');
            $(this).removeAttr('checked');
        });

        return;
    }

    // Recupera a lista de habilidade.
    var listaHabilidade = $(radioConteudoAtivo).attr('listaHabilidade').split('|');
    var listaHabilidadeSelecionada = $('.habilidadeRealizadaConteudo[conteudo=' + $(radioConteudoAtivo).attr('conteudo') + ']').val().split('|');
    var conteudoChecado = $('.conteudoRealizado[conteudo=' + $(radioConteudoAtivo).attr('conteudo') + ']').is(':checked');

    $('.habilidadeRealizada').each(function () {

        var conteudoHabilidade = false;
        var selecionado = false;

        // Verifica se a habilidade pertence ao conteudo.
        for (var i = 0; i < listaHabilidade.length; i++) {
            conteudoHabilidade = conteudoHabilidade || $(this).attr('habilidade') == listaHabilidade[i];
        }

        // Verifica se a habilidade foi selecionada para o conteudo.
        for (var i = 0; i < listaHabilidadeSelecionada.length; i++) {
            selecionado = selecionado || $(this).attr('habilidade') == listaHabilidadeSelecionada[i]
        }

        // Habilita/Desabilita o checkbox da habilidade.
        if (conteudoHabilidade && conteudoChecado) {
            $(this).removeAttr('disabled');
        } else {
            $(this).attr('disabled', 'disabled');
        }

        // Marca/Desmarca o checkbox da habilidade.
        if (selecionado) {
            $(this).attr('checked', 'checked');
        } else {
            $(this).removeAttr('checked');
        }
    });

    var listaHabilidadePlanejada = $('.habilidadePlanejadaConteudo[conteudo=' + $(radioConteudoAtivo).attr('conteudo') + ']').val().split('|');

    $('.habilidadePlanejada').each(function () {
        var selecionado = false;

        // Verifica se a habilidade foi selecionada para o conteudo.
        for (var i = 0; i < listaHabilidadePlanejada.length; i++) {
            selecionado = selecionado || $(this).attr('habilidade') == listaHabilidadePlanejada[i]
        }

        // Marca/Desmarca o checkbox da habilidade.
        if (selecionado) {
            $(this).attr('checked', 'checked');
        } else {
            $(this).removeAttr('checked');
        }
    });
}

var BloquearHabilidade = function () {
    $('.habilidade').attr('disabled', 'disabled');

    $('habilidadeRealizada').attr('disabled', 'disabled');
}

/* =============== Funções ================================================= */

var RecuperarConteudoPlanejado = function () {

    var objRetorno = [] ;

    $('.conteudo:checked').each(function (c) {
        var codigo = parseInt($(this).attr('conteudo'));
        var listaHabilidade = new Array()
           
        // Recupera as Habilidades selecionadas para o conteudo.
        var habilidadeSelecionada = $('.habilidadeSelecionada[conteudo=' + $(this).attr('conteudo') + ']').val();

        if (habilidadeSelecionada != '') {
            var listaHabilidadeSelecionada = habilidadeSelecionada.split('|');
            for (var i = 0; i < listaHabilidadeSelecionada.length; i++) {
                listaHabilidade[i] = parseInt(listaHabilidadeSelecionada[i]);
            }
        }

        var serie = $(this).parent().parent().parent().parent().parent().parent().parent().parent().attr('id');

        objRetorno[c] = { Codigo: codigo, ListaHabilidade: listaHabilidade, ListaSerie: serie.substr(0, serie.indexOf('SERIE')) };
    });

    return JSON.stringify(objRetorno).toString();
}

var RecuperarConteudoRealizado = function () {

    var objRetorno = [];

    $('.conteudoRealizado:checked').each(function (c) {
        var codigo = parseInt($(this).attr('conteudo'));
        var listaHabilidade = new Array()

        // Recupera as Habilidades selecionadas para o conteudo.
        var habilidadeSelecionada = $('.habilidadeRealizadaConteudo[conteudo=' + $(this).attr('conteudo') + ']').val();

        if (habilidadeSelecionada != '') {
            var listaHabilidadeSelecionada = habilidadeSelecionada.split('|');
            for (var i = 0; i < listaHabilidadeSelecionada.length; i++) {
                listaHabilidade[i] = parseInt(listaHabilidadeSelecionada[i]);
            }
        }

        objRetorno[c] = { Codigo: codigo, ListaHabilidade: listaHabilidade };
    });

    return JSON.stringify(objRetorno).toString();
}