/* ESERCIZIO 1: IL CONTATORE PERSISTENTE
    Istruzioni:
    1. Crea una funzione chiamata 'creaContatore'.
    2. Definisci una variabile 'count' inizializzata a 0.
    3. Fai in modo che la funzione restituisca un'altra funzione (una closure).
    4. La funzione restituita deve incrementare 'count' e stamparlo in console.
    Output atteso:
    1
    2
*/

// Scrivi qui il tuo codice:
function creaContatore() {
    let count = 0;

    return function() {
        count += 1
        return count;
    };
};

// Test:
const contatore = creaContatore();
console.log('Es 1');
console.log(contatore());
console.log(contatore());


/* ESERCIZIO 2: LA TRAPPOLA DEL CICLO
    Istruzioni:
    1. Crea una funzione 'creaFunzioni'.
    2. Definisci un array vuoto.
    3. Crea un ciclo for che va da 0 a 2 (escluso il 3).
    4. Usa 'var' per il contatore del ciclo (i).
    5. Inserisci nell'array una funzione che stampa 'i'.
    6. Restituisci l'array.
    7. Dopo aver eseguito, prova a cambiare 'var' in 'let' e osserva la differenza.

    Output atteso (con var):
    3
    3
    3
*/

// Scrivi qui il tuo codice:
console.log('Es 2');

function creaFunzioni() {
    const arr = [];

    for (var i = 0; i < 3; i++ ) {
        arr.push(function() {
            console.log(i);
        });
    }
    return arr;
}

// Test:
const funzioni = creaFunzioni();
funzioni[0]();
funzioni[1]();
funzioni[2]();


/* ESERCIZIO 3: SCOPE ANNIDATI
    Istruzioni:
    1. Crea una funzione 'esterna' che accetta un parametro 'x'.
    2. Restituisci una funzione 'media' che accetta un parametro 'y'.
    3. Questa funzione deve restituire un'altra funzione 'interna' che accetta 'z'.
    4. 'interna' deve restituire la media aritmetica di x, y e z.

    Output atteso:
    20
*/

// Scrivi qui il tuo codice:
console.log('Es 3');
function esterna(x) {
    return function media(y){
        return function interna(z){
            return (x+y+z)/3
        };
    };
}

// Test:
const step1 = esterna(10);
const step2 = step1(20);
console.log(step2(30));


/* ESERCIZIO 4: IL GENERATORE DI MESSAGGI (Closure per configurazione)
    Istruzioni:
    1. Crea una funzione 'creaSaluto' che accetta un parametro 'prefisso'.
    2. Restituisci una funzione che accetta un parametro 'nome'.
    3. La funzione restituita deve stampare in console: "[prefisso], [nome]!".
    4. Crea due istanze diverse: una per "Buongiorno" e una per "Ciao".

    Output atteso:
    Buongiorno, Mario!
    Ciao, Anna!
*/

// Scrivi qui il tuo codice:
console.log('Es 4');
function creaSaluto(prefisso){
    return function(nome){
        console.log(`${prefisso}, ${nome}!`);
    };
}

// Test:
const buongiorno = creaSaluto("Buongiorno");
const ciao = creaSaluto("Ciao");
buongiorno("Mario");
ciao("Anna");


/* ESERCIZIO 5: PROTEZIONE DEI DATI (Incapsulamento)
    Istruzioni:
    1. Crea una funzione 'creaBorsa'.
    2. All'interno, definisci un array 'oggetti' vuoto.
    3. Restituisci un oggetto con due metodi:
        - 'aggiungi(item)': aggiunge un elemento all'array.
        - 'elenca()': ritorna una stringa con tutti gli oggetti separati da virgola.
    4. Verifica che non sia possibile accedere direttamente all'array 'oggetti' dall'esterno.

    Output atteso:
    "penna, quaderno"
    undefined (il tentativo di accedere direttamente alla lista deve fallire)
*/

// Scrivi qui il tuo codice:
console.log('Es 5');
function creaBorsa(){
    const oggetti = [];

    return {
        // Metodo push per aggiungere l'item agli oggetti
        aggiungi: function(item){
            oggetti.push(item);
        },
        // Metodo join per ritornare una stringa
        elenca: function(){
            return oggetti.join(', ');
        }
    };
}

// Test:
const miaBorsa = creaBorsa();
miaBorsa.aggiungi("penna");
miaBorsa.aggiungi("quaderno");
console.log(miaBorsa.elenca());
console.log(miaBorsa.oggetti); 