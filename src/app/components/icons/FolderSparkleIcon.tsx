interface FolderSparkleIconProps {
  className?: string;
}

export function FolderSparkleIcon({ className = "w-6 h-6" }: FolderSparkleIconProps) {
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
        d="M2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V10.4C22 10.7314 21.7314 11 21.4 11H2.6C2.26863 11 2 10.7314 2 10.4V4.6C2 4.26863 2.26863 4 2.6 4Z" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M22 10V15" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M2 10V19.4C2 19.7314 2.26863 20 2.6 20H11.5" 
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
