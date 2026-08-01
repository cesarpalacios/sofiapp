import { useState } from 'react'
import Button from './Button'

const NUEVA = '__nueva__'

export default function CategoriaSelect({
  value,
  onChange,
  categorias,
  onAgregarCategoria,
  onEliminarCategoria,
  permitirGestionar = true,
}) {
  const [agregando, setAgregando] = useState(false)
  const [nueva, setNueva] = useState('')
  const [gestionando, setGestionando] = useState(false)
  const [error, setError] = useState('')

  const confirmarNueva = () => {
    const limpio = nueva.trim()
    if (!limpio) return
    onAgregarCategoria(limpio)
    onChange(limpio)
    setNueva('')
    setAgregando(false)
  }

  const cancelarNueva = () => {
    setNueva('')
    setAgregando(false)
  }

  const handleEliminar = (cat) => {
    const resultado = onEliminarCategoria(cat)
    if (!resultado.ok) {
      setError(resultado.error)
      return
    }
    setError('')
    if (value === cat) onChange('')
  }

  if (agregando) {
    return (
      <div className="flex gap-2">
        <input
          autoFocus
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && confirmarNueva()}
          placeholder="Nueva categoría (ej: 🎮 Videojuegos)"
          className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
        />
        <Button variant="success" size="sm" onClick={confirmarNueva}>
          ✅
        </Button>
        <Button variant="ghost" size="sm" onClick={cancelarNueva}>
          ✖️
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <select
        value={value}
        onChange={(e) => (e.target.value === NUEVA ? setAgregando(true) : onChange(e.target.value))}
        className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none bg-white"
      >
        <option value="" disabled>
          Selecciona una categoría
        </option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
        <option value={NUEVA}>➕ Nueva categoría...</option>
      </select>

      {permitirGestionar && (
        <button
          type="button"
          onClick={() => {
            setGestionando((g) => !g)
            setError('')
          }}
          className="text-xs font-bold text-gray-400 hover:text-purple-500"
        >
          {gestionando ? 'Ocultar categorías ▲' : '🗑️ Gestionar categorías ▼'}
        </button>
      )}

      {permitirGestionar && gestionando && (
        <div className="bg-gray-50 rounded-xl p-2 space-y-1 max-h-36 overflow-y-auto">
          {categorias.length === 0 && (
            <p className="text-xs text-gray-400 px-2 py-1">No hay categorías todavía.</p>
          )}
          {categorias.map((cat) => (
            <div key={cat} className="flex items-center justify-between gap-2 bg-white rounded-lg px-2 py-1">
              <span className="text-sm">{cat}</span>
              <button
                type="button"
                onClick={() => handleEliminar(cat)}
                className="text-red-400 hover:text-red-600 px-2"
              >
                🗑️
              </button>
            </div>
          ))}
          {error && <p className="text-xs text-red-500 px-2">{error}</p>}
        </div>
      )}
    </div>
  )
}
