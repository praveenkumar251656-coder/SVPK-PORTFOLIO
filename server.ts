import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
// AI Studio requires the applet server to run strictly on port 3000
const PORT = 3000;
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());

// Persistent admin session & security storage
const STORAGE_DIR = path.resolve(process.cwd(), "storage/resume");
const DEFAULT_DIR = path.join(STORAGE_DIR, "default");
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}
if (!fs.existsSync(DEFAULT_DIR)) {
  fs.mkdirSync(DEFAULT_DIR, { recursive: true });
}

const RESUME_FILE_PATH = path.join(STORAGE_DIR, "Praveen_Kumar_Resume.pdf");
const DEFAULT_RESUME_PATH = path.join(DEFAULT_DIR, "Praveen_Kumar_Resume_Default.pdf");
const METADATA_FILE_PATH = path.join(STORAGE_DIR, "metadata.json");
const AUTH_FILE_PATH = path.join(STORAGE_DIR, "auth_config.json");
const SESSIONS_FILE_PATH = path.join(STORAGE_DIR, "sessions.json");

const SESSION_LIFETIME_MS = 24 * 60 * 60 * 1000; // 24 hours

// Load or save sessions to disk
function loadSessions(): Map<string, { expiresAt: number }> {
  const map = new Map<string, { expiresAt: number }>();
  try {
    if (fs.existsSync(SESSIONS_FILE_PATH)) {
      const data = JSON.parse(fs.readFileSync(SESSIONS_FILE_PATH, "utf-8"));
      const now = Date.now();
      for (const [token, info] of Object.entries(data)) {
        if ((info as { expiresAt: number }).expiresAt > now) {
          map.set(token, info as { expiresAt: number });
        }
      }
    }
  } catch {
    // Fallback to empty map
  }
  return map;
}

function persistSessions(map: Map<string, { expiresAt: number }>) {
  try {
    const obj: Record<string, { expiresAt: number }> = {};
    for (const [k, v] of map.entries()) {
      obj[k] = v;
    }
    fs.writeFileSync(SESSIONS_FILE_PATH, JSON.stringify(obj, null, 2), "utf-8");
  } catch {
    // Ignore error
  }
}

const sessions = loadSessions();

function getStoredPassword(): string {
  try {
    if (fs.existsSync(AUTH_FILE_PATH)) {
      const auth = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, "utf-8"));
      if (auth.password && typeof auth.password === "string") {
        return auth.password;
      }
    }
  } catch {
    // Fallback
  }
  return process.env.ADMIN_RESUME_PASSWORD || "SVPK@8248711419";
}

function verifyPassword(input: string): boolean {
  const expected = getStoredPassword();
  const hashA = crypto.createHash("sha256").update(String(input || "")).digest();
  const hashB = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function cleanExpiredSessions() {
  const now = Date.now();
  let changed = false;
  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt <= now) {
      sessions.delete(token);
      changed = true;
    }
  }
  if (changed) {
    persistSessions(sessions);
  }
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  cleanExpiredSessions();
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, error: "Unauthorized: Missing authentication token" });
    return;
  }
  const token = authHeader.slice(7).trim();
  const session = sessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    if (session) {
      sessions.delete(token);
      persistSessions(sessions);
    }
    res.status(401).json({ success: false, error: "Unauthorized: Session expired or invalid" });
    return;
  }
  next();
}

// Ensure default fallback resume exists if needed
function ensureDefaultResumeExists() {
  if (!fs.existsSync(RESUME_FILE_PATH)) {
    if (fs.existsSync(DEFAULT_RESUME_PATH)) {
      fs.copyFileSync(DEFAULT_RESUME_PATH, RESUME_FILE_PATH);
    }
  }
  if (!fs.existsSync(DEFAULT_RESUME_PATH) && fs.existsSync(RESUME_FILE_PATH)) {
    fs.copyFileSync(RESUME_FILE_PATH, DEFAULT_RESUME_PATH);
  }
  if (!fs.existsSync(METADATA_FILE_PATH) && fs.existsSync(RESUME_FILE_PATH)) {
    const stats = fs.statSync(RESUME_FILE_PATH);
    const initialMeta = {
      filename: "Praveen_Kumar_Resume.pdf",
      originalName: "Praveen_Kumar_Resume_Official.pdf",
      downloadFilename: "Praveen_Kumar_Resume.pdf",
      updatedAt: stats.mtime.toISOString(),
      sizeBytes: stats.size,
      isDefault: true,
      candidateName: "S.V. Praveen Kumar",
      status: "Active & Serving",
    };
    fs.writeFileSync(METADATA_FILE_PATH, JSON.stringify(initialMeta, null, 2), "utf-8");
  }
}
ensureDefaultResumeExists();

