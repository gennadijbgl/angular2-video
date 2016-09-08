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
 * Created by Hienadz on 02.09.16.
 */
var core_1 = require('@angular/core');
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var PaginationComponent = (function () {
    function PaginationComponent(_routeParams, _router) {
        this._routeParams = _routeParams;
        this._router = _router;
        this.postsPerPage = 2;
        this.pagesPerZone = 3;
        this.changePage = new core_1.EventEmitter();
    }
    PaginationComponent.prototype.selectPage = function (page) {
        this.page = page;
        this.init();
    };
    PaginationComponent.prototype.init = function () {
        var _this = this;
        this.initItems();
        this.sub1 = this.itemsCount.subscribe(function (t) { return _this.initPagination(t); });
    };
    PaginationComponent.prototype.initItems = function () {
        var itemsFrom = this.postsPerPage * (this.page - 1);
        var itemsTo = this.postsPerPage * this.page;
        this.changePage.emit([itemsFrom, itemsTo]);
    };
    PaginationComponent.prototype.initPagination = function (itemsC) {
        var pages = Math.ceil(itemsC / this.postsPerPage);
        var paginationPage = Math.ceil(this.page / this.pagesPerZone);
        var from = this.pagesPerZone * (paginationPage - 1);
        var to = this.pagesPerZone * (paginationPage);
        this.canPrev = this.page > 1;
        this.canNext = this.page < pages;
        this.pagePrev = this.page - 1 > 0 ? this.page - 1 : 1;
        this.pageNext = this.page + 1 <= pages ? this.page + 1 : pages;
        this.pages = rxjs_1.Observable.range(1, pages).toArray();
    };
    PaginationComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    };
    PaginationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._routeParams.params.subscribe(function (params) {
            if (params && params['page']) {
                _this.page = +params['page'];
            }
            else {
                _this.page = 1;
            }
            _this.init();
        }, function (e) { }, function () { });
    };
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'pagination',
            templateUrl: 'app/shared/pagination.component.html',
            inputs: ['itemsCount'],
            outputs: ['changePage']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map