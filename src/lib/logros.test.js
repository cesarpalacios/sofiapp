import { describe, it, expect } from 'vitest'
import { estaDesbloqueado } from './logros'

const AHORA = 1_700_000_000_000 // instante fijo de referencia para tests deterministas
const DIA = 1000 * 60 * 60 * 24

function transaccion(descripcion, tipo, hace_dias) {
  return { descripcion, tipo, id: AHORA - hace_dias * DIA }
}

describe('estaDesbloqueado — primera_vez', () => {
  it('se desbloquea con al menos una transacción ganada', () => {
    const historial = [transaccion('Ordenar juguetes', 'ganado', 1)]
    expect(estaDesbloqueado({ tipo: 'primera_vez' }, historial, AHORA)).toBe(true)
  })

  it('no se desbloquea sin transacciones ganadas', () => {
    const historial = [transaccion('Pataleta', 'perdido', 1)]
    expect(estaDesbloqueado({ tipo: 'primera_vez' }, historial, AHORA)).toBe(false)
  })
})

describe('estaDesbloqueado — contar', () => {
  const condicion = { tipo: 'contar', comportamiento: 'Ayudar en casa', meta: 5 }

  it('no se desbloquea antes de alcanzar la meta', () => {
    const historial = Array.from({ length: 4 }, (_, i) => transaccion('Ayudar en casa', 'ganado', i))
    expect(estaDesbloqueado(condicion, historial, AHORA)).toBe(false)
  })

  it('se desbloquea justo al alcanzar la meta', () => {
    const historial = Array.from({ length: 5 }, (_, i) => transaccion('Ayudar en casa', 'ganado', i))
    expect(estaDesbloqueado(condicion, historial, AHORA)).toBe(true)
  })

  it('no cuenta transacciones de otros comportamientos', () => {
    const historial = Array.from({ length: 5 }, () => transaccion('Otra cosa', 'ganado', 1))
    expect(estaDesbloqueado(condicion, historial, AHORA)).toBe(false)
  })
})

describe('estaDesbloqueado — sin_comportamiento_dias', () => {
  const condicion = { tipo: 'sin_comportamiento_dias', comportamiento: 'Pataleta', dias: 7 }

  it('se desbloquea si nunca hubo ese comportamiento', () => {
    expect(estaDesbloqueado(condicion, [], AHORA)).toBe(true)
  })

  it('no se desbloquea si ocurrió hace menos días que el umbral', () => {
    const historial = [transaccion('Pataleta', 'perdido', 3)]
    expect(estaDesbloqueado(condicion, historial, AHORA)).toBe(false)
  })

  it('se desbloquea si la última vez fue hace más días que el umbral', () => {
    const historial = [transaccion('Pataleta', 'perdido', 10)]
    expect(estaDesbloqueado(condicion, historial, AHORA)).toBe(true)
  })
})
