/**
 * Created by Hienadz on 27.08.16.
 */
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
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var authenticate_service_1 = require("../users/authenticate.service");
var helper_1 = require("../helper");
var VideoService = (function () {
    function VideoService(http, auth) {
        this.http = http;
        this.auth = auth;
        this.apiUrl = 'api/video';
    }
    VideoService.prototype.getItems = function () {
        return this.http.get(this.apiUrl)
            .map(function (response) { return response.json(); })
            .catch(helper_1.Helper.handleError);
    };
    VideoService.prototype.getItemById = function (id) {
        return this.http.get(this.apiUrl + "/" + id)
            .map(function (response) { return response.json(); })
            .catch(helper_1.Helper.handleError);
    };
    VideoService.prototype.updateItem = function (item) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .put(this.apiUrl + "/" + item.videoId, JSON.stringify(item), { headers: headers })
            .map(function (res) { return res.json().data; })
            .catch(helper_1.Helper.handleError);
    };
    VideoService.prototype.deleteItem = function (item) {
        return this.http
            .delete(this.apiUrl + "/" + item.videoId)
            .map(function (res) { return res.json().data; })
            .catch(helper_1.Helper.handleError);
    };
    VideoService.prototype.createItem = function (video) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post(this.apiUrl, JSON.stringify(video), { headers: headers })
            .map(function (res) { return res.json().data; })
            .catch(helper_1.Helper.handleError);
    };
    VideoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authenticate_service_1.AuthenticateService])
    ], VideoService);
    return VideoService;
}());
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map