# 📐 Complete Layouts & Grids Audit

## 📋 Index

1. [Tailwind Breakpoints](#1-tailwind-breakpoints)
2. [Desktop Layout](#2-desktop-layout)
3. [Mobile Layout](#3-mobile-layout)
4. [Container System](#4-container-system)
5. [Grid Patterns](#5-grid-patterns)

---

## 1. Tailwind Breakpoints

**Location:** Tailwind CSS v4.1.12  
**Format:** Responsive utility classes  
**Origin:** 🎨 Tailwind CSS

### 📱 Breakpoint Scale

| Breakpoint | Min Width | Usage | Description |
|------------|-----------|-------|-------------|
| `sm:` | 640px | **High** | Small tablets, large phones |
| `md:` | 768px | **Very High** | Main breakpoint for desktop/mobile switch |
| `lg:` | 1024px | **High** | Desktop multi-column layouts |
| `xl:` | 1280px | Medium | Large desktop screens |
| `2xl:` | 1536px | Low | Extra large screens |

### 🎯 Primary Breakpoint

The project uses **`md:` (768px)** as the main breakpoint to switch between mobile and desktop layouts:

- **Mobile:** < 768px
- **Desktop:** ≥ 768px

---

## 2. Desktop Layout

**Breakpoint:** `md:` (≥ 768px)

### Structure

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────┐  ┌─────────────────────────────────────────┐ │
│  │      │  │                                         │ │
│  │  64px│  │         Main Content Area               │ │
│  │      │  │         max-w-7xl (1280px)              │ │
│  │Sidebar│  │         px-12 to px-16                  │ │
│  │      │  │                                         │ │
│  │      │  │                                         │ │
│  └──────┘  └─────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Desktop Properties

| Property | Value | Tailwind Class |
|----------|-------|----------------|
| Sidebar Width | 64px | `w-16` |
| Sidebar Position | Fixed left | `fixed h-screen` |
| Content Offset | 64px left margin | `md:ml-16` |
| Container Width | 1280px max | `max-w-7xl` |
| Horizontal Padding | 48px - 64px | `md:px-12 lg:px-16` |
| Vertical Padding | 48px | `md:py-12` |
| Bottom Padding | 80px | `md:pb-20` |

### Desktop Sidebar


- **Visibility:** Hidden on mobile, visible on desktop (`hidden md:flex`)
- **Width:** 64px (`w-16`)
- **Position:** Fixed to left edge (`fixed h-screen`)
- **Background:** Semi-transparent white with blur (`bg-white/80 backdrop-blur-md`)

---

## 3. Mobile Layout

**Breakpoint:** Default (< 768px)

### Structure

```
┌─────────────────────────────┐
│                             │
│    Main Content Area        │
│    Full width               │
│    px-4 to px-6             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  Home  Design  Tools  Jobs  │
│     Bottom Navigation       │
└─────────────────────────────┘
```

### Mobile Properties

| Property | Value | Tailwind Class |
|----------|-------|----------------|
| Sidebar | Hidden | `hidden` (default) |
| Content Width | Full width | No offset (`ml-0`) |
| Horizontal Padding | 16px - 24px | `px-4 sm:px-6` |
| Vertical Padding | 16px | `py-4` |
| Bottom Padding | 96px | `pb-24` |
| Bottom Nav Height | ~56px | Fixed to bottom |

### Mobile Navigation


- **Visibility:** Visible on mobile, hidden on desktop (`md:hidden`)
- **Position:** Fixed to bottom (`fixed bottom-0 left-0 right-0`)
- **Background:** Semi-transparent white with blur (`bg-white/90 backdrop-blur-md`)

---

## 4. Container System

**Location:** Main content area  
**Origin:** 🎨 Tailwind CSS

### Container Widths Used

| Class | Value | Usage |
|-------|-------|-------|
| `max-w-7xl` | 1280px | Main content (most common) |
| `max-w-2xl` | 672px | Machine mode, narrow layouts |
| `max-w-md` | 448px | Modals, forms |

### Responsive Padding Pattern


| Breakpoint | Padding | Pixels |
|------------|---------|--------|
| Mobile (default) | `px-4` | 16px |
| Small (sm) | `px-6` | 24px |
| Medium (md) | `px-12` | 48px |
| Large (lg) | `px-16` | 64px |

---

## 5. Grid Patterns

**Origin:** 🎨 Tailwind CSS

### Main Responsive Grid Pattern


| Breakpoint | Columns |
|------------|---------|
| Mobile | 1 column |
| Tablet (md) | 2 columns |
| Desktop (lg) | 3 columns |

### Other Grid Patterns Used

| Pattern | Mobile | Desktop |
|---------|--------|---------|
| `grid-cols-1 md:grid-cols-2` | 1 | 2 |
| `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | 1 | 2-3 |
| `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | 1 | 2-4 |
| `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` | 2 | 3-4 |

### Gap Values

| Class | Value | Usage |
|-------|-------|-------|
| `gap-2` | 8px | Small gaps |
| `gap-4` | 16px | Standard gaps (most common) |
| `gap-6` | 24px | Large gaps |

---

## 📊 Summary

### Desktop (≥ 768px)
- Fixed 64px sidebar on left
- Content offset by `ml-16`
- Container: `max-w-7xl` (1280px)
- Padding: 48-64px horizontal

### Mobile (< 768px)
- No sidebar, bottom navigation
- Full width content
- Padding: 16-24px horizontal
- Bottom padding for nav: 96px

