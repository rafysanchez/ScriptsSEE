
$('input[type="text"]').focus(function () {
    $(this).addClass("focus");
});

$('input[type="text"]').blur(function () {
    $(this).removeClass("focus");
});

$().ready(function () {
    AplicarMascaras();
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    //$('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino'], undefined);
    $('#CodigoTipoEnsino').change(function () {
        ZeraTurma();
    });

    $('#CodigoDiretoriaFichaAluno').autoPreencher($('#CodigoRedeEnsinoFichaAluno'), 'RedeEnsino', 'CarregarListaRedeEnsinoFichaAluno');
    $('#CodigoRedeEnsinoFichaAluno').autoPreencher($('#CodigoEscolaFichaAluno'), 'Escola', 'CarregaListaEscolasPorDiretoria', [{ CodigoDiretoria: 'CodigoDiretoriaFichaAluno', CodigoRedeEnsino: 'CodigoRedeEnsinoFichaAluno' }]);

    $('#CodigoEscolaFichaAluno').autoPreencher($('#CodigoTipoEnsinoFichaAluno'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    $('#CodigoTipoEnsinoFichaAluno').autoPreencher($('#CodigoTurmaFichaAluno'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: 'CodigoEscolaFichaAluno', CodigoTipoEnsino: 'CodigoTipoEnsinoFichaAluno', AnoLetivo: 'anoletivo' }], undefined);

    //AplicarMascaras();

    $("#TipoConsultaFichaAluno").change(function () {
        var tipoPesquisaFichaAluno = $("#TipoConsultaFichaAluno").val();
        if (tipoPesquisaFichaAluno == undefined || tipoPesquisaFichaAluno == "" || tipoPesquisaFichaAluno == "Selecione...") {
            $(".fildFiltro").css('display', 'none');
            $("#divSetNone").css('display', 'block');
        }

        switch (parseInt(tipoPesquisaFichaAluno)) {
            case 1:
                $(".fildFiltro").css('display', 'none');
                $("#fieldSetRA").css('display', 'block');
                break;
            case 2:
                $(".fildFiltro").css('display', 'none');
                $("#fieldSetFonetico").css('display', 'block');
                break;
            case 3:
                $(".fildFiltro").css('display', 'none');
                $("#fieldSetNomeCompleto").css('display', 'block');
                break;
            case 4:
                $(".fildFiltro").css('display', 'none');
                $("#fieldSetEscola").css('display', 'block');
                $("#CodigoDiretoria").removeAttr("disabled");
                $("#CodigoEscola").removeAttr("disabled");
                $("#CodigoTipoEnsino").removeAttr("disabled");
                $("#CodigoTurma").removeAttr("disabled");
                break;
            case 5:
                $(".fildFiltro").css('display', 'none');
                $("#fieldSetClasse").css('display', 'block');
                break;
            case 6:
                $(".fildFiltro").css('display', 'none');
                $("#fieldSetMae").css('display', 'block');
                break;
            case 7:
                $(".fildFiltro").css('display', 'none');
                $("#fieldSetPai").css('display', 'block');
                break;
            case 8:
                $(".fildFiltro").css('display', 'none');
                $("#fieldSetDocumento").css('display', 'block');
                break;
            default:
        }
    }
    );


    $('#txtRa').keydown(function () {
        $('#CodigoDiretoria').attr('disabled', 'disabled');
        if ($('#CodigoDiretoria').val() != 0 || $('#CodigoDiretoria').val() != null) {
            $('#CodigoDiretoria').val(null);
            $('#CodigoEscola').val(null);
            $('#CodigoTipoEnsino').val(null);
            $('#CodigoTurma').val(null);
        }
        $('#CodigoEscola').attr('disabled', 'disabled');
        $('#CodigoTurma').attr('disabled', 'disabled');
        $('#CodigoTipoEnsino').attr('disabled', 'disabled');
        $('#txtCodigo').attr('disabled', 'disabled');
        $('#txtNome').attr('disabled', 'disabled');
        $('#txtCpf').attr('disabled', 'disabled');
        if ($('#txtNome').val() != "") {
            $('#txtNome').val(null);
        }
        $('#txtNomeMae').attr('disabled', 'disabled');
        if ($('#txtNomeMae').val() != "") {
            $('#txtNomeMae').val(null);
        }


    });
    $('#txtRa').blur(function () {
        if (($('#txtRa').val() == "" || $('#txtRa').val() == "000000000000") && ($('#txtDigRa').val() == "" && $('#txtUfRa').val() == "")) {
            $('#CodigoDiretoria').removeAttr('disabled');
            $('#CodigoEscola').removeAttr('disabled');
            $('#CodigoTurma').removeAttr('disabled');
            $('#txtCodigo').removeAttr('disabled');
            $('#txtNome').removeAttr('disabled');
            $('#txtNomeMae').removeAttr('disabled');
            $('#CodigoTipoEnsino').removeAttr('disabled');
            $('#txtCpf').removeAttr('disabled');
        }
    });
    $('#txtDigRa').keydown(function () {
        $('#CodigoDiretoria').attr('disabled', 'disabled');
        if ($('#CodigoDiretoria').val() != 0 || $('#CodigoDiretoria').val() != null) {
            $('#CodigoDiretoria').val(null);
            $('#CodigoEscola').val(null);
            $('#CodigoTipoEnsino').val(null);
            $('#CodigoTurma').val(null);
        }
        $('#CodigoEscola').attr('disabled', 'disabled');
        $('#CodigoTurma').attr('disabled', 'disabled');
        $('#txtCodigo').attr('disabled', 'disabled');
        $('#txtNome').attr('disabled', 'disabled');
        if ($('#txtNome').val() != "") {
            $('#txtNome').val(null);
        }
        $('#txtNomeMae').attr('disabled', 'disabled');
        if ($('#txtNomeMae').val() != "") {
            $('#txtNomeMae').val(null);
        }
        $('#CodigoTipoEnsino').attr('disabled', 'disabled');
        $('#txtCpf').attr('disabled', 'disabled');
    });
    $('#txtDigRa').blur(function () {
        if (($('#txtRa').val() == "" || $('#txtRa').val() == "000000000000") && ($('#txtDigRa').val() == "" && $('#txtUfRa').val() == "")) {
            $('#CodigoDiretoria').removeAttr('disabled');
            $('#CodigoEscola').removeAttr('disabled');
            $('#CodigoTurma').removeAttr('disabled');
            $('#txtCodigo').removeAttr('disabled');
            $('#txtNome').removeAttr('disabled');
            $('#txtNomeMae').removeAttr('disabled');
            $('#CodigoTipoEnsino').removeAttr('disabled');
            $('#txtCpf').removeAttr('disabled');
        }
    });
    $('#txtUfRa').keydown(function () {
        $('#CodigoDiretoria').attr('disabled', 'disabled');
        if ($('#CodigoDiretoria').val() != 0 || $('#CodigoDiretoria').val() != null) {
            $('#CodigoDiretoria').val(null);
            $('#CodigoEscola').val(null);
            $('#CodigoTipoEnsino').val(null);
            $('#CodigoTurma').val(null);
        }
        $('#CodigoEscola').attr('disabled', 'disabled');
        $('#CodigoTurma').attr('disabled', 'disabled');
        $('#txtCodigo').attr('disabled', 'disabled');
        $('#txtNome').attr('disabled', 'disabled');
        if ($('#txtNome').val() != "") {
            $('#txtNome').val(null);
        }
        $('#txtNomeMae').attr('disabled', 'disabled');
        if ($('#txtNomeMae').val() != "") {
            $('#txtNomeMae').val(null);
        }
        $('#CodigoTipoEnsino').attr('disabled', 'disabled');
        $('#txtCpf').attr('disabled', 'disabled');
    });
    $('#txtUfRa').blur(function () {
        if (($('#txtRa').val() == "" || $('#txtRa').val() == "000000000000") && ($('#txtDigRa').val() == "" && $('#txtUfRa').val() == "")) {
            $('#CodigoDiretoria').removeAttr('disabled');
            $('#CodigoEscola').removeAttr('disabled');
            $('#CodigoTurma').removeAttr('disabled');
            $('#txtCodigo').removeAttr('disabled');
            $('#txtNome').removeAttr('disabled');
            $('#txtNomeMae').removeAttr('disabled');
            $('#CodigoTipoEnsino').removeAttr('disabled');
            $('#txtCpf').removeAttr('disabled');
        }
    });
    $('#txtCpf').keydown(function () {
        $('#CodigoDiretoria').attr('disabled', 'disabled');
        if ($('#CodigoDiretoria').val() != 0 || $('#CodigoDiretoria').val() != null) {
            $('#CodigoDiretoria').val(null);
            $('#CodigoEscola').val(null);
            $('#CodigoTipoEnsino').val(null);
            $('#CodigoTurma').val(null);
        }
        $('#CodigoEscola').attr('disabled', 'disabled');
        $('#CodigoTurma').attr('disabled', 'disabled');
        $('#txtCodigo').attr('disabled', 'disabled');
        $('#txtNome').attr('disabled', 'disabled');
        if ($('#txtNome').val() != "") {
            $('#txtNome').val(null);
        }
        $('#txtNomeMae').attr('disabled', 'disabled');
        if ($('#txtNomeMae').val() != "") {
            $('#txtNomeMae').val(null);
        }
        $('#CodigoTipoEnsino').attr('disabled', 'disabled');
        $('#txtRa').attr('disabled', 'disabled');
        $('#txtDigRa').attr('disabled', 'disabled');
        $('#txtUfRa').attr('disabled', 'disabled');
    });
    $('#txtCpf').blur(function () {
        if ($('#txtCpf').val() == "") {
            $('#CodigoTipoEnsino').removeAttr('disabled');
            $('#CodigoDiretoria').removeAttr('disabled');
            $('#CodigoEscola').removeAttr('disabled');
            $('#CodigoTurma').removeAttr('disabled');
            $('#txtCodigo').removeAttr('disabled');
            $('#txtNome').removeAttr('disabled');
            $('#txtNomeMae').removeAttr('disabled');
            $('#txtRa').removeAttr('disabled');
            $('#txtDigRa').removeAttr('disabled');
            $('#txtUfRa').removeAttr('disabled');
        }
    });
    $('#txtCodigo').keydown(function () {
        $('#CodigoTipoEnsino').attr('disabled', 'disabled');
        $('#CodigoDiretoria').attr('disabled', 'disabled');
        if ($('#CodigoDiretoria').val() != 0 || $('#CodigoDiretoria').val() != null) {
            $('#CodigoDiretoria').val(null);
            $('#CodigoEscola').val(null);
            $('#CodigoTipoEnsino').val(null);
            $('#CodigoTurma').val(null);
        }
        $('#CodigoEscola').attr('disabled', 'disabled');
        $('#CodigoTurma').attr('disabled', 'disabled');
        $('#txtCpf').attr('disabled', 'disabled');
        $('#txtNome').attr('disabled', 'disabled');
        if ($('#txtNome').val() != "") {
            $('#txtNome').val(null);
        }
        $('#txtNomeMae').attr('disabled', 'disabled');
        if ($('#txtNomeMae').val() != "") {
            $('#txtNomeMae').val(null);
        }
        $('#txtRa').attr('disabled', 'disabled');
        $('#txtDigRa').attr('disabled', 'disabled');
        $('#txtUfRa').attr('disabled', 'disabled');
    });
    $('#txtCodigo').keyup(function () {
        if ($('#txtCodigo').val() == "") {
            $('#CodigoTipoEnsino').removeAttr('disabled');
            $('#CodigoDiretoria').removeAttr('disabled');
            $('#CodigoEscola').removeAttr('disabled');
            $('#CodigoTurma').removeAttr('disabled');
            $('#txtCpf').removeAttr('disabled');
            $('#txtNome').removeAttr('disabled');
            $('#txtNomeMae').removeAttr('disabled');
            $('#txtRa').removeAttr('disabled');
            $('#txtDigRa').removeAttr('disabled');
            $('#txtUfRa').removeAttr('disabled');
        }
    });

    $('#txtCodCie').blur(function () {
        if ($('#txtCodCie').val() != "") {
            var codEscola = $(this).val();

            $.ajax({
                type: 'POST',
                async: false,
                dataType: 'html',
                data: ({
                    cdEscola: codEscola
                }),
                url: '/Escola/CarregarDiretoriaEscola',
                success: function (data) {
                    data = JSON.parse(data);

                    if (data.codDiretoria != "") {

                        $('#CodigoDiretoriaFichaAluno').val(data.codDiretoria);
                        $('#CodigoDiretoriaFichaAluno').change();

                        $('#CodigoRedeEnsinoFichaAluno').val(data.codRedeEnsino);
                        $('#CodigoRedeEnsinoFichaAluno').change();

                        $('#CodigoEscolaFichaAluno').val(codEscola);
                        $('#CodigoEscolaFichaAluno').change();
                    }
                    else {
                        $('#CodigoDiretoriaFichaAluno').val('')
                        $('#CodigoDiretoriaFichaAluno').change();
                        $('#CodigoRedeEnsinoFichaAluno').change();
                        $('#CodigoEscolaFichaAluno').change();
                    }
                }
            })
        }
    });

    $('#txtDtNascimento').bind('keyup', function (event) {
        if ($("#txtDtNascimento").val() == "") return;
        if (ValidaData($("#txtDtNascimento")[0]) == null) return;
        $("#txtDtNascimento").datepicker("setDate", $("#txtDtNascimento").datepicker("getDate"));
    });
});

function CarregarPesquisaAlunos() {
    var codigoDiretoria = $('#CodigoDiretoria').val();
    var codigoEscola = $('#CodigoEscola').val();
    var codigoTurma = $('#CodigoTurma').val();
    var nomeAluno = $('#txtNome').val();
    var cpf = $('#txtCpf').val();
    var ra = $('#txtRa').val();
    var digRa = $('#txtDigRa').val();
    var ufRa = $('#txtUfRa').val();
    var nomeMae = $('#txtNomeMae').val();
    var tipoEnsino = $('#CodigoTipoEnsino').val();
    var anoLetivo = $('#AnoLetivo').val();

    if (codigoDiretoria == null || codigoDiretoria.length == 0) { codigoDiretoria = 0; }
    if (codigoEscola == null || codigoEscola.length == 0) { codigoEscola = 0; }
    if (tipoEnsino == null || tipoEnsino.length == 0) { tipoEnsino = 0; }
    if (codigoTurma == null || codigoTurma.length == 0) { codigoTurma = 0; }
    if (anoLetivo.length == 0) { anoLetivo = 0; }



    if ((anoLetivo != 0 && codigoDiretoria != 0 && codigoEscola != 0 && (nomeAluno != "" || nomeMae != "")) || (anoLetivo != 0 && codigoDiretoria != 0 && codigoEscola != 0 && codigoTurma != 0) || (ra != "" && digRa != "" && ufRa != "") || cpf != "") {
        CarregarViewPesquisaAlunos(anoLetivo, codigoDiretoria, codigoEscola, tipoEnsino, codigoTurma, nomeAluno, cpf, ra, digRa, ufRa, nomeMae);

        RetirarObrigatorio();
    }
    else {
        ExibirObrigatorio(nomeAluno, nomeMae, codigoDiretoria, ra, digRa, ufRa);

        var msg = "Preencha o filtro mínimo.";
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: msg,
            tipo: "Aviso",
            botao: "Fechar"
        });
    }
}

