import { createContext, useContext, useState, useEffect } from 'react'
import { BENEFICIOS } from '../lib/mockData'

const CatalogoContext = createContext({})
const STORAGE_KEY = 'sofiapp-catalogo'

export function CatalogoProvider({ children }) {
  const [beneficios, setBeneficios] = useState(BENEFICIOS)

  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado) setBeneficios(JSON.parse(guardado))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(beneficios))
  }, [beneficios])

  const agregarBeneficio = ({ nombre, costo, icono, color }) => {
    if (!nombre?.trim()) return
    setBeneficios((prev) => [
      ...prev,
      {
        id: Date.now(),
        nombre: nombre.trim(),
        costo: Math.max(1, Number(costo) || 1),
        icono: icono?.trim() || '🎁',
        color: color || 'purple',
        activo: true,
      },
    ])
  }

  const editarBeneficio = (id, cambios) => {
    setBeneficios((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              ...cambios,
              nombre: cambios.nombre?.trim() || b.nombre,
              costo: cambios.costo !== undefined ? Math.max(1, Number(cambios.costo) || 1) : b.costo,
            }
          : b
      )
    )
  }

  const toggleActivoBeneficio = (id) => {
    setBeneficios((prev) => prev.map((b) => (b.id === id ? { ...b, activo: !b.activo } : b)))
  }

  return (
    <CatalogoContext.Provider value={{ beneficios, agregarBeneficio, editarBeneficio, toggleActivoBeneficio }}>
      {children}
    </CatalogoContext.Provider>
  )
}

export function useCatalogo() {
  return useContext(CatalogoContext)
}
