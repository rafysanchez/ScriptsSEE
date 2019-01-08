var _notaFiscalItens = (function () {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _salvar(idNotaFiscal)
    {
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/NotaFiscalItem/Salvar',
            data: $("#frmNotaFiscalItem").serialize(),
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        $("#divDialogNFI").dialog("close");
                        _atualizarGrid(idNotaFiscal);
                        prestacaoContas.atualizarConteudoAbas();                                        
                        window.setTimeout(function () {
                            mensagemAlerta(data);
                        }, 3000);

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

    function _excluir(tr) {
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/NotaFiscalItem/Excluir',
            data: { id: $('#hdfIdNotaFiscalItem').val() },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        $("#tblNotaFiscalItem").find($(tr)).remove();
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

    function _atualizarGrid(idNotaFiscal) {
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/NotaFiscalItem/CarregarNotaFiscalItens',
            data: { idNotaFiscal: idNotaFiscal, idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                $('#divNotaFiscalItemNotaFiscal').empty().html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    return {
        salvar: function (idNotaFiscal) {
            _salvar(idNotaFiscal);
        },
        excluir: function (tr) {
            _excluir(tr);
        }
    }

})();