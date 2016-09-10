import {Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChange} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'star-rating',
    templateUrl: 'app/shared/star-rating.component.html',
    styleUrls:['app/shared/star-rating.component.css']
})
export class StarRatingComponent implements OnInit,OnChanges {
    s = '<div class="star-floating">' +
        '<i  class="material-icons" style="width: 10px;">star</i> ' +
        '<i  class="material-icons">star_border</i>' +
        '</div>';
    @Input() rating: number;
    @Output() ratingChanged = new EventEmitter<number>();

    sub:Subscription;

    ratingArr: Observable<string[]>;

    empryStar: string = 'star_border';
    halfStar: string = 'star_half';
    fullStar: string = 'star';

    constructor() {
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

        if(changes['rating']) this.calcStarRating();

    }
    onStarClicked(item: number) {
        this.ratingChanged.emit(item + 1);
    }

    calcStarRating() {
        let n: number = Math.floor(this.rating);
        let f: number = this.rating - n;

        this.ratingArr = Observable.range(0,5).map((v, i)=> {

            if ((i + 1) <= n) {
              return this.fullStar;
            }
            else if (((i + 1) == (n + 1)) && f > 0.3 && f < 0.7) {
                return  this.halfStar;
            }
            else {
                return this.empryStar;
            }

        }).toArray();
        this.ratingArr.subscribe(t=>console.log(t));
        console.log(this.rating)
    }


    ngOnInit() {

        this.calcStarRating();
    }
}