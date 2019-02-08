function CarregarPerquisaUsuarioPorDiretoriaVinculada() {
    var parametroController = {
        nomeUsuario: $("#nomeUsuario").val(),
        loginUsuario: $("#loginUsuario").val(),
        cpf: $("#cpfUsuario").val(),
        rg: $("#rgUsuario").val()
    }
    if (parametroController.nomeUsuario !== "" || parametroController.loginUsuario !== "" || parametroController.cpf != "" || parametroController.rg !== "") {
        $.ajax({
            cache: false,
            url: "/UsuarioReset/ListaUsuarioDiretoriaVinculada",
            data: parametroController,
            type: "POST",
            datatype: "html",
            success: function (data) {
                $("div#dados").html(data);
                $("#table").sedDataTable({
                    columnDefs: [
                        { targets: [4, 5], orderable: false }
                    ],
                    tituloFiltro: "Usuários",
                    nomeExportacao: "Usuários"
                });
            },
            error: function () {
                alert("Erro na busca. Tente novamente ou contate o administrador");
            }
        });
    } else
        alert("Preencha pelo menos um dos campos para realizar a busca.");
}

function CarregarPerquisaUsuario() {


    var parametrosController = {
        codEntidade: $("#codEntidade").val(),
        loginUsuario: $("#nomeLogin").val(),
        nomeEscola: $("#nomeEscola").val()
    }

    if (codEntidade !== "" || loginUsuario !== "" || nomeEscola !== "") {
        $.ajax({
            cache: false,
            url: "/UsuarioReset/ListaUsuarioDiretoriaMunicipio",
            data: parametrosController,
            type: "POST",
            datatype: "html",
            success: function (data) {
                $("#resultado").html(data);
                $("#table").sedDataTable({
                    tituloFiltro: "Usuários", nomeExportacao: "Usuários", columnDefs: [
                            { targets: [3], orderable: false }
                    ]
                });
            }
        });
    }
    else
        alert("Preencha pelo menos um dos campos para realizar a busca.");
}

function ReiniciarSenhaUsuario(login) {

    Mensagem.Alert({
        titulo: "Alerta",
        mensagem: "Deseja reiniciar a senha deste Usuário?",
        tipo: "Alerta",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        cache: false,
                        url: '/Conta/ReiniciarSenhaUsuarioMunicipada/',
                        data: {
                            login: login
                        },
                        type: 'POST',
                        success: function (data) {
                            if (data && data.Sucesso)
                                $('#btnPesquisar').trigger('click');
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