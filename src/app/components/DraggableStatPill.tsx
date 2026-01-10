import { useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { PixelCharacter } from "./PixelCharacter";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedCounter } from "./AnimatedCounter";

interface StatPillData {
  id: string;
  count: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  borderColor: string;
  iconColor: string;
}

interface AnimatedStatPillProps {
  pill: StatPillData;
  onHoverChange?: (isHovering: boolean) => void;
}

// Character mapping for each pill type
const characterMap: Record<string, number> = {
  "design-systems": 1, // Alien azul
  "tools": 0,          // Robot verde
  "jobs": 2,           // Fantasma rosa
  "resources": 3,      // Gato naranja
};

// Fun sounds/phrases for each character
const characterSounds: Record<string, string[]> = {
  "design-systems": ["beep boop!", "👽 zzzap!", "wubwub~", "blip!"],
  "tools": ["🤖 bzzt!", "whirr~", "kachunk!", "beep!"],
  "jobs": ["👻 wooo~", "boo!", "whooosh!", "eek!"],
  "resources": ["🐱 meow~", "purr!", "mrrp!", "nya~"],
};

export function AnimatedStatPill({ pill, onHoverChange }: AnimatedStatPillProps) {
  const Icon = pill.icon;
  const [isHovering, setIsHovering] = useState(false);
  const [currentSound, setCurrentSound] = useState("");
  
  // Extraer el número del count (ej: "19+" -> 19, "+")
  const countMatch = pill.count.match(/^(\d+)(.*)$/);
  const countNumber = countMatch ? parseInt(countMatch[1], 10) : 0;
  const countSuffix = countMatch ? countMatch[2] : "";

  const handleMouseEnter = () => {
    setIsHovering(true);
    // Get random sound for this character
    const sounds = characterSounds[pill.id] || ["hey!"];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    setCurrentSound(randomSound);
    if (onHoverChange) {
      onHoverChange(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (onHoverChange) {
      onHoverChange(false);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 350,
          damping: 25,
          mass: 0.8
        },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }}
      className="relative inline-block w-full sm:w-auto"
    >
      {/* Pixel Character - now behind the pill */}
      <motion.div 
        layout
        className="absolute -top-10 sm:-top-14 left-1/2 -translate-x-1/2 z-0 scale-75 sm:scale-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15
        }}
      >
        <PixelCharacter characterIndex={characterMap[pill.id] || 0} />
        
        {/* Fun sound bubble */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -5 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
                mass: 0.5
              }}
              className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="relative">
                {/* Speech bubble */}
                <div className="bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg border border-gray-200/60">
                  <span className="text-[10px] sm:text-xs font-mono font-medium text-gray-700 antialiased">
                    {currentSound}
                  </span>
                </div>
                {/* Bubble tail */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-200/60"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Pill */}
      <motion.div
        layout
        whileHover={{ scale: 1.05 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          mass: 0.5
        }}
        className={`group relative z-10 px-3 sm:px-6 py-3 sm:py-3.5 rounded-full bg-gradient-to-r ${pill.gradient} border ${pill.borderColor} hover:border-blue-300/70 transition-colors hover:shadow-md w-full sm:w-auto`}
      >
        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
          <div className={`hidden sm:flex w-9 h-9 rounded-full bg-white/80 border ${pill.borderColor} items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${pill.iconColor}`} />
          </div>
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-xl font-semibold text-gray-900 leading-none mb-1 sm:mb-1">
              <AnimatedCounter value={countNumber} />
              {countSuffix}
            </div>
            <div className="text-sm sm:text-xs text-gray-600 whitespace-nowrap">{pill.label}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Keep the old export name for backwards compatibility
export { AnimatedStatPill as DraggableStatPill };