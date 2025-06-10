
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FavoriteProduct } from '@/types/Auth';
import { Product } from '@/types/Product';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching favorites:', error);
      } else {
        // Map the database response to match our TypeScript interface
        const mappedFavorites = (data || []).map(item => ({
          id: item.id,
          user_id: item.user_id,
          product_id: item.product_id,
          product_name: item.product_name,
          product_brand: item.product_brand,
          product_price: item.product_price,
          product_currency: item.product_currency,
          product_image: item.product_image,
          product_store: item.product_store,
          product_store_url: item.product_store_url,
          created_at: item.created_at
        }));
        setFavorites(mappedFavorites);
      }
    } catch (error) {
      console.error('Favorites fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const addToFavorites = async (product: Product) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          product_id: product.id,
          product_name: product.name,
          product_brand: product.brand,
          product_price: product.price,
          product_currency: product.currency,
          product_image: product.image,
          product_store: product.store,
          product_store_url: product.storeUrl
        });

      if (error) {
        console.error('Error adding to favorites:', error);
        toast({
          title: "Error",
          description: "Failed to add to favorites",
          variant: "destructive",
        });
        return false;
      }

      await fetchFavorites();
      toast({
        title: "Added to Favorites",
        description: `${product.name} has been added to your favorites`,
      });
      return true;
    } catch (error) {
      console.error('Add to favorites error:', error);
      return false;
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) {
        console.error('Error removing from favorites:', error);
        toast({
          title: "Error",
          description: "Failed to remove from favorites",
          variant: "destructive",
        });
        return false;
      }

      await fetchFavorites();
      toast({
        title: "Removed from Favorites",
        description: "Item has been removed from your favorites",
      });
      return true;
    } catch (error) {
      console.error('Remove from favorites error:', error);
      return false;
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.product_id === productId);
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    fetchFavorites
  };
};
