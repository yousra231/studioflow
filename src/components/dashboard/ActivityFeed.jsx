import React from 'react';
import { 
  CheckCircle2, 
  FolderKanban, 
  UserPlus, 
  Send, 
  Bell, 
  UserCheck, 
  UserMinus, 
  FolderPlus, 
  FileText, 
  Trash2 
} from 'lucide-react';
import Card from '../common/Card';
import { useData } from '../../context/DataContext';

const ICON_MAP = {
  CheckCircle2,
  FolderKanban,
  UserPlus,
  Send,
  Bell,
  UserCheck,
  UserMinus,
  FolderPlus,
  FileText,
  Trash2,
};

const ActivityFeed = () => {
  const { activities } = useData();

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Activity Stream</h3>
          <p className="text-xs text-slate-500">Real-time audit log of team actions</p>
        </div>
        <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full">
          Live Feed
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {activities.slice(0, 5).map((act) => {
          const IconComponent = ICON_MAP[act.icon] || Bell;

          const colorClasses = {
            emerald: 'bg-emerald-500 text-white ring-4 ring-emerald-500/10',
            indigo: 'bg-indigo-500 text-white ring-4 ring-indigo-500/10',
            blue: 'bg-blue-500 text-white ring-4 ring-blue-500/10',
            amber: 'bg-amber-500 text-white ring-4 ring-amber-500/10',
            rose: 'bg-rose-500 text-white ring-4 ring-rose-500/10',
          };

          return (
            <div key={act.id} className="relative flex items-start justify-between gap-3 group">
              {/* Icon badge on timeline */}
              <div
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  colorClasses[act.color] || colorClasses.indigo
                }`}
              >
                <IconComponent className="w-3 h-3" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                  {act.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  {act.description}
                </p>
              </div>

              <span className="text-[10px] text-slate-400 font-medium shrink-0">
                {act.time}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ActivityFeed;
