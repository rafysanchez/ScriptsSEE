const _contentType = 'application/x-www-form-urlencoded; charset=utf-8';

// servicoConveniada.js
var servicoConveniada = (function () {
    //métodos privados

    //function _pesquisar() {
    //    debugger;

    //    var multApms = $('#ddlApmPesquisa').multiselect("getCheckedValues"), mensagem;

    //    //if (multApms == "") {
    //    //    var multApms = $('#CodAPM').val();
    //    //}

    //    var form = {
    //        CodUGE: $("#ddlUGEPesquisa").val(),
    //        Cnpj: $("#txtCnpj").val().replace(/[^\d]+/g, ''),
    //        CodEscola: $("#CodEscola").val(),
    //        CodAPM: $("##CodEscola").val(),
    //        AnoAssinaturaConvenio: $("#DDLAno").val(),
    //        InicioVigenciaConveio: $("#DataInicioVigencia").val(),
    //        FimVigenciaConvenio: $("#DataFimVigencia").val(),
    //        SituacaoConvenio: $("#DDLSituacaoConvenioPesquisa").val(),
    //        SituacaoTC: $("#DDLSituacaoTCPesquisa").val(),
    //        MultApm: multApms
    //    };


    //    $.ajax({
    //        type: "POST",
    //        async: true,
    //        url: "/convenios/Conveniada/PesquisarConveniadaPorDiretoria",
    //        data: { pesquisaConveniadaViewModel: form },
    //        dataType: 'HTML',
    //        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    //        success: function (data) {
    //            $('#divGrid').empty().html(data);
    //        },
    //        error: function (jqXHR, textStatus, errorThrown) {
    //            mensagemAlerta.ErroAjax('Ocorreu um erro durante a pesquisa.' + errorThrown);
    //        }
    //    });

    //}

    function _salvar(form, _url, action) {
        try {
              $.ajax({
                  type: 'POST',
                  dataType: 'JSON',
                  data: $(form).serialize(),
                  url: _url,
                  contentType: _contentType,
                  success: function (data) {
                      mensagemAlerta(data);
                      if (retornoValido(data)) {
                          action();
                      }
                  },
                  error: function (errorThrown) {
                      mensagemAlerta.ErroAjax('Ocorreu um erro durante a inserção' + errorThrown);
                  }

             });

        } catch (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante a inserção' + e.message);
        }
    }

    function _excluir(_id, _url, action) {
        try {
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: _url,
                data: {id: _id },
                contentType:_contentType,
                success: function (data) {
                    mensagemAlerta(data);
                    if (retornoValido(data)) {
                        action();
                    }                 
                },
                error: function (errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
                }

            });
        } catch (e) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + e.message);
        }
    }

    function _atualizarGrid(divGrid, _id, _url) {
        $.ajax({
            type: 'POST',
            datatype: 'HTML',
            url: _url,
            data: { id: _id },
            contentType: _contentType,
            success: function (data) {
                $(divGrid).html('');
                $(divGrid).html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
            }
        });
    }

    function _atualizarSituacaoApm(_id, _status, _url) {
        $.ajax({
            type: 'POST',
            datatype: 'HTML',
            url: _url,
            data: { codApm: _id, status: _status },
            contentType: _contentType,
            success: function (data) {
                mensagemAlerta(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a atualização' + errorThrown);
            }
        });
    }



    function _criarCodigoApm(cnpj, fecharDialog) {
        $.ajax({
            type: 'POST',
            datatype: 'JSON',
            url:  '/convenios/Conveniada/CriarCodigoAPM',
            data: { cnpj: cnpj },
            contentType: _contentType,
            success: function (data) {
                mensagemAlerta(data);
                if (fecharDialog) {
                    window.setTimeout(function () {
                        $("#divConveniada").dialog("close");
                    }, 1000);
                }
                _pesquisar();
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a criação do Código da APM' + errorThrown);
            }
        });

    }

    function _alterarStatus(codSituacao, codApm) {
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: '/convenios/Conveniada/AlterarSituacaoConvenio',
            data: { codSituacao: codSituacao, codApm: codApm },
            success: function (data) {
                mensagemAlerta(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a alteração do status ' + errorThrown);
            }
        });
    }

    function retornoValido(data) {
        var valido = (data != null && data != undefined && data[0].Status != null);
        return (valido == true && data[0].Status == "Sucesso") ? true : false;
    }

    //métodos públicos
    return {
        salvar: function (form, url, action) { _salvar(form, url, action); },
        excluir: function (id, url, action) { _excluir(id, url, action); },
        atualizarSituacaoApm: function (id, status,url) { _atualizarSituacaoApm(id, status,url); },
        atualizarGrid: function (grid, id, url) { _atualizarGrid(grid, id, url) },
        criarCodigoApm: function (cnpj, fecharDialog) { _criarCodigoApm(cnpj, fecharDialog) },
        alterarStatus: function (codSituacao, codApm) { _alterarStatus(codSituacao, codApm); }
    }

})();