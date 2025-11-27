import {
  luhnCheck,
  detectIssuer,
  detectIssuerByBIN,
} from "../src/validator.js";

describe("Validator: Luhn algorithm", () => {
  test("Valid Visa card", () => {
    expect(luhnCheck("4111 1111 1111 1111")).toBe(true);
  });

  test("Invalid card number", () => {
    expect(luhnCheck("9999 9999 9999 9999")).toBe(false);
  });
});

describe("Validator: detectIssuer()", () => {
  test("Visa", () => {
    expect(detectIssuer("4111111111111111")).toBe("visa");
  });

  test("MasterCard", () => {
    expect(detectIssuer("5555555555554444")).toBe("mastercard");
  });

  test("MIR", () => {
    expect(detectIssuer("2200123456789010")).toBe("mir");
  });

  test("Amex", () => {
    expect(detectIssuer("371449635398431")).toBe("amex");
  });

  test("Unknown", () => {
    expect(detectIssuer("9999999999999999")).toBe("unknown");
  });
});

describe("Validator: detectIssuerByBIN()", () => {
  test("Visa BIN", () => {
    expect(detectIssuerByBIN("412345")).toBe("visa");
  });

  test("MIR BIN", () => {
    expect(detectIssuerByBIN("2203")).toBe("mir");
  });

  test("MasterCard BIN", () => {
    expect(detectIssuerByBIN("5234")).toBe("mastercard");
  });

  test("Unknown BIN", () => {
    expect(detectIssuerByBIN("9999")).toBe("unknown");
  });
});
