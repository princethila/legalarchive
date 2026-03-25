import DiscoveryTable from './components/DiscoveryTable';
import { getJudgments } from './lib/supabase';

export default async function Home() {
  const judgments = await getJudgments();
  return (
    <div className="flex flex-col md:flex-row">
      {/* Discovery Feed */}
      <div className="flex-1 border-r border-slate-200">
        <DiscoveryTable data={judgments} />
      </div>
      {/* Trending Column (Desktop) */}
      <aside className="hidden lg:block w-80 p-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Trending Judgments</h3>
      </aside>
    </div>
  );
}
