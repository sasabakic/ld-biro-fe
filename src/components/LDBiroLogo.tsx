interface LDBiroLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function LDBiroLogo({
  width = 40,
  height = 40,
  className = "",
}: LDBiroLogoProps) {
  return (
    <img
      src="/ld-logo.png"
      alt="LD Biro Logo"
      width={width}
      height={height}
      className={`${className} select-none`}
      // style={{
      //   filter: "brightness(0) invert(1)", // Makes black logo white for dark backgrounds
      //   objectFit: "contain",
      // }}
      draggable={false}
      onError={(e) => {
        // Fallback if image doesn't load
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
        console.error("LD Logo image not found at /ld-logo.png");
      }}
    />
  );
}
