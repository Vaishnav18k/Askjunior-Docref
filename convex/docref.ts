// convex/docref.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from "uuid";

// Define mutation to create a new document reference
export const createDocref = mutation({
  args: {
    // Required fields
    workspace_id: v.string(),
    user_id: v.string(),
    source: v.string(),
    doc_title: v.string(),
    doc_filetype: v.string(),
    doc_filesize: v.number(),
    doc_url: v.string(),

    // Optional fields
    edgestorage_id: v.optional(v.string()),
    doc_tags: v.optional(v.array(v.string())),
    doc_notes: v.optional(v.string()),
    total_documents: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const doc_id = uuidv4(); // Use UUID for consistency with edgestorage
    
    await ctx.db.insert("docref", {
      doc_id,
      ...args,
      doc_uploaded_date: new Date().toISOString(),
      total_documents: args.total_documents ?? 1, // Default to 1
    });

    return { doc_id };
  }
});

// Get document by ID
export const getDocrefById = query({
  args: { doc_id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("docref")
      .filter(q => q.eq(q.field("doc_id"), args.doc_id))
      .first();
  }
});

// List all documents for a user
export const listDocrefsByUser = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("docref")
      .filter(q => q.eq(q.field("user_id"), args.user_id))
      .collect();
  }
});

// List documents by workspace
export const listDocrefsByWorkspace = query({
  args: { workspace_id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("docref")
      .filter(q => q.eq(q.field("workspace_id"), args.workspace_id))
      .collect();
  }
});

// Update document metadata
export const updateDocref = mutation({
  args: {
    doc_id: v.string(),
    updateData: v.object({
      doc_title: v.optional(v.string()),
      doc_tags: v.optional(v.array(v.string())),
      doc_notes: v.optional(v.string()),
      doc_filetype: v.optional(v.string()),
      doc_filesize: v.optional(v.number()),
      doc_url: v.optional(v.string()),
      source: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("docref")
      .filter(q => q.eq(q.field("doc_id"), args.doc_id))
      .first();

    if (!doc) {
      throw new Error("Document not found");
    }

    await ctx.db.patch(doc._id, args.updateData);
    return { success: true };
  }
});

// Delete document reference
export const deleteDocref = mutation({
  args: { doc_id: v.string() },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("docref")
      .filter(q => q.eq(q.field("doc_id"), args.doc_id))
      .first();

    if (!doc) {
      throw new Error("Document not found");
    }

    await ctx.db.delete(doc._id);
    return { success: true };
  }
});