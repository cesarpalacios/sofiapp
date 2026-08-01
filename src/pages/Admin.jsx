import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import IconPicker from '../components/ui/IconPicker'
import { usePoints } from '../context/PointsContext'
import { useComportamientos } from '../context/ComportamientosContext'
import { ICONOS_COMPORTAMIENTO } from '../lib/iconos'

const CAMPOS_INICIALES = { nombre: '', categoria: '', puntos: '', icono: '' }

export default function Admin() {
  const [categoria, setCategoria] = useState('all')
  const { historial, canjesPendientes, asignarPuntos, aprobarCanje, rechazarCanje } = usePoints()
  const { comportamientos, agregarComportamiento, editarComportamiento, toggleActivoComportamiento } =
    useComportamientos()

  const [nuevo, setNuevo] = useState(CAMPOS_INICIALES)
  const [editandoId, setEditandoId] = useState(null)
  const [edicion, setEdicion] = useState(CAMPOS_INICIALES)

  const categorias = ['all', ...new Set(comportamientos.map((c) => c.categoria))]
  const filtrados = categoria === 'all' ? comportamientos : comportamientos.filter((c) => c.categoria === categoria)

  const handleAgregar = () => {
    if (!nuevo.nombre.trim() || !nuevo.categoria.trim() || nuevo.puntos === '') return
    agregarComportamiento(nuevo)
    setNuevo(CAMPOS_INICIALES)
  }

  const empezarEdicion = (c) => {
    setEditandoId(c.id)
    setEdicion({ nombre: c.nombre, categoria: c.categoria, puntos: String(c.puntos), icono: c.icono })
  }

  const guardarEdicion = (id) => {
    editarComportamiento(id, edicion)
    setEditandoId(null)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-1">➕ Asignar Puntos</h2>
        <p className="text-gray-500 font-bold">Selecciona un comportamiento</p>
      </div>

      {/* Canjes pendientes de aprobación — primero, para que no se pierda con la lista de comportamientos */}
      {canjesPendientes.length > 0 && (
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <h3 className="font-bold text-gray-700 mb-2">✅ Canjes por aprobar</h3>
          <div className="space-y-2">
            {canjesPendientes.map((canje) => (
              <div key={canje.id} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm">
                <span className="text-2xl">{canje.beneficio.icono}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-600 text-sm">{canje.beneficio.nombre}</p>
                  <p className="text-xs text-gray-400">{canje.beneficio.costo} puntos</p>
                </div>
                <Button size="sm" variant="success" onClick={() => aprobarCanje(canje.id)}>
                  ✅
                </Button>
                <Button size="sm" variant="danger" onClick={() => rechazarCanje(canje.id)}>
                  ❌
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Nuevo comportamiento */}
      <Card className="space-y-3">
        <h3 className="font-bold text-gray-700">➕ Nuevo comportamiento</h3>
        <IconPicker
          value={nuevo.icono}
          onChange={(icono) => setNuevo({ ...nuevo, icono })}
          icons={ICONOS_COMPORTAMIENTO}
        />
        <input
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          placeholder="Nombre del comportamiento"
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
        />
        <input
          value={nuevo.categoria}
          onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
          placeholder="Categoría (ej: 📚 Estudios)"
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
        />
        <input
          type="number"
          value={nuevo.puntos}
          onChange={(e) => setNuevo({ ...nuevo, puntos: e.target.value })}
          placeholder="Puntos (positivo para premiar, negativo para restar)"
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
        />
        <Button variant="primary" size="md" className="w-full" onClick={handleAgregar}>
          Agregar comportamiento
        </Button>
      </Card>

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
          <Card key={c.id} className={!c.activo ? 'opacity-50' : ''}>
            {editandoId === c.id ? (
              <div className="space-y-2">
                <IconPicker
                  value={edicion.icono}
                  onChange={(icono) => setEdicion({ ...edicion, icono })}
                  icons={ICONOS_COMPORTAMIENTO}
                />
                <input
                  value={edicion.nombre}
                  onChange={(e) => setEdicion({ ...edicion, nombre: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-200"
                />
                <input
                  value={edicion.categoria}
                  onChange={(e) => setEdicion({ ...edicion, categoria: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-200"
                />
                <input
                  type="number"
                  value={edicion.puntos}
                  onChange={(e) => setEdicion({ ...edicion, puntos: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-200"
                />
                <div className="flex gap-2">
                  <Button variant="success" size="sm" className="flex-1" onClick={() => guardarEdicion(c.id)}>
                    Guardar
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => setEditandoId(null)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.icono}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-700 text-sm">{c.nombre}</h3>
                  <span className={`text-sm font-bold ${c.puntos > 0 ? 'text-green-500' : 'text-red-400'}`}>
                    {c.puntos > 0 ? '+' : ''}
                    {c.puntos} puntos
                  </span>
                  {!c.activo && <span className="ml-2 text-xs font-bold text-gray-400">(inactivo)</span>}
                </div>
                {c.activo && (
                  <Button size="sm" variant={c.puntos > 0 ? 'success' : 'danger'} onClick={() => asignarPuntos(c)}>
                    {c.puntos > 0 ? '➕' : '➖'}
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => empezarEdicion(c)}>
                  ✏️
                </Button>
                <Button
                  variant={c.activo ? 'danger' : 'success'}
                  size="sm"
                  onClick={() => toggleActivoComportamiento(c.id)}
                >
                  {c.activo ? '🚫' : '✅'}
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Historial de transacciones */}
      {historial.length > 0 && (
        <Card>
          <h3 className="font-bold text-gray-700 mb-2">📝 Actividad reciente</h3>
          <div className="space-y-2">
            {historial.slice(0, 5).map((h) => (
              <div key={h.id} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm">
                <span className="font-bold text-gray-600 text-sm flex-1">{h.descripcion}</span>
                <span className={`font-bold ${h.puntos > 0 ? 'text-green-500' : 'text-red-400'}`}>
                  {h.puntos > 0 ? '+' : ''}
                  {h.puntos}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
