import Card from '../components/ui/Card'
import { usePoints } from '../context/PointsContext'
import { useCatalogo } from '../context/CatalogoContext'
import { useConfig } from '../context/ConfigContext'
import { getNivel } from '../lib/mockData'
import { agruparPorCategoria, calcularTotales } from '../lib/stats'

export default function AdminDashboard({ onNavigate }) {
  const { total, historial, canjesPendientes } = usePoints()
  const { beneficios } = useCatalogo()
  const { ninoPerfil } = useConfig()
  const nivel = getNivel(total)
  const totales = calcularTotales(historial)
  const categorias = agruparPorCategoria(historial)
  const maxAbs = Math.max(1, ...categorias.map((c) => Math.abs(c.total)))

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-1">📊 Panel de Control</h2>
        <p className="text-gray-500 font-bold">Resumen de {ninoPerfil.nombre}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
          <p className="text-xs font-bold text-gray-500">Puntos actuales</p>
          <p className="text-3xl font-bold text-purple-600">{total}</p>
          <p className="text-sm font-bold text-gray-500">
            {nivel.emoji} {nivel.nombre}
          </p>
        </Card>
        <Card
          className={`text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 ${
            canjesPendientes.length > 0 ? 'cursor-pointer hover:scale-105 transition-all' : ''
          }`}
          onClick={() => canjesPendientes.length > 0 && onNavigate?.('admin')}
        >
          <p className="text-xs font-bold text-gray-500">Canjes pendientes</p>
          <p className="text-3xl font-bold text-orange-500">{canjesPendientes.length}</p>
          <p className="text-sm font-bold text-gray-400">
            {canjesPendientes.length > 0 ? 'Toca para revisar 👉' : 'Todo al día'}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs font-bold text-gray-500">Total ganado</p>
          <p className="text-2xl font-bold text-green-500">+{totales.ganado}</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs font-bold text-gray-500">Total perdido / canjeado</p>
          <p className="text-2xl font-bold text-red-400">
            -{totales.perdido + totales.canjeado}
          </p>
        </Card>
      </div>

      <Card>
        <h3 className="font-bold text-gray-700 mb-3">📈 Puntos por categoría</h3>
        {categorias.length === 0 ? (
          <p className="text-sm text-gray-400 text-center">Aún no hay actividad para mostrar.</p>
        ) : (
          <div className="space-y-3">
            {categorias.map((c) => (
              <div key={c.categoria}>
                <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
                  <span>{c.categoria}</span>
                  <span className={c.total >= 0 ? 'text-green-500' : 'text-red-400'}>
                    {c.total > 0 ? '+' : ''}
                    {c.total}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      c.total >= 0
                        ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                        : 'bg-gradient-to-r from-red-400 to-rose-400'
                    }`}
                    style={{ width: `${(Math.abs(c.total) / maxAbs) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="text-center">
        <p className="text-xs font-bold text-gray-500">Beneficios activos en la tienda</p>
        <p className="text-2xl font-bold text-purple-500">
          {beneficios.filter((b) => b.activo).length} / {beneficios.length}
        </p>
      </Card>
    </div>
  )
}
