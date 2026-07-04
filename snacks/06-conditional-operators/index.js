// CONDITIONAL OPERATORS (if, else, ternario ?, e approfondimenti)
// Obiettivo: ripassare if/else/else if e l'operatore ternario, poi
// approfondire con switch, short-circuit (&&/||), nullish coalescing (??)
// e ottimizzazioni tipiche (guard clause) non coperte dal capitolo base.

console.log('=== CONDITIONAL OPERATORS ===');

// ---------------------------------------------------------------
// 1. RIPASSO: if / else / else if
// ---------------------------------------------------------------
console.log('\n--- if / else / else if ---');

function valutaAnno(year) {
  if (year < 2015) {
    return 'Troppo presto...';
  } else if (year > 2015) {
    return 'Troppo tardi';
  } else {
    return 'Esatto!';
  }
}

console.log(valutaAnno(2010)); // Troppo presto...
console.log(valutaAnno(2015)); // Esatto!
console.log(valutaAnno(2020)); // Troppo tardi

// ---------------------------------------------------------------
// 2. RIPASSO: operatore ternario ?
// ---------------------------------------------------------------
console.log('\n--- Operatore ternario ---');

const eta = 20;
const accessoConsentito = eta > 18 ? true : false;
console.log(accessoConsentito); // true

// Nota: qui il ternario è ridondante, il confronto restituisce già un booleano
const accessoConsentitoBreve = eta > 18;
console.log(accessoConsentitoBreve); // true, stesso risultato, più pulito

// Ternari incatenati (equivalenti a else if multipli)
function messaggioPerEta(age) {
  return age < 3 ? 'Ciao, piccolo!'
    : age < 18 ? 'Ciao!'
    : age < 100 ? 'Salve!'
    : 'Che età insolita!';
}
console.log(messaggioPerEta(2));   // Ciao, piccolo!
console.log(messaggioPerEta(15));  // Ciao!
console.log(messaggioPerEta(150)); // Che età insolita!

// ---------------------------------------------------------------
// 3. APPROFONDIMENTO: switch, alternativa a molti else if
// ---------------------------------------------------------------
console.log('\n--- switch ---');

function nomeGiorno(numero) {
  switch (numero) {
    case 1:
      return 'Lunedì';
    case 2:
      return 'Martedì';
    case 6:
    case 7: // "fall-through" intenzionale: stesso risultato per due case
      return 'Weekend';
    default:
      return 'Giorno non valido';
  }
}

console.log(nomeGiorno(1)); // Lunedì
console.log(nomeGiorno(6)); // Weekend
console.log(nomeGiorno(7)); // Weekend
console.log(nomeGiorno(9)); // Giorno non valido

// Trappola classica: switch usa === (uguaglianza stretta), niente conversioni!
function esempioStretto(valore) {
  switch (valore) {
    case '1': // stringa
      return 'Hai passato la stringa "1"';
    case 1: // numero
      return 'Hai passato il numero 1';
    default:
      return 'Nessuna corrispondenza';
  }
}
console.log(esempioStretto('1')); // Hai passato la stringa "1"
console.log(esempioStretto(1));   // Hai passato il numero 1

// ---------------------------------------------------------------
// 4. APPROFONDIMENTO: short-circuit con && e ||
// ---------------------------------------------------------------
console.log('\n--- Short-circuit && e || ---');

// && restituisce il primo valore falsy, o l'ultimo se tutti sono truthy
console.log(true && 'ciao');      // 'ciao'
console.log(0 && 'ciao');         // 0 (si ferma subito, 'ciao' non viene nemmeno letto)
console.log('a' && 'b' && 'c');   // 'c' (tutti truthy, ritorna l'ultimo)

// || restituisce il primo valore truthy, o l'ultimo se tutti sono falsy
console.log(null || 'default');   // 'default'
console.log('valore' || 'default'); // 'valore'
console.log(0 || '' || null || 'infine'); // 'infine'

// Uso pratico: && come "if abbreviato" per eseguire codice solo se la condizione è vera
const utenteLoggato = true;
utenteLoggato && console.log('Benvenuto!'); // eseguito solo se true

