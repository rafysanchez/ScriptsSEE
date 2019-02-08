
function atualizarRetornoFolha() {
    var filtros = {
        anoExercicio: $("#anoExercicio").val(),
        mesPublicacao: $("#mesReferencia option:selected").val() != "" ? parseInt($("#mesReferencia option:selected").val()) : 0,
    };
    $.ajax({
        url: "/EventualBoFolha/AtualizarRetornoFolha",
        type: "POST",
        data: filtros,
        success: function (data, textStatus, xhr) {
            if (data.TipoException == "sucesso") {
                $("#formPesquisar").submit();
                Mensagem.Alert({
                    titulo: data.Title,
                    mensagem: data.Message,
                    tipo: "sucesso",
                    botao: "Fechar"
                });
            } else {
                Mensagem.Alert({
                    titulo: data.Title,
                    mensagem: data.Message,
                    tipo: data.TipoException,
                    botao: "Fechar"
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}



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