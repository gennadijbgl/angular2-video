/**
 * Created by Hienadz on 28.08.16.
 */
"use strict";
var router_1 = require('@angular/router');
var video_list_component_1 = require("./videos/video-list.component");
var video_detail_component_1 = require("./videos/video-detail.component");
var video_form_component_1 = require("./videos/video-form.component");
var app_page404_component_1 = require("./app-page404.component");
var user_panel_component_1 = require("./users/user-panel.component");
var routes = [
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {
        path: 'video',
        component: video_form_component_1.VideoFormComponent
    },
    {
        path: 'video/:id',
        component: video_form_component_1.VideoFormComponent
    },
    {
        path: 'list',
        component: video_list_component_1.VideoListComponent
    },
    {
        path: 'list/:page',
        component: video_list_component_1.VideoListComponent
    },
    {
        path: 'detail/:id',
        component: video_detail_component_1.VideoDetailComponent
    },
    {
        path: 'user-check',
        component: user_panel_component_1.UserPanelComponent
    },
    { path: '**', component: app_page404_component_1.PageNotFoundComponent }
];
exports.appRouterProviders = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map