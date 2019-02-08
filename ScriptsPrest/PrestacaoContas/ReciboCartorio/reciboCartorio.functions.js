var _reciboCartorio = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _salvar(){

    $.ajax({
        cache: false,
        url: newURL + 'prestacaocontas/ReciboCartorio/Salvar',
        data: $("#frmReciboCartorio").serialize(),
        type: 'POST',
        datatype: 'JSON',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            if (data != null && data != undefined) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    mensagemAlerta(data);
                    $("#divReciboCartorio").dialog("close");
                    prestacaoContas.atualizarConteudoAbas();
                } else {
                    mensagemAlerta(data);
                }
            }
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
        }
    });
}

    function _excluir() {

    $.ajax({
        cache: false,
        url: newURL + 'prestacaocontas/ReciboCartorio/Excluir',
        data: { id: $('#hdfIdReciboCartorio').val() },
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
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
        }
    });
}

    function _reprovar() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Aprovacao/ReprovarReciboCartorio',
            data: { idLancamento: $('#hdfLancamento').val(), idReciboCartorio: $('#hdfIdReciboCartorio').val(), lTipoGlosa: $('#hdfListaTipoGlosa').val() },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        //mensagemAlerta(data);
                        $("#divReciboCartorio").dialog("close");
                        _reciboCartorio.atualizarRendimentos();
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

        var idReciboCartorio = $(tr).attr('data-id');
        var idLancamento = $(tr).attr('data-lancamento');
        var flFinalizada = $(tr).attr('data-finalizada');

        if (flFinalizada == 'True') { } else {
            $('#hdfLancamento').attr('value', idLancamento);
            $('#hdfIdReciboCartorio').attr('value', idReciboCartorio);
            $.ajax({
                cache: false,
                url: newURL + 'prestacaocontas/Aprovacao/AprovarReciboCartorio',
                data: { idLancamento: idLancamento, idReciboCartorio: idReciboCartorio },
                type: 'POST',
                datatype: 'HTML',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    if (data != null && data != undefined) {
                        var status = data[0].Status;
                        if (status == "Sucesso") {
                          //  mensagemAlerta(data);
                            _atualizarReciboCartorio();
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

    function _atualizarReciboCartorio() {
        $.ajax({
            cache: false,
            async: true,
            url: newURL + 'prestacaocontas/ReciboCartorio/Obter',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                $('#divRecCartorio').empty().html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _desfazerAprovacao() {
        $.ajax({
            type: 'POST',
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerAprovacaoReciboCartorio',
            data: { idReciboCartorio: $('#hdfIdReciboCartorio').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizarReciboCartorio();
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
                    //                _atualizarReciboCartorio();
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
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerReprovacaoReciboCartorio',
            data: { idReciboCartorio: $('#hdfIdReciboCartorio').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizarReciboCartorio();
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
                    //                _atualizarReciboCartorio();
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
        var tipoLancamentoReciboCartorio = 13;
        var _tipoLancamento = tipoLancamentoReciboCartorio;

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
            url: newURL + 'prestacaocontas/Aprovacao/AprovarReciboCartorioEmLote',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        _atualizarReciboCartorio();
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
    atualizarReciboCartorio: function () {
        _atualizarReciboCartorio();
    },
    desfazerAprovacao: function () {
        _desfazerAprovacao();
    },
    desfazerReprovacao: function () {
        _desfazerReprovacao();
    },
    carregarMotivoGlosa: function (tr) {
        _carregarMotivoGlosa(tr);
    },
    aprovarEmLote: function () {
        _aprovarEmLote();
    }


}

})();
