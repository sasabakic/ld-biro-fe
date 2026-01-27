import { ReactNode } from "react";

interface ContactInfoItemProps {
  icon: string;
  label: string;
  children: ReactNode;
}

export default function ContactInfoItem({
  icon,
  label,
  children,
}: ContactInfoItemProps) {
  return (
    <div className="flex items-start">
      <div className="text-2xl mr-4">{icon}</div>
      <div>
        <h4 className="font-semibold text-slate-900">{label}</h4>
        <div className="text-slate-700">{children}</div>
      </div>
    </div>
  );
}
