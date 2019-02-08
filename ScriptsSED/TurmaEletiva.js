
$(document).ready(function () {
    $('#ddlDiretoriaPesquisar').autoPreencher($('#ddlEscolaPesquisar'), 'Escola', 'CarregaListaEscolasIntegral');
    $("#tblTurmaEletiva").sedDataTable();
    $("#tblListarTurmasEletivas").sedDataTable();
    $("#tblListarInscritosTurmaEletivas").sedDataTable();

    $('#frmIndexEletiva').validate({
        rules: {
            ddlDiretoriaPesquisar: { required: true },
            ddlEscolaPesquisar: { required: true }  

        },
        messages: {
            ddlDiretoriaPesquisar: { required: "Campo obrigatório" },
            ddlEscolaPesquisar: { required: "Campo obrigatório" }
        }
    });
});

    
function fct_CriarTurmaEletiva() {
    if (($("#frmIndexEletiva").validate().form())) {
        var codigoDiretoria = $("#ddlDiretoriaPesquisar option:selected").val();
        var codigoEscola = $("#ddlEscolaPesquisar option:selected").val();
        $("#DialogCriarTurmaEletiva").html("")
            .dialog()
            .load('ViewInserir', { "codigoDiretoria": codigoDiretoria, "codigoEscola": codigoEscola }, function () {
                $('#DialogCriarTurmaEletiva').dialog({
                    resizable: false,
                    width: 750,
                    modal: true,
                    position: ['center', 0],
                    close: function () {
                        $('#DialogCriarTurmaEletiva').html('');
                    },
                    open: function (event, ui) {
                        $(".ui-dialog-buttonset").css({
                            "float": "none",
                            "text-align": "center"
                        });

                        $(".ui-dialog-buttonpane").css({ "border-width": "0 0 0 0" });
                    }
                });
            });
    }
}

function fct_Salvar() {
    if (($("#frmTurmaEletiva").validate().form())) {
        $.ajax({
            url: 'Salvar',
            type: "POST",
            data: $("#frmTurmaEletiva").serialize(),
            success: function (data) {
                $("#DialogCriarTurmaEletiva").dialog("close");
                fct_PesquisarTurmaEletiva();
            }
        });
    }
}

function fct_ExcluirTurmaEletiva(codigoTurmaEletiva) {
    if (!confirm('Tem certeza que deseja excluir essa Turma Eletiva?'))
        return;

    $.ajax({
        url: '/TurmaEletiva/Excluir',
        type: 'POST',
        data: { codigoTurmaEletiva: codigoTurmaEletiva },
        success: function () {
            fct_PesquisarTurmaEletiva();
        }
    });
}


function fct_Editar() {
    if (($("#frmTurmaEletiva").validate().form())) {
        $.ajax({
            url: 'Editar',
            type: "POST",
            data: $("#frmTurmaEletiva").serialize(),
            success: function (data) {
                $("#DialogEditarTurmaEletiva").dialog("close");
                fct_PesquisarTurmaEletiva();
            }
        });
    }
}


function fct_EdtiarTurmaEletiva(codigoTurmaEletiva) {
    $("#DialogEditarTurmaEletiva").html("")
            .dialog()
            .load('ViewEditar', { "codigoTurmaEletiva": codigoTurmaEletiva }, function () {
                $('#DialogEditarTurmaEletiva').dialog({
                    resizable: false,
                    width: 750,
                    modal: true,
                    open: function (event, ui) {
                        $(".ui-dialog-buttonset").css({
                            "float": "none",
                            "text-align": "center"
                        });

                        $(".ui-dialog-buttonpane").css({ "border-width": "0 0 0 0" });
                    },
                    close: function () {
                        $('#DialogEditarTurmaEletiva').html('');
                    }
                });
            });
}

function fct_VisualizarTurmaEletiva(codigoTurmaEletiva) {
    $("#DialogVisualizarTurmaEletiva").html("")
        .dialog()
        .load('ViewVisualizar', { "codigoTurmaEletiva": codigoTurmaEletiva }, function () {
            $('#DialogVisualizarTurmaEletiva').dialog({
                resizable: false,
                width: 750,
                modal: true,
                position: ['center', 0],
                close: function () {
                    $('#DialogVisualizarTurmaEletiva').html('');
                },
            });
        });
}


function fct_SalvarInscricaoTurmaEletiva() {
    var codigoTurmaEletiva = $("#rdbInscricao:checked").val();

    if (codigoTurmaEletiva > 0) {
        $.ajax({
            url: '/InscricaoTurmaEletiva/Salvar',
            type: 'POST',
            data: { codigoTurmaEletiva: codigoTurmaEletiva },
            success: function () { }
        });
    } else {
        alert("Selecione uma Disciplina Eletiva para prosseguir com a Inscrição");
    }

}


