import { prodotti } from "./index.js";
/* ESERCIZIO 1: IL FILTRO AVANZATO
    Consegna:
    Partendo dall'array 'prodotti' originale:
    1. Usa 'filter' per trovare solo gli oggetti della categoria 'informatica'.
    2. Usa 'map' per restituire solo i nomi di questi prodotti in maiuscolo.
    
    Output atteso:
    ["TASTIERA", "MOUSE", "MONITOR"]
*/

// Scrivi qui il tuo codice:
console.log('Ex 1');

const prodottiInformatica = prodotti.filter(prodotto => prodotto.categoria === 'informatica')
console.log(prodottiInformatica.map(prodotto=>prodotto.nome));


/* ESERCIZIO 2: ANALISI DEL CATALOGO (REDUCE)
    Consegna:
    1. Usa 'reduce' per calcolare il numero totale di prodotti in stock (somma la proprietà 'scorte').
    2. Usa 'reduce' per trovare il prodotto più costoso (restituisci l'intero oggetto).

    Output atteso:
    Totale scorte: 27
    Prodotto più costoso: { nome: 'Scrivania', prezzo: 250, ... }
*/

// Scrivi qui il tuo codice:
console.log('Es 2');

const scorte = prodotti.reduce((acccumulatore, prodotto) => acccumulatore + prodotto.scorte, 0)
console.log(scorte);

const prodottoPiuCostoso = prodotti.reduce((acc, curr) => {
    return (curr.prezzo > acc.prezzo) ? curr : acc;
}, prodotti[0]);
console.log(prodottoPiuCostoso);


/* ESERCIZIO 3: CHAINING E LOGICA
    Consegna:
    Devi preparare una lista per un "Black Friday":
    1. Prendi solo i prodotti con meno di 5 scorte.
    2. Aggiungi a questi oggetti una nuova proprietà 'inEsaurimento: true'.
    3. Trasforma il risultato in un array di stringhe nel formato: "NOME (Categoria)".

    Output atteso:
    ["MOUSE (informatica)", "SCRIVANIA (arredamento)"]
*/

// Scrivi qui il tuo codice:
console.log('Es 3');
const sconti = prodotti
    .filter(p => p.scorte < 5)
    .map((p) => ({...p, inEsaurimento: true }))
    .map(p => `${p.nome} (${p.categoria})`)

console.log(sconti);

/* ESERCIZIO 4: IL REPORT DELLE CATEGORIE
    Consegna:
    1. Usa 'reduce' per creare un oggetto che contenga solo le categorie come chiavi, 
        e come valore il numero totale di prodotti per quella categoria.
    
    Output atteso:
    { informatica: 3, arredamento: 2 }
*/

// Scrivi qui il tuo codice:
const prodottiCategoria = prodotti.reduce((acc, curr) => {
    const cat = curr.categoria
    if (acc[cat]) {
        acc[cat] = acc[cat]+1
    } else {
        acc[cat] = 1
    }
    return acc
}, {})
console.log('Es 4');
console.log(prodottiCategoria);



/* ESERCIZIO 5: RICERCA E TRASFORMAZIONE (FINESSE)
    Consegna:
    1. Trova il primo prodotto che costa più di 100 euro.
    2. Se esiste, restituisci una stringa "Trovare: NOME - PREZZO".
    3. Se non esiste, restituisci "Nessun prodotto trovato".
    (Usa l'operatore ternario e l'optional chaining `?.` o un if/else)

    Output atteso:
    "Trovare: Sedia - 120"
*/

// Scrivi qui il tuo codice: