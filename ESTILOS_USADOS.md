# Listado de Estilos Utilizados en el Proyecto

Este documento lista todos los estilos (tipografías, colores, etc.) que se están usando realmente en las diferentes páginas del proyecto.

**Leyenda de Origen:**
- 📦 = Heredado de **shadcn/ui** (plantilla base)
- 🎨 = Utilidades de **Tailwind CSS** (clases de utilidad)
- ✨ = **Custom** (estilos personalizados del proyecto)

---

## 📝 Tipografías (Fonts)

### Fuentes Importadas ✨
- **Poppins** (pesos: 200, 300, 400, 500, 600, 700) - Fuente principal del sistema
- **Inter** (pesos: 300, 400, 500, 600, 700) - Usada en componentes Admin y Sidebar con inline styles
- **Caveat** (pesos: 400, 500, 600, 700) - Usada en HomeSection para el texto "human-curated"
- **Pixelify Sans** (pesos: 400, 500, 600, 700) - Usada en el título principal "AI Era"

### Escala Tipográfica 📦
- **H1 (text-4xl)**: 48px, font-weight: 300 (light), line-height: 1.25
- **H2 (text-2xl)**: 32px, font-weight: 400 (normal), line-height: 1.25
- **H3 (text-xl)**: 24px, font-weight: 600 (medium), line-height: 1.25
- **H4 (text-lg)**: 18px, font-weight: 400 (normal), line-height: 1.25
- **Párrafo (text-base)**: 15px, font-weight: 400 (normal), line-height: 1.5
- **Label (text-sm)**: 14px, font-weight: 400 (normal), line-height: 1.4
- **Button**: 15px, font-weight: 400 (normal), line-height: 1.5
- **Input**: 15px, font-weight: 400 (normal), line-height: 1.5

### Fuente Base 📦
- **Font Family**: `'Poppins', system-ui, -apple-system, sans-serif`
- **Font Size**: 16px (base)

---

## 🎨 Colores

### Colores del Tema (CSS Variables) 📦
*Heredados de shadcn/ui - Estructura de variables CSS estándar*

#### Modo Claro (Light Mode) 📦
- **Background**: `rgba(255, 255, 255, 1)` - Fondo de la página
- **Foreground**: `rgba(46, 46, 46, 1)` - Color principal de texto
- **Card**: `rgba(255, 255, 255, 1)` - Fondo de tarjetas
- **Card Foreground**: `rgba(46, 46, 46, 1)` - Texto en tarjetas
- **Primary**: `rgba(6, 106, 254, 1)` - Botones primarios, enlaces
- **Primary Foreground**: `rgba(255, 255, 255, 1)` - Texto sobre elementos primarios
- **Secondary**: `rgba(0, 0, 0, 0)` - Botones secundarios (transparente)
- **Secondary Foreground**: `rgba(2, 80, 217, 1)` - Texto de botones secundarios
- **Accent**: `rgba(2, 80, 217, 1)` - Highlights, estados activos
- **Accent Foreground**: `rgba(255, 255, 255, 1)` - Texto sobre elementos accent
- **Destructive**: `rgba(0, 0, 0, 0)` - Acciones destructivas (transparente)
- **Destructive Foreground**: `rgba(182, 5, 84, 1)` - Mensajes de error, acciones de eliminación
- **Muted**: `rgba(201, 201, 201, 1)` - Elementos deshabilitados
- **Muted Foreground**: `rgba(147, 147, 147, 1)` - Texto secundario
- **Border**: `rgba(92, 92, 92, 1)` - Bordes por defecto
- **Input**: `rgba(255, 255, 255, 1)` - Fondo de inputs
- **Input Background**: `rgba(255, 255, 255, 1)` - Fondo de campos de entrada
- **Ring**: `rgba(0, 30, 91, 1)` - Anillos de enfoque

### Colores de Gráficos (Charts) 📦
*Heredados de shadcn/ui - Para componentes de gráficos*
- **Chart-1**: `rgba(2, 80, 217, 1)` - Azul
- **Chart-2**: `rgba(26, 185, 255, 1)` - Cyan
- **Chart-3**: `rgba(150, 2, 199, 1)` - Púrpura
- **Chart-4**: `rgba(11, 130, 124, 1)` - Verde azulado
- **Chart-5**: `rgba(238, 176, 16, 1)` - Amarillo

### Colores Tailwind Utilizados en Componentes 🎨
*Clases de utilidad de Tailwind CSS*

