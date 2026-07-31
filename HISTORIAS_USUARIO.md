# HISTORIAS DE USUARIO

> SofiApp — Backlog de historias de usuario ordenadas por épica y prioridad MVP.
> Formato: *Como [rol], quiero [acción] para [valor].*

---

## Roles
- **Sofia** — niña de 4 años, usuario principal
- **Admin** — papá o mamá, gestionan puntos y beneficios

---

## Épica 1: Autenticación

### HU-101: Login de admin
**Como** admin (papá/mamá),  
**Quiero** iniciar sesión con email y contraseña,  
**Para** acceder al panel de gestión de puntos.

- **Criterios de aceptación:**
  - [ ] Pantalla de login con email y contraseña
  - [ ] Validación de campos no vacíos
  - [ ] Mensaje de error si credenciales incorrectas
  - [ ] Sesión persistente (no pedir login cada vez)
  - [ ] Botón de cerrar sesión

### HU-102: Login de Sofia (simple)
**Como** Sofia,  
**Quiero** entrar a mi app con un PIN de 4 dígitos o sin login,  
**Para** no tener que escribir contraseña (tengo 4 años).

- **Criterios de aceptación:**
  - [ ] Si el dispositivo ya tiene sesión admin activa, Sofia entra directo
  - [ ] Opción de PIN visual (números grandes, coloridos)
  - [ ] Máximo 4 dígitos, auto-submit al completar
  - [ ] Sin mensajes de error complejos — si falla, simplemente limpiar y reintentar

### HU-103: Roles diferenciados
**Como** admin,  
**Quiero** que la app muestre vista distinta según el rol,  
**Para** que Sofia vea su interfaz y yo vea la de gestión.

- **Criterios de aceptación:**
  - [ ] Si rol = admin → vista de gestión (Admin.jsx)
  - [ ] Si rol = usuario → vista de Sofia (Home.jsx)
  - [ ] Admin puede cambiar entre "Vista Sofia" y "Vista Admin"

---

## Épica 2: Gestión de Puntos

### HU-201: Ver dashboard de puntos
**Como** Sofia,  
**Quiero** ver cuántos puntos tengo,  
**Para** saber qué tan cerca estoy de mis beneficios.

- **Criterios de aceptación:**
  - [ ] Número de puntos GRANDE y visible (mínimo 48px)
  - [ ] Nivel actual con emoji (🌱🌿🌟👑🚀)
  - [ ] Barra de progreso visual al siguiente nivel
  - [ ] Avatar de Sofia
  - [ ] Animación de celebración al recibir puntos nuevos
  - [ ] Colores alegres y alegres

### HU-202: Asignar puntos positivos
**Como** admin,  
**Quiero** asignar puntos a Sofia por un buen comportamiento,  
**Para** reforzar sus hábitos positivos.

- **Criterios de aceptación:**
  - [ ] Lista de comportamientos organizados por categoría (📚🏠💪🎭⭐)
  - [ ] Cada comportamiento muestra emoji + nombre + puntos
  - [ ] Botón grande "Asignar" por cada comportamiento
  - [ ] Al asignar: animación de confirmación + toast
  - [ ] Registro automático en historial (quién asignó, cuándo, qué)
  - [ ] Actualización instantánea del total de puntos

### HU-203: Restar puntos (pataletas)
**Como** admin,  
**Quiero** restar puntos por mal comportamiento (pataletas),  
**Para** que Sofia entienda que sus acciones tienen consecuencias.

- **Criterios de aceptación:**
  - [ ] Sección separada de "comportamientos negativos" (no mezclada con positivos)
  - [ ] Puntos negativos visibles en rojo
  - [ ] Confirmación antes de restar ("¿Seguro que quieres restar X puntos?")
  - [ ] Nunca baja de 0 puntos totales (mínimo 0)
  - [ ] No baja de nivel (los puntos negativos solo afectan el acumulado)
  - [ ] Registro en historial con tipo "perdido"

### HU-204: Ver historial de puntos
**Como** admin,  
**Quiero** ver el historial de transacciones,  
**Para** hacer seguimiento del progreso de Sofia.

- **Criterios de aceptación:**
  - [ ] Timeline cronológico (más reciente primero)
  - [ ] Cada entrada: emoji + descripción + puntos (+/-) + fecha + quién asignó
  - [ ] Filtro por tipo (ganados, perdidos, canjeados)
  - [ ] Filtro por categoría
  - [ ] Solo visible para admin

