$(document).ready(function () {
    AplicarMascaras();
    $("#fAlunoPesquisa").validate({
        rules: {
            'txtRa': {
                required: true,
                number: true
            },
            'txtUfRa': {
                required: true,
                letras: true
            }
        },
        messages: {
            txtRa: {
                required: "Obrigatório",
                number: "Digite apenas números"
            },
            txtUfRa: {
                required: "Obrigatório",
                letras: "Digite apenas Letras"
            }
        },
        submitHandler: function (form) {
            if ($("#fAlunoPesquisa").valid()) {
                var parametrosController = {
                    ra: $('#txtRa').val(),
                    digRa: $('#txtDigRa').val(),
                    ufRa: $('#txtUfRa').val(),
                    anoLetivo: $("#txtAnoLetivo").val() != "" ? parseInt($("#txtAnoLetivo").val()) : 0
                }
                $.ajax({
                    type: "post",
                    url: 'ListarMatriculaAluno',
                    data: parametrosController,
                    dataType: 'html',
                    success: function (data) {
                        $('#divTurmaAluno').empty().html(data);
                        $('.tabela').sedDataTable({
                            nomeExportacao: "Horário de Aula",
                            columnDefs: [
			            { targets: [6], orderable: false }
                            ]
                        });
                    }
                });
            } else {
                return false;
            }
        }
    });

    $("#GradeAulaEscolaPesquisa").validate({
        rules: {
            'Turma.Escola.Diretoria.CD_DIRETORIA': {
                required: true
            },
            'Turma.Escola.CD_ESCOLA': 'required',
            'Turma.TipoEnsino.CD_TIPO_ENSINO': {
                required: {
                    depends: function (elemento) {
                        return $("#txtProfessor").val().length == 0;
                    }
                },
            },
            'Turma.CD_TURMA': {
                required: {
                    depends: function (elemento) {
                        return $("#txtProfessor").val().length == 0;
                    }
                },
            }
        }
    });

    $('#dllDiretoriaPesquisa').autoPreencher($('#dllEscolaPesquisa'), 'Escola', 'CarregarListaEscolas');
    $('#dllEscolaPesquisa').autoPreencher($('#ddlTipoEnsinoPesquisa'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    $('#ddlTipoEnsinoPesquisa').autoPreencher($('#dllTurmaPesquisa'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "'Turma.Escola.CD_ESCOLA'", CodigoTipoEnsino: "'Turma.TipoEnsino.CD_TIPO_ENSINO'" }]);

    $('#ddlTipoEnsino').autoPreencher($('#dllTurmaCadastro'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "'QuadroAula.Turma.Escola.CD_ESCOLA'", CodigoTipoEnsino: 'CodigoTipoEnsinoInserirAtribuicao' }], null, $('#formInserir'));

    $('.tabela').sedDataTable({
        nomeExportacao: "Horário de Aula",
        "bPaginate": false
    });

    $('#cboAnoLetivo').autoPreencher($('#cboAlunoResponsavel'), 'Aluno', 'ListarAlunoPorResponsavel');

    $('#cboAlunoResponsavel').change(function () {
        var cdAluno = $('#cboAlunoResponsavel').val();
        var AnoLetivo = $('#cboAnoLetivo').val();
        if (cdAluno.length > 0) {
            $.ajax({
                type: "post",
                url: 'GradeAulaAluno/GradeAulaAluno',
                data: { CodigoAluno: cdAluno, anoLetivo: AnoLetivo },
                dataType: 'html',
                success: function (data) {
                    $('#divGradeAlunoResponsavel').empty().html(data);
                    $('.tabela').sedDataTable({
                        nomeExportacao: "Horário de Aula",
                        "bPaginate": false
                    });
                }
            });
        }
    });



});


function carregarGradeAluno(cdAluno, anoLetivo) {
    $.ajax({
        type: "post",
        url: 'GradeAulaAluno/GradeAulaAluno',
        data: { CodigoAluno: cdAluno, anoLetivo: anoLetivo },
        dataType: 'html',
        success: function (data) {
            $('#divGradeAlunoResponsavel').empty().html(data);
            $('.tabela').sedDataTable({
                nomeExportacao: "Horário de Aula",
                "bPaginate": false
            });
        }
    });
}


function carregarGradeAlunoDialog(cdAluno, anoLetivo) {
    $.ajax({
        type: "post",
        url: 'GradeAulaAluno/GradeAulaAluno',
        data: { CodigoAluno: cdAluno, anoLetivo: anoLetivo },
        dataType: 'html',
        success: function (data) {
            if (data == null || data == "") {
                return false;
            };
            $('#divGradeAlunoResponsavel').empty().html(data);
            $('#divGradeAlunoResponsavel').dialog({ title: "Horário de Aula" , width:"800"});
            $('.tabela').sedDataTable({
                nomeExportacao: "Horário de Aula",
                "bPaginate": false
            });
        }
    });
}


function CompletoPesquisar() {
    $('#gridResultado').find('table').sedDataTable({
        nomeExportacao: "Horário de Aula",
        "bPaginate": false
    });
}


function SelecionaAnoLetivoAluno(cdAluno) {
    var anoLetivo = $('#ddlAnoLetivoAluno :selected').text();
    $.ajax({
        type: "post",
        url: '/GradeAulaAluno/GradeAulaAluno',
        data: { CodigoAluno: cdAluno, anoLetivo: anoLetivo },
        success: function (data) {
            if (data.length == 43) {
                $('#GradeAulaGridAluno').empty().html("<p>Nenhum registro foi encontrado para o ano letivo selecionado.</p>");
            }
            else {
                $('#GradeAulaGridAluno').html(data);
                $('.tabela').sedDataTable({
                    nomeExportacao: "Horário de Aula",
                    "bPaginate": false
                });
            }
        }
    });
}


function SelecionaAnoLetivoProfessor(cpfProfessor) {
    var anoLetivo = $('#ddlAnoLetivoProfessor :selected').text();
    $.ajax({
        type: "post",
        url: '/GradeAulaAluno/GradeAulaProfessor',
        data: { anoLetivo: anoLetivo, cpf: cpfProfessor },
        success: function (data) {

            if (data.length == 761) {//nenhum registro encontrado // WHAAAAT?????
                $('#GradeAulaGridProfessor').empty().html("<p>Nenhum registro foi encontrado para o ano letivo selecionado.</p>");
            }
            else {
                $('#GradeAulaGridProfessor').html(data);
                $('.tabela').sedDataTable({
                    nomeExportacao: "Horário de Aula",
                    "bPaginate": false
                });
            }
        }
    });
}

