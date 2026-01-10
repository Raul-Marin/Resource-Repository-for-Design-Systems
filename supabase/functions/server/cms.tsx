import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const cms = new Hono();

// Simple password protection (you can change this password)
const ADMIN_PASSWORD = "designsystems2024";

// Middleware to check admin authentication
const authMiddleware = async (c: any, next: any) => {
  const adminKey = c.req.header("X-Admin-Key");
  
  if (!adminKey || adminKey !== ADMIN_PASSWORD) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  await next();
};

// ============================================
// DESIGN SYSTEMS ROUTES
// ============================================

// Get all design systems
cms.get("/design-systems", async (c) => {
  const systems = await kv.get("design-systems") || [];
  // Reverse array to show newest items first (last added items appear first)
  const reversedSystems = [...systems].reverse();
  return c.json(reversedSystems, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
});

// Add design system
cms.post("/design-systems", authMiddleware, async (c) => {
  const newSystem = await c.req.json();
  const systems = await kv.get("design-systems") || [];
  
  const systemWithId = {
    ...newSystem,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  systems.push(systemWithId);
  await kv.set("design-systems", systems);
  
  return c.json(systemWithId);
});

// Update design system
cms.put("/design-systems/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const updates = await c.req.json();
  const systems = await kv.get("design-systems") || [];
  
  const index = systems.findIndex((s: any) => s.id === id);
  if (index === -1) {
    return c.json({ error: "Not found" }, 404);
  }
  
  // Merge updates with existing item
  const updatedSystem = { ...systems[index], ...updates, updatedAt: new Date().toISOString() };
  
  // Remove undefined and null fields to ensure they are properly cleared
  Object.keys(updatedSystem).forEach(key => {
    if (updatedSystem[key] === undefined || updatedSystem[key] === null) {
      delete updatedSystem[key];
    }
  });
  
  systems[index] = updatedSystem;
  await kv.set("design-systems", systems);
  
  return c.json(systems[index]);
});

// Delete design system
cms.delete("/design-systems/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const systems = await kv.get("design-systems") || [];
  
  const filtered = systems.filter((s: any) => s.id !== id);
  await kv.set("design-systems", filtered);
  
  return c.json({ success: true });
});

// ============================================
// TOOLS ROUTES
// ============================================

cms.get("/tools", async (c) => {
  const tools = await kv.get("tools") || [];
  return c.json(tools, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
});

cms.post("/tools", async (c) => {
  // Allow unauthenticated POST for migration purposes
  const newTool = await c.req.json();
  const tools = await kv.get("tools") || [];
  
  const toolWithId = {
    ...newTool,
    id: Date.now().toString() + Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
  };
  
  tools.push(toolWithId);
  await kv.set("tools", tools);
  
  return c.json(toolWithId);
});

cms.put("/tools/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const updates = await c.req.json();
  const tools = await kv.get("tools") || [];
  
  const index = tools.findIndex((t: any) => t.id === id);
  if (index === -1) {
    return c.json({ error: "Not found" }, 404);
  }
  
  // Merge updates with existing item
  const updatedTool = { ...tools[index], ...updates, updatedAt: new Date().toISOString() };
  
  // Remove undefined and null fields to ensure they are properly cleared
  Object.keys(updatedTool).forEach(key => {
    if (updatedTool[key] === undefined || updatedTool[key] === null) {
      delete updatedTool[key];
    }
  });
  
  tools[index] = updatedTool;
  await kv.set("tools", tools);
  
  return c.json(tools[index]);
});

cms.delete("/tools/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const tools = await kv.get("tools") || [];
  
  const filtered = tools.filter((t: any) => t.id !== id);
  await kv.set("tools", filtered);
  
  return c.json({ success: true });
});

// ============================================
// JOBS ROUTES
// ============================================

cms.get("/jobs", async (c) => {
  const jobs = await kv.get("jobs") || [];
  return c.json(jobs, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
});

cms.post("/jobs", async (c) => {
  // Allow unauthenticated POST for migration purposes
  const newJob = await c.req.json();
  const jobs = await kv.get("jobs") || [];
  
  const jobWithId = {
    ...newJob,
    id: Date.now().toString() + Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
  };
  
  jobs.push(jobWithId);
  await kv.set("jobs", jobs);
  
  return c.json(jobWithId);
});

cms.put("/jobs/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const updates = await c.req.json();
  const jobs = await kv.get("jobs") || [];
  
  const index = jobs.findIndex((j: any) => j.id === id);
  if (index === -1) {
    return c.json({ error: "Not found" }, 404);
  }
  
  // Merge updates with existing item
  const updatedJob = { ...jobs[index], ...updates, updatedAt: new Date().toISOString() };
  
  // Remove undefined and null fields to ensure they are properly cleared
  Object.keys(updatedJob).forEach(key => {
    if (updatedJob[key] === undefined || updatedJob[key] === null) {
      delete updatedJob[key];
    }
  });
  
  jobs[index] = updatedJob;
  await kv.set("jobs", jobs);
  
  return c.json(jobs[index]);
});

