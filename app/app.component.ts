
import {Component, OnInit, AfterViewInit} from "@angular/core";
import {AuthenticateService} from "./users/authenticate.service";
 declare var $:any;
@Component({

    selector: 'pm-app',
    templateUrl:"app/app.component.html",
    styleUrls:["app/app.component.css"],

})



export class AppComponent implements AfterViewInit{

    isComplete:boolean = true;
    progress:number = 0;

    onProgress(progress:number){
        this.progress = progress;
        this.isComplete = progress > 100;
    }

    constructor(private authService:AuthenticateService){

    }

    getUser(){
        return this.authService.getCurrentUser();
    }

    ngAfterViewInit(){
        $('.button-collapse').sideNav({
                closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );

    }

    test(){

        $('#profile-btn').sideNav('show');
        // Hide sideNav
       // $('.button-collapse').sideNav('hide');
    }

    onNotife(i:number){
        this.onProgress(i);
        alert(i);
    }

}

