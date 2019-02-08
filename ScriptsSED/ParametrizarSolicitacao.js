$(document).ready(function () {
    // alert("Teste");
    $('#tabelaParametrizacao').sedDataTable();
    $('#tabelaFundamentoLegal').sedDataTable();
    $('#tabelaPassos').sedDataTable();

    $('#tabelaTipoSolicitacao').sedDataTable();
    
    // Atribui a div a função de modal.
    $("#dialogCadastro").dialog({
        autoOpen: false,
        title: 'Parametrizar Solicitação',
        position: 'top',
        //height: 700,
        width: 820,
        resizable: false,
        modal: true,
        dragable: false,
        show: {
            effect: "blind",
            duration: 200
        },
        beforeClose: function (event, ui) {            
        }
    });

    // Atribui a div a função de modal.
    $("#dialogTipoSolicitacao").dialog({
        autoOpen: false,
        title: 'Tipo de Solicitação',
        position: 'top',
        //height: 700,
        width: 820,
        resizable: false,
        modal: true,
        dragable: false,
        show: {
            effect: "blind",
            duration: 200
        },
        beforeClose: function (event, ui) {
            ConsultarTipoSolicitacao();
        }
    });
    
    // Adicionar ações das tabelas.
    AdicionarParametrizacao();
    AdicionarFundamentoLegal();
    CarregarPasso();

    DetalharTipoSolicitacao();
    EditarTipoSolicitacao();
    ExcluirTipoSolicitacao();

    // Validação e armazenamento do cadastro de parametrização.
    SalvarCadastro();
});

