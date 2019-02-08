//Carrega lista de ensino
function IniciaListaEnsino() {
    var url = '/ConteudoProgramatico/CarregaListaEnsino';
    //Objeto[Objeto.selectedIndex].value;
    $.ajax({
        url: url,
        type: 'Post',
        data: { CodigoEscola: 0 },
        success: function (data) {
            var items = "";
            items += "<option value=''>SELECIONE...</option>";
            $.each(data, function (i, val) {
                items += "<option value='" + val.codigoTipoEnsino + "' title='" + val.NomeTipoCurso + "'>" + val.NomeTipoCurso + "</option>";
            });
            $("select#tipoEnsino").empty().html(items);
            $("select#serie").empty();
            $("select#disciplina").empty();
        }
    });

}

//Carrega lista Série
function PesquisaListaSerie() {
    var url = '/ConteudoProgramatico/CarregaListaSerie';
    $.ajax({
        url: url,
        type: 'POST',
        data: { TipoDeEnsino: $("select#tipoEnsino").val() },
        success: function (data) {
            var items = "";
            items += "<option value=''>SELECIONE...</option>";
            $.each(data, function (i, val) {
                items += "<option value='" + val.value + "' title='" + val.termo + "'>" + val.text + "</option>";
            });
            $("select#serie").empty().html(items);
        }
    });
}

//Carrega lista Disciplina
function PesquisaListaDisciplina() {
    var url = '/ConteudoProgramatico/CarregaListaDisciplina';
    $.ajax({
        url: url,
        type: 'POST',
        data: { TipoDeEnsino: $("select#tipoEnsino").val(), NrSerie: $("#Serie").val() },
        success: function (data) {
            var items = "";
            items += "<option value=''>SELECIONE...</option>";
            $.each(data, function (i, val) {
                items += "<option value='" + val.CD_DISCIPLINA + "' title='" + val.NOME_DISCIPLINA + "'>" + val.NOME_DISCIPLINA + "</option>";
            });
            $("select#disciplina").empty().html(items);
        }
    });
}

//Carrega lista Ano Letivo
function PesquisaListaAnoLetivo() {
    var items = "";
    items += "<option value=''>SELECIONE...</option>";
    var d = new Date();
    var n = d.getFullYear().toString();

    for(i = 2013;i<parseInt(n) + 10; i++) {
        items += "<option value='" + i + "' title='" + i.toString() + "'>" + i.toString() + "</option>";
    };
    $("select#anoLetivo").empty().html(items);
}

function CarregaListaEnsino() {
    var url = '/ConteudoProgramatico/CarregaListaEnsino';
    //Objeto[Objeto.selectedIndex].value;
    $.ajax({
        url: url,
        type: 'Post',
        data: { CodigoEscola: 0 },
        success: function (data) {
            var items = "";
            items += "<option value=''>SELECIONE...</option>";
            $.each(data, function (i, val) {
                items += "<option value='" + val.codigoTipoEnsino + "' title='" + val.NomeTipoCurso + "'>" + val.NomeTipoCurso + "</option>";
            });
            $("select#tipoEnsino").empty().html(items);
            $("select#serie").empty();
            $("select#disciplina").empty();

            if ($('#CodigoTipoEnsino').val().length > 0) {
                $('select#tipoEnsino').val($('#CodigoTipoEnsino').val()).change();
            }

        }
    });

}

//Carrega lista Série
function CarregaListaSerie() {
    var url = '/ConteudoProgramatico/CarregaListaSerie';
    $.ajax({
        url: url,
        type: 'POST',
        data: { TipoDeEnsino: $("select#tipoEnsino").val() },
        success: function (data) {
            var items = "";
            items += "<option value=''>SELECIONE...</option>";
            $.each(data, function (i, val) {
                items += "<option value='" + val.NR_SERIE + "' title='" + val.NM_TERMO + "'>" + val.NR_SERIE + " " + val.NM_TERMO + "</option>";
            });
            $("select#serie").empty().html(items);
            
            if ($('#Serie').val().length > 0) {
                $('select#serie').val($('#Serie').val()).change();
            }
        }
    });
}

//Carrega lista Disciplina
function CarregaListaDisciplina() {
    var url = '/ConteudoProgramatico/CarregaListaDisciplina';
    $.ajax({
        url: url,
        type: 'POST',
        data: { TipoDeEnsino: $("select#tipoEnsino").val(), NrSerie: $("#Serie").val() },
        success: function (data) {
            var items = "";
            items += "<option value=''>SELECIONE...</option>";
            $.each(data, function (i, val) {
                items += "<option value='" + val.CD_DISCIPLINA + "' title='" + val.NOME_DISCIPLINA + "'>" + val.NOME_DISCIPLINA + "</option>";
            });
            $("select#disciplina").empty().html(items);
            
            if ($('#CodigoDisciplina').val().length > 0) {
                $('select#disciplina').val($('#CodigoDisciplina').val()).change();
            }
        }
    });
}

//Carrega lista Ano Letivo
function CarregaListaAnoLetivo() {
    var items = "";
    items += "<option value=''>SELECIONE...</option>";
    var d = new Date();
    var n = d.getFullYear().toString();

    for (i = 2013; i < parseInt(n) + 10; i++) {
        items += "<option value='" + i + "' title='" + i.toString() + "'>" + i.toString() + "</option>";
    };
    $("select#anoLetivo").empty().html(items);
    
    if ($('#AnoLetivo').val().length > 0) {
        $('select#anoLetivo').val($('#AnoLetivo').val()).change();
    }
}

function CarregaParcial() {

    if ($("select#tipoEnsino").val().length > 0 & $("select#disciplina").val().length > 0) {
        CarregaConteudoProgramatico();
    }
    else {
        error: {
            alert('Preencha os filtros Tipo de Ensino e Disciplina para pesquisa.');
        }
    }
}

//Carrega ViewPartial calendario
function CarregaConteudoProgramatico() {
    $.ajax({
        cache: false,
        url: "/ConteudoProgramatico/CarregarParcial",
        type: 'POST',
        datatype: 'html',
        data: {
            anoLetivo: $("#AnoLetivo").val(),
            tipoEnsino: $("select#CodigoTipoEnsino").val(),
            serie: $("select#Serie").val(),
            bimestre: $("select#Bimestre").val(),
            disciplina: $("select#CodigoDisciplina").val()
        },
        success: function (data) {
            $("div#resultado").html(data);
            $("#table").dataTable({
                "sScrollX": "200%",
                bJQueryUI: true,
                "oLanguage": {
                    "sProcessing": "Processando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "Não foram encontrados resultados",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                    "sInfoFiltered": "(filtrado de _MAX_ registros no total)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "Primeiro",
                        "sPrevious": "Anterior",
                        "sNext": "Seguinte",
                        "sLast": "Último"
                    }
                }
            });
        },
        error: function () { alert('Ocorreu um erro durante o processo'); }
    });
}
