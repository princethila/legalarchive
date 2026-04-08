import { createClient } from '@supabase/supabase-js';
import { Judgment } from '../types/database';

// Service Role Key is safe here because this file 
// should only be imported by Server Components
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!
);


export async function getJudgments(page: number = 1, pageSize: number = 20, params?: { q?: string; sort?: string; order?: string; court?: string}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabaseAdmin
    .from('judgments')
    .select('id, citation, case_name, judgement_date, court_name, view_count, tags, sections', { count: 'exact' });

  // 1. Semantic/Text Search
  if (params?.q) {
    // Searches across both case_name and citation
    query = query.or(`case_name.ilike.%${params.q}%,citation.ilike.%${params.q}%`);
  }

  // 2. Metadata Filtering (e.g., Court)
  if (params?.court) {
    query = query.eq('court_name', params.court);
  }

  // 3. Dynamic Sorting
  const sortCol = params?.sort || 'judgement_date';
  const ascending = params?.order === 'asc';
  query = query.order(sortCol, { ascending });

  // 4. Pagination Range
  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);
  return { 
    data: data as Judgment[], 
    count: count || 0 
  };
}


export async function getJudgmentById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('judgments')
    .select('*') // Now it's okay to fetch everything, including judgment_text
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data as Judgment;
}


export async function getSimilarJudgments(judgmentId: string, embedding: number[]) {
  

  // 2. Call the RPC function we created in SQL
  const { data, error } = await supabaseAdmin.rpc('match_judgments', {
    query_embedding: embedding,
    match_threshold: 0.5, // Adjust based on how strict you want the match
    match_count: 5,
  });

  if (error) {
    console.error('Similarity error:', error);
    return [];
  }

  // 3. Filter out the current case so it doesn't recommend itself
  return data.filter((j: any) => j.id !== judgmentId);
}