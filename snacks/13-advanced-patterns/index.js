// PATTERN AVANZATI: HOF, currying, composizione, debounce/throttle, memoization
// Obiettivo: conoscere i pattern funzionali più richiesti nei colloqui,
// spesso chiesti come "implementa da zero debounce/throttle/memoize".

console.log('=== PATTERN AVANZATI ===');

// =================================================================
// PARTE 1: HIGHER-ORDER FUNCTIONS (HOF)
// =================================================================
console.log('\n--- Higher-order functions ---');

// Una HOF riceve e/o restituisce funzioni. map/filter/reduce lo sono già,
// ma possiamo scriverne di nostre.

function creaValidatore(regola) {
  return function (valore) {
    return regola(valore);
  };
}

const eMaggiorenne = creaValidatore((eta) => eta >= 18);
const eEmailValida = creaValidatore((str) => str.includes('@'));

console.log(eMaggiorenne(20));          // true
console.log(eEmailValida('no-email'));  // false

// =================================================================
// PARTE 2: CURRYING
// =================================================================
console.log('\n--- Currying ---');

// Currying: trasforma f(a, b, c) in f(a)(b)(c), una funzione alla volta
function sommaCurried(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(sommaCurried(1)(2)(3)); // 6

// Versione con arrow function, più concisa
const sommaCurriedArrow = (a) => (b) => (c) => a + b + c;
console.log(sommaCurriedArrow(10)(20)(30)); // 60

// Utilità pratica: funzioni parzialmente applicate e riutilizzabili
const moltiplicaPer = (fattore) => (numero) => numero * fattore;
const raddoppia = moltiplicaPer(2);
const triplica = moltiplicaPer(3);
console.log(raddoppia(5), triplica(5)); // 10 15

// Funzione generica per "curryficare" qualsiasi funzione (esercizio classico)
function curry(fn) {
  return function curried(...argomenti) {
    if (argomenti.length >= fn.length) {
      return fn.apply(this, argomenti);
    }
    return (...altriArgomenti) => curried(...argomenti, ...altriArgomenti);
  };
}
function sommaTre(a, b, c) {
  return a + b + c;
}
const sommaTreCurried = curry(sommaTre);
console.log(sommaTreCurried(1)(2)(3));   // 6
console.log(sommaTreCurried(1, 2)(3));   // 6, funziona anche con applicazione parziale mista
console.log(sommaTreCurried(1, 2, 3));   // 6, funziona anche chiamata normale

// =================================================================
// PARTE 3: COMPOSIZIONE DI FUNZIONI
// =================================================================
console.log('\n--- Composizione ---');

// compose applica le funzioni da DESTRA a SINISTRA (come in matematica: f(g(x)))
const compose = (...fns) => (valoreIniziale) =>
  fns.reduceRight((valore, fn) => fn(valore), valoreIniziale);

// pipe applica le funzioni da SINISTRA a DESTRA (più leggibile per pipeline di dati)
const pipe = (...fns) => (valoreIniziale) =>
  fns.reduce((valore, fn) => fn(valore), valoreIniziale);

const aggiungiUno = (x) => x + 1;
const moltiplicaPerDue = (x) => x * 2;
const elevaAlQuadrato = (x) => x ** 2;

console.log(compose(elevaAlQuadrato, moltiplicaPerDue, aggiungiUno)(3));
// elevaAlQuadrato(moltiplicaPerDue(aggiungiUno(3))) = elevaAlQuadrato(moltiplicaPerDue(4)) = elevaAlQuadrato(8) = 64

console.log(pipe(aggiungiUno, moltiplicaPerDue, elevaAlQuadrato)(3));
// stesso calcolo ma scritto nell'ordine "naturale" di lettura, stesso risultato: 64

// =================================================================
// PARTE 4: DEBOUNCE E THROTTLE (classici da colloquio)
// =================================================================
console.log('\n--- Debounce e Throttle ---');

// Debounce: esegue la funzione solo dopo che sono passati X ms di SILENZIO
// (utile per: campo di ricerca che chiama un'API solo quando l'utente smette di digitare)
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Throttle: esegue la funzione al massimo UNA VOLTA ogni X ms, indipendentemente
// da quante volte viene chiamata (utile per: evento di scroll o resize)
function throttle(fn, limite) {
  let inAttesa = false;
  return function (...args) {
    if (!inAttesa) {
      fn.apply(this, args);
      inAttesa = true;
      setTimeout(() => (inAttesa = false), limite);
    }
  };
}

// Dimostrazione pratica: simuliamo 5 chiamate ravvicinate
let chiamateDebounce = 0;
const cercaDebounced = debounce(() => {
  chiamateDebounce++;
  console.log(`Debounce eseguito (chiamata #${chiamateDebounce})`);
}, 100);

let chiamateThrottle = 0;
const scrollThrottled = throttle(() => {
  chiamateThrottle++;
  console.log(`Throttle eseguito (chiamata #${chiamateThrottle})`);
}, 100);

for (let i = 0; i < 5; i++) {
  cercaDebounced();  // solo l'ULTIMA chiamata produrrà un effetto, dopo 100ms di quiete
  scrollThrottled(); // solo la PRIMA chiamata produce subito effetto, le altre nella finestra vengono ignorate
}

await new Promise((resolve) => setTimeout(resolve, 200));
console.log(`Debounce totale eseguito: ${chiamateDebounce} volta/e (atteso: 1)`);
console.log(`Throttle totale eseguito: ${chiamateThrottle} volta/e (atteso: 1, chiamate troppo ravvicinate)`);

// =================================================================
// PARTE 5: MEMOIZATION
// =================================================================
console.log('\n--- Memoization ---');

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const chiave = JSON.stringify(args);
    if (cache.has(chiave)) {
      console.log('(dalla cache)');
      return cache.get(chiave);
    }
    const risultato = fn(...args);
    cache.set(chiave, risultato);
    return risultato;
  };
}

