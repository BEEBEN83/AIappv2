import React, { useState } from 'react';
import { COURSE_MODULES } from '../constants';
import { BlockType, ContentBlock } from '../types';
import { CheckCircle2, Circle, AlertTriangle, Lightbulb, Info, FileText, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface CourseProps {
  completedAssignments: string[];
  toggleAssignment: (id: string) => void;
}

export const Course: React.FC<CourseProps> = ({ completedAssignments, toggleAssignment }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = COURSE_MODULES[activeModuleIndex];

  // Scroll to top when changing modules
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeModuleIndex]);

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case BlockType.TEXT:
        return <p key={index} className="mb-4 text-slate-700 leading-relaxed">{block.content}</p>;
      
      case BlockType.LIST:
         return (
          <div key={index} className="mb-6">
            {block.title && <h4 className="font-semibold text-slate-800 mb-2">{block.title}</h4>}
            <ul className="list-disc pl-5 space-y-2">
              {(block.content as string[]).map((item, i) => (
                <li key={i} className="text-slate-700">{item}</li>
              ))}
            </ul>
          </div>
         );

      case BlockType.CALLOUT:
        const styles = {
          info: 'bg-blue-50 border-blue-200 text-blue-800',
          warning: 'bg-amber-50 border-amber-200 text-amber-800',
          success: 'bg-green-50 border-green-200 text-green-800',
          tip: 'bg-purple-50 border-purple-200 text-purple-800',
        };
        const icons = {
          info: <Info className="w-5 h-5 flex-shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
          success: <CheckCircle2 className="w-5 h-5 flex-shrink-0" />,
          tip: <Lightbulb className="w-5 h-5 flex-shrink-0" />,
        };
        const variant = block.variant || 'info';

        return (
          <div key={index} className={clsx("p-4 rounded-lg border mb-6 flex gap-3", styles[variant])}>
            {icons[variant]}
            <div>
              {block.title && <strong className="block mb-1 font-semibold">{block.title}</strong>}
              <p className="text-sm opacity-90">{block.content}</p>
            </div>
          </div>
        );

      case BlockType.POLICY_RULE:
        return (
          <div key={index} className="mb-6 pl-4 border-l-4 border-indigo-500 bg-slate-50 p-4 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold uppercase text-xs tracking-wider">
              <FileText className="w-4 h-4" /> Beleidsanker
            </div>
            {block.title && <h4 className="font-bold text-slate-900 mb-1">{block.title}</h4>}
            <p className="text-slate-700 italic">"{block.content}"</p>
          </div>
        );

      case BlockType.ASSIGNMENT:
        const isCompleted = block.id ? completedAssignments.includes(block.id) : false;
        return (
          <div 
            key={index} 
            onClick={() => block.id && toggleAssignment(block.id)}
            className={clsx(
              "group cursor-pointer mb-6 p-5 rounded-xl border-2 transition-all relative overflow-hidden",
              isCompleted 
                ? "bg-green-50 border-green-500" 
                : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
            )}
          >
            <div className="flex items-start gap-4 z-10 relative">
              <div className={clsx("mt-1 transition-colors", isCompleted ? "text-green-600" : "text-slate-300 group-hover:text-indigo-400")}>
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </div>
              <div>
                <h4 className={clsx("font-bold mb-1", isCompleted ? "text-green-900" : "text-slate-900")}>
                  {block.title || 'Opdracht'}
                </h4>
                <p className={clsx("text-sm", isCompleted ? "text-green-800" : "text-slate-600")}>
                  {block.content}
                </p>
                <div className="mt-3 text-xs font-medium uppercase tracking-wide opacity-60">
                  {isCompleted ? 'Voltooid' : 'Klik om af te vinken'}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full max-w-6xl mx-auto">
      {/* Sidebar Navigation */}
      <div className="lg:w-64 bg-white border-r border-slate-200 flex-shrink-0 lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 overflow-y-auto">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="font-bold text-slate-800">Inhoudsopgave</h2>
        </div>
        <nav className="p-2 space-y-1">
          {COURSE_MODULES.map((module, idx) => {
             // Calculate completion for sidebar status
            const modAssignments = module.sections.flatMap(s => s.blocks).filter(b => b.type === 'assignment').map(b => b.id!);
            const isDone = modAssignments.length > 0 && modAssignments.every(id => completedAssignments.includes(id));
            
            return (
              <button
                key={module.id}
                onClick={() => setActiveModuleIndex(idx)}
                className={clsx(
                  "w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors flex justify-between items-center",
                  activeModuleIndex === idx 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span className="truncate pr-2">{module.title}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300" key={activeModule.id}>
          <header className="mb-8 border-b border-slate-100 pb-6">
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2 block">Module {activeModuleIndex + 1}</span>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{activeModule.title}</h1>
            <p className="text-lg text-slate-600">{activeModule.description}</p>
          </header>

          <div className="space-y-10">
            {activeModule.sections.map((section, sIdx) => (
              <section key={sIdx}>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{section.title}</h3>
                {section.blocks.map((block, bIdx) => renderBlock(block, bIdx))}
              </section>
            ))}
          </div>

          {/* Navigation Footer */}
          <div className="mt-16 pt-6 border-t border-slate-200 flex justify-between">
            <button
              disabled={activeModuleIndex === 0}
              onClick={() => setActiveModuleIndex(prev => prev - 1)}
              className="px-4 py-2 text-slate-600 disabled:opacity-30 hover:text-indigo-600 font-medium transition-colors"
            >
              ← Vorige
            </button>
            <button
              disabled={activeModuleIndex === COURSE_MODULES.length - 1}
              onClick={() => setActiveModuleIndex(prev => prev + 1)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center gap-2 disabled:bg-slate-300"
            >
              Volgende <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};