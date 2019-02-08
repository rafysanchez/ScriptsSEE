$(document).ready(function () {
    ValidarFormNovoCad();
    ValidarFormEdicao();
    $('#txtTipoAtribuicao option[value="11"]').remove();

    $('#ddlPesquisaDiretoria').autoPreencher($('#ddlPesquisaEscola'), 'Escola', 'CarregarListaEscolas');
    $('#ddlPesquisaEscola').change(function () {
        $valEscola = $('#ddlPesquisaEscola').val();
        if ($valEscola != "") {
            $.post('/AtribuicaoEspecial/ValidarTipoEnsino', { codEscola: $valEscola, codTipoEnsino: 76, codAnoLetivo: $('#AnoLetivo').val() }, function (data) {
                if (data == "True") {
                    $('#txtTipoAtribuicao').append($('<option>', {
                        value: 11,
                        text: 'VENCE - ARTICULAÇÃO'
                    }));
                }
                else {
                    $('#txtTipoAtribuicao option[value="11"]').remove();
                }
            });
        }
    });

    $('#txtTipoAtribuicao').change(function () {
        if ($('#txtTipoAtribuicao').val() == 13) {
            $('#divDisciplina').prop("hidden", false);
        }
        else {
            $('#divDisciplina').prop("hidden", true);
            $('#ddlDisciplina').val("");
        }
    });

    $('#frmPesquisa #btnPesquisar').click(function (e) {
        e.preventDefault();
        var f = new Array();
        $("#form-filtros .form-group").each(
            function (i, e) {
                var v = $("#" + $(e).children("label").attr("for"));
                if (v.val() != null)
                    f.push({ nome: $(e).children("label").html().slice(0, $(e).children("label").html().length - 1), valor: $(v).children("option").length == 0 ? $(v).val() : $(v).children("option:selected").html() });
            });
        $.post('/AtribuicaoEspecial/Listar', $("#frmPesquisa").serialize(), function (data) {
            $('#dadosPesquisa').html(data);
            AplicarMascaras();
            $('#dadosPesquisa .tabela').sedDataTable({
                columnDefs: [
			            { targets: [3], orderable: false },
                ],
                filtros: f,
                nomeExportacao: "Atribuição Especial",
                tituloFiltro: "     "
            });
            //$('#dadosPesquisa .tabela tbody .visualizar').click(function () {
            //    $('#dvModal').load('/AtribuicaoEspecial/Visualizar', { id: $(this).attr('cdAtribMed') }, function () {
            //        AplicarMascaras();
            //        TriggerLinks();
            //        $('#frmVisualizar').find('input').prop('readonly', true);
            //        $('#checkAulaNoturna').attr('disabled', 'disabled');
            //        $('#dvModal select').attr('disabled', 'disabled');
            //        $('#DadosAcaoJudicial').attr('disabled', 'disabled');


            //    }).show().dialog({
            //        modal: true,
            //        title: "Atribuição Especial",
            //        width: 810,
            //        position: ['center', 0]
            //    });
            //});
        });
    });

    $("#lnkNovo").click(function (e) {
        e.preventDefault();

        $('#dvModal').load('/AtribuicaoEspecial/Adicionar', function () {
            AplicarMascaras();
            $('#qtdeAulasNoturnas').hide();

            $('#checkAulaNoturna').change(function () {
                if ($('#checkAulaNoturna').is(':checked'))
                    $('#qtdeAulasNoturnas').show();
                else
                    $('#qtdeAulasNoturnas').hide();
            });

            $('#AcaoJudicial').val() > 0 ? $('#AcaoJudicial').hide() : 0;

            $('#frmAdicionar #ddlDiretoria').autoPreencher($('#frmAdicionar #ddlEscola'), 'Escola', 'CarregarListaEscolas');
            $('#frmAdicionar #ddlEscola').val('');
            $('#frmAdicionar #ddlEscola').change(function () {
                $('#frmAdicionar #nrDiPaa').val("");
                $("#frmAdicionar #TipoAtribuicaoEspecial option[value='13']").remove();
                $valEscola = $('#frmAdicionar #ddlEscola').val();
                if ($valEscola != "") {
                    $.post('/AtribuicaoEspecial/ValidarTipoEnsino', { codEscola: $valEscola, codTipoEnsino: 76, codAnoLetivo: $('#frmAdicionar #AnoLetivo').val() }, function (data) {
                        if (data == "True") {
                            $('#frmAdicionar #TipoAtribuicaoEspecial').append($('<option>', {
                                value: 11,
                                text: 'VENCE - ARTICULAÇÃO'
                            }));
                        }
                        else {
                            $('#frmAdicionar #TipoAtribuicaoEspecial option[value="11"]').remove();
                        }
                    });

                    $.post('/AtribuicaoEspecial/ListarTipoEnsino', { codEscola: $valEscola, anoLetivo: $('#frmAdicionar #AnoLetivo').val() }, function (data) {
                        $('#frmAdicionar #CodTipoEnsino option').each(function () {
                            if($(this).val() != '')
                                $(this).remove();
                        });

                        if (data != null) {
                            var sel = $('#frmAdicionar #CodTipoEnsino');
                            $(data).each(function () {
                                sel.append($("<option>").attr('value', this.value).text(this.text));
                            });
                        }                             
                    });
                }
            });

            //$('#frmAdicionar #TipoAtribuicaoEspecial').change(function () {
            //    if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() == 11) {
            //        $('#frmAdicionar #divDisciplina').prop("hidden", false);
            //    }
            //    else {
            //        $('#frmAdicionar #divDisciplina').prop("hidden", true);
            //        $('#frmAdicionar #ddlDisciplina').val("");
            //    }
            //});

            $('#frmAdicionar').validate({
                rules: {
                    AnoLetivo: "required",
                    CdDiretoria: "required",
                    CdEscola: "required",
                    InicioVigencia: "required",
                    FimVigencia: "required",
                    "Disciplina.CD_DISCIPLINA": {
                        required: function () {
                            return Boolean($('#frmAdicionar #TipoAtribuicaoEspecial').val() == 13);
                        }
                    },
                    DadosAcaoJudicial: {
                        required: function () {
                            return Boolean($('#frmAdicionar #TipoAtribuicaoEspecial').val() == 12);
                        }
                    },
                    CodTipoEnsino: "required",
                    QtAulasSemana: {
                        required: function () {
                            if ($('#frmAdicionar #QtAulasSemana').parent().parent().css('display') == 'block') {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                    },
                    "Professor.NumeroCpf": "required",
                    "FaseEtapa.codFaseAtribuicao": "required",
                    "Professor.Di": "required",
                    TipoAtribuicaoEspecial: "required",
                    qtdeAulasNoturnas: {
                        required: function () {
                            return Boolean($('#frmAdicionar #checkAulaNoturna').val());
                        }
                    }
                },
                messages: {
                    AnoLetivo: "Obrigatório",
                    CdDiretoria: "Obrigatório",
                    CdEscola: "Obrigatório",
                    InicioVigencia: "Obrigatório",
                    FimVigencia: "Obrigatório",                    
                    "Disciplina.CD_DISCIPLINA": "Obrigatório",
                    DadosAcaoJudicial: "Obrigatório",
                    CodTipoEnsino: "Obrigatório",
                    "FaseEtapa.codFaseAtribuicao": "Obrigatório",
                    "Professor.NumeroCpf": "Obrigatório",
                    "Professor.Di": "Obrigatório",
                    QtAulasSemana: "Obrigatório",
                    TipoAtribuicaoEspecial: "Obrigatório",
                    qtdeAulasNoturnas: "Obrigatório"
                }
            });

            $("#frmAdicionar #btnGravar").click(function (ev, postback) {
                ev.preventDefault();

                if (!$('#frmAdicionar').valid())
                    return;

                if ($('#nrDiPaa').val() <= 0) {
                    alert('Di tem que ser maior que 0.');
                    return false;
                }

                if ($('#hdnDtInicioPermitida').val() != undefined)
                {
                    var InicioVigencia = $('#InicioVigencia').val();
                    var arrInicioVigencia = InicioVigencia.split('/');
                    var stringFormatada = arrInicioVigencia[1] + '-' + arrInicioVigencia[0] + '-' +
                                          arrInicioVigencia[2];
                    var dtInicioVigencia = new Date(stringFormatada);

                    var InicioVigenciaPermitida = $('#hdnDtInicioPermitida').val();
                    var arrInicioVigenciaPermitida = InicioVigenciaPermitida.split('/');
                    var stringFormatada2 = arrInicioVigenciaPermitida[1] + '-' + arrInicioVigenciaPermitida[0] + '-' +
                                          arrInicioVigenciaPermitida[2];
                    var dtInicioVigenciaPermitida = new Date(stringFormatada2);

                    if (dtInicioVigencia <= dtInicioVigenciaPermitida && $('#PermiteAlteracaoCH').val() == "False") {
                        Mensagem.Alert({
                            titulo: "Aviso",
                            mensagem: "Carga horária já processada para essa vigência. Deseja realmente adicionar esta atribuição?",
                            tipo: "Aviso",
                            botoes: [
                                {
                                    botao: "Sim", callback: function () {
                                        $('#PermiteAlteracaoCH').val("true");
                                        $.post('/AtribuicaoEspecial/Adicionar', $("#frmAdicionar").serialize(), function (data) {
                                            //if (data == true)
                                            //    $('#dvModal').dialog('close').hide();
                                        });
                                    }
                                },
                                {
                                    botao: "Não", callback: function () {
                                        $.unblockUI();
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        $.post('/AtribuicaoEspecial/Adicionar', $("#frmAdicionar").serialize(), function (data) {
                            //if (data == true)
                            //    $('#dvModal').dialog('close').hide();
                        });
                    }
                }
                else
                {
                    $.post('/AtribuicaoEspecial/Adicionar', $("#frmAdicionar").serialize(), function (data) {
                        //if (data == true)
                        //    $('#dvModal').dialog('close').hide();
                    });
                }                          
                
            });

            $('#frmAdicionar #TipoAtribuicaoEspecial').change(function () {  
                

                if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() == 13) {
                    $('#frmAdicionar #divDisciplina').prop("hidden", false);
                    $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        if ($(this).val() == 5)
                            $(this).css('display', 'block');
                        //else
                        //    $(this).css('display', 'none');
                    });
                    var sel = $('#frmAdicionar #CodTipoEnsino');
                    $("#frmAdicionar #CodTipoEnsino option[value='4']").remove();
                    $("#frmAdicionar #CodTipoEnsino option[value='5']").remove();
                    sel.append($("<option>").attr('value', '4').text('EJA FUNDAMENTAL - ANOS FINAIS'));
                    sel.append($("<option>").attr('value', '5').text('EJA ENSINO MEDIO'));
                }
                else {
                    $('#frmAdicionar #divDisciplina').prop("hidden", true);
                    $('#frmAdicionar #ddlDisciplina').val("");
                    $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        $(this).css('display', 'block');
                    });
                    var sel = $('#frmAdicionar #CodTipoEnsino');
                    $("#CodTipoEnsino option[value='4']").remove();
                    $("#CodTipoEnsino option[value='5']").remove();
                }

                if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() == 7)
                {
                    var sel = $('#frmAdicionar #CodTipoEnsino');
                    $("#frmAdicionar #CodTipoEnsino option[value='86']").remove();
                    $("#frmAdicionar #CodTipoEnsino option[value='95']").remove();
                    $("#frmAdicionar #CodTipoEnsino option[value='96']").remove();
                    $("#frmAdicionar #CodTipoEnsino option[value='97']").remove();
                    sel.append($("<option>").attr('value', '95').text('CLASSE HOSPITALAR - ANOS INICIAIS'));
                    sel.append($("<option>").attr('value', '96').text('CLASSE HOSPITALAR - ANOS FINAIS'));
                    sel.append($("<option>").attr('value', '97').text('CLASSE HOSPITALAR - ENSINO MÉDIO'));
                }
                else
                {
                    $("#frmAdicionar #CodTipoEnsino option[value='95']").remove();
                    $("#frmAdicionar #CodTipoEnsino option[value='96']").remove();
                    $("#frmAdicionar #CodTipoEnsino option[value='97']").remove();
                }

                if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() == 5 || $('#frmAdicionar #TipoAtribuicaoEspecial').val() == 6) {
                    $('#frmAdicionar #vigenciaAtrEspecial').show();
                } else {
                    $('#frmAdicionar #vigenciaAtrEspecial').hide();
                }

                if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() == 8) {
                    $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        //if ($(this).val() != 3 && $(this).val() != 5 && $(this).val() != 0)
                        //    $(this).css('display', 'none');
                    });
                    $('#frmAdicionar #QtAulasSemana').parent().parent().css('display', 'none');
                    $('#frmAdicionar #QtAulasSemana').val(0);
                    $('#frmAdicionar #checkAulaNoturna').parent().parent().css('display', 'none');
                    $('#frmAdicionar #qtdeAulasNoturnas').css('display', 'none');
                    $('#frmAdicionar #txtQtdeAulasNoturna').val(0);
                    $('#frmAdicionar #checkAulaNoturna').prop('checked', false);
                }
                else {
                    $('#frmAdicionar #checkAulaNoturna').parent().parent().css('display', 'block')
                    $('#frmAdicionar #QtAulasSemana').parent().parent().css('display', 'block');
                    if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() != 13) {
                        $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                            if ($(this).val() != 3 && $(this).val() != 5 && $(this).val() != 0)
                                $(this).css('display', 'block');
                        });
                    }
                }

                if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() == 11) {
                    $.post('/AtribuicaoEspecial/ValidarVence', { cpf: $('#frmAdicionar #Professor_NumeroCpf').val(), nrDi: $('#frmAdicionar #nrDiPaa').val() }, function (data) {
                        if (data == "0") {
                            $('#frmAdicionar #TipoAtribuicaoEspecial option[value="5"]').prop("selected", true);
                            return false;
                        }


                        if (data == "1") {
                            $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                                //if ($(this).val() != 3)
                                //    $(this).css('display', 'none');
                                //else
                                    $(this).css('display', 'block');
                            });
                        }
                        else {
                            $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                                //if ($(this).val() != 5)
                                //    $(this).css('display', 'none');
                                //else
                                    $(this).css('display', 'block');
                            });
                        }
                    });
                }
                else if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() != 8 && $('#frmAdicionar #TipoAtribuicaoEspecial').val() != 13) {
                    $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        $(this).css('display', 'block');
                    });
                }

                if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() == 14) {                    
                    $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        if ($(this).val() == 1 || $(this).val() == 3 || $(this).val() == 5 || $(this).val() == 0)
                            $(this).css('display', 'block');
                        //else
                        //    $(this).css('display', 'none');
                    });
                }
                else {                    
                    if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() != 11 && $('#frmAdicionar #TipoAtribuicaoEspecial').val() != 13 && $('#frmAdicionar #TipoAtribuicaoEspecial').val() != 8)
                    $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        $(this).css('display', 'block');
                    });
                }


                if ($(this).val() == 12) {
                    $('#AcaoJudicial').show();
                }
                else {
                    $('#AcaoJudicial').hide();
                    $('#frmAdicionar #DadosAcaoJudicial').val("");
                }

            });

            $('#frmAdicionar #Professor_NumeroCpf').change(function () {
                $('#nrDiPaa option:not(:first)').remove();
                $('#dvModalEditar #TipoAtribuicaoEspecial').val("5");

                if ($('#frmAdicionar #Professor_NumeroCpf').val() != "") {
                    var params = {
                        cpf: $('#frmAdicionar #Professor_NumeroCpf').val()
                    }

                    $.post('../../Professor/ProfessorObter', params, function (data) {
                        $.each(data, function (i, data) {
                            $('#nrDiPaa').append($('<option>', {
                                value: data.value,
                                text: data.value
                            }));
                        });

                    });

                    $("#frmAdicionar #TipoAtribuicaoEspecial option[value='8']").remove();
                    $('#frmAdicionar #checkAulaNoturna').parent().parent().css('display', 'block')
                    $('#frmAdicionar #QtAulasSemana').parent().parent().css('display', 'block');
                }
            });

            $('#frmAdicionar #nrDiPaa').change(function () {
                if ($('#frmAdicionar #ddlEscola').val() == "") {
                    Mensagem.Alert({
                        titulo: "Atribuição Especial",
                        mensagem: "Por favor preencha o campo Escola antes de preencher o Di.",
                        tipo: "alerta",
                        botao: "Fechar"
                    });
                    $('#frmAdicionar #nrDiPaa').val("");
                    return false;
                }

                if ($('#frmAdicionar #nrDiPaa').val() != '') {
                    $.post('/AtribuicaoEspecial/ValidarEMAI', { cpf: $('#frmAdicionar #Professor_NumeroCpf').val(), nrDi: $('#frmAdicionar #nrDiPaa').val() }, function (data) {
                        $("#frmAdicionar #TipoAtribuicaoEspecial option[value='8']").remove();
                        if (data == "True") {
                            $('#frmAdicionar #TipoAtribuicaoEspecial').append($('<option>', {
                                value: 8,
                                text: 'LER E ESCREVER (EMAI)'
                            }));
                        }
                        else {
                            $("#frmAdicionar #TipoAtribuicaoEspecial option[value='8']").remove();
                            $('#frmAdicionar #checkAulaNoturna').parent().parent().css('display', 'block')
                            $('#frmAdicionar #QtAulasSemana').parent().parent().css('display', 'block');
                        }
                    });



                    //Validar CEEJA                        
                    $.post('/AtribuicaoEspecial/ValidarCEEJA',
                            { cpf: $('#frmAdicionar #Professor_NumeroCpf').val(), nrDi: $('#frmAdicionar #nrDiPaa').val(), codEscola: $('#frmAdicionar #ddlEscola').val(), anoLetivo: $('#frmAdicionar #AnoLetivo').val() },
                            function (data) {
                                $("#frmAdicionar #TipoAtribuicaoEspecial option[value='13']").remove();
                                if (data == "True") {
                                    $('#frmAdicionar #TipoAtribuicaoEspecial').append($('<option>', {
                                        value: 13,
                                        text: 'CEEJA'
                                    }));                                                            
                                }
                                else {
                                    $("#frmAdicionar #TipoAtribuicaoEspecial option[value='13']").remove();
                                    $('#divDisciplina').prop("hidden", true);
                                    $('#ddlDisciplina').val("");
                                    
                                }
                            });

                    $.post('/AtribuicaoEspecial/ValidarDomiciliar',
                            { cpf: $('#frmAdicionar #Professor_NumeroCpf').val(), nrDi: $('#frmAdicionar #nrDiPaa').val() },
                            function (data) {
                                $("#frmAdicionar #TipoAtribuicaoEspecial option[value='14']").remove();
                                if (data == "True") {
                                    $('#frmAdicionar #TipoAtribuicaoEspecial').append($('<option>', {
                                        value: 14,
                                        text: 'ATENDIMENTO DOMICILIAR'
                                    }));
                                }
                                else {
                                    $("#frmAdicionar #TipoAtribuicaoEspecial option[value='14']").remove();
                                }
                            });

                    $.post('/AtribuicaoEspecial/ValidarPermissaoAlterarCH',
                            { cpf: $('#frmAdicionar #Professor_NumeroCpf').val(), di: $('#frmAdicionar #nrDiPaa').val() },
                            function (data) {                                     
                                if (data == "True") {
                                    $('#frmAdicionar #PermiteAlteracaoCH').val('True');
                                }
                                else
                                {
                                    $('#frmAdicionar #PermiteAlteracaoCH').val('False');
                                }
                            });
                }
            });

        }).show().dialog({
            modal: true,
            width: 810,
            title: "Atribuição Especial",
            position: ['center', 0],
            close: function () {
                $('#dvModal').empty().hide();
            }
        });
    });

});


