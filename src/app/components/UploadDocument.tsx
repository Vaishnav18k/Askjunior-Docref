"use client";
import React, { useRef, useState } from "react";
import { useEdgeStore } from "../lib/edgestore";
import { useUser } from "@stackframe/stack";
import { Upload } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const UploadDocumentpage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [workspaceFiletype, setWorkspaceFiletype] = useState("");

  // Define allowed MIME types and their corresponding extensions
  const allowedMimeTypes: Record<string, string> = {
    "application/pdf": ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "application/msword": ".doc",
  };

  const uploadToEdgestorage = useMutation(api.edgestorage.uploadToEdgestorage);
  const { edgestore } = useEdgeStore();
  const user = useUser();
  const user_id = user?.id || "";
  const workspaceId = user?.id || ""; // ⚠️ Ensure this is correct for your app
  const email = user?.primaryEmail || "";

  // Drag-and-drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const MimeTypeToLabel = {
        "application/pdf": "PDF",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
        "application/msword": "DOC",
      };

      if (!Object.keys(MimeTypeToLabel).includes(droppedFile.type)) {
        setUploadError("Invalid file type. Only PDF, DOCX, DOC allowed.");
        return;
      }

      const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
      };

      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (droppedFile.size > maxSize) {
        setUploadError(`File size (${formatFileSize(droppedFile.size)}) exceeds ${formatFileSize(maxSize)} limit.`);
        return;
      }

      // Set title from file name (with extension)
      setTitle(droppedFile.name);

      setFile(droppedFile);
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  // File input change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file type is allowed
      if (!Object.keys(allowedMimeTypes).includes(selectedFile.type)) {
        setUploadError("Invalid file type. Only PDF, DOCX, DOC allowed.");
        return;
      }
      
      // Store the complete filename with extension
      setWorkspaceFiletype(selectedFile.name);

      const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
      };

      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (selectedFile.size > maxSize) {
        setUploadError(`File size (${formatFileSize(selectedFile.size)}) exceeds ${formatFileSize(maxSize)} limit.`);
        return;
      }

      // Set title from file name (with extension)
      const fileNameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
      setTitle(fileNameWithoutExt);
      setFile(selectedFile);
      setUploadError(null);
    }
  };

  // Add tag
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  // Submit handler
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    if (!file) return;
    if (!user) {
      setUploadError("You must be signed in to upload.");
      return;
    }

    // File size validation
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setUploadError(`File size (${formatFileSize(file.size)}) exceeds ${formatFileSize(maxSize)} limit.`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload file to EdgeStore (temporary)
      const uploadRes = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => setUploadProgress(progress),
        options: {
          temporary: true, // Upload as temporary until Convex is updated
        },
      });

      // 2. Call mutation to register in Convex/edgestorage
      const { file_id } = await uploadToEdgestorage({
        filename: file.name,
        fileurl: uploadRes.url,
        workspace_id: workspaceId,
        user_id,
        email,
        doc_title: title,
        doc_tags: tags,
        doc_notes: notes,
        doc_uploaded_date: new Date().toISOString(),
        doc_filetype: file.name,
        doc_filesize: file.size, // Storing raw bytes in database
        total_documents: 1,
      });

      // 3. Confirm temporary upload in EdgeStore
      await edgestore.publicFiles.confirmUpload({ url: uploadRes.url });

      // 4. Reset form
      setFile(null);
      setTitle("");
      setTags([]);
      setNotes("");
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      // 5. Clean up temporary upload if Convex fails
      if (err.message.includes("upload")) {
        await edgestore.publicFiles.delete({ url: err.uploadUrl });
      }
      setUploadError(err?.message || "Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Document</h2>
        <p className="text-gray-600">Add a new document to your collection</p>
      </div>

      {/* Upload Card */}
      <div className="rounded-lg bg-white/50 border border-gray-200 bg-card shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Document Upload</h3>
          <p className="text-sm text-muted-foreground">Upload PDF or DOCX files (max 10MB)</p>
        </div>

        <div className="p-6 pt-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* File Upload Section */}
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Document File
              </label>
              <div
                className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
             file ? "border-green-400 bg-green-50"
                  : isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="w-full border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-green-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setTitle("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
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
                      className="lucide lucide-upload mx-auto h-12 w-12 text-gray-400 mb-4"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Drop your file here, or{' '}
                      <label className="text-blue-600 cursor-pointer hover:underline">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx,.doc"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-500">PDF, DOCX files up to 10MB</p>
                  </>
                )}
                {uploadProgress !== null && (
                  <div className="mt-2 text-sm text-blue-600">Uploading: {uploadProgress}%</div>
                )}
                {uploadError && (
                  <div className="mt-2 text-sm text-red-600">{uploadError}</div>
                )}
              </div>
            </div>

            {/* Document Title */}
            <div>
              <label
                htmlFor="title"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Document Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Tags
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex space-x-2">
                  <input
                    id="tags"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    Add Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes (Optional) */}
            <div>
              <label
                htmlFor="notes"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes or references about this document"
                className="mt-2 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={uploading || !file}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white hover:bg-black/60 h-10 px-4 py-2 flex-1"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setTitle("");
                  setTags([]);
                  setNotes("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-gray-300 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentpage;