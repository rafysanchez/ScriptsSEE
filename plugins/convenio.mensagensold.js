(function () {


    mensagemEspecifica = function (data) {

        var classe = "";
        if (data != null && data != undefined) {
            var retorno = data; 
   
            var _msg = "";
            var _status = null;

            $(data).each(function () {
                _msg += this.Mensagem + '<br/>';
                _status = this.Status;
            });
  

            if (_msg != null && _msg != undefined) {

                var mensagem = _msg;
           
                switch (_status) {
                    case "Erro":
                        classe = "danger";
                        mensagemEspecifica.Show(classe, mensagem);
                        break;
                    case "Sucesso":
                        classe = "success";
                        mensagemEspecifica.Show(classe, mensagem);
                        break;
                    case "Info":
                        classe = "warning";
                        mensagemEspecifica.Show(classe, mensagem);
                        break;
                    case "Atencao":
                        classe = "info";
                        mensagemEspecifica.Show(classe, mensagem);
                        break;

                    case "" :
                        classe = "warning";
                        mensagemEspecifica.Show(classe, "Erro de script");
                        break;
                }

            }
        }
    }
    mensagemEspecifica.Show = function (classe, mensagem) {
        $('#divAlerta').html('');
        $('#divAlerta').html('<div class="alert alert-' + classe + ' fade-in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> ' + mensagem + '</div>');
        mensagemEspecifica.Efeito();
        //if (classe == "success") {
        //    mensagemEspecifica.FadeOut();
        //}

    }
    mensagemEspecifica.Efeito = function () {
        $("#divAlerta")
          .velocity({ opacity: 0 }, 1000)
          .velocity("reverse")
   }
    mensagemEspecifica.FadeOut = function () {
       var template = $("#divAlerta");  
       window.setTimeout(function () {
           template.fadeOut();
           $('#modalCadastro').modal('hide')
       }, 3000);
   }
   
})();