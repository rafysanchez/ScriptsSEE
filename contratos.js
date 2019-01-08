var podeGravarContrato = false;
var modoEdicao = false;
var podeEditarContrato = true;
var tributosParaExibicao = '';
var solicitacoesBloqueadas = [];//monta uma lista das solicitacoes ja gravadas para o contrato,  e que nao podem ser removidas
var empenhosBloqueados = [];//lista dos empenhos ja gravados para o contrato,  e que nao podem ser removidos

//retorna um valor float em formato dinheiro; parametros: c=casas decimais, d=separador decimal, t=separador milhar
Number.prototype.formatMoney = function (c, d, t) {

    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function moedaParaNumero(valor) {
    _valor = valor;
    try {
        _valor = valor.split(".").join("");
    } catch (e) { }
    try {
        _valor = _valor.split(",").join(".");
    } catch (e) { }

    _valor = parseFloat(_valor);

    return _valor;
}

function exibeCombosSolicitacoes() {
    //var _nrosSolicitacoes = $('#solicitacaoDeRecursos').val().split("-");
    var _nrosSolicitacoes = $("#ListSolicitacoesIds").val().split(";");
    var idSolicitacao = "";

    $("[name='comboSolicitacoes']").each(function () {

        var options = '<option value="0" selected="selected">selecione</option>';

        for (var i = 0; i < _nrosSolicitacoes.length; i++) {
            idSolicitacao = _nrosSolicitacoes[i].split("/")[0];

            if (idSolicitacao.trim() != "") {
                options += '<option value="' + idSolicitacao + '">' + idSolicitacao + '</option>';
            }
        }
        $(this).append(options);

    });
}

function somaEmpenhosVinculadosAUmaSolicitacao(listaSolicitacoesEmpenhos, solicitacaoParametro) {

    var listaEmpenhosSolicitacao = listaSolicitacoesEmpenhos;
    var idEmpenho = "";
    var solicitacaoDoEmpenho = "";
    var valorEmpenho = 0;
    var valorTotalEmpenhoSolicitacao = 0;
   
    //procura na lista pelas solicitacoes iguais à solicitacaoParametro
    for (var cont = 0; cont < listaEmpenhosSolicitacao.length; cont++)
    {
        if (listaEmpenhosSolicitacao[cont] != null)
        {
            idEmpenho = listaEmpenhosSolicitacao[cont].split("/")[0];
            solicitacaoDoEmpenho = listaEmpenhosSolicitacao[cont].split("/")[1];

            if (solicitacaoDoEmpenho == solicitacaoParametro)
            {
                valorEmpenho = listaEmpenhosSolicitacao[cont].split("/")[2];
                valorTotalEmpenhoSolicitacao = somaDinheiro(valorTotalEmpenhoSolicitacao, valorEmpenho);
            }
        }
    }

    return valorTotalEmpenhoSolicitacao;
}
//Compara a soma dos valores dos empenhos vinculados a uma solicitacao com o valor desta solicitacao; 
//A soma dos empenhos deve ser menor que o valor da solicitacao.
//RESULTADO: TRUE se a soma dos empenhos for menor que a solicitacao. FALSE soma dos empenhos for maior que a solicitacao. 
//PARAMETRO: listaSolicitacoesEmpenhos(array), id solicitacao
function verificaSeSomaDosEmpenhosUltrapassaSolicitacao(listaSolicitacoesEmpenhos, solicitacaoParametro)
{
    valorTotalEmpenhoSolicitacao = somaEmpenhosVinculadosAUmaSolicitacao(listaSolicitacoesEmpenhos, solicitacaoParametro);
    
    valorTotalEmpenhoSolicitacao = moedaParaNumero(valorTotalEmpenhoSolicitacao);
    var valorSolicitacao = moedaParaNumero( retornaValorSolicitacao(solicitacaoParametro) );

    var result = valorTotalEmpenhoSolicitacao <= Math.abs(valorSolicitacao);
    return result;
}

//Retorna o valor de uma solicitacao vinculada ao contrato
function retornaValorSolicitacao(solicitacaoParametro)
{
    var solicitacoes = $("#ListSolicitacoesIds").val().split(";");
    var valorSolicitacao = "";

    for (var cont = 0; cont < solicitacoes.length; cont++)
    {
        var idSolicitacao = solicitacoes[cont].split("/")[0];

        //se encontrar a solicitacao pesquisada, retorna seu valor
        if (idSolicitacao == solicitacaoParametro)
        {
            valorSolicitacao = solicitacoes[cont].split("/")[1];
            break;
        }
        valorSolicitacao;
        //return moedaParaNumero(valorSolicitacao);
    }
    return valorSolicitacao;
}

//Retorna o valor (sem sinal) de uma solicitacao vinculada ao contrato
function retornaValorAbsolutoSolicitacao(solicitacaoParametro)
{
    var solicitacoes = $("#ListSolicitacoesIds").val().split(";");
    var valorSolicitacao = "";

    for (var cont = 0; cont < solicitacoes.length; cont++)
    {
        var idSolicitacao = solicitacoes[cont].split("/")[0];

        //se encontrar a solicitacao pesquisada, retorna seu valor
        if (idSolicitacao == solicitacaoParametro)
        {            
            valorSolicitacao = moedaParaNumero( solicitacoes[cont].split("/")[1] );
            valorSolicitacao = Math.abs(valorSolicitacao);
            valorSolicitacao = valorSolicitacao.formatMoney("2", ",", ".");
            break;
        }
        valorSolicitacao;
        //return moedaParaNumero(valorSolicitacao);
    }
    return valorSolicitacao;
}

//Subtrati o valor de um empenho do valor total dos empenho agrupados sob uma solicitacao
function subtraiValorDoEmpenhoDoValorTotalDoGrupoDeEmpenhos(idDivEmpenhosPorSolicitacaoItem, valor) {

    var divEmpenho = $("#" + idDivEmpenhosPorSolicitacaoItem);
    //pega a div do grupo do qual o empenho faz parte
    //var divGrupo = $(divEmpenho).closest("[name='cabecalhoDivEmpenhoSolicitacao']");
    //var divGrupo = $(divEmpenho).parent().next("[name='cabecalhoDivEmpenhoSolicitacao']");
    var divGrupo = $(divEmpenho).parent().siblings("[name='cabecalhoDivEmpenhoSolicitacao']");

    //valor total registrado até o momento
    var campoValorTotal = $(divGrupo).find("#valorTotal");
    var total = $(campoValorTotal).html();
    //subtrai o valor do empenho do total
    total = subtraiDinheiro(total, valor);
    //escreve o valor totaL no cabecalho do gurpo
    $(divGrupo).find("#valorTotal").html(total);
}

function adicionaGrupoDeEmpenhosAoDisplayEmpenhos(idDivEmpenhosPorSolicitacao,_solicitacao)
{
    var divEmpenhosPorSolicitacao = "";
    //retorna div para o grupo de empenhos da solicitacao
    divEmpenhosPorSolicitacao = retornaDivEmpenhosAgrupadosPorSolicitacao(idDivEmpenhosPorSolicitacao,_solicitacao);
    //insere a div no display de empenhos
    $("#displayEmpenhos").append(divEmpenhosPorSolicitacao);
}

function adicionaItemEmpenhoAoGrupoDeEmpenhos(idDivEmpenhosPorSolicitacaoItem, idNotaEmpenho, _solicitacao, numeroNotaEmpenho, credor, valor, idDivEmpenhosPorSolicitacao)
{
    var divEmpenhosPorSolicitacaoItem = "";
    /*INCLUINDO EMPENHOS NO GRUPO DE EMPENHOS POR SOLICITACAO*/
    //Verifica se o empenho ja esta no displayEmpenhos. Se estiver, remove                                      
    $("#displayEmpenhos").find("#" + idDivEmpenhosPorSolicitacaoItem).each(function ()
    {
        subtraiValorDoEmpenhoDoValorTotalDoGrupoDeEmpenhos(idDivEmpenhosPorSolicitacaoItem, valor);
        $(this).remove();
    })

    //Depois de remover o empenho, recria este empenho e recoloca no grupo                                            
    //Cria uma div de exibição para o novo empenho 
    divEmpenhosPorSolicitacaoItem = retornaDivEmpenhoPorSolicitacaoItem(idDivEmpenhosPorSolicitacaoItem, idNotaEmpenho, _solicitacao, numeroNotaEmpenho, credor, valor)

    //adiciona o empenho à div do grupo de empenhos da solicitacao correspondente
    $("#" + idDivEmpenhosPorSolicitacao).find("#conteudo_" + idDivEmpenhosPorSolicitacao).append(divEmpenhosPorSolicitacaoItem);
}

function retornaDivEmpenhosAgrupadosPorSolicitacao(idDivEmpenhosPorSolicitacao,_solicitacao) {
    var divEmpenhosAgrupadosPorSolicitacao = "";
    var classe = "";
    var classeIcone = "";
    var evento = retornaEventoDaSoliticao(_solicitacao);

    if (evento == "Repasse")
    {
        classe = "panel panel-success";
        classeIcone = "fa fa-check fa-3";        
    }
    else if(evento == "Estorno"){
        classe = "panel panel-danger";
        classeIcone = "fa fa-exclamation-triangle fa-3";
    }

    var grupo = $("#displayEmpenhos").find("#" + idDivEmpenhosPorSolicitacao);
    var icone = $("#displayEmpenhos").find("#icone_" + idDivEmpenhosPorSolicitacao);
    
    //Se o grupo nao existe, será criado
    if( $(grupo).length == 0 )
    {
        divEmpenhosAgrupadosPorSolicitacao = "<div id='" + idDivEmpenhosPorSolicitacao + "' name='divEmpenhosPorSolicitacao' class='"+classe+"'>";
        divEmpenhosAgrupadosPorSolicitacao += "<div id='cabecalho_" + idDivEmpenhosPorSolicitacao + "' name='cabecalhoDivEmpenhoSolicitacao' class='panel-heading'>";

        divEmpenhosAgrupadosPorSolicitacao += "<font id='rotulo' style='font-size:20px; margin:10px; top:20px;'>" + evento + "</font><hr/>";
        divEmpenhosAgrupadosPorSolicitacao += "<div class='container-fluid'><div class='row'><div class='col-sm-6'><label>Empenhos Vinculados à Solicitação " + _solicitacao + "</label> </div>";
        divEmpenhosAgrupadosPorSolicitacao += "<div class='col-sm-6'><label style='margin-left:111px;'>Total: R$</label> <label id='valorTotal'>0.000,00</label> <label id='mensagemAlerta' /></div></div></div>";
        divEmpenhosAgrupadosPorSolicitacao += "</div>";
        divEmpenhosAgrupadosPorSolicitacao += "<div id='conteudo_" + idDivEmpenhosPorSolicitacao + "' name='conteudo_divEmpenhosPorSolicitacao' class='panel-body' style='padding:0px;'></div>";
        divEmpenhosAgrupadosPorSolicitacao += "</div>";
    }
    //se já existe, a classe será alterada, indicando se o valor dos empenhos esta dentro ou fora do limite
    else {
        $(grupo).removeClass();
        $(grupo).addClass(classe);

        $(icone).removeClass();
        $(icone).addClass(classeIcone);
    }

    return divEmpenhosAgrupadosPorSolicitacao;
}

function retornaDivEmpenhoPorSolicitacaoItem(id, idNotaEmpenho, _solicitacao, numeroNotaEmpenho, credor, valor)
{
    
    var classe = "";
    if (empenhoEstaBloqueado(idNotaEmpenho)) {
        classe = "divBloqueada";
    } else {
        classe = 'bg-success text-white desbloqueada';
    }

    var idDivGrupo = "cabecalho_divEmpenhosPorSolicitacao_" + _solicitacao;
    //valor total registrado até o momento
    var campoValorTotal = $("#" + idDivGrupo).find("#valorTotal");
    var total = $(campoValorTotal).html();
    //soma o valor do novo empenho
    total = somaDinheiro(total, valor);
    //escreve o valor totaL no cabecalho do gurpo
    $("#" + idDivGrupo).find("#valorTotal").html(total);

    var divEmpenhoPorSolicitacaoItem = "<div id='" + id + "' class='" + classe + "'style='padding:7px; padding-left:15px; margin:3px 0px 3px 0px'>";
    divEmpenhoPorSolicitacaoItem += "<strong>Solicitação: </strong>" + _solicitacao + "<br />";
    divEmpenhoPorSolicitacaoItem += "<strong>Empenho: </strong>" + numeroNotaEmpenho + "<br />";
    divEmpenhoPorSolicitacaoItem += "<strong>Credor: </strong>" + credor + "<br />";
    divEmpenhoPorSolicitacaoItem += "<strong>Valor: R$ </strong>" + valor + "<br />";
    divEmpenhoPorSolicitacaoItem += "</div>";

    return divEmpenhoPorSolicitacaoItem;
}

function removeGrupoDeEmpenhosVazios() {
    $("[name='divEmpenhosPorSolicitacao']").each(function () {
        var valorTotal = $(this).find("[name='cabecalhoDivEmpenhoSolicitacao']").find("#valorTotal").html();
        if (!moedaParaNumero(valorTotal) > 0) {
            $(this).remove();
        }
    })
}

function retornaListaDeSolicitacoes()
{    
    var listaDeSolicitacoes = $("#ListSolicitacoesIds").val().split(";");
    return listaDeSolicitacoes;
}

function retornaListaEmpenhoSolicitacao() {
    var ListaEmpenhoSolicitacao = $("#ListEmpenhoSolicitacao").val().split(";");
    return ListaEmpenhoSolicitacao;
}

function retornaEventoDaSoliticao(solicitacao)
{    
    var solicitacoes = retornaListaDeSolicitacoes();
    var evento ="";

    for (var cont = 0; cont < solicitacoes.length; cont++)
    {
        var idSolicitacao = solicitacoes[cont].split("/")[0];

        //quando encontrar a solicitacao do parametro verifica se o valor é repasse ou estorno
        if (idSolicitacao == solicitacao)
        {
            var valor = solicitacoes[cont].split("/")[1];
            valor = moedaParaNumero(valor);

            if (valor > 0)
            {
                evento = "Repasse";

            } else if (valor < 0)
            {
                evento = "Estorno";
            }
            break;
        }       
    }

    return evento;
}

//retorna um array com os empenho/solicitacao/valor vinculados ao contrato
function retornaListaDeEmpenhoSolitacao() {
    return $("#ListEmpenhoSolicitacao").val().split(";");
}

function posicionaPagina(posicaoVertical) {
    //posiciona a tela no local do botao que abriu a modal
    var modal = $("#divDialog").parent().closest('div[role="dialog"]');
    //$(modal).animate({ scrollTop: $(objetoReferencia).offset().top }, 1400);
    $(modal).animate({ scrollTop: posicaoVertical }, 1400);
}

function bloqueiaPainelEmpenho() {

    $("#btnIncluirNotaEmpenho").addClass("disabled");
    $("#divNotaEmpenho").addClass("desabilitado");
    $("#btnIncluirNotaEmpenho").attr("disabled", "disabled");
}

function bloqueiaPainelCadTerc()
{
    $("#painelCadTerc").hide();
}

function bloqueiaPainelContrato()
{
    $("#pnlContratos").hide();
}

function bloqueiaPainellTibutosCondicoesPagamentoCertidoes()
{
    $("#pnlTibutosCondicoesPagamentoCertidoes").hide();
}

function bloqueiaPnlBotoes()
{
    $("#pnlBotoes").hide();
}

function bloqueiaGravacao() {
    
    $("#btnGravarContrato").attr("disabled", "disabled");
    $("#btnGravarContrato").addClass("desabilitado");
    podeGravarContrato = false;
}

function desbloqueiaPainelEmpenho()
{
    $("#btnIncluirNotaEmpenho").removeClass("disabled");
    $("#divNotaEmpenho").removeClass("desabilitado");
    $("#btnIncluirNotaEmpenho").removeAttr("disabled");
}

function desbloqueiaPainelCadTerc() {
    $("#painelCadTerc").fadeIn(900);
}

function desbloqueiaPainelContrato() {
    $("#pnlContratos").fadeIn(900);
}

function desbloqueiaPainellTibutosCondicoesPagamentoCertidoes() {
    $("#pnlTibutosCondicoesPagamentoCertidoes").fadeIn(900);
}

function desbloqueiaPnlBotoes() {
    $("#pnlBotoes").fadeIn(900);
}

//bloqueia a tela depois do painel Empenho
function bloqueiaTela() {
    bloqueiaPainelCadTerc();
    bloqueiaPainelContrato();
    bloqueiaPainellTibutosCondicoesPagamentoCertidoes();
    $("#pnlGestor").hide();
    bloqueiaPnlBotoes();    
}

function desbloqueiaTela() {
    desbloqueiaPainelCadTerc();
    desbloqueiaPainelContrato();
    desbloqueiaPainellTibutosCondicoesPagamentoCertidoes();
    $("#pnlGestor").show();
    desbloqueiaPnlBotoes();
}

function bloqueiaGravacao() {

    $("#btnGravarContrato").attr("disabled", "disabled");
    $("#btnGravarContrato").addClass("desabilitado");
    podeGravarContrato = false;
}

function desbloqueiaGravacao() {
    podeGravarContrato = true;
}

function habilitaBotaoGravarContrato() {
    $("#btnGravarContrato").removeAttr("disabled");
    $("#btnGravarContrato").removeClass("desabilitado");
}

function bloqueiaCampos() {
    //bloqueia os campos
    $("#idPeriodoContrato").prop('disabled', true);
    $("#baseDeCaldulo").prop('disabled', true);
    $("#valorTotalContrato").prop('disabled', true);
    $("#contrato_nomeGestor").prop('disabled', true);
    $("#contrato_numeroTelefoneGestor").prop('disabled', true);

    //esconde o campo original
    $("#dataVigenciaIni").prop("readonly", true);
    $("#dataVigenciaIni").hide();
    //mostra apenas o campo de exibicao
    var dataVigenciaInicio = $("#dataVigenciaIni").val();
    $("#dataVigenciaIniExibicao").val(dataVigenciaInicio);
    $("#dataVigenciaIniExibicao").prop('disabled', true);
}

function bloqueiaBotoes() {
    //Esconde os botoes
    $("#btnIncluirTributos").hide();
    $("#btnIncluirCondicoesPagamento").hide();
    $("#btnIncluirCertidao").hide();
}

function bloqueiaPArcelas() {
    $("input[categoria='parcela']").prop('disabled', true);
}

//desbloqueia todos os campos do formulario para gravação
function desbloqueiaFormulario() {
    //bloqueia os campos
    $("#idPeriodoContrato").removeAttr('disabled');
    $("#baseDeCaldulo").removeAttr('disabled');
    $("#valorTotalContrato").removeAttr('disabled');
    $("#contrato_nomeGestor").removeAttr('disabled');
    $("#contrato_numeroTelefoneGestor").removeAttr('disabled');
    $("#dataVigenciaIni").removeAttr("readonly");
    //desbloqueia as parcelas
    $("input[categoria='parcela']").removeAttr('disabled');
}

//salva os empenhos carregados com o contrato. Estes empenhos devem ser bloqueados para edicao no caso de '!podeEditarContrato'
function gravaEmpenhosBloqueados()
{    
    var empenhosDoContrato = $("#ListEmpenhoIds").val();

    //se a listar de empenhoSolicitacoes contem mais de um par, split pra dentro do array
    if (empenhosDoContrato.includes(";")) {
        empenhosBloqueados = empenhosDoContrato.split(";");
    }
    else //Se nao, só existe uma solicitacao, que vai direto para o array das bloqueadas (solicitacoesBloqueadas)
    {
        empenhosBloqueados.push(empenhosDoContrato);
    }
}

//verifica se um empenho especifico esta na lista dos bloqueados
function empenhoEstaBloqueado(empenho) {
    var empenhoBloqueado = false;    
    //procura o empenho na lista dos bloqueados e retorna 'true' se encontrar
    for (var cont = 0; cont < empenhosBloqueados.length; cont++) {
        if (empenhosBloqueados[cont].trim() != "") {
            if (empenho == empenhosBloqueados[cont]) {
                empenhoBloqueado = true;
            }
        }
    }
    return empenhoBloqueado;
}

//salva as solicitacoes carregadas com o contrato. Estas solicitacoes sevem ser bloqueadas para edicao no caso de '!podeEditarContrato'
function gravaSolicitacoesBloqueadas() {
    var solicitacoesDoContrato = $("#ListSolicitacoesIds").val();

    //se a listar de solicitacoes contem mais de um id, split pra dentro de um array
    if (solicitacoesDoContrato.includes(";")) {
        solicitacoesBloqueadas = solicitacoesDoContrato.split(";");
    }
    else //Se nao, só existe uma solicitacao, que vai direto para o array das bloqueadas (solicitacoesBloqueadas)
    {
        solicitacoesBloqueadas.push(solicitacoesDoContrato);
    }
}

//verifica se uma solicitacao especifica esta na lista das bloqueadas
function solicitacaoEstaBloqueada(solicitacao) {
    var solicitacaoBloqueada = false;
    var idSolicitacao = "";

    //procura a sollicitacao na lista e retorna 'true' se encontrar
    for (var cont = 0; cont < solicitacoesBloqueadas.length; cont++) {
        idSolicitacao = solicitacoesBloqueadas[cont].split("/")[0];

        if (solicitacao == idSolicitacao) {
            solicitacaoBloqueada = true;
        }
    }
    return solicitacaoBloqueada;
}

//retorna o valor da soma de todas as solicitacoes
function somaSolicitacoes()
{
    var solicitacoes = $("#ListSolicitacoesIds").val().split(";");
    var resultado = 0;

    for (var cont = 0; cont < solicitacoes.length; solicitacoes++)
    {
        resultado += moedaParaNumero(solicitacoes[cont].split("/")[1]);
    }
    return resultado.formatMoney("2",",",".");
}

//compara duas listas de solicitacoes e retorna as que foram removidas
function retornaSolicitacoesExcluidas(solicitacoes)
{
    var listaAntiga = $("#ListSolicitacoesIds").val().split(";");
    var listaNova = solicitacoes.split(";");
    var itensRemovidos = [];
    var deuMatch;// :)
    
    //percorro a lista antiga comparando cada item com os itens da lista nova. Os itens que nao estiverem na nova sao os itens removidos
    for (var cont = 0; cont < listaAntiga.length; cont++)
    {
        deuMatch = false;

        for (var cont2 = 0; cont2 < listaNova.length; cont2++)
        {
            var solicitacaoPesquisada = listaAntiga[cont].split("/")[0];

            if( solicitacaoPesquisada == listaNova[cont2].split("/")[0] )
            {
                deuMatch = true;
            }
        }

        if (!deuMatch)
        {
            itensRemovidos.push(solicitacaoPesquisada);
        }
    }
    return itensRemovidos;
}

function atualizaVinculoDoEmpenho(listaEmpenhoSolicitacao, idEmpenhoParametro, _idSolicitacao)
{
    var empenhoAtualizado = false;

    for (var cont = 0; cont < listaEmpenhoSolicitacao.length; cont++)
    {
        var _idEmpenho = listaEmpenhoSolicitacao[cont].split("/")[0];
        var _valor = listaEmpenhoSolicitacao[cont].split("/")[2];

        if (_idEmpenho == idEmpenhoParametro)
        {
            listaEmpenhoSolicitacao[cont] = _idEmpenho + "/" + _idSolicitacao + "/" + _valor;          
            break;
        }
    }  
}

function verificaSeEmpenhoEstaNaLista(listaEmpenhoSolicitacao, idEmpenhoParametro)
{
    var result = false;

    for (var cont = 0; cont < listaEmpenhoSolicitacao.length; cont++)
    {        
        var _idEmpenho = listaEmpenhoSolicitacao[cont].split("/")[0];

        if(_idEmpenho == idEmpenhoParametro)
        {
            result = true;
            break;
        }
    }

    return result;
}

function removeItensDaLista(listaEmpenhoSolicitacao, idSolicitacaoParametro)
{
    var listaEmpenhoSolicitacaoNOVA = [];

    for (var cont = 0; cont < listaEmpenhoSolicitacao.length; cont++)
    {
        //var _idEmpenho = listaEmpenhoSolicitacao[cont].split("/")[0];
        var _idSolicitacao = listaEmpenhoSolicitacao[cont].split("/")[1];

        //tira da lista todos os empenhos vinculados à solicitacao indicada
        if (_idSolicitacao == idSolicitacaoParametro)
        {
            listaEmpenhoSolicitacao[cont] = "";
        }
    }

    for (var cont = 0; cont < listaEmpenhoSolicitacao.length; cont++)
    {
        if (listaEmpenhoSolicitacao[cont].toString().trim() != "")
        {
            listaEmpenhoSolicitacaoNOVA.push(listaEmpenhoSolicitacao[cont]);
        }
    }

    return listaEmpenhoSolicitacaoNOVA;
}

function incluiEmpenhosNaListaEmpenhoSolicitacao(novaListaEmpenhoSolicitacao, solicitacaoParametro)
{
  
    var listaEmpenhoSolicitacao = [];

    var _listaEmpenhoSolicitacao = retornaListaEmpenhoSolicitacao();

    if (_listaEmpenhoSolicitacao.toString().trim() != "")
    {
        listaEmpenhoSolicitacao = _listaEmpenhoSolicitacao;
    }

    //antes de adicionar um novo empenho, remove da lista todos os empenhos relacionados à solicitacao     
    //O metodo retorna a lista sem os itens removidos
    if (listaEmpenhoSolicitacao.toString().trim() != "")
    {
        listaEmpenhoSolicitacao = removeItensDaLista(listaEmpenhoSolicitacao, solicitacaoParametro);
    }

    for (var cont = 0; cont < novaListaEmpenhoSolicitacao.length; cont++)
    {   
        var _idEmpenho = novaListaEmpenhoSolicitacao[cont].split("/")[0];
        var _idSolicitacao = novaListaEmpenhoSolicitacao[cont].split("/")[1];
     
        //Todas os relacionamentos com solicitacao igual à solicitacao do Parametro serao incluidas na listaEmpenhoSolicitacao
        if (_idSolicitacao == solicitacaoParametro || _idSolicitacao ==0 )
        {         
            //Se o empenho ja esta na lista(lista 'antiga'), atualiza, se não, inclui
            if (verificaSeEmpenhoEstaNaLista(listaEmpenhoSolicitacao, _idEmpenho))
            {
                atualizaVinculoDoEmpenho(listaEmpenhoSolicitacao, _idEmpenho, _idSolicitacao);
            }
            else
            {
                listaEmpenhoSolicitacao.push(novaListaEmpenhoSolicitacao[cont]);
            }       
        }
    }

    $("#ListEmpenhoSolicitacao").val(listaEmpenhoSolicitacao.join(";"));
    
    return listaEmpenhoSolicitacao;
}

function empenhoEstaSelecionado(arrayEmpenhos, posicao)
{
    var result = true;  

    //separa cada parametro: empenho/solicitacao/valor
    var parametros = arrayEmpenhos[posicao].split("/");

    //Se o parametro 'solicitacao' >0 siginifica que o empenho esta vinculado a uma solicitacao, portanto, esta selecionado e deve ser exibido na tela
    if(parametros[1] >0)
    {
        result = true;
    } else {
        result = false;
    }

    return result;
}