function CarregarViewPesquisaAlunos(anoLetivo, codigoDiretoria, codigoEscola, tipoEnsino, codigoTurma, nomeAluno, cpf, ra, digRa, ufRa, nomeMae) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoDiretoria: parseInt(codigoDiretoria),
            codigoEscola: parseInt(codigoEscola),
            codigoTipoEnsino: parseInt(tipoEnsino),
            codigoTurma: parseInt(codigoTurma),
            nomeAluno: nomeAluno,
            cpf: cpf,
            ra: ra,
            digRa: digRa,
            ufRa: ufRa,
            nomeMae: nomeMae,
            anoLetivo: parseInt(anoLetivo)
        }),
        url: '/Aluno/ListaParcial',
        success: function (data, textStatus, jqXHR) {
            $('div#dadosAluno').html(data);
            $("#tabelaDados").sedDataTable({
                columnDefs: [
                        { targets: [7], orderable: false },
                ],
                nomeExportacao: "Lista de Alunos",
                //"sScrollX": "100%",
                //"sScrollXInner": "120%",
                //"bScrollCollapse": true,
            }
                ////{
                ////sDom: '<"H"T<"cl">lfr>t<"F"ip>',
                ////oTableTools: {
                    ////aButtons:
                    ////    [{
                    ////        "sExtends": "print",
                    ////        "sButtonText": "Imprimir",
                    ////        "aButtons": ["print"],
                    ////        //"sInfo": "<h6>Visualização de Impressão</h6><p>Para imprimir, utilize a opção de impressão do navegador. Pressione ESC para terminar.</p>"
                    ////    }]
            //    }
            //}
            );

            location.hash = "#tabelaDados";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}



