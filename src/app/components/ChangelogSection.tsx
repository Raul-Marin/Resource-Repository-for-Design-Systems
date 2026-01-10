import { useState } from 'react';
import { SuggestModal } from './SuggestModal';

export function ChangelogSection() {
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  
  const changelog = [
    {
      version: "2.2.0",
      date: "January 7, 2026",
      type: "Bug fixes & polish",
      sections: [
        {
          title: "Technical improvements",
          items: [
            { text: "Fixed custom cursor display on interactive elements and buttons", type: "fixed" },
            { text: "Optimized cursor CSS rules for better performance and consistency", type: "improved" },
            { text: "Enhanced contribution cards display with updated layout", type: "improved" }
          ]
        },
        {
          title: "Content updates",
          items: [
            { text: "Updated Contributors markdown in Machine View with accurate content from live page", type: "improved" },
            { text: "Added new resources from community contributions to Tools section", type: "added" },
            { text: "Added new Design Systems from community submissions", type: "added" },
            { text: "Refined tags and categories for better resource organization", type: "improved" }
          ]
        }
      ]
    },
    {
      version: "2.1.0",
      date: "January 6, 2026",
      type: "Feature & content update",
      sections: [
        {
          title: "Technical improvements",
          items: [
            { text: "Implemented unified LoadingState component with skeleton preview for all CMS sections", type: "added" },
            { text: "Updated MachineView to load real-time data from CMS for all sections", type: "improved" },
            { text: "Dynamic markdown generation for Design Systems, Tools, Jobs, and Readings in Machine Mode", type: "added" },
            { text: "Real-time statistics in Home section based on current database content", type: "improved" }
          ]
        },
        {
          title: "Content additions - AI connectors",
          items: [
            { text: "Created new AI Connectors category in Tools section", type: "added" },
            { text: "Added zeroheight MCP to AI Connectors (Model Context Protocol server for design systems documentation)", type: "added" },
            { text: "Added Figma MCP Server to AI Connectors (Model Context Protocol server for Figma)", type: "added" },
            { text: "Added Sketch MCP Server to AI Connectors (AI workflows integration with Sketch)", type: "added" },
            { text: "Added Penpot MCP Server to AI Connectors (Open-source design platform AI connection)", type: "added" },
            { text: "Added Storybook MCP Addon to AI Connectors (Component documentation enhancement)", type: "added" },
            { text: "Added Cristian Morales' Figma Plugin to AI Connectors (Cursor AI integration for Figma)", type: "added" },
            { text: "Added Cristian Morales' Cursor Skills to AI Connectors (Design System automation workflows)", type: "added" }
          ]
        }
      ]
    },
    {
      version: "2.0.0",
      date: "January 5, 2026",
      type: "Major feature",
      sections: [
        {
          title: "Technical improvements",
          items: [
            { text: "Built enterprise-grade CMS with hidden admin panel accessible via direct URL with password authentication", type: "added" },
            { text: "Implemented full CRUD operations powered by Supabase KV Store with real-time data synchronization", type: "added" },
            { text: "Created advanced pagination system with 10/20 records per page, Previous/Next navigation, and clickable page numbers", type: "added" },
            { text: "Developed intelligent image upload system with Supabase Storage integration and automatic fallback handling", type: "added" },
            { text: "Migrated all resource data from static arrays to dynamic database with seamless backwards compatibility", type: "improved" }
          ]
        },
        {
          title: "Content additions",
          items: [
            { text: "Added Composio to Tools (Integration platform for AI agents)", type: "added" },
            { text: "Added UI UX Pro Max to Tools (Design recommendations database)", type: "added" }
          ]
        }
      ]
    },
    {
      version: "1.0.0",
      name: "Elisa",
      date: "January 4, 2026",
      type: "Major release",
      sections: [
        {
          title: "Technical improvements",
          items: [
            { text: "Launched full production version with Supabase backend integration", type: "added" },
            { text: "Live resource submission system with community contributions", type: "added" },
            { text: "Contributors section with animated ball pool and pixel characters", type: "added" },
            { text: "Custom sparkle iconography for all six main sections with AI branding", type: "added" },
            { text: "Contributors promoted to main navigation with improved visibility", type: "added" },
            { text: "Dev Mode padding hover effect on contribution cards", type: "improved" },
            { text: "Optimized modal forms with header/footer separation and mobile support", type: "improved" }
          ]
        },
        {
          title: "Content additions",
          items: [
            { text: "Complete collection of 95+ curated resources across Design Systems (19+), Tools (45+), Jobs (9+), and Readings (23+)", type: "added" },
            { text: "Added Vibe Design System (Monday) with MCP support", type: "added" },
            { text: "Added Blade Design System (Razorpay) with MCP support", type: "added" },
            { text: "Added Seeds Design System (SproutSocial) with MCP server", type: "added" }
          ]
        }
      ]
    },
    {
      version: "0.3.0",
      date: "January 3, 2026",
      type: "Polish & refinements",
      items: [
        { text: "Updated footer with Figma Make icon and branding", type: "improved" },
        { text: "Removed changelog button from footer for cleaner layout", type: "removed" },
        { text: "Added animated counters to hero pills with smooth deceleration effect", type: "added" },
        { text: "Refined AI Era gradient in hero with softer colors and reduced filters", type: "improved" },
        { text: "Expanded tools directory with AI-powered design utilities", type: "added" }
      ]
    },
    {
      version: "0.2.0",
      date: "January 2, 2026",
      type: "Improvements",
      items: [
        { text: "Added GitHub-style contribution activity grid to changelog", type: "added" },
        { text: "Enhanced card 5 with animated contribution grid effect", type: "improved" },
        { text: "Improved visual consistency across all sections", type: "improved" },
        { text: "Optimized CSS variables architecture for better maintainability", type: "improved" },
        { text: "Implemented responsive breakpoints using design system tokens", type: "added" }
      ]
    },
    {
      version: "0.1.0",
      date: "January 1, 2026",
      type: "Initial setup",
      items: [
        { text: "Initial launch of AI Design Systems repository with minimalist Figma-style design", type: "added" },
        { text: "Four main sections implemented: Design Systems, Tools, Jobs, and Readings", type: "added" },
        { text: "Built with CSS variables for colors, spacing, borders, radius, and typography using Google Sans font", type: "added" },
        { text: "Cloud Dancer background (#f0ede8) with decorative dot grid", type: "added" },
        { text: "Fluid shader background with AI colors (blue, purple, pink)", type: "added" },
        { text: "Sidebar navigation with dev mode controls", type: "added" },
        { text: "React + TypeScript architecture with component-based structure", type: "added" },
        { text: "Initial Design Systems collection: Ant Design, Carbon, Atlassian, Vercel", type: "added" }
      ]
    }
  ];

  // Generate real contribution data for the entire year 2026
  const generateContributionData = () => {
    const contributions: { date: string; count: number; level: number; month: string; dayName: string }[] = [];
    const startDate = new Date('2026-01-01');
    const endDate = new Date('2026-12-31');
    const today = new Date('2026-01-05');
    
    // Get the day of week for Jan 1, adjusted so Monday = 0
    const startDayOfWeek = startDate.getDay(); // 0 = Sunday, 4 = Thursday for Jan 1, 2026
    const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // Convert to Monday = 0
    
    // Add empty cells before Jan 1 to align the first week properly (Monday start)
    for (let i = 0; i < adjustedStartDay; i++) {
      contributions.push({
        date: '',
        count: 0,
        level: 0,
        month: '',
        dayName: ''
      });
    }
    
    // Generate all days of 2026
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const monthName = currentDate.toLocaleDateString('en-US', { month: 'short' });
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      
      let count = 0;
      let level = 0;
      
      // Check if it's a working day
      if (dateStr === '2026-01-02') {
        count = 12;
        level = 4;
      } else if (dateStr === '2026-01-03') {
        count = 8;
        level = 4;
      } else if (dateStr === '2026-01-04') {
        count = 6;
        level = 3;
      } else if (dateStr === '2026-01-05') {
        count = 10;
        level = 4;
      } else if (dateStr === '2026-01-06') {
        count = 9;
        level = 4;
      } else if (dateStr === '2026-01-07') {
        count = 7;
        level = 3;
      }
      // All other days (past without work and future) have count = 0, level = 0
      
      contributions.push({
        date: dateStr,
        count: count,
        level: level,
        month: monthName,
        dayName: dayName
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return contributions;
  };

  const contributionData = generateContributionData();
  
  // Group by weeks for display
  const weeks: typeof contributionData[][] = [];
  for (let i = 0; i < contributionData.length; i += 7) {
    weeks.push(contributionData.slice(i, i + 7));
  }
  
  // Get month labels - show month name for the first week where each month appears
  const monthLabels: { weekIndex: number; month: string }[] = [];
  let lastMonth = '';
  weeks.forEach((week, weekIndex) => {
    const firstDayWithDate = week.find(day => day.date);
    if (firstDayWithDate && firstDayWithDate.month && firstDayWithDate.month !== lastMonth) {
      monthLabels.push({ weekIndex, month: firstDayWithDate.month });
      lastMonth = firstDayWithDate.month;
    }
  });

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'rgba(168, 85, 247, 0.08)';
      case 1: return 'rgba(168, 85, 247, 0.25)';
      case 2: return 'rgba(168, 85, 247, 0.45)';
      case 3: return 'rgba(168, 85, 247, 0.65)';
      case 4: return 'rgba(168, 85, 247, 0.85)';
      default: return 'rgba(168, 85, 247, 0.08)';
    }
  };

  const getItemStyle = (type: string) => {
    switch (type) {
      case 'added':
        return {
          icon: '+',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200'
        };
      case 'improved':
        return {
          icon: '↑',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200'
        };
      case 'fixed':
        return {
          icon: '✓',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          borderColor: 'border-purple-200'
        };
      default:
        return {
          icon: '•',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200'
        };
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-8 sm:mb-16 pt-8 sm:pt-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 break-words" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Changelog
        </h1>
        
        <p className="text-base sm:text-xl text-gray-600 max-w-3xl mb-6 sm:mb-8 break-words">
          Track all updates, new features, and improvements to the AI Design Systems repository.
        </p>

        {/* Contribution Activity - hidden on mobile */}
        <div className="hidden sm:block mb-12" style={{ overflow: 'visible' }}>
          <div className="flex items-center gap-8 mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              Resource contribution activity
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: getLevelColor(level) }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Contribution Grid */}
          <div className="pb-2 mb-3" style={{ overflowX: 'auto', overflowY: 'visible' }}>
            {/* Month labels row */}
            <div className="flex gap-[3px] mb-2 pl-12" style={{ position: 'relative', minHeight: '16px' }}>
              <div className="inline-flex gap-[3px]" style={{ position: 'relative' }}>
                {monthLabels.map((label, idx) => (
                  <div 
                    key={idx} 
                    className="text-xs text-gray-500" 
                    style={{ 
                      fontSize: '10px',
                      position: 'absolute',
                      left: `${label.weekIndex * 14}px`,
                      top: 0
                    }}
                  >
                    {label.month}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid with day labels */}
            <div className="flex gap-[3px]" style={{ overflow: 'visible', paddingTop: '24px' }}>
              {/* Day of week labels */}
              <div className="flex flex-col gap-[3px] pr-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="h-[11px] text-xs text-gray-500 flex items-center justify-end" style={{ fontSize: '10px', width: '28px' }}>
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Grid */}
              <div className="inline-flex gap-[3px]" style={{ overflow: 'visible' }}>
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]" style={{ overflow: 'visible' }}>
                    {week.map((day, dayIndex) => {
                      const isEmpty = !day.date;
                      const isFuture = day.date && new Date(day.date) > new Date('2026-01-03');
                      // Adjust tooltip position for weeks near the start to prevent cutoff
                      const isNearStart = weekIndex < 4;
                      
                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className="w-[11px] h-[11px] rounded-sm transition-all hover:ring-2 hover:ring-purple-400 hover:ring-offset-1 cursor-pointer group relative"
                          style={{ 
                            backgroundColor: isEmpty ? 'transparent' : getLevelColor(day.level),
                            zIndex: 1,
                            overflow: 'visible'
                          }}
                          title={day.date ? `${day.count} resources on ${day.date}` : ''}
                        >
                          {/* Tooltip - only for real dates */}
                          {day.date && (
                            <div 
                              className={`absolute bottom-full mb-2 hidden group-hover:block pointer-events-none ${
                                isNearStart ? 'left-0' : 'left-1/2 -translate-x-1/2'
                              }`}
                              style={{ zIndex: 9999 }}
                            >
                              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                                <div className="font-semibold">
                                  {day.count > 0 ? `${day.count} resources` : (isFuture ? 'No contributions yet' : '0 resources')}
                                </div>
                                <div className="text-gray-300">
                                  {new Date(day.date).toLocaleDateString('en-US', { 
                                    weekday: 'short',
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </div>
                                {!isNearStart && (
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                                )}
                                {isNearStart && (
                                  <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="flex items-center gap-6 text-xs text-gray-500 pl-12">
            <div>
              <span className="font-semibold text-gray-900">
                {contributionData.reduce((sum, day) => sum + day.count, 0)}
              </span>
              {' '}contributions in 2026
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                {contributionData.filter(day => day.count > 0).length}
              </span>
              {' '}active days
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                {Math.max(...contributionData.map(d => d.count))}
              </span>
              {' '}max in a day
            </div>
            <div className="text-gray-400">
              Started January 2, 2026
            </div>
          </div>
        </div>
      </div>

      {/* Changelog List */}
      <div className="space-y-8 sm:space-y-12">
        {changelog.map((release) => (
          <div key={release.version}>
            {/* Release Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-baseline gap-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {release.version}
                </h2>
                {release.name && (
                  <span className="text-base sm:text-lg text-gray-500 italic">
                    "{release.name}"
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {release.date}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 w-fit">
                {release.type}
              </span>
            </div>

            {/* Release Items */}
            <ul className="space-y-1.5">
              {release.sections ? (
                release.sections.map((section, sectionIndex) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 mt-4">{section.title}</h3>
                    <ul className="space-y-1.5">
                      {section.items.map((item, index) => {
                        const itemStyle = getItemStyle(item.type);
                        return (
                          <li key={index} className="flex items-start gap-2.5">
                            <span 
                              className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-semibold mt-0.5 shrink-0 ${itemStyle.bgColor} ${itemStyle.textColor} ${itemStyle.borderColor} border`}
                            >
                              {itemStyle.icon}
                            </span>
                            <span className="text-gray-700 leading-relaxed flex-1 break-words">{item.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              ) : (
                release.items.map((item, index) => {
                  const itemStyle = getItemStyle(item.type);
                  return (
                    <li key={index} className="flex items-start gap-2.5">
                      <span 
                        className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-semibold mt-0.5 shrink-0 ${itemStyle.bgColor} ${itemStyle.textColor} ${itemStyle.borderColor} border`}
                      >
                        {itemStyle.icon}
                      </span>
                      <span className="text-gray-700 leading-relaxed flex-1 break-words">{item.text}</span>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        ))}
      </div>

      <SuggestModal isOpen={isSuggestModalOpen} onClose={() => setIsSuggestModalOpen(false)} />
    </div>
  );
}