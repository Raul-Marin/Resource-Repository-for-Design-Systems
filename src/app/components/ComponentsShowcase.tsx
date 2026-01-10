import { useState } from "react";
import { ArrowLeft, Sparkles, Mail, Search, Layers, Heart, Brain, Bot, Info } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { DotGrid } from "./DotGrid";
import { AnimatedCounter } from "./AnimatedCounter";
import { Logo } from "./Logo";
import { LoadingState } from "./LoadingState";
import { DraggableStatPill } from "./DraggableStatPill";
import { PixelCharacter } from "./PixelCharacter";
import { PixelCity } from "./PixelCity";
import { CloudsSky } from "./CloudsSky";
import { Footer } from "./Footer";
import { FloatingToolbar } from "./FloatingToolbar";
import { RetroBackground } from "./RetroBackground";
import { FluidShader } from "./FluidShader";
import { FolderSparkleIcon } from "./icons/FolderSparkleIcon";
import { PackageSparkleIcon } from "./icons/PackageSparkleIcon";
import { ClipboardSparkleIcon } from "./icons/ClipboardSparkleIcon";
import { BookSparkleIcon } from "./icons/BookSparkleIcon";
import { RefreshSparkleIcon } from "./icons/RefreshSparkleIcon";
import { ChatSparkleIcon } from "./icons/ChatSparkleIcon";
import { HomeSparkleIcon } from "./icons/HomeSparkleIcon";
import { HomeSection } from "./HomeSection";
import { DesignSystemsSection } from "./DesignSystemsSection";
import { ToolsSection } from "./ToolsSection";
import { JobsSection } from "./JobsSection";
import { ReadingsSection } from "./ReadingsSection";
import { ChangelogSection } from "./ChangelogSection";
import { AboutSection } from "./AboutSection";
import { ContributorsSection } from "./ContributorsSection";
import { Admin } from "./Admin";
import { DiagnoseCMS } from "./DiagnoseCMS";
import { CleanupDuplicates } from "./CleanupDuplicates";
import { MigrateReadings } from "./MigrateReadings";
import { MigrateJobs } from "./MigrateJobs";
import { MigrateContributors } from "./MigrateContributors";
import { MigrateTools } from "./MigrateTools";
import { SubmissionsDiagnose } from "./SubmissionsDiagnose";
import { DevModeGrid } from "./DevModeGrid";
import { DevModePadding } from "./DevModePadding";
import { GridOverlay } from "./GridOverlay";
import { Rulers } from "./Rulers";
import { PageTransition } from "./PageTransition";
import { CustomCursor } from "./CustomCursor";
import { MachineView } from "./MachineView";
import { SuggestModal } from "./SuggestModal";
import { DesignSystemShowcase } from "./DesignSystemShowcase";

type Section = "home" | "design-systems" | "tools" | "jobs" | "readings" | "changelog" | "about" | "contributors";

interface ComponentShowcaseProps {
  onBack: () => void;
}