#### Colores para Badges y Estados 🎨
- **Green**: `bg-green-50`, `text-green-700`, `border-green-200` - Estados de éxito, "new", "added"
- **Blue**: `bg-blue-50`, `text-blue-700`, `border-blue-200` - Mejoras, "improved", "tokens"
- **Purple**: `bg-purple-50`, `text-purple-700`, `border-purple-200` - Fixes, "fixed", "mcp-support"
- **Orange**: `bg-orange-100`, `text-orange-800`, `border-orange-200` - Guías, "ai-accessibility"
- **Pink**: `bg-pink-100`, `text-pink-800`, `border-pink-200` - Videos
- **Violet**: `bg-violet-100`, `text-violet-800`, `border-violet-200` - Comunidad
- **Gray**: `bg-gray-50`, `text-gray-700`, `border-gray-200` - Estados por defecto, texto secundario
- **Gray (darker)**: `bg-gray-900`, `text-gray-300` - Fondos oscuros, modales, tooltips

#### Colores Específicos en Código ✨
*Colores personalizados definidos directamente en componentes*
- **Botón Primario**: 
  - Gradiente: `#0250D9` → `#1AB9FF` → `#9602C7` → `#0250D9`
  - Texto: `#ffffff`
- **Botón Secundario**:
  - Color por defecto: `#0250D9`
  - Hover: `#03234D`
  - Borde por defecto: `#5c5c5c`
  - Borde hover: `#e3bbff`
- **Changelog Niveles** (púrpura con opacidades):
  - Nivel 0: `rgba(168, 85, 247, 0.08)`
  - Nivel 1: `rgba(168, 85, 247, 0.25)`
  - Nivel 2: `rgba(168, 85, 247, 0.45)`
  - Nivel 3: `rgba(168, 85, 247, 0.65)`
  - Nivel 4: `rgba(168, 85, 247, 0.85)`

#### Colores para Fondo Retro ✨
*Estilos personalizados para el fondo retro synthwave*
- **Grid puntos**: `rgba(147, 51, 234, 0.35)` - Puntos púrpura (modo human)
- **Grid puntos machine**: `rgba(255, 255, 255, 0.15)` - Puntos blancos (modo machine)
- **Nubes**: `#ffffff` con diversas opacidades (0.2 - 0.5)
- **Retro Background Gradients**:
  - Sky: `rgba(239, 246, 255, 0.4)` → `rgba(243, 232, 255, 0.35)` → `rgba(254, 243, 250, 0.3)`
  - Sun: `rgba(253, 224, 71, 0.6)` → `rgba(251, 146, 60, 0.5)` → `rgba(244, 114, 182, 0.4)`
  - Mountains: `rgba(191, 219, 254, 0.5)` → `rgba(147, 197, 253, 0.4)` → `rgba(125, 180, 240, 0.3)`
  - Buildings: `rgba(148, 163, 184, 0.35-0.55)`

#### Animaciones de Contribución ✨
*Gradientes animados personalizados*
- **Purple**: `rgba(168, 85, 247, 0.1-0.6)`
- **Pink**: `rgba(236, 72, 153, 0.1-0.6)`
- **Blue**: `rgba(59, 130, 246, 0.1-0.5)`

---

## 🔄 Animaciones

### Keyframes Definidos ✨
*Todas las animaciones son personalizadas del proyecto*
- `gradientMove` - Movimiento de gradiente
- `gradientShift` - Cambio de gradiente
- `glow` - Efecto de brillo
- `float` - Flotación suave
- `fall` - Caída de elementos
- `floatSubtle` - Flotación sutil
- `glitch` - Efecto glitch en texto
- `shimmer` - Efecto shimmer
- `ditherBlink` - Parpadeo dithered
- `contributionPulse` - Pulso de contribuciones
- `contribution-purple`, `contribution-pink`, `contribution-blue`, `contribution-mixed` - Animaciones de contribución
- `cyber-pulse` - Pulso cyber
- `sparkle`, `sparkle-logo`, `sparkle-float`, `sparkle-gentle` - Efectos de brillo
- `star-fall` - Caída de estrellas
- `ripple-wave`, `ripple-wave-slow` - Ondas de ripple
- `fadeIn`, `fadeInBackdrop`, `fadeOutBackdrop` - Fade in/out
- `slideUpSheet`, `slideDownSheet` - Deslizamiento de hojas
- `skeletonPulse` - Pulso de skeleton loading
- `bounce-dot` - Rebote de puntos
- `character-popup`, `character-dance` - Animaciones de personajes pixel
- `spin` - Rotación (podría venir de Tailwind pero está redefinido)
- `blink` - Parpadeo
- `wiggle`, `wiggle-happy` - Movimiento de lado a lado
- `bounce-subtle` - Rebote sutil
- `tail-wag` - Movimiento de cola
- `mouth-open` - Apertura de boca
- `bubble-pop`, `bubble-appear-disappear` - Burbujas
- `bounce-happy` - Rebote feliz
- `ai-gradient` - Gradiente AI
- `scan-line` - Línea de escaneo
- `fade-in-scale` - Fade con escala
- `shake` - Sacudida
- `bounceIn` - Rebote de entrada
- `pulse` - Pulso
- `cloudFloat` - Flotación de nubes
- `twinkle` - Parpadeo de estrellas
- `sun-glow` - Brillo del sol
- `lines-move` - Movimiento de líneas de grid retro

---

## 📐 Bordes y Radio

### Border Radius 📦
*Heredados de shadcn/ui - Sistema de radios estándar*
- **Radius base**: `8px`
- **Radius button (pill)**: `9999px` (totalmente redondeado)
- **Radius card**: `12px`
- **Radius sm**: `4px` (calc: 8px - 4px)
- **Radius md**: `6px` (calc: 8px - 2px)
- **Radius lg**: `8px`
- **Radius xl**: `12px`

### Borders 📦
*Heredados de shadcn/ui*
- **Border base**: `rgba(92, 92, 92, 1)` - Color gris
- **Border Sidebar**: `rgba(201, 201, 201, 1)` - Color gris claro

---

## 🌫️ Sombras (Shadows)

### Sombras del Sistema 📦
*Heredadas de shadcn/ui*
- **Elevation-sm**: `0px -1px 1.7px 0px rgba(0,0,0,0.03), 0px 5.7px 5.9px 0px rgba(0,0,0,0.07), 0px 0px 5.9px 0px rgba(0,0,0,0.07)`

### Sombras Específicas ✨
*Sombras personalizadas para efectos específicos*
- **Título H1**: `0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)`
- **Nubes**: `0 2px 8px rgba(59, 130, 246, 0.08)`
- **Sol retro**: Múltiples sombras con blur para efecto glow
- **Ventanas pixel**: `0 0 2px rgba(255, 230, 150, 0.25)`

---

## 📦 Espaciado y Layout

### Z-Index Layers ✨
*Sistema de capas personalizado del proyecto*
- **Base**: `z-0`
- **Background layers**: `z-[1]`, `z-[2]`
- **Content**: `z-10`
- **Buttons/Interactive**: `z-[2]`, `z-[3]`
- **Fixed elements**: `z-[50]` o superior

### Padding y Margin 🎨
*Clases de utilidad de Tailwind CSS*
- Uso general de clases Tailwind: `p-4`, `px-4`, `py-4`, `gap-2`, `gap-4`, etc.
- Padding responsive: `sm:px-6`, `md:px-12`, `lg:px-16`

---

## 🎯 Clases de Utilidad Específicas

### Custom Cursor ✨
*Sistema de cursor personalizado*
- Se oculta el cursor por defecto en desktop (`cursor: none`)
- Excepciones para páginas CMS: `cursor: auto`, `cursor: text`, `cursor: pointer`

### Scrollbar ✨
*Utilidad personalizada*
- `.scrollbar-hide` - Oculta scrollbar manteniendo funcionalidad

### Animaciones Aplicadas ✨
*Clases de utilidad personalizadas que usan los keyframes definidos*
- `.animate-float-subtle`
- `.animate-character-popup`
- `.animate-character-dance`
- `.animate-bubble-appear-disappear`
- `.animate-cyber-pulse`
- `.animate-sparkle`
- `.animate-fade-in-scale`
- `.animate-glitch`
- `.animate-float`
- `.shake-animation`

---

## 🗂️ Archivos CSS Utilizados

1. **fonts.css** ✨ - Importación de fuentes de Google Fonts (personalizado)
2. **tailwind.css** 🎨 - Configuración de Tailwind CSS
3. **theme.css** 📦 - Variables CSS del tema heredadas de shadcn/ui (colores, tipografía, radios, sombras base)
4. **clouds.css** ✨ - Estilos personalizados para nubes animadas (15 variantes)
5. **retro-bg.css** ✨ - Estilos personalizados para fondo retro synthwave
6. **pixel-city.css** ✨ - Estilos personalizados para ciudad pixel art (edificios y ventanas)
7. **index.css** ✨ - Estilos globales personalizados, animaciones, cursor personalizado

---

## 📋 Notas Importantes

- Las imágenes se cargan desde `figma:asset/`, no desde archivos locales
- **El modo oscuro NO está implementado** - Todas las referencias a modo oscuro han sido eliminadas
  - El código del modo oscuro venía de la plantilla base de **shadcn/ui** (según `ATTRIBUTIONS.md`), que incluye soporte para dark mode por defecto en sus temas CSS
  - Aunque el `package.json` incluye `next-themes` (librería para temas), nunca se implementó (`ThemeProvider` no existe en el código)
  - Se eliminó toda la sección `.dark { ... }` y `@custom-variant dark` que no se usaban
- Las fuentes Inter y Caveat se usan con inline styles en componentes específicos
- El componente PixelCity usa clases CSS personalizadas definidas en `pixel-city.css`
- Los colores de los badges y tipos se definen dinámicamente en componentes (Admin, ChangelogSection, ReadingsSection)
- Todos los componentes UI de la carpeta `ui/` han sido eliminados porque no se usaban desde componentes principales
- El proyecto está basado en **shadcn/ui** con componentes de **Radix UI** (todas las dependencias `@radix-ui/react-*` están presentes)

---

*Documento generado automáticamente - Última actualización: $(date)*
