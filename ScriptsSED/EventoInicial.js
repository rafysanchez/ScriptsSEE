$(document).ready(function () {
    ConfigurarDialogs();
    ConfigurarCalendarios();
    AlterarAnoLetivo();
    DetalharMes();
    CadastrarEvento();
});

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
        .css('background-color', "#ff4e4e")
        //.css('border-color', "rgb(0,110,70)")
        .css('border-color', "#ff4e4e")
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
                .css('background-color', "#ff4e4e)")
                //.css('border-color', "rgb(0,110,70)");
                .css('border-color', "#ff4e4e");
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
            .css('background-color', "rgba(0, 51 , 204, 0.6)")
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

var ConfigurarDialogs = function () {
    $('#dialogCalendario').dialog({
        autoOpen: false,
        title: '',
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
        }
    });

    $('#dialogEvento').dialog({
        autoOpen: false,
        title: '',
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
        }
    });
};

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

function fct_AlterarAnoLetivo(anoLetivo) {
    $.ajax({
        cache: false,
        url: '/EventoInicial/Calendario',
        type: 'POST',
        datatype: 'HTML',
        data: { AnoLetivo: anoLetivo },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#calendario').html(data);
            AlterarAnoLetivo();
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

var AlterarAnoLetivo = function () {
    $('.alterarAnoLetivo').click(function () {

        anoLetivo = parseInt($(this).attr('anoLetivo'));

        fct_AlterarAnoLetivo(anoLetivo);
    });
};

var DetalharMes = function () {
    // $('#dialogCalendario')

    $('.detalharMes').click(function () {

        var anoLetivo = parseInt($(this).attr('anoLetivo'));
        var mes = parseInt($(this).attr('mes'));

        $.ajax({
            cache: false,
            url: '/EventoInicial/CalendarioMes',
            type: 'POST',
            datatype: 'HTML',
            data: {
                AnoLetivo: anoLetivo,
                Mes: mes
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogCalendario').html(data);
                ConfigurarCalendarioMes();                
                $('#dialogCalendario').dialog('open');
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
};

var DetalharEvento = function (codigoCalendario) {
    $.ajax({
        cache: false,
        url: '/EventoInicial/DetalharEvento',
        type: 'POST',
        datatype: 'HTML',
        data: {
            Codigo: parseInt(codigoCalendario)
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#dialogEvento').html(data);
            EditarEvento();
            DeletarEvento();
            $('#dialogEvento').dialog('open');
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
};

var CadastrarEvento = function () {
    $('#btnCadastrar').click(function () {
        $.ajax({
            cache: false,
            url: '/EventoInicial/CadastrarEvento',
            type: 'POST',
            datatype: 'HTML',
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogEvento').html(data);
                AplicarMascaras();
                ConfigurarDatepicker();
                ValidarCadastro();
                SalvarCadastro();
                $('#dialogEvento').dialog('open');
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
};

var ValidarCadastro = function () {
    $('.form').validate({
        rules: {
            NomeDoEvento: {
                required: true
            },
            CodigoTipoEventoCalendario: {
                required: true
            },
            DescricaoEventos: {
                required: true
            },
            Classificacao: {
                required: true
            },
            DataDeInicioPlanejado: {
                required: true
            },
            DataDeFimPlanejado: {
                required: true
            },
            HoraDeInicioPlanejado: {
                horaValida: true
            },
            HoraDeFimPlanejado: {
                horaValida: true
            }
        },
        messages: {
            NomeDoEvento: {
                required: 'Obrigatório'
            },
            CodigoTipoEventoCalendario: {
                required: 'Obrigatório'
            },
            DescricaoEventos: {
                required: 'Obrigatório'
            },
            Classificacao: {
                required: 'Obrigatório'
            },
            DataDeInicioPlanejado: {
                required: 'Obrigatório'
            },
            DataDeFimPlanejado: {
                required: 'Obrigatório'
            },
            HoraDeInicioPlanejado: {
                horaValida: 'Hora inválida'
            },
            HoraDeFimPlanejado: {
                horaValida: 'Hora inválida'
            }
        }
    })
};

var SalvarCadastro = function () {
    $('#btnSalvarCadastro').click(function (e) {
        e.preventDefault();

        if ($('.form').valid() == false) {
            return;
        }

        $.ajax({
            cache: false,
            url: '/EventoInicial/SalvarCadastro',
            type: 'POST',
            data: {
                Nome: $('#NomeDoEvento').val(),
                CodigoTipoEvento: parseInt($('#CodigoTipoEventoCalendario').val()),
                Descricao: $('#DescricaoEventos').val(),
                Classificacao: $('#Classificacao').val(),
                DataInicio: $('#DataDeInicioPlanejado').val(),
                DataFim: $('#DataDeFimPlanejado').val(),
                HoraInicio: $('#HoraDeInicioPlanejado').val(),
                HoraFim: $('#HoraDeFimPlanejado').val(),
                anoLetivo: $('#AnoLetivoAtual').html()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == 1) {
                    anoLetivo = parseInt($('#AnoLetivoAtual').html());
                    $.ajax({
                        cache: false,
                        url: '/EventoInicial/Calendario',
                        type: 'POST',
                        datatype: 'HTML',
                        data: { AnoLetivo: anoLetivo },
                        traditional: true,
                        success: function (data, textStatus, jqXHR) {
                            $('#calendario').html(data);
                            AlterarAnoLetivo();
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
                    $('#dialogEvento').dialog('close');
                    $('#dialogCalendario').dialog('close');
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
};

var EditarEvento = function () {
    $('#btnEditar').click(function () {

        var codigoCalendario = parseInt($(this).attr('codigoCalendario'));

        $.ajax({
            cache: false,
            url: '/EventoInicial/EditarEvento',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigoEvento: codigoCalendario
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogEvento').html(data);
                AplicarMascaras();
                ConfigurarDatepicker();
                ValidarCadastro();
                SalvarEdicao();
                $('#dialogEvento').dialog('open');
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
};

var SalvarEdicao = function () {
    $('#btnSalvarEdicao').click(function (e) {
        e.preventDefault();

        if ($('.form').valid() == false) {
            return;
        }
        console.log($('#NomeDoEvento').val());
        $.ajax({
            cache: false,
            url: '/EventoInicial/SalvarEdicao',
            type: 'POST',
            datatype: 'HTML',
            data: {
                CodigoEvento: parseInt($('#CodigoEventoCalendario').val()),
                Descricao: $('#DescricaoEventos').val(),
                Classificacao: $('#Classificacao').val(),
                DataInicio: $('#DataDeInicioPlanejado').val(),
                DataFim: $('#DataDeFimPlanejado').val(),
                HoraInicio: $('#HoraDeInicioPlanejado').val(),
                HoraFim: $('#HoraDeFimPlanejado').val(),
                NomeEvento: $('#NomeDoEvento').val(),
                anoLetivo: $('#AnoLetivoAtual').html()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == 1) {
                    anoLetivo = parseInt($('#AnoLetivoAtual').html());
                    $.ajax({
                        cache: false,
                        url: '/EventoInicial/Calendario',
                        type: 'POST',
                        datatype: 'HTML',
                        data: { AnoLetivo: anoLetivo },
                        traditional: true,
                        success: function (data, textStatus, jqXHR) {
                            $('#calendario').html(data);
                            AlterarAnoLetivo();
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
                    $('#dialogEvento').dialog('close');
                    $('#dialogCalendario').dialog('close');
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
};

var ConfigurarDatepicker = function () {
    $('.data').datepicker("option", "minDate", new Date(parseInt($('#AnoLetivoAtual').html()) -1, 0, 1));
    $('.data').datepicker("option", "maxDate", new Date(parseInt($('#AnoLetivoAtual').html()) + 1, 11, 31));
};

var DeletarEvento = function () {
    $('#btnExcluir').click(function () {
        var codigoEvento = $(this).attr('codigoCalendario');

        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: "Deseja realmente excluir o Evento?",
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            cache: false,
                            url: '/EventoInicial/ExcluirEvento',
                            type: 'POST',
                            datatype: 'HTML',
                            data: {
                                CodigoEvento: codigoEvento
                            },
                            traditional: true,
                            success: function (data, textStatus, jqXHR) {
                                if (data == 1) {
                                    anoLetivo = parseInt($('#AnoLetivoAtual').html());
                                    $.ajax({
                                        cache: false,
                                        url: '/EventoInicial/Calendario',
                                        type: 'POST',
                                        datatype: 'HTML',
                                        data: { AnoLetivo: anoLetivo },
                                        traditional: true,
                                        success: function (data, textStatus, jqXHR) {
                                            $('#calendario').html(data);
                                            AlterarAnoLetivo();
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
                                    $('#dialogEvento').dialog('close');
                                    $('#dialogCalendario').dialog('close');
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
};

/* MODELO AJAX
    
    $.ajax({
        cache: false,
        url: '/CONTROLLER/ACTION',
        type: 'POST',
        datatype: 'HTML',
        data: {
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {          
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
    
*/