// Uso pratico: || per valori di default (ATTENZIONE alla trappola sotto)
function saluta(nome) {
  const nomeFinale = nome || 'Ospite';
  return `Ciao, ${nomeFinale}!`;
}
console.log(saluta('Marco')); // Ciao, Marco!
console.log(saluta(''));      // Ciao, Ospite!  <- forse non quello che volevi se '' è un input valido!
console.log(saluta(0));       // Ciao, Ospite!  <- stesso problema con lo 0

// ---------------------------------------------------------------
// 5. APPROFONDIMENTO: nullish coalescing ?? (la soluzione alla trappola sopra)
// ---------------------------------------------------------------
console.log('\n--- Nullish coalescing ?? ---');

// ?? restituisce il valore di default SOLO se il primo è null o undefined,
// a differenza di || che scatta per QUALSIASI valore falsy (0, '', NaN, false)
function salutaCorretto(nome) {
  const nomeFinale = nome ?? 'Ospite';
  return `Ciao, ${nomeFinale}!`;
}
console.log(salutaCorretto('Marco')); // Ciao, Marco!
console.log(salutaCorretto(''));      // Ciao, !     <- ora '' viene rispettato
console.log(salutaCorretto(0));       // (non applicabile a stringhe, ma il concetto vale per numeri)
console.log(salutaCorretto(null));    // Ciao, Ospite!
console.log(salutaCorretto(undefined)); // Ciao, Ospite!

// Confronto diretto || vs ?? con lo zero, il caso più comune di bug
const quantita = 0;
console.log(quantita || 10); // 10   <- probabilmente un bug, 0 è un valore legittimo!
console.log(quantita ?? 10); // 0    <- corretto, 0 non è null/undefined

// ---------------------------------------------------------------
// 6. APPROFONDIMENTO: optional chaining ?. (spesso combinato con condizioni)
// ---------------------------------------------------------------
console.log('\n--- Optional chaining ?. ---');

const utente = { profilo: { eta: 25 } };
const utenteVuoto = {};

console.log(utente.profilo?.eta);       // 25
console.log(utenteVuoto.profilo?.eta);  // undefined, nessun errore lanciato

// Senza ?. servirebbe un if annidato o un errore verrebbe lanciato:
// console.log(utenteVuoto.profilo.eta); // TypeError: Cannot read properties of undefined

// Combinazione elegante con ?? per un default finale
console.log(utenteVuoto.profilo?.eta ?? 'età sconosciuta'); // 'età sconosciuta'

// ---------------------------------------------------------------
// 7. APPROFONDIMENTO: guard clause, alternativa leggibile a if annidati
// ---------------------------------------------------------------
console.log('\n--- Guard clause ---');

// Stile "a piramide" (da evitare quando i controlli crescono)
function elaboraOrdinePiramide(ordine) {
  if (ordine) {
    if (ordine.quantita > 0) {
      if (ordine.prezzo > 0) {
        return `Totale: ${ordine.quantita * ordine.prezzo}`;
      } else {
        return 'Prezzo non valido';
      }
    } else {
      return 'Quantità non valida';
    }
  } else {
    return 'Ordine mancante';
  }
}

// Stile guard clause: usciamo subito nei casi invalidi, meno indentazione
function elaboraOrdine(ordine) {
  if (!ordine) return 'Ordine mancante';
  if (ordine.quantita <= 0) return 'Quantità non valida';
  if (ordine.prezzo <= 0) return 'Prezzo non valido';

  return `Totale: ${ordine.quantita * ordine.prezzo}`;
}

console.log(elaboraOrdinePiramide({ quantita: 2, prezzo: 10 })); // Totale: 20
console.log(elaboraOrdine({ quantita: 2, prezzo: 10 }));         // Totale: 20
console.log(elaboraOrdine({ quantita: -1, prezzo: 10 }));        // Quantità non valida
console.log(elaboraOrdine(null));                                // Ordine mancante

// ---------------------------------------------------------------
// 8. Buone pratiche riassuntive
// ---------------------------------------------------------------
console.log('\n--- Buone pratiche ---');
console.log('Ternario solo per scegliere un VALORE, non per eseguire azioni diverse');
console.log('switch usa ===, nessuna conversione di tipo implicita');
console.log('|| per default "qualsiasi falsy", ?? per default solo su null/undefined');
console.log('Guard clause per evitare piramidi di if annidati');
