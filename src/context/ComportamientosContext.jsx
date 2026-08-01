import { createContext, useContext, useState, useEffect } from 'react'
import { COMPORTAMIENTOS } from '../lib/mockData'

const ComportamientosContext = createContext({})
const STORAGE_KEY = 'sofiapp-comportamientos'
const CATEGORIAS_STORAGE_KEY = 'sofiapp-categorias'

const CATEGORIAS_INICIALES = [...new Set(COMPORTAMIENTOS.map((c) => c.categoria))]

export function ComportamientosProvider({ children }) {
  const [comportamientos, setComportamientos] = useState(COMPORTAMIENTOS)
  const [categorias, setCategorias] = useState(CATEGORIAS_INICIALES)

  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado) setComportamientos(JSON.parse(guardado))
    const categoriasGuardadas = localStorage.getItem(CATEGORIAS_STORAGE_KEY)
    if (categoriasGuardadas) setCategorias(JSON.parse(categoriasGuardadas))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comportamientos))
  }, [comportamientos])

  useEffect(() => {
    localStorage.setItem(CATEGORIAS_STORAGE_KEY, JSON.stringify(categorias))
  }, [categorias])

  const agregarCategoria = (nombre) => {
    const limpio = nombre?.trim()
    if (!limpio) return
    setCategorias((prev) => (prev.includes(limpio) ? prev : [...prev, limpio]))
  }

  const eliminarCategoria = (nombre) => {
    const enUso = comportamientos.some((c) => c.categoria === nombre)
    if (enUso) {
      return { ok: false, error: 'Tiene comportamientos asignados. Reasígnalos o elimínalos primero.' }
    }
    setCategorias((prev) => prev.filter((c) => c !== nombre))
    return { ok: true }
  }

  const agregarComportamiento = ({ nombre, categoria, puntos, icono }) => {
    if (!nombre?.trim() || !categoria?.trim()) return
    const puntosNum = Math.trunc(Number(puntos)) || 0
    agregarCategoria(categoria)
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
    if (cambios.categoria) agregarCategoria(cambios.categoria)
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
      value={{
        comportamientos,
        categorias,
        agregarCategoria,
        eliminarCategoria,
        agregarComportamiento,
        editarComportamiento,
        toggleActivoComportamiento,
      }}
    >
      {children}
    </ComportamientosContext.Provider>
  )
}

export function useComportamientos() {
  return useContext(ComportamientosContext)
}
