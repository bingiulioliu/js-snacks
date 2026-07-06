/* ESERCIZIO 1: IL FILTRO DEI DUPLICATI (Spread e Set)
    Consegna:
    1. Hai una stringa: const testo = "abbccdeeeff";
    2. Trasforma la stringa in un array di caratteri unici, eliminando i duplicati.
    3. Usa l'operatore spread [...] e l'oggetto Set.
    
    Output atteso:
    ['a', 'b', 'c', 'd', 'e', 'f']
*/

// Scrivi qui il tuo codice:
const testo = "abbccdeeeff";
console.log('Es 1');
const testoFiltrato = Array.from([...new Set(testo)]);
console.log(testoFiltrato);


/* ESERCIZIO 2: LA TRAPPOLA DEL NUMERO (Type Coercion)
    Consegna:
    Spiega (o scrivi in un commento) perché il risultato di queste operazioni è quello indicato:
    1. console.log(Number([10]));    // Risultato: 10
    2. console.log(Number([10, 20]));// Risultato: NaN
    3. console.log(Boolean([]));     // Risultato: true
    
    Suggerimento: Ricorda il passaggio intermedio in stringa!
*/

// Scrivi qui le tue spiegazioni:


/* ESERCIZIO 3: GENERAZIONE DINAMICA (Array.from)
    Consegna:
    1. Usa 'Array.from' per creare un array che contiene i numeri da 1 a 10.
    2. (Bonus) Usa la funzione di mapping interna di 'Array.from' per elevare al cubo 
        solo i numeri dispari (o metti 0 per i pari).
    
    Output atteso (per il bonus):
    [1, 0, 27, 0, 125, 0, 343, 0, 729, 0]
*/

// Scrivi qui il tuo codice: