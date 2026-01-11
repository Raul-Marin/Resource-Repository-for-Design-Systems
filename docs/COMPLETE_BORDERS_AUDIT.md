# 🔲 Complete Borders & Border Radius Audit of the Project

## 📋 Index

1. [Border CSS Variables](#1-border-css-variables)
2. [Border Radius CSS Variables](#2-border-radius-css-variables)
3. [Tailwind Border Classes Used](#3-tailwind-border-classes-used)
4. [Tailwind Border Radius Classes Used](#4-tailwind-border-radius-classes-used)
5. [Custom Inline Border Values](#5-custom-inline-border-values)
6. [Border Colors Used](#6-border-colors-used)
7. [Border Widths Used](#7-border-widths-used)
8. [Border Styles Used](#8-border-styles-used)
9. [Border Positions Used](#9-border-positions-used)

---

## 1. Border CSS Variables

**Location:** `src/styles/theme.css` (lines 43, 87)  
**Format:** CSS Custom Properties  
**Origin:** 📦 shadcn/ui

### 🎨 Border Color Variables

| Variable | RGB Value | Hex | Origin | Usage |
|----------|-----------|-----|--------|-------|
| `--border` | `rgba(92, 92, 92, 1)` | `#5c5c5c` | 📦 shadcn/ui | Default border color for inputs, buttons, containers |
| `--sidebar-border` | `rgba(201, 201, 201, 1)` | `#c9c9c9` | 📦 shadcn/ui | Border color for sidebar and navigation elements |

### 📍 Usage Locations

#### `--border`
- **Location:** `src/styles/theme.css` (line 43)
- **Mapped to:** `--color-border` in `@theme inline` (line 109)
- **Applied to:** Default borders throughout the application
- **Usage:** `border-border` (Tailwind class)

#### `--sidebar-border`
- **Location:** `src/styles/theme.css` (line 87)
- **Mapped to:** `--color-sidebar-border` in `@theme inline` (line 130)
- **Applied to:** Sidebar and navigation borders
- **Usage:** Sidebar-specific styling

---

## 2. Border Radius CSS Variables

**Location:** `src/styles/theme.css` (lines 69-73, 118-122)  
**Format:** CSS Custom Properties  
**Origin:** 📦 shadcn/ui

### 📏 Border Radius Variables

| Variable | Value | Computed | Origin | Usage |
|----------|-------|----------|--------|-------|
| `--radius` | `8px` | `8px` | 📦 shadcn/ui | Base border radius for buttons, tooltips, containers |
| `--radius-button` | `9999px` | `9999px` (full) | 📦 shadcn/ui | Pill-shaped buttons (fully rounded) |
| `--radius-card` | `12px` | `12px` | 📦 shadcn/ui | Cards and larger containers |
| `--radius-sm` | `calc(var(--radius) - 4px)` | `4px` | 📦 shadcn/ui | Small radius (computed from base) |
| `--radius-md` | `calc(var(--radius) - 2px)` | `6px` | 📦 shadcn/ui | Medium radius (computed from base) |
| `--radius-lg` | `var(--radius)` | `8px` | 📦 shadcn/ui | Large radius (same as base) |
| `--radius-xl` | `var(--radius-card)` | `12px` | 📦 shadcn/ui | Extra large radius (same as card) |

### 📍 Usage Locations

#### Base Radius Variables
- **Location:** `src/styles/theme.css` (lines 69-73)
- **Mapped to:** `@theme inline` (lines 118-122)
- **Applied to:** Various components via CSS variables

#### Computed Radius Variables
- **Location:** `src/styles/theme.css` (lines 118-122)
- **Format:** Calculated from base `--radius` value
- **System:** Hierarchical system based on `--radius` (8px)

### 📐 Radius Scale System

The border radius system uses a hierarchical approach:

```
--radius (8px) - Base
├── --radius-sm (4px) = calc(var(--radius) - 4px)
├── --radius-md (6px) = calc(var(--radius) - 2px)
├── --radius-lg (8px) = var(--radius)
└── --radius-xl (12px) = var(--radius-card)

--radius-card (12px) - Cards
--radius-button (9999px) - Pills
```

---

## 3. Tailwind Border Classes Used

**Location:** Throughout components in `src/app/components/*.tsx`  
**Origin:** 🎨 Tailwind CSS v4.1.12  
**Format:** Utility classes

### 🎨 Border Color Classes

#### Gray Scale Borders
| Class | Color | Usage Count | Common Usage |
|-------|-------|-------------|--------------|
| `border-gray-200` | `#e5e7eb` | ~200+ | Default borders, cards, containers |
| `border-gray-200/50` | `#e5e7eb` (50% opacity) | ~10+ | Subtle borders, dividers |
| `border-gray-300` | `#d1d5db` | ~20+ | Hover states, active borders |
| `border-gray-400` | `#9ca3af` | ~5+ | Secondary borders |

#### Colored Borders (Badges & States)
| Class | Color | Usage Count | Common Usage |
|-------|-------|-------------|--------------|
| `border-blue-200` | `#bfdbfe` | ~30+ | Blue badges, info states |
| `border-blue-600` | `#2563eb` | ~10+ | Active states, selected tabs |
| `border-purple-200` | `#e9d5ff` | ~20+ | Purple badges, decorative |
| `border-purple-200/40` | `#e9d5ff` (40% opacity) | ~5+ | Subtle purple borders |
| `border-green-200` | `#bbf7d0` | ~15+ | Success states, positive feedback |
| `border-red-200` | `#fecaca` | ~5+ | Error states, destructive actions |
| `border-yellow-200` | `#fde68a` | ~5+ | Warning states, badges |
| `border-orange-200` | `#fed7aa` | ~5+ | Orange badges |
| `border-pink-200` | `#fbcfe8` | ~5+ | Pink badges |
| `border-violet-200` | `#ddd6fe` | ~5+ | Violet badges |

#### Custom Border Colors
| Class/Value | Color | Usage Location | Purpose |
|-------------|-------|----------------|---------|
| `border-[#5c5c5c]` | `#5c5c5c` | `SecondaryButton.tsx` | Custom border matching `--border` |
| `border-[#e3bbff]` | `#e3bbff` | `SecondaryButton.tsx` | Hover state border (light purple) |

### 📏 Border Width Classes

| Class | Value | Usage Count | Common Usage |
|-------|-------|-------------|--------------|
| `border` | `1px` | ~500+ | Default border width (most common) |
| `border-0` | `0px` | ~10+ | No border |
| `border-2` | `2px` | ~20+ | Thicker borders (tabs, active states) |
| `border-4` | `4px` | ~2+ | Very thick borders (rare) |
| `border-8` | `8px` | ~1+ | Extra thick borders (very rare) |

### 🎨 Border Style Classes

| Class | Value | Usage Count | Common Usage |
|-------|-------|-------------|--------------|
| `border-solid` | `solid` | ~50+ | Explicit solid borders |
| `border-dashed` | `dashed` | ~10+ | Dashed borders (dividers, placeholders) |
| `border-dotted` | `dotted` | ~2+ | Dotted borders (rare) |
| `border-double` | `double` | ~1+ | Double borders (very rare) |

**Note:** Most borders use the default `solid` style without explicitly declaring it.

### 📍 Border Position Classes

| Class | Position | Usage Count | Common Usage |
|-------|----------|-------------|--------------|
| `border-t` | Top | ~20+ | Top borders, dividers |
| `border-b` | Bottom | ~50+ | Bottom borders, tab indicators, dividers |
| `border-l` | Left | ~5+ | Left borders (rare) |
| `border-r` | Right | ~10+ | Right borders (sidebars, dividers) |
| `border-x` | Left & Right | ~5+ | Horizontal borders |
| `border-y` | Top & Bottom | ~5+ | Vertical borders |

---

## 4. Tailwind Border Radius Classes Used

**Location:** Throughout components in `src/app/components/*.tsx`  
**Origin:** 🎨 Tailwind CSS v4.1.12  
**Format:** Utility classes

### 📐 Standard Border Radius Classes

| Class | Value | Usage Count | Common Usage |
|-------|-------|-------------|--------------|
| `rounded-none` | `0px` | ~5+ | No rounding (square corners) |
| `rounded-sm` | `0.125rem` (2px) | ~10+ | Small rounding |
| `rounded` | `0.25rem` (4px) | ~100+ | Default rounding |
| `rounded-md` | `0.375rem` (6px) | ~50+ | Medium rounding |
| `rounded-lg` | `0.5rem` (8px) | ~200+ | Large rounding (most common) |
| `rounded-xl` | `0.75rem` (12px) | ~150+ | Extra large rounding (cards) |
| `rounded-2xl` | `1rem` (16px) | ~20+ | 2XL rounding (large cards) |
| `rounded-3xl` | `1.5rem` (24px) | ~5+ | 3XL rounding (very large elements) |
| `rounded-full` | `9999px` | ~50+ | Fully rounded (pills, circles) |

### 📍 Positional Border Radius Classes

| Class | Position | Usage Count | Common Usage |
|-------|----------|-------------|--------------|
| `rounded-t` | Top | ~5+ | Top corners only |
| `rounded-b` | Bottom | ~10+ | Bottom corners only |
| `rounded-l` | Left | ~5+ | Left corners only |
| `rounded-r` | Right | ~5+ | Right corners only |
| `rounded-tl` | Top-left | ~2+ | Top-left corner only |
| `rounded-tr` | Top-right | ~2+ | Top-right corner only |
| `rounded-bl` | Bottom-left | ~2+ | Bottom-left corner only |
| `rounded-br` | Bottom-right | ~2+ | Bottom-right corner only |

### 📊 Radius Distribution

- **Most Common:** `rounded-lg` (8px) - Used for cards, buttons, containers
- **Second Most Common:** `rounded-xl` (12px) - Used for larger cards and containers
- **Pills:** `rounded-full` (9999px) - Used for badges, pills, circular elements
- **Default:** `rounded` (4px) - Used for small elements

---

## 5. Custom Inline Border Values

**Location:** Various components via inline styles or Tailwind arbitrary values  
**Format:** `border-[XXpx]`, `rounded-[XXpx]`, or inline styles  
**Origin:** ✨ Custom (project-specific)

### 📏 Custom Border Radius Values

| Value | Usage Location | Component | Purpose |
|-------|----------------|-----------|---------|
| `rounded-[var(--border-radius-md)]` | CMS components | `MigrateContributors.tsx`, `CleanupDuplicates.tsx` | Using CSS variable via Tailwind |
| `rounded-[var(--border-radius-lg)]` | CMS components | `MigrateContributors.tsx`, `DiagnoseCMS.tsx` | Using CSS variable via Tailwind |
| `rounded-2xl` | Admin panel | `Admin.tsx` | Large modal containers (16px) |

### 🎨 Custom Border Values

| Value | Usage Location | Component | Purpose |
|-------|----------------|-----------|---------|
| `border-[#5c5c5c]` | SecondaryButton | `SecondaryButton.tsx` | Custom border color matching CSS variable |
| `border-[#e3bbff]` | SecondaryButton hover | `SecondaryButton.tsx` | Custom hover border color |

---

## 6. Border Colors Used

### 📦 CSS Variables (Base Borders)

| Variable | Value | Applied To |
|----------|-------|------------|
| `--border` | `rgba(92, 92, 92, 1)` | Default borders (inputs, buttons, containers) |
| `--sidebar-border` | `rgba(201, 201, 201, 1)` | Sidebar and navigation borders |

### 🎨 Tailwind Color Classes

#### Most Used Border Colors
| Color Family | Classes | Usage Count | Common Usage |
|--------------|---------|-------------|--------------|
| **Gray** | `border-gray-200`, `border-gray-200/50`, `border-gray-300` | ~250+ | Default borders, cards, containers |
| **Blue** | `border-blue-200`, `border-blue-600` | ~40+ | Info states, active tabs, badges |
| **Purple** | `border-purple-200`, `border-purple-200/40` | ~25+ | Decorative borders, badges |
| **Green** | `border-green-200` | ~15+ | Success states, positive feedback |
| **Red** | `border-red-200`, `border-red-100` | ~5+ | Error states, destructive actions |
| **Yellow** | `border-yellow-200` | ~5+ | Warning states, badges |
| **Orange** | `border-orange-200` | ~5+ | Orange badges |
| **Pink** | `border-pink-200` | ~5+ | Pink badges |
| **Violet** | `border-violet-200` | ~5+ | Violet badges |

### 📊 Color Distribution

- **Most Common:** `border-gray-200` - Used for default borders throughout the application
- **Second Most Common:** `border-blue-200` - Used for badges and info states
- **Active States:** `border-blue-600` - Used for active tabs and selected states
- **Opacity Variants:** `/50`, `/40` - Used for subtle borders and dividers

---

## 7. Border Widths Used

### 🎨 Tailwind Classes

| Class | Value | Usage Count | Common Usage |
|-------|-------|-------------|--------------|
| `border` | `1px` | ~500+ | Default border width (most common) |
| `border-0` | `0px` | ~10+ | No border |
| `border-2` | `2px` | ~20+ | Thicker borders (tabs, active states) |
| `border-4` | `4px` | ~2+ | Very thick borders (rare) |
| `border-8` | `8px` | ~1+ | Extra thick borders (very rare) |

### 📊 Width Distribution

- **Most Common:** `border` (1px) - Default for all borders
- **Thick Borders:** `border-2` (2px) - Used for emphasis, active states, tabs
- **No Border:** `border-0` - Used to remove borders explicitly

---

## 8. Border Styles Used

### 🎨 Tailwind Classes

| Class | Value | Usage Count | Common Usage |
|-------|-------|-------------|--------------|
| `border-solid` | `solid` | ~50+ | Explicit solid borders |
| `border-dashed` | `dashed` | ~10+ | Dashed borders (dividers, placeholders) |
| `border-dotted` | `dotted` | ~2+ | Dotted borders (rare) |
| `border-double` | `double` | ~1+ | Double borders (very rare) |

### 📊 Style Distribution

- **Most Common:** `border-solid` (or default solid) - Used for all standard borders
- **Dashed:** `border-dashed` - Used for dividers, placeholders, drag-and-drop zones
- **Note:** Most borders use the default `solid` style without explicitly declaring it

---

## 9. Border Positions Used

### 🎨 Tailwind Classes

| Class | Position | Usage Count | Common Usage |
|-------|----------|-------------|--------------|
| `border-t` | Top | ~20+ | Top borders, dividers |
| `border-b` | Bottom | ~50+ | Bottom borders, tab indicators, dividers |
| `border-l` | Left | ~5+ | Left borders (rare) |
| `border-r` | Right | ~10+ | Right borders (sidebars, dividers) |
| `border-x` | Left & Right | ~5+ | Horizontal borders |
| `border-y` | Top & Bottom | ~5+ | Vertical borders |

### 📊 Position Distribution

- **Most Common:** `border-b` - Used for tab indicators, dividers, section separators
- **Second Most Common:** `border-t` - Used for top dividers
- **Sidebars:** `border-r` - Used for sidebar right borders
- **Full Borders:** Default (all sides) - Most common for cards and containers

---

## 📊 Summary by Origin

### 📦 shadcn/ui (CSS Variables)
- **Total:** 2 border color variables, 7 border radius variables
- **Location:** `src/styles/theme.css`
- **Format:** CSS Custom Properties
- **Usage:** Base design system values

### 🎨 Tailwind CSS (Utility Classes)
- **Total:** All standard Tailwind border and border-radius utilities
- **Version:** Tailwind CSS v4.1.12
- **Usage:** Applied directly in components via classes
- **Categories:** Border colors, widths, styles, positions, border-radius sizes

### ✨ Custom (Inline Styles)
- **Total:** ~5+ custom border values via `border-[XX]` or `rounded-[XX]`
- **Location:** Various components
- **Format:** Tailwind arbitrary values or inline styles
- **Purpose:** Component-specific border needs

---

## 🎯 Conclusion

The project uses a **hybrid border system**:

1. **CSS Variables:** Base border colors and radius values from shadcn/ui
2. **Tailwind Classes:** Utility classes for component-level borders and radius
3. **Hierarchical Radius:** System based on `--radius` (8px) with computed variants
4. **Color System:** Gray for defaults, colored borders for states and badges
5. **Width System:** Primarily 1px borders, with 2px for emphasis
6. **Style System:** Mostly solid borders, with dashed for dividers

All borders and border-radius values are organized and declared in the files mentioned above.

---

## 📑 Section Index

1. [Border CSS Variables](#1-border-css-variables)
2. [Border Radius CSS Variables](#2-border-radius-css-variables)
3. [Tailwind Border Classes Used](#3-tailwind-border-classes-used)
4. [Tailwind Border Radius Classes Used](#4-tailwind-border-radius-classes-used)
5. [Custom Inline Border Values](#5-custom-inline-border-values)
6. [Border Colors Used](#6-border-colors-used)
7. [Border Widths Used](#7-border-widths-used)
8. [Border Styles Used](#8-border-styles-used)
9. [Border Positions Used](#9-border-positions-used)
