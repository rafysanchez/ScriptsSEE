function PesquisarParametros(so) {
    testa = $('#txtAnoMatricula').val();
    if(testa == '') {
        so = 0;
    }

    $.ajax({
        cache: false,
        url: '/ParametrizarMatricula/Pesquisar',
        type: 'POST',
        data: {
            _anoMatricula: so == undefined ? $('#txtAnoMatricula').val() : so,
        },
        success: function (data) {

            $('#resultado').html(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop();
        }
    });
}

function Editar(id) {
    $.ajax({
        type: 'GET',
        data: {
            _codigoVigencia: id,
        },
        url: '/ParametrizarMatricula/Editar/' + id,
        success: function (data) {
            $('#modal').html(data);

            $('#modal').dialog({
                title: "Editar",
                width: 825,
                draggable: true,
                modal: true,
                resizable: false
            });


            //validações do form
            $('#formEditar').validate({
                rules: {
                    'AnoMatricula': {
                        required: true,
                        number: true,
                        minlength: 4,
                        //min: data.getFullYear()
                    },
                    'DataVigencia': {
                        required: true,
                        dataValida: true
                    }
                },
                messages: {
                    AnoMatricula: "Obrigatório",
                    DataVigencia: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    }
                }
            });
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

function Excluir(id) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Deseja realmente remover esta data?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        type: 'POST',
                        data: ({
                            _codigoVigencia: id
                        }),
                        url: '/ParametrizarMatricula/Excluir/' + id,
                        success: function (data) {
                            //$("#modal").dialog("close");
                            PesquisarParametros();
                        }
                    });

                }
            },
            {
                botao: "Não",
                callback: function () {
                    $.unblockUI();
                }
            }
        ]
    });
}


