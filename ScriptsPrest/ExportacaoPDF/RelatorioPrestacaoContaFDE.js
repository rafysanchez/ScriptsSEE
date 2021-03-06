﻿function gerarPrestacaoContas(_result) {
    var config = {
        pageOrientation: "landscape",
        pageSize: "A4",
        title: "Relatório de Prestação de Contas",
    };

    sedPdfExporter.normalizeConfig(config);
    debugger;
    var body = [];

    config.body = body;

    config.NrConvenio = _result.Apm.Codigo;
    config.CodEscola = _result.IdEscola;
    config.Programa = _result.Programa;
    config.Periodo = _result.DsPeriodo;
    config.DtConclusao = _result.DtAlteracao;
    config.Status = _result.Status;
    config.NomeAPM = _result.Apm.Nome;
    config.EnderecoAPM = _result.Apm.DsEndereco;
    config.CidadeAPM = _result.Apm.NmCidade;
    config.Diretoria = _result.Diretoria;
    config.CNPJApm = _result.Apm.NrCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    config.DataRepasse = _result.DataRepasse;
    config.RecebidoTotal = (_result.Receita - _result.VlOutrasEntradas).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    config.DespesaPeriodo = (_result.VlTotalNfs + _result.VlTotalOutrasSaidas).toLocaleString("pt-BR", { minimumFractionDigits: 2 }); //_result.Despesa.toString();
    config.OutrasEntradas = _result.VlOutrasEntradas.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    config.Devolucao = _result.VlDevolucao.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    config.Saldo = _result.Saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

    var Grid = [];

    // CABEÇALHO NOTAS FISCAIS
    //Grid.push(

    //         );

    // NOTAS FISCAIS
    var item = 0;
    var pagebreak = 0;
    for (var i = 0; i < _result.NotasFiscais.length; i++)
    {
        Grid.push(
            [
                { text: (i + 1).toString(), border: [true, false, false, false], alignment: 'center' },
                { text: _result.NotasFiscais[i].Fornecedor.toString(), border: [true, false, false, false] },
                { text: _result.NotasFiscais[i].CNPJ != null && _result.NotasFiscais[i].CNPJ != undefined ? _result.NotasFiscais[i].CNPJ.toString() : "", border: [false, false, true, false] },
                { text: _result.NotasFiscais[i].DsGrupoDespesa.toString(), border: [false, false, true, false] },
                { text: _result.NotasFiscais[i].NrNotaFiscal != undefined && _result.NotasFiscais[i].NrNotaFiscal != '' ? 'NF' : "", border: [true, false, false, false], alignment: 'center' },
                { text: _result.NotasFiscais[i].NrNotaFiscal.toString(), border: [false, false, false, false], alignment: 'center' },
                { text: _result.NotasFiscais[i].DataEmissao != undefined && _result.NotasFiscais[i].DataEmissao != '' ? _result.NotasFiscais[i].DataEmissao.toString() : "", border: [false, false, true, false], alignment: 'center' },
                { text: (_result.NotasFiscais[i].IdTipoDocumento.toString() == "1" || _result.NotasFiscais[i].IdTipoDocumento.toString() == "2") ? "S" : "M", border: [true, false, false, false], alignment: 'center' },
                { text: _result.NotasFiscais[i].NrCheque != null && _result.NotasFiscais[i].NrCheque != null ? _result.NotasFiscais[i].NrCheque.toString() : "", border: [true, false, false, false], alignment: 'center' },
                { text: _result.NotasFiscais[i].DataEmissao != undefined && _result.NotasFiscais[i].DataEmissao != '' ? _result.NotasFiscais[i].DataEmissao.toString() : "", border: [false, false, false, false], alignment: 'center' },
                { text: _result.NotasFiscais[i].VlTotalNf.toLocaleString("pt-BR", { minimumFractionDigits: 2 }), border: [false, false, true, false], alignment: 'right' },
            ]);
        item = i + 1;
        pagebreak++;

        //if (pagebreak >= 5) {

        //    Grid.push(
        //   //Linhas da Tabela
        //   [
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF", margin: [0, 0, 0, 0] },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, false], color: "#FFFFFF" },
        //   ]);

        //    Grid.push(
        //   //Linhas da Tabela
        //   [
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF", margin: [0, 0, 0, 0] },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, false, false, true], color: "#FFFFFF" },
        //   ]);
        //    pagebreak = 0;
        //}

    }

    for (var i = 0; i < _result.OutrasSaidas.length; i++) {
        Grid.push(
            [
                { text: (item + 1).toString(), border: [true, false, false, false], alignment: 'center' },
                { text: _result.OutrasSaidas[i].DsTipo.toString(), border: [true, false, false, false], alignment: 'center' },
                { text: '', border: [false, false, true, false] },
                { text: '', border: [false, false, true, false] },
                { text: '', border: [true, false, false, false], alignment: 'center' },
                { text: '', border: [false, false, false, false], alignment: 'center' },
                { text: '', border: [false, false, true, false], alignment: 'center' },
                { text: '', border: [true, false, false, false], alignment: 'center' },
                { text: _result.OutrasSaidas[i].NrCheque.toString(), border: [true, false, false, false], alignment: 'center' },
                { text: _result.OutrasSaidas[i].DataInclusao.toString(), border: [false, false, false, false], alignment: 'center' },
                { text: _result.OutrasSaidas[i].VlOutrasSaidas.toLocaleString("pt-BR", { minimumFractionDigits: 2 }), border: [false, false, true, false], alignment: 'right' },
            ]);

        item = item + 1;
        pagebreak++;

        //if (pagebreak >= 5) {

        //    Grid.push(
        //   //Linhas da Tabela
        //   [
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //       { text: 'aa', border: [false, true, false, true], color: "#FFFFFF" },
        //   ]);

        //    pagebreak = 0;
        //}

    }

    // LINHA TOTAL
    Grid.push(
            //Linhas da Tabela
            [
                { text: '', border: [false, true, false, false] },
                { text: '', border: [false, true, false, false] },
                { text: '', border: [false, true, false, false] },
                { text: '', border: [false, true, false, false] },
                { text: '', border: [false, true, false, false] },
                { text: '', border: [false, true, false, false] },
                { text: '', border: [false, true, false, false] },
                { text: '', border: [false, true, false, false] },
                { text: '', border: [true, true, false, true] },
                { text: 'TOTAL', bold: true, fontSize: 10, border: [false, true, false, true] },
                { text: (_result.VlTotalNfs + _result.VlTotalOutrasSaidas).toLocaleString("pt-BR", { minimumFractionDigits: 2 }), fontSize: 10, alignment: 'right', border: [false, true, true, true] },
            ]);


    config.Itens = Grid;
    //    var pagebreak = 0;

    config.docGenerator = function (config) {

        config.pageMargins = [50, 250, 20, 200];

        var doc = {
            //pageMargins:[50, 310, 20, 50],
            header: [
                {
                    margin: [120, 10, 20, 0],
                    style: { fontSize: 8 },
                    layout: 'noBorders',
                    table: {
                        widths: [250, 300, 250],
                        body:
                        [
                            [
                                {
                                    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4ReURXhpZgAATU0AKgAAAAgAAAAAAA4ABgEDAAMAAAABAAYAAAEaAAUAAAABAAAAXAEbAAUAAAABAAAAZAEoAAMAAAABAAIAAAIBAAQAAAABAAAAbAICAAQAAAABAAAXIAAAAAAAAABIAAAAAQAAAEgAAAAB/9j/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABuAGQDASEAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+igAooAKrXtz9mtmkABfIVFY43MeAPzqZOybBbmD4VuZEa906aeScxTSSRyStliDK6sOvIDKfoGA7V09Edhy3CiqEFFABRQAUUAFFAHPanrOp6fqLRPYoLNyoguIj5rMe6shK7TnpgnPbniohq0Nw8Uq3y3LRvuNsYfLfBGCVU/MWGTx35HXFc1SclrLb+uv/DGsUnsZFnNCdUe9Oox2sUNxcFZdykybpG+QA9RjaT9E71dk8TXwlWDTIf7SnkB8pJITbhyOuWJyFHdtmPckgUlN/Yd/yBpWvJHWwmQwoZlRZdo3hDlQe+D6U+uoyCigAooAKKADNc94n8W6f4e0i6uzPHNcRN5SW6NljMV3KhA5HGCfb8KmTshSaim2cX4f+JVnqVmLDWop76/vLgoLa2tgVVeAMZIyN2cEEnjPati9sYEs5ZpJJ7nfcvDbQSkKnysRucrhmAw38QyMDGeaxc+iChUVSKkv6Ziab4ft9E061axknt4bp3USKQ2JQ7AhgwI+bGRgddwyMgHSTxppPhOxthqVrftPeRl5byOJNjMrFWUEsCAp6Lg4DA85Jqk0tR1JqEbsqfDv4jSatOujay+bthm2uCuDKAPutjjdweRxwQecFvS7W6t7y1iubWeOeCVQ0ckbBlYHoQR1FaRldGdKp7SPMTUVRoFFABSE0AcB8TfGFx4c0+K0sT5d1dAnzdwUooIGATwCScbj0/l4dBdaXLazLd6o6/OGJgXMhOMZUMQnQEnJB5TByrCuWs22kjC6lUlzLRL8Xb/M7LR/CnhbTUj1K98d2aC3i81bexuY45kYL0Dhz8wHy5HJyeea63R7/SbuKB9b8S6RbeXCsfkRalG74A+bLg8bmyxI+Yk9RjFVZNp3NaMPZqyd7mzeat4QFg9tZ+JNFit3U77Z7xPLf3BDZRs87h35wTXFTad4Q8QwTvqni+2stQhmZY5V1KKSN04IdVzhd2fmC7cnOR2oSitnoVVjzx5Zaf1/Xqci1n4V0nUrqBPEbSzwozrdxhWtpcgH92YyWjYg46MAy5x8oNaHw38Wz6P4htdOtJlktL2eNHt2YcbnCMeOhUnIP8Q47cQrqd7mE04Rg4rZ6+aZ9FK6uMqQQCRwe44NOrrNwooAK4r4leK5fDGgL9jlEd/clhE2AdiKMu+D6cAdeWFTN2joTOXLFy/ryPG/Esl5qvhbRJLhnmeGO7leUlmLYuAHDHk8F1IyAPfIxS+G/Dn9vXN3JPP9m0+xiM93OF3FEGTgDuTg/l+FeXWUpSjFn1vDdeNDC16y1+H73ovvZpWWk+CdYuvsNnf6rYXLtiKa+WJomPoduME9uaoeJvCL6D4ig0a1ka9nnjjKfIELO7FQoGfUdSfr0rLkjKN4Pyse9DH4ijW9ji4R+FyvG9rLpZ9f+AUNY0UaPdxxNdQ3MTqpMsAPHAJXDAHIyMccgg+w67VvB3hbRtCsNWuL3V3gvlVohHHFkblDDcD7ehNHslFyT6Gf9qV6tKhOhCN6l1r0a9Omj/Azl8JWOs6Le6n4anvZBZH97b3kah2GMkqUJBOAePauZ0SOY+KdPu4mKrZ3NrI7FTsyZ1C7yPuruIyTgYJ7kA6UYOM4yWt0ceb4l1sBVpVklKEop221s01/Xc7X4e+J77TfGi2FzeObK+nk8yJ2JVZJCxDr15Lgg4xndk8jJ93HSvSpSurHwFCfPHXo7C0VqbBXi/xujmXUNLusOtu0DQiRcYV/MjJH1K5IHcA+hrOp8JjiFem/l+aOG1vVLceGorCLdFLN5XmRDGWjX51345G6WSeQKf4RETjjOr4I8T23h++u7bUIfO03UE8q4GMlRyM47jBII9D7V59efLKEkfV8O4aeIweJoLR+7b1V2vxN3VfhxZ6nbPqXg/UIruAnP2VpMlfYMe/s2Pqa5zR59Sn8f6GuqvO11BeQQlZ/vIFYYU5rJQ5KkZR1i2j2ljfreCrQrxtWhGSa+W/z/rSxH4u5vIiDwcjH/bOGux8axS3Hwy8LLDG8hEcOQik/8sfarq/xanp+qOLL5KOGwbb05pf+3E3w0mOheF9bv9Rjkgt0dSC67d5Cnhc9SSQOPWvK9OvorHWk89ytvPAYZz/0zY88jkED5lx/Eq1VGWsEt0mYZtf2WLrR1TlDX03/ADNbTkfUfHOmxWwX7RJMksw8wGPeGjllZMceWDvI7hVweQa+mopY5olkidXjYZVlOQR6g13UrdD4+lTcOZPux9FbGoh6V4DJd3HijXfEmnXPzR6gkjEHpE0HzxsP7p2qybhzyDg4ArOo3pYwq1OSUezZyOrRafa6apWUXN/dRxySyoyiKDdtdokVAASCfmYnA+6FJBYbGg+ErvxFpeqXdi4aezK7bfacy5DE4Prx07152Ii5OMUfX8N4yFCjiK7WnNG/zbV/kZ2larqPh/V1uLKSSK4jba0ZBw/Yqy9/TH9a9I8XCIfE/wAJyrGI7qVrdp0A5GZPlz7jkfQCsqEtLPa6PYzmlFVVVhvKnUT80o6fizh/Fv8Ax/7Tn5Tjnt+6hruPEmr3+mfDDwzPp97NayukUbPExUsBGeP0rSq2q02u3+RwYKnGrhMLCorpzlp/4EeaX+u6tqqquoajdXSqcqs0pZQfXHTNZiG3GrQrdwmeB4trxAld4LDjP8J6YJyM4yD0rPDNurd6ndxJSp0MqnGnFJJrRadTpGWCwtdamtrxL2Jkhs/tTf6x45Q8ztI2AVbMMgZCC2ZCGZgoFetfCG8nufA6w3Em82tw0KeylVfHHYFzj2xXowi4zR+de05q9ltb9TvqK6TYQ9K+cPENpJ4b8Y3n2UyXEF3a3LWrW/z+cpik8sjHUKXGT/sE9qzq2tdmNWm5uNu5l2nhp5dAury7uYrJFgZbVJmAe4WJhwi8E8kkn14GccXdK17XvDemSPpztBbag+Fm2BiTHkNt64xnn6H0NefiOa6lF7H0vDMMPHD1aOK2nKP4KT1+773YtD4h6+HEsjWUt0v3LqW0jMqfRsfzqnoF7Pf+PNHuruZ5riTUIWeRzkn5xXNCcpTV+59ViMtw+FwtadJauDWrbsrbK+yF8UNjUD6BuAf+uUNGp+Ndc1fSf7MvJ4GtPlwi20a7dvTGB8v4fTpWmJlKNWSXX/I5cjwdGvgqU5rWDbWrWt/Lcw4oJZ5I44YpJJJZFijVVPzO2dq56ZODgH0J6A1a0vRl1jV7qx+220N0LYpbxSSgC5kMgXy1b+91II7jnA5BhoPnTfUjiXEU6uDq4eL95W/P+vkygbe5MksEtrcJJJMkMgCMhZv3ibQh+YsdhHAOCGU84FfQ/wAONPi0vw09q0qNf+e0l9GrhjDKwBCHHQhNmR9a9GCXPY/OqNFxak10t+P/AADsqK6DpGSqXiZQcFgQD6V84WN7bpY6joes3IihtC8lrI8Sv9nuAp2/eBADEEf72PU1lUjzaPqY1KjpzjL+uhk+LtRk1K7fzLhrkW1lFEJCTllDBlzkkjBMgGST6knJOvJqtxb2FlCdOkikutOkjiaB0MEwP7tnCZ/12DtIA3nzMYPBrlndrlT1t/kd+XuEuZy2U1+X/A/A5g9T/WtfwpkeMNE6/wDIQh/9DFefS/iL1P07MWngqrX8r/Is+K/+Qhz94Me3X93F/wDWrnwM9BmtMX/Gf9dDg4b/AORdH1f5s07HUJbOwvLV7W5uLO5CPKLc7ZDtfYfLJ6/6wqSuSOQRgnFDXXe58T37TQQ2koV1aK3fKxhHClQRjPyrgnHJz6100LqMbnyeeezlVxMo7WX/AKVFP7ndG7JrEcepS6pJf3C6lLYRzrIiK3lzuP3r7iMqAoCjaQRhF+YA59F+CdtImg6ncsrKst0FCHthAT+Pz4J9q6KaSkmup857V1KqXZfqepUV1G5Bd3UFnaS3NzMkMESl5JHOAqjqTXzf4+vtDvfFk95pF0j210gEwIZBvfdnG4D+IZOOPnJrKpJbGWIoVKlJyhG6X9fIhstAhbwLrOqzPE00fkWcEUvI3SBN0vOM4LSbeOCCTyuBc06OKbwrpurRCHNgJbgiB2V4pFWTazKw2lgCHypU8bsNglcOZSSa8/8AI6qUVTU4Lo4v/wBK3/Am/saDVri/u7RWm+3Xs8VgiLsVS0jtC2cHKnyyrDHyrIhrN0GJtP8AFuitdgQhNQTdvZfl2S7HJweAGVhz/dOK5ZUkpRmu/wDX6/I+owuaSeGrYfEaPlaXqotP8l82L4mlSXUyYzvXceVGQTshAwfXIIqbS9DE0TLfQOou2aK2niYP5PkMWuG4yrHACKMkMW4OATV1KfNWba0/4BjQzH6vlsKVN2ne/paV9f8ALqjVurBpp9I0iKPFxogYzzNI0awuZJgSMAklxskG3B2puJUfMOf0HT7PW/F2qaf/AKPHayRzRwtaw7RGUVpFdFJJUHbjbnkM2Tnkbq10jwq85Spzk18bs/m/1tuYEohtZZomIlndkMyrk/OuS/GAQC4xggEA4PIzX0V8PNd8OXWkRaLo1xI01nFvlWeAxPISfmkweuWOTycZFXTqJyV+pzUsFVip1lF8miv09LnbUV0iPGPi54xgkvE8N293GqQYlvMOOX/gQ/Thj/wH0rl9LufD97DbWVwsYiiAZ55ACZJGyCDt2kRqXydz5IjGMZIPl15J1ryWmx9Tl7cMFbDzXtLuTSa5uyVuq1bejVulyhrGnS2WjN/Z92W0qe4JWxdiNr7G2jdjhlWT5gvyhiM5PNVtEZbG3vHktoJNDvnW0luzAJDBIVLbAAVcdTwCvsQQM1Cd1y9jzsVgmq8asFaNS8fSSat8m/uvbpc6q3lS+0qeTSok86JZLUXJt0s4bhnjKMxUuFD4A3cZyAwOAYyeIvFV9o/26bQ9VurG/dRcyWyRxSqVYucsWVgSHbZlW2/Kvd+Lk1vHf+uxyUoN1VTq6Juz7/iQ6x4v17SvFet6Vd+KdQWws2ZATDAXZmjG3JEfTew7dBitHS9Pk+w29pbxyNZRR4RRcosrk73ZSN6N/wAtAoGY843E4+Uq+tn+v6sJRjFRlF7rX7/8jBedby6e20Ozhuda1T9wbR7FEECqvKbidp2FR8wRQSCxydq1y+iW15LfxxaXcG3TKxi58wplirg/P/CG3OM9T0FPmsm49dDWOBdSrCnV0jFc0rb205V6yv8AivM6IWui+HZS9vdxz+SwMLoFbJX5WBGWTB3JIrHIKgg5bKitaeLLXRfFS6zo0bQxI28W27euxgPMj3AfdznB9gcZrn2kuXWz3PeVRzpyVd8sZQso6vbVNJJ2V7q/43R9GaJrtl4h0i31PTpDJbzDIyMFSOCpHYg8UV6ykmrnyDVnY8G+IenW2keMbyLT5hciYm5nWU4MMjnJXdg7vXnpkDmuPZDL+8+yYfp5lvIpI+nTNePXhy1G02vVaH2mXV54jCQpOEZcq2jJKats0mtH1umaGmalHf6hBaaveyhPL8gO7biqKdwVd2dmCB0BwCSAwyD0Gs6ZPBZX02kjy9O1B4oprAMczhdrrtByVboV6sFIJ4OA6d4Sb6/oc+MqLE0o0XpF6aaWnprb7KWjfbmfW5zWjzaqmpTQ6LE9zdTDyo1McZuHVUL/AHWzkDD8r12jrxUOpOhlaK/X7NqDQ7JDclo5ff5W2hVyM4C9uprRqUY89NXX5HNhlQxlbkxr9nUj8V2/eflfRefd7C6jrUGsaxqOrakLAyXkiM8Urgr8qBQQchh0PQj8qvXd5rK6KzLYtFos5EEclzGvlklSSA8i72BwT8ufqetXzTqNq2ncyq0MHg6EKlR80rawv16ap6dmuvTUo6IlxJex/wClixF5GbWe4l7I+3cBjlF4xxyQTkgE10F3eWfh7S5IZLGWz1AfuJonfMVwvTLIR1yCV2tgEbhgc1m5qXuw2WiOqnh61CHPiXac/fl6a6LtKN7r+80uxzJNxdSPdzxtPuYuZJXwmeSTk8sTz8xHNWLeDVLyNmsrPz9oODbxSTDP1UY/WsVT9pK2rt2PT+u1MLR51yQcusm7vtaKWkVtG70WrV7n0X4C06x0rwjax6e9zJHMTNI1ymyTzG+8GXA2kYxj2or2IxSikj4apNzm5PdnUYwMDisTWvCWia4Ge+06GScjiZSY5M9vnXn+dU4pqzFCcoSUoOzR43ffDnxXpSajFbQG5s7zCypG6liincgDBC3BwcjGSBkVmaZbeKdGjJu9KvDbJG6GdbVmEAJJLjIBQgndxtDFRk4rjrUdFy9PyOrBY+o684YvWNTr0T1s210d7S0W/kPu4NJ1GMzwnJtoA0Yt08sxiKMZYY+Y7pXUBjyFRi3rVqfUPF2k6fOv9v3EttB5QkS5iW4UOyKSoMqt9zcoPzdxxXLGpKGsD6GWFpV5Rp4u/M7JO/vbpa9JLW6fbZ2GW+s+LdrSRavFaNKZ1Pk6fDE58qLzG+YRdcYAGc5POBzSHSLe5vLe98SandzSXEMTJczuWKBtu9eW3YAdCCg/iBK4yBUqsqkbyen9f1oYKhh8JP8A2aLlUvaLdt77pLru035Oxl3sk2o3Ih0q1ur+8hh8m5isYTIh2t8rAKPlQgI2Co+bPXtY0rwn41+3PdQaddid0aLzHiZAsbABlHmgA5HXIParw9J83tH8v6/I5M8x0lSjg6C115np8k2+tkubzXkeleBPhnHpURl8QWFpd3KkGB5JWlKDGMMmPLyOxGTz1r0pV2gAdB6V3wgoKyVjx6larWfPWleX9dxcetFWQLRQAmBWF4lbXyLO30CSwikmdhNNdhm2KB/CoGCfr6e/ClewHHwfB20uLm4vtY1i5mvLjLP9jjSCMMRgnZgg/pnuOarXHwevQkkdl4nfyJD80VxbFgec87XAJzz0rmnhYz1vZno4PNK+GioaTS25le3o9195Ug+D2txOn/FSWsKISVMVq5Zdww235xjI4PrWrH8GNKa1Zb3WNTnuCABLGyxhcDAwME4xxyTxU08FCO+pviM6xFa/KlBvdx377u7Wr6WL2jeHPEng97OzsNR0680USrHJDPb+VKqk8kMoO5hnq3X26jvgBiupK2h4yTtq7i4oqhhRQB//2f/tIqBQaG90b3Nob3AgMy4wADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNA/MAAAAAAAgAAAAAAAAAADhCSU0ECgAAAAAAAQAAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIAAThCSU0EAgAAAAAABAAAAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQJAAAAACERAAAAAQAAAHMAAACAAAABXAAArgAAACD1ABgAAf/Y/+AAEEpGSUYAAQIBAEgASAAA//4AJ0ZpbGUgd3JpdHRlbiBieSBBZG9iZSBQaG90b3Nob3CoIDQuMAD/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACAAHMDASIAAhEBAxEB/90ABAAI/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwD1VJJJJSkkkklKSQ77hRRZc5rntqaXltbS95DRuiupm59j/wB2tizsX6wY2cKzgVuvFrd7dzq6zBmN9Ntn2pn0Xf8AadERJ2/OkGQG7dzb7KaR6QButc2qqRIDnfnv9zPZU3da9u/9Js9Ov9Isz6rZROI7p9l1mRZiasuuLnWPpe+2ul99j/p3Mtx8nGs/0v2f7T+jqyKkc3WO6linOpbS4te3F2v9Rvqn3WteTXXsv+ys/V9n+D+2/wDXMfprskZuM/CYx9zPtDclr3GtnoOuuaz1HtZb+ldlU78Vvp/+WX83X/OP4fTR81nH6j9lfy/vPWJLLt6y/FsbXnY4pdZOzbdU6Y/dba/Htd/YqVnpnUsbqmFXnYos+z261usY6sub2e2u1rH7HfmO/PTTEjevoQVwmCaH5NtJJJNXKSSSSUpJJJJT/9D1VJJJJSkklyH1k+vtPTbnUYDWXnHM5Nrp2wyyqrIox42sfc31fT9Wy1lNN/6P9M+vIroBIFWdzQ80GQAsu71rr+B0WoPyi51jw51dNY3Oc1g3Wv8Aza6qqm+6y259df8AbVbqnQ67ycumiu1zgXX4j2t97jtPrUvft9HMbs/O/RZX81k+n+hycbzPrfWrOpdTtuyXO32ud6YLg0VYwc70fQs25DN9+xldOR0/7VXcz1sz+c2enpdB6lkX5mTvdm5ebex2LTa02upZdd+rV3dTofba7GxWuLPsvq/93bvslX6qhHLWTgIMTeh/u92Izu7FjoHor3ZrcIWUi+rDtNYqrzSX+rY6DiNw8J73dSpvZbs9LfndL+x2V/aP0ldP2hU+j/tuvDFWZY66x+2279n2Mq3m734trftH2Z7qPRrfjNZi5mFXV9mtx/sNv9IWm7LrvzKGYdb768ZgZ06mv3PsrEVXZ+6zZVj0PbX9lxcvIt/T1+vdj+rXf+neyi2nFwsW1jaus4dRqprLgK8usD9Ni4+Q70m/pfTZbS1/pZGHlU03WV2Yv8/PcunT+VoHDpen5f3f3fUz6P0TFz/1p1JpwdxDantLbciC3c7O9Uuyvs7bWbfsV9n6Z9fq5vqfoqKtLF+seFf1fI6NaDj5lLi2oOILbQGi79C9v+F9J3qfZ7Nl3p/pa/UprfYuJ6/l2uxWWYtGUKcey205YDm1Cu0+rdh2Nr3/AGfquLm7vZlMxaMW6uzHtt2WvrXM/bSMhhL7bbbnMbXk7nmz1PY2qmx1jr7abtlNduC9mTfVhZ9dfpelj2XqvkzHj4eEyka8f8X+uuBEKFU+5JLgenf4xMo5GO3LoF2PbXUx76z7jeK2XZbsb0w+nI/nf6JvZcx9GV/O2enQu5xsnHy8evJxrG20WtDq7GmQQU+xZF6x0K+MxIWEqSSSS5SSSSSn/9H1VJJZP1o6q7pXRb8ir+k2RRizx6tp9Kp7v5FW71rP+DrS066BBNC2v9YOu4rMLquFh5H+UcPEN9jaz7mNfuZ9Nv0L/buazdv/AJp68hy+sBl9rKBAa/8ARWgwA1gLcN+O1tfqY76d12RX/wB27q7v8F6V21gMNbOqMYXs/UMiqhsu/SOZkY2LTjivHdXdW3rGRZ7/ANJXdbk2W/4L+d5zrlL8XqORjWRupe1jxuY9wcGg21epjNbjt9G19lPp0+yr0/Q/wKufCOVw87zOMZL4eGZ4Yn1RlGWn737jXnIyBseXZ1+nfXZmJeBf09lnTW+5vSq3Nqxg/wBNlDbHV2VZL7dra936S335D/tK0M7/ABlY2XhVdOq6QcLCrsbZZXi5IqJDN1lNdVlONW7H25Qov9Sr/QovWacX6k9M6fi1dPxs3qGcw25WXmV+s0EbN1OOw+32ep/23/xqn9W+q/VT6x5lOF13pWLjdQLmjFtxwaabCPazHuYx4/Sf6Nj99d/81/o67NX/AEfyftHPDDnyYBxeuOSEskowP877Zj8n+GgEg8N7ssL/ABr4mBU6rC6C2phIJ/WtXGGs3WPOO57trG+nud/g662ImR/jepyqXUZHQm3UvHursyA5pggt3Ndiu/rLn6Pq7jdT+vOR0SonGxhmXtIZB2UVGx7hXv3e/az0qvY/Z9N+/wBP01S+suBg412JldPrNGNn41eQMZ7/AFDW47mWMFzvdfVur3eo/wDSfv11fo06PIfCzzGPlgMvuZIe4DxCo+n3Iwl/X4PWkznw3pV8Oz0PT/8AGiOn35VtHS3vZllj3U25psDHsY3H3V3PxnWubbVVTv8AU/wio9X/AMYWTnXi/p2GOlWFj25Aru9Su8uLTU7Jo+zsqt9L9P8AzrLfUZculyH9Kp+olf1jq6L037WWVF1b8drq5Nn2Z5gHf/L/AJxYn1b6lgfWTq9PR87o3TqaL22n1MWk0XNLGOtY5l7Huc73MTIcjyc8eXJ7GbgwSnDKfejxg4PVPh/eVxGoj96iP8Jwsz6w25mRfYzGZWLxDKKnOYxhZL8S2trvV2WU2PsfZTV6eNd+k/Q1esu/+qP1m6b0zojsjMe4sy8+xhfU1z2tLceq/IyPTbL24+9m6zZv993rP/wr1599ZuhW/V/rV+ACbGNHqYrzqXVvBNTnBu39Iz6D/wDhK/0a3nYHpdPditgennWurFVrrGEXYtGXg5GPm1so3vfXtfj2foH+nTXV6Fnp3rN+L8ty3Lzx5eXJMMmH3bmTPj4j/wBzDGqNi5Vt8xfXab6cill9FjbabWh1djCHNc06tex7fa5rkRcb/i36j62Jk4TpBBZm1tkFjW5TfUvqp2/mV5zMr/txdkqETcQdrFs8ZcQvZSSSSK5//9L1Vc19farHdJx72AmvDzKMnI28imslttv/ABdPqMsvf/gqd9q6VeefWTrN+P8AW77SNxZ0wsaWNE7qCKft9MfRtfdXm+p6H/dXEs/waZlMREiX6fo/x/8AvVkyKo9dHnuh5pw8Opza9jh73Wl4/SWsY6zp2Diue59b24vUc5/VMmyyu6immn9PZ+q+kuWzhR659AEUmPTJESwNY2YPu3v2utfu/fXWZv1ddgX51WU5rMPFyfs7KMZjd2RY+pvUaseu2/f9lwsejIyMq37T6lHT69lX+WbP0i5nrFrb+oZFjCNllm5pD3PABax/89d+lv279nqv/wCt1U/0arW+AAD4lAA3+qmZf3pfNJhkCI699v2va9E+tvQOudLZ0T62NaH1AMpyXghrto212esz34uTt/nLf5qxn84qX1g/xbZuGw53QbXdQxCN7axBvDY3h9fp/o8yvT/Afpf+AWF9Zvqt1D6u5bKMiLKrWb6shk7Hx/ONbu/Pqn9JX+5+kWp/i66/nYPWqOltJsws9+19J1DHwdmTT/o3t/wv+kq/4utbssRxY5c3yGW8ZByywS9XL5P3/b/zM1gI2l00/rBh/i0JP1wxS4y707yTJMywn3Kt9a5OH0N26d2CJE6/Tc6dfd7ty6jApx8b/G9fTjAMqcLHlo1G+zHZdft1/wBK5zly/wBaf6F0YcxhNAJnj1Lv7lQhkGT41y+UCvchGfD+77nKTlS8isXlJ6uyq3I/xRVV0sdbYWs2sY0ucYytYDfd7Vhf4vOk9Wq+teJfZh31U1MuNlj63MaAan1t91m1v849i6DHzcrD/wAUtOXh3GjIqDQy5hILZy/Td/0fY9cFlfWb6w5lBx8nqWTbS4Q6s2OhwHZ8fT/tK3ymPNlx89hhwCGTmOYxylLi448fDCXDH9L/ABlpNe2a2jH8HU+v3VMTqn1ltuxHh1NFTaG3tJIc5m/ddVt+k1lrtjH/AEP0e/6CtjqtDsOttrd+Q0tqZjuJDmH1GOwQ0O/RW/YsjJ6tj/Y63+p+zeo+r6VuHjVLkGFxmBrGgjuAdvt2uXVtxKbumXZuFa/18XENllQePSyKq2OxHZG3JZlepd0quy2nMx97/wBBkfaOmZGH/QFk/HsEMWblcF+iOA49eouX/OXRJIkSdT0HV6T/ABZNqqsvyTbVXQ8DAxxIbvtqsycj0qGvi17mY1ldtn57/U/4yxeiLyDrFduHfTi452npLPTptqHtYQx3XG2UseA6t+/J6djZGZ/Ss70f1j+kL1nEuN+LTeQAba2vIHHuAd/KWNCQPFEa8B1P97i/7rjZcct41XX7fmTJJJJ7I//T9VXlv16pyMDr92bElx9aomSHNfR6NYdt3t3Y+Zg7/wBIz/CL1JeadUy3daz+odG6gbBab7q+mZFZDX0Weo6vGo3O/R342Y7CY/8ASen6GX6dfqs9fHuxYs0RKIiTXEQB9VmSiAD9HF6taMvr/U3+pJtyjQLxLyaqdtTmM9Nwd6+XspxGtq/pNLP0f6ahYX1hw8jC6vkVZFQx7Kyxxq0hrfTqfU39H+j9lOz1fT/R0/zf83WuobbT0jD6m52OcTq2O80VWNcKto2m3Pb0/ExWHEw7fsnos+04t2RdjftKv9P9ps9PMp9HtdZ9b8jJy8kfb8Rm/DsucPTe5jKqHVZL3fpf0GG93623/uJZm5GPl/p8e2/8MyDlecyZf5yccU5R/d9XBCOv7v8ANcf9RgOsbNxvfibXUv8AGg/PJov6RjXdPcBvx7y6xxd++22BWz/g/wBEqWP9cejdK33dA6FXhZ727Bl23PyPTB9rjTXaB7tv9T/hfU+gqH1mwcLCrxG0YzsbJu9W7Kr3bmt32H7Pjs/N24TW24PqM9P1vQ9b/CLBXVcnyvKZuXhOGKWKE7vF7mThlwS4f1sOPgyfL/lFhJs634+T13+Ly+zI+u2NfbYbLbhkPsc7Vxc5j3udY787e73Kn9ZnE4fSA484fufBP0rL+/8AL2f6+9WP8Wn/AIsMIxzXd49q38z/AN8Vb6zt/UOjnX+iCRrpNlxH9r6Xvf8Azn9i9Z+Wh8exDwr/ANt8i8D9SfP/ALp0Lvr7g2dAd0BvRG14JZta0ZD/AGvn1m27vT3+3J/TfT9/82uPAJmBMamEy0/q4MA9Zxh1Ks3Yb97bKmiS8mt/osraJ32+v6XpM/Pt9NbBhi5PDmyYoE6SzTjxyl7kwPVLiySn6pfpSWb0O2jne1rHbuCCSOdA2d2ww1y6zqnTcvGvv6bmMLHWtrD9pDmNtDHMoyqbXNY6+jPqb9l9T0/6T6+Ff/PKt9ZMajG6ViY772OyMc2Y+Hi1PD63YzN5yup5DI9au3qua77XjbLPT+xW/o/V9JaP2y/qWFkdPzm/bn0FuTiZF5N1oY1teV1P6RZ9ppursw/1Cv6H6bNp/TdPpqXI/G88ecycvPhOMmMgOLtDJxf95/1SGRkiAAdfHT+q0q7cjquQy1r25GRcyqqmww4Oyc2rEpf7zvf+re/Gtr/0eJdV+i9Jez4eO3FxKMVpLm0VtrDjyQwBk/8ARXkddmTgYVWb6N1PUepMZkVZrzUbK8a1lWPTT0t1MYtWdlU7aLMx+NXmV01ZH6D1MjHXp31Ysvt+rnTLMgl1rsWoucSSXexsWOLi526xvv8Acs+MYxlMA8RsE+HF6hH/AJ05f4a/F8x3sjY/ouokkknMz//U9VXmX15wn4H1gdlvkY2e33OaQ0w9tWK4ttb+lY7FymYr/wD0N9X/AAVi9B6v1TF6R02/qOWSKqGzA1c5x9tdVY/0lthbWxeUdT+tfXvrLjXXv6fQ/Cwd/rCpzm2NZdXayypz/VbdbVtr+1P9Kn/tJ61vp1Vp45LNzGOZxxsQq5GUcYufpiOKfD65foMeUiuHqdmtmZ2Vm3XV9Qul/wBoc7IyfbWXhwx/tFvp1bXY7aum9Mx2P9J/vtusrr9T+bT4GK6z6z5ePfjY+TZbjvfdhW2Ct4Pp0u+y0327K6erUVt9S30rf1T9Z/T2ek+lE+rebUfrDgHqQ9J/r41wbkbgx7/QOIy9jXtbS31d1eZj3XU76/Txqca79L6irZfVMarr37WOM3IxX23usbYK3ENy78rIxLG1ZDX01ZDcW37Rj25Ff2d/+ESxYZ4MsY5ARkzYzjIOnDKUOLh9X+cy48UYMQldnXiBrqK8Qiy+hBvS82x4fTd0q51FLX1muy2hllbX5Ga1/v8AtX+Vunen/ga8KpY1mBk14dea9jhjXWWVVWFpAc+r0/VaP+3v/A7f9FYu16ngdWFx6bi4Fltd1bRlYhkBraH4uTZj4b7si1vrX0YtH+SWZeX9lxKPVwrbsPJ/Q2uq4dPU259WS5wLhYaqQPSc3qVTepZFWbk0HbZi1ZfSsKp9lLKvTyPtX2jZ6v60tfkfiuXl4Qganj4uKevFOOOhHhjH9GP+Uh/rFSjZvUdA4X+LYAfXHAmJ2X99Z9KydD+cq/1mBdh9HAETinaPhbbEGNy3Pq70enpPX6+q1dQwK68Tex+JmZfpZAljsXfdtod6O97H3U0P99dHp+p+lVfq31eGZh4n+WukVjDoNUfaHHdL3vNlW5u5+5trPQ/0qOTncMviuPmuKscR6rHqjL2pwMfTxfpSUB+rMep/i8p0/peZ1G842JWbb/Sfc2scltbd7tn7z/3GLX6N0it/Rczq72/pcexv2Gq1odVY6mi7rGUzOre1vq0XdPo9Kn0/5z1/f+i2LY6b0vpdGHbm41/2eq3Obj3ZJvaQenV5GJiZW3LZ9lqY63Jd9oqzaK/6P+g9T1Xo3Uf2hYzFpdjXY1XUWNs6jFIpFfpYzsPMdj13/wBCwvs3U6elPysnH/U6cGvIo+3ZFqXO/F8ucThD04cnAIfo5BUeKfF+jKMv3VRhqL1rfs891jDxcbpOIzGoGKLrLMiym0h2X+nDX01ta9jctuHg0baKbLraf2hl2W5NNHp+jcrWVZkdOfaYDrnYW39DPpvpya7MIdRxrNrXei2rJxLKrbPT/wC4lmy6lP1sgdbxsX7HXU3pr2ZFxLdr3m6yssflPY7My93uq2VZ+RbnWWWWWX+j6/2Whda6tiM6R0rB9tuVhY1+LdQQCanstfWz1tzn07LLsbHt+y5VWR+q/pqfsuTXj32ZU4jNkxYY2ZQjdQ/WzPuGeTg/rej2lSPUi+o/xosqsLLy78fBoAOQ9lNdZMQ7IsqOLi+po/8AVelYeLfbX6fv2U05H6Wy79J7Jh4teHh0YlX83j1sqZ/VY0Vt/wCpXiOJ1D6xYVuT1np7GY4xLXssNrWPfV6hpx3t9HIm9vosqxcT1fT/AEPq+nZ/Pr0v6hfWy36w9PtZnbB1HEcG3CsFrXscJpvax30d3uY/+WxAchzGHCcuQA3LhmYThk4Z1xcE+CUuH5uL1f3F+OQuuv8AK3qUkklEzP8A/9UX+Mv6x/tLqY6VjycPpjj6ziJY/Jjgj93FrbbX/Lf9q/0SwOn9edjUY+BZUHYLHvOXWw7b7xZ6bH49mXYyx2NT6NGPjW1Y32f1sb1K7PproP8AGF0vFb9YC7pGPc661vqdQNbHOqFriHV+nsa7bc7335f/AFr/AA1l/qcbdVax+26v03AEhhkaQZZtO2za38/+v6lln+EXQfD/AGp8tDECbJMjAxx5P1hHBx+1jyR5mX+r/wDDGllEhMn8f/RnsLsnp/1hYc/qzC7Dxmmu+zeaxQ+xjcnLvr9ay7LycjK6g59XSsH+hU4tf8x/PejzNGUWtt6b1TfWbBXS19v/AGmLLHbS+h/pvZRR67n7Gf0f0/0f6J9taqObAIeJDZGu0uAkO5+i5v8AK/6fprq+mu6Z1HpYwK2GzJy31jOvvG5zL3P9GvLrt9t+Te7f9k6Th1+n6Ft3ULur/ov0iGbDy5we1MSlwGIjH1CXKCEtM0fc4Jevi9f6vF7s/Y/1eXIoyMiL0rrs1su676t5lnS+p4zs7JwzWem57rbWlmPua7FfhhjrGU0+25zPT9Z9Fnq4Vn2nH/QW7eE221mD1HHta6usBzH41O7HtDRZi3UNozs3Dy6sN7ci6r7HVgfY8R/6bA9H7Rk15PLdUqsw/tGPlMsz8SkNowM/fuND2Vepj4DcljrsN7cf1PTzMGm/0mfp/s//AAr43Sut5dFj+l+p1XCxRXZbRTa+RuLttVuA2yvJa79HdXb6H6b8+nZT6dioZMcPSMv6uR1jkA4uV5ntOHFwexk9X62GTgx/7L+bX62eHTppvwn/AKbfyrsfqvV+n4LW0zgdRxse3e5r32V2Ox8Wi4bmUPym/Z8SinM9Wj9Fb6H8366p9Rvr6f8AWnr2c6oTVflU07XNqizJ347bGPf7XWV03W3f+Cfzazs/qWe3K9G4jBONZ6jMRtQxWVuDxa1v2XZS9zqnO/P9XI/4VO7ruUOpZfUMTLNV+Za+61lcNZZ6hd/OYzn3VO+l/MP+0KwOUy+iPvYDA4ckfc47w44ynxe3PN/nPWkEAEVLp5/4r3GA3Iz24ud6j2sc0GqqipgaH3H7Re/Cuzrum3+u5no4VD8bDyLcLEr9HEyLM31Mpc/ndfwqH2MwmVZ+a1+3E6pUMih1Qdo2jFpc9uY69uRbkWWerdk/bMi+zLyvX/SKrbjfWSzEt6szG/ZuDXWxt+RUD0+m4uO1tvouNLbrrXO2v+zYzKP+uKg5/oMvoxR9ouc41vzmgj2ktZtxmu/m/Wur/nrP1mytQQwg5Bixx+8ZjdYoH9Ri9X85m5j5fbj/AJPgn6//ABhBJ1PSVb6H/Fb/AFrAs6TaejMyG5ebd6eT1K4E/orfc9+J6jXO9X0f57LyH/v+r6df+Cv4/TOi9M6TdZ1iizIyTY2jMADH+kywvdTf06/1PbZkY23Mx8x9WTRk/Y7sH1Kvtf6ZsCqrCpo6mWV9UwupAjqmRk177ary57Mmip3qU5NOZtyWbPSyrcnOZ6mX/NLEzsz7Y6ttLPs2JXP2Kku9UVVvcXPrpyLW776/XZdvsf8A8L6P+EVnFhhjJAJ4pzByZI3DLmywl6sI/wAtjj6f5uGL/N5v532eUyiR7R6aeXi6T/rZlUWg1NrcY2ZFmRWbHZALPsdr76rHP9JmfiV4lmZT6v6bLp9f9J7PSz/q/wBezOhdQqz8P3PZ+jsrcdrbGO1srs2fvOa33/6T0rf8H6aqmp4d6IZ+kkg0n3PO33Ob7R/af/LWt0/6v9WF9V2b0jPvw94OR6VNrLHVn8+rez1d7d/q17f9F6e/9PvVnMOXw4ZwnKceMDihE8pj4+D+b4sfMe5zP93gh/s8P+TWx45G9d9//RX1H/n10rZ6npW7P2X+15hv83v9D7N9L+ker7P9H/LSR/2Z9V9v9Fbt/Z32b6FkfYZ/o3+f/g/6Ukue07fpfyi29e/R/9b1RV83p2B1Cr0c7Hrya+dtrQ4A+Ld30XKykkp8069/i/tx+pMyOi4768SksfXWHC/c9p37YyBY+in1G1/o7GZtL/f7KP8ADc/1XD6+7qQzwLMfqbt3rWm0Mte5zPRL6ttOF6T/AEvUq9Nno12f8Y/9L7WmIB5Ewj7mcZBlGWXHEcI9z9bDgPplj4JfPjl+5NZLGDoNHxzC67R6DW9RDMDIwKrvTYccuNr7WOZiPxsNtQxPUxPTowvTzP52nKy7vtVdyBd0hgzMYdKudjdQuyqsFlmPY/Y6+PW6pkVPq27MPBsycXCqrq/7T0ev6r/0i7Hr7up/WgW4VP1cdsqe+ujPzCKXt2y37RQH7La2/nU/0j1f8PR6az8b/Ft9Z8PFacPq1dF7Xm1mO31BWx5Y6j1mZLf+1Ho2Ppfa3Dr3rSxc7iN8Y9uWtxI4+Ulrxaw4Z5OHjnxcHBzP/U2LgltH1D7HCd9aPrlh4tL6OrDOottspoDq2W2OLCBXa77RR67W5Nbv0O+3f/Oez2ItP1j+u99VVlPVces5oyLK6qqqRYa8Zl1mRbtZive2r9VtqxN1jL7LP+3KrWZ9U/8AGG7HpxH1V5FOJY2zFNNzGuq9NjcekVWWfZrGtrqrZ6f/AAv6f+cQcH6r/wCMLG+xMpwAxuC6w0G22gsHrjZk+rWLn+pvb/I/m/8AoWD/AKPOPiBw+6DL/OgcPr9v0cEY/wCZh/M/5xb+tB2kb6fy4mozpGX1P7PndazsnKF1L313OD7PQtayvONNldhY30LOn2/bP8nv9ez07q6K/VpTdcfhYGLZ07HyGs+xXtzem2Yrw6pzMltZsbZkV7P1rpzmMrxM/Jd9ouqf/M1/q/p71H+Lf605tDGdU6pVSyllbaKWh9waKAWYzfYcJjHVsfYz1me/9JZ++idM+qvV/qveco9Gxuu2MIsZkNs22tcB/wBpq317Kvo7/wCY9TfZ+kzP0Vailz2LFIGB9wRN48eOHtctGXF88o8MJ/J+on+q9cPc/WY5z40+3InagdyfVJ4jFwcnK/Svc30i92+p73Ne+A5z9rK67bW+rY76XsyfS/R1rpqvq317rb8Zl+LkejgAU1VWj0ahR7H/AGb7ZlU4uf8Amen6tNPUfs/+CXp/Tc4dQwacwUXYvrNk0ZLDVawglrmW1P8Ao+4K0s3Nmz5c/vzySExpAY/RDHH9yMGSGIR2/L5v7zndG6H0zpOM1mFh14j3CbdhNji46v3ZVv6e/wB359i0UklHd7sqkkkklP8A/9kAOEJJTQQGAAAAAAAHAAQAAAABAQD//gAnRmlsZSB3cml0dGVuIGJ5IEFkb2JlIFBob3Rvc2hvcKggNC4wAP/bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAG4AZAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP38ooooAKKKDQA0vj1rn/iZ40XwV4RmvY0hmvGkjtrKCaTy1ubmVhHDGWwThnZclVZgu4hWIwfHPjl+0r8QvhD8VZ9NvPBtnH4OvngTRNf05zqtxdSsv72C4tWe2EEobHlqssvmqcrl90a5cH7Qek+MtQ0zULfxlb+KLnS7s3LeHpdJ/su/WN4mheSC2mAuJZog7sqLu8xfNRQzlCPHxuaRpxlFpx6X0/BN3bW9knc7aODc7NO/kr/dtZX2u2khv7Afji+0u88a+AtV1nVNek0TWdS1LT73U5xJdTwyavfwXEYYsWdIrmB2GOIUuYYflEaivpkODXwX8OPE2l3PxjvPFkvjvTPCem6Dr/iF4dTM8MkmrC61K7H2SKN8q8W1rWaTaGbctkuA24jt9Y/bl8ZR63Do/wAPdL/4WlrepRudJtNQ0h/Dcd8yEiRmnklaWKCP+OdrPygQFVnkeONs6GaU4RVNJy2+Gz6LdXvvpeyXQuthW71Nl5p6+jSt+N77n1/RVHw5Pf3GhWbapDZwap5Ef2yO0laWCObaN6xuyqzIGztZlUkYJA6Ver3FqjzwooooAKKKKACiimSS7D07etACmRR3r58/bo/4KG+B/wBjj4F+JvE0msaXrXiDRZm0mz0O0uRNcz6u9v58FpKkZ3x5jKyuCAwiIYAllDeCf8F0f+Cj+u/sXfC/SvDPg+RtO8TeNIpZDqguI7d7G3WSOLZHLIVSGSaSQJ57sqxKGbIbayfh54S8f/DnXvButQeKPiReWu29iuWbRrffqskphEXnW0M7x2fCRSSyGSSOTdNZCKYyQzrXi5jmjotU6au20n5d32VvPfons/LqY9yq1cPRspQi25S+FOytHb3m+ZNpbJ9dbfrh+x9/wW/8K/G3wLH4L+Lmm+IPH3j7x14heyTQPDvh1JLW3tWEKReWskq+ZCJw+2SN5pBs3MwKsV9e+KPwt0fTfAWp6pe32v8Aif8AtHxFe6N4b0bUXit9PHkTyL9ru5YNtzcpEYZmJE6GVfJjKtKTK358fs2f8E/v2b/glZWHj7xb+2d4LsV8L6X/AGxb6D4M8Sabpmu2M6W4zCt7HeybrpUHkCSLLvvkCyASHP1p+zZ8Wfhn8Q9E0O8+L37QPwZ8KrpOi22n/wBi6Z8SLC81Axoqm4WW9WRfL8+4V7iaWPNxK7qDLGsSoeOo602kno9HZrbR6u/ra/r5PuyOpi/YqOPtz6Wta8kla7SbV21d8unSysZHwU/Y/wBD/Zd+Fnhi48H32veHNJ8ZXV7At7DNFdLHqcd7co8M8dykkY+0rD5ihEAEq3aK0Rmhjk9H07/gpx8Mv+Cenw78Nx/EDw38Q7nXvHenvfar4rsNKs/sN5dQXMtpcW8LNcq6x2svypAquYoriFmZ2kkkbsviN+0H+yzbfDK+8P8AhP4+/AnSPDt9A63fh268ZWY0q9yQxdJEm86ynMhVxcQElZdsxjkdcn4t8TfBf9lr9sfw7rl18Rv2pPDHgfx/oetT22n6lD8SdK1TTtQtGCSQ3kEAlCwLOHYTpatbCWRZd6AMEHRTqzWjtddbpp+aff1S+eje2auvCg1hbc+jSldaX1W/a6Vnbba1j3b/AII0/wDBabUP2hvEdr8KfivdNJ4suImfw7rskIhk1hETc1vdKuFNyNsmJI1CsYnRwr+VJdfpV4F8e6J8S/B+meIPDusabr2h6xbpdWOoafcpc2t5E4yskciEqykcgg4r+ai9+G37Nf7PfxY8T6NbfHy51jXNDtZ7y38T6elrd+Eta8yGKQ/YGsZJrmwuWhlEJJjukS4gEpUm3SQd/wD8EUP+Chur/s4ftT+FfAvhfVrTUvCfxA1vT7K90OeZAIDdXsVnNIQhbypbeSbzI5M/v4v3Z+4vlrD5pONT2NWOlt739er263s+10rvxaeJrYTDUp4v3uaTjJpP3Nrc2903e8k3ZJX1bP6MKKgsdRh1FGaGSOVVZoyyOGAZWKsuR3VlII7EEdqnr3z2gooooAK+K/8Agt9/wUE1D9hP9mWEeFtTj03x14uaaPTbgwpM2nWlsglvLwK4ZcorRRqWVgJLiM7T0r7Td9g/Gvxh/wCDpPRtWsfih8MfERS8g8P3Wh3Whw38IUpb3ralp80sTM3yrI9oJGVGOZFjlI4jYjizCpKNFuPl+Z5mdYqph8FOpS+LRLy5mo36/De60eq2ex8cftw6z4q+P/7GHwTvtcmvNcvNC0/xbqt5qUrXVzJdiHxHHHeLcNh3UI13A8fnKkTAqWmV1EdSfsS/sXD9rPxf4uvtY1hvC/w9+G+ly6/4r1hYBcz2VogdzHDGB88rrHIVABAEbHDEBG539qH48aHH+yJpfgvTTcaPq2ujShf6dHtWa6023JvrX7UqhZEFxq1/rt+kEg5t00l28seWH9T/AOCW37dmgfsg/EXxXoPjrSW1r4bfE6zGkeIIwnmyW0f7xBKY/wDlpGUlkSRAQxRsr8ygN+XZ9GisRhvrMm4NS1vftbVWbje3na/U/sX6MOMzhcJZ/PJabeMg8OrKzk3aXO4c1058nNyXTvNJNPVPX+GH7PP7IX7SPjP/AIQ7wr42+Lnw78S30/l6VqvjS20y50m7kGdsTi3EZikkPC7pNuRgksQG4f8Abm/4J2Xf7Jv7VehfCjw3fT+ONa8RWGmyWaizjsZru9vLh7eO3VWcqoMij5ncBVJLEBSa+lPj5/wRV8LfHHwlefED9lfxxpPjLQ2l3t4cub9ZJrZjgiKO5c5VuQRFdBG2gfO5IB+d/wBm/wAVePvFn/BTn4I2/wASLrxBP4o8N+MNC0R4dbDC7sYba6VUgdXG5SuT97k7ixyW3V5Kwt6lPD4mmv3kopVIvRxvZpWfK/LRNdT9/wANxZP6njM8yDMp1IYXD1p1MLiIr20KsYc0G04qoo3TUk5OF78reqPNf2k/2ZF/Zs8a6dp9x4i0XxVpd5DBNJqOjRyKsLNFHJNAY7hI5FdFlVlLKqyJJG/BLIv1x+0P/wAE2f2cf2aP2bvAfxM1zxZ8aL7Q/iNBbT6Sun6bpbTQCe1W5Tz0kZQvyHBCu3PHIGa8A/4KJDz/AB3psisu1g6lBxjGm6KQcf8AAjjr37EAfYP/AAU88P6h4z/4I+fstQ6TY3mpTR2GjmSO0gedlH9jYyQoOMEEc+la4zA0MPjMZQhHSEbxvfS0oLrvpJ736HzXDXHGd51kfDGKxmMnCWKrV6daUeSPOoe15W/dsn7kdkr3d9z53sP+Cd/g79pf9nzxp8Q/2f8AWPHOpJ8PmB1XQvFthawXt5H5JmZ7aS1d0kYIjny2VWOwgEttB+Z/2XtE1WX9sz4e+KNNmmtoPAviPwzqV3M0Mhsg0mvQRW32uRMLDb/aWiDyTMiqjybSzskb/p1/wQ78St+yh+xt8bPGvjqx1Lw94fsr23mjkvLdrdr50tZsQwB9vmSO7wooXJLSKO9flh8Gfilp/wAKf2grNdauZbXw74j0GXRNbkGSV0+eYCUhk+dZo1Xz4SmW+02tscZwG7clo0I18LVg2pyjJyt0s2lKzT3SfTpdanyfjNxJj6vC3EGW4uTrYbCV8IqVSVm2pqMqkZSjyqXs3Zt/EuZJvY+6/wDgjn+3Z4w+Cn/BQKHwV4g8VX83gz4ka1fDUdOu7iSazt9Rv5biWG9hZi4Est/DLG2wxrIt2XkBdA7/ALuWz74VJ61/Md8GNPvPjR/wUf8Ahzp2gxwN4i1bWLLVdWj+3K+nfa0uNM1XVZ7MREoNPWX7a8R3F44IBHIBJE4H9NHh/XLPxJo1vqGn3VvfWF4gmt7m3lWWGeNuVdHUkMpHIIJBr9Jyibs4XurJr5/8Mn879T+B8jji4UqlLF3vCpKKv2VrL77teTSWiLtFFFeyewMnXemMkcjpX4Cax8Rdc/bw/aQ/aR8Ba9i6sPidZX900Uv+r0e60QC+0+4iyGa3dbe3uLEXESmQNPHI0cgjVG/fyVtqfjX84H7Y/wAPNQ/Yp/b18Yf8I6+oeItD8b+F/EV14Wn0Mfbv7chfSdSawlj8sfvI7Z7xRNMpYKtjI5G1WNeXml1BSvZLfW3Zf0+m/Q8LN/rar4aWFu/fSaSve91quqtffS9utmvDf2hNC8D+APhLayQ6knijx54003T9T1LUrOaCHRfDfn/Zr+bR7OCzjSOR42cGeeaQwxlvJWCSSN7hPXf2TP8Agnj4o/bP+DPxP8TeD7yG413wC1qYdC+zuZdYWVJ3kWKTcFWVVh+VCp3k4yp27uF+Hf7Ed1rv7MXirxV4m8QaP4Ds7XRJ7bwva6pcJFeeKrfTLiINDaWpKyMDK8jSyqpAceWgdlPldp8Av2t/jR+xL8H7+68B3U/h3w38Tr1lg1VbKG6mnmsGdJlhJDGIp5jbyyj5UZlOEcj834kpQ9rQdSMpQjGV+XdKyStd9JNPtbv1/rv6LOdZvHI85qYWtSw+Mr4jDKn7ZqMZW9pOcZe65XdOFTf3tPdavE4P4BfHzx5+x58dLfW/Cd5qGl+ItLufs9xYsr7b3B2Pa3EB+8DllKMNyn+6ygj9H/8Agolb6ZH/AMFi/wBk7UodPh03xRrFzoM+vWqoGeENf7YBL6yIPNjDH5gkSdlXHyFb/wDBZD41wagmpX03gXWPFVqQtr4k1HwnYS6vZBQQvlziMdAWGWDHDGuR/ZE+KGtfF3/gpX8IPEnifVNQ1rxBqvxB0ee8v7yUvJO32uIfN06DaqquFVQABivn8nxkYVYYaDclKpB6pJKz3Su9Xt00016f0t4lcK5nj8Ji+IcxoUqEsPgsVBunUlUlV56TSjJunTtCGso35m5PRJK8rn/BQwMvxJ8lhI32WUIN/VAdK0YkY7ZODyB698n7e/bZ/aM8bfAv/gjp+zNrHgjxZrXhPUr6x02wubrTLlreW4ij06T92QOSoZAfTIB78fDP7eV35PxSkyzGNLkNEkmCCf7K0XPykYKhlGezEnIOOD45f8FPfjB+0R8Ev+FfeKta8P3XhXFuEtLbw5YWn2fyCpj8poolaHbtC/u9uVLL91iD6nEGKhh82xble84qKtbdqEtdVZe7bRPfyPh/CPhHF59wdw/WhCnOlhsRXqVFUk9YupVjZR9nJSfvc1pOK0SvrdeefFz9q34mftAWlvb+OPHvizxZa2snnQ22q6nJdW8T4K71jYlA2CRkDPNeZaVc6LF8cNJt/EulSa9ot9pLW15pqSvb/bo3nTMfnL8sMjAL5UkqvGsojLpIDsbe0DwrqXivVNP0/SdN1DU9Q1fUbbSLGCCBm+0XtyXFvbCQjy1ml8uXarsCVhlf7sTsvVfAX9miH9o/44+JvB7eLfDOh+J18MtZeH9MvdVhhj8X6g+pRQNp1tMCR55Xe8UqEqHRd5SLMicnCtOsswhWknZqVm+rs9r7/wBI9j6UmIyyHh7jsoyl01VpunJ04KK5f3iesVor9nv80z0m7tdH+Eng/wCNGraD4o0/x5pt1ZaP4MHiW4J/tW/0/U4bzWru4vpzHG8FwZdG1GG6tJonn36i8c1zNHbxof1n/wCDcz4l6145/wCCdMGl61eNeSeDdfuNHtSxUmGBre2vBECvy7Ea7dUC/KI1RV+VQK/BS58H+IJ9T1XSNS8O+JLHUNU1e10S+iWzns57i6J1Gza3jsmxdNcOLF0KwxuY5Y7mFvn8tG/od/4Ip/CDT/gR+yPeeHZtSs7vx6uuz3/jexhvEuZNB1OeKF47CUISscsVn9kVkBOG3HqTX6bgYRjioqCta99b+dr99Vp2Vz/MfA1MfiMwjisRFxi6VmrWSlz6W0V7rm17KOvRfY1FFFfTH0hU16zfUdGureORoZLiJo0kXrGWBAYfTOfwr+cL4U/E7RNL+HHxD+DnxY1+HS9J8DSX2p+Fb260y1vG8K+IVt5GhIFxFKsKXU0UkTKQS06ofvTSFv6LviF460b4a+B9V8Q+INUstF0PRLaS9v767lEcFpDGCzu7HgAAE1/N5/wVz+K3wf8Aif8Atva54p+F/iSxv/DvjS1SLVkaOaxia8u1nWTaLhEBIuIhKzJlP9PkYsOQfJzT2TSjUs73Ti7ap7rX+vxPHzqlmFKlHM8DCT9i/ecU2kpW3t10tHzafQ88/wCCinxk1D42+OLr+0NcuvE0fhPwZpWlR3ztMHuIFuI7iDeZXd1aKWW/SMSNJKFBZpZW3u/res/tAa54O+GXgvSX8B6lpN94y+HeoadpU2i31pJ4e1yKUrpk96lqHX/iciJxbvFDH9rkOpGMJIBDI3JfDD9kfS73/gm/8ZviVql5pN1rGlnRPBmiadqKtJAJ7+O0E+qN5rIXEL3OoiDcn7uaKWSRWe3VIuw+C2i6f4m/Yr+G/wATdPj0Pd8M4dU8Qypot9cW9/o2owW+ptbXVxazq0E11DDKl2ZrSSCcBBcGG4WOWS1+YqwVanC024OL2bvolaz6ttNWt53to/uOEa9TLo4qWLjGVSGJpVOV3aSlGqrPZWbgvtKySS1s4/MVwu2RuvqNw/n+let/8E/VaL9u74IhRIw/4T7RQMdAPtkQ+lerp+zNo/7Qfijx54m8Mw3eu/8ACyPGmu6R4DsrO3+x2lnNc395Pot0JNrh7aQ6dJbXKFVFrBqlpIW5LL51+yV4fuPg/wDtv/Be48TRw6HHZfECxF0by5tv9FFnqy2d20pWQmJI7iCeJml2qWgcoWUFq+Ew+T4jC4ujWavDnTv5XVm+1+no+x/oTmHjXkfE/Cea4K7oYlYerFwqe63P2E3OME9W4SjKMlZNWTduZI0P+CgPz/FJg3/HxHPISSo3SZ07R8sxz2AT+9kk8qV214FFbtI3yqzN22/jXt/7cmuWevfF+SSxka/h+0ygvAhljnZrLRoo1VlG0sXjkQY43Kechq2PgL+ypH4i0i4t/GOjX9rD44uZ9J8Na1ps8eof2CdDnkuPEN2PKL280hjijs7eMvJFcyXRaNwkbyj0eIctr4vNqjgrK0Xd7fAtP+Gvpdnx3g74pZNwl4cYX69LmqupU/dxa9o4uvJOSi7aRjdq7SbSXMr3XCfCn4v6l8Nvhp4w8O3nhzxP4i8H+K0s7zUo9CkW01SRba8+xP8AYZHIaRma/aF5bbzXhBkRlCSysnCftX6heeNP2wvHU2q6Lofg/U4ba7gudL0G6EkGlpZXkMD2scyiMTFbe2aJ32qHcO3O419leOvhJceJPEnwh+Fun2bQ+IP2eY55tc1W51C50u30G8bUNcR5UMKPI7XsYtdSVbcpJ5Fms7TWsam6j+fv2SvhD4V/ak/bm+KXgfd4b0vwvq2n6xpmk3HhrSFt10ySytrvUbe8sbeR5JIY3W28kwGUtJDcXCvI0mJU+jy3B/Vo0aKndpXe3VNNd7Xdr2t802/5c8T+KKXENTOM0VNQ+tcsIWTs2qtKVO99nONF813e/M46LlXU6z+0jZ6L8XNT+I95428RW/xI1nwHp2vW99a2dvcf2Zrt3GBq96Z5UMlvHFbRRQwmB4pkVLO3xOkcm/8ART/g118E3mlfs0fEzxBcQ3Frb6x4pitYrWQ/LCYbSOZ16AtIv2oRu7DLGLksQWP4keIItL8Ba1q2mzyx6xrWoTWb6zb26yuFvbdZpbtSjRRyqk13CIyjwo0SsyOxeMuf6Jf+CNX7WPwG8efArS/hJ8J9b1K71jwLpYvNUg1jRJtJvtUeSU/adSMcgIfzbmQu5VmKGZAxGRn2MtlQ9vBwkryvLtzN3V7d3e/yVm1Y/HMJlOdV61THYqlJ0KC5FJJuHNJp6TtbTWPK9dIu259tUUUV9Ydx+MX/AAcU/wDBSXSNb8dWfwB0PxPplvZeH/K1bxiEvFXz70/NZ2D56rEdtxIBkbjADyjKfmD4CeN/gd8T9A8N+Edeg0+LS9HiS4vNbv4kkfVr+cPE8LG1NvImn2z3YmlM9+Wmi0yJYRC0siPd/wCCynwZ8Pfs7/t7eMNP8E6pD4mi8QTSeKNct9Uk8qTQ7+7kMj2q3IVxMP8AlpiRQYlkhTMm0bfj670yXXj9ubwyq3WDH9u0LUYJZIsAs2xjtLqBjKknn5sZGK/G+IMRiIZnOtXirLRXcXG3ZJtb9d3c/tLwzy3CV+D6WDyvETVWXNUkqdKvGqqjXK5OpTVXm5I80ILkhBqTk+WTUl7z+0n8F9Q+GHwEnHgjxLJdfCvxJ4ikltfBt3cPF9ku1srr7KhufL+W6tbbUcXEdufsyXLorBnBcc5+y/eQ/Cvwr4uu77QPD+pfBD4jXVr4R1XxTLoS6lN4a1CW0kuPsCxRzW95E25nYxLJb4OPKljkjiEuX8DPjfZ/Fz4naF4Z+J/i/VobFdPGgLeXU5uZrWygYTrbW/nLM1nsdI1YRRv5McssiRzRl0k9+/aU+BeseE/h/wCNtW+GMa6Z8PPihd6ZpOs+CI7pmk8SLAbe8gaBGDy29xt8uaBcyXUVpNHNIBHJ5ce2XZhPmlSraQWqtq0+9r3cW731W7WltPieMeC8mqVKGZ5a3PFVIyjUiuWnTrR5oNUr25YYmFlKLSlCS5JyclUXte88I69a/Ff4Ma3qHw102z/tfR7fUvCSeIn0Gz8FaF4mnu9Pks555IJr1LdLsqsQmOzzt8cM0UwjWXTZHftm/t/+Mv2cW8cap8HfiV4s+H/jvULWPxNqPh+0sdJ1W1e3upbyYyTSTW1zG8iXlwtn51pO0G23t8AvdnZ8W/s2+JPiTpXxa1fSvhHpt54q8T66p0mwhbTtNm8S3sENpLf4aGcP5kce27zLaMDKbVchyyVkfG3U7WfV7rTPG0P/AAi/j660g2eov4he407VvukPtt7j7OkEDSoHCRW4JKfNLIS1ehWxU1T9rUg7fzRjzXvbrZ6W/m5X5Xvf5Hh/gtZhm0aOWVoT5ZXnRxEvYVIJO7p1ITavK/8Az6dSN9bpH2f+0j/wUZ+NXwB/bX+Nnw38TftH/Ei38BeBZ7iySVtH0Jr+7muNOi+zrK8em42fbJ4txVP9ShRQGbcfRvgL8H74/DvQfDOg2OpXHgvR9OKWcMfiSxttY1Bpmvr6aB4mvbK5YY1GO2RC2nCZk+0yusLLay/nf8Zf2ndH/aT+PPxF+J3j5Ph22oePdRtbu70vUbpJoGMFjFbLIjrJHOg3RtzFJG2SCuUINdt8QPiT8VrX9n26uIPBtxpPwX8RzReH7HUPEWnW39lzvLaPJNHFfahbC+nR/JlkUwGVug86RgGOntYTqyjQTlZq65Ulta6l8Ol3fVb/ADOXMOEcRgsvw2PzOpRwsZUrtyqPmTTlJ89GMXWUpL4bU3G2jak0j2DVfFEPxI8Z3nh/4O+FdC8UfGf4zY0OTwtc+B7Ozj8OwW9qd1n9pklFtILJ4I2a4hs7aKSSOS5kZm+zwV8wfsu+CPFfiH4mabp/w61x/DdqrwadD4jN/LZ+bdTW97FMwu9xEEdyLi7hWRQGmB2Rbidxl/Zc07Wtb+Iem/8AFTJ4AXx5psnhXW9d1IMqxWV6bcXEKbQz2lqqoEYxkSyLJJ5kiRu5r6B+IHxJ8K/sbfBy/wBJvfBuq+CPiDADoesaZd3Zm0nxNbBVVXuLSSIEMGikltxb3GyGRBcIETElc9TMEoyhTlebdpOOvmoR7vdN6J9FfSP0OD8PMO6lDHZphakKEU50KddKLkltia0Lq0IuN6dBNuKnzVnyvmqvtvAPwj/Y01qW60XxNp+vjQbiObSLy0W1nLzW+ba4ieEPPZeS5uLXULa5lEivBDLCzNOr26838PP+ChPhv9mT9tO2+LHwpsbnRdK065W7Tw6JmvLf7JMiG/01Zo42VrctvELHDKI4XK71Irwq4udc8e6neeKNY0+41/7ZcPetfape+TY+azPJJIXfc80rEuxndcOckD71bvhDwl8SPiVplxceEfCv/CQLbq4WTQtL1LW4A4ILL5sEewclSMscAHOeh+fjUrVK6WHg7xlze69U/N+9Lyd0vVpI/boYfBYbK6tXOMZ7taj7K1SnJxnTVmnTXPh6K5ZXlTcZVPi3g5SpL+oj9lv9q3wj+2N8C9B+IngW8bUvD2vwl4yy7JrWVWKSwTJzsljcMrL6jIJBBJXkf/BI/wCDHg/4BfsNeFrDwPeeKtSsdcebW9Qm8RWn2PVFv52/0iKe3CqLdomXyvKAwojGCwwxK/aMPUqulF1LXsr+v4fkfwnio0Y1pxoNuCbs2rNro2tbel3bu9z6hW38uPauFHtxXiX7Tn/BPP4Q/tVxXFz4w8B6JqWtMhMeqW8kmmakHHKH7Xb7ZeGAPJYD+6RkH3KkK5Nb1KcZx5Zq67PVEUa1SlUVWlJxktU02mn3TWqfofgB8U/+CLf7S/wCsviLpvh/R5fFXhHx55dtqVrY3cD3ElpbTGezijuI7Rrv93IqMzxiFpGjiLISMDzP4H+CP2kP2aNLml8UfDXxxN4b0+wvLF9bt/C09xD4dilaV2vEMkMT2s0MsguisRghneBBJIqE7f6SfIXHf868I/bevPjdcReD9B+CN98PdH1HXb2ZNY1TxUtxObK1SLIFrDFGyPKzHkykKAuNrbsp4OY5FhqtNL4eXa2jW2i2SW2m3XR2Z62RcS5vlmNrYx15YhV7urCs/aRqP3rS97WM1zStNNS1abalJP8ADj4h+F/hj8ZNNk1rSZGmbwroUc9iuhWX9nvpK6ZpqGW6j8vFxILjV7uFIriUGeG1sbqaYkKJK6rxZ8X/ANqD9nj4Xa5D/wALr8Rax4b8NjS4b+z8RaVbeJLeG7ms7eaW3SXUrW4GbRrmGKT9+rFpFKowYlft/wAK/wDBtp4Z8X+LfEHjD4pfFTxRrXjDxMXnux4T0608O6VBO6BXcWmyWOQ4G3JVA4LF0JdieZ8Zf8G3Xi62stSs/CP7RF5/YupSK0+l694ceeOfbJ5oaVre7iSRhJhgTEPm+Y5NfK1OH82opzwr72tLlfVq6ba7a3bSR+45T4icK5h7H+3aL0cVNVqcazUFJXUa0HGabgpJqMIxcpczfNeR8b+D/wBpf9pxbebUNN+KWj+DrnVn1y1kOk/D7R9HvpRpWktqF0FuI9KPzGPYiIJllEknzBYyslFx+znovjjx54f8WfH/AOIXjLWr/wATaRps9p4j1u6a5m09J/Ia+tdsszTiKGK8tJI5bNACLhJpLbyxMifUHhP/AINuvi/od7Zr/wAL88JaJZ2MkzwSab4WvJLiz8+MRTmDdfIsZliAR/7ygKcrxXqOif8ABsn8Nb7wdPb+Lvip8VNe16VI4k1KxnttNjtwiKiqkQjkYoI1WPa8rYRVAxtXBTybOcVHlxNrq3xTvF+sVo79tEh4/jHg7L6kqmQvkTbcXRoKNWK520o1ar56T5VH3o87TclaSSkfl58TNY1X4z+L10n4b+G/FnxE8YaBow0fxHpngvR31CxlFrOFguYUtUIhspVitJis0Ef7/ewV9w2b/wAA/wDgnr+12PiRe+ItF8B+Mo9cvbKfSvt13pc9ktnp9yiwz26DUokhm8yLcrmRXJCqAQvT9X/2af2Kvj7/AME3NQ8G+F/Bfjz4Y+NfgzHqtvp9/pWseHjo2sW9rNLhpYrm1WQz3Kbi264LebyGKFt6/ekMKvErcnIzzXv5Tw1Rw0nWm26r3b6f4dWlfXV3er2Py3j3xEzXijC08u5pYbCU27U4OKlJtp/vJpXmkuWKWkVFJWuj81f+CT//AAQ5sP2ftFm1L43+C/B/jHxFbSJNotzqGrXGrTWSbdpinsyo09WTGUkjWR/nOXOBX6VWtqbWFY12qqAKqqMKB6Adh7VIkYT1/GnV9Lh8PTow5KaSXkkvySX4HxuIxeJxM/a4qpKpPS8pScpO3dvVkfkbvvfNRUlFbnOf/9k=',
                                    width: 40,
                                    rowSpan: 3,
                                    margin: [0, 0, 0, 5]
                                },
                                { text: 'SECRETARIA DE ESTADO DA EDUCAÇÃO', bold: true, fontSize: 10, alignment: 'center', margin: [-220, 0, 0, 0] },
                                {
                                    image: 'data:image/png;base64,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',
                                    width: 120,
                                    rowSpan: 3,
                                    margin: [-50, 10, 0, 0]
                                },
                            ],
                            [
                                { text: '' },
                                { text: '' },
                                { text: '' }
                            ],
                            [
                                { text: '' },
                                { text: 'RELATÓRIO DE PRESTAÇÃO DE CONTAS', alignment: 'center', fontSize: 13, bold: true, margin: [-220, 0, 0, 0] },
                                { text: '' }
                            ],
                        ]
                    }
                },
            {
                margin: [20, 0, 20, 0],
                table: {
                    widths: ["100%"],
                    body: [
                        [
                            { text: '', fillColor: '#cccccc' }
                        ]
                    ]
                },
                layout: {
                    defaultBorder: false,
                }
            },
            {
                style: { fontSize: 8 },
                layout: 'noBorders',
                table: {
                    widths: ["30%", "50%", "20%"],
                    body: [
                        [
                            { text: 'CONVÊNIO FDE X APM', bold: true, fontSize: 12, alignment: 'center', margin: [0, 0, 0, 0] },
                            { text: 'IDENTIFICAÇÃO DA APM', bold: true, fontSize: 12, alignment: 'center', margin: [0, 0, 0, 0] },
                            { text: 'RECEITA/DESPESA', bold: true, fontSize: 12, alignment: 'center', margin: [0, 0, 0, 0] }
                        ]
                    ]
                }
            },
            {
                style: { fontSize: 8 },
                layout: 'noBorders',
                margin: [20, -5, 20, 0],
                table: {
                    widths: ["30%", "50%", "20%"],
                    body: [
                        [
                            [
                                {
                                    table: {
                                        widths: ["30%", "70%"],
                                        body: [
                                            [{ text: 'ITEM', border: [true, true, false, true], bold: true, alignment: 'center' }, { text: 'DESCRIÇÃO', border: [false, true, true, true], bold: true, alignment: 'left' }],
                                            [{ text: 'Convênio Nº', border: [true, false, false, false] }, { text: config.NrConvenio.toString(), border: [false, false, true, false], bold: true }],
                                            [{ text: 'CIE Nº', border: [true, false, false, false] }, { text: config.CodEscola.toString(), border: [false, false, true, false], bold: true }],
                                            [{ text: 'Verba', border: [true, false, false, false] }, { text: config.Programa.toString(), border: [false, false, true, false], bold: true }],
                                            [{ text: 'Período', border: [true, false, false, false] }, { text: config.Periodo.toString(), border: [false, false, true, false], bold: false }],
                                            [{ text: 'Data Conclusão', border: [true, false, false, false] }, { text: config.DtConclusao.toString(), border: [false, false, true, false], bold: false }],
                                            [{ text: 'Situação Atual', border: [true, false, false, true] }, { text: config.Status.toString().toUpperCase(), border: [false, false, true, true], bold: true }],
                                        ]
                                    }
                                }
                            ],
                            [
                                {
                                    table: {
                                        widths: ["20%", "80%"],
                                        body: [
                                            [{ text: 'ITEM', border: [true, true, false, true], bold: true, alignment: 'center' }, { text: 'DESCRIÇÃO', border: [false, true, true, true], bold: true, alignment: 'center' }],
                                            [{ text: 'Nome', border: [true, false, false, false] }, { text: config.NomeAPM.toString(), border: [false, false, true, false], bold: false }],
                                            [{ text: 'Endereço', border: [true, false, false, false] }, { text: config.EnderecoAPM.toString(), border: [false, false, true, false], bold: false }],
                                            [{ text: 'Cidade', border: [true, false, false, false] }, { text: config.CidadeAPM.toString(), border: [false, false, true, false], bold: true }],
                                            [{ text: 'Diretoria Ensino', border: [true, false, false, false] }, { text: config.Diretoria.toString(), border: [false, false, true, false], bold: true }],
                                            [{ text: 'CNPJ Nº', border: [true, false, false, false] }, { text: config.CNPJApm.toString(), border: [false, false, true, false], bold: false }],
                                            [{ text: ' ', border: [true, false, false, true] }, { text: ' ', border: [false, false, true, true], bold: true }],
                                        ]
                                    }
                                }
                            ],
                            [
                                {
                                    table: {
                                        widths: ["50%", "50%"],
                                        body: [
                                            [{ text: 'ITEM', border: [true, true, false, true], bold: true, alignment: 'center' }, { text: 'R$', border: [false, true, true, true], bold: true, alignment: 'center' }],
                                            [{ text: 'Saldo Anterior', border: [true, false, false, false] }, { text: '0', border: [false, false, true, false], bold: false, alignment: 'right' }],
                                            [{ text: 'Recebido Total', border: [true, false, false, false] }, { text: config.RecebidoTotal, border: [false, false, true, false], bold: false, alignment: 'right' }],
                                            [{ text: 'TOTAL', border: [true, false, false, false] }, { text: config.RecebidoTotal, border: [false, false, true, false], bold: false, alignment: 'right' }],
                                            [{ text: 'Despesa Período', border: [true, false, false, false] }, { text: config.DespesaPeriodo, border: [false, false, true, false], bold: false, alignment: 'right' }],
                                            [{ text: 'Outras Entradas', border: [true, false, false, false] }, { text: config.OutrasEntradas, border: [false, false, true, false], bold: false, alignment: 'right' }],
                                            [{ text: 'Devolução', border: [true, false, false, false] }, { text: config.Devolucao, border: [false, false, true, false], bold: false, alignment: 'right' }],
                                            [{ text: 'SALDO FINAL', border: [true, true, false, true], bold: true, fontSize: 10 }, { text: config.Saldo, border: [false, true, true, true], bold: false, alignment: 'right' }],
                                        ]
                                    },
                                }
                            ]
                        ]
                    ]
                }
            },
            {

                margin: [20, -15, 20, 0],
                table: {
                    widths: ["20%", "80%"],
                    body:
                        [
                            [
                                { text: 'Data do Repasse: ' + config.DataRepasse.toString(), bold: false, fontSize: 10 },
                                {
                                    text: 'RELAÇÃO DOS PAGAMENTOS EFETUADOS', alignment: 'center', fontSize: 13, bold: true, margin: [-180, 0, 0, 0], border: [false, false, false, false]
                                }
                            ]
                        ]
                }

            },
            {

                margin: [20, 5, 20, 150],
                style: { fontSize: 8 },

                table: {
                    widths: ["4%", "22%", "11%", "19%", "4%", "3%", "7%", "8%", "6%", "8%", "8%"],
                    body: [
                        [

                            { text: 'ITEM', rowSpan: 2, margin: [0, 10, 0, 0], border: [true, true, false, true], alignment: 'center', bold: true, fontSize: 10 },
                            { text: 'FAVORECIDO', colSpan: 2, border: [true, true, true, true], alignment: 'center', fontSize: 10, bold: true },
                            { text: '' },
                            { text: 'DESCRIÇÃO MATERIAL/SERVIÇO', rowSpan: 2, margin: [0, 2, 0, 0], border: [true, true, false, true], alignment: 'center', fontSize: 10, bold: true },
                            { text: 'DOCUMENTO FISCAL', colSpan: 3, border: [true, true, true, true], alignment: 'center', fontSize: 10, bold: true },
                            { text: '' },
                            { text: '' },
                            { text: 'TIPO DESPESA', rowSpan: 2, margin: [0, 2, 0, 0], border: [true, true, true, true], alignment: 'center', fontSize: 10, bold: true },
                            { text: 'CHEQUE', colSpan: 3, border: [true, true, true, true], alignment: 'center', fontSize: 10, bold: true },
                            { text: '' },
                            { text: '' }
                        ],
                        [
                            { text: '' },
                            { text: 'RAZÃO SOCIAL OU NOME', border: [true, false, false, true], alignment: 'center', bold: true, fontSize: 10 },
                            { text: 'CNPJ/CPF Nº', border: [false, false, true, true], alignment: 'center', bold: true, fontSize: 10 },
                            { text: '' },
                            { text: 'TIPO', border: [true, false, false, true], alignment: 'center', bold: true, fontSize: 10 },
                            { text: 'Nº', border: [false, false, false, true], alignment: 'center', bold: true, fontSize: 10 },
                            { text: 'DATA', border: [false, false, true, true], alignment: 'center', bold: true, fontSize: 10 },
                            { text: '' },
                            { text: 'Nº', border: [true, false, false, true], alignment: 'center', fontSize: 10, bold: true },
                            { text: 'DATA', border: [false, false, false, true], alignment: 'center', fontSize: 10, bold: true },
                            { text: 'R$', border: [false, false, true, true], alignment: 'center', fontSize: 10, bold: true }

                        ]
                    ]
                },
                layout: {
                    defaultBorder: false,
                }
            }
            ],
            content: [
            
            {
                margin: [-30, 0, 0, 50],
                style: { fontSize: 8 },
                colSpan: 11,
                table: {
                    widths: ["4%", "22%", "11%", "19%", "4%", "3%", "7%", "8%", "6%", "8%", "8%"],
                    body: config.Itens
                }

            }




            //{
            //    margin: [-30, -50, 0, 50],
            //    style: { fontSize: 8 },

            //    table: {
            //        widths: ["4%", "22%", "11%", "19%", "4%", "3%", "7%", "8%", "6%", "8%", "8%"],
            //        body: config.Itens
            //    }

            //}
            ],
            footer: [
            {
                margin: [20, 5, 20, 0],
                style: { fontSize: 8 },
                layout: 'noBorders',
                table: {
                    widths: ["75%", "25%"],
                    body: [
                        [
                            { text: 'RESPONSÁVEIS PELA PRESTAÇÃO DE CONTAS', bold: true, fontSize: 13, alignment: 'center' },
                            { text: 'EXCLUSIVO FDE', bold: true, fontSize: 15, alignment: 'center' }
                        ],
                        [
                            [
                                {
                                    table: {
                                        widths: [100, 240, 5, 165, 5],
                                        body: [
                                            [
                                                {
                                                    text: 'À'
                                                       + '\nFundação para o Desenvolvimento da Educação'
                                                       + '\nEncaminhamos para apreciação de V. Sas. o Relatório de Prestação de Contas do Convênio, da Verba e da APM acima identificados.'
                                                       + '\nConfirmamos ser o presente Relatório de Prestação de Contas a expressão da verdade.'
                                                    , colSpan: 5, border: [true, true, true, false]
                                                },
                                                {},
                                                {},
                                                {},
                                                {},
                                            ],
                                            [
                                                { text: '', border: [true, false, false, false] },
                                                { text: 'Local', border: [false, false, false, false], margin: [0, 5, 0, 0] },
                                                { text: '', border: [false, false, false, false] },
                                                { text: 'Data', border: [false, false, false, false], margin: [0, 5, 0, 0] },
                                                { text: '', border: [false, false, true, false] },
                                            ],
                                            [
                                                { text: 'Diretor (a) Executivo APM', border: [true, false, false, false], margin: [0, 10, 0, 0] },
                                                { text: '', border: [false, false, false, true] },
                                                { text: '', border: [false, false, false, false] },
                                                { text: '', border: [false, false, false, true] },
                                                { text: '', border: [false, false, true, false] },
                                            ],
                                            [
                                                { text: '', border: [true, false, false, false] },
                                                { text: 'Nome', border: [false, false, false, false], alignment: 'center' },
                                                { text: '', border: [false, false, false, false] },
                                                { text: 'Assinatura', border: [false, false, false, false], alignment: 'center' },
                                                { text: '', border: [false, false, true, false] },
                                            ],
                                            [
                                                { text: 'Diretor (a) Financeiro APM', border: [true, false, false, false], margin: [0, 10, 0, 0] },
                                                { text: '', border: [false, false, false, true] },
                                                { text: '', border: [false, false, false, false] },
                                                { text: '', border: [false, false, false, true] },
                                                { text: '', border: [false, false, true, false] },
                                            ],
                                            [
                                                { text: '', border: [true, false, false, true] },
                                                { text: 'Nome', border: [false, false, false, true], alignment: 'center' },
                                                { text: '', border: [false, false, false, true] },
                                                { text: 'Assinatura', border: [false, false, false, true], alignment: 'center' },
                                                { text: '', border: [false, false, true, true] },
                                            ],
                                        ]
                                    }
                                }
                            ],
                            [
                                {
                                    table: {
                                        widths: [30, 140, 2],
                                        body: [
                                            [
                                                {
                                                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAACVCAYAAACkcPG6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAIjSURBVHhe7ZrBbQIxEEVNSgHK4MRlW6AFOCPRABcoAK7c4EADnEF0Aa0QvmNHZLVJ/AdNAOU/aWXiAI8Zr5Zh1q3LlfDHvKXxT3kd6Wg0Cq1WKxwOhzTDYVpTCIfDYXy8WCziSAEpw3q9vlRVddnv9/iwaZaDTu9qtQr9fj/0er3Q6XTCZrNJ/yFI8iJOp1OMDiOYzWYxahZKWpfkFGNkoKTXdEZJ/bieVOkZZRRLc1Q5tRlEj3mG4mcjmqaI8jrjrC5F115XJHVFUleeW4rSBBVDt9tNMx/keQZTpPP5PD2yQUun02mYTCbpLxu0dDAYxDIFFaEVU3pRJy2Xy3A+n9MMh0mKogwlqDVakxSMx+Ow2+3C8XhMMwTxq7yApjo3lyrE20TukgIUazgYVK64Iqkrkroi6Y+opVMKnV61dBgoqVo6kKql04SkrkjqiqTfglLlnn4DUHpdkdSV15GiRYcqPx9s7atyxRVJXZHUldeR4rJXvxPFoPS6Iqkr/0eqcsUVSV2R1BVJvwX10e3PRNOuDlx7S6n38TGyNw0AJUWfnvycjdDfMkgpIF/2BXpNIauq6nNNTSBSK1hPy1vcJc33ZOo3iH6DSi+6n7edlO12G8d2ux3HUswnUoZ8eUQ1kiuSuiKpK88tzZuHmw66vYPLIAsqCHZX5C1aU1ckdeUhUpUrrkjqiqSumKTaalsKnV5ttWWgpNpqC6m22jbxAGkI70/HCjE2eZZDAAAAAElFTkSuQmCC',
                                                    margin: [0, 0, 0, 0], rowSpan: 8, fontSize: 14, border: [true, true, false, true], alignment: 'center'
                                                },
                                                { text: '', margin: [0, 25, 0, 0], border: [false, true, false, false], bold: true, alignment: 'center' },
                                                { text: '', border: [false, true, true, false] }
                                            ],
                                            [
                                                {},
                                                { text: 'Nome', border: [false, true, false, false], bold: true, alignment: 'center' },
                                                { text: '', border: [false, false, true, false] }
                                            ],
                                            [
                                                {},
                                                { text: '', margin: [0, 15, 0, 0], border: [false, false, false, false], bold: true, alignment: 'center' },
                                                { text: '', border: [false, false, true, false] }
                                            ],
                                            [
                                                {},
                                                { text: 'Assinatura', border: [false, true, false, false], bold: true, alignment: 'center' },
                                                { text: '', border: [false, false, true, false] }
                                            ],
                                            [
                                                {},
                                                { text: '', margin: [0, 15, 0, 0], border: [false, false, false, false], bold: true, alignment: 'center' },
                                                { text: '', border: [false, false, true, false] }
                                            ],
                                            [
                                                {},
                                                { text: 'Data', border: [false, true, false, false], bold: true, alignment: 'center' },
                                                { text: '', border: [false, false, true, false] }
                                            ],
                                            [
                                                {},
                                                { text: '', margin: [0, 15, 0, 0], border: [false, false, false, false], bold: true, alignment: 'center' },
                                                { text: '', border: [false, false, true, false] }
                                            ],
                                            [
                                                {},
                                                { text: 'Situação desta P.C após Análise', border: [false, true, false, true], bold: true, alignment: 'center' },
                                                { text: '', border: [false, false, true, true] }
                                            ],
                                        ]
                                    }
                                }
                            ]
                        ]
                    ]
                }
            }
            ]
        };
        return doc;
    };

    sedPdfExporter.exportPdf(config);

}