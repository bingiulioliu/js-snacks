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

/* ESERCIZI: Cicli (For, While, Do...While) */

// 1. FOR: Somma dei quadrati
// Calcola la somma dei quadrati dei numeri da 1 a 5 (1*1 + 2*2 + ... + 5*5)
let sommaQuadrati = 0;
// Implementa qui...
for (let i = 0; i <= 5; i++) {
    sommaQuadrati += i*i;
}
console.log(sommaQuadrati);

// 2. FOR...OF: Conteggio vocali
// Data una stringa, conta quante vocali contiene
const frase = "javascript è potente";
let conteggioVocali = 0;
// Implementa qui...
for (let lettera of frase) {
    const vocali = 'aeiouè';
    if (vocali.includes(lettera)){
        conteggioVocali++
    }
}
console.log(conteggioVocali);


// 3. WHILE: Ricerca primo multiplo
// Trova il primo numero maggiore di 100 che sia divisibile per 13
let numero = 101;
// Implementa qui...
while (numero % 13 !== 0) {
    numero++
}
console.log(numero);


// 4. DO...WHILE: Menu interattivo (Simulazione)
// Chiedi all'utente di inserire un numero finché non inserisce 0.
// (Usa una variabile per simulare l'input o usa prompt() se sei nel browser)
let input = [5, 4, 7, 3, 1, 0];
// Implementa qui...

// 5. CICLO ANNIDATO (FOR): Tabellina
// Stampa una tabellina del 3 (da 3x1 a 3x10) usando un ciclo
// Implementa qui...
for (let i = 1; i <= 10; i++) {
    console.log(i*3);
}

/* ESERCIZI AVANZATI: Logica e Cicli */

// 1. FOR: Inversione di una stringa
// Senza usare .reverse(), crea una nuova stringa invertendo quella data
const parola = "JavaScript";
let parolaInversa = "";
// Implementa qui...

// 2. WHILE: Calcolo fattoriale
// Calcola il fattoriale di un numero (es. 5! = 5*4*3*2*1 = 120)
const n = 5;
let fattoriale = 1;
// Implementa qui...

// 3. DO...WHILE: Generatore sequenziale
// Genera numeri casuali tra 1 e 20 finché non esce un numero divisibile per 5. 
// Assicurati che il ciclo venga eseguito almeno una volta.
let estratto;
// Implementa qui...

// 4. FOR: Analisi di una sequenza (FizzBuzz classico)
// Itera da 1 a 20. Se il numero è multiplo di 3 stampa "Fizz",
// se è multiplo di 5 stampa "Buzz", se è entrambi stampa "FizzBuzz"
// Implementa qui...

// 5. CICLO ANNIDATO: Disegno di un triangolo
// Stampa un triangolo di asterischi di altezza 5:
// *
// **
// ***
// ****
// *****
// Suggerimento: un ciclo per le righe, uno per le colonne