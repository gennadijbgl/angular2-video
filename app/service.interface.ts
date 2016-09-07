import {Response, Http} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by Hienadz on 05.09.16.
 */

export interface CRUDService<T>{

    apiUrl:string;
    (http:Http):void;
    getItems():Observable<T[]>;
    getItemById(id:string):Observable<T>;
    updateItem(item:T):Observable<Response>;
    deleteItem(item:T):Observable<Response>;
    createItem(item:T):Observable<Response>;

}