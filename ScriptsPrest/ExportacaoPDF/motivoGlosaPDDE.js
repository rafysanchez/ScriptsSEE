

function gerarPDFMotivoGlosaPDDE(data) {
    var config = {
        pageSize: "A4",
        title: "Motivo de Glosa",
    };

   
    sedPdfExporter.normalizeConfig(config);
    config.data = data;

    config = montarCabecalho(config);

    config.notaFiscal = montarGridNotaFiscal(config);
    config.colunasNotaFiscal = formatarColunasGridNotaFiscal(config);
    config.rpa = montarGridRpa(config);
    config.colunasRpa = formatarColunasGridRpa(config);
    config.recibo = montarGridRecibo(config);
    config.colunasRecibo = formatarColunasGridRecibo(config);
    config.reciboCartorio = montarGridReciboCartorio(config);
    config.colunasReciboCartorio = formatarColunasGridReciboCartorio(config);
    config.rendimentos = montarGridRendimentos(config);
    config.colunasRendimentos = formatarColunasGridRendimentos(config);
    config.docs = montarGridDocs(config);
    config.colunasDocs = formatarColunasGridDocs(config);
    config.outrasSaidas = montarGridOutrasSaidas(config);
    config.colunasOutrasSaidas = formatarColunasGridOutrasSaidas(config);
    config.devolucao = montarGridDevolucaoRecursos(config);
    config.colunasDevolucao = formatarColunasGridDevolucao(config);
    config.recP = montarGridRecP(config);
    config.colunasRecP = formatarColunasGridRecP(config);

  


  
        config.tableNF = {
                              headerRows : 2,
                              widths: config.colunasNotaFiscal,
                              body: config.notaFiscal
                          }

        config.tableRPA = {
                            headerRows: 2,
                            widths:config.colunasRpa,
                            body: config.rpa

                            }
       
        config.tbRecibo = {
                            headerRows: 2,
                            widths: config.colunasRecibo,
                            body: config.recibo

                          }

        config.tbReciboCartorio = {
                                    headerRows: 2,
                                    widths: config.colunasReciboCartorio,
                                    body: config.reciboCartorio

                                 }

        config.tbRendimentos = {
            headerRows: 2,
            widths: config.colunasRendimentos,
            body: config.rendimentos

          }

        config.tbDocsExig = {
            headerRows: 2,
            widths: config.colunasDocs,
            body: config.docs

        }

        config.tbOutrasSaidas = {
            headerRows: 2,
            widths: config.colunasOutrasSaidas,
            body: config.outrasSaidas

             }

        config.tbDevolucaoRec = {
            headerRows: 2,
            widths: config.colunasDevolucao,
            body: config.devolucao

        }

        config.tbRecursoProprio = {
            headerRows: 2,
            widths: config.colunasRecP,
            body: config.recP
        }
    

        config.bodys = [[{ text: '', style: '', alignment: '' }], ];

        if (config.data.NotasFiscaisGlosadas.length > 0)
            config.bodys.push([{ table: config.tableNF }]);

        if (config.data.RecibosGlosados.length > 0)
            config.bodys.push([{ table: config.tbRecibo }, ]);

        
        if (config.data.RpaGlosadas.length > 0)
            config.bodys.push([{ table: config.tableRPA }, ]);

        if (config.data.RendimentosGlosados.length > 0)
            config.bodys.push([{ table: config.tbRendimentos }, ]);

        if (config.data.DocumentosGlosados.length > 0)
            config.bodys.push([{ table: config.tbDocsExig }, ]);


        if (config.data.OutrasSaidasGlosadas.length > 0)
            config.bodys.push([{ table: config.tbOutrasSaidas }, ]);


        if (config.data.DevolucaoGlosadas.length > 0)
            config.bodys.push([{ table: config.tbDevolucaoRec }, ]);


        if (config.data.RecursosPropriosGlosados.length > 0)
            config.bodys.push([{ table: config.tbRecursoProprio }, ]);


        if (config.data.ReciboCartorioGlosados.length > 0)
            config.bodys.push([{ table: config.tbReciboCartorio }, ]);



    config.docGenerator = function (config) {
        config.pageMargins = [20, 100, 20, 110];

        var doc = {
            header: config.sedHeader,
            footer: config.sedFooter,
            content: [
                {
                    text: "Motivos de Glosa",
                    style: 'header'
                },
                { text: "\n" },

                { text: [{ text: "Exercício: ", style: "lbl" }, config.exercicio], style: 'content' },
                { text: [{ text: "Grupo de Repasse: ", style: "lbl" }, 'PDDE'], style: 'content' },
                { text: [{ text: "Objeto de Repasse: ", style: "lbl" }, config.objetoRepasse], style: 'content' },
                { text: [{ text: "Diretoria: ", style: "lbl" }, config.diretoria], style: 'content' },
                { text: [{ text: "Escola: ", style: "lbl" }, config.escola], style: 'content' },
                { text: [{ text: "CIE: ", style: "lbl" }, config.CIE], style: 'content' },
                
                      { text: "\n" },
                	    {
                	        style: 'tabela',
                	        table: {
                	            headerRows: 1,
                	            widths: ['*'],
                	            body: config.bodys

                	        }, 
                	            layout: {
                                  defaultBorder: false,
			                  }
                	    },


               ],
              styles: {
                header: {
                    fontSize: 14,
                    bold: true,
                    fillColor: '#459ad6',
                    color:'#fff'
                },
                headerColuns: {
                    fontSize: 12,
                    bold: true,
                    fillColor: '#459ad6',
                    color: '#fff'
                },
                lbl: {
                    fontSize: 10,
                    bold: true
                },
                content: {
                    fontSize: 10,
                    bold: false
                },
            
            }
        };
        return doc;
    };

    // Passo 4: gerar e exportar o PDF
    sedPdfExporter.exportPdf(config);
}