function ValidarFormEdicao() {
    $('#frmEditar').validate({
        rules: {
            AnoLetivo: { required: true },
            CdDiretoria: { required: true },
            CdEscola: { required: true },
            nrDiPaa: { required: true },
            QtAulasSemana: function () {
                if ($('#frmEditar #QtAulasSemana').parent().parent().css('display') == 'block') {
                    return true;
                }
                else {
                    return false;
                }
            },
            TipoAtribuicaoEspecial: { required: true },
            qtdeAulasNoturnasEditar: {
                required: function () {
                    return Boolean($('#frmEditar #checkAulaNoturnaEditar').val());
                }
            }
        },
        messages: {
            required: "Obrigatório"
        }
    });
}

function ValidarFormNovoCad() {
    $('#frmAdicionar').validate({
        rules: {
            AnoLetivo: { required: true },
            CdDiretoria: { required: true },
            CdEscola: { required: true },
            NumeroCpf: { required: true },
            nrDiPaa: { required: true },
            "FaseEtapa.codFaseAtribuicao": { required: true },
            InicioVigencia: { required: true },
            QtAulasSemana: function () {
                if ($('#frmAdicionar #QtAulasSemana').parent().parent().css('display') == 'block') {
                    return true;
                }
                else {
                    return false;
                }
            },
            TipoAtribuicaoEspecial: { required: true },
            qtdeAulasNoturnas: {
                required: function () {
                    return Boolean($('#frmAdicionar #checkAulaNoturna').val());
                }
            }

            //QtAulasSemana: {
            //    required: {
            //        depends: function ()
            //        {
            //            return $('#QtAulasSemana').val() == "0"
            //            //return parseInt($('#QtAulasSemana').val()) <= 0;
            //        }
            //    }
            //}
        },
        messages: {
            required: "Obrigatório"
        }
    });
}


