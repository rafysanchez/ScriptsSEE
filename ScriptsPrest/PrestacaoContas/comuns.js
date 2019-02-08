
function calcularTotal(inputCusteio, inputCapital, inputValor) {
    var total = 0;
    var _vlCusteio = 0;
    var _vlCapital = 0;

    var vlCusteio = $(inputCusteio).val();
    var vlCapital = $(inputCapital).val();
    vlCapital = vlCapital.replace(',', '').replace('.', '');
    vlCusteio = vlCusteio.replace(',', '').replace('.', '');
    _vlCapital = (!isNaN(vlCapital) && vlCapital.length > 0) ? (parseFloat(vlCapital) * 100) : 0;
    _vlCusteio = (!isNaN(vlCusteio) && vlCusteio.length > 0) ? (parseFloat(vlCusteio) * 100) : 0;
    total = ((_vlCapital + _vlCusteio) / 100);
    total = String(total / 100).formatMoney();
    $(inputValor).val(total);

}

function multiplicarValores(qtde, valor, inputTotal, desconto) {
    var total = 0;
    var _valor = 0;
    var _qtde = qtde;
    var _desconto = 0;
    var _valorFinal = 0;

    if (qtde != "" && qtde != undefined) {

        var vl = valor.replace(',', '').replace('.', '');
        _qtde = qtde.replace(',', '').replace('.', '');
        _valor = (!isNaN(vl) && vl.length > 0) ? ((parseFloat(_qtde) * parseFloat(vl)) * 100) : 0;

        var vlDesconto = desconto.replace(',', '').replace('.', '');
        _desconto = (!isNaN(vlDesconto) && vlDesconto.length > 0) ? ((parseFloat(1000) * parseFloat(vlDesconto)) * 100) : 0;

        _valor -= _desconto;

        if (valor.length > 6) {
            total = (_valor / 100);
            total = String(total / 100).formatMoney();
            total = parseFloat(total).toFixed(2);
        }
        else {
            total = (_valor / 100000);
            total = String(total / 100).formatMoney();
        }
        
        $(inputTotal).val(total);
    }
}

function calcularValorSemDesconto(qtde, valor) {
    var total = 0;
    var _valor = 0;
    var _qtde = qtde;
    var _valorFinal = 0;
    
    if (qtde != "" && qtde != undefined) {

        var vl = valor.replace(',', '').replace('.', '');
        _qtde = qtde.replace(',', '').replace('.', '');
        _valor = (!isNaN(vl) && vl.length > 0) ? ((parseFloat(_qtde) * parseFloat(vl)) * 100) : 0;
  
        if (valor.length > 6) {
            total = (_valor / 100);
            total = String(total / 100).formatMoney();
            total = parseFloat(total).toFixed(2);
        }
        else {
            total = (_valor / 100000);
            total = String(total / 100).formatMoney();
        }

        return total;
    }
}


function calcularValorTotal(qtde, valor) {
    var total = 0;
    var _valor = 0;
    var _qtde = parseInt(qtde);
    var vl = valor.replace(',', '').replace('.', '');
    _valor = (!isNaN(vl) && vl.length > 0) ? ((parseFloat(vl) * parseFloat(_qtde)) * 100) : 0;
    total = (_valor / 100);
    total = String(total / 100).formatMoney();
    return total;

}

function compararDoisValores(vlFornecedorVencedor, vlFornecedor2) {
    var _vlFornecedor = 0;
    var _vlFornecedor2 = 0;
    
    vlFornecedorVencedor = vlFornecedorVencedor.replace(',', '').replace('.', '');
    vlFornecedor2 = vlFornecedor2.replace(',', '').replace('.', '');
    _vlFornecedor = (!isNaN(vlFornecedorVencedor) && vlFornecedorVencedor.length > 0) ? (parseFloat(vlFornecedorVencedor) * 100) : 0;
    _vlFornecedor2 = (!isNaN(vlFornecedor2) && vlFornecedor2.length > 0) ? (parseFloat(vlFornecedor2) * 100) : 0;
    _vlFornecedor = (_vlFornecedor / 100);
    _vlFornecedor2 = (_vlFornecedor2 / 100);
    return (_vlFornecedor2 > _vlFornecedor);
}

function compararTresValores(vlFornecedorVencedor, vlFornecedor2, vlFornecedor3) {

   var _vlFornecedor = 0;
   var _vlFornecedor2 = 0;
   var _vlFornecedor3 = 0;
   vlFornecedorVencedor = vlFornecedorVencedor.replace(',', '').replace('.', '');
   vlFornecedor2 = vlFornecedor2.replace(',', '').replace('.', '');
   vlFornecedor3 = vlFornecedor3.replace(',', '').replace('.', '');
   
   _vlFornecedor = (!isNaN(vlFornecedorVencedor) && vlFornecedorVencedor.length > 0) ? (parseFloat(vlFornecedorVencedor) * 100) : 0;
   _vlFornecedor2 = (!isNaN(vlFornecedor2) && vlFornecedor2.length > 0) ? (parseFloat(vlFornecedor2) * 100) : 0;
   _vlFornecedor3 = (!isNaN(vlFornecedor3) && vlFornecedor3.length > 0) ? (parseFloat(vlFornecedor3) * 100) : 0;
   _vlFornecedor = (_vlFornecedor / 100);
   _vlFornecedor2 = (_vlFornecedor2 / 100);
   _vlFornecedor3 = (_vlFornecedor3 / 100);

   return (_vlFornecedor2 > _vlFornecedor && _vlFornecedor3 > _vlFornecedor2);
}


function validarSaldoDisponivel(vlSaldo, vlLancado) {
    var _vlSaldo = 0;
    var _vlLancado = 0;

    vlSaldo = vlSaldo.replace(',', '').replace('.', '');
    vlLancado = vlLancado.replace(',', '').replace('.', '');
    _vlSaldo = (!isNaN(vlSaldo) && vlSaldo.length > 0) ? (parseFloat(vlSaldo) * 100) : 0;
    _vlLancado = (!isNaN(vlLancado) && vlLancado.length > 0) ? (parseFloat(vlLancado) * 100) : 0;
    _vlSaldo = (_vlSaldo / 100);
    _vlLancado = (_vlLancado / 100);

    return (_vlLancado <= _vlSaldo);
}

function valorInformadoMaiorQueZero(valor) {
    var vl = valor.replace(',', '').replace('.', '');
    return (parseInt(vl) > 0) ? true : false;
}