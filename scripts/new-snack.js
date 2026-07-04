// Script per generare rapidamente un nuovo snack.
// Uso: pnpm run new -- nome-dello-snack
// Esempio: pnpm run new -- 04-generators

import { mkdirSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SNACKS_DIR = new URL('../snacks/', import.meta.url).pathname;

function nextNumber() {
  if (!existsSync(SNACKS_DIR)) return 1;
  const entries = readdirSync(SNACKS_DIR).filter((e) => /^\d+-/.test(e));
  const numbers = entries.map((e) => parseInt(e.split('-')[0], 10));
  return numbers.length ? Math.max(...numbers) + 1 : 1;
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const rawName = process.argv[2];

if (!rawName) {
  console.log('Uso: npm run new -- <nome-snack>');
  console.log('Esempio: npm run new -- generators');
  process.exit(1);
}

const number = String(nextNumber()).padStart(2, '0');
const slug = slugify(rawName);
const folderName = `${number}-${slug}`;
const folderPath = join(SNACKS_DIR, folderName);

if (existsSync(folderPath)) {
  console.error(`Errore: la cartella ${folderName} esiste già.`);
  process.exit(1);
}

mkdirSync(folderPath, { recursive: true });

const title = slug.replace(/-/g, ' ').toUpperCase();

const template = `// ${title}
// Data: ${new Date().toISOString().slice(0, 10)}
// Obiettivo: descrivi qui cosa vuoi ripassare/verificare con questo snack.

console.log('=== ${title} ===');

// Scrivi qui il tuo codice di esempio.

`;

writeFileSync(join(folderPath, 'index.js'), template);

console.log(`Creato: snacks/${folderName}/index.js`);
console.log(`Esegui con: node snacks/${folderName}/index.js`);
