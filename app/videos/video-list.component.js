///<reference path="video.service.ts"/>
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
var video_service_1 = require("./video.service");
var video_view_component_1 = require("./video-view.component");
var router_1 = require("@angular/router");
var VideoListComponent = (function () {
    function VideoListComponent(_videoService, _routeParams, _router) {
        this._videoService = _videoService;
        this._routeParams = _routeParams;
        this._router = _router;
        this.itemsCount = this._videoService.getItems().map(function (t) { return t.length; });
    }
    VideoListComponent.prototype.onPageChanged = function (param) {
        this.itemsList = this._videoService.getItems().map(function (t) { return t.slice(param[0], param[1]); });
    };
    VideoListComponent.prototype.ngOnInit = function () {
    };
    VideoListComponent = __decorate([
        core_1.Component({
            templateUrl: "app/videos/video-list.component.html",
            directives: [video_view_component_1.VideoViewComponent]
        }), 
        __metadata('design:paramtypes', [video_service_1.VideoService, router_1.ActivatedRoute, router_1.Router])
    ], VideoListComponent);
    return VideoListComponent;
}());
exports.VideoListComponent = VideoListComponent;
//# sourceMappingURL=video-list.component.js.map