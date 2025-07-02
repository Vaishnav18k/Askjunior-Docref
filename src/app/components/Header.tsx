'use client';
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignIn, useUser } from "@stackframe/stack";
export default function Header() {

const router = useRouter();
  return (
    // <div>Header</div>
    <header className="relative z-10">
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
            <h1 className="text-xl font-bold text-gray-900">DocRef</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-slate-200 bg-white text-black hover:bg-slate-100 hover:text-black h-10 px-4 py-2"
           onClick={() => router.push('/signup')}>
              Sign Up
            </button>

            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-black text-white hover:bg-black/90 hover:text-white h-10 px-4 py-2">
              
              <Link href="/signin">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}


