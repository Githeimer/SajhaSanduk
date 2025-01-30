import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log(supabaseUrl)
console.log(supabaseKey)
const supabase = createClient(supabaseUrl as string, supabaseKey as string);



export {supabase};