cms.delete("/jobs/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const jobs = await kv.get("jobs") || [];
  
  const filtered = jobs.filter((j: any) => j.id !== id);
  await kv.set("jobs", filtered);
  
  return c.json({ success: true });
});

// ============================================
// READINGS ROUTES
// ============================================

cms.get("/readings", async (c) => {
  const readings = await kv.get("readings") || [];
  return c.json(readings, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
});

cms.post("/readings", authMiddleware, async (c) => {
  const newReading = await c.req.json();
  const readings = await kv.get("readings") || [];
  
  const readingWithId = {
    ...newReading,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  readings.push(readingWithId);
  await kv.set("readings", readings);
  
  return c.json(readingWithId);
});

cms.put("/readings/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const updates = await c.req.json();
  const readings = await kv.get("readings") || [];
  
  const index = readings.findIndex((r: any) => r.id === id);
  if (index === -1) {
    return c.json({ error: "Not found" }, 404);
  }
  
  // Merge updates with existing item
  const updatedReading = { ...readings[index], ...updates, updatedAt: new Date().toISOString() };
  
  // Remove undefined and null fields to ensure they are properly cleared
  Object.keys(updatedReading).forEach(key => {
    if (updatedReading[key] === undefined || updatedReading[key] === null) {
      delete updatedReading[key];
    }
  });
  
  readings[index] = updatedReading;
  await kv.set("readings", readings);
  
  return c.json(readings[index]);
});

cms.delete("/readings/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const readings = await kv.get("readings") || [];
  
  const filtered = readings.filter((r: any) => r.id !== id);
  await kv.set("readings", filtered);
  
  return c.json({ success: true });
});

// ============================================
// CONTRIBUTORS ROUTES
// ============================================

cms.get("/contributors", async (c) => {
  const contributors = await kv.get("contributors") || [];
  return c.json(contributors, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
});

cms.post("/contributors", authMiddleware, async (c) => {
  const newContributor = await c.req.json();
  const contributors = await kv.get("contributors") || [];
  
  const contributorWithId = {
    ...newContributor,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  contributors.push(contributorWithId);
  await kv.set("contributors", contributors);
  
  return c.json(contributorWithId);
});

cms.put("/contributors/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const updates = await c.req.json();
  const contributors = await kv.get("contributors") || [];
  
  const index = contributors.findIndex((c: any) => c.id === id);
  if (index === -1) {
    return c.json({ error: "Not found" }, 404);
  }
  
  // Merge updates with existing item
  const updatedContributor = { ...contributors[index], ...updates, updatedAt: new Date().toISOString() };
  
  // Remove undefined and null fields to ensure they are properly cleared
  Object.keys(updatedContributor).forEach(key => {
    if (updatedContributor[key] === undefined || updatedContributor[key] === null) {
      delete updatedContributor[key];
    }
  });
  
  contributors[index] = updatedContributor;
  await kv.set("contributors", contributors);
  
  return c.json(contributors[index]);
});

cms.delete("/contributors/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const contributors = await kv.get("contributors") || [];
  
  const filtered = contributors.filter((c: any) => c.id !== id);
  await kv.set("contributors", filtered);
  
  return c.json({ success: true });
});

// ============================================
// SUBMISSIONS ROUTES (Resource Suggestions)
// ============================================

// Diagnostic route to check both KV and Supabase table
cms.get("/submissions/diagnose", async (c) => {
  try {
    let kvSubmissions = [];
    try {
      kvSubmissions = await kv.get("submissions") || [];
    } catch (kvError) {
      console.error('KV get error in diagnose (continuing with empty array):', kvError);
      kvSubmissions = [];
    }
    
    // Try to get from Supabase table
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    
    const { data: tableData, error } = await supabase
      .from('resource_suggestions')
      .select('*')
      .order('created_at', { ascending: false });
    
    return c.json({
      kv: {
        count: kvSubmissions.length,
        data: kvSubmissions
      },
      table: {
        error: error?.message || null,
        count: tableData?.length || 0,
        data: tableData || []
      }
    });
  } catch (err) {
    console.error('Error in diagnose:', err);
    return c.json({ error: String(err) }, 500);
  }
});

