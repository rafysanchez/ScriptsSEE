$(function () {
	$.validator.methods.date = function (value, element) {
		Globalize.culture("pt-BR");
		return this.optional(element) || Globalize.parseDate(value) !== null;
	}

	$.validator.methods.number = function (value, element) {
	    Globalize.culture("pt-BR");
	    return this.optional(element) || Globalize.parseFloat(value) !== null;
	}
});


jQuery.extend(jQuery.validator.methods, {
    date: function (value, element) {
        return this.optional(element) || /^\d\d?\/\d\d?\/\d\d\d?\d?$/.test(value);
    },
    number: function (value, element) {
        return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
    }
});

$(function () {

    Globalize.culture('pt-BR');

    jQuery.extend(jQuery.validator.methods, {
        range: function (value, element, param) {
            //Use the Globalization plugin to parse the value
            var val = Globalize.parseFloat(value);
            return this.optional(element) || (
                val >= param[0] && val <= param[1]);
        }
    });

});