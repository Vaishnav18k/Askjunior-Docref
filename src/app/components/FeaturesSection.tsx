import React from 'react';
import { Upload, BookOpen, Search, Shield } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Upload className="h-6 w-6 text-blue-600" />,
      title: 'Easy Upload',
      description: 'Drag and drop PDF and DOCX files with support for files up to 10MB',
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: 'Smart Organization',
      description: 'Tag and categorize your documents for quick retrieval and organization',
    },
    {
      icon: <Search className="h-6 w-6 text-blue-600" />,
      title: 'Powerful Search',
      description: 'Find documents instantly by title, content, tags, or notes',
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: 'Secure & Private',
      description: 'Your documents are stored securely with user-specific access control',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to manage your documents</h3>
          <p className="text-xl text-gray-600">Simple, powerful tools for document organization and reference</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg border border-slate-200 bg-white text-black shadow-sm text-center hover:shadow-lg transition-shadow p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;