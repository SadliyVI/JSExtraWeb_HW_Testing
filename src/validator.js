// validator.js — содержит логику проверки номера карты (Luhn) и определения платёжной системы

/**
 * Проверка при помощи алгоритма Луна (Luhn)
 * Вход: строка, содержащая только цифры (может содержать пробелы — они будут удалены)
 * Возвращает: true/false
 */
export function luhnCheck(number) {
  const s = String(number).replace(/\s+/g, "");
  if (!/^[0-9]+$/.test(s)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let digit = parseInt(s.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

/**
 * Определение платёжной системы (IIN ranges)
 * Возвращает строку идентификатора: 'visa', 'mastercard', 'amex', 'discover', 'jcb', 'maestro', 'unknown'
 */
export function detectIssuer(number) {
  const s = String(number).replace(/\s+/g, "");
  if (!/^[0-9]+$/.test(s)) return "unknown";

  // Visa
  if (/^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/.test(s)) return "visa";
  // MasterCard (51-55, 2221-2720)
  if (
    /^(5[1-5][0-9]{14})$/.test(s) ||
    /^(2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7(0[0-9]|20))[0-9]{12})$/.test(s)
  )
    return "mastercard";
  // American Express
  if (/^3[47][0-9]{13}$/.test(s)) return "amex";
  // Discover (6011, 622126-622925, 644-649, 65)
  if (/^(6011|65|64[4-9]|622)/.test(s)) return "discover";
  // JCB (3528-3589)
  if (/^35(2[8-9]|[3-8][0-9])[0-9]{12}$/.test(s)) return "jcb";
  // Maestro (common prefixes)
  if (/^(5018|5020|5038|56|57|58|6304|6759|676[1-3])/.test(s)) return "maestro";
  // Mir (2200-2204)
  if (/^220[0-4][0-9]{12}$/.test(s)) return "mir";

  return "unknown";
}

/**
 * Определение платежной системы по BIN (4–6 цифр) для подсветки при вводе
 */
export function detectIssuerByBIN(bin) {
  if (!/^\d+$/.test(bin)) return "unknown";

  // Mir: 2200–2204
  if (/^220[0-4]/.test(bin)) return "mir";

  // Visa: начинается с 4
  if (/^4/.test(bin)) return "visa";

  // MasterCard: 51–55, 2221–2720
  if (/^5[1-5]/.test(bin) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(bin))
    return "mastercard";

  // Amex: 34 или 37
  if (/^3[47]/.test(bin)) return "amex";

  // Discover: 601, 644–649, 65, 622 (упрощено первые 3 цифры)
  if (/^(601|65|64[4-9]|622)/.test(bin)) return "discover";

  // Maestro: 5018, 5020, 5038, 56–58, 6304, 6759, 6761–6763
  if (/^(5018|5020|5038|5[6-8]|6304|6759|676[1-3])/.test(bin)) return "maestro";

  return "unknown";
}
