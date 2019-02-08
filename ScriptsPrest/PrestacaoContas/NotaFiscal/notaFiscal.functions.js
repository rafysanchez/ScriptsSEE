var _notaFiscal = (function () {


    function _excluir() {

        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/NotaFiscal/Excluir',
            data: { id: $('#hdfIdNotaFiscal').val() },
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

    function _aprovar(tr) {
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Aprovacao/AprovarNotaFiscal',
            data: { idLancamento: $('#hdfLancamento').val(), idNotaFiscal: $('#hdfIdNotaFiscal').val() },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        //mensagemAlerta(data);
                        _atualizar();


                        $(tr)
                        .velocity({ opacity: 0 }, 3000)
                        .velocity("reverse");


 
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

    function _reprovar() {
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Aprovacao/ReprovarNotaFiscal',
            data: { idLancamento: $('#hdfLancamento').val(), idNotaFiscal: $('#hdfIdNotaFiscal').val(), lTipoGlosa: $('#hdfListaTipoGlosa').val() },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                       // mensagemAlerta(data);
                        $("#divDialogReprovaNF").dialog("close");
                        _atualizar();
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

    function _desfazerAprovacao() {
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $.ajax({
            type: 'POST',
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerAprovacaoNotaFiscal',
            data: { idNotaFiscal: $('#hdfIdNotaFiscal').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
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
                    //                _atualizar();
                    //            }
                    //        }
                    //    ]
                    //});
                    _atualizar();
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
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $.ajax({
            type: 'POST',
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerReprovacaoNotaFiscal',
            data: { idNotaFiscal: $('#hdfIdNotaFiscal').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
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
                    //                _atualizar();
                    //            }
                    //        }
                    //    ]
                    //});
                    _atualizar();
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

    function _atualizar() {
        var newURL = window.location.protocol + "//" + window.location.host + "/";
      
        try {
              $.ajax({
            cache: false,
            async: true,
            url: newURL + 'prestacaocontas/NotaFiscal/Obter',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                debugger;
                $('#divNf').empty().html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
        } catch (e) {
            debugger;
        }

    }

    function _enviarPrestacaoAvaliacao() {

        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Aprovacao/EncerrarPrestacaoContas',
            data: { idLancamento: idLancamento },
            type: 'POST',
            datatype: 'Json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        $("#divPContas").dialog("close");
                        _aprovacao.pesquisar();
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

    function _visualizarMotivoGlosa(btn) {
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/TipoGlosa/ObterMotivoGlosa',
            data: { idDocumento: $(btn).attr('data-id'), idTipoLancamento: 2 },
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

    function _aprovarNotaFiscalEmLote() {
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        try {
            
        $.ajax({
            url: newURL + 'prestacaocontas/Aprovacao/AprovarNotaFiscalEmLote',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                debugger;
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        _atualizar();
                    } else {
                        mensagemAlerta.ErroAjax('Ocorreu um erro durante a aprovação das Notas Fiscais.');
                    }
                    //  mensagemAlerta(data);
                 
                } else { mensagemAlerta(data); }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a aprovação das Notas Fiscais.');
                console.log(jqXHR + '/' + txtStatus + '/' + errorThrown);
            }


        });
        } catch (e) {
            debugger;
        }

    }

    return {
        removeLinha: function (){
            _removeLinha();
        },

        excluir: function () {
            _excluir();
        },
        aprovar: function (tr) {
            _aprovar(tr);
        },
        reprovar: function () {
            _reprovar();
        },
        desfazerAprovacao: function () {
            _desfazerAprovacao();
        },
        desfazerReprovacao: function () {
            _desfazerReprovacao();
        },
         atualizar: function () {
             _atualizar();
         },
         enviarPrestacaoAvaliacao: function () {
             _enviarPrestacaoAvaliacao();
         },
         visualizarMotivoGlosa: function (btn) {
             _visualizarMotivoGlosa(btn);
         },
         aprovarNotaFiscalEmLote: function () {
             _aprovarNotaFiscalEmLote();
         }

    }

})();


