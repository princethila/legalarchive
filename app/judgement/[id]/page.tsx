import { getJudgmentById } from '@/app/lib/server';
import { notFound } from 'next/navigation';

export default async function JudgmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; 
    const judgment = await getJudgmentById(id);

    if (!judgment) notFound();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{judgment.case_name}</h1>
      <div className="flex gap-4 mb-8 text-sm text-slate-500">
        <span>{judgment.citation}</span>
        <span>{judgment.court_name}</span>
      </div>
      
      <div className="prose prose-slate max-w-none">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b pb-2">Full Judgment</h2>
        {/* Render the massive text here */}
        <div className="whitespace-pre-wrap mt-4 text-slate-800 leading-relaxed">
          {judgment.judgment_text}
        </div>
      </div>
    </div>
  );
}