// DESTRUCTURING & ARRAY/OBJECT AVANZATI
// Obiettivo: padroneggiare destructuring, spread/rest, e i metodi array
// meno comuni ma molto richiesti nei colloqui tecnici.

console.log('=== DESTRUCTURING & ARRAY/OBJECT AVANZATI ===');

// =================================================================
// PARTE 1: CONCETTI CHIAVE
// =================================================================

// -----------------------------------------------------------------
// 1.1 Destructuring di array
// -----------------------------------------------------------------
console.log('\n--- Destructuring array ---');

const coordinate = [10, 20, 30];
const [x, y, z] = coordinate;
console.log(x, y, z); // 10 20 30

// Saltare elementi con virgole vuote
const [primo, , terzo] = coordinate;
console.log(primo, terzo); // 10 30

// Valori di default (si attivano solo se l'elemento è undefined)
const [a = 1, b = 2, c = 3, d = 4] = [10, 20];
console.log(a, b, c, d); // 10 20 3 4

// Swap di variabili senza variabile temporanea
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n); // 2 1

// Rest pattern in destructuring array
const [testa, ...coda] = [1, 2, 3, 4, 5];
console.log(testa, coda); // 1 [2, 3, 4, 5]

// -----------------------------------------------------------------
// 1.2 Destructuring di oggetti
// -----------------------------------------------------------------
console.log('\n--- Destructuring oggetti ---');

const utente = { nome: 'Anna', eta: 28, citta: 'Milano' };
const { nome, eta } = utente;
console.log(nome, eta); // Anna 28

// Rinominare le variabili durante il destructuring
const { nome: nomeUtente, citta: cittaUtente } = utente;
console.log(nomeUtente, cittaUtente); // Anna Milano

// Valori di default (utile con proprietà opzionali)
const { professione = 'non specificata' } = utente;
console.log(professione); // non specificata

// Destructuring annidato
const profiloCompleto = {
  nome: 'Luca',
  indirizzo: { via: 'Roma', numero: 5, città: { nome: 'Torino', cap: '10100' } },
};
const {
  indirizzo: {
    via,
    città: { nome: nomeCitta },
  },
} = profiloCompleto;
console.log(via, nomeCitta); // Roma Torino

// Rest pattern in destructuring oggetti
const { nome: nomeSolo, ...altriDati } = utente;
console.log(nomeSolo, altriDati); // Anna { eta: 28, citta: 'Milano' }

// -----------------------------------------------------------------
// 1.3 Destructuring nei parametri di funzione (pattern MOLTO comune)
// -----------------------------------------------------------------
console.log('\n--- Destructuring nei parametri ---');

function stampaProfilo({ nome, eta = 18, citta = 'sconosciuta' }) {
  console.log(`${nome}, ${eta} anni, ${citta}`);
}
stampaProfilo({ nome: 'Sara', eta: 30, citta: 'Roma' });
stampaProfilo({ nome: 'Marco' }); // usa i default per eta e citta

// Utile per "opzioni con nome" invece di parametri posizionali confusi
function creaBottone({ testo = 'Click', colore = 'blu', disabilitato = false } = {}) {
  return `<button style="color:${colore}" ${disabilitato ? 'disabled' : ''}>${testo}</button>`;
}
console.log(creaBottone({ testo: 'Invia', colore: 'verde' }));
console.log(creaBottone()); // funziona anche senza argomenti grazie a "= {}"

// -----------------------------------------------------------------
// 1.4 Spread operator: unire, copiare, espandere
// -----------------------------------------------------------------
console.log('\n--- Spread operator ---');

// Unire array
const parte1 = [1, 2];
const parte2 = [3, 4];
console.log([...parte1, ...parte2, 5]); // [1, 2, 3, 4, 5]

// Copia superficiale (shallow copy) di array e oggetti
const originaleArr = [1, 2, 3];
const copiaArr = [...originaleArr];
copiaArr.push(4);
console.log(originaleArr, copiaArr); // [1,2,3] [1,2,3,4] (indipendenti)

const originaleObj = { a: 1, b: 2 };
const copiaObj = { ...originaleObj, c: 3 };
console.log(originaleObj, copiaObj); // {a:1,b:2} {a:1,b:2,c:3}

// ATTENZIONE: shallow copy, non deep copy!
const conNested = { info: { valore: 1 } };
const copiaSuperficiale = { ...conNested };
copiaSuperficiale.info.valore = 99;
console.log(conNested.info.valore); // 99! l'oggetto annidato è condiviso, non copiato

// Override di proprietà con spread (l'ordine conta, l'ultimo vince)
const base = { tema: 'chiaro', lingua: 'it' };
const personalizzato = { ...base, tema: 'scuro' };
console.log(personalizzato); // { tema: 'scuro', lingua: 'it' }

// =================================================================
// PARTE 2: ARRAY METHODS AVANZATI
// =================================================================
console.log('\n--- Array methods avanzati ---');

// flat: appiattisce array annidati
console.log([1, [2, 3], [4, [5, 6]]].flat());     // [1, 2, 3, 4, [5, 6]] (profondità 1)
console.log([1, [2, [3, [4]]]].flat(Infinity));   // [1, 2, 3, 4] (profondità totale)

// flatMap: map + flat(1) in un solo passaggio, utile per "espandere" elementi
const frasi = ['ciao mondo', 'come stai'];
console.log(frasi.flatMap((f) => f.split(' '))); // ['ciao','mondo','come','stai']

