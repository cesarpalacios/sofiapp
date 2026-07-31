export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-white ${className}`}
    >
      {children}
    </div>
  )
}
