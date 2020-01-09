import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LocationSearchService } from './location-search.service';

@Component({
    selector: 'bg-location-search',
    templateUrl: './location-search.component.html',
    styleUrls: ['./location-search.component.less']
})
export class LocationSearchComponent implements AfterViewInit {
    @ViewChild('searchLocation', { static: false }) input: ElementRef;
    private _valueChanges: Observable<string>;
    listOfLocations: any[];
    noResults = false;

    constructor(private _locationSearchService: LocationSearchService) {
    }

    ngAfterViewInit() {
        this._valueChanges = fromEvent<Event>(this.input.nativeElement, 'input')
            .pipe(map($event => ($event.target as HTMLInputElement).value));

        const results$ = this._valueChanges.pipe(this.searchLocations);

        results$.subscribe({
            next: (data: any) => {
                console.log(data);
                if (!data) {
                    this.listOfLocations = null;
                    this.setNoResults(false);
                } else if (data.results.docs.length) {
                    const results = data.results.docs;
                    this.listOfLocations = results;
                    this.setNoResults(false);
                } else {
                    this.setNoResults(true);
                }
            }
        })
    }

    logSelected($event: any) {
        this.listOfLocations = null;
        console.log($event);
    }

    searchLocations = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term => term.length <= 2 ? of(null) :
                this._locationSearchService.getLocations(6, term)
            )
        )

    private setNoResults(value: boolean) {
        this.noResults =  value;
    }

}
