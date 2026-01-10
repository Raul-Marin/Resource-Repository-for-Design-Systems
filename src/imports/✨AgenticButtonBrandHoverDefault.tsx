import svgPaths from "./svg-o509xltl6l";
import imgButtonContainer from "figma:asset/a0f87776c888513910df69cceefea298d6ab148f.png";

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p26bce780} fill="var(--fill-0, white)" id="Icon_2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonContainer() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[16px] py-0 relative rounded-[9999px] shrink-0 z-[2]" data-name="Button container">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[9999px] size-full" src={imgButtonContainer} />
      <Icon />
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[19px]">Label</p>
      </div>
    </div>
  );
}

function AfShadowLarge() {
  return (
    <div className="absolute inset-0 z-[1]" data-name="_AF Shadow - Large">
      <div className="absolute inset-[-62.5%_-21.74%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 132 72">
          <g id="_AF Shadow - Large">
            <g filter="url(#filter0_f_3_4285)" id="shadow-1-large-hover">
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

export default function AgenticButtonBrandHoverDefault() {
  return (
    <div className="content-stretch flex isolate items-start relative rounded-[9999px] size-full" data-name="✨ Agentic Button - Brand/Hover/Default">
      <ButtonContainer />
      <AfShadowLarge />
    </div>
  );
}