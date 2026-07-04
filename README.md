# JS Snacks

Raccolta di piccoli esercizi JavaScript per ripasso, eseguibili singolarmente da terminale con Node.js.

## Come si usa

Ogni snack è una cartella indipendente con un `index.js` autosufficiente:

```bash
node snacks/01-closures/index.js
```

## Creare un nuovo snack

Uno script genera automaticamente la prossima cartella numerata con un template già pronto:

```bash
pnpm run new -- nome-dello-snack
```

Esempio:

```bash
pnpm run new -- generators
# crea snacks/04-generators/index.js
```

## Indice snack

| # | Cartella | Argomento |
|---|----------|-----------|
| 01 | [closures](snacks/01-closures) | Closures, stato privato, trappola var/let nei cicli |
| 02 | [promises](snacks/02-promises) | Promise, async/await, Promise.all |
| 03 | [array-methods](snacks/03-array-methods) | map, filter, reduce, find, chaining |
| 04 | [type-conversion](snacks/04-type-conversion) | String/Number/Boolean, conversioni con gli array, array-like, spread |
| 05 | [comparisons](snacks/05-comparisons) | ==/===, null/undefined, NaN, Object.is, confronto oggetti |
| 06 | [conditional-operators](snacks/06-conditional-operators) | if/else, ternario, switch, &&/\|\|, ??, ?., guard clause |
| 07 | [destructuring](snacks/07-destructuring) | Destructuring array/oggetti, spread/rest, array methods avanzati |
| 08 | [scope-and-this](snacks/08-scope-and-this) | var/let/const, hoisting, TDZ, this, call/apply/bind |
| 09 | [async-advanced](snacks/09-async-advanced) | Event loop, microtask/macrotask, Promise.all/race/any/allSettled |
| 10 | [classes-oop](snacks/10-classes-oop) | class, extends/super, campi privati, prototype chain, mixin |
| 11 | [error-handling](snacks/11-error-handling) | try/catch/finally, errori custom, errori in async |
| 12 | [modules](snacks/12-modules) | import/export, named/default, barrel file (con moduli reali in lib/) |
| 13 | [advanced-patterns](snacks/13-advanced-patterns) | HOF, currying, composizione, debounce/throttle, memoization |
| 14 | [generators-iterators](snacks/14-generators-iterators) | function*, yield, Symbol.iterator, sequenze infinite lazy |
| 15 | [collections](snacks/15-collections) | Map, Set, WeakMap, WeakSet |
| 16 | [interview-gotchas](snacks/16-interview-gotchas) | typeof, instanceof, coercizione, falsy values, trabocchetti |


## Convenzioni

- Un concetto per snack: evitare di mischiare più argomenti nello stesso file.
- Numerazione progressiva per mantenere l'ordine cronologico del ripasso.
- Commenti che spiegano il *perché*, non solo il *cosa*.
- Aggiornare la tabella sopra ogni volta che si aggiunge uno snack.
