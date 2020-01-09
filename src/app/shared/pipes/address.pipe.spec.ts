import { AddressPipe } from './address.pipe';

describe('AddressPipe', () => {
    let pipe: AddressPipe;

    beforeEach(() => {
        pipe = new AddressPipe();
    });

    it('should initilize filter', () => {
        expect(pipe).toBeDefined();
    });

    it('should return empty string if value doesnt exist', () => {
        const result = pipe.transform(null);

        expect(result).toBe('');
    });

    it('should correctly return address', () => {
        const address = {
            city: 'Manchester',
            region: 'North West',
            country: 'United Kingdom'
        };

        const result = pipe.transform(address);

        expect(result).toBe('Manchester, North West, United Kingdom');
    });
});
