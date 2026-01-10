interface ClipboardSparkleIconProps {
  className?: string;
}

export function ClipboardSparkleIcon({ className = "w-6 h-6" }: ClipboardSparkleIconProps) {
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
        d="M8.5 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H14M15.5 4H18C19.1046 4 20 4.89543 20 6V11" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M8 6.4V4.5C8 4.22386 8.22386 4 8.5 4C8.77614 4 9.00422 3.77604 9.05152 3.50398C9.19968 2.65171 9.77399 1 12 1C14.226 1 14.8003 2.65171 14.9485 3.50398C14.9958 3.77604 15.2239 4 15.5 4C15.7761 4 16 4.22386 16 4.5V6.4C16 6.73137 15.7314 7 15.4 7H8.6C8.26863 7 8 6.73137 8 6.4Z" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round"
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
