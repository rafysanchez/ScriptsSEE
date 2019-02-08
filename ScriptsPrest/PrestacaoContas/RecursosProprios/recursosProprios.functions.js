var _recursosProprios = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _salvar() {
        $("#Custeio").val($("#Custeio").val().replace(/[^\d]+/g, ''));
        $("#Capital").val($("#Capital").val().replace(/[^\d]+/g, ''));

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/RecursosProprios/Salvar',
            data: $("#frmRecursoProprio").serialize(),
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        $("#divRecursosProprios").dialog("close");
                        prestacaoContas.atualizarConteudoAbas();
                    } else {
                        mensagemAlerta(data);
                    }
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                if (errorThrown == "Unauthorized")                  
                    mensagemAlerta.ErroAjax('Você não tem permissão para esta ação. ' + errorThrown);
                else
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }

    function _excluir() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/RecursosProprios/Excluir',
            data: { idRecursosProprios: $('#hdfIdRecursoProprio').val() },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        prestacaoContas.atualizarConteudoAbas();
                    } else {
                        mensagemAlerta(data);
                    }
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                if (errorThrown == "Unauthorized")
                    mensagemAlerta.ErroAjax('Você não tem permissão para esta ação. ' + errorThrown);
                else
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });

    }

    function _reprovar() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Aprovacao/ReprovarRecProprio',
            data: { idLancamento: $('#hdfLancamento').val(), idRecursoProprio: $('#hdfIdRecursoProprio').val(), lTipoGlosa: $('#hdfListaTipoGlosa').val() },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        //mensagemAlerta(data);
                        $("#divDialogReprovaRecProprio").dialog("close");
                        _rendimentos.atualizarRendimentos();
                    } else {
                        mensagemAlerta(data);
                    }
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _aprovar(tr) {

        var idRecursoProprio = $(tr).attr('data-id');
        var idLancamento = $(tr).attr('data-lancamento');
        var flFinalizada = $(tr).attr('data-finalizada');

        if (flFinalizada == 'True') { } else {
            $('#hdfLancamento').attr('value', idLancamento);
            $('#hdfIdRecursoProprio').attr('value', idRecursoProprio);
            $.ajax({
                cache: false,
                url: newURL + 'prestacaocontas/Aprovacao/AprovarRecProprio',
                data: { idLancamento: idLancamento, idRecursoProprio: idRecursoProprio },
                type: 'POST',
                datatype: 'HTML',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    if (data != null && data != undefined) {
                        var status = data[0].Status;
                        if (status == "Sucesso") {
                            //mensagemAlerta(data);
                            _atualizarRecProprio();
                        } else {
                            mensagemAlerta(data);
                        }
                    }
                },
                error: function (jqXHR, txtStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
                }
            });
        }


    }

    function _atualizarRecProprio() {
        $.ajax({
            cache: false,
            async: true,
            url: newURL + 'prestacaocontas/RecursosProprios/Obter',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                $('#divRec').empty().html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _desfazerAprovacao() {
        $.ajax({
            type: 'POST',
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerAprovacaoRecProprio',
            data: { idRecursoProprio: $('#hdfIdRecursoProprio').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizarRecProprio();
                    //Mensagem.Alert({
                    //    titulo: "Sucesso",
                    //    mensagem: data[0].Mensagem,
                    //    tipo: "sucesso",
                    //    botoes:
                    //    [
                    //        {
                    //            botao: "Fechar",
                    //            callback: function (e) {
                    //                e.preventDefault();
                    //                _atualizarRecProprio();
                    //            }
                    //        }
                    //    ]
                    //});
                }
                else {
                    mensagemAlerta(data);
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _desfazerReprovacao() {
        $.ajax({
            type: 'POST',
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerReprovacaoRecProprio',
            data: { idRecursoProprio: $('#hdfIdRecursoProprio').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizarRecProprio();
                    //Mensagem.Alert({
                    //    titulo: "Sucesso",
                    //    mensagem: data[0].Mensagem,
                    //    tipo: "sucesso",
                    //    botoes:
                    //    [
                    //        {
                    //            botao: "Fechar",
                    //            callback: function (e) {
                    //                e.preventDefault();
                    //                _atualizarRecProprio();
                    //            }
                    //        }
                    //    ]
                    //});
                }
                else {
                    mensagemAlerta(data);
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _carregarMotivoGlosa(tr) {
        var tipoLancamentoRecProprio = 5; //TODO: DEVE VIR DO SERVIDOR E NÃO XUMBADO AQUI!! ALTERAR PRA UM HIDDEN DEPOIS
        var _tipoLancamento = tipoLancamentoRecProprio;

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/TipoGlosa/ObterMotivoGlosa',
            data: { idDocumento: $(tr).attr('data-id'), idTipoLancamento: _tipoLancamento },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {

                $("#divMotivoGlosa").empty();
                $("#divMotivoGlosa").html("<div id='modalMotivoGlosa'></div>");
                $("#modalMotivoGlosa").html(data);

                $("#modalMotivoGlosa").dialog({
                    title: "Motivo da Glosa",
                    autoOpen: false,
                    destroy: true,
                    width: 768,
                }).dialog("open");
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });

    }
    function _aprovarEmLote() {
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        $.ajax({
            url: newURL + 'prestacaocontas/Aprovacao/AprovarRecursosPropriosEmLote',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        _atualizarRecProprio();
                    }

                } else { mensagemAlerta(data); }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a aprovação das Notas Fiscais.');
                console.log(jqXHR + '/' + txtStatus + '/' + errorThrown);
            }


        });

    }

    return {
        salvar: function () {
            _salvar();
        },
        excluir: function () {
            _excluir();
        },
        reprova: function () {
            _reprovar();
        },
        aprovar: function (tr) {
            _aprovar(tr);
        },
        atualizarRecProprio: function () {
            _atualizarRecProprio();
        },
        desfazerAprovacao: function () {
            _desfazerAprovacao();
        },
        desfazerReprovacao: function () {
            _desfazerReprovacao();
        },
        carregarMotivoGlosa: function (tr) {
            _carregarMotivoGlosa(tr);
        }
        ,
        aprovarEmLote: function () {
            _aprovarEmLote();
        }

    }

})();

