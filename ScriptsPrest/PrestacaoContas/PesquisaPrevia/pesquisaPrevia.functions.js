var _tr = null;
var _fornecedor = null;
var _pesquisaPrevia = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    //function _salvar(form) {
    //    _fornecedor = form;
    //    $.ajax({
    //        cache: false,
    //        url: newURL + 'prestacaocontas/SalvarPesquisaPrevia',
    //        data: { pesquisaPreviaViewModel: form },
    //        type: 'POST',
    //        datatype: 'JSON',
    //        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    //        success: function (data) {
    
    //            if (data != null && data != undefined) {
    //                var status = data[0].Status;
    //                if (status == "Sucesso") {
    //                    _fornecedor.IdPesquisaPrevia = data[0]._id;
    //                    $("#divPesquisaPrevia").dialog("close");
    //                    mensagemAlerta(data);                     
    //                    prestacaoContas.atualizarConteudoAbas();
    //                    _atualizarGrid();
    //                } else {
    //                    mensagemAlerta(data);
    //                }
    //            }
    //        },
    //        error: function (jqXHR, txtStatus, errorThrown) {
    //            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
    //        }
    //    });
    //}

    function _excluir(tr) {
        _tr = tr;
        $.ajax({
            cache: false,
            url: '../ExcluirPesquisaPrevia',
            data: { id: $('#hdfIdPesquisaPrevia').val() },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        mensagemAlerta(data);
                        prestacaoContas.atualizarConteudoAbas();
                        _excluirRegistroGrid();

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

    function _obterFornecedor(cnpj) {

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/PesquisaPrevia/ObterFornecedor',
            data: { cnpj: cnpj },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
        
                if (data != null && data != undefined) {
                    try {
                        if (data.DsRazaoSocial == "" || data.DsRazaoSocial == undefined) {
                            mensagemAlerta.Alerta("O CNPJ informado não foi encontrado. Verifique se o número foi digitado corretamente. Caso tenha sido, será necessário realizar o cadastro do novo fornecedor no sistema (Menu Financeiro – Prestação de Contas – Cadastros Básicos).");
                            $("#txtEmpresa").val('');
                            $("#hdfIdFornecedor").removeAttr('value');
                        } else {
                            $("#txtEmpresa").val(data.DsRazaoSocial);
                            $("#hdfIdFornecedor").val(data.IdFornecedor);
                        }
               
                    } catch (e) {
                        mensagemAlerta.ErroAjax("Ocorreu um erro durante a busca do fornecedor.");
                    }

                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }

    function _atualizarGrid() {
        var id;
        $('#tblPesquisaPrevia > tbody > tr').each(function () {
            id = $(this).attr("data-id");
            //ser for edição, remove a tr e adiciona de novo abaixo atualizada.
            if (parseInt(id) == parseInt(_fornecedor.IdPesquisaPrevia)) {
                $("#tblPesquisaPrevia").find($(this)).remove();
            }
           
        });
        if (id== undefined) {
            //Remover tr que informa que não há registros.
            $("#tblPesquisaPrevia > tbody > tr").remove();
        }
        var vencedor = _fornecedor.NrProponente == 1 ? "Sim" : "Não";
        var tr = String.format("<tr data-id='{8}'>"+                
                       "<td>{0}</td>"+
                       "<td>{1}</td>"+
                       "<td>{2}</td>"+
                       "<td>{3}</td>"+
                       "<td>{4}</td>"+
                       "<td>{5}</td>"+
                       "<td>{6}</td>"+
                       "<td>{7}</td>"+
                       "<td>  <a id='btnEditarPesquisaPrevia' data-id='{8}' class='fas fa-pencil-alt' style='font-size:15px; cursor:pointer;'>  </a></td>" +
                       "<td> <a id='btnExcluirPesquisaPrevia' data-id='{8}' class='fas fa-trash-alt' style='font-size:15px; cursor:pointer;'> </a></td>" +
                    "</tr>", vencedor, _fornecedor.nr_cnpj, _fornecedor.Empresa, _fornecedor.NmContato, _fornecedor.NrTelefone, _fornecedor.DtPesquisa, _fornecedor.DsPrazoEntrega, _fornecedor.DsPrazoPagamento, _fornecedor.IdPesquisaPrevia);
        $("#tblPesquisaPrevia > tbody").append(tr);
   
        _desabilitarBotaoNovo();
    }

    function _excluirRegistroGrid() {
        $("#tblPesquisaPrevia").find($(_tr)).remove();
        _liberarBotaoNovoRegistro();      
    }

    function _liberarBotaoNovoRegistro() {
        if ($('#tblPesquisaPrevia > tbody > tr').length < 3) {
            $('#btnNovoPesquisaPrevia').removeAttr('disabled');

        }
    }

    function _desabilitarBotaoNovo() {
        if ($('#tblPesquisaPrevia > tbody > tr').length == 3) {
            $('#btnNovoPesquisaPrevia').attr('disabled', 'disabled');
        
        }
    }

    return {
        //salvar: function (form) {
        //    _salvar(form);
        //},
        excluir: function (tr) {
            _excluir(tr);
        },
        obterFornecedor: function (cnpj) {
            _obterFornecedor(cnpj);
        }

    }

})();