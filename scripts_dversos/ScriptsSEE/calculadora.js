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

function multiplicaDinheiroCasasDecimais(valor1, valor2, casasDecimais) {
    var result = 0;

    if (valor1 == 0) {
        valor1 = 0.000, 00
    };

    if (valor2 == 0) {
        valor2 = 0.000, 00
    };

    //soma os valores      
    result = moedaParaNumero(valor1) * moedaParaNumero(valor2);
    //converte o resultado para o formato dinheiro
    result = (result).formatMoney(casasDecimais, ',', '.');

    return result;
}

function multiplicaDinheiro(valor1, valor2) {
    var result = 0;

    if (valor1 == 0) {
        valor1 = 0.000,00
    };

    if (valor2 == 0) {
        valor2 = 0.000,00
    };

    //soma os valores      
    result = moedaParaNumero(valor1) * moedaParaNumero(valor2);
    //converte o resultado para o formato dinheiro
    result = (result).formatMoney(2, ',', '.');

    return result;
}
//parametros de entrada: dois valores no formato dinheiro "1.000,00"
function somaDinheiro(valor1, valor2) {
    var result = 0;

    if (valor1 == 0) {
        valor1 = 0.000, 00
    };

    if (valor2 == 0) {
        valor2 = 0.000, 00
    };

    //soma os valores      
    result = moedaParaNumero(valor1) + moedaParaNumero(valor2);
    //converte o resultado para o formato dinheiro
    result = (result).formatMoney(2, ',', '.');

    return result;
}

//parametros de entrada: dois valores no formato dinheiro "1.000,00"
function subtraiDinheiro(valor1, valor2) {
    var result = 0;
    //soma os valores      
    result = moedaParaNumero(valor1) - moedaParaNumero(valor2);
    //converte o resultado para o formato dinheiro
    result = (result).formatMoney(2, ',', '.');

    return result;
}