// Configure multer with memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF documents (.pdf) are permitted"));
    }
  },
});

// ==========================================
// RESUME PUBLIC & ADMIN API ROUTES
// ==========================================

// Public Download Endpoint (Forces attachment download)
app.get("/api/resume/download", (_req, res) => {
  ensureDefaultResumeExists();
  if (!fs.existsSync(RESUME_FILE_PATH)) {
    res.status(404).json({ error: "Resume file not found" });
    return;
  }

  let downloadName = "Praveen_Kumar_Resume.pdf";
  try {
    if (fs.existsSync(METADATA_FILE_PATH)) {
      const meta = JSON.parse(fs.readFileSync(METADATA_FILE_PATH, "utf-8"));
      if (meta.downloadFilename) {
        downloadName = meta.downloadFilename;
      }
    }
  } catch {
    // Use fallback
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${downloadName}"`);
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  const fileStream = fs.createReadStream(RESUME_FILE_PATH);
  fileStream.pipe(res);
});

// Inline Preview Endpoint (Allows direct embedded viewing in iframe or modal)
app.get("/api/resume/preview", (_req, res) => {
  ensureDefaultResumeExists();
  if (!fs.existsSync(RESUME_FILE_PATH)) {
    res.status(404).json({ error: "Resume file not found" });
    return;
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="Praveen_Kumar_Resume_Preview.pdf"');
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  const fileStream = fs.createReadStream(RESUME_FILE_PATH);
  fileStream.pipe(res);
});

// Public Resume Metadata
app.get("/api/resume/info", (_req, res) => {
  ensureDefaultResumeExists();
  if (!fs.existsSync(RESUME_FILE_PATH)) {
    res.status(404).json({ exists: false, error: "Resume not found" });
    return;
  }

  try {
    let metadata = {
      filename: "Praveen_Kumar_Resume.pdf",
      originalName: "Praveen_Kumar_Resume.pdf",
      downloadFilename: "Praveen_Kumar_Resume.pdf",
      updatedAt: new Date().toISOString(),
      sizeBytes: 0,
      isDefault: true,
      candidateName: "S.V. Praveen Kumar",
      status: "Active & Serving",
    };

    if (fs.existsSync(METADATA_FILE_PATH)) {
      metadata = { ...metadata, ...JSON.parse(fs.readFileSync(METADATA_FILE_PATH, "utf-8")) };
    } else {
      const stats = fs.statSync(RESUME_FILE_PATH);
      metadata.sizeBytes = stats.size;
      metadata.updatedAt = stats.mtime.toISOString();
    }

    res.json({ exists: true, ...metadata });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to read resume metadata", details: errorMsg });
  }
});

// Admin Login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body || {};
  if (!password || typeof password !== "string") {
    res.status(400).json({ success: false, error: "Passcode is required" });
    return;
  }

  if (!verifyPassword(password)) {
    res.status(401).json({ success: false, error: "Incorrect passcode. Access denied." });
    return;
  }

  cleanExpiredSessions();
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + SESSION_LIFETIME_MS;
  sessions.set(token, { expiresAt });
  persistSessions(sessions);

  res.json({
    success: true,
    token,
    expiresAt: new Date(expiresAt).toISOString(),
    message: "Admin authentication successful",
  });
});

// Check Session Status
app.get("/api/admin/session", requireAdmin, (_req, res) => {
  res.json({ authenticated: true, validUntil: Date.now() + SESSION_LIFETIME_MS });
});

// Admin Logout
app.post("/api/admin/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    sessions.delete(token);
    persistSessions(sessions);
  }
  res.json({ success: true, message: "Logged out successfully" });
});

