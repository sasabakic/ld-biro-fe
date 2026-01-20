import { twMerge } from "tailwind-merge";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={twMerge("text-center mb-16", className)}>
      <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
      {subtitle && (
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
