$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#formCadastro").validate({
        ignore: true,
        rules: {
            anoExercicioCadastro: {
                required: true
            },
            dataInicio: {
                required: true
            },
            dataFim: {
                required: true
            },
            dataFimContrato: {
                required: true,
                dataMaiorQue: dataInicio
            },
            carencia: {
                required: true
            }
        },
        submitHandler: function () {
            var strListaDiretoria = new Array();
            var count = 0;
            var error = 0; // se for = 1 quer dizer que tem erros.


            $("#tabelaVagas tbody tr").each(function () {

                var codigo = $(this).find('td').attr("data-codigodiretoria") == "" ? 0 : parseInt($(this).find('td').attr("data-codigodiretoria"));

                var QtdeVagas = $("input[name^='qtdeVaga_" + codigo + "']").val();
                var QtdeAtivos = $("input[name^='qtdeAtivos_" + codigo + "']").val();
                var QtdeExtintos = $("input[name^='qtdeExtintos_" + codigo + "']").val();


                if (QtdeVagas < (QtdeAtivos - QtdeExtintos))
                {
                    error = 1;
                    $("input[name^='qtdeVaga_" + codigo + "']").addClass(" error");
                }
        

                strListaDiretoria[count] =
                    {
                        'CodigoDiretoria': codigo,
                        'QtdeVagas': QtdeVagas
                    }
                
                count++;
            });


            if (error == 1) {
                Mensagem.Alert({
                    titulo: "Cadastro parâmetro",
                    mensagem: "Quantidade de contrato não pode ser menor que a quantidade de contratos cadastrados.",
                    tipo: "alerta", // aviso, erro, sucesso, alerta
                    botao: "Fechar"
                });
                return;
            }
            else {
                var dados = {
                    Codigo: parseInt($("#codigo").val()),
                    AnoExercicio: parseInt($("#anoExercicioCadastro").val()),
                    DataInicio: $("#dataInicio").val(),
                    DataFim: $("#dataFim").val(),
                    DataFimContrato: $("#dataFimContrato").val(),
                    Carencia: $("#carencia").val(),
                    DataCadastro: $("#dataCadastro").val(),
                    DataAlteracao: $("#dataAlteracao").val(),
                    CodigoUsuarioCadastro: parseInt($("#codigoUsuarioCadastro").val()),
                    CodigoUsuarioAlteracao: parseInt($("#codigoUsuarioAlteracao").val()),
                    DiretoriasVaga: strListaDiretoria
                };

                var myObject = JSON.stringify(dados);

                $.ajax({
                    url: "/Eventual/SalvarParametrizacao",
                    type: "POST",
                    data: myObject,
                    contentType: "application/json; charset=utf-8",
                    success: function (data, textStatus, xhr) {
                        if (data.TipoException == "sucesso") {
                            $('#modalCadastrar').dialog('destroy')
                            $("#formPesquisar").submit();
                        }
                        Mensagem.Alert({
                            titulo: data.Title,
                            mensagem: data.Message,
                            tipo: data.TipoException, // aviso, erro, sucesso, alerta
                            botao: "Fechar"
                        });

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

                return;
            }
        }
       
    });
    AplicarMascaras();
});