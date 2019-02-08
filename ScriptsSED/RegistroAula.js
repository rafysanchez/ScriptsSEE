/* DOCUMENT READY */

$().ready(function () {
    ex.combos();
    // PERFIL PROFESSOR
    $('#btnPesquisar').click(function (e) {
        e.preventDefault();
        if ($(".form").valid()) {
            registro.carregarTurmas();
        }
    });

    // PERFIL GOE
    $('#btnPesquisarPlanejamento').click(function (e) {
        e.preventDefault();
        if ($(".form").valid()) {
            registro.carregarTurmasGoe();
        }
    });
    Mensagem.IgnorarMensagensAutomaticas = true;
});

/* HELPER */
var ex = {
    // Trata valores numéricos
    num: function (valor) {
        if (valor == undefined) return 0;
        if (valor == '') return 0;
        if (isNaN(valor)) return 0;
        return parseInt(valor);
    },

    // Formata a data do jeito que o datepicker do jquery gosta
    ymd: function (dt) {
        var dia = ("0000" + dt.getDate()).slice(-2);
        var mes = ("0000" + (dt.getMonth() + 1)).slice(-2);
        var ano = ("0000" + dt.getFullYear()).slice(-4);
        var str = ano + "-" + mes + "-" + dia;
        return str;
    },

    // Atribui preenchimento automático aos combos
    combos: function () {
        $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
        $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'txtAnoLetivo' }]);
        $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "CodigoEscola", CodigoTipoEnsino: "CodigoTipoEnsino", AnoLetivo: 'txtAnoLetivo' }]);
        $('#CodigoTurma').autoPreencher($('#CodigoDisciplina'), 'Disciplina', 'CarregarListaDisciplinas');
    },

    // Mensagem de erro. TODO: mensagem genérica
    erro: function (msg, tipo) {
        if (tipo == null)
            tipo = "Erro";

        Mensagem.Alert({
            titulo: "Erro",
            mensagem: msg,
            tipo: tipo,
            botao: "Fechar"
        });
    },

    warn: function (msg) {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: msg,
            tipo: "Alerta",
            botao: "Fechar"
        });
    },

    // Data do C# para data do JS
    csdate: function (str) {
        return new Date(parseInt(/-?\d+/.exec(str)[0]))
    },

    // Comparar datas por dia mes e ano
    dtcmp: function (d1, d2) {
        return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate();
    },

    // Atalho para post do ajax
    post: function (url, data, success) {
        var ajaxObj = {
            cache: false,
            url: url,
            type: "POST",
            data: data,
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop(function () { ex.erro("Ocorreu um erro durante o processo: " + errorThrown); });
            }
        };
        if (url.indexOf("Salvar") > -1) {
            ajaxObj.data = { str: JSON.stringify(data) };
            ajaxObj.dataType = "json";
        }

        $.ajax(ajaxObj);
    }
}

/*REGISTRO DE AULAS*/
function SetBimestreAtual() {
    
    var bimestre = $("#bimestres").val();
    $(".tab-bimestre").css("background", "");
    $("#tab" + bimestre).css("background", "#9dd0f2");
}