function CarregarPesquisaFichaAluno(pg) {

    var parametrosController = ({
        anoLetivo: $('#AnoLetivo').val(),
        tipoConsultaFichaAluno: $("#TipoConsultaFichaAluno").val(),
        ra: $("#txtRa").val(),
        digRa: $("#txtDigRa").val(),
        ufRa: $("#txtUfRa").val(),
        nomeSocial: $("#txtNomeSocial").val(),
        dataNascimento: $("#txtDtNascimento").val(),
        nomeCompleto: $("#txtNomeCompleto").val(),
        codigoDiretoria: $("#CodigoDiretoria").val() != undefined ? $("#CodigoDiretoria").val() : 0,
        codigoEscola: $("#CodigoEscolaFichaAluno").val() != undefined ? $("#CodigoEscolaFichaAluno").val() : 0,
        tipoEnsino: $("#CodigoTipoEnsinoFichaAluno").val() != undefined ? $("#CodigoTipoEnsinoFichaAluno").val() : 0,
        codigoTurma: $("#CodigoTurmaFichaAluno").val() != undefined ? $("#CodigoTurmaFichaAluno").val() : 0,
        numeroClasse: $("#txtNumeroClasse").val(),
        nomeAluno: $("#txtNomeAluno").val(),
        nomeMaeFonetico: $("#txtNomeMaeFonetica").val(),
        nomeMae: $("#txtNomeMaeFicha").val(),
        nomePai: $("#txtNomePaiFicha").val(),
        rg: $("#txtRg").val(),
        digRg: $("#txtDigRg").val(),
        ufRg: $("#txtUfRg").val(),
        cpf: $("#txtCPF").val(),
        NIS: $("#txtNIS").val(),
        INEP: $("#txtINEP").val(),
        codigoCertidao: $("#txtCertidao").val(),
        paginaAtual: pg == null ? 1 : pg
    });

    if (parametrosController.anoLetivo == undefined || parametrosController.anoLetivo == "") {
        parametrosController.anoLetivo = 0;
    }
    if (parametrosController.codigoDiretoria == null || parametrosController.codigoDiretoria.length == 0) { parametrosController.codigoDiretoria = 0; }
    if (parametrosController.codigoEscola == null || parametrosController.codigoEscola.length == 0) { parametrosController.codigoEscola = 0; }
    if (parametrosController.tipoEnsino == null || parametrosController.tipoEnsino.length == 0) { parametrosController.tipoEnsino = 0; }
    if (parametrosController.codigoTurma == null || parametrosController.codigoTurma.length == 0) { parametrosController.codigoTurma = 0; }
    if (parametrosController.numeroClasse == null || parametrosController.numeroClasse == undefined) { parametrosController.numeroClasse = ""; }
    if (parametrosController.tipoConsultaFichaAluno == null || parametrosController.tipoConsultaFichaAluno == "Selecione...") { parametrosController.tipoConsultaFichaAluno = 0; }
    if (parametrosController.rg == undefined) { parametrosController.rg = ""; }
    if (parametrosController.cpf == undefined) { parametrosController.cpf = ""; }
    if (parametrosController.NIS == undefined) { parametrosController.NIS = ""; }
    if (parametrosController.INEP == undefined) { parametrosController.INEP = ""; }
    if (parametrosController.codigoCertidao == undefined) { parametrosController.codigoCertidao = ""; }


    if (parametrosController.tipoConsultaFichaAluno == 0) {
        var msg = "Selecione o Tipo de Pesquisa e tente novamente.";
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: msg,
            tipo: "Aviso",
            botao: "Fechar"
        });
        return;
    }

    var filtroPesquisado = $(".fildFiltro:visible");

    if (!pesquisaFichaAlunoValida(parametrosController)) {
        filtroPesquisado.find('.validacao').each(function () {
            var elemento = $(this);
            $(elemento).removeClass("error");
            if (parametrosController.tipoConsultaFichaAluno == 2) {
                if ((parametrosController.nomeSocial.length > 0 && parametrosController.nomeMaeFonetico.length > 0) ||
                        (parametrosController.nomeAluno.length > 0 && parametrosController.nomeMaeFonetico.length > 0) ||
                        (parametrosController.nomeAluno.length > 0 && parametrosController.dataNascimento.length > 0) ||
                        (parametrosController.nomeSocial.length > 0 && parametrosController.dataNascimento.length > 0)) {
                    if (parametrosController.nomeSocial.split(' ').length < 2 ||
                        parametrosController.nomeMae.split(' ').length < 2 ||
                        parametrosController.nomeAluno.split(' ').length < 2)
                        if ($(elemento).val().length > 0 && $(elemento).val().split(' ').length < 2)
                            $(elemento).addClass("error");

                } else
                    if ($(elemento).val().length == 0) {
                        $(elemento).addClass("error");
                    }

            } else
                if ($(elemento).val().length == 0) {
                    $(elemento).addClass("error");
                }
        });
    }
    if ($("#fieldSetEscola").css("display") !== "none") {
        $('.validacao').each(function () {
            var elemento = $(this);
            $(elemento).removeClass("error");
        });

        CarregarViewFichaAluno(parametrosController);
    }
    else if (!filtroPesquisado.find('div input').hasClass("error")) {
        $('.validacao').each(function () {
            var elemento = $(this);
            $("#txtCPF").removeClass("error");
            $(elemento).removeClass("error");
        });

        CarregarViewFichaAluno(parametrosController);
    }
    else {
        var msg = "Preencha os filtros obrigatórios!";
        if (parametrosController.tipoConsultaFichaAluno == 2) {
            if ((parametrosController.nomeSocial.length > 0 && parametrosController.nomeMaeFonetico.length > 0) ||
                    (parametrosController.nomeAluno.length > 0 && parametrosController.nomeMaeFonetico.length > 0) ||
                    (parametrosController.nomeAluno.length > 0 && parametrosController.dataNascimento.length > 0) ||
                    (parametrosController.nomeSocial.length > 0 && parametrosController.dataNascimento.length > 0)) {
                if (parametrosController.nomeSocial.split(' ').length < 2 ||
                    parametrosController.nomeMaeFonetico.split(' ').length < 2 ||
                    parametrosController.nomeAluno.split(' ').length < 2)
                    msg = "Nome do Aluno / Nome Social / Nome da Mãe deve ser composto por nome e sobrenome.";
            } else
                msg = "Preencha o Nome do Aluno ou Nome Social junto com a Data de Nascimento ou o Nome da Mãe!";

        }
        if (parametrosController.tipoConsultaFichaAluno == 8) {
            msg = "Preencha um entre os documentos obrigatórios para consultar!";
        }
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: msg,
            tipo: "Aviso",
            botao: "Fechar"
        });
    }
}

