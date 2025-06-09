
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, User, LogOut, Zap } from 'lucide-react';
import { User as UserType } from '@/types/Product';

interface TechPulseHeaderProps {
  user: UserType | null;
  onShowFavorites: () => void;
  onShowAuth: () => void;
  onLogout: () => void;
  favoriteCount: number;
}

export const TechPulseHeader: React.FC<TechPulseHeaderProps> = ({
  user,
  onShowFavorites,
  onShowAuth,
  onLogout,
  favoriteCount
}) => {
  return (
    <header className="flex justify-between items-center mb-8 py-4 border-b border-gray-800/50">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg blur-lg"></div>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TechPulse
          </h1>
          <p className="text-xs text-gray-400 -mt-1">Cape Town Tech Hub</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6">
        {/* Favorites */}
        <Button
          variant="ghost"
          onClick={onShowFavorites}
          className="relative text-gray-300 hover:text-red-400 transition-all duration-300 group"
        >
          <Heart className={`h-5 w-5 ${favoriteCount > 0 ? 'fill-current text-red-400' : ''} group-hover:scale-110 transition-transform`} />
          {favoriteCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {favoriteCount > 99 ? '99+' : favoriteCount}
            </span>
          )}
        </Button>

        {/* User Authentication */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">Premium User</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="text-gray-300 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={onShowAuth}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};
