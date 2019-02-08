//valida o CPF digitado
function ValidarCPF(Objcpf) {
    var cpf = Objcpf.value;
    exp = /\.|\-/g
    cpf = cpf.toString().replace(exp, "");
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0, soma2 = 0;
    var vlr = 11;

    for (i = 0; i < 9; i++) {
        soma1 += eval(cpf.charAt(i) * (vlr - 1));
        soma2 += eval(cpf.charAt(i) * vlr);
        vlr--;
    }
    soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

    var digitoGerado = (soma1 * 10) + soma2;
    if (digitoGerado != digitoDigitado)
        if (Objcpf.value != '')
            alert('CPF Invalido!');
}

//adiciona mascara ao CPF
function MascaraCPF(cpf) {
    if (mascaraInteiro(cpf) == false) {
        event.preventDefault();
    }
    return formataCampo(cpf, '000.000.000-00', event);
}

//Verifica se o que foi digitado é um numero.
function mascaraInteiro() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault();
        return false;
    }
    return true;
}


//formata de forma generica os campos
function formataCampo(campo, Mascara, evento) {
    var boleanoMascara;

    var Digitato = evento.keyCode;
    exp = /\-|\.|\/|\(|\)|\:| /g
    campoSoNumeros = campo.value.toString().replace(exp, "");

    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;;

    if (Digitato != 8) { // backspace 
        for (i = 0; i <= TamanhoMascara; i++) {
            boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                || (Mascara.charAt(i) == "/") || (Mascara.charAt(i) == ":"))
            boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(")
                                || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
            if (boleanoMascara) {
                NovoValorCampo += Mascara.charAt(i);
                TamanhoMascara++;
            } else {
                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                posicaoCampo++;
            }
        }
        campo.value = NovoValorCampo;
        return true;
    } else {
        return true;
    }
}

//adiciona mascara ao telefone (Abrange 8 ou 9 digitos!)
function MascaraTel(telefone) {
    if (mascaraInteiro(telefone) == false) {
        event.preventDefault();
        return;
    }
    if (telefone.value.length == 9) {
        return formataCampo(telefone, '00000-0000', event);
    } else {
        return formataCampo(telefone, '0000-0000', event);
    }
}

//Muda o foco automaticamente de um objeto para o outro.
function MudaFoco(obj, proxObj) {
    if (obj.maxLength == obj.value.length) {
        var obj = document.getElementById(proxObj).focus();
        return;
    }
}

//adiciona mascara Generica 
//(EX: mascara= '000.000.000-00' ou '0000-0000')
//numerico = true or false//    Se true aceita somente numerico, se false aceita tudo.
function MascaraGenerica(valor, mascara, numerico) {
    if (numerico == true) {
        if (mascaraInteiro(valor) == false) {
            event.preventDefault();
        }
    }
    return formataCampo(valor, mascara, event);
}

//adiciona mascara ao hora
function MascaraHora(hora) {
    if (mascaraInteiro(hora) == false) {
        event.preventDefault();
    }
    return formataCampo(hora, '00:00', event);
}

function ValidaCPFBool(Objcpf) {
    var cpf = Objcpf.value;
    exp = /\.|\-/g
    cpf = cpf.toString().replace(exp, "");
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0, soma2 = 0;
    var vlr = 11;

    for (i = 0; i < 9; i++) {
        soma1 += eval(cpf.charAt(i) * (vlr - 1));
        soma2 += eval(cpf.charAt(i) * vlr);
        vlr--;
    }
    soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

    var digitoGerado = (soma1 * 10) + soma2;
    if (digitoGerado != digitoDigitado) {
        if (Objcpf.value != '')
            return false;
    }
    else return true;
}