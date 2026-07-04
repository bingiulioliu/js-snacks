// COMPARISONS (confronti)
// Obiettivo: ripassare gli operatori di confronto, le conversioni implicite
// coinvolte, i casi limite con null/undefined/NaN, e alcune trappole
// avanzate che il capitolo base non copre (NaN, Object.is, confronto oggetti).

console.log('=== COMPARISONS ===');

// ---------------------------------------------------------------
// 1. RIPASSO: confronto di stringhe (ordine lessicografico/Unicode)
// ---------------------------------------------------------------
console.log('\n--- Confronto stringhe ---');

console.log('Z' > 'A');          // true
console.log('Glow' > 'Glee');    // true
console.log('Bee' > 'Be');       // true (stringa più lunga vince a parità di prefisso)

// Maiuscole vs minuscole: le minuscole hanno codice Unicode maggiore
console.log('a' > 'A');          // true
console.log('a'.charCodeAt(0), 'A'.charCodeAt(0)); // 97 65

// Trappola: i numeri come stringhe NON si confrontano numericamente
console.log('10' > '9');         // false! confronto carattere per carattere: '1' < '9'
console.log(10 > 9);             // true, qui invece sono numeri veri

// ---------------------------------------------------------------
// 2. == vs === (uguaglianza debole vs stretta)
// ---------------------------------------------------------------
console.log('\n--- == vs === ---');

console.log(0 == false);         // true  (entrambi convertiti a 0)
console.log(0 === false);        // false (tipi diversi, nessuna conversione)
console.log('' == false);        // true  ('' -> 0, false -> 0)
console.log('0' == false);       // true  ('0' -> 0)

// La "conseguenza divertente" del capitolo: due valori uguali con booleano opposto
const a = 0;
const b = '0';
console.log(Boolean(a), Boolean(b), a == b); // false true true

// ---------------------------------------------------------------
// 3. null e undefined: le regole speciali
// ---------------------------------------------------------------
console.log('\n--- null / undefined ---');

console.log(null === undefined); // false, tipi diversi
console.log(null == undefined);  // true, regola speciale, coppia esclusiva

console.log(null > 0);           // false
console.log(null == 0);          // false
console.log(null >= 0);          // true  <- il "risultato strano" del capitolo

console.log(undefined > 0);      // false
console.log(undefined < 0);      // false
console.log(undefined == 0);     // false

// ---------------------------------------------------------------
// 4. APPROFONDIMENTO: NaN, il valore che non è mai uguale a se stesso
// ---------------------------------------------------------------
console.log('\n--- NaN: il caso limite estremo ---');

console.log(NaN == NaN);         // false!
console.log(NaN === NaN);        // false!
console.log(NaN > 0, NaN < 0, NaN >= 0); // false false false, sempre false con NaN

// Come si controlla davvero se un valore è NaN
console.log(Number.isNaN(NaN));       // true, modo corretto e sicuro
console.log(isNaN('stringa'));        // true, ma isNaN() globale converte prima l'argomento!
console.log(Number.isNaN('stringa')); // false, perché non fa conversione: 'stringa' non è il valore NaN

// Object.is: come === ma gestisce correttamente NaN e -0/+0
console.log(Object.is(NaN, NaN));     // true  <- differenza chiave rispetto a ===
console.log(NaN === NaN);             // false
console.log(Object.is(0, -0));        // false <- differenza chiave rispetto a ===
console.log(0 === -0);                // true

// ---------------------------------------------------------------
// 5. APPROFONDIMENTO: confronto tra oggetti e array
// ---------------------------------------------------------------
console.log('\n--- Confronto oggetti e array ---');

// Oggetti e array vengono confrontati per RIFERIMENTO, non per contenuto
console.log([1, 2] === [1, 2]);       // false, sono due array diversi in memoria
console.log({} === {});               // false, stesso motivo

const arr1 = [1, 2, 3];
const arr2 = arr1;
console.log(arr1 === arr2);           // true, stesso riferimento

// Per confrontare il "contenuto" servono soluzioni esplicite
console.log(JSON.stringify([1,2]) === JSON.stringify([1,2])); // true, ma fragile (ordine chiavi negli oggetti!)

function stessoArray(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}
console.log(stessoArray([1, 2, 3], [1, 2, 3])); // true, confronto robusto elemento per elemento

// Trappola: confronto array con < > coinvolge doppia conversione (array -> stringa -> numero)
console.log([10] > [9]);              // true  -> "10" > "9" confrontate come STRINGHE? No!
// Spiegazione: [10] e [9] diventano stringhe "10" e "9", ma essendo un confronto
// relazionale (non ==), JS tenta la conversione NUMERICA della stringa: 10 > 9 -> true
console.log([2] > [10]);              // false -> Number("2")=2, Number("10")=10, 2>10 è false

// ---------------------------------------------------------------
// 6. APPROFONDIMENTO: confronti a catena (chained comparisons)
// ---------------------------------------------------------------
console.log('\n--- Confronti a catena: trappola comune ---');

// In matematica scriveremmo "1 < 2 < 3", ma in JS NON funziona come ci si aspetta
console.log(1 < 2 < 3);   // true  -> (1 < 2) è true -> true < 3 -> 1 < 3 -> true (per fortuna corretto qui)
console.log(3 > 2 > 1);   // false -> (3 > 2) è true -> true > 1 -> 1 > 1 -> false! (qui sbagliato)

// La soluzione corretta è sempre esplicitare con &&
const x = 2;
console.log(1 < x && x < 3); // true, modo corretto per verificare un intervallo

// ---------------------------------------------------------------
// 7. Buone pratiche riassuntive
// ---------------------------------------------------------------
console.log('\n--- Buone pratiche ---');
console.log('Usa sempre === salvo motivi specifici per ==');
console.log('Usa Number.isNaN() invece di isNaN() globale');
console.log('Usa Object.is() solo per i rari casi NaN / -0');
console.log('Non usare > < >= <= su variabili che potrebbero essere null/undefined');
