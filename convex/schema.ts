import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  // Central document reference table
  docref: defineTable({
    doc_id: v.string(), // Unique ID for each document
    workspace_id: v.string(), // Workspace this doc belongs to
    edgestorage_id: v.optional(v.string()), // If stored in edgestorage
    source: v.string(), // 'workspace' or 'edgestorage'
    doc_title: v.string(),
    doc_tags: v.optional(v.array(v.string())),
    doc_notes: v.optional(v.string()),
    doc_uploaded_date: v.string(), // ISO date string
    doc_filetype: v.string(),
    doc_filesize: v.number(),
    doc_url: v.string(),
    user_id: v.string(), // stack auth user id
    total_documents: v.number(), // 1-100
  }),

  // Workspace table
  workspace: defineTable({
    workspace_id: v.string(), // Unique workspace id
    user_id: v.string(), // stack auth user id
    email: v.string(),
    workspace_filetype: v.string(),
    workspace_filesize: v.number(),
    workspace_doctitle: v.string(),
    workspace_doctags: v.optional(v.array(v.string())),
    workspace_notes: v.optional(v.string()),
    docuploaded_date: v.string(), // ISO date string
    user_total_documents: v.number(), // 1-100
  }),

  // Edgestorage table
  edgestorage: defineTable({
    file_id: v.string(),
    filename: v.string(),
    fileurl: v.string(),
    workspace_id: v.string(),
    user_id: v.string(), // stack auth user id
  })
});

export default schema;
