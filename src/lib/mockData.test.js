import { describe, it, expect } from 'vitest'
import { getNivel, getProximoNivel, NIVEL_ESTILOS } from './mockData'

describe('getNivel', () => {
  it('devuelve Brotes en el límite inferior', () => {
    expect(getNivel(0).nombre).toBe('Brotes')
  })

  it('devuelve el nivel correcto en los límites de cada rango', () => {
    expect(getNivel(50).nombre).toBe('Brotes')
    expect(getNivel(51).nombre).toBe('Creciendo')
    expect(getNivel(150).nombre).toBe('Creciendo')
    expect(getNivel(151).nombre).toBe('Brillante')
  })

  it('devuelve Legendaria para puntos muy altos', () => {
    expect(getNivel(10000).nombre).toBe('Legendaria')
  })

  it('cada nivel tiene un estilo de color asociado', () => {
    expect(NIVEL_ESTILOS[getNivel(0).color]).toBeDefined()
    expect(NIVEL_ESTILOS[getNivel(10000).color]).toBeDefined()
  })
})

describe('getProximoNivel', () => {
  it('devuelve el siguiente nivel cuando no está en el máximo', () => {
    expect(getProximoNivel(0).nombre).toBe('Creciendo')
  })

  it('devuelve el mismo nivel cuando ya está en el máximo', () => {
    const actual = getNivel(10000)
    const proximo = getProximoNivel(10000)
    expect(proximo.id).toBe(actual.id)
  })
})
