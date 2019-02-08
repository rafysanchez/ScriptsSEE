var grid = grid || {};

grid.Instance = function () {
    AplicarMascaras();
    grid.CalcularDiferenca();
    grid.LinkRemanescente();
    grid.Salvar();
    grid.CopiarQuantidade();
    grid.SalvarRemanescente();
    //grid.DatePicker();
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

            $($(tdResult[2]).find("label")).text(calculado);

            $($(tdResult[3]).find("a")).attr("data-calculado", calculado);
            idTurma = $(tdResult[3]).find("a").attr("data-turma");
            //alert(totalRecebido);
            if (totalRecebido > 0) {
                $($(tdResult[1]).find("input")).attr("disabled", "true");
                //$('#btnSalvar').hide();
                //$('#btnCopiarQtd').hide();
                $('.adicionar-' + idTurma).removeAttr('style');
            }
            else {
                $('.adicionar-' + idTurma).attr('style', 'display:none');
            }
        }

    });
}

grid.AlterarRecebido = function (obj) {

    var data = $("#txtDataRecebimento").val();

    if (data === '') {
        $(obj).val('');
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


    $($(result[2]).find("label")).text(calculado);

    $($(result[3]).find("a")).attr("data-calculado", calculado);

    //$.ajax({
    //    cache: false,
    //    url: "/MaterialEscolar/SalvarMerge",
    //    type: "POST",
    //    datatype: "json",
    //    data: {
    //        codigoDiretoria: $("#CodigoDiretoria").val(),
    //        codigoEscola: $("#CodigoEscola").val(),
    //        codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
    //        codigoTurma: $(thResult).attr("id"),
    //        codigoDisciplina: $("#CodigoDisciplina").val(),
    //        quantidade: totalRecebido,
    //        data: $("#txtDataRecebimento").val(),
    //        semestre: $("#CodigoSemestre").val()
    //    },
    //    traditional: true,
    //    success: function (data, textStatus, jqXHR) {
    //        console.log("Coluna salva com sucesso.");
    //    }
    //});
}

grid.LinkRemanescente = function () {

    $("#tblResultado tbody > tr > td > a").click(function () {

        var turma = $(this).attr("data-turma");
        var calculado = $(this).attr("data-calculado");
        var tipoEnsino = $("#CodigoTipoEnsino").val();
        var turmaDescr = turma;;
        var ano = "";
        var descricaoTurma = $(this).attr("data-descricaoTurma");

        tipoEnsino === "1" ? ano = "Ano" : ano = "Série";

        if (tipoEnsino === "2") {
            turmaDescr = turmaDescr - 9;
        }

        $("#CodigoTurma").val(turma);

        $("#lblReceber").text(calculado);
        $("#spTeste").text(calculado * -1);
        $("#txtRecebidoRemanescente").val("");
        $("#txtDataRemanescente").val("");
        $("#txtRecebidoRemanescente").mask("Z0999999999", { translation: { 'Z': { pattern: /\-/, optional: true } } });;


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

        //$(".ui-dialog-title").text(turmaDescr + " " + ano);
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
            dataJaExiste: dataJaExiste,
            codigoSemestre: $("#CodigoSemestre").val()
        }).done(function (data) {

        });

        var data = $("#txtDataRecebimento").val();
        var result = $("#tblResultado > tbody > tr > td");

        for (var i = 0; i < $('.rec').length; i++) {
            var valor = $($('.rec')[i]).val();
            var turma = $($('.rec')[i]).attr('data-turma');

            if (valor > 0 && turma > 0 && $($('.rec')[i]).is(':disabled') == false) {
                $.ajax({
                    cache: false,
                    url: "/MaterialEscolar/SalvarMerge",
                    type: "POST",
                    datatype: "json",
                    data: {
                        codigoDiretoria: $("#CodigoDiretoria").val(),
                        codigoEscola: $("#CodigoEscola").val(),
                        codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
                        codigoTurma: turma,
                        codigoDisciplina: $("#CodigoDisciplina").val(),
                        quantidade: valor,
                        data: $("#txtDataRecebimento").val(),
                        semestre: $("#CodigoSemestre").val()
                    },
                    traditional: true,
                    success: function (data, textStatus, jqXHR) {
                        console.log('Copiou');
                        grid.CalcularDiferenca();
                    }
                });
            }
        }

        //// para cada coluna relevante, buscar os resultados inputados pelo usuário
        //for (var i = 0; i < $("#tblResultado > tbody > tr:first-child > td[class]").length; i++) {
        //    var valor = parseInt($("#tblResultado > tbody > tr:nth-child(2) > td[class]").eq(i).find("input").val());
        //    if (valor == 0) continue;
        //    $.ajax({
        //        cache: false,
        //        url: "/MaterialEscolar/SalvarMerge",
        //        type: "POST",
        //        datatype: "json",
        //        data: {
        //            codigoDiretoria: $("#CodigoDiretoria").val(),
        //            codigoEscola: $("#CodigoEscola").val(),
        //            codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
        //            codigoTurma: $(".col" + i).attr('id'),
        //            codigoDisciplina: $("#CodigoDisciplina").val(),
        //            quantidade: valor,
        //            data: $("#txtDataRecebimento").val(),
        //            semestre: $("#CodigoSemestre").val()
        //        },
        //        traditional: true,
        //        success: function (data, textStatus, jqXHR) {
        //            console.log('Copiou')
        //        }
        //    });
        //}
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
        $.ajax({
            url: "/MaterialEscolar/Salvar",
            type: "POST",
            datatype: "json",
            async: false,
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
            success: function () {
                recebido.LoadGridRecebimento();
                $('#resultadoGridEscola').dialog("close");
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
        contAux++;
        $(result).each(function () {

            var attr = $(this).attr("class");

            if (attr !== "") {

                var tdResult = $("#tblResultado > tbody > tr").find('td[class=' + attr + ']');
                var thResult = $("#tblResultado > thead > tr").find('th[class=' + attr + ']');
                
                var totalMaterial = $($(tdResult[0]).find("input")).val();

                if ($($(tdResult[1]).find("input")).val() == 0 || $($(tdResult[1]).find("input")).val() == null) {
                    $($(tdResult[1]).find("input")).val(totalMaterial);
                }

                if (contAux > 1) {
                    Mensagem.Alert({
                        titulo: "Atenção",
                        mensagem: "Quantidade Recebida não pode ser copiada. Utilize o ícone + para adicionar quantidade recebida.",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }

                var totalRecebido = totalMaterial;
                var calculado = totalMaterial - totalRecebido;

                $($(tdResult[2]).find("label")).text(calculado);

                $($(result[3]).find("a")).attr("data-calculado", calculado);
            }

        });
    });
}

//grid.DatePicker = function () {
//    $("#txtDataRecebimento").attr('readonly', 'true').datepicker();
//    $("#txtDataRemanescente").attr('readonly', 'true').val("").datepicker();
//}

$(function () {
    grid.Instance();
});