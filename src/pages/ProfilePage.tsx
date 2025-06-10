
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Heart, Settings, LogOut, Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, profile, signInWithGoogle, signOut } = useAuth();
  const { favorites } = useFavorites();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Your Profile
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Sign in to access your profile, manage preferences, and track your tech discoveries.
          </p>
          <Button
            onClick={signInWithGoogle}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Sign In with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Profile & Settings
          </h1>
          <p className="text-gray-400 text-lg">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt={profile.name || profile.email} 
                      className="w-16 h-16 rounded-full border-4 border-gray-600"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {profile?.name || 'Tech Enthusiast'}
                    </h3>
                    <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium Member
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">{profile?.email || user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Member Since</p>
                      <p className="text-white">
                        {profile?.created_at 
                          ? new Date(profile.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long' 
                            })
                          : 'Recently'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Notifications</h4>
                    <p className="text-sm text-gray-400">Receive updates about new tech drops</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Privacy Settings</h4>
                    <p className="text-sm text-gray-400">Manage your data and privacy preferences</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    Manage
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <Button
                    onClick={signOut}
                    variant="outline"
                    className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-lg border border-red-500/20">
                  <Heart className="h-8 w-8 text-red-400 mx-auto mb-2 fill-current" />
                  <div className="text-2xl font-bold text-white">{favorites.length}</div>
                  <div className="text-sm text-gray-400">Favorite Products</div>
                </div>
                
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {new Date().getFullYear() - new Date(profile?.created_at || user.created_at).getFullYear() || '< 1'}
                  </div>
                  <div className="text-sm text-gray-400">Years as Member</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/favorites" className="block">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400">
                    <Heart className="h-4 w-4 mr-2" />
                    View Favorites
                  </Button>
                </Link>
                
                <Link to="/" className="block">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400">
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
