import { luhnCheck, detectIssuer } from '../src/validator';


// Тестовые номера — стандартные тестовые значения (могут быть взяты/проверены через FreeFormatter)
// Visa: 4111 1111 1111 1111
// MasterCard: 5555 5555 5555 4444
// Amex: 378282246310005


describe('luhnCheck', () => {
    test('валидный Visa', () => {
        expect(luhnCheck('4111 1111 1111 1111')).toBe(true);
    });
    test('невалидный номер', () => {
        expect(luhnCheck('4111 1111 1111 1112')).toBe(false);
    });
    test('валидный Amex', () => {
        expect(luhnCheck('378282246310005')).toBe(true);
    });
});


describe('detectIssuer', () => {
    test('детектит Visa', () => {
        expect(detectIssuer('4111111111111111')).toBe('visa');
    });
    test('детектит MasterCard', () => {
        expect(detectIssuer('5555555555554444')).toBe('mastercard');
    });
    test('детектит Amex', () => {
        expect(detectIssuer('378282246310005')).toBe('amex');
    });
});