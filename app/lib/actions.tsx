import { createClient } from '@supabase/supabase-js';
import { Judgment } from '../types/database';

// Service Role Key is safe here because this file 
// should only be imported by Server Components
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!
);



export async function getTrending(windowHours: number = 120, limitCount: number = 8){
    const { data, error } = await supabaseAdmin.rpc('get_trending_judgments', {
    window_hours: windowHours,
    limit_count: limitCount
    });

    if (error) {
        console.error('Error fetching trending judgments:', error);
        return [];
    }

    return data || [];
}