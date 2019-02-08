
var setSuccessOrErrorInput = (function () {

    function _setError(div) {
        $(div).addClass('form-group has-error');
        $(div)
         .velocity({ opacity: 0 }, 300)
         .velocity("reverse");
    }

    function _setSuccess(div) {
        $(div).addClass('form-group has-success');
    }

    function _removeError(div) {
        $(div).removeClass('form-group has-error');
    }

    function _removeSuccess(div) {
        $(div).removeClass('form-group has-success');
    }

    return {
        setError: function (div) {
            _setError(div);
        },
        setSuccess: function (div) {
            _setSuccess(div);
        },
        removeError: function (div) {
            _removeError(div);
        },
        removeSuccess: function (div) {
            _removeSuccess(div);
        }

    };

})();