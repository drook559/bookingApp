import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { LocationSearchService } from './location-search.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

const testResponse = {
    city: 'Manchester'
}

describe('LocationSearchService', () => {
    let locationSearchService: LocationSearchService;
    let httpMock: HttpTestingController;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LocationSearchService,
            ]
        });

        locationSearchService = TestBed.get(LocationSearchService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(locationSearchService).toBeTruthy();
    });

    it('should getLocations and return 200', () => {
        locationSearchService.getLocations(6, 'Manchester').subscribe(res => {
            expect(res).toEqual({ testResponse });
        });

        const request = httpMock.expectOne(`${environment.endpoints.rentalCars}FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=Manchester`);
        request.flush({ testResponse });

        httpMock.verify();

        expect(request.request.method).toBe('GET');
    });
    describe('Error state', () => {
        it('should getLocations and return 500', () => {
            const error = 'ERROR';

            locationSearchService.getLocations(6, 'Manchester').subscribe(
                () => { },
                errors => {
                    expect(errors.statusText).toBe(error);
                    expect(errors.status).toBe(500);
                }
            );

            const request = httpMock.expectOne(`${environment.endpoints.rentalCars}FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=Manchester`);
            request.error(new ErrorEvent(error), { headers: null, status: 500, statusText: error });

            httpMock.verify();

            expect(request.request.method).toBe('GET');
        });
        it('should throw an error if a null parameter is passed', () => {
            locationSearchService.getLocations(null, null).subscribe(
                () => { },
                errors => {
                    expect(errors).toBe('No parameters provided.');
                }
            );
        });
    });
});
