import { ExternalLink, Figma, ArrowRight, Plus } from "lucide-react";
import { PixelCharacter } from "./PixelCharacter";
import { MCPIcon } from "./icons/MCPIcon";
import { AntDesignXIcon } from "./icons/AntDesignXIcon";
import { LoadingState } from "./LoadingState";
import { useState, useEffect } from "react";
import { SuggestModal } from "./SuggestModal";
import { useCMS } from "../hooks/useCMS";

interface DesignSystem {
  id?: string;
  name: string;
  company: string;
  description?: string;
  websiteUrl?: string;
  url?: string; // CMS field
  figmaKitUrl?: string;
  figmaKit?: string; // CMS field
  urls?: string[]; // For multiple URLs
  companyDomain?: string; // For logo fetching
  customLogo?: string; // For custom logos
  category?: string;
  badges?: string[]; // Predefined badges: 'new', 'ai-accessibility', 'mcp-support', 'tokens'
  isEditorsChoice?: boolean; // Adds "recommended" badge automatically
  contributedBy?: string; // Name of the contributor
  contributorUrl?: string; // URL to contributor's profile/social
}

const designSystems: DesignSystem[] = [
  {
    name: "Lightning Design System",
    company: "Salesforce",
    websiteUrl: "https://www.lightningdesignsystem.com/2e1ef8501/p/52a7c7-ai-and-slds-2",
    figmaKitUrl: "https://www.figma.com/community/file/1478970084463860424/slds-2-pattern-agentic-experiences",
    urls: [
      "https://www.lightningdesignsystem.com/2e1ef8501/p/03c548-agentic-patterns",
      "https://www.salesforce.com/blog/design-ai-interfaces-accessibility/"
    ],
    companyDomain: "salesforce.com",
    isEditorsChoice: true,
    contributedBy: "Sarah Johnson"
  },
  {
    name: "Fury Design System",
    company: "Mercado Libre",
    websiteUrl: "https://medium.com/mercadolibre-tech/how-we-are-using-ai-in-mercado-libres-accessibility-team-e960b83283a9",
    companyDomain: "mercadolibre.com",
    contributedBy: "Diego Martínez"
  },
  {
    name: "Apps SDK UI",
    company: "OpenAI",
    websiteUrl: "https://developers.openai.com/apps-sdk",
    figmaKitUrl: "https://www.figma.com/community/file/1560064615791108827/apps-in-chatgpt-components-templates",
    urls: [
      "https://openai.github.io/apps-sdk-ui/?path=/docs/overview-introduction--docs",
      "https://developers.openai.com/apps-sdk/concepts/ui-guidelines"
    ],
    companyDomain: "openai.com"
  },
  {
    name: "Claude AI (unofficial)",
    company: "Anthropic",
    websiteUrl: "https://geist.co/work/anthropic",
    figmaKitUrl: "https://www.figma.com/community/file/1445575023384366559",
    companyDomain: "anthropic.com"
  },
  {
    name: "Cloudscape Design System",
    company: "Amazon",
    websiteUrl: "https://cloudscape.design/get-started/for-developers/ai-tools-support/",
    figmaKitUrl: "https://www.figma.com/community/file/1585292872561164967/cds-component-library-2-0-3",
    companyDomain: "amazon.com"
  },
  {
    name: "Atlassian Design System",
    company: "Atlassian",
    websiteUrl: "https://atlassian.design/patterns/ai-rovo#rovo-brand-and-ai-experiences",
    companyDomain: "atlassian.com"
  },
  {
    name: "Ethos Design System",
    company: "GE HealthCare",
    websiteUrl: "https://www.ethosdesignsystem.com/style-guides/artificial-intelligence",
    companyDomain: "gehealthcare.com"
  },
  {
    name: "Pajamas Design System",
    company: "GitLab",
    websiteUrl: "https://design.gitlab.com/patterns/ai-human-interaction",
    urls: ["https://design.gitlab.com/patterns/duo-agents-and-flows"],
    companyDomain: "gitlab.com"
  },
  {
    name: "Carbon Design System",
    company: "IBM",
    websiteUrl: "https://carbondesignsystem.com/guidelines/carbon-for-ai/",
    companyDomain: "ibm.com",
    isEditorsChoice: true
  },
  {
    name: "Ant Design X",
    company: "Ant Design",
    websiteUrl: "https://x.ant.design/",
    figmaKitUrl: "https://www.figma.com/community/file/1501193060829090060/ant-design-x-community-design-system-for-ai-products",
    companyDomain: "ant.design",
    customLogo: "antdesignx"
  },
  {
    name: "Vibe Design System",
    company: "Monday",
    websiteUrl: "https://vibe.monday.com/?path=/docs/mcp-new--docs",
    companyDomain: "monday.com"
  },
  {
    name: "Blade Design System",
    company: "Razorpay",
    websiteUrl: "https://blade.razorpay.com/?path=/docs/guides-blade-mcp--docs",
    companyDomain: "razorpay.com"
  },
  {
    name: "Patternfly Design System",
    company: "Red Hat",
    websiteUrl: "https://www.patternfly.org/patternfly-ai/principles-and-guidelines",
    companyDomain: "redhat.com",
    isEditorsChoice: true
  },
  {
    name: "Canvas Design System",
    company: "Workday",
    websiteUrl: "https://canvas.workday.com/guidelines/ai-guidance/ai-experience-guidelines",
    companyDomain: "workday.com"
  },
  {
    name: "ActiveCampaign Design System",
    company: "ActiveCampaign",
    websiteUrl: "https://www.activecampaign.design/docs/patterns/ai",
    companyDomain: "activecampaign.com"
  },
  {
    name: "Horizon Design System",
    company: "ServiceNow",
    websiteUrl: "https://horizon.servicenow.com/getting-started/ai",
    urls: ["https://horizon.servicenow.com/guidelines/ai/having-a-vision-for-ai"],
    companyDomain: "servicenow.com"
  },
  {
    name: "Seeds Design System",
    company: "SproutSocial",
    websiteUrl: "https://seeds.sproutsocial.com/components/mcp-server/",
    companyDomain: "sproutsocial.com"
  },
  {
    name: "Soul Design System",
    company: "Emplifi",
    websiteUrl: "https://soul.emplifi.io/latest/patterns/patterns/ai-guidelines/patterns-oahsQIli",
    companyDomain: "emplifi.io"
  },
  {
    name: "Backbase Design System",
    company: "Backbase",
    websiteUrl: "https://designsystem.backbase.com/latest/guides/beta-ui-ang-with-cursor-f9fdjG0s",
    companyDomain: "backbase.com"
  },
  {
    name: "Shadcn UI",
    company: "Shadcn",
    websiteUrl: "https://ui.shadcn.com/docs/mcp",
    figmaKitUrl: "https://shadcnstudio.com/figma",
    urls: ["https://shadcnstudio.com/mcp"],
    companyDomain: "shadcn.com"
  },
  {
    name: "Geist Design System",
    company: "Vercel",
    websiteUrl: "https://vercel.com/design",
    companyDomain: "vercel.com"
  },
  {
    name: "Content Design System",
    company: "Intuit",
    websiteUrl: "https://contentdesign.intuit.com/ai/",
    companyDomain: "intuit.com"
  }
];

