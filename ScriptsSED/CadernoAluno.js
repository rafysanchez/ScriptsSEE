function CadernoDoAluno(arquivo) {
    $.ajax({
        cache: false,
        url: "/CadernoDoAluno/VerificarCaderno",
        type: 'POST',
        data: {
            arquivo: arquivo
        },
        success: function (data) {
            if (data) {
                window.open("/CadernoDoAluno/CadernoAluno", "_blank ");
            }
        }
    });
}

function ExibirAbrangencia(ddlTipoCaderno) {
    var tipoCaderno = $(ddlTipoCaderno).val();
    Zerar();

    if (tipoCaderno.length > 0) {
        $('#divUpload').find('#anoLetivo').autoPreencher($('#divUpload').find('#codigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTipoEnsinoPorAnoLetivo', ['anoLetivo'], null, $('#divUpload'));
        $('#divUpload').find('#codigoTipoEnsino').autoPreencher($('#divUpload').find('#codigoSerie'), 'TipoEnsino', 'CarregarListaSerie', null, null, $('#divUpload'));
        $('#divUpload').find('#codigoSerie').autoPreencher($('#divUpload').find('#codigoDisciplina'), 'Disciplina', 'CarregarListaDisciplinasCadernoDoAluno', ['codigoTipoEnsino', 'codigoSerie', 'anoLetivo'], null, $('#divUpload'));
        $('#divUpload').find('#anoLetivo').trigger("change");

        $('#divUpload').find('#abrangencia').css("display", "");//Se foi escolhido um caderno, mostrar a abrangencia

        if (tipoCaderno == 3) {//Se o tipo escolhido foi Curriculo Oficial
            $('#divUpload').find('#tipoEnsinoSerie').css("display", "none");//Esconder os combos Tipo de Ensino e Série na escolha da abrangência...
            CarregarDisciplinasCurriculo() // Carregar as disciplinas específicas do Currículo Oficial
            $('#divUpload').find('#btnAdicionarAbrangencia').prop("value", "Adicionar Disciplina");
        }
        else {//Senão, mostrar tudo
            $('#divUpload').find('#tipoEnsinoSerie').css("display", "");
            $('#divUpload').find('#btnAdicionarAbrangencia').prop("value", "Adicionar Disciplina e Série");
        }
    }
    else {
        $('#divUpload').find('#abrangencia').css("display", "none");
    }
}

function CarregarDisciplinasCurriculo() {
    //Disciplinas não existentes na tabela de disciplinas, sendo específicas apenas para o Currículo Oficial
    var options = '<option value="">Selecione...</option>' +
    '<option value="1">Linguagens e Códigos</option>' +
    '<option value="2">Matemática</option>' +
    '<option value="3">Ciências da Natureza</option>' +
    '<option value="4">Ciências Humanas</option>';

    $('#divUpload').find('#codigoDisciplina').empty().append(options);
}

function Zerar() {
    //Apaga as informações do arquivo
    Limpar();

    //Remove as linhas, se houver, na tabela de abrangencias escolhidas
    if ($('#divUpload').find('.tabela tbody').find('tr').length > 0) {
        $('#divUpload').find('.tabela tbody tr').each(function () {
            $(this).remove();
        });
    }

    //Esconde as opções de escolha da abrangencia
    $('#divUpload').find('#tbAbrangencia').css("display", "none");

    //Reset em ano letivo  e tipo de ensino
    $('#divUpload').find('#anoLetivo').val(new Date().getFullYear());
    $('#divUpload').find('#anoLetivo').trigger("change");
    $('#divUpload').find('#dadosArquivo').css("display", "none");
}

function AdicionarAbrangencia() {
    if ($('#divUpload').find('#codigoDisciplina').val().length > 0) {
        if ($('#divUpload').find('#codigoDisciplina').val().length > 0) {
            var tipoCaderno = $('#divUpload').find('#TipoCaderno').val();
            var anoLetivo = $('#divUpload').find('#anoLetivo').val();
            var tipoEnsino = $('#divUpload').find('#codigoTipoEnsino').val();
            var serie = $('#divUpload').find('#codigoSerie').val();
            var disciplina = $('#divUpload').find('#codigoDisciplina').val();

            var body = $('#divUpload').find('#tabelaAbrangencia tbody');

            var index = GerarIndice();

            var linha = '<tr>' +
                            '<td style="text-align: center;">' +
                                $('#divUpload').find('#anoLetivo').val() +
                                '<input type="hidden" name="volumes.Index" value="' + index + '" />' +
                                '<input type="hidden" name="volumes[' + index + '].AnoLetivo" value="' + anoLetivo + '" class="anoletivo" />' +
                            '</td>' +
                            '<td style="text-align: center;">' +
                                $('#divUpload').find('#codigoTipoEnsino option:selected').text() +
                                '<input type="hidden" name="volumes[' + index + '].TipoEnsino.CD_TIPO_ENSINO" value="' + tipoEnsino + '" class="tipoensino" />' +
                            '</td>' +
                            '<td style="text-align: center;">' +
                                $('#divUpload').find('#codigoSerie option:selected').text() +
                                '<input type="hidden" name="volumes[' + index + '].Serie.NR_SERIE" value="' + serie + '" class="serie" />' +
                            '</td>' +
                            '<td style="text-align: center;">' +
                                $('#divUpload').find('#codigoDisciplina option:selected').text() +
                                '<input type="hidden" name="volumes[' + index + '].Disciplina.CD_DISCIPLINA" value="' + disciplina + '" class="disciplina" />' +
                            '</td>' +
                            '<td style="text-align: center;">' +
                                '<a class="remover" href="javascript:void(0)" onclick="RemoverAbrangencia(this)"><i class="icone-tabela-excluir" title="Excluir"></i></a>' +
                            '</td>' +
                        '</tr>';

            $(body).append(linha);

            if (tipoCaderno == 3) {//Se o tipo escolhido foi Curriculo Oficial
                TratarColunas(false); //... esconder as colunas Tipo de Ensino e Série na tabela de abrangencias escolhidas
            }
            else {//Senão, mostrar tudo
                TratarColunas(true);
            }

            //Mostra a tabela e o botão para adicionar o arquivo
            $('#divUpload').find('#tbAbrangencia').css("display", "");
            $('#divUpload').find('#tabelaAbrangencia').show();
            $('#divUpload').find('#dadosArquivo').show();

            //Zera opções do Dados do caderno
            $('#divUpload').find('#codigoTipoEnsino option[value=""]').prop("selected", "selected");
            $('#divUpload').find('#codigoTipoEnsino').trigger("change");
        }
    }
}

function RemoverAbrangencia(objeto) {
    $(objeto).closest("tr").get(0).remove();

    //Se a tabela ficar vazia após a remoção, o botão para adicionar o arquivo é escondido
    if ($('#divUpload').find('#tabelaAbrangencia tbody').find('tr').length == 0) {
        $('#divUpload').find('#dadosArquivo').hide();
        $('#divUpload').find('#tabelaAbrangencia').hide();
    }
}

function TratarColunas(mostrar) {
    //Esconde ou mostra as colunas da tabela de abrangencias escolhidas
    var tabela = $('#divUpload').find('#tabelaAbrangencia');
    var iCol = 2;

    //Coluna 2:  Tipo Ensino
    //Coluna 3:  Série

    while (iCol <= 3) {
        if (mostrar) {
            $(tabela).find('th:nth-child(' + iCol + ')').show();
            $(tabela).find('td:nth-child(' + (iCol) + ')').show();
        }
        else {
            $(tabela).find('th:nth-child(' + (iCol) + ')').hide();
            $(tabela).find('td:nth-child(' + (iCol) + ')').hide();
        }
        iCol++;
    }
}

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        if (input.files[0].name.length > 50) {
            $(input).val('');
            $('#divUpload').find('#Arquivo_NomeArquivo').val('');

            Mensagem.Alert({
                titulo: "Upload do Caderno",
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
            $('#divUpload').find('#Arquivo_NomeArquivo').val('');

            Mensagem.Alert({
                titulo: "Upload do Caderno",
                mensagem: "O arquivo do caderno deve ter um tamanho máximo de 20MB.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $('#divUpload').find('#Arquivo_NomeArquivo').val(input.files[0].name);

        reader.readAsDataURL(input.files[0]);
    }
    else if (input.value.length > 0) {
        var nomeArquivo = input.value.substring(input.value.lastIndexOf('\\') + 1);
        if (nomeArquivo > 50) {
            $(input).val('');
            $('#divUpload').find('#Arquivo_NomeArquivo').val('');

            Mensagem.Alert({
                titulo: "Upload da Capa",
                mensagem: "O nome do arquivo de caderno deve ter um tamanho máximo de 50 caracteres.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $('#divUpload').find('#Arquivo_NomeArquivo').val(nomeArquivo);
    }
    else {
        $('#divUpload').find('#Arquivo_NomeArquivo').val('');
    }
}

function Limpar() {
    $('#divUpload').find("#NomeVolume").val('Volume Único');
    $('#divUpload').find('#Arquivo_NomeArquivo').val('');
    $('#divUpload').find('#fileCaderno').val('');
}

function ListarVolumes() {
    $.ajax({
        cache: false,
        url: "/CadernoDoAluno/ListaArquivos",
        type: 'POST',
        data: {
            codigoTipoCaderno: parseInt($('#TipoCaderno').val()),
            anoLetivo: parseInt($('#anoLetivo').val()),
            codigoTipoEnsino: parseInt($('#codigoTipoEnsino').val()),
            codigoSerie: parseInt($('#codigoSerie').val()),
            codigoDisciplina: parseInt($('#CodigoDisciplina').val())
        },
        success: function (data) {
            $('#listaArquivos').empty().html(data);

            if (parseInt($('#TipoCaderno').val()) == 3)//Curriculo Oficial
            {
                var iCol = 1;

                while (iCol <= 2) {
                    $('#tabelaArquivos').find('th:nth-child(' + (iCol) + ')').hide();
                    $('#tabelaArquivos').find('td:nth-child(' + (iCol) + ')').hide();
                    iCol++;
                }
            }

            var fs = new Array();

            if (parseInt($("#TipoCaderno").val()) > 0) fs.push({ nome: "Tipo do Caderno", valor: $("#TipoCaderno option:selected").html() });
            fs.push({ nome: "Tipo do Caderno", valor: $("#anoLetivo").val() });
            if (parseInt($("#codigoTipoEnsino").val()) > 0) fs.push({ nome: "Tipo de Ensino", valor: $("#codigoTipoEnsino option:selected").html() });
            if (parseInt($("#codigoSerie").val()) > 0) fs.push({ nome: "Série", valor: $("#codigoSerie option:selected").html() });
            if (parseInt($("#CodigoDisciplina").val()) > 0) fs.push({ nome: "Disciplina", valor: $("#CodigoDisciplina option:selected").html() });

            $('#tabelaArquivos').sedDataTable({
                nomeExportacao: "Lista de Arquivos",
                columnDefs: [{ targets: [5], orderable: false }],
                filtros: fs
            });
        }
    });
}

function VerificaDownload(nome, nomeOriginal, extensao) {
    $.ajax({
        cache: false,
        url: "/CadernoDoAluno/VerificarDownload",
        type: 'POST',
        data: {
            nomeArquivo: nome,
            nomeArquivoOriginal: nomeOriginal,
            extensaoArquivo: extensao
        },
        success: function (data) {
            if (data) {
                window.location.href = "/CadernoDoAluno/DownloadArquivo";
            }
            else {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o download. Arquivo não encontrado.",
                    tipo: "Erro",
                    botao: "Fechar"
                });
            }
        }
    });
}

function ExcluirArquivo(codigoArquivo, nomeArquivo, extensaoArquivo) {
    Mensagem.Alert({
        titulo: "Caderno do Aluno",
        mensagem: "Deseja realmente excluir o arquivo do Caderno?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        cache: false,
                        url: "/CadernoDoAluno/ExcluirArquivo",
                        type: 'POST',
                        data: {
                            codigoArquivo: codigoArquivo,
                            nome: nomeArquivo,
                            extensao: extensaoArquivo
                        },
                        success: function (data) {
                            ListarVolumes();
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
        url: "/CadernoDoAluno/Upload",
        type: 'POST',
        data: {
        },
        success: function (data) {
            $('#divUpload').empty().html(data);

            $('#fileCaderno').change(function (e) {
                readURL(this);
            });

            $('#Arquivo.NomeArquivo').keypress(function () {
                return false;
            });

            $('#formUpload').validate({
                rules: {
                    NomeVolume: {
                        required: true
                    },
                    fileCaderno: {
                        required: true
                    }
                },
                messages: {
                    NomeVolume: {
                        required: "Obrigatório"
                    },
                    fileCaderno: {
                        required: "Obrigatório"
                    }
                }
            });

            $('#divUpload').dialog({
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