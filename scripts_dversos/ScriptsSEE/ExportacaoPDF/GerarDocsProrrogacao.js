//// QUADRO COMPARATIVO DE PREÇOS --
function obterquadroComparativoDePrecos(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    ;
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            gerarquadroComparativoDePrecos(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}


//// INFORMAÇÃO DE ENCERRAMENTO CONTRATUAL POR NÃO RENEGOCIAÇÃO --
function obterInformeEncerrContratualPorNaoReneg(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    ;
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {

            gerarInformeEncerrContratualPorNaoReneg(data);

        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// MINUTA TERMO DE ENCERRAMENTO DO CONTRATO --
function obterminutaEncerramentoContrato(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {

            gerarminutaEncerramentoContrato(data);

        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// INFORMAÇÃO SOBRE A LEI DE RESPONSABILIDADE FISCAL -- 
function obterinformacaoResponsabilidadeFiscal(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {

            gerarinformacaoResponsabilidadeFiscal(data);

        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// DESPACHO DO NÚCLEO DE FINANÇAS --
function obterdespachoNucleoFinancas(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": 6, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            
            gerardespachoNucleoFinancas(data);

        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// DESPACHO DE ENCAMINHAMENTO --
function obterdespachoEncaminhamento(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        $.ajax({
            cache: false,
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: Acao,
            data: JSON.stringify({ "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }),
            type: 'POST',
            success: function (data) {

                gerardespachoEncaminhamento(data);

            },
            contentType: 'application/json; charset=utf-8',
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }
    else {
        mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
    }
}

//// -- DECLARAÇÃO DA AUTORIDADE COMPETENTE --
// MODELO 08 PARA CONTRATOS DE SERVIÇOS E
// MODELO 09 PARA CONTRATOS DE LOCAÇÃO DE IMÓVEIS
function obterdeclaracaoAutoridadeCompetente(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            gerardeclaracaoAutoridadeCompetente(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// INFORMAÇÃO DE ENCERRAMENTO CONTRATUAL --
function obterInformeEncerrContratual(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            gerarInformeEncerrContratual(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// DESPACHO DO GESTOR E AUTORIZAÇÃO DA AUTORIDADE (SEM RENEGOCIAÇÃO) --
function obterdespachoGestorAutorizacaoAutoridadeSemReneg(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    debugger;
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",            
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao" : idProrrogacao }
        }).done(function (data) {
            gerardespachoGestorAutorizaAutoridadeSemReneg(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// DESPACHO DO GESTOR E AUTORIZAÇÃO DA AUTORIDADE (COM RENEGOCIAÇÃO) --
function obterdespachoGestorAutorizacaoAutoridadeComReneg(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            gerardespachoGestorAutorizaAutoridadeComReneg(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// SOLICITA MANIFESTAÇÃO DA CONTRATADA E DOCUMENTOS DE HABILITAÇÃO (SEM RENEG) --
function obterSolicitaManifestaContratadaDocsHabilitacaoSemReneg(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            gerarsolicitaManifestaContratadaDocsHabilitacaoSemReneg(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// SOLICITA MANIFESTAÇÃO DA CONTRATADA E DOCUMENTOS DE HABILITAÇÃO (COM RENEG) --
function obterSolicitaManifestaContratadaDocsHabilitacaoComReneg(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            gerarsolicitaManifestaContratadaDocsHabilitacaoComReneg(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// MINUTA DE TERMO DE PRORROGAÇÃO DE CONTRATOS DE SERVIÇOS CONTÍNUOS --
function obtermodelo010_MinutaTermoProrroga(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": 6, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            gerarmodelo010_MinutaTermoProrroga_2(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// PLANILHA DEMONSTRATIVA VALORES PRORROGAÇÃO --
function obterplanilhaDemonstraValsProrroga(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            gerarplanilhaDemonstraValsProrroga(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// CHECK LIST --
function obterCheckList(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {

            gerarCheckList(data);

        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}

//// QUADRO COMPARATIVO DE PREÇOS - REFERENCIAL CADTERC
function obterReferencialCADTERC(IdContrato, IdProrrogacaoDocumento, idProrrogacao, Acao) {
    debugger;
    if (IdContrato != 0) {
        var action = Acao;
        $.ajax({
            type: "POST",
            url: action,
            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento, "idProrrogacao": idProrrogacao }
        }).done(function (data) {
            gerarReferencialCADTERC(data);
        }).fail(function (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        });
    }
}




//// ENCAMINHA PARA DE AUTORIZA PRORROGAÇÃO
//function obterEncaminhaParaDEAutorizadaProrrogacao(IdContrato, IdProrrogacaoDocumento, Acao) {
//    
//    if (IdContrato != 0) {
//        var action = Acao;
//        $.ajax({
//            type: "POST",
//            url: action,
//            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento }
//        }).done(function (data) {
//            gerarEncaminhaParaDEAutorizadaProrrogacao(data);
//        }).fail(function (e) {
//            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
//        });
//    }
//}

//// ENCAMINHA PARA ANÁLISE DA CJ
//function obterEncaminhaParaAnaliseCJ(IdContrato, IdProrrogacaoDocumento, Acao) {
//    
//    if (IdContrato != 0) {
//        var action = Acao;
//        $.ajax({
//            type: "POST",
//            url: action,
//            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento }
//        }).done(function (data) {
//            gerarEncaminhaParaAnaliseCJ(data);
//        }).fail(function (e) {
//            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
//        });
//    }
//}

////// ENCAMINHA PARA DE APÓS RETORNO DA CJ
//function obterEncaminhaParaDEAposRetornoCJ(IdContrato, IdProrrogacaoDocumento, Acao) {
//    
//    if (IdContrato != 0) {
//        var action = Acao;
//        $.ajax({
//            type: "POST",
//            url: action,
//            data: { "IdContrato": IdContrato, "IdProrrogacaoDocumento": IdProrrogacaoDocumento }
//        }).done(function (data) {
//            gerarEncaminhaParaDEAposRetornoCJ(data);
//        }).fail(function (e) {
//            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
//        });
//    }
//}

