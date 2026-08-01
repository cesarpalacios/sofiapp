import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import { usePoints } from './context/PointsContext'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Tienda from './pages/Tienda'
import Logros from './pages/Logros'
import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import AdminTienda from './pages/AdminTienda'
import AdminConfig from './pages/AdminConfig'

const PAGE_TITLES = {
  home: { admin: 'Panel de Control', usuario: 'Mis Puntos' },
  tienda: { admin: 'Gestionar Tienda', usuario: 'Tienda' },
  logros: { admin: 'Logros', usuario: 'Logros' },
  admin: { admin: 'Asignar Puntos', usuario: 'Mis Puntos' },
  config: { admin: 'Configuración', usuario: 'Mis Puntos' },
}

export default function App() {
  const { user, logout, loading } = useAuth()
  const { canjesPendientes } = usePoints()
  const [currentPage, setCurrentPage] = useState('home')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-5xl animate-bounce">🌟</div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  const esAdmin = user.rol === 'admin'

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return esAdmin ? <AdminDashboard onNavigate={setCurrentPage} /> : <Home user={user} onNavigate={setCurrentPage} />
      case 'tienda':
        return esAdmin ? <AdminTienda /> : <Tienda />
      case 'logros':
        return <Logros />
      case 'admin':
        return esAdmin ? <Admin /> : <Home user={user} onNavigate={setCurrentPage} />
      case 'config':
        return esAdmin ? <AdminConfig /> : <Home user={user} onNavigate={setCurrentPage} />
      default:
        return esAdmin ? <AdminDashboard onNavigate={setCurrentPage} /> : <Home user={user} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        title={PAGE_TITLES[currentPage]?.[esAdmin ? 'admin' : 'usuario'] || 'SofiApp'}
        user={user}
        onLogout={logout}
      />
      <main className="pt-2">
        {renderPage()}
      </main>
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        canjesPendientes={canjesPendientes.length}
      />
    </div>
  )
}
