"use client";

import React, { useState } from "react";
import { FileText, Search, Tag, Eye } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@stackframe/stack";

const MyFiles: React.FC = () => {
  const user = useUser();
  const user_id = user?.id || "";
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Format file size to human-readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  // Fetch document statistics
  const stats = useQuery(api.workspace.getDocumentStats, { user_id });

  // Fetch all workspaces (documents) for the current user
  const workspacesQuery = useQuery(api.workspace.listWorkspaces, { user_id });

  // Safely handle workspaces data - workspacesQuery is already the array of documents
  const documents = Array.isArray(workspacesQuery)
    ? workspacesQuery.filter((doc: any) => doc?.user_id === user_id)
    : [];

  // Extract unique tags from all documents with proper type safety
  const allTags = Array.from(
    new Set(
      documents.flatMap((doc: any) =>
        Array.isArray(doc.workspace_doctags) ? doc.workspace_doctags : []
      )
    )
  ) as string[];

  // Filter documents based on search and tag
  const filteredDocuments = documents.filter((doc: any) => {
    if (!doc) return false;

    const searchLower = searchTerm.toLowerCase();
    const titleMatch =
      doc.workspace_doctitle?.toLowerCase().includes(searchLower) ?? false;

    const tags = Array.isArray(doc.workspace_doctags)
      ? doc.workspace_doctags
      : [];
    const tagMatch = tags.some((tag: string) =>
      tag?.toLowerCase().includes(searchLower)
    );

    const tagFilter = selectedTag ? tags.includes(selectedTag) : true;

    return (titleMatch || tagMatch) && tagFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Files</h2>
          <p className="text-gray-600">
            Manage and organize your document collection
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white hover:bg-black/80 hover:text-white h-10 px-4 py-2">
          <FileText className="mr-2 h-4 w-4" />
          Upload New Document
        </button>
      </div>

      {/* Search & Filter Card */}
      <div className="rounded-lg border  border-slate-200 bg-white text-black shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold tracking-tight text-lg">
            Search & Filter
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="flex  flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute  left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents..."
                className="pl-10 flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                className={`inline-flex border border-slate-300 hover:border-slate-300 items-center gap-1 rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  !selectedTag
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black hover:bg-gray-200/80"
                }`}
                onClick={() => setSelectedTag(null)}
              >
                <Tag className="h-3 w-3 " />
                All Tags
              </button>
              {allTags.map((tag: string) => (
                <button
                  key={tag}
                  className={`inline-flex border border-slate-300 items-center gap-1 rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black hover:bg-gray-100/80"
                  }`}
                  onClick={() =>
                    setSelectedTag(tag === selectedTag ? null : tag)
                  }
                >
                  <Tag className="h-3 w-3 " />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Documents List Card */}
      <div className="rounded-lg border border-slate-200 bg-white text-black shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Documents ({filteredDocuments.length})
          </h3>
          <p className="text-sm text-gray-500">All your uploaded documents</p>
        </div>
        <div className="p-6 pt-0">
          {filteredDocuments.length > 0 ? (
            <div className="space-y-4">
              {filteredDocuments.map((doc: any, index: number) => (
                <div
                  key={`${doc.workspace_id}-${index}`}
                  className="border border-slate-300 bg-card p-4 rounded-md hover:bg-gray-100/50 transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="">
                      <div className="flex items-center gap-2">
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
                          className="lucide lucide-file-text h-10 w-10 text-blue-600 mt-1"
                        >
                          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                          <path d="M10 9H8"></path>
                          <path d="M16 13H8"></path>
                          <path d="M16 17H8"></path>
                        </svg>
                        <h4 className="font-semibold px-1">
                          {doc.workspace_doctitle}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 px-13 py-0">
                        {doc.workspace_filetype} •{" "}
                        {formatFileSize(doc.workspace_filesize)}
                      </p>

                      <div className="flex items-center px-13">
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
                          className="lucide lucide-calendar mr-1 h-3 w-3"
                        >
                          <path d="M8 2v4"></path>
                          <path d="M16 2v4"></path>
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                          ></rect>
                          <path d="M3 10h18"></path>
                        </svg>
                        <p className="text-xs text-muted-foreground px-0 py-2">
                          Uploaded{" "}
                          {new Date(doc.docuploaded_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1  px-13 py-2">
                        {doc.workspace_doctags.map((tag: string) => (
                          <span
                            key={tag}
                            className="  px-2 text-xs font-semibold border border-gray-100 rounded-full bg-slate-200/60 text-black "
                          > 
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4 mt-0">
                        <h4 className="px-13 font-normal text-sm text-slate-600 ">
                          {doc.workspace_notes}
                        </h4>
                      </div>
                    </div>
                    <button className=" border border-slate-200 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-white hover:bg-slate-100/70 hover:text-accent-foreground h-9 rounded-md px-3 ml-4"
                    onClick={() => (window.location.href = `/documents/${doc.id}`)}>
                                          {/* onClick={() => (window.location.href = `/documents/${doc.id}`)}> */}

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
                        className="lucide lucide-eye mr-2 h-4 w-4"
                        
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
                No documents found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter
              </p>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <FileText className="mr-2 h-4 w-4" />
                Upload Document
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFiles;
