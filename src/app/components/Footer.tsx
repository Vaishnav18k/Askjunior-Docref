import React from 'react';
import { FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t bg-white/50">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-blue-600 mr-2" />
          <span className="text-lg font-semibold text-gray-900">DocRef</span>
        </div>
        <p className="text-gray-600">
          Your personal document reference and management solution
        </p>
      </div>
    </footer>
  );
};

export default Footer;