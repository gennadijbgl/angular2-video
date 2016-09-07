/**
 * Created by Hienadz on 05.09.16.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {CRUDService} from "../service.interface";
import {User} from "../models/user.model";
import {AuthenticateService} from "./authenticate.service";
import {Helper} from "../helper";
import {StatusResponse} from "../models/status-response.model";

@Injectable()
export class UserService {

    private apiUrl : string = 'api/user';

    constructor(private http:Http,
                private auth:AuthenticateService) {
    }

    getItems(): Observable<User[]>
    {
        return this.http.get(this.apiUrl)
            .map((response:Response) => <User[]>response.json())
            .catch(Helper.handleError);
    }


     createItem(item: User): Observable<StatusResponse> {
        return this.http
            .post(this.apiUrl, JSON.stringify(item), {headers: Helper.createHeaders()})
            .delay(2000)
            .map((t:Response)=>  StatusResponse.create(t.json()))
            .do((t:StatusResponse)=> this.auth.storeToken(t))
            .catch(Helper.handleError);
    }



}