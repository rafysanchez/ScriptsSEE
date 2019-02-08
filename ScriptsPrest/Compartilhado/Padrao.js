function RunCallback(callback) {
    if (callback != null && typeof (callback) == "function")
        callback();
}

function PreencherComboPadrao(protocolo, url, parametro, multSelecao, nomeCombo, bCodigoENome, valorPadrao, flgSelecao, callback) {
    nomeCombo = '#' + nomeCombo;

    $.ajax({
        type: protocolo,
        url: url,
        async: true,
        dataType: 'json',
        data: parametro,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {           
            if (data != undefined && data.length > 0) {               
                if (multSelecao == '1') {                   
                    if (data != undefined && data.length > 0) {
                        $(nomeCombo).multiselect('destroy');
                        $(nomeCombo).empty();

                        $(data).each(function () {
                            if (bCodigoENome == false) {
                                if (valorPadrao == this.Codigo) {
                                    $('<option selected>').val(this.Codigo)
                                            .text(this.Nome)
                                            .appendTo(nomeCombo);
                                }
                                else {
                                    $('<option>').val(this.Codigo)
                                            .text(this.Nome)
                                            .appendTo(nomeCombo);
                                }
                            }
                            else {
                                if (valorPadrao == this.Codigo) {
                                    $('<option selected>').val(this.Codigo)
                                                .text(this.CodigoNome)
                                                .appendTo(nomeCombo);
                                }
                                else {
                                    $('<option>').val(this.Codigo)
                                              .text(this.CodigoNome)
                                              .appendTo(nomeCombo);
                                }
                            }
                        });

                        $(nomeCombo).multiselect({
                            noneSelectedText: "Faça sua seleção aqui",
                            selectedText: multiSelectTextoPadrao,
                        }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100%" });

                    } else {
                    
                        nomeCombo.empty();
                        $(nomeCombo).multiselect('destroy');
                        $(nomeCombo).multiselect({
                            noneSelectedText: "Faça sua seleção aqui",
                            selectedText: multiSelectTextoPadrao,
                        }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100%" });
                    }
                }
                else {
                   
                    $(nomeCombo).empty();
                    $(nomeCombo).empty().append($("<option></option>").attr("value", "").text("--Selecione--"));
                    $(data).each(function () {
                        if (bCodigoENome == false) {
                            if (valorPadrao == this.Codigo) {
                                $('<option selected>').val(this.Codigo)
                                        .text(this.Nome)
                                        .appendTo(nomeCombo);
                            }
                            else
                            {
                                $('<option>').val(this.Codigo)
                                        .text(this.Nome)
                                        .appendTo(nomeCombo);
                            }
                        }
                        else {
                            if (valorPadrao == this.Codigo) {
                                $('<option selected>').val(this.Codigo)
                                            .text(this.CodigoNome)
                                            .appendTo(nomeCombo);
                            }
                            else {
                                $('<option>').val(this.Codigo)
                                          .text(this.CodigoNome)
                                          .appendTo(nomeCombo);
                            }
                        }
                    });
                }
                if (callback && typeof (callback) === "function") {
                    callback();
                }

                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function ModalOpenModelAjax(data, url, div, width, height, title, protocolo) {

    $.ajax({
        type: protocolo,
        async: true,
        data: data,
        url: url,
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
        },

        success: function (response) {           
            if (!response.IsError) {
                div.html(response);

                div.dialog({
                    title: title,
                    autoOpen: false,
                    width: width,
                    height: height
                });

                div.dialog("open");
            }
            else {
                ShowPopUp(response, null);
                div.html('');
            }
        }
    });
    return false;
}

function ModalOpenTamanho(url, div, width, height, title) {
    div.dialog({
        title: title,
        autoOpen: false,
        width: width,
        height: height
        //,close: function (event, ui) {
        //    RunCallback(callback);
        //}
    }).load(url, function () {
        div.dialog("open");
    });
    return false;
}

function PostAndBind(btnClicked, url, div) {
    var $form = $(btnClicked).parents('form');
    $.ajax({
        type: "POST",
        url: url,
        async: true,
        data: $form.serialize(),
        error: function (xhr, status, error) {
            //msg de erro;
        },
        success: function (response) {
            div.html(response);
        }
    });
    return false;
}

function PostAndBindData(data, url, div) {
    
    $.ajax({
        type: "POST",
        url: url,
        async: true,
        data: data,
        error: function (xhr, status, error) {
            //msg de erro;
        },
        success: function (response) {
            div.html(response);
        }
    });
    return false;
}

function Salvar(data, url, callback)
{
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        cache: false,
        success: function (data) {
            if (data != null && data != undefined) {
                var status = data[0].Status;
                if (status == "Sucesso") {                    
                    mensagemAlerta(data);
                    RunCallback(callback);

                } else {
                    mensagemAlerta(data);
                }
            }
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
        }
    });
}

function AcaoBotaoCancelarLimpar(div) {

    $("#" + div).dialog("close");
    $("#" + div + " .modal-dialog").html('');
    $("#" + div + " .ui-dialog-content").html(''); //limpa os conteudos dentro
    $("#" + div).html(''); //limpa os
    $("#" + div).html('<div id="' + div + '"><div> </div></div>');
    $("div[aria-describedby='" + div + "']").remove();

}

function DesabilitarCamposTela(source) {
    
    $('#' + source).find('input, textarea, select, button').not('.naoDisabled').attr('disabled', 'disabled');

        $('#' + source + " .icone-tabela-editar").each(function () {
            $(this).removeClass('icone-tabela-editar');
            $(this).addClass('icone-tabela-visualizar');
            $(this).attr('title', 'Visualizar');
        });
        $('#' + source + " .icone-tabela-excluir").hide();
        $('#' + source + " .remover_daTelaGeral").remove();
        
    
}

function ConfirmarExclusao(linha, id, url, nameTable) {
    var _tr = null;
    _tr = $(linha).parent().parent();
    Mensagem.Alert({
        titulo: "Confirmação de exclusão",
        mensagem: "Deseja realmente excluir o registro?",
        tipo: "alerta",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    _excluir(_tr, id, url, nameTable);
                }
            },
            {
                botao: "Não"
            }
        ]
    });
    return false;
}

function _excluir(tr, id, url, nameTable) {
    $.ajax({
        cache: false,
        url: url,
        data: { id: id },
        type: 'POST',
        datatype: 'JSON',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            if (data != null && data != undefined) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    mensagemAlerta(data);
                    $("#" + nameTable).find($(tr)).remove();
                } else {
                    mensagemAlerta(data);
                }
            }
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
        }
    });
}

function TrocaList(ListOrigem, ListDestino) {
    var i;
    for (i = 0; i < ListOrigem[0].options.length ; i++) {
        if (ListOrigem[0].options[i].selected == true) {
            var Op = document.createElement("OPTION");
            Op.text = ListOrigem[0].options[i].text;
            Op.value = ListOrigem[0].options[i].value;
            ListDestino[0].options.add(Op);
            ListOrigem[0].options.remove(i);
            i--;
        }
    }
}
function SelecionaList(ListDestino) {
    if (ListDestino != null) {
        for (i = 0; i < ListDestino[0].options.length ; i++) {
            ListDestino[0].options[i].selected = true;
        }
    }
    //$(ListDestino[0] + " > option").prop("selected", true);
}
function RemoveItensListBox(ListOrigem) {
    for (i = 0; i < ListOrigem[0].options.length ; i++) {
        if (ListOrigem[0].options[i].selected == true) {
            ListOrigem[0].options.remove(i);
            i--;
        }
    }
}
function DeselecionaList(ListDestino) {
    for (i = 0; i < ListDestino[0].options.length ; i++) {
        ListDestino[0].options[i].selected = false;
    }
}