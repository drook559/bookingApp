import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'address'
})
export class AddressPipe implements PipeTransform {

    transform(value: any): string {
        if (!value) {
            return '';
        }

        const address = {
            city: value.city,
            region: value.region,
            country: value.country
        };
        const selected = [];
        let displayLabel = '';

        for (const line in address) {
            if (!value.hasOwnProperty(line)) {
                continue;
            }

            if (address[line] !== '' && address[line] !== undefined) {
                selected.push(address[line]);
            }
        }

        selected.forEach((select: any, $index: number) => {
            displayLabel = displayLabel + select;

            if ($index !== (selected.length - 1)) {
                displayLabel = displayLabel + ', ';
            }
        });

        return  displayLabel;
    }
}
