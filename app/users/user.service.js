"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Hienadz on 05.09.16.
 */
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var authenticate_service_1 = require("./authenticate.service");
var helper_1 = require("../helper");
var status_response_model_1 = require("../models/status-response.model");
var UserService = (function () {
    function UserService(http, auth) {
        this.http = http;
        this.auth = auth;
        this.apiUrl = 'api/user';
    }
    UserService.prototype.getItems = function () {
        return this.http.get(this.apiUrl)
            .map(function (response) { return response.json(); })
            .catch(helper_1.Helper.handleError);
    };
    UserService.prototype.createItem = function (item) {
        var _this = this;
        return this.http
            .post(this.apiUrl, JSON.stringify(item), { headers: helper_1.Helper.createHeaders() })
            .delay(2000)
            .map(function (t) { return status_response_model_1.StatusResponse.create(t.json()); })
            .do(function (t) { return _this.auth.storeToken(t); })
            .catch(helper_1.Helper.handleError);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authenticate_service_1.AuthenticateService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map