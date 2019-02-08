var grid = grid || {};

grid.Instance = function () {

    $("#CodDiretoria").autoPreencher($('#CodEscola'), 'MaterialEscolar', 'CarregarListaTodasEscolas');

    grid.CalcularDiferenca();
    grid.LinkRemanescente();
    grid.Salvar();
    grid.CopiarQuantidade();
    grid.SalvarRemanescente();
    grid.DatePicker();
    grid.Validacao();
}

grid.CalcularDiferenca = function () {
    var result = $("#tblResultado > tbody > tr > td");

    $(result).each(function () {

        var attr = $(this).attr("class");

        if (attr !== "") {

            var tdResult = $("#tblResultado > tbody > tr").find('td[class=' + attr + ']');

            var totalMaterial = $($(tdResult[0]).find("input")).val();
            var totalRecebido = $($(tdResult[1]).find("input")).val();
            var calculado = totalRecebido - totalMaterial;
            ;

            //console.log(totalMaterial - totalRecebido);
            $($(tdResult[2]).find("label")).text(calculado);

            $($(tdResult[3]).find("a")).attr("data-calculado", calculado);

            if (totalRecebido > 0) {
                $($(tdResult[1]).find("input")).attr("disabled", "true");
            }
        }

    });
}

grid.AlterarRecebido = function (obj) {

    var data = $("#txtDataEnvioRemanejamento").val();

    if (data === '') {
        Mensagem.Alert({
            titulo: "Atenção",
            mensagem: "Preencha a data de recebimento.",
            tipo: "Aviso",
            botao: "Fechar"
        });
        return;
    }

    var colCss = obj.parentElement.attributes["class"].value;

    var result = $("#tblResultado > tbody > tr").find('td[class=' + colCss + ']');
    var thResult = $("#tblResultado > thead > tr").find('th[class=' + colCss + ']');

    var totalMaterial = $($(result[0]).find('input')).val();
    var totalRecebido = $($(result[1]).find('input')).val();
    var calculado = totalRecebido - totalMaterial;

    //console.log(totalMaterial - totalRecebido);
    $($(result[2]).find("label")).text(calculado);

    $($(result[3]).find("a")).attr("data-calculado", calculado);

    $.ajax({
        cache: false,
        url: "/MaterialEscolar/SalvarMerge",
        type: "POST",
        datatype: "json",
        data: {
            codigoDiretoria: $("#CodigoDiretoria").val(),
            codigoEscola: $("#CodigoEscola").val(),
            codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
            codigoTurma: $(thResult).attr("id"),
            codigoDisciplina: $("#CodigoDisciplina").val(),
            quantidade: totalRecebido,
            data: $("#txtDataEnvioRemanejamento").val(),
            semestre: $("#CodigoSemestre").val()
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            console.log("Coluna salva com sucesso.");
        }
    });
}

grid.LinkRemanescente = function () {
    $("#tblResultado tbody > tr > td > a").click(function () {

        var turma = $(this).attr("data-turma");
        var codTurma = $(this).attr("data-codTurma");
        var calculado = $(this).attr("data-calculado");
        var QuantidaRemanejar = $(this).attr("data-remanejar");

        $("#CodigoTurma").val(turma);
        $("#CodTurma").val(codTurma);

        $($("#resultadoGridEscola").find("label")[0]).text(calculado);
        $("#txtQuantidadeEnviada").val("");
        $("#txtEmailEscola").val("");
        $("#CodEscola").val("");
        $("#txtDataEnvioRemanejamento").val("");
        $("#txtQuantidadeRemanejar").val(QuantidaRemanejar);

        $('#resultadoGridEscola').dialog({
            autoOpen: false,
            modal: true,
            width: 810,
            title: turma,
            position: ['center', 'center'],
            resizable: true,
            dragable: false,
            show: {
                effect: "blind",
                duration: 200
            },
            beforeClose: function (event, ui) {
            },
            close: function (event, ui) {
            }
        }).dialog('open');
    });
}

grid.Salvar = function () {
    $("#btnSalvar").click(function () {
        if (!$('#formData').valid()) return;

        var QtdEnviada = $("#txtQuantidadeEnviada").val();
        var QtdRemanejada = $("#txtQuantidadeRemanejar").val();
        var CodigoEscola = $("#CodEscola").val();
        var DataEnvio = $("#txtDataEnvioRemanejamento").val();
        var codigoDisciplina = $('#CodigoDisciplina').val();
        var email = $('#txtEmailEscola').val();
        var CodigoEscolaOrigem = $("#CodigoEscola").val();
        var codigoSemestre = $("#CodigoSemestre").val();

        if (parseInt(QtdEnviada) > parseInt(QtdRemanejada)) {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "A quantidade enviada não pode ser maior que a quantidade remanejada.",
                tipo: "Erro",
                botao: "Fechar"
            });
            return;
        }
        else if (QtdRemanejada == 0) {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Você não tem saldo para enviar material.",
                tipo: "Erro",
                botao: "Fechar"
            });
            return;
        }
        else if (QtdEnviada == 0) {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Preencha a quantidade a ser enviada.",
                tipo: "Erro",
                botao: "Fechar"
            });
            return;
        }
        else if (DataEnvio == "") {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Preencha a data de envio.",
                tipo: "Erro",
                botao: "Fechar"
            });
            return;
        }

        if (email.length > 0 && !$.validateEmail(email)) {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Preencha um e-mail válido.",
                tipo: "Erro",
                botao: "Fechar"
            });
            return
        }

        if (CodigoEscola == CodigoEscolaOrigem) {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Não é permitido o remanejamento para a própria escola.",
                tipo: "Erro",
                botao: "Fechar"
            });
            return
        }

        var dataJaExiste = $("#Anos_0__DataJaExiste").val();

        $.post("../MaterialEscolar/SalvarRemanejamento", {
            codigoDiretoria: $('#CodDiretoria').val(),
            codigoEscola: $("#CodEscola").val(),
            codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
            codigoDisciplina: $('#CodigoDisciplina').val(),
            quantidadeEnviada: $("#txtQuantidadeEnviada").val(),
            ano: $('#CodTurma').val(),
            dataEnvio: $("#txtDataEnvioRemanejamento").val(),
            emailEscola: $("#txtEmailEscola").val(),
            codigoEscolaOrigem: CodigoEscolaOrigem,
            codigoSemestre: codigoSemestre
        }).done(function (data) {
            Mensagem.Alert({
                titulo: "Sucesso",
                mensagem: "Materiais enviados com sucesso.",
                tipo: "Sucesso",
                botao: "Fechar",
                callback: function () {
                    $("#CodEscola").val('');
                    $("#txtQuantidadeEnviada").val('');
                    $("#txtDataEnvioRemanejamento").val('');
                    $('#CodigoDisciplina').val('');
                    $("#txtEmailEscola").val('');
                    $('#CodigoDisciplina').val(codigoDisciplina).trigger('change');
                    $('#resultadoGridEscola').dialog('close');
                }
            });
        });
    });

}

$.validateEmail = function (email) {
    er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;
    if (er.exec(email))
        return true;
    else
        return false;
};


grid.Validacao = function () {
    $("#formData").validate({
        rules: {
            txtQuantidadeEnviada: { required: true, maxlength: 5 },
            CodEscola: { required: true },
            txtDataEnvioRemanejamento: { required: true }
        },
        messages:
        {
            txtQuantidadeEnviada: { required: "Obrigatório" },
            CodEscola: { required: 'Obrigatório' },
            txtDataEnvioRemanejamento: { required: 'Obrigatório' }
        }
    });
};

grid.SalvarRemanescente = function () {
    $("#btnSalvarRemasnecente").click(function () {

        $.ajax({
            cache: false,
            url: "/MaterialEscolar/Salvar",
            type: "POST",
            datatype: "json",
            data: {
                codigoDiretoria: $("#CodigoDiretoria").val(),
                codigoEscola: $("#CodigoEscola").val(),
                codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
                codigoTurma: $("#CodigoTurma").val(),
                codigoDisciplina: $("#CodigoDisciplina").val(),
                quantidade: $("#txtRecebidoRemanescente").val(),
                data: $("#txtDataRemanescente").val(),
                codigoSemestre: $("#CodigoSemestre").val()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                Mensagem.Alert({
                    titulo: "Sucesso",
                    mensagem: "Recebimento registrado com sucesso.",
                    tipo: "Sucesso",
                    botoes: [
                    {
                        botao: "Fechar",
                        callback: function () {
                            recebido.LoadGridRecebimento();
                            $('#resultadoGridEscola').dialog('close');
                        }
                    }]
                });


            }
        });

    });
}

grid.CopiarQuantidade = function () {
    $("#btnCopiarQtd").click(function () {
        var data = $("#txtDataEnvioRemanejamento").val();

        if (data === '') {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Preencha a data de recebimento.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        var result = $("#tblResultado > tbody > tr > td");

        $(result).each(function () {

            var attr = $(this).attr("class");

            if (attr !== "") {

                var tdResult = $("#tblResultado > tbody > tr").find('td[class=' + attr + ']');
                var thResult = $("#tblResultado > thead > tr").find('th[class=' + attr + ']');

                var totalMaterial = $($(tdResult[0]).find("input")).val();

                $($(tdResult[1]).find("input")).val(totalMaterial);

                var totalRecebido = totalMaterial;
                var calculado = totalMaterial - totalRecebido;

                console.log(totalMaterial - totalRecebido);
                $($(tdResult[2]).find("label")).text(calculado);

                $($(result[3]).find("a")).attr("data-calculado", calculado);

                if (totalMaterial > 0) {

                    $.ajax({
                        cache: false,
                        url: "/MaterialEscolar/SalvarMerge",
                        type: "POST",
                        datatype: "json",
                        data: {
                            codigoDiretoria: $("#CodigoDiretoria").val(),
                            codigoEscola: $("#CodigoEscola").val(),
                            codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
                            codigoTurma: $(thResult).attr("id"),
                            codigoDisciplina: $("#CodigoDisciplina").val(),
                            quantidade: totalMaterial,
                            data: $("#txtDataEnvioRemanejamento").val(),
                            semestre: $("#CodigoSemestre").val()
                        },
                        traditional: true,
                        success: function (data, textStatus, jqXHR) {
                            console.log("Coluna salva com sucesso.");
                        }
                    });
                }
            }

        });
    });
}

grid.DatePicker = function () {
    $("#txtDataEnvioRemanejamento").attr('readonly', 'true').datepicker();
    $("#txtDataRemanescente").attr('readonly', 'true').val("").datepicker();
}

$(function () {
    grid.Instance();
});