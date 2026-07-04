// INTERVIEW GOTCHAS: typeof, instanceof, coercizione, trabocchetti classici
// Obiettivo: raccogliere in un unico posto le domande "trappola" più
// ricorrenti nei colloqui JS, molte delle quali derivano da coercizione
// implicita e dalle particolarità del linguaggio.

console.log('=== INTERVIEW GOTCHAS ===');

// =================================================================
// PARTE 1: typeof — le sue stranezze
// =================================================================
console.log('\n--- typeof ---');

console.log(typeof 42);          // 'number'
console.log(typeof 'stringa');   // 'string'
console.log(typeof true);        // 'boolean'
console.log(typeof undefined);   // 'undefined'
console.log(typeof Symbol());    // 'symbol'
console.log(typeof 10n);         // 'bigint'
console.log(typeof function(){}); // 'function'

// Le trappole:
console.log(typeof null);        // 'object' <- BUG STORICO del linguaggio, null non è un oggetto!
console.log(typeof []);          // 'object' <- array è un oggetto, serve Array.isArray per distinguerlo
console.log(typeof NaN);         // 'number' <- NaN è tecnicamente "un numero non valido"
console.log(typeof (() => {}));  // 'function', anche le arrow function

// Modo corretto per controllare un array
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({}));        // false

// =================================================================
// PARTE 2: instanceof
// =================================================================
console.log('\n--- instanceof ---');

console.log([1, 2] instanceof Array);   // true
console.log([1, 2] instanceof Object);  // true, un array è anche un Object (catena prototipi)
console.log('stringa' instanceof String); // false! un letterale stringa NON è un'istanza di String
console.log(new String('stringa') instanceof String); // true, qui sì, è un oggetto wrapper

// instanceof NON funziona attraverso i "realm" diversi (es. iframe diversi, raro ma da sapere)
// e non funziona su tipi primitivi, per quello si usa typeof per i primitivi
// e instanceof per gli oggetti/classi custom

// =================================================================
// PARTE 3: COERCIZIONE IMPLICITA — i casi più chiesti
// =================================================================
console.log('\n--- Coercizione implicita ---');

console.log([] + []);        // ""          (array vuoto -> stringa vuota, concatenate: "")
console.log([] + {});        // "[object Object]"
console.log({} + []);        // dipende dal contesto (in console.log è "[object Object]")
console.log(1 + '1');        // '11'  (numero convertito a stringa)
console.log(1 - '1');        // 0     (qui invece la stringa viene convertita a numero, - non concatena)
console.log('5' - 3);        // 2
console.log('5' + 3);        // '53'
console.log('5' * '2');      // 10    (* forza sempre la conversione numerica)
console.log(true + true);    // 2     (booleani sommati come 1 + 1)
console.log('b' + 'a' + +'a' + 'a'); // 'baNaNa' <- il classico "banana": +'a' è NaN

// =================================================================
// PARTE 4: FALSY VALUES — la lista completa (spesso chiesta a memoria)
// =================================================================
console.log('\n--- Tutti i valori falsy ---');

const falsy = [false, 0, -0, 0n, '', null, undefined, NaN];
falsy.forEach((v) => console.log(`Boolean(${String(v)}) =`, Boolean(v)));
// Tutti false. QUALSIASI altro valore (inclusi [], {}, 'false', '0') è truthy.
console.log(Boolean([]));      // true  <- trappola: array vuoto è truthy!
console.log(Boolean({}));      // true  <- trappola: oggetto vuoto è truthy!
console.log(Boolean('0'));     // true  <- trappola: stringa "0" è truthy!
console.log(Boolean('false')); // true  <- trappola: la stringa contenente "false" è truthy!

// =================================================================
// PARTE 5: ALTRI TRABOCCHETTI CLASSICI
// =================================================================
console.log('\n--- Altri trabocchetti ---');

// 5.1 Precisione dei numeri in virgola mobile
console.log(0.1 + 0.2);                // 0.30000000000000004, mai il classico 0.3!
console.log(0.1 + 0.2 === 0.3);        // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true, modo corretto per confrontare

