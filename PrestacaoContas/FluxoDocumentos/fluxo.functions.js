var _fluxo = (function () {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _salvar() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/FluxoDocumentos/Salvar',
            data: $("#formFluxo").serialize(),
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        $("#divFluxoDocumentos").dialog("close");
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

    function _recuperarData(campo) {
        var dataInteira = new Date();
        var mes = ((dataInteira.getMonth().length + 1) === 1) ? (dataInteira.getMonth() + 1) : '0' + (dataInteira.getMonth() + 1);
        var dataAtual = dataInteira.getDate() + "/" + mes + "/" + dataInteira.getFullYear();

        if (dataInteira.getDate() < 10) {
            dataAtual = "0" + dataAtual;
        }
        
        if (campo == 1) {
            $("#dtRecebimento").val(dataAtual);
        }
        else if (campo == 2) {
            $("#dtDevCAnalise").val(dataAtual);
        }
        else {
            $("#dtDevSAnalise").val(dataAtual);
        }
    }

    return {
        salvar: function () {
            _salvar();
        },
        recuperarData: function (campo) {
            _recuperarData(campo);
        }
    }

})();
