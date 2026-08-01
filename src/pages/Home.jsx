import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { getNivel, getProximoNivel, NIVEL_ESTILOS } from '../lib/mockData'
import { usePoints } from '../context/PointsContext'

export default function Home({ user, onNavigate }) {
  const { total: puntos, historial } = usePoints()
  const nivel = getNivel(puntos)
  const proximoNivel = getProximoNivel(puntos)
  const estilo = NIVEL_ESTILOS[nivel.color]
  const esNivelMaximo = proximoNivel.id === nivel.id
  const progreso = esNivelMaximo ? 100 : Math.min(100, ((puntos - nivel.min) / (nivel.max - nivel.min)) * 100)
  const puntosParaSubir = proximoNivel.min - puntos

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-6">
      {/* Avatar + Puntos */}
      <Card className={`text-center bg-gradient-to-br ${estilo.card}`}>
        <div className="text-7xl mb-2 animate-bounce-slow">{user?.avatar || '👧'}</div>
        <p className="text-lg text-gray-600 font-bold mb-1">Tus puntos</p>
        <div className={`text-6xl font-bold ${estilo.texto} text-shadow-fun mb-2`}>
          {puntos} ⭐
        </div>
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1 shadow-md">
          <span className="text-2xl">{nivel.emoji}</span>
          <span className={`font-bold ${estilo.texto}`}>{nivel.nombre}</span>
        </div>
      </Card>

      {/* Barra de progreso */}
      <Card>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-600">
            {nivel.emoji} {nivel.nombre}
          </span>
          <span className={`text-sm font-bold ${estilo.texto}`}>
            {proximoNivel.emoji} {proximoNivel.nombre}
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
          <div
            className={`bg-gradient-to-r ${estilo.barra} h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
            style={{ width: `${progreso}%` }}
          >
            <span className="text-xs font-bold text-white">{Math.round(progreso)}%</span>
          </div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-500 font-bold">
          {esNivelMaximo
            ? '¡Alcanzaste el nivel máximo! 🎉'
            : `¡Te faltan ${puntosParaSubir} puntos para ${proximoNivel.nombre}! ${proximoNivel.emoji}`}
        </p>
      </Card>

      {/* Botón rápido a tienda */}
      <Button
        variant="secondary"
        size="xl"
        className="w-full"
        onClick={() => onNavigate('tienda')}
      >
        🎁 ¡Ir a la Tienda!
      </Button>

      {/* Actividad reciente */}
      <Card>
        <h2 className="text-lg font-bold text-gray-700 mb-3">📋 Actividad Reciente</h2>
        <div className="space-y-2">
          {historial.slice(0, 5).map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between bg-white rounded-2xl px-4 py-2 shadow-sm"
            >
              <span className="font-bold text-gray-600">{t.descripcion}</span>
              <span
                className={`font-bold text-lg ${
                  t.tipo === 'ganado'
                    ? 'text-green-500'
                    : t.tipo === 'perdido'
                    ? 'text-red-400'
                    : 'text-orange-400'
                }`}
              >
                {t.puntos > 0 ? '+' : ''}{t.puntos}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
