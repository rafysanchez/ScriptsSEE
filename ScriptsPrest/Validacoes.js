//jQuery.validator.addMethod("quantidademaiorzero",
//function (value, element, param) {

//    console.log('asdfasf');

//    var vl = value;
//    vl = vl.replace(',', '').replace('.', '');
//    vl = parseFloat(vl);

//    if (vl > 0) {
//        return true;
//    }
//    else {
//        return false;
//    }

//});

//jQuery.validator.unobtrusive.adapters.addBool("quantidademaiorzero");


/// <reference path="jquery.validate.js" />  
/// <reference path="jquery.validate.unobtrusive.js" />  
$.validator.unobtrusive.adapters.addSingleVal("quantidademaiorzero", "chars");
$.validator.addMethod("quantidademaiorzero", function (value, element, exclude) {
    //if (value)
    //{
    //    var vl = value;
    //    vl = vl.replace(',', '').replace('.', '');
    //    vl = parseFloat(vl);


    //    if (vl > 0) {
    //        return true;
    //    }
    //    else {
    //        return false;
    //    }

    //    //for (var i = 0; i < exclude.length; i++) {
    //    //    if (jQuery.inArray(exclude[i], value) != -1) {
    //    //        return false;
    //    //    }
    //    //}
    //}
    //return true;
    return false;

});