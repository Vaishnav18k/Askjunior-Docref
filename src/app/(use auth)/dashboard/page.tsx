'use client'
import React from 'react';
import Header from '../../(auth)/Components/MainHeader';
import NavLink from '../../(auth)/Components/Nav-links';
import MainContent from '../../(auth)/Components/MainContent';
export default function Dashboard() {
  return (
    <>
    <Header />
    <div className=' flex max-h-full'>
   
    <aside className="w-64 bg-white shadow-sm max-h-full border-r border-gray-300">
    
        <NavLink />
      </aside>
      <main className="flex-1 p-6 w-full bg-white max-h-full">
        <MainContent />
      </main>
     
    </div>
    </>
  );
}


