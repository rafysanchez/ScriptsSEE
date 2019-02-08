$(document).ready(function () {
    ConfigurarCalendarios();
    DetalharMes();
    AtualizarCalendario();
    CadastrarEvento();
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
});

var TratarValorNumerico = function (valor) {
    if (valor == undefined) {
        return 0;
    }

    if (valor == '') {
        return 0;
    }

    if (isNaN(valor)) {
        return 0;
    }

    return parseInt(valor);
}

var ConfigurarCalendarios = function () {
    $.expr[':'].contentIs = function (el, idx, meta) {
        return $(el).text() === meta[3];
    };

    $(':contentIs(DEMO)').remove();
    // Altera os dias da semana para  forma abreviada.
    $('.month_blue_header_inner').each(function () {
        switch ($(this).html()) {
            case 'domingo':
                $(this).html('Dom');
                break;
            case 'segunda-feira':
                $(this).html('Seg');
                break;
            case 'terça-feira':
                $(this).html('Ter');
                break;
            case 'quarta-feira':
                $(this).html('Qua');
                break;
            case 'quinta-feira':
                $(this).html('Qui');
                break;
            case 'sexta-feira':
                $(this).html('Sex');
                break;
            case 'sábado':
                $(this).html('Sáb');
                break;
        }
    });
    // Altera o titulo do 1º dia do mês.
    $('.month_blue_main').each(function () {
        var item = $(this).find('.month_blue_cell_inner');
        for (var i = 0; i < item.length; i++) {
            var titulo = $(item[i]).find('.month_blue_cell_header').html();
            if (isNaN(titulo)) {
                $(item[i]).find('.month_blue_cell_header').html('1')
            }
        }
    });
    // bloqueia datas anteriores e posteriores.
    $('.month_blue_main').each(function () {
        var linhas = 0;

        var dias = $(this).find('.month_blue_cell_inner');
        var primeiroDia = parseInt($(dias).first().find('.month_blue_cell_header').html())

        for (var i = 0; i < dias.length; i++) {
            var diaAtual = parseInt($(dias[i]).find('.month_blue_cell_header').html());

            if ((primeiroDia + 1) == diaAtual || (diaAtual == 1 && diaAtual != primeiroDia)) {
                linhas = i;
                break;
            }
        }

        var encontrou = 0;

        for (var l = 0; l < linhas; l++) {
            for (var c = 0; c < 7; c++) {
                var i = c * linhas + l;
                var diaAtual = parseInt($(dias[i]).find('.month_blue_cell_header').html());

                if (diaAtual == 1) {
                    if (encontrou == 0) {
                        encontrou = 1;
                        if (c == 0 || c == 6) {
                            $(dias[i]).css('background-color', '#FFF0F0');
                        }
                    } else {
                        if (encontrou == 1) {
                            encontrou = 2;
                            $(dias[i]).find('.month_blue_cell_header').html('');
                            $(dias[i]).css('background-color', '#EEEEEE');
                        }
                    }
                } else {
                    if (encontrou == 0 || encontrou == 2) {
                        $(dias[i]).find('.month_blue_cell_header').html('');
                        $(dias[i]).css('background-color', '#EEEEEE');
                    } else {
                        if (c == 0 || c == 6) {
                            $(dias[i]).css('background-color', '#FFF0F0');
                        }
                    }
                }

            }
        }

        encontrou = 0;
    });
};

