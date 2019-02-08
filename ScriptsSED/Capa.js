function ExcluirCapa(codigoArquivo, codigoDisciplina, nomeCapa) {
    Mensagem.Alert({
        titulo: "Caderno do Aluno",
        mensagem: "Deseja realmente excluir o arquivo da Capa?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        cache: false,
                        url: "/CapaCadernoDoAluno/Excluir",
                        type: 'POST',
                        data: {
                            codigoArquivo: codigoArquivo,
                            codigoDisciplina: codigoDisciplina,
                            nomeCompletoArquivo: nomeCapa
                        },
                        success: function (data) {
                            location.reload();
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

function AbrirUpload() {
    $.ajax({
        cache: false,
        url: "/CapaCadernoDoAluno/Upload",
        type: 'POST',
        data: {},
        success: function (data) {
            $('#divUpload').empty().html(data);

            $('#fileCapa').change(function (e) {
                readURL(this);
            });

            $('#nomeArquivo').keypress(function () {
                return false;
            });

            $('.form').validate({
                rules: {
                    codigoDisciplina: {
                        required: true
                    },
                    fileCapa: {
                        required: true
                    }
                },
                messages: {
                    codigoDisciplina: {
                        required: "Obrigatório"
                    },
                    fileCapa: {
                        required: "Obrigatório"
                    }
                }
            });

            $('#divUpload').dialog({
                title: "Upload da Capa",
                width: 850,
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
    });
}

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        if (input.files[0].name.length > 50) {
            $(input).val('');
            $('#divUpload').find('#nomeArquivo').val('');

            Mensagem.Alert({
                titulo: "Upload da Capa",
                mensagem: "O nome do arquivo de caderno deve ter um tamanho máximo de 50 caracteres.",
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
            $('#divUpload').find('#nomeArquivo').val('');

            Mensagem.Alert({
                titulo: "Upload da Capa",
                mensagem: "O arquivo do caderno deve ter um tamanho máximo de 20MB.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $('#divUpload').find('#nomeArquivo').val(input.files[0].name);

        reader.readAsDataURL(input.files[0]);
    }
    else if (input.value.length > 0) {
        var nomeArquivo = input.value.substring(input.value.lastIndexOf('\\') + 1);
        if (nomeArquivo > 50) {
            $(input).val('');
            $('#divUpload').find('#nomeArquivo').val('');

            Mensagem.Alert({
                titulo: "Upload da Capa",
                mensagem: "O nome do arquivo de caderno deve ter um tamanho máximo de 50 caracteres.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $('#divUpload').find('#nomeArquivo').val(nomeArquivo);
    }
    else {
        $('#divUpload').find('#nomeArquivo').val('');
    }
}

function Limpar() {
    $('#divUpload').find('#nomeArquivo').val('');
    $('#divUpload').find('#fileCapa').val('');
}