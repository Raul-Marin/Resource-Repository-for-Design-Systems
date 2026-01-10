import svgPaths from "./svg-7fgtywvn1f";
import imgButtonContainer from "figma:asset/e38155586d0186624512ff563492afa8749edef5.png";

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px] z-[3]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p26bce780} fill="var(--fill-0, #03234D)" id="Icon_2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonContainer() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] isolate items-center justify-center px-[16px] py-0 relative rounded-[9999px] shrink-0 z-[2]" data-name="Button container">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[9999px] size-full" src={imgButtonContainer} />
      <div aria-hidden="true" className="absolute border border-[#e3bbff] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Icon />
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#03234d] text-[14px] text-center text-nowrap z-[2]" style={{ fontVariationSettings: "'wdth' 100" }}>
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
            <g filter="url(#filter0_f_3_4413)" id="shadow-2-large-hover">
              <path d={svgPaths.p2703b200} fill="url(#paint0_linear_3_4413)" fillOpacity="0.2" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="72" id="filter0_f_3_4413" width="132" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_3_4413" stdDeviation="10" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_4413" x1="20" x2="112" y1="36" y2="36">
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

function AgenticButtonNeutralHoverDefault() {
  return (
    <div className="absolute content-stretch flex isolate items-start left-[169.4px] rounded-[9999px] top-[43px]" data-name="✨ Agentic Button - Neutral/Hover/Default">
      <ButtonContainer />
      <AfShadowLarge />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p26bce780} fill="var(--fill-0, #0250D9)" id="Icon_2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonContainer1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[16px] py-0 relative rounded-[9999px] shrink-0" data-name="Button container">
      <div aria-hidden="true" className="absolute border border-[#5c5c5c] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Icon1 />
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#0250d9] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[19px]">Label</p>
      </div>
    </div>
  );
}

function AgenticButtonNeutralDefaultDefault() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[31px] top-[43px]" data-name="✨ Agentic Button - Neutral/Default/Default">
      <ButtonContainer1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <AgenticButtonNeutralHoverDefault />
      <AgenticButtonNeutralDefaultDefault />
    </div>
  );
}