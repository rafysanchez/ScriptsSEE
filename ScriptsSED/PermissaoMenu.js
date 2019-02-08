//Cria a ParcialView que contém a tabela de permissões por perfil.
function CarregarPermissoes(objeto) {
    //Chama a função responsável por chamar a Action que preenche a ParcialView.
    CarregarViewPermissao(parseInt(objeto.value), false);
    //Armarena o ID fo perfil para utiliza-lo posteriormente.
    document.all('PermissaoPerfil').CD_PERFIL = objeto.value;
}

//Função responsável por chamar a Action que efetuará o preenchimento da ParcialView.
function CarregarViewPermissao(cdPerfil, marcado) {
    //Set o caminho da Action.
    var url = '/Permissao/PermissaoPerfilParcial';
    $.ajax({
        cache: false,
        url: url,
        data: { cdPerfil: cdPerfil, marcado: marcado },
        type: 'GET',
        datatype: 'html',
        success: function (data) {
            //Renderiza a ParcialView dentro da div.
            $('div#PermissaoPerfil').html(data);
            $("#TabelaPermissoes").sedDataTable({
                order: [[1, "asc"]],
                columnDefs: [
                    { targets: [0,3, 4, 5], orderable: false },
                ],
            });
        },
        error: function () {
            Mensagem.Alert({
                titulo: "Permissão",
                mensagem: 'Ocorreu um erro durante o preenchimento das permissões por perfil',
                botao: "Fechar",
                tipo: "erro"
            });
        }
    });
}

//Função responsável por atribuir as permissões por perfil.
function AtualizarPermissao(objeto) {
    var url = '/Permissao/AtualizarPermissao';
    var add = false;
    var edit = false;
    var del = false;
    var cdPerfil = document.getElementById('PermissaoPerfil').CD_PERFIL;
    var inputs = $(objeto).parents('tr').find('#checkPermissaoAdicionar_' + objeto.value + 
        ', #checkPermissaoEditar_' + objeto.value +', #checkPermissaoDeletar_' + objeto.value);
    if ($(inputs).closest('#checkPermissaoAdicionar_' + objeto.value).is(':checked'))
        add = true;
    if ($(inputs).closest('#checkPermissaoEditar_' + objeto.value).is(':checked'))
        edit = true;
    if ($(inputs).closest('#checkPermissaoDeletar_' + objeto.value).is(':checked'))
        del = true;

        $.ajax({
            cache: false,
            url: url,
            data: {
                cd_menu: objeto.value,
                cd_perfil: cdPerfil,
                checado: objeto.checked,
                Adicionar: add,
                Editar: edit,
                Deletar: del
            },
            type: 'GET',
            datatype: 'html',
            success: function() {
                if (!objeto.checked) {
                    inputs.prop('checked', false);
                    inputs.attr('disabled', 'disabled');
                } else {
                    inputs.removeAttr('disabled');
                }
                //fct_renderPartialMenu();
            },
            error: function() {
                Mensagem.Alert({
                    titulo: "Permissão",
                    mensagem: 'Ocorreu um erro durante o preenchimento das permissões por perfil',
                    botao: "Fechar",
                    tipo: "erro"
                });
            }
        });
}

function fct_renderPartialMenu() {
    $.ajax({
        url: '/Menu/RenderPartialMenu',
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $("#menuAside").html(data);
        }
    });
}

function AtualizarPermissaoTodos(objeto) {
    var url = '/Permissao/AtualizarPermissaoTodos';
    $.ajax({
        cache: false,
        url: url,
        data: { cd_Perfil: document.all('PermissaoPerfil').CD_PERFIL, Checado: objeto.checked },
        type: 'GET',
        datatype: 'html',
        success: function (data) {
            CarregarViewPermissao(document.all('PermissaoPerfil').CD_PERFIL, objeto.checked);
        },
        error: function () {
            Mensagem.Alert({
                titulo: "Permissão",
                mensagem: 'Ocorreu um erro durante o preenchimento das permissões por perfil',
                botao: "Fechar",
                tipo: "erro"
            });
        }
    });

}

//Atualiza o checked dos checkbox.
function AtualizarCheckbox(checked) {
    $('input[type=checkbox]').each(function () {
        if (this.id == "checkPermissao") {
            this.checked = checked;
        }
    });
}

function AtualizarPermissaoCrud(objeto) {
    var url = '/Permissao/AtualizarPermissaoCrud';
    $.ajax({
        cache: false,
        url: url,
        data: { cd_menu: objeto.value, cd_perfil: document.all('PermissaoPerfil').CD_PERFIL, checado: objeto.checked, tipo: objeto.id },
        type: 'GET',
        datatype: 'html',
        error: function () {
            alert('Ocorreu um erro durante o preenchimento das permissões por perfil. Action = /Menu/AtualizarPermissaoCrud');
            Mensagem.Alert({
                titulo: "Permissão",
                mensagem: 'Ocorreu um erro durante o preenchimento das permissões por perfil',
                botao: "Fechar",
                tipo: "sucesso"
            });
        }
    });
}


