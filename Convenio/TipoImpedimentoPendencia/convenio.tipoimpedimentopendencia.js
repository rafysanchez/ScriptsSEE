
var table = {
    _trExcluida: null,
}

$(document).ready(function () {
    "use strict";
    eventos();
});

var tipoImpPendencia = (function () {

    function salvar(frm) {
            $.ajax({
                cache: false,
                url: '/convenios/TipoImpedimentoPendencia/Salvar',
                async: true,
                data: { tipoImpedimentoPendenciaViewModel: frm },
                type: 'POST',
                datatype: 'html',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    if (data != null && data != undefined) {
                        var status = data[0].Status;
                        if (status == "Sucesso") {
                            atualizarGrid();
                            var _modal = $('#divImpedimento');
                            mensagemAlerta(data, _modal);
                        } else {
                            mensagemAlerta(data);
                        }
                    }
                },
                error: function (jqXHR, txtStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
                }
            });
    }

    function excluir() {
        var id = $("#IdExclusao").val();
        if (parseInt(id) > 0) {
            $.ajax({
                url: '/convenios/TipoImpedimentoPendencia/Excluir',
                data: JSON.stringify({ id: id }),
                type: 'POST',
                async: true,
                contentType: 'application/json; charset=utf-8',
                success: function (data) {             
                    if (data != null && data != undefined) {
                        var status = data[0].Status;
                        if (status == "Sucesso") {
                            $("#tblLista").find(table._trExcluida).remove();
                        }                     
                        mensagemAlerta(data);
                    }
                   else {
                        mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão');
                    }
                },
                error: function (jqXHR, txtStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
                }
            });

        } else {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão');
        }
    }

    function atualizarGrid() {
        $.ajax({
            url: '/convenios/TipoImpedimentoPendencia/ListarTodos',
            type: 'POST',
            datatype: 'html',
            success: function (data) {
                $("#divGrid").html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax(errorThrown);
            }
        });
    }
    return {
        _salvar: function (frm) {
            salvar(frm);
        },
        remover: function () {
            excluir();
        },
        listar: function () {
            atualizarGrid();
        }
    }

})();


var eventos = function () {
    tipoImpPendencia.listar();
    $("#btnNovo").click(function (e) {
        $('#CodTipoImpendimentoPendencia').attr('value', 0);
        e.preventDefault();
        $("#divImpedimento").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 768,
        }).load("/convenios/TipoImpedimentoPendencia/Criar", function () {
            $("#divImpedimento").dialog("open");
        });
    });

    $("#divGrid").on("click", '#btnEditar', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $('#CodTipoImpendimentoPendencia').attr('value', id);
        $("#divImpedimento").dialog({
            title: "Atualizar",
            autoOpen: false,
            width: 768,
        }).load("/convenios/TipoImpedimentoPendencia/Editar?id=" + id, function () {
            $("#divImpedimento").dialog("open");
        });

    });

    $("#divGrid").on("click", '#btnExcluir', function (e) {
        var id = $(this).attr("data-id");
        e.preventDefault();
        table._trExcluida = $(this).parent().parent();
        $('#IdExclusao').attr('value', id);
        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro?",
            tipo: "alerta",
            botoes: [
				{
				    botao: "Sim",
				    callback: function () {
				        tipoImpPendencia.remover();
				        Mensagem.Fechar();
				    }
				},
				{
				    botao: "Não"
				}
            ]
        });

    });

}

