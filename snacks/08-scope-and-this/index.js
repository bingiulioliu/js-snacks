// SCOPE, VAR/LET/CONST, HOISTING E THIS
// Obiettivo: capire a fondo le differenze di scope tra var/let/const,
// l'hoisting, la temporal dead zone, e le regole di binding di "this"
// (uno degli argomenti più chiesti nei colloqui JS).

console.log('=== SCOPE, HOISTING & THIS ===');

// =================================================================
// PARTE 1: VAR vs LET vs CONST
// =================================================================
console.log('\n--- var vs let vs const ---');

// var: scope di FUNZIONE, non di blocco
function esempioVar() {
  if (true) {
    var x = 'sono dentro il blocco';
  }
  console.log(x); // "sono dentro il blocco" <- accessibile fuori dal blocco if!
}
esempioVar();

// let/const: scope di BLOCCO
function esempioLet() {
  if (true) {
    let y = 'sono dentro il blocco';
    console.log(y); // accessibile qui
  }
  try {
    console.log(y); // ReferenceError: y is not defined
  } catch (e) {
    console.log('Errore:', e.message);
  }
}
esempioLet();

// const: il riferimento non può essere riassegnato, ma il CONTENUTO sì (se mutabile)
const arr = [1, 2, 3];
arr.push(4); // OK, non stiamo riassegnando "arr", solo mutando l'array
console.log(arr); // [1, 2, 3, 4]

try {
  // arr = [];  // TypeError se decommentato: Assignment to constant variable
} catch (e) {}

// =================================================================
// PARTE 2: HOISTING
// =================================================================
console.log('\n--- Hoisting ---');

// var viene "issato" (hoisted) e inizializzato a undefined
console.log(vHoisted); // undefined, non un errore!
var vHoisted = 'valore';

// let/const vengono issati ma restano in Temporal Dead Zone (TDZ) fino alla dichiarazione
try {
  console.log(lHoisted); // ReferenceError: Cannot access before initialization
  let lHoisted = 'valore';
} catch (e) {
  console.log('Errore TDZ:', e.message);
}

// Le dichiarazioni di funzione sono completamente issate (corpo incluso)
console.log(funzioneIssata()); // funziona anche se chiamata prima della dichiarazione
function funzioneIssata() {
  return 'sono stata issata con tutto il corpo';
}

// Le function expression NON vengono issate allo stesso modo
try {
  funzioneEspressione(); // TypeError: funzioneEspressione is not a function
} catch (e) {
  console.log('Errore:', e.message);
}
var funzioneEspressione = function () {
  return 'espressione';
};

// =================================================================
// PARTE 3: THIS — le 4 regole di binding
// =================================================================
console.log('\n--- this: le regole di binding ---');

// 3.1 Chiamata come metodo di un oggetto -> this è l'oggetto
const persona = {
  nome: 'Elena',
  saluta() {
    return `Ciao, sono ${this.nome}`;
  },
};
console.log(persona.saluta()); // Ciao, sono Elena

// 3.2 Chiamata come funzione semplice -> this è undefined (in strict mode/moduli)
function mostraThis() {
  return this;
}
console.log(mostraThis()); // undefined (nei moduli ES, sempre strict mode)

// 3.3 Funzioni arrow: NON hanno un proprio "this", ereditano quello dello scope esterno
const oggettoConArrow = {
  nome: 'Test',
  normale() {
    const arrow = () => this.nome; // "this" qui è quello di "normale", cioè oggettoConArrow
    return arrow();
  },
};
console.log(oggettoConArrow.normale()); // Test

// Trappola classica: passare un metodo come callback perde il "this"
const contatore = {
  valore: 0,
  incrementa() {
    this.valore++;
    return this.valore;
  },
};
const incrementaScollegato = contatore.incrementa;
try {
  incrementaScollegato(); // this non è più "contatore", è undefined -> errore
} catch (e) {
  console.log('Errore (this perso):', e.message);
}

// 3.4 call/apply/bind: binding esplicito di this
function presentati(saluto) {
  return `${saluto}, sono ${this.nome}`;
}
const utente1 = { nome: 'Giulia' };