var registro = {

    dados: null,
    selecao: [],
    dataRegistro: null,

    carregarTurmas: function () {
        ex.post("/RegistroAula/CarregarTurmas", { anoLetivo: ex.num($('#txtAnoLetivo').val()) },
        function (data, textStatus, jqXHR) {
            $('#resultadoDisciplina').html(data);
            $('#tabelaDadosTurma').sedDataTable({
                columnDefs: [
			            { targets: [4], orderable: false },
                ],
            });
        });
    },

    carregarTurmasGoe: function () {
        ex.post("/RegistroAula/CarregarTurmasGoe",
            {
                codigoTurma: ex.num($('#CodigoTurma').val()),
                codigoDisciplina: ex.num($('#CodigoDisciplina').val()),
                anoLetivo: ex.num($('#txtAnoLetivo').val()),
                codigoDiretoria: ex.num($('#CodigoDiretoria').val()),
                codigoEscola: ex.num($('#CodigoEscola').val()),
                codigoTipoEnsino: ex.num($('#CodigoTipoEnsino').val())
            },
        function (data, textStatus, jqXHR) {
            $('.resultadoPesquisa').html(data);
            $('#tabelaDadosTurma').sedDataTable();
        });
    },

    editar: function (link) {
        var postData = {
            codigoTurma: $(link).attr('CodigoTurma'),
            codigoDisciplina: $(link).attr('CodigoDisciplina')
        }
        ex.post("/RegistroAula/Editar", postData,
            function (data, textStatus, jqXHR) {
                $(".dialog").html(data);
                var opt = { autoOpen: true, modal: true, width: 850, title: "Registro de Aulas" };
                $(".dialog").dialog(opt);
            });
    },

    carregar: function (turma, disciplina) {
        var postData = {
            codigoTurma: turma,
            codigoDisciplina: disciplina
        }
        ex.post("/RegistroAula/CarregarCurriculos", postData,
            function (data, textStatus, jqXHR) {

                if (data.Alerta != null) {
                    ex.warn(data.Alerta);
                    $(".dialog").dialog("close");
                    return;
                }

                if (data.Erro != null) {
                    ex.erro(data.Erro);
                    $(".dialog").dialog("close");
                    return;
                }

                registro.dados = data;
                tela.preencherBimestres();
                tela.configurarDatePicker();

                registro.dataRegistro = new Date();
                registro.dataRegistro.setDate(registro.dataRegistro.getDate() - 1);
                proximaAula();
                tela.carregarConteudo(document.getElementById("bimestres").value);
                tela.atualizar();
                SetBimestreAtual();
            });
    },

    aulasSemana: function () {
        if (registro.dados == null) return null;
        var semana = [];
        for (i = 0; i < registro.dados.Aulas.length; i++) {
            var aula = registro.dados.Aulas[i];
            if (semana.indexOf(aula.DiaSemana) == -1)
                semana.push(aula.DiaSemana);
        }

        return semana;
    },

    diasRemovidos: function () {
        var removidos = [];
        var dataInicial = ex.csdate(registro.dados.BimestreAtual.Inicio);
        var dataFinal = ex.csdate(registro.dados.BimestreAtual.Fim);

        var menorInicio = null;
        var maiorFim = null;
        
        // Delimitando inicio e fim das aulas baseado nas atribuições, e não no bimestre.
        $(registro.dados.Aulas).each(function (i, r) {
            if (menorInicio == null)
                menorInicio = ex.csdate(r.DataInicio);
            else {
                if (menorInicio > ex.csdate(r.DataInicio)) {
                    menorInicio = ex.csdate(r.DataInicio);
                }
            }
        });

        if (dataInicial < menorInicio)
            dataInicial = menorInicio;

        $(registro.dados.Aulas).each(function (i, r) {
            if (maiorFim == null)
                maiorFim = ex.csdate(r.DataFim);
            else {
                if (maiorFim < ex.csdate(r.DataFim)) {
                    maiorFim = ex.csdate(r.DataFim);
                }
            }
        });

        //if (dataFinal > maiorFim)
        //    dataFinal = maiorFim;

        var dataAtual = new Date(dataInicial.getFullYear(), 00, 01);
        var diasDeAula = registro.aulasSemana();
        var diasFeriados = registro.dados.Evento;
        var anoLetivo = parseInt($("#txtAnoLetivo").val());
        while (dataAtual <= dataFinal) {
            if (dataAtual >= dataFinal) {
                removidos.push(ex.ymd(dataAtual));
                dataAtual.setDate(dataAtual.getDate() + 1);
                continue;
            }

            if (dataAtual < dataInicial) {
                removidos.push(ex.ymd(dataAtual));
                dataAtual.setDate(dataAtual.getDate() + 1);
                continue;
            }
            //Remove os Feriados --------------------------------
            for (var i = 0; i < diasFeriados.length; i++) {
                var inicio = ex.csdate(diasFeriados[i].Inicio);
                var fim = ex.csdate(diasFeriados[i].Fim);
                if (dataAtual >=  inicio && dataAtual <= fim) {
                    removidos.push(ex.ymd(dataAtual));
                    //dataAtual.setDate(dataAtual.getDate() + 1);
                }
            }
            //----------------------------------------------------
            if (diasDeAula.indexOf(dataAtual.getDay()) == -1) {
                removidos.push(ex.ymd(dataAtual));
                dataAtual.setDate(dataAtual.getDate() + 1);
                continue;
            }

            if (dataAtual.getYear() > anoLetivo)
            {
                removidos.push(ex.ymd(dataAtual));
                dataAtual.setDate(dataAtual.getDate() + 1);
                continue;
            }

            dataAtual.setDate(dataAtual.getDate() + 1);
        }

        if (dataAtual.getYear() > anoLetivo)
        {
            removidos.push(ex.ymd(dataAtual));
        }


        return removidos;
    },

    moverDia: function (mov) {
        if (registro.dados == null) return null;
        registro.selecao = [];
        var dataFinal = ex.csdate(mov == 1 ? registro.dados.BimestreAtual.Fim : registro.dados.BimestreAtual.Inicio);
        if ((mov == 1 && registro.dataRegistro >= dataFinal) || (mov == -1 && registro.dataRegistro <= dataFinal)) return;

        tela.selecaoConteudos();
        var diasDeAula = registro.aulasSemana();
        registro.dataRegistro.setDate(registro.dataRegistro.getDate() + mov);

        while ((mov == 1 && registro.dataRegistro <= dataFinal) || (mov == -1 && registro.dataRegistro >= dataFinal)) {
            if (diasDeAula.indexOf(registro.dataRegistro.getDay()) == -1) {
                registro.dataRegistro.setDate(registro.dataRegistro.getDate() + mov);
                continue;
            }
            tela.atualizar();
            return;
        }
    },

    buscarCurriculo: function (bimestre) {
        if (registro.dados == null) return null;
        if (registro.dados.Curriculos == null) return null;
        for (i = 0; i < registro.dados.Curriculos.length; i++) {
            var curriculo = registro.dados.Curriculos[i];
            if (curriculo.Bimestre == bimestre)
                return curriculo;
        }
    },

    buscarConteudo: function (curriculo, codigoConteudo) {
        if (registro.dados == null) return null;
        for (i = 0; i < curriculo.Conteudos.length; i++) {
            var conteudo = curriculo.Conteudos[i];
            if (conteudo.Codigo == codigoConteudo)
                return conteudo;
        }
    },

    salvar: function () {
        var bimestre = document.getElementById("bimestres").value;
        
        if (bimestre == "") {
            ex.erro("Não há nenhum curriculo cadastrado.");
        }

        var curriculo = registro.buscarCurriculo(bimestre);

        var postData = {
            Data: registro.dataRegistro,
            Selecao: registro.selecao,
            GrupoCurriculo: registro.dados.CodigoGrupoCurriculo,
            Bimestre: bimestre,
            Observacoes: $("#observacoes").val(),
            CodigoTurma: registro.dados.CodigoTurma,
            CodigoDisciplina: registro.dados.CodigoDisciplina
        };

        // TALVEZ dataType: json... ver se isso vai causar problemas.
        ex.post("/RegistroAula/Salvar", postData,
            function (data, textStatus, jqXHR) {
                if (data.Sucesso) {
                    for (var i = 0; i < registro.dados.Selecao.length; i++) {
                        var w = registro.dados.Selecao[i];
                        var selecaoAtual = ex.csdate(registro.dados.Selecao[i].Data);
                        if (ex.dtcmp(selecaoAtual, registro.dataRegistro))
                            registro.dados.Selecao.splice(registro.selecao.indexOf(w), 1);
                    }

                    for (var i = 0; i < registro.selecao.length; i++) {
                        var s = registro.selecao[i];
                        registro.dados.Selecao.push({ Data: "/Date(" + (+registro.dataRegistro) + ")/", Conteudo: s.Conteudo, Habilidade: s.Habilidade, Observacoes: $("#observacoes").val() });
                    }

                    Mensagem.Alert({
                        titulo: "Sucesso",
                        mensagem: "Registro de aula salvo com sucesso.",
                        tipo: "sucesso",
                        botao: "Fechar"
                    });
                }
                else
                    ex.warn(data.Erro);
            });
    }
}

