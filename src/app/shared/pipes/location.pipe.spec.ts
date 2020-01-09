import { LocationPipe } from './location.pipe';

describe('LocationPipe', () => {
    let pipe: LocationPipe;

    beforeEach(() => {
        pipe = new LocationPipe();
    });

    it('should initilize filter', () => {
        expect(pipe).toBeDefined();
    });

    it('should return empty string if value doesnt exist', () => {
        const result = pipe.transform(null);

        expect(result).toBe('');
    });

    it('should correctly return location', () => {
        const result = pipe.transform('A');

        expect(result).toBe('Airport');
    });
});
