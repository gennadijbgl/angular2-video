/**
 * Created by Hienadz on 28.08.16.
 */

import {provideRouter, RouterConfig, RouterModule, Routes}  from '@angular/router';
import {VideoListComponent} from "./videos/video-list.component";
import {VideoDetailComponent} from "./videos/video-detail.component";
import { ModuleWithProviders } from '@angular/core';
import {VideoFormComponent} from "./videos/video-form.component";
import {PageNotFoundComponent} from "./app-page404.component";
import {UserPanelComponent} from "./users/user-panel.component";

const routes:Routes =[

    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'

    },

    {
        path:'video',
        component:VideoFormComponent

    },
    {
        path:'video/:id',
        component:VideoFormComponent

    },
    {
        path:'list',
        component:VideoListComponent

    },
    {
        path:'list/:page',
        component:VideoListComponent

    },
    {
        path: 'detail/:id',
        component: VideoDetailComponent

    },
    {
        path: 'user-check',
        component:UserPanelComponent

    },
    { path: '**', component: PageNotFoundComponent }
];




export const appRouterProviders: ModuleWithProviders = RouterModule.forRoot(routes);
