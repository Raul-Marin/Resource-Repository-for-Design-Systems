import svgPaths from "./svg-osgtoeiqmm";

function StandardIconsAAccount() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Standard Icons / A / account">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Standard Icons / A / account">
          <rect fill="var(--fill-0, #5867E8)" height="24" id="Icon Background" rx="4" width="24" />
          <path d={svgPaths.p395ec900} fill="var(--fill-0, white)" id="account" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[9999px] shrink-0" data-name="Left icon">
      <StandardIconsAAccount />
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="basis-0 flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#03234d] text-[20px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[28px] overflow-ellipsis overflow-hidden">Title</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <div className="absolute inset-[0_-97.57%_-67.03%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.66 23.3846">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p30cac400} fill="var(--fill-0, #0250D9)" fillRule="evenodd" id="Icon_2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ButtonIconContainer() {
  return (
    <div className="bg-white h-[32px] min-w-[32px] relative rounded-[9999px] shrink-0" data-name="Button icon container">
      <div className="content-stretch flex gap-[2px] h-full items-center justify-center min-w-[inherit] overflow-clip px-[8px] py-0 relative rounded-[inherit]">
        <Icon />
      </div>
      <div aria-hidden="true" className="absolute border border-[#5c5c5c] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function OverflowMenu() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[32px] relative rounded-[9999px] shrink-0" data-name="Overflow menu">
      <ButtonIconContainer />
    </div>
  );
}

function CardHeader() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Card header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative w-full">
          <LeftIcon />
          <Content />
          <OverflowMenu />
        </div>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="basis-0 bg-[#ece1f9] grow min-h-px min-w-px relative rounded-[12px] shrink-0 w-full" data-name="_Placeholder">
      <div aria-hidden="true" className="absolute border-2 border-[#7526e3] border-dashed inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[16px] relative size-full">
          <div className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[0] relative shrink-0 text-[#2e2e2e] text-[0px] text-center tracking-[-0.078px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[18px] mb-0 text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Placeholder Content
            </p>
            <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[17px] text-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              replace with a local component
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBody() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full" data-name="Card body">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[16px] pt-0 px-[16px] relative size-full">
          <Placeholder />
        </div>
      </div>
    </div>
  );
}

function TextUnderline() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start justify-center relative shrink-0" data-name="Text + underline">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[18px] overflow-ellipsis overflow-hidden relative shrink-0 text-[#0250d9] text-[13px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        View All
      </p>
    </div>
  );
}

function TextLink() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0" data-name="📝 Text Link">
      <TextUnderline />
    </div>
  );
}

function CardFooter() {
  return (
    <div className="bg-white h-[42px] relative rounded-bl-[20px] rounded-br-[20px] shrink-0 w-full" data-name="Card footer">
      <div aria-hidden="true" className="absolute border-[#c9c9c9] border-[1px_0px_0px] border-solid inset-0 pointer-events-none rounded-bl-[20px] rounded-br-[20px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative size-full">
          <TextLink />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px overflow-clip relative rounded-[20px] shrink-0 w-full z-[3]" data-name="⚡ Card">
      <CardHeader />
      <CardBody />
      <CardFooter />
    </div>
  );
}

function AfCardShadow() {
  return (
    <div className="absolute inset-[0_0_0_1px] z-[1]" data-name="_AF card shadow">
      <div className="absolute blur-[6px] filter inset-0 rounded-[20px]" data-name="Glow" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 395 240\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(39.47 -24.084 39.403 97.092 0.97063 240.51)\\\'><stop stop-color=\\\'rgba(26,185,255,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(48,175,255,1)\\\' offset=\\\'0.0625\\\'/><stop stop-color=\\\'rgba(70,164,255,1)\\\' offset=\\\'0.125\\\'/><stop stop-color=\\\'rgba(115,143,255,1)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(159,122,255,1)\\\' offset=\\\'0.375\\\'/><stop stop-color=\\\'rgba(203,101,255,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(153,96,246,1)\\\' offset=\\\'0.625\\\'/><stop stop-color=\\\'rgba(103,91,236,1)\\\' offset=\\\'0.75\\\'/><stop stop-color=\\\'rgba(77,88,231,1)\\\' offset=\\\'0.8125\\\'/><stop stop-color=\\\'rgba(52,85,227,1)\\\' offset=\\\'0.875\\\'/><stop stop-color=\\\'rgba(27,83,222,1)\\\' offset=\\\'0.9375\\\'/><stop stop-color=\\\'rgba(15,81,219,1)\\\' offset=\\\'0.96875\\\'/><stop stop-color=\\\'rgba(2,80,217,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }} />
    </div>
  );
}

export default function AgenticCard() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] isolate items-start relative size-full" data-name="✨ Agentic Card">
      <Card />
      <AfCardShadow />
    </div>
  );
}