function pesquisaFichaAlunoValida(parametrosController) {
    switch (parseInt(parametrosController.tipoConsultaFichaAluno)) {
        case 1:
            return parametrosController.ra.length > 0;
        case 2:
            if ((parametrosController.nomeSocial.length > 0 && parametrosController.nomeMaeFonetico.length > 0) ||
                    (parametrosController.nomeAluno.length > 0 && parametrosController.nomeMaeFonetico.length > 0) ||
                    (parametrosController.nomeAluno.length > 0 && parametrosController.dataNascimento.length > 0) ||
                    (parametrosController.nomeSocial.length > 0 && parametrosController.dataNascimento.length > 0))
                return ((parametrosController.nomeSocial.split(' ').length > 1 && (parametrosController.nomeMae.split(' ').length > 1 || parametrosController.dataNascimento.length > 0)) ||
                        (parametrosController.nomeAluno.split(' ').length > 1 && (parametrosController.nomeMae.split(' ').length > 1 || parametrosController.dataNascimento.length > 0)));
            return false;
        case 3:
            return true;
        case 4:
            return true;
        case 5:
            return true;
        case 6:
            return true;
        case 7:
            return true;
        case 8:
            return (parametrosController.rg.length > 0 && parametrosController.digRg.length > 0) || parametrosController.cpf.length > 0 || parametrosController.NIS.length > 0 || parametrosController.codigoCertidao.length > 0 || parametrosController.INEP.length > 0;
        default:
            return false;
    }
}

