
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, User, LogOut, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, profile, signInWithGoogle, signOut } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    if (!user) {
      signInWithGoogle();
    } else {
      navigate('/favorites');
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <button 
            onClick={handleHomeClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-lg blur-lg"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                TechPulse
              </h1>
            </div>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            {/* Favorites */}
            <Button
              variant="ghost"
              onClick={handleFavoritesClick}
              className="relative text-white/80 hover:text-red-400 transition-all duration-300 group hover:bg-white/10"
            >
              <Heart className={`h-5 w-5 ${favorites.length > 0 ? 'fill-current text-red-400' : ''} group-hover:scale-110 transition-transform`} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {favorites.length > 99 ? '99+' : favorites.length}
                </span>
              )}
            </Button>

            {/* User Authentication */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{profile?.name || 'Tech Enthusiast'}</p>
                  <p className="text-xs text-white/60">Premium User</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={signOut}
                  className="text-white/80 hover:text-red-400 transition-colors hover:bg-white/10"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={signInWithGoogle}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