const gradients = [
  "from-blue-50/50 to-cyan-50/50",
  "from-purple-50/50 to-pink-50/50",
  "from-violet-50/50 to-blue-50/50",
  "from-pink-50/50 to-rose-50/50",
  "from-indigo-50/50 to-purple-50/50",
  "from-cyan-50/50 to-blue-50/50",
  "from-emerald-50/50 to-teal-50/50",
  "from-orange-50/50 to-amber-50/50",
  "from-rose-50/50 to-pink-50/50",
  "from-sky-50/50 to-cyan-50/50",
  "from-fuchsia-50/50 to-purple-50/50",
  "from-lime-50/50 to-green-50/50",
  "from-amber-50/50 to-yellow-50/50",
  "from-teal-50/50 to-emerald-50/50",
  "from-violet-50/50 to-fuchsia-50/50",
  "from-blue-50/50 to-indigo-50/50",
  "from-green-50/50 to-emerald-50/50",
  "from-purple-50/50 to-violet-50/50"
];

export function DesignSystemsSection() {
  const [filter, setFilter] = useState<'all' | 'withFigma' | 'withMCP'>('all');
  const [showCommunityOnly, setShowCommunityOnly] = useState(false);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentReaction, setCurrentReaction] = useState('Wow!');

  // FORZAR SCROLL AL TOP CUANDO SE MONTA ESTE COMPONENTE
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Load Design Systems from CMS
  const { items: cmsDesignSystems, loading: cmsLoading, error: cmsError, lastUpdated } = useCMS('design-systems');

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "January 7, 2026"; // Fallback to current date
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Normalize CMS data to match component structure (with safety check)
  const normalizedCMSData = (cmsDesignSystems || []).map((item: any) => {
    // Extract domain from URL if companyDomain is not provided
    let companyDomain = item.companyDomain;
    if (!companyDomain && item.url) {
      try {
        const url = new URL(item.url);
        companyDomain = url.hostname.replace('www.', '');
      } catch (e) {
        // If URL parsing fails, try to extract domain manually
        const match = item.url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
        if (match) {
          companyDomain = match[1];
        }
      }
    }

    return {
      ...item,
      websiteUrl: item.url || item.websiteUrl,
      figmaKitUrl: item.figmaKit || item.figmaKitUrl,
      urls: item.additionalUrls || item.urls,
      companyDomain,
      badges: Array.isArray(item.badges) ? item.badges : undefined,
      contributedBy: item.contributedBy || item.contributor // Support both field names
    };
  });

  // Combine CMS data with hardcoded fallback data
  const designSystemsData = normalizedCMSData.length > 0 ? normalizedCMSData : designSystems;

  const reactions = ['Wow!', 'Aha!', 'Yay!', 'Cool!', 'Nice!', 'Boom!', 'Pop!', 'Neat!'];

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      setShowBubble(true);
      setCurrentReaction(reactions[Math.floor(Math.random() * reactions.length)]);
      
      setTimeout(() => {
        setShowBubble(false);
      }, 3000);
    }, 8000);

    return () => clearInterval(bubbleInterval);
  }, []);

  const filteredSystems = designSystemsData.filter((system) => {
    // First apply the main filter
    let passesMainFilter = true;
    if (filter === 'withFigma') passesMainFilter = !!(system.figmaKitUrl || system.figmaKit);
    if (filter === 'withMCP') passesMainFilter = system.badges?.some(badge => badge.toLowerCase() === 'mcp-support') || false;
    
    // Then apply community filter if enabled
    if (showCommunityOnly) {
      return passesMainFilter && !!system.contributedBy;
    }
    
    return passesMainFilter;
  });

  // Sort systems: 1. Recommended, 2. Just added, 3. Rest
  const sortedSystems = [...filteredSystems].sort((a, b) => {
    // Helper to check if system has 'new' badge
    const hasNewBadge = (system: DesignSystem) => 
      system.badges?.some(badge => badge.toLowerCase() === 'new') || false;
    
    // Helper to count resources in a card
    const countResources = (system: DesignSystem) => {
      let count = 1; // Main documentation link always present
      count += (system.urls?.length || 0); // Additional URLs
      if (system.figmaKitUrl) count += 1; // Figma kit
      return count;
    };
    
    // Priority 1: Recommended (isEditorsChoice)
    if (a.isEditorsChoice && !b.isEditorsChoice) return -1;
    if (!a.isEditorsChoice && b.isEditorsChoice) return 1;
    
    // Priority 2: Just added (has 'new' badge)
    const aHasNew = hasNewBadge(a);
    const bHasNew = hasNewBadge(b);
    if (aHasNew && !bHasNew) return -1;
    if (!aHasNew && bHasNew) return 1;
    
    // Priority 2.1: If both have 'new' badge, sort by resource count (more resources first)
    if (aHasNew && bHasNew) {
      const aResourceCount = countResources(a);
      const bResourceCount = countResources(b);
      if (aResourceCount !== bResourceCount) {
        return bResourceCount - aResourceCount; // More resources first
      }
    }
    
    // Priority 3: Rest (maintain original order)
    return 0;
  });

  // Check if we need a placeholder (when total items including contribute card is odd)
  const totalItems = sortedSystems.length + 1; // +1 for contribute card
  const needsPlaceholder = totalItems % 2 !== 0;

  // Show loading state while fetching data
  if (cmsLoading) {
    return <LoadingState />;
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="mb-8 sm:mb-16 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pt-8 sm:pt-10">
        <div className="shrink-0">
          <div className="relative">
            {/* Reaction bubble */}
            {showBubble && (
              <div 
                className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white rounded-full shadow-lg border border-blue-200/50 z-10"
                style={{
                  animation: 'bubble-pop 0.3s ease-out'
                }}
              >
                <span className="text-[11px] sm:text-xs font-medium text-gray-700">{currentReaction}</span>
                {/* Speech bubble tail */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"></div>
              </div>
            )}
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200/50 flex items-center justify-center shadow-sm">
              <div className="scale-75 sm:scale-100">
                <PixelCharacter characterIndex={1} />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-blue-500/20 backdrop-blur-sm"></div>
          </div>
        </div>
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <h1 className="text-[2rem] sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 break-words" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            Design Systems with AI
          </h1>
          <p className="text-[1.1rem] sm:text-xl text-gray-600 break-words">
            Curated selection of official Design Systems implementing artificial intelligence features (reviewed 500+ systems)
          </p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            Last updated: <span className="text-gray-500">{formatDate(lastUpdated)}</span>
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-6">
        <div className="inline-flex items-center rounded-lg border border-gray-200/60 bg-white/40 backdrop-blur-sm p-1 shadow-sm overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[13px] sm:text-[12px] transition-all whitespace-nowrap ${ 
              filter === 'all'
                ? 'bg-white text-gray-900 shadow-sm font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="hidden sm:inline">All ({designSystemsData.length})</span>
            <span className="sm:hidden">All</span>
          </button>
          <button
            onClick={() => setFilter('withFigma')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[13px] sm:text-[12px] transition-all flex items-center gap-1 whitespace-nowrap ${ 
              filter === 'withFigma'
                ? 'bg-white text-purple-700 shadow-sm font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Figma className="w-3 h-3" />
            <span className="hidden sm:inline">With Figma kit ({designSystemsData.filter(s => s.figmaKitUrl || s.figmaKit).length})</span>
            <span className="sm:hidden">Figma</span>
          </button>
          <button
            onClick={() => setFilter('withMCP')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[13px] sm:text-[12px] transition-all flex items-center gap-1 whitespace-nowrap ${ 
              filter === 'withMCP'
                ? 'bg-white text-gray-900 shadow-sm font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MCPIcon className="w-3 h-3" />
            <span className="hidden sm:inline">With MCP support ({designSystemsData.filter(s => s.badges?.some(badge => badge.toLowerCase() === 'mcp-support') || false).length})</span>
            <span className="sm:hidden">MCP</span>
          </button>
          
          {/* Divider */}
          <div className="w-px h-6 bg-gray-200/60 mx-1"></div>
          
          {/* Community filter toggle */}
          <button
            onClick={() => setShowCommunityOnly(!showCommunityOnly)}
            className={`px-3 py-1.5 rounded-md text-[12px] transition-all flex items-center gap-2 border ${
              showCommunityOnly
                ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-purple-300 text-gray-900 font-medium shadow-sm'
                : 'bg-white/40 border-gray-200/60 text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {/* Heart icon with AI gradient */}
            <svg 
              className="w-3.5 h-3.5 drop-shadow-sm shrink-0" 
              viewBox="0 0 24 24" 
              fill={showCommunityOnly ? "url(#heart-gradient)" : "none"}
              stroke={showCommunityOnly ? "url(#heart-gradient)" : "currentColor"}
              strokeWidth="1.5"
              style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
              <defs>
                <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
                  <stop offset="50%" style={{ stopColor: '#a855f7' }} />
                  <stop offset="100%" style={{ stopColor: '#ec4899' }} />
                </linearGradient>
              </defs>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="whitespace-nowrap">
              Shared by users ({designSystemsData.filter(s => s.contributedBy).length})
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {sortedSystems.map((system, index) => (
            <div 
              key={system.id || `${system.name}-${index}`}
              className={`p-3 sm:p-4 md:p-6 rounded-lg hover:shadow-md transition-all backdrop-blur-sm relative group min-w-0`}
              style={{
                border: '2px solid transparent',
                backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
            {/* Dashed border overlay on hover */}
            <div 
              className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
            ></div>

            {/* Top section: Logo + Name + Badge */}
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/80 border border-gray-200/40 flex items-center justify-center overflow-hidden shadow-sm">
                  {system.customLogo === 'antdesignx' ? (
                    <AntDesignXIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : system.customLogo ? (
                    <img 
                      src={system.customLogo}
                      alt={`${system.company} logo`}
                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                    />
                  ) : (
                    <img 
                      src={`https://logo.clearbit.com/${system.companyDomain}`}
                      alt={`${system.company} logo`}
                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://www.google.com/s2/favicons?domain=${system.companyDomain}&sz=64`;
                      }}
                    />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-[17px] sm:text-[14px] leading-tight break-words">{system.name}</h3>
                  <p className="text-[14px] sm:text-[12px] text-gray-500 mt-0.5 break-words">{system.company}</p>
                </div>
              </div>

              {/* Badges row - wraps to new line on mobile */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto sm:shrink-0">
                {/* Show "recommended" badge if Editor's Choice */}
                {system.isEditorsChoice && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-normal capitalize text-amber-700 bg-amber-100/70 border border-amber-200/50">
                    recommended
                  </span>
                )}
                {/* Show custom badges from CMS */}
                {system.badges && system.badges.length > 0 && (
                  system.badges.map((badge, badgeIndex: number) => {
                    // Map badge names to display text and colors
                    const getBadgeInfo = (badge: string) => {
                      switch (badge.toLowerCase()) {
                        case 'new':
                          return { text: 'just added', colorClasses: 'text-green-700 bg-green-100/70 border border-green-200/50' };
                        case 'ai-accessibility':
                          return { text: 'ai in accessibility', colorClasses: 'text-orange-700 bg-orange-100/70 border border-orange-200/50' };
                        case 'mcp-support':
                          return { text: 'mcp support', colorClasses: 'text-purple-700 bg-purple-100/70 border border-purple-200/50' };
                        case 'tokens':
                          return { text: 'tokens', colorClasses: 'text-blue-700 bg-blue-100/70 border border-blue-200/50' };
                        default:
                          return { text: badge, colorClasses: 'text-gray-700 bg-gray-100/70 border border-gray-200/50' };
                      }
                    };

                    const badgeInfo = getBadgeInfo(badge);
                    return (
                      <span 
                        key={badgeIndex}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-normal capitalize ${badgeInfo.colorClasses}`}
                      >
                        {badgeInfo.text}
                      </span>
                    );
                  })
                )}
              </div>
            </div>

            {/* Links section: All links visible as pills */}
            <div className="flex flex-col gap-2">
              {/* Main documentation link */}
              <a
                href={system.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/60 hover:bg-white text-gray-900 font-medium text-[13px] sm:text-[13px] transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  border: '1.5px solid transparent',
                  backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundImage = `linear-gradient(white, white), linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(168, 85, 247, 0.6) 50%, rgba(236, 72, 153, 0.6) 100%)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundImage = `linear-gradient(white, white), linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)`;
                }}
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                <span className="truncate">Documentation</span>
                <span className="ml-auto shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-medium border border-blue-200/50">
                  AI
                </span>
              </a>

              {/* Additional URLs */}
              {system.urls && system.urls.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/60 hover:bg-white text-gray-900 font-medium text-[13px] sm:text-[13px] transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    border: '1.5px solid transparent',
                    backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(59, 130, 246, 0.3) 100%)`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage = `linear-gradient(white, white), linear-gradient(135deg, rgba(168, 85, 247, 0.6) 0%, rgba(236, 72, 153, 0.6) 50%, rgba(59, 130, 246, 0.6) 100%)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage = `linear-gradient(white, white), linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(59, 130, 246, 0.3) 100%)`;
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                  <span className="truncate">Related docs</span>
                  <span className="ml-auto shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium border border-purple-200/50">
                    AI
                  </span>
                </a>
              ))}

              {/* Figma kit link */}
              {system.figmaKitUrl ? (
                <a
                  href={system.figmaKitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-purple-200/60 bg-purple-50/60 hover:bg-purple-100 hover:border-purple-300 text-purple-700 hover:text-purple-900 text-[12px] transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Figma className="w-3 h-3" />
                  <span>Figma UI kit</span>
                </a>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-dashed border-gray-200/40 bg-gray-50/30 text-gray-400 text-[12px]">
                  <Figma className="w-3 h-3 opacity-40" />
                  <span>No Figma kit</span>
                </div>
              )}
            </div>
            
            {/* Contributor note */}
            {system.contributedBy && (
              <>
                {/* Divider */}
                <div className="mt-4 mb-3 border-t border-gray-200/60"></div>
                
                <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                  <span 
                    className="inline-flex items-center gap-1.5"
                    style={{
                      background: `linear-gradient(
                        100deg,
                        #ffffaf00 1%,
                        #ffffaf 2.5%,
                        #ffffaf80 5.7%,
                        #ffffaf1a 93%,
                        #ffffafb4 95%,
                        #ffffaf00 98%
                      ),
                      linear-gradient(182deg, #ffffaf00, #ffffaf4d 8%, #ffffaf00 15%)`
                    }}
                  >
                    {/* Hand-drawn heart */}
                    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#e11d48', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    
                    <span>
                      Shared by {system.contributorUrl ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            window.open(system.contributorUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className="font-semibold text-gray-900 hover:text-blue-600 underline decoration-dotted decoration-1 underline-offset-2 transition-colors cursor-pointer bg-transparent border-0 p-0"
                        >
                          {system.contributedBy}
                        </button>
                      ) : (
                        <span className="font-semibold text-gray-900">{system.contributedBy}</span>
                      )}
                    </span>
                  </span>
                </div>
              </>
            )}
            </div>
        ))}

        {/* Contribute Card */}
        <button
          onClick={() => setIsSuggestModalOpen(true)}
          className="p-6 rounded-lg text-left bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 hover:shadow-md transition-all relative overflow-hidden group border-2 border-dashed border-purple-300/60 hover:border-purple-400"
        >
          {/* Animated Contribution Grid (GitHub style) */}
          <div className="absolute inset-6 overflow-hidden pointer-events-none opacity-[0.12] group-hover:opacity-[0.18] transition-opacity duration-500">
            <div className="w-full h-full" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridTemplateRows: 'repeat(6, 1fr)',
              gap: '2px'
            }}>
              {[...Array(72)].map((_, i) => {
                const colorVariants = [
                  'contribution-purple',
                  'contribution-pink',
                  'contribution-blue',
                  'contribution-mixed'
                ];
                const randomVariant = colorVariants[Math.floor(Math.random() * colorVariants.length)];
                const randomDuration = 4 + Math.random() * 4;
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

          <div className="flex items-start justify-between mb-3 relative z-10">
            <div className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-purple-300/60 shadow-sm">
              <Plus className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-purple-700 bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-purple-200">
              <span>Contribute</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <h3 className="font-medium text-gray-900 mb-1 relative z-10 text-[14px]">
            Share and get featured 💜
          </h3>
          
          <p className="text-[12px] text-gray-700 mb-3 relative z-10">
            Contribute resources and your name will be added to our lovely tribute list
          </p>
          
          <div className="flex gap-2 relative z-10">
            <span className="text-[11px] px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-purple-700 border border-purple-200/60 font-medium shadow-sm">
              Community driven
            </span>
          </div>
        </button>

        {/* Placeholder card if total is odd */}
        {needsPlaceholder && (
          <div className="hidden md:block p-6 rounded-lg border-2 border-dashed border-gray-300/40 bg-gray-50/20 relative">
            <div className="flex items-center gap-3 mb-5 opacity-30">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-200/40 border border-gray-300/40"></div>
              <div className="flex-1">
                <div className="h-3.5 bg-gray-200/40 rounded w-32 mb-2"></div>
                <div className="h-2.5 bg-gray-200/40 rounded w-20"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 opacity-30">
              <div className="h-8 bg-gray-200/40 rounded"></div>
              <div className="h-8 bg-gray-200/40 rounded"></div>
              <div className="h-8 bg-gray-200/40 rounded"></div>
            </div>
          </div>
        )}
      </div>

      {/* Suggest Modal */}
      <SuggestModal isOpen={isSuggestModalOpen} onClose={() => setIsSuggestModalOpen(false)} />
    </div>
  );
}