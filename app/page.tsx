import DiscoveryTable from './components/DiscoveryTable';
import TrendingSidebar from './components/TrendingSidebar';
import { getJudgments } from './lib/server';


type SearchParams = Promise<{ 
  page?: string; 
  q?: string; 
  sort?: string; 
  order?: string 
}>; 

export default async function Home({searchParams}: { searchParams: SearchParams }) {
  const resolvedParams = await searchParams; 
  const currentPage = Number(resolvedParams.page) || 1;
  const query = resolvedParams.q || "";
  const sort = resolvedParams.sort || "judgement_date";
  const order = resolvedParams.order || "desc";
  const { data, count } = await getJudgments(currentPage, 20, { 
        q: query, 
        sort, 
        order 
    });

  return (
    <div className="flex flex-col md:flex-row">
      {/* Discovery Feed */}
      <div className="flex-1 border-r border-slate-200">
        <DiscoveryTable data={data} totalCount={count} currentPage={currentPage} />
      </div>
      {/* Trending Column (Desktop) */}
      <div className="hidden lg:block w-[350px] shrink-0 bg-slate-50/30">
        <TrendingSidebar />
      </div>
    </div>
  );
}
