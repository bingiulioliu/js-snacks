// GESTIONE ERRORI: try/catch/finally, throw, errori custom
// Obiettivo: gestire errori in modo robusto, creare errori custom
// significativi, e capire le trappole comuni con async/finally.

console.log('=== GESTIONE ERRORI ===');

// =================================================================
// PARTE 1: TRY/CATCH/FINALLY
// =================================================================
console.log('\n--- try/catch/finally ---');

function dividi(a, b) {
  try {
    if (b === 0) {
      throw new Error('Divisione per zero non consentita');
    }
    return a / b;
  } catch (errore) {
    console.log('Errore catturato:', errore.message);
    return null;
  } finally {
    // finally viene SEMPRE eseguito, con o senza errore, anche con return nel try/catch
    console.log('Operazione di divisione conclusa (finally)');
  }
}

console.log(dividi(10, 2)); // 5, poi "Operazione conclusa"
console.log(dividi(10, 0)); // Errore catturato..., poi "Operazione conclusa", poi null

// Trappola: return dentro finally sovrascrive qualsiasi return precedente
function esempioReturnInFinally() {
  try {
    return 'dal try';
  } finally {
    return 'dal finally'; // vince sempre questo! evitare questo pattern
  }
}
console.log(esempioReturnInFinally()); // 'dal finally'

// =================================================================
// PARTE 2: ERRORI CUSTOM (extends Error)
// =================================================================
console.log('\n--- Errori custom ---');

class ValidationError extends Error {
  constructor(messaggio, campo) {
    super(messaggio);
    this.name = 'ValidationError'; // sovrascrive "Error" di default nello stack trace
    this.campo = campo;
  }
}

class NotFoundError extends Error {
  constructor(risorsa) {
    super(`${risorsa} non trovato`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

function validaEta(eta) {
  if (typeof eta !== 'number') {
    throw new ValidationError('L\'età deve essere un numero', 'eta');
  }
  if (eta < 0 || eta > 120) {
    throw new ValidationError('Età fuori range plausibile', 'eta');
  }
  return true;
}

try {
  validaEta(-5);
} catch (errore) {
  console.log(errore.name, '-', errore.message, '- campo:', errore.campo);
  console.log('È un\'istanza di Error?', errore instanceof Error); // true, mantiene la catena
}

// Gestione differenziata in base al TIPO di errore (pattern molto usato)
function gestisciErrore(errore) {
  if (errore instanceof ValidationError) {
    return `Correggi il campo "${errore.campo}": ${errore.message}`;
  }
  if (errore instanceof NotFoundError) {
    return `Risorsa mancante (${errore.statusCode}): ${errore.message}`;
  }
  return `Errore generico: ${errore.message}`;
}

try {
  throw new NotFoundError('Utente');
} catch (e) {
  console.log(gestisciErrore(e)); // Risorsa mancante (404): Utente non trovato
}

// =================================================================
// PARTE 3: ERRORI IN CONTESTO ASYNC
// =================================================================
console.log('\n--- Errori con async/await ---');

function operazioneAsincronaFallibile(fallisce) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fallisce ? reject(new Error('Fallimento remoto')) : resolve('Dati ricevuti');
    }, 50);
  });
}

async function eseguiConGestione() {
  try {
    const risultato = await operazioneAsincronaFallibile(true);
    console.log(risultato);
  } catch (errore) {
    console.log('Errore async catturato:', errore.message);
  } finally {
    console.log('Cleanup eseguito comunque');
  }
}
await eseguiConGestione();

// Gestiamo a livello di processo l'unhandledRejection che genereremo di proposito
// qui sotto, solo per evitare che lo script termini in crash: in un'app reale
// questo log indicherebbe un bug da correggere, non un evento da ignorare.
process.on('unhandledRejection', (errore) => {
  console.log('(unhandledRejection catturato a scopo dimostrativo):', errore.message);
});

// Trappola: dimenticare await su una chiamata async dentro try
async function trappolaAwaitDimenticato() {
  try {
    operazioneAsincronaFallibile(true); // manca await! l'errore NON viene catturato qui
    console.log('Questo viene stampato subito, prima del reject');
  } catch (errore) {
    console.log('Non arriverà mai qui per questo errore');
  }
}
await trappolaAwaitDimenticato();
// Nota: la Promise rifiutata "in sospeso" genererà un unhandledRejection separato

