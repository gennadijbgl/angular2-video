/**
 * Created by Hienadz on 29.08.16.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';

import { AppComponent }  from './app.component';
import {appRouterProviders} from "./app.routes";
import {HttpModule } from "@angular/http";
import {RouterModule } from "@angular/router";
import {VideoService} from "./videos/video.service";
import {VideoFormComponent} from "./videos/video-form.component";
import {VideoDetailComponent} from "./videos/video-detail.component";
import {VideoListComponent} from "./videos/video-list.component";
import 'rxjs/add/operator/filter';
import {FileUploadService} from "./videos/upload.service";
import {AppNavigationComponent} from "./app-nav.component";
import {UserService} from "./users/user.service";
import {PageNotFoundComponent} from "./app-page404.component";
import {UserPanelComponent} from "./users/user-panel.component";
import {AuthenticateService} from "./users/authenticate.service";
import {PaginationComponent} from "./shared/pagination.component";
import {StarRatingComponent} from "./shared/star-rating.component";

@NgModule({
    declarations:
        [
            AppComponent, PageNotFoundComponent,
            UserPanelComponent,VideoListComponent,
            PaginationComponent, StarRatingComponent,
            VideoDetailComponent, VideoFormComponent,
            AppNavigationComponent

        ],
    imports:      [BrowserModule, RouterModule, FormsModule, HttpModule, appRouterProviders],
    bootstrap:    [AppComponent],
    providers:    [UserService,AuthenticateService,VideoService,FileUploadService]
})
export class AppModule { }