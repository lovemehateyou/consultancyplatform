import { Badge } from "@/components/ui/badge";

type TagColor = "blue" | "orange" | "yellow" | "green" | "purple" | "red";

interface TagProps {
  label: string;
  color: TagColor;
}

const Tag = ({ label, color }: TagProps) => {
  const colorClasses: Record<TagColor, string> = {
    blue: "bg-tag-blue-bg text-tag-blue border-tag-blue/20",
    orange: "bg-tag-orange-bg text-tag-orange border-tag-orange/20",
    yellow: "bg-tag-yellow-bg text-tag-yellow border-tag-yellow/20",
    green: "bg-tag-green-bg text-tag-green border-tag-green/20",
    purple: "bg-tag-purple-bg text-tag-purple border-tag-purple/20",
    red: "bg-tag-red-bg text-tag-red border-tag-red/20",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colorClasses[color]}`}>
      {label}
    </span>
  );
};

const SkillsInterests = () => {
  const skills: TagProps[] = [
    { label: "UI/UX Design", color: "blue" },
    { label: "Figma", color: "orange" },
    { label: "Prototyping", color: "yellow" },
    { label: "User Research", color: "green" },
    { label: "Design Systems", color: "purple" },
  ];

  const interests: TagProps[] = [
    { label: "Photography", color: "red" },
    { label: "Travel", color: "green" },
    { label: "Technology", color: "blue" },
    { label: "Art", color: "orange" },
    { label: "Music", color: "purple" },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="font-semibold text-foreground mb-4">Skills & Interests</h2>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Tag key={skill.label} {...skill} />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <Tag key={interest.label} {...interest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsInterests;
