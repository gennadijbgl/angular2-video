"use strict";
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
/**
 * Created by Hienadz on 06.09.16.
 */
var Helper = (function () {
    function Helper() {
    }
    Helper.handleError = function (error) {
        console.error(error);
        return rxjs_1.Observable.throw(error.json().error || "Server error");
    };
    Helper.createHeaders = function () {
        return new http_1.Headers({ 'Content-Type': 'application/json' });
    };
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map