$(document).ready(function () {    
    $('#CodDiretoria').autoPreencher($('#CodEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodEscola').autoPreencher($('#CodTpEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ 'id': "'CodEscola'", 'AnoLetivo': "'anoLetivo'" }]);
    $('#CodTpEnsino').autoPreencher($('#CodTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ 'CodigoEscola': "'CodEscola'", 'CodigoTipoEnsino': "'CodTpEnsino'", 'AnoLetivo': "'anoLetivo'" }]);
    $('#CodTurma').autoPreencher($('#CodDisciplina'), 'Disciplina', 'CarregarListaDisciplinas', [{ 'id': "'CodTurma'" }]);
        
    $("#frmEnviarSms").validate({
        rules: {
            'CodDiretoria': 'required',
            'CodEscola': 'required'
        },
        messages: {
            'CodDiretoria': 'Obrigatório',
            'CodEscola': 'Obrigatório'
        }
    });    
        
    $("#Tipo").change(function () {

        if ($("#Tipo").val() == "Func") {
            $('#divTurma').hide();
            $('#divDisciplina').hide();
            $('#divTpEnsino').hide();
        }
        else {
            $('#divTurma').show();
            $('#divDisciplina').show();
            $('#divTpEnsino').show();
        }
    });
    
});