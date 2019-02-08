function TurnoAtribuicaoIndex() {
    var _inserir = function () {

        $('#btnCadastrar').click(function () {

            $.ajax({
                url: '/TurnoAtribuicao/Inserir',
                type: 'GET',
                success: function (data) {
                    $('#dvModal').html(data).show().dialog({
                        modal: true,
                        height: 795,
                        width: 810,
                        position: ['center', 0],
                        close: function () {
                            $('#dvModal').html('');
                        }
                    });
                }, error: function (jqXHR, textStatus, errorThrown) {

                }
            });

        });
    }

    var _pesquisa = function () {
        $('#btnPesquisar').click(function () {

            if (!$("#formIndex").valid())
                return false;

            $.ajax({
                url: '/TurnoAtribuicao/Pesquisa',
                type: 'GET',
                data: $('#formIndex').serialize(),
                success: function (data) {
                    $('div#dados').html(data);

                    $("#tabelaDados").sedDataTable();
                    location.hash = "#tabelaDados";
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });

        });
    }

    var _carregarFiltros = function () {
        $('#ddlDiretoria').autoPreencher($('#ddlEscola'), 'Escola', 'CarregarListaEscolas');
    }

    return {
        init: function () {
            _pesquisa();
            _inserir();
            _carregarFiltros();
            ValidadorIndex();
        }
    }.init();
}

function TurnoAtribuicaoInserir() {
    var _inserir = function () {

        $('#btnInserir').click(function () {

            if (!$("#formInserir").valid())
                return false;

            if (!ValidarChecks())
                return false;

            $.ajax({
                url: '/TurnoAtribuicao/Inserir',
                type: 'POST',
                data: $("#formInserir").serialize(),
                success: function (data) {
                    if (data.resultado == 'true') {
                        $('#dvModal').dialog('close').hide()
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });

        });

        ControladorDuracaoIntervalo();
    }

    var _carregarFiltros = function () {
        $('#ddlDiretoriaInserir').autoPreencher($('#ddlEscolaInserir'), 'Escola', 'CarregarListaEscolas');

    }

    return {
        init: function () {
            _inserir();
            _carregarFiltros();
            ValidadorInserir();
            Mascaras();
        }
    }.init();
}

function TurnoAtribuicaoEditar() {
    var _atualizar = function () {

        $('#btnAtualizar').click(function () {

            if (!$("#formEditar").valid())
                return false;

            if (!ValidarChecks())
                return false;

            $.ajax({
                url: '/TurnoAtribuicao/Editar',
                type: 'POST',
                data: $("#formEditar").serialize(),
                success: function (data) {
                    if (data.resultado == 'true') {
                        $('#btnVoltar').click();
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                },
            });

        });

        ControladorDuracaoIntervalo();
    }

    var _carregarFiltros = function () {
        $('#ddlDiretoriaEditar').autoPreencher($('#ddlEscolaEditar'), 'Escola', 'CarregarListaEscolas');
    }

    return {
        init: function () {
            _atualizar();
            _carregarFiltros();
            ValidadorInserir();
            Mascaras();
        }
    }.init();
}

function TurnoAtribuicaoTurma() {
    var _atualizar = function () {

        $('#btnInserirTurma').click(function () {

            if (!$("#formInserirTurma").valid())
                return false;

            $.ajax({
                url: '/TurnoAtribuicao/AdicionarTurma',
                type: 'POST',
                data: $("#formInserirTurma").serialize(),
                success: function (data) {
                    if (data.resultado == 'true') {
                        $('#dvModal').dialog('close').hide()
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });

        });

        $("#ddlHoraIntervaloInicioInserir").change(function () {
            $("#TurmaAtribuicao_HoraIntervaloFim").val("");
            if (this.value != "") {
                var intervaloFim = new Date(0, 0, 0, this.value.split(":")[0], this.value.split(":")[1], 0);
                intervaloFim.setMinutes(intervaloFim.getMinutes() + parseInt($("#TurnoAtribuicao_DuracaoIntervalo").val()));

                var hora = intervaloFim.getHours();
                var minutos = intervaloFim.getMinutes();
                if (hora < 10) hora = "0" + hora;
                if (minutos < 10) minutos = "0" + minutos;
                $("#TurmaAtribuicao_HoraIntervaloFim").val(hora + ':' + minutos);
            }
        });
    }

    var _filtros = function () {
        $('#ddlTipoEnsinoInserir').autoPreencher($('#ddlTurmaInserir'), 'TurnoAtribuicao', 'ObterTurmas', [{ id: 'idTurnoAtribuicao', idTipoEnsino: 'idTipoEnsino' }]);
    }



    return {
        init: function () {
            _atualizar();
            _filtros();
            ValidadorTurma();
            Mascaras();
        }
    }.init();
}

function ValidadorIndex() {
    var rules = {
        rules: {
            'TurnoAtribuicao.AnoLetivo': {
                required: true,
                number: true
            },
            'TurnoAtribuicao.IdDiretoria': {
                required: true
            },
            'TurnoAtribuicao.IdEscola': {
                required: true
            },
            'TurnoAtribuicao.IdTurno': {
                required: true
            }
        }
    }
    $('#formIndex').validate(rules);
}

function ValidadorInserir() {
    var rules = {
        rules: {
            'TurnoAtribuicao.AnoLetivo': {
                required: true,
                number: true
            },
            'TurnoAtribuicao.IdDiretoria': {
                required: true
            },
            'TurnoAtribuicao.IdEscola': {
                required: true
            },
            'TurnoAtribuicao.IdTurno': {
                required: true
            },
            'TurnoAtribuicao.HoraInicioAula': {
                required: true
            },
            'TurnoAtribuicao.HoraTerminoAula': {
                required: true
            },
            'TurnoAtribuicao.Descricao': {
                required: true
            },
            'TurnoAtribuicao.DuracaoAula': {
                required: true
            }
        }
    }
    $('#formInserir').validate(rules);
    $('#formEditar').validate(rules);
}

function ValidadorTurma() {
    var rules = {
        rules: {

            'idTipoEnsino': {
                required: true
            },
            'TurmaAtribuicao.IdTurma': {
                required: true
            },
            'TurmaAtribuicao.HoraIntervaloInicio': {
                required: true
            }
        }
    }
    $('#formInserirTurma').validate(rules);
}

function ValidarChecks() {
    if ($("input[id='chkDiasLetivos']:checked").length > 0) {
        return true;
    } else {
        alert("Você deve marcar pelo menos um dia letivo");
        return false;
    }
}

function Mascaras() {
    $('#formInserir').find('#TurnoAtribuicao_HoraInicioAula').mask('99:99');
    $('#formInserir').find('#TurnoAtribuicao_HoraTerminoAula').mask('99:99');

    $('#formEditar').find('#TurnoAtribuicao_HoraInicioAula').mask('99:99');
    $('#formEditar').find('#TurnoAtribuicao_HoraTerminoAula').mask('99:99');

    $('#formInserirTurma').find('#TurnoAtribuicao_HoraInicioIntervalo').mask('99:99');
    $('#formInserirTurma').find('#TurnoAtribuicao_HoraTerminoIntervalo').mask('99:99');


}

function EditarTurnoParametrizacao(idTurnoParametrizacao) {

    $.ajax({
        url: '/TurnoAtribuicao/Editar/' + idTurnoParametrizacao,
        type: 'GET',
        success: function (data) {

            $('#dvModal').html(data).show().dialog({
                modal: true,
                height: 795,
                width: 810,
                position: ['center', 0],
                close: function () {
                    $('#dvModal').html('');
                    $('#btnPesquisar').click();

                }
            });
        }
    });

}

function AdicionarTurma(idTurnoParametrizacao) {

    $.ajax({
        url: '/TurnoAtribuicao/AdicionarTurma/' + idTurnoParametrizacao,
        type: 'GET',
        success: function (data) {

            $('#dvModal').html(data).show().dialog({
                modal: true,
                height: 795,
                width: 810,
                position: ['center', 0],
                close: function () {
                    $('#dvModal').html('');
                }
            });
        }
    });
}

function ExcluirTurma(idTurno, idTurma) {
    if (window.confirm('Confirma a exclusão da turma?')) {
        $.ajax({
            url: '/TurnoAtribuicao/ExcluirTurma',
            type: "POST",
            data: { id: idTurma },
            success: function (data) {
                VisualizarTurnoParametrizacao(idTurno);
            }
        });
    }
}

function VisualizarTurnoParametrizacao(idTurno) {

    $.ajax({
        url: '/TurnoAtribuicao/Visualizar/' + idTurno,
        type: 'GET',
        success: function (data) {

            $('#dvModal').html(data).show().dialog({
                modal: true,
                height: 795,
                width: 810,
                position: ['center', 0],
                close: function () {
                    $('#dvModal').html('');
                }
            });
            $('#ddlDiretoriaVisualizar').autoPreencher($('#ddlEscolaVisualizar'), 'Escola', 'CarregarListaEscolas');
        }
    });

}

function ExcluirTurnoAtribuicao(idTurnoParametrizacao) {
    if (window.confirm('Confirma a exclusão da turno?')) {
        $.ajax({
            url: '/TurnoAtribuicao/Excluir',
            type: "POST",
            data: { id: idTurnoParametrizacao },
            success: function (data) {
                $("#btnPesquisar").click();
            }
        });
    }
}

function ControladorDuracaoIntervalo()
{
    var turnoAtribuicaoDuracaoAula = $("#TurnoAtribuicao_DuracaoAula");
    turnoAtribuicaoDuracaoAula.change(function () {
        if (this.value != '') {
            var horaInicioAula = $('#TurnoAtribuicao_HoraInicioAula');
            if(!ValidaHoraInicioAula(horaInicioAula)) return;

            var horaTerminoAula = $('#TurnoAtribuicao_HoraTerminoAula');
            if(!ValidaHoraTerminoAula(horaTerminoAula)) return;

            ObterDuracaoIntervalo(horaInicioAula.val(), horaTerminoAula.val(), this.value);
        }
        else $('#TurnoAtribuicao_DuracaoIntervalo').val('')
    });

    $("#TurnoAtribuicao_HoraTerminoAula,#TurnoAtribuicao_HoraInicioAula").blur(function () {        
        $('#TurnoAtribuicao_DuracaoAula').val('');
        $('#TurnoAtribuicao_DuracaoIntervalo').val('');
    });
}
function ValidaHoraInicioAula(horaInicioAula) {
    if (horaInicioAula.val() == '') {
        $("#TurnoAtribuicao_DuracaoAula").val('');
        horaInicioAula.focus();
        alert('O horário de Início Aula não foi informado!');
        return false;
    }

    return true;
}
function ValidaHoraTerminoAula(horaTerminoAula) {
    if (horaTerminoAula.val() == '') {
        $("#TurnoAtribuicao_DuracaoAula").val('');
        horaTerminoAula.focus();
        alert('O horário de Fim Aula não foi informado!');
        return false;
    }

    return true;
}
function ObterDuracaoIntervalo(horaInicioAula, horaTerminoAula, duracaoAula) {
    $.ajax({
        url: '/TurnoAtribuicao/ObterDuracaoIntervalo/',
        type: 'POST',
        data: { 'TurnoAtribuicao.HoraInicioAula': horaInicioAula, 'TurnoAtribuicao.HoraTerminoAula': horaTerminoAula, 'TurnoAtribuicao.DuracaoAula': duracaoAula },
        success: function (data) {
            $('#TurnoAtribuicao_DuracaoIntervalo').val(data);
        }
    });
}