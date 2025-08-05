import React from 'react';
import { Skill } from '../types';

interface SkillBadgeProps {
  skill: Skill;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <div className="glassmorphic flex items-center gap-3 px-4 py-2 rounded-md border border-slate-700/50 hover:border-sky-400 hover:bg-slate-700/70 transition-all duration-300 cursor-pointer">
      <div className="text-sky-400">{skill.icon}</div>
      <span className="text-white font-medium">{skill.name}</span>
    </div>
  );
};

export default SkillBadge;