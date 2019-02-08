function PesquisarBanca() {
    if (($("select#CodigoDiretoria").val() == "" && $("select#CodigoEscola").val() == null) || ($("select#CodigoDiretoria").val() != "" && $("select#CodigoEscola").val() == "")) {
        ExibirErro();
    }
    else {
        var url = '/Banca/ConsultaBancaParcial';

        $.ajax({
            url: url,
            type: 'GET',
            data: {
                CodigoEscola: $("select#CodigoEscola").val(),
            },
            success: function (data) {
                $("div#dadosBanca").html(data);
                $("#tabelaDados").sedDataTable();
                AplicarMascaras();
            },
            error: function () {
                alert("Ocorreu um erro ao pesquisar a banca.");
            }
        });
    }
}


function SelecionaFuncionarioEscola(TipoForm) {
    if (TipoForm == "Editar") {
        $("select#ListaEscolaEditar").change(function () {
            if ($("select#ListaEscolaEditar").val() != "") {
                $.ajax({
                    url: "/Banca/SelecionaFuncionariosEscola",
                    type: 'GET',
                    dataType: "json",
                    data: {
                        CodigoEscola: $("select#ListaEscolaEditar").val(),
                    },
                    success: function (data) {
                        $("#txtIntegrantesBancaEditar").autocomplete({
                            source: data,
                            minLength: 3,
                            select: function (event, ui) {//corrige o valor que aparece no textbox após a seleção da pessoa
                                $('input[name="txtIntegrantesBancaEditar"]').val(ui.item.label);
                                $('input[name="hdnCPFEditar"]').val(ui.item.value);
                                return false;
                            }
                        });
                    }
                });
            }
        })
    }
    else {//Inserir
        $("select#ListaEscolaInserir").change(function () {
            if ($("select#ListaEscolaInserir").val() != "") {
                $.ajax({
                    url: "/Banca/SelecionaFuncionariosEscola",
                    type: 'GET',
                    dataType: "json",
                    data: {
                        CodigoEscola: $("select#ListaEscolaInserir").val(),
                    },
                    success: function (data) {
                        $("#txtIntegrantesBancaInserir").autocomplete({
                            source: data,
                            minLength: 3,
                            select: function (event, ui) {//corrige o valor que aparece no textbox após a seleção da pessoa
                                $('input[name="txtIntegrantesBancaInserir"]').val(ui.item.label);
                                $('input[name="hdnCPFInserir"]').val(ui.item.value);
                                return false;
                            }
                        });
                    }
                });
            }
        })
    }
}


function InserirFuncionarioNaGridInserir() {
    var Tabela = $('#tabelaDadosInserir').dataTable();
    var Nome = $("#txtIntegrantesBancaInserir").val();
    var CPF = $("#hdnCPFInserir").val()

    //verifica se ao menos um funcionário foi selecionado
    if (CPF == "") {
        alert("Selecione ao menos uma pessoa para a banca.");
        return false;
    }
    //

    //verifica se o funcionário já foi inserida na banca
    if ($("#tabelaDadosInserir").html().indexOf(CPF) != -1) {
        alert("A pessoa selecionada já foi inserida nesta banca.");
        return false;
    }
    //

    //cria a linha da tabela com o registro do funcionário
    Tabela.fnAddData([
    Nome,
    CPF,
    '<select><option value="1">Responsável</option><option value="2" selected>Participante</option></select>',
    '<a href="javascript:void(0)" onclick="RemoverFuncionarioDaGridInserir(this);"><i class="icone-tabela-excluir" title="Excluir"></i></a>']
  );
    //

    Tabela.fnAdjustColumnSizing();//ajusta as colunas da tabela
    $("#txtIntegrantesBancaInserir").val("");//limpa o campo de busca do nome
    $("#hdnCPFInserir").val("");//limpa o campo hidden do CPF
}


