export default function Navbar({ currentPage, onNavigate, user }) {
  const navItems = user?.rol === 'admin'
    ? [
        { id: 'home', label: '🏠 Inicio', icon: '🏠' },
        { id: 'admin', label: '➕ Puntos', icon: '➕' },
        { id: 'tienda', label: '🎁 Tienda', icon: '🎁' },
        { id: 'logros', label: '🏆 Logros', icon: '🏆' },
      ]
    : [
        { id: 'home', label: '🏠 Inicio', icon: '🏠' },
        { id: 'tienda', label: '🎁 Tienda', icon: '🎁' },
        { id: 'logros', label: '🏆 Logros', icon: '🏆' },
      ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-purple-200 shadow-2xl z-50">
      <div className="max-w-2xl mx-auto flex justify-around items-stretch px-2 py-2 safe-bottom">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all min-w-[70px] ${
              currentPage === item.id
                ? 'bg-purple-100 text-purple-700 scale-105'
                : 'text-gray-500 hover:bg-purple-50'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-bold">{item.label.split(' ')[1]}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
