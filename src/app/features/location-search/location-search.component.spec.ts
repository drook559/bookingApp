
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';

import { LocationSearchComponent } from './location-search.component';
import { LocationSearchService } from './location-search.service';

import { AddressPipe } from 'src/app/shared/pipes/address.pipe';
import { LocationPipe } from 'src/app/shared/pipes/location.pipe';
import { of } from 'rxjs';

const mockLocationSearchService = jasmine.createSpyObj('LocationSearchService', ['getLocations']);

const testResponse = {
    city: 'Manchester'
}

describe('LocationSearchComponent', () => {
    let component: LocationSearchComponent;
    let fixture: ComponentFixture<LocationSearchComponent>;

    const getLocationsSpy = mockLocationSearchService.getLocations;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                LocationSearchComponent,
                AddressPipe,
                LocationPipe,
            ],
            providers: [
                { provide: LocationSearchService, useValue: mockLocationSearchService }
            ]
        });
    });

    beforeAll(() => {
        fixture = TestBed.createComponent(LocationSearchComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set no results to false', () => {
        expect(component.noResults).toBeFalsy();
    });

    describe('logSelected', () => {
        it('should set listOfLocations to null', () => {
            component.listOfLocations = [testResponse];

            component.logSelected(testResponse);

            expect(component.listOfLocations).toBeNull();
        });
    });

    describe('searchLocations', () => {

        beforeEach(() => {
            getLocationsSpy.calls.reset();
        });

        it('should correctly return an observable', () => {
            const obs = component.searchLocations(of(''));

            expect(obs).toBeDefined();
        });
        describe('when the location is returned', () => {
            beforeEach(() => {
                getLocationsSpy.and.returnValue(of([testResponse]));
            });

            it('should correctly call the getLocationsService', () => {
                const obs = component.searchLocations(of('Hello'));

                obs.subscribe((result: any[]) => {
                    expect(result.length).toBe(1);
                    expect(getLocationsSpy).toHaveBeenCalled();
                });
            });
        });

        describe('when no locations are returned', () => {
            beforeEach(() => {
                getLocationsSpy.and.returnValue(of([]));
            });

            it('should not call the getLocationsService if text is less than 2', () => {
                const obs = component.searchLocations(of('He'));

                obs.subscribe((result: any[]) => {
                    expect(result).toBeNull();
                    expect(getLocationsSpy).not.toHaveBeenCalled();
                });
            });
        });
    });

    // ADDITIONAL TESTING REQUIRED FOR THE NGAFTERVIEWINIT COMPONENT
    // REQUIRES TESTING OF THE COMPONENT AND ITS HIS HTML RATHER THAN JUST UNIT TESTING THE CLASS.
});
