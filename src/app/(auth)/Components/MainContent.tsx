"use client";

import React from "react";
import { Upload } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";

const MainContent: React.FC = () => {
  const router = useRouter();
  const user = useUser();
  // Get the current user's ID from your auth system
  // For now using a placeholder - replace this with your actual auth logic
  const user_id = user?.id || "";

  // Fetch document statistics for the current user
  const stats = useQuery(api.workspace.getDocumentStats, { user_id });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome to your Document Hub
        </h2>
        <p className="text-blue-100 mb-4">
          Manage, organize, and reference your documents efficiently
        </p>
        <button
          onClick={() => router.push("/uploaddocuments")}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-white text-blue-600 hover:bg-gray-100"
        >
          <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
          Upload New Document
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Documents */}
        <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Total Documents
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text h-4 w-4 text-muted-foreground"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats?.totalDocuments ?? 0}</div>
          </div>
        </div>

        {/* This Month */}
        <div className="rounded-lg border border-gray-200 bg-white text-black shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">This Month</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar h-4 w-4 text-muted-foreground"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats?.thisMonth ?? 0}</div>
          </div>
        </div>

        {/* Tagged Items */}
        <div className="rounded-lg border border-slate-300 bg-white text-black shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Tagged Items</h3>
            {/* <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground h-4 w-4"></div> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-tags-icon lucide-tags"
            >
              <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
              <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
              <circle cx="6.5" cy="9.5" r=".5" fill="currentColor" />
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats?.taggedItems ?? 0}</div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="rounded-lg border border-slate-300 bg-white text-black shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Recent Documents
          </h3>
          <p className="text-sm text-muted-foreground">
            Your most recently uploaded files
          </p>
        </div>
        <div className="p-6 pt-0">
          <div className="text-center py-8">
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
              className="lucide lucide-file-text mx-auto h-12 w-12 text-gray-400 mb-4"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No documents yet
            </h3>
            <p className="text-gray-500 mb-4">
              Upload your first document to get started
            </p>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white hover:bg-black/90 h-10 px-4 py-2"
            onClick={() => router.push("/uploaddocuments")}
            >
              
              <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
              Upload Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
