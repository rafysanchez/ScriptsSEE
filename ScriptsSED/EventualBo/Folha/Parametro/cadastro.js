$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#formCadastro").validate({
        ignore: true,
        rules: {
            'AnoExercicio': {
                required: true
            },
            'MesReferencia': {
                required: true
            },
            'DataLimite': {
                required: true
            }
        },
        submitHandler: function () {
            var dados = {
                Codigo: parseInt($("#codigo").val()),
                AnoExercicio: parseInt($("#anoExercicioCadastro").val()),
                MesReferencia: $("#mesReferencia").val(),
                DataLimite: $("#dataLimite").val(),
                DataCadastro: $("#dataCadastro").val(),
                DataAlteracao: $("#dataAlteracao").val(),
                CodigoUsuarioCadastro: parseInt($("#codigoUsuarioCadastro").val()),
                CodigoUsuarioAlteracao: parseInt($("#codigoUsuarioAlteracao").val())
            };

            var myObject = JSON.stringify(dados);

            $.ajax({
                url: "/EventualBo/SalvarParametroFolha",
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
    //datepickerIntervalo($("#dataInicio"), $("#dataFim"));
    AplicarMascaras();
});