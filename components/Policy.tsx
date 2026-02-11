import React, { useState } from 'react';
import { POLICY_SECTIONS } from '../constants';
import { Search, FileText } from 'lucide-react';

export const Policy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = POLICY_SECTIONS.filter(section => {
    const term = searchTerm.toLowerCase();
    return (
      section.title.toLowerCase().includes(term) ||
      section.content.some(line => line.toLowerCase().includes(term))
    );
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`policy-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row min-h-screen bg-slate-50">
      
      {/* Search & Sidebar */}
      <div className="md:w-72 bg-white border-r border-slate-200 p-6 md:h-screen md:sticky md:top-0 overflow-y-auto z-10">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          Beleid 2026
        </h2>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Zoek in beleid..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <nav className="space-y-1">
          {POLICY_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors truncate"
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white shadow-sm border border-slate-200 rounded-xl p-8 md:p-12">
          <div className="text-center mb-10 pb-8 border-b border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">AI-beleid Erfgooiers College</h1>
            <p className="text-slate-500 font-medium">Geldig vanaf 1 januari 2026</p>
          </div>

          {filteredSections.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              Geen resultaten gevonden voor "{searchTerm}".
            </div>
          ) : (
            <div className="space-y-12">
              {filteredSections.map((section) => (
                <div key={section.id} id={`policy-${section.id}`} className="scroll-mt-24">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                    {section.title}
                  </h3>
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                  {section.subsections?.map((sub, subIdx) => (
                    <div key={subIdx} className="mt-6 ml-4">
                      <h4 className="font-semibold text-slate-900 mb-2">{sub.title}</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {sub.content.map((item, i) => (
                          <li key={i} className="text-slate-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-20"></div> {/* Bottom spacer */}
      </div>
    </div>
  );
};