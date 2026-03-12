interface SkillPillProps {
  name: string;
  proficiency: number; // 1-5
}

export default function SkillPill({ name, proficiency }: SkillPillProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-blue-100 hover:border-brand-400 hover:shadow-sm transition-all duration-200">
      <span className="text-sm font-medium text-gray-800">{name}</span>
      <div className="flex items-center gap-1 ml-4" aria-label={`Proficiency: ${proficiency} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="proficiency-dot"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i < proficiency ? '#3B82F6' : '#E5E7EB',
              display: 'inline-block',
            }}
          />
        ))}
      </div>
    </div>
  );
}
