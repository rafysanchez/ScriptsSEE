function validar_conta(banco, conta, dc) {
    if (banco == 1)
        return valida_bb(conta, dc);
    else
        return false;
}

function valida_bb(conta, dc) {
    //variável que armazena a conta formatada com 12 dígitos
    var conta_format = String;
    //variável que armazena individualmente cada dígito da CONTA
    var numero = new Array(12);
    //variável que armazena o dígito obtido no cálculo
    var digito = String;
    //i: contador de dígitos da conta
    var i;
    //zera a variável digito
    digito = 0;
    //rotina que formata a conta para 12 dígitos
    conta_format = format_number(conta, 12);

    for (i = 0; i < 12; i++) {
        //atribui cada dígito da conta, já multiplicado pelo seu devido peso,
        //passado no parâmetro a um item do array

        numero[i] = conta_format.substr(i, 1) * peso_bb(i);

        //acumula a soma da multiplicação acima feita
        digito = digito + numero[i];
    }

    //obtém o dígito, através do resto da divisão por 11
    digito = digito % 11;

    if ((digito == dc) || (digito === 10 && ["X"].indexOf(dc.toString().toUpperCase()) >= 0))
        return true;
    else
        console.log("Dígito inválido para número da conta {" + digito + " <> " + dc + "}");

    return false;
}

//retorna o peso de acordo com a posição passada
function peso_bb(posicao) {
    if (posicao == 0)
        return 7;
    else
        if (posicao == 1)
            return 8;
        else
            if (posicao == 2)
                return 9;
            else
                if (posicao == 3)
                    return 1;
                else
                    if (posicao == 4)
                        return 2;
                    else
                        if (posicao == 5)
                            return 3;
                        else
                            if (posicao == 6)
                                return 4;
                            else
                                if (posicao == 7)
                                    return 5;
                                else
                                    if (posicao == 8)
                                        return 6;
                                    else
                                        if (posicao == 9)
                                            return 7;
                                        else
                                            if (posicao == 10)
                                                return 8;
                                            else
                                                if (posicao == 11)
                                                    return 9;
}
function format_number(numero, digitos) {
    var tamanho_numero = numero.length;
    var i;
    var number_format;

    number_format = '';
    digitos = digitos - tamanho_numero;

    for (i = 0; i < digitos; i++) {
        number_format = number_format + '0';
    }
    number_format = number_format + numero;

    return number_format;
}