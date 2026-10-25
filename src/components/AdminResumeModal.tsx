import React, { useState, useEffect, useRef } from "react";
import {
  Lock,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Download,
  RefreshCw,
  KeyRound,
  LogOut,
  Eye,
  EyeOff,
  ExternalLink,
  RotateCcw,
  Settings,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

interface AdminResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResumeMetadata {
  filename: string;
  originalName?: string;
  downloadFilename?: string;
  sizeBytes: number;
  updatedAt: string;
  exists: boolean;
  isDefault?: boolean;
  status?: string;
  candidateName?: string;
}

export const AdminResumeModal: React.FC<AdminResumeModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("praveen_admin_token"));
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"document" | "upload" | "settings">("document");

  // Metadata & Live document state
  const [resumeInfo, setResumeInfo] = useState<ResumeMetadata | null>(null);
  const [previewTimestamp, setPreviewTimestamp] = useState<number>(Date.now());
  const [isDownloading, setIsDownloading] = useState(false);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "idle" | "uploading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings state
  const [customDownloadName, setCustomDownloadName] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState<{ type: "idle" | "success" | "error"; message?: string }>({
    type: "idle",
  });

  // Password change state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passChangeStatus, setPassChangeStatus] = useState<{ type: "idle" | "saving" | "success" | "error"; message?: string }>({
    type: "idle",
  });

  // Reset state
  const [isResetting, setIsResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Validate existing token on mount or token change
  useEffect(() => {
    if (token) {
      fetch("/api/admin/session", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) {
            handleLogout();
          } else {
            fetchResumeInfo();
          }
        })
        .catch(() => handleLogout());
    }
  }, [token]);

  // Fetch resume info whenever modal opens
  useEffect(() => {
    if (isOpen) {
      fetchResumeInfo();
    }
  }, [isOpen]);

  const fetchResumeInfo = async () => {
    try {
      const res = await fetch(`/api/resume/info?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setResumeInfo(data);
        if (data.downloadFilename) {
          setCustomDownloadName(data.downloadFilename);
        }
      }
    } catch {
      // Ignored
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || "Authentication failed. Check your passcode.");
      } else {
        localStorage.setItem("praveen_admin_token", data.token);
        setToken(data.token);
        setPassword("");
        fetchResumeInfo();
      }
    } catch {
      setAuthError("Network error. Please verify the server connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // Ignored
      }
    }
    localStorage.removeItem("praveen_admin_token");
    setToken(null);
    setSelectedFile(null);
    setUploadStatus({ type: "idle" });
    setSettingsStatus({ type: "idle" });
    setPassChangeStatus({ type: "idle" });
    setShowResetConfirm(false);
  };

  const validateAndSetFile = (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setUploadStatus({
        type: "error",
        message: "Invalid format: Only valid PDF documents (.pdf) are allowed.",
      });
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadStatus({
        type: "error",
        message: "File exceeds 15MB limit. Please upload an optimized PDF document.",
      });
      return;
    }

    setSelectedFile(file);
    setUploadStatus({
      type: "idle",
      message: undefined,
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !token) return;

    setUploadStatus({ type: "uploading", message: "Verifying headers and publishing resume..." });

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const res = await fetch("/api/admin/resume/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setUploadStatus({
          type: "error",
          message: data.error || "Upload failed. Please verify the PDF file.",
        });
      } else {
        setUploadStatus({
          type: "success",
          message: "New resume successfully published to live website!",
        });
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setPreviewTimestamp(Date.now());
        fetchResumeInfo();

        // Dispatch broadcast so other portfolio sections update in real-time
        window.dispatchEvent(new CustomEvent("resume-updated", { detail: data.metadata }));
      }
    } catch {
      setUploadStatus({
        type: "error",
        message: "Network error occurred while uploading. Please check connection.",
      });
    }
  };

  const handleResetToDefault = async () => {
    if (!token) return;
    setIsResetting(true);

    try {
      const res = await fetch("/api/admin/resume/reset", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setShowResetConfirm(false);
        setPreviewTimestamp(Date.now());
        fetchResumeInfo();
        window.dispatchEvent(new CustomEvent("resume-updated", { detail: data.metadata }));
      }
    } catch {
      // Ignored
    } finally {
      setIsResetting(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setIsSavingSettings(true);
    setSettingsStatus({ type: "idle" });

    try {
      const res = await fetch("/api/admin/resume/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ downloadFilename: customDownloadName }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSettingsStatus({ type: "success", message: "Download filename updated successfully." });
        fetchResumeInfo();
        window.dispatchEvent(new CustomEvent("resume-updated", { detail: data.metadata }));
      } else {
        setSettingsStatus({ type: "error", message: data.error || "Failed to update settings." });
      }
    } catch {
      setSettingsStatus({ type: "error", message: "Network error saving settings." });
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (newPass !== confirmPass) {
      setPassChangeStatus({ type: "error", message: "New passcodes do not match." });
      return;
    }
    if (newPass.length < 6) {
      setPassChangeStatus({ type: "error", message: "New passcode must be at least 6 characters long." });
      return;
    }

    setPassChangeStatus({ type: "saving", message: "Updating passcode..." });

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPass,
          newPassword: newPass,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPassChangeStatus({ type: "success", message: "Security passcode updated successfully!" });
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
      } else {
        setPassChangeStatus({ type: "error", message: data.error || "Failed to change passcode." });
      }
    } catch {
      setPassChangeStatus({ type: "error", message: "Network error updating passcode." });
    }
  };

  const handleProgrammaticDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(`/api/resume/download?_t=${Date.now()}`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resumeInfo?.downloadFilename || "Praveen_Kumar_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Direct download error, opening link fallback:", err);
      window.open("/api/resume/download", "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#141416] border border-white/15 rounded-2xl shadow-2xl p-5 sm:p-7 text-[#F1F0EC] space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#4263EB]/15 text-[#4263EB] rounded-xl border border-[#4263EB]/30">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="admin-modal-title" className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Resume Administrator Console
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  Live System
                </span>
              </div>
              <p className="text-xs font-mono text-[#888]">
                S.V. Praveen Kumar · Real-Time Curriculum Vitae Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-[#888] hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Not Authenticated: Passcode Screen */}
        {!token ? (
          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="p-4 bg-[#1C1C20] rounded-xl border border-white/10 space-y-2">
              <span className="text-xs font-semibold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#4263EB]" />
                Administrator Passcode Required
              </span>
              <p className="text-xs text-[#999] leading-relaxed">
                Enter your administrative key to view, inspect live preview, upload new versions, customize download filename, or restore your official curriculum vitae.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="block text-xs font-medium text-[#C0C0C8]">
                Administrative Passcode
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator passcode..."
                  className="w-full text-xs px-3.5 py-2.5 pr-10 rounded-lg bg-[#1C1C20] border border-white/15 text-white placeholder-[#666] focus:outline-none focus:border-[#4263EB]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777] hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#AAA] hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 bg-[#4263EB] text-white text-xs font-semibold rounded-lg hover:bg-[#3651C9] transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Verify & Access Console</span>
              </button>
            </div>
          </form>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-5">
            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("document")}
                className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "document"
                    ? "border-[#4263EB] text-white"
                    : "border-transparent text-[#888] hover:text-[#CCC]"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Live Document & Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "upload"
                    ? "border-[#4263EB] text-white"
                    : "border-transparent text-[#888] hover:text-[#CCC]"
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload & Publish</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "settings"
                    ? "border-[#4263EB] text-white"
                    : "border-transparent text-[#888] hover:text-[#CCC]"
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings & Security</span>
              </button>
            </div>

            {/* TAB 1: LIVE DOCUMENT & PREVIEW */}
            {activeTab === "document" && (
              <div className="space-y-4">
                {/* Status Bar */}
                <div className="p-4 bg-[#1C1C20] rounded-xl border border-white/10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/5 text-xs font-mono">
                    <span className="text-[#888]">CURRENT LIVE RESUME</span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {resumeInfo?.status || "Active & Serving"}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs sm:text-sm font-bold text-white block">
                          {resumeInfo?.downloadFilename || resumeInfo?.filename || "Praveen_Kumar_Resume.pdf"}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#888]">
                          <span>
                            {resumeInfo?.sizeBytes
                              ? `${(resumeInfo.sizeBytes / 1024).toFixed(1)} KB`
                              : "4.9 KB"}
                          </span>
                          <span>·</span>
                          <span>
                            Updated {resumeInfo?.updatedAt ? new Date(resumeInfo.updatedAt).toLocaleDateString() : "Today"}
                          </span>
                          <span>·</span>
                          <span className="text-[#4263EB]">
                            {resumeInfo?.isDefault ? "Official Template" : "Custom Upload"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleProgrammaticDownload}
                        disabled={isDownloading}
                        className="px-3.5 py-2 bg-[#4263EB] hover:bg-[#3651C9] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        {isDownloading ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>Download PDF</span>
                      </button>

                      <a
                        href="/api/resume/preview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs transition-colors shrink-0"
                        title="Open in new window"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Embedded Live PDF Preview Frame */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-[#AAA]">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-[#4263EB]" />
                      Direct In-Console PDF Preview
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewTimestamp(Date.now())}
                      className="text-[11px] font-mono text-[#888] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Refresh Frame</span>
                    </button>
                  </div>

                  <div className="w-full h-80 sm:h-96 rounded-xl border border-white/15 bg-white overflow-hidden shadow-inner">
                    <iframe
                      src={`/api/resume/preview?_v=${previewTimestamp}#toolbar=0&navpanes=0`}
                      title="Praveen Kumar Resume Live Document Preview"
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>

                {/* Reset to Default Action */}
                <div className="p-3 bg-[#1A1A1E] rounded-xl border border-white/10 flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="text-[#DDD] font-medium block">Default Resume Template</span>
                    <span className="text-[11px] text-[#777]">
                      Revert any customized upload back to S.V. Praveen Kumar's official curriculum vitae.
                    </span>
                  </div>

                  {!showResetConfirm ? (
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-[#CCC] hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore Default</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleResetToDefault}
                        disabled={isResetting}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {isResetting ? <RefreshCw className="w-3 h-3 animate-spin" /> : null}
                        <span>Confirm Restore</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="px-2 py-1.5 text-xs text-[#888] hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: UPLOAD & PUBLISH */}
            {activeTab === "upload" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-white block">
                    Upload & Publish Updated Resume PDF
                  </span>
                  <p className="text-xs text-[#999]">
                    Select or drag-and-drop your latest curriculum vitae. Once published, visitors on the live portfolio will immediately download this version.
                  </p>
                </div>

                {/* Drag & Drop Upload Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? "border-[#4263EB] bg-[#4263EB]/10 scale-[1.01]"
                      : "border-white/20 hover:border-[#4263EB] bg-[#1A1A1E] hover:bg-[#1C1C22]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#4263EB]/15 text-[#4263EB] flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white mb-1">
                    {selectedFile ? selectedFile.name : "Click to browse or drop your PDF here"}
                  </p>
                  <p className="text-[11px] text-[#777] font-mono">
                    {selectedFile
                      ? `${(selectedFile.size / 1024).toFixed(1)} KB selected · Ready for publish`
                      : "Strictly application/pdf · Max 15MB · Header verified"}
                  </p>
                </div>

                {/* Selected File Card */}
                {selectedFile && (
                  <div className="p-3.5 bg-[#1C1C20] rounded-xl border border-[#4263EB]/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText className="w-4 h-4 text-[#4263EB] shrink-0" />
                      <div className="truncate">
                        <span className="text-xs font-semibold text-white block truncate">
                          {selectedFile.name}
                        </span>
                        <span className="text-[10px] font-mono text-[#888]">
                          {(selectedFile.size / 1024).toFixed(1)} KB · Validated PDF
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="p-1 text-[#888] hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Clear selection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Status Banners */}
                {uploadStatus.message && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2.5 ${
                      uploadStatus.type === "error"
                        ? "bg-rose-500/10 border border-rose-500/20 text-rose-300"
                        : uploadStatus.type === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                        : "bg-blue-500/10 border border-blue-500/20 text-blue-300"
                    }`}
                  >
                    {uploadStatus.type === "error" ? (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    ) : uploadStatus.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <RefreshCw className="w-4 h-4 shrink-0 animate-spin" />
                    )}
                    <span>{uploadStatus.message}</span>
                  </div>
                )}

                {/* Submit Publish Button */}
                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploadStatus.type === "uploading"}
                    className="w-full py-3 bg-[#4263EB] hover:bg-[#3651C9] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {uploadStatus.type === "uploading" ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>Publish "{selectedFile.name}" to Live Site</span>
                  </button>
                )}
              </div>
            )}

            {/* TAB 3: SETTINGS & PASSCODE */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Custom Download Filename */}
                <form onSubmit={handleSaveSettings} className="p-4 bg-[#1C1C20] rounded-xl border border-white/10 space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-white block">
                      Custom Download Filename
                    </span>
                    <p className="text-[11px] text-[#888]">
                      Controls the name of the file saved on recruiters' devices when they click Download PDF.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customDownloadName}
                      onChange={(e) => setCustomDownloadName(e.target.value)}
                      placeholder="e.g. Praveen_Kumar_Resume_AIML.pdf"
                      className="flex-1 text-xs px-3 py-2 rounded-lg bg-[#141416] border border-white/15 text-white placeholder-[#555] focus:outline-none focus:border-[#4263EB]"
                    />
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      {isSavingSettings ? "Saving..." : "Save Name"}
                    </button>
                  </div>

                  {settingsStatus.message && (
                    <div
                      className={`p-2 rounded text-xs ${
                        settingsStatus.type === "success"
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-rose-400 bg-rose-500/10"
                      }`}
                    >
                      {settingsStatus.message}
                    </div>
                  )}
                </form>

                {/* Change Administrator Passcode */}
                <form onSubmit={handleChangePassword} className="p-4 bg-[#1C1C20] rounded-xl border border-white/10 space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-white block">
                      Update Security Passcode
                    </span>
                    <p className="text-[11px] text-[#888]">
                      Change the password used to unlock this Resume Administrator Console.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] text-[#AAA] mb-1">Current Passcode</label>
                      <input
                        type="password"
                        required
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        placeholder="Current passcode..."
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#141416] border border-white/15 text-white placeholder-[#555] focus:outline-none focus:border-[#4263EB]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-[#AAA] mb-1">New Passcode</label>
                        <input
                          type="password"
                          required
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="Min 6 characters..."
                          className="w-full text-xs px-3 py-2 rounded-lg bg-[#141416] border border-white/15 text-white placeholder-[#555] focus:outline-none focus:border-[#4263EB]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#AAA] mb-1">Confirm New Passcode</label>
                        <input
                          type="password"
                          required
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          placeholder="Repeat new passcode..."
                          className="w-full text-xs px-3 py-2 rounded-lg bg-[#141416] border border-white/15 text-white placeholder-[#555] focus:outline-none focus:border-[#4263EB]"
                        />
                      </div>
                    </div>
                  </div>

                  {passChangeStatus.message && (
                    <div
                      className={`p-2 rounded text-xs ${
                        passChangeStatus.type === "success"
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-rose-400 bg-rose-500/10"
                      }`}
                    >
                      {passChangeStatus.message}
                    </div>
                  )}

                  <div className="pt-1 flex justify-end">
                    <button
                      type="submit"
                      disabled={passChangeStatus.type === "saving"}
                      className="px-4 py-2 bg-[#4263EB] hover:bg-[#3651C9] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {passChangeStatus.type === "saving" && <RefreshCw className="w-3 h-3 animate-spin" />}
                      <span>Update Passcode</span>
                    </button>
                  </div>
                </form>

                {/* Active Session Info */}
                <div className="p-3 bg-[#17171A] rounded-xl border border-white/5 flex items-center justify-between text-xs text-[#777] font-mono">
                  <span>Session Active · Encrypted 24h Token</span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-mono text-[#888] hover:text-rose-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white/10 text-white rounded-lg text-xs font-medium hover:bg-white/15 transition-colors cursor-pointer"
              >
                Close Console
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