### HU-205: Crear comportamiento personalizado
**Como** admin,  
**Quiero** crear nuevos comportamientos con sus puntos,  
**Para** adaptar la app a medida que Sofia crece.

- **Criterios de aceptación:**
  - [ ] Formulario: nombre, emoji, categoría, puntos, tipo (positivo/negativo)
  - [ ] Emoji picker simple (lista de emojis comunes)
  - [ ] Activar/desactivar comportamientos sin borrarlos
  - [ ] Editar puntos de un comportamiento existente

---

## Épica 3: Tienda de Beneficios

### HU-301: Ver catálogo de beneficios
**Como** Sofia,  
**Quiero** ver todos los beneficios que puedo canjear,  
**Para** elegir qué quiero conseguir.

- **Criterios de aceptación:**
  - [ ] Grid de cards con imagen/emoji grande, nombre y costo
  - [ ] Beneficios que no puede pagar aparecen grises o con candado 🔒
  - [ ] Beneficios alcanzables destacados con colores brillantes
  - [ ] Botón grande "Canjear" en cada card alcanzable
  - [ ] Animación al hover/tap en cada card

### HU-302: Canjear beneficio
**Como** Sofia,  
**Quiero** canjear mis puntos por un beneficio,  
**Para** obtener mi recompensa.

- **Criterios de aceptación:**
  - [ ] Al canjear: confirmación "¿Seguro?" con emoji del beneficio
  - [ ] Crear solicitud de canje (estado: pendiente)
  - [ ] Descontar puntos al crear la solicitud (pre-reserva)
  - [ ] Animación de celebración 🎉 al confirmar
  - [ ] Mensaje: "¡Le dije a papá/mamá! Te lo darán pronto 🥰"

### HU-303: Aprobar/Rechazar canje
**Como** admin,  
**Quiero** aprobar o rechazar los canjes que Sofia solicita,  
**Para** gestionar cuándo y cómo recibe sus recompensas.

- **Criterios de aceptación:**
  - [ ] Notificación cuando hay un canje pendiente
  - [ ] Lista de solicitudes pendientes
  - [ ] Botón "Aprobar" (verde) y "Rechazar" (rojo)
  - [ ] Si se rechaza: devolver puntos a Sofia
  - [ ] Campo opcional de motivo de rechazo
  - [ ] Registro de quién aprobó/rechazó

### HU-304: Crear/editar beneficios
**Como** admin,  
**Quiero** crear y editar beneficios con su costo,  
**Para** mantener el catálogo relevante y atractivo.

- **Criterios de aceptación:**
  - [ ] Formulario: nombre, emoji, descripción, costo en puntos
  - [ ] Activar/desactivar beneficios sin borrarlos
  - [ ] Editar costo de un beneficio existente
  - [ ] Vista previa de cómo se verá el card

---

## Épica 4: Niveles y Logros

### HU-401: Ver nivel actual y progreso
**Como** Sofia,  
**Quiero** ver mi nivel y cuánto me falta para subir,  
**Para** sentir que estoy avanzando.

- **Criterios de aceptación:**
  - [ ] Emoji del nivel actual grande y animado
  - [ ] Nombre del nivel (Brotes, Creciendo, etc.)
  - [ ] Barra de progreso visual: puntos actuales vs puntos para siguiente nivel
  - [ ] Animación al subir de nivel (confetti, fuegos artificiales, sonido)

### HU-402: Desbloquear logros
**Como** Sofia,  
**Quiero** desbloquear badges por mis logros,  
**Para** sentirme orgullosa de mis accomplishments.

- **Criterios de aceptación:**
  - [ ] Pantalla de logros con grid de badges
  - [ ] Badges desbloqueados en color, bloqueados en gris con candado
  - [ ] Animación al desbloquear un logro nuevo
  - [ ] Descripción de cómo desbloquear cada badge
  - [ ] Ejemplos de badges: "Una semana sin pataletas", "Pequeña ayudante", "Cepillón experto"

### HU-403: Celebración al subir de nivel
**Como** Sofia,  
**Quiero** una celebración cuando subo de nivel,  
**Para** sentirme recompensada y motivada.

