$(document).ready(function () {

    $("#btnCriarSolicitacao").click(function () {
        CriarSolicitacao();
    });

    $("#btEfeitoTimeline").click(function () {
        EfeitoTimeline($("#tabela_passos td").first());
    });

});

function CarregaTurmas() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Solicitacao/CarregaTurmas/',
        data: {
            codAluno: $('#ddlAlunoResponsavel').val()
        },
        success: function (data) {
            var campo = $("#ddlTurma").html("");

            for (var i = 0; i < data.length; i++) {
                var option = "<option value='" + data[i].Codigo + "'>" + data[i].Turma.DS_TURMA + "</option>"
                campo.append(option);
            }
        }
    });
}

function CriarSolicitacao() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Solicitacao/CriarSolicitacao/',
        data: {
            codTipoSolicitacao: $('#ddlTipoSolicitacao').val(),
            codMatricula: $('#ddlTurma').val()
        },
        success: function (data) {
            MontaTimeLine(data);
            $('#dialog').dialog({
                height: 700,
                width: 820,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'top',
                title: 'Processo',
                show: function () {
                    EfeitoTimeline($("#tabela_passos tr").first());
                }
            });
        }
    });
}

function VisualizarProcesso(trProcesso) {

    var idProcesso = $(trProcesso).find("td").first().text();

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Solicitacao/VisualizarProcesso/',
        data: {
            idProcesso: $(trProcesso).find("td").first().text()
        },
        success: function (data) {
            MontaTimeLine(data.Etapas, data.Etapa);
        }
    });
}

var numeroPasso = 0;
function EfeitoTimeline(tdEfeito) {

    numeroPasso++;
    
    if (tdEfeito.length == 0 || (tdEfeito.find("span.completo_disabled").length == 0 && tdEfeito.find("span.atencao_disabled").length == 0)) {
        return;
    }

    var ultimo = false;

    if (tdEfeito.next().find("span.completo_disabled").length == 0 && tdEfeito.next().find("span.atencao_disabled").length == 0) {
        ultimo = true;
    }

    if ($("#tabela_passos td").first()[0] == tdEfeito[0]) {
        tdEfeito.append("<span id='passolinha" + numeroPasso + "' class='passo_linha'></span>");
        $("#passolinha" + numeroPasso).css("left", "50%");
        $("#passolinha" + numeroPasso).animate({
            "width": "50%",
        }, "fast",
        function () {

            tdEfeito.find("span.completo_disabled").removeClass("completo_disabled").addClass("completo");
            tdEfeito.find("span.atencao_disabled").removeClass("atencao_disabled").addClass("atencao");
            tdEfeito.find("span.titulo_passo_disabled").removeClass("titulo_passo_disabled").addClass("titulo_passo");

            EfeitoTimeline(tdEfeito.next())
        });
    }
    else if (ultimo) {
        tdEfeito.append("<span id='passolinha" + numeroPasso + "' class='passo_linha'></span>");
        $("#passolinha" + numeroPasso).css("left", "0");
        $("#passolinha" + numeroPasso).animate({
            "width": "50%",
        }, "fast",
        function () {
            tdEfeito.find("span.completo_disabled").removeClass("completo_disabled").addClass("completo");
            tdEfeito.find("span.atencao_disabled").removeClass("atencao_disabled").addClass("atencao");
        });
    }
    else {
        tdEfeito.append("<span id='passolinha" + numeroPasso + "' class='passo_linha'></span>");
        $("#passolinha" + numeroPasso).css("left", "0");
        $("#passolinha" + numeroPasso).animate({
            "width": "100%"
        }, "fast",
        function () {
            tdEfeito.find("span.completo_disabled").removeClass("completo_disabled").addClass("completo");
            tdEfeito.find("span.atencao_disabled").removeClass("atencao_disabled").addClass("atencao");
            tdEfeito.find("span.titulo_passo_disabled").removeClass("titulo_passo_disabled").addClass("titulo_passo");

            EfeitoTimeline(tdEfeito.next())
        });
    }

    
    
}

function MontaTimeLine(data) {
    //limpa tabela
    var tabela = $("#tabela_passos tbody").html("");

    var html = "<tr>";
    for (var i = 0; i < data.Passos.length; i++) {
        html = html + "<td><span class='titulo_passo_disabled'>" + data.Passos[i].Etapa.Nome + "</span></br><span class='passo ";
        
        if (data.Passos[i].Etapa.Ordem < data.PassoAtual.Etapa.Ordem) {
            //passo anterior
            html = html + " completo_disabled ";
        }
        else if (data.Passos[i].Etapa.Ordem == data.PassoAtual.Etapa.Ordem) {
            html = html + " atencao_disabled ";
        }

        html = html + " '></span></br><span class='titulo_passo_disabled'>" + data.Passos[i].Descricao + "</span></td>";
    }
    var html = html + "</tr>";

    tabela.append(html);
}