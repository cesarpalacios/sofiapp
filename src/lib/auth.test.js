import { describe, it, expect } from 'vitest'
import { esPinValido, esUsernameValido, esPasswordValida, esNombreValido, avatarPorParentesco } from './auth'

describe('esPinValido', () => {
  it('acepta exactamente 4 dígitos', () => {
    expect(esPinValido('0000')).toBe(true)
    expect(esPinValido('1234')).toBe(true)
  })

  it('rechaza longitudes distintas a 4 o caracteres no numéricos', () => {
    expect(esPinValido('123')).toBe(false)
    expect(esPinValido('12345')).toBe(false)
    expect(esPinValido('12ab')).toBe(false)
  })
})

describe('esUsernameValido', () => {
  it('acepta usuarios de 3 o más caracteres', () => {
    expect(esUsernameValido('cesar')).toBe(true)
  })

  it('rechaza vacíos, muy cortos o no string', () => {
    expect(esUsernameValido('ce')).toBe(false)
    expect(esUsernameValido('')).toBe(false)
    expect(esUsernameValido(null)).toBe(false)
  })
})

describe('esPasswordValida', () => {
  it('acepta contraseñas de 4 o más caracteres', () => {
    expect(esPasswordValida('1234')).toBe(true)
  })

  it('rechaza contraseñas muy cortas', () => {
    expect(esPasswordValida('123')).toBe(false)
  })
})

describe('esNombreValido', () => {
  it('acepta nombres no vacíos', () => {
    expect(esNombreValido('Sofia')).toBe(true)
  })

  it('rechaza vacíos o solo espacios', () => {
    expect(esNombreValido('')).toBe(false)
    expect(esNombreValido('   ')).toBe(false)
  })
})

describe('avatarPorParentesco', () => {
  it('devuelve el emoji correspondiente a cada parentesco', () => {
    expect(avatarPorParentesco('Papá')).toBe('👨')
    expect(avatarPorParentesco('Abuela')).toBe('👵')
  })

  it('usa el avatar de "Otro" para valores desconocidos', () => {
    expect(avatarPorParentesco('Vecino')).toBe('🧑')
    expect(avatarPorParentesco(undefined)).toBe('🧑')
  })
})
