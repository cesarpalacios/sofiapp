import { createContext, useContext, useState, useEffect } from 'react'
import { useConfig } from './ConfigContext'
import { avatarPorParentesco } from '../lib/auth'

const AuthContext = createContext({})
const SESSION_KEY = 'sofiapp-session'

function perfilDesdeUsuarioAdmin(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.parentesco || usuario.username,
    rol: 'admin',
    avatar: avatarPorParentesco(usuario.parentesco),
  }
}

export function AuthProvider({ children }) {
  const { validarCredencialesAdmin, validarPinNino, ninoPerfil } = useConfig()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const guardado = localStorage.getItem(SESSION_KEY)
    if (guardado) setUser(JSON.parse(guardado))
    setLoading(false)
  }, [])

  const persistirSesion = (perfil) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(perfil))
    setUser(perfil)
  }

  const loginAdmin = async (username, password) => {
    const usuario = await validarCredencialesAdmin(username, password)
    if (!usuario) return { ok: false, error: 'Usuario o contraseña incorrectos.' }
    persistirSesion(perfilDesdeUsuarioAdmin(usuario))
    return { ok: true }
  }

  // Usar solo justo después de crear las credenciales (crearCredencialesAdmin),
  // que ya validó los datos — evita depender del estado de ConfigContext
  // recién actualizado, que todavía no está disponible en este mismo render.
  const iniciarSesionAdminDirecta = (usuario) => {
    persistirSesion(perfilDesdeUsuarioAdmin(usuario))
  }

  const loginNino = async (pin) => {
    const valido = await validarPinNino(pin)
    if (!valido) return { ok: false, error: 'PIN incorrecto.' }
    persistirSesion({ id: 'nino', nombre: ninoPerfil.nombre, rol: 'usuario', avatar: ninoPerfil.avatar })
    return { ok: true }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginAdmin, iniciarSesionAdminDirecta, loginNino, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
