(function () {


    mensagemAlerta = function (data) {
        
        var classe = "";
        if (data != null && data != undefined) {
            var retorno = data;

            var _msg = "";
            var _status = null;
            var index = 0;
            debugger
            $(data).each(function () {
                _msg += this.Mensagem + '<br/>';
                _status = this.Status;
            });


            if (_msg != null && _msg != undefined) {

                var mensagem = _msg;

                switch (_status) {
                    case "Erro":
                        classe = "danger";
                        mensagemAlerta.Show(classe, mensagem);
                        break;
                    case "Sucesso":
                        classe = "success";
                        mensagemAlerta.Show(classe, mensagem);
                        break;
                    case "Info":
                        classe = "warning";
                        mensagemAlerta.Show(classe, mensagem);
                        break;
                    case "Atencao":
                        classe = "info";
                        mensagemAlerta.Show(classe, mensagem);
                        break;

                    case "":
                        classe = "warning";
                        mensagemAlerta.Show(classe, "Erro de script");
                        break;
                }

            }
        }
    }
    mensagemAlerta.Show = function (classe, mensagem) {
        $('#divAlerta').html('');
        $('#divAlerta').html('<div class="alert alert-' + classe + ' fade-in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> ' + mensagem + '</div>');
        mensagemAlerta.Efeito();
        if (classe == "success") {
            mensagemAlerta.FadeOut();
        }

    }
    mensagemAlerta.Efeito = function () {
        $("#divAlerta")
          .velocity({ opacity: 0 }, 1000)
          .velocity("reverse")
    }
    mensagemAlerta.FadeOut = function () {
        var template = $("#divAlerta");
        window.setTimeout(function () {
            template.fadeOut();
            $('#modalCadastro').modal('hide')
        }, 3000);
    }

})();