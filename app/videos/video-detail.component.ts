/**
 * Created by Hienadz on 28.08.16.
 */
import {Component, OnInit, AfterViewChecked, OnDestroy, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "./video.service";
import {Video} from "../models/video.model";
import {Subscription, Observable} from "rxjs";


 declare var $:any;

@Component({

    styleUrls:['app/videos/video-detail.component.css'],
    templateUrl: 'app/videos/video-detail.component.html'
})
export class VideoDetailComponent implements OnInit ,OnDestroy{

    video:Video;

    private sub: Subscription;
    private sub1: Subscription;

    ngOnInit() {
        this.sub = this._routeParams.params.subscribe(params=>{
            if(params && params['id']){
                this.sub1 =  this._vs.getItemById(params['id'])
                    .subscribe(t=>this.video = t,e=>{},()=>setTimeout(()=>$('.materialboxed').materialbox(),200));
            }
        });

    }

    onRatingChanged(rating:number){
        if(this.video.starRating!=0){
            this.video.starRating += rating;
            this.video.starRating /= 2;
        }
        else this.video.starRating = rating;

        this.video.starRating = +this.video.starRating.toFixed(2);

        this._vs.updateItem(this.video);
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    }

    onBack(){
        this.router.navigate(['/list']);
    }


    constructor(private _routeParams: ActivatedRoute,
                private _vs:VideoService,
                private router: Router) {

    }


}