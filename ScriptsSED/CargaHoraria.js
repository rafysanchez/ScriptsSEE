$(document).ready(function () {
    CargaHoraria.CarregarCombos();
    CargaHoraria.Validacaoes();
    CargaHoraria.PesquisarCargaHoraria();
    CargaHoraria.Reprocessar();
    AplicarMascaras();
});

var CargaHoraria = {
    CarregarCombos: function () {
        //$("#cboDiretoria").autoPreencher($("#cboEscola"), "Escola", "CarregaListaEscolasPorDiretoria",
        //    [{ CodigoDiretoria: "'cboDiretoria'" }]);

        $('#cboDiretoria').autoPreencher($('#cboEscola'), 'Escola', 'CarregarListaEscolas');
        $('#dtUltimoProcessamentoDiv').hide();
    },

    Validacaoes: function () {
        $('#formCargaHoraria').validate({
            rules: {
                //cboDiretoria: { required: true },
                //cboEscola: { required: true },
                //txtCpfCH: { required: false },
                AnoLetivo: { minlength: 4 }
            },

            //messages: {
            //    required: 'Obrigatório',
            //    AnoLetivo: { minlength: 'Ano inválido' }
            //}
        });
    },


    PesquisarCargaHoraria: function () {
        $('#btnPesquisar').click(function () {
            if (!$('#hdnEhDiretoria').val()) {
                if ($("#ddlOpcMenu").val() == "") {
                    Mensagem.Alert({
                        titulo: "Alerta",
                        mensagem: "Selecione a forma de Cadastro",
                        tipo: "Alerta",
                        botao: "Fechar"
                    });
                    return;
                }

                if ($('#cboDiretoria :selected').val() == 0) {
                    $("[name='txtCpfCH']").rules('add', { required: true });
                    $("[name='cboEscola']").rules('add', { required: false });

                    if ($('#cboEscola :selected').val() > 0) {
                        $("[name='txtCpfCH']").rules('add', { required: false });
                    }
                } else {
                    $("[name='txtCpfCH']").rules('add', { required: false });
                    $("[name='cboEscola']").rules('add', { required: true });
                }
            }
            else {
                if ($('#cboEscola :selected').val() > 0)
                    $("[name='txtCpfCH']").rules('add', { required: false });
                else
                    $("[name='txtCpfCH']").rules('add', { required: true });

            }

            $("#ddlOpcMenu").rules('add', {
                required: true, messages: {
                    required: "Necessário selecionar um tipo de cadastro"
                }
            });

            if (!$('#formCargaHoraria').valid()) return;

            var params = {
                cpf: String($('#formCargaHoraria #txtCpf').val()),
                anoLetivo: $('#formCargaHoraria #txtAnoLetivo').val().length == 0 ? 0 : $('#formCargaHoraria #txtAnoLetivo').val(),
                codDiretoria: parseInt($('#formCargaHoraria #cboDiretoria').val()),
                codEscola: parseInt($('#formCargaHoraria #cboEscola').val()),
                afastamento: $("#ddlOpcMenu").val()
            };


            var f = new Array();

            $("#formCargaHoraria .form-group").each(
                function (i, e) {
                    var v = $(e).children("label").next("div").children("input, textarea, select").eq(0);
                    if (v.val() != null || v.val().trim().length > 0)
                        f.push({ nome: $(e).children("label").html().replace(":", ""), valor: $(v).children("option").length == 0 ? $(v).val() : $(v).children("option:selected").html() });
                });


            if ($("#ddlOpcMenu").val() == 1) {

                $.post('../../CargaHorario/Pesquisa', params, function (data) {
                    $('#divPesquisa').empty().html(data);
                    $('#dtUltimoProcessamentoDiv').show();

                    $('#tbPesquisaCargaHoraria').sedDataTable({
                        nomeExportacao: "Pesquisa",
                        filtros: f,
                        columnDefs: [
                             { targets: [6, 7], orderable: false },
                        ]
                    });

                }, 'html');
            }
            else if ($("#ddlOpcMenu").val() == 2) {
                $.post('../../CargaHorario/PesquisaAfastamento', params, function (data) {
                    $('#divPesquisa').empty().html(data);

                    $('#tbPesquisaCargaHoraria').sedDataTable();

                }, 'html');
            }



        });
    },

    CarregarAfastamento: function (id) {
        var params = {
            ID_ISN: id
        };

        $.ajax({
            cache: false,
            url: '../../CargaHorario/DetalheCargaHorariaAfastamento',
            type: 'POST',
            datatype: 'html',
            data: params,
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data.length > 0) {
                    $('#divGridCargaHoraria').empty().html(data);

                    $('#divGridCargaHoraria').dialog({
                        title: "Carga Horária Afastamento",
                        width: 910,
                        position: ['center', 0]
                    });


                    $('#tbPesquisaAssocicaoAtpcPro').sedDataTable();

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });

    },

    DetalheCargaHoraria: function (id) {

        $.ajax({
            cache: false,
            url: '../../CargaHorario/DetalheCargaHoraria',
            type: 'POST',
            datatype: 'html',
            data: { id_isn: id },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data.length > 0) {
                    $('#divGridCargaHoraria').empty().html(data);

                    $('#divGridCargaHoraria').dialog({
                        title: "Carga Horária",
                        width: 910,
                        position: ['center', 0]
                    });


                    $('#tbPesquisaAssocicaoAtpcPro').sedDataTable();

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });

    },
    Error: function (d) {
        $('#divGridCargaHoraria').empty().html(d);

        $('#divGridCargaHoraria').dialog({
            title: "Carga Horária - Erro Folha",
            width: 910,
            position: ['center', 0]
        });
    },

    Reprocessar: function () {
        $('#btnReprocessar').click(function () {
            $("[name='txtCpfCH']").rules('add', { required: true });
            if (!$('#formCargaHoraria').valid())
                return;
            $.post('../../CargaHorario/Reprocessar', { cpf: $('#txtCpf').val() }, function () {
            })
        });
    },

    RejeitarCargaHoraria: function (id) {
        $.post('../../CargaHorario/Rejeitar', { id: id }, function () {
            $('#btnPesquisar').click();
        });
    }
};
