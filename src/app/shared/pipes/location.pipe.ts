import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'location'
})
export class LocationPipe implements PipeTransform {

    transform(value: any): string {
        if (!value) {
            return '';
        }

        let location: string;

        switch (value) {
            case 'A':
                location = 'Airport';
                break;
            case 'C':
                location = 'City';
                break;
            case 'T': 
                location = 'Train';
                break;
        }

        return location;
    }
}
