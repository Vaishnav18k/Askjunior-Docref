import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
// import { generateUniqueId } from "convex/server";
import { v4 as uuidv4 } from 'uuid';


// Mutation to register an uploaded file in edgestorage and docref tables
export const uploadToEdgestorage = mutation({
  args: {
    filename: v.string(),
    fileurl: v.string(),
    workspace_id: v.string(),
    user_id: v.string(),
    email: v.string(),
    doc_title: v.string(),
    doc_tags: v.optional(v.array(v.string())),
    doc_notes: v.optional(v.string()),
    doc_uploaded_date: v.string(),
    doc_filetype: v.string(),
    doc_filesize: v.number(),
    total_documents: v.number(),
  },
  handler: async (ctx, args) => {
    // Insert into edgestorage table
    // const file_id = generateUniqueId();
    // await ctx.db.insert("edgestorage", {
    //   file_id,
    //   filename: args.filename,
    //   fileurl: args.fileurl,
    //   workspace_id: args.workspace_id,
    //   user_id: args.user_id,
    // });
    const file_id = uuidv4();
    await ctx.db.insert("edgestorage", {
      file_id,
      filename: args.filename,
      fileurl: args.fileurl,
      workspace_id: args.workspace_id,
      user_id: args.user_id,
});
await ctx.db.insert("workspace", {
  workspace_id: args.workspace_id,
  user_id: args.user_id,
  email: args.email,
  workspace_filetype: args.doc_filetype,
  workspace_filesize: args.doc_filesize,
  workspace_doctitle: args.doc_title,
  workspace_doctags: args.doc_tags,
  workspace_notes: args.doc_notes,
  docuploaded_date: args.doc_uploaded_date,
  user_total_documents: args.total_documents,
});

    // Register in docref table
    await ctx.db.insert("docref", {
      doc_id: file_id.toString(),
      workspace_id: args.workspace_id,
      edgestorage_id: file_id.toString(),
      source: "edgestorage",
      doc_title: args.doc_title,
      doc_tags: args.doc_tags,
      doc_notes: args.doc_notes,
      doc_uploaded_date: args.doc_uploaded_date,
      doc_filetype: args.doc_filetype,
      doc_filesize: args.doc_filesize,
      doc_url: args.fileurl,
      user_id: args.user_id,
      total_documents: args.total_documents,
    });

    return { file_id };
  },
});
