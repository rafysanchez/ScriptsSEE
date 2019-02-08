var _devolucaoRecuros = (function () {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _salvar() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Devolucao/Salvar',
            data: $("#frmDevolucaoRecursos").serialize(),
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        $("#divDevolucaoRecursos").dialog("close");
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

    function _excluir() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Devolucao/Excluir',
            data: { id: $('#hdfIdDevolucaoRecursos').val() },
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


    function _obterSaldos() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Devolucao/ObterSaldosDevolucaoTotal',
            data: { idLancamento: $('#hdfIdLancamento').val(), idDevolucao: $('#IdDevolucaoRecursos').val() },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    try {
                        $('#ValDevCusteio').val(data.ValDevCusteio);
                        $('#ValDevCapital').val(data.ValDevCapital);
                        $('#ValorTotalDevolvido').val(data.Total);
                    } catch (e) {
                        mensagemAlerta.ErroAjax('Ocorreu um erro durante a busca do saldo' + e.message);
                    }
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });

    }

    function _desfazerAprovacao() {

        $.ajax({
            type: 'POST',
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerAprovacaoSaldoDevolvido',
            data: { idDevolucaoRecursos: $('#hdfIdDevolucaoRecursos').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizar();
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
                    //                _atualizar();
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
            url: newURL + 'prestacaocontas/Aprovacao/DesfazerReprovacaoSaldoDevolvido',
            data: { idDevolucaoRecursos: $('#hdfIdDevolucaoRecursos').val(), idLancamento: $('#hdfIdLancamento').val() },
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                var status = data[0].Status;
                if (status == "Sucesso") {
                    _atualizar();
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
                    //                _atualizar();
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

    function _atualizar() {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/Devolucao/Obter',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                $('#divDevolucao').empty().html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _carregarMotivoGlosa(tr) {
        var tipoLancamentoDevRecursos = 8;
        var _tipoLancamento = tipoLancamentoDevRecursos;

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/TipoGlosa/ObterMotivoGlosa',
            data: { idDocumento: $(tr).attr('data-id'), idTipoLancamento: _tipoLancamento },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {

                $("#divMotivoGlosa").empty();
                $("#divMotivoGlosa").html("<div id='modalMotivoGlosa'></div>");
                $("#modalMotivoGlosa").html(data);

                $("#modalMotivoGlosa").dialog({
                    title: "Motivo da Glosa",
                    autoOpen: false,
                    destroy: true,
                    width: 768,
                }).dialog("open");
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });

    }
    function _aprovarEmLote() {
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        $.ajax({
            url: newURL + 'prestacaocontas/Aprovacao/AprovarSaldosEmLote',
            data: { idLancamento: $('#hdfIdLancamento').val() },
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        _atualizar();
                    }
                    //  mensagemAlerta(data);

                } else { mensagemAlerta(data); }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a aprovação das Notas Fiscais.');
                console.log(jqXHR + '/' + txtStatus + '/' + errorThrown);
            }


        });

    }

    return {
        salvar: function () {
            _salvar();
        },
        excluir: function () {
            _excluir();
        },
        obterSaldos: function () {
            _obterSaldos();
        },
        desfazerAprovacao: function () {
            _desfazerAprovacao();
        },
        desfazerReprovacao: function () {
            _desfazerReprovacao();
        },
        atualizar: function () {
            _atualizar();
        },
        carregarMotivoGlosa: function (tr) {
            _carregarMotivoGlosa(tr);
        },
        aprovarEmLote: function () {
            _aprovarEmLote();
        }

    }

})();

