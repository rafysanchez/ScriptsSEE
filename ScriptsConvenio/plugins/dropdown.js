
var _dropDown = (function(){

    function _carregarDropMultSelect(dropdown, url, value) {
        debugger;
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({ codigo: value }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data != undefined && data.length > 0) {
                    $(dropdown).multiselect("destroy");
                    $(dropdown).empty().append($("<option></option>").attr("value", "0").text("Selecione..."));
                    $(data).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo(dropdown);
                    });

                    $(dropdown).multiselect({
                        noneSelectedText: "Faça sua seleção aqui",
                        selectedText: multiSelectTextoPadrao,
                    }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a listagem' + errorThrown);
            }
        });
    }

    return {
        carregarDropMultSelect: function (dropdown, url, value) {
            _carregarDropMultSelect(dropdown, url, value);
        }

    }

 })();