// CLASSI E OOP: class, extends, prototype chain, campi privati
// Obiettivo: padroneggiare la sintassi class moderna e capire cosa succede
// "sotto il cofano" con i prototipi, spesso oggetto di domande a colloquio.

console.log('=== CLASSI E OOP ===');

// =================================================================
// PARTE 1: CLASSI BASE
// =================================================================
console.log('\n--- Classi base ---');

class Animale {
  // Campo di istanza (sintassi moderna, non serve dichiararlo nel constructor)
  vivo = true;

  constructor(nome, suono) {
    this.nome = nome;
    this.suono = suono;
  }

  // Metodo di istanza (finisce sul prototype, condiviso tra tutte le istanze)
  faiVerso() {
    return `${this.nome} fa: ${this.suono}`;
  }

  // Static: appartiene alla classe, non alle istanze
  static creaGenerico() {
    return new Animale('Animale generico', '...');
  }
}

const cane = new Animale('Rex', 'Bau');
console.log(cane.faiVerso()); // Rex fa: Bau
console.log(Animale.creaGenerico().faiVerso()); // Animale generico fa: ...

// =================================================================
// PARTE 2: EREDITARIETÀ CON extends/super
// =================================================================
console.log('\n--- Ereditarietà ---');

class Cane extends Animale {
  constructor(nome, razza) {
    super(nome, 'Bau'); // OBBLIGATORIO chiamare super prima di usare "this"
    this.razza = razza;
  }

  // Override del metodo del genitore
  faiVerso() {
    const versoBase = super.faiVerso(); // richiama il metodo del genitore
    return `${versoBase} (razza: ${this.razza})`;
  }
}

const bobby = new Cane('Bobby', 'Labrador');
console.log(bobby.faiVerso()); // Rex fa: Bau -> Bobby fa: Bau (razza: Labrador)
console.log(bobby instanceof Cane);    // true
console.log(bobby instanceof Animale); // true, l'ereditarietà mantiene la catena

// =================================================================
// PARTE 3: CAMPI E METODI PRIVATI (#)
// =================================================================
console.log('\n--- Campi privati ---');

class ContoBancario {
  #saldo; // campo privato: accessibile solo dentro la classe

  constructor(saldoIniziale) {
    this.#saldo = saldoIniziale;
  }

  deposita(importo) {
    this.#saldo += importo;
    return this.#saldo;
  }

  // Metodo privato: logica interna non esposta
  #validaImporto(importo) {
    return importo > 0;
  }

  preleva(importo) {
    if (!this.#validaImporto(importo) || importo > this.#saldo) {
      return 'Operazione non valida';
    }
    this.#saldo -= importo;
    return this.#saldo;
  }

  get saldo() {
    return this.#saldo;
  }
}

const conto = new ContoBancario(100);
console.log(conto.deposita(50));  // 150
console.log(conto.preleva(30));   // 120
console.log(conto.saldo);         // 120 (getter pubblico)
// console.log(conto.#saldo);     // SyntaxError in fase di PARSING (non runtime!):
                                   // i campi privati sono invisibili a livello sintattico
                                   // fuori dalla classe che li dichiara

// =================================================================
// PARTE 4: PROTOTYPE CHAIN — cosa c'è "sotto" le classi
// =================================================================
console.log('\n--- Prototype chain ---');

// "class" è zucchero sintattico: sotto il cofano usa ancora i prototipi
console.log(typeof Animale);                          // 'function', le classi SONO funzioni
console.log(Object.getPrototypeOf(bobby) === Cane.prototype);       // true
console.log(Object.getPrototypeOf(Cane.prototype) === Animale.prototype); // true

// I metodi di istanza vivono sul prototype, NON sull'oggetto stesso
console.log(cane.hasOwnProperty('nome'));      // true, proprietà propria
console.log(cane.hasOwnProperty('faiVerso'));  // false, sta sul prototype
console.log(typeof cane.faiVerso);             // 'function', ma ereditata

// Versione "manuale" pre-ES6 con function + prototype (utile per capire il meccanismo)
function AnimaleVecchioStile(nome) {
  this.nome = nome;
}
AnimaleVecchioStile.prototype.faiVerso = function () {
  return `${this.nome} verso generico`;
};
const gatto = new AnimaleVecchioStile('Miao');
console.log(gatto.faiVerso()); // Miao verso generico -- stesso risultato di "class"

