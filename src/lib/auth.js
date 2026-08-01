// Validaciones de login: usuario/contraseña de admin y PIN del niño/a.

export const PIN_POR_DEFECTO = '0000'

export function esPinValido(pin) {
  return typeof pin === 'string' && /^\d{4}$/.test(pin)
}

export function esUsernameValido(username) {
  return typeof username === 'string' && username.trim().length >= 3
}

export function esPasswordValida(password) {
  return typeof password === 'string' && password.length >= 4
}

export function esNombreValido(nombre) {
  return typeof nombre === 'string' && nombre.trim().length > 0
}

export const PARENTESCOS = ['Papá', 'Mamá', 'Abuelo', 'Abuela', 'Tío', 'Tía', 'Otro']

export const AVATAR_POR_PARENTESCO = {
  Papá: '👨',
  Mamá: '👩',
  Abuelo: '👴',
  Abuela: '👵',
  Tío: '🧔',
  Tía: '👩‍🦱',
  Otro: '🧑',
}

export function avatarPorParentesco(parentesco) {
  return AVATAR_POR_PARENTESCO[parentesco] || AVATAR_POR_PARENTESCO.Otro
}
