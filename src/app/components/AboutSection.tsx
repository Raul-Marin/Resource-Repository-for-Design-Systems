import { Logo } from "./Logo";
import { Linkedin, Youtube, Globe, ArrowUpRight } from "lucide-react";
import shiftRLabLogo from "figma:asset/d5a119faa2e65758c90601cba709d5671ed2b023.png";
import { SuggestModal } from "./SuggestModal";
import { useState } from "react";

export function AboutSection() {
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/raulmarindesign/",
      label: "Connect on LinkedIn"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@shiftplusr",
      label: "Watch on YouTube"
    },
    {
      name: "School website",
      icon: Globe,
      url: "https://shiftplusr.com",
      label: "Visit school site"
    }
  ];

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="h-[0.5px] flex-1 bg-gray-300/40" />
          </div>
          
          <h1 
            className="uppercase tracking-tight break-words"
            style={{ 
              fontFamily: 'Pixelify Sans, cursive',
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            README
          </h1>
        </div>

        {/* Divider */}
        <div className="h-[0.5px] bg-gray-200/40 mb-4 sm:mb-6" />

        {/* Grid compacto - stack en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 mb-4 sm:mb-6">
          {/* Columna principal */}
          <div className="md:col-span-7 space-y-3">
            <p className="text-base md:text-lg text-gray-900 leading-relaxed break-words">
              A curated collection of Design Systems embracing AI. It might sound contradictory, 
              but we believe the best way to honor craft is to ride the AI wave into the future.
            </p>
            
            <p className="text-sm md:text-base text-gray-700 leading-relaxed break-words">
              Our mission is to explore and document how artificial intelligence is shaping 
              the future of design systems, providing resources, tools, and insights for designers 
              and developers working at the intersection of AI and design.
            </p>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed break-words italic">
              All resources have been 100% manually curated and hand-picked to ensure quality and relevance.
            </p>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed break-words">
              A living collection that evolves with emerging AI technologies and Design System 
              practices, made with care for the design community.
            </p>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed break-words">
              This project is community-driven, designed as a space where people can grow, 
              contribute, and showcase what they bring to the table.{" "}
              <button 
                onClick={() => setIsSuggestModalOpen(true)}
                className="text-gray-700 hover:text-gray-900 underline transition-colors font-medium"
              >
                Share your resources here
              </button>
            </p>
          </div>

          {/* Columna stats */}
          <div className="md:col-span-5">
            <div className="flex gap-8 sm:gap-10">
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-1.5">Status</div>
                <div className="text-base text-gray-900">Active & growing</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-1.5">Updated</div>
                <div className="text-base text-gray-900">January 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[0.5px] bg-gray-200/40 mb-4 sm:mb-6" />

        {/* Inspiraciones y créditos */}
        <div className="mb-4 sm:mb-6">
          <div className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-3">
            Inspirations & credits
          </div>
          <div className="space-y-3">
            <p className="text-xs text-gray-500 leading-relaxed break-words">
              This project is inspired by the design and experience of <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700 transition-colors">Claude</a> and <a href="https://parallel.ai/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700 transition-colors">Parallel</a>.
            </p>
            
            <p className="text-sm md:text-base text-gray-700 leading-relaxed break-words">
              Built with <a href="https://www.figma.com/make" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900 transition-colors font-medium">Figma Make</a> and <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900 transition-colors font-medium">Supabase</a>
            </p>

            <p className="text-xs text-gray-500 leading-relaxed break-words">
              ~400 iterations (~3,500+ AI credits) · 10 hours<br />
              Thanks to Figma for the extra over the limit ;)
            </p>

            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span>Follow the creator:</span>
              <a 
                href="https://www.youtube.com/@RaulMarin_Figma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/60 border border-gray-200/60 text-gray-700 hover:bg-white hover:border-gray-300/80 hover:text-gray-900 transition-all duration-300"
              >
                <Youtube className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="font-medium">YouTube</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/raulmarincalleja/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/60 border border-gray-200/60 text-gray-700 hover:bg-white hover:border-gray-300/80 hover:text-gray-900 transition-all duration-300"
              >
                <Linkedin className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[0.5px] bg-gray-200/40 mb-4 sm:mb-6" />

        {/* Shift+R Lab - stack en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 mb-4 sm:mb-6">
          <div className="md:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-3">
              Made by
            </div>
            <div className="flex items-start gap-3 sm:gap-4">
              <img 
                src={shiftRLabLogo} 
                alt="Shift+R Lab Logo"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2 break-words">
                  A school specialized in Design Systems since 2021, teaching emerging 
                  technologies like MCPs, AI tools for designers, and cutting-edge design practices.
                </p>
                <div className="flex gap-1.5 opacity-40">
                  <div className="w-[3px] h-[3px] rounded-full bg-blue-600" />
                  <div className="w-[3px] h-[3px] rounded-full bg-purple-600" />
                  <div className="w-[3px] h-[3px] rounded-full bg-pink-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-3">
              Next enrollment
            </div>
            <div 
              className="text-lg sm:text-xl mb-2 break-words"
              style={{ 
                fontFamily: 'Pixelify Sans, cursive',
                background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Jan 9, 2026
            </div>
            <a 
              href="https://www.shiftr.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 transition-all duration-300 group-hover:bg-red-100/60 group-hover:border-red-300/60">
                <span className="text-[11px] text-red-700 uppercase tracking-[0.12em] font-medium whitespace-nowrap">
                  50 spots only
                </span>
                <ArrowUpRight className="w-2.5 h-2.5 text-red-600/60 group-hover:text-red-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </div>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[0.5px] bg-gray-200/40 mb-4 sm:mb-5" />
      </div>

      {/* Suggest Modal */}
      <SuggestModal isOpen={isSuggestModalOpen} onClose={() => setIsSuggestModalOpen(false)} />
    </div>
  );
}