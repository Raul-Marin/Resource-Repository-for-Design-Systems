export function GridOverlay() {
  // Grid modular al estilo Josef Müller-Brockmann
  const columns = 12; // 12 columnas
  const rows = 16; // 16 filas
  const moduleSize = 60; // Tamaño del módulo base en px
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[3] ml-16 mt-6">
      {/* Grid suizo modular */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="swissGrid" width={moduleSize} height={moduleSize} patternUnits="userSpaceOnUse">
            {/* Líneas verticales */}
            <line 
              x1={moduleSize} 
              y1="0" 
              x2={moduleSize} 
              y2={moduleSize} 
              stroke="rgba(0, 0, 0, 0.15)" 
              strokeWidth="1" 
            />
            {/* Líneas horizontales */}
            <line 
              x1="0" 
              y1={moduleSize} 
              x2={moduleSize} 
              y2={moduleSize} 
              stroke="rgba(0, 0, 0, 0.15)" 
              strokeWidth="1" 
            />
          </pattern>
          
          {/* Líneas principales cada 3 módulos (más gruesas) */}
          <pattern id="swissGridMajor" width={moduleSize * 3} height={moduleSize * 3} patternUnits="userSpaceOnUse">
            <rect width={moduleSize * 3} height={moduleSize * 3} fill="url(#swissGrid)" />
            <line 
              x1={moduleSize * 3} 
              y1="0" 
              x2={moduleSize * 3} 
              y2={moduleSize * 3} 
              stroke="rgba(0, 0, 0, 0.25)" 
              strokeWidth="1.5" 
            />
            <line 
              x1="0" 
              y1={moduleSize * 3} 
              x2={moduleSize * 3} 
              y2={moduleSize * 3} 
              stroke="rgba(0, 0, 0, 0.25)" 
              strokeWidth="1.5" 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#swissGridMajor)" />
      </svg>
    </div>
  );
}