// =================================================================
// PARTE 4: ESERCIZI PRATICI
// =================================================================
console.log('\n=== ESERCIZI ===');

// --- Esercizio 1: funzione "safe" che non lancia mai, restituisce un risultato tipizzato ---
console.log('\n--- Esercizio 1: pattern Result (successo/errore) ---');

function safeParseJSON(stringa) {
  try {
    return { successo: true, dato: JSON.parse(stringa), errore: null };
  } catch (errore) {
    return { successo: false, dato: null, errore: errore.message };
  }
}

console.log(safeParseJSON('{"nome":"Anna"}')); // { successo: true, dato: {...}, errore: null }
console.log(safeParseJSON('{invalido}'));      // { successo: false, dato: null, errore: '...' }

// --- Esercizio 2: gerarchia di errori applicativi ---
console.log('\n--- Esercizio 2: gerarchia AppError ---');

class AppError extends Error {
  constructor(messaggio, codice) {
    super(messaggio);
    this.name = this.constructor.name; // usa dinamicamente il nome della sottoclasse
    this.codice = codice;
  }
}
class AuthError extends AppError {
  constructor(messaggio) {
    super(messaggio, 401);
  }
}
class PermissionError extends AppError {
  constructor(messaggio) {
    super(messaggio, 403);
  }
}

function gestisciRichiesta(erroreSimulato) {
  try {
    throw erroreSimulato;
  } catch (e) {
    if (e instanceof AppError) {
      console.log(`[${e.codice}] ${e.name}: ${e.message}`);
    } else {
      console.log('Errore non gestito:', e.message);
    }
  }
}
gestisciRichiesta(new AuthError('Token scaduto'));           // [401] AuthError: Token scaduto
gestisciRichiesta(new PermissionError('Accesso negato'));    // [403] PermissionError: Accesso negato

// --- Esercizio 3: validazione multipla con raccolta di tutti gli errori ---
console.log('\n--- Esercizio 3: validazione con raccolta errori ---');

function validaForm(dati) {
  const errori = [];
  if (!dati.email?.includes('@')) errori.push('Email non valida');
  if (!dati.password || dati.password.length < 8) errori.push('Password troppo corta');
  if (!dati.nome) errori.push('Nome obbligatorio');

  if (errori.length > 0) {
    throw new ValidationError(errori.join('; '), 'form');
  }
  return true;
}

try {
  validaForm({ email: 'no-email', password: '123' });
} catch (e) {
  console.log(e.message); // Email non valida; Password troppo corta; Nome obbligatorio
}

// =================================================================
// PARTE 5: DOMANDE DA COLLOQUIO
// =================================================================
console.log('\n=== DOMANDE DA COLLOQUIO ===');

console.log(`
D: Perché creare classi di errore custom invece di usare sempre "new Error"?
R: Permettono di distinguere PROGRAMMATICAMENTE i tipi di errore con
   "instanceof", di allegare dati aggiuntivi (codice, campo, statusCode) e
   di gestire ogni categoria di errore in modo diverso senza dover fare
   parsing del messaggio testuale, che è fragile e soggetto a modifiche.

D: finally viene eseguito anche se c'è un return nel try o nel catch?
R: Sì, finally viene sempre eseguito. Attenzione però: se anche finally
   contiene un return (o throw), questo SOVRASCRIVE qualsiasi return o throw
   precedente nel try/catch. È considerato un anti-pattern da evitare.

D: Cosa succede se dimentico "await" davanti a una funzione async dentro un try?
R: La funzione async parte comunque, ma il try/catch non aspetta il suo
   completamento: se successivamente la Promise viene rifiutata, l'errore
   NON verrà catturato da quel catch (il blocco try è già terminato), e
   genererà invece un "unhandled promise rejection" separato.

D: Qual è la differenza tra un errore "operativo" (es. validazione, rete) e
   un errore di programmazione (bug)?
R: Gli errori operativi sono previsti e gestibili (dati non validi, rete
   giù, permessi mancanti): vanno catturati e gestiti con messaggi utili.
   Gli errori di programmazione (bug, TypeError su undefined non previsto)
   indicano un difetto nel codice: spesso è meglio farli "esplodere" e
   correggerli, piuttosto che nasconderli con un catch generico.
`);