// 5.2 Array "buchi" con costruttore Array(n)
console.log(Array(3));                 // [ <3 empty items> ], NON [undefined, undefined, undefined]
console.log(Array(3).fill(0));         // [0, 0, 0], così sì che è utilizzabile
try {
  console.log(Array(3).map((x) => x * 2)); // [ <3 empty items> ], map SALTA i buchi!
} catch (e) {}

// 5.3 typeof di una funzione non ancora dichiarata con const/let (TDZ)
try {
  console.log(nonAncoraDichiarata);
} catch (e) {
  console.log('Errore TDZ:', e.message);
}
const nonAncoraDichiarata = 5;

// 5.4 Confronto tra oggetti wrapper e primitivi
console.log(new Boolean(false) == false);  // true (coercizione)
console.log(!!new Boolean(false));         // true! l'OGGETTO wrapper è sempre truthy, anche se "contiene" false

// 5.5 parseInt senza radix
console.log(parseInt('08'));    // 8 nei motori moderni, ma storicamente ambiguo (ottale in passato)
console.log(parseInt('08', 10)); // 8, sempre esplicitare la base per sicurezza

// =================================================================
// PARTE 6: ESERCIZI — "prevedi l'output"
// =================================================================
console.log('\n=== ESERCIZI: prevedi l\'output ===');

console.log('\n--- Esercizio 1 ---');
console.log([1, 2, 3] + [4, 5, 6]); // '1,2,3,4,5,6' (entrambi convertiti a stringa e concatenati)

console.log('\n--- Esercizio 2 ---');
function esercizio2() {
  console.log(a); // undefined (var issata), non ReferenceError
  var a = 1;
  console.log(a); // 1
}
esercizio2();

console.log('\n--- Esercizio 3 ---');
console.log([1, 2, 3].length = 1); // 1 (l'assegnazione restituisce il valore assegnato)
// e se lo eseguissimo su una vera variabile array, tronca l'array a lunghezza 1!
const arrTest = [1, 2, 3];
arrTest.length = 1;
console.log(arrTest); // [1]

console.log('\n--- Esercizio 4 ---');
console.log(typeof typeof 1); // 'string' (typeof 1 è 'number', typeof 'number' è 'string')

// =================================================================
// PARTE 7: DOMANDE DA COLLOQUIO
// =================================================================
console.log('\n=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Perché typeof null restituisce "object"?
R: È un bug storico della primissima implementazione di JavaScript (1995):
   i valori venivano rappresentati internamente con un tag di tipo, e il tag
   per gli oggetti era 0, lo stesso usato per null. Il bug è stato mantenuto
   per compatibilità all'indietro con tutto il codice esistente sul web.

D: Come distingui un array da un oggetto generico, dato che typeof restituisce
   "object" per entrambi?
R: Con Array.isArray(valore), il metodo dedicato e affidabile. Alternative
   meno robuste sono valore.constructor === Array o
   Object.prototype.toString.call(valore) === '[object Array]'.

D: Perché 0.1 + 0.2 non è esattamente 0.3 in JavaScript?
R: I numeri in JS seguono lo standard IEEE 754 a virgola mobile a doppia
   precisione, che non può rappresentare ESATTAMENTE alcune frazioni decimali
   in binario (come 0.1), causando piccoli errori di arrotondamento. Non è
   un difetto di JS specificamente, ma di come quasi tutti i linguaggi
   rappresentano i numeri decimali in binario. Per confronti, si usa una
   tolleranza (epsilon) invece dell'uguaglianza esatta.

D: Qual è la differenza tra == e === in termini di coercizione, e quale si
   dovrebbe usare di default?
R: == converte i tipi prima di confrontare (con regole non sempre intuitive,
   vedi il capitolo sui Confronti), mentre === confronta senza alcuna
   conversione, restituendo subito false se i tipi differiscono. La pratica
   comune è usare sempre === per default, e ricorrere a == solo in casi molto
   specifici e consapevoli (es. == null per controllare sia null che
   undefined in un colpo solo).
`);
