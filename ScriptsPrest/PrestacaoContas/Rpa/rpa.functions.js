var _rpa = (function () {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _excluir() {

        var token = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Rpa/Excluir',
            data: { __RequestVerificationToken: token, id: $('#hdfIdRpa').val() },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        prestacaoContas.atualizarConteudoAbas();

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

    function _nomeFornecedor(cpf, token)
    {
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Rpa/ObterNomeFornecedor',
            data: { __RequestVerificationToken: token, nrCpf: cpf },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                if (data.id > 0)
                {
                    $("#txtNmFornecedor").val(data.razaoSocial).css('color', 'black');
                }
                else
                {
                    //$("#NrCpf").val('');
                    //$("#txtNmFornecedor").val(data.razaoSocial).css('color', 'red');
                    mensagemAlerta.Alerta("O CPF informado não foi encontrado. Verifique se o número foi digitado corretamente. Caso tenha sido, será necessário realizar o cadastro do novo profissional autônomo no sistema (Menu Financeiro – Prestação de Contas – Cadastros Básicos).");
                }

                $('#idFornecedor').val(data.id);
            },
            error: function (jqXHR, txtStatus, errorThrown)
            {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }

    function _reprovar() {
        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Aprovacao/ReprovarRpa',
            data: { idLancamento: $('#hdfLancamento').val(), idRpa: $('#hdfIdRpa').val(), lTipoGlosa: $('#hdfListaTipoGlosa').val() },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                      //  mensagemAlerta(data);
                        $("#divRpaDialog").dialog("close");
                        _rpa.atualizarRpa();
                    } else {
                        mensagemAlerta(data);
                    }
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _atualizarRpa() {
        $.ajax({
            cache: false,
            async: true,
            url: newURL + 'prestacaocontas/Rpa/Obter',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                $('#divRpa').empty().html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }


    function _desfazerAprovacao() {
        $.ajax({
            type: 'POST',
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerAprovacaoRPA',
            data: { idRpa: $('#hdfIdRpa').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizarRpa();
                    //Mensagem.Alert({
                    //    titulo: "Sucesso",
                    //    mensagem: data[0].Mensagem,
                    //    tipo: "sucesso",
                    //    botoes:
                    //    [
                    //        {
                    //            botao: "Fechar",
                    //            callback: function (e) {
                    //                e.preventDefault();
                    //                _atualizarRpa();
                    //            }
                    //        }
                    //    ]
                    //});
                }
                else {
                    mensagemAlerta(data);
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _desfazerReprovacao() {
        $.ajax({
            type: 'POST',
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerReprovacaoRPA',
            data: { idRpa: $('#hdfIdRpa').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizarRpa();
                    //Mensagem.Alert({
                    //    titulo: "Sucesso",
                    //    mensagem: data[0].Mensagem,
                    //    tipo: "sucesso",
                    //    botoes:
                    //    [
                    //        {
                    //            botao: "Fechar",
                    //            callback: function (e) {
                    //                e.preventDefault();
                    //                _atualizarRpa();
                    //            }
                    //        }
                    //    ]
                    //});
                }
                else {
                    mensagemAlerta(data);
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _aprovarEmLote() {
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        $.ajax({
            url: newURL + 'prestacaocontas/Aprovacao/AprovarRPAEmLote',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        _atualizarRpa();
                    }
                } else { mensagemAlerta(data); }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a aprovação das Notas Fiscais.');
                console.log(jqXHR + '/' + txtStatus + '/' + errorThrown);
            }


        });

    }

    return {
        excluir: function () {
            _excluir();
        },
        nomeFornecedor: function (cpf, token) {
            _nomeFornecedor(cpf, token);
        },
        reprova: function () {
            _reprovar();
        },
        atualizarRpa: function () {
            _atualizarRpa();
        }
        ,
        desfazerAprovacao: function () {
            _desfazerAprovacao();
        },
        desfazerReprovacao: function () {
            _desfazerReprovacao();
        }
        ,
        aprovarEmLote: function () {
            _aprovarEmLote();
        }

    }

})();
