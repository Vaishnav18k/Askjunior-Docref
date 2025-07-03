'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUser, useStackApp, UserButton } from "@stackframe/stack";
import { useRouter } from 'next/navigation';

const Header = () => {
  const user = useUser();
  const app = useStackApp();
  const router = useRouter();

  useEffect(() => {
    if (user === null || user === undefined) {
      router.push('/signin');
    }
  }, [user, router]);

  // Show nothing while checking auth state
  if (!user) {
    return null;
  }
  return (
    <header className="bg-white shadow-sm border-b border-gray-200  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text h-8 w-8 text-blue-600 mr-2"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            <Link href="/">
            <h1 className="text-xl font-bold text-gray-900">DocRef</h1>
          </Link>
           
            
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, <UserButton /></span>
            <button
              className="justify-center border border-gray-200 gap-4 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center space-x-2"
           
           onClick={() => user?.signOut() || app.redirectToSignIn()}
           >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out h-4 w-4"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;