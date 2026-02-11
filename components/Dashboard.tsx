import React from 'react';
import { ViewState } from '../types';
import { ProgressBar } from './ui/ProgressBar';
import { BookOpen, Shield, MessageSquare, GraduationCap } from 'lucide-react';
import { COURSE_MODULES } from '../constants';

interface DashboardProps {
  onChangeView: (view: ViewState) => void;
  completedAssignments: string[];
}

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView, completedAssignments }) => {
  const totalAssignments = COURSE_MODULES.reduce((acc, mod) => {
    return acc + mod.sections.reduce((sAcc, sec) => {
      return sAcc + sec.blocks.filter(b => b.type === 'assignment').length;
    }, 0);
  }, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welkom bij de AI-Gids</h1>
        <p className="text-lg text-slate-600">Erfgooiers College • Professionalisering & Beleid 2026</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            Jouw AI-Traject
          </h2>
          <ProgressBar current={completedAssignments.length} total={totalAssignments} />
          
          <div className="mt-6">
             <button 
              onClick={() => onChangeView(ViewState.COURSE)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              {completedAssignments.length > 0 ? 'Verder met cursus' : 'Start de Cursus'}
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm border border-indigo-100 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-indigo-900 mb-2">Snel naar</h3>
            <p className="text-sm text-indigo-700 mb-4">Directe toegang tot ondersteuning.</p>
          </div>
          <div className="space-y-3">
             <button 
                onClick={() => onChangeView(ViewState.POLICY)}
                className="w-full flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg border border-indigo-200 transition-colors text-sm font-medium"
              >
                <Shield className="w-4 h-4" />
                Beleid 2026
              </button>
              <button 
                onClick={() => onChangeView(ViewState.MENTOR)}
                className="w-full flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg border border-indigo-200 transition-colors text-sm font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                Vraag de Mentor
              </button>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-800 mb-4">Modules</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSE_MODULES.map((module) => {
          // Check if module is started/completed based on assignments
          const moduleAssignmentIds = module.sections.flatMap(s => s.blocks).filter(b => b.type === 'assignment').map(b => b.id!);
          const completedCount = moduleAssignmentIds.filter(id => completedAssignments.includes(id)).length;
          const isComplete = moduleAssignmentIds.length > 0 && completedCount === moduleAssignmentIds.length;
          const isStarted = completedCount > 0;

          return (
            <div 
              key={module.id} 
              onClick={() => onChangeView(ViewState.COURSE)}
              className={`p-5 rounded-lg border cursor-pointer transition-all hover:shadow-md ${isComplete ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Module</span>
                {isComplete && <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full font-medium">Voltooid</span>}
                {!isComplete && isStarted && <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-medium">Bezig</span>}
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">{module.title}</h4>
              <p className="text-sm text-slate-600 line-clamp-2">{module.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};