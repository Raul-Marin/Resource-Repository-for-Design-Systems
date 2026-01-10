import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
  sectionKey: string;
}

export function PageTransition({ children, sectionKey }: PageTransitionProps) {
  const [displayedContent, setDisplayedContent] = useState(children);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Primero fade-out
    setIsVisible(false);

    // Esperar a que termine el fade-out, luego cambiar contenido
    const contentTimer = setTimeout(() => {
      setDisplayedContent(children);
      // Pequeño delay antes del fade-in
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    }, 400); // Espera a que termine el fade-out (400ms)

    return () => {
      clearTimeout(contentTimer);
    };
  }, [sectionKey, children]);

  return (
    <div
      className={`transition-opacity duration-[400ms] ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {displayedContent}
    </div>
  );
}