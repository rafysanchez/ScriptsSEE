"use strict";
function SedGeocoder() {
	//google.maps.GeocoderStatus.OK = "OK"

	/*
	 * geocoder.geocode({ 'address': address }, function (results, status) {
	 * results = array com resultados
	 * status = google.maps.GeocoderStatus.XXX
	 * }
	 */

	this.isRunning = false;
	this.geocode = function (options, callback) {
		var param, val, _this = this, enderecoEspecifico;
		if (("address" in options)) {
			param = "address";
			val = options.address;
		} else {
			param = "location";
			val = (("location" in options) ? options.location : options.latLng);
			if ((typeof val) != "string") {
				if ((typeof val.lat) == "number")
					val = val.lat + ", " + val.lng;
				else
					val = val.lat() + ", " + val.lng();
			}
		}

		enderecoEspecifico = !!options.enderecoEspecifico;

		if (this.isRunning)
			return;

		this.isRunning = true;

		$.ajax({
			url: (
					(location && location.hostname && (location.hostname == "localhost" || location.hostname.indexOf("homo") >= 0)) ?
					"https://homologacaosed.educacao.sp.gov.br" :
					"https://sed.educacao.sp.gov.br"
				) +
				"/Geo/Geocoder/Geocode?" + param + "=" + encodeURIComponent(val),
			success: function (d) {
				_this.isRunning = false;
				var r = (d.results || []), i, types, valido;
				if (enderecoEspecifico && r.length === 1 && (types = r[0].types) && types.length) {
					// Verifica se encontrou apenas a cidade, ou se efetivamente encontrou alguma rua
					// (Essa verificação é necessária, pois como utilizamos &components=administrative_area:SP|country:BR
					// na busca original, o Google fica tendencionado a retornar sempre São Paulo, e
					// acaba nunca retornando ZERO_RESULTS...)
					valido = false;
					for (i = types.length - 1; i >= 0; i--) {
						switch (types[i]) {
							case "country":
							case "locality":
							case "political":
							case "administrative_area_level_2":
							case "administrative_area_level_1":
								// Esses tipos são muito genéricos... Vamos tentar determinar se
								// existem outros tipos mais específicos para poder validar
								break;
							default:
								valido = true;
								i = 0;
								break;
						}
					}
					if (!valido)
						r = [];
				}
				callback(r, ((!r.length && d.status == "OK") ? "ZERO_RESULTS" : (d.status || "ERROR")));
			},
			error: function () {
				_this.isRunning = false;
				callback([], "ERROR");
			}
		});
	}
}
