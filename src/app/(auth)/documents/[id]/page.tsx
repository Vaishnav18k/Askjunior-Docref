'use client'
import React from 'react'
import Header from '../../Components/MainHeader'
import NavLink from '../../Components/Nav-links'
import { useParams } from 'next/navigation';
import {DocumentView }from '../../../(auth)/Components/DocumentView';
import { Id } from '../../../../../convex/_generated/dataModel';

export default function Documents() {
  const params = useParams();
  const docId = params.id as Id<"workspace">;
  return (
    <>
      <Header />
      <div className=' flex max-h-full'>

        <aside className="w-64 bg-white shadow-sm max-h-full border-r border-gray-300">

          <NavLink />
        </aside>
        <main className="flex-1 p-6 w-full bg-white max-h-full">
         <DocumentView docId={docId} />
          </main>
      </div>
      </>
    
)
};