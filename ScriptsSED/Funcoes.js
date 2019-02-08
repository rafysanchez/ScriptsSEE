$(document).ready(function () {

    $(document).ajaxStop(function () {
        ConfigurarFontes();
        AplicarMascaras();
    });

    $.datepicker.regional['pt-BR'] = {
        closeText: 'Fechar',
        prevText: '&#x3c;Anterior',
        nextText: 'Pr&oacute;ximo&#x3e;',
        currentText: 'Hoje',
        monthNames: ['Janeiro', 'Fevereiro', 'Mar&ccedil;o', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Segunda-feira', 'Ter&ccedil;a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
    $.validator.addMethod(
        "dataValida",
        function (value, element) {
            return ValidaData(element);
        },
        "Data inválida"
    );

    jQuery.validator.addMethod("validarDataInicio", function (valor, dataInicio, dataFimInput) {

        if ($(dataFimInput).val() == "") return true;
        // if (valor.length <= 9 && dataFimInput == "") return true;
        var dtIniVigencia = valor.substring(6) + valor.substring(3, 5) + valor.substring(0, 2);
        var dtFimVigencia = $(dataFimInput).val().substring(6) + $(dataFimInput).val().substring(3, 5) + $(dataFimInput).val().substring(0, 2);
        return dtFimVigencia > dtIniVigencia;

    },
            'Data início não pode ser maior que data fim'
        );

    $.validator.addMethod("nome", function (value, element) {
        regex = /^[ a-zA-Z ÁáÉéÍíÓóÃãÂâÊêÔôÚúç]*$/gi;
        return element.value.match(regex);
    }, "Caracter inválido.");

    $.validator.addMethod("letras", function (value, element) {
        regex = /^[a-zA-Z]*$/gi;
        return element.value.match(regex);
    }, "Informe apenas letras.");

    $.validator.addMethod("numeros", function (value, element) {
        regex = /^[0-9]*$/gi;
        return element.value.match(regex);
    }, "Informe apenas números.");

    $.validator.addMethod("maiorQue", function (value, element, params) {
        return element.value > params[0];
    }, $.validator.format("Valor deve ser maior que {0}."));

    $.validator.addMethod("RG", function (value, element) {
        regex = /^[0-9A-Za-z]*$/gi;
        return element.value.match(regex);
    }, "Caracter inválido.");

    $.validator.addMethod("digRG", function (value, element) {
        regex = /^[0-9xX]*$/gi;
        return element.value.match(regex);
    }, "Dígito inválido");

    $.validator.addMethod("ano", function (value, element) {
        regex = /^[\d{4}]*$/gi;
        return element.value.match(regex);
    }, "Ano inválido");

    $.validator.addMethod("cep", function (value, element) {
        regex = /^\d{5}\-?\d{3}$/gi;
        return element.value.match(regex) || value.length == 0;
    }, "CEP inválido");

    $.validator.addMethod("endereco", function (value, element) {
        regex = /^[ a-zA-Z ÁáÉéÍíÓóÃãÂâÊêÔôÚúç 0-9]*$/gi;
        return element.value.match(regex) || value.length == 0;
    }, "Endereço inválido");

    $.validator.addMethod("numEndereco", function (value, element) {
        regex = /^[ a-zA-Z0-9]*$/gi;
        return element.value.match(regex) || value.length == 0;
    }, "Número de Endereço inválido");

    $.validator.addMethod("url", function (value, element) {
        regex = /^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.){1}([0-9A-Za-z]+\.)/gi;
        return element.value.match(regex) || value.length == 0;
    }, "Url inválida");

    $.validator.addMethod(
        "cpf",
        function (value, element) {
            if (element.value.length == 0)
                return true;

            var cpf = element.value;

            cpf = cpf.replace(/[^\d]+/g, '');

            if (cpf == '') return false;

            // Elimina CPFs invalidos conhecidos
            if (cpf.length != 11 ||
                cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999")
                return false;

            // Valida 1o digito
            add = 0;
            for (i = 0; i < 9; i++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                return false;

            // Valida 2o digito
            add = 0;
            for (i = 0; i < 10; i++)
                add += parseInt(cpf.charAt(i)) * (11 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(10)))
                return false;

            return true;

            //if (element.value.length == 0)
            //    return true;
            //exp = /\.|\-/g
            //cpf = cpf.toString().replace(exp, "");
            //var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
            //var soma1 = 0, soma2 = 0;
            //var vlr = 11;
            //for (i = 0; i < 9; i++) {
            //    soma1 += eval(cpf.charAt(i) * (vlr - 1));
            //    soma2 += eval(cpf.charAt(i) * vlr);
            //    vlr--;
            //}
            //soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
            //soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

            //var digitoGerado = (soma1 * 10) + soma2;
            //if (digitoGerado != digitoDigitado)
            //    return false;

            //return true;
        },
        "CPF inválido"
    );

    $.validator.addMethod(
        "horaValida",
        function (value, element) {
            var regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gi;
            return element.value.match(regex) || value.length == 0;
        },
        "Hora inválida");

    $.validator.addMethod(
        "horaValidaDe5Em5Minutos",
        function (value, element) {
            var regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0,5]$/gi;
            return element.value.match(regex) || value.length == 0;
        },
        "Hora inválida");

    //Comportamento para campos que só permitam numeros
    $("body").on('keypress', ".numero, .numeros", function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            $(this).piscar(2);
            return false;
        }
    });

    AplicarMascaras();

    ConfigurarFontes();
});

