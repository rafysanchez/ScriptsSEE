$(document).ready(function () {
    if (typeof modoAprovacao == 'undefined') {
        AplicarMascaras();
        //$("#AnoLetivo").verificarAnoLetivo($("#CodigoDiretoria"), "Diretoria", "CarregarListaDiretorias");
        $("#CodigoDiretoria").autoPreencher($("#CodigoEscola"), "Escola", "CarregarListaEscolas");
        $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: "'CodigoEscola'", AnoLetivo: "'AnoLetivo'" }]);
        $("#CodigoTipoEnsino").autoPreencher($("#CodigoTurma"), "Turma", "CarregarListaTurmaPorTipoEnsino", [{ CodigoEscola: "'CodigoEscola'", CodigoTipoEnsino: "'CodigoTipoEnsino'", AnoLetivo: "'AnoLetivo'" }]);
    }
})

var controller = {
    Pesquisar: function () {
        var codigoDiretoria = $('#CodigoDiretoria').val();
        var codigoEscola = $('#CodigoEscola').val();
        var codigoTurma = $('#CodigoTurma').val();
        var tipoEnsino = $('#CodigoTipoEnsino').val();
        var anoLetivo = $('#AnoLetivo').val();
        var nrRa = $('#txtRa').val();
        var digRa = $('#txtDigRa').val();
        var ufRa = $('#txtUfRa').val();
        var codigoVerificador = $('#CodigoVerificador').val();

        var validoCamposRA = false;
        var validoCamposCombos = false;
        if (
             nrRa != "" &&
             digRa != "" &&
             ufRa != ""
            ) {
            validoCamposRA = true;
        }

        if (
            codigoDiretoria != "" &&
            codigoEscola != "" &&
            codigoTurma != "" &&
            tipoEnsino != ""
          ) {
            validoCamposCombos = true;
        }

        if (validoCamposRA == false && validoCamposCombos == false) {
            Mensagem.Alert({
                titulo: "Histórico Escolar",
                mensagem: 'Favor informar Ano Letivo, Diretoria, Escola, Tipo de Ensino e Turma ou RA do Aluno com dígito e UF',
                tipo: "Alerta",
                botao: "Fechar"
            });

            return false;
        }

        $.ajax({
            cache: false,
            url: '/HistoricoEscolar/ListaAluno',
            type: 'POST',
            datatype: 'html',
            data: {
                anoLetivo: anoLetivo == '' ? 0 : anoLetivo,
                codigoDiretoria: codigoDiretoria == '' ? 0 : codigoDiretoria,
                codigoEscola: codigoEscola == '' ? 0 : codigoEscola,
                tipoEnsino: tipoEnsino == '' ? 0 : tipoEnsino,
                codigoTurma: codigoTurma == '' ? 0 : codigoTurma,
                nrRa: nrRa,
                digRa: digRa,
                ufRa: ufRa,
                codigoVerificador: codigoVerificador,
            },
            success: function (data, textStatus, jqXHR) {
                //gerarPdf(data);
                $("#divResultado").html(data);
                $("#tabelaDados").sedDataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    Visualizar: function (codigo, codigoVerificador, IDDiretorDefinido) {

        var codigoEscola = $('#CodigoEscola').val();
        var codigoTurma = $('#CodigoTurma').val();
        var tipoEnsino = $('#CodigoTipoEnsino').val();
        var anoLetivo = $('#AnoLetivo').val();

        if ($("#TemDiretor").val() == 'False' && IDDiretorDefinido == '') {
            $.ajax({
                cache: false,
                url: '/HistoricoEscolar/DefinirViceDiretor',
                type: 'POST',
                datatype: 'html',
                data: {
                    codigoEscola: codigoEscola == '' ? 0 : codigoEscola,
                    codigoAluno: codigo
                },
                success: function (data, textStatus, jqXHR) {
                    $("#dialogDiretor").html(data).dialog({
                        title: "Definir Diretor",
                        width: '500',
                    });

                    AplicarMascaras();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $(document).ajaxStop();
                }
            });
        } else {
            $.ajax({
                cache: false,
                url: '/HistoricoEscolar/HistoricoEscolar',
                type: 'POST',
                datatype: 'html',
                data: {
                    codigoAluno: codigo,
                    anoLetivo: anoLetivo == '' ? 0 : anoLetivo,
                    codigoEscola: codigoEscola == '' ? 0 : codigoEscola,
                    tipoEnsino: tipoEnsino == '' ? 0 : tipoEnsino,
                    codigoTurma: codigoTurma == '' ? 0 : codigoTurma,
                    IDUsuarioDiretor: IDDiretorDefinido == '' ? 0 : IDDiretorDefinido,
                    codigoVerificador: codigoVerificador
                },
                success: function (data, textStatus, jqXHR) {
                    //alert(data);
                    if (data != "") {
                        $("#dialog").html(data).dialog({
                            title: "Histórico Escolar",
                            width: '1000',
                        });

                        AplicarMascaras();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $(document).ajaxStop();
                }
            });
        }

    },
    Aprovacao: function (codigo) {

        var codigoEscola = $('#CodigoEscola').val();
        var codigoTurma = $('#CodigoTurma').val();
        var tipoEnsino = $('#CodigoTipoEnsino').val();
        var anoLetivo = $('#AnoLetivo').val();

        $.ajax({
            cache: false,
            url: '/HistoricoEscolar/Aprovacao',
            type: 'GET',
            datatype: 'html',
            data: {
                codigoAluno: codigo,
                codigoEscola: codigoEscola == '' ? 0 : codigoEscola,
                tipoEnsino: tipoEnsino == '' ? 0 : tipoEnsino,
                codigoTurma: codigoTurma == '' ? 0 : codigoTurma,
            },
            success: function (data, textStatus, jqXHR) {
                $("#dialog").html(data).dialog({
                    width: '1000',
                });

                AplicarMascaras();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    Editar: function (codigo) {

        $.ajax({
            cache: false,
            url: '/HistoricoEscolar/NotaAdicional',
            type: 'GET',
            datatype: 'html',
            data: {
                codigoAluno: codigo
            },
            success: function (data, textStatus, jqXHR) {
                $("#dialog").html(data).dialog({
                    title: "Inclusão de Disciplinas no Histórico Escolar",
                    width: 1000,
                });

                AplicarMascaras();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    Aprovar: function (codigo, aprovar) {

        $.ajax({
            cache: false,
            url: '/HistoricoEscolar/Aprovar',
            type: 'GET',
            datatype: 'json',
            data: {
                CodigoHistoricoEscolar: codigo,
                Aprovado: aprovar
            },
            success: function (data, textStatus, jqXHR) {
                if (aprovar == 1)
                    $("#txtStatusAprov").val("Aprovado");
                else
                    $("#txtStatusAprov").val("Reprovado");

                controller.Pesquisar();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    Imprimir: function (codigo, UsuarioResponsavel) {
        var msgErro = '';
        /*
        var disciplinas = [];
        $(".disciplinas").each(function (i, v) {
            disciplinas.push($(v).attr("codigoDisciplina"));
        });
        var periodoLetivo = [];
        $(".periodoLetivo").each(function (i, v) {
            periodoLetivo.push($(v).html());
        });
        var msgErro = '';
        var notas = [];
        $(".notas").each(function (i, v) {
            var c = $(v).children()[0];
            if (c.tagName == 'SPAN') {
                notas.push(c.innerText);
                if (c.innerText != '' && parseInt(c.innerText) > 10) {
                    msgErro = 'Notas inseridas devem estar no intevalo de 0 a 10.';
                    return;
                }
            } 
            else {
                notas.push(c.value);
                if (c.value != '' && parseInt(c.value) > 10) {
                    msgErro = 'Notas inseridas devem estar no intevalo de 0 a 10.';
                    return;
                }
            }
        });

        */
        if (msgErro != '') {
            Mensagem.Alert({
                titulo: "Alerta",
                mensagem: msgErro,
                tipo: "alerta",
                botao: "Fechar"
            });
            return;
        }
        $.ajax({
            cache: false,
            url: '/HistoricoEscolar/Imprimir',
            type: 'POST',
            datatype: 'JSON',
            data: {
                codigoAluno: codigo,
                anoLetivo: $('#AnoLetivo').val() == '' ? 0 : $('#AnoLetivo').val(),
                codigoEscola: $('#CodigoEscola').val() == '' ? 0 : $('#CodigoEscola').val(),
                tipoEnsino: $('#CodigoTipoEnsino').val() == '' ? 0 : $('#CodigoTipoEnsino').val(),
                codigoTurma: $('#CodigoTurma').val() == '' ? 0 : $('#CodigoTurma').val(),
                IDUsuarioResponsavel: UsuarioResponsavel == '' ? 0 : UsuarioResponsavel

            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                GerarPDF(data, "interno");
                //controller.Pesquisar();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    ImprimirExterno: function () {
        var d = JSON.parse($("#hdnHistoricoEscolar").val());
        GerarPDF(d, "externo");
    }
}
/*
var ratio = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
})();
*/
function CreateImage64FromText(text, h, w, split, top) {
    var ratio = 1;
    var ctx, canvas = document.createElement('canvas');
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = "100%";//w + "px";
    canvas.style.height = "100%";//h + "px";
    ctx = canvas.getContext("2d");;
    ctx.font = text.length > 100 ? "16px arial" : "18px arial";
    ctx.save();
    ctx.translate(w * ratio, h * ratio);
    ctx.rotate(-0.5 * Math.PI);
    ctx.fillStyle = "#000";

    var s;
    if (split) {
        s = text.indexOf("/") !== -1 ? text.split("/") : text.split(" ");
        var aux = [];

        for (var i = 0; i < s.length; i++) {
            if (i + 1 < s.length && s[i + 1].length < 4)
                aux.push(s[i] + " " + s[i + 1]);
            else
                aux.push(s[i]);

            if (aux[aux.length - 1].length < 4)
                aux.splice(aux.length - 1, 1);
        }

        for (var i = 0; i < aux.length; i++)
            ctx.fillText(aux[i], w / 2, -22 + (i * 17) + top);
    }
    else {
        if (text.length > 20) {
            s = text.split(" ");
            var tam = s.length / 2;
            var output = "";
            for (var i = 0; i < tam; i++)
                output += s[i] + " ";

            ctx.fillText(output, w / 2, -22 + top);

            output = "";
            for (var i = tam; i < s.length; i++)
                output += s[i] + " ";

            ctx.fillText(output, w / 2, -5 + top);
        }
        else
            ctx.fillText(text, w / 2, -5 + top);
    }

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.restore();
    return canvas.toDataURL();
}

function GerarPDF(data, modo) {
    if (!BlobDownloader.oldDownloadFunction) {
        BlobDownloader.oldDownloadFunction = BlobDownloader.download;
        BlobDownloader.download = function (filename, blob) {
            if (modo == "interno")
                controller.Pesquisar();

            Mensagem.Alert({
                titulo: "Sucesso",
                mensagem: "Histórico Gerado com sucesso",
                tipo: "sucesso",
                botao: "Fechar"
            });
            BlobDownloader.download = BlobDownloader.oldDownloadFunction;
            BlobDownloader.oldDownloadFunction = null;
            return BlobDownloader.download(filename, blob);
        }
    }

    var FundamentoLegal = CreateImage64FromText("Fundamento Legal: " + data.FundamentoLegal, 600, 50, false, -5);
    var BaseNacional = CreateImage64FromText("BASE NACIONAL COMUM/ E PARTE DIVERSIFICADA", 350, 58, true, -7);
    var Estudos = CreateImage64FromText("ESTUDOS REALIZADOS", 200, 48, true, 1);

    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        pageMargins: [5, 5, 5, 5],
        title: "Histórico Escolar"
    };
    sedPdfExporter.normalizeConfig(config);
    config.debug = true;
    config.chamadaPDF = modo;
    config.data = data;
    config.FundamentoLegal = FundamentoLegal;
    config.BaseNacional = BaseNacional;
    config.Estudos = Estudos;
    config.Brasao = "data:image/png;base64,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";
    config.docGenerator = function (config) {
        var telefones = [];
        for (var i = 0; i < config.data.Telefones.length; i++) {
            telefones.push([{ text: config.data.Telefones[i], style: 'cell' }]);
        }
        var content = [];
        content.push(
        {
            table: {
                widths: ['auto', '65%', '*'],
                body: [
                    [{ width: 110, alignment: 'brasao', image: config.Brasao },
                    {
                        table: {
                            widths: ['auto', 'auto', 'auto', '*', 'auto', '*'],
                            body: [
                                [{ text: "GOVERNO DO ESTADO DE SÃO PAULO", colSpan: 6, style: 'bold' }, {}, {}, {}, {}, {}],
                                [{ text: "SECRETARIA DE ESTADO DA EDUCAÇÃO", colSpan: 6, style: 'bold' }, {}, {}, {}, {}, {}],
                                [{ text: config.data.Diretoria, colSpan: 6, style: 'bold' }, {}, {}, {}, {}, {}],
                                [{ text: 'ESCOLA ESTADUAL "' + config.data.Escola + '"', colSpan: 6, style: 'bold' }, {}, {}, {}, {}, {}],
                                [{ text: 'Ato Legal de Criação:' + (config.data.AtoLegalEscola == null ? '' : config.data.AtoLegalEscola), colSpan: 6, style: 'cell' }, {}, {}, {}, {}, {}],
                                [{ text: 'Endereço:', style: 'cell' }, { text: config.data.EnderecoEscola, colSpan: 5, style: 'cell' }, {}, {}, {}, {}],
                                [{ text: 'Município:', style: 'cell' }, { text: config.data.MunicipioEscola, style: 'cell' }, { text: 'CEP:', style: 'cell' }, { text: config.data.CEP, style: 'cell' }, { text: 'Tel:', style: 'cell' }, {
                                    table: {
                                        widths: ['auto'],
                                        body: telefones
                                    },
                                    layout: 'noBorders'
                                }],
                            ],

                        },
                        layout: 'noBorders'
                    }, { width: 80, alignment: 'center', image: config.data.QrCode }],
                ],
            },
            layout: 'noBorders'
        });

        content.push({ text: 'HISTÓRICO ESCOLAR - ' + config.data.DescricaoTipoEnsino.toUpperCase(), style: 'h1' });

        content.push({
            table: {
                widths: ['auto', 'auto', 'auto', '*', 'auto', '*', 'auto', '*'],
                body: [
                    [{ text: 'Nome do Aluno:', style: 'cell', bold: true, border: [true, true, false, false] }, { text: config.data.NomeAluno, style: 'cell', border: [false, true, false, false] }, { text: 'RG/RNE:', style: 'cell' }, { text: config.data.RG, style: 'cell' }, { text: 'CPF:', style: 'cell' }, { text: config.data.CPF == null ? "" : config.data.CPF, style: 'cell' }, { text: 'RA:', style: 'cell' }, { text: config.data.RA, style: 'cell' }],
                    [{ text: 'Nascimento', rowSpan: 2, border: [true, true, true, false] }, { text: 'Município: ' + config.data.MunicipioAluno, style: 'cell', colSpan: 3, }, {}, {}, { text: 'Estado:', style: 'cell' }, { text: config.data.EstadoAluno, style: 'cell' }, { text: 'País:', style: 'cell' }, { text: config.data.PaisAluno, style: 'cell' }],
                    [{}, { text: 'Data: ' + config.data.DataNascimentoAluno, style: 'cell', colSpan: 7, border: [true, true, true, false] }, {}, {}, {}, {}, {}],
                ]
            },
            layout: {
                vLineWidth: function (i, node) { return !(i !== 1) || i === 0 || i === node.table.widths.length ? 1 : 0; }
            }
        });

        // 7 + quantidade periodo letivo (colunas)
        var body = [];
        var rspan = config.data.PeriodoLetivo.length + (config.data.TipoEnsino == 2 || config.data.TipoEnsino == 5 || config.data.TipoEnsino == 63 ? 3 : 1);
        //cabecalho   
        var cabecalho = [{ width: 20, image: config.FundamentoLegal, style: 'vertical', rowSpan: config.data.Disciplinas.length + 6 + rspan }, { text: 'COMPONENTES CURRICULARES', colSpan: 6, rowSpan: 3, style: 'header' }, {}, {}, {}, {}, {}];
        for (var i = 0; i < config.data.PeriodoLetivo.length; i++) {
            if (i == 0)
                cabecalho.push({ text: 'Período Letivo', colSpan: config.data.PeriodoLetivo.length, style: 'header' });
            else
                cabecalho.push({});
        }
        body.push(cabecalho);
        var periodoLetivo = [];
        var serie = [];
        periodoLetivo.push({}, {}, {}, {}, {}, {}, {});
        serie.push({}, {}, {}, {}, {}, {}, {});

        for (var i = 0 ; i < config.data.PeriodoLetivo.length; i++) {
            periodoLetivo.push({ text: config.data.PeriodoLetivo[i] == 0 ? "" : config.data.PeriodoLetivo[i].toString(), style: 'header' });
            serie.push({ text: config.data.Series[i].toString() + 'ª ' + config.data.TermoEnsino, style: 'header' });
        }

        body.push(periodoLetivo);
        body.push(serie);
        //disciplinas e notas
        var area = "";
        var linha = [];
        var qt_area = 0;
        var tem_nota = false;
        for (var i = 0; i < config.data.Disciplinas.length; i++) {
            linha = [{}];
            //adiciona coluna base nacional
            /*
            if (i == 0)
                linha.push({ width: 25, image: config.BaseNacional, rowSpan: config.data.Disciplinas.length + 3, style: 'vertical' });
            else
                linha.push({});
            //adiciona coluna area conhecimento
            for (var j = 0; j < config.data.Disciplinas.length; j++) { if (config.data.Disciplinas[i].Area == config.data.Disciplinas[j].Area) qt_area++; }
            if (area != config.data.Disciplinas[i].Area)
                linha.push({ text: config.data.Disciplinas[i].Area, rowSpan: qt_area, style: 'center' });
            else
                linha.push({});
*/

            for (var j = 0; j < config.data.Disciplinas.length; j++) { if (config.data.Disciplinas[i].Area == config.data.Disciplinas[j].Area) qt_area++; }
            if (area != config.data.Disciplinas[i].Area)
                linha.push({ text: config.data.Disciplinas[i].Area, colSpan: 2, rowSpan: qt_area, style: 'center' });
            else
                linha.push({});

            //adiciona coluna area conhecimento
            for (var j = 0; j < config.data.Disciplinas.length; j++) { if (config.data.Disciplinas[i].Area == config.data.Disciplinas[j].Area) qt_area++; }
            if (area != config.data.Disciplinas[i].Area)
                linha.push({});
            else
                linha.push({});

            //adiciona coluna de disciplina
            linha.push({ text: config.data.Disciplinas[i].Nome, colSpan: 4, style: 'cell' }, {}, {}, {});
            var contadorSerie = 0;
            //contabiliza quantas disciplinas por area
            for (var j = 0; j < config.data.PeriodoLetivo.length; j++) {
                tem_nota = false;
                var serie = 0;
                if (contadorSerie <= config.data.Series.length) {
                    serie = config.data.Series[contadorSerie];
                }
                contadorSerie++;

                for (var f = 0; f < config.data.Fechamentos.length; f++) {
                    if (config.data.Fechamentos[f].Ano == config.data.PeriodoLetivo[j] && config.data.Fechamentos[f].Serie == serie && config.data.Fechamentos[f].CodigoDisciplina == config.data.Disciplinas[i].Codigo) {

                        if (config.data.Fechamentos[f].Nota != null) {
                            linha.push({ text: config.data.Fechamentos[f].Nota == null ? "-" : config.data.Fechamentos[f].Nota.toString(), style: 'center' });
                            tem_nota = true;
                            break;
                        }
                    }
                }
                if (!tem_nota) {
                    if (config.data.PeriodoLetivo[j] == (new Date()).getFullYear() && config.data.StatusCursando) {
                        linha.push({ text: 'Cursando', style: 'center' });
                    }
                    else {
                        linha.push({ text: '-', style: 'center' });
                    }
                }
            }
            tem_nota = false;
            area = config.data.Disciplinas[i].Area;
            qt_area = 0;
            body.push(linha);
        }

        //carga horaria
        var base_diversificada = 0;
        var cargaHorariaDisciplinas = 0;
        for (var i = 0; i < config.data.Disciplinas.length; i++) {
            if (config.data.Disciplinas[i].Area == 'Parte Diversificada') {
                base_diversificada++;
                cargaHorariaDisciplinas = cargaHorariaDisciplinas + config.data.Disciplinas[i].CargaHoraria;
            }
        }


        /*
                var carga = [{}, {}, { text: 'CARGA HORÁRIA - BASE NACIONAL COMUM', style: 'cell', bold: true, colSpan: 5 }, {}, {}, {}, {}, { text: (config.data.CargaHoraria - (cargaHorariaDisciplinas * config.data.FundamentoLegalModulo)).toString(), style: 'cell', colSpan: config.data.PeriodoLetivo.length }];
                for (var i = 1; i < config.data.PeriodoLetivo.length; i++) { carga.push({}); }
                body.push(carga);
                carga = [];
                carga.push({}, {}, { text: 'CARGA HORÁRIA - PARTE DIVERSIFICADA', style: 'cell', bold: true, colSpan: 5 }, {}, {}, {}, {}, { text: (cargaHorariaDisciplinas * config.data.FundamentoLegalModulo).toString(), style: 'cell', colSpan: config.data.PeriodoLetivo.length });
                for (var i = 1; i < config.data.PeriodoLetivo.length; i++) { carga.push({}); }
                body.push(carga);
                carga = [];
                carga.push({}, {}, { text: 'TOTAL DE CARGA HORÁRIA / TOTAL HORAS', style: 'cell', bold: true, colSpan: 5 }, {}, {}, {}, {}, { text: config.data.CargaHoraria.toString() + ' / ' + Math.round((config.data.CargaHoraria * 50) / 60).toString(), style: 'cell', colSpan: config.data.PeriodoLetivo.length });
                for (var i = 1; i < config.data.PeriodoLetivo.length; i++) { carga.push({}); }
                body.push(carga);
        */
        var carga = [{}, { text: 'CARGA HORÁRIA - BASE NACIONAL COMUM', style: 'cell', bold: true, colSpan: 6 }, {}, {}, {}, {}, {}, { text: (config.data.CargaHoraria - (cargaHorariaDisciplinas * config.data.FundamentoLegalModulo)).toString(), style: 'cell', colSpan: config.data.PeriodoLetivo.length }];
        for (var i = 1; i < config.data.PeriodoLetivo.length; i++) { carga.push({}); }
        body.push(carga);
        carga = [];
        carga.push({}, { text: 'CARGA HORÁRIA - PARTE DIVERSIFICADA', style: 'cell', bold: true, colSpan: 6 }, {}, {}, {}, {}, {}, { text: (cargaHorariaDisciplinas * config.data.FundamentoLegalModulo).toString(), style: 'cell', colSpan: config.data.PeriodoLetivo.length });
        for (var i = 1; i < config.data.PeriodoLetivo.length; i++) { carga.push({}); }
        body.push(carga);
        carga = [];
        carga.push({}, { text: 'TOTAL DE CARGA HORÁRIA / TOTAL HORAS', style: 'cell', bold: true, colSpan: 6 }, {}, {}, {}, {}, {}, { text: config.data.CargaHoraria.toString() + ' / ' + Math.round((config.data.CargaHoraria * 50) / 60).toString(), style: 'cell', colSpan: config.data.PeriodoLetivo.length });
        for (var i = 1; i < config.data.PeriodoLetivo.length; i++) { carga.push({}); }
        body.push(carga);

        //concluinte
        linha = [];
        var textFundamental = '';
        var marginEstudos = [0, 0, 0, 0];
        var rowsTipo = 0;
        if (config.data.TipoEnsino == 2 || config.data.TipoEnsino == 5 || config.data.TipoEnsino == 63) {
            rowsTipo = 2;
        }

        if (config.data.ConcluinteEM.length > 3) {
            for (var i = 0; i < config.data.ConcluinteEM.length; i++) {
                textFundamental += '\n';
            }
            marginEstudos = [0, 10, 0, 0];
        }

        textFundamental += 'Ensino Fundamental';
        linha.push({}, { margin: marginEstudos, width: 20, image: config.Estudos, style: 'vertical', rowSpan: rspan }, { text: textFundamental, style: 'header', rowSpan: rowsTipo > 0 ? rowsTipo : rspan }, { text: config.data.TermoEnsino, style: 'anoExemplo' }, { text: 'Ano', style: 'header' }, { text: 'Estabelecimento de Ensino', style: 'header', colSpan: config.data.PeriodoLetivo.length - 1 });
        for (var i = 1; i < config.data.PeriodoLetivo.length - 1; i++) { linha.push({}); }
        linha.push({ text: 'Município', style: 'header' }, { text: 'UF', style: 'header' }, { text: 'Nº Concluinte', style: 'header' });
        body.push(linha);
        //adiciona linha de ensino fundamental caso TipoEnsino = 2 (ensino medio)
        if (config.data.TipoEnsino == 2 || config.data.TipoEnsino == 5 || config.data.TipoEnsino == 63) {
            linha = [];
            linha.push({}, {}, {}, { text: config.data.ConcluinteEF.Serie == null || config.data.ConcluinteEF.Serie == "" ? "-" : config.data.ConcluinteEF.Serie + 'ª' + config.data.TermoEnsino, style: 'header' }, { text: config.data.ConcluinteEF.AnoLetivo == null ? "-" : config.data.ConcluinteEF.AnoLetivo == 0 ? "-" : config.data.ConcluinteEF.AnoLetivo.toString(), style: 'header' }, { text: config.data.ConcluinteEF.NomeEscola == null ? "-" : config.data.ConcluinteEF.NomeEscola, style: 'cell', colSpan: config.data.PeriodoLetivo.length - 1 });
            for (var i = 1; i < config.data.PeriodoLetivo.length - 1; i++) { linha.push({}); }
            linha.push({ text: config.data.ConcluinteEF.MunicipioEscola == null ? "-" : config.data.ConcluinteEF.MunicipioEscola, style: 'cell' }, { text: config.data.ConcluinteEF.UfEscola == null ? "-" : config.data.ConcluinteEF.UfEscola, style: 'center' }, { text: config.data.ConcluinteEF.NumeroVistoConfere == null ? "-" : config.data.ConcluinteEF.NumeroVistoConfere, style: 'header' });
            body.push(linha);

            linha = [];
            linha.push({}, {}, { text: ' ', colSpan: 5 + config.data.PeriodoLetivo.length }, {}, {}, {}, {});
            for (var i = 0; i < config.data.PeriodoLetivo.length; i++) { linha.push({}); }
            body.push(linha);
        }

        for (var i = 0; i < config.data.PeriodoLetivo.length; i++) {
            var ano = config.data.PeriodoLetivo[i] == 0 ? "" : config.data.PeriodoLetivo[i].toString();
            var concluinte = undefined;
            for (var j = 0; j < config.data.ConcluinteEM.length; j++) {
                if (config.data.ConcluinteEM[j].AnoLetivo == ano) {
                    concluinte = config.data.ConcluinteEM[j];
                    break;
                }
            }

            /*if (concluinte == undefined) {
                linha = [];
                linha.push({}, {}, {}, { text: config.data.Series[i].toString() + 'ª Série', style: 'header' }, { text: ano.toString(), style: 'header' }, { text: "-", style: 'cell', colSpan: config.data.PeriodoLetivo.length - 1 });
                for (var j = 1; j < config.data.PeriodoLetivo.length - 1; j++) { linha.push({}); }
                linha.push({ text: "-", style: 'cell' }, { text: "-", style: 'center' }, { text: "-", style: 'center' });
                body.push(linha);
            }
            else {*/
            /*
            if (concluinte != undefined) {
                if (concluinte.AnoLetivo == config.data.AnoLetivo && config.data.StatusCursando)
                    concluinte.NomeEscola = concluinte.NomeEscola + ' - CURSANDO'
            }*/
            if (config.data.Series[i] == 1 && i == 0) {
                if (config.data.TipoEnsino == 2 || config.data.TipoEnsino == 5 || config.data.TipoEnsino == 63) {

                    linha = [];

                    if (concluinte != undefined) {
                        if (config.data.StatusCursando == true && config.data.UltimoAnoSerieTermo == config.data.Series[i]) {
                            concluinte.NomeEscola = concluinte.NomeEscola + ' - CURSANDO';
                        }

                        linha.push({}, {}, { text: config.data.DescricaoTipoEnsino, style: 'header', rowSpan: config.data.PeriodoLetivo.length }, { text: config.data.Series[i].toString() + 'ª ' + config.data.TermoEnsino, style: 'header' }, { text: ano.toString(), style: 'header' }, { text: concluinte.NomeEscola == null ? "-" : concluinte.NomeEscola, style: 'cell', colSpan: config.data.PeriodoLetivo.length - 1 });
                        for (var j = 1; j < config.data.PeriodoLetivo.length - 1; j++) { linha.push({}); }
                        linha.push({ text: concluinte.MunicipioEscola == null ? "-" : concluinte.MunicipioEscola, style: 'cell' }, { text: concluinte.UfEscola == null ? "-" : concluinte.UfEscola, style: 'center' }, { text: concluinte.NumeroVistoConfere == null ? "-" : concluinte.NumeroVistoConfere.toString(), style: 'center' });
                    }
                    else {
                        linha.push({}, {}, { text: config.data.DescricaoTipoEnsino, style: 'header', rowSpan: config.data.PeriodoLetivo.length }, { text: config.data.Series[i].toString() + 'ª ' + config.data.TermoEnsino, style: 'header' }, { text: ano.toString(), style: 'header' }, { text: "-", style: 'cell', colSpan: config.data.PeriodoLetivo.length - 1 });
                        for (var j = 1; j < config.data.PeriodoLetivo.length - 1; j++) { linha.push({}); }
                        linha.push({ text: "-", style: 'cell' }, { text: "-", style: 'center' }, { text: "-", style: 'center' });

                    }
                    body.push(linha);
                }
                else {

                    linha = [];
                    if (concluinte != undefined) {
                        if (config.data.StatusCursando == true && config.data.UltimoAnoSerieTermo == config.data.Series[i]) {
                            concluinte.NomeEscola = concluinte.NomeEscola + ' - CURSANDO';
                        }

                        linha.push({}, {}, {}, { text: config.data.Series[i].toString() + 'ª ' + config.data.TermoEnsino, style: 'header' }, { text: ano.toString(), style: 'header' }, { text: concluinte.NomeEscola == null ? "-" : concluinte.NomeEscola, style: 'cell', colSpan: config.data.PeriodoLetivo.length - 1 });
                        for (var j = 1; j < config.data.PeriodoLetivo.length - 1; j++) { linha.push({}); }
                        linha.push({ text: concluinte.MunicipioEscola == null ? "-" : concluinte.MunicipioEscola, style: 'cell' }, { text: concluinte.UfEscola == null ? "-" : concluinte.UfEscola, style: 'center' }, { text: concluinte.NumeroVistoConfere == null ? "-" : concluinte.NumeroVistoConfere.toString(), style: 'center' });
                    }
                    else {
                        linha.push({}, {}, {}, { text: config.data.Series[i].toString() + 'ª ' + config.data.TermoEnsino, style: 'header' }, { text: ano.toString(), style: 'header' }, { text: "-", style: 'cell', colSpan: config.data.PeriodoLetivo.length - 1 });
                        for (var j = 1; j < config.data.PeriodoLetivo.length - 1; j++) { linha.push({}); }
                        linha.push({ text: "-", style: 'cell' }, { text: "-", style: 'center' }, { text: "-", style: 'center' });
                    }
                    body.push(linha);
                }
            }
            else {

                linha = [];
                if (concluinte != undefined) {
                    if (config.data.StatusCursando == true && config.data.UltimoAnoSerieTermo == config.data.Series[i]) {
                        concluinte.NomeEscola = concluinte.NomeEscola + ' - CURSANDO';
                    }

                    linha.push({}, {}, {}, { text: config.data.Series[i].toString() + 'ª ' + config.data.TermoEnsino, style: 'header' }, { text: ano.toString(), style: 'header' }, { text: concluinte.NomeEscola == null ? "-" : concluinte.NomeEscola, style: 'cell', colSpan: config.data.PeriodoLetivo.length - 1 });
                    for (var j = 1; j < config.data.PeriodoLetivo.length - 1; j++) { linha.push({}); }
                    linha.push({ text: concluinte.MunicipioEscola == null ? "-" : concluinte.MunicipioEscola, style: 'cell' }, { text: concluinte.UfEscola == null ? "-" : concluinte.UfEscola, style: 'center' }, { text: (concluinte.NumeroVistoConfere == null ? "-" : concluinte.NumeroVistoConfere.toString()), style: 'center' });
                }
                else {
                    linha.push({}, {}, {}, { text: config.data.Series[i].toString() + 'ª ' + config.data.TermoEnsino, style: 'header' }, { text: ano.toString(), style: 'header' }, { text: "-", style: 'cell', colSpan: config.data.PeriodoLetivo.length - 1 });
                    for (var j = 1; j < config.data.PeriodoLetivo.length - 1; j++) { linha.push({}); }
                    linha.push({ text: "-", style: 'cell' }, { text: "-", style: 'center' }, { text: "-", style: 'center' });
                }

                body.push(linha);
            }
        }
        if (base_diversificada > 0) {
            linha = [];
            linha.push({ text: 'OBSERVAÇÕES: \n\n', colSpan: 7 + config.data.PeriodoLetivo.length, style: 'header' }, {}, {}, {}, {}, {}, {});
            for (var i = 0; i < config.data.PeriodoLetivo.length; i++) { linha.push({}); }
            body.push(linha);
        }
        console.log(config.data.StatusCursando);
        var rodape = [];
        var text = [
        'O Diretor de Escola Estadual "' + config.data.Escola.trim(),
        { text: config.data.StatusCursando == true ? '" DECLARA ' : '" CERTIFICA ', bold: true },
        'nos termos do Inciso VII, Artigo 24 da Lei Federal 9394/96, que ',
        { text: config.data.NomeAluno.trim(), bold: true },
        ' RG\\RNE: ',
        { text: config.data.RG.trim() + (config.data.StatusCursando ? ', cursando ' : ', concluiu '), bold: true },
        { text: config.data.TermoEnsino.toUpperCase() == 'SERIE' ? 'a ' : 'o ' },
        { text: config.data.UltimoAnoSerieTermo + 'ª ' + config.data.TermoEnsino + ' do ' + config.data.DescricaoTipoEnsino.toUpperCase() + ', no ano de ' + config.data.AnoParam, bold: true }];

        rodape.push([{ style: 'declaracao', text: config.data.StatusCursando == true ? 'DECLARAÇÃO' : 'CERTIFICAÇÃO', bold: true, style: 'center', colSpan: 3 }, {}, {}]);
        rodape.push([{ style: 'declaracao', text: text, style: 'center', colSpan: 3, margin: [0, 0, 0, 20] }, {}, {}]);
        rodape.push([{ style: 'declaracao', text: [config.data.MunicipioEscola + ', ' + config.data.Data, { text: '\nLOCAL E DATA', bold: true }], style: 'center' },
                    { style: 'declaracao', text: [config.data.NomeUsuarioGeracao, { text: '\n' + config.data.PerfilUsuarioGeracao + '\n', bold: true }, config.data.RGUsuarioGeracao], style: 'center' },
                    { style: 'declaracao', text: [config.data.UsuarioAprovacao.Nome, { text: '\n' + config.data.UsuarioAprovacao.Perfil + '\n', bold: true }, config.data.UsuarioAprovacao.Rg], style: 'center' }]);

        linha = [];
        linha.push({
            colSpan: 7 + config.data.PeriodoLetivo.length,
            table: {
                body: rodape
            },
            layout: 'noBorders'
        }, {}, {}, {}, {}, {}, {});
        for (var i = 0; i < config.data.PeriodoLetivo.length; i++) { linha.push({}); }
        body.push(linha);

        var width = [];
        for (var i = 0; i < config.data.PeriodoLetivo.length + 7; i++) {
            if (i > 6)
                width.push(50);
            else
                width.push('auto');
        }

        content.push({
            table: {
                //widths: width,
                body: body
            }
        });

        //content.push({ text: config.data.CodigoVerificador, style: 'center', margin: [0, 5, 0, 0] });

        if ((config.data.lstNotasAdicionais != undefined && config.data.lstNotasAdicionais != null) || (config.data.NotasBimestreAnoAtual != undefined && config.data.NotasBimestreAnoAtual != null)) {
            var segundaFolha = false;
            if (config.data.lstNotasAdicionais != undefined && config.data.lstNotasAdicionais != null) {
                if (config.data.lstNotasAdicionais.length > 0)
                    segundaFolha = true;
            }
            if (config.data.NotasBimestreAnoAtual != undefined && config.data.NotasBimestreAnoAtual != null) {
                if (config.data.BimestresAnoAtual.length > 0)
                    segundaFolha = true;
            }
            if (segundaFolha) {
                telefonesCabecalho = [];
                for (var i = 0; i < config.data.Telefones.length; i++) {
                    telefonesCabecalho.push([{
                        text: config.data.Telefones[i], style: 'cell'
                    }]);
                }
                contentCabecalho = [];
                contentCabecalho.push(
                {
                    table: {
                        widths: ['auto', '65%', '*'],
                        body: [
                            [{ width: 110, alignment: 'brasao', image: config.Brasao },
                            {
                                table: {
                                    widths: ['auto', 'auto', 'auto', '*', 'auto', '*'],
                                    body: [
                                        [{ text: "GOVERNO DO ESTADO DE SÃO PAULO", colSpan: 6, style: 'bold' }, {}, {}, {}, {}, {}],
                                        [{ text: "SECRETARIA DE ESTADO DA EDUCAÇÃO", colSpan: 6, style: 'bold' }, {}, {}, {}, {}, {}],
                                        [{ text: config.data.Diretoria, colSpan: 6, style: 'bold' }, {}, {}, {}, {}, {}],
                                        [{ text: 'ESCOLA ESTADUAL "' + config.data.Escola + '"', colSpan: 6, style: 'bold' }, {}, {}, {}, {}, {}],
                                        [{ text: 'Ato Legal de Criação:' + (config.data.AtoLegalEscola == null ? '' : config.data.AtoLegalEscola), colSpan: 6, style: 'cell' }, {}, {}, {}, {}, {}],
                                        [{ text: 'Endereço:', style: 'cell' }, { text: config.data.EnderecoEscola, colSpan: 5, style: 'cell' }, {}, {}, {}, {}],
                                        [{ text: 'Município:', style: 'cell' }, { text: config.data.MunicipioEscola, style: 'cell' }, { text: 'CEP:', style: 'cell' }, { text: config.data.CEP, style: 'cell' }, { text: 'Tel:', style: 'cell' }, {
                                            table: {
                                                widths: ['auto'],
                                                body: telefonesCabecalho
                                            },
                                            layout: 'noBorders'
                                        }],
                                    ],

                                },
                                layout: 'noBorders'
                            }, { width: 80, alignment: 'center', image: config.data.QrCode }],
                        ],
                    },
                    layout: 'noBorders'
                });
                content.push({ text: '', pageBreak: 'before' });
                content.push(contentCabecalho);
                content.push({ text: 'Observações' });
            }
            if (config.data.NotasBimestreAnoAtual != undefined && config.data.NotasBimestreAnoAtual != null) {

                var AnoAberto = 0;
                for (var i = 0 ; i < config.data.PeriodoLetivo.length; i++) {
                    if (config.data.PeriodoLetivo[i] > AnoAberto)
                        AnoAberto = config.data.PeriodoLetivo[i];
                }

                if (config.data.NotasBimestreAnoAtual.length > 0) {
                    console.log("entrou notas bimestre");
                    content.push({ margin: [0, 10, 0, 5], text: "Escola: " + config.data.EscolaAnoAberto + " - CURSANDO - " + AnoAberto.toString() });

                    var widthsAnoAberto = [];
                    var cabecalhoAberto = [];
                    //var BimestresAnoAtual = [];
                    var body = [];

                    widthsAnoAberto.push('15%');
                    cabecalhoAberto.push({ text: 'DISCIPLINA', rowSpan: 2, colSpan: 2, style: 'header' });

                    widthsAnoAberto.push('30%');
                    cabecalhoAberto.push({});

                    for (var iAnoAberto = 0; iAnoAberto < config.data.BimestresAnoAtual.length; iAnoAberto++) {
                        widthsAnoAberto.push('6%');
                        widthsAnoAberto.push('6%');

                        cabecalhoAberto.push({ text: (config.data.BimestresAnoAtual[iAnoAberto] - 4).toString() + 'º Bimestre', colSpan: 2, style: 'header' });
                        cabecalhoAberto.push({});

                    }
                    body.push(cabecalhoAberto);
                    console.log("chegou aqui 1");
                    cabecalhoAberto = [];
                    cabecalhoAberto.push({}, {});
                    for (var iAnoAberto = 0; iAnoAberto < config.data.BimestresAnoAtual.length; iAnoAberto++) {

                        cabecalhoAberto.push({ text: 'Falta', style: 'header' });
                        cabecalhoAberto.push({ text: 'Nota', style: 'header' });

                    }
                    body.push(cabecalhoAberto);

                    var areaAnoAberto = "";
                    var qt_areaAnoAberto = 0;

                    for (var i = 0; i < config.data.Disciplinas.length; i++) {
                        var linhaAnoAberto = [];
                        for (var j = 0; j < config.data.Disciplinas.length; j++) {
                            if (config.data.Disciplinas[i].Area == config.data.Disciplinas[j].Area)
                                qt_areaAnoAberto++;
                        }
                        /*
                            alert(areaAnoAberto);
                            alert(Disciplinas[i].Area);
                            */
                        if (areaAnoAberto != config.data.Disciplinas[i].Area) {
                            //alert(qt_areaAnoAberto);
                            linhaAnoAberto.push({ text: config.data.Disciplinas[i].Area, rowSpan: qt_areaAnoAberto, style: 'cell' });
                        } else {
                            //alert(')')
                            linhaAnoAberto.push({});
                        }
                        linhaAnoAberto.push({ text: config.data.Disciplinas[i].Nome, style: 'cell' });

                        var nota = 0;
                        var falta = 0;
                        //contabiliza quantas disciplinas por area
                        for (var j = 0; j < config.data.BimestresAnoAtual.length; j++) {
                            for (var iii = 0; iii < config.data.NotasBimestreAnoAtual.length; iii++) {
                                if (config.data.NotasBimestreAnoAtual[iii].CodigoDisciplina == config.data.Disciplinas[i].Codigo) {
                                    if (config.data.NotasBimestreAnoAtual[iii].CodigoTipoFechamento == config.data.BimestresAnoAtual[j]) {
                                        nota = config.data.NotasBimestreAnoAtual[iii].Nota;
                                        falta = config.data.NotasBimestreAnoAtual[iii].NumeroFaltas;

                                    }
                                }

                            }
                            console.log(nota);
                            console.log(falta);
                            linhaAnoAberto.push({ text: falta == null ? "-" : falta.toString(), style: 'cell' });
                            linhaAnoAberto.push({ text: nota == null ? "-" : nota.toString(), style: 'cell' });

                        }
                        //alert(linhaAnoAberto.length);
                        areaAnoAberto = config.data.Disciplinas[i].Area;
                        qt_areaAnoAberto = 0;
                        body.push(linhaAnoAberto);
                    }
                    content.push({
                        table: {
                            widths: widthsAnoAberto,
                            body: body
                        }
                    });

                }
            }


            if (config.data.lstNotasAdicionais != undefined && config.data.lstNotasAdicionais != null) {
                if (config.data.lstNotasAdicionais.length > 0) {
                    console.log("entrou notas adicionais");
                    var imprimiuEscolaObsr = false;

                    for (var iEscolaAdic = 0; iEscolaAdic < config.data.lstEscolaNotasAdicionais.length; iEscolaAdic++) {
                        var linhabusca = config.data.lstEscolaNotasAdicionais[iEscolaAdic];
                        if (linhabusca.escolaDigitacao == null)
                            linhabusca.escolaDigitacao = "";

                        imprimiuEscolaObsr = false;

                        var bodyNotasAdicionais = [['Ano', 'Série', 'Disciplina', 'Carga Horária', 'Nota']];
                        console.log(linhabusca.NomeEscola + "|" + linhabusca.escolaDigitacao + "|" + linhabusca.serie);

                        for (var iNotasAdicionais = 0; iNotasAdicionais < config.data.lstNotasAdicionais.length; iNotasAdicionais++) {

                            linhaNotaAdicional = config.data.lstNotasAdicionais[iNotasAdicionais];
                            if (linhaNotaAdicional.escolaDigitacao == null)
                                linhaNotaAdicional.escolaDigitacao = "";

                            if (!imprimiuEscolaObsr) {

                                imprimiuEscolaObsr = true;

                                var escolaTexto = "";
                                if (linhaNotaAdicional.CodigoEscola == 0)
                                    escolaTexto = linhabusca.escolaDigitacao;
                                else
                                    escolaTexto = linhabusca.NomeEscola;

                                content.push({ margin: [0, 10, 0, 5], text: "Escola: " + escolaTexto });

                                if (linhaNotaAdicional.observacao != null) {
                                    content.push({ margin: [0, 0, 0, 5], text: "Observação: " + linhaNotaAdicional.observacao });
                                }
                            }

                            console.log(linhaNotaAdicional.NomeEscola + "|" + linhaNotaAdicional.escolaDigitacao + "|" + linhaNotaAdicional.serie);

                            if ((linhaNotaAdicional.NomeEscola == linhabusca.NomeEscola || linhaNotaAdicional.escolaDigitacao == linhabusca.escolaDigitacao) && linhaNotaAdicional.serie == linhabusca.serie) {
                                console.log("entrou para imprimir");
                                //bodyNotasAdicionais.push([linhaNotaAdicional.ano.toString(), linhaNotaAdicional.serie.toString(), linhaNotaAdicional.CodigoDisciplina == 0 ? linhaNotaAdicional.disciplinaDigitacao : linhaNotaAdicional.NomeDisciplina, linhaNotaAdicional.cargaHoraria.toString(), linhaNotaAdicional.nota.toString()]);
                                bodyNotasAdicionais.push([linhaNotaAdicional.ano.toString(), linhaNotaAdicional.serie.toString(), linhaNotaAdicional.CodigoDisciplina == 0 || linhaNotaAdicional.CodigoDisciplina == -1 ? linhaNotaAdicional.disciplinaDigitacao : linhaNotaAdicional.NomeDisciplina, linhaNotaAdicional.cargaHoraria.toString(), linhaNotaAdicional.nota.toString()]);
                            }
                        }

                        content.push({
                            table: {
                                widths: ['15%', '20%', '30%', '20%', '15%'],
                                body: bodyNotasAdicionais
                            }
                        });
                    }

                }
            }
        }
        var doc = {
            content: content,
            styles: {
                bold: {
                    bold: true,
                },
                brasao: {
                    alignment: 'center',
                },
                center: {
                    fontSize: 8,
                    alignment: 'center',
                },
                h1: {
                    alignment: 'center',
                    bold: true,
                    fontSize: 12,
                },
                cell: {
                    fontSize: 8
                },
                header: {
                    bold: true,
                    alignment: 'center',
                    fontSize: 8
                },
                declaracao: {
                    bold: true,
                    fontSize: 8,
                    alignment: 'center',
                },
                anoExemplo: {
                    margin: [5, 0, 5, 0],
                    bold: true,
                    alignment: 'center',
                    fontSize: 8
                }
            }
        };
        return doc;
    };
    sedPdfExporter.exportPdf(config);
}