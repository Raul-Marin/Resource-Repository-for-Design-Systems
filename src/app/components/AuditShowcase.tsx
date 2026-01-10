import { useState } from 'react';
import { Copy, Check, Palette, Type, Box, Layers, Sparkles, ArrowLeft, Grid3x3, Image as ImageIcon, Code2 } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { Logo } from './Logo';
import { PixelCharacter } from './PixelCharacter';
import { DotGrid } from './DotGrid';
import { AnimatedCounter } from './AnimatedCounter';
import { LoadingState } from './LoadingState';
import { FolderSparkleIcon } from './icons/FolderSparkleIcon';
import { PackageSparkleIcon } from './icons/PackageSparkleIcon';
import { ClipboardSparkleIcon } from './icons/ClipboardSparkleIcon';
import { BookSparkleIcon } from './icons/BookSparkleIcon';
import { ChatSparkleIcon } from './icons/ChatSparkleIcon';
import { HomeSparkleIcon } from './icons/HomeSparkleIcon';
import { RefreshSparkleIcon } from './icons/RefreshSparkleIcon';
import { MCPIcon } from './icons/MCPIcon';
import { AntDesignXIcon } from './icons/AntDesignXIcon';

interface AuditShowcaseProps {
  onBack: () => void;
}

export function AuditShowcase({ onBack }: AuditShowcaseProps) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components' | 'spacing' | 'effects'>('colors');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(label);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // Colores del tema
  const themeColors = [
    { name: 'Background', var: '--background', value: 'rgba(255, 255, 255, 1)', origin: '📦 shadcn/ui', usage: 'Fondo de la página' },
    { name: 'Foreground', var: '--foreground', value: 'rgba(46, 46, 46, 1)', origin: '📦 shadcn/ui', usage: 'Color principal de texto' },
    { name: 'Card', var: '--card', value: 'rgba(255, 255, 255, 1)', origin: '📦 shadcn/ui', usage: 'Fondo de tarjetas' },
    { name: 'Card Foreground', var: '--card-foreground', value: 'rgba(46, 46, 46, 1)', origin: '📦 shadcn/ui', usage: 'Texto en tarjetas' },
    { name: 'Primary', var: '--primary', value: 'rgba(6, 106, 254, 1)', origin: '📦 shadcn/ui', usage: 'Botones primarios, enlaces' },
    { name: 'Primary Foreground', var: '--primary-foreground', value: 'rgba(255, 255, 255, 1)', origin: '📦 shadcn/ui', usage: 'Texto sobre elementos primarios' },
    { name: 'Secondary Foreground', var: '--secondary-foreground', value: 'rgba(2, 80, 217, 1)', origin: '📦 shadcn/ui', usage: 'Texto de botones secundarios' },
    { name: 'Accent', var: '--accent', value: 'rgba(2, 80, 217, 1)', origin: '📦 shadcn/ui', usage: 'Highlights, estados activos' },
    { name: 'Accent Foreground', var: '--accent-foreground', value: 'rgba(255, 255, 255, 1)', origin: '📦 shadcn/ui', usage: 'Texto sobre elementos accent' },
    { name: 'Destructive Foreground', var: '--destructive-foreground', value: 'rgba(182, 5, 84, 1)', origin: '📦 shadcn/ui', usage: 'Mensajes de error, acciones de eliminación' },
    { name: 'Muted', var: '--muted', value: 'rgba(201, 201, 201, 1)', origin: '📦 shadcn/ui', usage: 'Elementos deshabilitados' },
    { name: 'Muted Foreground', var: '--muted-foreground', value: 'rgba(147, 147, 147, 1)', origin: '📦 shadcn/ui', usage: 'Texto secundario' },
    { name: 'Border', var: '--border', value: 'rgba(92, 92, 92, 1)', origin: '📦 shadcn/ui', usage: 'Bordes por defecto' },
    { name: 'Ring', var: '--ring', value: 'rgba(0, 30, 91, 1)', origin: '📦 shadcn/ui', usage: 'Anillos de enfoque' },
  ];

  const chartColors = [
    { name: 'Chart-1', var: '--chart-1', value: 'rgba(2, 80, 217, 1)', origin: '📦 shadcn/ui', usage: 'Azul' },
    { name: 'Chart-2', var: '--chart-2', value: 'rgba(26, 185, 255, 1)', origin: '📦 shadcn/ui', usage: 'Cyan' },
    { name: 'Chart-3', var: '--chart-3', value: 'rgba(150, 2, 199, 1)', origin: '📦 shadcn/ui', usage: 'Púrpura' },
    { name: 'Chart-4', var: '--chart-4', value: 'rgba(11, 130, 124, 1)', origin: '📦 shadcn/ui', usage: 'Verde azulado' },
    { name: 'Chart-5', var: '--chart-5', value: 'rgba(238, 176, 16, 1)', origin: '📦 shadcn/ui', usage: 'Amarillo' },
  ];

  const tailwindColors = [
    { name: 'Green', classes: 'bg-green-50 text-green-700 border-green-200', origin: '🎨 Tailwind', usage: 'Estados de éxito, "new", "added"' },
    { name: 'Blue', classes: 'bg-blue-50 text-blue-700 border-blue-200', origin: '🎨 Tailwind', usage: 'Mejoras, "improved", "tokens"' },
    { name: 'Purple', classes: 'bg-purple-50 text-purple-700 border-purple-200', origin: '🎨 Tailwind', usage: 'Fixes, "fixed", "mcp-support"' },
    { name: 'Orange', classes: 'bg-orange-100 text-orange-800 border-orange-200', origin: '🎨 Tailwind', usage: 'Guías, "ai-accessibility"' },
    { name: 'Pink', classes: 'bg-pink-100 text-pink-800 border-pink-200', origin: '🎨 Tailwind', usage: 'Videos' },
    { name: 'Violet', classes: 'bg-violet-100 text-violet-800 border-violet-200', origin: '🎨 Tailwind', usage: 'Comunidad' },
    { name: 'Gray', classes: 'bg-gray-50 text-gray-700 border-gray-200', origin: '🎨 Tailwind', usage: 'Estados por defecto, texto secundario' },
    { name: 'Gray Darker', classes: 'bg-gray-900 text-gray-300', origin: '🎨 Tailwind', usage: 'Fondos oscuros, modales, tooltips' },
  ];

  const customColors = [
    { name: 'Botón Primario - Gradiente', value: 'linear-gradient(135deg, #0250D9, #1AB9FF, #9602C7, #0250D9)', origin: '✨ Custom', usage: 'Botón primario' },
    { name: 'Botón Secundario - Default', value: '#0250D9', origin: '✨ Custom', usage: 'Color por defecto' },
    { name: 'Botón Secundario - Hover', value: '#03234D', origin: '✨ Custom', usage: 'Estado hover' },
    { name: 'Borde Default', value: '#5c5c5c', origin: '✨ Custom', usage: 'Borde botón secundario' },
    { name: 'Borde Hover', value: '#e3bbff', origin: '✨ Custom', usage: 'Borde hover botón secundario' },
  ];

  // Tipografías
  const fonts = [
    { name: 'Poppins', weights: [200, 300, 400, 500, 600, 700], origin: '✨ Custom', usage: 'Fuente principal del sistema' },
    { name: 'Inter', weights: [300, 400, 500, 600, 700], origin: '✨ Custom', usage: 'Admin y Sidebar con inline styles' },
    { name: 'Caveat', weights: [400, 500, 600, 700], origin: '✨ Custom', usage: 'HomeSection - texto "human-curated"' },
    { name: 'Pixelify Sans', weights: [400, 500, 600, 700], origin: '✨ Custom', usage: 'Título principal "AI Era"' },
  ];

  const typographyScale = [
    { element: 'H1', size: '48px', weight: '300 (light)', lineHeight: '1.25', var: '--text-4xl', origin: '📦 shadcn/ui' },
    { element: 'H2', size: '32px', weight: '400 (normal)', lineHeight: '1.25', var: '--text-2xl', origin: '📦 shadcn/ui' },
    { element: 'H3', size: '24px', weight: '600 (medium)', lineHeight: '1.25', var: '--text-xl', origin: '📦 shadcn/ui' },
    { element: 'H4', size: '18px', weight: '400 (normal)', lineHeight: '1.25', var: '--text-lg', origin: '📦 shadcn/ui' },
    { element: 'Párrafo', size: '15px', weight: '400 (normal)', lineHeight: '1.5', var: '--text-base', origin: '📦 shadcn/ui' },
    { element: 'Label', size: '14px', weight: '400 (normal)', lineHeight: '1.4', var: '--text-sm', origin: '📦 shadcn/ui' },
    { element: 'Button', size: '15px', weight: '400 (normal)', lineHeight: '1.5', var: '--text-base', origin: '📦 shadcn/ui' },
    { element: 'Input', size: '15px', weight: '400 (normal)', lineHeight: '1.5', var: '--text-base', origin: '📦 shadcn/ui' },
  ];

  // Border Radius
  const borderRadius = [
    { name: 'Base', value: '8px', var: '--radius', origin: '📦 shadcn/ui' },
    { name: 'Button (Pill)', value: '9999px', var: '--radius-button', origin: '📦 shadcn/ui' },
    { name: 'Card', value: '12px', var: '--radius-card', origin: '📦 shadcn/ui' },
    { name: 'Small', value: '4px', var: '--radius-sm', origin: '📦 shadcn/ui' },
    { name: 'Medium', value: '6px', var: '--radius-md', origin: '📦 shadcn/ui' },
    { name: 'Large', value: '8px', var: '--radius-lg', origin: '📦 shadcn/ui' },
    { name: 'Extra Large', value: '12px', var: '--radius-xl', origin: '📦 shadcn/ui' },
  ];

  // Shadows
  const shadows = [
    { name: 'Elevation-sm', value: '0px -1px 1.7px 0px rgba(0,0,0,0.03), 0px 5.7px 5.9px 0px rgba(0,0,0,0.07), 0px 0px 5.9px 0px rgba(0,0,0,0.07)', origin: '📦 shadcn/ui' },
    { name: 'Título H1', value: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)', origin: '✨ Custom' },
    { name: 'Nubes', value: '0 2px 8px rgba(59, 130, 246, 0.08)', origin: '✨ Custom' },
  ];

  // Componentes categorizados
  const atoms = [
    { name: 'PrimaryButton', file: 'PrimaryButton.tsx', category: 'Botón', origin: '✨ Custom' },
    { name: 'SecondaryButton', file: 'SecondaryButton.tsx', category: 'Botón', origin: '✨ Custom' },
    { name: 'Logo', file: 'Logo.tsx', category: 'Elemento Visual', origin: '✨ Custom' },
    { name: 'PixelCharacter', file: 'PixelCharacter.tsx', category: 'Elemento Visual', origin: '✨ Custom' },
    { name: 'DotGrid', file: 'DotGrid.tsx', category: 'Elemento Visual', origin: '✨ Custom' },
    { name: 'AnimatedCounter', file: 'AnimatedCounter.tsx', category: 'Utilidad', origin: '✨ Custom' },
    { name: 'LoadingState', file: 'LoadingState.tsx', category: 'Estado', origin: '✨ Custom' },
  ];

  const molecules = [
    { name: 'DraggableStatPill', file: 'DraggableStatPill.tsx', category: 'Píldora/Stat', origin: '✨ Custom' },
    { name: 'CloudsSky', file: 'CloudsSky.tsx', category: 'Background', origin: '✨ Custom' },
    { name: 'PixelCity', file: 'PixelCity.tsx', category: 'Background', origin: '✨ Custom' },
    { name: 'RetroBackground', file: 'RetroBackground.tsx', category: 'Background', origin: '✨ Custom' },
    { name: 'FluidShader', file: 'FluidShader.tsx', category: 'Background', origin: '✨ Custom' },
    { name: 'SuggestModal', file: 'SuggestModal.tsx', category: 'Modal', origin: '✨ Custom' },
    { name: 'PageTransition', file: 'PageTransition.tsx', category: 'Transición', origin: '✨ Custom' },
  ];

  const organisms = [
    { name: 'Sidebar', file: 'Sidebar.tsx', category: 'Navegación', origin: '✨ Custom' },
    { name: 'FloatingToolbar', file: 'FloatingToolbar.tsx', category: 'Navegación', origin: '✨ Custom' },
    { name: 'Footer', file: 'Footer.tsx', category: 'Navegación', origin: '✨ Custom' },
    { name: 'HomeSection', file: 'HomeSection.tsx', category: 'Sección', origin: '✨ Custom' },
    { name: 'DesignSystemsSection', file: 'DesignSystemsSection.tsx', category: 'Sección', origin: '✨ Custom' },
    { name: 'ToolsSection', file: 'ToolsSection.tsx', category: 'Sección', origin: '✨ Custom' },
    { name: 'JobsSection', file: 'JobsSection.tsx', category: 'Sección', origin: '✨ Custom' },
    { name: 'ReadingsSection', file: 'ReadingsSection.tsx', category: 'Sección', origin: '✨ Custom' },
    { name: 'ChangelogSection', file: 'ChangelogSection.tsx', category: 'Sección', origin: '✨ Custom' },
    { name: 'AboutSection', file: 'AboutSection.tsx', category: 'Sección', origin: '✨ Custom' },
    { name: 'ContributorsSection', file: 'ContributorsSection.tsx', category: 'Sección', origin: '✨ Custom' },
  ];

  const templates = [
    { name: 'Admin', file: 'Admin.tsx', category: 'CMS/Admin', origin: '✨ Custom' },
    { name: 'MachineView', file: 'MachineView.tsx', category: 'Vista Especial', origin: '✨ Custom' },
    { name: 'DesignSystemShowcase', file: 'DesignSystemShowcase.tsx', category: 'Showcase', origin: '✨ Custom' },
    { name: 'ComponentsShowcase', file: 'ComponentsShowcase.tsx', category: 'Showcase', origin: '✨ Custom' },
  ];

  const icons = [
    { name: 'FolderSparkleIcon', file: 'icons/FolderSparkleIcon.tsx', origin: '✨ Custom' },
    { name: 'PackageSparkleIcon', file: 'icons/PackageSparkleIcon.tsx', origin: '✨ Custom' },
    { name: 'ClipboardSparkleIcon', file: 'icons/ClipboardSparkleIcon.tsx', origin: '✨ Custom' },
    { name: 'BookSparkleIcon', file: 'icons/BookSparkleIcon.tsx', origin: '✨ Custom' },
    { name: 'ChatSparkleIcon', file: 'icons/ChatSparkleIcon.tsx', origin: '✨ Custom' },
    { name: 'HomeSparkleIcon', file: 'icons/HomeSparkleIcon.tsx', origin: '✨ Custom' },
    { name: 'RefreshSparkleIcon', file: 'icons/RefreshSparkleIcon.tsx', origin: '✨ Custom' },
    { name: 'MCPIcon', file: 'icons/MCPIcon.tsx', origin: '✨ Custom' },
    { name: 'AntDesignXIcon', file: 'icons/AntDesignXIcon.tsx', origin: '✨ Custom' },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden cms-page audit-showcase">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Volver"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Auditoría Visual del Sistema</h1>
                <p className="text-sm text-gray-500 mt-1">Catálogo completo de estilos y componentes</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>📦 shadcn/ui</span>
              <span>•</span>
              <span>🎨 Tailwind</span>
              <span>•</span>
              <span>✨ Custom</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[73px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('colors')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'colors'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Palette className="w-4 h-4 inline mr-2" />
              Colores
            </button>
            <button
              onClick={() => setActiveTab('typography')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'typography'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Type className="w-4 h-4 inline mr-2" />
              Tipografía
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'components'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Box className="w-4 h-4 inline mr-2" />
              Componentes
            </button>
            <button
              onClick={() => setActiveTab('spacing')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'spacing'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid3x3 className="w-4 h-4 inline mr-2" />
              Espaciado & Layout
            </button>
            <button
              onClick={() => setActiveTab('effects')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'effects'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Efectos
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8">
        {activeTab === 'colors' && (
          <div className="space-y-12">
            {/* Colores del Tema */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Colores del Tema (CSS Variables)</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">📦 shadcn/ui</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themeColors.map((color) => (
                  <div
                    key={color.var}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
                  >
                    <div
                      className="h-24 w-full relative group"
                      style={{ backgroundColor: color.value }}
                    >
                      <button
                        onClick={() => copyToClipboard(color.value, color.var)}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                      >
                        {copiedValue === color.var ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{color.name}</h3>
                        <span className="text-xs">{color.origin}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{color.usage}</p>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{color.var}</code>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">{color.value}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Colores de Gráficos */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Colores de Gráficos</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">📦 shadcn/ui</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {chartColors.map((color) => (
                  <div
                    key={color.var}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
                  >
                    <div
                      className="h-32 w-full relative group"
                      style={{ backgroundColor: color.value }}
                    >
                      <button
                        onClick={() => copyToClipboard(color.value, color.var)}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                      >
                        {copiedValue === color.var ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{color.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{color.usage}</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block">{color.value}</code>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Colores Tailwind */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Colores Tailwind (Badges & Estados)</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">🎨 Tailwind</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tailwindColors.map((color) => (
                  <div
                    key={color.name}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="p-6">
                      <div className={`${color.classes} px-4 py-2 rounded-full text-sm font-medium mb-4 text-center border`}>
                        {color.name} Badge
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{color.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{color.usage}</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block">{color.classes}</code>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Colores Custom */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Colores Personalizados</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">✨ Custom</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customColors.map((color, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="h-24 w-full relative group">
                      <div
                        className="h-full w-full"
                        style={color.value.includes('gradient') ? { background: color.value } : { backgroundColor: color.value }}
                      />
                      <button
                        onClick={() => copyToClipboard(color.value, `custom-${index}`)}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                      >
                        {copiedValue === `custom-${index}` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{color.name}</h3>
                        <span className="text-xs">{color.origin}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{color.usage}</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block break-all">{color.value}</code>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-12">
            {/* Fuentes */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Type className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Fuentes Importadas</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">✨ Custom</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fonts.map((font) => (
                  <div
                    key={font.name}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold" style={{ fontFamily: font.name }}>{font.name}</h3>
                      <span className="text-xs">{font.origin}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{font.usage}</p>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500 mb-2">Pesos disponibles:</div>
                      <div className="flex flex-wrap gap-2">
                        {font.weights.map((weight) => (
                          <div
                            key={weight}
                            className="px-3 py-1 bg-gray-100 rounded text-xs font-mono"
                            style={{ fontFamily: font.name, fontWeight: weight }}
                          >
                            {weight}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm" style={{ fontFamily: font.name, fontSize: '24px' }}>
                          The quick brown fox jumps over the lazy dog
                        </div>
                        <div className="text-xs text-gray-500 mt-2" style={{ fontFamily: font.name, fontSize: '16px' }}>
                          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                          abcdefghijklmnopqrstuvwxyz<br />
                          0123456789 !@#$%^&*()
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Escala Tipográfica */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Escala Tipográfica</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">📦 shadcn/ui</span>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Elemento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tamaño</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Peso</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Line Height</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variable</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ejemplo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {typographyScale.map((type) => (
                        <tr key={type.element} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{type.element}</div>
                            <div className="text-xs text-gray-500 mt-1">{type.origin}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{type.size}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{type.weight}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{type.lineHeight}</td>
                          <td className="px-6 py-4">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{type.var}</code>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              style={{
                                fontSize: type.size,
                                fontWeight: type.weight.includes('300') ? 300 : type.weight.includes('600') ? 600 : 400,
                                lineHeight: type.lineHeight,
                              }}
                            >
                              {type.element === 'H1' && 'Heading 1 - Design Systems'}
                              {type.element === 'H2' && 'Heading 2 - Subtitle'}
                              {type.element === 'H3' && 'Heading 3 - Section Title'}
                              {type.element === 'H4' && 'Heading 4 - Card Title'}
                              {type.element === 'Párrafo' && 'This is a paragraph with body text. It demonstrates how the text looks with normal weight and line height.'}
                              {type.element === 'Label' && 'Label Text'}
                              {type.element === 'Button' && 'Button Text'}
                              {type.element === 'Input' && 'Input Text'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-12">
            {/* Átomos */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">A</div>
                <h2 className="text-2xl font-bold text-gray-900">Átomos</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Componentes básicos, indivisibles</span>
              </div>
              
              {/* Botones en vivo */}
              <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-white">
                <h3 className="font-semibold text-gray-900 mb-4">Botones</h3>
                <div className="flex flex-wrap gap-4">
                  <PrimaryButton onClick={() => {}}>Primary Button</PrimaryButton>
                  <SecondaryButton onClick={() => {}}>Secondary Button</SecondaryButton>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {atoms.map((atom) => (
                  <div
                    key={atom.name}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{atom.name}</h3>
                      <span className="text-xs">{atom.origin}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{atom.category}</div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block">{atom.file}</code>
                  </div>
                ))}
              </div>

              {/* Iconos */}
              <div className="mt-8 p-6 border border-gray-200 rounded-xl bg-white">
                <h3 className="font-semibold text-gray-900 mb-4">Iconos (9 total)</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
                  {icons.map((icon) => (
                    <div
                      key={icon.name}
                      className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        {icon.name === 'FolderSparkleIcon' && <FolderSparkleIcon className="w-6 h-6" />}
                        {icon.name === 'PackageSparkleIcon' && <PackageSparkleIcon className="w-6 h-6" />}
                        {icon.name === 'ClipboardSparkleIcon' && <ClipboardSparkleIcon className="w-6 h-6" />}
                        {icon.name === 'BookSparkleIcon' && <BookSparkleIcon className="w-6 h-6" />}
                        {icon.name === 'ChatSparkleIcon' && <ChatSparkleIcon className="w-6 h-6" />}
                        {icon.name === 'HomeSparkleIcon' && <HomeSparkleIcon className="w-6 h-6" />}
                        {icon.name === 'RefreshSparkleIcon' && <RefreshSparkleIcon className="w-6 h-6" />}
                        {icon.name === 'MCPIcon' && <MCPIcon className="w-6 h-6" />}
                        {icon.name === 'AntDesignXIcon' && <AntDesignXIcon className="w-6 h-6" />}
                      </div>
                      <div className="text-xs text-gray-600 text-center">{icon.name.replace('Icon', '')}</div>
                      <div className="text-xs text-gray-400">{icon.origin}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elementos visuales en vivo */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 border border-gray-200 rounded-xl bg-white">
                  <h3 className="font-semibold text-gray-900 mb-4">Logo</h3>
                  <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                    <Logo />
                  </div>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl bg-white">
                  <h3 className="font-semibold text-gray-900 mb-4">DotGrid</h3>
                  <div className="h-32 bg-gray-50 rounded-lg relative overflow-hidden">
                    <DotGrid />
                  </div>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl bg-white">
                  <h3 className="font-semibold text-gray-900 mb-4">PixelCharacter</h3>
                  <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                    <PixelCharacter characterIndex={0} />
                  </div>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl bg-white">
                  <h3 className="font-semibold text-gray-900 mb-4">AnimatedCounter</h3>
                  <div className="flex justify-center text-4xl font-bold text-gray-900">
                    <AnimatedCounter value={42} />
                  </div>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl bg-white">
                  <h3 className="font-semibold text-gray-900 mb-4">LoadingState</h3>
                  <LoadingState />
                </div>
              </div>
            </section>

            {/* Moléculas */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-sm">M</div>
                <h2 className="text-2xl font-bold text-gray-900">Moléculas</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Combinación de átomos</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {molecules.map((molecule) => (
                  <div
                    key={molecule.name}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{molecule.name}</h3>
                      <span className="text-xs">{molecule.origin}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{molecule.category}</div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block">{molecule.file}</code>
                  </div>
                ))}
              </div>
            </section>

            {/* Organismos */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">O</div>
                <h2 className="text-2xl font-bold text-gray-900">Organismos</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Combinaciones complejas</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {organisms.map((organism) => (
                  <div
                    key={organism.name}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{organism.name}</h3>
                      <span className="text-xs">{organism.origin}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{organism.category}</div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block">{organism.file}</code>
                  </div>
                ))}
              </div>
            </section>

            {/* Templates */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">T</div>
                <h2 className="text-2xl font-bold text-gray-900">Templates/Páginas</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Composiciones completas</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.name}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <span className="text-xs">{template.origin}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{template.category}</div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block">{template.file}</code>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'spacing' && (
          <div className="space-y-12">
            {/* Border Radius */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Grid3x3 className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Border Radius</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">📦 shadcn/ui</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {borderRadius.map((radius) => (
                  <div
                    key={radius.name}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div
                      className="w-full h-24 bg-gradient-to-br from-blue-400 to-purple-500 mb-4"
                      style={{ borderRadius: radius.value }}
                    />
                    <h3 className="font-semibold text-gray-900 mb-1">{radius.name}</h3>
                    <div className="text-sm text-gray-600 mb-2">{radius.value}</div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block">{radius.var}</code>
                    <div className="text-xs text-gray-500 mt-2">{radius.origin}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Z-Index Layers */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Z-Index Layers</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">✨ Custom</span>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Z-Index</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uso</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">Base</td>
                        <td className="px-6 py-4"><code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">z-0</code></td>
                        <td className="px-6 py-4 text-sm text-gray-600">Fondo base</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">Background layers</td>
                        <td className="px-6 py-4"><code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">z-[1], z-[2]</code></td>
                        <td className="px-6 py-4 text-sm text-gray-600">Retro backgrounds, shaders, grids</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">Content</td>
                        <td className="px-6 py-4"><code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">z-10</code></td>
                        <td className="px-6 py-4 text-sm text-gray-600">Contenido principal</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">Buttons/Interactive</td>
                        <td className="px-6 py-4"><code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">z-[2], z-[3]</code></td>
                        <td className="px-6 py-4 text-sm text-gray-600">Elementos interactivos</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">Fixed elements</td>
                        <td className="px-6 py-4"><code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">z-[50]+</code></td>
                        <td className="px-6 py-4 text-sm text-gray-600">Sidebar, modales, tooltips</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Espaciado Tailwind */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Grid3x3 className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Espaciado (Tailwind)</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">🎨 Tailwind</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[2, 4, 6, 8, 12, 16, 20, 24].map((size) => (
                  <div
                    key={size}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white text-center"
                  >
                    <div className="h-16 bg-blue-100 rounded mb-3 flex items-center justify-center">
                      <div className="text-xs text-blue-600 font-mono">p-{size}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{size * 4}px</div>
                    <code className="text-xs text-gray-500 font-mono">p-{size}</code>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-12">
            {/* Sombras */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Sombras (Shadows)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shadows.map((shadow, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div
                      className="w-full h-32 bg-white rounded-lg mb-4 flex items-center justify-center"
                      style={{ boxShadow: shadow.value }}
                    >
                      <span className="text-gray-400 text-sm">Preview</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{shadow.name}</h3>
                    <div className="text-xs text-gray-500 mb-2">{shadow.origin}</div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono block break-all">{shadow.value}</code>
                  </div>
                ))}
              </div>
            </section>

            {/* Animaciones */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-bold text-gray-900">Animaciones Disponibles</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">✨ Custom</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'gradientMove', 'gradientShift', 'glow', 'float', 'fall', 'floatSubtle',
                  'glitch', 'shimmer', 'ditherBlink', 'contributionPulse', 'cyber-pulse',
                  'sparkle', 'star-fall', 'ripple-wave', 'fadeIn', 'slideUpSheet',
                  'skeletonPulse', 'bounce-dot', 'character-popup', 'spin', 'blink',
                  'wiggle', 'bounce-subtle', 'bubble-pop', 'bounce-happy', 'ai-gradient',
                  'scan-line', 'shake', 'bounceIn', 'pulse', 'cloudFloat', 'twinkle',
                  'sun-glow', 'lines-move'
                ].map((animation) => (
                  <div
                    key={animation}
                    className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-md transition-shadow"
                  >
                    <code className="text-xs font-mono text-gray-700">{animation}</code>
                  </div>
                ))}
              </div>
            </section>

            {/* Clases de Animación */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Clases de Utilidad</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">✨ Custom</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  '.animate-float-subtle', '.animate-character-popup', '.animate-character-dance',
                  '.animate-bubble-appear-disappear', '.animate-cyber-pulse', '.animate-sparkle',
                  '.animate-fade-in-scale', '.animate-glitch', '.animate-float', '.shake-animation',
                  '.scrollbar-hide'
                ].map((className) => (
                  <div
                    key={className}
                    className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-md transition-shadow"
                  >
                    <code className="text-xs font-mono text-gray-700">{className}</code>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
