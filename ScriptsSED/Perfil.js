$(document).ready(function () {
    AplicarMascaras();
    Mensagem.IgnorarMensagensAutomaticas = true;

    //$('#fileManual').change(function (e) {
    //    readURL(this);
    //});

    //$('#NomeManual').keypress(function () {
    //    return false;
    //});

    //$('#btnLimpar').click(function () {
    //    $('#NomeManual').val('');
    //    $('#fileManual').val('');
    //});

    //$(".selCargos tr:nth-child(odd)").addClass("odd");

    //$("#NomeManual").keypress(function (e) {
    //    if (e.which == 0)
    //        $('#fileManual').focus();
    //});

    //$('#btnLimpar').click(function () {
    //    $('#NomeManual').val('');
    //    $('#fileManual').val('');
    //});

    $('#FormInserir').submit(function () {

        var isOk = true;

        //$('#fileManual').each(function () {
        //    if (this.files) {
        //        if (typeof this.files[0] !== 'undefined') {
        //            var maxSize = 20971520; // 20MB em bytes.
        //            var size = parseInt(this.files[0].size);
        //            isOk = maxSize > size;
        //        }
        //    }
        //});

        if (isOk) {
            AbrirMensagemCarregandoPagina();
        }
        else {
            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "O arquivo de manual deve ter um tamanho máximo de 20MB.",
                tipo: "Aviso",
                botao: "Fechar"
            });
        }

        return isOk;
    });

    //$("#btn_uploadfocus03").focusin(function () {
    //    //$(this).css("outline", "solid 1px #005580");
    //    $(this).addClass("outlineTeste");
    //});

    //$("#btn_uploadfocus03").focusout(function () {
    //    //$(this).css("outline", "solid 1px #005580");
    //    $(this).removeClass("outlineTeste");
    //});
});

function FormularioInserirPerfil() {
    $.get('/Perfil/InserirPerfil', function (form) {
        $('#formDialog').html(form).dialog({
            width: 830,
            title: "Cadastro",
            draggable: false,
            modal: true,
            resizable: false,
            show: {
                effect: "blind",
                duration: 1000
            },
            position: "top"
        });

        CarregarValidacoes($("#FormInserir"));

        autoCompletarSetor();
        CarregarAutoComplete();

        // esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
        $("#btnInserir").click(function (e) {
            e.preventDefault();
            var isOk = true;
            //$('#fileManual').each(function () {
            //    if (this.files) {
            //        if (typeof this.files[0] !== 'undefined') {
            //            var maxSize = 20971520; // 20MB em bytes.
            //            var size = parseInt(this.files[0].size);
            //            isOk = maxSize > size;
            //        }
            //    }
            //});
            if (isOk) {
                if ($("#FormInserir").valid()) {
                    var fd = new FormData($("#FormInserir")[0]);
                    //fd.append("fileManual", $("#fileManual")[0].files[0]);
                    $.ajax({
                        cache: false,
                        url: $("#FormInserir").attr("action"),
                        type: "post",
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            if (data.sucesso) {
                                Mensagem.Alert({
                                    titulo: "Perfil",
                                    mensagem: data.mensagem,
                                    tipo: data.tipo,
                                    botao: "Fechar"
                                });

                            } else {
                                Mensagem.Alert({
                                    titulo: "Perfil",
                                    mensagem: data.mensagem,
                                    tipo: data.tipo,
                                    escondido: data.escondido,
                                    botao: "Fechar"
                                });
                            }
                        },
                    });

                    //$.post($("#FormInserir").attr("action"),
                    //    $("#FormInserir").serializeArray(),
                    //    function (data) {
                    //        if (data.sucesso) {
                    //            location.reload();
                    //            Mensagem.Alert({
                    //                titulo: "Perfil",
                    //                mensagem: data.mensagem,
                    //                tipo: data.tipo,
                    //                botao: "Fechar"
                    //            });

                    //        } else {
                    //            Mensagem.Alert({
                    //                titulo: "Perfil",
                    //                mensagem: data.mensagem,
                    //                tipo: data.tipo,
                    //                escondido: data.escondido,
                    //                botao: "Fechar"
                    //            });
                    //        }
                    //    });
                } else {
                    return false;
                }
            }
            //else {
            //    Mensagem.Alert({
            //        titulo: "Perfil",
            //        mensagem: "O arquivo de manual deve ter um tamanho máximo de 20MB.",
            //        tipo: "Aviso",
            //        botao: "Fechar"
            //    });
            //    return isOk;
            //}
        });

        adicionarCargo();
        adicionarAfastamento();
        adicionarUnidadeAdministrativa();
    });

}