function ValidaData(element) {
    if (element.value.length == 0)
        return true;
    regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
    return element.value.match(regex);
}

function AplicarMascaras() {
    $('.anoLetivo').mask('9999');
    $('.notaPremio').mask('99');
    $('.data')
        .mask('99/99/9999')
        .datepicker();
    $('.hora').mask('99:99');
    $('.cpf').mask('000.000.000-00');
    $('.cep').mask('99999-999');
    $('.telefone')
        .mask('(99) 9999-9999?9')
       .one('keypress', MascaraTelefone);
    $('.ra').mask('999999999999').bind('blur', function () {
        if ($(this).val().length > 0) {
            var textoCompletar = '';
            for (var i = 0; i < 12 - $(this).val().length; i++) {
                textoCompletar = "0" + textoCompletar;
            }

            textoCompletar = textoCompletar + $(this).val();
            $(this).val(textoCompletar);
        }
    });
}

function MascaraTelefone(telefone, e, currentField, options) {
    telefone = $(this).val().replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
    $(this).data('mask').remove();
    $(this).val(telefone);
    var mascara;
    if (telefone.length < 10)
        mascara = '(99) 9999-9999?9';
    else
        mascara = '(99) 99999-9999';
    $(this)
        .mask(mascara)
        .one('keypress', MascaraTelefone)
    ;
}

jQuery.validator.addMethod('VerificaQuantidadeLetraRG', function (valor, elemento) {
    var letras = /([0-9]*[A-Za-z][0-9]*){4}$/;

    return !(valor.match(letras));
},
              'dado inválido'
          );

function eData(txtData) {
    var currVal = txtData;
    if (currVal == '')
        return false;

    //Declare Regex  
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for dd/mm/yyyy format.
    dtMonth = dtArray[3];
    dtDay = dtArray[1];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

jQuery.fn.piscar = function (i, toogleClass) {
    elem = $(this);
    elem.addClass(toogleClass);
    fazerPiscar(elem, i, function () { elem.removeClass(toogleClass); });
    return elem;
}
function fazerPiscar(elem, i, callback) {
    if (i == 0)
        return callback();

    elem.fadeOut(200, 0, function () {
        $(this).fadeIn(150, 0, function () {
            fazerPiscar(elem, i - 1, callback);
        });
    });
}

jQuery.fn.VerificaNumero = function () {
    $(this).keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    return $(this);
}

jQuery.fn.sedMultipleSelect = function (obj) {
    var config = {
        selectAllText: 'Selecionar Todos',
        allSelected: 'Todos Selecionados',
        countSelected: '# Selecionado(s) de % ',
        noMatchesFound: 'Nenhum registro encontrado'
    };

    if (obj != undefined)
        for (var i in obj)
            if (obj.hasOwnProperty(i)) config[i] = obj[i];

    if ($('#cboTurmaHorarioAula').next().children().eq(1).hasClass('ms-drop'))
        $('#cboTurmaHorarioAula').next().children().eq(1).empty();


    //$(this).children()[0].remove();

    $(this).multipleSelect(config);
    $(this).multipleSelect("uncheckAll");

    return;

};

jQuery.fn.sedDataTable = function (obj, overflow) {
    var config = {
        bJQueryUI: true,
        bRetrieve: true,
        oLanguage: {
            sProcessing: "Processando...",
            sLengthMenu: "Mostrar _MENU_ registros",
            sZeroRecords: "Não foram encontrados resultados",
            sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            sInfoEmpty: "Mostrando de 0 até 0 de 0 registros",
            sInfoFiltered: "(filtrado de _MAX_ registros no total)",
            sInfoPostFix: "",
            sSearch: "Buscar:",
            sUrl: "",
            oPaginate: {
                sFirst: "Primeiro",
                sPrevious: "Anterior",
                sNext: "Seguinte",
                sLast: "Último"
            }
        }
    };
    if (obj != undefined)
        for (var item in obj)
            config[item] = obj[item];



    $(this).dataTable(config);

    if (overflow) {
        $('.tabela').wrap("<div style='overflow-x:scroll;overflow-y:hidden;width:751px;position:relative;  margin-right:5px;display:block '>");
        $('.fg-toolbar').css('width', '750px');
    }
};
