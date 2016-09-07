

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {appRouterProviders} from "./app.routes";
import {AppModule} from "./app.module";
import {Observable} from "rxjs";



platformBrowserDynamic().bootstrapModule(AppModule,[appRouterProviders]);

const obsv = new Observable( observer => {
    setTimeout( ( ) => {
        observer. next( 1) ;
    }, 1000) ;
    setTimeout( ( ) => {
        observer. next( "s") ;
    }, 2000) ;
    setTimeout( ( ) => {
        observer. next( 3) ;
    }, 3000) ;
    setTimeout( ( ) => {
        observer. next( 4) ;
    }, 1000) ;
}) ;
// Subscription A
setTimeout( ( ) => {
    obsv. subscribe( value => console. log( value) ) ;
}, 0) ;
// Subscription B
setTimeout( ( ) => {
    obsv. subscribe( value => console. log( ` >>>> ${value}` ) ) ;
}, 2500) ;

