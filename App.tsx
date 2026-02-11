import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { Dashboard } from './components/Dashboard';
import { Course } from './components/Course';
import { Policy } from './components/Policy';
import { MentorChat } from './components/MentorChat';
import { LayoutDashboard, BookOpen, Shield, MessageSquare, Menu, X } from 'lucide-react';
import { APP_TITLE } from './constants';
import clsx from 'clsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [completedAssignments, setCompletedAssignments] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Persistence Logic
  useEffect(() => {
    const saved = localStorage.getItem('ai-gids-progress');
    if (saved) {
      try {
        setCompletedAssignments(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ai-gids-progress', JSON.stringify(completedAssignments));
  }, [completedAssignments]);

  const toggleAssignment = (id: string) => {
    setCompletedAssignments(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      return [...prev, id];
    });
  };

  const navItems = [
    { view: ViewState.DASHBOARD, label: 'Home', icon: <LayoutDashboard className="w-5 h-5" /> },
    { view: ViewState.COURSE, label: 'Cursus', icon: <BookOpen className="w-5 h-5" /> },
    { view: ViewState.POLICY, label: 'Beleid', icon: <Shield className="w-5 h-5" /> },
    { view: ViewState.MENTOR, label: 'AI Mentor', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">AI</div>
              <span className="font-bold text-xl tracking-tight text-slate-800">{APP_TITLE}</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => setCurrentView(item.view)}
                  className={clsx(
                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors gap-2",
                    currentView === item.view
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    setCurrentView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={clsx(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium",
                    currentView === item.view
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-64px)]">
        {currentView === ViewState.DASHBOARD && (
          <Dashboard onChangeView={setCurrentView} completedAssignments={completedAssignments} />
        )}
        {currentView === ViewState.COURSE && (
          <Course completedAssignments={completedAssignments} toggleAssignment={toggleAssignment} />
        )}
        {currentView === ViewState.POLICY && (
          <Policy />
        )}
        {currentView === ViewState.MENTOR && (
          <MentorChat />
        )}
      </main>
    </div>
  );
};

export default App;