var ex = {
    num: function (valor) {
        if (valor == undefined || valor == '' || isNaN(valor))
            return 0;
        return parseInt(valor);
    },

    ajax: function (url, dt, callback) {
        var ajaxObj = {
            cache: false,
            url: url,
            type: "POST",
            data: dt,
            success: callback,
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop(function () {
                    Mensagem.Alert({
                        titulo: "Erro",
                        mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                        tipo: "Erro",
                        botao: "Fechar"
                    });
                });
            }
        };

        if (url.indexOf("Salvar") > -1) {
            ajaxObj.data = { str: JSON.stringify(dt) };
            ajaxObj.dataType = "json";
        }

        $.ajax(ajaxObj);
    }
}

var avaliacaoNovaParam = {
    editar: function (el) {
        ex.ajax("/AvaliacaoNovaParam/Editar",
        { codigo: $(el).attr("codigo") },
        function (data, textStatus, jqXHR) {
            $("#dialog").html(data);
            $("#dialog").dialog({
                autoOpen: true,
                modal: true,
                width: 850,
                title: "Editar Parametrização"
            }).dialog("open");
        });
    },

    excluir: function (codigo) {
        ex.ajax("/AvaliacaoNovaParam/Excluir",
        { codigo: codigo },
        function (data, textStatus, jqXHR) {
            $("#dialog").dialog("close");
            location.reload();
        });
    }
}

$(document).ready(function () {
    $("#tabelaParametros").sedDataTable();
});