// GENERATORS E ITERATORI: function*, yield, Symbol.iterator
// Obiettivo: capire i generator, l'iterazione custom, e i casi d'uso reali
// (lazy evaluation, sequenze infinite), argomento meno comune ma distintivo.

console.log('=== GENERATORS E ITERATORI ===');

// =================================================================
// PARTE 1: GENERATOR BASE
// =================================================================
console.log('\n--- Generator base ---');

// Una funzione generator (function*) può "mettere in pausa" la sua esecuzione
// con yield, e riprenderla da lì alla chiamata successiva di .next()
function* contaFinoATre() {
  console.log('  (eseguo fino al primo yield)');
  yield 1;
  console.log('  (eseguo fino al secondo yield)');
  yield 2;
  console.log('  (eseguo fino al terzo yield)');
  yield 3;
  console.log('  (fine della funzione)');
}

const generatore = contaFinoATre();
console.log(generatore.next()); // { value: 1, done: false }
console.log(generatore.next()); // { value: 2, done: false }
console.log(generatore.next()); // { value: 3, done: false }
console.log(generatore.next()); // { value: undefined, done: true }

// I generator sono ITERABILI: si possono usare con for...of, spread, ecc.
console.log('\n--- Generator con for...of ---');
for (const valore of contaFinoATre()) {
  console.log('valore:', valore); // stampa 1, 2, 3 (senza mai vedere "done: true" esplicitamente)
}

console.log([...contaFinoATre()]); // [1, 2, 3], lo spread consuma l'iteratore

// =================================================================
// PARTE 2: SEQUENZE INFINITE E LAZY EVALUATION
// =================================================================
console.log('\n--- Sequenze infinite (lazy) ---');

// Un generator può rappresentare una sequenza INFINITA, perché i valori
// vengono calcolati uno alla volta, solo quando richiesti (lazy)
function* numeriNaturali() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

function prendiN(iterabile, n) {
  const risultato = [];
  const iteratore = iterabile[Symbol.iterator]();
  for (let i = 0; i < n; i++) {
    risultato.push(iteratore.next().value);
  }
  return risultato;
}

console.log(prendiN(numeriNaturali(), 5)); // [1, 2, 3, 4, 5], senza mai "finire" il generator

// Generator di Fibonacci infinito
function* fibonacciGen() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
console.log(prendiN(fibonacciGen(), 8)); // [0, 1, 1, 2, 3, 5, 8, 13]

// =================================================================
// PARTE 3: ITERATORI CUSTOM CON Symbol.iterator
// =================================================================
console.log('\n--- Iteratori custom su oggetti ---');

// Per rendere un OGGETTO qualsiasi iterabile con for...of, serve implementare
// Symbol.iterator. Un generator è il modo più semplice per farlo.
class Intervallo {
  constructor(inizio, fine) {
    this.inizio = inizio;
    this.fine = fine;
  }

  *[Symbol.iterator]() {
    for (let i = this.inizio; i <= this.fine; i++) {
      yield i;
    }
  }
}

const intervallo = new Intervallo(3, 7);
console.log([...intervallo]); // [3, 4, 5, 6, 7]
for (const numero of intervallo) {
  console.log('dall\'intervallo:', numero);
}

// =================================================================
// PARTE 4: yield* — DELEGARE A UN ALTRO GENERATOR
// =================================================================
console.log('\n--- yield* (delega) ---');

function* frutta() {
  yield 'mela';
  yield 'pera';
}
function* verdura() {
  yield 'carota';
  yield 'zucchina';
}
function* spesa() {
  yield* frutta();   // delega tutti gli yield di frutta()
  yield* verdura();  // poi tutti quelli di verdura()
  yield 'pane';
}
console.log([...spesa()]); // ['mela', 'pera', 'carota', 'zucchina', 'pane']

// =================================================================
// PARTE 5: ESERCIZI PRATICI
// =================================================================
console.log('\n=== ESERCIZI ===');

// --- Esercizio 1: generator che produce solo numeri pari, con limite ---
console.log('\n--- Esercizio 1: pari fino a un limite ---');

function* pariFinoA(limite) {
  for (let i = 0; i <= limite; i += 2) {
    yield i;
  }
}
console.log([...pariFinoA(10)]); // [0, 2, 4, 6, 8, 10]

// --- Esercizio 2: paginazione lazy su un array grande ---
console.log('\n--- Esercizio 2: paginazione con generator ---');

function* pagine(array, dimensionePagina) {
  for (let i = 0; i < array.length; i += dimensionePagina) {
    yield array.slice(i, i + dimensionePagina);
  }
}
const dati = Array.from({ length: 10 }, (_, i) => i + 1);
for (const pagina of pagine(dati, 3)) {
  console.log('pagina:', pagina);
}
// [1,2,3] [4,5,6] [7,8,9] [10]

// --- Esercizio 3: implementare take/map "lazy" componibili sui generator ---
console.log('\n--- Esercizio 3: take e map lazy ---');

function* mapLazy(iterabile, fn) {
  for (const valore of iterabile) {
    yield fn(valore);
  }
}
function* takeLazy(iterabile, n) {
  let i = 0;
  for (const valore of iterabile) {
    if (i++ >= n) return;
    yield valore;
  }
}

// Componiamo: prendi i primi 5 numeri naturali al quadrato, SENZA MAI generare
// l'intera sequenza infinita, solo i 5 valori effettivamente richiesti
const primiCinqueQuadrati = takeLazy(mapLazy(numeriNaturali(), (n) => n ** 2), 5);
console.log([...primiCinqueQuadrati]); // [1, 4, 9, 16, 25]

// =================================================================
// PARTE 6: DOMANDE DA COLLOQUIO
// =================================================================
console.log('\n=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Cos'è un generator e in cosa differisce da una funzione normale?
R: Una funzione generator (function*) può sospendere la propria esecuzione
   con "yield" e riprenderla esattamente da lì alla chiamata successiva di
   .next(), mantenendo il proprio stato interno tra una chiamata e l'altra.
   Una funzione normale invece esegue sempre dall'inizio alla fine (o al
   return) in un'unica soluzione, senza possibilità di pausa.

D: Perché i generator sono utili per rappresentare sequenze infinite?
R: Grazie alla "lazy evaluation": il generator calcola un valore solo quando
   viene esplicitamente richiesto con .next(), quindi una sequenza
   concettualmente infinita (numeri naturali, Fibonacci) non causa un ciclo
   infinito o un consumo di memoria illimitato, finché si estraggono solo i
   valori realmente necessari.

D: Cosa fa Symbol.iterator e quando serve implementarlo?
R: È il "protocollo" che rende un oggetto iterabile con for...of, spread
   operator, e destructuring array. Va implementato quando si vuole che una
   classe custom (es. una struttura dati personalizzata) supporti questi
   costrutti nativi, invece di dover esporre un metodo separato come
   .toArray() per ottenere gli elementi.

D: A cosa serve yield*?
R: Delega l'iterazione a un altro oggetto iterabile (spesso un altro
   generator), "appiattendo" gli yield di quest'ultimo in quello corrente.
   È utile per comporre generator più piccoli in uno più grande senza
   scrivere cicli espliciti di iterazione manuale.
`);
