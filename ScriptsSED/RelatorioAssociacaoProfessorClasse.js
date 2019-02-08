$(document).ready(function () {
    RelatorioDocenteSemAula.CarregarCombos();
    RelatorioDocenteSemAula.GerarRelatorio();
    RelatorioDocenteSemAula.Validacao();
    RelatorioAulaLivre.GerarRelatorioAulasLivres();
    RelatorioAulaLivre.Validacao();
    RelatorioAtuacaoIncorreta.GerarRelatorioAtuacaoIncorreta();
});

var RelatorioDocenteSemAula = {
    CarregarCombos: function () {
        $('#codigoDiretoria').change(function () {
            if ($('#codigoDiretoria :selected').val() > 0) {
                $.ajax({
                    type: 'POST',
                    url: '/Escola/CarregaListaEscolasPorDiretoria',
                    data: { CodigoDiretoria: $('#codigoDiretoria :selected').val() },
                    success: function (data) {
                        $('#codigoEscola').empty();
                        $('#codigoEscola').append('<option value="0">Selecione...</option>');
                        $(data).each(function (i, item) {
                            $('#codigoEscola').append('<option value="' + item.value + '">' + item.text + '</option>');
                        })
                    }
                });
            }
        });
    },

    GerarRelatorio: function () {
        $('#btnGerarRelatorio').click(function () {
            if ($('#formGeracaoRelatorio').valid() == false) {
                return;
            }
            var CodigoEscola = $("#codigoEscola").val();
            var NomeEscola = $("#codigoEscola :selected").text();
            var NomeDiretoria = $('#codigoDiretoria :selected').text();
            var anoLetivo = $('#anoLetivo').val();
            var CodigoDiretoria = $('#codigoDiretoria').val();

            $.ajax({
                type: 'POST',
                url: '/Relatorios/AtribRelDocenteSemAula/RelatorioDocenteSemAula',
                data: { codigoEscola: CodigoEscola, anoLetivo: anoLetivo, nomeEscola: NomeEscola, nomeDiretoria: NomeDiretoria, codigoDiretoria: CodigoDiretoria },
                success: function (data) {
                    $('#resultadoPDF').empty().html(data);

                    var fs = [
                        { nome: "Ano Letivo", valor: anoLetivo },
                        { nome: "Diretoria", valor: NomeDiretoria },
                        { nome: "Escola", valor: NomeEscola }
                    ]

                    dt = $('#tbAtribuicao').DataTable({
                        nomeExportacao: "Relatório de Atribuicao",
                        tituloFiltro: " "
                    });

                    sedPdfExporter.generate(dt, {
                        exportOptions: {},
                        header: true,
                        footer: true,
                        title: "Relatório de Docentes sem Aulas",
                        filename: "RelatorioDeDocenteSemAulas.pdf",
                        pageSize: "A4",
                        pageOrientation: "portrait",
                        filters: fs,
                        filterTitle: " "
                    })
                }
            });
        });
    },

    Validacao: function () {
        $('#formGeracaoRelatorio').validate({
            rules: {
                codigoDiretoria: { required: true },
                codigoEscola: { required: true },
                anoLetivo: { required: true }
            },
            messages: {
                required: 'Obrigatório'
            }
        });
    }
}

