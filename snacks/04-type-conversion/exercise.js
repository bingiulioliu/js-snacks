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
// 1. 10 numero valido
// 2. 10, 20 non è considerato un numero
// 3. array sempre true perchè oggetto


/* ESERCIZIO 3: GENERAZIONE DINAMICA (Array.from)
    Consegna:
    1. Usa 'Array.from' per creare un array che contiene i numeri da 1 a 10.
    2. (Bonus) Usa la funzione di mapping interna di 'Array.from' per elevare al cubo 
        solo i numeri dispari (o metti 0 per i pari).
    
    Output atteso (per il bonus):
    [1, 0, 27, 0, 125, 0, 343, 0, 729, 0]
*/

// Scrivi qui il tuo codice:
const numArr = Array.from({ length: 10 }, (_, i) => i + 1);
console.log('Es 3');
console.log(numArr);

const potenza = (array) => {
    return array.map((num => (
        num % 2 === 0 ? 0 : num ** 3
    )));
}
console.log(potenza(numArr));

/* ESERCIZIO 4: TRASFORMAZIONE E RAGGRUPPAMENTO
    Consegna:
    1. Partendo dall'array 'prodotti', crea un nuovo array contenente solo gli oggetti
        che hanno almeno 5 scorte.
    2. Per questi prodotti, aggiungi una proprietà 'valoreTotale' (prezzo * scorte).
    3. Infine, usa 'reduce' per calcolare la somma dei 'valoreTotale' di tutti questi prodotti.
    
    Output atteso:
    Un numero (la somma del valore totale dei prodotti con scorte >= 5)
*/

// Scrivi qui il tuo codice:
import { prodotti } from '../03-array-methods/index.js';
const cinqueScorte = prodotti
    .filter(prodotto => prodotto.scorte >= 5)
    .map((p) => {
        return {...p, valoreTotale: p.prezzo * p.scorte}
    })
    .reduce((acc, p) =>{
        return acc + p.valoreTotale
    }, 0)

console.log('Es 5');
console.log(cinqueScorte);

/* ESERCIZIO 5: FILTRO E CREAZIONE DI UNA MAPPA (OGGETTO)
    Consegna:
    1. Crea un oggetto che "mappa" i nomi dei prodotti alle loro categorie.
    2. Esempio: { "Tastiera": "informatica", "Mouse": "informatica", ... }
    3. Usa 'reduce' per creare questo oggetto partendo dall'array 'prodotti'.
    4. (Bonus) Fai la stessa cosa, ma includi nell'oggetto solo i prodotti
        che costano più di 100 euro.
*/

// Scrivi qui il tuo codice:
console.log('Es 5');

const filteredProd = prodotti
    .reduce((acc, p) => {
        if (p.prezzo > 100) {
            acc[p.nome] = p.categoria
        }
        return acc;
    }, {})

console.log(filteredProd);