function InserirFuncionarioNaGridEditar() {
    var Tabela = $('#tabelaDadosEditar').dataTable();
    var Nome = $("#txtIntegrantesBancaEditar").val();
    var CPF = $("#hdnCPFEditar").val()

    //verifica se ao menos um funcionário foi selecionado
    if (CPF == "") {
        alert("Selecione ao menos uma pessoa para a banca.");
        return false;
    }
    //

    //verifica se o funcionário já foi inserida na banca
    if ($("#tabelaDadosEditar").html().indexOf(CPF) != -1) {
        alert("A pessoa selecionada já foi inserida nesta banca.");
        return false;
    }
    //

    //cria a linha da tabela com o registro do funcionário
    Tabela.fnAddData([
    Nome,
    CPF,
    '<select><option value="1">Responsável</option><option value="2" selected>Participante</option></select>',
    '<a href="javascript:void(0)" onclick="RemoverFuncionarioDaGridEditar(this);"><i class="icone-tabela-excluir" title="Excluir"></i></a>']
  );
    //

    Tabela.fnAdjustColumnSizing();//ajusta as colunas da tabela
    $("#txtIntegrantesBancaEditar").val("");//limpa o campo de busca do nome
    $("#hdnCPFEditar").val("");//limpa o campo hidden do CPF
}


function RemoverFuncionarioDaGridEditar(objeto) {
    var Tabela = $('#tabelaDadosEditar').dataTable();
    var linha = $(objeto).closest("tr").get(0);
    Tabela.fnDeleteRow(Tabela.fnGetPosition(linha));//deleta a linha do DataTable
}


function RemoverFuncionarioDaGridInserir(objeto) {
    var Tabela = $('#tabelaDadosInserir').dataTable();
    var linha = $(objeto).closest("tr").get(0);
    Tabela.fnDeleteRow(Tabela.fnGetPosition(linha));//deleta a linha do DataTable
}


function CriarArrayIntegrantesBancaEditar() {
    var Tabela = $('#tabelaDadosEditar').dataTable();
    var NrRegistros = Tabela.fnGetData().length;//número de linhas do DataTable
    if (NrRegistros == 0) {
        //nenhum integrante foi selecionado para a banca
        var msg = "É necessário escolher pelo menos um integrante para a banca.";
        Mensagem.Alert({
            titulo: "Banca",
            mensagem: msg,
            tipo: "Aviso",
            botao: "Fechar"
        });

        return false;
    }
    else {
        var CPF_Integrantes_Banca = new Array();
        var Papel_Integrantes_Banca = new Array();

        for (var i = 0; i < NrRegistros; i++) {
            CPF_Integrantes_Banca[i] = $("#tabelaDadosEditar tbody tr:eq(" + i + ") td:eq(1)").html();//seletor para a coluna "CPF" da tabela
            Papel_Integrantes_Banca[i] = $("#tabelaDadosEditar tbody tr:eq(" + i + ") td:eq(2) select option:selected").val();//seletor para a coluna "Papel na Banca" da tabela

            //seleciona o CPF do responsável pela banca e coloca o valor no hidden CpfResponsavel (será gravado como o cpf do criador da banca)
            if (Papel_Integrantes_Banca[i] == 1) {
                $("#CpfResponsavel").attr('value', CPF_Integrantes_Banca[i]);
            }
            //
        }

        $("#CpfIntegranteBanca").attr('value', CPF_Integrantes_Banca);
        $("#Papel_Integrantes_Banca").attr('value', Papel_Integrantes_Banca);
        return true;
    }
}


