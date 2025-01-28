import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
console.log(supabaseUrl)
console.log(supabaseKey)
const supabase = createClient(supabaseUrl as string, supabaseKey as string);



export {supabase};
