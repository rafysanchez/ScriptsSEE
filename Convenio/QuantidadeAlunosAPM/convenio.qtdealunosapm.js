
var qtdeAlunosApm = (function () {

    function atualizarQtdeAlunos(codUge, codApm, codTermo) {

        $.ajax({
            type: "POST",
            async: true,
            url: "/convenios/QuantidadeAlunosVsApm/Listar",
            data: { codUge: codUge, codApm: codApm, codTermo: codTermo },
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                $('#divGrid').empty().html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a pesquisa.' + errorThrown);
            }
        });
    }

    function salvar(frm) {

        var codUge = frm.CodUGE;
        var codApm = frm.CodAPM;
        var codTermo = frm.CodTermoConvenio;

        $.ajax({
            cache: false,
            url: '/convenios/QuantidadeAlunosVsApm/Salvar',
            data: { quantidadeAlunosAPMViewModel: frm },
            type: 'POST',
            datatype: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        atualizarQtdeAlunos(codUge, codApm, 0);
                        var _modal = $('#divQtdeAlunosApm');
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

    function excluir(id, _trExcluida) {

        $.ajax({
            type: "POST",
            async: true,
            url: "/convenios/QuantidadeAlunosVsApm/Excluir",
            data: JSON.stringify({ id: id }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {

                if (data != null && data != undefined) {
                    var status = data[0].Status;
                    if (status == "Sucesso") {
                        $("#tblQtdeAlunos").find(_trExcluida).remove();
                    }
                    mensagemAlerta(data);
                }
                else {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
            }
        });

    }

    function listarApm(codUge, ddlApm) {

        if (parseInt(codUge) > 0) {

            $.ajax({
                type: "POST",
                async: true,
                url: "/convenios/QuantidadeAlunosVsApm/ListarAPM",
                data: JSON.stringify({ codUge: codUge }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
           
                    if (data != undefined && data.length > 0) {
                        $(ddlApm).empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                        $(data).each(function () {
                            $('<option>').val(this.CodAPM)
                                         .text(this.Descricao)
                                         .appendTo(ddlApm);
                        });

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a listagem da APM' + errorThrown);
                }
            });


        } else {
            $(ddlApm).empty().append($("<option></option>").attr("value", "0").text("Selecione..."));
        }
    }

    function novo() {
        $("#divQtdeAlunosApm").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 768,
        }).load("/convenios/QuantidadeAlunosVsApm/Criar", function () {
            $("#divQtdeAlunosApm").dialog("open");
        });
    }

    function editar(id) {
     
        $("#divQtdeAlunosApm").dialog({
            title: "Atualizar",
            autoOpen: false,
            width: 768,
        }).load("/convenios/QuantidadeAlunosVsApm/Editar?id=" + id, function () {
            $("#divQtdeAlunosApm").dialog("open");
        });
    }

    return {
        _salvar: function (frm) {
            salvar(frm);
        },
        _excluir: function (id, _trExcluida) {
            excluir(id, _trExcluida);
        },
        _atualizarQtdeAlunos: function (codUge, codApm, codTermo) {
            atualizarQtdeAlunos(codUge, codApm, codTermo);
        },
        _listarApm: function (codUge, ddlApm) {
            listarApm(codUge, ddlApm);
        },
        _novo: function () {
            novo();
        },
        _editar: function (id) {
            editar(id);
        }

      }

})();





