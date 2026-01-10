interface PackageSparkleIconProps {
  className?: string;
}

export function PackageSparkleIcon({ className = "w-6 h-6" }: PackageSparkleIconProps) {
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
        d="M14 20.8889L13 21.4444L12.2914 21.8381C12.1102 21.9388 11.8898 21.9388 11.7086 21.8381L3.30861 17.1715C3.11813 17.0656 3 16.8649 3 16.647L2.99998 7.35304C2.99998 7.13514 3.11812 6.93437 3.3086 6.82855L11.7086 2.16188C11.8898 2.06121 12.1102 2.06121 12.2914 2.16188L20.6914 6.82855C20.8818 6.93437 21 7.13514 21 7.35304L21 14" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M3.52844 7.29357L11.7086 11.8381C11.8898 11.9388 12.1102 11.9388 12.2914 11.8381L20.5 7.27777" 
        stroke="currentColor"
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 21L12 12" 
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
