
$(document).ready(function () {
    eventos();
});


var seuModulo = (function () {


    function getToken() {
        return token = $('input[name="__RequestVerificationToken"]').val();
    }

    function salvar(input) {
        var _frm = {
            "campo": $("#input").val(),
            "campo": $("#input").val(),
            "campo": $("#input").val(),
            "campo": $("#input").val()
        };
        $.ajax({
            cache: false,
            url: '.../Salvar',
            data: { __RequestVerificationToken: getToken(), formController: _frm },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        atualizarGrid();
                        var _modal = $('#modalCadastro');
                        mensagemAlerta(data, _modal);
                    } else {
                        mensagemAlerta(data);
                    }

                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
            }
        });
    }

    function excluir() {
        $.ajax({
            url: '.../Excluir',
            data: JSON.stringify({ id: id }),
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    mensagemAlerta(data);
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        window.setTimeout(function () {
                            $($('#modalExcluir')).modal("hide");
                            atualizarGrid();
                        }, 2000);
                    } else {
                        mensagemAlerta(data);
                    }
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
            }
        });
    }

    function atualizarRegistros() {
        $.ajax({
            url: '',
            type: 'POST',
            datatype: 'html',
            success: function (data) {

                $("#divGrid").html(data);

                funcoesAuxiliares.formatarGrid();
              
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
            }
        });
    }


    return {
        adicionar: function () {
            salvar();
        },
        remover: function () {
            excluir();
        },

        carregarGrid: function () {
            atualizarRegistros();
        }

    }

})();


var eventos = function () {

    $("#btnNovo").click(function () {
       
    });

    $("#btnSalvar").click(function () {
        seuModulo.adicionar();
    });

    $("#btnExcluir").click(function () {
        seuModulo.remover();
    });

}



