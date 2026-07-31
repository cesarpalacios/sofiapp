export default function Button({ children, onClick, variant = 'primary', size = 'md', className = '', ...props }) {
  const variants = {
    primary: 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg',
    secondary: 'bg-pink-400 hover:bg-pink-500 text-white shadow-lg',
    success: 'bg-green-400 hover:bg-green-500 text-white shadow-lg',
    warning: 'bg-yellow-400 hover:bg-yellow-500 text-white shadow-lg',
    danger: 'bg-red-400 hover:bg-red-500 text-white shadow-lg',
    ghost: 'bg-white/80 hover:bg-white text-purple-600 shadow-md border-2 border-purple-200',
  }

  const sizes = {
    sm: 'px-4 py-2 text-base rounded-xl',
    md: 'px-6 py-3 text-lg rounded-2xl',
    lg: 'px-8 py-4 text-xl rounded-2xl',
    xl: 'px-10 py-6 text-2xl rounded-3xl',
  }

  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} ${sizes[size]} font-bold transition-all active:scale-95 hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
