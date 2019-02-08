$(document).ready(function () {
    $("#controleDeAbas").sedTabControl({ embutida: true });
    $("#controleDeAbas2").sedTabControl({ embutida: true });
    AplicarMascaras();
});

function ImprimirPDFCadastro() {
    var d = JSON.parse($("#hdnCadastroPDF").val());

    var descCodigo = "";

    switch (d.StatusCodigo) {
        case 1 : descCodigo = "Cadastrado"; break;
        case 2 : descCodigo = "Homologado"; break;
        case 3 : descCodigo = "Cadastro Devolvido"; break;
        case 4 : descCodigo = "Aceito"; break;
        case 5 : descCodigo = "Em Retificação"; break;
        case 6 : descCodigo = "Retificado"; break;
        case 7 : descCodigo = "Extinguindo Contrato/Dispensa"; break;
        case 8 : descCodigo = "Contrato Extinto Homologado"; break;
        case 9 : descCodigo = "Contrato Extinto Devolvido"; break;
        case 10 : descCodigo = "Dispensado/Extinto"; break;
        case 11 : descCodigo = "Publicado"; break;
        case 13 : descCodigo = "Rejeitado"; break;
        case 14 : descCodigo = "Tornando sem Efeito o Contrato"; break;
        case 60 : descCodigo = "Suspenso"; break;
        case 16 : descCodigo = "Tornando sem Efeito a Extinção"; break;
        case 17 : descCodigo = "Tornado sem Efeito a Extinção"; break;
    }

    GerarPDF(d, descCodigo);
}