- **Criterios de aceptación:**
  - [ ] Pantalla full-screen de celebración (confetti, estrellas)
  - [ ] Emoji del nuevo nivel grande
  - [ ] Mensaje motivacional ("¡Felicidades! Eres nivel 🌟 Brillante")
  - [ ] Botón grande para continuar
  - [ ] Notificación a admin de que Sofia subió de nivel

---

## Épica 5: Experiencia de Sofia (UX 4 años)

### HU-501: Navegación simple
**Como** Sofia,  
**Quiero** navegar entre mis pantallas con botones grandes,  
**Para** usar la app sin ayuda.

- **Criterios de aceptación:**
  - [ ] Navbar inferior con 3 iconos grandes: 🏠 🎁 🏆
  - [ ] Botones mínimo 64x64px
  - [ ] Sin menús desplegables ni gestos complejos
  - [ ] Sin texto de navegación — solo iconos reconocibles
  - [ ] Vibración/haptic feedback al tocar botones (si el dispositivo lo soporta)

### HU-502: Feedback visual y sonoro
**Como** Sofia,  
**Quiero** que la app reaccione con sonidos y animaciones,  
**Para** que sea divertida y me mantenga engagada.

- **Criterios de aceptación:**
  - [ ] Sonido de "ding" al ganar puntos
  - [ ] Sonido de celebración al canjear
  - [ ] Confetti al subir de nivel o desbloquear logro
  - [ ] Animaciones de rebote en botones al tocar
  - [ ] Toggle de sonidos (admin puede silenciar)

### HU-503: Avatar personalizable
**Como** Sofia,  
**Quiero** ver mi foto o avatar en la app,  
**Para** que sea mía y me identifique con ella.

- **Criterios de aceptación:**
  - [ ] Avatar circular en el Home
  - [ ] Admin puede subir foto desde el teléfono
  - [ ] Opción de avatar con emoji si no hay foto
  - [ ] Marco del avatar cambia según el nivel (más decorado a mayor nivel)

---

## Épica 6: Administración

### HU-601: Panel de administración
**Como** admin,  
**Quiero** un panel central para gestionar todo,  
**Para** no tener que navegar múltiples pantallas.

- **Criterios de aceptación:**
  - [ ] Resumen rápido: puntos actuales de Sofia, canjes pendientes, nivel
  - [ ] Acceso rápido a: asignar puntos, gestionar beneficios, historial
  - [ ] Solo accesible si rol = admin
  - [ ] Botón para cambiar a "Vista Sofia"

### HU-602: Configuración de la app
**Como** admin,  
**Quiero** configurar parámetros generales,  
**Para** personalizar la experiencia.

- **Criterios de aceptación:**
  - [ ] Activar/desactivar sonidos
  - [ ] Cambiar PIN de Sofia
  - [ ] Editar nombre y avatar de Sofia
  - [ ] Configurar puntos mínimos (no bajar de X)
  - [ ] Exportar historial (CSV)

---

## Priorización MVP

### 🔴 Must-have (MVP F4 — Frontend)
| HU | Descripción | Estimación |
|----|-------------|------------|
| HU-101 | Login admin | 2h |
| HU-201 | Dashboard de puntos | 3h |
| HU-202 | Asignar puntos positivos | 2h |
| HU-203 | Restar puntos | 1h |
| HU-301 | Catálogo de beneficios | 2h |
| HU-302 | Canjear beneficio | 2h |
| HU-303 | Aprobar/rechazar canje | 1h |
| HU-401 | Ver nivel y progreso | 1h |
| HU-501 | Navegación simple | 1h |

**Total estimado MVP:** ~15h de desarrollo frontend

### 🟡 Should-have (post-MVP)
| HU | Descripción |
|----|-------------|
| HU-102 | Login Sofia con PIN |
| HU-204 | Historial de transacciones |
| HU-304 | Crear/editar beneficios |
| HU-402 | Sistema de logros |
| HU-502 | Feedback visual y sonoro |
| HU-503 | Avatar personalizable |
| HU-601 | Panel admin completo |

### 🟢 Nice-to-have (futuro)
| HU | Descripción |
|----|-------------|
| HU-103 | Cambio de vista admin/Sofia |
| HU-205 | Comportamientos personalizados |
| HU-403 | Celebración subir de nivel |
| HU-602 | Configuración de la app |

---

_Historias de Usuario — SofiApp_
_Creado: 2026-07-31_
