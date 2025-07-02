import React from 'react';
import { Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5 text-xs font-semibold mb-4">
          <Zap className="h-3 w-3 mr-1" />
          Personal Document Management
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Your Personal
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Document Hub</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload, organize, and reference your documents with ease. Think Google Drive meets Notion, but simplified for personal use.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-black text-white hover:bg-black/80 hover:text-white h-10 rounded-md text-lg px-5 py-1  font-medium transition-colors">
            Start Managing Documents
          </button>
          <button className="border border-slate-200 bg-white text-black hover:bg-gray-100 hover:text-black h-10 rounded-md text-lg px-5 py-1 font-medium transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;