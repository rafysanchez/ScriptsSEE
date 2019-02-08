
(function () {
    var _modal = null;
    mensagemAlerta = function (data, modal) {
        _modal = modal;
        var textoEscondido, tipo, titulo = "";
        if (data != null && data != undefined) {

            var _msg = "";
            var _status = null;

            $(data).each(function () {
                _msg += this.Mensagem;
                _status = this.Status;
            });


            if (_msg != null && _msg != undefined) {

                var mensagem = _msg;
                switch (_status) {
                    case "Erro":
                        textoEscondido = ""; //mensagem virar textoEscondido pois pode ter mais de um erro.
                        tipo = "erro";
                        titulo = "Erro";
                        mensagemAlerta.Show(mensagem, textoEscondido, tipo, titulo);
                        break;
                    case "Sucesso":
                        textoEscondido = "";
                        tipo = "sucesso";
                        titulo = "Sucesso";
                        mensagemAlerta.Show(mensagem, textoEscondido, tipo, titulo);
                        break;
                    case "Info":
                        textoEscondido = "";
                        tipo = "aviso";
                        titulo = "Aviso";
                        mensagemAlerta.Show(mensagem, textoEscondido, tipo, titulo);
                        break;
                    case "Atencao":
                        textoEscondido = "";
                        tipo = "alerta";
                        titulo = "Alerta";
                        mensagemAlerta.Show(mensagem, textoEscondido, tipo, titulo);
                        break;

                    case "":
                        tipo = "erro";
                        titulo = "Erro";
                        mensagemAlerta.Show("Ocorreu um erro durante o processamento.", "", tipo, titulo);
                        break;
                }

            } else {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processamento.",
                    escondido: "",
                    tipo: "erro",
                    botao: "Fechar"

                });

            }
        }
    }
    mensagemAlerta.Show = function (mensagem, textoEscondido, tipo, titulo) {
        //tipo =  aviso, erro, sucesso, alerta
        Mensagem.Alert({
            titulo: titulo,
            mensagem: mensagem,
            escondido: textoEscondido,
            tipo: tipo,
            botao: "Fechar",
            callback: function () {
                Mensagem.Fechar();
                if (tipo == "sucesso" && _modal != null && _modal != undefined)
                    mensagemAlerta.FecharDialog();

            }

        });

    }

    mensagemAlerta.FecharDialog = function () {
        window.setTimeout(function () {
            $(_modal).modal("hide");
        }, 2000);
    }

    mensagemAlerta.ErroAjax = function (errorThrown) {
            Mensagem.Alert({
                titulo: "Erro",
                mensagem: errorThrown,
                tipo: "erro",
                botao: "Fechar"
            });
    }

    mensagemAlerta.Alerta = function (mensagem) {
        Mensagem.Alert({
            titulo: "Alerta",
            mensagem: mensagem,
            tipo: "alerta",
            botao: "Fechar"
        });
    }

    mensagemAlerta.Sucesso = function (mensagem) {
        Mensagem.Alert({
            titulo: "Sucesso",
            mensagem: mensagem,
            tipo: "sucesso",
            botao: "Fechar"
        });
    }

})();

function ReplaceCaracteresEspeciais(msg) {
    var mensagem = msg.split(' ');
    var retorno = "";

    for (var i = 0; i < mensagem.length; i++) {
        var t = retorno.concat(" ").concat(acentuarAlerts(mensagem[i]));
        retorno = t;
    }

    return retorno;
}