function CriarArrayIntegrantesBancaInserir() {
    var Tabela = $('#tabelaDadosInserir').dataTable();
    var NrRegistros = Tabela.fnGetData().length;//número de linhas do DataTable
    if (NrRegistros == 0) {
        //nenhum integrante foi selecionado para a banca
        var msg = "É necessário escolher pelo menos um integrante para a banca.";
        Mensagem.Alert({
            titulo: "Banca",
            mensagem: msg,
            tipo: "Aviso",
            botao: "Fechar"
        });

        return false;
    }
    else {
        var CPF_Integrantes_Banca = new Array();
        var Papel_Integrantes_Banca = new Array();

        for (var i = 0; i < NrRegistros; i++) {
            CPF_Integrantes_Banca[i] = $("#tabelaDadosInserir tbody tr:eq(" + i + ") td:eq(1)").html();//seletor para a coluna "CPF" da tabela
            Papel_Integrantes_Banca[i] = $("#tabelaDadosInserir tbody tr:eq(" + i + ") td:eq(2) select option:selected").val();//seletor para a coluna "Papel na Banca" da tabela

            //seleciona o CPF do responsável pela banca e coloca o valor no hidden CpfResponsavel (será gravado como o cpf do criador da banca)
            if (Papel_Integrantes_Banca[i] == 1) {
                $("#CpfResponsavel").attr('value', CPF_Integrantes_Banca[i]);
            }
            //
        }

        $("#CpfIntegranteBanca").attr('value', CPF_Integrantes_Banca);
        $("#Papel_Integrantes_Banca").attr('value', Papel_Integrantes_Banca);
        return true;
    }
}


function CriaGridFuncionariosEdicao() {
    var Tabela = $('#tabelaDadosEditar').dataTable();

    $.ajax({
        url: "/Banca/CriaGridFuncionariosEdicao",
        type: 'GET',
        dataType: "json",
        data: {
            CodigoBanca: $("#CodigoBanca").val(),
        },
        success: function (data) {
            //cria a linha da tabela com o registro do funcionário
            for (var i in data) {
                var PapelNaBanca;
                if (data[i].PapelNaBanca == 1) {
                    PapelNaBanca = "<select><option value='1' selected>Responsável</option><option value='2'>Participante</option></select>";
                }
                else {
                    PapelNaBanca = "<select><option value='1'>Responsável</option><option value='2' selected>Participante</option></select>";
                }

                var CPF_mascarado = data[i].Cpf.substring(0, 3) + "." + data[i].Cpf.substring(3, 6) + "." + data[i].Cpf.substring(6, 9) + "-" + data[i].Cpf.substring(9, 11);

                Tabela.fnAddData([
                    data[i].Nome,
                    CPF_mascarado,
                    PapelNaBanca,
                    '<a href="javascript:void(0)" onclick="RemoverFuncionarioDaGridEditar(this);"><i class="icone-tabela-excluir" title="Excluir"></i></a>'
                ]);

                Tabela.fnAdjustColumnSizing();//ajusta as colunas da tabela
            }
            //
        }
    });
}


function VerificarResponsavel(TipoOperacao) {
    var Tabela;
    if (TipoOperacao == "Inserir") {
        Tabela = $('#tabelaDadosInserir').dataTable();
    }
    else {
        Tabela = $('#tabelaDadosEditar').dataTable();
    }

    var NrRegistros = Tabela.fnGetData().length;//número de linhas do DataTable
    var Responsavel = 0;

    for (var i = 0; i < NrRegistros; i++) {
        if (TipoOperacao == "Inserir") {
            //seletor para a coluna "Papel na Banca" da tabela (inserir)
            if ($("#tabelaDadosInserir tbody tr:eq(" + i + ") td:eq(2) select option:selected").val() == 1) {
                Responsavel++;
            }
        }
        else {
            //seletor para a coluna "Papel na Banca" da tabela (editar)
            if ($("#tabelaDadosEditar tbody tr:eq(" + i + ") td:eq(2) select option:selected").val() == 1) {
                Responsavel++;
            }
        }
    }

    if (Responsavel == 0) {//nenhum responsável foi selecionado para a banca
        var msg = "É necessário escolher um reponsável para a banca.";
        Mensagem.Alert({
            titulo: "Banca",
            mensagem: msg,
            tipo: "Erro",
            botao: "Fechar"
        });

        return false;
    }
    else if (Responsavel == 1) {//um responsável foi selecionado para a banca
        return true;
    }
    else {//mais de um responsável foi selecionado para a banca
        var msg = "A banca só pode ter um responsável.";
        Mensagem.Alert({
            titulo: "Banca",
            mensagem: msg,
            tipo: "Erro",
            botao: "Fechar"
        });

        return false;
    }
}


