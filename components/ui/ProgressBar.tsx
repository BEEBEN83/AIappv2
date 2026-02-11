import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700">Voortgang Cursus</span>
        <span className="text-sm font-medium text-slate-700">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-slate-500 mt-1">{current} van de {total} opdrachten voltooid</p>
    </div>
  );
};