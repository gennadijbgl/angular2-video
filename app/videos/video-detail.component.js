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
 * Created by Hienadz on 28.08.16.
 */
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var video_service_1 = require("./video.service");
var VideoDetailComponent = (function () {
    function VideoDetailComponent(_routeParams, _vs, router) {
        this._routeParams = _routeParams;
        this._vs = _vs;
        this.router = router;
    }
    VideoDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._routeParams.params.subscribe(function (params) {
            if (params && params['id']) {
                _this.sub1 = _this._vs.getItemById(params['id'])
                    .subscribe(function (t) { return _this.video = t; }, function (e) { }, function () { return setTimeout(function () { return $('.materialboxed').materialbox(); }, 200); });
            }
        });
    };
    VideoDetailComponent.prototype.onRatingChanged = function (rating) {
        if (this.video.starRating != 0) {
            this.video.starRating += rating;
            this.video.starRating /= 2;
        }
        else
            this.video.starRating = rating;
        this.video.starRating = +this.video.starRating.toFixed(2);
        this._vs.updateItem(this.video);
    };
    VideoDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    };
    VideoDetailComponent.prototype.onBack = function () {
        this.router.navigate(['/list']);
    };
    VideoDetailComponent = __decorate([
        core_1.Component({
            styleUrls: ['app/videos/video-detail.component.css'],
            templateUrl: 'app/videos/video-detail.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, video_service_1.VideoService, router_1.Router])
    ], VideoDetailComponent);
    return VideoDetailComponent;
}());
exports.VideoDetailComponent = VideoDetailComponent;
//# sourceMappingURL=video-detail.component.js.map