function VerificarParticipante(TipoOperacao) {
    var Tabela;
    if (TipoOperacao == "Inserir") {
        Tabela = $('#tabelaDadosInserir').dataTable();
    }
    else {
        Tabela = $('#tabelaDadosEditar').dataTable();
    }

    var NrRegistros = Tabela.fnGetData().length;//número de linhas do DataTable
    var Participante = 0;

    for (var i = 0; i < NrRegistros; i++) {
        if (TipoOperacao == "Inserir") {
            //seletor para a coluna "Papel na Banca" da tabela (inserir)
            if ($("#tabelaDadosInserir tbody tr:eq(" + i + ") td:eq(2) select option:selected").val() == 2) {
                Participante++;
            }
        }
        else {
            //seletor para a coluna "Papel na Banca" da tabela (editar)
            if ($("#tabelaDadosEditar tbody tr:eq(" + i + ") td:eq(2) select option:selected").val() == 2) {
                Participante++;
            }
        }
    }

    if (Participante == 0) {//nenhum participante foi selecionado para a banca
        var msg = "É necessário escolher pelo menos um participante para a banca.";
        Mensagem.Alert({
            titulo: "Banca",
            mensagem: msg,
            tipo: "Erro",
            botao: "Fechar"
        });

        return false;
    }
    else {//pelo menos um participante foi selecionado para a banca
        return true;
    }
}


