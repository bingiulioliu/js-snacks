// MODULI ES6: import/export, named vs default, barrel files
// Obiettivo: capire come organizzare codice in moduli riutilizzabili.
// NOTA: a differenza degli altri snack (un solo index.js), questo argomento
// richiede PIÙ FILE per essere dimostrato realisticamente: vedi la cartella lib/.

console.log('=== MODULI ES6 ===');

// =================================================================
// PARTE 1: IMPORT NOMINATI vs DEFAULT
// =================================================================
console.log('\n--- Import nominati vs default ---');

// Import nominati: nomi tra graffe, DEVONO corrispondere esattamente al nome esportato
import { somma, sottrai, PI_GRECO } from './lib/matematica.js';
// Import default: nessuna graffa, il nome scelto qui è arbitrario (può chiamarsi come vuoi)
import moltiplicaImportato from './lib/matematica.js';

console.log(somma(2, 3));              // 5
console.log(sottrai(10, 4));           // 6
console.log(PI_GRECO);                 // 3.14159
console.log(moltiplicaImportato(3, 4)); // 12

// Import con rinomina (utile per evitare conflitti di nomi)
import { capitalizza as maiuscolaIniziale, lunghezza } from './lib/stringUtils.js';
console.log(maiuscolaIniziale('ciao')); // Ciao
console.log(lunghezza('ciao'));         // 4

// Import di TUTTO come namespace
import * as stringUtils from './lib/stringUtils.js';
console.log(stringUtils.inverti('abc')); // cba
console.log(Object.keys(stringUtils));   // ['capitalizza', 'inverti', 'lunghezza']

// =================================================================
// PARTE 2: BARREL FILE
// =================================================================
console.log('\n--- Barrel file (index.js che ri-esporta) ---');

// Un solo import invece di uno per ogni file sorgente
import { somma as sommaDaBarrel, moltiplica, capitalizza } from './lib/index.js';
console.log(sommaDaBarrel(1, 1));        // 2
console.log(moltiplica(5, 5));           // 25
console.log(capitalizza('barrel file')); // Barrel file

// =================================================================
// PARTE 3: CONCETTI CHIAVE (senza codice eseguibile, sintassi da conoscere)
// =================================================================
console.log('\n--- Concetti aggiuntivi (vedi commenti) ---');

/*
  Import dinamico: carica un modulo solo quando serve, restituisce una Promise.
  Utile per code-splitting / lazy loading.

    const modulo = await import('./lib/matematica.js');
    console.log(modulo.somma(1, 2));

  CommonJS (il sistema precedente, usato di default in Node senza "type":"module"):

    // esportare
    module.exports = { somma, sottrai };
    // oppure
    exports.somma = somma;

    // importare
    const { somma } = require('./matematica.js');

  Differenze principali ESM vs CommonJS:
  - ESM è statico (import/export analizzati prima dell'esecuzione, permette il
    "tree shaking" per rimuovere codice non usato); CommonJS è dinamico
    (require può essere chiamato condizionalmente a runtime).
  - ESM supporta import dinamico nativo (import()); CommonJS usa require()
    sincrono.
  - ESM richiede l'estensione del file nell'import (./file.js), CommonJS no.
  - Node.js distingue i due sistemi tramite "type":"module" nel package.json
    o l'estensione .mjs/.cjs.
*/

// =================================================================
// PARTE 4: ESERCIZI (concettuali, dato il vincolo multi-file)
// =================================================================
console.log('\n=== ESERCIZI ===');

console.log(`
Esercizio 1: apri lib/matematica.js e aggiungi una funzione "dividi(a, b)"
esportata come named export. Poi importala qui e usala.

Esercizio 2: crea un nuovo file lib/validazione.js con un export default
che validi un'email (una regex semplice va bene), poi aggiungilo al barrel
file lib/index.js con "export { default as validaEmail } from './validazione.js';"

Esercizio 3: prova a creare un import circolare (moduloA importa moduloB che
importa moduloA) e osserva cosa succede: alcuni valori risulteranno undefined
al momento dell'esecuzione. Capire perché è un ottimo modo per fissare in
testa il fatto che ESM valuta gli import in un ordine preciso e le dipendenze
circolari sono un anti-pattern da evitare quando possibile.
`);

// =================================================================
// PARTE 5: DOMANDE DA COLLOQUIO
// =================================================================
console.log('=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Differenza tra export nominato ed export default?
R: Un modulo può avere UN SOLO export default ma QUANTI export nominati vuole.
   L'import di un default può essere rinominato liberamente da chi importa
   (import xyz from './file.js' funziona sempre), mentre l'import nominato
   deve corrispondere esattamente al nome esportato (salvo "as" per rinominare
   esplicitamente). Molti stili guida moderni preferiscono SOLO export
   nominati per maggiore esplicitezza e per facilitare il refactoring
   automatico (rinominare un default in un file non rinomina l'import altrove).

D: Cos'è il "tree shaking" e perché ESM lo abilita meglio di CommonJS?
R: È l'eliminazione, durante il build, del codice esportato ma mai importato
   da nessuno, per ridurre la dimensione del bundle finale. Funziona bene con
   ESM perché gli import/export sono STATICI (analizzabili senza eseguire il
   codice); con CommonJS, dove require() può essere condizionale e dinamico,
   è molto più difficile per un bundler stabilire con certezza cosa sia
   davvero inutilizzato.

D: Cos'è l'import dinamico e quando lo usi?
R: import('./modulo.js') restituisce una Promise che si risolve col modulo,
   permettendo di caricarlo solo quando serve (es. al click di un bottone,
   o per una funzionalità raramente usata). È alla base del "code splitting"
   nelle applicazioni moderne, per ridurre il bundle iniziale caricato.
`);
