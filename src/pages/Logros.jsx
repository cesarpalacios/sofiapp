import Card from '../components/ui/Card'
import { LOGROS } from '../lib/mockData'

export default function Logros() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-1">🏆 Mis Logros</h2>
        <p className="text-gray-500 font-bold">
          {LOGROS.filter(l => l.desbloqueado).length} de {LOGROS.length} desbloqueados
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {LOGROS.map((logro) => (
          <Card
            key={logro.id}
            className={`text-center ${
              logro.desbloqueado
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300'
                : 'opacity-50 grayscale'
            }`}
          >
            <div className={`text-5xl mb-2 ${logro.desbloqueado ? 'animate-wiggle' : ''}`}>
              {logro.desbloqueado ? logro.icono : '🔒'}
            </div>
            <h3 className="font-bold text-sm text-gray-700">{logro.nombre}</h3>
            <p className="text-xs text-gray-500 mt-1">{logro.descripcion}</p>
            {logro.desbloqueado && (
              <div className="mt-2 inline-block bg-yellow-400 rounded-full px-2 py-0.5 text-xs font-bold text-white">
                ¡Desbloqueado!
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
