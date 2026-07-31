import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [selected, setSelected] = useState(null)

  const usuarios = [
    { key: 'sofia', nombre: 'Sofia', avatar: '👧', desc: 'Veo mis puntos' },
    { key: 'cesar', nombre: 'Papá', avatar: '👨', desc: 'Administrar puntos' },
    { key: 'mama', nombre: 'Mamá', avatar: '👩', desc: 'Administrar puntos' },
  ]

  const handleLogin = () => {
    if (selected) {
      login(selected)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="text-7xl mb-3 animate-bounce-slow">🌟</div>
          <h1 className="text-4xl font-bold text-purple-600 text-shadow-fun">SofiApp</h1>
          <p className="text-gray-500 font-bold mt-1">¡Gana puntos y diviértete!</p>
        </div>

        <Card className="bg-white/90">
          <h2 className="text-lg font-bold text-gray-700 text-center mb-4">¿Quién eres? 🤔</h2>
          <div className="space-y-3">
            {usuarios.map((u) => (
              <button
                key={u.key}
                onClick={() => setSelected(u.key)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all border-2 ${
                  selected === u.key
                    ? 'bg-purple-100 border-purple-400 scale-105'
                    : 'bg-white border-gray-200 hover:bg-purple-50'
                }`}
              >
                <span className="text-4xl">{u.avatar}</span>
                <div className="text-left">
                  <p className="font-bold text-gray-700">{u.nombre}</p>
                  <p className="text-sm text-gray-400">{u.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Button
          variant="primary"
          size="xl"
          className="w-full"
          onClick={handleLogin}
          disabled={!selected}
        >
          ¡Entrar! 🚀
        </Button>
      </div>
    </div>
  )
}