function TriggerLinks() {
    $('#lnkEditar').click(function () {

        $('#dvModalEditar').load('/AtribuicaoEspecial/Editar', { id: $('#frmVisualizar').find('.cdAtribuicao').val() }, function () {
            //$('#dvModal').dialog('close');
            $('#checkAulaNoturnaEditar').change(function () {
                if ($(this).is(':checked'))
                    $('#qtdeAulasNoturnasEditar').show();
                else
                    $('#qtdeAulasNoturnasEditar').hide();
            });
            AplicarMascaras();

            $('#frmEditar #ddlDiretoria').autoPreencher($('#frmEditar #ddlEscola'), 'Escola', 'CarregarListaEscolas');
            $('#frmEditar #TipoAtribuicaoEspecial').val($('#frmEditar .cdTipoAtribuicaoEspecial').val());

            $.post('/AtribuicaoEspecial/ValidarTipoEnsino', {
                codEscola: $('#dvModalEditar #ddlEscola').val(), codTipoEnsino: 76, codAnoLetivo: $('#dvModalEditar #AnoLetivo').val()
            }, function (data) {
                if (data == "True") {
                    $('#dvModalEditar #TipoAtribuicaoEspecial').append($('<option>', {
                        value: 11,
                        text: 'VENCE - ARTICULAÇÃO'
                    }));
                }
                else {
                    $('#dvModalEditar #TipoAtribuicaoEspecial option[value="11"]').remove();
                }
            });

            $('#dvModalEditar #ddlEscola').change(function () {
                $valEscola = $('#dvModalEditar #ddlEscola').val();
                if ($valEscola != "") {
                    $.post('/AtribuicaoEspecial/ValidarTipoEnsino', { codEscola: $valEscola, codTipoEnsino: 76, codAnoLetivo: $('#dvModalEditar #AnoLetivo').val() }, function (data) {
                        if (data == "True") {
                            $('#dvModalEditar #TipoAtribuicaoEspecial').append($('<option>', {
                                value: 11,
                                text: 'VENCE - ARTICULAÇÃO'
                            }));
                        }
                        else {
                            $('#dvModalEditar #TipoAtribuicaoEspecial option[value="11"]').remove();
                        }
                    });

                    $.post('/AtribuicaoEspecial/ListarTipoEnsino', { codEscola: $valEscola, anoLetivo: $('#frmEditar #AnoLetivo').val() }, function (data) {
                        $('#frmEditar #dvTipoEnsino #CodTipoEnsino').remove();
                        if (data != null) {
                            var sel = $('<select id="CodTipoEnsino" name="CodTipoEnsino" class="form-control">').appendTo('#frmEditar #dvTipoEnsino');
                            $(data).each(function () {
                                sel.append($("<option>").attr('value', this.value).text(this.text));
                            });  
                        }        
                    });
                }
            });


            //$('#dvModalEditar #TipoAtribuicaoEspecial').change(function () {
            //    if ($('#dvModalEditar #TipoAtribuicaoEspecial').val() == 11) {
            //        $('#dvModalEditar #divDisciplina').prop("hidden", false);
            //    }
            //    else {
            //        $('#dvModalEditar #divDisciplina').prop("hidden", true);
            //        $('#dvModalEditar #ddlDisciplina').val("");
            //    }

            //    if ($('#dvModalEditar #TipoAtribuicaoEspecial').val() == 11) {
            //        $.post('/AtribuicaoEspecial/ValidarVence', { cpf: $('#dvModalEditar #Professor_NumeroCpf').val(), nrDi: $('#dvModalEditar #nrDiPaa').val() }, function (data) {
            //            if (data == "0") {
            //                $('#dvModalEditar #TipoAtribuicaoEspecial option[value="5"]').prop("selected", true);
            //                return false;
            //            }


            //            if (data == "1") {
            //                $('#dvModalEditar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
            //                    if ($(this).val() != 3)
            //                        $(this).css('display', 'none');
            //                    else
            //                        $(this).css('display', 'block');
            //                });
            //            }
            //            else {
            //                $('#dvModalEditar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
            //                    if ($(this).val() != 5)
            //                        $(this).css('display', 'none');
            //                    else
            //                        $(this).css('display', 'block');
            //                });
            //            }
            //        });
            //    }
            //    else {
            //        $('#dvModalEditar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
            //            $(this).css('display', 'block');
            //        });
            //    }
            //});

            $('#frmEditar #TipoAtribuicaoEspecial').change(function () {

                if ($('#frmEditar #TipoAtribuicaoEspecial').val() == 13) {
                    $('#frmEditar #divDisciplina').prop("hidden", false);
                    $('#frmEditar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        if ($(this).val() == 5)
                            $(this).css('display', 'block');
                        //else
                        //    $(this).css('display', 'none');
                    });
                    var sel = $('#frmEditar #CodTipoEnsino');
                    $("#frmEditar #CodTipoEnsino option[value='4']").remove();
                    $("#frmEditar #CodTipoEnsino option[value='5']").remove();
                    sel.append($("<option>").attr('value', '4').text('EJA FUNDAMENTAL - ANOS FINAIS'));
                    sel.append($("<option>").attr('value', '5').text('EJA ENSINO MEDIO'));
                }
                else {
                    $('#frmEditar #divDisciplina').prop("hidden", true);
                    $('#frmEditar #ddlDisciplina').val("");
                    $('#frmEditar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        $(this).css('display', 'block');
                    });
                    var sel = $('#frmAdicionar #CodTipoEnsino');
                    $("#CodTipoEnsino option[value='4']").remove();
                    $("#CodTipoEnsino option[value='5']").remove();
                }

                if ($('#frmEditar #TipoAtribuicaoEspecial').val() == 7) {
                    var sel = $('#frmEditar #CodTipoEnsino');
                    $("#frmEditar #CodTipoEnsino option[value='86']").remove();
                    $("#frmEditar #CodTipoEnsino option[value='95']").remove();
                    $("#frmEditar #CodTipoEnsino option[value='96']").remove();
                    $("#frmEditar #CodTipoEnsino option[value='97']").remove();
                    sel.append($("<option>").attr('value', '95').text('CLASSE HOSPITALAR - ANOS INICIAIS'));
                    sel.append($("<option>").attr('value', '96').text('CLASSE HOSPITALAR - ANOS FINAIS'));
                    sel.append($("<option>").attr('value', '97').text('CLASSE HOSPITALAR - ENSINO MÉDIO'));
                }
                else {
                    $("#frmEditar #CodTipoEnsino option[value='95']").remove();
                    $("#frmEditar #CodTipoEnsino option[value='96']").remove();
                    $("#frmEditar #CodTipoEnsino option[value='97']").remove();
                }

                if ($('#frmEditar #TipoAtribuicaoEspecial').val() == 11) {
                    $.post('/AtribuicaoEspecial/ValidarVence', { cpf: $('#frmEditar #Professor_NumeroCpf').val(), nrDi: $('#frmEditar #nrDiPaa').val() }, function (data) {
                        if (data == "0") {
                            $('#frmEditar #TipoAtribuicaoEspecial option[value="5"]').prop("selected", true);
                            return false;
                        }


                        if (data == "1") {
                            $('#frmEditar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                                //if ($(this).val() != 3)
                                //    $(this).css('display', 'none');
                                //else
                                    $(this).css('display', 'block');
                            });
                        }
                        else {
                            $('#frmEditar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                                //if ($(this).val() != 5)
                                //    $(this).css('display', 'none');
                                //else
                                    $(this).css('display', 'block');
                            });
                        }
                    });
                }
                else if ($('#frmAdicionar #TipoAtribuicaoEspecial').val() != 8 && $('#frmAdicionar #TipoAtribuicaoEspecial').val() != 13) {
                    $('#frmAdicionar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        $(this).css('display', 'block');
                    });
                }

                if ($('#frmEditar #TipoAtribuicaoEspecial').val() == 8) {
                    $('#frmEditar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                        //if ($(this).val() != 3 && $(this).val() != 5 && $(this).val() != 0)
                        //    $(this).css('display', 'none');
                    });
                    $('#frmEditar #QtAulasSemana').parent().parent().css('display', 'none');
                    $('#frmEditar #QtAulasSemana').val(0);
                    $('#frmEditar #checkAulaNoturnaEditar').parent().parent().css('display', 'none');
                    $('#frmEditar #qtdeAulasNoturnasEditar').css('display', 'none');
                    $('#frmEditar #txtQtdeAulasNoturna').val(0);
                    $('#frmEditar #checkAulaNoturnaEditar').prop('checked', false);
                }
                else {
                    $('#frmEditar #checkAulaNoturnaEditar').parent().parent().css('display', 'block')
                    $('#frmEditar #QtAulasSemana').parent().parent().css('display', 'block');
                    if ($('#frmEditar #TipoAtribuicaoEspecial').val() != 13) {
                        $('#frmEditar #FaseEtapa\\.codFaseAtribuicao option').each(function () {
                            if ($(this).val() != 3 && $(this).val() != 5 && $(this).val() != 0)
                                $(this).css('display', 'block');
                        });
                    }
                }

                if ($(this).val() == 12) {
                    $('#AcaoJudicial').show();
                }
                else {
                    $('#AcaoJudicial').hide();
                    $('#frmEditar #DadosAcaoJudicial').val("");
                }
            });

            $('#frmEditar #nrDiPaa').change(function () {
                if ($('#frmEditar #nrDiPaa').val() != '') {
                    $.post('/AtribuicaoEspecial/ValidarEMAI', { cpf: $('#frmEditar #Professor_NumeroCpf').val(), nrDi: $('#frmEditar #nrDiPaa').val() }, function (data) {
                        $("#frmEditar #TipoAtribuicaoEspecial option[value='8']").remove();
                        if (data == "True") {
                            $('#frmEditar #TipoAtribuicaoEspecial').append($('<option>', {
                                value: 8,
                                text: 'LER E ESCREVER (EMAI)'
                            }));
                        }
                        else {
                            $("#frmEditar #TipoAtribuicaoEspecial option[value='8']").remove();
                            $('#frmEditar #checkAulaNoturna').parent().parent().css('display', 'block')
                            $('#frmEditar #QtAulasSemana').parent().parent().css('display', 'block');
                            if ($('#frmEditar #checkAulaNoturna').is(":checked"))
                                $('#frmEditar #qtdeAulasNoturnas').css('display', 'block');

                        }
                    });



                    //Validar CEEJA
                    $.post('/AtribuicaoEspecial/ValidarCEEJA',
                            { cpf: $('#frmEditar #Professor_NumeroCpf').val(), nrDi: $('#frmEditar #nrDiPaa').val(), codEscola: $('#frmEditar #ddlEscola').val(), anoLetivo: $('#frmEditar #AnoLetivo').val() },
                            function (data) {
                                $("#frmEditar #TipoAtribuicaoEspecial option[value='13']").remove();
                                if (data == "True") {
                                    $('#frmEditar #TipoAtribuicaoEspecial').append($('<option>', {
                                        value: 13,
                                        text: 'CEEJA'
                                    }));

                                }
                                else {
                                    $("#frmEditar #TipoAtribuicaoEspecial option[value='13']").remove();
                                    $('#divDisciplina').prop("hidden", true);
                                    $('#ddlDisciplina').val("");

                                }
                            });
                }
            });


            $('#frmEditar').validate({
                rules: {
                    AnoLetivo: "required",
                    CdDiretoria: "required",
                    CdEscola: "required",
                    InicioVigencia: "required",
                    FimVigencia: "required",
                    "Disciplina.CD_DISCIPLINA": {
                        required: function () {
                            return Boolean($('#frmEditar #TipoAtribuicaoEspecial').val() == 13);
                        }
                    },
                    DadosAcaoJudicial: {
                        required: function () {
                            return Boolean($('#frmEditar #TipoAtribuicaoEspecial').val() == 12);
                        }
                    },
                    CodTipoEnsino: "required",
                    QtAulasSemana: {
                        required: function () {
                            if ($('#frmEditar #QtAulasSemana').parent().parent().css('display') == 'block') {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                    },
                    "Professor.NumeroCpf": "required",
                    "Professor.Di": "required",
                    "FaseEtapa.codFaseAtribuicao": "required",
                    TipoAtribuicaoEspecial: "required",
                    qtdeAulasNoturnasEditar: {
                        required: function () {
                            return Boolean($('#frmEditar #checkAulaNoturnaEditar').val());
                        }
                    }
                },
                messages: {
                    AnoLetivo: "Obrigatório",
                    CdDiretoria: "Obrigatório",
                    CdEscola: "Obrigatório",
                    InicioVigencia: "Obrigatório",
                    FimVigencia: "Obrigatório",                    
                    "Professor.NumeroCpf": "Obrigatório",
                    "Professor.Di": "Obrigatório",
                    "Disciplina.CD_DISCIPLINA": "Obrigatório",
                    "FaseEtapa.codFaseAtribuicao": "Obrigatório",
                    QtAulasSemana: "Obrigatório",
                    DadosAcaoJudicial: "Obrigatório",
                    CodTipoEnsino: "Obrigatório",
                    TipoAtribuicaoEspecial: "Obrigatório",
                    qtdeAulasNoturnasEditar: "Obrigatório"
                }
            });

            $('#btnAtualizar').click(function (ev) {
                ev.preventDefault();

                if (!$('#frmEditar').valid())
                    return;

                if ($('#nrDiPaa').val() <= 0) {
                    alert('Di tem que ser maior que 0.');
                    return false;
                }

                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/AtribuicaoEspecial/PostEditar",
                    data: $("#frmEditar").serialize(),
                    success: function (data) {
                        if (data == "True") {

                            $('#dvModalEditar').dialog('close');
                            $('#frmPesquisa #btnPesquisar').trigger('click');
                            //$('#dvModalEditar').dialog('close');
                            //$('#dadosPesquisa .tabela tbody .visualizar[cdatribmed="' + $('#dvModalEditar #Codigo').val() + '"]').trigger('click')
                        }
                    }
                });                

                //$.post('/AtribuicaoEspecial/PostEditar', $("#frmEditar").serialize(), function (data) {
                //    if (data == "True") {

                //        $('#dvModalEditar').dialog('close');
                //        $('#frmPesquisa #btnPesquisar').trigger('click');                         
                //        //$('#dadosPesquisa .tabela tbody .visualizar').trigger('click');
                //    }
                //}).always(setTimeout(function () { /*$('#dvModal').dialog('close')*/ }, 3000));

                //$('#dvModal').dialog('close');
            });
        }).show().dialog({
            modal: true,
            title: "Atribuição Especial",
            width: 810,
            position: ['center', 0]
        });
    });

    $('#lnkExcluir').click(function () {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Tem certeza que deseja excluir essa atribuição?",
            tipo: "Aviso",
            botoes: [
                {
                    botao: "Sim", callback: function () {
                        $.post('/AtribuicaoEspecial/Excluir', { id: $('#frmVisualizar').find('.cdAtribuicao').val() }, function (data) {
                            if (data == "True") {
                                $.unblockUI();
                                $('#dvModal').dialog('close').hide();
                                $('#frmPesquisa #btnPesquisar').trigger('click');
                            }
                        });
                    }
                },
                {
                    botao: "Não", callback: function () {
                        $.unblockUI();
                    }
                }
            ]
        });
    });
}

function Visualizar(obj) {
    $('#dvModal').load('/AtribuicaoEspecial/Visualizar', { id: $(obj).attr('cdAtribMed') }, function () {
        AplicarMascaras();
        TriggerLinks();
        $('#frmVisualizar').find('input').prop('readonly', true);
        $('#checkAulaNoturna').attr('disabled', 'disabled');
        $('#dvModal select').attr('disabled', 'disabled');
        $('#DadosAcaoJudicial').attr('disabled', 'disabled');


    }).show().dialog({
        modal: true,
        title: "Atribuição Especial",
        width: 810,
        position: ['center', 0]
    });
}