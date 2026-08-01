import { createContext, useContext, useState, useEffect } from 'react'
import { hashTexto } from '../lib/crypto'
import { PIN_POR_DEFECTO } from '../lib/auth'

const ConfigContext = createContext({})
const STORAGE_KEY = 'sofiapp-config'

const PERFIL_NINO_INICIAL = { nombre: 'Sofia', avatar: '👧' }
const PUNTOS_INICIALES_POR_DEFECTO = 0

function leerGuardado() {
  const guardado = localStorage.getItem(STORAGE_KEY)
  return guardado ? JSON.parse(guardado) : {}
}

function normalizarUsername(username) {
  return username.trim().toLowerCase()
}

export function ConfigProvider({ children }) {
  const [adminUsuarios, setAdminUsuarios] = useState(() => leerGuardado().adminUsuarios ?? [])
  const [ninoPinHash, setNinoPinHash] = useState(() => leerGuardado().ninoPinHash ?? null)
  const [ninoPerfil, setNinoPerfil] = useState(() => leerGuardado().ninoPerfil ?? PERFIL_NINO_INICIAL)
  const [puntosIniciales, setPuntosIniciales] = useState(
    () => leerGuardado().puntosIniciales ?? PUNTOS_INICIALES_POR_DEFECTO
  )

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ adminUsuarios, ninoPinHash, ninoPerfil, puntosIniciales })
    )
  }, [adminUsuarios, ninoPinHash, ninoPerfil, puntosIniciales])

  const hayCredencialesAdmin = adminUsuarios.length > 0

  const crearCredencialesAdmin = async (username, password, parentesco) => {
    const existe = adminUsuarios.some((u) => normalizarUsername(u.username) === normalizarUsername(username))
    if (existe) return { ok: false, error: 'Ese usuario ya existe.' }

    const hash = await hashTexto(password)
    const usuario = { id: Date.now(), username: username.trim(), hash, parentesco }
    setAdminUsuarios((prev) => [...prev, usuario])
    return { ok: true, usuario }
  }

  const validarCredencialesAdmin = async (username, password) => {
    const hash = await hashTexto(password)
    return (
      adminUsuarios.find(
        (u) => normalizarUsername(u.username) === normalizarUsername(username) && u.hash === hash
      ) ?? null
    )
  }

  const editarUsuarioAdmin = async (id, { username, password, parentesco }) => {
    const objetivo = adminUsuarios.find((u) => u.id === id)
    if (!objetivo) return { ok: false, error: 'Usuario no encontrado.' }

    const duplicado = adminUsuarios.some(
      (u) => u.id !== id && normalizarUsername(u.username) === normalizarUsername(username)
    )
    if (duplicado) return { ok: false, error: 'Ese usuario ya existe.' }

    const nuevoHash = password ? await hashTexto(password) : objetivo.hash
    setAdminUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, username: username.trim(), parentesco, hash: nuevoHash } : u))
    )
    return { ok: true }
  }

  const eliminarUsuarioAdmin = (id) => {
    if (adminUsuarios.length <= 1) {
      return { ok: false, error: 'Debe quedar al menos un usuario administrador.' }
    }
    setAdminUsuarios((prev) => prev.filter((u) => u.id !== id))
    return { ok: true }
  }

  const validarPinNino = async (pin) => {
    if (!ninoPinHash) return pin === PIN_POR_DEFECTO
    return (await hashTexto(pin)) === ninoPinHash
  }

  const cambiarPinNino = async (pinNuevo) => {
    setNinoPinHash(await hashTexto(pinNuevo))
  }

  const actualizarPerfilNino = ({ nombre, avatar }) => {
    setNinoPerfil((prev) => ({
      nombre: nombre?.trim() || prev.nombre,
      avatar: avatar?.trim() || prev.avatar,
    }))
  }

  const actualizarPuntosIniciales = (valor) => {
    setPuntosIniciales(Math.max(0, Math.trunc(Number(valor)) || 0))
  }

  return (
    <ConfigContext.Provider
      value={{
        adminUsuarios,
        hayCredencialesAdmin,
        crearCredencialesAdmin,
        validarCredencialesAdmin,
        editarUsuarioAdmin,
        eliminarUsuarioAdmin,
        validarPinNino,
        cambiarPinNino,
        ninoPerfil,
        actualizarPerfilNino,
        puntosIniciales,
        actualizarPuntosIniciales,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  return useContext(ConfigContext)
}
