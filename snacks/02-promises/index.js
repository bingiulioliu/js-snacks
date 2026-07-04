// PROMISES & ASYNC/AWAIT
// Obiettivo: ripassare la gestione dell'asincronia in JS, dai callback alle Promise,
// fino alla sintassi async/await.

console.log('=== PROMISES & ASYNC/AWAIT ===');

// Utility per simulare un'operazione asincrona (es. chiamata a un server)
function simulaFetch(dato, ritardoMs = 500, fallisce = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fallisce) {
        reject(new Error(`Impossibile recuperare: ${dato}`));
      } else {
        resolve(`Dato ricevuto: ${dato}`);
      }
    }, ritardoMs);
  });
}

// 1. Promise base con .then/.catch
console.log('\n--- .then/.catch ---');
simulaFetch('utente-1')
  .then((risultato) => console.log(risultato))
  .catch((errore) => console.error(errore.message));

// 2. async/await con try/catch
async function eseguiConAwait() {
  console.log('\n--- async/await ---');
  try {
    const risultato = await simulaFetch('utente-2', 300);
    console.log(risultato);

    // Questo fallirà volutamente
    const risultatoErrore = await simulaFetch('utente-3', 300, true);
    console.log(risultatoErrore); // non viene mai eseguito
  } catch (errore) {
    console.error('Catturato errore:', errore.message);
  }
}

// 3. Promise.all: eseguire più operazioni in parallelo
async function eseguiInParallelo() {
  console.log('\n--- Promise.all ---');
  const inizio = Date.now();

  const risultati = await Promise.all([
    simulaFetch('parallelo-A', 400),
    simulaFetch('parallelo-B', 200),
    simulaFetch('parallelo-C', 600),
  ]);

  console.log(risultati);
  console.log(`Tempo totale: ~${Date.now() - inizio}ms (non la somma dei ritardi!)`);
}

// Eseguiamo tutto in sequenza logica per leggere bene l'output in console
async function main() {
  await eseguiConAwait();
  await eseguiInParallelo();
}

main();