function FormularioEditarPerfil(CodigoPerfil) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/Perfil/EditarPerfil/' + CodigoPerfil,
        success: function (data, textStatus, jqXHR) {


            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 450,
                title: "Editar Perfil",
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

            CarregarValidacoes($("#FormEditar"));
            CarregarAutoComplete();
            autoCompletarSetor();

            $("#btnEditar").click(function (e) {
                e.preventDefault();

                if ($("#FormEditar").valid()) {
                    var isOk = true;
                    //$('#fileManual').each(function () {
                    //    if (this.files) {
                    //        if (typeof this.files[0] !== 'undefined') {
                    //            var maxSize = 20971520; // 20MB em bytes.
                    //            var size = parseInt(this.files[0].size);
                    //            isOk = maxSize > size;
                    //        }
                    //    }
                    //});
                    if (isOk) {
                        AbrirMensagemCarregandoPagina();
                        e.preventDefault();

                        var fd = new FormData($("#FormEditar")[0]);
                        //fd.append("fileManual", $("#fileManual")[0].files[0]);
                        fd.append("codigoPerfil", CodigoPerfil);
                        $.ajax({
                            cache: false,
                            url: $("#FormEditar").attr("action"),
                            type: "post",
                            data: fd,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                if (data.sucesso) {
                                    Mensagem.Alert({
                                        titulo: "Perfil",
                                        mensagem: data.mensagem,
                                        tipo: data.tipo,
                                        botoes: [
                                            {
                                                botao: "Fechar",
                                                callback: function () {
                                                    Mensagem.Fechar();
                                                    window.location.reload()
                                                }
                                            },
                                        ]
                                    });

                                } else {
                                    Mensagem.Alert({
                                        titulo: "Perfil",
                                        mensagem: data.mensagem,
                                        tipo: data.tipo,
                                        escondido: data.escondido,
                                        botao: "Fechar"
                                    });
                                }
                            },
                        });
                    }
                    //else {
                    //    Mensagem.Alert({
                    //        titulo: "Perfil",
                    //        mensagem: "O arquivo de manual deve ter um tamanho máximo de 20MB.",
                    //        tipo: "Aviso",
                    //        botao: "Fechar"
                    //    });
                    //    return isOk;
                    //}
                    return false;
                }
            });

            adicionarCargo();
            adicionarAfastamento();
            adicionarUnidadeAdministrativa();

        }
    });
}

function CarregarValidacoes(form) {
    form.validate({
        rules: {
            DescricaoPerfil: "required",
            Nivel: {
                required: true,
                number: true,
                range: [1, Infinity]
            },
            CodigoComportamento: "required"
        },
        messages: {
            DescricaoPerfil: "Obrigatório.",
            Nivel: {
                required: "Obrigatório",
                number: "Informe apenas números.",
                range: "somente valores maiores que zero."
            },
            CodigoComportamento: "Obrigatório."
        }
    });
}

function AbrirSetores(cdCargo) {
    $('.selCdCargo[value=' + cdCargo + ']').parents('.selDialog').dialog({
        width: 600,
        draggable: false,
        modal: true,
        resizable: false,
        position: "top",
        title: "Adicionar Setores"
    });
}

function ExcluirCargo(elem) {
    var cdCargo = elem.attr('cdCargo');

    $('.selCdCargo[value=' + cdCargo + ']').parents('.selDialog').remove();
    elem.remove();
}

