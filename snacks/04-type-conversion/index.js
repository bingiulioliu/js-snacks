// TYPE CONVERSION (String, Number, Boolean, Array)
// Obiettivo: completare il ripasso sulla conversione di tipi primitivi
// aggiungendo i casi che coinvolgono gli array, sia in ingresso che in uscita.

console.log('=== TYPE CONVERSION ===');

// ---------------------------------------------------------------
// 1. RIPASSO VELOCE: primitivi (string / number / boolean)
// ---------------------------------------------------------------
console.log('\n--- Ripasso primitivi ---');

console.log(String(true));      // "true"
console.log(Number("123"));     // 123
console.log(Boolean(""));       // false
console.log(Boolean("0"));      // true  <- trappola classica: "0" è una stringa non vuota

// ---------------------------------------------------------------
// 2. ARRAY -> STRING
// ---------------------------------------------------------------
console.log('\n--- Array -> String ---');

const frutta = ['mela', 'pera', 'banana'];

// String() su un array chiama internamente .toString(), che equivale a .join(',')
console.log(String(frutta));        // "mela,pera,banana"
console.log(frutta.toString());     // "mela,pera,banana" (stesso risultato)
console.log(frutta.join(' - '));    // "mela - pera - banana" (separatore custom)

// Attenzione: la concatenazione con + converte l'array in stringa implicitamente,
// esattamente come fa String()
console.log(frutta + '!');          // "mela,pera,banana!"

// Array annidati: la conversione è "piatta" (flatten a livello di stringa)
const nested = [1, [2, 3], 4];
console.log(String(nested));        // "1,2,3,4"

// ---------------------------------------------------------------
// 3. ARRAY -> NUMBER
// ---------------------------------------------------------------
console.log('\n--- Array -> Number ---');

// Regola: JS prima converte l'array in stringa, POI la stringa in numero.
// Funziona solo se l'array ha 0 o 1 elemento "numerico".

console.log(Number([]));        // 0   -> array vuoto diventa "" -> Number("") è 0
console.log(Number([42]));      // 42  -> diventa "42" -> Number("42") è 42
console.log(Number([1, 2]));    // NaN -> diventa "1,2" -> non è un numero valido
console.log(Number(['7']));     // 7   -> stesso principio, il contenuto conta, non il tipo

// Conseguenza pratica su + (somma vs concatenazione)
console.log([] + []);           // ""   (stringa vuota + stringa vuota)
console.log([] + {});           // "[object Object]" (curiosità: object -> stringa)
console.log(1 + []);            // "1"  (numero convertito a stringa perché [] diventa "")

// ---------------------------------------------------------------
// 4. STRING -> ARRAY
// ---------------------------------------------------------------
console.log('\n--- String -> Array ---');

const csv = 'mela,pera,banana';
console.log(csv.split(','));        // ['mela', 'pera', 'banana']

const frase = 'ciao mondo';
console.log(frase.split(' '));      // ['ciao', 'mondo']
console.log(frase.split(''));       // ['c','i','a','o',' ','m','o','n','d','o'] (ogni carattere)

// Array.from funziona su qualsiasi "iterabile", quindi anche sulle stringhe
console.log(Array.from('abc'));     // ['a', 'b', 'c']

// utile con Set per rimuovere duplicati da una stringa/array
console.log(Array.from(new Set('mississippi'))); // ['m','i','s','p']

// ---------------------------------------------------------------
// 5. ARRAY-LIKE / ITERABILI -> ARRAY VERO
// ---------------------------------------------------------------
console.log('\n--- Array-like -> Array ---');

// Array.from converte qualsiasi cosa "iterabile" o "array-like" in un vero array
function esempioArguments() {
  // "arguments" non è un vero array, ma è array-like
  console.log(Array.isArray(arguments));        // false
  const veroArray = Array.from(arguments);
  console.log(Array.isArray(veroArray));         // true
  console.log(veroArray.map((x) => x * 2));      // ora possiamo usare .map()
}
esempioArguments(1, 2, 3);

// Spread operator: alternativa moderna a Array.from per gli iterabili
console.log([...'abc']);            // ['a', 'b', 'c']
console.log([...new Set([1, 1, 2, 3])]); // [1, 2, 3]

// Array.from con funzione di mapping integrata (evita un .map() separato)
console.log(Array.from({ length: 5 }, (_, i) => i * i)); // [0, 1, 4, 9, 16]

// ---------------------------------------------------------------
// 6. Boolean(array): trappola concettuale
// ---------------------------------------------------------------
console.log('\n--- Boolean(array) ---');

// Un array è SEMPRE un oggetto, quindi è sempre "truthy", anche se vuoto!
console.log(Boolean([]));   // true  <- diverso da 0, "", null...
console.log(Boolean([0]));  // true  <- anche un array che contiene un solo "falsy"

// Per controllare se un array è vuoto, va controllata la lunghezza, non convertito a boolean
console.log([].length === 0);   // true, questo è il modo corretto
