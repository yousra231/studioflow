import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, FolderKanban } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useData } from '../../context/DataContext';

const RecentProjects = () => {
  const { projects } = useData();
  const recent = projects.slice(0, 4);

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Projects</h3>
          <p className="text-xs text-slate-500">Recent client deliverables & progress</p>
        </div>
        <NavLink
          to="/projects"
          className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>

      <div className="space-y-4">
        {recent.map((project) => (
          <div
            key={project.id}
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                  <FolderKanban className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {project.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">{project.clientName}</p>
                </div>
              </div>
              <Badge status={project.status} size="sm" />
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-1">
                <span>Progress</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{project.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentProjects;
