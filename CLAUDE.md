# CLAUDE.md

> Guía para agentes de IA que trabajen en SofiApp.

## Proyecto
SofiApp es una PWA de puntos por comportamientos para niños (4+). Los admins (papá/mamá) asignan puntos por buenas acciones y restan por pataletas. Sofia canjea puntos por beneficios.

## Stack
- **Frontend:** React 19 + Vite (PWA)
- **CSS:** Tailwind CSS v4 (plugin de Vite, sin archivo de config)
- **Backend:** Supabase (Auth + Postgres + Storage)
- **Hosting:** AWS (dominio de Cesar)

## Estructura del proyecto
```
src/
├── components/     # Componentes reutilizables
│   ├── ui/         # Botones, cards, inputs (diseño grande y colorido)
│   └── layout/     # Navbar, header, footer
├── pages/          # Páginas/rutas
│   ├── Home.jsx    # Dashboard de puntos (vista Sofia)
│   ├── Tienda.jsx  # Catálogo de beneficios
│   ├── Logros.jsx  # Badges yachievements
│   ├── Admin.jsx   # Panel admin (asignar puntos, gestionar)
│   └── Login.jsx
├── lib/            # Clientes y utilidades
│   └── supabase.js # Cliente de Supabase
├── context/        # React Context (Auth, etc.)
├── hooks/          # Custom hooks
└── styles/         # CSS global
```

## Reglas para agentes de IA

### Antes de generar código
1. **Leer IDEACION.md** — entender el proyecto completo
2. **Leer REGLAS.md** — seguir las reglas de código y seguridad
3. **Leer ARQUITECTURA.md** — respetar la estructura y patrones

### Al generar código
- **TypeScript-style:** usar JSDoc o PropTypes (el proyecto usa JSX, no TSX)
- **Nombres de archivos:** PascalCase para componentes (`PointCard.jsx`), camelCase para utilidades (`formatPoints.js`)
- **Nombres de componentes:** PascalCase (`PointCard`, `BenefitItem`)
- **Hooks personalizados:** prefijo `use` (`useAuth`, `usePoints`)
- **Comentarios y documentación:** en español
- **UI:** botones grandes, emojis, colores vivos — está diseñado para niños (4+)

### Seguridad
- NUNCA commitear `.env` o secrets
- Validar todos los inputs antes de enviar a Supabase
- Sanitizar inputs de usuario antes de mostrarlos (XSS)
- Usar Row Level Security (RLS) en Supabase para cada tabla

### Commits
- Formato: `tipo: descripción breve`
- Tipos: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `test`
- Ejemplo: `feat: agregar pantalla de tienda con catálogo de beneficios`

## Comandos
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Variables de entorno
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx
```

## Decisiones de diseño
- **PWA** instalable desde el navegador (no App Store)
- **Offline-first** no es requerido en el MVP
- **Tema:** morado/rosa/amarillo — alegre y divertido
- **UX niños 4+:** iconos > texto, botones grandes, animaciones de celebración
