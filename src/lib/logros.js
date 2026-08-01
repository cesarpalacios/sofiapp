// Evalúa si un logro está desbloqueado según el historial real de transacciones.
// El `id` de cada transacción es Date.now() al momento de crearla (ver PointsContext),
// así que también sirve como marca de tiempo real para condiciones basadas en días.

function contarComportamiento(historial, nombre) {
  return historial.filter((t) => t.descripcion === nombre).length
}

function diasSinComportamiento(historial, nombre, ahora) {
  const entradas = historial.filter((t) => t.descripcion === nombre)
  if (entradas.length === 0) return Infinity
  const masReciente = Math.max(...entradas.map((t) => t.id))
  return (ahora - masReciente) / (1000 * 60 * 60 * 24)
}

export function estaDesbloqueado(condicion, historial, ahora = Date.now()) {
  switch (condicion.tipo) {
    case 'primera_vez':
      return historial.some((t) => t.tipo === 'ganado')
    case 'contar':
      return contarComportamiento(historial, condicion.comportamiento) >= condicion.meta
    case 'sin_comportamiento_dias':
      return diasSinComportamiento(historial, condicion.comportamiento, ahora) >= condicion.dias
    default:
      return false
  }
}
