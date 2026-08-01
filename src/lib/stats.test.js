import { describe, it, expect } from 'vitest'
import { agruparPorCategoria, calcularTotales, esPuntosValido } from './stats'

const HISTORIAL_EJEMPLO = [
  { id: 1, descripcion: 'Ordenar juguetes', puntos: 15, tipo: 'ganado', categoria: '🏠 Responsabilidades' },
  { id: 2, descripcion: 'Cepillarse dientes', puntos: 10, tipo: 'ganado', categoria: '💪 Hábitos saludables' },
  { id: 3, descripcion: 'Ayudar en casa', puntos: 20, tipo: 'ganado', categoria: '🏠 Responsabilidades' },
  { id: 4, descripcion: 'Pataleta', puntos: -5, tipo: 'perdido', categoria: '⚠️ Negativos' },
  { id: 5, descripcion: 'Película a elección', puntos: -50, tipo: 'canjeado' },
]

describe('agruparPorCategoria', () => {
  it('suma los puntos por categoría', () => {
    const resultado = agruparPorCategoria(HISTORIAL_EJEMPLO)
    const responsabilidades = resultado.find((r) => r.categoria === '🏠 Responsabilidades')
    expect(responsabilidades.total).toBe(35)
  })

  it('usa "🎁 Tienda" como categoría por defecto cuando no viene definida', () => {
    const resultado = agruparPorCategoria(HISTORIAL_EJEMPLO)
    const tienda = resultado.find((r) => r.categoria === '🎁 Tienda')
    expect(tienda.total).toBe(-50)
  })

  it('ordena de mayor a menor magnitud absoluta', () => {
    const resultado = agruparPorCategoria(HISTORIAL_EJEMPLO)
    expect(resultado[0].categoria).toBe('🎁 Tienda')
  })

  it('devuelve un arreglo vacío para historial vacío', () => {
    expect(agruparPorCategoria([])).toEqual([])
  })
})

describe('calcularTotales', () => {
  it('suma ganado, perdido y canjeado por separado', () => {
    expect(calcularTotales(HISTORIAL_EJEMPLO)).toEqual({ ganado: 45, perdido: 5, canjeado: 50 })
  })

  it('devuelve ceros para historial vacío', () => {
    expect(calcularTotales([])).toEqual({ ganado: 0, perdido: 0, canjeado: 0 })
  })
})

describe('esPuntosValido', () => {
  it('acepta enteros positivos o cero', () => {
    expect(esPuntosValido(0)).toBe(true)
    expect(esPuntosValido(125)).toBe(true)
    expect(esPuntosValido('50')).toBe(true)
  })

  it('rechaza negativos, decimales o valores no numéricos', () => {
    expect(esPuntosValido(-5)).toBe(false)
    expect(esPuntosValido(1.5)).toBe(false)
    expect(esPuntosValido('abc')).toBe(false)
  })
})