// sort: ATTENZIONE, di default converte a stringa!
console.log([10, 1, 21, 2].sort());              // [1, 10, 2, 21] <- trappola classica!
console.log([10, 1, 21, 2].sort((a, b) => a - b)); // [1, 2, 10, 21] <- corretto per numeri

// sort NON è immutabile: modifica l'array originale!
const numeri = [3, 1, 2];
const numeriOrdinati = numeri.sort();
console.log(numeri === numeriOrdinati); // true, stesso riferimento, muta l'originale

// Alternativa immutabile (pattern richiesto spesso a colloquio)
const originaleImm = [3, 1, 2];
const copiaOrdinata = [...originaleImm].sort((a, b) => a - b);
console.log(originaleImm, copiaOrdinata); // [3,1,2] [1,2,3] (originale intatto)

// Object.entries/keys/values + destructuring nel ciclo (combo potente)
const inventario = { mele: 10, pere: 5, banane: 20 };
for (const [frutto, quantita] of Object.entries(inventario)) {
  console.log(`${frutto}: ${quantita}`);
}

// Object.freeze: immutabilità superficiale
const config = Object.freeze({ debug: false });
try {
  config.debug = true; // in strict mode (i moduli ES lo sono sempre) lancia TypeError
} catch (errore) {
  console.log('Errore catturato:', errore.message);
}
console.log(config.debug); // false, la modifica non ha avuto effetto

// =================================================================
// PARTE 3: ESERCIZI PRATICI (con soluzione)
// =================================================================
console.log('\n=== ESERCIZI ===');

// --- Esercizio 1 ---
// Data una lista di utenti, estrai solo nome ed email usando destructuring
// e restituisci un nuovo array di oggetti { nome, email }.
console.log('\n--- Esercizio 1: estrarre campi con destructuring ---');

const utentiCompleti = [
  { id: 1, nome: 'Anna', email: 'anna@mail.com', password: 'xxx' },
  { id: 2, nome: 'Marco', email: 'marco@mail.com', password: 'yyy' },
];

function estraiContatti(utenti) {
  return utenti.map(({ nome, email }) => ({ nome, email }));
}
console.log(estraiContatti(utentiCompleti));
// [{ nome: 'Anna', email: 'anna@mail.com' }, { nome: 'Marco', email: 'marco@mail.com' }]

// --- Esercizio 2 (tipico da colloquio) ---
// Scrivi una funzione che unisca due oggetti di configurazione,
// dove il secondo sovrascrive il primo, SENZA mutare nessuno dei due.
console.log('\n--- Esercizio 2: merge immutabile di config ---');

function mergeConfig(configBase, override) {
  return { ...configBase, ...override };
}
const confA = { tema: 'chiaro', notifiche: true };
const confB = { tema: 'scuro' };
const risultatoMerge = mergeConfig(confA, confB);
console.log(risultatoMerge);         // { tema: 'scuro', notifiche: true }
console.log(confA);                  // invariato: { tema: 'chiaro', notifiche: true }

// --- Esercizio 3 (classico da colloquio: appiattire e deduplicare) ---
// Data una lista di array annidati con possibili duplicati,
// restituisci un array piatto e senza duplicati, ordinato.
console.log('\n--- Esercizio 3: flatten + dedup + sort ---');

function flattenDedupSort(arr) {
  return [...new Set(arr.flat(Infinity))].sort((x, y) => x - y);
}
console.log(flattenDedupSort([[3, 1], [2, [3, 4]], [1, 5]])); // [1, 2, 3, 4, 5]

// --- Esercizio 4 ---
// Implementa una funzione "pick" che, dato un oggetto e una lista di chiavi,
// restituisca un nuovo oggetto con solo quelle chiavi (pattern usato in molte librerie).
console.log('\n--- Esercizio 4: funzione pick ---');

function pick(obj, chiavi) {
  return chiavi.reduce((risultato, chiave) => {
    if (chiave in obj) risultato[chiave] = obj[chiave];
    return risultato;
  }, {});
}
console.log(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])); // { a: 1, c: 3 }

// =================================================================
// PARTE 4: DOMANDE DA COLLOQUIO
// =================================================================
console.log('\n=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Qual è la differenza tra shallow copy e deep copy? Come si fa una deep copy?
R: Lo spread (...) e Object.assign() copiano solo il primo livello: le proprietà
   annidate (oggetti/array dentro l'oggetto) restano condivise per riferimento.
   Per una deep copy servono strutturedClone(obj) (nativo e moderno),
   JSON.parse(JSON.stringify(obj)) (perde funzioni, undefined, Date diventano stringhe),
   oppure una funzione ricorsiva custom o una libreria come lodash.cloneDeep.

D: Perché array.sort() di default dà risultati "sbagliati" con i numeri?
R: Perché senza una compare function, sort() converte ogni elemento in stringa
   e confronta carattere per carattere (ordine lessicografico), non numerico.
   Serve sempre (a, b) => a - b per un ordinamento numerico corretto.

D: sort() muta l'array originale?
R: Sì, sort() (come anche reverse() e splice()) è un metodo mutante: modifica
   l'array su cui viene chiamato e restituisce lo stesso riferimento.
   Per non mutare l'originale, si copia prima con lo spread: [...arr].sort(...).
`);
