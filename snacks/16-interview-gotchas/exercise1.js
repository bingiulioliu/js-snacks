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


/* 1. Ciclo FOR classico: Stampa i numeri da 10 a 1 all'inverso */
// Implementa qui il ciclo for
for (let i = 10; i >= 1; i--){
    //console.log(i);
}
/* 2. Ciclo FOR...OF: Itera su un array di stringhe e stampa la lunghezza di ogni parola */
const parole = ["JavaScript", "Colloquio", "Sviluppatore"];
// Implementa qui il ciclo for...of
for (const element of parole){
    console.log(element.length);
} 

/* 3. Ciclo WHILE: Genera numeri casuali tra 1 e 10 finché non esce il numero 7 */
// Suggerimento: usa Math.random() e una variabile di controllo
let numeroEstratto = 0;
// Implementa qui il ciclo while
while (numeroEstratto !== 7) {
    numeroEstratto = Math.floor(Math.random() * 10) + 1;
    // console.log(numeroEstratto);
}

/* 4. Logica avanzata: Somma solo i numeri dispari di un array usando un ciclo FOR */
const listaNumeri = [1, 4, 7, 10, 13, 16];
let sommaDispari = 0;
// Implementa qui la logica
for (let i = 0; i < listaNumeri.length; i++) {
    if(listaNumeri[i] % 2 !== 0 ){
        sommaDispari += listaNumeri[i];
    }
}
console.log('A: ' + sommaDispari);

/* 5. Ciclo annidato: Crea una matrice (array di array) 3x3 e stampa solo gli elementi sulla diagonale principale */
const matrice = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
// Suggerimento: ti servirà un ciclo dentro l'altro (o un singolo ciclo se usi l'indice)