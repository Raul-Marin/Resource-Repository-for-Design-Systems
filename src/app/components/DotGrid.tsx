export function DotGrid() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `radial-gradient(circle, #334155 2px, transparent 2px)`,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0',
        opacity: 0.3
      }}
    />
  );
}