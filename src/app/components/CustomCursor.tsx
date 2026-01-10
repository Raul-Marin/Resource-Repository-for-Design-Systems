import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const VIEWER_NAMES = [
  'Anonymous Viewer',
  'Curious Designer',
  'Design Explorer',
  'AI Enthusiast',
  'System Observer',
  'Creative Mind',
  'Pattern Seeker',
  'Future Builder',
  'Design Thinker',
  'Code Artist',
  'UX Wanderer',
  'Pixel Perfectionist',
  'Component Hunter',
  'Design Tourist',
  'Visual Explorer'
];

const CURSOR_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#6366f1', // indigo
  '#f43f5e', // rose
  '#8b5cf6', // violet
  '#14b8a6', // teal
];

export function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hideCustomCursor, setHideCustomCursor] = useState(false);
  const [viewerName] = useState(() => {
    const stored = localStorage.getItem('viewer-name');
    if (stored) return stored;
    const name = VIEWER_NAMES[Math.floor(Math.random() * VIEWER_NAMES.length)];
    localStorage.setItem('viewer-name', name);
    return name;
  });
  const [cursorColor] = useState(() => {
    const stored = localStorage.getItem('viewer-color');
    if (stored) return stored;
    const color = CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)];
    localStorage.setItem('viewer-color', color);
    return color;
  });

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // No mostrar cursor personalizado en mobile
    if (isMobile) return;
    
    // Detectar si estamos en alguna página del CMS
    const isCMSPage = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      return (
        path.includes('/admin') || 
        path.includes('/migrate') || 
        path.includes('/cleanup') || 
        path.includes('/diagnose') || 
        path.includes('/design-system-showcase') ||
        path.includes('/components-showcase') ||
        path === '/components' ||
        hash.includes('#admin') || 
        hash.includes('#migrate') || 
        hash.includes('#cleanup') || 
        hash.includes('#diagnose') || 
        hash.includes('#design-system-showcase') ||
        hash.includes('#components-showcase')
      );
    };
    
    // Si estamos en una página CMS, no mostrar el cursor personalizado
    if (isCMSPage()) {
      setHideCustomCursor(true);
      return;
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      // Detectar elementos donde queremos el cursor nativo
      const target = e.target as HTMLElement;
      const shouldHideCustom = 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TABLE' ||
        target.tagName === 'TH' ||
        target.tagName === 'TD' ||
        target.tagName === 'TR' ||
        target.closest('input') !== null ||
        target.closest('textarea') !== null ||
        target.closest('select') !== null ||
        target.closest('table') !== null ||
        target.closest('.admin-panel') !== null;
      
      setHideCustomCursor(shouldHideCustom);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, isMobile]);

  // No renderizar en mobile o cuando debe estar oculto
  if (isMobile || !isVisible || hideCustomCursor) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Cursor pointer (triángulo estilo Figma) */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          transform: 'translate(-2px, -2px)',
        }}
      >
        <path
          d="M5.5 3.5L18.5 10.5L11 13L8.5 20.5L5.5 3.5Z"
          fill={cursorColor}
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Etiqueta con nombre */}
      <div
        className="absolute left-6 top-1 px-2 py-1 rounded text-white text-[11px] whitespace-nowrap shadow-lg"
        style={{
          backgroundColor: cursorColor,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
        }}
      >
        {viewerName}
      </div>
    </div>
  );
}