function montarCabecalho(config) {

    debugger;
    config.diretoria = config.data.CabecalhoRelatorio.Diretoria;
    config.escola = config.data.CabecalhoRelatorio.Escola;
    config.objetoRepasse =  config.data.CabecalhoRelatorio.Programa;
    config.exercicio = config.data.CabecalhoRelatorio.Exercicio;
    config.CIE = config.data.CabecalhoRelatorio.CIE;
    return config;
}

function montarGridNotaFiscal(config) {
    var tbNotaFiscal = [];
    var tbFinal = [];
    var tbFde = [{ text: 'Nota Fiscal', style: 'header', colSpan: 7, alignment: 'center' }, {}, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'Nota Fiscal', style: 'header', colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}];
    tbNotaFiscal.push(     
        [
         
         { text: "Número NF", alignment: 'center', style: 'headerColuns' },
         { text: "Data Emissão", alignment: 'center', style: 'headerColuns' },
         { text: "Nr. Cheque", alignment: 'center', style: 'headerColuns' },
         { text: "Valor", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
      ]

    );
  
    for (var i = 0; i < config.data.NotasFiscaisGlosadas.length; i++) {
        var item = config.data.NotasFiscaisGlosadas[i];
        tbNotaFiscal.push(
            [
               
                { text: item.NotaFiscal.NrNotaFiscal, alignment: 'left', style: 'content' },
                { text: item.NotaFiscal.DtEmissaoString, alignment: 'left', style: 'content' },
                { text: item.NotaFiscal.NrCheque, alignment: 'left', style: 'content' },
                { text: item.NotaFiscal.VlTotalNfS, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.NotasFiscaisGlosadas.length; i++) {
            tbNotaFiscal[i].pop();
        }
        tbFinal.push(tbEscola);
    } else {
        tbFinal.push(tbFde);
    }

    for (var i = 0; i <= tbNotaFiscal.length; i++) {
        tbFinal.push(tbNotaFiscal[i]);;
    }

    if (tbFinal.length > 0) {       
        tbFinal.pop();
    }
  
    return tbFinal;
}
function formatarColunasGridNotaFiscal(config) {
    var _tamanhoColunaMotivoGlosa;
    if (config.data.PerfilEscola)
        _tamanhoColunaMotivoGlosa = 400;
    else _tamanhoColunaMotivoGlosa = 270;
    var tamanhoColunas = [60, 60, 60, 60, _tamanhoColunaMotivoGlosa, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridRecibo(config) {
    var tbRecibo = [];
    var tbFinal = [];
    var tbFde = [{ text: 'RECIBO', style: 'header', colSpan: 8, alignment: 'center'}, {}, {}, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'RECIBO', style: 'header', colSpan: 7, alignment: 'center' }, {}, {}, {}, {}, {}, {}];
    tbRecibo.push(
     [

         { text: "Data", alignment: 'center',  style: 'headerColuns' },
         { text: "Monitor", alignment: 'center', style: 'headerColuns' },
         { text: "CPF", alignment: 'center', style: 'headerColuns' },
         { text: "Nr. Cheque", alignment: 'center', style: 'headerColuns' },
         { text: "Valor", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.RecibosGlosados.length; i++) {
        var item = config.data.RecibosGlosados[i];
        tbRecibo.push(
            [
                { text: item.ReciboMonitoria.StrDtReciboMonitoria, alignment: 'left', style: 'content' },
                { text: item.ReciboMonitoria.NmMonitor, alignment: 'left', style: 'content' },
                { text: item.ReciboMonitoria.NrCpfMonitor, alignment: 'left', style: 'content' },
                { text: item.ReciboMonitoria.NrCheque, alignment: 'left', style: 'content' },
                { text: item.ReciboMonitoria.VlTotalS, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.RecibosGlosados.length; i++) {
            tbRecibo[i].pop();
        }

          tbFinal.push(tbEscola);

    } else {
            tbFinal.push(tbFde);

    }
    for (var i = 0; i <= tbRecibo.length; i++) {
        tbFinal.push(tbRecibo[i]);;
    }

    if (tbRecibo.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
}
function formatarColunasGridRecibo(config) {
    var _tamanhoColunaMotivoGlosa;

    var tamanhoColunas = [60, 130, 80, 60,60, 200, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridRpa(config) {
  
    var tbRpa = [];
    var tbFinal = [];
    var tbFde = [{ text: 'RPA', style: 'header', colSpan: 8, alignment: 'center' }, {}, {}, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'RPA', style: 'header', colSpan: 7, alignment: 'center' }, {}, {}, {}, {}, {}, {}];
        tbRpa.push(
             [

                 { text: "Data", alignment: 'center', style: 'headerColuns' },
                 { text: "Nome", alignment: 'center', style: 'headerColuns' },
                 { text: "CPF", alignment: 'center', style: 'headerColuns' },
                 { text: "Nr. Cheque", alignment: 'center', style: 'headerColuns' },
                 { text: "Valor", alignment: 'center', style: 'headerColuns' },
                 { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
                 { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
                 { text: "Analista", alignment: 'center', style: 'headerColuns' }
             ]

            );

        for (var i = 0; i < config.data.RpaGlosadas.length; i++) {
            var item = config.data.RpaGlosadas[i];
            tbRpa.push(
                [
                    { text: item.Rpa.StrDtRpa, alignment: 'left', style: 'content' },
                    { text: item.Rpa.Fornecedor.DsRazaoSocial, alignment: 'left', style: 'content' },
                    { text: item.Rpa.Fornecedor.NrCnpj, alignment: 'left', style: 'content' },
                    { text: item.Rpa.NrChequeVlPago, alignment: 'left', style: 'content' },
                    { text: item.Rpa.VlPagoS, alignment: 'left', style: 'content' },
                    { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                    { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                    { text: item.NmUsuario, alignment: 'left', style: 'content' },

                ]
            );
        }
        if (config.data.PerfilEscola) {
            for (var i = 0; i <= config.data.RpaGlosadas.length; i++) {
                tbRpa[i].pop();
            }
            tbFinal.push(tbEscola);
        }
        else {

            tbFinal.push(tbFde);
        }
        for (var i = 0; i <= tbRpa.length; i++) {
            tbFinal.push(tbRpa[i]);;
        }

        if (tbRpa.length > 0) {
            tbFinal.pop();
        }
        return tbFinal;

}
function formatarColunasGridRpa(config) {
    var tamanhoColunas = [];
    
        tamanhoColunas = [60, 150, 80, 60, 60, 200, '*', '*'];
        if (config.data.PerfilEscola) {
            tamanhoColunas.pop();
        }

    return tamanhoColunas;
}

function montarGridReciboCartorio(config) {
    var tbReciboCartorio = [];

    var tbFinal = [];
    var tbFde = [{ text: 'RECIBO CARTÓRIO', style: 'header', colSpan: 9, alignment: 'center' }, {}, {}, {}, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'RECIBO CARTÓRIO', style: 'header', colSpan: 8, alignment: 'center' }, {}, {}, {}, {}, {}, {}, {}];
    tbReciboCartorio.push(
     [

         { text: "Data", alignment: 'center', style: 'headerColuns' },
         { text: "Nr. Recibo", alignment: 'center', style: 'headerColuns' },
         { text: "CNPJ", alignment: 'center', style: 'headerColuns' },
         { text: "Fornecedor", alignment: 'center', style: 'headerColuns' },
         { text: "Nr. Cheque", alignment: 'center', style: 'headerColuns' },
         { text: "Valor", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.ReciboCartorioGlosados.length; i++) {
        var item = config.data.ReciboCartorioGlosados[i];
        tbReciboCartorio.push(
            [
                { text: item.ReciboCartorio.StrData, alignment: 'left', style: 'content' },
                { text: item.ReciboCartorio.NrRecibo, alignment: 'left', style: 'content' },
                { text: item.ReciboCartorio.Cnpj, alignment: 'left', style: 'content' },
                { text: item.ReciboCartorio.Fornecedor, alignment: 'left', style: 'content' },
                { text: item.ReciboCartorio.NrCheque, alignment: 'left', style: 'content' },
                { text: item.ReciboCartorio.VlTotalS, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.ReciboCartorioGlosados.length; i++) {
            tbReciboCartorio[i].pop();
        }
 
            tbFinal.push(tbEscola);
    }
    else {       
            tbFinal.push(tbFde);
    }

    for (var i = 0; i <= tbReciboCartorio.length; i++) {
        tbFinal.push(tbReciboCartorio[i]);;
    }

    if (tbReciboCartorio.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
  
}
function formatarColunasGridReciboCartorio(config) {
    var _tamanhoColunaMotivoGlosa;

    var tamanhoColunas = [60, 60, 80, 110, 60, 60, 200, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridRendimentos(config) {
    var tbRendimentos = [];

    var tbFinal = [];
    var tbFde = [{ text: 'RENDIMENTOS', style: 'header', colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'RENDIMENTOS', style: 'header', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}];

    tbRendimentos.push(
     [
         { text: "Data Movimento", alignment: 'center', style: 'headerColuns' },
         { text: "Valor (C)", alignment: 'center', style: 'headerColuns' },
         { text: "Valor (K)", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.RendimentosGlosados.length; i++) {
        var item = config.data.RendimentosGlosados[i];
        tbRendimentos.push(
            [
                { text: item.Rendimentos.StrDtRendimento, alignment: 'left', style: 'content' },
                { text: item.Rendimentos.StrCusteio, alignment: 'left', style: 'content' },
                { text: item.Rendimentos.StrCapital, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.RendimentosGlosados.length; i++) {
            tbRendimentos[i].pop();
        }

            tbFinal.push(tbEscola);
        
      } else {

             tbFinal.push(tbFde);
           }
    for (var i = 0; i <= tbRendimentos.length; i++) {
        tbFinal.push(tbRendimentos[i]);;
    }

    if (tbRendimentos.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;

  
}
function formatarColunasGridRendimentos(config) {
    var tamanhoColunas = [60, 60, 60, 370, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridDocs(config) {
    var tbDocs = [];
    var tbFinal = [];
    var tbFde = [{ text: 'DOCUMENTOS EXIGIDOS', style: 'header', colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'DOCUMENTOS EXIGIDOS', style: 'header', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}];
    tbDocs.push(
     [
         { text: "Documento", alignment: 'center', style: 'headerColuns' },
         { text: "Recebido", alignment: 'center', style: 'headerColuns' },
         { text: "Aprovado", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.DocumentosGlosados.length; i++) {
        var item = config.data.DocumentosGlosados[i];
        tbDocs.push(
            [
                { text: item.DocumentosExigidos.DocumentosExigidos.Documento.NmDocumento, alignment: 'left', style: 'content' },
                { text: item.DocumentosExigidos.StrFlRecebido, alignment: 'left', style: 'content' },
                { text: item.DocumentosExigidos.StrFlDocAprovado, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.DocumentosGlosados.length; i++) {
            tbDocs[i].pop();
        }

            tbFinal.push(tbEscola);
        
        } else {

            tbFinal.push(tbFde);
    }
    for (var i = 0; i <= tbDocs.length; i++) {
        tbFinal.push(tbDocs[i]);;
    }

    if (tbDocs.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
}
function formatarColunasGridDocs(config) {
    var tamanhoColunas = [150, 50, 50, 270, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridOutrasSaidas(config) {
    var tbOutrasSaidas = [];
    var tbFinal = [];
    var tbFde = [{ text: 'OUTRAS SAÍDAS', style: 'header', colSpan: 8, alignment: 'center' }, {}, {}, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'OUTRAS SAÍDAS', style: 'header', colSpan: 7, alignment: 'center' }, {}, {}, {}, {}, {}, {}];
    tbOutrasSaidas.push(
     [
         { text: "Tipo", alignment: 'center', style: 'headerColuns' },
         { text: "Item", alignment: 'center', style: 'headerColuns' },
         { text: "Nr. Cheque", alignment: 'center', style: 'headerColuns' },
         { text: "Data do Cheque", alignment: 'center', style: 'headerColuns' },
         { text: "Valor", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.OutrasSaidasGlosadas.length; i++) {
        var item = config.data.OutrasSaidasGlosadas[i];
        tbOutrasSaidas.push(
            [
                { text: item.TributosGDAE.DsTributo, alignment: 'left', style: 'content' },
                { text: item.TributosGDAE.DsItem, alignment: 'left', style: 'content' },
                { text: item.TributosGDAE.NrCheque, alignment: 'left', style: 'content' },
                { text: item.TributosGDAE.StrDtCheque, alignment: 'left', style: 'content' },
                { text: item.TributosGDAE.StrVlTributo, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.OutrasSaidasGlosadas.length; i++) {
            tbOutrasSaidas[i].pop();
        }

        tbFinal.push(tbEscola);

    } else {
      
            tbFinal.push(tbFde);
    }
    for (var i = 0; i <= tbOutrasSaidas.length; i++) {
        tbFinal.push(tbOutrasSaidas[i]);;
    }

    if (tbOutrasSaidas.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
}
function formatarColunasGridOutrasSaidas(config) {
    var tamanhoColunas = [60, 60, 60, 60, 60, 300, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridDevolucaoRecursos(config) {
    var tbDevolucao = [];
    var tbFinal = [];
    var tbFde = [{ text: 'DEVOLUÇÃO DE RECURSOS', style: 'header', colSpan: 7, alignment: 'center' }, {}, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'DEVOLUÇÃO DE RECURSOS', style: 'header', colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}];


    tbDevolucao.push(
     [
         { text: "Data", alignment: 'center', style: 'headerColuns' },
         { text: "Valor Capital", alignment: 'center', style: 'headerColuns' },
         { text: "Valor Custeio", alignment: 'center', style: 'headerColuns' },
         { text: "Total", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.DevolucaoGlosadas.length; i++) {
        var item = config.data.DevolucaoGlosadas[i];
        tbDevolucao.push(
            [
                { text: item.DevolucaoRecursos.StrDtDevolucao, alignment: 'left', style: 'content' },
                { text: item.DevolucaoRecursos.StrVlDevCapital, alignment: 'left', style: 'content' },
                { text: item.DevolucaoRecursos.StrVlDevCusteio, alignment: 'left', style: 'content' },
                { text: item.DevolucaoRecursos.StrValorDevolucao, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.DevolucaoGlosadas.length; i++) {
            tbDevolucao[i].pop();
        }
        tbFinal.push(tbEscola);
    } else {     
            tbFinal.push(tbFde);
    }
    for (var i = 0; i <= tbDevolucao.length; i++) {
        tbFinal.push(tbDevolucao[i]);;
    }

    if (tbDevolucao.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
}
function formatarColunasGridDevolucao(config) {
    var tamanhoColunas = [60, 60,60,60, 270, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridRecP(config) {
    var tbRec = [];
    var tbFinal = [];
    var tbFde = [{ text: 'RECURSOS PRÓPRIOS', style: 'header', colSpan: 7, alignment: 'center' }, {}, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'RECURSOS PRÓPRIOS', style: 'header', colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}];
    tbRec.push(
     [
         { text: "Data", alignment: 'center', style: 'headerColuns' },
         { text: "Valor Capital", alignment: 'center', style: 'headerColuns' },
         { text: "Valor Custeio", alignment: 'center', style: 'headerColuns' },
         { text: "Total", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.RecursosPropriosGlosados.length; i++) {
        var item = config.data.RecursosPropriosGlosados[i];
        tbRec.push(
            [
                { text: item.RecursosProprios.StrDtInclusao, alignment: 'left', style: 'content' },
                { text: item.RecursosProprios.StrCapital, alignment: 'left', style: 'content' },
                { text: item.RecursosProprios.StrCusteio, alignment: 'left', style: 'content' },
                { text: item.RecursosProprios.StrTotal, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.RecursosPropriosGlosados.length; i++) {
            tbRec[i].pop();
        }

            tbFinal.push(tbEscola);
       

    } else {
   
            tbFinal.push(tbFde);
        
    }
    for (var i = 0; i <= tbRec.length; i++) {
        tbFinal.push(tbRec[i]);;
    }

    if (tbRec.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
}
function formatarColunasGridRecP(config) {
    var tamanhoColunas = [60, 60, 60, 60, 270, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

