/**
 * Created by Hienadz on 06.09.16.
 */
import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Headers, Response, Http} from "@angular/http";
import {User} from "../models/user.model";
import {Helper} from "../helper";
import {StatusResponse} from "../models/status-response.model";



@Injectable()
export class AuthenticateService implements OnInit{

    private tokenLocal :string = "VideoTokenByHB";
    private userLocal :string = "VideoUserByHB";

    private apiUrl : string = 'api/authentication';

    private currentUser : User;

    private token:string;


    constructor(private http:Http) { }

    ngOnInit():void{
        this.loadTokenLocals();
    }

    getCurrentUser():User{
        return this.currentUser;
    }

    isLogged():boolean{
        return this.currentUser ? true : false;
    }

    processHeaders(headers:Headers):Headers{
        if(this.token)
            headers.append('x-access-token',this.token);
        return headers;
    }

    saveTokenLocals():void{
        window.localStorage.setItem(this.tokenLocal, this.token);
        window.localStorage.setItem(this.userLocal, JSON.stringify(this.currentUser));
    }

    loadTokenLocals():void{
        this.token = window.localStorage.getItem(this.tokenLocal);
        this.currentUser = JSON.parse(window.localStorage.getItem(this.userLocal));
    }

    deleteTokenLocals():void{
        window.localStorage.removeItem(this.tokenLocal);
        window.localStorage.removeItem(this.userLocal);
    }

    storeToken(data:StatusResponse):StatusResponse{

        if(data.success){
            this.token = data.token;
            this.saveTokenLocals();
            this.currentUser = data.user;
            return new StatusResponse(true,"Поспех");
        }
        else {
            return new StatusResponse(false,data.message);
        }
    }

    login(user:User):Observable<StatusResponse>{

        return this.http
            .post(this.apiUrl, JSON.stringify(user), {headers: Helper.createHeaders()})
            .delay(2000)
            .map((dataR:Response)=>{
                console.log(dataR);

                return this.storeToken(StatusResponse.create(dataR.json()))

            }).catch(Helper.handleError);
    }

    logout():void{
        this.currentUser = null;
        this.token = "";
        this.deleteTokenLocals();
    }








}