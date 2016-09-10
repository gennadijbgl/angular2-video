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
 * Created by Hienadz on 29.08.16.
 */
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var app_routes_1 = require("./app.routes");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var video_service_1 = require("./videos/video.service");
var video_form_component_1 = require("./videos/video-form.component");
var video_detail_component_1 = require("./videos/video-detail.component");
var video_list_component_1 = require("./videos/video-list.component");
require('rxjs/add/operator/filter');
var upload_service_1 = require("./videos/upload.service");
var app_nav_component_1 = require("./app-nav.component");
var user_service_1 = require("./users/user.service");
var app_page404_component_1 = require("./app-page404.component");
var user_panel_component_1 = require("./users/user-panel.component");
var authenticate_service_1 = require("./users/authenticate.service");
var pagination_component_1 = require("./shared/pagination.component");
var star_rating_component_1 = require("./shared/star-rating.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent, app_page404_component_1.PageNotFoundComponent,
                user_panel_component_1.UserPanelComponent, video_list_component_1.VideoListComponent,
                pagination_component_1.PaginationComponent, star_rating_component_1.StarRatingComponent,
                video_detail_component_1.VideoDetailComponent, video_form_component_1.VideoFormComponent,
                app_nav_component_1.AppNavigationComponent
            ],
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule, forms_1.FormsModule, http_1.HttpModule, app_routes_1.appRouterProviders],
            bootstrap: [app_component_1.AppComponent],
            providers: [user_service_1.UserService, authenticate_service_1.AuthenticateService, video_service_1.VideoService, upload_service_1.FileUploadService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map