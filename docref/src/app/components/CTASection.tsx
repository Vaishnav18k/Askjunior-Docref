import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-sm p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to organize your documents?</h3>
          <p className="text-blue-100 mb-6 text-lg">Join DocRef today and take control of your document management</p>
          <button className="bg-white text-black hover:bg-black/80 hover:text-white h-12 rounded-md text-lg px-8 py-3 font-medium transition-colors">
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;