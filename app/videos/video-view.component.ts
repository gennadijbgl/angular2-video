/**
 * Created by Hienadz on 27.08.16.
 */
import {Component, OnInit, Input} from '@angular/core';
import {VideoService} from "./video.service";
import {Video} from "../models/video.model";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({

    selector: 'video-v',
    templateUrl:"app/videos/video-view.component.html",
    inputs:['_video'],

})
export class VideoViewComponent {
     _video: Video;

}