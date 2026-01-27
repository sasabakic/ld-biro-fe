interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  id: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  id,
}: ServiceCardProps) {
  return (
    <div
      id={id}
      className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition-shadow group hover:bg-blue-50 scroll-mt-24"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-800">
        {title}
      </h3>
      <p className="text-slate-700">{description}</p>
    </div>
  );
}
