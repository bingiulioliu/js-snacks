/* ESERCIZI: Array & Object Methods
    Obiettivo: Dimostrare la padronanza delle manipolazioni comuni.  
*/

// --- ESERCIZI SUGLI ARRAY ---

// 1. Utilizza .map() per trasformare un array di numeri raddoppiandoli
const numeri = [1, 2, 3, 4, 5];
const doppi = numeri.map(n => n*2);
console.log('Es 1: ' + doppi); // Risultato atteso: [2, 4, 6, 8, 10]

// 2. Utilizza .filter() per estrarre solo i numeri pari
const pari = numeri.filter(n => n % 2 == 0);
console.log('Es 2: ' + pari); // Risultato atteso: [2, 4]

// 3. Utilizza .reduce() per calcolare la somma totale degli elementi
const somma = numeri.reduce((acc, n) =>{
    return acc + n
}, 0);
console.log('Es 3: ' + somma); // Risultato atteso: 15

// 4. Utilizza .find() per trovare il primo numero maggiore di 3
const maggioreDiTre = numeri.find(n => n > 3);
console.log('Es 4: ' + maggioreDiTre); // Risultato atteso: 4

// 5. Utilizza .some() per verificare se esiste almeno un numero negativo
const haNegativi = numeri.some(n => n < 0);
console.log('Es 5: ' + haNegativi); // Risultato atteso: false

// --- ESERCIZI SUGLI OGGETTI ---


const utente = {
    nome: "Mario",
    eta: 30,
    città: "Roma",
    lavoro: "Sviluppatore"
};

// 6. Utilizza Object.keys() per ottenere un array con i nomi delle proprietà
const chiavi = Object.keys(utente);
console.log('Es 6: ' + chiavi); // Risultato atteso: ["nome", "eta", "città", "lavoro"]

// 7. Utilizza Object.values() per ottenere un array con i valori
const valori = Object.values(utente);
console.log('Es 7: ' + valori); // Risultato atteso: ["Mario", 30, "Roma", "Sviluppatore"]

// 8. Utilizza Object.entries() per ottenere un array di coppie [chiave, valore]
const coppie = Object.entries(utente);
console.log(coppie);

// 9. Destrutturazione: Estrai 'nome' e 'città' dall'oggetto 'utente' in due variabili separate
const { nome, città } = utente;

// 10. Spread operator: Crea un nuovo oggetto 'utenteAggiornato' che mantenga 
// tutte le proprietà di 'utente' ma cambi la 'città' in "Milano"
const utenteAggiornato = { 
    ...utente,
    città: 'Milano'
    };
console.log(utenteAggiornato);