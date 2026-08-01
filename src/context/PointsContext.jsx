import { createContext, useContext, useState, useEffect } from 'react'
import { TRANSACCIONES_RECIENTES } from '../lib/mockData'
import { useConfig } from './ConfigContext'

const PointsContext = createContext({})
const STORAGE_KEY = 'sofiapp-points'

export function PointsProvider({ children }) {
  const { puntosIniciales } = useConfig()
  const [total, setTotal] = useState(puntosIniciales)
  const [historial, setHistorial] = useState(TRANSACCIONES_RECIENTES)
  const [canjesPendientes, setCanjesPendientes] = useState([])

  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado) {
      const estado = JSON.parse(guardado)
      setTotal(estado.total)
      setHistorial(estado.historial)
      setCanjesPendientes(estado.canjesPendientes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ total, historial, canjesPendientes }))
  }, [total, historial, canjesPendientes])

  const asignarPuntos = (comportamiento) => {
    setTotal((prev) => Math.max(0, prev + comportamiento.puntos))
    setHistorial((prev) => [
      {
        id: Date.now(),
        descripcion: comportamiento.nombre,
        puntos: comportamiento.puntos,
        tipo: comportamiento.puntos > 0 ? 'ganado' : 'perdido',
        categoria: comportamiento.categoria,
        fecha: 'Ahora',
      },
      ...prev,
    ])
  }

  const solicitarCanje = (beneficio) => {
    if (total < beneficio.costo) return false
    setCanjesPendientes((prev) => [
      { id: Date.now(), beneficio, fecha: 'Ahora' },
      ...prev,
    ])
    return true
  }

  const aprobarCanje = (canjeId) => {
    const canje = canjesPendientes.find((c) => c.id === canjeId)
    if (!canje) return
    setTotal((prev) => Math.max(0, prev - canje.beneficio.costo))
    setHistorial((prev) => [
      {
        id: Date.now(),
        descripcion: canje.beneficio.nombre,
        puntos: -canje.beneficio.costo,
        tipo: 'canjeado',
        categoria: '🎁 Tienda',
        fecha: 'Ahora',
      },
      ...prev,
    ])
    setCanjesPendientes((prev) => prev.filter((c) => c.id !== canjeId))
  }

  const rechazarCanje = (canjeId) => {
    setCanjesPendientes((prev) => prev.filter((c) => c.id !== canjeId))
  }

  const establecerPuntos = (valorNuevo) => {
    const nuevoTotal = Math.max(0, Math.trunc(valorNuevo) || 0)
    const diferencia = nuevoTotal - total
    setTotal(nuevoTotal)
    if (diferencia !== 0) {
      setHistorial((prev) => [
        {
          id: Date.now(),
          descripcion: 'Ajuste de puntos de partida',
          puntos: diferencia,
          tipo: diferencia > 0 ? 'ganado' : 'perdido',
          categoria: '⚙️ Ajuste',
          fecha: 'Ahora',
        },
        ...prev,
      ])
    }
  }

  return (
    <PointsContext.Provider
      value={{
        total,
        historial,
        canjesPendientes,
        asignarPuntos,
        solicitarCanje,
        aprobarCanje,
        rechazarCanje,
        establecerPuntos,
      }}
    >
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  return useContext(PointsContext)
}
