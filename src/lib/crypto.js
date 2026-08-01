// Hash local con Web Crypto (SubtleCrypto), sin dependencias externas.
// Nota: esto es ofuscación básica para no guardar texto plano en localStorage,
// no un reemplazo de autenticación con backend real.

export async function hashTexto(texto) {
  const datos = new TextEncoder().encode(texto)
  const buffer = await crypto.subtle.digest('SHA-256', datos)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
