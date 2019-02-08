var _notaFiscalItens = (function () {
    function _salvar(form) {

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        _formNotaItem = form;
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/NotaFiscalItemFDEAPM/Salvar',
            data: $("#frmNotaFiscalItem").serialize(),
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                if (data != null && data != undefined)
                {
                    var status = data[0].Status;
                    if (status == "Sucesso")
                    {
                        _formNotaItem.IdNotaFiscalItem = data[0]._id;
                        mensagemAlerta(data);
                        $("#divNFI").dialog("close");
                     
                        _atualizarGrid($('#hdfIdTransferidoFdeApm').val(), $('#hdfIdNotaFiscal').val());
                        prestacaoContas.atualizarConteudoAbasFdeApm($('#hdfIdTransferidoFdeApm').val(), $('#hdfIdLancamento').val(), 0, $('#hdfIdLancamentoRepasseAssociado').val());

                        //window.setTimeout(function () {
                             
                           // mensagemAlerta(data);
                           // prestacaoContas.atualizarConteudoAbasFdeApm($('#hdfIdTransferidoFdeApm').val(), $('#hdfIdLancamento').val());
                        //}, 8000);
                    }
                    else
                    {
                        mensagemAlerta(data);
                    }
                }
            },
            error: function (jqXHR, txtStatus, errorThrown)
            {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }

    function _atualizarGrid(idTransferido, id) {

        $("#hdfIdNotaFiscal").attr('value', id);
        $.ajax({
            cache: false,
            url: urlAbsoluta + 'NotaFiscalItemFDEAPM/Obter',
            data: { idNotaFiscal: id, idTransferidoFdeApm: idTransferido, idLancamentoRepasseAssociado: $('#hdfIdLancamentoRepasseAssociado').val() },
            type: 'POST',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                $('#_divDialogObterItensNF').empty().html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown)
            {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    return {
        salvar: function (form) {
            _salvar(form);
        }
    }


})();