var _listIds  = [];
var _listIdsTransferidoFnde =[];
$(document).ready(function () {
    eventos();
});

var pdde = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _encaminhar() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/RepasseFndePdde/Encaminhar',
            data: { idsLancamentos: _listIds, idsTransferidosFNDE: _listIdsTransferidoFnde },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        _listIdsTransferidoFnde = [];
                            _listIds = [];
                
                        _pesquisar();
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
    return {
        pesquisar: function () {
            _pesquisar();
        },
        encaminhar: function () {
            _encaminhar();
        },

    }

})();

function eventos() {

    $("#ddlEscolaPesquisa").multiselect();

    
    $("#divContent").on('click', '#btnEncaminhar', function (e) {
        e.preventDefault();
        _listIds.length = 0;
        $('#tblEncaminhamento > tbody > tr').each(function () {
            if ($($(this).find('#chkRepasse')).is(":checked")) {
                _listIds.push($(this).attr('data-id'));
                _listIdsTransferidoFnde.push($(this).attr('data-idTransferido'));
            }
        });

        if (_listIds.length > 0 && _listIdsTransferidoFnde.length > 0) {
            pdde.encaminhar();
        }
        else {
            mensagemAlerta.Alerta('Antes de encaminhar selecione a(s) Escola(s)!');
        }
    });


}




