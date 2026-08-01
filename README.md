# SofiApp 🌟

App de puntos para Sofia (niños 4+) — gana puntos por buen comportamiento y canjea beneficios divertidos.

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
| Backend | Local (localStorage) — Supabase reservado para el futuro |
| PWA | vite-plugin-pwa |
| Deploy | GitHub Pages (gratis, automático vía GitHub Actions) |

## 🚀 Empezar

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Desarrollo
npm run dev

# Lint
npm run lint

# Tests
npm run test

# Build
npm run build

# Preview del build
npm run preview
```

## 🔐 Autenticación

El login es 100% local (sin backend): la primera vez que alguien entra como "Papá o Mamá", la app pide crear un usuario, contraseña y parentesco (Papá, Mamá, Abuelo, Abuela, Tío, Tía, Otro) — quedan guardados (hasheados) en este dispositivo. Desde **⚙️ Configuración → Usuarios de la familia** se pueden agregar más admins (cualquier familiar), editarlos o eliminarlos. El niño/a entra con un PIN de 4 dígitos (`0000` por defecto hasta que lo cambies), y su nombre/avatar también se personalizan desde Configuración.

## 🚀 Deploy (GitHub Pages)

Cada push a `main` corre lint + tests + build y publica automáticamente en GitHub Pages ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) — sin servidores ni costo.

**Configuración inicial (una sola vez, desde github.com):**
1. Ve a **Settings → Pages** en el repo.
2. En **Source**, elige **"GitHub Actions"** (no "Deploy from a branch").
3. Haz push a `main` (o corre el workflow manualmente desde la pestaña **Actions**) — el sitio queda en `https://<tu-usuario>.github.io/sofiapp/`.

> El `base` de Vite ya está configurado como `/sofiapp/` para producción (ver `vite.config.js`) — si algún día cambias el nombre del repo, actualiza ese valor también.

Para instalarla como app en el celular: abre esa URL en Chrome/Safari y usa "Agregar a pantalla de inicio" — no requiere Play Store ni App Store.

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
│   │   ├── ConfigContext.jsx # Credenciales admin, PIN y perfil del niño/a
│   │   └── AuthContext.jsx   # Sesión activa
│   ├── lib/
│   │   ├── supabase.js   # Cliente Supabase (reservado para uso futuro)
│   │   ├── crypto.js     # Hash local para contraseña/PIN
│   │   ├── auth.js       # Validaciones de usuario/contraseña/PIN
│   │   └── mockData.js   # Datos mock para desarrollo
│   ├── pages/
│   │   ├── Home.jsx      # Dashboard de puntos
│   │   ├── Tienda.jsx    # Catálogo de beneficios
│   │   ├── Logros.jsx    # Badges y logros
│   │   ├── Admin.jsx     # Asignar puntos (admin)
│   │   ├── AdminDashboard.jsx # Panel con stats y gráfica (admin)
│   │   ├── AdminTienda.jsx    # Gestión del catálogo (admin)
│   │   ├── AdminConfig.jsx    # Cambiar usuario/contraseña, PIN y perfil (admin)
│   │   └── Login.jsx     # Usuario/contraseña (admin) / PIN (niño/a)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase/
│   └── schema.sql        # Reservado para migración futura de datos
├── IDEACION.md           # Documento de ideación completo
├── .env.example
├── vite.config.js
└── package.json
```

## 👥 Usuarios

- **Niño/a** (nombre y avatar personalizables) — ve sus puntos, nivel y tienda
- **Familia** (Papá, Mamá, Abuelo, Abuela, Tío, Tía, Otro — cualquier número de ellos) — todos con el mismo rol admin: asignan puntos, aprueban canjes, gestionan la tienda y la configuración, incluyendo agregar o editar a otros familiares

## 📝 Notas

- Los datos (puntos, tienda, credenciales) viven en `localStorage` de este dispositivo — no requiere Supabase para funcionar
- Diseñado para niños: UI colorida, botones grandes, emojis
- Tailwind v4: sin `tailwind.config.js`, usa plugin de Vite

## 📄 Licencia

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

**CC BY-NC-SA 4.0** — Creative Commons Atribución-NoComercial-CompartirIgual. En corto:

- ✅ Puedes usar, copiar y modificar el código libremente
- ✅ Si lo modificas o creas algo a partir de él, debes compartirlo con la misma licencia (código abierto)
- ✅ Debes dar crédito al proyecto original
- ❌ No puedes venderlo ni usarlo (ni tus variantes) con fines comerciales

Ver el archivo [`LICENSE`](LICENSE) para el texto completo.

Creado originalmente para la familia Palacios 👨‍👩‍👧 — pensado para que cualquier familia lo adapte a sus propios hijos.
