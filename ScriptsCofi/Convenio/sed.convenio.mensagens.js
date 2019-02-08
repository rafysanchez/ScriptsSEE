
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
                        titulo = "Mensagem";
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
                        tipo = "alerta";
                        titulo = "Alerta";
                        mensagemAlerta.Show(mensagem, textoEscondido, tipo, titulo);
                        break;
                    case "Atencao":
                        textoEscondido = "";
                        tipo = "aviso";
                        titulo = "Aviso";
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
            $(_modal).dialog("close");
        }, 2000);
    }

    mensagemAlerta.ErroAjax = function (errorThrown) {
        Mensagem.Alert({
            titulo: "Erro",
            mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
            tipo: "erro",
            botao: "Fechar"
        });
    }
    mensagemAlerta.Alerta = function (info) {
        Mensagem.Alert({
            titulo: "Atenção",
            mensagem: info,
            tipo: "alerta",
            botao: "Fechar"
        });
    }
})();