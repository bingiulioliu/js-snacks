// ASYNC AVANZATO: EVENT LOOP, PROMISE COMBINATORS
// Obiettivo: approfondire oltre le basi di Promise/async-await, capendo
// l'ordine di esecuzione (event loop, microtask vs macrotask) e i metodi
// combinatori di Promise, argomenti molto amati nei colloqui tecnici.

console.log('=== ASYNC AVANZATO ===');

// =================================================================
// PARTE 1: EVENT LOOP — MICROTASK vs MACROTASK
// =================================================================
console.log('\n--- Ordine di esecuzione: sync, microtask, macrotask ---');

// Domanda da colloquio classica: "che ordine stampa questo codice?"
console.log('1: sincrono (inizio)');

setTimeout(() => console.log('4: macrotask (setTimeout)'), 0);

Promise.resolve().then(() => console.log('3: microtask (Promise.then)'));

console.log('2: sincrono (fine)');

// Ordine reale: 1, 2, 3, 4
// Motivo: il codice sincrono viene sempre eseguito per primo (è lo stack principale).
// Poi, PRIMA di passare al prossimo macrotask (setTimeout), l'event loop
// svuota COMPLETAMENTE la coda dei microtask (Promise.then, queueMicrotask).
// Solo dopo che i microtask sono finiti, viene eseguito il prossimo macrotask.

// Verifichiamolo con più microtask e macrotask insieme
setTimeout(() => console.log('macrotask A'), 0);
setTimeout(() => console.log('macrotask B'), 0);
Promise.resolve().then(() => console.log('microtask A'));
Promise.resolve().then(() => console.log('microtask B'));
// Output atteso (dopo i log precedenti): microtask A, microtask B, macrotask A, macrotask B
// Tutti i microtask SEMPRE prima di qualsiasi macrotask successivo.

// =================================================================
// PARTE 2: PROMISE COMBINATORS
// =================================================================
console.log('\n--- Promise combinators ---');

function ritardata(valore, ms, fallisce = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => (fallisce ? reject(new Error(`${valore} fallita`)) : resolve(valore)), ms);
  });
}

async function demoCombinators() {
  // Promise.all: fallisce (reject) non appena UNA fallisce, ignora il resto
  console.log('\n> Promise.all (tutte devono avere successo)');
  try {
    const risultati = await Promise.all([
      ritardata('A', 100),
      ritardata('B', 50),
      ritardata('C', 150),
    ]);
    console.log('all risolto:', risultati); // ['A', 'B', 'C'], nell'ordine di INPUT, non di completamento
  } catch (e) {
    console.log('all fallito:', e.message);
  }

  // Promise.all con un fallimento: si ferma al primo errore
  console.log('\n> Promise.all con un fallimento');
  try {
    await Promise.all([ritardata('X', 50), ritardata('Y', 30, true)]);
  } catch (e) {
    console.log('all fallito subito:', e.message); // non aspetta le altre promise
  }

  // Promise.allSettled: aspetta TUTTE, riporta successo o fallimento di ognuna
  console.log('\n> Promise.allSettled (aspetta tutte, sempre)');
  const settled = await Promise.allSettled([
    ritardata('P', 50),
    ritardata('Q', 30, true),
  ]);
  console.log(settled);
  // [{status:'fulfilled', value:'P'}, {status:'rejected', reason: Error}]

  // Promise.race: risolve/rifiuta con la PRIMA che completa (in un senso o nell'altro)
  console.log('\n> Promise.race (vince la più veloce)');
  const vincitrice = await Promise.race([ritardata('lenta', 200), ritardata('veloce', 50)]);
  console.log('race vinta da:', vincitrice); // 'veloce'

  // Promise.any: risolve con la prima che ha SUCCESSO, ignora i fallimenti precedenti
  console.log('\n> Promise.any (prima che ha successo)');
  try {
    const primaOk = await Promise.any([
      ritardata('fallisce-veloce', 30, true),
      ritardata('successo-lento', 100),
    ]);
    console.log('any risolta con:', primaOk); // 'successo-lento', ignora il fallimento
  } catch (e) {
    console.log('any: tutte fallite', e);
  }
}

