function RetornaInformacoesDocumento(documento, data) {
    

}

// Todo documento novo deve ser adicionado : Banco de dados, No ENUM no COFI
var DOCS = {
    Quadro_Comparativo_de_Precos_Referencial_CADTERC: { value: 1, name: "Quadro Comparativo de Preços - Referencial do CADTERC" },
    Quadro_Comparativo_Precos: { value: 2, name: "Quadro Comparativo de Preços" },
    Despacho_Gestor_Autorizacao_Autoridade: { value: 3, name: "Despacho do Gestor e Autorização de Autoridade" },
    Solicita_Manifestacao_Contratada_Documento_Habilitacao: { value: 4, name: "Solicita manifestação da Contratada e Documento de Habilitação" },
    Recebimento__Manifestacao_Contratada: { value: 5, name: "Recebimento da Manifestação da Contratada" },
    Quadro_Demonstrativo_Valores_Prorrogacao_Cronograma_Desembolso: { value: 6, name: "Quadro Demonstrativo de Valores para Prorrogação e Cronograma de Desembolso" },
    Despacho_Nucleo_Financas: { value: 7, name: "Despacho do Núcleo de Finanças" },
    Informacao_Sobre_Lei_Responsabilidade_Fiscal: { value: 8, name: "Informação Sobre a Lei de Responsabilidade Fiscal" },
    Declaracao_Autoridade_Competente: { value: 9, name: "Declaração da Autoridade Competente" },
    Minuta_Termo_Prorrogacao_Contratos_Servicos_Continuos: { value: 10, name: "Minuta de Termo de Prorrogação de Contratos de Serviços Contínuos" },
    Despacho_Encaminhamento: { value: 11, name: "Despacho de Encaminhamento" },
    Solicita_Manifestacao_Contratada_Com_Renegociacao: { value: 12, name: "Solicita manifestação da Contratada com Renegociação" },
    Informacao_Encerramento_Contratual_Contratada_Sem_Interesse: { value: 13, name: "Informação de Encerramento Contratual | Contratada sem Interesse" },
    Despacho_Gestor_Autorizacao_Da_Autoridade_Com_Renegociacao: { value: 14, name: "Despacho do Gestor e Autorização da Autoridade(Com Renegociação)" },
    Gerar_Check_List: { value: 15, name: "Gerar Check List" },
    Nova_Proposta_Preco: { value: 16, name: "Nova Proposta de Preço" },
    Minuta_Termo_de_Encerramento_do_Contrato: { value: 17, name: "Minuta Termo de Encerramento do Contrato" },
    Informacao_de_Encerramento_Contratual_por_Nao_Renegociacao: { value: 18, name: "Informação de Encerramento Contratual por Não Renegociação" }
};

var StatusConvenioProrrogacao = {
    Iniciar_Prorrogacao: { value: 0, name: "Iniciar Prorrogação" },
    EmAndamento: { value: 1, name: "Em Andamento" },
    EncaminhadoAoCCONT: { value: 2, name: "Encaminhado ao CCONT" },
    EmAnalise: { value: 3, name: "Em Análise" },
    EncaminhadoACJ: { value: 4, name: "Encaminhado à CJ" },
    Encerrado: { value: 5, name: "Encerrado" },
    Aprovado: { value: 6, name: "Aprovado" },
    Reprovado: { value: 7, name: "Reprovado" }
};