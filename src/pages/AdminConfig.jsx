import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useConfig } from '../context/ConfigContext'
import { usePoints } from '../context/PointsContext'
import { esUsernameValido, esPasswordValida, esPinValido, esNombreValido, PARENTESCOS, avatarPorParentesco } from '../lib/auth'
import { esPuntosValido } from '../lib/stats'

const AVATARES = ['👧', '👦', '🧒', '👶', '🧑', '😊']
const USUARIO_NUEVO_INICIAL = { username: '', password: '', confirmar: '', parentesco: PARENTESCOS[0] }

export default function AdminConfig() {
  const { user } = useAuth()
  const {
    adminUsuarios,
    editarUsuarioAdmin,
    eliminarUsuarioAdmin,
    crearCredencialesAdmin,
    cambiarPinNino,
    ninoPerfil,
    actualizarPerfilNino,
    puntosIniciales,
    actualizarPuntosIniciales,
  } = useConfig()
  const { establecerPuntos } = usePoints()

  // Usuarios de la familia
  const [editandoId, setEditandoId] = useState(null)
  const [edicionUsuario, setEdicionUsuario] = useState({ username: '', password: '', parentesco: '' })
  const [mensajeUsuarios, setMensajeUsuarios] = useState(null)
  const [nuevoUsuarioForm, setNuevoUsuarioForm] = useState(USUARIO_NUEVO_INICIAL)
  const [mensajeNuevo, setMensajeNuevo] = useState(null)

  // Cambiar PIN del niño/a
  const [nuevoPin, setNuevoPin] = useState('')
  const [confirmarPin, setConfirmarPin] = useState('')
  const [mensajePin, setMensajePin] = useState(null)

  // Personalizar perfil
  const [nombre, setNombre] = useState(ninoPerfil.nombre)
  const [avatar, setAvatar] = useState(ninoPerfil.avatar)
  const [mensajePerfil, setMensajePerfil] = useState(null)

  // Puntos iniciales
  const [nuevosPuntosIniciales, setNuevosPuntosIniciales] = useState(String(puntosIniciales))
  const [mensajePuntos, setMensajePuntos] = useState(null)

  const empezarEdicionUsuario = (usuario) => {
    setEditandoId(usuario.id)
    setEdicionUsuario({ username: usuario.username, password: '', parentesco: usuario.parentesco })
    setMensajeUsuarios(null)
  }

  const guardarEdicionUsuario = async (id) => {
    if (!esUsernameValido(edicionUsuario.username)) {
      return setMensajeUsuarios({ tipo: 'error', texto: 'El usuario debe tener al menos 3 caracteres.' })
    }
    if (edicionUsuario.password && !esPasswordValida(edicionUsuario.password)) {
      return setMensajeUsuarios({ tipo: 'error', texto: 'La nueva contraseña debe tener al menos 4 caracteres.' })
    }
    const resultado = await editarUsuarioAdmin(id, edicionUsuario)
    if (!resultado.ok) return setMensajeUsuarios({ tipo: 'error', texto: resultado.error })
    setMensajeUsuarios({ tipo: 'ok', texto: '¡Usuario actualizado!' })
    setEditandoId(null)
  }

  const eliminarUsuario = (id) => {
    const resultado = eliminarUsuarioAdmin(id)
    if (!resultado.ok) return setMensajeUsuarios({ tipo: 'error', texto: resultado.error })
    setMensajeUsuarios({ tipo: 'ok', texto: 'Usuario eliminado.' })
  }

  const agregarUsuario = async () => {
    if (!esUsernameValido(nuevoUsuarioForm.username)) {
      return setMensajeNuevo({ tipo: 'error', texto: 'El usuario debe tener al menos 3 caracteres.' })
    }
    if (!esPasswordValida(nuevoUsuarioForm.password)) {
      return setMensajeNuevo({ tipo: 'error', texto: 'La contraseña debe tener al menos 4 caracteres.' })
    }
    if (nuevoUsuarioForm.password !== nuevoUsuarioForm.confirmar) {
      return setMensajeNuevo({ tipo: 'error', texto: 'Las contraseñas no coinciden.' })
    }
    const resultado = await crearCredencialesAdmin(
      nuevoUsuarioForm.username,
      nuevoUsuarioForm.password,
      nuevoUsuarioForm.parentesco
    )
    if (!resultado.ok) return setMensajeNuevo({ tipo: 'error', texto: resultado.error })
    setMensajeNuevo({ tipo: 'ok', texto: '¡Familiar agregado!' })
    setNuevoUsuarioForm(USUARIO_NUEVO_INICIAL)
  }

  const guardarPin = async () => {
    if (!esPinValido(nuevoPin)) return setMensajePin({ tipo: 'error', texto: 'El PIN debe tener 4 dígitos.' })
    if (nuevoPin !== confirmarPin) return setMensajePin({ tipo: 'error', texto: 'Los PIN no coinciden.' })

    await cambiarPinNino(nuevoPin)
    setMensajePin({ tipo: 'ok', texto: `¡PIN de ${ninoPerfil.nombre} actualizado!` })
    setNuevoPin('')
    setConfirmarPin('')
  }

  const guardarPerfil = () => {
    if (!esNombreValido(nombre)) return setMensajePerfil({ tipo: 'error', texto: 'El nombre no puede estar vacío.' })
    actualizarPerfilNino({ nombre, avatar })
    setMensajePerfil({ tipo: 'ok', texto: '¡Perfil actualizado!' })
  }

  const guardarPuntosIniciales = () => {
    if (!esPuntosValido(nuevosPuntosIniciales)) {
      return setMensajePuntos({ tipo: 'error', texto: 'Ingresa un número entero de 0 en adelante.' })
    }
    const valor = Number(nuevosPuntosIniciales)
    actualizarPuntosIniciales(valor)
    establecerPuntos(valor)
    setNuevosPuntosIniciales(String(valor))
    setMensajePuntos({
      tipo: 'ok',
      texto: `¡Listo! El saldo de ${ninoPerfil.nombre} ahora es ${valor} puntos.`,
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-1">⚙️ Configuración</h2>
        <p className="text-gray-500 font-bold">Gestiona los accesos de la familia</p>
      </div>

      <Card className="space-y-3">
        <h3 className="font-bold text-gray-700">👨‍👩‍👧 Usuarios de la familia</h3>

        <div className="space-y-2">
          {adminUsuarios.map((usuario) => (
            <div key={usuario.id} className="bg-white rounded-xl px-3 py-2 shadow-sm">
              {editandoId === usuario.id ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <select
                      value={edicionUsuario.parentesco}
                      onChange={(e) => setEdicionUsuario({ ...edicionUsuario, parentesco: e.target.value })}
                      className="px-2 py-2 rounded-xl border-2 border-gray-200 bg-white"
                    >
                      {PARENTESCOS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <input
                      value={edicionUsuario.username}
                      onChange={(e) => setEdicionUsuario({ ...edicionUsuario, username: e.target.value })}
                      placeholder="Usuario"
                      className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200"
                    />
                  </div>
                  <input
                    type="password"
                    value={edicionUsuario.password}
                    onChange={(e) => setEdicionUsuario({ ...edicionUsuario, password: e.target.value })}
                    placeholder="Nueva contraseña (dejar en blanco para no cambiar)"
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-200"
                  />
                  <div className="flex gap-2">
                    <Button variant="success" size="sm" className="flex-1" onClick={() => guardarEdicionUsuario(usuario.id)}>
                      Guardar
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => setEditandoId(null)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{avatarPorParentesco(usuario.parentesco)}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-700 text-sm">{usuario.username}</p>
                    <span className="text-xs text-gray-400">{usuario.parentesco}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => empezarEdicionUsuario(usuario)}>
                    ✏️
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={usuario.id === user?.id}
                    onClick={() => eliminarUsuario(usuario.id)}
                  >
                    🗑️
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {mensajeUsuarios && (
          <p className={`text-sm font-bold ${mensajeUsuarios.tipo === 'ok' ? 'text-green-500' : 'text-red-500'}`}>
            {mensajeUsuarios.texto}
          </p>
        )}

        <div className="pt-2 border-t-2 border-gray-100 space-y-2">
          <h4 className="text-sm font-bold text-gray-600">➕ Agregar familiar</h4>
          <div className="flex gap-2">
            <select
              value={nuevoUsuarioForm.parentesco}
              onChange={(e) => setNuevoUsuarioForm({ ...nuevoUsuarioForm, parentesco: e.target.value })}
              className="px-2 py-2 rounded-xl border-2 border-gray-200 bg-white"
            >
              {PARENTESCOS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <input
              value={nuevoUsuarioForm.username}
              onChange={(e) => setNuevoUsuarioForm({ ...nuevoUsuarioForm, username: e.target.value })}
              placeholder="Usuario"
              className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
            />
          </div>
          <input
            type="password"
            value={nuevoUsuarioForm.password}
            onChange={(e) => setNuevoUsuarioForm({ ...nuevoUsuarioForm, password: e.target.value })}
            placeholder="Contraseña"
            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
          />
          <input
            type="password"
            value={nuevoUsuarioForm.confirmar}
            onChange={(e) => setNuevoUsuarioForm({ ...nuevoUsuarioForm, confirmar: e.target.value })}
            placeholder="Confirmar contraseña"
            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
          />
          {mensajeNuevo && (
            <p className={`text-sm font-bold ${mensajeNuevo.tipo === 'ok' ? 'text-green-500' : 'text-red-500'}`}>
              {mensajeNuevo.texto}
            </p>
          )}
          <Button variant="primary" size="md" className="w-full" onClick={agregarUsuario}>
            Agregar familiar
          </Button>
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="font-bold text-gray-700">🔢 Cambiar PIN de {ninoPerfil.nombre}</h3>
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={nuevoPin}
          onChange={(e) => setNuevoPin(e.target.value.replace(/\D/g, ''))}
          placeholder="Nuevo PIN (4 dígitos)"
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 text-center tracking-widest focus:border-purple-400 focus:outline-none"
        />
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={confirmarPin}
          onChange={(e) => setConfirmarPin(e.target.value.replace(/\D/g, ''))}
          placeholder="Confirmar PIN"
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 text-center tracking-widest focus:border-purple-400 focus:outline-none"
        />
        {mensajePin && (
          <p className={`text-sm font-bold ${mensajePin.tipo === 'ok' ? 'text-green-500' : 'text-red-500'}`}>
            {mensajePin.texto}
          </p>
        )}
        <Button variant="primary" size="md" className="w-full" onClick={guardarPin}>
          Guardar PIN
        </Button>
      </Card>

      <Card className="space-y-3">
        <h3 className="font-bold text-gray-700">🎨 Personalizar perfil</h3>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
        />
        <div className="flex gap-2 justify-center flex-wrap">
          {AVATARES.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={`text-3xl w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                avatar === a ? 'bg-purple-100 border-purple-400 scale-110' : 'border-gray-200'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        {mensajePerfil && (
          <p className={`text-sm font-bold text-center ${mensajePerfil.tipo === 'ok' ? 'text-green-500' : 'text-red-500'}`}>
            {mensajePerfil.texto}
          </p>
        )}
        <Button variant="primary" size="md" className="w-full" onClick={guardarPerfil}>
          Guardar perfil
        </Button>
      </Card>

      <Card className="space-y-3">
        <h3 className="font-bold text-gray-700">🌟 Puntos de partida de {ninoPerfil.nombre}</h3>
        <p className="text-xs text-gray-400">
          Al guardar, se aplica de inmediato al saldo actual de {ninoPerfil.nombre} — y también queda guardado
          como el punto de partida para este dispositivo si en algún momento se borran los datos.
        </p>
        <input
          type="number"
          min="0"
          value={nuevosPuntosIniciales}
          onChange={(e) => setNuevosPuntosIniciales(e.target.value)}
          placeholder="Puntos iniciales"
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
        />
        {mensajePuntos && (
          <p className={`text-sm font-bold ${mensajePuntos.tipo === 'ok' ? 'text-green-500' : 'text-red-500'}`}>
            {mensajePuntos.texto}
          </p>
        )}
        <Button variant="primary" size="md" className="w-full" onClick={guardarPuntosIniciales}>
          Guardar puntos de partida
        </Button>
      </Card>
    </div>
  )
}