// Admin Resume Upload
app.post("/api/admin/resume/upload", requireAdmin, (req, res) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false, error: err.message || "File upload error" });
      return;
    }

    const file = req.file;
    if (!file || !file.buffer) {
      res.status(400).json({ success: false, error: "No PDF file was provided." });
      return;
    }

    // Verify PDF Magic Bytes (%PDF- is 0x25 0x50 0x44 0x46 0x2D)
    if (file.buffer.length < 5) {
      res.status(400).json({ success: false, error: "Invalid file format: file too small." });
      return;
    }

    const header = file.buffer.slice(0, 5).toString("utf-8");
    if (!header.startsWith("%PDF-")) {
      res.status(400).json({
        success: false,
        error: "Security validation failed: File does not have valid PDF magic headers (%PDF-).",
      });
      return;
    }

    try {
      fs.writeFileSync(RESUME_FILE_PATH, file.buffer);

      let existingMeta: Record<string, unknown> = {};
      try {
        if (fs.existsSync(METADATA_FILE_PATH)) {
          existingMeta = JSON.parse(fs.readFileSync(METADATA_FILE_PATH, "utf-8"));
        }
      } catch {
        // Ignored
      }

      const metadata = {
        ...existingMeta,
        filename: "Praveen_Kumar_Resume.pdf",
        originalName: file.originalname,
        downloadFilename: (existingMeta.downloadFilename as string) || "Praveen_Kumar_Resume.pdf",
        updatedAt: new Date().toISOString(),
        sizeBytes: file.size,
        isDefault: false,
        status: "Active & Serving (Custom Upload)",
        candidateName: "S.V. Praveen Kumar",
      };

      fs.writeFileSync(METADATA_FILE_PATH, JSON.stringify(metadata, null, 2), "utf-8");

      res.json({
        success: true,
        message: "Resume successfully uploaded and published to the live portfolio.",
        metadata,
      });
    } catch (saveError: unknown) {
      const errorMsg = saveError instanceof Error ? saveError.message : "Disk write failed";
      res.status(500).json({ success: false, error: "Failed to save file", details: errorMsg });
    }
  });
});

// Admin Reset to Default Official Resume
app.post("/api/admin/resume/reset", requireAdmin, (_req, res) => {
  try {
    if (!fs.existsSync(DEFAULT_RESUME_PATH)) {
      res.status(404).json({ success: false, error: "Default resume template not found on server." });
      return;
    }

    fs.copyFileSync(DEFAULT_RESUME_PATH, RESUME_FILE_PATH);
    const stats = fs.statSync(RESUME_FILE_PATH);

    const metadata = {
      filename: "Praveen_Kumar_Resume.pdf",
      originalName: "Praveen_Kumar_Resume_Default.pdf",
      downloadFilename: "Praveen_Kumar_Resume.pdf",
      updatedAt: new Date().toISOString(),
      sizeBytes: stats.size,
      isDefault: true,
      status: "Active & Serving (Official Default)",
      candidateName: "S.V. Praveen Kumar",
    };

    fs.writeFileSync(METADATA_FILE_PATH, JSON.stringify(metadata, null, 2), "utf-8");

    res.json({
      success: true,
      message: "Successfully restored official default resume.",
      metadata,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Reset failed";
    res.status(500).json({ success: false, error: "Failed to reset resume", details: errorMsg });
  }
});

// Admin Update Resume Settings & Metadata
app.post("/api/admin/resume/settings", requireAdmin, (req, res) => {
  try {
    const { downloadFilename } = req.body || {};
    let metadata: Record<string, unknown> = {};

    if (fs.existsSync(METADATA_FILE_PATH)) {
      metadata = JSON.parse(fs.readFileSync(METADATA_FILE_PATH, "utf-8"));
    }

    if (downloadFilename && typeof downloadFilename === "string") {
      let cleaned = downloadFilename.trim();
      if (!cleaned.toLowerCase().endsWith(".pdf")) {
        cleaned += ".pdf";
      }
      metadata.downloadFilename = cleaned;
    }

    metadata.updatedAt = new Date().toISOString();
    fs.writeFileSync(METADATA_FILE_PATH, JSON.stringify(metadata, null, 2), "utf-8");

    res.json({
      success: true,
      message: "Resume settings saved successfully.",
      metadata,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Settings update failed";
    res.status(500).json({ success: false, error: "Failed to update settings", details: errorMsg });
  }
});

// Admin Change Passcode
app.post("/api/admin/change-password", requireAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};

  if (!currentPassword || !newPassword) {
    res.status(400).json({ success: false, error: "Current passcode and new passcode are required." });
    return;
  }

  if (!verifyPassword(currentPassword)) {
    res.status(401).json({ success: false, error: "Current passcode is incorrect." });
    return;
  }

  if (typeof newPassword !== "string" || newPassword.length < 6) {
    res.status(400).json({ success: false, error: "New passcode must be at least 6 characters long." });
    return;
  }

  try {
    const authData = {
      password: newPassword,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(authData, null, 2), "utf-8");

    res.json({
      success: true,
      message: "Passcode updated successfully. Please keep note of your new passcode.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Passcode update failed";
    res.status(500).json({ success: false, error: "Failed to save new passcode", details: errorMsg });
  }
});

// ==========================================
// STATIC / VITE INTEGRATION
// ==========================================

async function startServer() {
  if (isProd) {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(process.cwd(), "index.html");
        let template = fs.readFileSync(indexPath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: unknown) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running at http://0.0.0.0:${PORT}`);
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    console.error("Server listen error:", err);
  });
}

startServer();
