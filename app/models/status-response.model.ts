import {User} from "./user.model";
/**
 * Created by Hienadz on 06.09.16.
 */

export class StatusResponse{

    constructor(public success: boolean, public message: string, public user?:User, public token?:string){

    }

    static create(json:any){
        return new StatusResponse(json.success,json.message,json.user,json.token)
    }
}