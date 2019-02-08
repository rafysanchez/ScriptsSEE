$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#formCadastro").validate({
        ignore: true,
        rules: {
            anoExercicioCadastro: {
                required: true
            },
            dataInicio: {
                required: true
            },
            dataFim: {  
                required: true
            }
        },
        submitHandler: function () {
            var dados = {
                Codigo: parseInt($("#codigo").val()),
                AnoExercicio: parseInt($("#anoExercicioCadastro").val()),
                DataInicio: $("#dataInicio").val(),
                DataFim: $("#dataFim").val(),
                DataCadastro: $("#dataCadastro").val(),
                DataAlteracao: $("#dataAlteracao").val(),
                CodigoUsuarioCadastro: parseInt($("#codigoUsuarioCadastro").val()),
                CodigoUsuarioAlteracao: parseInt($("#codigoUsuarioAlteracao").val())
            };

            var myObject = JSON.stringify(dados);

            $.ajax({
                url: "/EventualBo/SalvarParametro",
                type: "POST",
                data: myObject,
                contentType: "application/json; charset=utf-8",
                success: function (data, textStatus, xhr) {
                    if (data.TipoException == "sucesso") {
                        $('#modalCadastrar').dialog('destroy')
                        $("#formPesquisar").submit();
                    }
                    Mensagem.Alert({
                        titulo: data.Title,
                        mensagem: data.Message,
                        tipo: data.TipoException, // aviso, erro, sucesso, alerta
                        botao: "Fechar"
                    });

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Mensagem.Alert({
                        titulo: jqXHR.responseJSON.Title,
                        mensagem: jqXHR.responseJSON.Message,
                        tipo: jqXHR.responseJSON.TipoException,
                        escondido: jqXHR.responseJSON.Escondido,
                        botao: "Fechar"
                    });
                }
            });

            return;
        }
    });
    datepickerIntervalo($("#dataInicio"), $("#dataFim"));
    AplicarMascaras();
});