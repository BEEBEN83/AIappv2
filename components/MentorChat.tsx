import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { SUGGESTED_QUESTIONS } from '../constants';
import { sendMessageToGemini } from '../services/geminiService';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export const MentorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hallo! Ik ben je AI-Mentor. Ik kan je helpen met vragen over het schoolbeleid, didactiek of het gebruik van tools zoals Gemini en NotebookLM. Waar kan ik je mee helpen?', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Filter messages for history (excluding timestamp for API)
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await sendMessageToGemini(text, history);

    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-indigo-600 p-4 flex items-center gap-3 text-white">
          <div className="p-2 bg-indigo-500 rounded-full">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold">AI Mentor</h2>
            <p className="text-xs text-indigo-200">Stel je vragen over AI en onderwijs</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-indigo-100 text-indigo-600'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <Sparkles className="w-5 h-5" />}
              </div>
              <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 animate-pulse" />
               </div>
               <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                 <div className="flex gap-1">
                   <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                   <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                   <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length < 3 && !isTyping && (
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Voorbeeldvragen</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-white border border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Typ je vraag hier..."
              rows={1}
              className="w-full pl-4 pr-12 py-3 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-xl resize-none text-slate-800 placeholder-slate-400"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            AI kan fouten maken. Controleer belangrijke informatie. (Schoolafspraak #2)
          </p>
        </div>
      </div>
    </div>
  );
};