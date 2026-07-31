# REGLAS.md

> Reglas de código, seguridad y buenas prácticas para SofiApp.
> **Lectura obligatoria antes de generar cualquier código.**

---

## Principios de Código

### DRY (Don't Repeat Yourself)
- Cero duplicación. Si existe en dos lugares, extraer a componente/utilidad.
- Un solo lugar para constantes (colores de niveles, categorías, etc.).
- Si copias y pegas más de 3 líneas, refactorizar.

### KISS (Keep It Simple, Stupid)
- Esta app es para una niña de 4 años. La simplicidad es el feature principal.
- Si una solución requiere más de 3 niveles de anidación, simplificar.
- Menos archivos > más archivos. Pero no a costa de DRY.

### YAGNI (You Aren't Gonna Need It)
- No construir features que no están en el MVP (ver IDEACION.md).
- No agregar dependencias "por si acaso".
- No crear abstracciones prematuras. Esperar a que el patrón emerja.

### Single Responsibility
- Cada componente hace UNA cosa bien.
- Cada función tiene UNA responsabilidad clara.
- Si un archivo pasa de 150 líneas, evaluar división.

---

## Estilo de Código

### JavaScript/JSX
- **Sin TypeScript** en este proyecto (usar JSDoc para tipos cuando sea necesario)
- **ES Modules** (`import/export`), nunca `require`
- **Async/await**, nunca `.then()` encadenados
- **Const** por defecto, `let` solo cuando sea estrictamente necesario, **nunca `var`**
- Template literals para strings con variables (`` `Hola ${nombre}` ``)

### Nomenclatura
| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Archivos de componentes | PascalCase | `PointCard.jsx` |
| Archivos de utilidad | camelCase | `formatPoints.js` |
| Componentes | PascalCase | `BenefitItem` |
| Funciones | camelCase | `assignPoints()` |
| Constantes | UPPER_SNAKE | `MAX_POINTS` |
| Hooks | usePrefijo | `useAuth` |
| CSS clases (Tailwind) | utility-first | `className="text-4xl font-bold"` |

### Estructura de componentes
```jsx
// 1. Imports
import { useState } from 'react'
import { supabase } from '../lib/supabase'

// 2. Constantes del módulo
const MAX_POINTS = 999

// 3. Componente
export default function PointCard({ points, level }) {
  // 3a. Hooks y estado
  const [isLoading, setIsLoading] = useState(false)

  // 3b. Handlers
  const handleClick = async () => { ... }

  // 3c. Render
  return (
    <div>...</div>
  )
}
```

---

## Seguridad (OWASP-aligned)

### 🔒 Reglas Absolutas
- **NUNCA** commitear secrets, API keys, tokens, contraseñas
- **NUNCA** usar `eval()`, `innerHTML`, o `dangerouslySetInnerHTML` sin sanitización
- **NUNCA** deshabilitar CORS globalmente
- **SIEMPRE** validar inputs del usuario antes de procesarlos
- **SIEMPRE** usar parameterized queries (Supabase SDK las usa por defecto)
- **SIEMPRE** sanitizar inputs antes de renderizarlos (React lo hace por defecto, pero cuidado con URLs y datos dinámicos)

### 🛡️ Supabase Security
- **Row Level Security (RLS)** activado en TODAS las tablas
- Policies claras: Sofia solo puede leer sus propios datos
- Admins (papá/mamá) pueden leer y escribir todo
- Anon key solo para operaciones permitidas públicamente (login)
- Operaciones sensibles via Supabase Edge Functions (service_role key, nunca en el cliente)

### 🧹 Validación de Inputs
```javascript
// Ejemplo: validar puntos asignados
function validatePoints(points) {
  if (typeof points !== 'number' || isNaN(points)) return false
  if (points < -50 || points > 500) return false  // rangos razonables
  return true
}
```

### ⚠️ Seguridad con IA (para agentes)
- Verificar que toda librería sugerida por IA exista realmente en npm
- Revisar imports generados por IA — pueden incluir paquetes maliciosos
- No confiar ciegamente en código generado — siempre hacer code review
- Si la IA sugiere una dependencia nueva, verificar en npmjs.com antes de instalar

---

## Manejo de Estado
- **Estado local** con `useState` para componentes simples
- **Context API** para estado compartido (auth, perfil de Sofia)
- **No usar Redux** — es overkill para esta app
- Persistencia de sesión via Supabase Auth (localStorage/cookies)

---

## Performance
- Lazy loading de páginas con `React.lazy()` y `Suspense`
- Imágenes optimizadas (WebP, lazy load)
- Bundle size < 200KB gzipped como objetivo
- Lighthouse score > 90 en Performance, Accessibility, Best Practices

---

## Testing (cuando se implemente)
- **Vitest** para unit tests
- Nombrado: `describe('PointCard')` > `it('should display points')`
- Cobertura mínima objetivo: 70%
- Testear lógica de negocio (cálculo de puntos, niveles, validaciones)
- No testear implementación, testear comportamiento

---

## Accesibilidad
- Esta app es para una niña de 4 años — accesibilidad es CRÍTICA
- Botones mínimo 48x48px (recomendado 64x64px para dedos pequeños)
- Contraste de colores WCAG AA mínimo
- Texto grande (mínimo 16px, preferible 20px+ en elementos clave)
- Soporte para orientación portrait y landscape
- Navegación por tap — no requerir drag, swipe complejo, o gestures avanzados

---

## Git
- **Rama principal:** `main`
- **Commits:** formato convencional (`feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `chore:`)
- **Mensajes:** en español, descriptivos pero cortos (< 72 chars en el título)
- Hacer commits atómicos — un cambio lógico por commit
- NO commitear código que no compile o tenga errores de lint

---

_Reglas de SofiApp — 2026-07-31_
