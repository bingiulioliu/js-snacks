// lib/matematica.js
// Esempio di modulo con export NOMINATI e un export DEFAULT.

// Export nominato: ce ne possono essere quanti se ne vuole nello stesso file
export function somma(a, b) {
  return a + b;
}

export function sottrai(a, b) {
  return a - b;
}

// Costante esportata
export const PI_GRECO = 3.14159;

// Export default: UNO SOLO per modulo, spesso l'elemento "principale" del file
export default function moltiplica(a, b) {
  return a * b;
}
