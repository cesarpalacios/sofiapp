import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { COMPORTAMIENTOS } from '../lib/mockData'

export default function Admin() {
  const [categoria, setCategoria] = useState('all')
  const [historial, setHistorial] = useState([])

  const categorias = ['all', ...new Set(COMPORTAMIENTOS.map(c => c.categoria))]
  const filtrados = categoria === 'all' ? COMPORTAMIENTOS : COMPORTAMIENTOS.filter(c => c.categoria === categoria)

  const asignarPuntos = (comportamiento) => {
    setHistorial([
      {
        id: Date.now(),
        nombre: comportamiento.nombre,
        puntos: comportamiento.puntos,
        icono: comportamiento.icono,
        fecha: 'Ahora',
      },
      ...historial,
    ])
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-1">➕ Asignar Puntos</h2>
        <p className="text-gray-500 font-bold">Selecciona un comportamiento</p>
      </div>

      {/* Filtro de categoría */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm transition-all ${
              categoria === cat
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-500 shadow-sm'
            }`}
          >
            {cat === 'all' ? '📋 Todo' : cat}
          </button>
        ))}
      </div>

      {/* Lista de comportamientos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtrados.map((c) => (
          <Card key={c.id} className="flex items-center gap-3">
            <span className="text-3xl">{c.icono}</span>
            <div className="flex-1">
              <h3 className="font-bold text-gray-700 text-sm">{c.nombre}</h3>
              <span className={`text-sm font-bold ${c.puntos > 0 ? 'text-green-500' : 'text-red-400'}`}>
                {c.puntos > 0 ? '+' : ''}{c.puntos} puntos
              </span>
            </div>
            <Button
              size="sm"
              variant={c.puntos > 0 ? 'success' : 'danger'}
              onClick={() => asignarPuntos(c)}
            >
              {c.puntos > 0 ? '➕' : '➖'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Historial de asignaciones */}
      {historial.length > 0 && (
        <Card>
          <h3 className="font-bold text-gray-700 mb-2">📝 Asignaciones recientes</h3>
          <div className="space-y-2">
            {historial.slice(0, 5).map((h) => (
              <div key={h.id} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm">
                <span className="text-xl">{h.icono}</span>
                <span className="font-bold text-gray-600 text-sm flex-1">{h.nombre}</span>
                <span className={`font-bold ${h.puntos > 0 ? 'text-green-500' : 'text-red-400'}`}>
                  {h.puntos > 0 ? '+' : ''}{h.puntos}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
