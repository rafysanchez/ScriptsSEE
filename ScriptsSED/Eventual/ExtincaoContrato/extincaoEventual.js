$(document).ready(function () {
    $.validator.addMethod("validarDataDispensa", function (value, element) {
        var data = $("#dataVigenciaDispensa").datepicker();
        var dataInicioExercicioStr = $("#dataInicioExercicio").datepicker("getDate");
        var dataVigenciaDispensa = $("#dataVigenciaDispensa").datepicker("getDate");
        if (dataVigenciaDispensa < dataInicioExercicioStr) {
            return false;
        }
        else {
            return true;
        }
    }, "A data da extinção/dispensa deve ser maior ou igual a data de início de exercício");
    //$.validator.addMethod("validarDataFalecimento", function (value, element) {
    //    if ($("#codigoMotivoDispensa").find("option:selected").val() == "5") {
    //        var dataFalecimento = $("#dataFalecimento").datepicker("getDate");
    //        var dataAtual = new Date()
    //        if (dataAtual < dataFalecimento) {
    //            return false;
    //        }
    //        else {
    //            return true;
    //        }
    //    } else {
    //        return true;
    //    }
    //}, "Data de falecimento não pode ser posterior a data atual");
    $("#formCadastro").validate({
        rules: {
            dataVigenciaDispensa: {
                required: true,
                validarDataDispensa: true
            },
            MotivoDispensa: {
                required: true
            },
            codigoMotivoDispensa: {
                required: function () {
                    if ($("#codigoMotivoDispensa").find("option:selected").val() == "5") {
                        return true;
                    } else {
                        return true;
                    }
                }
            },
            //dataFalecimento: {
            //    required: function () {
            //        if ($("#codigoMotivoDispensa").find("option:selected").val() == "5") {
            //            return true;
            //        } else {
            //            return true;
            //        }
            //    },
            //    validarDataFalecimento: true
            //}
        },
        submitHandler: function () {

            carregarDados();

            return;
        }
    });
    $("#controleDeAbas").sedTabControl({ embutida: true });
    $("#codigoMotivoDispensa").change(function () {
        //if ($(this).find("option:selected").val() == "5") {
        //    //$("#divDataFalecimento").show("slow");
        //} else {
        //    $("#divDataFalecimento").hide("slow");
        //    $("#dataFalecimento").focus();
        //}
    });
    AplicarMascaras();
});

function carregarDados() {
    var dados = {};
    dados.AnoExercicio = parseInt($("#anoExercicioCadastro").val());
    dados.Cpf = $("#cpfCadastro").val().replace(/\./g, '').replace(/\-/g, '');
    dados.DataVigenciaDispensa = $("#dataVigenciaDispensa").val();
    dados.MotivoDispensa = $("#codigoMotivoDispensa option:selected").val();
    //dados.DataFalecimento = $("#dataFalecimento").val();

    var myObject = JSON.stringify(dados);

    SalvarDados(myObject);
}

function SalvarDados(dados) {
    $.ajax({
        url: "/Eventual/ExtincaoContrato",
        type: "POST",
        data: dados,
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus, xhr) {
            if (data.TipoException == "sucesso") {
                $("#modalCadastrar").dialog("destroy");
                $("#formPesquisar").submit();
                Mensagem.Alert({
                    titulo: data.Title,
                    mensagem: data.Message,
                    tipo: "sucesso",
                    botao: "Fechar"
                });
            } else {
                Mensagem.Alert({
                    titulo: data.Title,
                    mensagem: data.Message,
                    tipo: data.TipoException,
                    botao: "Fechar"
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.Alert({
                titulo: jqXHR.responseJSON.Title,
                mensagem: jqXHR.responseJSON.Message,
                tipo: jqXHR.responseJSON.TipoException,
                escondido: jqXHR.responseJSON.Escondido,
                botao: "Fechar"
            });
        }
    });
}

//function validarDataExtincao() {
//    var start_actual_time = $("#dataInicioExercicio").val();
//    var end_actual_time = $("#dataFalecimento").val();

//    start_actual_time = new Date(start_actual_time);
//    end_actual_time = new Date(end_actual_time);

//    var diff = end_actual_time - start_actual_time;
//}