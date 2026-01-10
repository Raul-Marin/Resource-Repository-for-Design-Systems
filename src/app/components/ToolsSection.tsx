import { ExternalLink, Zap, ArrowRight, Plus } from "lucide-react";
import { PixelCharacter } from "./PixelCharacter";
import { SuggestModal } from "./SuggestModal";
import { LoadingState } from "./LoadingState";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Tool {
  id?: string;
  name: string;
  category: string;
  description: string;
  url: string;
  isPaid: boolean;
  domain: string;
  price: string;
  iconUrl?: string; // Custom uploaded icon
  isAuthorPick?: boolean; // NEW: Flag for author's recommendations
  authorNote?: string; // NEW: Personal note from author
  contributedBy?: string; // Name of the contributor
  contributorUrl?: string; // URL to contributor's profile/social
}

export function ToolsSection() {
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showCommunityOnly, setShowCommunityOnly] = useState(false);

  // FORZAR SCROLL AL TOP CUANDO SE MONTA ESTE COMPONENTE
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "January 7, 2026"; // Fallback to current date
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Fetch tools from CMS
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms/tools`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched tools:', data);
        // Log tools with iconUrl for debugging
        data.forEach((tool: Tool) => {
          if (tool.iconUrl) {
            console.log(`${tool.name} has iconUrl:`, tool.iconUrl);
          }
        });
        setTools(data);
        
        // Calculate last updated date
        if (data && data.length > 0) {
          const dates = data
            .map((item: any) => {
              const date = item.updatedAt || item.createdAt;
              return date ? new Date(date) : null;
            })
            .filter((date: Date | null) => date !== null);
          
          if (dates.length > 0) {
            const mostRecent = new Date(Math.max(...dates.map((d: Date) => d.getTime())));
            setLastUpdated(mostRecent);
          }
        }
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showBubble, setShowBubble] = useState(false);
  const [currentReaction, setCurrentReaction] = useState('Zap!');

  const reactions = ['Zap!', 'Bam!', 'Click!', 'Beep!', 'Bzzt!', 'Ding!', 'Ping!', 'Whoosh!'];

  // Calculate categories from tools
  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  // Helper function to get short name for filters
  const getCategoryShortName = (category: string) => {
    switch (category) {
      case "AI Builders & Code Generation":
        return "AI Builders";
      case "Design Systems Management":
        return "Management";
      case "AI Connectors, Agents, MCPs & Skills":
        return "AI Connectors";
      case "Design to Code":
        return "Design to Code";
      case "Design Generation & AI Tools":
        return "Design Gen";
      case "Documentation":
        return "Documentation";
      case "Other Tools":
        return "Other";
      default:
        return category;
    }
  };

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

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  // Apply community filter if enabled
  const finalFilteredTools = showCommunityOnly
    ? filteredTools.filter(tool => tool.contributedBy)
    : filteredTools;

  const displayCategories = selectedCategory === 'all' 
    ? categories 
    : [selectedCategory];

  // Show loading state while fetching data
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="w-full overflow-visible">
      <div className="mb-8 sm:mb-16 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pt-8 sm:pt-10">
        <div className="shrink-0">
          <div className="relative">
            {/* Reaction bubble */}
            {showBubble && (
              <div 
                className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white rounded-full shadow-lg border border-teal-200/50 z-10"
                style={{
                  animation: 'bubble-pop 0.3s ease-out'
                }}
              >
                <span className="text-[11px] sm:text-xs font-medium text-gray-700">{currentReaction}</span>
                {/* Speech bubble tail */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"></div>
              </div>
            )}
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 border border-teal-200/50 flex items-center justify-center shadow-sm">
              <div className="scale-75 sm:scale-100">
                <PixelCharacter characterIndex={0} />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-teal-500/20 backdrop-blur-sm"></div>
          </div>
        </div>
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <h1 className="text-[2rem] sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 break-words" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            AI tools & resources
          </h1>
          <p className="text-[1.1rem] sm:text-xl text-gray-600 break-words">
            Discover cutting-edge tools revolutionizing Design System workflows
          </p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            Last updated: <span className="text-gray-500">{formatDate(lastUpdated)}</span>
          </p>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <div className="inline-flex items-center rounded-lg border border-gray-200/60 bg-white/40 backdrop-blur-sm p-1 shadow-sm flex-wrap gap-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md text-[12px] transition-all ${ 
              selectedCategory === 'all'
                ? 'bg-white text-gray-900 shadow-sm font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({tools.length})
          </button>
          {categories.map((category) => {
            const count = tools.filter(t => t.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-md text-[12px] transition-all ${ 
                  selectedCategory === category
                    ? 'bg-white text-gray-900 shadow-sm font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {getCategoryShortName(category)} ({count})
              </button>
            );
          })}
          
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
              fill={showCommunityOnly ? "url(#heart-gradient-tools)" : "none"}
              stroke={showCommunityOnly ? "url(#heart-gradient-tools)" : "currentColor"}
              strokeWidth="1.5"
              style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
              <defs>
                <linearGradient id="heart-gradient-tools" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
                  <stop offset="50%" style={{ stopColor: '#a855f7' }} />
                  <stop offset="100%" style={{ stopColor: '#ec4899' }} />
                </linearGradient>
              </defs>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="whitespace-nowrap">
              Shared by users ({tools.filter(t => t.contributedBy).length})
            </span>
          </button>
        </div>
      </div>

      {displayCategories.map((category, categoryIndex) => {
        const categoryTools = finalFilteredTools.filter((tool) => tool.category === category);
        const isLastCategory = categoryIndex === displayCategories.length - 1;
        // If it's the last category, we add the contribute card
        const totalItems = isLastCategory ? categoryTools.length + 1 : categoryTools.length;
        const needsPlaceholder = isLastCategory && totalItems % 2 !== 0;

        return (
          <div key={category} className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1 py-1">
              {categoryTools.map((tool, index) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-xl p-5 transition-all backdrop-blur-md group relative hover:scale-[1.02] overflow-hidden ${
                    tool.isAuthorPick
                      ? 'border-2 border-amber-400/70 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/80 hover:border-amber-500 hover:shadow-xl'
                      : 'border border-gray-200/50 bg-white/80 hover:border-purple-300 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-50/60 hover:to-purple-50/60'
                  }`}
                  style={
                    tool.isAuthorPick
                      ? {
                          boxShadow: '0 0 20px rgba(251, 191, 36, 0.15)',
                        }
                      : {}
                  }
                  onClick={(e) => {
                    // On mobile (touch devices), show the overlay on tap for Editor's Choice
                    if (tool.isAuthorPick && 'ontouchstart' in window) {
                      const overlay = e.currentTarget.querySelector('.editor-note-overlay') as HTMLElement;
                      if (overlay) {
                        // Toggle overlay visibility
                        if (overlay.style.opacity === '1') {
                          overlay.style.opacity = '0';
                          overlay.style.pointerEvents = 'none';
                        } else {
                          e.preventDefault();
                          overlay.style.opacity = '1';
                          overlay.style.pointerEvents = 'auto';
                        }
                      }
                    }
                  }}
                >
                  {/* Corner Ribbon - Editor's Choice */}
                  {tool.isAuthorPick && (
                    <>
                      {/* Ribbon */}
                      <div className="absolute -top-0 -right-0 w-32 h-32 overflow-hidden pointer-events-none z-20">
                        <div className="absolute top-6 -right-10 rotate-45 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold py-1.5 px-12 shadow-lg flex items-center justify-center gap-1">
                          <span>⭐</span>
                          <span className="tracking-wide">JAN</span>
                        </div>
                      </div>

                      {/* Editor's Note - Shows on Hover (Desktop) or Tap (Mobile) */}
                      <div className="editor-note-overlay absolute inset-0 bg-white/95 backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center px-6 py-12 sm:py-14 pointer-events-none group-hover:pointer-events-auto">
                        {/* Subtle gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-yellow-50/60 rounded-xl"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center max-w-md h-full justify-center">
                          <p className="text-xs font-semibold text-amber-700 mb-3 tracking-wide uppercase">
                            ⭐ Editor's choice — January
                          </p>
                          <p className="text-xs italic text-gray-700 leading-relaxed text-center">
                            "{tool.authorNote}"
                          </p>
                        </div>
                        
                        {/* Close hint for mobile */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 sm:hidden">
                          Tap again to close
                        </div>
                      </div>
                    </>
                  )}

                  {/* Dashed border overlay on hover */}
                  <div 
                    className="absolute inset-0 rounded-xl border-2 border-dashed opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
                    style={{ borderColor: tool.isAuthorPick ? 'rgba(251, 191, 36, 0.8)' : 'rgba(147, 51, 234, 0.6)' }}
                  ></div>
                  
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden transition-colors ${
                        tool.isAuthorPick 
                          ? 'border-2 border-amber-300/60 group-hover:border-amber-400' 
                          : 'border border-gray-200/60 group-hover:border-purple-300'
                      }`}>
                        {/* Custom SVG icon for UI UX Pro Max */}
                        {tool.name === 'UI UX Pro Max' ? (
                          <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2563EB"></stop>
                                <stop offset="50%" stopColor="#3B82F6"></stop>
                                <stop offset="100%" stopColor="#F97316"></stop>
                              </linearGradient>
                              <linearGradient id="innerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F97316"></stop>
                                <stop offset="100%" stopColor="#2563EB"></stop>
                              </linearGradient>
                            </defs>
                            <circle cx="24" cy="24" r="22" stroke="url(#logoGradient)" strokeWidth="3" fill="none"></circle>
                            <rect x="14" y="14" width="12" height="12" rx="2" fill="url(#logoGradient)" opacity="0.9"></rect>
                            <rect x="18" y="18" width="12" height="12" rx="2" fill="url(#innerGradient)" opacity="0.8"></rect>
                            <rect x="22" y="22" width="12" height="12" rx="2" fill="url(#logoGradient)" opacity="0.9"></rect>
                            <circle cx="36" cy="12" r="2" fill="#F97316"></circle>
                            <circle cx="12" cy="36" r="1.5" fill="#3B82F6"></circle>
                          </svg>
                        ) : (
                          <img 
                            src={tool.iconUrl || `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                            alt={`${tool.name} icon`}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              console.error(`Failed to load icon for ${tool.name}:`, target.src);
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                // Check if fallback already exists
                                if (!parent.querySelector('.icon-fallback')) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'icon-fallback w-4 h-4 rounded bg-gradient-to-br from-purple-100 to-blue-100';
                                  parent.appendChild(fallback);
                                }
                              }
                            }}
                          />
                        )}
                      </div>
                      <h4 className={`font-semibold transition-colors ${
                        tool.isAuthorPick 
                          ? 'text-gray-900 group-hover:text-amber-700' 
                          : 'text-gray-900 group-hover:text-purple-700'
                      }`}>
                        {tool.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[13px] sm:text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                        tool.isAuthorPick
                          ? 'bg-amber-100/80 text-amber-700 group-hover:bg-amber-200/80 group-hover:text-amber-800'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-700'
                      }`}>
                        {tool.price}
                      </span>
                      <ExternalLink className={`w-3.5 h-3.5 transition-colors ${
                        tool.isAuthorPick
                          ? 'text-amber-500 group-hover:text-amber-700'
                          : 'text-gray-400 group-hover:text-purple-600'
                      }`} />
                    </div>
                  </div>
                  <p className={`text-sm ${tool.isAuthorPick ? 'text-gray-700' : 'text-gray-600'}`}>{tool.description}</p>
                  
                  {/* Handwritten Contributor Note */}
                  {tool.contributedBy && (
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
                            Shared by {tool.contributorUrl ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  window.open(tool.contributorUrl, '_blank', 'noopener,noreferrer');
                                }}
                                className="font-semibold text-gray-900 hover:text-blue-600 underline decoration-dotted decoration-1 underline-offset-2 transition-colors cursor-pointer bg-transparent border-0 p-0"
                              >
                                {tool.contributedBy}
                              </button>
                            ) : (
                              <span className="font-semibold text-gray-900">{tool.contributedBy}</span>
                            )}
                          </span>
                        </span>
                      </div>
                    </>
                  )}
                </a>
              ))}

              {/* Contribute Card - only in last category */}
              {isLastCategory && (
                <button
                  onClick={() => setShowSuggestionModal(true)}
                  className="block border-2 border-dashed border-purple-300/60 rounded-xl p-5 hover:border-purple-400 hover:shadow-lg hover:bg-gradient-to-br hover:from-purple-50/60 hover:to-pink-50/60 transition-all bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 group relative overflow-hidden text-left hover:scale-[1.02]"
                >
                  {/* Animated Contribution Grid */}
                  <div className="absolute inset-6 overflow-hidden pointer-events-none opacity-[0.12] group-hover:opacity-[0.18] transition-opacity duration-500">
                    <div className="w-full h-full" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(10, 1fr)',
                      gridTemplateRows: 'repeat(5, 1fr)',
                      gap: '2px'
                    }}>
                      {[...Array(50)].map((_, i) => {
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

                  {/* Dashed border overlay on hover */}
                  <div 
                    className="absolute inset-0 rounded-xl border-2 border-dashed opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
                    style={{ borderColor: 'rgba(147, 51, 234, 0.6)' }}
                  ></div>
                  
                  <div className="flex items-start justify-between mb-2 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/80 border border-purple-300/60 flex items-center justify-center shrink-0 backdrop-blur-sm group-hover:border-purple-400 transition-colors">
                        <Plus className="w-5 h-5 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        Share and get featured 💜
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 relative z-10">
                    Contribute resources and your name will be added to our lovely tribute list
                  </p>
                </button>
              )}

              {/* Placeholder card if needed */}
              {needsPlaceholder && (
                <div className="hidden md:block border-2 border-dashed border-gray-300/40 rounded-xl p-5 bg-gray-50/20 relative">
                  <div className="flex items-start justify-between mb-2 opacity-30">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200/40 rounded"></div>
                      <div className="h-4 bg-gray-200/40 rounded w-24"></div>
                    </div>
                    <div className="w-3.5 h-3.5 bg-gray-200/40 rounded"></div>
                  </div>
                  <div className="h-3 bg-gray-200/40 rounded w-full opacity-30"></div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <SuggestModal isOpen={showSuggestionModal} onClose={() => setShowSuggestionModal(false)} />
    </div>
  );
}