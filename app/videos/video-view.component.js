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
 * Created by Hienadz on 27.08.16.
 */
var core_1 = require('@angular/core');
var VideoViewComponent = (function () {
    function VideoViewComponent() {
    }
    VideoViewComponent = __decorate([
        core_1.Component({
            selector: 'video-v',
            templateUrl: "app/videos/video-view.component.html",
            inputs: ['_video'],
        }), 
        __metadata('design:paramtypes', [])
    ], VideoViewComponent);
    return VideoViewComponent;
}());
exports.VideoViewComponent = VideoViewComponent;
//# sourceMappingURL=video-view.component.js.map