var midia = 1;
var md = "";
var tamanho = 0;
var arrMidias = [tamanho];

var controle = {

    CarregarEscola: function (codigo) {
        var select = $("#ddlEscola");

        select.empty();
        select.append(new Option("OUTROS", "", true, true));
        $.ajax({
            cache: false,
            url: "/VotacaoOnline/BuscarEscolaPorMunicipio",
            dataType: "json",
            data: { codigo: codigo },
            success: function (data) {
                $.each(data, function (index, itemData) {
                    select.append($('<option/>', {
                        value: itemData.value,
                        text: itemData.text
                    }));
                });
            }
        });
    },

    BuscarLink: function (_passo, tpMidia) {
        md = arrMidias[0 + _passo];

        if (tpMidia == "VIDEO") {
            var src = "https://www.youtube.com/embed/" + md;
            return "<iframe width='480' height='320' src='" + src + "' frameborder='0' allowfullscreen></iframe>";
        }
        else if (tpMidia == "IMAGEM") {
            var src = "<img src='/Content/VotacaoOnline/" + md + "' alt='' height='400' width='400'/>";
            return src;
        }
    },

    MostraDetalhes: function (id, _tamanho, nome_grupo, tpMidia, titulo) {

        midia = 1;

        if (tamanho == 0)
            tamanho = _tamanho;

        for (var i = 1; i <= tamanho; i++) {
            $("#midiaTexto" + i).hide();
        }

        $("#midiaTexto" + id).show();

        var md = controle.BuscarLink(id, tpMidia);

        $("#midiaDetalhe").html(md);


        $("#DivDialogPermanente").dialog({
            title: nome_grupo,
            width: 548,
            //height: 800,
            buttons: {
                "Anterior": function () {
                    midia = parseInt(id) - 1;
                    if (md = arrMidias[0 + midia] == "-1") midia--;
                    var md = controle.BuscarLink(midia, tpMidia);
                    $("#midiaDetalhe").html(md);

                    for (var i = 1; i <= tamanho; i++) {
                        $("#midiaTexto" + i).hide();
                    }
                    $("#midiaTexto" + midia).show();
                    $(".modal-title").html($("#midiaGrupo" + midia).val());
                    id = midia;
                    if (id == 1)
                        $("#idAnterior").hide();
                    else if (id == tamanho)
                        $("#idProximo").hide();
                    else {
                        $("#idAnterior").show();
                        $("#idProximo").show();
                    }
                },
                "Próximo": function () {
                    midia = parseInt(id) + 1;
                    if (md = arrMidias[0 + midia] == "-1") midia++;
                    var md = controle.BuscarLink(midia, tpMidia);

                    $("#midiaDetalhe").html(md);

                    for (var i = 1; i < tamanho; i++) {
                        $("#midiaTexto" + i).hide();
                    }
                    $("#midiaTexto" + midia).show();

                    $(".modal-title").html($("#midiaGrupo" + midia).val());

                    id = midia;
                    if (id == 1)
                        $("#idAnterior").hide();
                    else if (id == tamanho)
                        $("#idProximo").hide();
                    else {
                        $("#idAnterior").show();
                        $("#idProximo").show();
                    }
                },
                "Vote Aqui": function () {
                    var idOrdem = 0;

                    if (midia == 1)
                        idOrdem = id;
                    else
                        idOrdem = midia;

                    $.ajax({
                        url: "/VotacaoOnline/VotarMidia",
                        type: 'GET',
                        data: {
                            idOrdem: idOrdem, tamanho: tamanho
                        },
                        success: function (retorno) {
                            $('#ModalVotar').html(retorno);
                            $('#ModalVotar').dialog({
                                width: 600,
                                title: titulo,
                                draggable: false,
                                modal: true,
                                resizable: false,
                                position: 'top'
                            });
                        },
                        error: function () {
                            alert("Ocorreu um erro ao pesquisar o tipo de evento.");
                        }
                    });
                }
            }
        });

        $('button:contains(Anterior)').attr("id", "idAnterior");
        $('button:contains(Próximo)').attr("id", "idProximo");
        $('button:contains(Vote Aqui)').attr("id", "idVotar");
        //$("#idVotar").addClass("btn btn-warning");

        if (id == 1)
            $("#idAnterior").hide();
        else if (id == tamanho)
            $("#idProximo").hide();
    },

    Confirmar: function (idOrdem) {
        
        if (idOrdem == "") {
            Mensagem.Alert({ mensagem: "Favor informar o desenho", tipo: "Aviso", titulo: "Aviso", botao: "Fechar" });
            return;
        }

        $.ajax({
            //cache: false,
            url: "/VotacaoOnline/ConfirmarVoto",
            dataType: "html",
            data: { idOrdem: idOrdem },
            success: function (retorno) {

                if (retorno == "sucesso") {
                    Mensagem.Alert({
                        titulo: "Sucesso",
                        mensagem: "Obrigado pela participação!", 
                        tipo: "Sucesso",
                        botoes: [{
                            botao: "Sair",
                            callback: function () {
                                document.location.href = "/VotacaoOnline/ProjetoGestaoDemocratica";
                            }
                        }]
                    });
                }
            },
            error: function (jqXHR, textStatus, textStatus) {
                alert(jqXHR);
                alert(textStatus);
                alert(textStatus);
            }
        });
    }
};

$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
});