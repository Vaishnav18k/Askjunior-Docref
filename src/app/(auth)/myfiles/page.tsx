'use client';
import React from 'react';
import { Upload, FileText, Search } from 'lucide-react';
import MyFiles from '../Components/MyFiles';

export default function Myfiles() {
  return (
    <>
    
      <main className="flex-1 p-6 w-full bg-white max-h-full">
        <MyFiles />
     
    </main>
    </>
  );
}
