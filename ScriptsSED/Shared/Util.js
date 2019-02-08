
if (jQuery.fn.validate) { // Verifica se o plugin validator foi carregado
    //// Validate -------------------------------------------------------------------------------------
    jQuery.extend(jQuery.validator.messages, { // Mensagens padrões
        required: " Obrigatório",
        number: " Campo deve ser preenchido com um número",
        rangelength: " Campo deve ser entre {0} e {1}",
        min: " Campo deve ser maior ou igual a {0}",
        email: " Insira um e-mail valido",
        url: " Insira um link válido",
        date: " Insira uma data válida",
        equalTo: " Insira o mesmo valor novamente",
        maxlength: jQuery.validator.format(" Insira no máximo {0} caracteres"),
        minlength: jQuery.validator.format(" Insira pelo menos {0} caracteres"),
        rangelength: jQuery.validator.format(" Insira um valor entre {0} e {1} caracteres"),
        range: jQuery.validator.format(" Insira um valor entre {0} e {1}"),
        max: jQuery.validator.format(" Insira um valor menos ou igual a {0}"),
        min: jQuery.validator.format(" Insira um valor maior ou igual a {0}"),
        require_from_group: jQuery.validator.format(" Informe ao menos 1 campo")
    });

    /// Métodos adicionados ao validator (.addMethod()) para validação extra
    function ValidatorAddMethods(validator) {
        // Verifica se o outro campo foi preenchido, se sim, 'este' deve ser prenchido também
        jQuery.validator.addMethod("verificaCampoPrenchido", function (value, element, params) {
            var valOutroCampo = $(params).val();  //var valCampoObrigatorio = $('input[name="' + params + '"]').val();
            //console.log(' valOutroCampo: ' + valOutroCampo+' value: ' + value);
            if (valOutroCampo == '') return true;
            return value != '';
        }, 'Campo obrigatório.');

        jQuery.validator.addMethod("verificaCampoPrenchidoByName", function (value, element, params) {
            var valOutroCampo = $('[name="' + params + '"]:enabled').val();

            if (valOutroCampo == '')
                return true;

            return value != '';

        }, 'Campo obrigatório.');

        jQuery.validator.addMethod("greaterStart", function (value, element, params) {
            if (value == '') return true;
            var dataInicio = ConverteDataBanco($('input[name="' + params + '"]').val());
            var dataFim = ConverteDataBanco(value);
            console.log(' df: ' + dataFim + '\n di: ' + dataInicio);
            return dataFim > dataInicio;
        }, 'Data Fim deve ser maior que data início.');

        jQuery.validator.addMethod("greaterStartToday", function (value, element) {
            if (value == '') return true;
            return (new Date() < ConverteDataBanco(value));
        }, "Data Início deve ser maior que data atual.");

    }

    //// ----------------------------------------------------------------------------------------------
}

function CarregarOnClick_labelMultiples() {
    // Radio para selecionar todos (multiple select com chosen)
    // Usar com label ex: 
    //    <label class="labelMultiples" data-id-multiple="selTipoEnsino">
    //      <input type="radio" name="TodosTipoEnsino" value="true" checked class="chave">
    //      Selecionar Todos
    //    </label>
    $('.labelMultiples').click(function () {
        var radio = $(this).children($('input[type="radio"]'));
        //console.log(radio.val());
        if (!radio.prop('disabled')) {
            var id_sel = $(this).data('id-multiple');
            //console.log("seletor: $('#" + id_sel+"').prop('disabled', "+radio.val()=='true'+")");
            $('#' + id_sel).prop('disabled', radio.val() == 'true').trigger('chosen:updated');
        }
    });
}

// LimitadorAnos("#AnoInicio", "#AnoFim");
function LimitadorAnos(id_AnoInicio, id_AnoFim) {
    $(id_AnoInicio).change(function () {
        var valorSelecionado = this.value;
        //console.log(valorSelecionado);
        $(id_AnoFim + " option").each(function () {
            if ($(this).val() < valorSelecionado && $(this).val() != '')
                $(this).prop("disabled", true);
            else
                $(this).prop("disabled", false);
        });
    });

    $(id_AnoFim).change(function () {
        var valorSelecionado = this.value;
        //console.log(valorSelecionado);
        if (valorSelecionado != '') {
            $(id_AnoInicio + " option").each(function () {
                if ($(this).val() > valorSelecionado)
                    $(this).prop("disabled", true);
                else
                    $(this).prop("disabled", false);
            });
        } else {
            $(id_AnoInicio + " option").each(function () { $(this).prop("disabled", false); });
        }
    });

    if ($(id_AnoInicio).val() != '') $(id_AnoInicio).trigger('change');
    if ($(id_AnoFim).val() != '') $(id_AnoFim).trigger('change');
}

