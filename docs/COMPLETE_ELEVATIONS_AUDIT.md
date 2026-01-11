# 🌫️ Complete Elevations (Shadows) Audit

## 📋 Index

1. [Elevation CSS Variables](#1-elevation-css-variables)
2. [Tailwind Shadow Classes Used](#2-tailwind-shadow-classes-used)
3. [Custom Inline Shadow Values](#3-custom-inline-shadow-values)
4. [Text Shadows Used](#4-text-shadows-used)
5. [Drop Shadows Used](#5-drop-shadows-used)
6. [Usage Statistics](#6-usage-statistics)

---

## 1. Elevation CSS Variables

**Location:** `src/styles/theme.css` (lines 56-57, 123)  
**Format:** CSS Custom Properties  
**Origin:** 📦 shadcn/ui

### 🎨 Elevation Variables

| Variable | Value | Origin | Usage |
|----------|-------|--------|-------|
| `--elevation-sm` | `0px -1px 1.7px 0px rgba(0,0,0,0.03), 0px 5.7px 5.9px 0px rgba(0,0,0,0.07), 0px 0px 5.9px 0px rgba(0,0,0,0.07)` | 📦 shadcn/ui | Small elevations for cards, modals |
| `--shadow-sm` | `var(--elevation-sm)` | 📦 shadcn/ui | Mapped to elevation-sm in @theme inline |

### 📍 Usage Locations

#### `--elevation-sm`
- **Location:** `src/styles/theme.css` (line 57)
- **Mapped to:** `--shadow-sm` in `@theme inline` (line 123)
- **Applied to:** Small elevations throughout the application
- **Usage:** Cards, modals, small containers

---

## 2. Tailwind Shadow Classes Used

**Location:** Throughout components in `src/app/components/*.tsx`  
**Origin:** 🎨 Tailwind CSS v4.1.12  
**Format:** Utility classes

### 📦 All Shadow Classes

| Class | Tailwind Value | Usage Frequency | Common Use Cases |
|-------|---------------|-----------------|------------------|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | **Very High** | Small elevations, badges, subtle shadows |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | **High** | Medium elevations, cards on hover |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | **Very High** | Large elevations, modals, floating elements |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Medium | Extra large elevations, prominent modals |
| `shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Low | Maximum elevation, hero modals |
| `shadow-none` | `0 0 #0000` | Low | Remove shadows |
| `shadow-purple-500/30` | Colored shadow variant | Low | Special effects, hover states |

### 📍 Detailed Usage

#### `shadow-sm`
- **Usage Count:** ~50+ instances
- **Common Locations:**
  - Badges and labels (`Admin.tsx`, `JobsSection.tsx`, `ToolsSection.tsx`)
  - Filter pills and tabs
  - Small interactive elements
  - Sticky headers
- **Example:** `className="shadow-sm"`

#### `shadow-md`
- **Usage Count:** ~20+ instances
- **Common Locations:**
  - Card hover states (`hover:shadow-md`)
  - Medium-sized containers
  - Interactive elements
- **Example:** `className="hover:shadow-md transition-shadow"`

#### `shadow-lg`
- **Usage Count:** ~80+ instances
- **Common Locations:**
  - Card hover states (`hover:shadow-lg`) - **Most common**
  - Floating toolbars (`FloatingToolbar.tsx`)
  - Dropdown menus
  - Custom cursor tooltips
  - Section badges
- **Example:** `className="hover:shadow-lg transition-shadow"`

#### `shadow-xl`
- **Usage Count:** ~10+ instances
- **Common Locations:**
  - Large modals
  - Hero sections
  - Prominent cards
  - Button hover states with colored shadows
- **Example:** `className="shadow-xl"` or `hover:shadow-xl hover:shadow-purple-500/30`

#### `shadow-2xl`
- **Usage Count:** ~5+ instances
- **Common Locations:**
  - Maximum elevation modals (`Admin.tsx`)
  - Sidebar mobile menu
  - Hero-level components
- **Example:** `className="shadow-2xl"`

---

## 3. Custom Shadow Values

**Location:** CSS files  
**Format:** CSS `box-shadow` property  
**Origin:** ✨ Custom

### Custom Shadows in CSS Files

These are reusable shadows defined in CSS files that are part of the design system:

| Value | Location | Usage |
|-------|----------|-------|
| `0 2px 8px rgba(59, 130, 246, 0.08)` | `src/styles/clouds.css` (line 15) | Cloud elements in background |
| `0 0 2px rgba(255, 230, 150, 0.25)` | `src/styles/pixel-city.css` (line 89) | Window elements in pixel art city |
| `0 0 60px 30px rgba(251, 146, 60, 0.2), 0 0 120px 60px rgba(244, 114, 182, 0.15)` | `src/styles/retro-bg.css` (lines 77-93) | Animated glow effect for retro sun |

**Total Custom Shadows:** 3

### Component-Specific Inline Shadows

These shadows are defined inline in specific components and are not part of the reusable design system:

| Value | Location | Usage |
|-------|----------|-------|
| `0 8px 32px rgba(147, 51, 234, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)` | `Admin.tsx` (line 1324) | Modal backdrop shadow |
| `0 1px 2px rgba(0, 0, 0, 0.04)` | `Admin.tsx` (line 1346) | Input field shadow |
| `0 2px 4px rgba(220, 38, 38, 0.08)` | `Admin.tsx` (line 1358) | Error state shadow |
| `0 4px 14px rgba(147, 51, 234, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)` | `Admin.tsx` (line 1374) | Button active state shadow |
| `0 0 20px rgba(251, 191, 36, 0.15)` | `ToolsSection.tsx` (line 287) | Tool card hover effect |

**Note:** Component-specific inline shadows are not counted as part of the design system elevations. CSS variable shadows (`var(--shadow-sm)`, `var(--shadow-md)`) use the elevation system from shadcn/ui.

---

## 4. Text Shadows Used

**Location:** `src/styles/index.css`  
**Format:** CSS `text-shadow` property  
**Origin:** ✨ Custom (for special effects)

### Text Shadow Values

| Value | Location | Usage |
|-------|----------|-------|
| `0 0 20px rgba(168, 85, 247, 0.5)` | `index.css` (line 193) | Glow effect for text |
| `2px -2px 0 rgba(59, 130, 246, 0.7), -2px 2px 0 rgba(236, 72, 153, 0.7)` | `index.css` (line 197) | Glitch effect variant 1 |
| `2px 2px 0 rgba(124, 58, 237, 0.7), -2px -2px 0 rgba(59, 130, 246, 0.7)` | `index.css` (line 201) | Glitch effect variant 2 |
| `-2px -2px 0 rgba(168, 85, 247, 0.7), 2px 2px 0 rgba(236, 72, 153, 0.7)` | `index.css` (line 205) | Glitch effect variant 3 |
| `-2px 2px 0 rgba(59, 130, 246, 0.7), 2px -2px 0 rgba(124, 58, 237, 0.7)` | `index.css` (line 209) | Glitch effect variant 4 |

**Note:** Text shadows are primarily used for decorative effects (glow and glitch animations), not for standard typography elevation.

---

## 5. Drop Shadows Used

**Location:** `src/styles/index.css`  
**Format:** CSS `filter: drop-shadow()` property  
**Origin:** ✨ Custom (for special effects)

### Drop Shadow Values

| Value | Location | Usage |
|-------|----------|-------|
| `drop-shadow(0 0 2px rgba(139, 92, 246, 0.2)) drop-shadow(0 0 4px rgba(59, 130, 246, 0.15))` | `index.css` (line 147) | Glow animation - start |
| `drop-shadow(0 0 3px rgba(139, 92, 246, 0.25)) drop-shadow(0 0 6px rgba(59, 130, 246, 0.2))` | `index.css` (line 150) | Glow animation - end |
| `drop-shadow(0 0 8px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.6))` | `index.css` (line 303) | Sparkle effect - level 1 |
| `drop-shadow(0 0 16px rgba(168, 85, 247, 1)) drop-shadow(0 0 32px rgba(59, 130, 246, 0.8))` | `index.css` (line 308) | Sparkle effect - level 2 |
| `drop-shadow(0 0 4px rgba(168, 85, 247, 0.3))` | `index.css` (line 338) | Sparkle variant 1 |
| `drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))` | `index.css` (line 342) | Sparkle variant 2 |
| `drop-shadow(0 0 12px rgba(168, 85, 247, 0.7)) drop-shadow(0 0 16px rgba(236, 72, 153, 0.4))` | `index.css` (line 346) | Sparkle variant 3 |
| `drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))` | `index.css` (line 351) | Sparkle variant 4 |
| `drop-shadow(0 0 4px rgba(168, 85, 247, 0.3))` | `index.css` (line 355) | Sparkle variant 5 |
| `drop-shadow-sm` | Various components | Tailwind utility class |

**Note:** Drop shadows are used for animated effects (glow, sparkle) and decorative elements, not for standard elevation.

---

## 6. Usage Statistics

### Most Frequently Used Shadow Classes

1. **`shadow-lg`** - Very High - Large elevations, hover states (most common)
2. **`shadow-sm`** - Very High - Small elevations, badges, subtle shadows
3. **`shadow-md`** - High - Medium elevations, card hover states
4. **`shadow-xl`** - Medium - Extra large elevations, prominent modals
5. **`shadow-2xl`** - Low - Maximum elevation, hero modals

### Shadow Usage Patterns

#### Hover States
- **Most Common Pattern:** `hover:shadow-lg transition-shadow`
- **Usage:** Applied to cards, containers, and interactive elements
- **Count:** ~60+ instances

#### Static Shadows
- **Common Pattern:** `shadow-sm` for badges and small elements
- **Usage:** Applied to labels, pills, and subtle elevations
- **Count:** ~50+ instances

#### Colored Shadows
- **Pattern:** `hover:shadow-xl hover:shadow-purple-500/30`
- **Usage:** Special effects on buttons and interactive elements
- **Count:** ~5+ instances

### Elevation System Summary

The project uses a hybrid elevation system:

1. **CSS Variables (shadcn/ui):**
   - `--elevation-sm` for small elevations
   - Mapped to `--shadow-sm` in Tailwind theme

2. **Tailwind Utility Classes:**
   - Standard scale: `sm`, `md`, `lg`, `xl`, `2xl`
   - Most commonly used: `shadow-sm` and `shadow-lg`

3. **Custom Shadows:**
   - Specific shadows for decorative elements (clouds, pixel art, retro effects)
   - Text shadows for special effects (glow, glitch)
   - Drop shadows for animated effects

### Shadow Scale Hierarchy

```
shadow-sm (smallest) → shadow-md → shadow-lg → shadow-xl → shadow-2xl (largest)
```


