﻿$(document).ready(function () {
    AplicarMascaras();
});

var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;


function parseDiaMesAno(valor) {
    var data = valor.split("/");
    var dia = parseInt(data[0], 10),
        mes = parseInt(data[1], 10),
       ano = parseInt(data[2], 10);
    return new Date(ano, mes - 1, dia);
}

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}



String.prototype.formatMoney = function () {

    var v = this;

    if (v.indexOf('.') === -1) {
        v = v.replace(/([\d]+)/, "$1,00");
    }

    v = v.replace(/([\d]+)\.([\d]{1})$/, "$1,$20");
    v = v.replace(/([\d]+)\.([\d]{2})$/, "$1,$2");
    v = v.replace(/([\d]+)([\d]{3}),([\d]{2})$/, "$1.$2,$3");

    return v;
};

function AcaoBotaoCancelarLimpar(div) {
    AcaoBotaoCancelar(div);
    FechaPopUp(div);
};

function AcaoBotaoCancelar(div) {
    $("#" + div).dialog("close");
};

function FechaPopUp(div) {
    $("#" + div + " .ui-dialog-content").html(''); //limpa os conteudos dentro
    $("#" + div).html(''); //limpa os
    $("#" + div).html('<div id="' + div + '"><div> </div></div>');
    $("div[aria-describedby='" + div + "']").remove();
};

jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();
