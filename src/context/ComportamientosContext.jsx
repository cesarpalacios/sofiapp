import { createContext, useContext, useState, useEffect } from 'react'
import { COMPORTAMIENTOS } from '../lib/mockData'

const ComportamientosContext = createContext({})
const STORAGE_KEY = 'sofiapp-comportamientos'

export function ComportamientosProvider({ children }) {
  const [comportamientos, setComportamientos] = useState(COMPORTAMIENTOS)

  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado) setComportamientos(JSON.parse(guardado))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comportamientos))
  }, [comportamientos])

  const agregarComportamiento = ({ nombre, categoria, puntos, icono }) => {
    if (!nombre?.trim() || !categoria?.trim()) return
    const puntosNum = Math.trunc(Number(puntos)) || 0
    setComportamientos((prev) => [
      ...prev,
      {
        id: Date.now(),
        nombre: nombre.trim(),
        categoria: categoria.trim(),
        puntos: puntosNum,
        tipo: puntosNum > 0 ? 'ganado' : 'perdido',
        icono: icono?.trim() || (puntosNum > 0 ? '⭐' : '⚠️'),
        activo: true,
      },
    ])
  }

  const editarComportamiento = (id, cambios) => {
    setComportamientos((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const puntosNum = cambios.puntos !== undefined ? Math.trunc(Number(cambios.puntos)) || 0 : c.puntos
        return {
          ...c,
          ...cambios,
          nombre: cambios.nombre?.trim() || c.nombre,
          categoria: cambios.categoria?.trim() || c.categoria,
          puntos: puntosNum,
          tipo: puntosNum > 0 ? 'ganado' : 'perdido',
        }
      })
    )
  }

  const toggleActivoComportamiento = (id) => {
    setComportamientos((prev) => prev.map((c) => (c.id === id ? { ...c, activo: !c.activo } : c)))
  }

  return (
    <ComportamientosContext.Provider
      value={{ comportamientos, agregarComportamiento, editarComportamiento, toggleActivoComportamiento }}
    >
      {children}
    </ComportamientosContext.Provider>
  )
}

export function useComportamientos() {
  return useContext(ComportamientosContext)
}
