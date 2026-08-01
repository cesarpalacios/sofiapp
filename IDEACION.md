# SofiApp — Ideación del Proyecto

> App de puntos para Sofia: ganar puntos por buen comportamiento y canjearlos por beneficios.

---

## 1. Visión

Una app sencilla y motivadora donde Sofia acumule puntos por sus comportamientos positivos y actividades, y pueda canjearlos por recompensas que ella misma elija. El objetivo es fomentar buenos hábitos de forma divertida, no punitiva.

## 2. Usuarios

| Rol | Quién | Qué hace |
|-----|-------|----------|
| **Admin** | Papá, Mamá, o cualquier familiar (Abuelo, Abuela, Tío, Tía, Otro) | Crea categorías, asigna puntos, aprueba canjes, configura beneficios |
| **Usuario** | Sofia (niños 4+) | Ve sus puntos, elige beneficios, hace seguimiento |

> Todos los admins tienen el mismo rol — no hay jerarquía entre ellos. Cualquiera puede asignar
> puntos, aprobar canjes, y agregar/editar/eliminar a otros admins desde ⚙️ Configuración. El
> parentesco (Papá, Mamá, Abuela, etc.) es solo para identificar a cada quien, no cambia permisos.

## 3. Mecánica Central

### Ganar puntos
Sofia gana puntos por comportamientos y actividades definidas por los admins:

| Categoría | Ejemplos | Puntos sugeridos |
|-----------|----------|------------------|
| 📚 Estudios | Hacer tarea, actividades preescolares, aprender algo nuevo | 10-30 |
| 🏠 Responsabilidades | Ordenar juguetes, ayudar en casa, cuidar mascota | 10-25 |
| 💪 Hábitos saludables | Cepillarse dientes, comer verduras, dormir temprano | 5-15 |
| 🎭 Comportamiento | Ser amable, compartir, decir la verdad, no pelear | 10-25 |
| ⭐ Logros especiales | Portarse súper bien, ayudar sin que se lo pidan | 30-50 |

### Puntos negativos (moderados)

Los puntos negativos restan puntos acumulados cuando hay malos comportamientos. Principal caso de uso: **pataletas**.

**Reglas de uso:**
- Solo los asigna el admin (papá o mamá), nunca automático
- **No bajan de nivel** a Sofia — solo restan puntos acumulados
- Ejemplos: pataleta (-5), no hacer caso (-3), pelear (-5)
- **Filosofía:** premiar > castigar. Los puntos negativos existen pero son la excepción.

### Canjear puntos
Sofia puede gastar sus puntos en beneficios:

| Beneficio | Costo en puntos |
|-----------|-----------------|
| 🍦 Helado o postre favorito | 30 |
| 🎬 Película a elección (cine o casa) | 50 |
| 🎮 20 min extra de pantalla | 25 |
| 👯 Paseo especial con papá/mamá | 60 |
| 🛍️ Algo pequeño (juguito, sticker, accesorio) | 40 |
| 🎁 Sorpresa especial (a definir) | 100 |
| 📱 Día de pantalla libre (fin de semana) | 200 |

### Niveles / Logros
Sistema de niveles para mantener motivación a largo plazo:

- 🌱 **Brotes** (0-50 puntos)
- 🌿 **Creciendo** (51-150)
- 🌟 **Brillante** (151-300)
- 👑 **Estrella** (301-500)
- 🚀 **Legendaria** (500+)

**Badges:** logros desbloqueables ("Una semana sin pataletas", "Pequeña ayudante", "Cepillón experto", etc.)

---

## 4. Funcionalidades MVP

### Must-have (MVP)
- [ ] **Dashboard de puntos** — saldo actual (número GRANDE), nivel, avatar de Sofia
- [ ] **Asignar puntos** — admin selecciona comportamiento, suma o resta puntos
- [ ] **Catálogo de beneficios** — lista visual de recompensas con costo
- [ ] **Canjear beneficio** — Sofia elige, se descuentan puntos, admin aprueba
- [ ] **Historial** — registro de puntos ganados, perdidos y canjeados
- [ ] **Notificación** — alerta cuando se ganan o canjean puntos
- [ ] **Login** — papá, mamá y Sofia con sesiones distintas

### Nice-to-have (futuro)
- [ ] Streaks (rachas de días consecutivos con puntos)
- [ ] Metas personalizadas ("Juntar 50 puntos para helado")
- [ ] Modo offline
- [ ] Notificaciones push
- [ ] Tema oscuro

> Multi-usuario infantil no es necesario — solo Sofia usa la app como usuario.

---

## 5. Stack Tecnológico

**Decisión:** Web app (PWA). Cesar tiene dominio propio y lo montamos en AWS.

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| **Frontend** | React + Vite (PWA) | Web app instalable desde el navegador, no necesita stores |
| **Backend** | Supabase | Auth + DB Postgres + Storage, sin mantener servidor |
| **Auth** | Local (sin backend) | Usuario y contraseña para admin (papá/mamá); PIN de 4 dígitos para el niño/a |
| **DB** | Postgres (Supabase) | Relacional, perfecto para transacciones de puntos |
| **Hosting** | AWS (dominio de Cesar) | Usar dominio existente |
| **DNS** | Subdominio | ej: `sofia.ceapalaciosal.it` |

