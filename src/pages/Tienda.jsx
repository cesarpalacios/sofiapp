import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { usePoints } from '../context/PointsContext'
import { useCatalogo } from '../context/CatalogoContext'

export default function Tienda() {
  const [selected, setSelected] = useState(null)
  const [confirmado, setConfirmado] = useState(false)
  const { total: puntos, solicitarCanje } = usePoints()
  const { beneficios } = useCatalogo()
  const beneficiosActivos = beneficios.filter((b) => b.activo)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-1">🎁 Tienda de Beneficios</h2>
        <p className="text-gray-500 font-bold">Tienes <span className="text-purple-500 text-lg">{puntos}</span> ⭐</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {beneficiosActivos.map((beneficio) => {
          const puedeComprar = puntos >= beneficio.costo
          return (
            <Card
              key={beneficio.id}
              className={`text-center transition-all ${
                puedeComprar ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'
              } ${selected === beneficio.id ? 'ring-4 ring-purple-400' : ''} ${!puedeComprar ? 'opacity-60' : ''}`}
              onClick={() => puedeComprar && setSelected(beneficio.id)}
            >
              <div className="text-5xl mb-2">{beneficio.icono}</div>
              <h3 className="font-bold text-gray-700 mb-1">{beneficio.nombre}</h3>
              <div className={`inline-block rounded-full px-4 py-1 font-bold ${
                puedeComprar
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {beneficio.costo} ⭐
              </div>
            </Card>
          )
        })}
      </div>

      {selected && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center max-w-2xl mx-auto">
            <p className="text-lg font-bold mb-3">¿Seguro que quieres canjear este beneficio? 🤔</p>
            <div className="flex gap-3 justify-center">
              <Button variant="ghost" onClick={() => setSelected(null)}>
                Cancelar
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  const beneficio = beneficiosActivos.find((b) => b.id === selected)
                  solicitarCanje(beneficio)
                  setSelected(null)
                  setConfirmado(true)
                  setTimeout(() => setConfirmado(false), 3000)
                }}
              >
                ¡Sí, canjear! 🎉
              </Button>
            </div>
          </Card>
        </div>
      )}

      {confirmado && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
          <Card className="bg-gradient-to-r from-green-400 to-emerald-400 text-white text-center max-w-2xl mx-auto">
            <p className="text-lg font-bold">¡Canje solicitado! Papá/Mamá lo aprobará pronto 🎉</p>
          </Card>
        </div>
      )}
    </div>
  )
}
