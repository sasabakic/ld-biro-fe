import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function Section({
  id,
  children,
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-20 scroll-mt-12 ${className}`}>
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
