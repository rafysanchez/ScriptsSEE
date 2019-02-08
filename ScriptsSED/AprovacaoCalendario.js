function ControlaBotoes() {
    $(document).ready(function () {
        $("#chkTodos").click(function () {
            if ($("#chkTodos").prop("checked") == true) {
                $("#btnAprovar").show();
                $("#btnRejeitar").show();
            }
            else {
                $("#btnAprovar").hide();
                $("#btnRejeitar").hide();
            }
        });

        $('body').on('change', '.chkEvento', function () {
            $("#navAprov").show();
            if ($(".chkEvento:checked").length > 0) {
                $("#btnAprovar").show();
                $("#btnRejeitar").show();
            }
            else {
                $("#btnAprovar").hide();
                $("#btnRejeitar").hide();
            }

            if ($(".chkEvento:checked").length == 0) {
                $("#chkTodos").prop('checked', false);
            }
        });

        //$(".chkEvento").change(function () {

        //});
    });
}

function CarregarEventos() {
    var codigoEscola = $('#CodigoEscola').val();
    var url = $('#hdnUrl').val();
    var aprovados = $('#aprovados').prop("checked");
    var rejeitados = $('#rejeitados').prop("checked");

    if (codigoEscola > 0) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                codigoEscola: parseInt(codigoEscola),
                aprovados: aprovados,
                rejeitados: rejeitados
            }),
            url: url,
            success: function (data, textStatus, jqXHR) {
                $('div#divEventos').html(data);
                $('.tabela').sedDataTable();

                $('#navAprov').hide();

                $('#tbEventos input[type=checkbox]').change(function () {
                    if ($('#tbEventos input[type=checkbox]:checked').length > 0) {
                        $('#navAprov').fadeIn(1);
                    } else {
                        $('#navAprov').fadeOut(1);

                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
}

function VisualizarEvento(codigoEvento) {
    var codigoDiretoria = $('#CodigoDiretoria').val().length > 0 ? parseInt($('#CodigoDiretoria').val()) : 0;
    var codigoEscola = $('#CodigoEscola').val().length > 0 ? parseInt($('#CodigoEscola').val()) : 0;

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            id: parseInt(codigoEvento),
            codigoDiretoria: codigoDiretoria,
            codigoEscola: codigoEscola
        }),
        url: '/AprovacaoCalendario/Visualizar',
        success: function (data, textStatus, jqXHR) {
            $('div#visualizacao').html(data);

            $('div#visualizacao').find('nav').remove();

            $('div#visualizacao').dialog({
                width: 850,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top"
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function SelecionarTodos(chkTodos) {
    var valor = $(chkTodos).prop("checked");
    $('.chkEvento').prop("checked", valor);
}

function Aprovar() {
    if ($(".chkEvento:checked").length > 0) {
        var listaEvento = [];
        $("#tbEventos tbody tr").each(function () {
            if ($(this).find('.chkEvento').prop("checked") == true) {
                listaEvento.push({
                    cdEvento: $(this).data("codigoevento")
                });
            }
        });

        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                listaEventos: JSON.stringify(listaEvento)
            }),
            url: '/AprovacaoCalendario/SalvarAprovacao',
            success: function (data, textStatus, jqXHR) {
                CarregarEventos();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
        });
    }
}

function Ratificar() {
    if ($(".chkEvento:checked").length > 0) {
        var listaEvento = [];
        $("#tbEventos tbody tr").each(function () {
            if ($(this).find('.chkEvento').prop("checked") == true) {
                listaEvento.push({
                    cdEvento: $(this).data("codigoevento")
                });
            }
        });

        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                listaEventos: JSON.stringify(listaEvento)
            }),
            url: '/AprovacaoCalendario/SalvarRatificacao',
            success: function (data, textStatus, jqXHR) {
                CarregarEventos();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
        });
    }
}

function Homologar() {
    if ($(".chkEvento:checked").length > 0) {
        var listaEvento = [];
        $("#tbEventos tbody tr").each(function () {
            if ($(this).find('.chkEvento').prop("checked") == true) {
                listaEvento.push({
                    cdEvento: $(this).data("codigoevento")
                });
            }
        });

        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                listaEventos: JSON.stringify(listaEvento)
            }),
            url: '/AprovacaoCalendario/SalvarHomologacao',
            success: function (data, textStatus, jqXHR) {
                CarregarEventos();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
        });
    }
}

function Rejeitar() {
    if ($(".chkEvento:checked").length > 0) {
        var listaEvento = [];
        $("#tbEventos tbody tr").each(function () {
            if ($(this).find('.chkEvento').prop("checked") == true) {
                listaEvento.push({
                    cdEvento: $(this).data("codigoevento")
                });
            }
        });

        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                listaEventos: JSON.stringify(listaEvento)
            }),
            url: '/AprovacaoCalendario/SalvarRejeitado',
            success: function (data, textStatus, jqXHR) {
                CarregarEventos();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
        });
    }
}

function CarregarStatusEventos() {
    var codigoEscola = $('#CodigoEscola').val();

    if (codigoEscola > 0) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                codigoEscola: parseInt(codigoEscola)
            }),
            url: '/AprovacaoCalendario/EventosEmAprovacaoParcial',
            success: function (data, textStatus, jqXHR) {
                $('div#divStatusEventos').html(data);
                $('.tabela').sedDataTable();
            }
        });
    }
}