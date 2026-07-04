// CLOSURES
// Obiettivo: capire come una funzione "ricorda" lo scope in cui è stata creata,
// anche dopo che quello scope è (apparentemente) terminato.

console.log('=== CLOSURES ===');

// 1. Esempio base: un contatore con stato privato
function creaContatore() {
  let conteggio = 0; // variabile "chiusa" dentro la closure

  return function incrementa() {
    conteggio += 1;
    return conteggio;
  };
}

const contatoreA = creaContatore();
const contatoreB = creaContatore();

console.log('contatoreA:', contatoreA()); // 1
console.log('contatoreA:', contatoreA()); // 2
console.log('contatoreB:', contatoreB()); // 1 (stato indipendente!)

// 2. Trappola classica: closures dentro un ciclo con "var"
console.log('\n--- Trappola var vs let ---');

function esempioVar() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var i:', i), 0); // stampa 3, 3, 3
  }
}

function esempioLet() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log('let i:', i), 0); // stampa 0, 1, 2
  }
}

esempioVar();
esempioLet();

// 3. Uso pratico: funzione factory con configurazione fissata
function creaModeratore(prefisso) {
  return function log(messaggio) {
    console.log(`[${prefisso}] ${messaggio}`);
  };
}

const logInfo = creaModeratore('INFO');
const logErrore = creaModeratore('ERRORE');

console.log('\n--- Factory con closure ---');
logInfo('avvio completato');
logErrore('qualcosa è andato storto');
