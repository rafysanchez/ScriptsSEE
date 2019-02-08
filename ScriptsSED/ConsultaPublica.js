$(document).ready(function () {
    AplicarMascaras();
});

var controller = {
    ValidarFiltros: function () {
        $('#frmPesquisa').validate({
            rules: {
                'RA_Numero': { required: true, number: true },
                //'RA_Digito': { required: false, digRG: true },
                'RA_UF': { required: true },
                'DataNascimento': { required: true, dataValida: true },
            },
            messages: {
                RA_Numero: {
                    number: 'Somente números'
                },
            }
        });
    },

    Pesquisar: function () {
        $("#resultado").html('');
        controller.ValidarFiltros();
        if ($("#frmPesquisa").valid()) {
            var ra = $("#RA_Numero").val();
            var digRa = $("#RA_Digito").val();
            var ufRa = $("#RA_UF").val();
            var dtNasc = $("#DataNascimento").val();
            $.ajax({
                cache: false,
                url: '/ConsultaPublica/Pesquisar',
                type: 'POST',
                datatype: 'html',
                data: { ra: ra, digRa: digRa, ufRa: ufRa, dtNasc: dtNasc },
                success: function (data) {
                    if (data) {
                        $("#resultado").html(data);
                        $("#tabelaDados").sedDataTable({
                            columnDefs: [
                                { targets: [10], orderable: false }

                            ],
                            nomeExportacao: "Consulta Pública",
                        });
                    }
                }
            });
        }
    },
    Mapa: function (latitude, longitude) {
        window.open('https://www.google.com/maps?q=' + latitude + ',' + longitude + '&z=17.5z', '_blank');
    },
    LimparDados: function () {
        resetForm("#frmPesquisa");
    }

}