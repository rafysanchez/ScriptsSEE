var questionario = {
    criarValidacao: function() {
        $("#form-questionario").validate({
            rules: {
                CodigoSatisfacao: { required: true },
                CodigoFavorita: { required: true }
            },

            submitHandler: function () {
                $.ajax({
                    method: "POST",
                    url: "/AlunoQuestionario/Salvar",
                    data: $("#form-questionario").serialize(),
                    success: function (data) {
                        $("#Codigo").val(data.codigo);
                        Mensagem.Alert({
                            titulo: data.tipo,
                            tipo: data.tipo,
                            mensagem: data.mensagem,
                            botao: "Fechar"
                        });
                    },
                    error: function (data) {
                        Mensagem.Alert({
                            titulo: data.tipo,
                            tipo: data.tipo,
                            mensagem: data.mensagem,
                            botao: "Fechar"
                        });
                    }
                })
            }
        });
    }
};

$(document).ready(function () {
    questionario.criarValidacao();
    Mensagem.IgnorarMensagensAutomaticas = true;
});