

var _devolucaoRecuros = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _salvar() {
        debugger;
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/DevolucaoFDEAPM/Salvar',
            data: $("#frmDevolucaoRecursos").serialize(),
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        $("#divDevolucaoRecursos").dialog("close");
                        debugger;
                        prestacaoContas.atualizarConteudoAbasFdeApm($('#hdfIdTransferidoFdeApm').val(),$('#hdfIdLancamento').val() );
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
            url: newURL + 'prestacaocontas/DevolucaoFDEAPM/Excluir',
            data: { id: $('#hdfIdDevolucaoRecursos').val() },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);

                        prestacaoContas.atualizarConteudoAbasFdeApm($('#hdfIdTransferidoFdeApm').val());

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

    function _obterSaldos() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/DevolucaoFDEAPM/ObterSaldosDevolucaoTotal',
            data: { idTransferidoFdeApm: $('#hdfIdTransferidoFdeApm').val() },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    try {                     
                        $('#ValorDevolucao').val(data);
                    } catch (e) {
                        mensagemAlerta.ErroAjax('Ocorreu um erro durante a busca do saldo' + e.message);
                    }
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
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
        obterSaldos: function () {
            _obterSaldos();
        } 

    }

})();

