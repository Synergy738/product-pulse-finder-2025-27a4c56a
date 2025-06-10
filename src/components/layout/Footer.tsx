
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800/50 mt-20 mb-20 md:mb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          
          {/* Tagline */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>in Cape Town</span>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-600 mt-4 pt-4 border-t border-gray-800/50">
          © 2024 TechPulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
