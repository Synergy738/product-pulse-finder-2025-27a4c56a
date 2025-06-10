
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: SupabaseUser | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
}

export interface FavoriteProduct {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  product_brand?: string;
  product_price?: number;
  product_currency?: string;
  product_image?: string;
  product_store?: string;
  product_store_url?: string;
  created_at: string;
}
