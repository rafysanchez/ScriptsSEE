function AcaoBotaoCancelarLimpar(div) {
    AcaoBotaoCancelar(div);
    FechaPopUp(div);
}

function AcaoBotaoCancelar(div) {
    $("#" + div).dialog("close");
}

function FechaPopUp(div) {
    $("#" + div + " .ui-dialog-content").html(''); //limpa os conteudos dentro
    $("#" + div).html(''); //limpa os
    $("#" + div).html('<div id="' + div + '"><div> </div></div>');
    $("div[aria-describedby='" + div + "']").remove();
}