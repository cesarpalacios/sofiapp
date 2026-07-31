export default function Header({ title, user, onLogout }) {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-6 py-4 rounded-b-3xl shadow-lg">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-3xl">{user.avatar}</span>
          )}
          <div>
            <h1 className="text-xl font-bold text-shadow-fun">{title}</h1>
            {user && (
              <p className="text-sm text-purple-100">¡Hola, {user.nombre}! ✨</p>
            )}
          </div>
        </div>
        {user && (
          <button
            onClick={onLogout}
            className="bg-white/20 hover:bg-white/30 rounded-xl px-3 py-2 text-sm font-bold transition-all"
          >
            Salir
          </button>
        )}
      </div>
    </header>
  )
}
