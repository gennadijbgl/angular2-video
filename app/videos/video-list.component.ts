///<reference path="video.service.ts"/>
/**
 * Created by Hienadz on 27.08.16.
 */

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Video} from "../models/video.model";
import {VideoService} from "./video.service";
import {VideoViewComponent} from "./video-view.component";
import {VideoDetailComponent} from "./video-detail.component";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({

    templateUrl:"app/videos/video-list.component.html",
    directives:[VideoViewComponent]

})
export class VideoListComponent implements OnInit, OnDestroy {

    sourceVideos:Observable<Video[]>;
    displayerVideos:Observable<Video[]>;

    page:number = 1;

    pages:Promise<number[]>;

    canNext:boolean;
    canPrev:boolean;

    postsPerPage:number = 2;

    numPaginator:number = 3;

    private sub: Subscription;
    private subVideos: Subscription;

    constructor(private _videoService:VideoService,
                private _routeParams:ActivatedRoute,
                private _router:Router) {

    }

    ngOnDestroy(){
        this.sub.unsubscribe();
        this.pages.then(t=>console.log(t));
     //   this.subVideos.unsubscribe();
    }

    onPageNext(){
        if(this.canNext)
            this._router.navigate(['list',++this.page]);
    }

    rangeVideos(from:number,to:number){

        this.displayerVideos= this._videoService.getItems().map(t=>t.slice(from,to));
    }

    changePage(page:number){
        this.page = page;
        this.initToPage();
    }

    initToPage(){

        let from:number = (this.page-1) * this.postsPerPage;
        let to:number = (this.page-1) * this.postsPerPage + this.postsPerPage;


        console.log("from = "+ from+" to = "+to);

        this.rangeVideos(from,to);


        this.pages = this._videoService.getItems().toPromise().then(t=>{

            let pages:number = Math.ceil(t.length/this.postsPerPage);

            this.canNext = this.page < pages;
            this.canPrev = this.page > 1;


            console.log("pages = "+pages);
            console.log("page = "+this.page);

            let from:number = this.numPaginator*(Math.ceil(this.page/this.numPaginator)-1);
            let to:number = this.numPaginator*(Math.ceil(this.page/this.numPaginator)-1)+this.numPaginator;

            console.log("from = "+ from+" to = "+to);

            return new Array(pages).fill().map((x: any, i: number)=>i + 1)
                .slice(from, to);
        });




    }

    ngOnInit() {
        this.sub = this._routeParams.params.subscribe(params=>{
            if(params && params['page']){
                this.page=+params['page'];
            }
            this.initToPage();
        });

        this.sourceVideos = this._videoService.getItems();
        // setTimeout(()=>{this.sourceVideos.map(t=> t.slice(1,1)).},3000);


    }


}