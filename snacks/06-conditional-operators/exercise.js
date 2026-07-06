/* Esercizio: Gestione configurazione con valori di default
    Obiettivo: Se 'timeout' è null/undefined, usa 5000. Se 'tema' è null/undefined, usa 'light'.
    Testa la tua funzione con questi oggetti:
    1. { timeout: 0, tema: 'dark' } -> Deve restituire { timeout: 0, tema: 'dark' }
    2. { timeout: null, tema: null } -> Deve restituire { timeout: 5000, tema: 'light' }
*/
console.log('Es 1');
function impostaConfigurazione(config) {
  // Scrivi qui il tuo codice usando ??
}



/* Esercizio: Refactoring piramide
    La funzione 'registraUtente' deve verificare che:
    1. L'utente esista (non null).
    2. L'utente abbia un'età >= 18.
    3. L'utente abbia una email (proprietà .email esistente).
    Se tutto ok, restituisce "Registrazione completata". 
    Altrimenti restituisce l'errore specifico ("Utente mancante", "Minorenne", "Email mancante").
*/
console.log('Es 2');
function registraUtente(utente) {
  // Scrivi qui il codice usando le guard clauses (if... return)
}


/*
    Esercizio: Sistema di notifiche
    1. Se 'status' è 'admin', assegna a 'ruolo' la stringa 'Amministratore', altrimenti 'Utente'.
    2. Se 'notificheAttive' è true, chiama la funzione `inviaEmail()` (usa &&).
*/
console.log('Es 3');
const status = 'admin';
const notificheAttive = true;

function inviaEmail() { console.log('Email inviata!'); }

// 1. Scrivi qui il ternario per 'ruolo':
//const ruolo = // ...

// 2. Scrivi qui lo short-circuit per inviare l'email:
// ...