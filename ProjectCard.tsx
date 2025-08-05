import React from 'react';
import { Project } from '../types';
import { ExternalLinkIcon, GitHubIcon } from './icons/Icons';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="glassmorphic p-6 rounded-lg flex flex-col h-full transition-all duration-300 hover:border-sky-400 tilt-effect">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-orbitron text-xl font-bold text-white">{project.title}</h3>
          <div className="flex items-center gap-4">
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="GitHub repository">
                    <GitHubIcon className="w-6 h-6" />
                </a>
            )}
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="Live demo">
              <ExternalLinkIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
        <p className="text-slate-400 mb-4">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span key={tag} className="bg-slate-700/50 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;