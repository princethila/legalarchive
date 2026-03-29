import { getJudgmentById } from '@/app/lib/server';
import { notFound } from 'next/navigation';
import { Eye, FileText, Share2, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import JudgementSidebar from '@/app/components/JudgementSidebar';
import MobileToggleLayout from '@/app/components/MobileToggleLayout';

export default async function JudgmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; 
    const judgment = await getJudgmentById(id);

    if (!judgment) notFound();

    const coramList = (() => {
      if (Array.isArray(judgment.coram)) return judgment.coram;
      if (typeof judgment.coram === 'string') {
        const trimmed = judgment.coram.trim();
        // support JSON arrays stored as strings: ["judge1", "judge2"]
        if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
          try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) return parsed.map((item) => String(item).trim()).filter(Boolean);
          } catch {
            // not JSON; fall through
          }
        }
        // fallback comma-separated values
        return trimmed.split(',').map((j) => j.trim()).filter(Boolean);
      }
      return [];
    })();

  return (
    <div className="flex flex-col min-h-screen bg-white">
        {/* Top Action Bar */}
        <div className="h-10 border-b border-slate-100 flex items-center justify-between px-4 sticky top-12 bg-white/80 backdrop-blur-sm z-40">
        <Link href="/" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-slate-500 hover:text-black">
          <ArrowLeft className="h-3 w-3" /> Back to Discovery
        </Link>
        <div className="flex gap-4">
          <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-slate-500 hover:text-emerald-600">
            <Download className="h-3 w-3" /> Export PDF
          </button>
          <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-slate-500 hover:text-emerald-600">
            <Share2 className="h-3 w-3" /> Share
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto">
        {/* Left Column: The Text */}
        <MobileToggleLayout 
                sidebar={<JudgementSidebar judgmentId={judgment.id} sections={judgment.sections} />}
            >
        <article className='flex-1 p-6 lg:p-12 border-r border-slate-100 max-w-4xl'>
            <header className='mb-12'>
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 rounded-sm uppercase">
                        {judgment.court_name}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">Case No: {judgment.citation}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
                    {judgment.case_name}
                </h1>
                <div className="flex items-center gap-12 text-xs text-slate-500 border-y border-slate-100 py-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Date Delivered</span>
                        <span className="font-medium text-slate-900">{judgment.judgement_date}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Coram</span>
                        <span className="font-medium text-slate-900">
                            {coramList.length > 0 ? coramList.join(', ') : '—'}
                        </span>
                    </div>
                </div>
            </header>
            <section className="prose prose-slate prose-sm max-w-none">
            {/* Split body text into paragraphs or render as Markdown */}
            <div className="text-sm leading-7 text-slate-800 whitespace-pre-wrap">
              {judgment.judgment_text || 'No judgment text available.'}
            </div>
          </section>
        </article>
        {/* Right Column: AI Intelligence & Similar Cases */}
        </MobileToggleLayout>
      </div>
    </div>
  );
}