function AdicionarSetor(elem) {

    var cdCargo = elem.find('.selCdCargo').val();
    var cdSetor = elem.find('.selCdSetor').val();

    if (elem.find('tr[cdSetor=' + cdSetor + ']').length > 0)
        return;

    var tr = $('.selCargos tr[cdCargo=' + cdCargo + ']');

    var index = tr.attr('index');
    var indexSetor = GerarIndice();

    tr.find('td:first').append($('<input/>', {
        type: 'hidden',
        name: 'Cargos[' + index + '].Setores.Index',
        value: indexSetor,
        "class": 'hdn' + cdSetor
    }));

    tr.find('td:first').append($('<input/>', {
        type: 'hidden',
        name: 'Cargos[' + index + '].Setores[' + indexSetor + '].CdSetor',
        value: cdSetor,
        "class": 'hdn' + cdSetor
    }));

    elem.find('.tblSetores').append('<tr cdSetor=' + cdSetor + '>' +
        '<td>' + elem.find('.selCdSetor option:selected').text() + '</td>' +
        '<td><a onclick="ExcluirSetor(' + cdCargo + ', ' + cdSetor + ', $(this).parent().parent())"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
        '</tr>');

    elem.find('.selCdSetor option:first').prop('selected', true);
}

function ExcluirSetor(cdCargo, cdSetor, elem) {
    $('.selCargos').find('tr[cdCargo=' + cdCargo + ']').find('.hdn' + cdSetor).remove();
    elem.remove();
}

function AbrirCargos(cdUnidAdm) {
    $("#busca-" + cdUnidAdm).val("");
    $(".selDialogCargos[id='" + cdUnidAdm + "']").dialog({
        width: 600,
        title: "Adicionar Cargos"
    });
}

function excluirCargoUnidAdm(codUnidAdm, codCargoUnidAdm, elem) {
    $('.selCodigoUnidAdm').find('tr[cdCargoUnidAdm=' + codUnidAdm + ']').find('.hdn' + codCargoUnidAdm).remove();
    $('.hdn' + codCargoUnidAdm).remove();
    elem.remove();
}

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        if (input.files[0].name.length > 50) {
            $(input).val('');
            $('#NomeManual').val('');

            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "O nome do arquivo de manual deve ter um tamanho máximo de 50 caracteres.",
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
            $('#NomeManual').val('');

            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "O arquivo de manual deve ter um tamanho máximo de 20MB.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $('#NomeManual').val(input.files[0].name);

        reader.readAsDataURL(input.files[0]);
    }
    else if ($(input).val().length > 0) {
        var nomeArquivo = $(input).val();
        if (nomeArquivo.length > 50) {
            $(input).val('');
            $('#NomeManual').val('');

            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "O nome do arquivo do Manual deve ter um tamanho máximo de 50 caracteres.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $('#NomeManual').val(nomeArquivo);
    }
    else if (input.value.length > 0) {
        var nomeArquivo = input.value.substring(input.value.lastIndexOf('\\') + 1);
        if (nomeArquivo > 50) {
            $(input).val('');
            $('#NomeManual').val('');

            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "O nome do arquivo do manual deve ter um tamanho máximo de 50 caracteres.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $('#NomeManual').val(nomeArquivo);
    }
    else {
        $('#NomeManual').val('');
    }
}

function remover(botao) {
    $(botao).parent().parent().remove();
    $('#table .tbAfastamento tbody tr').each(function (index) {
        $(this).children().first().children().first().next().attr('name', 'ListaEvento[' + index + '].CdEvento').attr('id', 'ListaEvento_' + index + '__CdEvento');
        $("#contListaAfastamento").val(index + 1);
    });
}

function removerUnidadeAdministrativa(botao, codUnidAdm) {
    $('#' + codUnidAdm).remove();
}

function autoCompletarSetor() {
    $('.selCentro').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'POST',
                url: '/Perfil/SelecionaSetor',
                dataType: 'json',
                global: false,
                data: {
                    nmSetor: $('#txtCentro').val()
                },
                success: function (data) {
                    return data;
                }
            });
        },
        minLength: 4
    });
}

