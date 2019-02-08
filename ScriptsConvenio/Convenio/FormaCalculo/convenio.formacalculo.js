
jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();


$(document).ready(function () {
    eventos();
});


var formaCalculo = (function () {

    function salvar(frm) {

        $.ajax({
            cache: false,
            url: '/convenios/formacalculo/Salvar',
            data: { formaCalculoViewModel: frm },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {  
                if (data != null && data != undefined) {          
                    var status = data[0].Status;         
                    if (status == "Sucesso") {
                        var _modal = $('#divFormaCalculo');
                        mensagemAlerta(data, _modal);
                        atualizarGrid();
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
        var id = $('#IdExclusao').val();
        if (parseInt(id) > 0) {
            $.ajax({
                url: '/convenios/formacalculo/Excluir',
                data: JSON.stringify({ id: id }),
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                        if (data != null && data != undefined) {
                            mensagemAlerta(data);
                            var status = data[0].Status;
                            if (status == "Sucesso") {
                                atualizarGrid();
                            }
                        } else {
                            mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão.');
                        }
                },
                error: function (jqXHR, txtStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
                }
            });

        } else {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão.');
        }
    }

    function atualizarGrid() {
        $.ajax({
            url: '/convenios/formacalculo/ListarTodos',
            type: 'POST',
            datatype: 'html',
            success: function (data) {
                $("#divGrid").html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
            }
        });
    }

    return {
        remover: function () {
            excluir();
        },
        carregarGrid: function () {
            atualizarGrid();
        },
        _salvar: function (frm) {
            salvar(frm);
        }

    }

})();


var eventos = function () {

    formaCalculo.carregarGrid();

    $("#btnNovo").click(function (e) {
        e.preventDefault();
        $("#divFormaCalculo").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 768,
        }).load("/convenios/formacalculo/Criar", function () {
            $("#divFormaCalculo").dialog("open");
        });

    });

    $("#divGrid").on("click", '#btnEditar', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $("#divFormaCalculo").dialog({
            title: "Editar",
            autoOpen: false,
            width: 768,
        }).load("/convenios/formacalculo/Editar?id=" + id, function () {
            $("#divFormaCalculo").dialog("open");
        });

    });

    $("#divGrid").on("click", '#btnExcluir', function (e) {
        e.preventDefault();
        var id = $(this).attr("data-id");
        $('#IdExclusao').attr('value', id);
        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro?",
            tipo: "alerta", 
            botoes: [
				{
				    botao: "Sim",
				    callback: function () {
				        formaCalculo.remover();
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


