import svgPaths from "../../imports/svg-7fgtywvn1f";
import imgButtonContainerHover from "../../assets/e38155586d0186624512ff563492afa8749edef5.png";

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g>
          <path d={svgPaths.p26bce780} fill="#0250D9" />
        </g>
      </svg>
    </div>
  );
}

function AfShadowLarge() {
  return (
    <div className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity" data-name="_AF Shadow - Large">
      <div className="absolute inset-[-62.5%_-21.74%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 132 72">
          <g>
            <g filter="url(#filter0_f_secondary)">
              <path d={svgPaths.p2703b200} fill="url(#paint0_linear_secondary)" fillOpacity="0.2" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="72" id="filter0_f_secondary" width="132" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_secondary" stdDeviation="10" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_secondary" x1="20" x2="112" y1="36" y2="36">
              <stop stopColor="#0250D9" />
              <stop offset="0.355139" stopColor="#1AB9FF" />
              <stop offset="0.737151" stopColor="#9602C7" />
              <stop offset="0.904245" stopColor="#0250D9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export function SecondaryButton({ children, onClick, icon, className = "", type = "button" }: SecondaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`content-stretch flex isolate items-start relative rounded-full transition-transform hover:scale-[1.02] active:scale-[0.98] group w-full sm:w-auto ${className}`}
    >
      <div className="content-stretch flex gap-2 h-[44px] isolate items-center justify-center px-4 py-0 relative rounded-full shrink-0 z-[2] bg-white group-hover:bg-transparent w-full">
        {/* Hover background image */}
        <img 
          alt="" 
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-full size-full opacity-0 group-hover:opacity-100 transition-opacity" 
          src={imgButtonContainerHover} 
        />
        
        {/* Default border (dark) */}
        <div 
          aria-hidden="true" 
          className="absolute border border-[#5c5c5c] border-solid inset-0 pointer-events-none rounded-full group-hover:opacity-0 transition-opacity" 
        />
        
        {/* Hover border (purple) */}
        <div 
          aria-hidden="true" 
          className="absolute border border-[#e3bbff] border-solid inset-0 pointer-events-none rounded-full opacity-0 group-hover:opacity-100 transition-opacity" 
        />
        
        {icon ? (
          <div className="relative shrink-0 size-[14px] z-[3] [&_svg]:w-[14px] [&_svg]:h-[14px] [&_svg]:text-[#0250D9] group-hover:[&_svg]:text-[#03234D] transition-colors">
            {icon}
          </div>
        ) : (
          <div className="relative shrink-0 size-[14px] z-[3]">
            <Icon />
          </div>
        )}
        
        <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#0250d9] group-hover:text-[#03234d] text-sm text-center text-nowrap z-[2] transition-colors">
          <p className="leading-[19px]">{children}</p>
        </div>
      </div>
      <AfShadowLarge />
    </button>
  );
}