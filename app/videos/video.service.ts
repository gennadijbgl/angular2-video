/**
 * Created by Hienadz on 27.08.16.
 */

import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Video} from "../models/video.model";
import {Observable} from "rxjs";
import {handle, handleError} from "typings/dist/support/cli";
import {CRUDService} from "../service.interface";
import {AuthenticateService} from "../users/authenticate.service";
import {Helper} from "../helper";
import {StatusResponse} from "../models/status-response.model";


@Injectable()
export class VideoService {

    private apiUrl : string = 'api/video';

    constructor(private http:Http,
                private auth:AuthenticateService) { }


    getItems() : Observable<Video[]>
    {
        return this.http.get(this.apiUrl)
            .map((response:Response) => <Video[]>response.json())
            .catch(Helper.handleError);
    }

    getItemById(id:string):Observable<Video>
    {
       return this.http.get(this.apiUrl+"/"+id)
            .map((response:Response) => <Video>response.json())
            .catch(Helper.handleError);
    }

    updateItem(item:Video):Observable<StatusResponse>
    {


        return this.http
            .put(this.apiUrl+"/"+item.videoId, JSON.stringify(item), {headers: new Headers({'Content-Type': 'application/json'})})
            .map(res =>{console.log(res);return StatusResponse.create(res.json())})
            .catch(Helper.handleError);
    }

    deleteItem(item:Video):Observable<Response>
    {
        return this.http
            .delete(this.apiUrl+"/"+item.videoId)
            .map(res => res.json().data)
            .catch(Helper.handleError);
    }


     createItem(video: Video): Observable<StatusResponse>
     {


        return this.http
            .post(this.apiUrl, JSON.stringify(video), {headers: Helper.createHeaders()})
            .map(res => StatusResponse.create(res.json()))
            .catch(Helper.handleError);
    }

}