export function ComponentsShowcase({ onBack }: ComponentShowcaseProps) {
  const [counterValue, setCounterValue] = useState(42);
  const [machineMode, setMachineMode] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <div className="cms-page min-h-screen bg-[var(--color-background-primary)] relative overflow-hidden">
      {/* Dot Grid Background */}
      <div 
        className="fixed inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(150, 150, 150, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Animated Gradient Overlay */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
            style={{ fontFamily: 'var(--font-family-primary)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
          
          <h1 
            className="text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-family-primary)' }}
          >
            Complete Components Library
          </h1>
          <p 
            className="text-lg text-gray-600"
            style={{ fontFamily: 'var(--font-family-primary)' }}
          >
            Visual showcase of all 36 custom components in this Design Systems repository
          </p>
        </div>

        {/* Components Grid */}
        <div className="space-y-12">
          
          {/* Buttons Section */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              1. Buttons (2)
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <div className="space-y-8">
                {/* Primary Button */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    PrimaryButton.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Main call-to-action button with gradient background and animated shadow effect
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <PrimaryButton onClick={() => alert('Primary clicked!')}>
                      Submit
                    </PrimaryButton>
                    <PrimaryButton icon={<Mail />}>
                      Send Message
                    </PrimaryButton>
                    <PrimaryButton disabled>
                      Disabled State
                    </PrimaryButton>
                  </div>
                </div>

                {/* Secondary Button */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    SecondaryButton.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Secondary action button with outline style and hover gradient effect
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <SecondaryButton onClick={() => alert('Secondary clicked!')}>
                      Cancel
                    </SecondaryButton>
                    <SecondaryButton icon={<Search />}>
                      Learn More
                    </SecondaryButton>
                    <SecondaryButton icon={<Sparkles />}>
                      With Custom Icon
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* UI Components Section */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              2. Interactive UI Components (5)
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <div className="space-y-8">
                
                {/* Animated Counter */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    AnimatedCounter.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Smooth animated number counter with easing effect
                  </p>
                  
                  <div className="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <div className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                      <AnimatedCounter value={counterValue} duration={1500} />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setCounterValue(Math.floor(Math.random() * 1000))}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        style={{ fontFamily: 'var(--font-family-primary)' }}
                      >
                        Random
                      </button>
                      <button
                        onClick={() => setCounterValue(counterValue + 100)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                        style={{ fontFamily: 'var(--font-family-primary)' }}
                      >
                        +100
                      </button>
                    </div>
                  </div>
                </div>

                {/* Animated Stat Pill */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    DraggableStatPill.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Interactive animated statistics pill with pixel character and hover effects
                  </p>
                  
                  <div className="flex items-center justify-center pt-16 pb-12 bg-gray-50 rounded-xl">
                    <DraggableStatPill 
                      pill={{
                        id: "design-systems",
                        count: "156+",
                        label: "Total Resources",
                        icon: Layers,
                        gradient: "from-blue-100/80 to-purple-100/80",
                        borderColor: "border-blue-200/60",
                        iconColor: "text-blue-600"
                      }}
                    />
                  </div>
                </div>

                {/* Loading State */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    LoadingState.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Loading indicator component shown while content is being fetched
                  </p>
                  
                  <div className="flex items-center justify-center py-12 bg-gray-50 rounded-xl">
                    <LoadingState />
                  </div>
                </div>

                {/* Logo */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Logo.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Project logo component with custom SVG graphics
                  </p>
                  
                  <div className="flex items-center justify-center py-12 bg-gray-50 rounded-xl">
                    <div className="scale-150">
                      <Logo />
                    </div>
                  </div>
                </div>

                {/* Floating Toolbar */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    FloatingToolbar.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Floating toolbar with human/machine mode toggle
                  </p>
                  
                  <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                    <div className="scale-100">
                      <FloatingToolbar 
                        machineMode={machineMode} 
                        onMachineModeToggle={() => setMachineMode(!machineMode)} 
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Pixel Graphics Section */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              3. Pixel Art Components (2)
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <div className="space-y-8">
                
                {/* Pixel Characters */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    PixelCharacter.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Animated pixel art characters (4 variations: Robot, Alien, Ghost, Cat)
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
                        <PixelCharacter characterIndex={0} />
                      </div>
                      <p className="text-xs font-medium text-gray-700" style={{ fontFamily: 'var(--font-family-primary)' }}>Robot (Green)</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                        <PixelCharacter characterIndex={1} />
                      </div>
                      <p className="text-xs font-medium text-gray-700" style={{ fontFamily: 'var(--font-family-primary)' }}>Alien (Blue)</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-24 h-24 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl flex items-center justify-center">
                        <PixelCharacter characterIndex={2} />
                      </div>
                      <p className="text-xs font-medium text-gray-700" style={{ fontFamily: 'var(--font-family-primary)' }}>Ghost (Pink)</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center">
                        <PixelCharacter characterIndex={3} />
                      </div>
                      <p className="text-xs font-medium text-gray-700" style={{ fontFamily: 'var(--font-family-primary)' }}>Cat (Orange)</p>
                    </div>
                  </div>
                </div>

                {/* Pixel City */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    PixelCity.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Pixel art cityscape background with animated windows
                  </p>
                  
                  <div className="relative h-80 bg-gradient-to-b from-blue-100 to-purple-100 rounded-xl overflow-hidden">
                    <PixelCity />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Background Effects Section */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              4. Background Effects (4)
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <div className="space-y-8">
                
                {/* Dot Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    DotGrid.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Decorative dot grid pattern used as background throughout the site
                  </p>
                  
                  <div className="relative h-64 bg-[#f0ede8] rounded-xl overflow-hidden">
                    <DotGrid />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-700 font-medium px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        Dot grid overlay
                      </p>
                    </div>
                  </div>
                </div>

                {/* Clouds Sky */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    CloudsSky.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Animated floating clouds for atmospheric effect
                  </p>
                  
                  <div className="relative h-64 bg-gradient-to-b from-sky-200 to-sky-50 rounded-xl overflow-hidden">
                    <CloudsSky />
                  </div>
                </div>

                {/* Retro Background */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    RetroBackground.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    80s retro synthwave style background with grid, sun, and mountains
                  </p>
                  
                  <div className="relative h-96 rounded-xl overflow-hidden">
                    <RetroBackground />
                  </div>
                </div>

                {/* Fluid Shader */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    FluidShader.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Animated fluid gradient shader with AI-inspired colors
                  </p>
                  
                  <div className="relative h-64 rounded-xl overflow-hidden bg-white">
                    <FluidShader />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Custom Icons Section */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              5. Custom Sparkle Icons (7)
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'var(--font-family-primary)' }}>
                Custom icon set with sparkle effects used in navigation and UI elements
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 py-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
                    <HomeSparkleIcon className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-[10px] text-gray-600 text-center" style={{ fontFamily: 'var(--font-family-primary)' }}>HomeSparkleIcon</p>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                    <FolderSparkleIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-[10px] text-gray-600 text-center" style={{ fontFamily: 'var(--font-family-primary)' }}>FolderSparkleIcon</p>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
                    <PackageSparkleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-[10px] text-gray-600 text-center" style={{ fontFamily: 'var(--font-family-primary)' }}>PackageSparkleIcon</p>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center">
                    <ClipboardSparkleIcon className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-[10px] text-gray-600 text-center" style={{ fontFamily: 'var(--font-family-primary)' }}>ClipboardSparkleIcon</p>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl flex items-center justify-center">
                    <BookSparkleIcon className="w-8 h-8 text-pink-600" />
                  </div>
                  <p className="text-[10px] text-gray-600 text-center" style={{ fontFamily: 'var(--font-family-primary)' }}>BookSparkleIcon</p>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl flex items-center justify-center">
                    <RefreshSparkleIcon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-[10px] text-gray-600 text-center" style={{ fontFamily: 'var(--font-family-primary)' }}>RefreshSparkleIcon</p>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl flex items-center justify-center">
                    <ChatSparkleIcon className="w-8 h-8 text-cyan-600" />
                  </div>
                  <p className="text-[10px] text-gray-600 text-center" style={{ fontFamily: 'var(--font-family-primary)' }}>ChatSparkleIcon</p>
                </div>
              </div>
            </div>
          </section>

          {/* Layout Components Section */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              6. Layout Components (2)
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <div className="space-y-8">
                
                {/* Footer */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Footer.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Site footer with project credits, links, and branding
                  </p>
                  
                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <Footer />
                  </div>
                </div>

                {/* Sidebar Note */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Sidebar.tsx
                  </h3>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Main navigation sidebar with sparkle icons and animated effects (visible on the left side of main app)
                  </p>
                  
                  <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <p className="text-sm text-gray-600 text-center px-8" style={{ fontFamily: 'var(--font-family-primary)' }}>
                      View the Sidebar component on the left side of the main application interface
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Content Sections - WITH LIVE PREVIEWS */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              7. Content Sections (8) - Live Previews
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <p className="text-sm text-gray-600 mb-8" style={{ fontFamily: 'var(--font-family-primary)' }}>
                Main content sections that compose the application. Scroll to see each section in action!
              </p>
              
              <div className="space-y-12">
                
                {/* HomeSection */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    HomeSection.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Landing page with animated statistics, draggable pills, and intro content
                  </p>
                  <div className="border-4 border-blue-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <HomeSection onSectionChange={setActiveSection} />
                    </div>
                  </div>
                </div>

                {/* DesignSystemsSection */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    DesignSystemsSection.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Design Systems listing with filters, search, and card grid
                  </p>
                  <div className="border-4 border-blue-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <DesignSystemsSection onSectionChange={setActiveSection} />
                    </div>
                  </div>
                </div>

                {/* ToolsSection */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    ToolsSection.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    AI Tools directory with categories and filtering
                  </p>
                  <div className="border-4 border-green-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <ToolsSection onSectionChange={setActiveSection} />
                    </div>
                  </div>
                </div>

                {/* JobsSection */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    JobsSection.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Job postings section with company info and listings
                  </p>
                  <div className="border-4 border-orange-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <JobsSection onSectionChange={setActiveSection} />
                    </div>
                  </div>
                </div>

                {/* ReadingsSection */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    ReadingsSection.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Curated readings, articles, and learning resources
                  </p>
                  <div className="border-4 border-pink-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-pink-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <ReadingsSection onSectionChange={setActiveSection} />
                    </div>
                  </div>
                </div>

                {/* ChangelogSection */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    ChangelogSection.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Project changelog with updates and version history
                  </p>
                  <div className="border-4 border-indigo-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <ChangelogSection />
                    </div>
                  </div>
                </div>

                {/* AboutSection */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    AboutSection.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    About the project, mission, and contribution guidelines
                  </p>
                  <div className="border-4 border-purple-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <AboutSection />
                    </div>
                  </div>
                </div>

                {/* ContributorsSection */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    ContributorsSection.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Team members showcase with animated avatar balls
                  </p>
                  <div className="border-4 border-cyan-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-cyan-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <ContributorsSection />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* CMS & Admin Components - WITH LIVE PREVIEWS */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              8. CMS & Admin Tools (8) - Live Previews
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <p className="text-sm text-gray-600 mb-8" style={{ fontFamily: 'var(--font-family-primary)' }}>
                Backend administration and content management components
              </p>
              
              <div className="space-y-12">
                
                {/* Admin */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Admin.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Main CMS admin panel with password protection (password: designsystems2024)
                  </p>
                  <div className="border-4 border-purple-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <Admin />
                    </div>
                  </div>
                </div>

                {/* DiagnoseCMS */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    DiagnoseCMS.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Database diagnostics and debugging tool
                  </p>
                  <div className="border-4 border-purple-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <DiagnoseCMS />
                    </div>
                  </div>
                </div>

                {/* CleanupDuplicates */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    CleanupDuplicates.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Utility to find and remove duplicate database entries
                  </p>
                  <div className="border-4 border-purple-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <CleanupDuplicates />
                    </div>
                  </div>
                </div>

                {/* MigrateReadings */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    MigrateReadings.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Bulk migrate readings data to CMS
                  </p>
                  <div className="border-4 border-purple-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <MigrateReadings />
                    </div>
                  </div>
                </div>

                {/* MigrateJobs */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    MigrateJobs.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Bulk migrate job postings data to CMS
                  </p>
                  <div className="border-4 border-purple-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <MigrateJobs />
                    </div>
                  </div>
                </div>

                {/* MigrateContributors */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    MigrateContributors.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Bulk migrate contributors data to CMS
                  </p>
                  <div className="border-4 border-purple-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <MigrateContributors />
                    </div>
                  </div>
                </div>

                {/* MigrateTools */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    MigrateTools.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Bulk migrate tools data to CMS
                  </p>
                  <div className="border-4 border-purple-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <MigrateTools />
                    </div>
                  </div>
                </div>

                {/* SubmissionsDiagnose */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    SubmissionsDiagnose.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Review and diagnose user submissions
                  </p>
                  <div className="border-4 border-purple-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <SubmissionsDiagnose />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Dev Tools & Utilities - WITH LIVE PREVIEWS */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              9. Dev Tools & Utilities (6) - Live Previews
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <p className="text-sm text-gray-600 mb-8" style={{ fontFamily: 'var(--font-family-primary)' }}>
                Development and debugging utilities
              </p>
              
              <div className="space-y-12">
                
                {/* DevModeGrid */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    DevModeGrid.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Development grid overlay for alignment
                  </p>
                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border-4 border-gray-300">
                    <DevModeGrid />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-gray-700 font-medium px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        Grid overlay active
                      </p>
                    </div>
                  </div>
                </div>

                {/* DevModePadding */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    DevModePadding.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Padding and spacing visualization tool
                  </p>
                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border-4 border-gray-300">
                    <DevModePadding />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-gray-700 font-medium px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        Padding guides active
                      </p>
                    </div>
                  </div>
                </div>

                {/* GridOverlay */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    GridOverlay.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Design grid system overlay
                  </p>
                  <div className="relative h-64 bg-white rounded-xl overflow-hidden border-4 border-gray-300">
                    <GridOverlay />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-gray-700 font-medium px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        Grid system overlay
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rulers */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Rulers.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Ruler guides for precise layout measurements
                  </p>
                  <div className="relative h-64 bg-white rounded-xl overflow-hidden border-4 border-gray-300">
                    <Rulers />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '40px', left: '40px' }}>
                      <p className="text-gray-700 font-medium px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        Rulers visible on edges
                      </p>
                    </div>
                  </div>
                </div>

                {/* PageTransition */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    PageTransition.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Smooth page transition animations
                  </p>
                  <div className="relative h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden border-4 border-gray-300 flex items-center justify-center">
                    <PageTransition>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-family-primary)' }}>
                          Page Content
                        </p>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-family-primary)' }}>
                          Wraps content with transition animations
                        </p>
                      </div>
                    </PageTransition>
                  </div>
                </div>

                {/* CustomCursor */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    CustomCursor.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Custom Figma-style cursor (active on main site, not on CMS pages)
                  </p>
                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border-4 border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700 font-medium" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        Custom cursor active on public pages
                      </p>
                      <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        (Standard cursor on CMS pages)
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Special Components - WITH LIVE PREVIEWS */}
          <section>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-family-primary)' }}
            >
              10. Special Components (4) - Live Previews
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8">
              <div className="space-y-12">
                
                {/* MachineView */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    MachineView.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Special retro/synthwave machine mode view with 80s aesthetic
                  </p>
                  <div className="border-4 border-red-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <MachineView activeSection={activeSection} />
                    </div>
                  </div>
                </div>

                {/* SuggestModal */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    SuggestModal.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Modal dialog for users to suggest new resources
                  </p>
                  <div className="relative">
                    <PrimaryButton onClick={() => setShowSuggestModal(true)}>
                      Open Suggest Modal
                    </PrimaryButton>
                    <SuggestModal 
                      isOpen={showSuggestModal} 
                      onClose={() => setShowSuggestModal(false)} 
                    />
                  </div>
                  {showSuggestModal && (
                    <p className="text-xs text-green-600 mt-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                      ✓ Modal is now open! Look for it in the center of the screen.
                    </p>
                  )}
                </div>

                {/* DesignSystemShowcase */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    DesignSystemShowcase.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    Design system tokens and variables showcase page
                  </p>
                  <div className="border-4 border-orange-200 rounded-2xl overflow-hidden max-h-[600px] relative">
                    <div className="absolute top-4 right-4 z-10 bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Live Preview
                    </div>
                    <div className="overflow-y-auto max-h-[600px]">
                      <DesignSystemShowcase />
                    </div>
                  </div>
                </div>

                {/* ComponentsShowcase (This Page) */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    ComponentsShowcase.tsx
                  </h3>
                  <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    This page - Complete components library showcase (you are here!)
                  </p>
                  <div className="h-48 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl flex items-center justify-center border-4 border-pink-200">
                    <div className="text-center">
                      <p className="text-2xl mb-2">👋</p>
                      <p className="text-sm text-pink-800 font-medium" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        You're currently viewing this component!
                      </p>
                      <p className="text-xs text-pink-600 mt-1" style={{ fontFamily: 'var(--font-family-primary)' }}>
                        Scroll up to see all 36 components
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Summary Stats */}
          <section>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-family-primary)' }}
              >
                36 Total Components
              </h2>
              <p 
                className="text-lg opacity-90 mb-6"
                style={{ fontFamily: 'var(--font-family-primary)' }}
              >
                A complete custom component library with live previews
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">2</div>
                  <div className="text-sm opacity-90">Buttons</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">5</div>
                  <div className="text-sm opacity-90">UI Components</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">7</div>
                  <div className="text-sm opacity-90">Custom Icons</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">8</div>
                  <div className="text-sm opacity-90">Sections</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">14</div>
                  <div className="text-sm opacity-90">Other</div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer spacing */}
        <div className="h-24" />
      </div>
    </div>
  );
}