await demoCombinators();

// =================================================================
// PARTE 3: ESERCIZI PRATICI
// =================================================================
console.log('\n=== ESERCIZI ===');

// --- Esercizio 1: eseguire richieste in sequenza vs in parallelo ---
console.log('\n--- Esercizio 1: sequenziale vs parallelo ---');

async function sequenziale() {
  const inizio = Date.now();
  await ritardata('uno', 100);
  await ritardata('due', 100);
  await ritardata('tre', 100);
  return Date.now() - inizio; // ~300ms, una dopo l'altra
}

async function parallelo() {
  const inizio = Date.now();
  await Promise.all([ritardata('uno', 100), ritardata('due', 100), ritardata('tre', 100)]);
  return Date.now() - inizio; // ~100ms, eseguite insieme
}

console.log('Sequenziale (ms):', await sequenziale());
console.log('Parallelo (ms):', await parallelo());

// --- Esercizio 2: implementare un timeout per una Promise (molto chiesto) ---
console.log('\n--- Esercizio 2: promiseConTimeout ---');

function promiseConTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout superato')), ms)
  );
  return Promise.race([promise, timeout]);
}

try {
  const risultato = await promiseConTimeout(ritardata('dato lento', 300), 100);
  console.log(risultato);
} catch (e) {
  console.log('Errore:', e.message); // Timeout superato, perché 100ms < 300ms
}

// --- Esercizio 3: retry automatico su fallimento ---
console.log('\n--- Esercizio 3: retry con backoff ---');

let tentativi = 0;
function operazioneInstabile() {
  tentativi++;
  return tentativi < 3
    ? Promise.reject(new Error(`Tentativo ${tentativi} fallito`))
    : Promise.resolve('Successo al terzo tentativo');
}

async function conRetry(fn, maxTentativi = 3) {
  for (let i = 1; i <= maxTentativi; i++) {
    try {
      return await fn();
    } catch (e) {
      console.log(`Retry ${i}: ${e.message}`);
      if (i === maxTentativi) throw e;
    }
  }
}
console.log(await conRetry(operazioneInstabile));

// =================================================================
// PARTE 4: DOMANDE DA COLLOQUIO
// =================================================================
console.log('\n=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Qual è la differenza tra microtask e macrotask? Fai un esempio.
R: I microtask (Promise.then/.catch/.finally, queueMicrotask, async/await)
   hanno priorità più alta: l'event loop svuota SEMPRE l'intera coda dei
   microtask prima di eseguire il prossimo macrotask (setTimeout, setInterval,
   eventi I/O). Per questo un setTimeout(fn, 0) viene sempre eseguito DOPO
   qualsiasi Promise.then già in coda, anche se schedulato prima.

D: Differenza tra Promise.all, allSettled, race, any?
R: all: risolve con un array di risultati SOLO se tutte hanno successo,
   altrimenti fallisce subito con il primo errore.
   allSettled: aspetta sempre tutte, restituendo per ognuna { status, value|reason },
   utile quando serve sapere l'esito di ogni operazione anche in caso di errori.
   race: si conclude con l'esito (successo o fallimento) della PRIMA promise
   che completa, qualunque sia il risultato.
   any: risolve con la prima che ha SUCCESSO, ignorando i fallimenti;
   fallisce solo se TUTTE falliscono.

D: async/await elimina le Promise?
R: No, è "zucchero sintattico" sopra le Promise: una funzione async restituisce
   sempre una Promise, e await sospende l'esecuzione della funzione fino alla
   risoluzione della Promise, senza bloccare il resto del programma (il thread
   principale resta libero per altro codice nel frattempo).

D: Cosa succede se in un async/await non uso try/catch?
R: Se la Promise attesa con await viene rifiutata, l'errore si propaga come
   un'eccezione non gestita nella funzione async, che restituisce a sua volta
   una Promise rifiutata. Va gestita con try/catch o con un .catch() esterno
   sulla chiamata della funzione async.
`);
