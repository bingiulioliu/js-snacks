// lib/stringUtils.js
// Un secondo modulo indipendente, per mostrare come importare da più file.

export function capitalizza(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function inverti(str) {
  return [...str].reverse().join('');
}

// Export con rinomina interna (rare ma utile quando il nome interno è più
// descrittivo di quello che si vuole esporre pubblicamente)
function contaCaratteri(str) {
  return str.length;
}
export { contaCaratteri as lunghezza };