function GerarPDF(data, descStatus) {
    var config = {
        pageOrientation: "portrait", // Outra opção é "portrait"


        pageSize: "A4", 
        pageMargins: [20, 20, 20, 20],
        title: "Cadastro Eventual",
    };

    // Passo 2: ajustar as configurações
    sedPdfExporter.normalizeConfig(config);
    config.ValidaTexto = function (x) {

        if (x == null)
            return "";

        if (x == undefined)
            return "";

        return x;
    };
    config.debug = true;
    config.data = data;
    config.descStatus = descStatus;
    config.docGenerator = function (config) {

        config.pageMargins = [20, 100, 20, 110];


        var content = [];

        content.push({ text: 'Dados Pessoais', style: 'h1' });

        //Dados Pessoais
        content.push({ text: [{ text: 'RG: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.RgNumero) + '-' + config.ValidaTexto(config.data.RgDigito) + ' /' + config.ValidaTexto(config.data.RgUf) + ' \n\n' }] });
        content.push({ text: [{ text: 'CPF: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Cpf) + ' \n\n' }] });
        content.push({ text: [{ text: 'Nome do Docente: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Nome) + ' \n\n' }] });
        content.push({ text: [{ text: 'Função atividade: ', style: 'bold' }, { style: 'texto', text: '6407 – Professor Educação Básica I \n\n' }] });
        content.push({ text: [{ text: 'Faixa/Nível: ', style: 'bold' }, { style: 'texto', text: '01 - I \n\n' }] });

        if (config.data.Status == 3) //Enumerador.EventualEnumerador.CadastroDevolvido
        {
            content.push({ text: 'Motivo de Devolução', style: 'h1' });

            content.push({ text: [{ text: 'Observações: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Observacao) + ' \n\n' }] });
        }

        //Dados do Eventual
        content.push({ text: 'Dados do Eventual', style: 'h1' });

        content.push({ text: [{ text: 'Ano Exercício: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.AnoExercicio) + ' \n\n' }] });
        content.push({ text: [{ text: 'Diretoria: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.NomeDiretoria) + ' \n\n' }] });
        content.push({ text: [{ text: 'Escola: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.NomeEscola) + ' \n\n' }] });
        content.push({ text: [{ text: 'Município: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.MunicipioConcat) + ' \n\n' }] });
        content.push({ text: [{ text: 'Contrato/Portaria: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.NumeroPortariaAdmissaoSequencia) + ' / ' + config.ValidaTexto(config.data.NumeroPortariaAdmissaoDiretoria) + ' / ' + config.ValidaTexto(config.data.NumeroPortariaAdmissaoAno) + ' \n\n' }] });
        content.push({ text: [{ text: 'Data de Publicação: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.DataPublicacaoDoeStr) + ' \n\n' }] });

        //Dados Funcionais
        content.push({ text: 'Dados Funcionais', style: 'h1' });

        //Acumulação/ Ato Decisório
        content.push({ text: 'Acumulação', style: 'h3' });

        content.push({ text: [{ text: 'Local: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Acumulacao.NomeLocal) + ' \n\n' }] });
        content.push({ text: [{ text: 'Município: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Acumulacao.NomeMunicipio) + ' \n\n' }] });
        content.push({ text: [{ text: 'Denominação: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Acumulacao.DescricaoAcumulacao) + ' \n\n' }] });
        content.push({ text: [{ text: 'Cargo: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Acumulacao.NomeCargo) + ' \n\n' }] });

        //Ato Decisório
        content.push({ text: 'Ato Decisório', style: 'h3' });

        content.push({ text: [{ text: 'Ano: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.AtoDecisorio.AnoStr) + ' \n\n' }] });
        content.push({ text: [{ text: 'Número: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.AtoDecisorio.CodigoStr) + ' \n\n' }] });
        content.push({ text: [{ text: 'Data DOE: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.AtoDecisorio.DataDoeStr) + ' \n\n' }] });

        //Conta Bancaria
        content.push({ text: 'Conta Bancária', style: 'h3' });

        content.push({ text: [{ text: 'Banco: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.ContaBancaria.CodigoBanco) + ' \n\n' }] });
        content.push({ text: [{ text: 'Agência: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.ContaBancaria.CodigoAgencia) + ' \n\n' }] });
        content.push({ text: [{ text: 'Número Conta: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.ContaBancaria.NumeroConta) + ' \n\n' }] });
        content.push({ text: [{ text: 'DC da Conta: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.ContaBancaria.DigitoConta) + ' \n\n' }] });

        //Dados Extinção/Dispensa
        if(
                config.data.Status == 10 || 
                config.data.Status == 8 || 
                config.data.Status == 65 || 
                config.data.Status == 69
          ) 
        {
            content.push({ text: 'Dados Extinção/Dispensa', style: 'h1' });

            content.push({ text: [{ text: 'Data da Extinção/Dispensa: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.DataVigenciaDispensaStr) + ' \n\n' }] });
            content.push({ text: [{ text: 'Motivo: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.MotivoDispensaStr) + ' \n\n' }] });
            content.push({ text: [{ text: 'Data de Publicação da Extinção: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.DataPublicacaoDispensaStr) + ' \n\n' }] });
            content.push({ text: [{ text: 'Publicação DOE PORT/CTD: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.DataPublicacaoDoeStr) + ' \n\n' }] });

            if (!config.data.StatusDispensaAntigo) {
                content.push({ text: [{ text: 'Período Contratual De: ', style: 'bold' }, { style: 'texto', text: (config.ValidaTexto(config.data.Model.DataRetificaoVigenciaStr) == "" ? "" : config.ValidaTexto(config.data.DataInicioExercicioStr)) + ' \n\n' }] });
                content.push({ text: [{ text: 'Retificação Período Contratual De: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.DataRetificaoVigenciaStr) + ' \n\n' }] });
            }
        }

        if(
                config.data.Status == 6 ||
                config.data.Status == 61
            ) {
            //Dados Retificação UA
            content.push({ text: 'Alteração de sede', style: 'h1' });

            content.push({ text: [{ text: 'UA Anterior: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Retificacao.UAConcatAnterior) + ' \n\n' }] });
            content.push({ text: [{ text: 'Município Anterior: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Retificacao.MunicipioAnteriorConcat) + ' \n\n' }] });
            content.push({ text: [{ text: 'Data Início (Nova UA): ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Retificacao.DataInicioUAStr) + ' \n\n' }] });
            content.push({ text: [{ text: 'Data Publicação (Nova UA): ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.Retificacao.DataPublicaoStr) + ' \n\n' }] });
            content.push({ text: [{ text: 'Diretoria (Nova UA): ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.NomeDiretoria) + ' \n\n' }] });
            content.push({ text: [{ text: 'Nova UA: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.UAConcat) + ' \n\n' }] });
            content.push({ text: [{ text: 'Município (Nova UA): ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.MunicipioConcat) + ' \n\n' }] });

        }

        //Dados Contrato
        content.push({ text: 'Dados do Contrato', style: 'h1' });

        content.push({ text: [{ text: 'Início Exercício: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.DataInicioExercicioStr) + ' \n\n' }] });
        content.push({ text: [{ text: 'Publicação DOE: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.DataPublicacaoDoeStr) + ' \n\n' }] });
        content.push({ text: [{ text: 'Data Fim Contrato: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.DataFimContratoStr) + ' \n\n' }] });
        content.push({ text: [{ text: 'Data do Contrato Retificada: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.data.DataRetificaoVigenciaStr) + ' \n\n' }] });
        content.push({ text: [{ text: 'Data Publicação Retificação: ', style: 'bold' }, { style: 'texto', text: (config.ValidaTexto(config.data.DataPublRetifVigenciaStr) == "" ? "" : config.ValidaTexto(config.data.DataPublRetifVigenciaStr)) + ' \n\n' }] });
        content.push({ text: [{ text: 'Status: ', style: 'bold' }, { style: 'texto', text: config.ValidaTexto(config.descStatus) + ' \n\n' }] });

        var doc = {
            header: config.sedHeader,
            footer: config.sedFooter,
            content: content,
            styles: {
                bold: {
                    bold: true,
                    fontSize: 10
                },
                texto: {
                    bold: false,
                    fontSize: 10
                },
                center: {
                    fontSize: 8,
                    alignment: 'center',
                },
                h1: {
                    alignment: 'center',
                    bold: true,
                    fontSize: 12,
                    margin: [0, 0, 0, 8]
                },
                h3: {
                    alignment: 'center',
                    bold: true,
                    fontSize: 11,
                    margin: [0, 0, 0, 5]
                },
                header: {
                    bold: true,
                    alignment: 'center',
                    fontSize: 8
                }
            }
        };
        return doc;
    };

    // Passo 4: gerar e exportar o PDF
    // * Atenção!!!
    // * O objeto config NÃO pode conter NENHUMA function, com exceção da function docGenerator!!!
    // * Se o objeto config possuir mais uma function, direta ou indiretamente, o processo falhará!!!
    // * Outras functions só são permitidas DENTRO do corpo da function docGenerator!!!
    sedPdfExporter.exportPdf(config);
}