import { createClient } from '@supabase/supabase-js';
import { Judgment } from '../types/database';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// For development: temporarily use service role key to bypass RLS
// TODO: Create proper RLS policy for anon role in production
const supabaseServiceKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function getJudgments() {
  const { data, error } = await supabase
    .from('judgments')
    .select('id, citation, case_name, judgement_date, coram, judgment_text, parties, court_name, view_count, sections, tags, embedding')
    // .order('judgement_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Judgment[];
}