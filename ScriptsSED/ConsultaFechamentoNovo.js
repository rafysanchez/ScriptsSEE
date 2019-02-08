utils = {
    ajax: function (url, dados, retorno) {

        var ajaxExecucao = {
            cache: false,
            async: true,
            url: url,
            type: "POST",
            dataType: "html",
            data: dados,
            success: retorno,
            error: utils.ajaxErro
        };

        $.ajax(ajaxExecucao);
    },

    ajaxErro: function (erro) {
        $(document).ajaxStop(function () {
            Mensagem.Alert({
                titulo: "Erro",
                mensagem: "Ocorreu um erro durante o processo: Detalhes: " + erro,
                tipo: "Erro",
                botao: "Fechar"
            });
        });
    }
}

formulario = {

    carregarCombos: function () {
        $('#filt-diretoria').autoPreencher($('#filt-escola'), 'Escola', 'CarregarListaEscolas');
    },

    validarFormulario: function () {
        $('#AnoLetivo').verificarAnoLetivo($('#filt-diretoria'), 'Diretoria', 'CarregarListaDiretorias');
    },

    voltarTurmas: function () {
        $("#ListaTurma").show();
        $("#Boletim").hide();
        $("#btnVoltar").css("visibility", "hidden");
        $("divAnoLetivo").show();
    },

    voltarTurmasProfessor: function () {
        $("#ListaTurma").show();
        $("#Atividades").hide();
        $("#btnVoltar").css("visibility", "hidden");
        $("#divAnoLetivo").show();
    }
};


controller = {

    // Professor: Exibe as turmas do professor no ano Letivo ou selecionado maior que 2016 (Perfil Professor)
    CarregarTurmasProfessor: function () {

        var parametrosController =
        { anoLetivo: parseInt($("#ddlAnoLetivo").val()) };

        if (parseInt($("#ddlAnoLetivo").val()) !== 0 && parseInt($("#ddlAnoLetivo").val()) !== undefined && parseInt($("#ddlAnoLetivo").val()) < 2016) {
            Mensagem.Alert({
                titulo: "Pesquisa Inválida!",
                mensagem: "A funcionalidade está disponível para o ano letivo à partir de 2016. Para o Fechamento de anos anteriores utilize o menu: Fechamento > Consulta.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return false;
        }

        utils.ajax("/ConsultaFechamentoNovo/ListaTurmasProfessor",
            parametrosController,
            function (data) {
                $("#turmasProfessor").empty().html(data);
                $("#tabelaDados").sedDataTable(
                {
                    nomeExportacao: "Consulta de Fechamento",
                    tituloFiltro: " ",
                    order: [[0, "asc"]]
                });
            });
    },

    // Administrador/Diretoria/Escola: Função chamada ao carregar Diretoria e Escola
    CarregarTurmasEscola: function () {

        var parametroController = {
            anoLetivo: $("#filt-anoLetivo").val(),
            codigoEscola: $("#filt-escola").val(),
            nomeEscola: document.getElementById("filt-escola").options[document.getElementById("filt-escola").selectedIndex].text,
            nomeDiretoria: document.getElementById("filt-diretoria").options[document.getElementById("filt-diretoria").selectedIndex].text,
        }

        if (parseInt($("#filt-anoLetivo").val()) !== 0 && parseInt($("#filt-anoLetivo").val()) !== undefined && parseInt($("#filt-anoLetivo").val()) < 2016) {
            Mensagem.Alert({
                titulo: "Pesquisa Inválida!",
                mensagem: "A funcionalidade está disponível para o ano letivo à partir de 2016. Para o Fechamento de anos anteriores utilize o menu: Fechamento > Consulta.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return false;
        }

        if (typeof (parametroController.codigoEscola) === "undefined" || parametroController.codigoEscola <= 0) {
            return false;
        }

        utils.ajax("/ConsultaFechamentoNovo/ListaTurmasEscola",
            parametroController,
            function (data) {
                $("#divListaTurmasEscola").empty().html(data);
                $('#imgAtualizar').css("visibility", "visible");
                $("#table").sedDataTable({
                    columnDefs: [
                                    { targets: [5], orderable: false },
                    ],
                    nomeExportacao: "Consulta de Fechamento",
                    tituloFiltro: " ",
                    order: [[0, "asc"]],
                    filtros: [
			            { nome: "Ano Letivo", valor: parametroController.anoLetivo },
			            { nome: "Diretoria", valor: parametroController.nomeDiretoria },
			            { nome: "Escola", valor: parametroController.nomeEscola },
                    ]
                });
                location.hash = "#table";
            }
        );
        return false;
    },

    carregarPDF: (function (perfil) {
        window.open("/ConsultaFechamentoNovo/GerarPdf#" + perfil);
    }),

    // Perfil Administrador/Diretoria/Escola e Professor: Exibe o boletim da turma
    BoletimTurma: function (link) {


        var parametrosController = {
            codigoTurma: $(link).attr('codigoTurma'),
            codigoSubTurma: $(link).attr('codigoSubTurma'),
            codigoDisciplina: $(link).attr('codigoDisciplina'),
            disciplina: $(link).attr('disciplina'),
            descricaoTurma: $(link).attr('descricaoTurma'),


        };
        var professor = $(link).attr('professor');
        var anoLetivo = $("#filt-anoLetivo").val();
        var nomeEscola;
        var nomeDiretoria;

        if (!professor == true) {
            nomeEscola = document.getElementById("filt-escola").options[document.getElementById("filt-escola").selectedIndex].text;
            nomeDiretoria = document.getElementById("filt-diretoria").options[document.getElementById("filt-diretoria").selectedIndex].text;
        } else {
            nomeEscola = "";
            nomeDiretoria = "";
        }

        utils.ajax("/ConsultaFechamentoNovo/BoletimTurma", parametrosController,
            function (data) {
                $("#ListaTurma").hide();
                $("#Atividades").html(data);
                $("#Atividades").show();
                $("#btnVoltar").css("visibility", "visible");
                $("#tabelaAvaliacao").sedDataTable({
                    nomeExportacao: "Consulta de Fechamento",
                    tituloFiltro: " ",
                    order: [[0, "asc"]],
                    filtros: [
                        { nome: "Ano Letivo", valor: anoLetivo },
                        { nome: "Diretoria", valor: nomeDiretoria },
                        { nome: "Escola", valor: nomeEscola },
                        { nome: "Turma", valor: parametrosController.descricaoTurma },
                        { nome: "Disciplina", valor: parametrosController.disciplina },
                    ]
                });
                $("#divAnoLetivo").hide();
            });
    }
};
