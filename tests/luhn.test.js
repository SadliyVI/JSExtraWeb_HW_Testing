// tests/luhn.test.js
import { luhnCheck } from "../src/validator.js";

describe("Luhn algorithm (luhnCheck)", () => {
    test("valid Visa 4111 1111 1111 1111", () => {
        expect(luhnCheck("4111 1111 1111 1111")).toBe(true);
    });

    test("invalid Visa 4111 1111 1111 1112", () => {
        expect(luhnCheck("4111 1111 1111 1112")).toBe(false);
    });

    test("valid Amex 378282246310005", () => {
        expect(luhnCheck("378282246310005")).toBe(true);
    });

    test("rejects non-digits", () => {
        expect(luhnCheck("abcd-1234")).toBe(false);
    });
});
