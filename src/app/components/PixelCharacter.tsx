interface PixelCharacterProps {
  characterIndex: number;
}

export function PixelCharacter({ characterIndex }: PixelCharacterProps) {
  const characters = [
    // 0: Robot verde - guiña ojo ocasionalmente
    <svg key="robot" viewBox="0 0 60 70" className="w-12 h-auto">
      <rect x="10" y="0" width="10" height="10" fill="#2d5016"/>
      <rect x="20" y="0" width="20" height="10" fill="#2d5016"/>
      <rect x="40" y="0" width="10" height="10" fill="#2d5016"/>
      <rect x="0" y="10" width="10" height="10" fill="#2d5016"/>
      <rect x="10" y="10" width="40" height="30" fill="#5c8a3a"/>
      <rect x="50" y="10" width="10" height="10" fill="#2d5016"/>
      <rect x="15" y="15" width="8" height="8" fill="#fff"/>
      <rect 
        x="37" 
        y="15" 
        width="8" 
        height="8" 
        fill="#fff"
        style={{ animation: 'blink 6s ease-in-out infinite' }}
      />
      <rect x="20" y="25" width="20" height="5" fill="#2d5016"/>
      <rect x="10" y="40" width="10" height="20" fill="#5c8a3a"/>
      <rect x="40" y="40" width="10" height="20" fill="#5c8a3a"/>
      <rect x="10" y="60" width="10" height="10" fill="#2d5016"/>
      <rect x="40" y="60" width="10" height="10" fill="#2d5016"/>
    </svg>,

    // 1: Alien azul - se mueve de lado a lado
    <svg key="alien" viewBox="0 0 50 60" className="w-12 h-auto" style={{ animation: 'wiggle 8s ease-in-out infinite' }}>
      <rect x="10" y="0" width="30" height="10" fill="#1e3a8a"/>
      <rect x="0" y="10" width="10" height="10" fill="#1e3a8a"/>
      <rect x="10" y="10" width="30" height="20" fill="#3b82f6"/>
      <rect x="40" y="10" width="10" height="10" fill="#1e3a8a"/>
      <rect x="12" y="15" width="6" height="10" fill="#000"/>
      <rect x="32" y="15" width="6" height="10" fill="#000"/>
      <rect x="0" y="20" width="10" height="10" fill="#3b82f6"/>
      <rect x="40" y="20" width="10" height="10" fill="#3b82f6"/>
      <rect x="10" y="30" width="30" height="10" fill="#3b82f6"/>
      <rect x="5" y="40" width="10" height="15" fill="#3b82f6"/>
      <rect x="35" y="40" width="10" height="15" fill="#3b82f6"/>
      <rect x="5" y="55" width="10" height="5" fill="#1e3a8a"/>
      <rect x="35" y="55" width="10" height="5" fill="#1e3a8a"/>
    </svg>,

    // 2: Fantasma rosa - sube y baja suavemente
    <svg key="ghost" viewBox="0 0 50 60" className="w-12 h-auto" style={{ animation: 'bounce-subtle 7s ease-in-out infinite' }}>
      <rect x="10" y="0" width="30" height="10" fill="#ec4899"/>
      <rect x="0" y="10" width="50" height="30" fill="#ec4899"/>
      <rect x="10" y="15" width="8" height="8" fill="#fff"/>
      <rect x="32" y="15" width="8" height="8" fill="#fff"/>
      <rect x="13" y="18" width="3" height="3" fill="#000"/>
      <rect x="35" y="18" width="3" height="3" fill="#000"/>
      <rect x="0" y="40" width="10" height="10" fill="#ec4899"/>
      <rect x="10" y="50" width="10" height="10" fill="#ec4899"/>
      <rect x="20" y="40" width="10" height="10" fill="#ec4899"/>
      <rect x="30" y="50" width="10" height="10" fill="#ec4899"/>
      <rect x="40" y="40" width="10" height="10" fill="#ec4899"/>
    </svg>,

    // 3: Monstruo amarillo - abre y cierra la boca
    <svg key="monster" viewBox="0 0 45 60" className="w-12 h-auto">
      <rect x="5" y="0" width="35" height="10" fill="#fbbf24"/>
      <rect x="0" y="10" width="45" height="25" fill="#fde047"/>
      <rect x="8" y="15" width="10" height="8" fill="#fff"/>
      <rect x="27" y="15" width="10" height="8" fill="#fff"/>
      <rect x="11" y="17" width="4" height="4" fill="#000"/>
      <rect x="30" y="17" width="4" height="4" fill="#000"/>
      <rect 
        x="10" 
        y="26" 
        width="25" 
        height="6" 
        fill="#dc2626"
        style={{ animation: 'mouth-open 5s ease-in-out infinite' }}
      />
      <rect x="5" y="35" width="10" height="20" fill="#fde047"/>
      <rect x="30" y="35" width="10" height="20" fill="#fde047"/>
      <rect x="5" y="55" width="10" height="5" fill="#fbbf24"/>
      <rect x="30" y="55" width="10" height="5" fill="#fbbf24"/>
    </svg>,
  ];

  return characters[characterIndex] || null;
}
