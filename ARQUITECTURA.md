# ARQUITECTURA.md

> Arquitectura técnica de SofiApp.
> **Lectura obligatoria antes de crear o modificar estructura de archivos.**

---

## Visión General

```
┌─────────────────────────────────┐
│         PWA (Navegador)         │
│  React + Vite + Tailwind CSS    │
├─────────────────────────────────┤
│       Supabase Client SDK       │
│  (Auth + Postgres + Realtime)   │
├─────────────────────────────────┤
│        Supabase Cloud           │
│  Postgres DB + Auth + Storage   │
├─────────────────────────────────┤
│         GitHub Pages            │
│   (gratis, deploy automático)   │
└─────────────────────────────────┘
```

## Capas

### 1. Frontend (React PWA)
- **Single Page Application** con React Router (o router simple por estado)
- **PWA** instalable via `vite-plugin-pwa`
- **Tailwind CSS v4** para estilos (utility-first, sin CSS custom salvo excepciones)
- **Sin state management library** — Context API + hooks suffice para esta escala

### 2. Backend (Supabase — futuro)
- **Auth:** hoy es 100% local (ver sección Autenticación) — no depende de Supabase
- **Database:** Postgres gestionado por Supabase, reservado para cuando se migre la persistencia de puntos/tienda más allá de `localStorage`
- **Storage:** para avatars e imágenes de beneficios
- **RLS (Row Level Security):** políticas por tabla para separar admin vs usuario, a aplicar en la migración futura

Ver [`supabase/schema.sql`](../supabase/schema.sql) — por ahora solo documenta el modelo de datos objetivo para esa migración.

