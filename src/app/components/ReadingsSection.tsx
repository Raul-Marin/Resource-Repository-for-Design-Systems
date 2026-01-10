import { BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import { PixelCharacter } from "./PixelCharacter";
import { SuggestModal } from "./SuggestModal";
import { LoadingState } from "./LoadingState";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import whereAISitImage from "figma:asset/2e75686357003a8fd4923c1cd2b9f08f31b6da8f.png";
import agentUserImage from "figma:asset/142008f0e6f0f261c30026c5a088d3df7598c02f.png";
import thoughtsImage from "figma:asset/4f88c951adbe92542c767cef6956283f649e9c88.png";
import predictions2026Image from "figma:asset/3fd8b97aa234485909241016d4604edfce731d2b.png";
import figmaMCPImage from "figma:asset/9ceeee2add653cbbba2c2c5c0ccaec67f1eb993c.png";
import carbonChatImage from "figma:asset/bf40117213baa730ef05cbb9abd8072cab34b9ce.png";
import generativeUXImage from "figma:asset/c0115a188c4e83718c72be9f930e0bcf0abd6fc8.png";
import aiPrototypingImage from "figma:asset/9ad05ade371ffb355e7aac8a25a911aeab1ec0db.png";
import vibeCodingImage from "figma:asset/d10234976b90a8a6915cee3f5adeb0bbd5242b78.png";
import haxGuidelinesImage from "figma:asset/e4799633c6ea5292a374f3d5c0fb51e54298dbb2.png";
import harvestMCPImage from "figma:asset/b0c0060f046d4026b5ced94358804503701555af.png";
import peoplePlusAIImage from "figma:asset/d8e14eb5b138e02fac45571486d3e83187b042ff.png";
import whenDSLearnImage from "figma:asset/51a4c46300a5c0ee25c3be93e3162c550b9dec73.png";
import designSystemsIndexImage from "figma:asset/1ad4e6df1fd931f168b6b03cfa9c83d8f579ae3a.png";
import musicForInterfacesImage from "figma:asset/139fe0cf4c80dee46629c4ae462163d31cee9613.png";
import webDyingImage from "figma:asset/8986f8745d510ad2da0b64bd6b801e4c0c55566e.png";
import copilotMobileImage from "figma:asset/f93bfb159674cf9575df829212e08916ee9b84d6.png";
import yeseniaOutputImage from "figma:asset/0086e47ea635542f99bfa959b4f7d2a78f0542b4.png";
import responsibleAIImage from "figma:asset/5b547af744a22ad5bc24878f85ade647a4404d12.png";
import designShapersImage from "figma:asset/cd89b8402cb42d1c779cab73f6660cfdbaadc3d8.png";
import dsAutomationImage from "figma:asset/c6b969c97c5709e1607deefb606fefdccc4999a0.png";
import dearLLMImage from "figma:asset/5e0e608b13ef06f00c71150b8e092bb197ccf2c2.png";
import howWeDocumentImage from "figma:asset/89f7e02351cc52cfde78abc3c0f57bafc7d37c91.png";
import designAIAgeImage from "figma:asset/c9741cdf1b746d0eb9a020296cb0c63ad4443f8f.png";
import vibeCodingCursorImage from "figma:asset/dca8ae2d5e5c015216efda39806d6daa0e13f07e.png";

interface Reading {
  title: string;
  author: string;
  source: string;
  type: "Article" | "Book" | "Paper" | "Guide" | "Video" | "Community";
  description: string;
  url: string;
  tags: string[];
  image?: string; // Optional image URL
  cardSize?: "compact" | "standard" | "featured"; // Card size variant
  aspectRatio?: string; // Custom aspect ratio
  contributedBy?: string; // Name of the contributor
  contributorUrl?: string; // URL to contributor's profile/social
}

const readings: Reading[] = [
  {
    title: "Where should AI sit in your UI?",
    author: "Yoav Lavi",
    source: "UX Collective",
    type: "Article",
    description: "Exploring strategic placement and integration of AI features within user interfaces for optimal user experience.",
    url: "https://uxdesign.cc/where-should-ai-sit-in-your-ui-1710a258390e",
    tags: ["AI", "UI Design", "UX"],
    image: whereAISitImage,
    cardSize: "featured",
    aspectRatio: "2/1"
  },
  {
    title: "Announcing the Carbon AI Chat v1 release",
    author: "IBM Carbon",
    source: "Medium",
    type: "Article",
    description: "IBM Carbon Design System announces their AI chat component and patterns for integrating conversational AI.",
    url: "https://medium.com/carbondesign/announcing-the-carbon-ai-chat-v1-release-ce5f5b2fbab3",
    tags: ["IBM Carbon", "AI Chat", "Components"],
    image: carbonChatImage,
    cardSize: "standard",
    aspectRatio: "16/9"
  },
  {
    title: "Vibe coding and beyond",
    author: "Red Hat PatternFly",
    source: "Medium",
    type: "Article",
    description: "Exploring vibe coding and the future of design systems at Red Hat with AI-powered workflows.",
    url: "https://medium.com/patternfly/vibe-coding-and-beyond-b4bc80b7a74f",
    tags: ["Red Hat", "Vibe Coding", "AI"],
    image: vibeCodingImage,
    cardSize: "compact",
    aspectRatio: "4/3"
  },
  {
    title: "People + AI Guidebook",
    author: "Google PAIR",
    source: "Google",
    type: "Guide",
    description: "Google's comprehensive guide to designing human-centered AI experiences and products.",
    url: "https://pair.withgoogle.com/guidebook/",
    tags: ["Google", "AI Guidelines", "UX"],
    image: peoplePlusAIImage,
    cardSize: "featured",
    aspectRatio: "3/2"
  },
  {
    title: "The new Microsoft 365 Copilot mobile experience",
    author: "Microsoft Design",
    source: "Microsoft",
    type: "Article",
    description: "Microsoft's approach to designing AI-powered mobile experiences with Copilot integration.",
    url: "https://microsoft.design/articles/the-new-microsoft-365-copilot-mobile-experience/",
    tags: ["Microsoft", "Copilot", "Mobile"],
    image: copilotMobileImage,
    cardSize: "standard",
    aspectRatio: "1/1"
  },
  {
    title: "Your next design system user is an agent",
    author: "Murphy Trueman",
    source: "Blog",
    type: "Article",
    description: "Exploring how AI agents will become primary consumers of design systems and what that means for the future.",
    url: "https://blog.murphytrueman.com/p/your-next-design-system-user",
    tags: ["AI Agents", "Future", "Design Systems"],
    image: agentUserImage,
    cardSize: "featured",
    aspectRatio: "2/1"
  },
  {
    title: "Responsible AI practices",
    author: "Google AI",
    source: "Google",
    type: "Guide",
    description: "Google's framework for building responsible AI systems with ethical considerations and best practices.",
    url: "https://ai.google.dev/responsible",
    tags: ["Google", "Responsible AI", "Ethics"],
    image: responsibleAIImage,
    cardSize: "standard",
    aspectRatio: "4/3"
  },
  {
    title: "My 2026 predictions for designers and Design Systems",
    author: "Design System Diaries",
    source: "Substack",
    type: "Article",
    description: "Predictions and insights for the future of design and design systems in the age of AI.",
    url: "https://designsystemdiaries.com/p/my-2026-predictions-for-designers-and-design-systems",
    tags: ["Predictions", "Future", "AI"],
    image: predictions2026Image,
    cardSize: "compact",
    aspectRatio: "16/9"
  },
  {
    title: "Exploring generative AI UX patterns: defining the rules of interaction",
    author: "Applied Innovation Exchange",
    source: "Medium",
    type: "Article",
    description: "A comprehensive exploration of UX patterns emerging from generative AI interactions and how to define clear rules for AI-human interaction design.",
    url: "https://blog.appliedinnovationexchange.com/exploring-generative-ai-ux-patterns-defining-the-rules-of-interaction-a6d5aeb80d3b",
    tags: ["AI Patterns", "UX", "Generative AI"],
    image: generativeUXImage,
    cardSize: "standard",
    aspectRatio: "3/2"
  },
  {
    title: "AI & Design Systems",
    author: "Southleft",
    source: "Blog",
    type: "Article",
    description: "Exploring the intersection of artificial intelligence and design system methodologies.",
    url: "https://southleft.com/ai-design-systems/",
    tags: ["AI", "Design Systems", "Strategy"],
    image: harvestMCPImage,
    cardSize: "compact",
    aspectRatio: "16/9"
  },
  {
    title: "When Design Systems learn",
    author: "Music for Interfaces",
    source: "Medium",
    type: "Article",
    description: "A reflection on the future of design systems when they incorporate machine learning capabilities.",
    url: "https://medium.com/music-for-interfaces/cuando-los-design-systems-aprendan-3e3cb8d87034",
    tags: ["Machine Learning", "Future", "Design Systems"],
    image: whenDSLearnImage,
    cardSize: "standard",
    aspectRatio: "16/9"
  },
  {
    title: "Is the web dying?",
    author: "Amaya Eguizabal",
    source: "Medium",
    type: "Article",
    description: "Critical analysis of the current state and future of the web in the age of artificial intelligence.",
    url: "https://medium.com/@amayaeguizabal/la-web-est%C3%A1-muriendo-cf47ae81268c",
    tags: ["Web", "AI Impact", "Future"],
    image: webDyingImage,
    cardSize: "compact",
    aspectRatio: "4/3"
  },
  {
    title: "When the output becomes the material",
    author: "Yesenia Perez-Cruz",
    source: "Substack",
    type: "Article",
    description: "Reflections on how AI-generated content is becoming the raw material for design and creative work.",
    url: "https://yeseniaperezcruz.substack.com/p/when-the-output-becomes-the-material",
    tags: ["AI Output", "Creative Process", "Design"],
    image: yeseniaOutputImage,
    cardSize: "standard",
    aspectRatio: "2/1"
  },
  {
    title: "Thoughts on AI and Design",
    author: "Cristian Morales",
    source: "giorris.dev",
    type: "Article",
    description: "Personal perspectives and insights on the impact of AI on design practice and systems.",
    url: "https://www.giorris.dev/thoughts",
    tags: ["AI", "Design", "Thoughts"],
    image: thoughtsImage,
    cardSize: "compact",
    aspectRatio: "3/2"
  },
  {
    title: "Design Systems, AI, and MCP",
    author: "Figma",
    source: "Figma Blog",
    type: "Article",
    description: "Figma's vision for integrating AI and Model Context Protocol into design system workflows.",
    url: "https://www.figma.com/blog/design-systems-ai-mcp/",
    tags: ["Figma", "MCP", "AI Integration"],
    image: figmaMCPImage,
    cardSize: "featured",
    aspectRatio: "16/9"
  },
  {
    title: "AI-powered prototyping with Design Systems",
    author: "Vercel",
    source: "Vercel Blog",
    type: "Article",
    description: "How Vercel leverages AI to accelerate prototyping workflows using design system components.",
    url: "https://vercel.com/blog/ai-powered-prototyping-with-design-systems",
    tags: ["Vercel", "Prototyping", "AI"],
    image: aiPrototypingImage,
    cardSize: "standard",
    aspectRatio: "4/3"
  },
  {
    title: "HAX Toolkit AI Guidelines",
    author: "Microsoft",
    source: "Microsoft",
    type: "Guide",
    description: "Microsoft's Human-AI eXperiences Toolkit with comprehensive guidelines for designing AI experiences.",
    url: "https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/",
    tags: ["Microsoft", "HAX", "Guidelines"],
    image: haxGuidelinesImage,
    cardSize: "featured",
    aspectRatio: "3/2"
  },
  {
    title: "Design System Repository",
    author: "Ruben Ferreira Duarte",
    source: "Notion",
    type: "Guide",
    description: "A curated repository of design system resources, tools, and best practices for modern teams.",
    url: "https://rubenferreiraduarte.notion.site/4d6689eec17a46bc84ecfedbd7c85220?v=0260afd5987042bf809d8229d6f7e34b",
    tags: ["Repository", "Resources", "Design Systems"],
    image: designSystemsIndexImage,
    cardSize: "standard",
    aspectRatio: "3/2"
  },
  {
    title: "Music for Interfaces",
    author: "Music for Interfaces",
    source: "Medium",
    type: "Article",
    description: "Exploring the intersection of sound design, interfaces, and design systems for creating harmonious digital experiences.",
    url: "https://medium.com/music-for-interfaces/music-for-interfaces-3f661ea02863",
    tags: ["Sound Design", "Interface", "Design"],
    image: musicForInterfacesImage,
    cardSize: "compact",
    aspectRatio: "16/9"
  },
  {
    title: "Design Shapers",
    author: "Design Shapers Community",
    source: "designshapers.co",
    type: "Community",
    description: "DesignShapers is the largest Spanish-speaking community of AI + design.",
    url: "https://www.designshapers.co/",
    tags: ["Community", "Networking"],
    image: designShapersImage,
    cardSize: "featured",
    aspectRatio: "2/1"
  },
  {
    title: "Design System Automation",
    author: "Builder.io",
    source: "Builder.io Blog",
    type: "Article",
    description: "How to leverage AI and automation to scale and maintain Design Systems more efficiently.",
    url: "https://www.builder.io/blog/design-system-ai-automation",
    tags: ["Design Systems", "Automation", "AI"],
    image: dsAutomationImage,
    cardSize: "standard",
    aspectRatio: "16/9"
  },
  {
    title: "Dear LLM, here's how my design system works",
    author: "UX Collective",
    source: "UX Collective",
    type: "Article",
    description: "A practical exploration of how to effectively communicate design system specifications and guidelines to Large Language Models for better AI-assisted design work.",
    url: "https://uxdesign.cc/dear-llm-heres-how-my-design-system-works-b59fb9a342b7",
    tags: ["LLM", "Design Systems", "AI", "Documentation"],
    image: dearLLMImage,
    cardSize: "featured",
    aspectRatio: "16/9"
  },
  {
    title: "How we document",
    author: "zeroheight",
    source: "zeroheight",
    type: "Article",
    description: "Exploring the best practices and tools for documenting design systems effectively.",
    url: "https://zeroheight.com/how-we-document/",
    tags: ["Documentation", "Design Systems", "Best Practices"],
    image: howWeDocumentImage,
    cardSize: "standard",
    aspectRatio: "16/9"
  },
  {
    title: "Design for the AI age",
    author: "Linear",
    source: "Linear",
    type: "Article",
    description: "Linear's perspective on designing products and interfaces in the age of artificial intelligence.",
    url: "https://linear.app/now/design-for-the-ai-age",
    tags: ["AI", "Design", "Product Design"],
    image: designAIAgeImage,
    cardSize: "featured",
    aspectRatio: "16/9"
  },
  {
    title: "Vibe coding with Cursor for Design Systems: 10 learning lessons",
    author: "Diana Wolosin",
    source: "Design Bootcamp",
    type: "Article",
    description: "Practical lessons learned from experimenting with vibe coding using Cursor AI for Design System development and workflows.",
    url: "https://medium.com/design-bootcamp/vibe-coding-with-cursor-for-design-systems-10-learning-lessons-34d098d95474",
    tags: ["Vibe Coding", "Cursor", "Design Systems", "AI"],
    image: vibeCodingCursorImage,
    cardSize: "standard",
    aspectRatio: "16/9"
  }
];

const typeColors = {
  Article: "bg-blue-50/80 text-blue-700 border-blue-200/50 backdrop-blur-sm",
  Book: "bg-purple-50/80 text-purple-700 border-purple-200/50 backdrop-blur-sm",
  Paper: "bg-green-50/80 text-green-700 border-green-200/50 backdrop-blur-sm",
  Guide: "bg-orange-50/80 text-orange-700 border-orange-200/50 backdrop-blur-sm",
  Video: "bg-pink-50/80 text-pink-700 border-pink-200/50 backdrop-blur-sm",
  Community: "bg-purple-50/80 text-purple-700 border-purple-200/50 backdrop-blur-sm"
};

export function ReadingsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | "Article" | "Guide">("All");
  const [showCommunityOnly, setShowCommunityOnly] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentReaction, setCurrentReaction] = useState('Hmm...');
  const [shuffledReadings, setShuffledReadings] = useState<Reading[]>([]);
  const [cmsReadings, setCmsReadings] = useState<Reading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const reactions = ['Hmm...', 'Aha!', 'Oh!', 'Wow!', 'Ooh!', 'Huh!', 'Neat!', 'Whoa!'];

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "January 7, 2026"; // Fallback to current date
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Load readings from CMS ONLY
  useEffect(() => {
    const loadCmsReadings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms/readings`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        const data = await response.json();
        
        // Transform CMS data to match Reading interface
        const transformedData: Reading[] = data.map((item: any) => ({
          title: item.title || "Untitled",
          author: item.author || "Unknown",
          source: item.source || "Community",
          type: item.type || "Article",
          description: item.description || "",
          url: item.url || "",
          tags: item.tags || ["Community"],
          image: item.image || undefined,
          cardSize: "standard" as const,
          contributedBy: item.contributedBy || item.contributor, // Support both field names
          contributorUrl: item.contributorUrl || item.contributorURL, // Support both field names
        }));
        
        setCmsReadings(transformedData);
        console.log("Loaded readings from CMS:", transformedData.length, "items");
        
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
      } catch (err) {
        console.error("Error loading CMS readings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCmsReadings();
  }, []);

  // Shuffle array utility function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Randomize card size
  const randomizeCardSize = (): "compact" | "standard" | "featured" => {
    const sizes: Array<"compact" | "standard" | "featured"> = ["compact", "standard", "featured"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  // Randomize aspect ratio based on card size
  const randomizeAspectRatio = (size: "compact" | "standard" | "featured"): string => {
    if (size === "compact") {
      const ratios = ["16/9", "4/3", "3/2"];
      return ratios[Math.floor(Math.random() * ratios.length)];
    } else if (size === "standard") {
      const ratios = ["16/9", "4/3", "3/2", "2/1", "1/1"];
      return ratios[Math.floor(Math.random() * ratios.length)];
    } else {
      const ratios = ["2/1", "16/9", "3/2"];
      return ratios[Math.floor(Math.random() * ratios.length)];
    }
  };

  // Initialize shuffled readings on mount
  useEffect(() => {
    const shuffled = shuffleArray(cmsReadings).map(reading => {
      const newSize = randomizeCardSize();
      return {
        ...reading,
        cardSize: newSize,
        aspectRatio: randomizeAspectRatio(newSize)
      };
    });
    setShuffledReadings(shuffled);
  }, [cmsReadings]); // Re-run when cmsReadings changes

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

  // Filter readings based on selected filter
  const filteredReadings = filter === "All" 
    ? shuffledReadings 
    : shuffledReadings.filter(reading => reading.type === filter);

  // Apply community filter if enabled
  const finalReadings = showCommunityOnly
    ? filteredReadings.filter(reading => reading.contributedBy)
    : filteredReadings;

  // Check if we need a placeholder (total items including contribute card)
  const totalItems = finalReadings.length + 1;
  const needsPlaceholder = totalItems % 2 !== 0;

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
                className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white rounded-full shadow-lg border border-rose-200/50 z-10"
                style={{
                  animation: 'bubble-pop 0.3s ease-out'
                }}
              >
                <span className="text-[11px] sm:text-xs font-medium text-gray-700">{currentReaction}</span>
                {/* Speech bubble tail */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"></div>
              </div>
            )}
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 border border-rose-200/50 flex items-center justify-center shadow-sm">
              <div className="scale-75 sm:scale-100">
                <PixelCharacter characterIndex={3} />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-rose-500/20 backdrop-blur-sm"></div>
          </div>
        </div>
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <h1 className="text-[2rem] sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 break-words" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            Reading list
          </h1>
          <p className="text-[1.1rem] sm:text-xl text-gray-600 break-words">
            Articles, books, and resources about Design Systems and AI
          </p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            Last updated: <span className="text-gray-500">{formatDate(lastUpdated)}</span>
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-6">
        <div className="inline-flex items-center rounded-lg border border-gray-200/60 bg-white/40 backdrop-blur-sm p-1 shadow-sm flex-wrap gap-1">
          <button
            onClick={() => setFilter("All")}
            className={`px-3 py-1.5 rounded-md text-[12px] transition-all ${
              filter === "All"
                ? "bg-white text-gray-900 shadow-sm font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All ({shuffledReadings.length})
          </button>
          <button
            onClick={() => setFilter("Article")}
            className={`px-3 py-1.5 rounded-md text-[12px] transition-all ${
              filter === "Article"
                ? "bg-white text-gray-900 shadow-sm font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Articles ({shuffledReadings.filter(r => r.type === "Article").length})
          </button>
          <button
            onClick={() => setFilter("Guide")}
            className={`px-3 py-1.5 rounded-md text-[12px] transition-all ${
              filter === "Guide"
                ? "bg-white text-gray-900 shadow-sm font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Guides ({shuffledReadings.filter(r => r.type === "Guide").length})
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
              fill={showCommunityOnly ? "url(#heart-gradient-readings)" : "none"}
              stroke={showCommunityOnly ? "url(#heart-gradient-readings)" : "currentColor"}
              strokeWidth="1.5"
              style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
              <defs>
                <linearGradient id="heart-gradient-readings" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
                  <stop offset="50%" style={{ stopColor: '#a855f7' }} />
                  <stop offset="100%" style={{ stopColor: '#ec4899' }} />
                </linearGradient>
              </defs>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="whitespace-nowrap">
              Shared by users ({shuffledReadings.filter(r => r.contributedBy).length})
            </span>
          </button>
        </div>
      </div>

      {/* Masonry Grid Layout */}
      <div 
        className="w-full"
        style={{
          columnCount: 1,
          columnGap: '1rem',
        }}
      >
        {/* Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column */}
        <style>{`
          @media (min-width: 768px) {
            .masonry-container {
              column-count: 2;
              column-gap: 1.5rem;
            }
          }
          @media (min-width: 1024px) {
            .masonry-container {
              column-count: 3;
              column-gap: 1.5rem;
            }
          }
        `}</style>
        
        {cmsReadings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No readings yet. Visit <a href="#migrate" className="text-purple-600 hover:underline">#migrate</a> to import them!</p>
          </div>
        ) : (
          <div className="masonry-container">
            {/* Contribute Card - ALWAYS FIRST */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="block border-2 border-dashed border-purple-300/60 rounded-xl p-4 sm:p-6 hover:border-purple-400 hover:shadow-md transition-all bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 group relative overflow-hidden text-left mb-4 sm:mb-6"
              style={{ breakInside: 'avoid' }}
            >
              {/* Animated Contribution Grid */}
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

              <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-1.5 rounded-lg bg-white/80 backdrop-blur-sm border border-purple-300/60 mt-0.5">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 break-words">
                      Share and get featured 💜
                    </h3>
                    <p className="text-sm text-gray-500">
                      Contribute resources and your name will be added to our lovely tribute list
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-2 py-1 rounded border bg-purple-50/80 text-purple-700 border-purple-200/50 backdrop-blur-sm whitespace-nowrap">
                    Contribute
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>
              </div>

              {/* Description - hidden on mobile */}
              <p className="hidden sm:block text-sm text-gray-600 mb-4 relative z-10">
                Know a great article, book, or resource about Design Systems and AI? Share it with the community
              </p>

              {/* Tags - hidden on mobile */}
              <div className="hidden sm:flex flex-wrap gap-1.5 relative z-10">
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 text-purple-700 border border-purple-200/60">
                  Community driven
                </span>
              </div>
            </button>

            {/* Reading Cards - Randomized */}
            {finalReadings.map((reading, index) => {
              const size = reading.cardSize || "standard";
              
              // Compact: versión minimalista con menos info
              if (size === "compact") {
                return (
                  <a
                    key={index}
                    href={reading.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-200/50 rounded-xl overflow-hidden hover:border-purple-200 hover:shadow-md transition-all bg-white/80 backdrop-blur-sm group relative mb-4 sm:mb-6"
                    style={{ breakInside: 'avoid' }}
                  >
                    <div 
                      className="absolute inset-0 rounded-xl border-2 border-dashed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                      style={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
                    ></div>
                    
                    {reading.image && (
                      <div 
                        className="relative w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
                        style={{ aspectRatio: reading.aspectRatio || '2/1' }}
                      >
                        <img 
                          src={reading.image} 
                          alt={reading.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* AI Effect Overlay - visible by default, hidden on hover */}
                        <div 
                          className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.25) 33%, rgba(236, 72, 153, 0.25) 66%, rgba(59, 130, 246, 0.25) 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'ai-gradient 4s ease-in-out infinite'
                          }}
                        ></div>
                        
                        {/* Glow effect - visible by default, hidden on hover */}
                        <div 
                          className="absolute inset-0 opacity-50 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                            filter: 'blur(20px)'
                          }}
                        ></div>
                      </div>
                    )}
                    
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700 break-words">
                            {reading.title}
                          </h3>
                          <p className="text-sm text-gray-500 break-words">
                            {reading.author}
                          </p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 mt-0.5" />
                      </div>
                      {/* Tags - hidden on mobile */}
                      <div className="hidden sm:flex flex-wrap gap-1.5">
                        {reading.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-50/80 to-purple-50/80 text-xs text-gray-700 border border-blue-100/50 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                );
              }
              
              // Featured: versión destacada pero equilibrada
              if (size === "featured") {
                return (
                  <a
                    key={index}
                    href={reading.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-xl overflow-hidden hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm group relative mb-4 sm:mb-6 ${
                      reading.type === "Guide" 
                        ? "border-2 border-orange-400 hover:border-orange-500" 
                        : "border border-gray-200/50 hover:border-purple-200"
                    }`}
                    style={{ breakInside: 'avoid' }}
                  >
                    <div 
                      className="absolute inset-0 rounded-xl border-2 border-dashed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                      style={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
                    ></div>
                    
                    {reading.image && (
                      <div 
                        className="relative w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
                        style={{ aspectRatio: reading.aspectRatio || '2/1' }}
                      >
                        <img 
                          src={reading.image} 
                          alt={reading.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* AI Effect Overlay - visible by default, hidden on hover */}
                        <div 
                          className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.25) 33%, rgba(236, 72, 153, 0.25) 66%, rgba(59, 130, 246, 0.25) 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'ai-gradient 4s ease-in-out infinite'
                          }}
                        ></div>
                        
                        {/* Glow effect - visible by default, hidden on hover */}
                        <div 
                          className="absolute inset-0 opacity-50 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                            filter: 'blur(20px)'
                          }}
                        ></div>
                        
                        {/* Type badge on image - only for Guides */}
                        {reading.type === "Guide" && (
                          <div className="absolute top-3 right-3">
                            <span className={`text-xs px-2.5 py-1 rounded-full border backdrop-blur-md ${typeColors[reading.type]} shadow-sm`}>
                              {reading.type}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-1.5 group-hover:text-gray-700 break-words leading-snug">
                            {reading.title}
                          </h3>
                          <p className="text-sm text-gray-600 break-words">
                            {reading.author} · {reading.source}
                          </p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 mt-0.5" />
                      </div>

                      <p className="hidden sm:block text-sm text-gray-600 mb-4 leading-relaxed">{reading.description}</p>

                      {/* Tags - hidden on mobile */}
                      <div className="hidden sm:flex flex-wrap gap-1.5">
                        {reading.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-50/80 to-purple-50/80 text-xs text-gray-700 border border-blue-100/50 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Handwritten Contributor Note */}
                      {reading.contributedBy && (
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
                                Shared by {reading.contributorUrl ? (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      window.open(reading.contributorUrl, '_blank', 'noopener,noreferrer');
                                    }}
                                    className="font-semibold text-gray-900 hover:text-blue-600 underline decoration-dotted decoration-1 underline-offset-2 transition-colors cursor-pointer bg-transparent border-0 p-0"
                                  >
                                    {reading.contributedBy}
                                  </button>
                                ) : (
                                  <span className="font-semibold text-gray-900">{reading.contributedBy}</span>
                                )}
                              </span>
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </a>
                );
              }
              
              // Standard: tamaño normal
              return (
                <a
                  key={index}
                  href={reading.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-xl overflow-hidden hover:shadow-md transition-all bg-white/80 backdrop-blur-sm group relative mb-4 sm:mb-6 ${
                    reading.type === "Guide" 
                      ? "border-2 border-orange-400 hover:border-orange-500" 
                      : "border border-gray-200/50 hover:border-purple-200"
                  }`}
                  style={{ breakInside: 'avoid' }}
                >
                  <div 
                    className="absolute inset-0 rounded-xl border-2 border-dashed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                    style={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
                  ></div>
                  
                  {reading.image && (
                    <div 
                      className="relative w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
                      style={{ aspectRatio: reading.aspectRatio || '2/1' }}
                    >
                      <img 
                        src={reading.image} 
                        alt={reading.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* AI Effect Overlay - visible by default, hidden on hover */}
                      <div 
                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.25) 33%, rgba(236, 72, 153, 0.25) 66%, rgba(59, 130, 246, 0.25) 100%)',
                          backgroundSize: '200% 200%',
                          animation: 'ai-gradient 4s ease-in-out infinite'
                        }}
                      ></div>
                      
                      {/* Glow effect - visible by default, hidden on hover */}
                      <div 
                        className="absolute inset-0 opacity-50 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                          filter: 'blur(20px)'
                        }}
                      ></div>
                      
                      {/* Type badge on image - only for Guides */}
                      {reading.type === "Guide" && (
                        <div className="absolute top-3 right-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full border backdrop-blur-md ${typeColors[reading.type]} shadow-sm`}>
                            {reading.type}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700 break-words">
                          {reading.title}
                        </h3>
                        <p className="text-sm text-gray-500 break-words">
                          {reading.author} · {reading.source}
                        </p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 mt-0.5" />
                    </div>

                    <p className="hidden sm:block text-sm text-gray-600 mb-4">{reading.description}</p>

                    <div className="hidden sm:flex flex-wrap gap-1.5">
                      {reading.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-50/80 to-purple-50/80 text-xs text-gray-700 border border-blue-100/50 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Handwritten Contributor Note */}
                    {reading.contributedBy && (
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
                              Shared by {reading.contributorUrl ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    window.open(reading.contributorUrl, '_blank', 'noopener,noreferrer');
                                  }}
                                  className="font-semibold text-gray-900 hover:text-blue-600 underline decoration-dotted decoration-1 underline-offset-2 transition-colors cursor-pointer bg-transparent border-0 p-0"
                                >
                                  {reading.contributedBy}
                                </button>
                              ) : (
                                <span className="font-semibold text-gray-900">{reading.contributedBy}</span>
                              )}
                            </span>
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <SuggestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}