function FormularioInserirBanca() {
    var url = '/Banca/InserirBanca';
    $.post(url, function (form) {
        $('#formDialog').html(form);
        $('#formDialog').dialog({
            //height: 600,
            width: 830,
            draggable: false,
            modal: true,
            resizable: false,
            show: {
                effect: "blind",
                duration: 1000
            },
            position: "top"
        });

        //Atribui preenchimento automático aos combos
        $('#ListaDiretoriaInserir').autoPreencher($('#ListaEscolaInserir'), 'Escola', 'CarregarListaEscolas');

        //Método que cria a lista de funcionários da escola para o autocomplete
        SelecionaFuncionarioEscola("Inserir");

        $("#tabelaDadosInserir").sedDataTable();

        //validações do form
        $("#FormInserir").validate({
            rules: {
                CodigoDiretoria: "required",
                CodigoEscola: "required",
                CpfCriador: {
                    required: true,
                    cpf: true
                },
                DescricaoBanca: {
                    required: true,
                    maxlength: 200
                }
            },
            messages: {
                CodigoDiretoria: "Obrigatório",
                CodigoEscola: "Obrigatório",
                CpfCriador: {
                    required: "Obrigatório",
                    cpf: "CPF inválido"
                },
                DescricaoBanca: {
                    required: "Obrigatório",
                    maxlength: "Apenas 200 caracteres"
                }
            }
        });
        //

        //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
        $("#btnSalvar").click(function (e) {
            e.preventDefault();
            if ($("#FormInserir").valid()) {
                if (CriarArrayIntegrantesBancaInserir() == true) {
                    if (VerificarResponsavel("Inserir") == true) {
                        if (VerificarParticipante("Inserir")) {
                            $.ajax({
                                type: 'POST',
                                data: ({
                                    CodigoDiretoria: $("#ListaDiretoriaInserir option:selected").val(),
                                    CodigoEscola: $("#ListaEscolaInserir option:selected").val(),
                                    DescricaoBanca: $("#DescricaoBanca").val(),
                                    CpfCriador: $("#CpfResponsavel").val(),
                                    CpfIntegranteBanca: $("#CpfIntegranteBanca").val(),
                                    Papel_Integrantes_Banca: $("#Papel_Integrantes_Banca").val()
                                }),
                                url: '/Banca/GravarBanca/',
                                success: function (data, textStatus, jqXHR) {
                                    if ($("#CodigoDiretoria option:selected").val() == "") {//o usuário não fez a consulta antes de inserir
                                        $("#formDialog").dialog("close");
                                    }
                                    else {//o usuário fez a consulta antes de inserir (dá um refresh na grid) 
                                        $("#formDialog").dialog("close");
                                        $("#btnPesquisar").trigger("click");
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });
        //
    });
}


function FormularioVisualizarBanca(CodigoBanca, CodigoDiretoria, CodigoEscola) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        data: ({
            CodigoBanca: CodigoBanca
        }),
        url: '/Banca/VisualizarBanca',
        success: function (data, textStatus, jqXHR) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 600,
                width: 830,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top"
            });

            $('#ListaDiretoriaVisualizar').attr('selecionado', CodigoDiretoria);
            $('#ListaDiretoriaVisualizar').autoPreencher($('#ListaEscolaVisualizar'), 'Escola', 'CarregarListaEscolas', null, CodigoEscola);
            $("#tabelaIntegrantesBanca").sedDataTable();
            AplicarMascaras();
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


function FormularioEditarBanca(CodigoBanca, CodigoDiretoria, CodigoEscola) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        data: ({
            CodigoBanca: CodigoBanca
        }),
        url: '/Banca/EditarBanca',
        success: function (data, textStatus, jqXHR) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 600,
                width: 830,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top"
            });

            $('#ListaDiretoriaEditar').attr('selecionado', CodigoDiretoria);
            $('#ListaDiretoriaEditar').autoPreencher($('#ListaEscolaEditar'), 'Escola', 'CarregarListaEscolas', null, CodigoEscola);

            //Método que cria a lista de funcionários da escola para o autocomplete
            SelecionaFuncionarioEscola("Editar");

            $("#tabelaDadosEditar").sedDataTable();
            CriaGridFuncionariosEdicao();

            //validação dos campos do form
            $("#FormEditar").validate({
                rules: {
                    CodigoDiretoria: "required",
                    CodigoEscola: "required",
                    CpfCriador: {
                        required: true,
                        cpf: true
                    },
                    DescricaoBanca: {
                        required: true,
                        maxlength: 200
                    }
                },
                messages: {
                    CodigoDiretoria: "Obrigatório",
                    CodigoEscola: "Obrigatório",
                    CpfCriador: {
                        required: "Obrigatório",
                        cpf: "CPF inválido"
                    },
                    DescricaoBanca: {
                        required: "Obrigatório",
                        maxlength: "Apenas 200 caracteres"
                    }
                }
            });
            //

            //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
            $("#BtnEditar").click(function (e) {
                e.preventDefault();
                if ($("#FormEditar").valid()) {
                    if (CriarArrayIntegrantesBancaEditar() == true) {
                        if (VerificarResponsavel("Editar") == true) {
                            if (VerificarParticipante("Editar")) {
                                $.ajax({
                                    type: 'POST',
                                    data: ({
                                        CodigoDiretoria: $("#ListaDiretoriaEditar option:selected").val(),
                                        CodigoEscola: $("#ListaEscolaEditar option:selected").val(),
                                        DescricaoBanca: $("#DescricaoBanca").val(),
                                        CpfCriador: $("#CpfResponsavel").val(),
                                        CodigoBanca: $("#CodigoBanca").val(),
                                        CpfIntegranteBanca: $("#CpfIntegranteBanca").val(),
                                        Papel_Integrantes_Banca: $("#Papel_Integrantes_Banca").val()
                                    }),
                                    url: '/Banca/EditarBanca/' + CodigoBanca,
                                    success: function (data, textStatus, jqXHR) {
                                        $("#formDialog").dialog("close");
                                        $("#btnPesquisar").trigger("click");
                                    }
                                });
                            }
                        }
                    }
                }
            });
            //
        }
    });
}


function DeletarBanca(CodigoBanca, objeto) {
    if (confirm('Tem certeza que deseja excluir essa banca?')) {
        $.ajax({
            type: 'POST',
            data: ({
                CodigoBanca: CodigoBanca
            }),
            url: '/Banca/DeletarBanca/',
            success: function (data, textStatus, jqXHR) {
                $("#btnPesquisar").trigger("click");
            }
        });
    }
}