var ConfigurarCalendarioMes = function () {
    $.expr[':'].contentIs = function (el, idx, meta) {
        return $(el).text() === meta[3];
    };

    $(':contentIs(DEMO)').remove();
    // Altera os dias da semana para  forma abreviada.
    $('#dpm_Mes').find('.month_blue_header_inner').each(function () {
        switch ($(this).html()) {
            case 'domingo':
                $(this).html('Domingo');
                break;
            case 'segunda-feira':
                $(this).html('Segunda-feira');
                break;
            case 'terça-feira':
                $(this).html('Terça-feira');
                break;
            case 'quarta-feira':
                $(this).html('Quarta-feira');
                break;
            case 'quinta-feira':
                $(this).html('Quinta-feira');
                break;
            case 'sexta-feira':
                $(this).html('Sexta-feira');
                break;
            case 'sábado':
                $(this).html('Sábado');
                break;
        }
    });
    // Altera o titulo do 1º dia do mês.
    $('#dpm_Mes').each(function () {
        var item = $(this).find('.month_blue_cell_inner');
        for (var i = 0; i < item.length; i++) {
            var titulo = $(item[i]).find('.month_blue_cell_header').html();
            if (isNaN(titulo)) {
                $(item[i]).find('.month_blue_cell_header').html('1')
            }
        }
    });
    // bloqueia datas anteriores e posteriores.
    $('#dpm_Mes').each(function () {
        var linhas = 0;

        var dias = $(this).find('.month_blue_cell_inner');
        var primeiroDia = parseInt($(dias).first().find('.month_blue_cell_header').html())

        for (var i = 0; i < dias.length; i++) {
            var diaAtual = parseInt($(dias[i]).find('.month_blue_cell_header').html());

            if ((primeiroDia + 1) == diaAtual || (diaAtual == 1 && diaAtual != primeiroDia)) {
                linhas = i;
                break;
            }
        }

        var encontrou = 0;

        for (var l = 0; l < linhas; l++) {
            for (var c = 0; c < 7; c++) {
                var i = c * linhas + l;
                var diaAtual = parseInt($(dias[i]).find('.month_blue_cell_header').html());

                if (diaAtual == 1) {
                    if (encontrou == 0) {
                        encontrou = 1;
                        if (c == 0 || c == 6) {
                            $(dias[i]).css('background-color', '#FFF0F0');
                        }
                    } else {
                        if (encontrou == 1) {
                            encontrou = 2;
                            $(dias[i]).find('.month_blue_cell_header').html('');
                            $(dias[i]).css('background-color', '#EEEEEE');
                        }
                    }
                } else {
                    if (encontrou == 0 || encontrou == 2) {
                        $(dias[i]).find('.month_blue_cell_header').html('');
                        $(dias[i]).css('background-color', '#EEEEEE');
                    } else {
                        if (c == 0 || c == 6) {
                            $(dias[i]).css('background-color', '#FFF0F0');
                        }
                    }
                }

            }
        }

        encontrou = 0;
    });
};

