var mapaCultural = {
    salvar: function () {
        var model = mapaCultural.parseForm();
        $.ajax({
            url: "/MapaCultural/Salvar",
            method: "POST",
            data: model,
            success: function (data) {
                Mensagem.Alert({ mensagem: data.mensagem, tipo: data.tipo, titulo: "Sucesso", botao: "Fechar" });
            },
            error: function (data) {
                Mensagem.Alert({ mensagem: data.mensagem, tipo: data.tipo, titulo: "Erro", botao: "Fechar" });
            }
        });
    },

    carregar: function() {
        $.ajax({
            url: "/MapaCultural/BuscarQuestionario",
            method: "GET",
            success: function (data) {
                if (data == null) return;
                mapaCultural.fillForm(data);
            }
        });
    },

    fillForm: function (data) {
        for (var j = 1; j <= 4; j++) {
            var els = $("[name=q" + j + "r]");
            var q = (data["Questao" + j] >>> 0).toString(2).padStart(els.length, "0");
            for (var i = 0; i < q.length; i++) {
                if (q[i] == "1")
                    $(els[i]).attr("checked", "checked");
            }
        }
    },

    parseForm: function () {
        var model = {};
        for (var i = 1; i <= 4; i++) {
            var q = "";
            $("[name=q" + i + "r]").each(function (i, e) {
                q += $(e).is(":checked") ? "1" : "0";
            });
            model["Questao" + i] = parseInt(q, 2);
        }
        return model;
    }
};

$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    mapaCultural.carregar();
});