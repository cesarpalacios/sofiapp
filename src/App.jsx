import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Tienda from './pages/Tienda'
import Logros from './pages/Logros'
import Admin from './pages/Admin'

const PAGE_TITLES = {
  home: 'Mis Puntos',
  tienda: 'Tienda',
  logros: 'Logros',
  admin: 'Administrar',
}

export default function App() {
  const { user, logout, loading } = useAuth()
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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home user={user} onNavigate={setCurrentPage} />
      case 'tienda':
        return <Tienda user={user} />
      case 'logros':
        return <Logros />
      case 'admin':
        return user.rol === 'admin' ? <Admin /> : <Home user={user} onNavigate={setCurrentPage} />
      default:
        return <Home user={user} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        title={PAGE_TITLES[currentPage] || 'SofiApp'}
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
      />
    </div>
  )
}
