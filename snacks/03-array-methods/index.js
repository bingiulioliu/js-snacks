// ARRAY METHODS
// Obiettivo: ripassare map, filter, reduce e qualche metodo meno comune,
// con un dataset realistico invece di numeri a caso.

console.log('=== ARRAY METHODS ===');

export const prodotti = [
  { nome: 'Tastiera', prezzo: 45, categoria: 'informatica', scorte: 12 },
  { nome: 'Mouse', prezzo: 20, categoria: 'informatica', scorte: 0 },
  { nome: 'Sedia', prezzo: 120, categoria: 'arredamento', scorte: 5 },
  { nome: 'Scrivania', prezzo: 250, categoria: 'arredamento', scorte: 2 },
  { nome: 'Monitor', prezzo: 180, categoria: 'informatica', scorte: 8 },
];

// 1. filter: solo prodotti disponibili
console.log('\n--- filter: disponibili ---');
const disponibili = prodotti.filter((p) => p.scorte > 0);
console.log(disponibili.map((p) => p.nome));

// 2. map: trasformare in un formato diverso
console.log('\n--- map: etichette prezzo ---');
const etichette = prodotti.map((p) => `${p.nome}: €${p.prezzo}`);
console.log(etichette);

// 3. reduce: valore totale del magazzino
console.log('\n--- reduce: valore totale magazzino ---');
const valoreTotale = prodotti.reduce((acc, p) => acc + p.prezzo * p.scorte, 0);
console.log(`Valore totale: €${valoreTotale}`);

// 4. reduce per raggruppare per categoria (pattern molto utile)
console.log('\n--- reduce: raggruppamento per categoria ---');
const perCategoria = prodotti.reduce((acc, p) => {
  if (!acc[p.categoria]) acc[p.categoria] = [];
  acc[p.categoria].push(p.nome);
  return acc;
}, {});
console.log(perCategoria);

// 5. find / some / every
console.log('\n--- find / some / every ---');
console.log('Primo esaurito:', prodotti.find((p) => p.scorte === 0)?.nome);
console.log('Esiste un esaurito?', prodotti.some((p) => p.scorte === 0));
console.log('Tutti disponibili?', prodotti.every((p) => p.scorte > 0));

// 6. chaining: filtrare, trasformare e ordinare in pipeline
console.log('\n--- chaining ---');
const risultato = prodotti
  .filter((p) => p.categoria === 'informatica')
  .map((p) => ({ ...p, prezzoScontato: +(p.prezzo * 0.9).toFixed(2) }))
  .sort((a, b) => a.prezzoScontato - b.prezzoScontato);

console.log(risultato);