// =================================================================
// PARTE 5: ESERCIZI PRATICI
// =================================================================
console.log('\n=== ESERCIZI ===');

// --- Esercizio 1: gerarchia con metodo astratto simulato ---
console.log('\n--- Esercizio 1: forme geometriche ---');

class Forma {
  area() {
    throw new Error('Il metodo area() deve essere implementato dalla sottoclasse');
  }
  descrivi() {
    return `Area: ${this.area().toFixed(2)}`;
  }
}

class Rettangolo extends Forma {
  constructor(base, altezza) {
    super();
    this.base = base;
    this.altezza = altezza;
  }
  area() {
    return this.base * this.altezza;
  }
}

class Cerchio extends Forma {
  constructor(raggio) {
    super();
    this.raggio = raggio;
  }
  area() {
    return Math.PI * this.raggio ** 2;
  }
}

const forme = [new Rettangolo(4, 5), new Cerchio(3)];
forme.forEach((f) => console.log(f.descrivi()));
// Area: 20.00
// Area: 28.27

// --- Esercizio 2: mixin (composizione, alternativa all'ereditarietà multipla) ---
console.log('\n--- Esercizio 2: mixin ---');

const Volante = (Base) =>
  class extends Base {
    vola() {
      return `${this.nome} sta volando!`;
    }
  };

class Uccello extends Volante(Animale) {}
const aquila = new Uccello('Aquila', 'Screech');
console.log(aquila.vola());     // Aquila sta volando!
console.log(aquila.faiVerso()); // Aquila fa: Screech (eredita anche da Animale)

// --- Esercizio 3 (da colloquio): implementare un semplice EventEmitter con classi ---
console.log('\n--- Esercizio 3: EventEmitter minimale ---');

class EventEmitter {
  #listeners = {};

  on(evento, callback) {
    if (!this.#listeners[evento]) this.#listeners[evento] = [];
    this.#listeners[evento].push(callback);
  }

  emit(evento, ...dati) {
    (this.#listeners[evento] || []).forEach((cb) => cb(...dati));
  }
}

const emitter = new EventEmitter();
emitter.on('saluto', (nome) => console.log(`Evento ricevuto: ciao ${nome}`));
emitter.emit('saluto', 'Mondo'); // Evento ricevuto: ciao Mondo

// =================================================================
// PARTE 6: DOMANDE DA COLLOQUIO
// =================================================================
console.log('\n=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Le classi in JavaScript sono "vera" OOP come in Java/C++?
R: No, sono zucchero sintattico sopra il sistema di prototipi già esistente
   in JS (prototype-based, non class-based). "class Cane extends Animale"
   crea comunque una catena di prototipi identica a quella ottenibile con
   function + Object.setPrototypeOf, ma con sintassi più leggibile e alcune
   protezioni (es. non richiamabile senza "new").

D: Che differenza c'è tra proprietà di istanza e metodi sul prototype?
R: Le proprietà definite nel constructor (this.x = ...) o come campi di
   classe vivono su OGNI singola istanza, occupando memoria per ciascuna.
   I metodi definiti nel corpo della classe vivono invece su un unico
   oggetto condiviso, il prototype, e vengono risolti tramite la catena dei
   prototipi quando li chiami su un'istanza (più efficiente in memoria).

D: Come funzionano i campi privati (#)?
R: Sono una feature nativa (non una convenzione come il vecchio prefisso
   _nome): il motore JS impedisce l'accesso da fuori la classe a livello di
   sintassi, non solo di convenzione. Un tentativo di accesso esterno
   (obj.#campo) causa un SyntaxError già in fase di parsing.

D: Cos'è un mixin e quando lo useresti al posto dell'ereditarietà?
R: Un mixin è una funzione che riceve una classe base e restituisce una
   nuova classe estesa con funzionalità aggiuntive. Si usa quando serve
   comporre più comportamenti riutilizzabili (es. Volante, Nuotatore) senza
   forzare una gerarchia di ereditarietà rigida, evitando i problemi tipici
   dell'ereditarietà multipla.
`);
