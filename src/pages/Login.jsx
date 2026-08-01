import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useConfig } from '../context/ConfigContext'
import { esUsernameValido, esPasswordValida, PARENTESCOS } from '../lib/auth'

const PANTALLAS = {
  INICIO: 'inicio',
  NINO_PIN: 'nino-pin',
  ADMIN_SETUP: 'admin-setup',
  ADMIN_LOGIN: 'admin-login',
}

const TECLAS_PIN = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function Login() {
  const { loginNino, loginAdmin, iniciarSesionAdminDirecta } = useAuth()
  const { hayCredencialesAdmin, crearCredencialesAdmin, ninoPerfil } = useConfig()
  const [pantalla, setPantalla] = useState(PANTALLAS.INICIO)
  const [pin, setPin] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [parentesco, setParentesco] = useState(PARENTESCOS[0])
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const volver = () => {
    setPantalla(PANTALLAS.INICIO)
    setPin('')
    setUsername('')
    setPassword('')
    setConfirmar('')
    setParentesco(PARENTESCOS[0])
    setError('')
  }

  const irAAdmin = () => {
    setPantalla(hayCredencialesAdmin ? PANTALLAS.ADMIN_LOGIN : PANTALLAS.ADMIN_SETUP)
  }

  const agregarDigitoPin = async (digito) => {
    if (pin.length >= 4 || cargando) return
    const nuevoPin = pin + digito
    setPin(nuevoPin)
    setError('')
    if (nuevoPin.length === 4) {
      setCargando(true)
      const resultado = await loginNino(nuevoPin)
      setCargando(false)
      if (!resultado.ok) {
        setError(resultado.error)
        setPin('')
      }
    }
  }

  const crearCuenta = async () => {
    if (!esUsernameValido(username)) return setError('El usuario debe tener al menos 3 caracteres.')
    if (!esPasswordValida(password)) return setError('La contraseña debe tener al menos 4 caracteres.')
    if (password !== confirmar) return setError('Las contraseñas no coinciden.')

    setCargando(true)
    setError('')
    const resultado = await crearCredencialesAdmin(username, password, parentesco)
    setCargando(false)
    if (!resultado.ok) return setError(resultado.error)
    iniciarSesionAdminDirecta(resultado.usuario)
  }

  const entrar = async () => {
    setCargando(true)
    setError('')
    const resultado = await loginAdmin(username, password)
    setCargando(false)
    if (!resultado.ok) {
      setError(resultado.error)
      setPassword('')
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

        {pantalla === PANTALLAS.INICIO && (
          <Card className="bg-white/90 space-y-3">
            <h2 className="text-lg font-bold text-gray-700 text-center mb-1">¿Quién eres? 🤔</h2>
            <Button variant="primary" size="xl" className="w-full" onClick={() => setPantalla(PANTALLAS.NINO_PIN)}>
              {ninoPerfil.avatar} Soy {ninoPerfil.nombre}
            </Button>
            <Button variant="ghost" size="xl" className="w-full" onClick={irAAdmin}>
              👨‍👩 Soy Papá o Mamá
            </Button>
          </Card>
        )}

        {pantalla === PANTALLAS.NINO_PIN && (
          <Card className="bg-white/90">
            <h2 className="text-lg font-bold text-gray-700 text-center mb-4">Tu PIN secreto 🔢</h2>
            <div className="flex justify-center gap-3 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold ${
                    pin.length > i ? 'bg-purple-100 border-purple-400' : 'border-gray-200'
                  }`}
                >
                  {pin.length > i ? '●' : ''}
                </div>
              ))}
            </div>
            {error && <p className="text-center text-red-500 font-bold text-sm mb-3">{error}</p>}
            <div className="grid grid-cols-3 gap-3">
              {TECLAS_PIN.map((n) => (
                <Button key={n} variant="ghost" size="lg" disabled={cargando} onClick={() => agregarDigitoPin(n)}>
                  {n}
                </Button>
              ))}
              <div />
              <Button variant="ghost" size="lg" disabled={cargando} onClick={() => agregarDigitoPin('0')}>
                0
              </Button>
              <Button variant="ghost" size="lg" disabled={cargando || !pin} onClick={() => setPin(pin.slice(0, -1))}>
                ⌫
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4" onClick={volver}>
              ← Volver
            </Button>
          </Card>
        )}

        {pantalla === PANTALLAS.ADMIN_SETUP && (
          <Card className="bg-white/90 space-y-3">
            <h2 className="text-lg font-bold text-gray-700 text-center mb-1">Crea tu acceso 🔐</h2>
            <p className="text-center text-xs text-gray-400">Primera vez — elige un usuario y contraseña</p>
            <select
              value={parentesco}
              onChange={(e) => setParentesco(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-lg focus:border-purple-400 focus:outline-none bg-white"
            >
              {PARENTESCOS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-lg focus:border-purple-400 focus:outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-lg focus:border-purple-400 focus:outline-none"
            />
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              placeholder="Confirmar contraseña"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-lg focus:border-purple-400 focus:outline-none"
            />
            {error && <p className="text-center text-red-500 font-bold text-sm">{error}</p>}
            <Button variant="primary" size="lg" className="w-full" disabled={cargando} onClick={crearCuenta}>
              {cargando ? 'Creando...' : 'Crear acceso 🚀'}
            </Button>
            <Button variant="ghost" size="sm" className="w-full" onClick={volver}>
              ← Volver
            </Button>
          </Card>
        )}

        {pantalla === PANTALLAS.ADMIN_LOGIN && (
          <Card className="bg-white/90 space-y-3">
            <h2 className="text-lg font-bold text-gray-700 text-center mb-1">Iniciar sesión 🔐</h2>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-lg focus:border-purple-400 focus:outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-lg focus:border-purple-400 focus:outline-none"
            />
            {error && <p className="text-center text-red-500 font-bold text-sm">{error}</p>}
            <Button variant="primary" size="lg" className="w-full" disabled={cargando} onClick={entrar}>
              {cargando ? 'Entrando...' : 'Entrar 🚀'}
            </Button>
            <Button variant="ghost" size="sm" className="w-full" onClick={volver}>
              ← Volver
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
