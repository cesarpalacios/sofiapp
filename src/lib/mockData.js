// Mock data for SofiApp development

export const NIVELES = [
  { id: 0, nombre: 'Brotes', emoji: '🌱', min: 0, max: 50, color: 'green' },
  { id: 1, nombre: 'Creciendo', emoji: '🌿', min: 51, max: 150, color: 'lime' },
  { id: 2, nombre: 'Brillante', emoji: '🌟', min: 151, max: 300, color: 'yellow' },
  { id: 3, nombre: 'Estrella', emoji: '👑', min: 301, max: 500, color: 'purple' },
  { id: 4, nombre: 'Legendaria', emoji: '🚀', min: 501, max: Infinity, color: 'pink' },
]

// Clases de Tailwind por color de nivel (estáticas para que Tailwind v4 las detecte)
export const NIVEL_ESTILOS = {
  green: { card: 'from-green-100 to-emerald-100 border-green-200', texto: 'text-green-600', barra: 'from-green-400 to-emerald-400' },
  lime: { card: 'from-lime-100 to-green-100 border-lime-200', texto: 'text-lime-600', barra: 'from-lime-400 to-green-400' },
  yellow: { card: 'from-yellow-100 to-amber-100 border-yellow-200', texto: 'text-yellow-600', barra: 'from-yellow-400 to-amber-400' },
  purple: { card: 'from-purple-100 to-pink-100 border-purple-200', texto: 'text-purple-600', barra: 'from-purple-400 to-pink-400' },
  pink: { card: 'from-pink-100 to-rose-100 border-pink-200', texto: 'text-pink-600', barra: 'from-pink-400 to-rose-400' },
}

export const COMPORTAMIENTOS = [
  { id: 1, nombre: 'Hacer tarea', categoria: '📚 Estudios', puntos: 20, tipo: 'ganado', icono: '📝', activo: true },
  { id: 2, nombre: 'Aprender algo nuevo', categoria: '📚 Estudios', puntos: 30, tipo: 'ganado', icono: '🧠', activo: true },
  { id: 3, nombre: 'Ordenar juguetes', categoria: '🏠 Responsabilidades', puntos: 15, tipo: 'ganado', icono: '🧸', activo: true },
  { id: 4, nombre: 'Ayudar en casa', categoria: '🏠 Responsabilidades', puntos: 20, tipo: 'ganado', icono: '🏠', activo: true },
  { id: 5, nombre: 'Cepillarse dientes', categoria: '💪 Hábitos saludables', puntos: 10, tipo: 'ganado', icono: '🦷', activo: true },
  { id: 6, nombre: 'Comer verduras', categoria: '💪 Hábitos saludables', puntos: 15, tipo: 'ganado', icono: '🥦', activo: true },
  { id: 7, nombre: 'Dormir temprano', categoria: '💪 Hábitos saludables', puntos: 10, tipo: 'ganado', icono: '😴', activo: true },
  { id: 8, nombre: 'Ser amable', categoria: '🎭 Comportamiento', puntos: 15, tipo: 'ganado', icono: '💝', activo: true },
  { id: 9, nombre: 'Compartir', categoria: '🎭 Comportamiento', puntos: 15, tipo: 'ganado', icono: '🤝', activo: true },
  { id: 10, nombre: 'Decir la verdad', categoria: '🎭 Comportamiento', puntos: 20, tipo: 'ganado', icono: '✨', activo: true },
  { id: 11, nombre: 'Portarse súper bien', categoria: '⭐ Logros especiales', puntos: 40, tipo: 'ganado', icono: '🏆', activo: true },
  { id: 12, nombre: 'Ayudar sin que se lo pidan', categoria: '⭐ Logros especiales', puntos: 50, tipo: 'ganado', icono: '💖', activo: true },
  { id: 13, nombre: 'Pataleta', categoria: '⚠️ Negativos', puntos: -5, tipo: 'perdido', icono: '😤', activo: true },
  { id: 14, nombre: 'No hacer caso', categoria: '⚠️ Negativos', puntos: -3, tipo: 'perdido', icono: '🙉', activo: true },
  { id: 15, nombre: 'Pelear', categoria: '⚠️ Negativos', puntos: -5, tipo: 'perdido', icono: '💢', activo: true },
]

export const BENEFICIOS = [
  { id: 1, nombre: 'Helado o postre favorito', costo: 30, icono: '🍦', color: 'pink', activo: true },
  { id: 2, nombre: 'Película a elección', costo: 50, icono: '🎬', color: 'purple', activo: true },
  { id: 3, nombre: '20 min extra de pantalla', costo: 25, icono: '🎮', color: 'blue', activo: true },
  { id: 4, nombre: 'Paseo especial con papá/mamá', costo: 60, icono: '👯', color: 'green', activo: true },
  { id: 5, nombre: 'Algo pequeño (juguito, sticker)', costo: 40, icono: '🛍️', color: 'yellow', activo: true },
  { id: 6, nombre: 'Sorpresa especial', costo: 100, icono: '🎁', color: 'pink', activo: true },
  { id: 7, nombre: 'Día de pantalla libre', costo: 200, icono: '📱', color: 'purple', activo: true },
]

export const LOGROS = [
  { id: 1, nombre: 'Primera vez', descripcion: 'Ganaste tus primeros puntos', icono: '🎉', desbloqueado: true },
  { id: 2, nombre: 'Pequeña ayudante', descripcion: 'Ayudaste en casa 5 veces', icono: '🏠', desbloqueado: true },
  { id: 3, nombre: 'Cepillón experto', descripcion: 'Te cepillaste los dientes 7 días', icono: '🦷', desbloqueado: true },
  { id: 4, nombre: 'Una semana sin pataletas', descripcion: '7 días sin pataletas', icono: '🌈', desbloqueado: false },
  { id: 5, nombre: 'Estudiosa', descripcion: 'Hiciste tarea 10 veces', icono: '📚', desbloqueado: false },
  { id: 6, nombre: 'Generosa', descripcion: 'Compartiste 5 veces', icono: '🤝', desbloqueado: false },
]

export const TRANSACCIONES_RECIENTES = [
  { id: 1, descripcion: 'Ordenar juguetes', puntos: 15, tipo: 'ganado', categoria: '🏠 Responsabilidades', fecha: 'Hoy' },
  { id: 2, descripcion: 'Cepillarse dientes', puntos: 10, tipo: 'ganado', categoria: '💪 Hábitos saludables', fecha: 'Hoy' },
  { id: 3, descripcion: 'Comer verduras', puntos: 15, tipo: 'ganado', categoria: '💪 Hábitos saludables', fecha: 'Ayer' },
  { id: 4, descripcion: 'Ser amable', puntos: 15, tipo: 'ganado', categoria: '🎭 Comportamiento', fecha: 'Ayer' },
  { id: 5, descripcion: 'Pataleta', puntos: -5, tipo: 'perdido', categoria: '⚠️ Negativos', fecha: 'Hace 2 días' },
  { id: 6, descripcion: 'Película a elección', puntos: -50, tipo: 'canjeado', categoria: '🎁 Tienda', fecha: 'Hace 3 días' },
]

export function getNivel(puntos) {
  return NIVELES.find(n => puntos >= n.min && puntos <= n.max) || NIVELES[0]
}

export function getProximoNivel(puntos) {
  const actual = getNivel(puntos)
  const proximo = NIVELES.find(n => n.id === actual.id + 1)
  return proximo || actual
}
