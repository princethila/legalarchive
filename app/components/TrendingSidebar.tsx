import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!
);

export default async function TrendingSidebar() {

    const { data: trending } = await supabaseAdmin
    .from('judgments')
    .select('id, case_name, view_count, judgement_date')
    .order('view_count', { ascending: false, nullsFirst: false })
    .limit(8);

    return(
        <aside className="w-full h-full p-6 bg-white">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Trending Judgments
                </h3>
            </div>
            <div className='space-y-6'>
                {trending?.map((item, index)=>(
                    <Link key={item.id} 
                            href={`/judgement/${item.id}`}
                            className="group flex gap-4 items-start">
                        {/* The Rank Number */}
                        <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-emerald-200 transition-colors">
                        {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="space-y-1">
                            <h4 className="text-[11px] font-bold leading-tight text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 uppercase tracking-tight">
                                {item.case_name}
                            </h4>
                            <div className="flex items-center gap-2 text-[9px] font-medium text-slate-400 uppercase tracking-tighter">
                                <span>{new Date(item.judgement_date).getFullYear()}</span>
                                <span className="h-1 w-1 rounded-full bg-slate-200" />
                                <span>{item.view_count?.toLocaleString() ?? 0} Views</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    )

}