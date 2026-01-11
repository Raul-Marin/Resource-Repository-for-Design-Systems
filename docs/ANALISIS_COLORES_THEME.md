# Análisis de Colores en theme.css

## Comparación con Paleta Estándar de Tailwind CSS

### Colores que SÍ provienen de Tailwind (valores coinciden):

#### Azules (Blue)
- `--primary: rgba(6, 106, 254, 1)` → **blue-500** de Tailwind
  - Tailwind blue-500: `rgb(59, 130, 246)` = `#3b82f6`
  - ❌ **NO COINCIDE** - Este es un azul personalizado más intenso

- `--secondary-foreground: rgba(2, 80, 217, 1)` → Similar a **blue-600**
  - Tailwind blue-600: `rgb(37, 99, 235)` = `#2563eb`
  - ❌ **NO COINCIDE EXACTAMENTE** - Muy cercano pero personalizado

- `--accent: rgba(2, 80, 217, 1)` → Similar a **blue-600**
  - Mismo valor que secondary-foreground
  - ❌ **NO COINCIDE EXACTAMENTE**

- `--ring: rgba(0, 30, 91, 1)` → Similar a **blue-900**
  - Tailwind blue-900: `rgb(30, 58, 138)` = `#1e3a8a`
  - ❌ **NO COINCIDE** - Más oscuro, personalizado

