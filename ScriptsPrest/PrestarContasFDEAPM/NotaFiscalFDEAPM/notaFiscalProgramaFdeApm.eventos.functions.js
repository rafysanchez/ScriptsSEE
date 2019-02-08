var _formNotaItem = null;
var _notaFiscal = (function () {
    var newURL = window.location.protocol + "//" + window.location.host + "/";
    function _salvar() {
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/NotaFiscalFDEAPM/Salvar',
            data: $("#frmNotaFiscal").serialize(),
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        _atualizarGrid();
                        $("#divNotaFiscais").dialog("close");
                       
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


    function _atualizarGrid()
    {
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/NotaFiscalFDEAPM/ObterLista',
            data: { idTransferidoFdeApm: $('#hdfIdTransferidoFdeApm').val(), idLancamentoRepasseAssociado: $('#hdfIdLancamentoRepasseAssociado').val() },
            type: 'POST',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                $('#divGridNf').html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown)
            {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }



    return {
        salvar: function () {
            _salvar();
        }
    }

})();


