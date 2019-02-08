var video = 1;
var img = "";
var tamanho = 0;
var arrVideos = [tamanho];

var sufixo = "";

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

    BuscarLink: function (_passo) {
        img = arrVideos[0 + _passo];

        var src = "https://www.youtube.com/embed/" + img;
        return "<iframe width='480' height='320' src='" + src + "' frameborder='0' allowfullscreen></iframe>";
    },

    MostraDetalhes: function (id, _tamanho, nome_grupo) {
        video = 1;

        if (tamanho == 0)
            tamanho = _tamanho;

        for (var i = 1; i <= tamanho; i++) {
            $("#videoTexto" + i).hide();
        }

        $("#videoTexto" + id).show();

        var img = controle.BuscarLink(id);

        $("#videoDetalhe").html(img);


        $("#DivDialogPermanente").dialog({
            title: nome_grupo,
            width: 548,
            //height: 800,
            buttons: {
                "Anterior": function () {
                    video = parseInt(id) - 1;

                    var img = controle.BuscarLink(video);
                    $("#videoDetalhe").html(img);

                    for (var i = 1; i <= tamanho; i++) {
                        $("#videoTexto" + i).hide();
                    }
                    $("#videoTexto" + video).show();
                    $(".modal-title").html($("#videoGrupo" + video).val());
                    id = video;
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
                    video = parseInt(id) + 1;

                    var img = controle.BuscarLink(video);
                    $("#videoDetalhe").html(img);

                    for (var i = 1; i < tamanho; i++) {
                        $("#videoTexto" + i).hide();
                    }
                    $("#videoTexto" + video).show();

                    $(".modal-title").html($("#videoGrupo" + video).val());

                    id = video;
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

                    if (video == 1)
                        idOrdem = id;
                    else
                        idOrdem = video;

                    $.ajax({
                        url: "/VotacaoOnline/VotarIgualdadeGenero" + sufixo,
                        type: 'POST',
                        data: {
                            idOrdem: idOrdem, tamanho: tamanho
                        },
                        success: function (data) {
                            $('#ModalVotar').html(data);
                            $('#ModalVotar').dialog({
                                width: 600,
                                title: "Votar",
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

        var cdMunicipio = $("#ddlMunicipio").val();
        var cdEscola = $("#ddlEscola").val();

        if ($("#chkOutros").is(':checked')) {
            cdMunicipio = -1;
            cdEscola = -1;
        }

        if (idOrdem == "") {
            Mensagem.Alert({ mensagem: "Favor informar o vídeo", tipo: "Aviso", titulo: "Aviso", botao: "Fechar" });
            return;
        }

        if (cdMunicipio == "") {
            Mensagem.Alert({ mensagem: "Favor informar o Município", tipo: "Aviso", titulo: "Aviso", botao: "Fechar" });
            return;
        }

        if (cdEscola == "") {
            cdEscola = "-1"
        }

        $.ajax({
            //cache: false,
            url: "/VotacaoOnline/ConfirmarIgualdadeGenero" + sufixo,
            method: "POST",
            dataType: "html",
            data: { cdMunicipio: cdMunicipio, cdEscola: cdEscola, idOrdem: idOrdem },
            success: function (retorno) {

                if (retorno == "sucesso") {
                    Mensagem.Alert({
                        titulo: "Sucesso",
                        mensagem: "Obrigado pela participação!", // Você escolheu o desenho nº " + idOrdem,
                        tipo: "Sucesso",
                        botoes: [{
                            botao: "Sair",
                            callback: function () {
                                document.location.href = sufixo.length == 0 ? "/VotacaoOnline/IgualdadeGenero" : "Inicio/Index";
                            }
                        }]
                    });
                }

                if (retorno == "sucesso1") {
                    Mensagem.Alert({
                        titulo: "Sucesso",
                        mensagem: "Obrigado pela participação!",
                        tipo: "Sucesso",
                        botoes: [{
                            botao: "Sair",
                            callback: function () {
                                document.location.href = "http://www.educacao.sp.gov.br/";
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
    },

    Voltar: function (_tamanho) {
        tamanho = _tamanho;
        $("#ModalVotar").dialog("close");
    }
};

$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
});