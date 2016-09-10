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
var rxjs_1 = require("rxjs");
var StarRatingComponent = (function () {
    function StarRatingComponent() {
        this.s = '<div class="star-floating">' +
            '<i  class="material-icons" style="width: 10px;">star</i> ' +
            '<i  class="material-icons">star_border</i>' +
            '</div>';
        this.ratingChanged = new core_1.EventEmitter();
        this.empryStar = 'star_border';
        this.halfStar = 'star_half';
        this.fullStar = 'star';
    }
    StarRatingComponent.prototype.ngOnChanges = function (changes) {
        if (changes['rating'])
            this.calcStarRating();
    };
    StarRatingComponent.prototype.onStarClicked = function (item) {
        this.ratingChanged.emit(item + 1);
    };
    StarRatingComponent.prototype.calcStarRating = function () {
        var _this = this;
        var n = Math.floor(this.rating);
        var f = this.rating - n;
        this.ratingArr = rxjs_1.Observable.range(0, 5).map(function (v, i) {
            if ((i + 1) <= n) {
                return _this.fullStar;
            }
            else if (((i + 1) == (n + 1)) && f > 0.3 && f < 0.7) {
                return _this.halfStar;
            }
            else {
                return _this.empryStar;
            }
        }).toArray();
        this.ratingArr.subscribe(function (t) { return console.log(t); });
        console.log(this.rating);
    };
    StarRatingComponent.prototype.ngOnInit = function () {
        this.calcStarRating();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], StarRatingComponent.prototype, "rating", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StarRatingComponent.prototype, "ratingChanged", void 0);
    StarRatingComponent = __decorate([
        core_1.Component({
            selector: 'star-rating',
            templateUrl: 'app/shared/star-rating.component.html',
            styleUrls: ['app/shared/star-rating.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], StarRatingComponent);
    return StarRatingComponent;
}());
exports.StarRatingComponent = StarRatingComponent;
//# sourceMappingURL=star-rating.component.js.map