var AplicarCores = function () {
    /* ========================================================================================================== */
    $('div.bimestre')
        .parent()
        //.css('background-color', "rgb(238,185,0)")
        .css('background-color', "#a78200")
        //.css('border-color', "rgb(238,185,0)")
        .css('border-color', "#a78200")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(238,185,0, 0.6)")
                .css('background-color', "rgba(167,130,0, 0.6)")
                //.css('border-color', "rgba(238,185,0, 0.6)")
                .css('border-color', "rgba(167,130,0, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(238,185,0)")
                .css('background-color', "#a78200")
                //.css('border-color', "rgb(238,185,0)");
                .css('border-color', "#a78200");
        });

    $('div.feriado')
        .parent()
        //.css('background-color', "rgb(255,40,40)")
        .css('background-color', "#c61717")
        //.css('border-color', "rgb(255,40,40)")
        .css('border-color', "#c61717")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(255,40,40, 0.6)")
                .css('background-color', "rgba(198,23,23, 0.6)")
                //.css('border-color', "rgba(255,40,40, 0.6)")
                .css('border-color', "rgba(198,23,23, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(255,40,40)")
                .css('background-color', "#c61717")
                //.css('border-color', "rgb(255,40,40)");
                .css('border-color', "#c61717");
        });


    $('div.feriadoEscolar')
        .parent()
        //.css('background-color', "rgb(220,70,70)")
        .css('background-color', "#bf6040)")
        //.css('border-color', "rgb(220,70,70)")
        .css('border-color', "#bf6040")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(220,70,70, 0.6)")
                .css('background-color', "rgba(191,96,64, 0.6)")
                //.css('border-color', "rgba(220,70,70, 0.6)")
                .css('border-color', "rgba(191,96,64, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(220,70,70)")
                .css('background-color', "#bf6040")
                //.css('border-color', "rgb(220,70,70)");
                .css('border-color', "#bf6040");
        });

    $('div.naoLetivo')
        .parent()
        //.css('background-color', "rgb(255,110,110)")
        .css('background-color', "#ff4e4e")
        //.css('border-color', "rgb(255,110,110)")
        .css('border-color', "#ff4e4e")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(255,110,110, 0.6)")
                .css('background-color', "rgba(255,78,78, 0.6)")
                //.css('border-color', "rgba(255,110,110, 0.6)")
                .css('border-color', "rgba(255,78,78, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(255,110,110)")
                .css('background-color', "#ff4e4e")
                //.css('border-color', "rgb(255,110,110)");
                .css('border-color', "#ff4e4e");
        });

    $('div.feriasDocente')
        .parent()
        //.css('background-color', "rgb(0,110,70)")
        .css('background-color', "#00a449")
        //.css('border-color', "rgb(0,110,70)")
        .css('border-color', "#00a449")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(0,110,70, 0.6)")
                .css('background-color', "rgba(0,164,73, 0.6)")
                //.css('border-color', "rgba(0,110,70, 0.6)")
                .css('border-color', "rgba(0,164,73, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(0,110,70)")
                .css('background-color', "#00a449)")
                //.css('border-color', "rgb(0,110,70)");
                .css('border-color', "#00a449");
        });

    $('div.recessoEscolar')
        .parent()
        //.css('background-color', "rgb(40,180,70)")
        .css('background-color', "#096b1e")
        //.css('border-color', "rgb(40,180,70)")
        .css('border-color', "#096b1e")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(40,180,70, 0.6)")
                .css('background-color', "rgba(9,107,30, 0.6)")
                //.css('border-color', "rgba(40,180,70, 0.6)")
                .css('border-color', "rgba(9,107,30, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(40,180,70)")
                .css('background-color', "#096b1e")
                //.css('border-color', "rgb(40,180,70)");
                .css('border-color', "#096b1e");
        });


    $('div.planejamento')
        .parent()
        //.css('background-color', "rgb(0,0,150)")
        .css('background-color', "#919191")
        //.css('border-color', "rgb(0,0,150)")
        .css('border-color', "#919191")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(0,0,150, 0.6)")
                .css('background-color', "rgba(145,145,145, 0.6)")
                //.css('border-color', "rgba(0,0,150, 0.6)")
                .css('border-color', "rgba(145,145,145, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(0,0,150)")
                .css('background-color', "#919191")
                //.css('border-color', "rgb(0,0,150)");
                .css('border-color', "#919191");
        });

    $('div.conselhoClasse')
        .parent()
        //.css('background-color', "rgb(40,110,230)")
        .css('background-color', "#757fff")
        //.css('border-color', "rgb(40,110,230)")
        .css('border-color', "#757fff")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(40,110,230, 0.6)")
                .css('background-color', "rgba(117,127,255, 0.6)")
                //.css('border-color', "rgba(40,110,230, 0.6)")
                .css('border-color', "rgba(117,127,255, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(40,110,230)")
                .css('background-color', "#757fff")
                //.css('border-color', "rgb(40,110,230)");
                .css('border-color', "#757fff");
        });

    $('div.conselhoEscola')
        .parent()
        //.css('background-color', "rgb(32,120,180)")
        .css('background-color', "#2078b4")
        //.css('border-color', "rgb(32,120,180)")
        .css('border-color', "#2078b4")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(32,120,180, 0.6)")
                .css('border-color', "rgba(32,120,180, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#2078b4")
                .css('border-color', "#2078b4");
        });

    $('div.discussaoSaresp')
        .parent()
        //.css('background-color', "rgb(60,170,255)")
        .css('background-color', "#0090ff")
        //.css('border-color', "rgb(60,170,255)")
        .css('border-color', "#0090ff")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(60,170,255, 0.6)")
                .css('background-color', "rgba(0,144,255, 0.6)")
                //.css('border-color', "rgba(60,170,255, 0.6)")
                .css('border-color', "rgba(0,144,255, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(60,170,255)")
                .css('background-color', "#0090ff")
                //.css('border-color', "rgb(60,170,255)");
                .css('border-color', "#0090ff");
        });

    $('div.diaEscolaFilho')
        .parent()
        //.css('background-color', "rgb(255,120,0)")
        .css('background-color', "#df6900")
        //.css('border-color', "rgb(255,120,0)")
        .css('border-color', "#df6900")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(255,120,0, 0.6)")
                .css('background-color', "rgba(223,105,0, 0.6)")
                //.css('border-color', "rgba(255,120,0, 0.6)")
                .css('border-color', "rgba(223,105,0, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(255,120,0)")
                .css('background-color', "#df6900")
                //.css('border-color', "rgb(255,120,0)");
                .css('border-color', "#df6900");
        });

    $('div.sabadoLetivo')
        .parent()
        //.css('background-color', "rgb(255,120,0)")
        .css('background-color', "#0033CC")
        //.css('border-color', "rgb(255,120,0)")
        .css('border-color', "#0033CC")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(255,120,0, 0.6)")
                .css('background-color', "rgba(0, 51, 204, 0.6)")
                //.css('border-color', "rgba(255,120,0, 0.6)")
                .css('border-color', "rgba(0, 51, 204, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(255,120,0)")
                .css('background-color', "#0033CC")
                //.css('border-color', "rgb(255,120,0)");
                .css('border-color', "#0033CC");
        });

    $('div.avaliacaoInstitucional')
        .parent()
        //.css('background-color', "rgb(120,30,100)")
        .css('background-color', "#a81287")
        //.css('border-color', "rgb(120,30,100)")
        .css('border-color', "#a81287")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(120,30,100, 0.6)")
                .css('background-color', "rgba(168,18,135, 0.6)")
                //.css('border-color', "rgba(120,30,100, 0.6)")
                .css('border-color', "rgba(168,18,135, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(120,30,100)")
                .css('background-color', "#a81287")
                //.css('border-color', "rgb(120,30,100)");
                .css('border-color', "#a81287");
        });

    $('div.reuniaoPaisMestres')
        .parent()
        //.css('background-color', "rgb(200,60,130)")
        .css('background-color', "#d33986")
        //.css('border-color', "rgb(200,60,130)")
        .css('border-color', "#d33986")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(200,60,130, 0.6)")
                .css('background-color', "rgba(211,57,134, 0.6)")
                //.css('border-color', "rgba(200,60,130, 0.6)")
                .css('border-color', "rgba(211,57,134, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(200,60,130)")
                .css('background-color', "#d33986")
                //.css('border-color', "rgb(200,60,130)");
                .css('border-color', "#d33986");
        });

    $('div.reuniaoAssociacaoPaisMestres')
        .parent()
        //.css('background-color', "rgb(255,100,140)")
        .css('background-color', "#d33986")
        //.css('border-color', "rgb(255,100,140)")
        .css('border-color', "#d33986")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(255,100,140, 0.6)")
                .css('background-color', "rgba(211,57,134, 0.6)")
                //.css('border-color', "rgba(255,100,140, 0.6)")
                .css('border-color', "rgba(211,57,134, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(255,100,140)")
                .css('background-color', "#d33986")
                //.css('border-color', "rgb(255,100,140)");
                .css('border-color', "#d33986");
        });

    $('div.lancamentoNotas')
        .parent()
        //.css('background-color', "rgb(0,170,170)")
        .css('background-color', "#009c9c")
        //.css('border-color', "rgb(0,170,170)")
        .css('border-color', "#009c9c")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(0,170,170, 0.6)")
                .css('background-color', "rgba(0,156,156, 0.6)")
                //.css('border-color', "rgba(0,170,170, 0.6)")
                .css('border-color', "rgba(0,156,156, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(0,170,170)")
                .css('background-color', "#009c9c")
                //.css('border-color', "rgb(0,170,170)");
                .css('border-color', "#009c9c");
        });

    $('div.fechamentoFinal')
        .parent()
        //.css('background-color', "rgb(0,100,100)")
        .css('background-color', "#7e00ff")
        //.css('border-color', "rgb(0,100,100)")
        .css('border-color', "#7e00ff")
        .hover(function () {
            $(this)
                //.css('background-color', "rgba(0,100,100, 0.6)")
                .css('background-color', "rgba(126,0,255, 0.6)")
                //.css('border-color', "rgba(0,100,100, 0.6)")
                .css('border-color', "rgba(126,0,255, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                //.css('background-color', "rgb(0,100,100)")
                .css('background-color', "#7e00ff")
                //.css('border-color', "rgb(0,100,100)");
                .css('border-color', "#7e00ff");
        });


    /* ========================================================================================================== */
    $('div.bimestreAv')
        .parent()
        .css('background-color', "#d3c180")
        .css('border-color', "#d3c180")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(211, 193, 128, 0.6)")
                .css('border-color', "rgba(211, 193, 128, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
            .css('background-color', "#d3c180")
            .css('border-color', "#d3c180");
        });

    $('div.feriadoAv')
        .parent()
        .css('background-color', "#e38b8b")
        .css('border-color', "#e38b8b")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(227, 139, 139, 0.6)")
                .css('border-color', "rgba(227, 139, 139, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#e38b8b")
                .css('border-color', "#e38b8b");
        });


    $('div.feriadoEscolarAv')
        .parent()
        .css('background-color', "#dfb0a0)")
        .css('border-color', "#dfb0a0")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(223, 176, 160, 0.6)")
                .css('border-color', "rgba(223, 176, 160, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#dfb0a0")
                .css('border-color', "#dfb0a0");
        });

    $('div.naoLetivoAv')
        .parent()
        .css('background-color', "#ffa7a7")
        .css('border-color', "#ffa7a7")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(255,78,78, 0.6)")
                .css('border-color', "rgba(255,78,78, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#ffa7a7")
                .css('border-color', "#ffa7a7");
        });

    $('div.feriasDocenteAv')
        .parent()
        .css('background-color', "#80d2a4")
        .css('border-color', "#80d2a4")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(128, 210, 164, 0.6)")
                .css('border-color', "rgba(128, 210, 164, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#80d2a4)")
                .css('border-color', "#80d2a4");
        });

    $('div.recessoEscolarAv')
        .parent()
        .css('background-color', "#84b58f")
        .css('border-color', "#84b58f")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(132, 181, 14, 0.6)")
                .css('border-color', "rgba(132, 181, 14, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#84b58f")
                .css('border-color', "#84b58f");
        });


    $('div.planejamentoAv')
        .parent()
        .css('background-color', "#c8c8c8")
        .css('border-color', "#c8c8c8")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(200, 200, 200, 0.6)")
                .css('border-color', "rgba(200, 200, 200, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#c8c8c8")
                .css('border-color', "#c8c8c8");
        });

    $('div.conselhoClasseAv')
        .parent()
        .css('background-color', "#babfff")
        .css('border-color', "#babfff")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(186, 191, 25, 0.6)")
                .css('border-color', "rgba(186, 191, 25, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#babfff")
                .css('border-color', "#babfff");
        });

    $('div.conselhoEscolaAv')
        .parent()
        .css('background-color', "#90bcda")
        .css('border-color', "#90bcda")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(144, 188, 218, 0.6)")
                .css('border-color', "rgba(144, 188, 218, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#90bcda")
                .css('border-color', "#90bcda");
        });

    $('div.discussaoSarespAv')
        .parent()
        .css('background-color', "#80c8ff")
        .css('border-color', "#80c8ff")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(128, 200, 255, 0.6)")
                .css('border-color', "rgba(128, 200, 255, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#80c8ff")
                .css('border-color', "#80c8ff");
        });

    $('div.diaEscolaFilhoAv')
        .parent()
        .css('background-color', "#efb480")
        .css('border-color', "#efb480")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(239, 180, 128, 0.6)")
                .css('border-color', "rgba(239, 180, 128, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#efb480")
                .css('border-color', "#efb480");
        });

    $('div.sabadoLetivoAv')
        .parent()
        .css('background-color', "#0033CC")
        .css('border-color', "#0033CC")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(0, 51, 204, 0.6)")
                .css('border-color', "rgba(0, 51, 204, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#0033CC")
                .css('border-color', "#0033CC");
        });

    $('div.avaliacaoInstitucionalAv')
        .parent()
        .css('background-color', "#d489c3")
        .css('border-color', "#d489c3")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(212, 137, 19, 0.6)")
                .css('border-color', "rgba(212, 137, 19, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#d489c3")
                .css('border-color', "#d489c3");
        });

    $('div.reuniaoPaisMestresAv')
        .parent()
        .css('background-color', "#e99cc3")
        .css('border-color', "#e99cc3")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(233, 156, 195, 0.6)")
                .css('border-color', "rgba(233, 156, 195, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#e99cc3")
                .css('border-color', "#e99cc3");
        });

    $('div.reuniaoAssociacaoPaisMestresAv')
        .parent()
        .css('background-color', "#e5becb")
        .css('border-color', "#e5becb")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(229, 190, 203, 0.6)")
                .css('border-color', "rgba(229, 190, 203, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#e5becb")
                .css('border-color', "#e5becb");
        });

    $('div.lancamentoNotasAv')
        .parent()
        .css('background-color', "#80cece")
        .css('border-color', "#80cece")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(128, 206, 206, 0.6)")
                .css('border-color', "rgba(128, 206, 206, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#80cece")
                .css('border-color', "#80cece");
        });

    $('div.fechamentoFinalAv')
        .parent()
        .css('background-color', "#bf80ff")
        .css('border-color', "#bf80ff")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(191, 128, 25, 0.6)")
                .css('border-color', "rgba(191, 128, 25, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', "#bf80ff")
                .css('border-color', "#bf80ff");
        });

    $('div.planejamentoNaoLetivo')
        .parent()
        .css('background-color', "#FF00FF")
        .css('border-color', "#FF00FF")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(255,0,255, 0.6)")
                .css('border-color', "rgba(255,0,255, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', " #FF00FF")
                .css('border-color', " #FF00FF");
        });

    $('div.planejamentoLetivo')
        .parent()
        .css('background-color', "#DC143C")
        .css('border-color', "#DC143C")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(220,20,60, 0.6)")
                .css('border-color', "rgba(220,20,60, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', " #DC143C")
                .css('border-color', " #DC143C");
        });
    $('div.replanejamentoNaoLetivo')
        .parent()
        .css('background-color', "#4682B4")
        .css('border-color', "#4682B4")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(70,130,180, 0.6)")
                .css('border-color', "rgba(70,130,180, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', " #4682B4 ")
                .css('border-color', " #4682B4 ");
        });

    $('div.replanejamentoLetivo')
        .parent()
        .css('background-color', "#FF4500")
        .css('border-color', "#FF4500")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(255,69,0, 0.6)")
                .css('border-color', "rgba(255,69,0, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', " #FF4500")
                .css('border-color', " #FF4500");
        });

    $('div.reposicaoDeAulas')
        .parent()
        .css('background-color', "#2E8B57 ")
        .css('border-color', "#2E8B57 ")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(46,139,87, 0.6)")
                .css('border-color', "rgba(46,139,87, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', " #2E8B57 ")
                .css('border-color', " #2E8B57 ");
        });

    $('div.atividadeLetiva')
        .parent()
        .css('background-color', "#8B4513 ")
        .css('border-color', "#8B4513 ")
        .hover(function () {
            $(this)
                .css('background-color', "rgba(139,69,19, 0.6)")
                .css('border-color', "rgba(139,69,19, 0.6)")
                .css('cursor', 'pointer');
        })
        .mouseleave(function () {
            $(this)
                .css('background-color', " #8B4513 ")
                .css('border-color', " #8B4513 ");
        });


};


