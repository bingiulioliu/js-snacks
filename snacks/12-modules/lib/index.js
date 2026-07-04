// lib/index.js
// "Barrel file": raccoglie e ri-esporta più moduli da un unico punto
// d'ingresso, così chi consuma la libreria fa un solo import.

export * from './matematica.js';       // ri-esporta tutti gli export nominati
export { default as moltiplica } from './matematica.js'; // il default va rinominato esplicitamente
export * from './stringUtils.js';
