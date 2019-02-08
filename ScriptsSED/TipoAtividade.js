function FormularioInserirTipoAtividade() {
    var url = '/TipoAtividade/InserirTipoAtividade';
    $.post(url, function (form) {
        $('#formDialog').html(form);
        $('#formDialog').dialog({
            //height: 300,
            width: 830,
            draggable: false,
            modal: true,
            resizable: false,
            show: {
                effect: "blind",
                duration: 1000
            },
            position: "top",
            open: function (event, ui) {
                $('#formDialog').css('overflow', 'hidden'); //esconde a barra de rolagem do modal
            }
        });

        //validação dos campos do form
        $("#FormInserir").validate({
            rules: {
                codigoTipoAtividade: "required",
                NomeTipoAtividade: "required",
            },
            messages: {
                codigoTipoAtividade: "Obrigatório",
                NomeTipoAtividade: "Obrigatório",
            }
        });
        //

        //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
        $("#btnInserir").click(function (e) {
            e.preventDefault();
            if ($("#FormInserir").valid()) {
                $("#FormInserir").submit();
            }
        });
        //
    });
}


function FormularioVisualizarTipoAtividade(CodigoTipoAtividade) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/TipoAtividade/VisualizarTipoAtividade/' + CodigoTipoAtividade,
        success: function (data, textStatus, jqXHR) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 300,
                width: 830,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                open: function (event, ui) {
                    $('#formDialog').css('overflow', 'hidden'); //esconde a barra de rolagem do modal
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


function FormularioEditarTipoAtividade(CodigoTipoAtividade) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/TipoAtividade/EditarTipoAtividade/' + CodigoTipoAtividade,
        success: function (data, textStatus, jqXHR) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 300,
                width: 830,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                open: function (event, ui) {
                    $('#formDialog').css('overflow', 'hidden'); //esconde a barra de rolagem do modal
                }
            });

            //validação dos campos do form
            $("#FormInserir").validate({
                rules: {
                    codigoTipoAtividade: "required",
                    NomeTipoAtividade: "required",
                },
                messages: {
                    codigoTipoAtividade: "Obrigatório",
                    NomeTipoAtividade: "Obrigatório",
                }
            });
            //

            //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
            $("#btnEditar").click(function (e) {
                e.preventDefault();
                if ($("#FormEditar").valid()) {
                    $("#FormEditar").submit();
                }
            });
            //
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