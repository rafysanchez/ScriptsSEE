$(document).ready(function () {
    AplicarMascaras();
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#formPesquisar").validate({
        rules: {
            anoExercicio: {
                required: true
            },
        },
        submitHandler: function (form) {
            debugger
            var filtros = {
                anoExercicio: $("#anoExercicio").val(),
                mesReferencia: $("#mesReferencia option:selected").val()
            };
            $.ajax({
                url: "/EventualBoFolha/PesquisarRetornoArquivoFolha",
                type: "POST",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    $("#divResulta").html(data);
                    $("#tbFolhaEventual").sedDataTable({
                        columnDefs: [{
                            targets: "nosort",
                            orderable: false
                        }]
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
                }
            });
            return;
        }
    });
});

//SE PASSAR APENAS A MENSAGEM O RESTANTE É 
function mensagemAlert(msg, titulo, tipo, escondido) {
    Mensagem.Alert({
        mensagem: msg,
        titulo: titulo === undefined ? "Eventual" : titulo,
        tipo: tipo === undefined ? "Aviso" : tipo,
        escondido: escondido === undefined ? undefined : "Detalhes: \n" + escondido,
        botao: "Fechar"
    });
}