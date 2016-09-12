/**
 * Created by Hienadz on 28.08.16.
 */
import {
    Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, ElementRef,
    Output, EventEmitter, OnDestroy, ViewChild
} from '@angular/core';
import {Video} from "../models/video.model";
import {VideoService} from "./video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import { FileUploadService} from "./upload.service";
import {NgForm} from "@angular/forms";

declare var Materialize:any;

@Component({

   templateUrl: 'app/videos/video-form.component.html',
    styleUrls:['app/videos/video-form.component.css']
})
export class VideoFormComponent implements OnInit,AfterViewChecked,OnDestroy{

    video:Video = <Video>{};
    file:File;

    @ViewChild(NgForm) form: NgForm;

    private sub: Subscription;
    private sub1: Subscription;

    constructor(
        private _vs:VideoService,
        private _routeParams: ActivatedRoute,
        private element: ElementRef,
        private _uplS:FileUploadService,
        private router: Router) {
    }



    ngOnInit() {
        this.sub = this._routeParams.params.subscribe(params=>{
            if(params && params['id']){
            this.sub1 = this._vs.getItemById(params['id']).subscribe(t=>this.video=t);
            }
        });
    }

    ngAfterViewChecked(){
        Materialize.updateTextFields();
    }

    ngOnDestroy(){
        if(this.sub)
            this.sub.unsubscribe();


        if(this.sub1)
            this.sub1.unsubscribe();
    }

    onBack(){
        this.router.navigate(['/list']);
    }

    imagePreview(event:any) {

        var image = this.element.nativeElement.querySelector('.responsive-img');

        this.file = event.target.files[0];
        console.log(this.file );
        if(!(event.target.files && event.target.files[0])){
            console.log(this.video.imageUrl);
            image.src = this.video.imageUrl ? this.video.imageUrl : "";
            return;
        }
        var reader = new FileReader();

        reader.onload = (e)=>  image.src = e.target.result;

        reader.readAsDataURL(event.target.files[0]);
    }

    uploadFile(file:File):Promise<string>{


        this._uplS.getObserver()
                .subscribe(progress => {
                   console.log(progress);
                });
            let result: any;
            try {

              return  this._uplS.upload("http://localhost:3000/upload", file).then(t=> {console.log(t); return t[0].path;});

            } catch (error) {
                document.write(error)
            }



    }

    processVideo(){
        if(!this.video.videoId)
        {
            let a = this._vs.createItem(this.video);
            a.subscribe(t=>
            {
                console.log(t);
                if(t.success) this.form.reset();
            });
            this.router.navigate(['/list']);

        }
        else {

            let a = this._vs.updateItem(this.video);
            a.subscribe(t=>
            {
                console.log(t);
                if(t.success) this.form.reset();
            });
            this.router.navigate(['/list']);
        }

    }
    onSubmit() {

            if(this.file)
            this.uploadFile(this.file).then(t=>
            {
                this.video.imageUrl = t;

                this.processVideo();
            });



    }

    onRemove(){
        console.log(this.video);

        let a = this._vs.deleteItem(this.video)
            .do(t=>console.log(t));
        this.router.navigate(['/list']);
    }


}