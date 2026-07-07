/* ESERCIZI AVANZATI: Manipolazione Dati */

const ordini = [
    { id: 1, prodotto: "Laptop", categoria: "Elettronica", prezzo: 1000, quantita: 1 },
    { id: 2, prodotto: "Mouse", categoria: "Elettronica", prezzo: 25, quantita: 3 },
    { id: 3, prodotto: "Sedia", categoria: "Arredamento", prezzo: 150, quantita: 2 },
    { id: 4, prodotto: "Tastiera", categoria: "Elettronica", prezzo: 50, quantita: 1 }
];

// 1. Calcola il totale speso per la categoria "Elettronica"
// Suggerimento: Filtra per categoria, poi usa reduce per sommare (prezzo * quantita)
const totaleElettronica = ordini
    .filter((o) => o.categoria === 'Elettronica')
    .reduce((acc, o) => acc + o.prezzo * o.quantita, 0)
console.log(totaleElettronica);

// 2. Crea un nuovo array di stringhe che contenga solo i nomi dei prodotti in maiuscolo
// Suggerimento: Usa .map()
const nomiProdotti = ordini.map((o) => {
    const {prodotto} = o
    return {...o, prodotto: prodotto.toUpperCase()}
})
console.log(nomiProdotti);

// 3. Trasforma l'array 'ordini' in un oggetto dove le chiavi sono gli 'id' 
// e i valori sono gli oggetti ordine completi
// Suggerimento: Usa .reduce() con un oggetto vuoto {} come valore iniziale
const ordiniPerId = ordini.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
}, {})
console.log(ordiniPerId);

// 4. Verifica se esiste almeno un prodotto con un prezzo superiore a 800
// Suggerimento: Usa .some()
const haProdottiCostosi = ordini.some(o => o.prezzo > 800)
console.log(haProdottiCostosi);

// 5. Crea una lista (array) di tutte le categorie uniche presenti
// Suggerimento: Usa .map() per estrarre le categorie, 
// poi il costruttore 'new Set()' per rimuovere i duplicati, 
// infine lo spread operator [...] per tornare ad array
const categorieUniche = [... new Set(ordini.map((o) => o.categoria))]

console.log(categorieUniche);
