var grid = grid || {};

grid.Instance = function () {
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

    var data = $("#txtDataRecebimento").val();

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
            data: $("#txtDataRecebimento").val(),
            semestre: $("#CodigoSemestre").val()
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            console.log("Coluna salva com sucesso.");
        }
    });
}

grid.LinkRemanescente = function () {
    $("#tblResultado tbody > tr > td > a > i").click(function () {

        var turma = $(this).attr("data-turma");
        var descricaoTurma = $(this).attr("data-DescricaoTurma");
        var calculado = $(this).attr("data-calculado");
        var nomeEscola = $(this).attr("data-nmEscola");
        var QtdRecebida = $(this).attr("data-qtdRecebidaOrigem");
        var codigoDisciplina = $(this).attr("data-codDisciplina");
        var codigoTipoEnsino = $(this).attr("data-codTipoEnsino");
        var status = $(this).attr("data-status");
        var quantidadeConfirmada = $(this).attr("data-qtdconfirmado");
        var DataConfirmacao = $(this).attr("data-dataconfirmacaorecebimento");
        var codigoRemanejamento = $(this).attr("data-codigoRemanejamento");

        $("#lblEscolaOrigem").html(nomeEscola);
        $("#CodigoTurma").val(turma);
        $("#txtQuantidadeEnviada").val(QtdRecebida);
        $("#CodigoDisciplina").val(codigoDisciplina);
        $("#CodigoTipoEnsino").val(codigoTipoEnsino);
        $("#CodigoRemanescente").val(codigoRemanejamento);
        
        if (status == 'CONFIRMADO') {
            $("#txtRecebidoRemanescente").val(quantidadeConfirmada);
            $("#txtDataRemanescente").val(DataConfirmacao);
            $("#txtRecebidoRemanescente").attr('disabled', 'true');
            $("#txtDataRemanescente").attr('disabled', 'true');
            $("#btnSalvarRemasnecente").attr('disabled', 'true');
        }
        else {
            $("#txtRecebidoRemanescente").val('');
            $("#txtDataRemanescente").val('');
            $("#txtRecebidoRemanescente").removeAttr('disabled');
            $("#txtDataRemanescente").removeAttr('disabled');
            $("#btnSalvarRemasnecente").removeAttr('disabled');
        }

        $("#txtRecebidoRemanescente").attr('maxlength', '6');

        $('#resultadoGridEscola').dialog({
            autoOpen: false,
            modal: true,
            width: 810,
            title: descricaoTurma,
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

        if ($("#txtDataRecebimento").val() === "") {

            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Preencha a data de recebimento.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        var dataJaExiste = $("#Anos_0__DataJaExiste").val();

        $.post("../MaterialEscolar/SalvarRecebimento", {
            codigoDiretoria: $('#CodigoDiretoria').val(),
            codigoEscola: $("#CodigoEscola").val(),
            codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
            codigoDisciplina: $('#CodigoDisciplina').val(),
            data: $("#txtDataRecebimento").val(),
            dataJaExiste: dataJaExiste
        }).done(function (data) {

            Mensagem.Alert({
                titulo: "Sucesso",
                mensagem: "Materiais recebidos registrados com sucesso.",
                tipo: "Sucesso",
                botao: "Fechar"
            });

            recebido.Limpar();
        });
    });
}

grid.Validacao = function () {
    $("#formData").validate({
        rules: {
            txtDataRecebimento: { required: true }
        },
        messages:
        {
            txtDataRecebimento: { required: "Obrigatório" }
        }
    });
};

grid.SalvarRemanescente = function () {
    $("#btnSalvarRemasnecente").click(function () {

        var QtdRecebida = $("#txtRecebidoRemanescente").val();
        var QtdEnviada = $("#txtQuantidadeEnviada").val();
        var DataRecebimento = $("#txtDataRemanescente").val();

        if (DataRecebimento == "") {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Preencha a data de recebimento.",
                tipo: "Erro",
                botao: "Fechar"
            });
            return;
        }
        else if (QtdEnviada == 0) {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Você não tem saldo para confirmar.",
                tipo: "Erro",
                botao: "Fechar"
            });
            return;
        }

        $.ajax({
            cache: false,
            url: "/MaterialEscolar/SalvarRecebimentoRemanejamento",
            type: "POST",
            datatype: "json",
            data: {
                codigoRemanejamento: $("#CodigoRemanescente").val(),
                codigoDiretoria: $("#CodigoDiretoria").val(),
                codigoEscola: $("#CodigoEscola").val(),
                codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
                codigoTurma: $("#CodigoTurma").val(),
                codigoDisciplina: $("#CodigoDisciplina").val(),
                quantidade: $("#txtRecebidoRemanescente").val(),
                data: $("#txtDataRemanescente").val()
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
        var data = $("#txtDataRecebimento").val();

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
                            data: $("#txtDataRecebimento").val(),
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
    $("#txtDataRecebimento").attr('readonly', 'true').datepicker();
    $("#txtDataRemanescente").attr('readonly', 'true').val("").datepicker();
}

$(function () {
    grid.Instance();
});