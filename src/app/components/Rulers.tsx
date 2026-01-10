import { useState, useEffect } from "react";
import { PixelCharacter } from "./PixelCharacter";

interface Guide {
  id: string;
  position: number;
  type: 'horizontal' | 'vertical';
}

export function Rulers() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [currentGuide, setCurrentGuide] = useState<Guide | null>(null);
  const [draggingGuideId, setDraggingGuideId] = useState<string | null>(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggShown, setEasterEggShown] = useState(false);
  const [randomCharacter, setRandomCharacter] = useState(0);
  const [showHorizontalHint, setShowHorizontalHint] = useState(false);
  const [showVerticalHint, setShowVerticalHint] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Generar marcas para la regla horizontal (cada 100px)
  const horizontalMarks = Array.from({ length: 50 }, (_, i) => i * 100);
  
  // Generar marcas para la regla vertical (cada 100px)
  const verticalMarks = Array.from({ length: 30 }, (_, i) => i * 100);

  // Easter egg cuando hay 3 guías
  useEffect(() => {
    if (guides.length === 3 && !easterEggShown) {
      // Seleccionar personaje aleatorio (0-3: robot, alien, fantasma, monstruo)
      const randomIndex = Math.floor(Math.random() * 4);
      setRandomCharacter(randomIndex);
      
      setShowEasterEgg(true);
      setEasterEggShown(true);
      
      // Agregar clase de shake al body
      document.body.classList.add('shake-animation');
      
      // Remover shake después de 2 segundos (pero dejar el mensaje visible)
      setTimeout(() => {
        document.body.classList.remove('shake-animation');
      }, 2000);
    }
    
    // Reset del easter egg cuando no hay guías
    if (guides.length === 0) {
      setEasterEggShown(false);
    }
  }, [guides.length, easterEggShown]);

  const handleMouseDownHorizontal = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.clientY - rect.top;
    
    const newGuide: Guide = {
      id: `h-${Date.now()}`,
      position,
      type: 'horizontal'
    };
    
    setCurrentGuide(newGuide);
    setIsDragging(true);
  };

  const handleMouseDownVertical = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.clientX - rect.left;
    
    const newGuide: Guide = {
      id: `v-${Date.now()}`,
      position,
      type: 'vertical'
    };
    
    setCurrentGuide(newGuide);
    setIsDragging(true);
  };

  const handleMouseDownGuide = (guide: Guide, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentGuide(guide);
    setDraggingGuideId(guide.id);
    setIsDragging(true);
    // Remover la guía de la lista mientras se arrastra
    setGuides(guides.filter(g => g.id !== guide.id));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !currentGuide) return;
    
    if (currentGuide.type === 'horizontal') {
      const newPosition = e.clientY - 24;
      setCurrentGuide({ ...currentGuide, position: newPosition });
    } else {
      const newPosition = e.clientX - 64 - 24;
      setCurrentGuide({ ...currentGuide, position: newPosition });
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (currentGuide) {
      // Verificar si la guía está siendo devuelta a la regla
      const shouldDelete = currentGuide.type === 'horizontal' 
        ? e.clientY < 30 // Si está en los primeros 30px (zona de la regla)
        : e.clientX < 100; // Si está en los primeros 100px (sidebar + regla)
      
      if (!shouldDelete) {
        // Solo guardar si no está en la zona de eliminación
        setGuides([...guides, currentGuide]);
      }
      
      setCurrentGuide(null);
      setDraggingGuideId(null);
    }
    setIsDragging(false);
  };

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      // Prevenir selección de texto durante el arrastre
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        // Restaurar selección de texto
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
        
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, currentGuide, guides]);

  return (
    <>
      {/* Regla horizontal superior */}
      <div 
        className="fixed top-0 left-16 right-0 h-6 bg-white/80 backdrop-blur-md border-b border-gray-200/60 z-30 overflow-visible cursor-none group select-none"
        onMouseDown={handleMouseDownHorizontal}
        onMouseEnter={() => setShowHorizontalHint(true)}
        onMouseLeave={() => setShowHorizontalHint(false)}
        onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
      >
        <div className="relative h-full overflow-hidden">
          {horizontalMarks.map((mark) => (
            <div
              key={`h-${mark}`}
              className="absolute top-0 h-full"
              style={{ left: `${mark}px` }}
            >
              {/* Línea principal cada 100px */}
              <div className="absolute bottom-0 left-0 w-px h-2 bg-gray-300" />
              
              {/* Número */}
              {mark > 0 && (
                <div className="absolute top-0.5 left-1 text-[9px] text-gray-400 font-mono select-none">
                  {mark}
                </div>
              )}
            </div>
          ))}
          
          {/* Líneas intermedias cada 50px */}
          {Array.from({ length: 100 }, (_, i) => i * 50).map((mark) => (
            mark % 100 !== 0 && (
              <div
                key={`h-mid-${mark}`}
                className="absolute bottom-0 w-px h-1.5 bg-gray-200"
                style={{ left: `${mark}px` }}
              />
            )
          ))}
          
          {/* Líneas menores cada 10px */}
          {Array.from({ length: 500 }, (_, i) => i * 10).map((mark) => (
            mark % 50 !== 0 && (
              <div
                key={`h-minor-${mark}`}
                className="absolute bottom-0 w-px h-0.5 bg-gray-100"
                style={{ left: `${mark}px` }}
              />
            )
          ))}
        </div>
      </div>

      {/* Regla vertical izquierda */}
      <div 
        className="fixed top-6 left-16 bottom-0 w-6 bg-white/80 backdrop-blur-md border-r border-gray-200/60 z-30 overflow-hidden cursor-none group vertical"
        onMouseDown={handleMouseDownVertical}
        onMouseEnter={() => setShowVerticalHint(true)}
        onMouseLeave={() => setShowVerticalHint(false)}
        onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
      >
        <div className="relative w-full h-full">
          {verticalMarks.map((mark) => (
            <div
              key={`v-${mark}`}
              className="absolute left-0 w-full"
              style={{ top: `${mark}px` }}
            >
              {/* Línea principal cada 100px */}
              <div className="absolute right-0 top-0 h-px w-2 bg-gray-300" />
              
              {/* Número */}
              {mark > 0 && (
                <div 
                  className="absolute text-[9px] text-gray-400 font-mono select-none"
                  style={{ 
                    right: '2px',
                    top: '2px',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)'
                  }}
                >
                  {mark}
                </div>
              )}
            </div>
          ))}
          
          {/* Líneas intermedias cada 50px */}
          {Array.from({ length: 60 }, (_, i) => i * 50).map((mark) => (
            mark % 100 !== 0 && (
              <div
                key={`v-mid-${mark}`}
                className="absolute right-0 h-px w-1.5 bg-gray-200"
                style={{ top: `${mark}px` }}
              />
            )
          ))}
          
          {/* Líneas menores cada 10px */}
          {Array.from({ length: 300 }, (_, i) => i * 10).map((mark) => (
            mark % 50 !== 0 && (
              <div
                key={`v-minor-${mark}`}
                className="absolute right-0 h-px w-0.5 bg-gray-100"
                style={{ top: `${mark}px` }}
              />
            )
          ))}
        </div>
      </div>
      
      {/* Mensaje "using guides?" que sigue al cursor - fuera de las reglas para evitar overflow-hidden */}
      {showHorizontalHint && !isDragging && (
        <div 
          className="px-2 py-0.5 bg-gray-100/90 border border-gray-200/60 rounded text-[10px] text-gray-600 font-medium pointer-events-none hidden sm:flex items-center gap-1 backdrop-blur-sm fixed z-[100]"
          style={{ 
            left: `${cursorPosition.x + 35}px`,
            top: `${cursorPosition.y + 25}px`
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-gray-400">
            <path d="M0 5h10M5 0v10" stroke="currentColor" strokeWidth="1" />
          </svg>
          using guides?
        </div>
      )}
      
      {showVerticalHint && !isDragging && (
        <div 
          className="px-2 py-0.5 bg-gray-100/90 border border-gray-200/60 rounded text-[10px] text-gray-600 font-medium pointer-events-none hidden sm:flex items-center gap-1 backdrop-blur-sm fixed z-[100]"
          style={{ 
            left: `${cursorPosition.x + 35}px`,
            top: `${cursorPosition.y + 25}px`
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-gray-400">
            <path d="M0 5h10M5 0v10" stroke="currentColor" strokeWidth="1" />
          </svg>
          using guides?
        </div>
      )}

      {/* Esquina superior izquierda (intersección de reglas) */}
      <div className="fixed top-0 left-16 w-6 h-6 bg-white/80 backdrop-blur-md border-r border-b border-gray-200/60 z-30">
        <div className="w-full h-full flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-300">
            <path d="M0 0 L12 12 M12 0 L0 12" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      {/* Guías guardadas */}
      {guides.map((guide) => (
        guide.type === 'horizontal' ? (
          <div
            key={guide.id}
            className="fixed left-16 right-0 h-px bg-purple-500 z-40 cursor-ns-resize hover:h-0.5 transition-all group/guide"
            style={{ top: `${guide.position + 24}px` }}
            onMouseDown={(e) => handleMouseDownGuide(guide, e)}
          >
            <div className="absolute left-4 -top-2 px-2 py-0.5 bg-purple-500 text-white text-[10px] rounded opacity-0 group-hover/guide:opacity-100 transition-opacity pointer-events-none">
              {Math.round(guide.position)}px
            </div>
          </div>
        ) : (
          <div
            key={guide.id}
            className="fixed top-6 bottom-0 w-px bg-purple-500 z-40 cursor-ew-resize hover:w-0.5 transition-all group/guide"
            style={{ left: `${guide.position + 64 + 24}px` }}
            onMouseDown={(e) => handleMouseDownGuide(guide, e)}
          >
            <div className="absolute -left-4 top-4 px-2 py-0.5 bg-purple-500 text-white text-[10px] rounded opacity-0 group-hover/guide:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {Math.round(guide.position)}px
            </div>
          </div>
        )
      ))}

      {/* Guía temporal mientras se arrastra */}
      {currentGuide && (
        currentGuide.type === 'horizontal' ? (
          <div
            className="fixed left-16 right-0 h-px bg-purple-400 z-50 pointer-events-none"
            style={{ top: `${currentGuide.position + 24}px` }}
          >
            <div className="absolute left-4 -top-2 px-2 py-0.5 bg-purple-400 text-white text-[10px] rounded">
              {Math.round(currentGuide.position)}px
            </div>
          </div>
        ) : (
          <div
            className="fixed top-6 bottom-0 w-px bg-purple-400 z-50 pointer-events-none"
            style={{ left: `${currentGuide.position + 64 + 24}px` }}
          >
            <div className="absolute -left-4 top-4 px-2 py-0.5 bg-purple-400 text-white text-[10px] rounded whitespace-nowrap">
              {Math.round(currentGuide.position)}px
            </div>
          </div>
        )
      )}

      {/* Easter Egg - Mensaje cuando hay 3 guías */}
      {showEasterEgg && (
        <>
          {/* Backdrop con blur suave */}
          <div 
            className="fixed inset-0 z-[99] backdrop-blur-sm bg-black/10 transition-all duration-300"
            onClick={() => setShowEasterEgg(false)}
          />
          
          {/* Monstruo con bocadillo */}
          <div className="fixed bottom-8 right-8 z-[100] flex items-end gap-4 pointer-events-none">
            {/* Monstruo */}
            <div 
              className="pointer-events-auto w-24"
              style={{
                animation: 'bounceIn 0.5s ease-out, bounce-happy 2s ease-in-out infinite',
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))'
              }}
            >
              <PixelCharacter characterIndex={randomCharacter} />
            </div>
            
            {/* Bocadillo de diálogo */}
            <div className="relative pointer-events-auto">
              {/* Flecha del bocadillo */}
              <div 
                className="absolute -left-3 bottom-4 w-0 h-0"
                style={{
                  borderTop: '12px solid transparent',
                  borderBottom: '12px solid transparent',
                  borderRight: '12px solid white'
                }}
              />
              
              {/* Contenido del bocadillo */}
              <div 
                className="bg-white rounded-2xl px-6 py-4 shadow-xl border border-gray-200/60"
                style={{
                  animation: 'bounceIn 0.5s ease-out 0.2s backwards',
                  maxWidth: '280px'
                }}
              >
                {/* Botón de cerrar minimalista */}
                <button
                  onClick={() => setShowEasterEgg(false)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors text-xs"
                >
                  ×
                </button>

                <p className="text-gray-900 text-sm leading-relaxed">
                  Too many guides for a UI designer, right?
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}