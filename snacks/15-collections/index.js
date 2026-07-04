// COLLEZIONI: Map, Set, WeakMap, WeakSet
// Obiettivo: sapere quando preferire queste strutture agli oggetti/array
// tradizionali, e capire il ruolo delle versioni "Weak" nella gestione memoria.

console.log('=== MAP, SET, WEAKMAP, WEAKSET ===');

// =================================================================
// PARTE 1: MAP — coppie chiave-valore con chiavi di QUALSIASI tipo
// =================================================================
console.log('\n--- Map ---');

const mappa = new Map();
mappa.set('nome', 'Anna');       // chiave stringa
mappa.set(42, 'risposta');       // chiave numerica
mappa.set(true, 'booleano');     // chiave booleana

const chiaveOggetto = { id: 1 };
mappa.set(chiaveOggetto, 'valore per oggetto'); // chiave OGGETTO, impossibile con un {}!

console.log(mappa.get('nome'));        // Anna
console.log(mappa.get(42));            // risposta
console.log(mappa.get(chiaveOggetto)); // valore per oggetto
console.log(mappa.size);               // 4

// Un oggetto {} può avere solo chiavi stringa/Symbol: '42' e 42 collidono
const oggettoNormale = {};
oggettoNormale[42] = 'numero';
oggettoNormale['42'] = 'stringa'; // sovrascrive la precedente, stessa chiave!
console.log(Object.keys(oggettoNormale)); // ['42'], una sola chiave

// Map mantiene l'ORDINE DI INSERIMENTO ed è direttamente iterabile
console.log('\n--- Map: iterazione ---');
for (const [chiave, valore] of mappa) {
  console.log(chiave, '->', valore);
}
console.log([...mappa.keys()]);   // array di chiavi
console.log([...mappa.values()]); // array di valori

// =================================================================
// PARTE 2: SET — collezione di valori UNICI
// =================================================================
console.log('\n--- Set ---');

const insieme = new Set([1, 2, 2, 3, 3, 3]);
console.log(insieme);      // Set(3) {1, 2, 3}, i duplicati spariscono automaticamente
console.log(insieme.size); // 3
console.log(insieme.has(2)); // true

insieme.add(4);
insieme.delete(1);
console.log([...insieme]); // [2, 3, 4]

// Caso d'uso classico: deduplicare un array in una riga
const conDuplicati = [1, 2, 2, 3, 4, 4, 5];
console.log([...new Set(conDuplicati)]); // [1, 2, 3, 4, 5]

// Operazioni insiemistiche (unione, intersezione, differenza) — non native ma facili
function unione(a, b) {
  return new Set([...a, ...b]);
}
function intersezione(a, b) {
  return new Set([...a].filter((x) => b.has(x)));
}
function differenza(a, b) {
  return new Set([...a].filter((x) => !b.has(x)));
}

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);
console.log([...unione(setA, setB)]);        // [1, 2, 3, 4, 5, 6]
console.log([...intersezione(setA, setB)]);  // [3, 4]
console.log([...differenza(setA, setB)]);    // [1, 2]

// =================================================================
// PARTE 3: WEAKMAP e WEAKSET — riferimenti "deboli", niente memory leak
// =================================================================
console.log('\n--- WeakMap e WeakSet ---');

// WeakMap: le chiavi devono essere OGGETTI, e sono riferimenti deboli.
// Se l'oggetto chiave non ha più altri riferimenti nel programma, il garbage
// collector può liberarlo, e la entry sparisce automaticamente dalla WeakMap.
// Per questo motivo NON è iterabile e non ha .size: non sapresti mai con
// certezza cosa contiene in un dato istante.

const cachePrivata = new WeakMap();

class Documento {
  constructor(testo) {
    cachePrivata.set(this, { testo, creato: Date.now() });
  }
  getTesto() {
    return cachePrivata.get(this).testo;
  }
}

let doc = new Documento('Contenuto segreto');
console.log(doc.getTesto()); // Contenuto segreto

doc = null; // rimuoviamo l'unico riferimento all'oggetto Documento
// A questo punto, se il garbage collector interviene, anche la entry in
// cachePrivata associata a quell'istanza viene liberata automaticamente,
// senza bisogno di rimuoverla manualmente. Con una Map normale, l'oggetto
// Documento resterebbe "intrappolato" per sempre come chiave, causando un
// memory leak silenzioso.

