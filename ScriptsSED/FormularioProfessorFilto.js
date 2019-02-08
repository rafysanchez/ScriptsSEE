$(document).ready(function () {
    ConfigurarComponentes();
    Pesquisar.pesquisarFormularioProfessor();
});


var ConfigurarComponentes = function () {

    $('#cdDiretoria').autoPreencher($('#cboTipoEnsino'), 'TipoEnsino', 'ListaTipoEnsinoPorDiretoria', [{ 'anoLetivo': 'txtAnoLetivo', cdDiretoria: 'cdDiretoria' }]);
}

var Pesquisar = {
    pesquisarFormularioProfessor: function () {
        $('#btnPesquisar').click(function() {
            $.ajax({
                url: '/caderno/ParcialFormularioRegistro',
                data: { cdTipoEnsino: $('#cboTipoEnsino').val(), anoLetivo: $('#txtAnoLetivo').val(), cdDiretoria: $('#cdDiretoria').val() },
               success : function(data) {
                   $('#divResultado').empty().html(data);
               }
            });
        });
    }
}