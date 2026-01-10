import { ReactNode, Children, useEffect, useState } from "react";

interface DevModeGridProps {
  children: ReactNode;
  className?: string;
  columns?: number;
  rows?: number;
  gap?: string;
}

export function DevModeGrid({ 
  children, 
  className = "",
  columns = 2,
  rows = 2,
  gap = "24px"
}: DevModeGridProps) {
  // Responsive columns - 1 on mobile (<640px), 2 on tablet (640-1023px), specified number on desktop (1024px+)
  const [currentColumns, setCurrentColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCurrentColumns(1); // Mobile
      } else if (width < 1024) {
        setCurrentColumns(2); // Tablet - ALWAYS 2 columns
      } else {
        setCurrentColumns(columns); // Desktop - use specified columns
      }
    };
    
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [columns]);

  // Calculate rows based on children count and current columns
  const childrenArray = Children.toArray(children);
  const calculatedRows = Math.ceil(childrenArray.length / currentColumns);
  
  return (
    <div 
      className={`relative ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
        gridTemplateRows: `repeat(${calculatedRows}, auto)`,
        gap
      }}
    >
      {/* Grid overlay visualization - vertical lines only */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Vertical column lines */}
        <div className="absolute inset-0" style={{ display: 'grid', gridTemplateColumns: `repeat(${currentColumns}, 1fr)`, gap }}>
          {Array.from({ length: currentColumns }).map((_, i) => (
            <div key={`col-${i}`} className="relative">
              {i < currentColumns - 1 && (
                <div 
                  className="absolute top-0 right-0 bottom-0 w-px bg-purple-400/40" 
                  style={{ transform: `translateX(calc(${gap} / 2))` }} 
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Grid cell outlines to show all possible card positions */}
        <div className="absolute inset-0" style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
          gridTemplateRows: `repeat(${calculatedRows}, auto)`,
          gap 
        }}>
          {Array.from({ length: currentColumns * calculatedRows }).map((_, i) => {
            const hasContent = i < childrenArray.length;
            return (
              <div 
                key={`cell-${i}`} 
                className={`${!hasContent ? 'border-2 border-purple-300/30 rounded-xl' : ''}`}
              />
            );
          })}
        </div>
      </div>
      
      {/* Wrap each child with horizontal line */}
      {childrenArray.map((child, index) => {
        const row = Math.floor(index / currentColumns) + 1;
        const isLastRow = row === calculatedRows;
        
        return (
          <div key={index} className="relative">
            {child}
            {!isLastRow && (
              <div 
                className="absolute left-0 right-0 h-px bg-purple-400/40" 
                style={{ 
                  bottom: `calc(-${gap} / 2)`,
                  zIndex: 30,
                  pointerEvents: 'none'
                }} 
              />
            )}
          </div>
        );
      })}
    </div>
  );
}