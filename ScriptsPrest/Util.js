function formatarDataJson(emp) {
    var dateString = emp.substr(6);
    var currentTime = new Date(parseInt(dateString));
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var date = day + "/" + month + "/" + year;
    return date;
}

function formatarDataJson2(data)
{
    if (data != '')
    {
        var dateString = new Date(parseInt(data.replace(/\/Date\((-?\d+)\)\//, '$1')))
        var month = ((dateString.getMonth().length + 1) === 1) ? (dateString.getMonth() + 1) : (dateString.getMonth() + 1);
        var day = ((dateString.getDate().length) === 1) ? (dateString.getDate()) : (dateString.getDate());
        var year = dateString.getFullYear().toString().substring(2);
        var date = day + "/" + month + "/" + year;
    }
    else {
        return '';
    }
   
    return date;
}

function formatReal(numero)
{
    var tmp = numero + '';
    var neg = false;

    if (tmp - (Math.round(numero)) == 0) {
        tmp = tmp + '00';
    }

    if (tmp.indexOf(".")) {
        tmp = tmp.replace(".", "");
    }

    if (tmp.indexOf("-") == 0) {
        neg = true;
        tmp = tmp.replace("-", "");
    }

    if (tmp.length == 1) tmp = "0" + tmp

    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if (tmp.length > 6)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    if (tmp.length > 9)
        tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3");

    if (tmp.length = 12)
        tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4");

    if (tmp.length > 12)
        tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3.$4,$5");

    if (tmp.indexOf(".") == 0) tmp = tmp.replace(".", "");
    if (tmp.indexOf(",") == 0) tmp = tmp.replace(",", "0,");

    return (neg ? '-' + tmp : tmp);
}

function formatarCpf(valor) {
    valor = padLeft(valor, 11);
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
}

function formatarCnpj(valor) {
    valor = padLeft(valor, 14);
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
}

function padLeft(str, max) {    
    str = str.toString();
    return str.length < max ? padLeft("0" + str, max) : str;
}


$(".somenteNumeros").keypress(function (e) {
    if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
});



/* MASCARAS ---------------------------------------------------------------------------- */
function Mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}

/*Função que Executa os objetos*/
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}


/* TELEFONE CELULAR 54184-1241 */
function TelefoneOuCelular(v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{4,5})(\d{4})/, "$1-$2")
    //v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v
}