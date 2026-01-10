import { useState, useEffect, useMemo } from "react";
import { LayoutGroup } from "motion/react";
import { Layers, Package, Briefcase, BookOpen, Clock, Sparkles, ArrowRight, Plus } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { PixelCity } from "./PixelCity";
import { CloudsSky } from "./CloudsSky";
import { DraggableStatPill } from "./DraggableStatPill";
import { FolderSparkleIcon } from "./icons/FolderSparkleIcon";
import { PackageSparkleIcon } from "./icons/PackageSparkleIcon";
import { ClipboardSparkleIcon } from "./icons/ClipboardSparkleIcon";
import { BookSparkleIcon } from "./icons/BookSparkleIcon";
import { SuggestModal } from "./SuggestModal";
import { DevModeGrid } from "./DevModeGrid";
import { DevModePadding } from "./DevModePadding";
import { projectId, publicAnonKey } from '/utils/supabase/info';

type Section = "home" | "design-systems" | "tools" | "jobs" | "readings" | "changelog" | "about" | "contributors";

interface HomeSectionProps {
  onSectionChange: (section: Section) => void;
}

export function HomeSection({ onSectionChange }: HomeSectionProps) {
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [isAnyPillHovered, setIsAnyPillHovered] = useState(false);
  const [badgeTimestamp, setBadgeTimestamp] = useState(Date.now());
  const [counts, setCounts] = useState({
    designSystems: 0,
    tools: 0,
    jobs: 0,
    readings: 0
  });
  
  // Load counts from CMS
  useEffect(() => {
    const loadCounts = async () => {
      try {
        const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;
        
        console.log('[HomeSection] Loading counts from CMS...');
        
        // Fetch all counts in parallel
        const [designSystemsRes, toolsRes, jobsRes, readingsRes] = await Promise.all([
          fetch(`${API_URL}/design-systems`, {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }),
          fetch(`${API_URL}/tools`, {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }),
          fetch(`${API_URL}/jobs`, {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          }),
          fetch(`${API_URL}/readings`, {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` }
          })
        ]);
        
        const [designSystems, tools, jobs, readings] = await Promise.all([
          designSystemsRes.json(),
          toolsRes.json(),
          jobsRes.json(),
          readingsRes.json()
        ]);
        
        console.log('[HomeSection] Raw API responses:', {
          designSystems,
          tools,
          jobs,
          readings
        });
        
        const newCounts = {
          designSystems: Array.isArray(designSystems) ? designSystems.length : 0,
          tools: Array.isArray(tools) ? tools.length : 0,
          jobs: Array.isArray(jobs) ? jobs.length : 0,
          readings: Array.isArray(readings) ? readings.length : 0
        };
        
        console.log('[HomeSection] Calculated counts:', newCounts);
        
        setCounts(newCounts);
      } catch (error) {
        console.error('[HomeSection] Error loading counts:', error);
      }
    };
    
    loadCounts();
  }, []);
  
  // Auto-close badge after 4 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInfoExpanded(false);
    }, 4000); // 4 segundos

    return () => clearTimeout(timer);
  }, []); // Solo se ejecuta una vez al montar
  
  // Actualizar el timestamp del badge cada 5 minutos para forzar recarga
  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeTimestamp(Date.now());
    }, 5 * 60 * 1000); // Cada 5 minutos

    return () => clearInterval(interval);
  }, []);
  
  // Audio para el click
  const playClickSound = () => {
    // Usar audio de Mixkit - sonido de magic/shine
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Si falla, intentar con otro audio
      const fallback = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
      fallback.volume = 0.5;
      fallback.play().catch(() => {});
    });
  };
  
  const handleToggle = () => {
    playClickSound();
    setIsInfoExpanded(!isInfoExpanded);
  };
  
  // Store only the order of pills, not the counts
  const [pillOrder, setPillOrder] = useState(["design-systems", "tools", "jobs", "resources"]);

  const movePill = (dragIndex: number, hoverIndex: number) => {
    const newOrder = [...pillOrder];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, removed);
    setPillOrder(newOrder);
  };

  // Pill templates without counts
  const pillTemplates = {
    "design-systems": {
      id: "design-systems",
      label: "Design Systems",
      icon: FolderSparkleIcon,
      gradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200/50",
      iconColor: "text-blue-600",
    },
    "tools": {
      id: "tools",
      label: "AI tools",
      icon: PackageSparkleIcon,
      gradient: "from-teal-50 via-emerald-50 to-teal-50",
      borderColor: "border-teal-200/50",
      iconColor: "text-teal-600",
    },
    "jobs": {
      id: "jobs",
      label: "job openings",
      icon: ClipboardSparkleIcon,
      gradient: "from-violet-50 to-purple-50",
      borderColor: "border-violet-200/50",
      iconColor: "text-violet-600",
    },
    "resources": {
      id: "resources",
      label: "readings",
      icon: BookSparkleIcon,
      gradient: "from-rose-50 to-pink-50",
      borderColor: "border-rose-200/50",
      iconColor: "text-rose-600",
    },
  };

  // Get count for a pill based on its ID
  const getCountForPill = (pillId: string) => {
    if (pillId === "design-systems") return counts.designSystems > 0 ? `${counts.designSystems}+` : "19+";
    if (pillId === "tools") return counts.tools > 0 ? `${counts.tools}+` : "45+";
    if (pillId === "jobs") return counts.jobs > 0 ? `${counts.jobs}+` : "9+";
    if (pillId === "resources") return counts.readings > 0 ? `${counts.readings}+` : "23+";
    return "0+";
  };

  // Calculate pills with current counts - this always uses the latest counts
  const statPills = useMemo(() => {
    const pills = pillOrder.map((pillId) => ({
      ...pillTemplates[pillId as keyof typeof pillTemplates],
      count: getCountForPill(pillId)
    }));
    
    console.log('[HomeSection] Calculated statPills:', pills.map(p => ({ id: p.id, count: p.count })));
    
    return pills;
  }, [pillOrder, counts]);

  const sections = useMemo(() => [
    {
      id: "design-systems" as Section,
      title: "Design Systems with AI",
      description: "Curated selection of official Design Systems implementing artificial intelligence features (reviewed 500+ systems)",
      icon: FolderSparkleIcon,
      gradient: "from-blue-50 via-cyan-50 to-blue-50",
      borderColor: "border-blue-200/50",
      hoverBorder: "hover:border-blue-300",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      iconBorder: "border-blue-200/50",
      stats: counts.designSystems > 0 ? `${counts.designSystems}+ systems` : "19+ systems",
      features: ["Lightning DS", "Cloudscape", "Carbon", "Ant Design X", "Shadcn UI", "Vibe DS"]
    },
    {
      id: "tools" as Section,
      title: "AI tools & resources",
      description: "Discover cutting-edge tools revolutionizing Design System workflows",
      icon: PackageSparkleIcon,
      gradient: "from-teal-50 via-emerald-50 to-teal-50",
      borderColor: "border-teal-200/50",
      hoverBorder: "hover:border-teal-300",
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      iconBorder: "border-teal-200/50",
      stats: counts.tools > 0 ? `${counts.tools}+ tools` : "45+ tools",
      features: ["v0", "Figma Make", "Bolt", "Lovable", "Orchids", "Anima"]
    },
    {
      id: "jobs" as Section,
      title: "Job opportunities",
      description: "Career opportunities in Design Systems with AI expertise",
      icon: ClipboardSparkleIcon,
      gradient: "from-violet-50 via-purple-50 to-violet-50",
      borderColor: "border-violet-200/50",
      hoverBorder: "hover:border-violet-300",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      iconBorder: "border-violet-200/50",
      stats: counts.jobs > 0 ? `${counts.jobs}+ positions` : "9+ positions",
      features: ["Meta", "Google", "Microsoft", "Adobe", "Figma", "Shopify"]
    },
    {
      id: "readings" as Section,
      title: "Curated reading list",
      description: "Articles, guides, and resources about AI in Design Systems",
      icon: BookSparkleIcon,
      gradient: "from-rose-50 via-pink-50 to-rose-50",
      borderColor: "border-rose-200/50",
      hoverBorder: "hover:border-rose-300",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      iconBorder: "border-rose-200/50",
      stats: counts.readings > 0 ? `${counts.readings}+ resources` : "23+ resources",
      features: ["Google PAIR", "IBM Carbon", "Microsoft Design", "UX Collective", "PatternFly"]
    }
  ], [counts]);

  // Auto-shuffle pills every 12 seconds with smooth spring animation - but pause when hovering
  useEffect(() => {
    const interval = setInterval(() => {
      // Only shuffle if no pill is being hovered
      if (!isAnyPillHovered) {
        setPillOrder((currentOrder) => {
          const newOrder = [...currentOrder];
          // Fisher-Yates shuffle algorithm
          for (let i = newOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
          }
          return newOrder;
        });
      }
    }, 12000); // Shuffle every 12 seconds

    return () => clearInterval(interval);
  }, [isAnyPillHovered]);

  return (
    <div>
      {/* Collapsible Info Badge - Now positioned above hero */}
      <div className="mb-4 flex justify-center items-center gap-3 px-4 flex-wrap">
        {/* Mobile version - static badge with date only */}
        <div className="sm:hidden inline-flex items-center gap-2 px-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-purple-300/60 shadow-sm h-7">
          <Clock className="w-3.5 h-3.5 text-purple-700 shrink-0" />
          <span className="text-xs font-medium text-gray-800 tracking-tight">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Desktop version - collapsible badge */}
        <button
          onClick={handleToggle}
          className={`hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-purple-300/60 shadow-sm hover:shadow-md transition-all h-9 ${
            isInfoExpanded ? 'gap-2 px-4' : 'gap-0 px-4'
          }`}
        >
          <Sparkles 
            className="w-4 h-4 text-purple-700 shrink-0" 
            style={{
              animation: 'floatSubtle 3s ease-in-out infinite, spin 8s linear infinite',
            }}
          />
          
          <div 
            className="overflow-hidden transition-all duration-300 ease-in-out flex items-center"
            style={{
              maxWidth: isInfoExpanded ? '500px' : '0px',
              opacity: isInfoExpanded ? 1 : 0,
            }}
          >
            <div className="flex items-center gap-2 whitespace-nowrap ml-2">
              <span className="text-xs font-medium text-gray-800 tracking-tight">
                AI-powered Design Systems repository
              </span>
              <span className="text-gray-400">•</span>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onSectionChange("changelog");
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    onSectionChange("changelog");
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-purple-700 transition-colors cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </button>
        
        {/* Product Hunt Badge - Visible on all devices, smaller on mobile */}
        <a 
          href="https://www.producthunt.com/products/design-systems-repo-for-the-ai-era?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-design-systems-repo-for-the-ai-era" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block transition-transform hover:scale-105 duration-300"
          title="Featured on Product Hunt"
        >
          <img 
            alt="Design Systems repo for the AI Era - Curated resources on how AI is reshaping Design Systems | Product Hunt" 
            width="250" 
            height="54" 
            src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1058672&theme=light&t=${badgeTimestamp}`}
            className="h-7 sm:h-9 w-auto"
          />
        </a>
      </div>

      {/* Hero Section */}
      <div className="mb-8 sm:mb-12 max-w-6xl py-6 sm:py-8 lg:py-12 text-center mx-auto relative" style={{ overflow: 'visible' }}>
        {/* Pixel City background - very far back */}
        <PixelCity />
        
        {/* Clouds background */}
        <CloudsSky />
        
        {/* Content */}
        <div className="relative z-10">
          
          <h1 className="font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.1] sm:leading-[0.90] break-words px-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.05em', textShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)', fontSize: 'clamp(2.25rem, 6vw + 0.5rem, 4.5rem)', wordBreak: 'normal', overflowWrap: 'break-word' }}>
            <span style={{ display: 'inline' }}>Design Systems</span> <span style={{ display: 'inline', whiteSpace: 'nowrap' }}>for the</span>
            <span 
              className="block -mt-2 sm:-mt-3 relative animate-float" 
              style={{ 
                fontFamily: 'Pixelify Sans, cursive', 
                letterSpacing: '-0.01em', 
                fontSize: 'clamp(3rem, 8vw + 0.5rem, 8rem)',
                background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'brightness(1.1) saturate(1.2)'
              }}
            >
              AI Era
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-3xl leading-relaxed font-normal mx-auto px-4" style={{ textWrap: 'balance' }}>
            A <span className="font-semibold text-gray-800 decoration-wavy underline decoration-2 decoration-purple-400 underline-offset-4 pr-1 sm:pr-2" style={{ fontFamily: 'Caveat, cursive', fontSize: 'clamp(1.5em, 4vw, 1.6em)', lineHeight: '1' }}>human-curated</span> collection of resources exploring how AI reshapes <span style={{ whiteSpace: 'nowrap' }}>Design Systems</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-5 px-4 mt-6 sm:mt-8 lg:mt-12">
            <PrimaryButton
              onClick={() => onSectionChange("design-systems")}
              icon={<ArrowRight />}
            >
              Explore Design Systems
            </PrimaryButton>
            <SecondaryButton
              onClick={() => onSectionChange("tools")}
            >
              Browse AI tools
            </SecondaryButton>
          </div>
          
          {/* Compact Stats Pills */}
          <div className="mt-12 sm:mt-20 lg:mt-28 grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row items-start sm:items-center justify-center gap-x-3 gap-y-8 sm:gap-4 px-4 max-w-sm sm:max-w-none mx-auto">
            <LayoutGroup>
              {statPills.map((pill, index) => (
                <DraggableStatPill
                  key={pill.id}
                  index={index}
                  moveStatPill={movePill}
                  pill={pill}
                  onHoverChange={setIsAnyPillHovered}
                />
              ))}
            </LayoutGroup>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="mb-12 group px-4 sm:px-0">
        <h2 className="text-2xl sm:text-2xl font-semibold text-gray-900 mb-2">What's inside</h2>
        <p className="text-base sm:text-base text-gray-600 mb-6 sm:mb-8">Explore our curated collection of AI Design System resources</p>
        
        <DevModeGrid
          columns={2}
          rows={3}
          gap="24px"
          className=""
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <DevModePadding
                key={section.id}
                paddingValue="24px"
                className="bg-transparent"
              >
                <button
                  onClick={() => onSectionChange(section.id)}
                  className="w-full group text-left p-8 rounded-2xl bg-white hover:shadow-xl transition-all relative overflow-hidden h-full flex flex-col"
                  style={{
                    border: '2px solid transparent',
                    backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    minHeight: '280px'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${section.iconBg} border ${section.iconBorder}`}>
                      <Icon className={`w-6 h-6 ${section.iconColor}`} />
                    </div>
                    <div className="flex items-center gap-2 text-base sm:text-sm text-gray-600">
                      <span>{section.stats}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {section.title}
                  </h3>
                  
                  <p className="text-base sm:text-sm text-gray-600 mb-4">
                    {section.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {section.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-50/80 to-purple-50/80 text-xs text-gray-700 border border-blue-100/50 backdrop-blur-sm"
                      >
                        {feature}
                      </span>
                    ))}
                    {section.features.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-50/80 to-purple-50/80 text-xs text-gray-700 border border-blue-100/50 backdrop-blur-sm">
                        view all
                      </span>
                    )}
                  </div>
                </button>
              </DevModePadding>
            );
          })}

          {/* Card 5 - Suggest a Resource */}
          <DevModePadding
            paddingValue="24px"
            className="bg-transparent"
          >
            <button
              onClick={() => setIsSuggestModalOpen(true)}
              className="w-full group text-left p-8 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 hover:shadow-xl transition-all relative overflow-hidden h-full flex flex-col border-2 border-dashed border-purple-300/60 hover:border-purple-400"
              style={{
                minHeight: '280px'
              }}
            >
              {/* Animated Contribution Grid (GitHub style) */}
              <div className="absolute inset-6 overflow-hidden pointer-events-none opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500">
                <div className="w-full h-full" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(16, 1fr)',
                  gridTemplateRows: 'repeat(8, 1fr)',
                  gap: '3px'
                }}>
                  {[...Array(128)].map((_, i) => {
                    const colorVariants = [
                      'contribution-purple',
                      'contribution-pink',
                      'contribution-blue',
                      'contribution-mixed'
                    ];
                    const randomVariant = colorVariants[Math.floor(Math.random() * colorVariants.length)];
                    const randomDuration = 4 + Math.random() * 4; // 4-8s
                    const randomDelay = Math.random() * 8;
                    
                    return (
                      <div
                        key={`contrib-${i}`}
                        className="rounded-sm"
                        style={{
                          animation: `${randomVariant} ${randomDuration}s ease-in-out infinite`,
                          animationDelay: `${randomDelay}s`,
                          aspectRatio: '1'
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-300/60 shadow-sm">
                  <Plus className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-purple-700 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-purple-200">
                  <span>Contribute</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 relative z-10">
                Share and get featured 💜
              </h3>
              
              <p className="text-base sm:text-sm text-gray-700 mb-4 relative z-10 font-medium">
                Contribute resources and your name will be added to our lovely tribute list
              </p>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-purple-700 border border-purple-200/60 font-medium shadow-sm">
                  Community driven
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-purple-700 border border-purple-200/60 font-medium shadow-sm">
                  Get credited
                </span>
              </div>
            </button>
          </DevModePadding>

          {/* Card 6 - Empty placeholder to balance the grid */}
          <DevModePadding
            paddingValue="24px"
            className="bg-transparent hidden md:block"
          >
            <div
              className="w-full h-full rounded-2xl border-2 border-dashed border-gray-300/80"
              style={{
                minHeight: '280px'
              }}
            >
              {/* Empty skeleton card for grid balance */}
            </div>
          </DevModePadding>
        </DevModeGrid>
      </div>

      {/* CTA Section */}
      <div className="mt-8 sm:mt-16 p-6 sm:p-12 mx-4 sm:mx-0 rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border border-purple-200/50 text-center relative overflow-hidden">
        {/* Efecto ripple desde debajo del botón (centro fuera de la caja) */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ bottom: '-100px' }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                border: '2px solid',
                borderColor: ['rgba(147, 51, 234, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(236, 72, 153, 0.3)'][i % 3],
                animation: 'ripple-wave-slow 8s linear infinite',
                animationDelay: `${i * 1.33}s`,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto relative z-10">
          <Sparkles 
            className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" 
            style={{
              animation: 'sparkle-gentle 4s ease-in-out infinite',
            }}
          />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
            Stay updated with AI Design Systems
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">
            This is a living collection that grows with the community. Bookmark this page and check back regularly 
            for new Design Systems, tools, job opportunities, and insights.
          </p>
          <div className="flex items-center justify-center gap-3">
            <PrimaryButton
              onClick={() => onSectionChange("design-systems")}
            >
              Start exploring
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Suggest Modal */}
      <SuggestModal
        isOpen={isSuggestModalOpen}
        onClose={() => setIsSuggestModalOpen(false)}
      />
    </div>
  );
}