var SalvarCadastro = function () {
    //Validação
    $('.formCadastro').validate({
        rules: {
            TipoProcesso_Codigo: {
                required: true,
            },
            txtNomeSolicitacao: {
                required: true,
            },
            txtDescricao: {
                required: true
            },
        },
        messages: {
            TipoProcesso_Codigo: {
                required: "Obrigatório",
            },
            txtNomeSolicitacao: {
                required: "Obrigatório",
            },
            txtDescricao: {
                required: "Obrigatório",
            },
        }
    });

    $('#btnCadastrarParametrizacaoSolicitacao').click(function (e) {
        e.preventDefault();

        if ($(".formCadastro").valid() == false) {

            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Campos obrigatórios não informados.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        var Msg = '';

        if ($('#tabelaFundamentoLegal tbody tr.fundamento').length <= 0) {
            Msg = Msg + (Msg == '' ? '' : '<br /> <br />') + 'Informe ao menos um Fundamento Legal.';
        }

        if ($('#tabelaPassos tbody tr.passo').length <= 0 && ($('#txtObservacao').val() == '' || $('#txtProcedimento').val() == '')) {
            Msg = Msg + (Msg == '' ? '' : '<br /> <br />') + 'Para o processo selecionado é obrigatório o preenchimento dos campos Observações e Procedimentos.';
        }

        if (Msg != '') {
            Mensagem.Alert({
                titulo: "Ocorrência",
                mensagem: Msg,
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        passoValidado = 0;

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/ValidarPreenchimentoCamposPasso',
            type: 'POST',
            datatype: 'html',
            data: { },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == '') {
                    $.ajax({
                        cache: false,
                        url: '/ParametrizarSolicitacao/SalvarCadastro',
                        type: 'POST',
                        datatype: 'html',
                        data: {
                            nome: $('#txtNomeSolicitacao').val(),
                            descricao: $('#txtDescricao').val(),
                            observacao: $('#txtObservacao').val(),
                            procedimento: $('#txtProcedimento').val(),
                        },
                        traditional: true,
                        success: function (data, textStatus, jqXHR) {
                            window.location.href = "/ParametrizarSolicitacao/Cadastro";
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
    });
}

var SalvarAtualizacao = function () {
    //Validação
    $('.formCadastro').validate({
        rules: {
            txtNomeSolicitacao: {
                required: true,
            },
            txtDescricao: {
                required: true
            },
        },
        messages: {
            txtNomeSolicitacao: {
                required: "Obrigatório",
            },
            txtDescricao: {
                required: "Obrigatório",
            },
        }
    });

    $('#btnAtualizarTipoSolicitacao').click(function (e) {
        e.preventDefault();

        if ($(".formCadastro").valid() == false) {

            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Campos obrigatórios não informados.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        var Msg = '';

        if ($('#tabelaFundamentoLegal tbody tr.fundamento').length <= 0) {
            Msg = Msg + (Msg == '' ? '' : '<br /> <br />') + 'Informe ao menos um Fundamento Legal.';
        }

        if ($('#tabelaPassos tbody tr.passo').length <= 0 && ($('#txtObservacao').val() == '' || $('#txtProcedimento').val() == '')) {
            Msg = Msg + (Msg == '' ? '' : '<br /> <br />') + 'Para o processo selecionado é obrigatório o preenchimento dos campos Observações e Procedimentos.';
        }

        if (Msg != '') {
            Mensagem.Alert({
                titulo: "Ocorrência",
                mensagem: Msg,
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/SalvarAtualizacao',
            type: 'POST',
            datatype: 'html',
            data: {
                nome: $('#txtNomeSolicitacao').val(),
                descricao: $('#txtDescricao').val(),
                observacao: $('#txtObservacao').val(),
                procedimento: $('#txtProcedimento').val(),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogTipoSolicitacao').dialog("close");
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
    });
}

var AdicionarParametrizacao = function () {
    $('#btnAdicionarAbrangencia').click(function () {

        $("#dialogCadastro").dialog({
            title: 'Cadastrar Parametrização',
            //height: 290,
        });

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/AdicionarParametrizacao',
            type: 'POST',
            datatype: 'html',
            data: {},
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogCadastro').html(data);

                $('#TipoEnsino_CD_TIPO_ENSINO').autoPreencher($('#Serie'), 'TipoEnsino', 'CarregarListaSerie');

                $('#tabelaDisciplina').sedDataTable({ bPaginate: false });

                SelecionarDisciplina();
                SalvarParametrizacao(); 

                $("#dialogCadastro").dialog("open");                
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
    });
}

var EditarParametrizacao = function () {
    $('.editarParametrizacao').click(function () {

        var Codigo = parseInt($(this).children().first().val());

        $("#dialogCadastro").dialog({
            title: 'Editar Parametrização',
            //height: 290,
        });

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/EditarParametrizacao',
            type: 'POST',
            datatype: 'html',
            data: {
                codigo: Codigo,
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogCadastro').html(data);

                $('#TipoEnsino_CD_TIPO_ENSINO').autoPreencher($('#Serie'), 'TipoEnsino', 'CarregarListaSerie');

                $('#tabelaDisciplina').sedDataTable({ bPaginate: false });

                SelecionarDisciplina();

                SalvarParametrizacao();

                $("#dialogCadastro").dialog("open");
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
    });
}

var ExcluirParametrizacao = function () {
    $('.excluirParametrizacao').click(function () {

        var Codigo = parseInt($(this).children().first().val());

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/ExcluirParametrizacao',
            type: 'POST',
            datatype: 'html',
            data: {
                codigo: Codigo,
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gridParametrizacao').html(data);
                $('#tabelaParametrizacao').sedDataTable();

                EditarParametrizacao();
                ExcluirParametrizacao();
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
    });
}

var SalvarParametrizacao = function () {
    $('#btnCadastrarParametrizacao').click(function () {

        var Codigo = $('#hdfCodigoParametrizacao').val() == '0' ? 0 : parseInt($('#hdfCodigoParametrizacao').val());
        var TipoEnsino = $('#TipoEnsino_CD_TIPO_ENSINO').val() == '' ? 0 : parseInt($('#TipoEnsino_CD_TIPO_ENSINO').val());
        var Serie = $('#Serie').val() == '' ? 0 : parseInt($('#Serie').val());
        var CodigoDisciplina = $('#Disciplina_CD_DISCIPLINA').val() == '0' ? 0 : parseInt($('#Disciplina_CD_DISCIPLINA').val());

        if (TipoEnsino <= 0 && Serie <= 0 && CodigoDisciplina <= 0) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Informe ao menos um dos parâmetros.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/SalvarParametrizacao',
            type: 'POST',
            datatype: 'html',
            data: {
                codigo: Codigo,
                codigoTipoEnsino: TipoEnsino,
                serie: Serie,
                codigoDisciplina: CodigoDisciplina,
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gridParametrizacao').html(data);
                $('#tabelaParametrizacao').sedDataTable();

                EditarParametrizacao();
                ExcluirParametrizacao();
                
                $("#dialogCadastro").dialog("close");
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
    });
}

var SelecionarDisciplina = function () {
    $('#dialogDisciplina').dialog({
        autoOpen: false,
        title: 'Seleção de Disciplina',
        position: {
            at: 'left+288 bottom+152',
            of: "#Disciplina_NOME_DISCIPLINA"
        },
        //height: 300,
        width: 570,
        resizable: false,
        modal: true,
        dragable: false,
        show: {
            effect: "blind",
            duration: 200
        },
    });

    $('#Disciplina_NOME_DISCIPLINA').click(function () {
        $('#dialogDisciplina').dialog("open");

        $('.disciplinaSelecionada').click(function () {
            var CodigoDisciplina = $(this).find('input').val();
            var NomeDisciplina = $(this).find('label').html()

            $('#Disciplina_CD_DISCIPLINA').val(CodigoDisciplina);
            $('#Disciplina_NOME_DISCIPLINA').val(NomeDisciplina);

            $('#dialogDisciplina').dialog("close");
        });
    });

    $('#Disciplina_NOME_DISCIPLINA').css({
        'color': '#666666',
        'background-color': '#EEEEEE',
    });

    if (parseInt($('#Disciplina_CD_DISCIPLINA').val()) <= 0) {
        $('#Disciplina_NOME_DISCIPLINA').val('Selecione...');
    }

    $('#Disciplina_NOME_DISCIPLINA').keydown(function (e) {
        e.preventDefault();        
    });

    $('#limparDisciplina').click(function () {
        $('#Disciplina_CD_DISCIPLINA').val('0');
        $('#Disciplina_NOME_DISCIPLINA').val('Selecione...');
    });
}

var AdicionarFundamentoLegal = function () {
$('#btnAdicionarFundamentoLegal').click(function () {

        $("#dialogCadastro").dialog({
            title: 'Cadastrar Hipótese Legal',
            //height: 290,
        });

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/AdicionarFundamentoLegal',
            type: 'POST',
            datatype: 'html',
            data: {},
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogCadastro').html(data);
                $("#dialogCadastro").dialog("open");                
                SalvarFundamentoLegal();
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
    });
}

var EditarFundamentoLegal = function () {

    ValidacaoFundamentoLegal();

    $('.detalhaFundamentoLegal').click(function () {
        var codigoFundamentoLegal = $(this).children().first().val();

        $("#dialogCadastro").dialog({
            title: 'Detalhes de Hipótese Legal',            
            //height: 290,
        });

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/EditarFundamentoLegal',
            type: 'POST',
            datatype: 'html',
            data: { codigo: parseInt(codigoFundamentoLegal) },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogCadastro').html(data);
                $("#dialogCadastro").dialog("open");
                SalvarFundamentoLegal();
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
    });
}

var SalvarFundamentoLegal = function () {
    ValidacaoFundamentoLegal();

    $('#btnCadastrarFundamentoLegal').click(function (e) {
        e.preventDefault();

        if ($(".formCadFundamentoLegal").valid() == false) {

            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Campos obrigatórios não informados.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/SalvarFundamentoLegal',
            type: 'POST',
            datatype: 'html',
            data: {
                codigo: parseInt($('#hdfCodigoFundamentoLegal').val()),
                nome: $('#txtNomeFundamentoLegal').val(),
                descricao: $('#txtDescricaoFundamentoLegal').val(),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gridFundamentoLegal').html(data);
                EditarFundamentoLegal();
                ExcluirFundamentoLegal();

                $('#tabelaFundamentoLegal').sedDataTable();
                $("#dialogCadastro").dialog("close");                
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
    });
}

var ExcluirFundamentoLegal = function () {
    $('.excluirFundamentoLegal').click(function () {
        var codigoFundamentoLegal = $(this).children().first().val();

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/ExcluirFundamentoLegal',
            type: 'POST',
            datatype: 'html',
            data: { codigo: parseInt(codigoFundamentoLegal) },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gridFundamentoLegal').html(data);
                $('#tabelaFundamentoLegal').sedDataTable();
                EditarFundamentoLegal();
                ExcluirFundamentoLegal();
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
    });
}

var DetalharFundamentoLegal = function () {
    $('.detalharFundamentoLegal').click(function () {
        var codigoFundamentoLegal = $(this).children().first().val();

        $("#dialogCadastro").dialog({
            title: 'Detalhes de Hipótese Legal',
            //height: 290,
        });

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/DetalharFundamentoLegal',
            type: 'POST',
            datatype: 'html',
            data: { codigo: parseInt(codigoFundamentoLegal) },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogCadastro').html(data);
                $("#dialogCadastro").dialog("open");
                SalvarFundamentoLegal();
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
    });
}

var ValidacaoFundamentoLegal = function () {
    //Validação
    $('.formCadFundamentoLegal').validate({
        rules: {
            txtNomeFundamentoLegal: {
                required: true,
            },
            txtDescricaoFundamentoLegal: {
                required: true
            },
        },
        messages: {
            txtNomeFundamentoLegal: {
                required: "Obrigatório",
            },
            txtDescricaoFundamentoLegal: {
                required: "Obrigatório",
            },
        }
    });
}

var CarregarPasso = function () {
    $('#TipoProcesso_Codigo').change(function () {

        var TipoProcesso;

        if ($(this).val() == '') {
            tipoProcesso = 0;
        }
        else
        {
            TipoProcesso = parseInt($(this).val());
        }

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/CarregarPasso',
            type: 'POST',
            datatype: 'html',
            data: {
                tipoProcesso: TipoProcesso,
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gripPassos').html(data);
                $('#tabelaPassos').sedDataTable();
                ConfigurarPasso();
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
    });
}

var ConfigurarPasso = function () {
    $('.configurarPasso').click(function () {
        var Ordem = $(this).children().first().val();

        $("#dialogCadastro").dialog({
            title: 'Detalhes do Passo',
            //height: 700,
        });

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/ConfigurarPasso',
            type: 'POST',
            datatype: 'html',
            data: { ordem: parseInt(Ordem) },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogCadastro').html(data);

                $('#tabelaPerfilPermissao').sedDataTable();
                $('#tabelaDocumento').sedDataTable();

                AdicionarPermissao();
                ExcluirPermissao();

                AdicionarDocumento();
                ExcluirDocumento();

                SalvarPasso();

                $("#dialogCadastro").dialog("open");                
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
    });
}

var SalvarPasso = function () {
    ValidacaoPasso();
    $('#btnAlterarPasso').click(function (e) {
        e.preventDefault();

        if ($(".formConfigPasso").valid() == false) {

            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Campos obrigatórios não informados.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/SalvarPasso',
            type: 'POST',
            datatype: 'html',
            data: {
                descricao: $('#txtDescricaoPasso').val(),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gripPassos').html(data);
                $('#tabelaPassos').sedDataTable();

                ConfigurarPasso();

                $("#dialogCadastro").dialog("close");
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
    });
}

var DetalharPasso = function () {
    $('.detalharPasso').click(function () {
        var Ordem = $(this).children().first().val();

        $("#dialogCadastro").dialog({
            title: 'Detalhes do Passo',
            //height: 700,
        });

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/DetalharPasso',
            type: 'POST',
            datatype: 'html',
            data: { ordem: parseInt(Ordem) },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogCadastro').html(data);

                $('#tabelaPerfilPermissao').sedDataTable();
                $('#tabelaDocumento').sedDataTable();

                $("#dialogCadastro").dialog("open");
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
    });
}

var ValidacaoPasso = function () {
    //Validação
    $('.formConfigPasso').validate({
        rules: {
            Ator_CodigoPerfil: {
                required: true,
            },
            txtDescricaoPasso: {
                required: true
            },
        },
        messages: {
            Ator_CodigoPerfil: {
                required: "Obrigatório",
            },
            txtDescricaoPasso: {
                required: "Obrigatório",
            },
        }
    });
}

var AdicionarPermissao = function () {
    $('#btnAdicionarPermissaoPasso').click(function () {
        if ($('#ddlPermissao').val() == '') {
            return;
        }

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/AdicionarPermissao',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoPerfil: parseInt($('#ddlPermissao').val()),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gridPerfilPermissao').html(data);
                $('#tabelaPerfilPermissao').sedDataTable();
                AdicionarPermissao();
                ExcluirPermissao();
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
    });
}

var ExcluirPermissao = function () {
    $('.excluiPerfilPermissao').click(function () {
        var CodigoPerfil = $(this).children().first().val();

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/ExcluirPermissao',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoPerfil: parseInt(CodigoPerfil)
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gridPerfilPermissao').html(data);
                $('#tabelaPerfilPermissao').sedDataTable();
                AdicionarPermissao();
                ExcluirPermissao();
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
    });
}

var AdicionarDocumento = function () {
    $('#btnAdicionarDocumento').click(function (e) {
        if ($('#ddlDocumento').val() == '') {
            return;
        }

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/AdicionarDocumento',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoDocumento: parseInt($('#ddlDocumento').val()),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gridDocumento').html(data);
                $('#tabelaDocumento').sedDataTable();
                AdicionarDocumento();
                ExcluirDocumento();
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

    });
}

var ExcluirDocumento = function () {
    $('.excluirDocumento').click(function () {
        var codigoDocumento = $(this).children().first().val();

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/ExcluirDocumento',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoDocumento: parseInt(codigoDocumento)
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#gridDocumento').html(data);
                $('#tabelaDocumento').sedDataTable();
                AdicionarDocumento();
                ExcluirDocumento();
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
    });
}

var DetalharTipoSolicitacao = function () {

    $('.detalharTipoSolicitacao').click(function () {

        var TipoSolicitacao = $(this).children().first().val();

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/DetalharTipoSolicitacao',
            type: 'POST',
            datatype: 'html',
            data: {
                codigo: parseInt(TipoSolicitacao),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogTipoSolicitacao').html(data);

                $('#tabelaParametrizacao').sedDataTable();
                $('#tabelaFundamentoLegal').sedDataTable();
                $('#tabelaPassos').sedDataTable();

                DetalharFundamentoLegal();
                DetalharPasso();

                $('#dialogTipoSolicitacao').dialog("open");
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
    });
}

var EditarTipoSolicitacao = function () {

    $('.editarTipoSolicitacao').click(function () {

        var TipoSolicitacao = $(this).children().first().val();

        $.ajax({
            cache: false,
            url: '/ParametrizarSolicitacao/EditarTipoSolicitacao',
            type: 'POST',
            datatype: 'html',
            data: {
                codigo: parseInt(TipoSolicitacao),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogTipoSolicitacao').html(data);

                $('#tabelaParametrizacao').sedDataTable();
                $('#tabelaFundamentoLegal').sedDataTable();
                $('#tabelaPassos').sedDataTable();

                AdicionarParametrizacao();
                AdicionarFundamentoLegal();

                EditarParametrizacao();
                EditarFundamentoLegal();

                ExcluirParametrizacao();
                ExcluirFundamentoLegal();

                ConfigurarPasso();

                SalvarAtualizacao();

                $('#dialogTipoSolicitacao').dialog("open");
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
    });
}

var ExcluirTipoSolicitacao = function () {

    $('.excluirTipoSolicitacao').click(function () {

        var TipoSolicitacao = $(this).children().first().val();

        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: "Deseja realmente excluir o Documento?",
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            cache: false,
                            url: '/ParametrizarSolicitacao/ExcluirTipoSolicitacao',
                            type: 'POST',
                            datatype: 'html',
                            data: {
                                codigo: parseInt(TipoSolicitacao),
                            },
                            traditional: true,
                            success: function (data, textStatus, jqXHR) {
                                $('#tipoSolicitacaoGrid').html(data);
                                $('#tabelaTipoSolicitacao').sedDataTable();

                                DetalharTipoSolicitacao();
                                EditarTipoSolicitacao();
                                ExcluirTipoSolicitacao();
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                $(document).ajaxStop(function () {
                                    Mensagem.CarregarMensagens("Fechar");
                                });
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

        
    });
}

var ConsultarTipoSolicitacao = function () {
    $.ajax({
        cache: false,
        url: '/ParametrizarSolicitacao/ConsultarTipoSolicitacao',
        type: 'POST',
        datatype: 'html',
        data: { },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#tipoSolicitacaoGrid').html(data);
            $('#tabelaTipoSolicitacao').sedDataTable();

            DetalharTipoSolicitacao();
            EditarTipoSolicitacao();
            ExcluirTipoSolicitacao();
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