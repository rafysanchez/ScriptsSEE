
var buscasComuns = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _carregarDropDownPerfilEscola()
    {
        var codigoTipoPrograma = $('#hdfIdTipoPrograma').val();
        var codigoPerfil = $("#hdfCodigoPerfil").val();
        var codigoDiretoria = $("#hdfCodigoDiretoria").val();
        var codigoEscola = $("#hdfCodigoEscola").val();
        var codigoEscolas = $("#CodigoEscolas").val();
        var codigoDiretorias = $("#CodigoDiretorias").val();

        var formPesquisa = { CodigoTipoPrograma: codigoTipoPrograma, CodigoPerfil: codigoPerfil, CodigoDiretoria: codigoDiretoria, CodigoEscola: codigoEscola, CodigoEscolas: codigoEscolas, CodigoDiretorias: codigoDiretorias };

        $.ajax({
            type: "POST",
            url: newURL + 'prestacaocontas/PesquisaComum/ObterListasPesquisa',
            data: { filtros: formPesquisa },
            async: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                if (data.ListaDiretorias != undefined)
                {
                    if (data.ListaDiretorias.length > 1)
                        $("#ddlDiretoriaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlDiretoriaPesquisa").empty();
                    //$("#ddlDiretoriaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));

                    $(data.ListaDiretorias).each(function ()
                    {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlDiretoriaPesquisa"));
                    });
                }

                if (data.ListaEscolas != undefined) {
                    if (data.ListaEscolas.length > 1)
                        $("#ddlEscolaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlEscolaPesquisa").empty();
                    $(data.ListaEscolas).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlEscolaPesquisa"));
                    });
                }

                if (data.ListaAPMs != undefined)
                {
                    
                    if (data.ListaAPMs.length > 1)
                        $("#ddlApmPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlApmPesquisa").empty();

                    $(data.ListaAPMs).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlApmPesquisa"));
                    });
                }

                if (data.ListaPrograma != undefined) {
                    if (data.ListaPrograma.length > 1)
                        $("#ddlProgramaPesquisa").empty();//.append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlProgramaPesquisa").empty();
                    $(data.ListaPrograma).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlProgramaPesquisa"));
                    });
                }

                if (data.ListaExercicios != undefined)
                {
                    if (data.ListaExercicios.length > 1)
                        $("#ddlExercicioPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlExercicioPesquisa").empty();
                    $(data.ListaExercicios).each(function ()
                    {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlExercicioPesquisa"));
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
    }

    function _carregarDropDownPerfisCoordenadoria() {

        var codigoTipoPrograma = $('#hdfIdTipoPrograma').val();
        var codigoPerfil = $("#hdfCodigoPerfil").val();
        var codigoDiretoria = $("#hdfCodigoDiretoria").val();
        var codigoEscola = $("#hdfCodigoEscola").val();
        var formPesquisa = { CodigoTipoPrograma: codigoTipoPrograma, CodigoPerfil: codigoPerfil, CodigoDiretoria: codigoDiretoria, CodigoEscola: codigoEscola };


        $.ajax({
            type: "POST",
            url: newURL + 'prestacaocontas/PesquisaComum/ObterListasPesquisa',
            data: { filtros: formPesquisa },
            async: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {

                if (data.ListaDiretorias != undefined) {
                    $("#ddlDiretoriaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    $(data.ListaDiretorias).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlDiretoriaPesquisa"));
                    });
                }

                if (data.ListaPrograma != undefined) {

                    if (data.ListaPrograma.length > 1)
                        $("#ddlProgramaPesquisa").empty(); //.append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlProgramaPesquisa").empty();
                    $(data.ListaPrograma).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlProgramaPesquisa"));
                    });

                    $("#ddlProgramaPesquisa").multiselect({
                        noneSelectedText: "Faça sua seleção aqui",
                        selectedText: multiSelectTextoPadrao,
                    }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });

                }


                if (data.ListaExercicios != undefined) {
                    if (data.ListaExercicios.length > 1)
                        $("#ddlExercicioPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlExercicioPesquisa").empty();
                    $(data.ListaExercicios).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlExercicioPesquisa"));
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('erro: ' + errorThrown);
            }
        });
    }

    function _carregarDropDownPerfilCofi() {

        var codigoTipoPrograma = $('#hdfIdTipoPrograma').val();
        var codigoPerfil = $("#hdfCodigoPerfil").val();
        var codigoDiretoria = $("#hdfCodigoDiretoria").val();
        var codigoEscola = $("#hdfCodigoEscola").val();

        var formPesquisa = { CodigoTipoPrograma: codigoTipoPrograma, CodigoPerfil: codigoPerfil, CodigoDiretoria: codigoDiretoria, CodigoEscola: codigoEscola };

        $.ajax({
            type: "POST",
            url: newURL + 'prestacaocontas/PesquisaComum/ObterListasPesquisa',
            data: { filtros: formPesquisa },
            async: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {

                if (data.ListaDiretorias != undefined) {

                    $("#ddlDiretoriaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    $(data.ListaDiretorias).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo("#ddlDiretoriaPesquisa");
                    });

                    //$("#ddlDiretoriaPesquisa").multiselect({
                    //    noneSelectedText: "Faça sua seleção aqui",
                    //    selectedText: multiSelectTextoPadrao,
                    //}).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });

                }

                if (data.ListaExercicios != undefined) {
                    if (data.ListaExercicios.length > 1)
                     
                        $("#ddlExercicioPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlExercicioPesquisa").empty();
                    $(data.ListaExercicios).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlExercicioPesquisa"));
                    });
                }


                if (data.ListaStatus != undefined) {
                    if (data.ListaStatus.length > 1)
                        $("#ddlStatusPesquisa").empty();
                      //$("#ddlStatusPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                  else
                      $("#ddlStatusPesquisa").empty();
                  $(data.ListaStatus).each(function () {
                      $('<option>').val(this.IdStatus)
                                   .text(this.NmStatus)
                                   .appendTo($("#ddlStatusPesquisa"));
                  });

                    $("#ddlStatusPesquisa").multiselect({
                      noneSelectedText: "Faça sua seleção aqui",
                      selectedText: multiSelectTextoPadrao,
                  }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });
              }

                if (data.ListaPrograma != undefined) {

                    if (data.ListaPrograma.length > 1)
                        $("#ddlProgramaPesquisa").empty();
                            //.append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlProgramaPesquisa").empty();
                    $(data.ListaPrograma).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlProgramaPesquisa"));
                    });

                    $("#ddlProgramaPesquisa").multiselect({
                        noneSelectedText: "Faça sua seleção aqui",
                        selectedText: multiSelectTextoPadrao,
                    }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('erro');
            }
        });
    }

    function _carregarApms() {

        $.ajax({
            type: "POST",
            //url: newURL + 'prestacaocontas/PesquisaComum/ListarAPMs',
            url: newURL + 'prestacaocontas/PesquisaComum/GetAPM',
            data: { codEscola: $('#ddlEscolaPesquisa').val() },
            async: true,
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                if (data != undefined && data.length > 0)
                {
                    $("#ddlApmPesquisa").empty();
                    $(data).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo("#ddlApmPesquisa");
                    });
                }
                else
                {
                    $("#ddlApmPesquisa").empty();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }

    function _carregarEscolasPorDiretoriaEscola()
    {
        $.ajax({
            type: "POST",
            url: newURL + 'prestacaocontas/PesquisaComum/ListarEscolasDiretoriaEscolas',
            data: { codigoDiretoria: $('#ddlDiretoriaPesquisa').val(), escolas: $("#CodigoEscolas").val() },
            async: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                if (data != undefined && data.length > 0)
                {
                    $("#ddlEscolaPesquisa").empty();
                    $("#ddlEscolaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    
                    $(data).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo("#ddlEscolaPesquisa");
                    });
                }
                else
                {
                    $("#ddlEscolaPesquisa").empty();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#ddlEscolaPesquisa").empty();
            }
        });
    }

    function _carregarEscolas() {

        $.ajax({
            type: "POST",
            url: newURL + 'prestacaocontas/PesquisaComum/ListarEscolas',
            data: { codigoDiretoria: $('#ddlDiretoriaPesquisa').val() },
            async: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {

                if (data != undefined && data.length > 0) {
                    $("#ddlEscolaPesquisa").multiselect('destroy');

                    $("#ddlEscolaPesquisa").empty();
                    //$("#ddlEscolaPesquisa").empty().append($("<option></option>").attr("value", ""));
                    $(data).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo("#ddlEscolaPesquisa");
                    });

                    $("#ddlEscolaPesquisa").multiselect({
                        noneSelectedText: "Faça sua seleção aqui",
                        selectedText: multiSelectTextoPadrao,
                    }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });

                } else {
                    $("#ddlEscolaPesquisa").empty();
                    //$("#ddlEscolaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    $("#ddlEscolaPesquisa").multiselect('destroy');
                    $("#ddlEscolaPesquisa").multiselect({
                        noneSelectedText: "Faça sua seleção aqui",
                        selectedText: multiSelectTextoPadrao,

                    }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('erro');
            }
        });
    }

    function _carregarStatus() {

        $.ajax({
            type: "POST",
            url: newURL + 'prestacaocontas/PesquisaComum/ObterStatus',
            async: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {

                if (data != undefined && data.length > 0) {

                    $("#ddlStatusPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    $(data).each(function () {
                        $('<option>').val(this.IdStatus)
                                     .text(this.NmStatus)
                                     .appendTo("#ddlStatusPesquisa");
                    });

                    $("#ddlStatusPesquisa").multiselect({
                        noneSelectedText: "Faça sua seleção aqui",
                        selectedText: multiSelectTextoPadrao,
                    }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });

                } else {
                    $("#ddlStatusPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    $("#ddlStatusPesquisa").multiselect('destroy');
                    $("#ddlStatusPesquisa").multiselect({
                        noneSelectedText: "Faça sua seleção aqui",
                        selectedText: multiSelectTextoPadrao,

                    }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('erro');
            }
        });
    }

    function _carregarProgramasPorGrupoRepasse() {

        var codigoTipoPrograma = $('#ddlGrupoRepassePesquisa').val();

        $.ajax({
            type: "POST",
            url: newURL + 'prestacaocontas/PesquisaComum/ProgramasPorGrupoRepasse',
            async: true,
            dataType: 'json',
            data: { codigoTipoPrograma: codigoTipoPrograma },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != undefined && data.length > 0) {


                    if (data != undefined && data.length > 0) {
                        $("#ddlProgramaPesquisa").multiselect('destroy');

                        $("#ddlProgramaPesquisa").empty();
                        //$("#ddlProgramaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                        $(data).each(function () {
                            $('<option>').val(this.Codigo)
                                         .text(this.Nome)
                                         .appendTo("#ddlProgramaPesquisa");
                        });

                        $("#ddlProgramaPesquisa").multiselect({
                            noneSelectedText: "Faça sua seleção aqui",
                            selectedText: multiSelectTextoPadrao,
                        }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });

                    } else {
                        $("#ddlProgramaPesquisa").empty();
                        //$("#ddlProgramaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                        $("#ddlProgramaPesquisa").multiselect('destroy');
                        $("#ddlProgramaPesquisa").multiselect({
                            noneSelectedText: "Faça sua seleção aqui",
                            selectedText: multiSelectTextoPadrao,

                        }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });
                    }

                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }

    function _obterEscolasPorDiretorias() {
       
          $.ajax({
              type: "POST",
              url: newURL + 'prestacaocontas/PesquisaComum/ListarEscolasPorDiretorias',
              data: { listaIds: listaIds },
              async: true,
              dataType: 'json',
              contentType: 'application/x-www-form-urlencoded; charset=utf-8',
              success: function (data) {

                  $("#ddlEscolaPesquisa").empty();

                  $(data).each(function () {
                          $('<option>').val(this.Codigo)
                                       .text(this.Nome)
                                       .appendTo("#ddlEscolaPesquisa");
                      });
              },
              error: function (jqXHR, textStatus, errorThrown) {
                  console.log('erro');
              }
          });

    }

    return {

        carregarDropDownPerfilEscola: function () {
            _carregarDropDownPerfilEscola();
        },
        carregarDropDownPerfisCoordenadoria: function () {
            _carregarDropDownPerfisCoordenadoria();
        },
        carregarDropDownPerfilCofi: function () {
            _carregarDropDownPerfilCofi();
        },
        carregarEscolas: function () {
            _carregarEscolas();
        },
        carregarEscolasPorDiretoriaEscola()
        {
            _carregarEscolasPorDiretoriaEscola();
        },
        carregarApms: function() {
            _carregarApms();
        },
        carregarStatus: function () {
            _carregarStatus();
        },
        carregarProgramasPorGrupoRepasse: function () {
            _carregarProgramasPorGrupoRepasse();
        },
        obterEscolasPorDiretorias: function () {
            _obterEscolasPorDiretorias();
        }
    }

})();