// Migrate from Supabase table to KV Store
cms.post("/submissions/migrate-from-table", authMiddleware, async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    
    const { data: tableData, error } = await supabase
      .from('resource_suggestions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase query error:', error);
      return c.json({ error: error.message }, 500);
    }
    
    // Get existing KV data to preserve status changes
    let existingKVData = [];
    try {
      existingKVData = await kv.get("submissions") || [];
    } catch (kvError) {
      console.error('KV get error (continuing with empty array):', kvError);
      existingKVData = [];
    }
    console.log('Existing KV submissions:', existingKVData.length);
    console.log('Table submissions:', tableData?.length || 0);
    
    if (!tableData || tableData.length === 0) {
      // If no data in table, keep existing KV data
      return c.json({ 
        success: true,
        message: "No new data in table",
        kept: existingKVData.length
      });
    }
    
    // Create a map of existing submissions by ID to preserve their status
    const existingMap = new Map();
    existingKVData.forEach((item: any) => {
      existingMap.set(item.id, item);
    });
    
    // Merge: keep status from KV if exists, otherwise use table data
    const mergedData = tableData.map((tableItem: any) => {
      const existingItem = existingMap.get(tableItem.id);
      if (existingItem && existingItem.status) {
        // Keep the status from KV Store if it was already set
        return {
          ...tableItem,
          status: existingItem.status
        };
      }
      // New item or no status set, use table data (will be 'pending' or null)
      return {
        ...tableItem,
        status: tableItem.status || 'pending'
      };
    });
    
    // Save merged data to KV Store
    await kv.set("submissions", mergedData);
    
    console.log('Migration complete. Total submissions:', mergedData.length);
    
    return c.json({ 
      success: true, 
      synced: mergedData.length,
      fromTable: tableData.length,
      data: mergedData
    });
  } catch (err) {
    console.error('Error in migration:', err);
    return c.json({ error: String(err) }, 500);
  }
});

cms.get("/submissions", async (c) => {
  try {
    const submissions = await kv.get("submissions") || [];
    console.log('GET /submissions - returning', submissions.length, 'submissions');
    return c.json(submissions, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (err) {
    console.error('Error in submissions GET:', err);
    return c.json({ error: String(err) }, 500);
  }
});

cms.delete("/submissions/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const submissions = await kv.get("submissions") || [];
    const filtered = submissions.filter((item: any) => item.id !== id);
    await kv.set("submissions", filtered);
    
    // Also delete from Supabase table to keep both in sync
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    
    const { error: deleteError } = await supabase
      .from('resource_suggestions')
      .delete()
      .eq('id', id);
    
    if (deleteError) {
      console.error('Error deleting from Supabase table:', deleteError);
      // Don't fail the request, KV is already updated
    } else {
      console.log('Successfully deleted from both KV and Supabase table');
    }
    
    return c.json({ success: true });
  } catch (err) {
    console.error('Error in submission DELETE:', err);
    return c.json({ error: String(err) }, 500);
  }
});

// Update submission status (only in KV Store, not in Supabase table)
cms.put("/submissions/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    const submissions = await kv.get("submissions") || [];
    
    console.log('PUT /submissions/:id - Looking for ID:', id);
    console.log('Updates to apply:', JSON.stringify(updates, null, 2));
    
    const index = submissions.findIndex((item: any) => item.id === id);
    
    if (index === -1) {
      console.error('Submission not found. Available IDs:', submissions.map((s: any) => s.id));
      return c.json({ error: "Submission not found" }, 404);
    }
    
    submissions[index] = { ...submissions[index], ...updates };
    await kv.set("submissions", submissions);
    
    console.log('Successfully updated submission in KV Store:', submissions[index]);
    
    return c.json(submissions[index]);
  } catch (err) {
    console.error('Error in submission PUT:', err);
    return c.json({ error: String(err) }, 500);
  }
});



// ============================================
// IMAGE UPLOAD ROUTE
// ============================================

cms.post("/upload-image", authMiddleware, async (c) => {
  try {
    // Get Supabase client with service role key
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const bucketName = "make-9f3e46c1-images";

    // Check if bucket exists, create if not
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log("Creating bucket:", bucketName);
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true, // Make bucket public so we don't need signed URLs
      });
      
      if (createError) {
        console.error("Error creating bucket:", createError);
        return c.json({ error: "Failed to create storage bucket" }, 500);
      }
    }

    // Parse the request body as FormData
    const formData = await c.req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split(".").pop();
    const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, uint8Array, {
        contentType: file.type,
        cacheControl: "3600",
      });

    if (error) {
      console.error("Upload error:", error);
      return c.json({ error: "Failed to upload image" }, 500);
    }

    // Get public URL (since bucket is public)
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    console.log("Image uploaded successfully:", publicUrl);

    return c.json({ url: publicUrl });
  } catch (err) {
    console.error("Error in upload-image:", err);
    return c.json({ error: "Internal server error: " + err.message }, 500);
  }
});

export default cms;