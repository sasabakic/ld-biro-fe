import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface LDBiroLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function LDBiroLogo({
  width = 40,
  height = 40,
  className,
}: LDBiroLogoProps) {
  return (
    <Image
      src="/ld-logo.png"
      alt="LD Biro Logo"
      width={width}
      height={height}
      className={twMerge("select-none", className)}
      draggable={false}
      priority={width >= 40} // Prioritize larger logos (likely above fold)
    />
  );
}
