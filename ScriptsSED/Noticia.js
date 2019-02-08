function NovaNoticia(codigoNoticia) {

    if (codigoNoticia == undefined) {
        codigoNoticia = 0;
    }

    $('#NovaNoticia').load('/Noticia/InserirEditar', function () {

        $('#fileImagem').change(function (e) {
            LeURL(this);
        });

        $('#Imagem').keypress(function () {
            return false;
        });

        AplicarMascaras();

        $('textarea').css("resize", "none");

        $('#btnSalvar').click(function (e) {
            if ($("#frmInserir").valid()) {
                ValidaNoticia();
            }
            else {
                return false;
            }
        });

    }).dialog({
        width: 825,
        draggable: false,
        modal: true,
        resizable: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        position: "top"
    });
}

function EditaNoticia(codigoNoticia) {

    $('#VisualizaNoticia').dialog('close');

    $('#EditaNoticia').load('/Noticia/InserirEditar', { codigoNoticia: codigoNoticia }, function () {
                
        $('#fileImagem').change(function (e) {
            LeURL(this);
        });

        $('#Imagem').keypress(function () {
            return false;
        });

        AplicarMascaras();

        $('textarea').css("resize", "none");

        $('#btnSalvar').click(function (e) {
            if ($("#frmEditar").valid()) {
                ValidaNoticia();
            }
            else {
                return false;
            }
        });

    }).dialog({
        width: 825,
        draggable: false,
        modal: true,
        resizable: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        position: "top"
    });
}

function LeURL(input) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();

        if (input.files[0].name.length > 50) {
            $(input).val('');
            $('div').find('#Imagem').val('');

            Mensagem.Alert({
                titulo: "Upload da Notícia",
                mensagem: "O nome do arquivo da notícia deve ter um tamanho máximo de 50 caracteres.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        var maxSize = 20971520; // 20MB em bytes.
        var size = parseInt(input.files[0].size);
        var isOk = maxSize > size;

        if (isOk == false) {
            $(input).val('');
            $('div').find('#Imagem').val('');

            Mensagem.Alert({
                titulo: "Upload da Noticia",
                mensagem: "O arquivo da notícia deve ter um tamanho máximo de 20MB.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $('div').find('#Imagem').val(input.files[0].name);

        reader.readAsDataURL(input.files[0]);
    }
    else if (input.value.length > 0) {

        var nomeArquivo = input.value.substring(input.value.lastIndexOf('\\') + 1);

        if (nomeArquivo > 50) {
            $(input).val('');
            $('div').find('#Imagem').val('');

            Mensagem.Alert({
                titulo: "Upload da Notícia",
                mensagem: "O nome do arquivo da notícia deve ter um tamanho máximo de 50 caracteres.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $('div').find('#Imagem').val(nomeArquivo);
    }
    else {
        $('div').find('#Imagem').val('');
    }
}

function ValidaNoticia() {

    var Titulo = $('#Titulo').val();
    var Descricao = $('#Descricao').val();
    var URL = $('#URL').val();
    var Imagem = $('#Imagem').val();

    if (Titulo.length == 0 &&
        Descricao.length == 0 &&
        URL.length == 0 &&
        Imagem.length == 0) {
        $("<label class='error'>Obrigatório</label>").appendTo("#Titulo");
        $("<label class='error'>Obrigatória</label>").appendTo("#Descricao");
        $("<label class='error'>Obrigatório</label>").appendTo("#URL");
        $("<label class='error'>Obrigatória</label>").appendTo("#Imagem");
    }
}

function Detalhe(id) {
    $.ajax({
            type: 'POST',
            async: true,
            cache: false,
            dataType: 'html',
            data: {
                    id: id
                },
            url: '/Noticia/Detalhe',
            success: function (data, textStatus, jqXHR) {

                        $('#VisualizaNoticia').empty().html(data);

                        $('textarea').css("resize", "none");

                        AplicarMascaras();

                        $('#VisualizaNoticia').dialog({
                            width: 825,
                            draggable: false,
                            modal: true,
                            resizable: false,
                            show: {
                                    effect: "blind",
                                    duration: 1000
                                },
                            position: "top"
                        });
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
    });
}

function CarregaNoticias() {
    $.ajax({
            type: 'GET',
            async: true,
            cache: false,
            dataType: 'html',
            url: '/Noticia/Listar',
            data: {},
            success: function (data, textStatus, jqXHR) {
                        $('#listaNoticias').empty().html(data);
                        $('#tblNoticias').sedDataTable();
                        },
            error: function (jqXHR, textStatus, errorThrown) {
                        }
        });
}

function ExcluiNoticia(id) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Deseja realmente excluir a Notícia?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        type: 'POST',
                        async: true,
                        cache: false,
                        data: ({
                            id: id
                        }),
                        url: '/Noticia/Excluir',
                        success: function (data, textStatus, jqXHR) {                            
                            $('#VisualizaNoticia').dialog('close');
                            CarregaNoticias();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
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

function LimpaImagem() {
    $('div').find('#Imagem').val('');
    $('div').find('#fileImagem').val('');
}
