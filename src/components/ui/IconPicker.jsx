export default function IconPicker({ value, onChange, icons }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <span className="w-16 h-11 flex items-center justify-center rounded-xl border-2 border-gray-200 text-2xl bg-gray-50">
          {value || '❓'}
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Elige abajo o escribe un emoji"
          className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
          maxLength={2}
        />
      </div>
      <div className="grid grid-cols-8 gap-1 max-h-28 overflow-y-auto p-2 bg-gray-50 rounded-xl">
        {icons.map((icono) => (
          <button
            key={icono}
            type="button"
            onClick={() => onChange(icono)}
            className={`text-xl rounded-lg py-1 transition-all ${
              value === icono ? 'bg-purple-200 scale-110' : 'hover:bg-purple-100'
            }`}
          >
            {icono}
          </button>
        ))}
      </div>
    </div>
  )
}
