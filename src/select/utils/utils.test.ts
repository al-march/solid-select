import { isArray, isObject } from './utils';

describe('utils', () => {
    describe('isObject', () => {
        test('should returns true is object', () => {
            expect(isObject({})).toBeTruthy();
        });
        test('should returns false with other type', () => {
            const types = ['', 0, 'str', 12, [1, 2], NaN, null, undefined];
            types.forEach(type => expect(isObject(type)).toBeFalsy());
        });
    });
    describe('isArray', () => {
        test('should returns true is array', () => {
            expect(isArray([])).toBeTruthy();
            const arr = {length: 12};
            expect(isArray(arr)).toBeFalsy();
        });
        test('should returns false with other type', () => {
            const types = ['', 0, 'str', 12, {length: 2}, NaN, null, undefined];
            types.forEach(type => expect(isArray(type)).toBeFalsy());
        });
    });
});
