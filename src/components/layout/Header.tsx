
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Zap, Heart, User, LogOut, Settings, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';

export const Header = () => {
  const location = useLocation();
  const { user, profile, signInWithGoogle, signOut } = useAuth();
  const { favorites } = useFavorites();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleFavoritesClick = () => {
    if (!user) {
      setShowAuthPrompt(true);
      signInWithGoogle();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo - Simplified like MTN */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                TechPulse
              </h1>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-red-600/20 to-orange-600/20 text-red-600 border border-red-500/30' 
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            
            {user ? (
              <Link 
                to="/favorites" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 relative ${
                  isActive('/favorites') 
                    ? 'bg-gradient-to-r from-red-600/20 to-orange-600/20 text-red-600 border border-red-500/30' 
                    : 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
                }`}
              >
                <Heart className={`h-4 w-4 ${favorites.length > 0 ? 'fill-current text-red-400' : ''}`} />
                Favorites
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {favorites.length > 99 ? '99+' : favorites.length}
                  </span>
                )}
              </Link>
            ) : (
              <Button
                variant="ghost"
                onClick={handleFavoritesClick}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-gray-100"
              >
                <Heart className="h-4 w-4" />
                Favorites
              </Button>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 px-3 py-2">
                    {profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={profile.name || profile.email} 
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{profile?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">Premium Member</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Profile & Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={signInWithGoogle}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <Link 
            to="/" 
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
              isActive('/') ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          
          {user ? (
            <Link 
              to="/favorites" 
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 relative ${
                isActive('/favorites') ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${favorites.length > 0 ? 'fill-current text-red-400' : ''}`} />
              <span className="text-xs">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>
          ) : (
            <Button
              variant="ghost"
              onClick={handleFavoritesClick}
              className="flex flex-col items-center gap-1 px-3 py-2 text-gray-500"
            >
              <Heart className="h-5 w-5" />
              <span className="text-xs">Favorites</span>
            </Button>
          )}
          
          <Link 
            to="/profile" 
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
              isActive('/profile') ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
