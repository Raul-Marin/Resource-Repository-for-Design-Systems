interface RefreshSparkleIconProps {
  className?: string;
}

export function RefreshSparkleIcon({ className = "w-6 h-6" }: RefreshSparkleIconProps) {
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
        d="M21.1679 8C19.6248 4.46819 16.1006 2 12 2C6.81465 2 2.5511 5.94668 2.04938 11" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C13.0764 22 14.0673 21.8452 15 21.5576M22 13C21.9315 13.6897 21.793 14.3588 21.5916 15" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M14 18.5C17.1338 18.5 18.5 17.1815 18.5 14C18.5 17.1815 19.8567 18.5 23 18.5C19.8567 18.5 18.5 19.8567 18.5 23C18.5 19.8567 17.1338 18.5 14 18.5Z" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
