import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../common/Card';
import { useData } from '../../context/DataContext';

const STATUS_COLORS = {
  'In Progress': '#6366f1',
  'Review': '#3b82f6',
  'Completed': '#10b981',
  'On Hold': '#f59e0b',
};

const ProjectStatusChart = () => {
  const { projects } = useData();

  // Aggregate project status distribution dynamically
  const statusCounts = projects.reduce((acc, proj) => {
    acc[proj.status] = (acc[proj.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status],
    color: STATUS_COLORS[status] || '#64748b'
  }));

  const totalProjects = projects.length;

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Project Status</h3>
        <p className="text-xs text-slate-500">Distribution across active workflows</p>
      </div>

      <div className="h-56 relative my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} Projects`, name]}
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#fff',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label inside donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalProjects}</span>
          <span className="text-[11px] font-medium text-slate-400">Total Projects</span>
        </div>
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-slate-600 dark:text-slate-400 font-medium truncate">{item.name}</span>
            <span className="ml-auto font-bold text-slate-900 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProjectStatusChart;