var tela = {
    preencherBimestres: function () {
        
        if (registro.dados == null) return null;
        var bimestres = [];
        if (registro.dados.Curriculos == null || registro.dados.Curriculos.length == 0) {
            bimestres.push(registro.dados.BimestreAtual.Numero);
        }
        else {
            $(".tab-bimestre").show();
            if (eja) {
                bimestres.push(1);
                bimestres.push(2);
            }
            else {
                for (i = 0; i < registro.dados.Curriculos.length; i++) {
                    var curriculo = registro.dados.Curriculos[i];
                    bimestres.push(curriculo.Bimestre);
                }
            }

        }

        var elemento = document.getElementById("bimestres");
        
        $("#bimestres").children().remove();
        for (var i = 0; i < bimestres.length; i++) {
            var bimestre = bimestres[i];
            var o = document.createElement("option");
            o.value = bimestre;
            o.innerHTML = bimestre + "º Bimestre";
            elemento.appendChild(o);
            if (registro.dados.BimestreAtual.Numero == bimestre)
                o.setAttribute("selected", "selected");
        }
        elemento.onchange = function () { tela.carregarConteudo(this.value); }
    },

    configurarDatePicker: function () {
        var array = registro.diasRemovidos();

        $(".calendar-icon").off("click");
        $('.datepicker').datepicker("destroy");
        $('.datepicker').datepicker({
        
            minDate: ex.csdate(registro.dados.BimestreAtual.Inicio),
            maxDate: ex.csdate(registro.dados.BimestreAtual.Fim),
            //maxDate: ex.csdate(registro.dados.BimestreAtual.Atual),
            changeYear: false,

            onSelect: function (dateText, inst) {
                registro.dataRegistro = $.datepicker.parseDate("dd/mm/yy", dateText);
                $(".datepicker").hide();
                tela.atualizar();
            },

            beforeShowDay: function (date) {

                //var string = $.datepicker.formatDate('yy-mm-dd', date);
                //return [array.indexOf(string) == -1];
                // o css datepicker-nao-letivo-color esta na pagina Edtitar
                var feriados = registro.dados.Evento;
                for (var i = 0; i < feriados.length; i++)
                {
                    var dtInicoFeriado = ex.csdate(feriados[i].Inicio);
                    var dtFimFeriado = ex.csdate(feriados[i].Fim);

                    if(date >= dtInicoFeriado && date <= dtFimFeriado)
                    {
                        return [false, 'datepicker-nao-letivo-color', feriados[i].TipoEvento.Nome];
                    }
                    else if(date.getDay() === dtInicoFeriado.getDay() &&
                            date.getMonth() === dtInicoFeriado.getMonth &&
                            date.getYear() === dtInicoFeriado.getYear())
                    {
                        return [false, 'datepicker-nao-letivo-color', feriados[i].TipoEvento.Nome];
                    }

                }
                //--Bloqueia lancamentos posteriores
                if (date > new Date())
                    return [false, ''];
                //----------------------------------

                var string = $.datepicker.formatDate('yy-mm-dd', date);
                return [array.indexOf(string) == -1];

                
            },

            onChangeMonthYear: function () {
                setTimeout(function () {
                    tela.diasVerdes();
                }, 20);
            }
        });
        
        
        $(".calendar-icon").click(function () {
                   
           var offset = $(this).offset();
           $(".datepicker").toggle();

            tela.diasVerdes();
            
        });
    },

    diasVerdes: function () {
        $("[data-handler=selectDay]").each(function (i, item) {
            var htmlMes = $(item).attr("data-month");
            var htmlDia = $(item).children("a").html();
            var salvos = registro.dados.Selecao.filter(function (a) {
                var d = ex.csdate(a.Data);
                return d.getDate() == htmlDia && d.getMonth() == htmlMes;
            });

            if (salvos.length > 0) {
                $(item).addClass("dia-verde");
            }
        });
    },

    dataAula: function () {
        var dia = ("0000" + registro.dataRegistro.getDate()).slice(-2);
        var mes = ("0000" + (registro.dataRegistro.getMonth() + 1)).slice(-2);
        var ano = ("0000" + registro.dataRegistro.getFullYear()).slice(-4);
        var str = dia + "/" + mes + "/" + ano;
        $('.data-atual').html(str);
        return str;
    },

    preencherArraySelecao: function () {
        registro.selecao = [];
        $("#observacoes").val("");
        for (var i = 0; i < registro.dados.Selecao.length; i++) {
            var selecaoAtual = ex.csdate(registro.dados.Selecao[i].Data);
            if (ex.dtcmp(registro.dataRegistro, selecaoAtual)) {
                var item = registro.dados.Selecao[i];
                if ($("#observacoes").val() == "")
                    $("#observacoes").val(item.Observacoes);

                registro.selecao.push({ Conteudo: item.Conteudo, Habilidade: item.Habilidade });
            }
        }
    },

    selecaoConteudos: function () {
        $(".cb-conteudo").each(function (c, item) {
            item.checked = registro.selecao.filter(function (s) {
                return s.Conteudo == item.id;
            }).length > 0
        });
    },

    atualizar: function () {
        document.getElementById("habilidades").innerHTML = "";
        $("#tblContHab tr td:nth-child(2)").html("");
        $(".link-conteudo").attr("style", "font-weight:normal");
        tela.dataAula();
        tela.preencherArraySelecao();
        tela.selecaoConteudos();
    },

    carregarConteudo: function (bimestre) {
        tela.limparTabela(2);
        tela.limparTabela(1);
        
        if (bimestre == "") {
            ex.erro("Não há nenhum curriculo cadastrado.");
            return;
        }

        var curriculo = registro.buscarCurriculo(bimestre);

        for (var i = 0; i < registro.dados.Bimestres.length; i++)
        {
            if(bimestre == registro.dados.Bimestres[i].Numero)
            {
                registro.dados.BimestreAtual.Inicio = registro.dados.Bimestres[i].Inicio
                registro.dados.BimestreAtual.Fim = registro.dados.Bimestres[i].Fim
                registro.dados.BimestreAtual.Atual = registro.dados.Bimestres[i].Fim
                registro.dados.BimestreAtual.Numero = registro.dados.Bimestres[i].Numero

                tela.configurarDatePicker();
            }
        }

        if (curriculo == null)
            return;

        for (var i = 0; i < curriculo.Conteudos.length; i++) {
            var conteudo = curriculo.Conteudos[i];
            var p = document.createElement("p");
            p.className = "cont-hab";
            var link = document.createElement("a");
            link.className = "link-conteudo";
            link.innerHTML = conteudo.Descricao;
            link.value = conteudo.Codigo;
            link.onclick = function () {
                $(".link-conteudo").attr("style", "font-weight:normal");
                $(this).attr("style", "font-weight:bold");
                tela.carregarHabilidades(this.value, bimestre);
                return false;
            }
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.title = "Este valor é preenchido automaticamente quando for selecionada uma habilidade relacionada. Clique no nome ao lado para ver as habilidades.";
            checkbox.className = "cb-conteudo";
            checkbox.setAttribute("disabled", "disabled");
            checkbox.id = conteudo.Codigo;
            p.appendChild(checkbox);
            p.appendChild(link);

            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var td2 = document.createElement("td");
            td2.innerHTML = "&nbsp;";
            td.appendChild(p);
            tr.appendChild(td);
            tr.appendChild(td2);
            $("#tblContHab tbody").append(tr);
        }

        tela.selecaoConteudos();
        SetBimestreAtual();
    },

    carregarHabilidades: function (codigoConteudo, bimestre) {
        if (bimestre == null || bimestre == 0)
            bimestre = document.getElementById("bimestres").value;
        document.getElementById("habilidades").innerHTML = "";
        var curriculo = registro.buscarCurriculo(bimestre);
        var conteudo = registro.buscarConteudo(curriculo, codigoConteudo);

        tela.limparTabela(2);

        for (var i = 0; i < conteudo.Habilidades.length; i++) {
            var p = document.createElement("p");
            p.className = "cont-hab";
            var habilidade = conteudo.Habilidades[i];
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = codigoConteudo;
            checkbox.value = checkbox.id = habilidade.Codigo;

            var el = registro.selecao.filter(function (a) { return a.Conteudo == checkbox.name && a.Habilidade == checkbox.value });
            checkbox.checked = el.length > 0;

            var label = document.createElement('label');
            label.htmlFor = habilidade.Codigo;

            label.appendChild(document.createTextNode(habilidade.Descricao));

            checkbox.onchange = function () {
                if (this.checked) {
                    registro.selecao.push({ Conteudo: this.name, Habilidade: this.value });
                }
                else {
                    var cbConteudo = this.name;
                    var cbHabilidade = this.value;
                    var el = registro.selecao.filter(function (a) { return a.Conteudo == cbConteudo && a.Habilidade == cbHabilidade })[0];
                    registro.selecao.splice(registro.selecao.indexOf(el), 1);
                }
                tela.selecaoConteudos();
            };

            p.appendChild(checkbox);
            p.appendChild(label);

            var lines = $("#tblContHab tr td:nth-child(2)");

            var appended = false;
            for (var j = 0; j < lines.length; j++) {
                if (appended)
                    continue;
                var line = lines[j];
                if (line.innerHTML == "&nbsp;") {
                    line.innerHTML = "";
                    line.appendChild(p);
                    appended = true;
                }
            }

            if (!appended) {
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var td2 = document.createElement("td");
                td.innerHTML = "&nbsp;";
                td2.appendChild(p);
                tr.appendChild(td);
                tr.appendChild(td2);
                $("#tblContHab tbody").append(tr);
                appended = true;
            }
        }
    },

    limparTabela: function (col) {
        $("#tblContHab tr td:nth-child(" + col + ")").html("&nbsp;");
        var trs = $("#tblContHab tr");
        for (var i = 1; i < trs.length; i++) {
            var t = trs[i];
            if (t.children[0].innerHTML == "&nbsp;" && t.children[1].innerHTML == "&nbsp;")
                $(t).remove();
        }
    }
}

function proximaAula() {
    registro.moverDia(1);
}

function aulaAnterior() {
    registro.moverDia(-1);
}