function acentuarAlerts(mensagem) {
    mensagem = mensagem.replace('&#192;', 'À');
    mensagem = mensagem.replace('&#193;', 'Á');
    mensagem = mensagem.replace('&#194;', 'Â');
    mensagem = mensagem.replace('&#195;', 'Ã');
    mensagem = mensagem.replace('&#196;', 'Ä');
    mensagem = mensagem.replace('&#197;', 'Å');
    mensagem = mensagem.replace('&#198;', 'Æ');
    mensagem = mensagem.replace('&#199;', 'Ç');
    mensagem = mensagem.replace('&#200;', 'È');
    mensagem = mensagem.replace('&#201;', 'É');
    mensagem = mensagem.replace('&#202;', 'Ê');
    mensagem = mensagem.replace('&#203;', 'Ë');
    mensagem = mensagem.replace('&#204;', 'Ì');
    mensagem = mensagem.replace('&#205;', 'Í');
    mensagem = mensagem.replace('&#206;', 'Î');
    mensagem = mensagem.replace('&#207;', 'Ï');
    mensagem = mensagem.replace('&#208;', 'Ð');
    mensagem = mensagem.replace('&#209;', 'Ñ');
    mensagem = mensagem.replace('&#210;', 'Ò');
    mensagem = mensagem.replace('&#211;', 'Ó');
    mensagem = mensagem.replace('&#212;', 'Ô');
    mensagem = mensagem.replace('&#213;', 'Õ');
    mensagem = mensagem.replace('&#214;', 'Ö');
    mensagem = mensagem.replace('&#216;', 'Ø');
    mensagem = mensagem.replace('&#217;', 'Ù');
    mensagem = mensagem.replace('&#218;', 'Ú');
    mensagem = mensagem.replace('&#219;', 'Û');
    mensagem = mensagem.replace('&#220;', 'Ü');
    mensagem = mensagem.replace('&#221;', 'Ý');
    mensagem = mensagem.replace('&#222;', 'Þ');
    mensagem = mensagem.replace('&#223;', 'ß');
    mensagem = mensagem.replace('&#224;', 'à');
    mensagem = mensagem.replace('&#225;', 'á');
    mensagem = mensagem.replace('&#226;', 'â');
    mensagem = mensagem.replace('&#227;', 'ã');
    mensagem = mensagem.replace('&#228;', 'ä');
    mensagem = mensagem.replace('&#229;', 'å');
    mensagem = mensagem.replace('&#230;', 'æ');
    mensagem = mensagem.replace('&#231;', 'ç');
    mensagem = mensagem.replace('&#232;', 'è');
    mensagem = mensagem.replace('&#233;', 'é');
    mensagem = mensagem.replace('&#234;', 'ê');
    mensagem = mensagem.replace('&#235;', 'ë');
    mensagem = mensagem.replace('&#236;', 'ì');
    mensagem = mensagem.replace('&#237;', 'í');
    mensagem = mensagem.replace('&#238;', 'î');
    mensagem = mensagem.replace('&#239;', 'ï');
    mensagem = mensagem.replace('&#240;', 'ð');
    mensagem = mensagem.replace('&#241;', 'ñ');
    mensagem = mensagem.replace('&#242;', 'ò');
    mensagem = mensagem.replace('&#243;', 'ó');
    mensagem = mensagem.replace('&#244;', 'ô');
    mensagem = mensagem.replace('&#245;', 'õ');
    mensagem = mensagem.replace('&#246;', 'ö');
    mensagem = mensagem.replace('&#248;', 'ø');
    mensagem = mensagem.replace('&#249;', 'ù');
    mensagem = mensagem.replace('&#250;', 'ú');
    mensagem = mensagem.replace('&#251;', 'û');
    mensagem = mensagem.replace('&#252;', 'ü');
    mensagem = mensagem.replace('&#253;', 'ý');
    mensagem = mensagem.replace('&#254;', 'þ');
    mensagem = mensagem.replace('&#255;', 'ÿ');
    mensagem = mensagem.replace('&#338;', 'Œ');
    mensagem = mensagem.replace('&#339;', 'œ');
    mensagem = mensagem.replace('&#352;', 'Š');
    mensagem = mensagem.replace('&#353;', 'š');
    mensagem = mensagem.replace('&#376;', 'Ÿ');
    mensagem = mensagem.replace('&#402;', 'ƒ');
    mensagem = mensagem.replace('&#186;', 'º');
    return mensagem;
}