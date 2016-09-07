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
 * Created by Hienadz on 06.09.16.
 */
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var helper_1 = require("../helper");
var status_response_model_1 = require("../models/status-response.model");
var AuthenticateService = (function () {
    function AuthenticateService(http) {
        this.http = http;
        this.tokenLocal = "VideoTokenByHB";
        this.userLocal = "VideoUserByHB";
        this.apiUrl = 'api/authentication';
    }
    AuthenticateService.prototype.ngOnInit = function () {
        this.loadTokenLocals();
    };
    AuthenticateService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    AuthenticateService.prototype.isLogged = function () {
        return this.currentUser ? true : false;
    };
    AuthenticateService.prototype.processHeaders = function (headers) {
        if (this.token)
            headers.append('x-access-token', this.token);
        return headers;
    };
    AuthenticateService.prototype.saveTokenLocals = function () {
        window.localStorage.setItem(this.tokenLocal, this.token);
        window.localStorage.setItem(this.userLocal, JSON.stringify(this.currentUser));
    };
    AuthenticateService.prototype.loadTokenLocals = function () {
        this.token = window.localStorage.getItem(this.tokenLocal);
        this.currentUser = JSON.parse(window.localStorage.getItem(this.userLocal));
    };
    AuthenticateService.prototype.deleteTokenLocals = function () {
        window.localStorage.removeItem(this.tokenLocal);
        window.localStorage.removeItem(this.userLocal);
    };
    AuthenticateService.prototype.storeToken = function (data) {
        if (data.success) {
            this.token = data.token;
            this.saveTokenLocals();
            this.currentUser = data.user;
            return new status_response_model_1.StatusResponse(true, "Поспех");
        }
        else {
            return new status_response_model_1.StatusResponse(false, data.message);
        }
    };
    AuthenticateService.prototype.login = function (user) {
        var _this = this;
        return this.http
            .post(this.apiUrl, JSON.stringify(user), { headers: helper_1.Helper.createHeaders() })
            .delay(2000)
            .map(function (dataR) {
            console.log(dataR);
            return _this.storeToken(status_response_model_1.StatusResponse.create(dataR.json()));
        }).catch(helper_1.Helper.handleError);
    };
    AuthenticateService.prototype.logout = function () {
        this.currentUser = null;
        this.token = "";
        this.deleteTokenLocals();
    };
    AuthenticateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticateService);
    return AuthenticateService;
}());
exports.AuthenticateService = AuthenticateService;
//# sourceMappingURL=authenticate.service.js.map