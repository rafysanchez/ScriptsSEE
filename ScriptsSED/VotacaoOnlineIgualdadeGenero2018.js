var video = 1;
var img = "";
var tamanho = 0;
var arrVideos = [tamanho];

var sufixo = "";

//criado essa variavel global para resgatamos o valor do vídeo
top.idOrdemVoto;

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

                    // aqui guardamos o valor do video numa variavel global,
                    // para usarmos na confirmação do voto.
                    top.idOrdemVoto = idOrdem;

                    $.ajax({
                        url: "/VotacaoOnline/VotarIgualdadeGenero2018" + sufixo,
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


    //Classe alterada pelo Fábio Rosário, incluimos a validação por captcha.
    Confirmar: function (data) {

        var cdMunicipio = $("#ddlMunicipio").val();
        var cdEscola = $("#ddlEscola").val();
        var idOrdem = "";

        //momento em que usamos o valor da variavel global, trata-se do valor do video
        //que o ususario escolheu para votar.
        idOrdem = top.idOrdemVoto;

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
        if (data != undefined) {
            if (data == true) {

                //momento em que é feita a verificação do que o usuario digitou no campo imagem "chaptcha".
                if ($('#frmFiltroVotar').valid() == false) {
                    return;
                }

                Mensagem.AdicionarCallback(function (msg) {
                    if (msg.find('.aviso').length != 0) {
                        msg.find('button').click(function () {
                            location.reload();
                        });
                    }
                });

                $.ajax({
                    //cache: false,
                    url: "/VotacaoOnline/ConfirmarIgualdadeGenero2018" + sufixo,
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
                                        document.location.href = sufixo.length == 0 ? "/VotacaoOnline/IgualdadeGenero2018" : "Inicio/Index";
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
            }
            else {
                $.ajax({
                    url: "/VotacaoOnline/PartialCaptcha",
                    type: "GET",
                    success: function (data) {
                        $(".sed-captcha").html(data);
                    },
                    error: function (data) {
                        $(".sed-captcha").html("ops...");
                    }

                });
            }
        }
    },

    Voltar: function (_tamanho) {
        tamanho = _tamanho;
        $("#ModalVotar").dialog("close");
    },
};

$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    ValidarVoto();
});

//criada esta validação pelo Fábio Rosario.
var ValidarVoto = function () {
    $('#frmFiltroVotar').validate({
        rules: {
            'ddlMunicipio': { required: true },
            CaptchaInputText: { required: true }
        },
    });
}