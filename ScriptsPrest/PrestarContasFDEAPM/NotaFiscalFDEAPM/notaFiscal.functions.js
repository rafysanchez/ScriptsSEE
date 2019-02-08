var _formNotaItem = null;
var _notaFiscal = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _excluir() {
       
        var id = $('#hdfIdNotaFiscal').val();
        debugger;
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/NotaFiscalFDEAPM/Excluir',
            data: { idNotaFiscal: $('#hdfIdNotaFiscal').val() },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        prestacaoContas.atualizarConteudoAbasFdeApm($('#hdfIdTransferidoFdeApm').val(), $('#hdfIdLancamento').val());

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


    return {
        //salvar: function () {
        //    _salvar();
        //},
        excluir: function () {
            _excluir();
        },

    }

})();


