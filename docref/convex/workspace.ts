import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from 'uuid';

// --- Workspace Table Operations ---

// Create a new workspace for a user
export const createWorkspace = mutation({
  args: {
    user_id: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const workspace_id = uuidv4();
    await ctx.db.insert("workspace", {
      workspace_id,
      user_id: args.user_id,
      email: args.email,
      workspace_filetype: "", // Placeholder
      workspace_filesize: 0, // Placeholder
      workspace_doctitle: args.name,
      workspace_doctags: [],
      workspace_notes: "",
      docuploaded_date: new Date().toISOString(),
      user_total_documents: 0,
    });
    return { workspace_id };
  }
});

// List all workspaces for a user
export const listWorkspaces = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("workspace").filter(q => q.eq(q.field("user_id"), args.user_id)).collect();
  }
});

// Get document statistics for the dashboard
export const getDocumentStats = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    
    // Get all documents for the user
    const allDocs = await ctx.db.query("docref")
      .filter(q => q.eq(q.field("user_id"), args.user_id))
      .collect();

    // Calculate statistics
    const totalDocuments = allDocs.length;
    const thisMonth = allDocs.filter(doc => 
      doc.doc_uploaded_date >= startOfMonth
    ).length;
    const taggedItems = allDocs.filter(doc => 
      doc.doc_tags && doc.doc_tags.length > 0
    ).length;

    return {
      totalDocuments,
      thisMonth,
      taggedItems
    };
  }
});
