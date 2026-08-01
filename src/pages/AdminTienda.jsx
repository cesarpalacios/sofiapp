import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useCatalogo } from '../context/CatalogoContext'
import { useConfig } from '../context/ConfigContext'

const CAMPOS_INICIALES = { nombre: '', costo: '', icono: '🎁' }

export default function AdminTienda() {
  const { beneficios, agregarBeneficio, editarBeneficio, toggleActivoBeneficio } = useCatalogo()
  const { ninoPerfil } = useConfig()
  const [nuevo, setNuevo] = useState(CAMPOS_INICIALES)
  const [editandoId, setEditandoId] = useState(null)
  const [edicion, setEdicion] = useState(CAMPOS_INICIALES)

  const handleAgregar = () => {
    if (!nuevo.nombre.trim() || !nuevo.costo) return
    agregarBeneficio(nuevo)
    setNuevo(CAMPOS_INICIALES)
  }

  const empezarEdicion = (beneficio) => {
    setEditandoId(beneficio.id)
    setEdicion({ nombre: beneficio.nombre, costo: beneficio.costo, icono: beneficio.icono })
  }

  const guardarEdicion = (id) => {
    editarBeneficio(id, edicion)
    setEditandoId(null)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-1">🎁 Gestionar Tienda</h2>
        <p className="text-gray-500 font-bold">Crea y edita los beneficios que {ninoPerfil.nombre} puede canjear</p>
      </div>

      <Card className="space-y-3">
        <h3 className="font-bold text-gray-700">➕ Nuevo beneficio</h3>
        <div className="flex gap-2">
          <input
            value={nuevo.icono}
            onChange={(e) => setNuevo({ ...nuevo, icono: e.target.value })}
            className="w-16 px-2 py-2 rounded-xl border-2 border-gray-200 text-center text-2xl focus:border-purple-400 focus:outline-none"
            maxLength={2}
          />
          <input
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            placeholder="Nombre del beneficio"
            className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
          />
        </div>
        <input
          type="number"
          min="1"
          value={nuevo.costo}
          onChange={(e) => setNuevo({ ...nuevo, costo: e.target.value })}
          placeholder="Costo en puntos"
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
        />
        <Button variant="primary" size="md" className="w-full" onClick={handleAgregar}>
          Agregar beneficio
        </Button>
      </Card>

      <div className="space-y-3">
        {beneficios.map((b) => (
          <Card key={b.id} className={!b.activo ? 'opacity-50' : ''}>
            {editandoId === b.id ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    value={edicion.icono}
                    onChange={(e) => setEdicion({ ...edicion, icono: e.target.value })}
                    className="w-16 px-2 py-2 rounded-xl border-2 border-gray-200 text-center text-2xl"
                    maxLength={2}
                  />
                  <input
                    value={edicion.nombre}
                    onChange={(e) => setEdicion({ ...edicion, nombre: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200"
                  />
                </div>
                <input
                  type="number"
                  min="1"
                  value={edicion.costo}
                  onChange={(e) => setEdicion({ ...edicion, costo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-200"
                />
                <div className="flex gap-2">
                  <Button variant="success" size="sm" className="flex-1" onClick={() => guardarEdicion(b.id)}>
                    Guardar
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => setEditandoId(null)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-3xl">{b.icono}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-700 text-sm">{b.nombre}</h3>
                  <span className="text-sm font-bold text-purple-500">{b.costo} puntos</span>
                  {!b.activo && <span className="ml-2 text-xs font-bold text-gray-400">(inactivo)</span>}
                </div>
                <Button variant="ghost" size="sm" onClick={() => empezarEdicion(b)}>
                  ✏️
                </Button>
                <Button
                  variant={b.activo ? 'danger' : 'success'}
                  size="sm"
                  onClick={() => toggleActivoBeneficio(b.id)}
                >
                  {b.activo ? 'Desactivar' : 'Activar'}
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
