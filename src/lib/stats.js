// Agregaciones puras sobre el historial de transacciones, para el dashboard de admin.

export function agruparPorCategoria(historial) {
  const totales = {}
  historial.forEach((t) => {
    const categoria = t.categoria || '🎁 Tienda'
    totales[categoria] = (totales[categoria] || 0) + t.puntos
  })
  return Object.entries(totales)
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total))
}

export function calcularTotales(historial) {
  return historial.reduce(
    (acc, t) => {
      if (t.tipo === 'ganado') acc.ganado += t.puntos
      else if (t.tipo === 'perdido') acc.perdido += Math.abs(t.puntos)
      else if (t.tipo === 'canjeado') acc.canjeado += Math.abs(t.puntos)
      return acc
    },
    { ganado: 0, perdido: 0, canjeado: 0 }
  )
}

export function esPuntosValido(valor) {
  const numero = Number(valor)
  return Number.isInteger(numero) && numero >= 0
}
