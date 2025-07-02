'use client';
import React from 'react';
import { Upload, FileText, Search } from 'lucide-react';
import Header from '../Components/MainHeader';
import NavLink from '../Components/Nav-links';
import MyFiles from '../Components/MyFiles';

export default function Myfiles() {
  return (
    <>
    <Header />
    <div className=' flex max-h-full'>
   
    <aside className="w-64 bg-white shadow-sm max-h-full border-r border-gray-300">
    
        <NavLink />
      </aside>
      <main className="flex-1 p-6 w-full bg-white max-h-full">
        <MyFiles />
      </main>
     
    </div>
    </>
  );
}