function fct_PesquisarTurmaEletiva() {
    var codigoDiretoria = $("#ddlDiretoriaPesquisar option:selected").val();
    var codigoEscola = $("#ddlEscolaPesquisar option:selected").val();
    $.ajax({
        url: '/TurmaEletiva/PesquisarTurmaEletiva',
        type: 'GET',
        data: { codigoDiretoria: codigoDiretoria, codigoEscola: codigoEscola },
        success: function (data) {
            $("#divListarTurmaEletiva").html(data);
            $("#tblTurmaEletiva").sedDataTable();
        }
    });
}

function fct_PesquisarTurmaEletivaInscricao() {
    if (($("#frmIndexEletiva").validate().form())) {
        var codigoDiretoria = $("#ddlDiretoriaPesquisar option:selected").val();
        var codigoEscola = $("#ddlEscolaPesquisar option:selected").val();
        $.ajax({
            url: '/InscricaoTurmaEletiva/SelecionarTurmasEletivasPorDiretoriaEscola',
            type: 'GET',
            data: { codigoDiretoria: codigoDiretoria, codigoEscola: codigoEscola },
            success: function (data) {
                $("#divListarTurmaEletiva").html(data);
                $("#tblTurmaEletiva").sedDataTable();
            }
        });
    }
}

function fct_CriarTurmaELetiva() {
    $.ajax({
        url: '/InscricaoTurmaEletiva/SelecionarTurmasEletivasPorDiretoriaEscola',
        type: 'GET',
        data: { codigoDiretoria: codigoDiretoria, codigoEscola: codigoEscola },
        success: function (data) {
            $("#divListarTurmaEletiva").html(data);
            $("#tblTurmaEletiva").sedDataTable();
        }

    });
}

function fct_PesquisarSelecaoInscritosTurmaEletiva() {
    var codigoDiretoria = $("#ddlDiretoriaPesquisar option:selected").val();
    var codigoEscola = $("#ddlEscolaPesquisar option:selected").val();


    $.ajax({
        url: '/InscricaoTurmaEletiva/SelecionarInscricaoTurmasEletivasPorDiretoriaEscola',
        type: 'GET',
        data: { codigoDiretoria: codigoDiretoria, codigoEscola: codigoEscola },
        success: function (data) {
            $("#divListarTurmasEletivas").html(data);
            $("#tblListarTurmasEletivas").sedDataTable();
        }

    });
}

function fct_SalvarSelecaoAlunosTurmaEletiva() {
    $.ajax({
        url: 'SalvarSelecaoAlunos',
        type: 'POST',
        data: $("#frmSelecaoAlunos").serialize(),
        success: function (data) {
            $("#DialogSelecaoAlunosInscritosTurmaEletiva").dialog("close");
        }
    });
}


function fct_SelecaoAlunosTurmaEletiva(codigoTurmaEletiva) {

    $("#DialogSelecaoAlunosInscritosTurmaEletiva").html("")
           .dialog()
           .load('ListarAlunosInscritosTurmaEletiva', { "codigoTurmaEletiva": codigoTurmaEletiva }, function () {
               $("#tblListarInscritosTurmaEletivas").sedDataTable();
               $('#DialogSelecaoAlunosInscritosTurmaEletiva').dialog({
                   resizable: false,
                   width: 750,
                   modal: true,
                   open: function (event, ui) {
                       $(".ui-dialog-buttonset").css({
                           "float": "none",
                           "text-align": "center"
                       });

                       $(".ui-dialog-buttonpane").css({ "border-width": "0 0 0 0" });

                   },
                   position: ['center', 0],
                   success: function (data) {
                       $("#divListarInscritosTurmaEletiva").html(data);
                       $("#tblListarInscritosTurmaEletivas").sedDataTable();
                   },
                   close: function () {
                       $('#DialogSelecaoAlunosInscritosTurmaEletiva').html('');
                   },
               });
           });

}

function ListarAlunosInscritosTurmaEletiva(codigoTurmaEletiva) {
    $.ajax({
        url: '/InscricaoTurmaEletiva/ListarAlunosInscritosTurmaEletiva',
        type: 'GET',
        data: { codigoTurmaEletiva: codigoTurmaEletiva },
        success: function (data) {
            $("#divListarInscritosTurmaEletiva").html(data);
            $("#tblListarInscritosTurmaEletivas").sedDataTable();
        }

    });
}







