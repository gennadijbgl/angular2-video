///<reference path="video.service.ts"/>
/**
 * Created by Hienadz on 27.08.16.
 */

import {Component, OnInit, OnDestroy, trigger, state, style, transition, animate} from '@angular/core';
import {Video} from "../models/video.model";
import {VideoService} from "./video.service";
import {VideoViewComponent} from "./video-view.component";
import {VideoDetailComponent} from "./video-detail.component";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationComponent} from "../shared/pagination.component";

@Component({

    templateUrl:"app/videos/video-list.component.html",
    directives:[VideoViewComponent],
    styleUrls:['app/videos/video-list.component.css']

})
export class VideoListComponent implements OnInit {


    itemsList :Observable<Video[]>;
    itemsCount:Observable<number>= this._videoService.getItems().map(t=>t.length);

    constructor(private _videoService:VideoService,
                private _routeParams:ActivatedRoute,
                private _router:Router) {

    }

    onPageChanged(param:number[]){
        this.itemsList = this._videoService.getItems().map(t=>t.slice(param[0],param[1]));
    }



    ngOnInit() {

    }


}