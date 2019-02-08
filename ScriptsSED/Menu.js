function FormularioInserirMenu() {
    var url = '/Menu/InserirMenu';
    $.post(url, function (form) {
        $('#formDialog').html(form);
        $('#formDialog').dialog({
            title: "Cadastrar Menu",
            width: 830,
        });

        //validações do form
        $("#FormInserir").validate({
            rules: {
                DescricaoMenu: "required",
                DescricaoNivelHierarquico: "required"//,
                //Link: "required"
                //Visao: "required",
                //Acao: "required"
            },
            messages: {
                DescricaoMenu: "Obrigatório.",
                DescricaoNivelHierarquico: "Obrigatório."//,
                //Link: "Obrigatório."
                //Visao: "Obrigatório.",
                //Acao: "Obrigatório."
            }
        });
        //

        //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
        $("#btnInserir").click(function (e) {
            e.preventDefault();
            if ($("#FormInserir").valid()) {
                $("#FormInserir").submit();
                Mensagem.Alert({
                    titulo: "Menu",
                    mensagem: "Menu inserido com sucesso",
                    tipo: "sucesso",
                    botao: "Fechar"
                });
            }
        });
        //
    });
}

function FormularioEditarMenu(CodigoMenu) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        data: ({
            CodigoMenu: CodigoMenu
        }),
        url: '/Menu/EditarMenu',
        success: function (data, textStatus, jqXHR) {

            $('#formDialog').html(data);

            $('#formDialog').dialog({
                title: "Alterar Menu",
                width: 830,
            });

            //validações do form
            $("#FormEditar").validate({
                rules: {
                    DescricaoMenu: "required",
                    DescricaoNivelHierarquico: "required"//,
                    //Link: "required"
                },
                messages: {
                    DescricaoMenu: "Obrigatório.",
                    DescricaoNivelHierarquico: "Obrigatório."//,
                    //Link: "Obrigatório."
                }
            });
            //

            //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
            $("#btnEditar").click(function (e) {
                e.preventDefault();
                if ($("#FormEditar").valid()) {
                    $("#FormEditar").submit();
                    Mensagem.Alert({
                        titulo: "Menu",
                        mensagem: "Menu alterado com sucesso",
                        tipo: "sucesso",
                        botao: "Fechar"
                    });
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


function FormularioExcluirPerfil(codigoMenu) {
    var id = codigoMenu;
    $.ajax({
        cache: false,
        url: '/Menu/ListarPerfil/',
        data: {
            codigoMenu:  codigoMenu
        },
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            if (data == null || data == "") {
                return false;
            }
            $('<div id="#dialog">'+ data + ' </div>').dialog({
                title: "Perfis Associados ",
                width: 820,
                draggable: false,
                modal: true,
                resizable: false,
                position: 'top'
            });

            
        }
    });
}


function ExcluirPermissaoMenu(codigoMenu) {
    var id = codigoMenu;
    Mensagem.Alert({
        titulo: "Excluir Perfil(s) associados ao Menu",
        mensagem: "Tem certeza que deseja excluir todos os perfis?",
        tipo: "alerta",
        botoes: [
            {
                botao: "Sim",
                callback: function() {
                    $.ajax({
                        url: '/Menu/DeleterPermissaoMenu/' + id,
                        type: 'POST',
                        success: function(data) {
                            if (data.sucesso) {
                                location.reload();
                            }
                        }
                    });

                }
            },
            {
                botao: "Não"
            }
        ]
    });
}

function Excluir(id) {
        Mensagem.Alert({
            titulo: "Excluir Menu",
            mensagem: "Tem certeza que deseja excluir esse menu?",
            tipo: "alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            url: '/Menu/DeletarMenu/' + id,
                            type: 'POST',
                            success: function (data) {
                                if (data.sucesso) {
                                    location.reload();
                                }
                            }
                        });

                    }
                },
                {
                    botao: "Não"
                }
            ]
        });
}

function somenteNumerosPontoVirgula(num) {
    var er = '[-@!#$%¨&*+_´`^~,;:?áÁéÉíÍóÓúÚãÃçÇ|\?/{}"<>()A-Za-z]';
    if (num.value.match(er)) {
        num.value = "";
    }

}