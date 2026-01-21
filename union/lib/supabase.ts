import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// ¡REEMPLAZAR CON TUS KEYS DE SUPABASE!
const SUPABASE_URL = 'https://oibfszshoigtfxxruorg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_nbaf1oM9WJDjBC0RmJrLvA_8gYER3ZK';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);