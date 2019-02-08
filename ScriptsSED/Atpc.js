$(document).ready(function () {
    $("#VisualAtpc").dataTable({
        "bJQueryUI": true,
        "bFilter": true,
        "bSort": true,
        "bInfoEmpty": true,
        "bInfo": true,
        "bLengthMenu": true,
        "bPaginate": true,
        "bRetrieve": true,
        "bDestroy": true,
        "oLanguage": {
            "sProcessing": "Processando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "Não foram encontrados resultados",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
            "sInfoFiltered": "",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "Primeiro",
                "sPrevious": "Anterior",
                "sNext": "Seguinte",
                "sLast": "Último"
            },
            "sScrollX": "200px"
        }
    });
});

function AdicionarAtpc() {
    $.ajax({
        url: "/Atpc/CriarParametrizacaoAtpc",
        cache: false,
        type: "POST",
        dataType: "html",
        success: function (data) {
            $("#FormCadastroParametrizacaoAtpc")
                .html(data)
                .show()
                .dialog({
                    width: 600,
                    modal: true,
                    position: { my: "center", at: "top", of: ".tabela" },
                    show: {
                        position: { top: 500 },
                    }
                });
        }
    });
}

function EditarAtpc(cdAtpc) {
    $.ajax({
        url: '/Atpc/EditarParametrizacaoAtpc',
        type: 'POST',
        data: { cdAtpc: cdAtpc },
        success: function (data) {
            $("#FormEdicaoParametrizacaoAtpc").html(data).show()
                    .dialog({
                        width: 600,
                        modal: true,
                        position: { my: "center", at: "top", of: ".tabela" },
                        //show: {
                        //    effect: "slide"
                        //}
                    });
        }
    });
}

function ExcluirAtpc(elem, cdAtpc) {
    if (!confirm('Tem certeza que deseja excluir essa parametrização?'))
        return;

    $.ajax({
        url: '/Atpc/ExcluirAtpc',
        type: 'POST',
        data: { cdAtpc: cdAtpc },
        success: function (data) {
            if (!data.Sucesso)
                return;

            $('#VisualAtpc').dataTable().fnDeleteRow($('#VisualAtpc tr.odd, #VisualAtpc tr.even').index(elem.parents('tr')));
        }
    });
}

function CallbackAdicionarAtpc(data) {
    if (!data.Sucesso)
        return;

    var cdAtpc = data.CodigoAtpc;

    $('#VisualAtpc').dataTable().fnAddData([
        '<input type="hidden" value="' + cdAtpc + '" class="selCodigoAtpcLista"/>' + data.QuantidadeAulas,
        data.QuantidadeAulasMax,
        data.NumerosAtpc,
        '<a onclick="EditarAtpc(' + cdAtpc + ')"><i class="icone-tabela-editar" title="Editar"></i></a>',
        '<a onclick="ExcluirAtpc($(this), ' + cdAtpc + ')"><i class="icone-tabela-excluir" title="Excluir"></i></a>'
    ]);

    $("#FormCadastroParametrizacaoAtpc").dialog('close');
}

function CallbackEditarAtpc(data) {
    if (!data.Sucesso)
        return;

    var cdAtpc = data.CodigoAtpc;

    var tr = $('.selCodigoAtpcLista[value=' + data.CodigoAtpc + ']').parents('tr');

    tr.find('td').eq(0).html('<input type="hidden" value="' + cdAtpc + '" class="selCodigoAtpcLista"/>' + data.QuantidadeAulas);
    tr.find('td').eq(1).html(data.QuantidadeAulasMax);
    tr.find('td').eq(2).html(data.NumerosAtpc);

    $("#FormEdicaoParametrizacaoAtpc").dialog('close');
}