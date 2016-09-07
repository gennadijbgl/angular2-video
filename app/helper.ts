import {Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by Hienadz on 06.09.16.
 */

export class Helper{

    public static handleError(error:Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }

    public static createHeaders():Headers{
        return new Headers({'Content-Type': 'application/json'});
    }
}