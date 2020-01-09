import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class LocationSearchService {
    private endpoints = environment.endpoints;

    constructor(private _httpClient: HttpClient) {
    }

    getLocations(numberOfResults: number, term: string) : Observable<any> {
        if (!numberOfResults || !term) {
            return throwError('No parameters provided.');
        }

        return this._httpClient.get(`${this.endpoints.rentalCars}FTSAutocomplete.do?solrIndex=fts_en&solrRows=${numberOfResults}&solrTerm=${term}`);
    }
}
