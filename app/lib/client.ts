import { createClient } from '@supabase/supabase-js';
import { Judgment } from '../types/database';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Use ANON key for the browser
);


export async function getJudgments(page: number = 1, pageSize: number = 20) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('judgments')
    .select('id, citation, case_name, judgement_date, court_name, view_count, tags, sections', { count: 'exact' })
    .order('judgement_date', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { 
    data: data as Judgment[], 
    count: count || 0 
  };
}


export async function getJudgmentById(id: string) {
  const { data, error } = await supabase
    .from('judgments')
    .select('*') // Now it's okay to fetch everything, including judgment_text
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data as Judgment;
}