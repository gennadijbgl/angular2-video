/**
 * Created by Hienadz on 02.09.16.
 */
import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({

    selector: 'pagination',
    templateUrl: 'app/shared/pagination.component.html',
    inputs:['itemsCount'],
    outputs:['changePage']
})
export class PaginationComponent implements OnInit, OnDestroy {

    page:number;
    itemsCount:Observable<number>;
    pages:Observable<number[]>;

    postsPerPage:number = 2;
    pagesPerZone:number = 3;

    private sub: Subscription;
    private sub1: Subscription;

    canNext:boolean;
    canPrev:boolean;
    pagePrev:number;
    pageNext:number;

    changePage:EventEmitter<number[]> = new EventEmitter<number[]>();

    constructor(private _routeParams:ActivatedRoute,
                private _router:Router) {
    }


    selectPage(page:number){
        this.page = page;
        this.init();
    }

    init(){

        this.initItems();

        this.sub1 = this.itemsCount.subscribe(t=>this.initPagination(t));

    }

    initItems(){

        let itemsFrom: number = this.postsPerPage * (this.page - 1);
        let itemsTo: number = this.postsPerPage * this.page;

        this.changePage.emit([itemsFrom, itemsTo]);
    }

    initPagination(itemsC:number){

        let pages:number = Math.ceil(itemsC/this.postsPerPage);

        let paginationPage = Math.ceil(this.page/this.pagesPerZone);

        let from:number = this.pagesPerZone*(paginationPage-1);
        let to:number = this.pagesPerZone*(paginationPage);

        this.canPrev = this.page>1;
        this.canNext = this.page<pages;
        this.pagePrev = this.page-1>0?this.page-1:1;
        this.pageNext = this.page+1<=pages?this.page+1:pages;

        this.pages = Observable.range(1,pages).toArray();
    }



    ngOnDestroy(){
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
    }

    ngOnInit() {
        this.sub = this._routeParams.params.subscribe(params=>{
            if(params && params['page']){
                this.page=+params['page'];
            }
            else {
                this.page = 1;
            }
            this.init();
        },e=>{},()=>{});
    }

}