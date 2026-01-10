import { ExternalLink, MapPin, Building2, Clock, ArrowRight } from "lucide-react";
import { PixelCharacter } from "./PixelCharacter";
import { SuggestModal } from "./SuggestModal";
import { LoadingState } from "./LoadingState";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedDate?: string;
  description?: string;
  url: string;
  skills?: string[];
  contributedBy?: string; // Name of the contributor
  contributorUrl?: string; // URL to contributor's profile/social
}

// Helper function to convert posted date to days for sorting
function parseDateToDays(dateStr: string): number {
  const match = dateStr.match(/(\d+)\s+(day|week)/);
  if (!match) return 0;
  const value = parseInt(match[1]);
  const unit = match[2];
  return unit === 'week' ? value * 7 : value;
}

type SortOrder = 'newest' | 'oldest';

export function JobsSection() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [showBubble, setShowBubble] = useState(false);
  const [currentReaction, setCurrentReaction] = useState('Yess!');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showCommunityOnly, setShowCommunityOnly] = useState(false);

  const reactions = ['Yess!', 'Score!', 'Win!', 'Yeah!', 'Woo!', 'Yes!', 'Tada!', 'Boom!'];

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "January 7, 2026"; // Fallback to current date
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Load jobs from CMS
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;
        const response = await fetch(`${API_URL}/jobs`, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
          
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
        }
      } catch (err) {
        console.error("Error loading jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

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

  // Sort jobs based on selected order
  const sortedJobs = [...jobs].sort((a, b) => {
    const daysA = parseDateToDays(a.postedDate || '');
    const daysB = parseDateToDays(b.postedDate || '');
    return sortOrder === 'newest' ? daysA - daysB : daysB - daysA;
  });

  // Apply community filter if enabled
  const finalJobs = showCommunityOnly
    ? sortedJobs.filter(job => job.contributedBy)
    : sortedJobs;

  // Show loading state while fetching data
  if (isLoading) {
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
                className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white rounded-full shadow-lg border border-violet-200/50 z-10"
                style={{
                  animation: 'bubble-pop 0.3s ease-out'
                }}
              >
                <span className="text-[11px] sm:text-xs font-medium text-gray-700">{currentReaction}</span>
                {/* Speech bubble tail */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"></div>
              </div>
            )}
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200/50 flex items-center justify-center shadow-sm">
              <div className="scale-75 sm:scale-100">
                <PixelCharacter characterIndex={2} />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-violet-500/20 backdrop-blur-sm"></div>
          </div>
        </div>
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <h1 className="text-[2rem] sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 break-words" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            Job opportunities
          </h1>
          <p className="text-[1.1rem] sm:text-xl text-gray-600 break-words">
            Design Systems roles that require AI knowledge and experience
          </p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            Last updated: <span className="text-gray-500">{formatDate(lastUpdated)}</span>
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 inline-flex items-center rounded-lg border border-gray-200/60 bg-white/40 backdrop-blur-sm p-1 shadow-sm flex-wrap gap-1">
        <button
          onClick={() => setSortOrder('newest')}
          className={`px-3 py-1.5 rounded-md text-[12px] transition-all ${ 
            sortOrder === 'newest'
              ? 'bg-white text-gray-900 shadow-sm font-medium'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Newest
        </button>
        <button
          onClick={() => setSortOrder('oldest')}
          className={`px-3 py-1.5 rounded-md text-[12px] transition-all ${ 
            sortOrder === 'oldest'
              ? 'bg-white text-gray-900 shadow-sm font-medium'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Oldest
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
            fill={showCommunityOnly ? "url(#heart-gradient-jobs)" : "none"}
            stroke={showCommunityOnly ? "url(#heart-gradient-jobs)" : "currentColor"}
            strokeWidth="1.5"
            style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
          >
            <defs>
              <linearGradient id="heart-gradient-jobs" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
                <stop offset="50%" style={{ stopColor: '#a855f7' }} />
                <stop offset="100%" style={{ stopColor: '#ec4899' }} />
              </linearGradient>
            </defs>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="whitespace-nowrap">
            Shared by users ({jobs.filter(j => j.contributedBy).length})
          </span>
        </button>
      </div>

      <div className="space-y-4">
        {finalJobs.map((job, index) => (
          <div
            key={index}
            className="border border-gray-200/50 rounded-xl p-6 hover:border-blue-200 transition-all bg-white/80 backdrop-blur-sm hover:shadow-md group relative"
          >
            {/* Dashed border overlay on hover */}
            <div 
              className="absolute inset-0 rounded-xl border-2 border-dashed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
            ></div>
            
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-[1.05rem] sm:text-base font-semibold text-gray-900 mb-1">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-[0.95rem] sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    {job.postedDate}
                  </div>
                </div>
              </div>
              <span className="text-[0.8rem] sm:text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 whitespace-nowrap">
                {job.type}
              </span>
            </div>

            {/* Description - hidden on mobile */}
            <p className="hidden sm:block text-sm text-gray-600 mb-4">{job.description}</p>

            {/* Skills - hidden on mobile */}
            <div className="hidden sm:block mb-4">
              <div className="flex flex-wrap gap-2">
                {job.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-50/80 to-purple-50/80 text-xs text-gray-700 border border-blue-100/50 backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Job Posting
            </a>
            
            {/* Handwritten Contributor Note */}
            {job.contributedBy && (
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
                        #ffffaf4d 95%,
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
                      Shared by {job.contributorUrl ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            window.open(job.contributorUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className="font-semibold text-gray-900 hover:text-blue-600 underline decoration-dotted decoration-1 underline-offset-2 transition-colors cursor-pointer bg-transparent border-0 p-0"
                        >
                          {job.contributedBy}
                        </button>
                      ) : (
                        <span className="font-semibold text-gray-900">{job.contributedBy}</span>
                      )}
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Contribute Card - matching job card style */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-full border-2 border-dashed border-purple-300/60 rounded-xl p-6 hover:border-purple-400 hover:shadow-md transition-all bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 group relative overflow-hidden text-left"
        >
          {/* Animated Contribution Grid */}
          <div className="absolute inset-6 overflow-hidden pointer-events-none opacity-[0.12] group-hover:opacity-[0.18] transition-opacity duration-500">
            <div className="w-full h-full" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              gap: '2px'
            }}>
              {[...Array(48)].map((_, i) => {
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
            <div className="flex-1">
              <h3 className="text-[1.05rem] sm:text-base font-semibold text-gray-900 mb-1">Share and get featured 💜</h3>
              <div className="flex flex-wrap items-center gap-4 text-[0.95rem] sm:text-sm text-gray-700">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  Your company
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  Anywhere
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  Now
                </div>
              </div>
            </div>
            <span className="text-[0.8rem] sm:text-xs px-2.5 py-1 rounded-full bg-purple-100/80 text-purple-700 border border-purple-200/60 whitespace-nowrap">
              Contribute
            </span>
          </div>

          {/* Description - hidden on mobile */}
          <p className="hidden sm:block text-sm text-gray-600 mb-4 relative z-10">
            Contribute resources and your name will be added to our lovely tribute list
          </p>

          {/* Skills - hidden on mobile */}
          <div className="hidden sm:block mb-4 relative z-10">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/80 text-xs text-purple-700 border border-purple-200/60 backdrop-blur-sm">
                Community driven
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 text-sm text-purple-700 font-medium relative z-10">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            Suggest a job opening
          </div>
        </button>
      </div>

      <SuggestModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}