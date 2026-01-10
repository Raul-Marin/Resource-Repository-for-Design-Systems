import { useState } from "react";

interface DevModePaddingProps {
  children: React.ReactNode;
  className?: string;
  showPadding?: boolean;
  paddingValue?: string;
}

export function DevModePadding({ 
  children, 
  className = "", 
  showPadding = false,
  paddingValue = "24px"
}: DevModePaddingProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const shouldShow = showPadding || isHovered;

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay de padding estilo Figma dev mode */}
      {shouldShow && (
        <>
          {/* Top padding */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-orange-400/5 border-b border-orange-500/10 pointer-events-none z-20 transition-opacity duration-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-[10px] font-mono text-orange-400 bg-white/70 px-1 rounded">
                {paddingValue}
              </span>
            </div>
          </div>

          {/* Right padding */}
          <div className="absolute top-0 right-0 bottom-0 w-6 bg-orange-400/5 border-l border-orange-500/10 pointer-events-none z-20 transition-opacity duration-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
              <span className="text-[10px] font-mono text-orange-400 bg-white/70 px-1 rounded">
                {paddingValue}
              </span>
            </div>
          </div>

          {/* Bottom padding */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-orange-400/5 border-t border-orange-500/10 pointer-events-none z-20 transition-opacity duration-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-[10px] font-mono text-orange-400 bg-white/70 px-1 rounded">
                {paddingValue}
              </span>
            </div>
          </div>

          {/* Left padding */}
          <div className="absolute top-0 left-0 bottom-0 w-6 bg-orange-400/5 border-r border-orange-500/10 pointer-events-none z-20 transition-opacity duration-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
              <span className="text-[10px] font-mono text-orange-400 bg-white/70 px-1 rounded">
                {paddingValue}
              </span>
            </div>
          </div>

          {/* Líneas de medida internas */}
          <div className="absolute inset-6 border border-orange-500/15 pointer-events-none z-20 rounded transition-opacity duration-500" />
        </>
      )}
      
      {children}
    </div>
  );
}