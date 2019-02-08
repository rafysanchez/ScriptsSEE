function toggleRespostas(sender) {
    //recebe o botao
    jQuery(sender).siblings(".AlternativasSelecionadas").slideToggle("fast");
}
function toggleGabarito() {
    jQuery("#ContainerGabarito").slideToggle("fast");
}

function FecharModal(id) {
    $('#' + id).dialog('close');
}

function CadastrarGabarito() {
    jQuery.ajax({
        async: true,
        dataType: 'html',
        data: {
            CodigoProva: 0
        },
        url: '/Gabarito/CadastrarGabarito',
        success: function (data) {
            jQuery("#modal").empty().html(data).dialog({
                width: 810,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'center',
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function VisualizarGabarito(codigoProva) {
    jQuery.ajax({
        async: true,
        dataType: 'html',
        data: {
            CodigoProva: codigoProva
        },
        url: '/Gabarito/VisualizarGabarito',
        success: function (data) {
            jQuery("#modal").empty().html(data).dialog({
                width: 810,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'center',
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function SalvarGabarito() {
    //validação
    if (jQuery("#txtIdentificacaoProva").val().trim() == "") {
        jQuery("#txtIdentificacaoProva").addClass("error").focus();
        return;
    } else { jQuery("#txtIdentificacaoProva").removeClass("error"); }

    if (jQuery("#txtDataVigencia").val().trim() == "") {
        jQuery("#txtDataVigencia").addClass("error").focus();
        return;
    } else { jQuery("#txtDataVigencia").removeClass("error"); }

    if (CodigosTipoEnsino.length == 0) {
        jQuery("#ContainerTipoEnsino").addClass("error");
        return;
    } else { jQuery("#ContainerTipoEnsino").removeClass("error"); }

    //monta questões
    //var CodigosQuestoes = new Array();
    var status;

    jQuery("table.Gabarito tbody tr").each(function (index) {
        //Questao ATIVA
        if (jQuery("select", this).prop("disabled") == false) {
            status = 1;
        }
        else {
            status = 0;
        }

        var NumeroQuestao = jQuery("td", this).first().html();
        var CodigoTipoAlternativa = jQuery(".ddlTipoAlternativa", this).val();
        var CodigoGabarito = jQuery("td", this).first().data('cdgabarito');

        //Não pode salvar registro com o valor zero pois é um campo chave.
        if (CodigoTipoAlternativa == 0) {
            CodigoTipoAlternativa = null;
        }
        var CodigoAlternativa = jQuery(".ddlAlternativa", this).val();

        if (parseInt(CodigoAlternativa) == 0) {
            CodigoAlternativa = null;
        }

        //  CodigosQuestoes.push({ CodigoGabarito: CodigoGabarito, NumeroQuestao: NumeroQuestao, CodigoTipoAlternativa: CodigoTipoAlternativa, CodigoAlternativa: CodigoAlternativa, Status: status });
    });

    var CodigoProva = 0;

    if (!isNaN(parseInt(jQuery("#txtCodigoProva").val()))) {
        CodigoProva = parseInt(jQuery("#txtCodigoProva").val());
    }

    //if (CodigosQuestoes.length == 0) {
    //    alert("É necessário ter no mínimo uma questão ativa.");
    //    jQuery(".Gabarito").addClass("error");
    //    return;
    //} else { jQuery(".Gabarito").removeClass("error"); }

    jQuery.ajax({
        type: 'POST',
        async: true,
        dataType: 'json',
        data: {
            CodigoProva: CodigoProva,
            IdentificacaoProva: jQuery("#txtIdentificacaoProva").val(),
            DataVigencia: jQuery("#txtDataVigencia").val(),
            CodigosTipoEnsino: JSON.stringify(CodigosTipoEnsino),
            CodigosSerie: JSON.stringify(CodigosSeries),
            CodigosDisciplinas: JSON.stringify(CodigosDisciplinas),
            //  CodigosQuestoes: JSON.stringify(CodigosQuestoes),
        },
        url: '/Gabarito/SalvarGabarito',
        success: function (data) {

            jQuery("#txtCodigoProva").val(data.CodigoProva);
            jQuery("#txtCodigoProva").val(data.CodigoGabarito);
            jQuery('#modal select').attr('data-codigoprova', data.CodigoProva);
            jQuery('#modal select').attr('data-gabarito', data.CodigoGabarito);

            $('#btnAdicionar').attr('onclick', 'AdicionarQuestaoAtualizar(' + data.CodigoProva + ')');
            $('#mudarStatusQuestao').attr('onclick', 'MudaStatusQuestaoAtualizar(this,' + data.CodigoGabarito + ')');
            $('#removerQuestao').attr('onclick', 'RemoverQuestaoAtualizar(' + data.CodigoGabarito + ',' + data.CodigoProva + ', this)');
            $('#uploadImagem').attr('onclick', 'AbrirModalDeUpload(' + data.CodigoGabarito + ')');
            $('#habilidade').attr('onclick', 'AbrirModalHabilidade(' + data.CodigoGabarito + ',' + data.CodigoProva + ')');
            $('#hdn_1').val(data.CodigoGabarito);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

function EditarProva() {

    var CodigoProva = jQuery("#txtCodigoProva").val();

    jQuery.ajax({
        async: true,
        dataType: 'html',
        data: {
            CodigoProva: CodigoProva,
        },
        url: '/Gabarito/AtualizarGabarito',
        success: function (data) {
            jQuery("#modal").html(data);


        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}


function AlterVigencia(codigoProva, sender) {
    sender = $(sender);
    var dtVigencia = sender.val();

    $.post('/Gabarito/AlterarVigenciaProva', { dtVigencia: dtVigencia, codigoProva: codigoProva }, function () { }, 'html');

}
function SelecionaResposta(sender) {
    sender = jQuery(sender);
    if (sender.val() == 2) {
        sender.css("background-color", "rgb(139, 230, 139)");
        sender.data("acerto", true);
    } else {
        sender.css("background-color", "rgb(255, 121, 121)");
        sender.data("acerto", false);
    }

    AtualizaContador(sender.closest(".AlternativasSelecionadas"));
}
function CargasDoTipoEnsino(sender, cod_prova) {
    sender = jQuery(sender);

    sender.closest("tbody").find("input").each(function () {

        AplicaEstiloMultiSelect(jQuery(this));

        if (jQuery(this).prop("checked")) {
            if (CodigosTipoEnsino.indexOf(jQuery(this).data("codigo-tipo-ensino")) == -1) {
                CodigosTipoEnsino.push(jQuery(this).data("codigo-tipo-ensino"));
            }
        }
        else {
            var index = CodigosTipoEnsino.indexOf(jQuery(this).data("codigo-tipo-ensino"));
            if (index > -1) {
                CodigosTipoEnsino.splice(index, 1);
            }

            for (var i = CodigosSeries.length - 1; i > 0 ; i--) {
                if (CodigosSeries[i].CodigoTipoEnsino == jQuery(this).data("codigo-tipo-ensino")) {
                    CodigosSeries.splice(i, 1);
                }
            }
        }
    });

    if (CodigosTipoEnsino.length == 0) {
        jQuery("#ContainerSerie table tbody").html("");
        jQuery("#ContainerDisciplina table tbody").html("");

        CodigosSeries = new Array();
        CodigosDisciplinas = new Array();


        if ($('#provaEmUso').text() == 'true') {
            $('#ContainerSerie input').prop('disabled', 'disabled');
            $('#ContainerDisciplina input').prop('disabled', 'disabled');
        }

        return;
    }

    //séries
    //TODO
    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'html',
        url: '/Serie/CarregarListaSeriePorTipoEnsino',
        data: {
            CodigosTipoEnsino: JSON.stringify(CodigosTipoEnsino)
        },
        success: function (data) {
            data = JSON.parse(data);

            var html = "";

            jQuery.each(data, function (index, obj) {
                var objeto = { Codigo: obj.value, Termo: obj.termo, CodigoTipoEnsino: obj.CodigoTipoEnsino };

                var index = -1;
                for (var i = 0; i < CodigosSeries.length; i++) {
                    if (JSON.stringify(CodigosSeries[i]) == JSON.stringify(objeto)) {
                        index = i;
                        break;
                    }
                }

                if (index != -1) {
                    html += "<tr class='selected'>" +
                            "<td class='check'><input type='checkbox' checked='checked' data-codigo-serie='" + obj.value + "' data-codigo-tipo-ensino='" + obj.CodigoTipoEnsino + "' data-nome-termo='" + obj.termo + "' onclick='SelecionarSerieAtualizar(this," + cod_prova + ")' /></td>" +
                            "<td class='text'>" + obj.text + " " + obj.NomeTipoEnsino + "</td>" +
                        "</tr>";
                }
                else {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-serie='" + obj.value + "' data-codigo-tipo-ensino='" + obj.CodigoTipoEnsino + "' data-nome-termo='" + obj.termo + "' onclick='SelecionarSerieAtualizar(this," + cod_prova + ")' /></td>" +
                            "<td class='text'>" + obj.text + " " + obj.NomeTipoEnsino + "</td>" +
                        "</tr>";
                }
            });

            jQuery("#ContainerSerie table tbody").html(html);
            if ($('#provaEmUso').text() == 'true') {
                $('#ContainerSerie input').prop('disabled', 'disabled');
                $('#ContainerDisciplina input').prop('disabled', 'disabled');
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

    //disciplinas
    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'html',
        url: '/Disciplina/ListaDisciplinasPorTiposEnsino',
        data: {
            CodigosTipoEnsino: JSON.stringify(CodigosTipoEnsino)
        },
        success: function (data) {
            data = JSON.parse(data);

            var html = "";

            jQuery.each(data, function (index, obj) {

                if (CodigosDisciplinas.indexOf(parseInt(obj.CD_DISCIPLINA)) != -1) {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-disciplina='" + obj.CD_DISCIPLINA + "' onclick='SelecionarDisciplinaAtualizar(this," + cod_prova + ")' checked='checked' /></td>" +
                            "<td class='text'>" + obj.NM_DISCIPLINA + "</td>" +
                        "</tr>";
                } else {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-disciplina='" + obj.CD_DISCIPLINA + "' onclick='SelecionarDisciplinaAtualizar(this," + cod_prova + ")' /></td>" +
                            "<td class='text'>" + obj.NM_DISCIPLINA + "</td>" +
                        "</tr>";
                }
            });

            jQuery("#ContainerDisciplina table tbody").html(html);

            if (CodigosDisciplinas.length > 0) {
                SelecionarDisciplina(jQuery("#ContainerDisciplina table tbody input").first());
            }

            if ($('#provaEmUso').text() == 'true') {
                $('#ContainerSerie input').prop('disabled', 'disabled');
                $('#ContainerDisciplina input').prop('disabled', 'disabled');
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

/*region Multiselect*/
//seleção de tipo de ensino no multiselect
function SelecionarTipoEnsino(sender) {
    sender = jQuery(sender);

    sender.closest("tbody").find("input").each(function () {

        AplicaEstiloMultiSelect(jQuery(this));

        if (jQuery(this).prop("checked")) {
            if (CodigosTipoEnsino.indexOf(jQuery(this).data("codigo-tipo-ensino")) == -1) {
                CodigosTipoEnsino.push(jQuery(this).data("codigo-tipo-ensino"));
            }
        }
        else {
            var index = CodigosTipoEnsino.indexOf(jQuery(this).data("codigo-tipo-ensino"));
            if (index > -1) {
                CodigosTipoEnsino.splice(index, 1);
            }

            for (var i = CodigosSeries.length - 1; i > 0 ; i--) {
                if (CodigosSeries[i].CodigoTipoEnsino == jQuery(this).data("codigo-tipo-ensino")) {
                    CodigosSeries.splice(i, 1);
                }
            }
        }
    });

    if (CodigosTipoEnsino.length == 0) {
        jQuery("#ContainerSerie table tbody").html("");
        jQuery("#ContainerDisciplina table tbody").html("");

        CodigosSeries = new Array();
        CodigosDisciplinas = new Array();


        if ($('#provaEmUso').text() == 'true') {
            $('#ContainerSerie input').prop('disabled', 'disabled');
            $('#ContainerDisciplina input').prop('disabled', 'disabled');
        }

        return;
    }

    //séries
    //TODO
    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'html',
        url: '/Serie/CarregarListaSeriePorTipoEnsino',
        data: {
            CodigosTipoEnsino: JSON.stringify(CodigosTipoEnsino)
        },
        success: function (data) {
            data = JSON.parse(data);

            var html = "";

            jQuery.each(data, function (index, obj) {
                var objeto = { Codigo: obj.value, Termo: obj.termo, CodigoTipoEnsino: obj.CodigoTipoEnsino };

                var index = -1;
                for (var i = 0; i < CodigosSeries.length; i++) {
                    if (JSON.stringify(CodigosSeries[i]) == JSON.stringify(objeto)) {
                        index = i;
                        break;
                    }
                }

                if (index != -1) {
                    html += "<tr class='selected'>" +
                            "<td class='check'><input type='checkbox' checked='checked' data-codigo-serie='" + obj.value + "' data-codigo-tipo-ensino='" + obj.CodigoTipoEnsino + "' data-nome-termo='" + obj.termo + "' onclick='SelecionarSerie(this)' /></td>" +
                            "<td class='text'>" + obj.text + " " + obj.NomeTipoEnsino + "</td>" +
                        "</tr>";
                }
                else {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-serie='" + obj.value + "' data-codigo-tipo-ensino='" + obj.CodigoTipoEnsino + "' data-nome-termo='" + obj.termo + "' onclick='SelecionarSerie(this)' /></td>" +
                            "<td class='text'>" + obj.text + " " + obj.NomeTipoEnsino + "</td>" +
                        "</tr>";
                }
            });

            jQuery("#ContainerSerie table tbody").html(html);
            if ($('#provaEmUso').text() == 'true') {
                $('#ContainerSerie input').prop('disabled', 'disabled');
                $('#ContainerDisciplina input').prop('disabled', 'disabled');
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

    //disciplinas
    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'html',
        url: '/Disciplina/ListaDisciplinasPorTiposEnsino',
        data: {
            CodigosTipoEnsino: JSON.stringify(CodigosTipoEnsino)
        },
        success: function (data) {
            data = JSON.parse(data);

            var html = "";

            jQuery.each(data, function (index, obj) {

                if (CodigosDisciplinas.indexOf(parseInt(obj.CD_DISCIPLINA)) != -1) {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-disciplina='" + obj.CD_DISCIPLINA + "' onclick='SelecionarDisciplina(this)' checked='checked' /></td>" +
                            "<td class='text'>" + obj.NM_DISCIPLINA + "</td>" +
                        "</tr>";
                } else {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-disciplina='" + obj.CD_DISCIPLINA + "' onclick='SelecionarDisciplina(this)' /></td>" +
                            "<td class='text'>" + obj.NM_DISCIPLINA + "</td>" +
                        "</tr>";
                }
            });

            jQuery("#ContainerDisciplina table tbody").html(html);

            if (CodigosDisciplinas.length > 0) {
                SelecionarDisciplina(jQuery("#ContainerDisciplina table tbody input").first());
            }

            if ($('#provaEmUso').text() == 'true') {
                $('#ContainerSerie input').prop('disabled', 'disabled');
                $('#ContainerDisciplina input').prop('disabled', 'disabled');
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function SelecionarSerie(sender) {
    sender = jQuery(sender);
    AplicaEstiloMultiSelect(sender);

    sender.closest("tbody").find("input").each(function () {

        var objeto = { Codigo: jQuery(this).data("codigo-serie"), Termo: jQuery(this).data("nome-termo"), CodigoTipoEnsino: jQuery(this).data("codigo-tipo-ensino") };

        if (jQuery(this).prop("checked")) {
            var existe = false;
            for (var i = 0; i < CodigosSeries.length; i++) {
                if (JSON.stringify(CodigosSeries[i]) == JSON.stringify(objeto)) {
                    existe = true;
                    break;
                }
            }

            if (!existe) {
                CodigosSeries.push(objeto);
            }
        }
        else {
            var index = -1;
            for (var i = 0; i < CodigosSeries.length; i++) {
                if (JSON.stringify(CodigosSeries[i]) == JSON.stringify(objeto)) {
                    index = i;
                    break;
                }
            }

            if (index > -1) {
                CodigosSeries.splice(index, 1);
            }
        }
    });
}

function SelecionarDisciplina(sender) {
    sender = jQuery(sender);

    sender.closest("tbody").find("input").each(function () {
        AplicaEstiloMultiSelect(jQuery(this));
        if (jQuery(this).prop("checked")) {
            if (CodigosDisciplinas.indexOf(jQuery(this).data("codigo-disciplina")) == -1) {
                CodigosDisciplinas.push(jQuery(this).data("codigo-disciplina"));
            }
        }
        else {
            var index = CodigosDisciplinas.indexOf(jQuery(this).data("codigo-disciplina"));
            if (index > -1) {
                CodigosDisciplinas.splice(index, 1);
            }
        }
    });
}

/*endregion Multiselect*/

//carrega a lista de tipos de ensino para o multiselect
function CarregarTipoEnsino() {
    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'html',
        url: '/TipoEnsino/CarregarListaTipoEnsinoPorAnoLetivo',
        data: {
            anoLetivo: 0
        },
        success: function (data) {
            data = JSON.parse(data);
            var html = "";

            jQuery.each(data, function (index, obj) {

                if (CodigosTipoEnsino.indexOf(parseInt(obj.value)) != -1) {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-tipo-ensino='" + obj.value + "' onclick='SelecionarTipoEnsino(this)' checked='checked' /></td>" +
                            "<td class='text'>" + obj.text + "</td>" +
                        "</tr>";
                } else {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-tipo-ensino='" + obj.value + "' onclick='SelecionarTipoEnsino(this)' /></td>" +
                            "<td class='text'>" + obj.text + "</td>" +
                        "</tr>";
                }
            });

            jQuery("#ContainerTipoEnsino table tbody").html(html);

            if (CodigosTipoEnsino.length > 0) {
                SelecionarTipoEnsino(jQuery("#ContainerTipoEnsino table tbody input").first());
            }

            if ($('#provaEmUso').text() == 'true') {
                $('#ContainerTipoEnsino input').prop('disabled', 'disabled');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function CarregarTipoEnsinoAtualizar(cod_prova) {
    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'html',
        url: '/TipoEnsino/CarregarListaTipoEnsinoPorAnoLetivo',
        data: {
            anoLetivo: 0
        },
        success: function (data) {
            data = JSON.parse(data);
            var html = "";

            jQuery.each(data, function (index, obj) {

                if (CodigosTipoEnsino.indexOf(parseInt(obj.value)) != -1) {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-tipo-ensino='" + obj.value + "' onclick='SelecionarTipoEnsinoAtualizar(this," + cod_prova + ")' checked='checked' /></td>" +
                            "<td class='text'>" + obj.text + "</td>" +
                        "</tr>";
                } else {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-tipo-ensino='" + obj.value + "' onclick='SelecionarTipoEnsinoAtualizar(this," + cod_prova + ")' /></td>" +
                            "<td class='text'>" + obj.text + "</td>" +
                        "</tr>";
                }
            });

            jQuery("#ContainerTipoEnsino table tbody").html(html);

            if (CodigosTipoEnsino.length > 0) {
                SelecionarTipoEnsinoAtualizar(jQuery("#ContainerTipoEnsino table tbody input").first(), cod_prova);
            }

            if ($('#provaEmUso').text() == 'true') {
                $('#ContainerTipoEnsino input').prop('disabled', 'disabled');
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function SelecionarTipoEnsinoAtualizar(sender, cod_prova) {
    CargasDoTipoEnsino(sender, cod_prova);
    sender = jQuery(sender);
    var codTipoEnsino = sender.data('codigo-tipo-ensino');

    if (sender.is(':checked')) {
        $.post('/Gabarito/CadastrarTipoEnsino', { codigoTipoEnsino: codTipoEnsino, codigoProva: cod_prova }, function () { }, 'html');
    }

    else {
        $.post('/Gabarito/RemoverTipoEnsino', { codigoTipoEnsino: codTipoEnsino, codigoProva: cod_prova }, function () { }, 'html');
    }
}

function SelecionarSerieAtualizar(sender, cod_prova) {
    sender = jQuery(sender);
    var serie = sender.data('codigo-serie');
    var tipoEnsino = sender.data('codigo-tipo-ensino');
    var nomeTermo = sender.data('nome-termo');

    if (sender.is(':checked')) {
        $.post('/Gabarito/CadastrarSeriesProva', { serie: serie, codigoTipoEnsino: tipoEnsino, codigoProva: cod_prova, nomeTermo: nomeTermo }, function () { }, 'html');
    }

    else {
        $.post('/Gabarito/RemoverSeriesProva', { serie: serie, codigoTipoEnsino: tipoEnsino, codigoProva: cod_prova }, function () { }, 'html');
    }
}

function SelecionarDisciplinaAtualizar(sender, cod_prova) {
    sender = jQuery(sender);
    var codigoDisciplina = sender.data('codigo-disciplina');

    if (sender.is(':checked')) {
        $.post('/Gabarito/CadastrarDisciplinasProva', { codigoDisciplina: codigoDisciplina, codigoProva: cod_prova }, function () { }, 'html');
    }

    else {
        $.post('/Gabarito/RemoverDisciplinasProva', { codigoDisciplina: codigoDisciplina, codigoProva: cod_prova }, function () { }, 'html');
    }
}

function PesquisarProvas() {

    if (!(jQuery("#ddlTipoEnsino").val() > 0)) {
        jQuery("#ddlTipoEnsino").addClass("error");
        return;
    }
    else {
        jQuery("#ddlTipoEnsino").removeClass("error");
    }

    var NumeroSerie = "";
    if (!isNaN(parseInt(jQuery("#ddlSerie").val()))) {
        NumeroSerie = JSON.stringify({ NumeroSerie: jQuery("#ddlSerie").val(), Termo: jQuery("#ddlSerie").data("termo") });
    }
    var CodigoDisciplina = 0;
    if (!isNaN(parseInt(jQuery("#ddlDisciplina").val()))) {
        CodigoDisciplina = parseInt(jQuery("#ddlDisciplina").val());
    }

    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'html',
        url: '/Gabarito/ListaParcialProvas',
        data: {
            CodigoTipoEnsino: jQuery("#ddlTipoEnsino").val(),
            NumeroSerie: NumeroSerie,
            CodigoDisciplina: CodigoDisciplina,
            Vigentes: jQuery("#radioVigentes").is(":checked")
        },
        success: function (data) {
            jQuery("#ListaParcial").html(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

}
function CarregarAlternativas(codigoTPAltern, codigoGabarito, codigoAlternativa) {
    var id = '#ddlAlternativa' + codigoGabarito;
    $(id).append('<option value="0">Selecione...</option>');

    $.ajax({
        type: 'GET',
        async: true,
        dataType: 'json',
        data: {
            codigoTipoAltern: codigoTPAltern
        },
        url: '/Gabarito/ListarAlternativas',
        success: function (data) {

            $(data).each(function () {
                if (this.CodigoAlternativa == codigoAlternativa) {
                    $(id).append('<option value="' + this.CodigoAlternativa + '" selected>' + this.Simbolo + '</option>')
                }
                else {
                    $(id).append('<option value="' + this.CodigoAlternativa + '">' + this.Simbolo + '</option>')
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
//function SelecionarTipoAlternativa(sender) {
//    sender = jQuery(sender);

//    var CodigoTipoAlternativa = sender.val();
//    jQuery.ajax({
//        async: true,
//        type: 'POST',
//        dataType: 'json',
//        url: '/Gabarito/ListaAlternativas',
//        data: {
//            CodigoTipoAlternativa: CodigoTipoAlternativa
//        },
//        success: function (data) {
//            //data = JSON.parse(data);

//            var html = "";
//            jQuery.each(data, function (index, obj) {
//                /*if (parseInt(obj.CodigoAlternativa) == CodigoAlternativaCorreta) {
//                    html += "<option value='" + obj.CodigoAlternativa + "' selected='selected' >" + obj.Simbolo + "</option>";
//                } else {
//                    html += "<option value='" + obj.CodigoAlternativa + "'>" + obj.Simbolo + "</option>";
//                }*/

//                html += "<option value='" + obj.CodigoAlternativa + "'>" + obj.Simbolo + "</option>";
//            });

//            sender.closest("tr").find(".ddlAlternativa").html(html);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//        }
//    });
//}

function AtualizarAlternativa(sender) {
    sender = jQuery(sender);
    var codigoAlternativa = sender.val();
    var codigoGabarito = sender.data('gabarito');

    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'json',
        // url: '/Gabarito/ListaAlternativas',
        url: '/Gabarito/AtualizarAlternativasGabarito',
        data: {
            codigoAlternativa: codigoAlternativa,
            codigoGabarito: codigoGabarito
        },
        success: function (data) {

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function AtualizarTipoAlternativa(sender, questaoAtua) {

    var _id = "#sorting_" + questaoAtua;
    var sorting = $(_id).val();

    sender = jQuery(sender);
    var codigoGabarito = sender.data('gabarito');
    var CodigoTipoAlternativa = sender.val();
    jQuery.ajax({
        async: false,
        type: 'POST',
        dataType: 'json',
        // url: '/Gabarito/ListaAlternativas',
        url: '/Gabarito/ListaAlternativasGabarito',
        data: {
            codigoGabarito: codigoGabarito,
            CodigoTipoAlternativa: CodigoTipoAlternativa,
            sorting: sorting
        },
        success: function (data) {

            var html = "";
            jQuery.each(data, function (index, obj) {

                html += "<option value='" + obj.CodigoAlternativa + "'>" + obj.Simbolo + "</option>";
            });


            sender.closest("tr").find(".ddlAlternativa").html(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function AtualizarTipoAlternativaGerados(sender, _codigoGabarito, questaoAtua) {

    var _id = "#sorting_" + questaoAtua;
    var sorting = $(_id).val();

    sender = jQuery(sender);
    var codigoGabarito = sender.data('gabarito');
    var CodigoTipoAlternativa = sender.val();
    jQuery.ajax({
        async: false,
        type: 'POST',
        dataType: 'json',
        // url: '/Gabarito/ListaAlternativas',
        url: '/Gabarito/ListaAlternativasGabarito',
        data: {
            codigoGabarito: codigoGabarito,
            CodigoTipoAlternativa: CodigoTipoAlternativa,
            sorting: sorting
        },
        success: function (data) {

            var html = "";
            jQuery.each(data, function (index, obj) {

                html += "<option value='" + obj.CodigoAlternativa + "'>" + obj.Simbolo + "</option>";
            });


            sender.closest("tr").find(".ddlAlternativa" + codigoGabarito).html(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
/*tela*/
function AplicaEstiloMultiSelect(sender) {
    //sender é o input

    if (sender.prop("checked")) {
        sender.closest("tr").addClass("selected");

    } else {
        sender.closest("tr").removeClass("selected");
    }
}

function AdicionarQuestaoAtualizar(codigoProva) {
    var numeroQuestoes = jQuery("table.Gabarito tbody tr").length;

    var _id = "#sorting_" + numeroQuestoes;
    var sorting = $(_id).val();


    var codigoGabarito = SalvarQuestaoGabarito(codigoProva);

    jQuery("table.Gabarito tbody").append("<tr>" +
                                            "<td class='sorting_1'><input id='sorting_" + (numeroQuestoes + 1) + "' data-gabarito='" + codigoGabarito + "' type='text' size='3' maxlength='4' value='" + (numeroQuestoes + 1) + "'  onchange='AtualizarPosicaoQuestao(this, " + (numeroQuestoes + 1) + ", " + codigoGabarito + ")'/></td>" +
                                            "<td><select class='ddlTipoAlternativa' data-gabarito='" + codigoGabarito + "' onchange='AtualizarTipoAlternativaGerados(this, " + codigoGabarito + ", " + (numeroQuestoes + 1) + ")' >" + jQuery("table.Gabarito tbody tr").first().find(".ddlTipoAlternativa").html() + "</select></td>" +
                                            "<td><select class='ddlAlternativa" + codigoGabarito + "'  data-gabarito='" + codigoGabarito + "' onchange='AtualizarAlternativa(this)'>" + jQuery("table.Gabarito tbody tr").first().find(".ddlAlternativa").html().replace('selected="selected"', '') + "</select></td>" +
                                            "<td><a href='javascript:void(0)' onclick='MudaStatusQuestaoAtualizar(this," + codigoGabarito + ")'><i class='icone-tabela-check'></i></a></td>" +
                                             "<td style='text-align: center; width: 80px;'><a onclick='AbrirModalDeUpload(" + codigoGabarito + ")'> <i class='icone-tabela-adicionar' title='Adicionar'></i></a></td>" +
                                            "<td style='text-align: center; width: 80px;'><a onclick='AbrirModalHabilidade(" + codigoGabarito + " , " + codigoProva + ")'> <i class='icone-tabela-adicionar' title='Adicionar'></i></a></td>" +
                                            "<td><a href='javascript:void(0)' onclick='RemoverQuestaoAtualizar(" + codigoGabarito + ", " + codigoProva + ", this)'><i class='icone-tabela-excluir'></i></a></td>" +
                                          "</tr> <INPUT TYPE='hidden'id='hdn_" + (numeroQuestoes + 1) + "'value='" + codigoGabarito + "'> ");


    $('.ddlAlternativa' + codigoGabarito)
    .find('option')
    .remove()
    .end()
    .append('<option value="0">Selecione...</option>')
    .val('0');

    ReordenarEstiloQuestoes();
}

//////////////////////////////////////////////////////
function AtualizarPosicaoQuestao(sender, questaoAtua, codigoGabarito) {

    var _id = "#sorting_" + questaoAtua;
    var sorting = $(_id).val();

    $.post('/Gabarito/AtualizarPosicaoQuestao', { codigoGabarito: codigoGabarito, sorting: sorting }, function (data) {
    }, "json");

}

function RemoverQuestaoAtualizar(codigoGabarito, codigoProva, sender) {

    $.post('/Gabarito/RemoverQuestao', { codigoGabarito: codigoGabarito, codigoProva: codigoProva }, function (data) {

        if (data == true) {
            sender = jQuery(sender);

            sender.closest("tr").remove();

            ReordenarEstiloQuestoes();

            ReordenarQuestoes(codigoGabarito);
        }

    }, "json");

}
function SalvarQuestaoGabarito(codigoProva) {
    var cd_gab = 0;

    jQuery.ajax({
        async: false,
        type: 'POST',
        dataType: 'json',
        url: '/Gabarito/SalvarGabaritoQuestao',
        data: {
            codigoProva: codigoProva
        },
        success: function (data) {
            cd_gab = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    return cd_gab;
}

function RemoverQuestao(sender) {

    if (confirm("Deseja que o sistema reordene as questões?")) {

        if (jQuery(".Gabarito tbody tr").length <= 1) {
            return;
        }

        sender = jQuery(sender);

        sender.closest("tr").remove();

        ReordenarEstiloQuestoes();

        ReordenarQuestoes(0);
    }
}

function PermissaoRemover() {

    alert('Não é permitida excluir esta questão, pois já está sendo utilizada.');

}

//function MudaStatusQuestao(sender) {
//    sender = jQuery(sender);

//    if (sender.closest("tr").find("select").prop("disabled")) {
//        //ativou a questão
//        sender.closest("tr").find("select").prop("disabled", false);
//        sender.closest("tr").removeClass("QuestaoDesativada");
//        sender.find("i").removeClass("icone-tabela-cancelar").addClass("icone-tabela-check");
//    } else {
//        //desativou a questão
//        sender.closest("tr").find("select").prop("disabled", true);
//        sender.closest("tr").addClass("QuestaoDesativada");
//        sender.find("i").removeClass("icone-tabela-check").addClass("icone-tabela-cancelar");
//    }
//}

function MudaStatusQuestaoAtualizar(sender, codigoGabarito) {
    sender = jQuery(sender);
    //Desativada
    var status = 0;

    if (sender.closest("tr").find("select").prop("disabled")) {
        status = 1;
        //ativou a questão
        sender.closest("tr").find("select").prop("disabled", false);
        sender.closest("tr").removeClass("QuestaoDesativada");
        sender.find("i").removeClass("icone-tabela-cancelar").addClass("icone-tabela-check");
    } else {
        status = 0;
        //desativou a questão
        sender.closest("tr").find("select").prop("disabled", true);
        sender.closest("tr").addClass("QuestaoDesativada");
        sender.find("i").removeClass("icone-tabela-check").addClass("icone-tabela-cancelar");
    }

    $.post('/Gabarito/AtualizarStatusQuestao/', { codigoGabarito: codigoGabarito, status: status }, function (data) { }, 'json');
}

function ReordenarEstiloQuestoes() {
    var linhas = jQuery(".Gabarito tbody tr");

    for (var i = 0; i < linhas.length; i++) {
        if (i % 2 == 1) {
            //se for impar
            jQuery(linhas[i]).removeClass("even").addClass("odd");
        } else {
            jQuery(linhas[i]).removeClass("odd").addClass("even");
        }
    }

    ContarQuestoes();
}

function ContarQuestoes() {
    var NumeroQuestoes = jQuery(".Gabarito tbody tr").length;

    if (NumeroQuestoes == 1) {

        jQuery("#ContainerGabarito #tabelaAlternativas_info").html("Mostrando 1 questão.");
    } else {
        jQuery("#ContainerGabarito #tabelaAlternativas_info").html("Mostrando " + NumeroQuestoes + " questões.");
    }
}

function ReordenarQuestoes() {
    var questoes = jQuery("table.Gabarito tbody tr");
    var NumeroQuestao = 1;


    //alert(questoes);

    jQuery.each(questoes, function (index, obj) {
        obj = jQuery(obj);

        var _id = "#hdn_" + (index + 1);
        var sorting = $(_id).val();

        var codigoGabarito = $(_id).val();

        //alert(codigoGabarito);

        var _html = "<input id='sorting_" + (NumeroQuestao) + "'  type='text' size='3' maxlength='4' value='" + (NumeroQuestao) + "'  onchange='AtualizarPosicaoQuestao(this, " + (NumeroQuestao) + ", " + codigoGabarito + ")'/>";

        obj.find("td").first().html(_html);
        NumeroQuestao++;
    });
}

/*combos*/
function SelecionarTermo() {
    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'html',
        url: '/Serie/CarregarListaSeriePorTermo',
        data: {
            Termo: jQuery("#ddlTermo").val(),
            CodigosTipoEnsino: JSON.stringify(CodigosTipoEnsino)
        },
        success: function (data) {
            data = JSON.parse(data);

            var html = "";

            jQuery.each(data, function (index, obj) {
                var objeto = { Codigo: obj.value, Termo: obj.termo };

                var index = -1;
                for (var i = 0; i < CodigosSeries.length; i++) {
                    if (JSON.stringify(CodigosSeries[i]) == JSON.stringify(objeto)) {
                        index = i;
                        break;
                    }
                }

                if (index != -1) {
                    html += "<tr class='selected'>" +
                            "<td class='check'><input type='checkbox' checked='checked' data-codigo-serie='" + obj.value + "' data-nome-termo='" + obj.termo + "' onclick='SelecionarSerie(this)' /></td>" +
                            "<td class='text'>" + obj.text + "</td>" +
                        "</tr>";
                }
                else {
                    html += "<tr>" +
                            "<td class='check'><input type='checkbox' data-codigo-serie='" + obj.value + "' data-nome-termo='" + obj.termo + "' onclick='SelecionarSerie(this)' /></td>" +
                            "<td class='text'>" + obj.text + "</td>" +
                        "</tr>";
                }
            });

            jQuery("#ContainerSerie table tbody").html(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function SelecionarComboTipoEnsino() {
    jQuery("#ddlTipoEnsino").removeClass("error");

    var CodigoddlTipoEnsino = jQuery("#ddlTipoEnsino").val();

    //Séries
    jQuery.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: {
            CodigoTipoEnsino: CodigoddlTipoEnsino
        },
        url: '/Serie/CarregarListaSerie',
        success: function (data) {
            data = JSON.parse(data);

            var html = "<option>Todos</option>";
            var termo = "";
            jQuery.each(data, function (index, obj) {
                termo = obj.termo;
                html += "<option value='" + obj.value + "'>" + obj.text + "</option>";
            });

            jQuery("#ddlSerie").html(html).data("termo", termo);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

    //Disciplinas
    var Codigo = new Array();
    Codigo.push(CodigoddlTipoEnsino);

    jQuery.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: {
            CodigosTipoEnsino: JSON.stringify(Codigo)
        },
        url: '/Disciplina/ListaDisciplinasPorTiposEnsino',
        success: function (data) {
            data = JSON.parse(data);

            var html = "<option>Todos</option>";
            jQuery.each(data, function (index, obj) {
                html += "<option value='" + obj.CD_DISCIPLINA + "'>" + obj.NM_DISCIPLINA + "</option>";
            });

            jQuery("#ddlDisciplina").html(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function MostrarGabarito() {

    //validação
    if (jQuery("#txtIdentificacaoProva").val().trim() == "") {
        jQuery("#txtIdentificacaoProva").addClass("error").focus().parent().append("<label class='error'>Obrigatório</label>");

        return;
    } else { jQuery("#txtIdentificacaoProva").removeClass("error"); jQuery("#txtIdentificacaoProva").parent().find("label").remove(); }

    if (jQuery("#txtDataVigencia").val().trim() == "") {
        jQuery("#txtDataVigencia").addClass("error").focus().parent().append("<label class='error'>Obrigatório</label>");

        return;
    } else { jQuery("#txtDataVigencia").removeClass("error"); jQuery("#txtDataVigencia").parent().find("label").remove(); }

    if (CodigosTipoEnsino.length == 0) {
        jQuery("#ContainerTipoEnsino").addClass("error").focus().parent().append("<label class='error'>Obrigatório</label>");
        return;
    } else { jQuery("#ContainerTipoEnsino").removeClass("error"); jQuery("#ContainerTipoEnsino").parent().find("label").remove(); }

    SalvarGabarito();

    $('#fieldsetMain').slideUp();
    jQuery("#CriarGabarito").slideUp();
    jQuery("#fieldsetGabarito").slideDown();
    jQuery("#Gravar").show();


}

function DesativarProva() {
    if (confirm("Tem certeza que deseja desativar a prova?")) {
        jQuery.ajax({
            async: true,
            dataType: 'html',
            data: {
                CodigoProva: jQuery("#txtCodigoProva").val(),
                DesativarProva: true
            },
            url: '/Gabarito/VisualizarGabarito',
            success: function (data) {
                jQuery("#modal").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function AbrirModalDeUpload(cod_gabarito) {
    jQuery.ajax({
        async: true,
        dataType: 'html',
        data: {
            cod_gabarito: cod_gabarito
        },
        url: '/Gabarito/CadastrarImagemParaGabarito',
        success: function (data) {
            jQuery("#modalImagemGabarito").empty().html(data).dialog({
                width: 600,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'center'
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function AbrirModalHabilidade(cod_gabarito, cod_prova) {
    jQuery.ajax({
        async: true,
        dataType: 'html',
        data: {
            cod_gabarito: cod_gabarito,
            cod_prova: cod_prova
        },
        url: '/Gabarito/HabilidadeGabarito',
        success: function (data) {
            jQuery("#modalHabilidadeGabarito").empty().html(data).dialog({
                width: 810,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'center'
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function BuscarHabilidades(cod_disciplina, cod_gabarito) {

    //Deixa somente o checkbox atual checado
    $('#ContainerDisciplina input[type=checkbox]').not('#' + cod_disciplina).removeAttr('checked');

    var dt = $('table#habilidadeGabarito').sedDataTable();
    dt.fnDestroy();

    if ($('#' + cod_disciplina).is(':checked')) {
        jQuery("table#habilidadeGabarito tbody").html('');
        jQuery.ajax({
            type: 'GET',
            async: true,
            dataType: 'json',
            data: {
                cod_disciplina: cod_disciplina,
                cod_gabarito: cod_gabarito
            },
            url: '/Gabarito/ListarHabilidadesPorDisciplina',
            success: function (data) {

                jQuery.each(data, function (index, obj) {
                    var isChecked = "";
                    if (this.Em_Uso) {
                        isChecked = "checked=checked";
                    }
                    jQuery("table#habilidadeGabarito tbody").append("<tr>" +
                                                "<td class='alinha_centro'><input type='checkbox' " + isChecked + " id='" + this.Cod_Habilidade + "' onchange='SalvarHabilidadeGabarito(" + this.Cod_Habilidade + ", " + this.CodigoGabarito + "," + cod_disciplina + ")'/></td>" +
                                                "<td style='text-align:center;'>" + this.Ds_Habilidade + "</td>" +
                                              "</tr>");
                });

                $('table#habilidadeGabarito').sedDataTable();

                VerificarSeTipoEnsinoTemHabilidade(cod_disciplina, cod_gabarito);

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }

    else {
        jQuery("table#habilidadeGabarito tbody").html('');
    }

}


function VerificarSeTipoEnsinoTemHabilidade(cod_disciplina, cod_gabarito) {
    jQuery.ajax({
        type: 'GET',
        async: true,
        dataType: 'json',
        data: {
            cod_disciplina: cod_disciplina,
            cod_gabarito: cod_gabarito
        },
        url: '/Gabarito/ListarHabilidadesPorDisciplina',
        success: function (data) {
            var temHabilidade = false;

            jQuery.each(data, function (index, obj) {
                if (this.Em_Uso) {
                    temHabilidade = true;
                }
            });

            $('span').find('#' + cod_disciplina).remove()

            if (temHabilidade) {

                $('#' + cod_disciplina).parent().parent().append("<span><div id='" + cod_disciplina + "'><i class='icone-tabela-check' title='Habilidades cadastradas'></i></div></span>");
            }

        }
    });
}

function SalvarHabilidadeGabarito(cod_habilidade, cod_gab, cod_disciplina) {
    if ($('#' + cod_habilidade).is(':checked')) {
        $.post('/Gabarito/SalvarHabilidadeGabarito', { cod_habilidade: cod_habilidade, cod_gab: cod_gab });
    }

    else {
        $.post('/Gabarito/RemoverHabilidadeGabarito', { cod_habilidade: cod_habilidade, cod_gab: cod_gab });
    }

    VerificarSeTipoEnsinoTemHabilidade(cod_disciplina, cod_gab);

}

function UploadToAzureSara(gabarito) {
    var fileInput = document.getElementById('files');

    var formdata = new FormData(); //FormData object
    formdata.append("cod_gabarito", gabarito);
    //Iterating through each files selected in fileInput
    for (i = 0; i < fileInput.files.length; i++) {
        //Appending each file to FormData object
        formdata.append(fileInput.files[i].name, fileInput.files[i]);

    }
    //Creating an XMLHttpRequest and sending
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/Gabarito/CadastrarImagemParaGabarito');
    xhr.send(formdata);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            Mensagem.Alert({
                titulo: "Sucesso",
                mensagem: "Imagem adicionada com sucesso",
                tipo: "Sucesso",
                botao: "Fechar"
            });

            $('#modalImagemGabarito').dialog('close');
        }
    }
}

function ExcluirGabarito(codProva) {
    jQuery.ajax({
        async: true,
        type: 'POST',
        dataType: 'json',
        data: { codigoProva: codProva },
        url: '/Gabarito/ExcluirGabarito',
        success: function (data) {
            if (data) {
                PesquisarProvas();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}