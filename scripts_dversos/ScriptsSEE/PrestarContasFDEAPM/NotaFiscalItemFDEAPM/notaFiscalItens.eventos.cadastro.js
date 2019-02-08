'use strict'

var _desconto = "";
$(document).ready(function () {

    $('.valorMonetario').priceFormat({
        centsSeparator: ',',
        thousandsSeparator: '.'
    });
    AplicarMascaras();

    function carregarValorTotal(valor) {
        $("#txtVlTotalVencedor").val(valor);
    }

    $.validator.addMethod("QuantidadeMaiorZero", function (value, element) {
        var vl = $('#txtNrQuantidade').val();
        vl = vl.replace(',', '').replace('.', '');
        vl = parseFloat(vl);

        if (vl > 0)
            return true;
        return false;
    }, "Quantidade deve ser maior que zero");


    $.validator.addMethod("FornecedorVencedorDeveTerMenorValorFornecedor2", function (value, element) {
        var valFornecedor = $('#txtVlVencedor').val();
        var vlFornecedor2 = $('#txtVlUnitarioFornecedor2').val();
        return compararDoisValores(valFornecedor, vlFornecedor2);

    }, "Valor deve ser maior que do Vencedor.");

    $.validator.addMethod("FornecedorVencedorDeveTerMenorValorFornecedor3", function (value, element) {
        var vlFornecedor = $('#txtVlVencedor').val();
        var vlFornecedor3 = $('#txtVlUnitarioFornecedor3').val();
        return compararDoisValores(vlFornecedor, vlFornecedor3);

    }, "Valor deve ser maior que o valor do Vencedor.");

    $.validator.addMethod("SaldoDisponivel", function (value, element) {
        var vlLancado = $('#txtVlTotalVencedor').val();
        var vlSaldo = $('#hdfSaldoNotaFiscal').val();
        return validarSaldoDisponivel(vlSaldo, vlLancado);

    }, "Valor maior que o valor a ser lançado.");

    $.validator.addMethod("DescontoNaoPodeSerMaiorQueValorFornecedorVencedor", function (value, element) {

        var retorno = true;
        var vlTotal = calcularValorSemDesconto($("#txtNrQuantidade").val(), $("#txtVlVencedor").val());
        var vlDesconto = $('#VlDesconto').val();

        if (vlDesconto != undefined && vlDesconto != null && vlDesconto != "")
            retorno = compararDoisValores(vlDesconto, vlTotal);

        if (!retorno) {
            $("#txtVlTotalVencedor")
              .velocity({ opacity: 0 }, 800)
              .velocity("reverse");
        }
        return retorno;

    }, "Desconto inválido!");

    $("#frmNotaFiscalItem").validate({
        rules: {
            DsItem: { required: true },
            IdUnidadeMedidasNf: { required: true },
            NrQuantidade: { required: true, QuantidadeMaiorZero: true },
            VlUnitarioFornecedorVencedor: { required: true },
            VlUnitarioFornecedor2: { required: true, FornecedorVencedorDeveTerMenorValorFornecedor2: true },
            VlUnitarioFornecedor3: { required: true, FornecedorVencedorDeveTerMenorValorFornecedor3: true },
            VlDesconto: { DescontoNaoPodeSerMaiorQueValorFornecedorVencedor: true }
        },
        submitHandler: function () {

            var vlVencedor = $("#txtVlVencedor").val().replace(/\./g, '');
            var vlF2 = $("#txtVlUnitarioFornecedor2").val().replace(/\./g, '');
            var vlF3 = $("#txtVlUnitarioFornecedor3").val().replace(/\./g, '');
            var vlDesc = $("#VlDesconto").val().replace(/\./g, '');

            $("#txtVlVencedor").val('');
            $("#txtVlVencedor").val(vlVencedor);

            $("#txtVlUnitarioFornecedor2").val('');
            $("#txtVlUnitarioFornecedor2").val(vlF2)

            $("#txtVlUnitarioFornecedor3").val('');
            $("#txtVlUnitarioFornecedor3").val(vlF3);

            $("#VlDesconto").val('');
            $("#VlDesconto").val(vlDesc);

            _notaFiscalItens.salvar($('#hdfNotaFiscal').val());
        }
    });

    var vlCusteio = 1;
    var vlCapital = 2;
    $('#rdbCusteio').change(function (e) {
        e.preventDefault();
        $('#NrTipoValor').attr('value', vlCusteio);
    });

    $('#rdbCapital').change(function (e) {
        e.preventDefault();
        $('#NrTipoValor').attr('value', vlCapital);
    });



});

