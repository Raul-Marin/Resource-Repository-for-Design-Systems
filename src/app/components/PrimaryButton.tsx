import svgPaths from "../../imports/svg-o509xltl6l";
import imgButtonContainer from "figma:asset/a0f87776c888513910df69cceefea298d6ab148f.png";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g>
          <path d={svgPaths.p26bce780} fill="white" />
        </g>
      </svg>
    </div>
  );
}

function AfShadowLarge() {
  return (
    <div className="absolute inset-0 z-[1] opacity-100 transition-opacity" data-name="_AF Shadow - Large">
      <div className="absolute inset-[-62.5%_-21.74%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 132 72">
          <g>
            <g filter="url(#filter0_f_3_4285)">
              <path d={svgPaths.p2703b200} fill="url(#paint0_linear_3_4285)" fillOpacity="0.3" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="72" id="filter0_f_3_4285" width="132" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_3_4285" stdDeviation="10" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_4285" x1="20" x2="112" y1="36" y2="36">
              <stop stopColor="#0250D9" />
              <stop offset="0.355139" stopColor="#1AB9FF" />
              <stop offset="0.709972" stopColor="#9602C7" />
              <stop offset="0.975" stopColor="#0250D9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export function PrimaryButton({ children, onClick, icon, className = "", type = "button", disabled = false }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`content-stretch flex isolate items-start relative rounded-full transition-transform ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'} group w-full sm:w-auto ${className}`}
      type={type}
      disabled={disabled}
    >
      <div className="content-stretch flex gap-2 h-[44px] items-center justify-center px-4 sm:px-4 py-0 relative rounded-full shrink-0 z-[2] bg-transparent w-full">
        {/* Background image always visible */}
        <img 
          alt="" 
          className={`absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-full size-full opacity-100 transition-opacity ${disabled ? 'grayscale' : ''}`}
          src={imgButtonContainer} 
        />
        {icon ? (
          <div className="relative shrink-0 size-[14px] [&_svg]:w-[14px] [&_svg]:h-[14px] [&_svg]:text-white z-[3]">
            {icon}
          </div>
        ) : (
          <div className="relative z-[3]">
            <Icon />
          </div>
        )}
        <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-sm text-center text-nowrap text-white z-[3]">
          <p className="leading-[19px]">{children}</p>
        </div>
      </div>
      <AfShadowLarge />
    </button>
  );
}