### 3. Hosting
- **GitHub Pages** — gratis, sin servidores que mantener; alcanza de sobra para el tráfico de una app familiar
- **Dominio:** `https://<usuario>.github.io/sofiapp/` (se puede apuntar un dominio propio después con un `CNAME` si se quiere)
- **HTTPS:** automático, GitHub Pages lo provee sin configuración
- **CI/CD:** GitHub Actions ([`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)) — lint + test + build + deploy en cada push a `main`

> AWS queda como opción futura si el proyecto crece más allá de lo que Pages puede ofrecer (por ahora es innecesario y tiene costo).

---

## Estructura de Carpetas

```
sofiapp/
├── public/
│   ├── icons/              # Iconos PWA (192x192, 512x512)
│   └── manifest.webmanifest
├── src/
│   ├── components/
│   │   ├── ui/             # Componentes base reutilizables
│   │   │   ├── PointBadge.jsx
│   │   │   ├── BigButton.jsx
│   │   │   ├── LevelCard.jsx
│   │   │   └── Confetti.jsx
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       └── AdminNav.jsx
│   ├── pages/
│   │   ├── Home.jsx        # Dashboard puntos (Sofia)
│   │   ├── Tienda.jsx      # Catálogo beneficios, canjear (Sofia)
│   │   ├── Logros.jsx      # Badges (Sofia)
│   │   ├── Admin.jsx       # Asignar puntos + aprobar canjes (admin)
│   │   ├── AdminDashboard.jsx # Inicio de admin: stats y gráfica por categoría
│   │   ├── AdminTienda.jsx # Gestión de catálogo — crear/editar/desactivar beneficios (admin)
│   │   ├── AdminConfig.jsx # Estado de conexión a Supabase (admin)
│   │   └── Login.jsx       # Login
│   ├── lib/
│   │   ├── supabase.js     # Cliente Supabase (reservado para uso futuro)
│   │   ├── crypto.js       # Hash local (SubtleCrypto) para contraseña/PIN
│   │   ├── auth.js         # Validaciones de usuario/contraseña/PIN
│   │   └── utils.js        # Utilidades puras (formatPoints, calcLevel, etc.)
│   ├── context/
│   │   ├── ConfigContext.jsx # Credenciales admin, PIN y perfil del niño/a
│   │   ├── AuthContext.jsx # Sesión activa (login/logout)
│   │   ├── PointsContext.jsx # Estado de puntos y transacciones
│   │   ├── CatalogoContext.jsx # CRUD de beneficios de la tienda
│   │   └── ComportamientosContext.jsx # CRUD de comportamientos (positivos y negativos)
│   ├── hooks/
│   │   ├── useAuth.js      # Hook de auth (wraps AuthContext)
│   │   ├── usePoints.js    # Hook de puntos
│   │   └── useBenefits.js  # Hook de beneficios
│   ├── data/
│   │   └── mockData.js     # Datos mock para desarrollo
│   ├── styles/
│   │   └── global.css      # Estilos globales (animaciones, etc.)
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── schema.sql          # Reservado — modelo de datos para migración futura
├── .env.example
├── .env                    # NO commitear
├── .gitignore
├── IDEACION.md
├── CLAUDE.md
├── REGLAS.md
├── ARQUITECTURA.md          # Este archivo
├── vite.config.js
├── package.json
└── README.md
```

---

## Modelo de Datos

### Tabla: `usuarios`
| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid (PK) | Supabase Auth UID |
| nombre | text | Nombre del usuario |
| rol | text | `admin` o `usuario` |
| avatar_url | text | URL del avatar |
| created_at | timestamptz | Default now() |

### Tabla: `puntos_totales`
| Columna | Tipo | Notas |
|---------|------|-------|
| usuario_id | uuid (FK→usuarios) | PK también |
| total | integer | Puntos acumulados |
| nivel | text | Nivel actual calculado |
| updated_at | timestamptz | |

### Tabla: `comportamientos`
| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid (PK) | |
| nombre | text | "Ordenar juguetes" |
| categoria | text | "responsabilidades", "estudios", etc. |
| puntos | integer | Positivo o negativo |
| tipo | text | `ganado` o `perdido` |
| icono | text | Emoji |
| activo | boolean | Default true |

### Tabla: `transacciones`
| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid (PK) | |
| usuario_id | uuid (FK) | A quién se asignan |
| comportamiento_id | uuid (FK) | Qué comportamiento (nullable si es ajuste) |
| tipo | text | `ganado`, `perdido`, `canjeado`, `ajuste` |
| puntos | integer | +N o -N |
| descripcion | text | Texto descriptivo |
| admin_id | uuid (FK) | Quién lo asignó |
| created_at | timestamptz | |

### Tabla: `beneficios`
| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid (PK) | |
| nombre | text | "Helado" |
| descripcion | text | |
| costo_puntos | integer | |
| icono | text | Emoji |
| activo | boolean | Default true |

### Tabla: `canjes`
| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid (PK) | |
| usuario_id | uuid (FK) | |
| beneficio_id | uuid (FK) | |
| estado | text | `pendiente`, `aprobado`, `rechazado` |
| creado_en | timestamptz | |
| aprobado_por | uuid (FK→usuarios) | Nullable |
| aprobado_en | timestamptz | Nullable |

### Tabla: `logros`
| Columna | Tipo | Notas |
|---------|------|-------|
| id | uuid (PK) | |
| nombre | text | |
| descripcion | text | |
| icono | text | Emoji |
| condicion | jsonb | Regla para desbloquear |

### Tabla: `usuario_logros`
| Columna | Tipo | Notas |
|---------|------|-------|
| usuario_id | uuid (FK) | PK compuesta |
| logro_id | uuid (FK) | PK compuesta |
| desbloqueado_en | timestamptz | |

---

## Flujos Principales

### Asignar puntos
```
Admin → selecciona comportamiento → click asignar
→ valida puntos (REGLAS.md)
→ insert en transacciones
→ update puntos_totales (suma o resta)
→ recalcular nivel si corresponde
→ notificación a Sofia (toast/animación)
```

### Canjear beneficio
```
Sofia → entra a Tienda → elige beneficio → click Canjear
→ valida que tenga puntos suficientes
→ insert en canjes (estado: pendiente)
→ notificación a admin
→ Admin aprueba → update canjes (estado: aprobado)
→ insert transacción (tipo: canjeado, puntos: -costo)
→ update puntos_totales (resta)
→ notificación a Sofia
```

### Cálculo de nivel
```javascript
function calcLevel(totalPoints) {
  if (totalPoints <= 50) return { name: 'Brotes', emoji: '🌱', level: 1 }
  if (totalPoints <= 150) return { name: 'Creciendo', emoji: '🌿', level: 2 }
  if (totalPoints <= 300) return { name: 'Brillante', emoji: '🌟', level: 3 }
  if (totalPoints <= 500) return { name: 'Estrella', emoji: '👑', level: 4 }
  return { name: 'Legendaria', emoji: '🚀', level: 5 }
}
```

---

## Puntos de partida

Desde ⚙️ Configuración, el admin define `puntosIniciales` (`ConfigContext`, default `0`). Al guardar, `establecerPuntos()` (`PointsContext`) actualiza el saldo actual del niño/a de inmediato — registrando la diferencia como una transacción "Ajuste de puntos de partida" en el historial, para que las gráficas y totales del dashboard sigan cuadrando. El mismo valor también queda guardado como semilla de `total` para cuando la app se usa por primera vez en un dispositivo sin datos previos (`localStorage` no sincroniza entre dispositivos).

---

## Autenticación

100% local — vive en `localStorage` del navegador, sin backend. Las contraseñas y el PIN nunca se guardan en texto plano: se pasan por `hashTexto()` ([`src/lib/crypto.js`](../src/lib/crypto.js), SHA-256 vía Web Crypto) antes de guardarse o compararse.

### Admin — varios usuarios de la familia
`ConfigContext` guarda una **lista** `adminUsuarios` (no un solo usuario): cada admin es
`{ id, username, hash, parentesco }`, con `parentesco` uno de `PARENTESCOS` en
[`src/lib/auth.js`](../src/lib/auth.js) (Papá, Mamá, Abuelo, Abuela, Tío, Tía, Otro), que también
determina el avatar (`avatarPorParentesco`).

```
Primera vez → Login muestra "Crea tu acceso" (usuario + password + parentesco)
  → crearCredencialesAdmin(usuario, password, parentesco) agrega el primer admin
  → inicia sesión automáticamente

Siguientes veces → Login pide usuario + contraseña → loginAdmin(usuario, password)
  → busca coincidencia en adminUsuarios por username + hash

Desde ⚙️ Configuración → "Usuarios de la familia":
  - editarUsuarioAdmin(id, { username, password, parentesco }) — password vacío = no cambiarla
  - eliminarUsuarioAdmin(id) — rechaza si solo queda un admin
  - crearCredencialesAdmin(...) — agrega un familiar más (Tío, Abuela, etc.)

Ya autenticado, un admin puede editar o eliminar la cuenta de OTRO admin sin pedirle su
contraseña — la sesión activa ya es la autorización (como un panel de usuarios normal). La UI
bloquea eliminar la propia cuenta mientras está en uso.
```

### Niño/a — PIN de 4 dígitos
```
Login → ingresa PIN → loginNino(pin)
  → compara contra el hash guardado (o contra "0000" si nunca se ha configurado uno)

Desde ⚙️ Configuración → cambiarPinNino(pinNuevo) actualiza el hash guardado
```

### Perfil del niño/a (nombre y avatar)
El nombre y el emoji que se muestran en el botón de login ("Soy ___") y en el saludo del header se configuran desde ⚙️ Configuración (`actualizarPerfilNino`) y se guardan en `ConfigContext`. Por defecto: `Sofia` / 👧.

> Nota de seguridad: el hash es una ofuscación básica para no exponer texto plano en `localStorage`, no un reemplazo de autenticación con backend — adecuado para un dispositivo familiar compartido, no para un producto multi-usuario expuesto a internet.

---

_Arquitectura de SofiApp — 2026-07-31_
