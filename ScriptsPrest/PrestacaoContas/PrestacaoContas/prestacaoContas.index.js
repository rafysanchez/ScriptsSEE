$(document).ready(function () {
    eventos();
});

var pdde = (function () {

    function _pesquisar() {
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        var idsEscola = $("#ddlEscolaPesquisa").multiselect("getCheckedValues"), mensagem;
        var idsPrograma = $("#ddlProgramaPesquisa").multiselect("getCheckedValues"), mensagem;
        var idDiretoria = $('#hdfCodigoDiretoria').val();

        if ($("#codigoCIE").val() != "") {
            idsEscola = $("#codigoCIE").val();
        }

        var form = {
            MultCodEscola: idsEscola,
            CodigoExercicio: $('#ddlExercicioPesquisa').val(),
            MultPrograma: idsPrograma,
            CodigoDiretoria: idDiretoria
        }

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/PrestacaoContas/ObterPrestacaoContas',
            data: { filtros: form },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                $("#divContent").html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function _pesquisarStatus() {
        
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var _pesquisaValida = true;
        var idsEscola = $("#ddlEscolaPesquisa").multiselect("getCheckedValues"), mensagem;
        var idsPrograma = $("#ddlProgramaPesquisa").multiselect("getCheckedValues"), mensagem;
        var idDiretoria = $('#hdfCodigoDiretoria').val();
        var idsStatus = $('#ddlStatusPesquisa').multiselect("getCheckedValues"), mensagem;

        if ($("#codigoCIE").val() != "") {
            idsEscola = $("#codigoCIE").val();
        }

        var form = {
            MultCodEscola: idsEscola,
            CodigoExercicio: $('#ddlExercicioPesquisa').val(),
            MultPrograma: idsPrograma,
            CodigoDiretoria: idDiretoria,
            MultStatus: idsStatus,
            CodigoEscola: $("#codigoCIE").val()
        }


        if (form.CodigoExercicio == 0 || form.CodigoExercicio == undefined || form.CodigoExercicio == null) {
            setSuccessOrErrorInput.removeSuccess("#divEx");
            setSuccessOrErrorInput.setError("#divEx");
            _pesquisaValida = false;


        } else {
            setSuccessOrErrorInput.removeError("#divEx");
            setSuccessOrErrorInput.setSuccess("#divEx");
        }


        if (form.CodigoEscola == undefined || form.CodigoEscola == null || form.CodigoEscola == 0) {

            if (form.CodigoDiretoria == 0 || form.CodigoDiretoria == undefined || form.CodigoDiretoria == null) {
                setSuccessOrErrorInput.removeSuccess("#divPesquisaDiretoria");
                setSuccessOrErrorInput.setError("#divPesquisaDiretoria");
                _pesquisaValida = false;

            } else {
                setSuccessOrErrorInput.removeError("#divPesquisaDiretoria");
                setSuccessOrErrorInput.setSuccess("#divPesquisaDiretoria");
            }

            if (form.MultCodEscola == null || form.MultCodEscola == undefined || form.MultCodEscola.length == 0) {
                setSuccessOrErrorInput.removeSuccess("#divPesquisaEscola");
                setSuccessOrErrorInput.setError("#divPesquisaEscola");
                _pesquisaValida = false;

            } else {
                setSuccessOrErrorInput.removeError("#divPesquisaEscola");
                setSuccessOrErrorInput.setSuccess("#divPesquisaEscola");
            }
        }

        if (_pesquisaValida) {

            $.ajax({
                cache: false,
                url: newURL + 'prestacaocontas/PrestacaoContas/ObterPrestacaoContas',
                data: { filtros: form },
                type: 'POST',
                datatype: 'HTML',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    $("#divContent").html(data);
                },
                error: function (jqXHR, txtStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
                }
            });
        }
    }

    return {
        pesquisar: function () {
            _pesquisar();
        },
        pesquisarStatus: function () {
            _pesquisarStatus();
        }
    }

})();

function eventos() {

    $("#ddlEscolaPesquisa").multiselect();

    $("#btnPesquisa").click(function (e) {
        e.preventDefault();
        pdde.pesquisar();
    });

    $("#btnPesquisaStatus").click(function (e) {
        e.preventDefault();
        pdde.pesquisarStatus();
    });

}




