interface HomeSparkleIconProps {
  className?: string;
  strokeWidth?: number;
}

export function HomeSparkleIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: HomeSparkleIconProps) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M3 9.5L12 4L21 9.5" 
        stroke="currentColor"
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" 
        stroke="currentColor"
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M13.6667 17H10.3333V13.6667H13.6667V17Z" 
        stroke="currentColor"
        strokeWidth={strokeWidth} 
        strokeLinejoin="round"
      />
      <path 
        d="M14 9.5C17.1338 9.5 18.5 8.18153 18.5 5C18.5 8.18153 19.8567 9.5 23 9.5C19.8567 9.5 18.5 10.8567 18.5 14C18.5 10.8567 17.1338 9.5 14 9.5Z" 
        stroke="currentColor"
        strokeWidth={strokeWidth} 
        strokeLinejoin="round"
      />
    </svg>
  );
}
