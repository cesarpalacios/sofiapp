import { describe, it, expect } from 'vitest'
import { hashTexto } from './crypto'

describe('hashTexto', () => {
  it('produce el mismo hash para el mismo texto', async () => {
    const a = await hashTexto('mi-clave-123')
    const b = await hashTexto('mi-clave-123')
    expect(a).toBe(b)
  })

  it('produce hashes distintos para textos distintos', async () => {
    const a = await hashTexto('mi-clave-123')
    const b = await hashTexto('otra-clave-456')
    expect(a).not.toBe(b)
  })

  it('nunca devuelve el texto original', async () => {
    const hash = await hashTexto('0000')
    expect(hash).not.toBe('0000')
    expect(hash.length).toBeGreaterThan(10)
  })
})
