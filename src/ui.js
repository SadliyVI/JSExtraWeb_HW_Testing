import { luhnCheck, detectIssuer, detectIssuerByBIN } from "./validator.js";
import "./styles.css";

export function initUI(rootEl) {
  if (rootEl.querySelector(".card")) return;

  const container = document.createElement("div");
  container.className = "card";

  container.innerHTML = `
<div class="title">Credit Card Validator</div>
<div class="icons" id="icons-row">
<img src="./assets/icons/mir.svg" class="icon" id="icon-mir" alt="mir" />
<img src="./assets/icons/visa.svg" class="icon" id="icon-visa" alt="visa" />
<img src="./assets/icons/mastercard.svg" class="icon" id="icon-mastercard" alt="mastercard" />
<img src="./assets/icons/discover.svg" class="icon" id="icon-discover" alt="discover" />
<img src="./assets/icons/maestro.svg" class="icon" id="icon-maestro" alt="maestro" />
<img src="./assets/icons/amex.svg" class="icon" id="icon-amex" alt="amex" />
</div>
<div class="input-row">
<input id="cc-input" class="input" placeholder="Номер карты" />
<button id="cc-check">Проверить</button>
</div>
<small>Введите номер карты (пробелы допускаются)</small>
<div class="result" id="result"></div>
`;

  rootEl.appendChild(container);

  const input = container.querySelector("#cc-input");
  const btn = container.querySelector("#cc-check");
  const result = container.querySelector("#result");

  function updateIcons(issuer) {
    ["mir", "visa", "mastercard", "discover", "maestro", "amex"].forEach(
      (name) => {
        const el = container.querySelector(`#icon-${name}`);
        if (!el) return;
        if (name === issuer) el.classList.add("active");
        else el.classList.remove("active");
      },
    );
  }

  btn.addEventListener("click", () => {
    const val = input.value.trim();
    if (!val) {
      result.textContent = "Введите номер карты";
      result.className = "result bad";
      updateIcons("unknown");
      return;
    }
    const ok = luhnCheck(val);
    const issuer = detectIssuer(val);
    updateIcons(issuer);
    if (ok) {
      result.textContent = `Номер валиден — ${issuer.toUpperCase()}`;
      result.className = "result good";
    } else {
      result.textContent = `Неверный номер — ${issuer === "unknown" ? "неизвестная сеть" : issuer.toUpperCase()}`;
      result.className = "result bad";
    }
  });

  btn.addEventListener("click", () => {
    const val = input.value.trim();
    if (!val) {
      result.textContent = "Введите номер карты";
      result.className = "result bad";
      updateIcons("unknown");
      return;
    }
    const ok = luhnCheck(val);
    const issuer = detectIssuer(val);
    updateIcons(issuer);
    if (ok) {
        result.textContent = `Номер валиден — ${issuer.toUpperCase()}`;
      result.className = "result good";
    } else {
      result.textContent = `Неверный номер — ${issuer === "unknown" ? "неизвестная сеть" : issuer.toUpperCase()}`;
      result.className = "result bad";
    }
  });

  input.addEventListener("input", () => {
    const digits = input.value.replace(/\D/g, "");
    if (digits.length >= 4) {
      const issuer = detectIssuerByBIN(digits);
      updateIcons(issuer);
    } else {
      updateIcons("unknown");
    }
  });
}
