"use client";

import { useState } from 'react';
import { FileText, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { Scale, ChevronRight } from 'lucide-react';
import Link from 'next/link';


interface SidebarProps {
  judgmentId: string;
  sections: { facts?: string; issues?: string; principles?: string; application?: string; conclusion?: string; };
  similar_cases: any[]
}

export default function JudgementSidebar({ judgmentId, sections, similar_cases}: SidebarProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);
  

  return (
    <aside className="w-full lg:flex-1 p-6 space-y-6 lg:sticky lg:top-10 lg:h-[calc(100vh-2.5rem)] overflow-y-auto">
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <FileText className="h-3 w-3" /> FIPAC Analysis
          </h3>
          
          <div className="flex items-center gap-3">
            <button 
                onClick={() => setVoted('up')}
                className={`p-1 transition-colors ${voted === 'up' ? 'text-emerald-600' : 'text-slate-300 hover:text-emerald-500'}`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button 
                onClick={() => setShowReviewModal(true)}
                className={`p-1 transition-colors ${voted === 'down' ? 'text-red-500' : 'text-slate-300 hover:text-red-500'}`}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-slate-200 border border-slate-200 overflow-hidden rounded-sm">
          {Object.entries(sections).map(([key, value]) => (
            <div key={key} className="bg-white p-3">
              <span className="text-[9px] font-bold uppercase text-emerald-600 mb-1 block">{key}</span>
              <p className="text-[11px] leading-relaxed text-slate-600">{value}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Similar Judgements */}
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Similar Judgments</h3>
          <div className='space-y-2'>
            {similar_cases.map((c:any)=>(
            <Link 
            key={c.id}
            href={`/judgement/${c.id}`}
            className="block w-full text-left p-3 border border-slate-200 hover:border-emerald-500 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono text-slate-400">
                    {new Date(c.judgement_date).getFullYear()}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-700 px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded-sm">
                    {Math.round(c.similarity * 100)}% MATCH
                    </span>
                </div>
                <h4 className="text-[11px] font-bold uppercase tracking-tight text-slate-900 leading-tight mb-2 group-hover:text-emerald-600">
                    {c.case_name.split("[")[0]}
                </h4>

                <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed italic mb-2">
                    "{c.sections?.facts || "No facts"}..."
                </p>

                <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-emerald-600">
                    Analyze Precedent <ChevronRight size={10} />
                </div>
            </Link>))}
            {similar_cases.length === 0 && (
                <div className="py-8 border border-dashed border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No overlaps found</span>
                </div>
            )}
          </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-sm p-5 rounded-sm shadow-sm">
            <div className="flex justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-tight">Report Inaccuracy</h4>
                <button onClick={() => setShowReviewModal(false)}><X className="h-4 w-4 text-slate-400" /></button>
            </div>
            <textarea 
                className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 focus:outline-none min-h-[100px] bg-slate-50/50 mb-3"
                placeholder="Describe the inaccuracy..."
            />
            <button 
                onClick={() => { setShowReviewModal(false); setVoted('down'); }}
                className="w-full py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest"
            >
                Submit Feedback
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}