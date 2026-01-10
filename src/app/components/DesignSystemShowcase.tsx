import { useState } from 'react';
import { Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { FolderSparkleIcon } from './icons/FolderSparkleIcon';
import { PackageSparkleIcon } from './icons/PackageSparkleIcon';
import { ClipboardSparkleIcon } from './icons/ClipboardSparkleIcon';
import { BookSparkleIcon } from './icons/BookSparkleIcon';

export function DesignSystemShowcase() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(label);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // Real color tokens from theme.css
  const colorTokens = [
    { name: 'Primary', var: '--primary', value: 'rgba(6, 106, 254, 1)', usage: 'Primary buttons, links' },
    { name: 'Primary foreground', var: '--primary-foreground', value: 'rgba(255, 255, 255, 1)', usage: 'Text on primary' },
    { name: 'Secondary foreground', var: '--secondary-foreground', value: 'rgba(2, 80, 217, 1)', usage: 'Secondary buttons text' },
    { name: 'Accent', var: '--accent', value: 'rgba(2, 80, 217, 1)', usage: 'Highlights, active states' },
    { name: 'Destructive foreground', var: '--destructive-foreground', value: 'rgba(182, 5, 84, 1)', usage: 'Error messages, delete actions' },
    { name: 'Background', var: '--background', value: 'rgba(255, 255, 255, 1)', usage: 'Page background' },
    { name: 'Foreground', var: '--foreground', value: 'rgba(46, 46, 46, 1)', usage: 'Main text color' },
    { name: 'Muted', var: '--muted', value: 'rgba(201, 201, 201, 1)', usage: 'Disabled elements' },
    { name: 'Muted foreground', var: '--muted-foreground', value: 'rgba(147, 147, 147, 1)', usage: 'Secondary text' },
    { name: 'Border', var: '--border', value: 'rgba(92, 92, 92, 1)', usage: 'Default borders' },
  ];

  // Real typography scale from theme.css
  const typographyScale = [
    { name: 'H1 (4xl)', var: '--text-4xl', size: '48px', weight: '--font-weight-light (300)', sample: 'Design System' },
    { name: 'H2 (2xl)', var: '--text-2xl', size: '32px', weight: '--font-weight-normal (400)', sample: 'Foundations' },
    { name: 'H3 (xl)', var: '--text-xl', size: '24px', weight: '--font-weight-medium (600)', sample: 'Components' },
    { name: 'H4 (lg)', var: '--text-lg', size: '18px', weight: '--font-weight-normal (400)', sample: 'Typography' },
    { name: 'P (base)', var: '--text-base', size: '15px', weight: '--font-weight-normal (400)', sample: 'Body text and paragraphs' },
    { name: 'Label (sm)', var: '--text-sm', size: '14px', weight: '--font-weight-normal (400)', sample: 'Labels and small text' },
  ];

  // Real radius tokens from theme.css
  const radiusTokens = [
    { name: 'radius-sm', var: '--radius-sm', value: 'calc(var(--radius) - 4px)', computed: '4px' },
    { name: 'radius-md', var: '--radius-md', value: 'calc(var(--radius) - 2px)', computed: '6px' },
    { name: 'radius-lg', var: '--radius-lg', value: 'var(--radius)', computed: '8px' },
    { name: 'radius-xl', var: '--radius-xl', value: 'var(--radius-card)', computed: '12px' },
    { name: 'radius-button', var: '--radius-button', value: 'var(--radius-button)', computed: '9999px (full)' },
  ];

  // Real gradient patterns used in the project
  const gradientPatterns = [
    { name: 'Blue to Cyan', class: 'from-blue-50/50 to-cyan-50/50', usage: 'Design Systems pills' },
    { name: 'Purple to Pink', class: 'from-purple-50/50 to-pink-50/50', usage: 'Tools pills' },
    { name: 'Violet to Blue', class: 'from-violet-50/50 to-blue-50/50', usage: 'Cards background' },
    { name: 'Pink to Rose', class: 'from-pink-50/50 to-rose-50/50', usage: 'Jobs pills' },
  ];

  return (
    <div className="cms-page min-h-screen bg-[#f0ede8] relative overflow-hidden">
      {/* Dot Grid Background - Real from project */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Animated Gradient Overlay - Real from project */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Design System
            </h1>
          </div>
          <p className="text-lg text-[rgba(46,46,46,0.7)] max-w-3xl" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
            Real foundations, components, and patterns used in this project. All elements use CSS variables for consistent theming and easy customization.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[rgba(92,92,92,0.2)]">
            <div className="text-4xl font-light mb-2 text-[var(--primary)]">10</div>
            <div className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Color tokens
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[rgba(92,92,92,0.2)]">
            <div className="text-4xl font-light mb-2 text-[var(--primary)]">6</div>
            <div className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Typography scales
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[rgba(92,92,92,0.2)]">
            <div className="text-4xl font-light mb-2 text-[var(--primary)]">5</div>
            <div className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Border radius
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[rgba(92,92,92,0.2)]">
            <div className="text-4xl font-light mb-2 text-[var(--primary)]">2</div>
            <div className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Button variants
            </div>
          </div>
        </div>

        {/* Foundations */}
        <section className="mb-16">
          <h2 className="mb-8" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
            Foundations
          </h2>

          {/* Colors */}
          <div className="mb-12">
            <h3 className="mb-6" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Color tokens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colorTokens.map((token) => (
                <div
                  key={token.var}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[rgba(92,92,92,0.2)] hover:shadow-lg transition-all"
                >
                  <div className="flex gap-4">
                    <div
                      className="w-20 h-20 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `var(${token.var})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-1" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                        {token.name}
                      </div>
                      <button
                        onClick={() => copyToClipboard(token.var, token.var)}
                        className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-2"
                      >
                        <code className="bg-[rgba(201,201,201,0.2)] px-2 py-1 rounded text-[10px]">
                          var({token.var})
                        </code>
                        {copiedValue === token.var ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <div className="text-xs text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                        {token.usage}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="mb-12">
            <h3 className="mb-6" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Typography scale
            </h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[rgba(92,92,92,0.2)]">
              <div className="mb-4 text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                Font family: <code className="bg-[rgba(201,201,201,0.2)] px-2 py-1 rounded">Poppins, system-ui, -apple-system, sans-serif</code>
              </div>
              {typographyScale.map((type) => (
                <div key={type.var} className="mb-8 pb-8 border-b border-[rgba(201,201,201,0.3)] last:border-0 last:mb-0 last:pb-0">
                  <div
                    style={{
                      fontSize: `var(${type.var})`,
                      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif'
                    }}
                    className="mb-3"
                  >
                    {type.sample}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-[var(--muted-foreground)]">
                    <span className="font-medium">{type.name}</span>
                    <code className="bg-[rgba(201,201,201,0.2)] px-2 py-1 rounded">var({type.var})</code>
                    <span>{type.size}</span>
                    <span>{type.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div className="mb-12">
            <h3 className="mb-6" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Border radius
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {radiusTokens.map((radius) => (
                <div
                  key={radius.var}
                  className="bg-white/80 backdrop-blur-sm p-6 border border-[rgba(92,92,92,0.2)] text-center"
                  style={{ borderRadius: `var(${radius.var})` }}
                >
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 mx-auto mb-3"
                    style={{ borderRadius: `var(${radius.var})` }}
                  />
                  <div className="text-xs font-semibold mb-1" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                    {radius.name}
                  </div>
                  <code className="text-[10px] text-[var(--muted-foreground)]">
                    {radius.computed}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Patterns */}
          <div className="mb-12">
            <h3 className="mb-6" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Gradient patterns
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gradientPatterns.map((gradient) => (
                <div
                  key={gradient.class}
                  className={`bg-gradient-to-r ${gradient.class} rounded-xl p-6 border border-[rgba(92,92,92,0.2)] min-h-[120px] flex flex-col justify-between`}
                >
                  <div className="font-semibold mb-2" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                    {gradient.name}
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                    {gradient.usage}
                  </div>
                  <code className="text-xs bg-white/50 px-2 py-1 rounded mt-2 inline-block">
                    {gradient.class}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-16">
          <h2 className="mb-8" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
            Components
          </h2>

          {/* Buttons */}
          <div className="mb-12">
            <h3 className="mb-6" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Buttons
            </h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[rgba(92,92,92,0.2)]">
              <div className="flex flex-wrap gap-4 mb-6">
                <PrimaryButton icon={<Sparkles className="w-[14px] h-[14px]" />}>
                  Primary button
                </PrimaryButton>
                <SecondaryButton icon={<ExternalLink className="w-[14px] h-[14px]" />}>
                  Secondary button
                </SecondaryButton>
              </div>
              <div className="text-sm text-[var(--muted-foreground)] space-y-2" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                <p><strong>Primary:</strong> Main CTAs, uses gradient background with shadow effect</p>
                <p><strong>Secondary:</strong> Alternative actions, white background with hover gradient</p>
              </div>
            </div>
          </div>

          {/* Icon Components */}
          <div className="mb-12">
            <h3 className="mb-6" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Sparkle icons
            </h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[rgba(92,92,92,0.2)]">
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex flex-col items-center gap-2">
                  <FolderSparkleIcon className="w-8 h-8 text-blue-600" />
                  <span className="text-xs text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                    Systems
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PackageSparkleIcon className="w-8 h-8 text-purple-600" />
                  <span className="text-xs text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                    Tools
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ClipboardSparkleIcon className="w-8 h-8 text-pink-600" />
                  <span className="text-xs text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                    Jobs
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <BookSparkleIcon className="w-8 h-8 text-green-600" />
                  <span className="text-xs text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                    Readings
                  </span>
                </div>
              </div>
              <div className="mt-6 text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                Custom sparkle icons used throughout the navigation and sections
              </div>
            </div>
          </div>

          {/* Pills/Cards */}
          <div className="mb-12">
            <h3 className="mb-6" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Stat pills
            </h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[rgba(92,92,92,0.2)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-2xl p-4 border border-blue-200/50">
                  <div className="flex items-center gap-3">
                    <FolderSparkleIcon className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="text-2xl font-light text-blue-600">42</div>
                      <div className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                        Design Systems
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl p-4 border border-purple-200/50">
                  <div className="flex items-center gap-3">
                    <PackageSparkleIcon className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="text-2xl font-light text-purple-600">28</div>
                      <div className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                        AI tools
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                Used in home section with draggable functionality and gradient backgrounds
              </div>
            </div>
          </div>

          {/* Resource Cards */}
          <div className="mb-12">
            <h3 className="mb-6" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Resource cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <FolderSparkleIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                      Lightning Design System
                    </h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                      Salesforce
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                    Recommended
                  </span>
                </div>
                <div className="flex gap-2">
                  <SecondaryButton className="flex-1">
                    Visit site
                  </SecondaryButton>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl p-6 border border-purple-200/50 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <PackageSparkleIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                      Carbon for AI
                    </h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                      IBM
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                    Recommended
                  </span>
                </div>
                <div className="flex gap-2">
                  <SecondaryButton className="flex-1">
                    Visit site
                  </SecondaryButton>
                </div>
              </div>
            </div>
            <div className="mt-6 text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
              Used to display Design Systems, Tools, Jobs, and Readings with gradient backgrounds and badges
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-16">
          <h2 className="mb-8" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
            Design principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[rgba(92,92,92,0.2)]">
              <h4 className="font-semibold mb-3" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                Sentence case everywhere
              </h4>
              <p className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                All text uses sentence case except "Design Systems" which always has both words capitalized
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[rgba(92,92,92,0.2)]">
              <h4 className="font-semibold mb-3" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                Minimalist aesthetic
              </h4>
              <p className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                Inspired by Figma Make and Figma Sites with clean layouts and subtle animations
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[rgba(92,92,92,0.2)]">
              <h4 className="font-semibold mb-3" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                AI color palette
              </h4>
              <p className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                Soft gradients with purple, blue, and pink tones representing AI aesthetics
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[rgba(92,92,92,0.2)]">
              <h4 className="font-semibold mb-3" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                CSS variables first
              </h4>
              <p className="text-sm text-[var(--muted-foreground)]" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
                All styling uses CSS variables for easy theming and consistent design tokens
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-[rgba(92,92,92,0.2)]">
          <p className="text-sm text-[var(--muted-foreground)] mb-4" style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}>
            All tokens and components are defined in <code className="bg-[rgba(201,201,201,0.2)] px-2 py-1 rounded">/src/styles/theme.css</code>
          </p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
            style={{ fontFamily: 'Poppins, system-ui, -apple-system, sans-serif' }}
          >
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
