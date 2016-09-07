/**
 * Created by Hienadz on 05.09.16.
 */
import {Component, OnInit, AfterViewChecked, ViewChild} from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {AuthenticateService} from "./authenticate.service";
import {User} from "../models/user.model";
import {StatusResponse} from "../models/status-response.model";
import {NgForm} from "@angular/forms";

declare var $:any;

declare var Materialize:any;

@Component({

    templateUrl: 'app/users/user-panel.component.html',
    styleUrls:['app/users/user-panel.component.css']

})
export class UserPanelComponent implements OnInit,AfterViewChecked {

    @ViewChild(NgForm) form: NgForm;

    user:User;

    isRegistrationForm:boolean;

    isPending:boolean ;

    error:string;

    ngAfterViewChecked(){
        Materialize.updateTextFields();
    }

    initAndGetUser():User {
        if (this.authService.getCurrentUser()) return this.authService.getCurrentUser();

        if (!this.user)
            this.user = new User();

        return this.user;
    }

    constructor(private userService:UserService,
                private authService:AuthenticateService,
                private router:Router) {
    }

    onFormChange(checked:boolean){
        this.isRegistrationForm = !checked;
        this.error = "";
    }

    onBack(){
        this.router.navigate(['list']);
    }

    onLogout(){
        this.authService.logout();
        this.initAndGetUser();
    }

    onSubmit(){
        if (this.isRegistrationForm) {
            this.isPending = true;
            this.userService.createItem(this.user).subscribe((t:StatusResponse)=>{
                if(t.success){
                    this.isPending=false;
                    this.form.reset();
                }
                else {
                    this.isPending=false;
                    this.error = t.message;
                }
            });
        } else {
            this.isPending = true;
            this.authService.login(this.user).subscribe((t:StatusResponse)=>{
                if(t.success){
                    this.isPending=false;
                    this.form.reset();
                }
                else {
                    this.isPending=false;
                    this.error = t.message;
                }
            });
        }
    }

    ngOnInit() {
        this.initAndGetUser();

        this.isRegistrationForm = true;

        this.isPending = false;
    }
}