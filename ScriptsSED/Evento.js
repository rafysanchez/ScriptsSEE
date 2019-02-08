function PesquisarTipoEvento() {
    var url = '/Evento/ConsultaEventoParcial';

    var origem = $("select#Origem").val();
    if (isNaN(origem) || origem.length == 0) {
        origem = -1;
    }

    var classificacao = $("select#Classificacao").val();
    if (isNaN(classificacao) || classificacao.length == 0) {
        classificacao = -1;
    }

    var status = $("select#Ativo").val();
    if (isNaN(status) || status.length == 0) {
        status = -1;
    }

    $.ajax({
        url: url,
        type: 'GET',
        data: {
            origem: origem,
            classificacao: classificacao,
            status: status
        },
        success: function (data) {
            $("div#dadosEvento").html(data);
            $("#tabelaDados").sedDataTable();
        },
        error: function () {
            alert("Ocorreu um erro ao pesquisar o tipo de evento.");
        }
    });
}


function FormularioInserirTipoEvento() {
    var url = '/Evento/InserirEvento';
    $.post(url, function (form) {
        $('#formDialog').html(form);
        $('#formDialog').dialog({
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

        //validações do form
        $("#FormInserir").validate({
            rules: {
                NomeTipoEventoCalendario: "required",
                Origem: "required",
                Classificacao: "required",
                DiaLetivo: "required"
            },
            messages: {
                NomeTipoEventoCalendario: "Obrigatório.",
                Origem: "Obrigatório.",
                Classificacao: "Obrigatório.",
                DiaLetivo: "Obrigatório"
            }
        });
        
        //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
        $("#btnSalvar").click(function (e) {
            e.preventDefault();
            if ($("#FormInserir").valid()) {
                var ativo = $("#AtivoInserir").prop("checked") ? true : false;
                $.ajax({
                    type: 'POST',
                    data: ({
                        NomeTipoEventoCalendario: $("#NomeTipoEventoCalendarioInserir").val(),
                        Origem: $("#OrigemInserir").val(),
                        Classificacao: $("#ClassificacaoInserir option:selected").val(),
                        Ativo: ativo,
                        DiaLetivo: $('#DiaLetivo').val()
                    }),
                    url: '/Evento/GravarEvento/',
                    success: function (data, textStatus, jqXHR) {
                        $("#formDialog").dialog("close");
                        $("#btnPesquisar").trigger("click");
                    }
                });
            }
        });
    });
}


function FormularioVisualizarTipoEvento(CodigoTipoEventoCalendario) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        data: ({
            CodigoTipoEventoCalendario: CodigoTipoEventoCalendario
        }),
        url: '/Evento/VisualizarEvento',
        success: function (data, textStatus, jqXHR) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 350,
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


function FormularioEditarTipoEvento(CodigoTipoEventoCalendario) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        data: ({
            CodigoTipoEventoCalendario: CodigoTipoEventoCalendario
        }),
        url: '/Evento/EditarEvento',
        success: function (data, textStatus, jqXHR) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 350,
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

            //validações do form
            $("#FormEditar").validate({
                rules: {
                    NomeTipoEventoCalendario: "required",
                    Origem: "required",
                    Classificacao: "required",
                    DiaLetivo: "required"
                },
                messages: {
                    NomeTipoEventoCalendario: "Obrigatório.",
                    Origem: "Obrigatório.",
                    Classificacao: "Obrigatório.",
                    DiaLetivo: "Obrigatório."
                }
            });
            //

            //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
            $("#BtnEditar").click(function (e) {
                e.preventDefault();
                if ($("#FormEditar").valid()) {
                    var ativo = $("#AtivoEditar").prop("checked") ? true : false;
                    $.ajax({
                        type: 'POST',
                        data: ({
                            NomeTipoEventoCalendario: $("#NomeTipoEventoCalendarioEditar").val(),
                            Origem: $("#OrigemEditar").val(),
                            Classificacao: $("#ClassificacaoEditar option:selected").val(),
                            Ativo: ativo,
                            CodigoTipoEventoCalendario: CodigoTipoEventoCalendario,
                            DiaLetivo: $('#DiaLetivo').val()
                        }),
                        url: '/Evento/EditarEvento/' + CodigoTipoEventoCalendario,
                        success: function (data, textStatus, jqXHR) {
                            $("#formDialog").dialog("close");
                            $("#btnPesquisar").trigger("click");
                        }
                    });
                }
            });
            //
        }
    });
}


function DeletarTipoEvento(CodigoTipoEventoCalendario, objeto) {
    if (confirm('Tem certeza que deseja excluir esse tipo de evento?')) {
        $.ajax({
            type: 'POST',
            data: ({
                id: CodigoTipoEventoCalendario
            }),
            url: '/Evento/DeletarEvento/',
            success: function (data, textStatus, jqXHR) {
                $("#btnPesquisar").trigger("click");
            }
        });
    }
}