// WeakSet: stesso principio ma per un insieme di oggetti (es. tracciare
// "quali oggetti sono già stati processati", senza impedirne la garbage collection)
const oggettiProcessati = new WeakSet();
function processaUnaVoltaSola(obj) {
  if (oggettiProcessati.has(obj)) {
    return 'Già processato, salto';
  }
  oggettiProcessati.add(obj);
  return 'Processato ora';
}
const item = { id: 1 };
console.log(processaUnaVoltaSola(item)); // Processato ora
console.log(processaUnaVoltaSola(item)); // Già processato, salto

// =================================================================
// PARTE 4: ESERCIZI PRATICI
// =================================================================
console.log('\n=== ESERCIZI ===');

// --- Esercizio 1: contatore di frequenza con Map (pattern molto comune) ---
console.log('\n--- Esercizio 1: contatore di frequenza ---');

function contaFrequenza(array) {
  const contatore = new Map();
  for (const elemento of array) {
    contatore.set(elemento, (contatore.get(elemento) || 0) + 1);
  }
  return contatore;
}
console.log(contaFrequenza(['mela', 'pera', 'mela', 'banana', 'mela']));
// Map(3) { 'mela' => 3, 'pera' => 1, 'banana' => 1 }

// --- Esercizio 2: trovare il primo carattere NON ripetuto in una stringa ---
console.log('\n--- Esercizio 2: primo carattere unico ---');

function primoCarattereUnico(str) {
  const conteggio = new Map();
  for (const char of str) {
    conteggio.set(char, (conteggio.get(char) || 0) + 1);
  }
  for (const char of str) {
    if (conteggio.get(char) === 1) return char;
  }
  return null;
}
console.log(primoCarattereUnico('programmazione')); // 'p', è l'unico carattere che compare una sola volta

// --- Esercizio 3: verificare se due array hanno elementi in comune (con Set, O(n)) ---
console.log('\n--- Esercizio 3: hanno elementi in comune? ---');

function hannoElementiInComune(arr1, arr2) {
  const set1 = new Set(arr1);
  return arr2.some((elemento) => set1.has(elemento)); // O(n), molto più veloce di un doppio ciclo O(n²)
}
console.log(hannoElementiInComune([1, 2, 3], [4, 5, 3])); // true
console.log(hannoElementiInComune([1, 2, 3], [4, 5, 6])); // false

// =================================================================
// PARTE 5: DOMANDE DA COLLOQUIO
// =================================================================
console.log('\n=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Quando preferire una Map a un oggetto letterale {}?
R: Quando servono chiavi non-stringa (oggetti, numeri senza conversione
   implicita), quando serve conoscere facilmente la dimensione (.size invece
   di Object.keys(obj).length), quando l'ordine di inserimento deve essere
   garantito durante l'iterazione, o quando si aggiungono/rimuovono chiavi
   di frequente (Map è ottimizzata per questo, gli oggetti letterali un po'
   meno).

D: A cosa serve un Set rispetto a un array?
R: Garantisce automaticamente l'unicità dei valori e offre un .has() con
   complessità O(1) invece della O(n) di array.includes(), rendendolo molto
   più efficiente per controlli di appartenenza su collezioni grandi.

D: Perché usare una WeakMap invece di una Map normale per dati privati o cache?
R: Perché le chiavi di una WeakMap sono riferimenti deboli: se l'oggetto
   usato come chiave non ha più altri riferimenti nel programma, il garbage
   collector può liberarlo E la relativa entry sparisce automaticamente dalla
   WeakMap. Con una Map normale, l'oggetto chiave resterebbe referenziato per
   sempre, causando un memory leak se non rimosso esplicitamente.

D: Perché WeakMap e WeakSet non sono iterabili e non hanno .size?
R: Perché il momento esatto in cui il garbage collector libera un oggetto
   non è deterministico né osservabile da JavaScript. Se fossero iterabili,
   il loro contenuto potrebbe cambiare in modo imprevedibile e non
   riproducibile durante l'iterazione stessa, quindi il linguaggio lo vieta
   direttamente a livello di API.
`);