#### Grises (Gray)
- `--foreground: rgba(46, 46, 46, 1)` → Similar a **gray-800** o **gray-900**
  - Tailwind gray-800: `rgb(31, 41, 55)` = `#1f2937`
  - Tailwind gray-900: `rgb(17, 24, 39)` = `#111827`
  - ❌ **NO COINCIDE** - Es un gris neutro personalizado (#2e2e2e)

- `--muted: rgba(201, 201, 201, 1)` → Similar a **gray-300**
  - Tailwind gray-300: `rgb(209, 213, 219)` = `#d1d5db`
  - ❌ **NO COINCIDE EXACTAMENTE** - Muy cercano pero personalizado

- `--muted-foreground: rgba(147, 147, 147, 1)` → Similar a **gray-500**
  - Tailwind gray-500: `rgb(107, 114, 128)` = `#6b7280`
  - ❌ **NO COINCIDE** - Es un gris medio personalizado (#939393)

- `--border: rgba(92, 92, 92, 1)` → Similar a **gray-600**
  - Tailwind gray-600: `rgb(75, 85, 99)` = `#6b7280`
  - ❌ **NO COINCIDE** - Es un gris personalizado (#5c5c5c)

#### Colores de Chart
- `--chart-2: rgba(26, 185, 255, 1)` → Similar a **sky-400** o **cyan-400**
  - Tailwind sky-400: `rgb(56, 189, 248)` = `#38bdf8`
  - ❌ **NO COINCIDE EXACTAMENTE** - Muy cercano pero personalizado

- `--chart-3: rgba(150, 2, 199, 1)` → Similar a **purple-600**
  - Tailwind purple-600: `rgb(147, 51, 234)` = `#9333ea`
  - ❌ **NO COINCIDE** - Es un púrpura más intenso personalizado

- `--chart-4: rgba(11, 130, 124, 1)` → Similar a **teal-600**
  - Tailwind teal-600: `rgb(13, 148, 136)` = `#0d9488`
  - ❌ **NO COINCIDE EXACTAMENTE** - Muy cercano pero personalizado

- `--chart-5: rgba(238, 176, 16, 1)` → Similar a **amber-400** o **yellow-400**
  - Tailwind amber-400: `rgb(251, 191, 36)` = `#fbbf24`
  - ❌ **NO COINCIDE** - Es un amarillo/naranja personalizado

#### Destructive
- `--destructive-foreground: rgba(182, 5, 84, 1)` → Similar a **rose-600** o **pink-600**
  - Tailwind rose-600: `rgb(225, 29, 72)` = `#e11d48`
  - Tailwind pink-600: `rgb(219, 39, 119)` = `#db2777`
  - ❌ **NO COINCIDE** - Es un rosa/rojo personalizado

### Colores que SÍ son estándar:

- `--background: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅
- `--card: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅
- `--popover: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅
- `--primary-foreground: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅
- `--accent-foreground: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅
- `--input: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅
- `--input-background: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅
- `--sidebar: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅
- `--sidebar-primary-foreground: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅
- `--sidebar-accent-foreground: rgba(255, 255, 255, 1)` → **white** de Tailwind ✅

- `--secondary: rgba(0, 0, 0, 0)` → **transparent** ✅
- `--destructive: rgba(0, 0, 0, 0)` → **transparent** ✅

## ⚠️ IMPORTANTE: Sistema Dual de Colores

**El proyecto usa DOS sistemas de colores simultáneamente:**

### 1. ✅ Colores Estándar de Tailwind CSS v4 (OKLCH)

El proyecto usa **Tailwind CSS v4.1.12** que incluye TODOS los colores estándar automáticamente:

```css
/* Generados automáticamente por Tailwind v4 */
--color-blue-500: oklch(62.3% .214 259.815);    /* = rgb(59, 130, 246) ✅ */
--color-purple-600: oklch(55.8% .288 302.321);  /* = rgb(147, 51, 234) ✅ */
--color-pink-500: oklch(65.6% .241 354.308);   /* = rgb(236, 72, 153) ✅ */
```

**Se usan directamente en componentes con clases de Tailwind:**
- `bg-blue-50`, `bg-purple-50`, `bg-pink-50`
- `from-blue-50 to-purple-50` (gradientes)
- `text-purple-700`, `border-purple-200/50`
- `bg-gradient-to-br from-blue-400 to-purple-500`

**Ejemplos en el código:**
```tsx
// src/app/components/Admin.tsx
className="bg-gradient-to-r from-blue-50 to-purple-50"

// src/app/components/AuditShowcase.tsx
className="bg-gradient-to-br from-blue-400 to-purple-500"
```

### 2. 🎨 Variables Personalizadas en `theme.css` (RGB)

Las variables en este archivo (`theme.css`) son **PERSONALIZADAS** para el sistema de diseño:

#### Colores personalizados (NO estándar de Tailwind):
- `--primary: rgba(6, 106, 254, 1)` → NO es blue-500 estándar
- `--accent: rgba(2, 80, 217, 1)` → NO es blue-600 estándar
- `--foreground: rgba(46, 46, 46, 1)` → NO es gray estándar
- `--border: rgba(92, 92, 92, 1)` → NO es gray estándar
- Todos los colores de chart son personalizados

**Se usan para elementos del sistema de diseño:**
- Botones primarios: `bg-primary`
- Textos principales: `text-foreground`
- Bordes del sistema: `border-border`
- Componentes shadcn/ui

### Resumen Final:

| Sistema | Formato | Ubicación | Uso |
|---------|---------|-----------|-----|
| **Colores Estándar Tailwind** | OKLCH (v4) | Generados automáticamente | Clases directas (`bg-blue-500`) |
| **Variables Personalizadas** | RGB | `theme.css` | Variables (`bg-primary`) |

### Conclusión:

**El proyecto usa AMBOS sistemas:**
- ✅ **Colores estándar de Tailwind v4** para elementos decorativos (gradientes, badges, fondos)
- 🎨 **Variables personalizadas** para el sistema de diseño base (botones, inputs, componentes)

Los colores en `theme.css` son **personalizados** y están inspirados en Tailwind pero ajustados para la identidad visual del proyecto.

### Valores más cercanos a Tailwind (pero no exactos):
- `rgba(2, 80, 217, 1)` es muy cercano a `blue-600` (`rgb(37, 99, 235)`)
- `rgba(201, 201, 201, 1)` es muy cercano a `gray-300` (`rgb(209, 213, 219)`)
- `rgba(11, 130, 124, 1)` es muy cercano a `teal-600` (`rgb(13, 148, 136)`)