function fibonacciLento(n) {
  if (n <= 1) return n;
  return fibonacciLento(n - 1) + fibonacciLento(n - 2);
}
const fibonacciMemo = memoize(fibonacciLento);

console.log(fibonacciMemo(10)); // calcolato
console.log(fibonacciMemo(10)); // (dalla cache), istantaneo

// =================================================================
// PARTE 6: ESERCIZI PRATICI
// =================================================================
console.log('\n=== ESERCIZI ===');

// --- Esercizio 1: once — una funzione eseguibile una sola volta ---
console.log('\n--- Esercizio 1: once ---');

function once(fn) {
  let eseguita = false;
  let risultato;
  return function (...args) {
    if (!eseguita) {
      risultato = fn.apply(this, args);
      eseguita = true;
    }
    return risultato;
  };
}
const inizializza = once(() => {
  console.log('Inizializzazione eseguita!');
  return 'configurazione caricata';
});
console.log(inizializza()); // stampa "Inizializzazione eseguita!" e ritorna il valore
console.log(inizializza()); // NON ristampa nulla, ritorna lo stesso valore cached

// --- Esercizio 2: pipe applicato a un caso reale di validazione ---
console.log('\n--- Esercizio 2: pipeline di trasformazione stringa ---');

const pulisciStringa = pipe(
  (s) => s.trim(),
  (s) => s.toLowerCase(),
  (s) => s.replace(/\s+/g, '-')
);
console.log(pulisciStringa('  Ciao Mondo Bello  ')); // ciao-mondo-bello

// =================================================================
// PARTE 7: DOMANDE DA COLLOQUIO
// =================================================================
console.log('\n=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Differenza pratica tra debounce e throttle? Fai un esempio d'uso per ciascuno.
R: Debounce ritarda l'esecuzione finché non passa un periodo di inattività:
   ideale per una barra di ricerca, dove vuoi chiamare l'API solo quando
   l'utente ha SMESSO di digitare. Throttle limita la frequenza massima di
   esecuzione a una volta ogni X ms, indipendentemente da quante chiamate
   arrivano: ideale per eventi ad alta frequenza come scroll o resize, dove
   vuoi reagire periodicamente ma non ad ogni singolo evento.

D: Cos'è il currying e a cosa serve realmente, oltre all'esercizio accademico?
R: Permette di creare funzioni parzialmente applicate e riutilizzabili: se hai
   una funzione generica (es. moltiplicaPer(fattore)(numero)), puoi "fissare"
   il primo argomento per ottenere funzioni specializzate (raddoppia, triplica)
   riutilizzabili altrove, migliorando la componibilità del codice.

D: Come funziona la memoization e quali sono i suoi limiti?
R: Salva in una cache (spesso una Map) il risultato di una funzione in base
   agli argomenti di input, evitando di ricalcolarlo se richiamata con gli
   stessi argomenti. Funziona bene con funzioni PURE (stesso input, stesso
   output, nessun effetto collaterale). I limiti principali sono il consumo
   di memoria (la cache cresce indefinitamente se non gestita) e l'inutilità
   con funzioni impure o argomenti complessi difficili da usare come chiave.

D: Cosa significa che una funzione è "pura"?
R: Una funzione pura, dati gli stessi input, restituisce sempre lo stesso
   output e non produce effetti collaterali osservabili (non modifica variabili
   esterne, non fa I/O, non muta gli argomenti ricevuti). Le funzioni pure
   sono più facili da testare, comporre, ed è sicuro applicarvi memoization.
`);