function CarregarAutoComplete() {
    $('.selFiltroCargo').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: '/Perfil/PesquisarCargos',
                dataType: 'json',
                global: false,
                cache: false,
                data: {
                    textoBusca: $('.selFiltroCargo').val()
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.DescricaoCargo, value: item.DescricaoCargo, id: item.CodigoCargo };
                    }));
                }
            });
        },
        select: function (event, ui) {
            $('.selCodigoCargo').val(ui.item.id);
            $('.selDescricaoCargo').val(ui.item.label);
        },
        minLength: 4
    });
}

function adicionarCargo() {
    $('.selAdicionarCargo').click(function (e) {
        e.preventDefault();

        var codigoCargo = $('.selCodigoCargo').val();
        var descricaoCargo = $('.selDescricaoCargo').val();

        if (codigoCargo == "0" || codigoCargo == "" || codigoCargo == undefined) {
            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "Não foi encontrado o cargo informado!",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        if ($('.selCargos tr[cdCargo=' + codigoCargo + ']').length > 0) {
            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "Este cargo já foi adicionado!",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        if ($('.tblUnidAdmCargos tr[cdCargoUnidAdm="' + codigoCargo + '"]').length > 0) {
            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "Este cargo já foi adicionado na lista específica da(s) Unidade(s) Administrativa(s) abaixo! Caso deseje adicionar na lista de cargos do perfil, remova da lista específica.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        var index = GerarIndice();

        $('.selCargos').show().append('<tr cdCargo="' + codigoCargo + '" index="' + index + '">' +
            '<td>' +
            '<div class="selDialog" style="display: none;"></div>' +
            '<input type="hidden" name="Cargos.Index" value="' + index + '" />' +
            '<input type="hidden" name="Cargos[' + index + '].CodigoCargo" value="' + codigoCargo + '" />' +
            '<input type="hidden" name="Cargos[' + index + '].DescricaoCargo" value="' + descricaoCargo + '" />' +
            descricaoCargo + '</td>' +
            '<td class="td75">' +
            '<a onclick="AbrirSetores(' + codigoCargo + ')" style="cursor: pointer;"><i class="icone-tabela-lista" title="Setores" style="cursor: pointer;"></i></a>' +
            '</td>' +
            '<td class="btnExcluir">' +
            '<a onclick="ExcluirCargo($(this).parent().parent())"><i class="icone-tabela-excluir" title="Excluir"></i></a>' +
            '</td>' +
            '</tr>');

        $.get('/Perfil/Setores', { cdCargo: codigoCargo }, function (data) { $('.selCargos tr[cdCargo=' + codigoCargo + ']').find('.selDialog').html(data); });

        $('.selCodigoCargo').val('0');
        $('.selDescricaoCargo').val('');
        $('.selFiltroCargo').val('');
    });
}

function adicionarUnidadeAdministrativa() {
    $('#btnAdicionarUnidadeAdministrativa').click(function (e) {
        e.preventDefault();
        var count = $("#contListaUnidadeAdministrativa").val() == undefined ? 0 : $("#contListaUnidadeAdministrativa").val();

        count++;
        var param = {
            nivel1: $("#CodigoUnidadeNivel1").val() == "" ? 0 : $("#CodigoUnidadeNivel1").val(),
            nivel2: $("#CodigoUnidadeNivel2").val() == "" ? 0 : $("#CodigoUnidadeNivel2").val(),
            nivel3: $("#CodigoUnidadeNivel3").val() == "" ? 0 : $("#CodigoUnidadeNivel3").val(),
            nivel4: $("#CodigoUnidadeNivel4").val() == "" ? 0 : $("#CodigoUnidadeNivel4").val(),
            nivel5: $("#CodigoUnidadeNivel5").val() == "" ? 0 : $("#CodigoUnidadeNivel5").val(),
        };

        param.valor = 0;
        if (param.nivel5 > 0) {
            param.valor = 5;
        } else if (param.nivel4 > 0) {
            param.valor = 4;
        } else if (param.nivel3 > 0) {
            param.valor = 3;
        } else if (param.nivel2 > 0) {
            param.valor = 2;
        } else if (param.nivel1 > 0) {
            param.valor = 1;
        }

        if (param.valor <= 1) {
            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "Selecione no mínimo o 2º Nível",
                tipo: "Alerta",
                botao: "Fechar"
            });
            return;
        }
        var codigoUnidAdm = $('#CodigoUnidadeNivel' + param.valor).find('option:selected').val();
        var descricaoUnidAdm = $('#CodigoUnidadeNivel' + param.valor).find('option:selected').text();

        if (codigoUnidAdm == "0" || codigoUnidAdm == "" || codigoUnidAdm == undefined) {
            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "Não foi encontrado a Unidade Administrativa informada!",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        if ($('.selDialogCargos input[value=' + codigoUnidAdm + ']').length > 0) {
            Mensagem.Alert({
                titulo: "Perfil",
                mensagem: "Unidade Administrativa já adicionada!",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }
        $('#tabUnidadeAdministrativa').show();
        $('#tabUnidadeAdministrativa tbody').first().append('<tr cdUnidAdm=' + codigoUnidAdm + ' ' + '  index=' + count + ' id=' + codigoUnidAdm + '>' +
                '<td style="text-align: center;"><span>' + codigoUnidAdm + '</span> <input id="ListaPerfilUnidadeAdministrativa_' + count + '__CodigoUnidadeAdministrativa" name="ListaPerfilUnidadeAdministrativa[' + count + '].CodigoUnidadeAdministrativa" type="hidden" value="' + codigoUnidAdm + '">  </td>' +
                '<td>' +
                '<div class="selDialogCargos" style="display: none;" id="' + codigoUnidAdm + '"></div>' +
                '<input type="hidden" name="ListaPerfilUnidadeAdministrativa.Index" value="' + count + '" />' +
                '<input type="hidden" name="ListaPerfilUnidadeAdministrativa[' + count + '].CodigoUnidadeAdministrativa" value="' + codigoUnidAdm + '" />' +
                '<input type="hidden" name="ListaPerfilUnidadeAdministrativa[' + count + '].NomeUnidadeAdministrativa" value="' + descricaoUnidAdm + '" />' +
                descricaoUnidAdm + '</td>' +
                '<td>' +
                '<a onclick="AbrirCargos(' + codigoUnidAdm + ')" style="cursor: pointer;"><i class="icone-tabela-lista" title="Cargos" style="cursor: pointer;"></i></a>' +
                '</td>' +
                '<td style="text-align: center;"><a onclick="removerUnidadeAdministrativa($(this), ' + codigoUnidAdm + ');"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
                '</tr>');

        $.get('/Perfil/Cargos', { codigoUnidAdm: codigoUnidAdm }, function (data) { $(".selDialogCargos[id='" + codigoUnidAdm + "']").html(data); });

        $("#contListaUnidadeAdministrativa").val(count);
    });
}

function adicionarCargoUnidAdm(elem) {
    var codUnidAdm = elem.find(".hdnCodigoUnidAdm").val();
    var codCargoUnidAdm = elem.find('.selCodigoCargoUnidAdm').val();
    var descricaoCargoUnidAdm = elem.find('.selDescricaoCargoUnidAdm').val();

    if (codCargoUnidAdm == 0 || descricaoCargoUnidAdm == 0)
        return;

    //VERIFICA SE JÁ EXISTE O CARGO ADICIONADO NA LISTA POR PERFIL
    if ($('.tblUnidAdmCargos tr[cdCargoUnidAdm="' + codCargoUnidAdm + ' cdUnidAdm=' + codUnidAdm + '"]').length > 0) {
        Mensagem.Alert({
            titulo: "Perfil",
            mensagem: "Este cargo já foi adicionado abaixo ou está associado a outra Unidade Administrativa!",
            tipo: "Aviso",
            botao: "Fechar"
        });
        return;
    }

    if ($('.selCargos input[value=' + codCargoUnidAdm + ']').length > 0) {
        Mensagem.Alert({
            titulo: "Perfil",
            mensagem: "O cargo já existe na lista de cargos do perfil. Não sendo possível especificar por Unidade Administrativa.",
            tipo: "Aviso",
            botao: "Fechar"
        });
        return;
    }

    var tr = $('#tabUnidadeAdministrativa tbody tr[cdUnidAdm=' + codUnidAdm + ']');

    var index = tr.attr('index');
    var indexCargo = GerarIndice();

    tr.find('td:first').append($('<input/>', {
        type: 'hidden',
        name: 'ListaPerfilUnidadeAdministrativa[' + index + '].Cargos.Index',
        value: indexCargo,
        "class": 'hdn' + codCargoUnidAdm
    }));

    tr.find('td:first').append($('<input/>', {
        type: 'hidden',
        name: 'ListaPerfilUnidadeAdministrativa[' + index + '].Cargos[' + indexCargo + '].CodigoCargo',
        value: codCargoUnidAdm,
        "class": 'hdn' + codCargoUnidAdm
    }));

    elem.find('.tblUnidAdmCargos').show();
    elem.find('.tblUnidAdmCargos').append('<tr cdCargoUnidAdm=' + codCargoUnidAdm + ' cdUnidAdm=' + codUnidAdm + '>' +
       '<td>' + descricaoCargoUnidAdm + '</td>' +
       '<td><a onclick="excluirCargoUnidAdm(' + codUnidAdm + ', ' + codCargoUnidAdm + ', $(this).parent().parent())"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
       '</tr>');

    $("#busca-" + codUnidAdm).val("");
}

function adicionarAfastamento() {
    $('#btnAdicionarAfastamento').click(function () {
        var count = $("#contListaAfastamento").val() == undefined ? 0 : $("#contListaAfastamento").val();
        count++;

        if ($('#CdAfastamento').find('option:selected').text() == "Selecione...") return;

        if ($('#tbAfastamento tr[cdAfastamento="' + $('#CdAfastamento').find('option:selected').val() + '"]').length > 0) {
            alert("Afastamento já foi adicionado");
            return;
        }
        $('#tbAfastamento').show();
        $('#tbAfastamento tbody').append('<tr cdAfastamento=' + $('#CdAfastamento').find('option:selected').val() + '>' +

            '<td style="text-align: center;">' +
            '<input type="hidden" name="ListaEvento.Index" value="' + count + '" />' +
            '<span>' + $('#CdAfastamento').find('option:selected').val() + '</span> ' +
            '<input id="ListaEvento_' + count + '__CdEvento" name="ListaEvento[' + count + '].CdEvento" type="hidden" value="' + $('#CdAfastamento').find('option:selected').val() + '">  </td>' +
            '<td>' + $('#CdAfastamento').find('option:selected').text() + '</td>' +
            '<td style="text-align: center;"><a onclick="$(this).parent().parent().remove();"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
        '</tr>');

        $("#contListaAfastamento").val(count);
    });
}

function CarregarUsuariosVinculado(perfil, nomePerfil) {
    $.ajax({
        cache: false,
        url: '/Perfil/CarregarUsuariosPerfil/',
        data: {
            codigoPerfil: perfil
        },
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $('#formDialog').html(data).dialog({
                title: "Usuário por perfil - " + nomePerfil
            });
            $("#tbUsuarioPerfil").sedDataTable({ tituloFiltro: "", nomeExportacao: "Usuário por Perfil - " + nomePerfil, embutida: true });
        }
    });
}

function CarregarMenusPerfil(perfil, nomePerfil) {
    $.ajax({
        cache: false,
        url: '/Perfil/CarregarMenuPerfil/',
        data: {
            codigoPerfil: perfil
        },
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $('#formDialog').html(data).dialog({
                title: "Menus por perfil - " + nomePerfil,
                width: 800
            });
            $("#tbMenuPerfil").sedDataTable({ tituloFiltro: "", nomeExportacao: "Menus por Perfil - " + nomePerfil, embutida: true });
        }
    });
}
