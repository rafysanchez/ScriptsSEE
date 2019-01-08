﻿/*!
 * currency.js - v1.0.0
 * http://scurker.github.io/currency.js
 *
 * Copyright (c) 2017 Jason Wilson
 * Released under MIT license
 */
(function (d, c) { "object" === typeof exports && "undefined" !== typeof module ? module.exports = c() : "function" === typeof define && define.amd ? define(c) : d.currency = c() })(this, function () {
    function d(b, a) { if (!(this instanceof d)) return new d(b, a); a = l({}, m, a); var f = Math.pow(10, a.precision); this.intValue = b = c(b, a); this.value = b / f; this.s = a; this.p = f } function c(b, a) {
        var f = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !0, g = a.decimal, c = a.errorOnInvalid; var e = Math.pow(10, a.precision); if ("number" === typeof b) e *= b; else if (b instanceof
        d) e *= b.value; else if ("string" === typeof b) c = new RegExp("[^-\\d" + g + "]", "g"), g = new RegExp("\\" + g, "g"), e = (e = parseFloat(b.replace(/\((.*)\)/, "-$1").replace(c, "").replace(g, ".") * e)) || 0; else { if (c) throw Error("Invalid Input"); e = 0 } return f ? Math.round(e) : e
    } var l = Object.assign || function (b) { for (var a = 1; a < arguments.length; a++) { var f = arguments[a], c; for (c in f) Object.prototype.hasOwnProperty.call(f, c) && (b[c] = f[c]) } return b }, m = { symbol: "$", separator: ",", decimal: ".", formatWithSymbol: !1, errorOnInvalid: !1, precision: 2 },
    n = /(\d)(?=(\d{3})+\b)/g, p = /\.(\d+)$/; d.prototype = {
        add: function (b) { var a = this.s, f = this.p; return d((this.intValue + c(b, a)) / f, a) }, subtract: function (b) { var a = this.s, f = this.p; return d((this.intValue - c(b, a)) / f, a) }, multiply: function (b) { var a = this.s; return d(this.intValue * c(b, a, !1) / Math.pow(10, a.precision + 2), a) }, divide: function (b) { var a = this.s; return d(this.intValue / c(b, a, !1), a) }, distribute: function (b) {
            var a = this.intValue, c = this.p, g = this.s, k = [], e = Math[0 <= a ? "floor" : "ceil"](a / b); for (a = Math.abs(a - e * b) ; 0 !== b; b--) {
                var h =
                d(e / c, g); 0 < a-- && (h = 0 <= h.value ? h.add(1 / c) : h.subtract(1 / c)); k.push(h)
            } return k
        }, dollars: function () { return ~~this.value }, cents: function () { return ~~(this.intValue % this.p) }, format: function (b) { var a = this.s, c = a.formatWithSymbol, d = a.symbol, k = a.separator; a = a.decimal; "undefined" === typeof b && (b = c); return ((b ? d : "") + this).replace(n, "$1" + k).replace(p, a + "$1") }, toString: function () { return (this.intValue / this.p).toFixed(this.s.precision) }, toJSON: function () { return this.value }
    }; return d
});