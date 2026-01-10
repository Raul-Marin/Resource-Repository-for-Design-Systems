export function LoadingState() {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center py-16">
      {/* Animated loading icon */}
      <div className="relative mb-6">
        {/* Outer spinning ring */}
        <div 
          className="w-16 h-16 rounded-full border-3 border-gray-200/60"
          style={{
            borderTopColor: 'var(--color-primary, #9333ea)',
            animation: 'spin 1.2s linear infinite'
          }}
        />
        
        {/* Inner pulsing dot */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
        >
          <div 
            className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"
            style={{
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
        </div>
      </div>
      
      {/* Loading text */}
      <p className="text-sm text-gray-500 font-medium mb-2">
        Loading resources...
      </p>
      
      {/* Subtle hint */}
      <p className="text-xs text-gray-400">
        This may take a moment
      </p>
      
      {/* Skeleton preview - optional subtle animation */}
      <div className="mt-12 w-full max-w-2xl space-y-4 px-4">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="h-24 rounded-xl bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse"
            style={{
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
