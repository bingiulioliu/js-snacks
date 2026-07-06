## 📘 Appunti: L'oggetto `Set` in JavaScript

Il `Set` è una collezione di **valori unici**. A differenza degli array, non permette duplicati e non è indicizzato (non puoi accedere agli elementi tramite `[i]`).

### 1. Dichiarazione e Creazione

Puoi creare un `Set` vuoto o partire da un array esistente (utile per pulire i dati).

```javascript
const setVuoto = new Set();
const setDaArray = new Set([1, 2, 2, 3]); // Risultato: {1, 2, 3} (i duplicati spariscono)

```

### 2. Metodi Principali (La Cassetta degli Attrezzi)

Il `Set` si gestisce tramite metodi specifici. Ricorda: **usa `.size` al posto di `.length**`.

* `.add(valore)`: Aggiunge un elemento (se esiste già, non fa nulla).
* `.has(valore)`: Restituisce `true` se il valore è presente (estremamente veloce).
* `.delete(valore)`: Rimuove un elemento specifico.
* `.clear()`: Svuota completamente il set.
* `.size`: Proprietà che restituisce il numero di elementi.

### 3. Perché usare un Set? (Casi d'uso)

* **De-duplicazione:** Il modo più veloce e moderno per rimuovere duplicati da un array.
```javascript
const arrayPulito = [...new Set(arrayConDuplicati)]; 
// Trasforma in Set (toglie duplicati) -> Spread (...) riporta in Array

```


* **Ricerca rapida:** Se devi controllare spesso se un elemento esiste in una lista enorme, il `Set` è molto più performante di un `Array` perché il metodo `.has()` non deve scansionare tutto l'elenco (è un'operazione quasi istantanea).

### 4. Differenze chiave: Array vs Set

| Funzionalità | Array | Set |
| --- | --- | --- |
| **Duplicati** | Permessi | **NON ammessi** |
| **Accesso** | Indice `arr[0]` | Nessun indice |
| **Ricerca** | `.includes()` (lenta) | `.has()` (molto veloce) |
| **Dimensione** | `.length` | `.size` |

---

### 💡 Tips:

* **Non è un array:** Non puoi usare `.map()`, `.filter()` o `.reduce()` direttamente su un `Set`. Se hai bisogno di usare questi metodi, devi prima convertirlo in un array usando lo spread operator `[...mioSet]` o `Array.from(mioSet)`.
* **Ordine:** Il `Set` mantiene l'ordine di inserimento degli elementi.
* **Oggetti:** Attenzione! Nel `Set`, due oggetti diversi sono considerati distinti anche se hanno lo stesso contenuto `{a:1} !== {a:1}`.