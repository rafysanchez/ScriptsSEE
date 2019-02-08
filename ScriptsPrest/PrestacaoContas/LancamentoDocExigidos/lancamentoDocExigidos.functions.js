var _lancamentoDocExigidos = (function () {
    var newURL = window.location.protocol + "//" + window.location.host + "/";
    var _idLancamento = 0;

    function _reprovarDocRecebido() {
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/LancamentoDocumentosExigidos/ReprovarDocRecebido',
            data: $("#frmLancamentoDocExigidos").serialize(),
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        Mensagem.Alert({
                            titulo: "Sucesso",
                            mensagem: 'Reprovado com Sucesso',
                            tipo: "sucesso", 
                            botoes:
                            [
                                {
                                    botao: "Fechar",
                                    callback: function () {
                                        $("#divDialog33").dialog("close");
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        mensagemAlerta(data);
                    }
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }

    function _aprovar(input) {
        var _input = input;
        _idLancamento = $(input).attr('data-id-lancamento');
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/LancamentoDocumentosExigidos/AprovarDocRecebido',
            data: { idLancamento: $(input).attr('data-id-lancamento'), idDocumentoExibido: $(input).attr('data-id-lancamentodocexigido') },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                try {
                    if (data != null && data != undefined) {
                       // mensagemAlerta(data);
                        abrirDocumentosExigidos();
                    }
                } catch (e) {
                    abrirDocumentosExigidos();
                }
               
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }

    function _salvarDocRecebidoOuNaoRecebido(input, flRecebido) {
        _idLancamento = $(input).attr('data-id-lancamento');
        var _input = input;
        var _form =  {
            IdLancamento: $(input).attr('data-id-lancamento'),
            IdDocumentosExigidos: $(input).attr('data-id-documentoexigido'),
            IdDocumento : $(input).attr('data-id-documento'),
            FlRecebido: flRecebido,
            FlDocAprovado : null
        };
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/LancamentoDocumentosExigidos/SalvarDocRecebidoOuNaoRecebido',
            data: { form: _form },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                try {
                    if (data != null && data != undefined) {
                        //mensagemAlerta(data);
                        abrirDocumentosExigidos();
                    }
                } catch (e) {
                    abrirDocumentosExigidos();
                }
               
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }

     function abrirDocumentosExigidos() {
             var action = String.format(newURL + "prestacaocontas/LancamentoDocumentosExigidos/Obter?idLancamento={0}", _idLancamento);
            $.ajax({
                type: 'POST',
                url: action,
                cache: false,
                success: function (data) {
                   $("#divDialogDocsExigidosPC").html(data);
                },
                error: function (e) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro: ' + e);
                }
            });
        }
     
     function _reverterItem(input) {
         _idLancamento = $(input).attr('data-id-lancamento');
         $.ajax({
             cache: false,
             url: newURL + 'prestacaocontas/LancamentoDocumentosExigidos/ReverterItem',
             data: { idLancamento: $(input).attr('data-id-lancamento'), idDocumentoExibido: $(input).attr('data-id-lancamentodocexigido') },
             type: 'POST',
             datatype: 'JSON',
             contentType: 'application/x-www-form-urlencoded; charset=utf-8',
             success: function (data) {
                 try {
                     if (data != null && data != undefined) {
                        
                         abrirDocumentosExigidos();
                     }
                 } catch (e) {
                     mensagemAlerta(data);
                 }

             },
             error: function (jqXHR, txtStatus, errorThrown) {
                 mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
             }
         });
     }

    return {
        reprovarDocRecebido: function () {
            _reprovarDocRecebido();
        },
        aprovar: function (input) {
            _aprovar(input);
        },
        salvarDocRecebidoOuNaoRecebido: function (input,flRecebido) {
            _salvarDocRecebidoOuNaoRecebido(input,flRecebido);
        },
        reverterItem: function (input) {
            _reverterItem(input);
        }
    }

})();
