$(document).ready(function () {
   
    ProcessoCargaHoraria.Validacaoes();
    ProcessoCargaHoraria.ProcessarCargaHoraria();

    AplicarMascaras();
});

var ProcessoCargaHoraria = {   

    Validacaoes: function () {
        $('#formProcessoCargaHoraria').validate({
            rules: {            
                txtCpf: { required: true },             
                txtDI: { required: true, minlength: 1 },
                txtInicio: { required: true, minlength: 10 },
                txtFim: { required: true, minlength: 10 }

            },

            messages: {
                required: 'Obrigatório',              
                txtDI: { minlength: 'Di inválido' }
            }
        });
    },
    
    ProcessarCargaHoraria: function () {
        $('#btnProcessar').click(function () {

            $("[name='txtCpf']").rules('add', {
                required: true
            });

            if (!$('#formProcessoCargaHoraria').valid()) return;

            var params = {             
                cpf: String($('#formProcessoCargaHoraria #txtCpf').val()),
                di: $('#formProcessoCargaHoraria #txtDI').val(),
                inicio: $('#formProcessoCargaHoraria #txtInicio').val(),
                fim: $('#formProcessoCargaHoraria #txtFim').val()
            };


            $.post('../../ProcessoCargaHoraria/Processar', params, function (retorno) {
                if (retorno.sucesso) {                  
                }
            });

            //$.ajax({
            //    type: "POST",
            //    url: "../../ProcessoCargaHoraria/Processar",
            //    data: params,
            //    async: false,
            //    cache: false,
            //    contentType: false,
            //    processData: false,
            //    success: function (retorno) {
            //        if (retorno.sucesso) {
            //            Mensagem.Alert({
            //                titulo: "Processamento",
            //                mensagem: retorno.mensagem,
            //                tipo: retorno.tipo,
            //                botoes: [
            //                    {
            //                        botao: "Fechar",
            //                        callback: function () {
            //                            location.reload();
            //                            //TODO CarregarAtuacoes();
            //                        }
            //                    }
            //                ]
            //            });
            //        } else {
            //            Mensagem.Alert({
            //                titulo: "Processamento",
            //                mensagem: retorno.mensagem,
            //                tipo: retorno.tipo // aviso, erro, sucesso, alerta
            //            });
            //            $("#DadosAtuacao").dialog("close");
            //        }


            //    }
            //});


        });
    },


};
