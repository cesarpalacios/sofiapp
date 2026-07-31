# SofiApp 🌟

App de puntos para Sofia (4 años) — gana puntos por buen comportamiento y canjea beneficios divertidos.

## ✨ Características

- 📊 **Dashboard de puntos** — saldo grande, nivel con emoji, barra de progreso
- 🎁 **Tienda de beneficios** — catálogo visual con recompensas
- 🏆 **Logros** — badges desbloqueables con animaciones
- ➕ **Panel admin** — asignar puntos por comportamientos (papá/mamá)
- 📱 **PWA** — instalable desde el navegador, funciona offline

## 🛠️ Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Backend | Supabase (Auth + Postgres) |
| PWA | vite-plugin-pwa |
| Deploy | AWS (dominio propio) |

## 🚀 Empezar

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Desarrollo
npm run dev

# Build
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura

```
sofiapp/
├── public/
│   ├── robots.txt
│   └── sofi-icon.svg
├── src/
│   ├── components/
│   │   ├── ui/           # Button, Card
│   │   └── layout/       # Header, Navbar
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── lib/
│   │   ├── supabase.js   # Cliente Supabase
│   │   └── mockData.js   # Datos mock para desarrollo
│   ├── pages/
│   │   ├── Home.jsx      # Dashboard de puntos
│   │   ├── Tienda.jsx    # Catálogo de beneficios
│   │   ├── Logros.jsx    # Badges y logros
│   │   ├── Admin.jsx     # Asignar puntos (admin)
│   │   └── Login.jsx     # Selección de usuario
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── IDEACION.md           # Documento de ideación completo
├── .env.example
├── vite.config.js
└── package.json
```

## 👥 Usuarios

- **Sofia** 👧 — ve sus puntos, nivel y tienda
- **Papá (Cesar)** 👨 — admin: asigna puntos, aprueba canjes
- **Mamá** 👩 — admin: mismas funciones que papá

## 📝 Notas

- Actualmente usa **datos mock** — no requiere Supabase real para desarrollo
- Diseñado para niños: UI colorida, botones grandes, emojis
- Tailwind v4: sin `tailwind.config.js`, usa plugin de Vite

## 📄 Licencia

Proyecto privado — Familia Palacios 👨‍👩‍👧