console.log(presentati.call(utente1, 'Ciao'));   // call: argomenti separati
console.log(presentati.apply(utente1, ['Salve'])); // apply: argomenti come array

const presentatiLegato = presentati.bind(utente1); // bind: crea una NUOVA funzione con this fissato
console.log(presentatiLegato('Ehi'));

// Soluzione corretta al problema del "this perso" con bind
const incrementaLegato = contatore.incrementa.bind(contatore);
console.log(incrementaLegato()); // 1, ora funziona

// =================================================================
// PARTE 4: ESERCIZI PRATICI
// =================================================================
console.log('\n=== ESERCIZI ===');

// --- Esercizio 1: prevedere l'output (molto comune ai colloqui) ---
console.log('\n--- Esercizio 1: var nei cicli ---');

function creaFunzioniVar() {
  const funzioni = [];
  for (var i = 0; i < 3; i++) {
    funzioni.push(() => i);
  }
  return funzioni.map((f) => f());
}
console.log(creaFunzioniVar()); // [3, 3, 3] <- tutte condividono la stessa "i"

function creaFunzioniLet() {
  const funzioni = [];
  for (let i = 0; i < 3; i++) {
    funzioni.push(() => i);
  }
  return funzioni.map((f) => f());
}
console.log(creaFunzioniLet()); // [0, 1, 2] <- ogni iterazione ha una propria "i"

// --- Esercizio 2: fixare il "this perso" senza bind, usando arrow ---
console.log('\n--- Esercizio 2: fix con arrow function ---');

class Timer {
  constructor() {
    this.secondi = 0;
  }
  // Arrow function come campo di classe: "this" è sempre l'istanza,
  // utile per passarla come callback (es. addEventListener) senza bind manuale
  tick = () => {
    this.secondi++;
    return this.secondi;
  };
}
const timer = new Timer();
const tickScollegato = timer.tick;
console.log(tickScollegato()); // 1, funziona anche scollegato grazie all'arrow

// --- Esercizio 3: implementare una versione semplice di "bind" ---
console.log('\n--- Esercizio 3: bind personalizzato ---');

function mioBind(fn, contesto) {
  return function (...argomenti) {
    return fn.apply(contesto, argomenti);
  };
}
const presentatiMioBind = mioBind(presentati, utente1);
console.log(presentatiMioBind('Yo')); // Yo, sono Giulia

// =================================================================
// PARTE 5: DOMANDE DA COLLOQUIO
// =================================================================
console.log('\n=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Perché si preferisce let/const a var nel codice moderno?
R: var ha scope di funzione (non di blocco), viene issato e inizializzato a
   undefined (bug silenziosi), e permette la ridichiarazione della stessa
   variabile nello stesso scope. let/const hanno scope di blocco, restano in
   TDZ fino alla dichiarazione (errori più espliciti) e const impedisce la
   riassegnazione, rendendo l'intento del codice più chiaro.

D: Cos'è la Temporal Dead Zone (TDZ)?
R: È l'intervallo tra l'inizio dello scope e il punto in cui una variabile
   let/const viene effettivamente dichiarata. In quell'intervallo la variabile
   esiste già (per questo si dice "issata") ma non è accessibile: qualsiasi
   accesso lancia un ReferenceError, invece di restituire undefined come var.

D: Qual è la differenza principale tra le arrow function e le function normali
   rispetto a "this"?
R: Le function normali hanno un proprio "this", determinato da COME vengono
   chiamate (come metodo, standalone, con new, con call/apply/bind). Le arrow
   function non hanno un proprio "this": lo ereditano lessicalmente dallo
   scope in cui sono definite, e questo this non cambia mai, nemmeno con
   call/apply/bind.

D: Qual è la differenza tra call, apply e bind?
R: call e apply invocano subito la funzione con un "this" specifico:
   call accetta gli argomenti separati da virgola, apply li accetta come
   array. bind invece NON invoca subito la funzione: restituisce una nuova
   funzione con "this" permanentemente fissato, utile per passarla come
   callback senza perdere il contesto.
`);
