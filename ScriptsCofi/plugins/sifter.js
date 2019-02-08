﻿/*! sifter.js | https://github.com/brianreavis/sifter.js | Apache License (v2) */
(function (r, t) { if (typeof define === "function" && define.amd) { define(t) } else if (typeof exports === "object") { module.exports = t() } else { r.Sifter = t() } })(this, function () { var r = function (r, t) { this.items = r; this.settings = t || { diacritics: true } }; r.prototype.tokenize = function (r) { r = i(String(r || "").toLowerCase()); if (!r || !r.length) return []; var t, e, n, f; var s = []; var a = r.split(/ +/); for (t = 0, e = a.length; t < e; t++) { n = o(a[t]); if (this.settings.diacritics) { for (f in u) { if (u.hasOwnProperty(f)) { n = n.replace(new RegExp(f, "g"), u[f]) } } } s.push({ string: a[t], regex: new RegExp(n, "i") }) } return s }; r.prototype.iterator = function (r, t) { var e; if (f(r)) { e = Array.prototype.forEach || function (r) { for (var t = 0, e = this.length; t < e; t++) { r(this[t], t, this) } } } else { e = function (r) { for (var t in this) { if (this.hasOwnProperty(t)) { r(this[t], t, this) } } } } e.apply(r, [t]) }; r.prototype.getScoreFunction = function (r, t) { var e, i, o, f, u; e = this; r = e.prepareSearch(r, t); o = r.tokens; i = r.options.fields; f = o.length; u = r.options.nesting; var s = function (r, t) { var e, n; if (!r) return 0; r = String(r || ""); n = r.search(t.regex); if (n === -1) return 0; e = t.string.length / r.length; if (n === 0) e += .5; return e }; var a = function () { var r = i.length; if (!r) { return function () { return 0 } } if (r === 1) { return function (r, t) { return s(n(t, i[0], u), r) } } return function (t, e) { for (var o = 0, f = 0; o < r; o++) { f += s(n(e, i[o], u), t) } return f / r } }(); if (!f) { return function () { return 0 } } if (f === 1) { return function (r) { return a(o[0], r) } } if (r.options.conjunction === "and") { return function (r) { var t; for (var e = 0, n = 0; e < f; e++) { t = a(o[e], r); if (t <= 0) return 0; n += t } return n / f } } else { return function (r) { for (var t = 0, e = 0; t < f; t++) { e += a(o[t], r) } return e / f } } }; r.prototype.getSortFunction = function (r, e) { var i, o, f, u, s, a, c, p, l, h, g; f = this; r = f.prepareSearch(r, e); g = !r.query && e.sort_empty || e.sort; l = function (r, t) { if (r === "$score") return t.score; return n(f.items[t.id], r, e.nesting) }; s = []; if (g) { for (i = 0, o = g.length; i < o; i++) { if (r.query || g[i].field !== "$score") { s.push(g[i]) } } } if (r.query) { h = true; for (i = 0, o = s.length; i < o; i++) { if (s[i].field === "$score") { h = false; break } } if (h) { s.unshift({ field: "$score", direction: "desc" }) } } else { for (i = 0, o = s.length; i < o; i++) { if (s[i].field === "$score") { s.splice(i, 1); break } } } p = []; for (i = 0, o = s.length; i < o; i++) { p.push(s[i].direction === "desc" ? -1 : 1) } a = s.length; if (!a) { return null } else if (a === 1) { u = s[0].field; c = p[0]; return function (r, e) { return c * t(l(u, r), l(u, e)) } } else { return function (r, e) { var n, i, o, f, u; for (n = 0; n < a; n++) { u = s[n].field; i = p[n] * t(l(u, r), l(u, e)); if (i) return i } return 0 } } }; r.prototype.prepareSearch = function (r, t) { if (typeof r === "object") return r; t = e({}, t); var n = t.fields; var i = t.sort; var o = t.sort_empty; if (n && !f(n)) t.fields = [n]; if (i && !f(i)) t.sort = [i]; if (o && !f(o)) t.sort_empty = [o]; return { options: t, query: String(r || "").toLowerCase(), tokens: this.tokenize(r), total: 0, items: [] } }; r.prototype.search = function (r, t) { var e = this, n, i, o, f; var u; var s; o = this.prepareSearch(r, t); t = o.options; r = o.query; s = t.score || e.getScoreFunction(o); if (r.length) { e.iterator(e.items, function (r, e) { i = s(r); if (t.filter === false || i > 0) { o.items.push({ score: i, id: e }) } }) } else { e.iterator(e.items, function (r, t) { o.items.push({ score: 1, id: t }) }) } u = e.getSortFunction(o, t); if (u) o.items.sort(u); o.total = o.items.length; if (typeof t.limit === "number") { o.items = o.items.slice(0, t.limit) } return o }; var t = function (r, t) { if (typeof r === "number" && typeof t === "number") { return r > t ? 1 : r < t ? -1 : 0 } r = s(String(r || "")); t = s(String(t || "")); if (r > t) return 1; if (t > r) return -1; return 0 }; var e = function (r, t) { var e, n, i, o; for (e = 1, n = arguments.length; e < n; e++) { o = arguments[e]; if (!o) continue; for (i in o) { if (o.hasOwnProperty(i)) { r[i] = o[i] } } } return r }; var n = function (r, t, e) { if (!r || !t) return; if (!e) return r[t]; var n = t.split("."); while (n.length && (r = r[n.shift()])); return r }; var i = function (r) { return (r + "").replace(/^\s+|\s+$|/g, "") }; var o = function (r) { return (r + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") }; var f = Array.isArray || typeof $ !== "undefined" && $.isArray || function (r) { return Object.prototype.toString.call(r) === "[object Array]" }; var u = { a: "[a\u1e00\u1e01\u0102\u0103\xc2\xe2\u01cd\u01ce\u023a\u2c65\u0226\u0227\u1ea0\u1ea1\xc4\xe4\xc0\xe0\xc1\xe1\u0100\u0101\xc3\xe3\xc5\xe5\u0105\u0104\xc3\u0105\u0104]", b: "[b\u2422\u03b2\u0392B\u0e3f\ud800\udf01\u16d2]", c: "[c\u0106\u0107\u0108\u0109\u010c\u010d\u010a\u010bC\u0304c\u0304\xc7\xe7\u1e08\u1e09\u023b\u023c\u0187\u0188\u0255\u1d04\uff23\uff43]", d: "[d\u010e\u010f\u1e0a\u1e0b\u1e10\u1e11\u1e0c\u1e0d\u1e12\u1e13\u1e0e\u1e0f\u0110\u0111D\u0326d\u0326\u0189\u0256\u018a\u0257\u018b\u018c\u1d6d\u1d81\u1d91\u0221\u1d05\uff24\uff44\xf0]", e: "[e\xc9\xe9\xc8\xe8\xca\xea\u1e18\u1e19\u011a\u011b\u0114\u0115\u1ebc\u1ebd\u1e1a\u1e1b\u1eba\u1ebb\u0116\u0117\xcb\xeb\u0112\u0113\u0228\u0229\u0118\u0119\u1d92\u0246\u0247\u0204\u0205\u1ebe\u1ebf\u1ec0\u1ec1\u1ec4\u1ec5\u1ec2\u1ec3\u1e1c\u1e1d\u1e16\u1e17\u1e14\u1e15\u0206\u0207\u1eb8\u1eb9\u1ec6\u1ec7\u2c78\u1d07\uff25\uff45\u0258\u01dd\u018f\u0190\u03b5]", f: "[f\u0191\u0192\u1e1e\u1e1f]", g: "[g\u0262\u20b2\u01e4\u01e5\u011c\u011d\u011e\u011f\u0122\u0123\u0193\u0260\u0120\u0121]", h: "[h\u0124\u0125\u0126\u0127\u1e28\u1e29\u1e96\u1e96\u1e24\u1e25\u1e22\u1e23\u0266\u02b0\u01f6\u0195]", i: "[i\xcd\xed\xcc\xec\u012c\u012d\xce\xee\u01cf\u01d0\xcf\xef\u1e2e\u1e2f\u0128\u0129\u012e\u012f\u012a\u012b\u1ec8\u1ec9\u0208\u0209\u020a\u020b\u1eca\u1ecb\u1e2c\u1e2d\u0197\u0268\u0268\u0306\u1d7b\u1d96\u0130iI\u0131\u026a\uff29\uff49]", j: "[j\u0237\u0134\u0135\u0248\u0249\u029d\u025f\u02b2]", k: "[k\u0198\u0199\ua740\ua741\u1e30\u1e31\u01e8\u01e9\u1e32\u1e33\u1e34\u1e35\u03ba\u03f0\u20ad]", l: "[l\u0141\u0142\u013d\u013e\u013b\u013c\u0139\u013a\u1e36\u1e37\u1e38\u1e39\u1e3c\u1e3d\u1e3a\u1e3b\u013f\u0140\u023d\u019a\u2c60\u2c61\u2c62\u026b\u026c\u1d85\u026d\u0234\u029f\uff2c\uff4c]", n: "[n\u0143\u0144\u01f8\u01f9\u0147\u0148\xd1\xf1\u1e44\u1e45\u0145\u0146\u1e46\u1e47\u1e4a\u1e4b\u1e48\u1e49N\u0308n\u0308\u019d\u0272\u0220\u019e\u1d70\u1d87\u0273\u0235\u0274\uff2e\uff4e\u014a\u014b]", o: "[o\xd8\xf8\xd6\xf6\xd3\xf3\xd2\xf2\xd4\xf4\u01d1\u01d2\u0150\u0151\u014e\u014f\u022e\u022f\u1ecc\u1ecd\u019f\u0275\u01a0\u01a1\u1ece\u1ecf\u014c\u014d\xd5\xf5\u01ea\u01eb\u020c\u020d\u0555\u0585]", p: "[p\u1e54\u1e55\u1e56\u1e57\u2c63\u1d7d\u01a4\u01a5\u1d71]", q: "[q\ua756\ua757\u02a0\u024a\u024b\ua758\ua759q\u0303]", r: "[r\u0154\u0155\u024c\u024d\u0158\u0159\u0156\u0157\u1e58\u1e59\u0210\u0211\u0212\u0213\u1e5a\u1e5b\u2c64\u027d]", s: "[s\u015a\u015b\u1e60\u1e61\u1e62\u1e63\ua7a8\ua7a9\u015c\u015d\u0160\u0161\u015e\u015f\u0218\u0219S\u0308s\u0308]", t: "[t\u0164\u0165\u1e6a\u1e6b\u0162\u0163\u1e6c\u1e6d\u01ae\u0288\u021a\u021b\u1e70\u1e71\u1e6e\u1e6f\u01ac\u01ad]", u: "[u\u016c\u016d\u0244\u0289\u1ee4\u1ee5\xdc\xfc\xda\xfa\xd9\xf9\xdb\xfb\u01d3\u01d4\u0170\u0171\u016c\u016d\u01af\u01b0\u1ee6\u1ee7\u016a\u016b\u0168\u0169\u0172\u0173\u0214\u0215\u222a]", v: "[v\u1e7c\u1e7d\u1e7e\u1e7f\u01b2\u028b\ua75e\ua75f\u2c71\u028b]", w: "[w\u1e82\u1e83\u1e80\u1e81\u0174\u0175\u1e84\u1e85\u1e86\u1e87\u1e88\u1e89]", x: "[x\u1e8c\u1e8d\u1e8a\u1e8b\u03c7]", y: "[y\xdd\xfd\u1ef2\u1ef3\u0176\u0177\u0178\xff\u1ef8\u1ef9\u1e8e\u1e8f\u1ef4\u1ef5\u024e\u024f\u01b3\u01b4]", z: "[z\u0179\u017a\u1e90\u1e91\u017d\u017e\u017b\u017c\u1e92\u1e93\u1e94\u1e95\u01b5\u01b6]" }; var s = function () { var r, t, e, n; var i = ""; var o = {}; for (e in u) { if (u.hasOwnProperty(e)) { n = u[e].substring(2, u[e].length - 1); i += n; for (r = 0, t = n.length; r < t; r++) { o[n.charAt(r)] = e } } } var f = new RegExp("[" + i + "]", "g"); return function (r) { return r.replace(f, function (r) { return o[r] }).toLowerCase() } }(); return r });