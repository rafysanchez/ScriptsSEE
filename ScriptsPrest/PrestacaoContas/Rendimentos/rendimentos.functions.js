
var _rendimentos = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    //function _salvar() {

    //    var vlC = $("#IdCusteio").val() == "" ? "0" : $("#IdCusteio").val();
    //    var vlK = $("#IdCapital").val() == "" ? "0" : $("#IdCapital").val();

    //    $("#IdCusteio").val(vlC.replace(/[^\d]+/g, ''));
    //    $("#IdCapital").val(vlK.replace(/[^\d]+/g, ''));

    //    $.ajax({
    //        cache: false,
    //        url: '../../Rendimentos/Salvar',
    //        data: $("#frmRendimentos").serialize(),
    //        type: 'POST',
    //        datatype: 'JSON',
    //        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    //        success: function (data) {
    //            if (data != null && data != undefined) {
    //                var status = data[0].Status;
    //                if (status == "Sucesso") {
    //                    mensagemAlerta(data);
    //                    $("#divDialogRendimentos").dialog("close");
    //                    prestacaoContas.atualizarConteudoAbas();
    //                } else {
    //                    mensagemAlerta(data);
    //                }
    //            }
    //        },
    //        error: function (jqXHR, txtStatus, errorThrown) {
    //            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
    //        }
    //    });
    //}

    function _excluir(id) {
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Rendimentos/Excluir',
            data: { id: $('#hdfIdRendimento').val() },
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

        var vlC = $("#IdCusteio").val() == "" ? "0" : $("#IdCusteio").val();
        var vlK = $("#IdCapital").val() == "" ? "0" : $("#IdCapital").val();

        $("#IdCusteio").val(vlC.replace(/[^\d]+/g, ''));
        $("#IdCapital").val(vlK.replace(/[^\d]+/g, ''));

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Aprovacao/ReprovarRendimentos',
            data: { idLancamento: $('#hdfLancamento').val(), idRendimentos: $('#hdfIdRendimento').val(), lTipoGlosa: $('#hdfListaTipoGlosa').val() },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        //mensagemAlerta(data);
                        $("#divDialogRendimentos").dialog("close");
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

        var idRendimentos = $(tr).attr('data-id');
        var idLancamento = $(tr).attr('data-lancamento');
        var flFinalizada = $(tr).attr('data-finalizada');

        if (flFinalizada == 'True') { } else {
            $('#hdfLancamento').attr('value', idLancamento);
            $('#hdfIdRendimento').attr('value', idRendimentos);
            $.ajax({
                cache: false,
                url: newURL + 'prestacaocontas/Aprovacao/AprovarRendimentos',
                data: { idLancamento: idLancamento, idRendimentos: idRendimentos },
                type: 'POST',
                datatype: 'HTML',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    if (data != null && data != undefined) {
                        var status = data[0].Status;
                        if (status == "Sucesso") {
                            //mensagemAlerta(data);
                            _atualizarRendimentos();
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

    function _atualizarRendimentos() {
        $.ajax({
            cache: false,
            async: true,
            url: newURL + 'prestacaocontas/Rendimentos/Obter',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                $('#divRend').empty().html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _desfazerAprovacao() {
        $.ajax({
            type: 'POST',
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerAprovacaoRendimentos',
            data: { idRendimentos: $('#hdfIdRendimento').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizarRendimentos();
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
                    //                _atualizarRendimentos();
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
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerReprovacaoRendimentos',
            data: { idRendimentos: $('#hdfIdRendimento').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizarRendimentos();
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
                    //                _atualizarRendimentos();
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
        var tipoLancamentoRendimentos = 6;
        var _tipoLancamento = tipoLancamentoRendimentos;

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
            url: newURL + 'prestacaocontas/Aprovacao/AprovarRendimentosEmLote',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        _atualizarRendimentos();
                    }
                    //  mensagemAlerta(data);

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
    atualizarRendimentos: function () {
        _atualizarRendimentos();
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




