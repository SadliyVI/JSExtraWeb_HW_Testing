import { initUI } from "../src/ui.js";

describe("UI loading", () => {
  test("UI is created inside root element", () => {
    document.body.innerHTML = `<div id="root"></div>`;
    const root = document.getElementById("root");

    initUI(root);

    expect(root.querySelector(".card")).not.toBeNull();
    expect(root.querySelector("#cc-input")).not.toBeNull();
    expect(root.querySelector("#cc-check")).not.toBeNull();
  });
});