var RelatorioAulaLivre = {

    CarregarCombosAulasLivres: function () {
        $('#codigoDiretoria').change(function () {
            if ($('#codigoDiretoria :selected').val() > 0) {
                $.ajax({
                    type: 'POST',
                    url: '/Escola/CarregaListaEscolasPorDiretoria',
                    data: { CodigoDiretoria: $('#codigoDiretoria :selected').val() },
                    success: function (data) {
                        $(data).each(function (i, item) {
                            $('#codigoEscola').append('<option value="' + item.value + '">' + item.text + '</option>');
                        })
                    }
                });
            }
        });
    },

    GerarRelatorioAulasLivres: function () {
        $('#btnGerarRelatorioAulasLivres').click(function () {
            if ($('#formGeracaoRelatorioAulasLivres').valid() == false) {
                return;
            }
            var CodigoEscola = $("#codigoEscola").val();
            var NomeEscola = $("#codigoEscola :selected").text();
            var NomeDiretoria = $('#codigoDiretoria :selected').text();
            var anoLetivo = $('#anoLetivo').val();
            var CodigoDiretoria = $('#codigoDiretoria').val();

            $.ajax({
                type: 'POST',
                url: '/Relatorios/RelAulasLivresEscola/RelatorioAulasLivres',
                data: { codigoEscola: CodigoEscola, anoLetivo: anoLetivo, nomeEscola: NomeEscola, nomeDiretoria: NomeDiretoria, codigoDiretoria: CodigoDiretoria },
                success: function (data) {
                    $('#resultadoPDF2').empty().html(data);

                    var fs = [
                        { nome: "Ano Letivo", valor: anoLetivo },
                        { nome: "Diretoria", valor: NomeDiretoria },
                        { nome: "Escola", valor: NomeEscola }
                    ]

                    dt = $('#tbAtribuicao').DataTable({
                        nomeExportacao: "Relatório de Aulas Livres",
                        tituloFiltro: " "
                    });

                    sedPdfExporter.generate(dt, {
                        exportOptions: {},
                        header: true,
                        footer: true,
                        title: "Relatório de Aulas Livres",
                        filename: "RelatorioDeAulasLivres.pdf",
                        pageSize: "A4",
                        pageOrientation: "landscape",
                        filters: fs,
                        filterTitle: " "
                    })
                }
            });
        });
    },

    Validacao: function () {
        $('#formGeracaoRelatorioAulasLivres').validate({
            rules: {
                codigoDiretoria: { required: true },
                codigoEscola: { required: true },
                anoLetivo: { required: true }
            },
            messages: {
                required: 'Obrigatório'
            }
        });
    }
}

var RelatorioAtuacaoIncorreta = {
    GerarRelatorioAtuacaoIncorreta: function () {
        $('#btnGerarRelatorioAtuacaoIncorreta').click(function () {
            if ($('#formGeracaoRelatorio').valid() == false) {
                return;
            }
            var CodigoEscola = $("#codigoEscola").val();
            var NomeEscola = $("#codigoEscola :selected").text();
            var NomeDiretoria = $('#codigoDiretoria :selected').text();
            var anoLetivo = $('#anoLetivo').val();
            var CodigoDiretoria = $('#codigoDiretoria').val();

            $.ajax({
                type: 'POST',
                url: '/Relatorios/RelDocentesAtuacaoIncorreta/RelatorioDocentesAtuacaoIncorreta',
                data: { codigoEscola: CodigoEscola, anoLetivo: anoLetivo, nomeEscola: NomeEscola, nomeDiretoria: NomeDiretoria, codigoDiretoria: CodigoDiretoria },
                success: function (data) {
                    $('#resultadoPDFAtuacao').empty().html(data);

                    var fs = [
                        { nome: "Ano Letivo", valor: anoLetivo },
                        { nome: "Diretoria", valor: NomeDiretoria },
                        { nome: "Escola", valor: NomeEscola }
                    ]

                    dt = $('#tbAtribuicao').DataTable({
                        nomeExportacao: "Relatório de Docentes com Atuação Incorreta",
                        tituloFiltro: " "
                    });

                    sedPdfExporter.generate(dt, {
                        exportOptions: {},
                        header: true,
                        footer: true,
                        title: "Relatório de Docentes com Atuação Incorreta",
                        filename: "RelatorioDeDocentesComAtuacaoIncorreta.pdf",
                        pageSize: "A4",
                        pageOrientation: "landscape",
                        filters: fs,
                        filterTitle: " "
                    })
                }
            });
        });
    }
}
