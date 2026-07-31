import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

// Mock users for development
const MOCK_USERS = {
  sofia: {
    id: 'user-sofia',
    nombre: 'Sofia',
    rol: 'usuario',
    avatar: '👧',
    puntos_totales: 125,
    nivel_actual: 'creciendo',
  },
  cesar: {
    id: 'user-cesar',
    nombre: 'Cesar (Papá)',
    rol: 'admin',
    avatar: '👨',
    puntos_totales: 0,
    nivel_actual: null,
  },
  mama: {
    id: 'user-mama',
    nombre: 'Mamá',
    rol: 'admin',
    avatar: '👩',
    puntos_totales: 0,
    nivel_actual: null,
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if there's a saved user in localStorage (mock persistence)
    const saved = localStorage.getItem('sofiapp-user')
    if (saved) {
      setUser(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const login = (username) => {
    const mockUser = MOCK_USERS[username]
    if (mockUser) {
      setUser(mockUser)
      localStorage.setItem('sofiapp-user', JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sofiapp-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