### Por qué PWA y no nativa
- Sofia es niña pequeña (4+) — no necesita descargar de App Store
- Se instala como app en el teléfono de papá/mamá
- Misma base de código para todos los dispositivos
- Deploy instantáneo (cambias código, ya está vivo)
- Se puede migrar a React Native en el futuro si se necesita

---

## 6. Modelo de Datos (inicial)

```
usuarios
├── id (PK)
├── nombre
├── rol (admin | usuario)
├── puntos_totales
├── nivel_actual
└── avatar_url

comportamientos
├── id (PK)
├── nombre
├── categoria
├── puntos (positivo o negativo)
├── tipo (ganado | perdido)
└── icono

transacciones_puntos
├── id (PK)
├── usuario_id (FK)
├── comportamiento_id (FK | null)
├── tipo (ganado | perdido | canjeado | ajuste)
├── puntos (+/-)
├── descripcion
├── fecha
└── admin_id (FK — quién lo asignó)

beneficios
├── id (PK)
├── nombre
├── descripcion
├── costo_puntos
├── icono
└── activo (bool)

canjes
├── id (PK)
├── usuario_id (FK)
├── beneficio_id (FK)
├── estado (pendiente | aprobado | rechazado)
├── fecha_solicitud
└── aprobado_por (FK admin)

logros
├── id (PK)
├── nombre
├── descripcion
├── condicion
└── icono

usuario_logros
├── usuario_id (FK)
├── logro_id (FK)
└── fecha_desbloqueo
```

---

## 7. Diseño / UX

**Público principal:** Niños 4+ (Sofia).

### Principios de diseño
- **Ultra simple y visual** — Sofia todavía no lee fluido
- **Botones GRANDES** y coloridos, mínima navegación
- **Iconos claros** en vez de texto largo — emojis e imágenes
- **Audio opcional** — efectos sonoros al ganar/canjear puntos
- **Animaciones de celebración** — confetti, estrellas, fuegos artificiales al ganar puntos o subir de nivel
- **Foto de avatar** de Sofia para personalizar
- **Máximo 3 pantallas** para Sofia — que pueda navegar sola

### Referencias visuales
- Khan Academy Kids — apps preescolares
- Duolingo — gamificación y feedback
- YouTube Kids — interfaz simple con imágenes grandes

### Colores
- Tonos alegres: morado, rosa, amarillo, verde menta
- Fondo claro con elementos coloridos
- Contraste alto para botones importantes

---

## 8. Pantallas Principales

### Vista de Sofia (niña — 3 pantallas simples)

1. **🏠 Home** — puntos (número GRANDE), nivel con emoji, avatar, barra de progreso al siguiente nivel
2. **🎁 Tienda** — catálogo visual con imágenes grandes y botón "Canjear" (admin debe aprobar)
3. **🏆 Logros** — badges desbloqueados con animación

### Vista de Admin (papá/mamá)

4. **➕ Asignar puntos** — seleccionar comportamiento de lista, sumar o restar puntos
5. **✅ Aprobar canjes** — cola de solicitudes de Sofia
6. **⚙️ Gestión** — crear/editar comportamientos, beneficios, costos
7. **📊 Historial** — timeline de transacciones (quién asignó qué, cuándo)

---

## 9. Roadmap

| Fase | Duración estimada | Entregable |
|------|-------------------|------------|
| **F1 — Ideación** | ✅ Completado | Este documento |
| **F2 — Diseño** | 1 semana | Wireframes + diseño visual (pantallas grandes, coloridas) |
| **F3 — MVP Backend** | 1 semana | Supabase setup + modelo de datos + auth (papá/mamá/Sofia) |
| **F4 — MVP Frontend** | 2 semanas | Pantallas principales funcionales |
| **F5 — Testing** | 3-5 días | Probar con Sofia en real — ver si entiende la interfaz |
| **F6 — Deploy** | 2-3 días | Publicar en AWS con dominio de Cesar |

---

## Decisiones Resueltas

- ✅ **Edad objetivo:** Niños 4+ — UX ultra simple, visual, botones grandes, poco texto
- ✅ **Plataforma:** Web app (PWA) — montar en AWS con dominio de Cesar
- ✅ **Puntos negativos:** Sí, moderados. Principal uso: restar por pataletas. No bajan de nivel. Filosofía: premiar > castigar
- ✅ **Usuarios:** cualquier número de admins de la familia (Papá, Mamá, Abuelos, Tíos...) + Sofia (usuario)
- ✅ **Login:** el primer admin crea su usuario y contraseña; desde ⚙️ Configuración puede agregar, editar o eliminar otros admins de la familia (con su parentesco). El niño/a entra con un PIN de 4 dígitos, también configurable, y su nombre/avatar se personalizan desde el panel admin. Ver [ARQUITECTURA.md](ARQUITECTURA.md#autenticación)

---

_Documento de ideación — SofiApp_
_Creado: 2026-07-31_
_Autor: Cesar + CAPA_
