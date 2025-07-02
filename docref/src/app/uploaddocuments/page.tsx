"use client";
import React from "react";
import UploadDocumentpage from "../components/UploadDocument";
import Header from "../components/MainHeader";
import NavLink from "../components/Nav-links";

export default function Uploaddocuments() {
  return (
  <>
  <Header />
  <div className=' flex max-h-full'>
 
  <aside className="w-64 bg-white shadow-sm max-h-full border-r border-gray-300">
  
      <NavLink />
    </aside>
    <main className="flex-1 p-6 w-full bg-gray-100/50 max-h-full">
        <UploadDocumentpage />
    </main>
   
  </div>
  </>);
}
