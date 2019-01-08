$("#tblEncaminhamento").sedDataTable({
    columnDefs: [
        { targets: [0,8], orderable: false },
    ],
    order: [[1, "asc"]],
    scrollY: '50vh',
    scrollCollapse: true,
    paging: false
});



$("#tblEncaminhamentoVisualiza").sedDataTable({
    columnDefs: [
        { targets: [0], orderable: false },
    ],
    order: [[1, "asc"]],
    scrollY: '50vh',
    scrollCollapse: true,
    paging: false
});



validarTodosRepassesEnviadosParaAPesquisaVigente();


$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        delay: { "show": 0, "hide": 100 }
    })
});

$('#chkTodos').change(function () {
    if ($(this).prop('checked')) {
        $('tbody tr td input[type="checkbox"]').each(function () {
            $(this).prop('checked', true);
        });
    } else {
        $('tbody tr td input[type="checkbox"]').each(function () {
            $(this).prop('checked', false);
        });
    }
});


$("#tblEncaminhamento").on('click', '#chkRepasse', function () {
    var _naoChecados = 0;
    if ($(this).is(":checked")) {
        $('#tblEncaminhamento > tbody > tr').each(function () {
            if (!$($(this).find('#chkRepasse')).is(":checked") && $(this).attr('data-status') == "False") {
                _naoChecados += 1;
            }
        });
        _naoChecados > 0 ? $('#chkTodos').prop('checked', false) : $('#chkTodos').prop('checked', true);
    }
    else {
        $('#chkTodos').prop('checked', false);
    }
});

function validarTodosRepassesEnviadosParaAPesquisaVigente() {

    var naoChecados = 0;
    $('#tblEncaminhamento > tbody > tr').each(function () {
        if ($(this).attr('data-status') == "False") {
            naoChecados += 1;
        }
    });
    if (naoChecados > 0) {
        $("#glyphiconTodosChecados").hide();
        $('#chkTodos').show();
        $('#btnEncaminhar').removeAttr('disabled');
    }
    else {
        $("#glyphiconTodosChecados").show();
        $('#chkTodos').hide();
        $('#btnEncaminhar').attr('disabled', 'disabled');
    }
}