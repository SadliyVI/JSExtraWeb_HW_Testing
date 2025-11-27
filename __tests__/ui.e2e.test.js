import { initUI } from "../src/ui.js";

describe("UI E2E tests", () => {
    let input, button, result, root;

    beforeEach(() => {
        document.body.innerHTML = `<div id="root"></div>`;
        root = document.getElementById("root");

        initUI(root);

        input = root.querySelector("#cc-input");
        button = root.querySelector("#cc-check");
        result = root.querySelector("#result");
    });

    test("BIN highlight updates icons", () => {
        input.value = "4111";   // Виза BIN
        input.dispatchEvent(new Event("input"));

        const iconVisa = root.querySelector("#icon-visa");
        expect(iconVisa.classList.contains("active")).toBe(true);
    });

    test("Valid card: shows success", () => {
        input.value = "4111 1111 1111 1111";
        button.click();

        expect(result.classList.contains("good")).toBe(true);
        expect(result.textContent).toContain("Валиден");
        expect(result.textContent).toContain("VISA");
    });

    test("Invalid card: shows error", () => {
        input.value = "9999 9999 9999 9999";
        button.click();

        expect(result.classList.contains("bad")).toBe(true);
        expect(result.textContent).toContain("Неверный номер");
    });

    test("Empty input → shows validation message", () => {
        input.value = "";
        button.click();

        expect(result.textContent).toBe("Введите номер карты");
    });
});
