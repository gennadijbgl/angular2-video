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
var video_service_1 = require("./video.service");
var router_1 = require("@angular/router");
var upload_service_1 = require("./upload.service");
var VideoFormComponent = (function () {
    function VideoFormComponent(_vs, _routeParams, element, _uplS, router) {
        this._vs = _vs;
        this._routeParams = _routeParams;
        this.element = element;
        this._uplS = _uplS;
        this.router = router;
        this.video = {};
    }
    VideoFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._routeParams.params.subscribe(function (params) {
            if (params && params['id']) {
                _this.sub1 = _this._vs.getItemById(params['id']).subscribe(function (t) { return _this.video = t; });
            }
        });
    };
    VideoFormComponent.prototype.ngAfterViewChecked = function () {
        Materialize.updateTextFields();
    };
    VideoFormComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    };
    VideoFormComponent.prototype.onBack = function () {
        this.router.navigate(['/list']);
    };
    VideoFormComponent.prototype.imagePreview = function (event) {
        var image = this.element.nativeElement.querySelector('.responsive-img');
        this.file = event.target.files[0];
        console.log(this.file);
        if (!(event.target.files && event.target.files[0])) {
            console.log(this.video.imageUrl);
            image.src = this.video.imageUrl ? this.video.imageUrl : "";
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) { return image.src = e.target.result; };
        reader.readAsDataURL(event.target.files[0]);
    };
    VideoFormComponent.prototype.uploadFile = function (file) {
        this._uplS.getObserver()
            .subscribe(function (progress) {
            console.log(progress);
        });
        var result;
        try {
            return this._uplS.upload("http://localhost:3000/upload", file).then(function (t) { console.log(t); return t[0].path; });
        }
        catch (error) {
            document.write(error);
        }
    };
    VideoFormComponent.prototype.processVideo = function () {
        if (!this.video.videoId) {
            var a = this._vs.createItem(this.video);
            a.then(function (t) {
                console.log(t);
            });
            this.router.navigate(['/list']);
        }
        else {
            var a = this._vs.updateItem(this.video);
            a.then(function (t) {
                console.log(t);
            });
            this.router.navigate(['/list']);
        }
    };
    VideoFormComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.file)
            this.uploadFile(this.file).then(function (t) {
                _this.video.imageUrl = t;
                _this.processVideo();
            });
    };
    VideoFormComponent.prototype.onRemove = function () {
        console.log(this.video);
        var a = this._vs.deleteItem(this.video);
        a.then(function (t) {
            console.log(t);
        });
        this.router.navigate(['/list']);
    };
    VideoFormComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/videos/video-form.component.html',
            styleUrls: ['app/videos/video-form.component.css']
        }), 
        __metadata('design:paramtypes', [video_service_1.VideoService, router_1.ActivatedRoute, core_1.ElementRef, upload_service_1.FileUploadService, router_1.Router])
    ], VideoFormComponent);
    return VideoFormComponent;
}());
exports.VideoFormComponent = VideoFormComponent;
//# sourceMappingURL=video-form.component.js.map