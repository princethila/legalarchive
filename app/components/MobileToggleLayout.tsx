// components/MobileToggleLayout.tsx
"use client";

import { useState } from 'react';
import { FileText, AlignLeft, BarChart3 } from 'lucide-react';

export default function MobileToggleLayout({ 
  children, 
  sidebar 
}: { 
  children: React.ReactNode; 
  sidebar: React.ReactNode; 
}) {
  const [activeTab, setActiveTab] = useState<'text' | 'summary'>('text');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Tab Switcher - Only visible on small screens */}
      <div className="lg:hidden sticky top-10 z-30 flex bg-white border-b border-slate-100 p-1">
        <button 
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'text' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}
        >
          <AlignLeft className="h-3.5 w-3.5" /> Full Text
        </button>
        <button 
          onClick={() => setActiveTab('summary')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'summary' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
        >
          <FileText className="h-3.5 w-3.5" /> FIPAC Summary
        </button>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto">
        {/* Main Content Pane */}
        <div className={`flex-1 ${activeTab === 'summary' ? 'hidden lg:block' : 'block'}`}>
          {children}
        </div>

        {/* Sidebar Pane */}
        <div className={`w-full lg:flex-1 ${activeTab === 'text' ? 'hidden lg:block' : 'block'}`}>
          {sidebar}
        </div>
      </div>
    </div>
  );
}