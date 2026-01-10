interface BookSparkleIconProps {
  className?: string;
}

export function BookSparkleIcon({ className = "w-6 h-6" }: BookSparkleIconProps) {
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
        d="M4 19V5C4 3.89543 4.89543 3 6 3H14M20 16.7143V12" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M6 17L20 17" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M6 21L20 21" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M9 7L12 7" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M14 5.5C17.1338 5.5 18.5 4.18153 18.5 1C18.5 4.18153 19.8567 5.5 23 5.5C19.8567 5.5 18.5 6.85669 18.5 10C18.5 6.85669 17.1338 5.5 14 5.5Z" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