var abrirModal = function (id) {
    $('#' + id).dialog({
        title: "Evento",
        position: ['middle', 'top'],
        width: 820,
        resizable: false,
        modal: true,
        dragable: false,
        show: {
            effect: "blind",
            duration: 200
        },
        beforeClose: function (event, ui) {
            $(this).html('');
        }
    });
}

var AtualizarCalendario = function () {
    $('#btnAtualizarCalendario').click(function () {
        PesquisarCalendarioEscolar();
    });
    $('#CodigoEscola').change(function () {
        PesquisarCalendarioEscolar();
    });
}

var PesquisarCalendarioEscolar = function () {
    $.ajax({
        cache: false,
        url: '/CalendarioEscolar/Calendario',
        type: 'POST',
        datatype: 'HTML',
        data: {
            AnoLetivo: TratarValorNumerico($('#AnoLetivoAtual').html()),
            CodigoDiretoria: TratarValorNumerico($('#CodigoDiretoria').val()),
            CodigoEscola: TratarValorNumerico($('#CodigoEscola').val())
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#calendario').html(data);
            ConfigurarCalendarios();
            DetalharMes();
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

var AlterarAnoLetivo = function (AnoLetivo) {
    $.ajax({
        cache: false,
        url: '/CalendarioEscolar/Calendario',
        type: 'POST',
        datatype: 'HTML',
        data: {
            AnoLetivo: TratarValorNumerico(AnoLetivo),
            CodigoDiretoria: TratarValorNumerico($('#CodigoDiretoria').val()),
            CodigoEscola: TratarValorNumerico($('#CodigoEscola').val())
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#calendario').html(data);
            ConfigurarCalendarios();
            DetalharMes();
            AtualizarCalendario();
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

var DetalharMes = function () {
    $('.detalharMes').click(function () {
        $.ajax({
            cache: false,
            url: '/CalendarioEscolar/CalendarioMes',
            type: 'POST',
            datatype: 'HTML',
            data: {
                AnoLetivo: $(this).attr('anoLetivo'),
                Mes: $(this).attr('mes')
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogCalendario').html(data);
                ConfigurarCalendarioMes();
                abrirModal("dialogCalendario");
                $('.detalharMes').removeAttr('style');
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

var DetalharEvento = function (CodigoEvento, impedirAberturaModal) {
    $.ajax({
        cache: false,
        url: '/CalendarioEscolar/DetalharEvento',
        type: 'POST',
        datatype: 'HTML',
        data: {
            CodigoEventoCalendario: CodigoEvento
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            if (data == '') {
                return;
            }

            $('#dialogEvento').html(data);
            EditarEvento();
            ExcluirEvento();
            if (!impedirAberturaModal)
                abrirModal("dialogEvento");
            $('.detalharMes').removeAttr('style');
            $('.tit').removeAttr('style');
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

var EditarEvento = function () {
    $('#btnEditar').click(function () {
        $.ajax({
            cache: false,
            url: '/CalendarioEscolar/EditarEvento',
            type: 'POST',
            datatype: 'HTML',
            data: {
                CodigoEventoCalendario: $(this).attr('codigoCalendario')
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == '') {
                    return;
                }

                $('#dialogEvento').html(data);

                $('#ddlEscola').change(function () {
                    if ($('#hdfAtivo').val() == '0') {
                        if ($('#hdfCodigoDiretoria').val() == '0' && $('#hdfCodigoEscola').val() == 0) {
                            $('#avisoAlteracao').hide();
                            return;
                        }

                        if ($('#hdfCodigoDiretoria').val() == $('#ddlDiretoria').val() && $('#hdfCodigoEscola').val() == $('#ddlEscola').val()) {
                            $('#avisoAlteracao').show();
                        }
                        else {
                            $('#avisoAlteracao').hide();
                        }
                    }
                });

                if ($('#ddlEscola').is(':disabled') == false)
                {
                    $('#ddlDiretoria').autoPreencher($('#ddlEscola'), 'Escola', 'CarregarListaEscolas');
                }

                SalvarEdicaoEvento();
                AplicarMascaras();

                $('#DataDeInicioPlanejado').datepicker({
                    minDate: new Date(parseInt($('#AnoLetivoAtual').html()) - 1, 0, 1),
                    maxDate: new Date(parseInt($('#AnoLetivoAtual').html()) + 1, 11, 31)
                });

                $('#DataDeFimPlanejado').datepicker({
                    minDate: new Date(parseInt($('#AnoLetivoAtual').html()) - 1, 0, 1),
                    maxDate: new Date(parseInt($('#AnoLetivoAtual').html()) + 1, 11, 31)
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
    });
}

var SalvarEdicaoEvento = function () {
    $('#frmEdicao').validate({
        rules: {
            NomeDoEvento: { required: true },
            DescricaoEventos: { required: true },
            Classificacao: { required: true },
            JustificativaAlteracao: { required: true },
            ddlDiretoria: { required: true },
            DataDeInicioPlanejado: { required: true, dataValida: true },
            DataDeFimPlanejado: { required: true, dataValida: true },
            HoraDeInicioPlanejado: { horaValida: true },
            HoraDeFimPlanejado: { horaValida: true }
        }
    });

    $('#btnSalvarEdicao').click(function () {
        if ($('#frmEdicao').valid() == false) {
            return;
        }

        $.ajax({
            cache: false,
            url: '/CalendarioEscolar/SalvarEdicaoEvento',
            type: 'POST',
            datatype: 'JSON',
            data: {
                CodigoEventoCalendario: $('#CodigoEventoCalendario').val(),
                NomeDoEvento: $('#NomeDoEvento').val(),
                DescricaoEventos: $('#DescricaoEventos').val(),
                Classificacao: $('#Classificacao').val(),
                Justificativa: $('#JustificativaAlteracao').val(),
                CodigoDiretoria: TratarValorNumerico($('#ddlDiretoria').val()),
                CodigoEscola: TratarValorNumerico($('#ddlEscola').val()),
                DataDeInicioPlanejado: $('#DataDeInicioPlanejado').val(),
                DataDeFimPlanejado: $('#DataDeFimPlanejado').val(),
                HoraDeInicioPlanejado: $('#HoraDeInicioPlanejado').val(),
                HoraDeFimPlanejado: $('#HoraDeFimPlanejado').val(),
                AnoLetivo: $('#AnoLetivoAtual').html()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == true) {
                    PesquisarCalendarioEscolar();
                    $('#dialogEvento').dialog('close');
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

var CadastrarEvento = function () {
    $('#btnCadastrar').click(function () {
        $.ajax({
            cache: false,
            url: '/CalendarioEscolar/CadastrarEvento',
            type: 'POST',
            datatype: 'HTML',
            data: {
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == '') {
                    return;
                }

                $('#dialogEvento').html(data);

                $('#ddlDiretoria').autoPreencher($('#ddlEscola'), 'Escola', 'CarregarListaEscolas');
                $('#CodigoTipoEventoCalendario').autoPreencher($('#Classificacao'), 'CalendarioEscolar', 'CarregarClassificacaoTipoEvento');

                AplicarMascaras();
                SalvarCadastroEvento();

                $('#DataDeInicioPlanejado').datepicker({
                    minDate: new Date(parseInt($('#AnoLetivoAtual').html()) - 1, 0, 1),
                    maxDate: new Date(parseInt($('#AnoLetivoAtual').html()) + 1, 11, 31)
                });

                $('#DataDeFimPlanejado').datepicker({
                    minDate: new Date(parseInt($('#AnoLetivoAtual').html()) - 1, 0, 1),
                    maxDate: new Date(parseInt($('#AnoLetivoAtual').html()) + 1, 11, 31)
                });

                abrirModal("dialogEvento");
                $('.detalharMes').removeAttr('style');
                $('.tit').removeAttr('style');
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

var SalvarCadastroEvento = function () {
    $('#frmCadastro').validate({
        rules: {
            NomeDoEvento: { required: true },
            CodigoTipoEventoCalendario: { required: true },
            DescricaoEventos: { required: true },
            Classificacao: { required: true },
            JustificativaAlteracao: { required: true },
            ddlDiretoria: { required: true },
            DataDeInicioPlanejado: { required: true, dataValida: true },
            DataDeFimPlanejado: { required: true, dataValida: true },
            HoraDeInicioPlanejado: { horaValida: true },
            HoraDeFimPlanejado: { horaValida: true }
        }
    });

    $('#btnSalvarCadastro').click(function () {
        if ($('#frmCadastro').valid() == false) {
            return;
        }

        $.ajax({
            cache: false,
            url: '/CalendarioEscolar/SalvarCadastroEvento',
            type: 'POST',
            datatype: 'HTML',
            data: {
                NomeDoEvento: $('#NomeDoEvento').val(),
                CodigoTipoEventoCalendario: $('#CodigoTipoEventoCalendario').val(),
                DescricaoEventos: $('#DescricaoEventos').val(),
                Classificacao: $('#Classificacao').val(),
                Justificativa: $('#JustificativaAlteracao').val(),
                CodigoDiretoria: TratarValorNumerico($('#ddlDiretoria').val()),
                CodigoEscola: TratarValorNumerico($('#ddlEscola').val()),
                DataDeInicioPlanejado: $('#DataDeInicioPlanejado').val(),
                DataDeFimPlanejado: $('#DataDeFimPlanejado').val(),
                HoraDeInicioPlanejado: $('#HoraDeInicioPlanejado').val(),
                HoraDeFimPlanejado: $('#HoraDeFimPlanejado').val(),
                AnoLetivo: $('#AnoLetivoAtual').html()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == true) {
                    PesquisarCalendarioEscolar();
                    $('#dialogEvento').dialog('close');
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

var ExcluirEvento = function () {
    $('#btnExcluir').click(function () {
        var id = $(this).attr('codigoCalendario');

        $.ajax({
            global: false,
            cache: false,
            url: '/CalendarioEscolar/ValidarExclusaoEvento',
            type: 'POST',
            datatype: 'JSON',
            data: {
                CodigoEventoCalendario: id
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data.podeExcluir == true) {
                    Mensagem.Alert({
                        titulo: "Atenção!",
                        mensagem: data.mensagem,
                        tipo: "aviso",
                        botoes: [
                            {
                                botao: "Sim",
                                callback: function () {
                                    $.ajax({
                                        cache: false,
                                        url: '/CalendarioEscolar/SalvarExclusaoEvento',
                                        type: 'POST',
                                        datatype: 'JSON',
                                        data: {
                                            CodigoEventoCalendario: id
                                        },
                                        traditional: true,
                                        success: function (data, textStatus, jqXHR) {
                                            PesquisarCalendarioEscolar();
                                            $('#dialogEvento').dialog('close');
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
                            {
                                botao: "Não",
                                callback: function () {
                                    $.unblockUI();
                                }
                            }
                        ]
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

var VerificarDiasLetivosCalendario = function (Calendario, CodigoDiretoria, CodigoEscola, AnoLetivo, Mes) {
    var dpmMonth;

    if (typeof (Calendario) == 'string') {
        dpmMonth = $('#' + Calendario);
    } else {
        dpmMonth = $(Calendario);
    }

    if (dpmMonth == null || dpmMonth == undefined) {
        return;
    }

    $.ajax({
        cache: false,
        url: '/CalendarioEscolar/ConsultarDiasLetivos',
        type: 'POST',
        datatype: 'JSON',
        data: {
            codigoDiretoria: CodigoDiretoria,
            codigoEscola: CodigoEscola,
            anoLetivo: AnoLetivo,
            mes: Mes
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $(dpmMonth).find('.month_blue_cell_inner').each(function () {
                var diaCalendario = $(this).find('.month_blue_cell_header').html();

                for (var i = 0; i < data.length; i++) {
                    var dia = data[i].Dia;
                    if (dia == diaCalendario) {
                        if (data[i].Letivo == false) {
                            $(this).css('background-color', 'rgb(255, 240, 240)');
                        }

                        break;
                    }
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