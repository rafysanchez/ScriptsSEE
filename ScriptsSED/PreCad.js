$(document).ready(function () {
    AplicarMascaras();

});

function Valida() {
    $("#Dados_cpfUsuario").blur(function () {
        $("#frmPreCadastro").validate({
            rules: {
                'CampoCPF': {
                    required: true,
                    ValidaCPFBool: true
                }
            },
            messages: {
                CampoCPF: {
                    required: "Digite seu cpf",
                    ValidaCPFBool: "CPF inválido"
                }
            },
        });

    });

};

function LimpaCampos() {
    resetForm('#frmPreCadastro');
};

$.validator.addMethod("RG", function (value, element) {
    regex = /^[0-9A-Za-z]*$/gi;
    return element.value.match(regex);
}, "Caracter inválido.");

$.validator.addMethod("InputdigRG", function (value, element) {
    regex = /^[0-9A-Za-z]*$/gi;
    return element.value.match(regex);
}, "Dígito inválido");


