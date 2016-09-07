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
        this.page = 1;
        this.postsPerPage = 2;
        this.numPaginator = 3;
    }
    VideoListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.pages.then(function (t) { return console.log(t); });
        //   this.subVideos.unsubscribe();
    };
    VideoListComponent.prototype.onPageNext = function () {
        if (this.canNext)
            this._router.navigate(['list', ++this.page]);
    };
    VideoListComponent.prototype.rangeVideos = function (from, to) {
        this.displayerVideos = this._videoService.getItems().map(function (t) { return t.slice(from, to); });
    };
    VideoListComponent.prototype.changePage = function (page) {
        this.page = page;
        this.initToPage();
    };
    VideoListComponent.prototype.initToPage = function () {
        var _this = this;
        var from = (this.page - 1) * this.postsPerPage;
        var to = (this.page - 1) * this.postsPerPage + this.postsPerPage;
        console.log("from = " + from + " to = " + to);
        this.rangeVideos(from, to);
        this.pages = this._videoService.getItems().toPromise().then(function (t) {
            var pages = Math.ceil(t.length / _this.postsPerPage);
            _this.canNext = _this.page < pages;
            _this.canPrev = _this.page > 1;
            console.log("pages = " + pages);
            console.log("page = " + _this.page);
            var from = _this.numPaginator * (Math.ceil(_this.page / _this.numPaginator) - 1);
            var to = _this.numPaginator * (Math.ceil(_this.page / _this.numPaginator) - 1) + _this.numPaginator;
            console.log("from = " + from + " to = " + to);
            return new Array(pages).fill().map(function (x, i) { return i + 1; })
                .slice(from, to);
        });
    };
    VideoListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._routeParams.params.subscribe(function (params) {
            if (params && params['page']) {
                _this.page = +params['page'];
            }
            _this.initToPage();
        });
        this.sourceVideos = this._videoService.getItems();
        // setTimeout(()=>{this.sourceVideos.map(t=> t.slice(1,1)).},3000);
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