
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

var termoConvenio = (function () {

    function obterValoresFormaCalculo() {

        var id = $("#ddlFormaCalculo").val();
        if (parseInt(id) > 0) {
            $.ajax({
                type: "POST",
                async: true,
                url: "/convenios/Termo/ObterValoresFormaCalculo",
                dataType: 'json',
                data: JSON.stringify({ CodFormaCalculo: id }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data != undefined) {
                        $("#txtVlPercapita").val(data._vlPercapita);
                        $("#txtVlMaxPermitido").val(data._vlPermitido);
       
                    } else {
                        mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
                }
            });
        }
        else {

            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
        }
    }

    function salvar(frm) {

        $.ajax({
            cache: false,
            url: '/convenios/Termo/Salvar',
            data: { termoConvenioViewModel: frm },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        atualizarGrid();
                        var _modal = $('#divTermo');
                        mensagemAlerta(data, _modal);
                    } else {
                        mensagemAlerta(data);
                    }

                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
            }
        });

    }

    function excluir() {
   
        var id = $('#IdExclusao').val();

        if (parseInt(id) > 0) {
            $.ajax({
                url: '/convenios/Termo/Excluir',
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
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
                }
            });
        } else {

            mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão');
        }
    }

    function atualizarGrid() {
        $.ajax({
            url: '/convenios/Termo/ListarTodos',
            type: 'POST',
            datatype: 'html',
            success: function (data) {
                $("#divGrid").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
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
        carregarGrid: function () {
            atualizarGrid();
        },
       preecherDropDown: function () {
            preencherDropDownFormaCalculo();
        },
        obterValoresFC: function () {
           obterValoresFormaCalculo();
        }

    }


})();


var eventos = function () {

    termoConvenio.carregarGrid();

    $("#divTermo").on("change", '#ddlFormaCalculo', function (e) {
     
        if ($(this).val() > 0) {        
            termoConvenio.obterValoresFC();
        } else {
            $("#txtVlPercapita").val("");
            $("#txtVlMaxPermitido").val("");
        }

    });

    $("#btnNovo").click(function (e) {
        $('#CodFormaCalculo').attr('value', 0);
        e.preventDefault();
        $("#divTermo").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 768,
        }).load("/convenios/Termo/Criar", function () {
            $("#divTermo").dialog("open");
        });


    });


    $("#divGrid").on("click", '#btnEditar', function (e) {

        e.preventDefault();
        var id = $(this).attr('data-id');
        $('#CodTermoConvenio').attr('value', id);
        $("#divTermo").dialog({
            title: "Atualizar",
            autoOpen: false,
            width: 768,
        }).load("/convenios/Termo/Editar?id=" + id, function () {
            $("#divTermo").dialog("open");
            $('#CodFormaCalculo option[value=' + $("#idFormaCalculo").val() + ']').prop('selected', true);
        });
      
    });

    $("#divGrid").on("click", '#btnExcluir', function (e) {
    
        var id = $(this).attr("data-id");
        e.preventDefault();
        $('#IdExclusao').attr('value', id);

        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro?",
            tipo: "alerta",
            botoes: [
				{
				    botao: "Sim",
				    callback: function () {
				        termoConvenio.remover();
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


