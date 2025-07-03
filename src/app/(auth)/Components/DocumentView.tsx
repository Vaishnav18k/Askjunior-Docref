'use client';
import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { useParams } from 'next/navigation';

export const DocumentView = ({ docId }: { docId: Id<"workspace"> }) => {
  const useparams = useQuery(api.workspace.getWorkspace, { id: docId });
  
  const workspace = useQuery(api.workspace.getWorkspace, { id: docId });
  const documents = useQuery(api.docref.listDocrefsByWorkspace, { workspace_id: workspace?.workspace_id || '' });
  const updateWorkspaceNotes = useMutation(api.workspace.updateNotes);
  const updateDocrefNotes = useMutation(api.docref.updateDocref);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');

  // Use the first document from docref for simplicity (adjust if multiple documents)
  const document = documents?.[0];

  if (!workspace || !document) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
    // Use doc_notes if available, fallback to workspace_notes
    setNotes(    workspace.workspace_notes ||  document.doc_notes|| '');
  };

  const handleSaveClick = async () => {
    // Update workspace_notes
    await updateWorkspaceNotes({ id: workspace._id, notes });

    // Update doc_notes in docref
    await updateDocrefNotes({
      doc_id: document.doc_id,
      updateData: { doc_notes: notes },
    });

    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNotes('');
  };

  const fileSizeMB = (workspace.workspace_filesize / (1024 * 1024)).toFixed(2);
  const uploadDate = new Date(workspace.docuploaded_date).toLocaleString();

  return (
    <main className="flex-1 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Files
          </button>
        </div>

        {/* Document Details Card */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-blue-600">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
                <div>
                  <h3 className="font-semibold tracking-tight text-xl mb-2">{workspace.workspace_doctitle}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>File: {workspace.workspace_doctitle}.{workspace.workspace_filetype}</div>
                    <div>Size: {fileSizeMB} MB</div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-3 w-3">
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                      </svg>
                      Uploaded {uploadDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {workspace.workspace_doctags?.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  >
                    {tag}
                  </div>
                )) || <div>No tags</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Document Preview Card */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Document Preview</h3>
            <p className="text-sm text-muted-foreground">Document preview is not available for uploaded files in this demo version</p>
          </div>
          <div className="p-6 pt-0">
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-16 w-16 text-gray-400 mb-4">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Preview Not Available</h3>
              <p className="text-gray-500 mb-4">In a full implementation, you would see a preview of your document file here.</p>
              <p className="text-sm text-gray-400">File: {workspace.workspace_filetype} ({fileSizeMB} MB)</p>
            </div>
          </div>
        </div>

        {/* Notes & References Card */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Notes & References</h3>
                <p className="text-sm text-muted-foreground">Add your personal notes and references for this document</p>
              </div>
              <button
                onClick={handleEditClick}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </svg>
                Edit Notes
              </button>
            </div>
          </div>
          <div className="p-6 pt-0">
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  placeholder="Add your notes, references, or thoughts about this document..."
                  rows={8}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveClick}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
                    </svg>
                    Save Notes
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {workspace.workspace_notes || document.doc_notes || 'No notes available.'}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

