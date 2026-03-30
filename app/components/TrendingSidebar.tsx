import { createClient } from '@supabase/supabase-js';
import { Flame, Clock } from 'lucide-react';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { getTrending } from '../lib/actions';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!
);

export default async function TrendingSidebar() {

    const trending = await getTrending(24, 8);

    return(
        <aside className="w-full h-full p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <Flame className="h-3 w-3 text-orange-500" /> Hot This Window
                </h3>
                <span className="text-[9px] font-mono text-slate-300 flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" /> 7D
                </span>
            </div>

            <div className="space-y-5">
                {trending.map((item, index) => (
                <Link 
                    key={item.id} 
                    href={`/judgement/${item.id}`}
                    className="group block relative"
                >
                    <div className="flex gap-3">
                    <span className="text-[10px] font-mono text-slate-300 mt-1">
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                    
                    <div className="flex-1 border-b border-slate-50 pb-4 group-last:border-0">
                        <h4 className="text-[11px] font-bold uppercase tracking-tight leading-tight text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {item.case_name}
                        </h4>
                        
                        <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[9px] font-bold text-emerald-600 uppercase">
                            {item.recent_views} recent
                            </span>
                        </div>
                        <span className="text-[9px] font-medium text-slate-300 uppercase">
                            {item.total_views.toLocaleString()} Total
                        </span>
                        </div>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
        </aside>
    )

}