function SalvarSuspensao() {
    if ($("#codigoMotivoDispensa").val() == "") {
        $("#codigoMotivoDispensa").addClass("error");

        if ($("#dataVigenciaDispensa").val() == "") {
            $("#dataVigenciaDispensa").addClass("error");
            return;
        }
        else {
            $("#dataVigenciaDispensa").removeClass("error");
        }
        return;
    }
    else {
        if ($("#dataVigenciaDispensa").val() == "") {
            $("#dataVigenciaDispensa").addClass("error");
            return;
        }
        else {
            $("#dataVigenciaDispensa").removeClass("error");
        }
    }


    $("#dataVigenciaDispensa").removeClass("error");
    $("#codigoMotivoDispensa").removeClass("error");

    
    var dados = {};
    dados.AnoExercicio = parseInt($("#anoExercicioCadastro").val());
    dados.Cpf = $("#cpfCadastro").val().replace(/\./g, '').replace(/\-/g, '');
    dados.DT_SUSP = $("#dataVigenciaDispensa").val();
    dados.Status = $("#codigoMotivoDispensa option:selected").val();
    dados.CodigoMotivoDispensa = parseInt($("#codigoMotivoDispensa").val());

    var myObject = JSON.stringify(dados);

    $.ajax({
        url: "/Suspender/SuspenderContrato",
        type: "POST",
        data: myObject,
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus, xhr) {
            if (data.TipoException == "sucesso") {
                $("#modalCadastrar").dialog("destroy");
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
            Mensagem.Alert({
                titulo: jqXHR.responseJSON.Title,
                mensagem: jqXHR.responseJSON.Message,
                tipo: jqXHR.responseJSON.TipoException,
                escondido: jqXHR.responseJSON.Escondido,
                botao: "Fechar"
            });
        }
    });
}