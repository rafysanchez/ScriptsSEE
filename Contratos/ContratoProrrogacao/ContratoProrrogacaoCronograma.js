"use strict";
//retorna um valor float em formato dinheiro; parametros: c=casas decimais, d=separador decimal, r=separador milhar
Number.prototype.formatMoney = function (c, d, t) {
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};




       $("[categoria='parcelaProrrogacao']").focusout(function () {
        var valorContrato = $("#valorTotalContrato").val();
        var somaParcelasCronograma = somaParcelas();
        var diferencaEntreValores = moedaParaNumero(somaParcelasCronograma) - moedaParaNumero(valorContrato);
        diferencaEntreValores = diferencaEntreValores.formatMoney("2", ",", ".");

        $("#somaDasParcelasDoCronograma").html(somaParcelasCronograma);
        $("#diferencaEntreParcelasETotalDoContrato").html(diferencaEntreValores);

        if (somaParcelasCronograma != valorContrato) {
            $("#somaDasParcelasDoCronograma").addClass("classeVermelho");
        } else {
            $("#somaDasParcelasDoCronograma").addClass("classeVerde");
        }
    })


function somaParcelas() {
    var totalParcelas = 0;
    $("input[categoria ='parcelaProrrogacao']").each(function () {
        if ($(this).val() == "") {
            $(this).val("0,00");
        }
        totalParcelas += moedaParaNumero($(this).val());
    })

    return totalParcelas.formatMoney("2", ",", ".");
}

function DisplayValorCronograma() {
    var valorContrato = $("#valorTotalContrato").val();
    var somaParcelasCronograma = somaParcelas();
    var diferencaEntreValores = moedaParaNumero(somaParcelasCronograma) - moedaParaNumero(valorContrato);
    diferencaEntreValores = diferencaEntreValores.formatMoney("2", ",", ".");

    $("#somaDasParcelasDoCronograma").html(somaParcelasCronograma);
    $("#diferencaEntreParcelasETotalDoContrato").html(diferencaEntreValores);

    if (somaParcelasCronograma != valorContrato) {
        $("#somaDasParcelasDoCronograma").addClass("classeVermelho");
    } else {
        $("#somaDasParcelasDoCronograma").addClass("classeVerde");
    }
}