// ex. LimitadorDatas('#DT_Inicio', '#DT_Fim', 1);
function LimitadorDatas(de, ate, numeroDeMeses) {
    //var sel = seletor.split(',');
    //var from = sel[0].replace('#', '');
    //console.log('from: '+from);
    var dataHoje = new Date();
    var dataAmanha = new Date(dataHoje.getFullYear(), dataHoje.getMonth(), dataHoje.getDate() + 1);
    var dates = $(de + ', ' + ate).datepicker({
        //defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: typeof numeroDeMeses !== 'undefined' ? numeroDeMeses : 3,
        minDate: dataAmanha,
        onSelect: function (selectedDate) {
            var option = this.id == de.replace('#', '') ? "minDate" : "maxDate",
                instance = $(this).data("datepicker"),
                date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);

        },
        onClose: function () {
            $(this).valid();
        }
    });

    if ($(de).val() == '01/01/0001 00:00:00') $(de).val('');
    if ($(ate).val() == '01/01/0001 00:00:00') $(ate).val('');
}

// Modo de uso: 
// ExecutaJson('/[Domínio]/[Controller]/[Metodo]', [dados json]).success(function(data){
//      // do something here
// });
function ExecutaJson(url, dados) {
    return $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dados),
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}


// Modo de uso: 
// ExecutaAjax('/[Domínio]/[Controller]/[Metodo]', [dados]).success(function(data){
//      // do something here
// });
function ExecutaAjax(url, dados) {
    return $.ajax({
        url: url,
        type: 'POST',
        data: dados,
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}

// Serialize to Object (to use for JSON)
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


// formato param data: dd/mm/yyyy
// retorna yyyy/mm/dd
function ConverteDataBanco(data) {
    if (data) {
        split = data.split('/');
        novadata = split[1] + "/" + split[0] + "/" + split[2];
        return new Date(novadata);
    }
}

if (jQuery.fn.chosen) { // Verifica se o plugin chosen foi carregado
    //// Chosen -------------------------------------------------------------------------------------
    // Configuração default do chosen 
    // Uso:  $('.chosen').chosen(defaultConfig);
    var defaultConfig = {
        disable_search_threshold: 10,
        no_results_text: "Não encontrado",
        width: "300px",
    }

    $(document).ready(function () {
        CarregaChosen();
    });

    function CarregaChosen() {
        $('.chosen').chosen(defaultConfig);

        //trigger validation onchange
        $('.chosen').on('change', function () {
            $(this).valid();
        });
    }

    // Validar chosen (ddl ficam ocultos)
    $.validator.setDefaults({ ignore: ":hidden:not(select)" });
    //// -------------------------------------------------------------------------------------------
}


// Texto dos campos obrigatórios na validação
var textoCamposObrigatorios = " Obrigatório";

// Json
function AtualizaDDLSeries(codTipoEnsino, selectSeries, callback) {
    if (codTipoEnsino == 0) return false;

    ExecutaJson('/GestaoAluno/ParametrizacaoModulo/GetSeries', dados = { CodTipoEnsino: codTipoEnsino }).success(function (data) {

        var select = selectSeries;
        select.empty();
        select.append(new Option("-- Selecione --", "", true, true));

        $.each(data, function (i, obj) {
            select.append('<option value=' + obj.Value + '>' + obj.Text + '</option>');
        });
        select.prop('disabled', false).trigger("chosen:updated"); //Atualiza chosen

        if (typeof callback == 'function') callback(data);
    });
}


function CarregaSeriePorTipoEnsino(CodigoTipoEnsino, selectorContainer, nomeControle) {
    $.ajax({
        url: '/GestaoAluno/Shared/ComboSerie',
        type: 'GET',
        data: { CodigoTipoEnsino: CodigoTipoEnsino },
        success: function (data) {

            // Prazo
            $(selectorContainer).html(data);
            $(selectorContainer).find("#ddlSerie").attr("id", nomeControle);
            //call

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}


function CarregaHabilitacaoPorEixo(CodigoEixo, selectorContainer, nomeControle) {
    $.ajax({
        url: '/GestaoAluno/Shared/ComboHabilitacao',
        type: 'GET',
        data: { CodigoEixo: CodigoEixo },
        success: function (data) {

            // Prazo
            $(selectorContainer).html(data);
            $(selectorContainer).find("#ddlHabilitacao").attr("id", nomeControle);
            //call

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
}