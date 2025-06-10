
-- Create user profiles table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Check if we need to add missing columns to existing favorites table
ALTER TABLE public.favorites 
ADD COLUMN IF NOT EXISTS product_name TEXT,
ADD COLUMN IF NOT EXISTS product_brand TEXT,
ADD COLUMN IF NOT EXISTS product_price DECIMAL,
ADD COLUMN IF NOT EXISTS product_currency TEXT DEFAULT 'ZAR',
ADD COLUMN IF NOT EXISTS product_image TEXT,
ADD COLUMN IF NOT EXISTS product_store TEXT,
ADD COLUMN IF NOT EXISTS product_store_url TEXT;

-- Update user_id column to reference auth.users if not already done
DO $$
BEGIN
    -- Check if user_id is UUID type, if not, we need to update it
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'favorites' 
        AND column_name = 'user_id' 
        AND data_type != 'uuid'
    ) THEN
        -- Drop existing foreign key if any
        ALTER TABLE public.favorites DROP CONSTRAINT IF EXISTS favorites_user_id_fkey;
        
        -- Change column type to UUID
        ALTER TABLE public.favorites ALTER COLUMN user_id TYPE UUID USING user_id::UUID;
        
        -- Add foreign key constraint
        ALTER TABLE public.favorites ADD CONSTRAINT favorites_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users can insert their own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users can delete their own favorites" ON public.favorites;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for favorites
CREATE POLICY "Users can view their own favorites" 
  ON public.favorites 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" 
  ON public.favorites 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" 
  ON public.favorites 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
