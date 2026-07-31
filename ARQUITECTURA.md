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
│          AWS Hosting            │
│   (dominio de Cesar)            │
└─────────────────────────────────┘
```

## Capas

### 1. Frontend (React PWA)
- **Single Page Application** con React Router (o router simple por estado)
- **PWA** instalable via `vite-plugin-pwa`
- **Tailwind CSS v4** para estilos (utility-first, sin CSS custom salvo excepciones)
- **Sin state management library** — Context API + hooks suffice para esta escala

### 2. Backend (Supabase)
- **Auth:** email/password para admins, PIN simple para Sofia (sin contraseña compleja)
- **Database:** Postgres gestionado por Supabase
- **Storage:** para avatars e imágenes de beneficios
- **RLS (Row Level Security):** políticas por tabla para separar admin vs usuario
- **Edge Functions:** solo si se necesita lógica en servidor (validaciones críticas, cálculos)

### 3. Hosting
- **AWS** (EC2, Amplify, o S3+CloudFront según preferencia)
- **Dominio:** subdominio de Cesar (ej: `sofia.ceapalaciosal.it`)
- **HTTPS:** obligatorio (Let's Encrypt o el certificado de AWS)
- **CI/CD:** GitHub Actions → build → deploy automático

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
│   │   ├── Tienda.jsx      # Catálogo beneficios (Sofia)
│   │   ├── Logros.jsx      # Badges (Sofia)
│   │   ├── Admin.jsx       # Panel admin
│   │   └── Login.jsx       # Login
│   ├── lib/
│   │   ├── supabase.js     # Cliente Supabase
│   │   └── utils.js        # Utilidades puras (formatPoints, calcLevel, etc.)
│   ├── context/
│   │   ├── AuthContext.jsx # Estado de autenticación
│   │   └── PointsContext.jsx # Estado de puntos y transacciones
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

## RLS Policies (Supabase)

```sql
-- Usuarios: cada quien ve sus propios datos
CREATE POLICY "users_self_select" ON usuarios
  FOR SELECT USING (auth.uid() = id);

-- Admins ven todo
CREATE POLICY "admins_all_usuarios" ON usuarios
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin')
  );

-- Transacciones: Sofia solo lee las suyas
CREATE POLICY "transacciones_self_select" ON transacciones
  FOR SELECT USING (usuario_id = auth.uid());

-- Transacciones: solo admins insertan
CREATE POLICY "transacciones_admin_insert" ON transacciones
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin')
  );
```

---

_Arquitectura de SofiApp — 2026-07-31_