function CarregarViewFichaAluno(parametrosController) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: parametrosController,
        url: '/Aluno/ListaFichaAlunoParcial',
        success: function (data, textStatus, jqXHR) {
            $('div#dadosAluno').html(data);

            $("#tabelaDados").sedDataTable({
                columnDefs: [{ targets: [6], orderable: false }],
                nomeExportacao: "Lista de Alunos"
            });

            location.hash = "#tabelaDados";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}


function CarregarMatriculaFaseAluno(codigo, anoLetivo, idTurma, nrClasse, codigoAluno, codigoInscricao) {
    var codigoMatricula = parseInt(codigo);
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data:
             ({
                 codigoMatricula: codigoMatricula,
                 anoLetivo: parseInt(anoLetivo),
                 codigoTurma: idTurma,
                 codigoClasse: parseInt(nrClasse),
                 codigoAluno: parseInt(codigoAluno),
                 codigoInscricao: parseFloat(codigoInscricao)

             }),

        url: '/Aluno/ConsultarDetalheMatriculaFaseFichaAluno',
        success: function (data, textStatus, jqXHR) {
            $('#MatriculaAlunoResumo').html(data);
            $('#MatriculaAlunoResumo').dialog({
                title: "Dados do Aluno",
                width: 1000,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                close: function () {
                    $('#TodoResumo').remove();
                    $("#linkboot").remove();
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}




function CarregarIrmaoAluno(nomePai, nomeMae, codigoAluno) {

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data:
             ({
                 nomePai: nomePai,
                 nomeMae: nomeMae,
                 codigoAluno: codigoAluno
             }),

        url: '/Aluno/ConsultarDetalheIrmaoAluno',
        success: function (data, textStatus, jqXHR) {
            $("#tabelaDadosIrmao").remove();
            if (data != undefined && data.length > 0) {
                $('#IrmaoAlunoResumo').html(data);
            } else {
                $('#IrmaoAlunoResumo').html(null);
            }

            $('#IrmaoAlunoResumo').dialog({
                width: 1000,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                close: function () {
                    $('#TodoResumo').remove();
                    $("#linkboot").remove();
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}

function CarregarDeficienciaAluno(codigoAluno) {
    var codigoAluno = parseInt(codigoAluno);
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data:
             ({
                 codigoAluno: codigoAluno
             }),

        url: '/Aluno/ConsultarDetalheDeficienciaAluno',
        success: function (data, textStatus, jqXHR) {
            $('#DeficienciaAlunoResumo').html(data);
            $('#DeficienciaAlunoResumo').dialog({
                title: "Necessidade Educacional Especial",
                width: 1000,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                close: function () {
                    $('#TodoResumo').remove();
                    $("#linkboot").remove();
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}


function VoltarTurmas() {
    $('#Resultado').show();
    $('#Alunos').empty();
    $('.tit').html('Turmas');
    $('.breadcrumb').html('Turmas');
}

function DadosAluno(codigoAluno) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoAluno: parseInt(codigoAluno)
        }),
        url: '/Aluno/Consultar',
        success: function (data, textStatus, jqXHR) {
            $('#alunoDialog').html(data);

            $('#tabelaResponsavel').sedDataTable({
                nomeExportacao: "Lista de Responsáveis",
            });
            $('#tabelaTelefone').sedDataTable({
                nomeExportacao: "Lista de Telefones",
            });
            $('#EnderecoCEP').mask("99999-999");

            $('#alunoDialog').dialog({
                //height: 770,
                width: 850,
                draggable: false,
                modal: true,
                resizable: false,
                title: "Consulta do Aluno",
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                close: function () {
                    location.hash = "#tabelaDados";
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}


function DadosFichaAluno(codigoAluno, anoLetivo, irmao) {

    if (anoLetivo == "" || anoLetivo == undefined || anoLetivo == null) { anoLetivo = 0 }
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoAluno: parseInt(codigoAluno),
            anoLetivo: parseInt(anoLetivo)
        }),
        url: '/Aluno/FichaAluno',
        success: function (data, textStatus, jqXHR) {

            if (irmao) {
                $('#irmaoDialog').html(data);
                $('#irmaoDialog').dialog({
                    width: 1000,
                    draggable: false,
                    modal: true,
                    resizable: false,
                    show: {
                        effect: "blind",
                        duration: 1000
                    },
                    position: "top",
                    close: function () {
                        location.hash = "#tabelaDados";
                    }
                });
                return;
            }
            $('#alunoDialog').html(data);
            $('#alunoDialog').dialog({
                title: "Dados do Aluno",
                width: 1000,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                close: function () {
                    location.hash = "#tabelaDados";
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}


function LimparSenha(cdAluno) {

    Mensagem.Alert({
        titulo: "Aluno",
        mensagem: "Tem certeza que deseja limpar a senha desse aluno?\nEla deverá ser definida no próximo acesso do aluno.",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        type: 'POST',
                        data: { cdAluno: cdAluno },
                        url: '/Aluno/LimparSenha'
                    });
                }
            },
            {
                botao: "Não",
                callback: function () {
                    $.unblockUI();
                }
            }
        ]
    });
}

function AlterarSenha() {
    $('#AlterarSenha').dialog({
        //title: "Alterar Senha",
        //height: 180,
        width: 600,
        draggable: false,
        modal: true,
        resizable: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        position: "top",
        close: function () {
            $('#Senha').val("");
            $('#conf_senha').val("");
        },
    });

    $("#formSenha").validate({
        rules: {
            Senha: {
                required: true
            },
            conf_senha: {
                required: true,
                equalTo: "#Senha"
            }
        },
        messages: {
            Senha: {
                required: "Obrigatório"
            },
            conf_senha: {
                required: "Obrigatório",
                equalTo: "Os campos não estão idênticos."
            }
        }
    });

    $.validator.unobtrusive.parse($("#validation"));
}

function Salvar() {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoAluno: parseInt($('#CodigoAluno').val()),
            Senha: $('#Senha').val()
        }),
        url: '/Aluno/Salvar',
        success: function (data, textStatus, jqXHR) {
            Mensagem.Alert({
                titulo: "Sucesso",
                mensagem: "Senha alterada com sucesso. Lembre-se que a sua nova senha deverá ser usada em seus e-mails institucionais e para realizar o login na rede corporativa.",
                tipo: "Sucesso",
                botao: "Fechar"
            });

            $('#Senha').val("");
            $('#conf_senha').val("");

            $('#AlterarSenha').dialog("close");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}



function AbrirResumo(codigoAluno) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoAluno: codigoAluno
        }),
        url: '/Aluno/Resumo',
        success: function (data, textStatus, jqXHR) {
            $('#Resumo').html(data);
            $('#TodoResumo #CodigoEscola').attr("selecionado", $('#TodoResumo #CodigoEscola').val());
            $('#TodoResumo #CodigoTurma').change(function () {
                if ($('#TodoResumo #CodigoTurma').val() > 0) {
                    CarregarFrequencia();
                    CarregarBoletim(codigoAluno);
                }
            });
            $('#TodoResumo #CodigoEscola').autoPreencher($('#TodoResumo #CodigoTurma'), 'Turma', 'CarregarListaTurmaPorAluno', ['CodigoEscola', 'CodigoAluno', 'AnoLetivo'], undefined, $("#TodoResumo"), false);



            $('#tabelaOcorrencias').sedDataTable();

            $('#tabelaFrequencia').sedDataTable({
                nomeExportacao: "Frequencia do Aluno",
                filtros: [
                    { nome: "Escola", valor: $("#CodigoEscola option:selected").html() },
                    { nome: "Turma", valor: $("#CodigoTurma option:selected").html() }
                ]
            });
            $('#tabelaAvaliacao').sedDataTable({ nomeExportacao: "Notas do Aluno" });


            $("#tabs").sedTabControl({ embutida: true });

            $('#Resumo').dialog({
                title: "Resumo",
                width: 1000,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                close: function () {
                    $('#TodoResumo').remove();
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.CarregarMensagens('Fechar');
        }
    });
}

function CarregarFrequencia() {
    var codigoTurma = $('#TodoResumo #CodigoTurma').val();

    $.ajax({
        type: 'POST',
        async: false,
        dataType: 'html',
        data: ({
            codigoTurma: codigoTurma
        }),
        url: '/Aluno/FrequenciaAluno',
        success: function (data, textStatus, jqXHR) {
            $('#divFrequencia').empty().html(data);
            //DataTableSemPag($('#tabelaFrequencia'));
            $('#tabelaFrequencia').sedDataTable({ nomeExportacao: "Frequencia" });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function CarregarBoletim(codigoAluno) {
    var codigoTurma = $('#TodoResumo #CodigoTurma').val();
    var codigoEscola = $('#hdnCodigoEscola').val();
    var anoLetivo = $('#AnoLetivo').val();

    $.ajax({
        type: 'POST',
        async: false,
        dataType: 'html',
        data: ({
            codigoAluno: codigoAluno,
            codigoTurma: codigoTurma,
            codigoEscola: codigoEscola,
            anoLetivo: parseInt(anoLetivo)
        }),
        url: '/ConsultaAvaliacao/Boletim',
        success: function (data, textStatus, jqXHR) {
            $('#divAvaliacao').empty().html(data);
            $('#tabelaAvaliacao').sedDataTable({ nomeExportacao: "Notas" });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function ListarAtividades(codigoEscola, codigoTipoEnsino, codigoTipoEvento, codigoTurma, codigoDisciplina, codigoAluno) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoEscola: codigoEscola,
            codigoTipoEnsino: codigoTipoEnsino,
            codigoTipoEvento: codigoTipoEvento,
            codigoTurma: codigoTurma,
            codigoDisciplina: codigoDisciplina,
            codigoAluno: codigoAluno
        }),
        url: '/ConsultaAvaliacao/ListaNotas',
        success: function (data, textStatus, jqXHR) {
            $("#divListaAtividadeNota").html(data);

            $("#table").sedDataTable();

            $('#divListaAtividadeNota').dialog({
                title: "Resumo",
                //height: 770,
                width: 850,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top"
            });

            $('.abrir_grafico').click(function () {
                var nomeAtividade = $(this).attr('atividade');
                var nota = parseInt($(this).attr('nota'));
                var mediaTurma = parseInt($(this).attr('media'));
                var corNota;
                var corMedia;

                if (nota >= mediaTurma) {
                    corNota = 'green';
                    corMedia = 'blue';
                }
                else if (nota < mediaTurma) {
                    corNota = 'red';
                    corMedia = 'blue';
                }

                var data = google.visualization.arrayToDataTable([
                  ['Atividade', 'Sua Nota', 'M\u00e9dia da Sala'],
                  [nomeAtividade, nota, mediaTurma]
                ]);

                var options = {
                    hAxis: { title: 'Atividade', titleTextStyle: { color: 'red' } }, colors: [corNota, corMedia]
                };

                var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
                chart.draw(data, options);

                $('#dialog').dialog({
                    modal: true,
                    //height: 280,
                    width: 475,
                    resizable: false,
                    title: 'Gr\u00e1fico'
                });
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}


function DataTableTop(dados, paginaAtual) {
    //$(dados).dataTable({
    //"sScrollX": "120%",
    //"bJQueryUI": true,
    //"bRetrieve": false,
    //"iDisplayLength": 100,
    //"bLengthChange": false,
    //"bFilter": false,
    //"oLanguage": {
    //    "sProcessing": "Processando...",
    //    "sZeroRecords": "Não foram encontrados resultados",
    //    "sInfoPostFix": "",
    //    "sInfo": "Mostrando de " + $("#De").text() + " até " + $("#Ate").text() + "  de " + $("#totalItens").text() + " registros",
    //    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",

    //},
    //"bPaginate": {
    //    sFirst: "Primeiro",
    //    sPrevious: "Anterior",
    //    sNext: "Seguinte",
    //    sLast: "Último",

    //}
    //});

    //$("#tabelaDados_next").removeClass("ui-state-disabled");
    //if (paginaAtual > 1) {
    //    $("#tabelaDados_previous").removeClass("ui-state-disabled");
    //} else {
    //    $("#tabelaDados_previous").addClass("ui-state-disabled");
    //}

    //if (parseInt($("#Ate").text()) >= parseInt($("#totalItens").text())) {
    //    $("#tabelaDados_next").addClass("ui-state-disabled");
    //}


    //$("#tabelaDados_previous").attr("data-pg", parseInt(paginaAtual) - 1);
    //$("#tabelaDados_next").attr("data-pg", parseInt(paginaAtual) + 1);

    //$("#tabelaDados_next").click(function () {
    //    CarregarPesquisaFichaAluno($(this).attr("data-pg"));
    //});
    //$("#tabelaDados_previous").click(function () {
    //    CarregarPesquisaFichaAluno($(this).attr("data-pg"));
    //});
}

function DataTableSemPag(obj) {
    $(obj).dataTable({
        //sDom: '<"H"T<"cl">lfr>t<"F"ip>',
        //oTableTools: {
        //    aButtons:
        //        [{
        //            "sExtends": "print",
        //            "sButtonText": "Imprimir",
        //            "aButtons": ["print"],
        //            "sInfo": "<h6>Visualização de Impressão</h6><p>Para imprimir, utilize a opção de impressão do navegador. Pressione ESC para terminar.</p>"
        //        }]
        //},

        "sScrollX": "120%",
        "bJQueryUI": true,
        "bRetrieve": true,
        "oLanguage": {
            "sProcessing": "Processando...",
            "sZeroRecords": "Não foram encontrados resultados",
            "sInfoPostFix": "",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
            "sSearch": "Buscar:"
        },
        "bPaginate": false
    });
}

function ExibirObrigatorio(nomeAluno, nomeMae, codigoDiretoria, ra, digRa, ufRa) {
    $('.validacao').each(function () {
        elemento = $(this);

        if ($(elemento).val().length == 0) {
            $(elemento).addClass("error");

            var label = document.createElement("label");

            //if ($(elemento).prop("name") != "txtRa" && $(elemento).prop("name") != "txtDigRa") {
            //    label.innerHTML = "Obrigatório";
            //}

            if (nomeAluno != "") {
                if ($(elemento).prop("name") != "txtRa" && $(elemento).prop("name") != "txtDigRa" && $(elemento).prop("name") != "txtCpf" && $(elemento).prop("name") != "txtUfRa"
                    && $(elemento).prop("name") != "CodigoTurma" && $(elemento).prop("name") != "txtCodigo" && $(elemento).prop("name") != "txtNomeMae" && $(elemento).prop("name") != "CodigoTipoEnsino") {
                    label.innerHTML = "Obrigatório";
                }
                $('#CodigoTipoEnsino').removeClass("error");
                $('#CodigoTurma').removeClass("error");
            }
            if (nomeMae != "") {
                if ($(elemento).prop("name") != "txtRa" && $(elemento).prop("name") != "txtDigRa" && $(elemento).prop("name") != "txtCpf" && $(elemento).prop("name") != "txtUfRa"
                    && $(elemento).prop("name") != "CodigoTurma" && $(elemento).prop("name") != "txtCodigo" && $(elemento).prop("name") != "txtNome" && $(elemento).prop("name") != "CodigoTipoEnsino") {
                    label.innerHTML = "Obrigatório";
                }
                $('#CodigoTipoEnsino').removeClass("error");
                $('#CodigoTurma').removeClass("error");
            }
            if (codigoDiretoria != 0 && nomeAluno == "" && nomeMae == "") {
                if ($(elemento).prop("name") != "txtRa" && $(elemento).prop("name") != "txtDigRa" && $(elemento).prop("name") != "txtCpf" && $(elemento).prop("name") != "txtUfRa"
                    && $(elemento).prop("name") != "txtCodigo" && $(elemento).prop("name") != "txtNome" && $(elemento).prop("name") != "txtNomeMae") {
                    label.innerHTML = "Obrigatório";

                }
            }
            if (ra != "" && (digRa == "" || ufRa == "") || digRa != "" && (ra == "" || ufRa == "")) {
                if ($(elemento).prop("name") != "txtRa" && $(elemento).prop("name") != "txtDigRa" && $(elemento).prop("name") != "txtCpf" && $(elemento).prop("name") != "CodigoTipoEnsino"
                    && $(elemento).prop("name") != "CodigoDiretoria" && $(elemento).prop("name") != "CodigoEscola" && $(elemento).prop("name") != "txtCodigo" && $(elemento).prop("name") != "CodigoTurma"
                    && $(elemento).prop("name") != "txtNome" && $(elemento).prop("name") != "txtNomeMae") {
                    label.innerHTML = "Obrigatório";
                    $('#CodigoDiretoria').removeClass("error");
                    $('#CodigoEscola').removeClass("error");
                    $('#CodigoTipoEnsino').removeClass("error");
                    $('#CodigoTurma').removeClass("error");
                }

            }
            if (ufRa != "" && (ra == "" || digRa == "")) {
                if ($(elemento).prop("name") != "txtRa" && $(elemento).prop("name") != "txtUfRa" && $(elemento).prop("name") != "txtCpf" && $(elemento).prop("name") != "CodigoTipoEnsino"
                    && $(elemento).prop("name") != "CodigoDiretoria" && $(elemento).prop("name") != "CodigoEscola" && $(elemento).prop("name") != "txtCodigo" && $(elemento).prop("name") != "CodigoTurma"
                    && $(elemento).prop("name") != "txtNome" && $(elemento).prop("name") != "txtNomeMae") {
                    label.innerHTML = "Obrigatório";
                    $('#CodigoDiretoria').removeClass("error");
                    $('#CodigoEscola').removeClass("error");
                    $('#CodigoTipoEnsino').removeClass("error");
                    $('#CodigoTurma').removeClass("error");
                }

            }

            label.className = "error";

            $(label).appendTo($(elemento).parent());

            $(elemento).on("change", function () {
                //elemento.removeClass("error");
                //$(label).remove();
                RetirarObrigatorio();
            });

            $(elemento).on("keypress", function () {
                //elemento.removeClass("error");
                //$(label).remove();
                RetirarObrigatorio();
            });
        }
    });
}

function RetirarObrigatorio() {
    $('.validacao').each(function () {
        $(this).removeClass("error");
        $('label .error').remove();
    });
}

function ZeraTurma() {
    $('#CodigoTurma option').each(function () {
        if ($(this).val() != '') {
            $(this).remove();
        }
    });

    $("#CodigoTipoEnsino option[value='']").attr("selected", "selected");

    var params = {
        CodigoEscola: $('#CodigoEscola').val(),
        CodigoTipoEnsino: $('#CodigoTipoEnsino').val(),
        AnoLetivo: $('#AnoLetivo').val()
    };

    $.post('../../Turma/CarregarListaTurmaPorTipoEnsino', params, function (data) {
        $(data).each(function () {
            $('#CodigoTurma').append('<option value="' + this.value + '">' + this.text + '</option>');
        });
    });
}

function CarregarListaPersonalizada() {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            anoLetivo: parseInt($('#ddlAnoLetivo').val())
        }),
        url: '/Aluno/ListaPersonalizadaParcial',
        success: function (data, textStatus, jqXHR) {
            $('#listaPersonalizada').empty().html(data);
            $('#tabelaDados').sedDataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function ResgatarAlunos(n, t) {

    $.ajax({
        type: "POST",
        async: false,
        dataType: "html",
        data: { codigoTurma: parseInt(n), codigoSubTurma: t },
        url: "/Aluno/ResgatarAlunos", success: function (n) {
            $("#Resultado").hide(); $("#Alunos").html(n);
            $("#tbAlunos").sedDataTable({
                nomeExportacao: "Alunos",
                columnDefs: [{ targets: [7], orderable: false }],
                filtros: [{ nome: "Ano Letivo", valor: $("#ddlAnoLetivo").val() }]
            });
            $(".tit").html("Alunos");
            $(".breadcrumb").html("Alunos");
        }, error: function (n, t, i) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({ titulo: "Erro", mensagem: "Ocorreu um erro durante o processo: " + i, tipo: "Erro", botao: "Fechar" })
            })
        }
    })
}


function AbirPdf() {
    $.ajax({
        cache: false,
        type: 'POST',
        dataType: 'html',
        data: ({
            codigoMatricula: $('#CodigoMatriculaAluno').val(),
            anoLetivo: $('#txtAno').val(),
            codigoTurma: $('#txtIdTurma').val(),
            codigoClasse: $('#txtNrClasse').val(),
            codigoAluno: $('#CodigoAluno').val()
        }),
        url: '/Aluno/GerarPdf',
        success: function (data) {
            $('#DetalheAlunoPDF').html(data);

           EscrevePDF(tabelas, $("#wwi").val());
        }
    });
}

function EscrevePDF(tabelasOrigem, tipoPdf) {

    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        pageMargins: [30, 5, 30, 0],
        title: "Dados Aluno",
        filename: "Detalhe_Matricula_Aluno.pdf",
        tabelas: tabelasOrigem,
        customMargin: [0, parseInt(tipoPdf), 0, 0]
    };

    config.footerWidth = 555;
    config.tabela = tabelasOrigem;

    sedPdfExporter.normalizeConfig(config);
    //config.debug = true;
    config.docGenerator = function (config) {

        //Cabeçalho
        //Titulo
        var content = [
            {
                table: {
                    widths: ["*", 50],
                    body: [[{
                        image: "cabecalho",
                        width: 450
                    }]]
                },
                layout: "noBorders",
                margin: [15, 5, 20, 20],
                alignment: "left",
            },
            {
                text: config.title,
                style: "title",
                margin: 5
            }
        ];

        content.push({
            style: 'centro',
            layout: "noBorders",
            margin: [15, 5, 20, 20],
            table: {
                widths: ['*', 250],
                headerRows: 0,
                body: config.tabelas
            }
        });

        //Rodape
        content.push({
            image: "rodape",
            width: config.footerWidth - 2,
            style: "centro",
            margin: config.customMargin
        });

        var doc = {
            content: content,
            styles: {
                tableHeader: {
                    bold: true,
                    color: "#fff",
                    fontSize: 10,
                    fillColor: "#459ad6",
                    alignment: "center"
                },
                title: {
                    bold: true,
                    color: "#459ad6",
                    alignment: "center",
                    fontSize: 20
                },
                centro: {
                    alignment: "center",
                    fontSize: 10
                },
                cabecalho: {
                    alignment: "center",
                    fontSize: 10,
                    bold: true
                }
            },
            defaultStyle: {
                fontSize: 10
            },
            images: {
                cabecalho: config.sedHeaderImage,
                rodape: config.sedFooterImage
            }
        }

        return doc;
    };

    sedPdfExporter.exportPdf(config);
}

function AbirDadosAlunoPdf(codigoAluno) {
    $.ajax({
        cache: false,
        type: 'POST',
        dataType: 'html',
        data: ({
            codigoAluno: codigoAluno
        }),
        url: '/Aluno/GerarDadosAlunoPdf',
        success: function (data, textStatus, jqXHR) {
            $('#DadosAlunoPDF').html(data);
            EscrevePDF(tabelas,10);
        }
    });
}
