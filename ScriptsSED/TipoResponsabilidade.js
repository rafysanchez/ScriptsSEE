function FormularioInserirTipoResponsavel() {
    var url = '/TipoResponsavel/InserirTipoResponsavel';
    $.post(url, function (form) {
        $('#formDialog').html(form);
        $('#formDialog').dialog({
            //height: 300,
            width: 830,
            title: 'Cadastro',
            open: function (event, ui) {
                $('#formDialog').css('overflow', 'hidden'); //esconde a barra de rolagem do modal
            }
        });

        //validações do form
        $("#FormInserir").validate({
            rules: {
                NomeTipoResponsavel: "required"
            },
            messages: {
                NomeTipoResponsavel: "Obrigatório."
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

function FormularioEditarTipoResponsavel(CodigoTipoResponsavel) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        data: ({
            CodigoTipoResponsavel: CodigoTipoResponsavel
        }),
        url: '/TipoResponsavel/EditarTipoResponsavel',
        success: function (data, textStatus, jqXHR) {
            $('#formDialog').html(data);
            $('#formDialog').dialog({
                //height: 300,
                width: 830,
                title: 'Alterar',
                open: function (event, ui) {
                    $('#formDialog').css('overflow', 'hidden'); //esconde a barra de rolagem do modal
                }
            });

            //validações do form
            $("#FormEditar").validate({
                rules: {
                    NomeTipoResponsavel: "required"
                },
                messages: {
                    NomeTipoResponsavel: "Obrigatório."
                }
            });
            //

            //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
            $("#BtnEditar").click(function (e) {
                e.preventDefault();
                if ($("#FormEditar").valid()) {
                    $("#FormEditar").submit();
                }
            });
            //
        }
    });
}