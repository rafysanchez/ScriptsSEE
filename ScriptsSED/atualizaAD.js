utils = {
    ajax: function (url, parametrosController, retorno, dataType) {
        var ajaxExecucao = {
            cache: false,
            async: true,
            url: url,
            data: parametrosController,
            type: "POST",
            dataType: dataType != undefined ? dataType : "html",
            success: retorno,
            error: utils.ajaxErro
        };
        $.ajax(ajaxExecucao);
    }
}

controller = {
    Pesquisar: function () {
        if ($('#tLogin').val() == "" && $('#tCpf').val() == "") {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Preencha pelo menos um dos filtros de pesquisa.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        var parametros = { tLogin: $("#tLogin").val(), tCpf: $("#tCpf").val() }

        utils.ajax("/AD/ParcialDados",
           parametros,
           function (retorno) {
               $("#dvDados").html(retorno);
           });

    },

    Ativar: function () {
        $.ajax(
        {
            url: '/AD/Ativar',
            data: { login: $('#Login').val() },
            success: function (data) {
            }
        });
    },

    Desativar: function () {
        $.ajax(
        {
            url: '/AD/Desativar',
            data: { login: $('#Login').val() },
            success: function (data) {
            }
        });
    },

    SalvarDadosAD: function () {

        var form = $('#FormAD').serialize();

        $.ajax(
        {
            url: '/AD/Salvar',
            data: form,
            success: function (data) {

            }
        });
    }
}