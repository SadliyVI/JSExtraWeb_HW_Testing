// tests/detector.test.js
import { detectIssuer } from "../src/validator.js";

describe("Issuer detection (detectIssuer)", () => {
    test("detects visa", () => {
        expect(detectIssuer("4111111111111111")).toBe("visa");
    });

    test("detects mastercard (51...)", () => {
        expect(detectIssuer("5555555555554444")).toBe("mastercard");
    });

    test("detects amex", () => {
        expect(detectIssuer("378282246310005")).toBe("amex");
    });

    test("unknown for malformed", () => {
        expect(detectIssuer("12345")).toBe("unknown");
    });
});
