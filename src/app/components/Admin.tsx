import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { Plus, Pencil, Trash2, Save, X, Upload, Home, Sparkles, Search, Database, Figma, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { FloatingToolbar } from "./FloatingToolbar";
import { FluidShader } from "./FluidShader";
import { CustomCursor } from "./CustomCursor";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { FolderSparkleIcon } from "./icons/FolderSparkleIcon";
import { PackageSparkleIcon } from "./icons/PackageSparkleIcon";
import { ClipboardSparkleIcon } from "./icons/ClipboardSparkleIcon";
import { BookSparkleIcon } from "./icons/BookSparkleIcon";
import { ChatSparkleIcon } from "./icons/ChatSparkleIcon";
import { PixelCharacter } from "./PixelCharacter";

type ContentType = "design-systems" | "tools" | "jobs" | "readings" | "contributors" | "submissions";

interface DesignSystem {
  id?: string;
  name: string;
  company: string;
  companyDomain?: string;
  iconUrl?: string; // Custom uploaded icon
  url: string;
  figmaKit?: string;
  category: string;
  badges?: string[]; // Predefined badges: 'new' (displays as "just added"), 'ai-accessibility', 'mcp-support', 'tokens'
  isEditorsChoice?: boolean; // Adds 'recommended' badge automatically
  additionalUrls?: string[];
  contributedBy?: string; // Name of contributor
  contributorUrl?: string; // URL to contributor's profile/social
}

interface Tool {
  id?: string;
  name: string;
  description: string;
  url: string;
  category: string;
  domain?: string;
  iconUrl?: string; // Custom uploaded icon
  isPaid?: boolean;
  price?: string;
  isAuthorPick?: boolean;
  authorNote?: string;
  contributedBy?: string; // Name of contributor
  contributorUrl?: string; // URL to contributor's profile/social
}

interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  url: string;
  type: string;
  postedDate?: string;
  description?: string;
  skills?: string[];
  contributedBy?: string; // Name of contributor
  contributorUrl?: string; // URL to contributor's profile/social
}

interface Reading {
  id?: string;
  title: string;
  author: string;
  source: string;
  type: string;
  url: string;
  image?: string;
  tags?: string[];
  description: string;
  contributedBy?: string; // Name of contributor
  contributorUrl?: string; // URL to contributor's profile/social
}

interface Contributor {
  id?: string;
  name: string;
  role: string;
  avatar?: string;
  github?: string;
  twitter?: string;
}

interface Submission {
  id?: string;
  name: string;
  email?: string;
  resource_url: string;
  category: string;
  description: string;
  created_at?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

type ContentItem = DesignSystem | Tool | Job | Reading | Contributor | Submission;

// Componente de estrella individual para efecto
function Star({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full animate-sparkle"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        background: Math.random() > 0.5 
          ? 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 70%)'
          : 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0) 70%)',
      }}
    />
  );
}

// Componente de efecto de estrellas
function StarsEffect() {
  const stars = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <Star key={star.id} delay={star.delay} x={star.x} y={star.y} />
      ))}
    </div>
  );
}

// Admin Sidebar Component
function AdminSidebar({ activeTab, onTabChange, onLogout, pendingSubmitsCount }: { activeTab: ContentType; onTabChange: (tab: ContentType) => void; onLogout: () => void; pendingSubmitsCount: number }) {
  const menuItems = [
    { id: "design-systems" as ContentType, label: "Systems", icon: FolderSparkleIcon },
    { id: "tools" as ContentType, label: "Tools", icon: PackageSparkleIcon },
    { id: "jobs" as ContentType, label: "Jobs", icon: ClipboardSparkleIcon },
    { id: "readings" as ContentType, label: "Readings", icon: BookSparkleIcon },
    { id: "contributors" as ContentType, label: "Team", icon: ChatSparkleIcon },
    { id: "submissions" as ContentType, label: "Submits", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-16 border-r border-gray-200/50 bg-white/80 backdrop-blur-md fixed h-screen z-20 flex-col" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        {/* Logo/Icon superior - clickeable para volver al sitio */}
        <button 
          onClick={() => window.location.href = '/'}
          className="h-12 flex items-center justify-center border-b border-gray-200/50 hover:bg-gray-50/50 transition-colors"
          title="Back to site"
        >
          <Logo />
        </button>
        
        {/* Menu items */}
        <nav className="flex-1 py-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const showBadge = item.id === 'submissions' && pendingSubmitsCount > 0;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onTabChange(item.id)}
                    className={`
                      w-full flex flex-col items-center gap-1 px-2 py-3 transition-all relative group
                      ${isActive 
                        ? "text-blue-600" 
                        : "text-gray-500 hover:text-gray-900"
                      }
                    `}
                    title={item.label}
                  >
                    {/* Efecto de estrellas para botón activo */}
                    {isActive && <StarsEffect />}
                    
                    {/* Badge for pending submissions */}
                    {showBadge && (
                      <div className="absolute -top-0.5 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-yellow-100 text-yellow-800 border border-yellow-200 text-[10px] font-bold rounded-full px-1 shadow-md z-10">
                        {pendingSubmitsCount}
                      </div>
                    )}
                    
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="text-[10px] font-medium" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Home button */}
        <div className="border-t border-gray-200/50 p-2">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full flex flex-col items-center gap-1 px-2 py-3 transition-all relative group text-gray-500 hover:text-blue-600"
            title="Back to site"
          >
            <Home className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[10px] font-medium" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Home</span>
          </button>
        </div>

        {/* Logout button - before CMS badge */}
        <div className="border-t border-gray-200/50 p-2">
          <button 
            onClick={onLogout}
            className="w-full flex flex-col items-center gap-1 px-2 py-3 transition-all relative group text-gray-500 hover:text-red-600"
            title="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span className="text-[10px] font-medium" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Logout</span>
          </button>
        </div>

        {/* CMS badge at bottom */}
        <div className="border-t border-gray-200/50 p-2">
          <div className="flex items-center justify-center">
            <span 
              className="text-[9px] px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200/40 text-purple-700 font-medium tracking-wide"
              style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            >
              CMS
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-gray-200/50 safe-area-inset-bottom overflow-x-auto">
        <div className="flex items-center justify-start min-w-max px-2 py-2 gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const showBadge = item.id === 'submissions' && pendingSubmitsCount > 0;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all relative flex-shrink-0
                  ${isActive 
                    ? "text-blue-600" 
                    : "text-gray-500 active:text-gray-900"
                  }
                `}
              >
                {isActive && <StarsEffect />}
                
                {/* Badge for pending submissions */}
                {showBadge && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-yellow-100 text-yellow-800 border border-yellow-200 text-[10px] font-bold rounded-full px-1 shadow-md z-10">
                    {pendingSubmitsCount}
                  </div>
                )}
                
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </button>
            );
          })}
          
          {/* Exit button for mobile */}
          <button
            onClick={() => window.location.href = '/'}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all relative text-gray-500 active:text-blue-600 flex-shrink-0"
            title="Exit to site"
          >
            <Home className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </nav>
    </>
  );
}

const tabConfig = {
  "design-systems": { label: "Design Systems", icon: FolderSparkleIcon },
  "tools": { label: "Tools", icon: PackageSparkleIcon },
  "jobs": { label: "Jobs", icon: ClipboardSparkleIcon },
  "readings": { label: "Readings", icon: BookSparkleIcon },
  "contributors": { label: "Team", icon: ChatSparkleIcon },
  "submissions": { label: "Submissions", icon: Mail },
};

// Character mapping for each section (matching frontend)
const characterMap: Record<ContentType, number> = {
  "design-systems": 1, // Alien azul
  "tools": 0,          // Robot verde
  "jobs": 2,           // Fantasma rosa
  "readings": 3,       // Gato naranja
  "contributors": 3,   // Gato naranja (Team también)
  "submissions": 0,    // Robot verde (submissions)
};

// Type badge colors for readings
const typeColors: Record<string, string> = {
  "Guide": "bg-orange-100 text-orange-800 border-orange-200",
  "Article": "bg-blue-100 text-blue-800 border-blue-200",
  "Book": "bg-purple-100 text-purple-800 border-purple-200",
  "Paper": "bg-green-100 text-green-800 border-green-200",
  "Video": "bg-pink-100 text-pink-800 border-pink-200",
  "Community": "bg-violet-100 text-violet-800 border-violet-200",
};

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<ContentType>("design-systems");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string>("");
  const [isUtilitiesMenuOpen, setIsUtilitiesMenuOpen] = useState(false);
  const [pendingSubmitsCount, setPendingSubmitsCount] = useState(0);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;
  const ADMIN_PASSWORD = "designsystems2024";
  const AUTH_TOKEN_KEY = "admin_auth_token";
  const AUTH_TOKEN_VALUE = "ds2024_auth_v1"; // Simple token

  // Check for existing session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (savedToken === AUTH_TOKEN_VALUE) {
      setIsAuthenticated(true);
    }
  }, []);

  // Load items when tab changes
  useEffect(() => {
    if (isAuthenticated) {
      loadItems();
      setSelectedItems(new Set()); // Clear selection when changing tabs
      setCurrentPage(1); // Reset to first page when changing tabs
      // Also load pending submits count
      loadPendingSubmitsCount();
    }
  }, [activeTab, isAuthenticated]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      // Save auth token to localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN_VALUE);
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  const loadItems = async () => {
    setIsLoading(true);
    try {
      // If loading submissions, first migrate from Supabase table to KV Store
      if (activeTab === 'submissions') {
        console.log('Syncing submissions from Supabase table to KV Store...');
        await fetch(`${API_URL}/submissions/migrate-from-table`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "X-Admin-Key": ADMIN_PASSWORD,
          },
        });
      }
      
      const response = await fetch(`${API_URL}/${activeTab}?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      console.log(`Loaded ${data.length} items for ${activeTab}:`, data);
      setItems(data);
    } catch (err) {
      console.error("Error loading items:", err);
    }
    setIsLoading(false);
  };

  const loadPendingSubmitsCount = async () => {
    try {
      // First migrate from Supabase table to KV Store
      console.log('Syncing submissions for count...');
      await fetch(`${API_URL}/submissions/migrate-from-table`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "X-Admin-Key": ADMIN_PASSWORD,
        },
      });
      
      const response = await fetch(`${API_URL}/submissions?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
        cache: 'no-store'
      });
      const data = await response.json();
      console.log('Submissions loaded for count:', data);
      console.log('Status breakdown:', data.map((s: Submission) => ({ id: s.id, name: s.name, status: s.status })));
      // Count only pending submissions
      const pendingCount = data.filter((sub: Submission) => sub.status === 'pending' || !sub.status).length;
      console.log('Pending count calculated:', pendingCount);
      setPendingSubmitsCount(pendingCount);
    } catch (err) {
      console.error("Error loading pending submits count:", err);
    }
  };

  const handleSave = async (item: ContentItem) => {
    setSaveStatus("saving");
    try {
      const isNew = !item.id;
      const url = isNew 
        ? `${API_URL}/${activeTab}`
        : `${API_URL}/${activeTab}/${item.id}`;
      
      console.log('handleSave - activeTab:', activeTab);
      console.log('handleSave - isNew:', isNew);
      console.log('handleSave - item.id:', item.id);
      console.log('handleSave - url:', url);
      
      // Transform isEditorsChoice to badge for design-systems
      let itemToSave = { ...item };
      if (activeTab === "design-systems") {
        const ds = item as DesignSystem;
        // Filter empty URLs and tags when saving
        const cleanedUrls = ds.additionalUrls?.filter(url => url && url.trim()) || [];
        const cleanedTags = ds.tags?.filter(tag => tag && tag.trim()) || [];
        itemToSave = {
          ...ds,
          additionalUrls: cleanedUrls,
          tags: cleanedTags.length > 0 ? cleanedTags : undefined,
          // Explicitly set badges to null if undefined to ensure it's sent to server
          badges: ds.badges !== undefined ? ds.badges : null
        };
        if (ds.isEditorsChoice) {
          itemToSave = {
            ...itemToSave,
            badge: "Recommended",
            badgeColor: "amber"
          };
        }
      }
      
      console.log('handleSave - itemToSave before stringify:', itemToSave);
      console.log('handleSave - itemToSave.badges:', itemToSave.badges);
      
      const response = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${publicAnonKey}`,
          "X-Admin-Key": ADMIN_PASSWORD,
        },
        body: JSON.stringify(itemToSave),
      });

      const responseData = await response.json();
      
      console.log('handleSave - response.ok:', response.ok);
      console.log('handleSave - responseData:', responseData);

      if (response.ok) {
        await loadItems();
        setEditingItem(null);
        setIsAdding(false);
        setSaveStatus("success");
        setTimeout(() => setSaveStatus(""), 3000);
        // Reload pending submits count if we're in submissions tab
        if (activeTab === 'submissions') {
          // Add a small delay to ensure KV Store is updated
          setTimeout(() => {
            loadPendingSubmitsCount();
          }, 500);
        }
      } else {
        console.error("Save failed:", responseData);
        setSaveStatus("error");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    } catch (err) {
      console.error("Error saving item:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`${API_URL}/${activeTab}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${publicAnonKey}`,
          "X-Admin-Key": ADMIN_PASSWORD,
        },
      });

      if (response.ok) {
        await loadItems();
        // Reload pending submits count if we're in submissions tab
        if (activeTab === 'submissions') {
          setTimeout(() => {
            loadPendingSubmitsCount();
          }, 500);
        }
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const getEmptyItem = (): ContentItem => {
    switch (activeTab) {
      case "design-systems":
        return { name: "", company: "", url: "", category: "component-library", additionalUrls: [], iconUrl: "" };
      case "tools":
        return { name: "", description: "", url: "", category: "AI Builders & Code Generation", domain: "", iconUrl: "", isPaid: false, price: "", isAuthorPick: false, authorNote: "" };
      case "jobs":
        return { title: "", company: "", location: "", url: "", type: "Full-time", postedDate: "", description: "", skills: [] };
      case "readings":
        return { title: "", author: "", source: "", type: "Article", url: "", description: "" };
      case "contributors":
        return { name: "", role: "" };
      case "submissions":
        return { name: "", email: "", resource_url: "", category: "Design System", description: "", status: "pending" };
      default:
        return {};
    }
  };

  const removeDuplicates = async () => {
    if (!confirm("This will remove duplicate readings based on title. Continue?")) return;

    setIsLoading(true);
    try {
      const readings = items as Reading[];
      const seen = new Map<string, Reading>();
      const toDelete: string[] = [];

      readings.forEach(reading => {
        const key = reading.title.toLowerCase().trim();
        if (seen.has(key)) {
          if (reading.id) {
            toDelete.push(reading.id);
          }
        } else {
          seen.set(key, reading);
        }
      });

      for (const id of toDelete) {
        await fetch(`${API_URL}/${activeTab}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "X-Admin-Key": ADMIN_PASSWORD,
          },
        });
      }

      alert(`Removed ${toDelete.length} duplicates`);
      await loadItems();
    } catch (err) {
      console.error("Error removing duplicates:", err);
      alert("Error removing duplicates");
    }
    setIsLoading(false);
  };

  const deleteAllReadings = async () => {
    if (!confirm("⚠️ WARNING: This will delete ALL readings. Are you absolutely sure?")) return;
    if (!confirm("This action cannot be undone. Type OK to confirm")) return;

    setIsLoading(true);
    try {
      const readings = items as Reading[];
      for (const reading of readings) {
        if (reading.id) {
          await fetch(`${API_URL}/${activeTab}/${reading.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
              "X-Admin-Key": ADMIN_PASSWORD,
            },
          });
        }
      }

      alert(`Deleted ${readings.length} readings`);
      await loadItems();
    } catch (err) {
      console.error("Error deleting all:", err);
      alert("Error deleting readings");
    }
    setIsLoading(false);
  };

  const filteredItems = items.filter((item: any) => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    const title = (item.name || item.title || "").toLowerCase();
    const subtitle = (item.company || item.author || item.role || item.email || "").toLowerCase();
    const description = (item.description || "").toLowerCase();
    const url = (item.resource_url || item.url || "").toLowerCase();
    return title.includes(search) || subtitle.includes(search) || description.includes(search) || url.includes(search);
  });

  // Pagination calculations
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const runDiagnostic = async () => {
    setIsDiagnosing(true);
    setDiagnosticResult(null);
    try {
      const response = await fetch(`${API_URL}/submissions/diagnose`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setDiagnosticResult(data);
      console.log("Diagnostic data:", data);
    } catch (err) {
      console.error("Error running diagnostic:", err);
      alert("Error running diagnostic");
    } finally {
      setIsDiagnosing(false);
    }
  };

  const runMigration = async () => {
    if (!confirm("¿Recuperar submissions de la tabla de Supabase al KV Store?")) return;
    
    setIsDiagnosing(true);
    try {
      const response = await fetch(`${API_URL}/submissions/migrate-from-table`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "X-Admin-Key": ADMIN_PASSWORD,
        },
      });
      const data = await response.json();
      console.log("Migration result:", data);
      
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else if (data.migrated > 0) {
        alert(`✅ Recuperados ${data.migrated} submissions exitosamente!`);
        await loadItems();
        setDiagnosticResult(null);
      } else {
        alert("No se encontraron submissions para migrar");
      }
    } catch (err) {
      console.error("Error running migration:", err);
      alert("Error al migrar submissions");
    } finally {
      setIsDiagnosing(false);
    }
  };



  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(paginatedItems.map((item: any) => item.id));
      setSelectedItems(allIds);
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedItems.size} selected items?`)) return;

    setIsLoading(true);
    try {
      for (const id of Array.from(selectedItems)) {
        await fetch(`${API_URL}/${activeTab}/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${publicAnonKey}`,
            "X-Admin-Key": ADMIN_PASSWORD,
          },
        });
      }

      setSelectedItems(new Set());
      await loadItems();
      // Reload pending submits count if we're in submissions tab
      if (activeTab === 'submissions') {
        setTimeout(() => {
          loadPendingSubmitsCount();
        }, 500);
      }
    } catch (err) {
      console.error("Error deleting selected items:", err);
      alert("Error deleting some items");
    }
    setIsLoading(false);
  };

  const allSelected = paginatedItems.length > 0 && paginatedItems.every((item: any) => selectedItems.has(item.id));

  // Migration function for Jobs
  const migrateJobs = async () => {
    const jobsToMigrate = [
      {
        title: "Senior Design Systems Engineer",
        company: "DevRev",
        location: "Remote",
        type: "Full-time",
        postedDate: "1 week ago",
        description: "Build and evolve our design system to empower product teams. Work on component libraries, design tokens, and developer experience.",
        url: "https://job-boards.greenhouse.io/devrev/jobs/5662226004",
        skills: ["Design Systems", "React", "TypeScript", "Figma"]
      },
      {
        title: "Design System Specialist",
        company: "DataAnnotation",
        location: "Remote",
        type: "Full-time",
        postedDate: "1 day ago",
        description: "Develop and maintain design system documentation and components. Collaborate with cross-functional teams to ensure consistency across products.",
        url: "https://www.linkedin.com/jobs/view/design-system-specialist-at-dataannotation-4338417624/?skipRedirect=true",
        skills: ["Design Systems", "Documentation", "UI/UX", "Collaboration"]
      },
      {
        title: "Director of Design (AI-First)",
        company: "Craft Worldwide",
        location: "Madrid, Spain",
        type: "Hybrid",
        postedDate: "3 days ago",
        description: "Lead the visual direction of a global healthcare account with an AI-first mindset. Build scalable design systems and integrate AI tools into creative workflows.",
        url: "https://www.linkedin.com/jobs/search/?currentJobId=4346692606",
        skills: ["Design Systems", "AI Tools", "Design Leadership", "Healthcare"]
      },
      {
        title: "Design System Engineer",
        company: "AlphaSense",
        location: "Remote",
        type: "Full-time",
        postedDate: "2 weeks ago",
        description: "Lead the development and maintenance of our design system. Collaborate with designers and engineers to create scalable UI components.",
        url: "https://job-boards.greenhouse.io/alphasense/jobs/8237491002",
        skills: ["Design Systems", "Frontend", "React", "Component Libraries"]
      },
      {
        title: "Design System Engineer EDL",
        company: "EDL",
        location: "Copenhagen, Denmark",
        type: "On-site",
        postedDate: "3 days ago",
        description: "Join our design system team to build and maintain a comprehensive component library and design guidelines for our products.",
        url: "https://www.linkedin.com/jobs/view/4348793843/",
        skills: ["Design Systems", "CSS", "JavaScript", "Design Tokens"]
      },
      {
        title: "Expert iOS Design System Engineer",
        company: "Roche",
        location: "Remote",
        type: "Full-time",
        postedDate: "1 week ago",
        description: "Design and implement iOS design system components for healthcare applications. Ensure consistency across mobile platforms.",
        url: "https://careers.roche.com/global/en/job/ROCHGLOBAL202505111726EXTERNALENGLOBAL/Expert-iOS-Design-System-Engineer-m-f-d",
        skills: ["iOS", "SwiftUI", "Design Systems", "Mobile"]
      },
      {
        title: "Design System Manager",
        company: "Lacoste",
        location: "Paris, France",
        type: "Full-time",
        postedDate: "5 days ago",
        description: "Lead the strategy and execution of Lacoste's design system. Manage a team and collaborate with design and engineering stakeholders.",
        url: "https://careers.lacoste.com/fr/annonce/4102035-design-system-manager-fm-75016-paris",
        skills: ["Design Systems", "Leadership", "Strategy", "Cross-functional"]
      },
      {
        title: "Senior Visual Designer - Design Systems",
        company: "Spotify",
        location: "Stockholm, Sweden / Remote",
        type: "Full-time",
        postedDate: "4 days ago",
        description: "Build and maintain Spotify's design system components. Work with teams across the organization to ensure design consistency.",
        url: "https://jobs.lever.co/spotify/f9da6d57-214f-4582-83db-c9609dbc5e4d",
        skills: ["Design Systems", "React", "Web Components", "Accessibility"]
      }
    ];

    if (!confirm(`This will add ${jobsToMigrate.length} jobs to the CMS. Continue?`)) {
      return;
    }

    setIsMigrating(true);
    setMigrationStatus("Migrating...");

    try {
      let count = 0;
      for (const job of jobsToMigrate) {
        setMigrationStatus(`Migrating job ${count + 1} of ${jobsToMigrate.length}...`);
        
        const response = await fetch(`${API_URL}/jobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(job),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Migration error response:", errorText);
          throw new Error(`Failed to migrate job: ${job.title}`);
        }

        count++;
      }

      setMigrationStatus(`✅ Migrated ${jobsToMigrate.length} jobs successfully!`);
      await loadItems();
      setTimeout(() => setMigrationStatus(""), 3000);
    } catch (error) {
      console.error("Migration error:", error);
      setMigrationStatus(`❌ Error: ${error}`);
      setTimeout(() => setMigrationStatus(""), 5000);
    } finally {
      setIsMigrating(false);
    }
  };

  // Migration function for Design Systems
  const migrateDesignSystems = async () => {
    const designSystemsToMigrate = [
      {
        name: "Lightning Design System",
        company: "Salesforce",
        url: "https://www.lightningdesignsystem.com/2e1ef8501/p/52a7c7-ai-and-slds-2",
        figmaKit: "https://www.figma.com/community/file/1478970084463860424/slds-2-pattern-agentic-experiences",
        additionalUrls: [
          "https://www.lightningdesignsystem.com/2e1ef8501/p/03c548-agentic-patterns",
          "https://www.salesforce.com/blog/design-ai-interfaces-accessibility/"
        ],
        description: "AI in accessibility",
        companyDomain: "salesforce.com",
        badge: "Recommended",
        badgeColor: "amber"
      },
      {
        name: "Fury Design System",
        company: "Mercado Libre",
        url: "https://medium.com/mercadolibre-tech/how-we-are-using-ai-in-mercado-libres-accessibility-team-e960b83283a9",
        description: "AI in accessibility",
        companyDomain: "mercadolibre.com",
        badge: "New",
        badgeColor: "green"
      },
      {
        name: "Apps SDK UI",
        company: "OpenAI",
        url: "https://developers.openai.com/apps-sdk",
        figmaKit: "https://www.figma.com/community/file/1560064615791108827/apps-in-chatgpt-components-templates",
        additionalUrls: [
          "https://openai.github.io/apps-sdk-ui/?path=/docs/overview-introduction--docs",
          "https://developers.openai.com/apps-sdk/concepts/ui-guidelines"
        ],
        companyDomain: "openai.com",
        badge: "New",
        badgeColor: "green"
      },
      {
        name: "Claude AI (unofficial)",
        company: "Anthropic",
        url: "https://geist.co/work/anthropic",
        figmaKit: "https://www.figma.com/community/file/1445575023384366559",
        companyDomain: "anthropic.com",
        badge: "New",
        badgeColor: "green"
      },
      {
        name: "Cloudscape Design System",
        company: "Amazon",
        url: "https://cloudscape.design/get-started/for-developers/ai-tools-support/",
        figmaKit: "https://www.figma.com/community/file/1585292872561164967/cds-component-library-2-0-3",
        companyDomain: "amazon.com"
      },
      {
        name: "Atlassian Design System",
        company: "Atlassian",
        url: "https://atlassian.design/patterns/ai-rovo#rovo-brand-and-ai-experiences",
        companyDomain: "atlassian.com",
        badge: "New",
        badgeColor: "green"
      },
      {
        name: "Ethos Design System",
        company: "GE HealthCare",
        url: "https://www.ethosdesignsystem.com/style-guides/artificial-intelligence",
        companyDomain: "gehealthcare.com"
      },
      {
        name: "Pajamas Design System",
        company: "GitLab",
        url: "https://design.gitlab.com/patterns/ai-human-interaction",
        additionalUrls: ["https://design.gitlab.com/patterns/duo-agents-and-flows"],
        companyDomain: "gitlab.com"
      },
      {
        name: "Carbon Design System",
        company: "IBM",
        url: "https://carbondesignsystem.com/guidelines/carbon-for-ai/",
        companyDomain: "ibm.com",
        badge: "Featured",
        badgeColor: "blue"
      },
      {
        name: "Ant Design X",
        company: "Ant Design",
        url: "https://x.ant.design/",
        figmaKit: "https://www.figma.com/community/file/1501193060829090060/ant-design-x-community-design-system-for-ai-products",
        companyDomain: "ant.design",
        customLogo: "antdesignx",
        badge: "New",
        badgeColor: "green"
      },
      {
        name: "Vibe Design System",
        company: "Monday",
        url: "https://vibe.monday.com/?path=/docs/mcp-new--docs",
        description: "MCP support",
        companyDomain: "monday.com"
      },
      {
        name: "Blade Design System",
        company: "Razorpay",
        url: "https://blade.razorpay.com/?path=/docs/guides-blade-mcp--docs",
        description: "MCP support",
        companyDomain: "razorpay.com"
      },
      {
        name: "Patternfly Design System",
        company: "Red Hat",
        url: "https://www.patternfly.org/patternfly-ai/principles-and-guidelines",
        companyDomain: "redhat.com",
        badge: "Recommended",
        badgeColor: "amber"
      },
      {
        name: "Canvas Design System",
        company: "Workday",
        url: "https://canvas.workday.com/guidelines/ai-guidance/ai-experience-guidelines",
        companyDomain: "workday.com"
      },
      {
        name: "ActiveCampaign Design System",
        company: "ActiveCampaign",
        url: "https://www.activecampaign.design/docs/patterns/ai",
        companyDomain: "activecampaign.com",
        badge: "New",
        badgeColor: "green"
      },
      {
        name: "Horizon Design System",
        company: "ServiceNow",
        url: "https://horizon.servicenow.com/getting-started/ai",
        additionalUrls: ["https://horizon.servicenow.com/guidelines/ai/having-a-vision-for-ai"],
        companyDomain: "servicenow.com"
      },
      {
        name: "Seeds Design System",
        company: "SproutSocial",
        url: "https://seeds.sproutsocial.com/components/mcp-server/",
        description: "MCP support",
        companyDomain: "sproutsocial.com"
      },
      {
        name: "Soul Design System",
        company: "Emplifi",
        url: "https://soul.emplifi.io/latest/patterns/patterns/ai-guidelines/patterns-oahsQIli",
        companyDomain: "emplifi.io"
      },
      {
        name: "Backbase Design System",
        company: "Backbase",
        url: "https://designsystem.backbase.com/latest/guides/beta-ui-ang-with-cursor-f9fdjG0s",
        companyDomain: "backbase.com"
      },
      {
        name: "Shadcn UI",
        company: "Shadcn",
        url: "https://ui.shadcn.com/docs/mcp",
        figmaKit: "https://shadcnstudio.com/figma",
        additionalUrls: ["https://shadcnstudio.com/mcp"],
        description: "MCP support",
        companyDomain: "shadcn.com"
      },
      {
        name: "Geist Design System",
        company: "Vercel",
        url: "https://vercel.com/design",
        companyDomain: "vercel.com",
        badge: "Featured",
        badgeColor: "purple"
      },
      {
        name: "Content Design System",
        company: "Intuit",
        url: "https://contentdesign.intuit.com/ai/",
        companyDomain: "intuit.com",
        badge: "New",
        badgeColor: "green"
      }
    ];

    if (!confirm(`This will add ${designSystemsToMigrate.length} Design Systems to the CMS. Continue?`)) {
      return;
    }

    setIsMigrating(true);
    setMigrationStatus("Migrating Design Systems...");

    try {
      let count = 0;
      for (const system of designSystemsToMigrate) {
        setMigrationStatus(`Migrating Design System ${count + 1} of ${designSystemsToMigrate.length}: ${system.name}...`);
        
        // Add default category if not present
        const systemWithCategory = {
          ...system,
          category: system.category || "ai-powered"
        };
        
        const response = await fetch(`${API_URL}/design-systems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
            "X-Admin-Key": ADMIN_PASSWORD,
          },
          body: JSON.stringify(systemWithCategory),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Migration error response:", errorText);
          throw new Error(`Failed to migrate Design System: ${system.name}`);
        }

        count++;
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to avoid overwhelming server
      }

      setMigrationStatus(`✅ Migrated ${designSystemsToMigrate.length} Design Systems successfully!`);
      await loadItems();
      setTimeout(() => setMigrationStatus(""), 3000);
    } catch (error) {
      console.error("Migration error:", error);
      setMigrationStatus(`❌ Error: ${error}`);
      setTimeout(() => setMigrationStatus(""), 5000);
    } finally {
      setIsMigrating(false);
    }
  };

  // Migration function for Tools
  const migrateTools = async () => {
    const toolsToMigrate = [
      // AI Builders & Code Generation
      { name: "v0", category: "AI Builders & Code Generation", description: "Vercel's AI-powered UI generator. Create components from text prompts with shadcn/ui.", url: "https://v0.dev", domain: "v0.dev", isPaid: true, price: "~€0–30/mo" },
      { name: "Lovable", category: "AI Builders & Code Generation", description: "Build full-stack web apps from natural language. AI-powered development platform.", url: "https://lovable.dev", domain: "lovable.dev", isPaid: true, price: "+€50/mo" },
      { name: "Bolt", category: "AI Builders & Code Generation", description: "StackBlitz's AI assistant for instant full-stack web development in the browser.", url: "https://bolt.new", domain: "bolt.new", isPaid: true, price: "~€0–30/mo" },
      { name: "Replit", category: "AI Builders & Code Generation", description: "Build software collaboratively with AI-powered code generation and deployment.", url: "https://replit.com", domain: "replit.com", isPaid: true, price: "~€0–35/mo" },
      { name: "Figr", category: "AI Builders & Code Generation", description: "AI-powered design to code platform for rapid prototyping and development.", url: "https://figr.design", domain: "figr.design", isPaid: true, price: "~€0–20/mo" },
      { name: "Figma Make", category: "AI Builders & Code Generation", description: "Figma's AI-powered web application builder. Turn designs into functional apps instantly.", url: "https://www.figma.com/make", domain: "figma.com", isPaid: true, price: "free / ~€12–45/mo" },
      { name: "Prototyper", category: "AI Builders & Code Generation", description: "Generate interactive prototypes and UI code from text descriptions.", url: "https://www.prototyper.co", domain: "prototyper.co", isPaid: true, price: "+€50/mo" },
      { name: "Flowstep", category: "AI Builders & Code Generation", description: "AI-powered workflow automation and app building platform.", url: "https://flowstep.ai", domain: "flowstep.ai", isPaid: true, price: "contact" },
      { name: "Reweb", category: "AI Builders & Code Generation", description: "Build websites with AI assistance. Generate layouts and components instantly.", url: "https://reweb.so", domain: "reweb.so", isPaid: true, price: "~€0–30/mo" },
      { name: "Paraflow", category: "AI Builders & Code Generation", description: "AI-powered visual development platform for building web applications.", url: "https://paraflow.com", domain: "paraflow.com", isPaid: true, price: "~€0–25/mo" },
      { name: "Composer", category: "AI Builders & Code Generation", description: "Visual AI workflow builder. Create multi-model pipelines by connecting nodes on a canvas.", url: "https://www.composer.design", domain: "composer.design", isPaid: true, price: "beta" },
      { name: "Orchids", category: "AI Builders & Code Generation", description: "Transform Figma designs into production-ready code with AI precision.", url: "https://www.orchids.app", domain: "orchids.app", isPaid: true, price: "~€30–50/mo" },
      // Design Systems Management
      { name: "Omlet", category: "Design Systems Management", description: "Track design system adoption across projects and identify improvement opportunities.", url: "https://www.omlet.dev", domain: "omlet.dev", isPaid: true, price: "+€50/mo" },
      { name: "Lyse", category: "Design Systems Management", description: "Automated design system documentation and component library management.", url: "https://www.getlyse.com", domain: "getlyse.com", isPaid: true, price: "+€50/mo" },
      { name: "Knapsack", category: "Design Systems Management", description: "Centralized platform for design system documentation, governance and collaboration.", url: "https://www.knapsack.cloud", domain: "knapsack.cloud", isPaid: true, price: "+€50/mo" },
      { name: "Paper", category: "Design Systems Management", description: "Design system workspace for teams to collaborate and maintain consistency.", url: "https://paper.design", domain: "paper.design", isPaid: true, price: "free / ~€0–20/mo" },
      { name: "Figma MCP Server", category: "Design Systems Management", description: "Model Context Protocol server for Figma. Connect AI assistants to your design files.", url: "https://www.figma.com/es-es/mcp-catalog/", domain: "figma.com", isPaid: false, price: "free" },
      { name: "Sketch MCP Server", category: "Design Systems Management", description: "Model Context Protocol server for Sketch. Integrate AI workflows with Sketch designs.", url: "https://www.sketch.com/docs/mcp-server/", domain: "sketch.com", isPaid: false, price: "free" },
      { name: "Penpot MCP Server", category: "Design Systems Management", description: "Model Context Protocol server for Penpot. Connect AI tools to open-source design platform.", url: "https://github.com/penpot/penpot-mcp", domain: "github.com", isPaid: false, price: "free" },
      { name: "Composio", category: "Design Systems Management", description: "Integration platform for AI agents. Connect design tools and automate workflows.", url: "https://composio.dev", domain: "composio.dev", isPaid: true, price: "free / ~€0–40/mo" },
      { name: "Storybook MCP Addon", category: "Design Systems Management", description: "Model Context Protocol addon for Storybook to enhance component documentation.", url: "https://storybook.js.org/addons/@storybook/addon-mcp", domain: "storybook.js.org", isPaid: false, price: "free" },
      { name: "Infa", category: "Design Systems Management", description: "New way of conducting Design System inventory and visualizing Design Systems in use.", url: "https://infa.ai/", domain: "infa.ai", isPaid: true, price: "~€0–80/mo" },
      { name: "UI UX Pro Max", category: "Design Systems Management", description: "Searchable database of UI styles, color palettes, font pairings, chart types, and UX guidelines. Build beautiful interfaces with AI-powered design recommendations.", url: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/", domain: "nextlevelbuilder.io", isPaid: false, price: "free", isAuthorPick: true, authorNote: "This is a hidden gem! A comprehensive searchable database that covers everything from color theory to chart types. Perfect for making informed design decisions quickly." },
      // Design to Code
      { name: "Plasmic", category: "Design to Code", description: "Visual builder that generates clean code. Design and develop simultaneously.", url: "https://www.plasmic.app", domain: "plasmic.app", isPaid: true, price: "free / ~€20–30/mo" },
      { name: "Builder.io", category: "Design to Code", description: "Visual development platform. Convert designs to code with drag-and-drop builder.", url: "https://www.builder.io/", domain: "builder.io", isPaid: true, price: "free / ~€0–25/mo" },
      { name: "Anima", category: "Design to Code", description: "Convert Figma, Adobe XD and Sketch designs to React, Vue, HTML code automatically.", url: "https://www.animaapp.com/", domain: "animaapp.com", isPaid: true, price: "free / ~€0–40/mo" },
      { name: "Locofy", category: "Design to Code", description: "Ship products faster by converting designs to production-ready frontend code.", url: "https://www.locofy.ai/", domain: "locofy.ai", isPaid: true, price: "pay as you go" },
      { name: "Stitch", category: "Design to Code", description: "Google's AI-powered tool that converts designs to production-ready code with design systems integration.", url: "https://stitch.withgoogle.com/", domain: "withgoogle.com", isPaid: false, price: "free" },
      { name: "Relume", category: "Design to Code", description: "AI-powered website builder and design system. Generate sitemaps and wireframes instantly from text prompts.", url: "https://www.relume.io/", domain: "relume.io", isPaid: true, price: "free / ~€0–40/mo" },
      // Design Generation & AI Tools
      { name: "Figma", category: "Design Generation & AI Tools", description: "Collaborative design platform with AI-powered features for design and prototyping.", url: "https://www.figma.com", domain: "figma.com", isPaid: true, price: "free / ~€12–45/mo" },
      { name: "Microsoft Designer", category: "Design Generation & AI Tools", description: "Microsoft's AI-powered graphic design tool for creating stunning visuals.", url: "https://designer.microsoft.com", domain: "microsoft.com", isPaid: true, price: "free / ~€0–10/mo" },
      { name: "Uizard Autodesigner", category: "Design Generation & AI Tools", description: "Generate multi-screen mockups instantly from text prompts with AI.", url: "https://uizard.io/autodesigner/", domain: "uizard.io", isPaid: true, price: "~€30–40/mo" },
      { name: "UX Pilot", category: "Design Generation & AI Tools", description: "AI assistant for UX design workflows, research and prototyping.", url: "https://uxpilot.ai", domain: "uxpilot.ai", isPaid: true, price: "~€0–30/mo" },
      { name: "Studio Designer", category: "Design Generation & AI Tools", description: "AI-powered design studio for creating professional visual content.", url: "https://studio.design", domain: "studio.design", isPaid: true, price: "free / ~€0–20/mo" },
      { name: "Designify", category: "Design Generation & AI Tools", description: "AI-powered background removal and image enhancement for designs.", url: "https://designify.com", domain: "designify.com", isPaid: true, price: "free / ~€20–40/mo" },
      { name: "Home Designs AI", category: "Design Generation & AI Tools", description: "AI-powered interior and exterior design generation tool.", url: "https://homedesigns.ai", domain: "homedesigns.ai", isPaid: true, price: "+€50/mo" },
      { name: "Refire Design", category: "Design Generation & AI Tools", description: "AI design assistant for creating and iterating visual content rapidly.", url: "https://refiredesign.com", domain: "refiredesign.com", isPaid: true, price: "contact" },
      { name: "Wonder", category: "Design Generation & AI Tools", description: "AI-powered creative workspace for visual content and design exploration.", url: "https://wonder.so", domain: "wonder.so", isPaid: true, price: "contact" },
      { name: "MagicPath", category: "Design Generation & AI Tools", description: "AI-powered platform for building interactive user journeys and product tours.", url: "https://magicpath.ai", domain: "magicpath.ai", isPaid: true, price: "free / ~€0–30/mo" },
      // Documentation
      { name: "Mintlify", category: "Documentation", description: "Beautiful documentation that converts users. AI-powered docs platform.", url: "https://www.mintlify.com", domain: "mintlify.com", isPaid: true, price: "+€50/mo" },
      { name: "zeroheight", category: "Documentation", description: "Design system documentation platform. Connect Figma and Storybook for living docs.", url: "https://zeroheight.com", domain: "zeroheight.com", isPaid: true, price: "~€0–49/mo" },
      { name: "Supernova", category: "Documentation", description: "Complete design system platform with documentation, code generation and collaboration.", url: "https://www.supernova.io", domain: "supernova.io", isPaid: true, price: "~€0–35/mo" },
      { name: "Docusaurus", category: "Documentation", description: "Open-source documentation framework powered by React. Easy to maintain and deploy.", url: "https://docusaurus.io/", domain: "docusaurus.io", isPaid: false, price: "free" },
      { name: "GitBook", category: "Documentation", description: "Modern documentation platform for technical teams. Beautiful docs with Git integration.", url: "https://www.gitbook.com/", domain: "gitbook.com", isPaid: true, price: "free / ~€0–65/mo" },
      { name: "Figmayo", category: "Documentation", description: "Transform Figma designs into interactive documentation and design system specs.", url: "https://www.figmayo.com/", domain: "figmayo.com", isPaid: true, price: "~€30/mo" },
      // Other Tools
      { name: "Khroma", category: "Other Tools", description: "AI-powered color palette generator. Discover, search, and save color combinations personalized to your preferences.", url: "https://www.khroma.co/", domain: "khroma.co", isPaid: false, price: "free" }
    ];

    if (!confirm(`This will add ${toolsToMigrate.length} Tools to the CMS. Continue?`)) {
      return;
    }

    setIsMigrating(true);
    setMigrationStatus("Migrating Tools...");

    try {
      let count = 0;
      for (const tool of toolsToMigrate) {
        setMigrationStatus(`Migrating Tool ${count + 1} of ${toolsToMigrate.length}: ${tool.name}...`);
        
        const response = await fetch(`${API_URL}/tools`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(tool),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Migration error response:", errorText);
          throw new Error(`Failed to migrate Tool: ${tool.name}`);
        }

        count++;
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      setMigrationStatus(`✅ Migrated ${toolsToMigrate.length} Tools successfully!`);
      await loadItems();
      setTimeout(() => setMigrationStatus(""), 3000);
    } catch (error) {
      console.error("Migration error:", error);
      setMigrationStatus(`❌ Error: ${error}`);
      setTimeout(() => setMigrationStatus(""), 5000);
    } finally {
      setIsMigrating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-panel flex min-h-screen relative overflow-x-hidden bg-white">
        {/* Fondo base */}
        <div className="fixed inset-0 z-0 bg-white" />
        
        {/* Shader fluido animado */}
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <FluidShader />
        </div>
        
        {/* Grid de puntos decorativo */}
        <div 
          className="fixed inset-0 z-[2]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* Login card */}
        <div className="relative z-10 flex items-center justify-center w-full min-h-screen p-6">
          <div className="w-full max-w-md">
            {/* Pixel Characters Row */}
            <div className="flex justify-center items-end gap-4 mb-12">
              <div className="animate-bounce" style={{ animationDelay: '0ms', animationDuration: '2s' }}>
                <div className="scale-125">
                  <svg viewBox="0 0 60 70" className="w-12 h-auto">
                    <rect x="10" y="0" width="10" height="10" fill="#2d5016"/>
                    <rect x="20" y="0" width="20" height="10" fill="#2d5016"/>
                    <rect x="40" y="0" width="10" height="10" fill="#2d5016"/>
                    <rect x="0" y="10" width="10" height="10" fill="#2d5016"/>
                    <rect x="10" y="10" width="40" height="30" fill="#5c8a3a"/>
                    <rect x="50" y="10" width="10" height="10" fill="#2d5016"/>
                    <rect x="15" y="15" width="8" height="8" fill="#fff"/>
                    <rect x="37" y="15" width="8" height="8" fill="#fff"/>
                    <rect x="20" y="25" width="20" height="5" fill="#2d5016"/>
                    <rect x="10" y="40" width="10" height="20" fill="#5c8a3a"/>
                    <rect x="40" y="40" width="10" height="20" fill="#5c8a3a"/>
                    <rect x="10" y="60" width="10" height="10" fill="#2d5016"/>
                    <rect x="40" y="60" width="10" height="10" fill="#2d5016"/>
                  </svg>
                </div>
              </div>
              <div className="animate-bounce" style={{ animationDelay: '200ms', animationDuration: '2s' }}>
                <div className="scale-125">
                  <svg viewBox="0 0 50 60" className="w-12 h-auto">
                    <rect x="10" y="0" width="30" height="10" fill="#1e3a8a"/>
                    <rect x="0" y="10" width="10" height="10" fill="#1e3a8a"/>
                    <rect x="10" y="10" width="30" height="20" fill="#3b82f6"/>
                    <rect x="40" y="10" width="10" height="10" fill="#1e3a8a"/>
                    <rect x="12" y="15" width="6" height="10" fill="#000"/>
                    <rect x="32" y="15" width="6" height="10" fill="#000"/>
                    <rect x="0" y="20" width="10" height="10" fill="#3b82f6"/>
                    <rect x="40" y="20" width="10" height="10" fill="#3b82f6"/>
                    <rect x="10" y="30" width="30" height="10" fill="#3b82f6"/>
                    <rect x="5" y="40" width="10" height="15" fill="#3b82f6"/>
                    <rect x="35" y="40" width="10" height="15" fill="#3b82f6"/>
                    <rect x="5" y="55" width="10" height="5" fill="#1e3a8a"/>
                    <rect x="35" y="55" width="10" height="5" fill="#1e3a8a"/>
                  </svg>
                </div>
              </div>
              <div className="animate-bounce" style={{ animationDelay: '400ms', animationDuration: '2s' }}>
                <div className="scale-125">
                  <svg viewBox="0 0 50 60" className="w-12 h-auto">
                    <rect x="10" y="0" width="30" height="10" fill="#ec4899"/>
                    <rect x="0" y="10" width="50" height="30" fill="#ec4899"/>
                    <rect x="10" y="15" width="8" height="8" fill="#fff"/>
                    <rect x="32" y="15" width="8" height="8" fill="#fff"/>
                    <rect x="13" y="18" width="3" height="3" fill="#000"/>
                    <rect x="35" y="18" width="3" height="3" fill="#000"/>
                    <rect x="0" y="40" width="10" height="10" fill="#ec4899"/>
                    <rect x="10" y="50" width="10" height="10" fill="#ec4899"/>
                    <rect x="20" y="40" width="10" height="10" fill="#ec4899"/>
                    <rect x="30" y="50" width="10" height="10" fill="#ec4899"/>
                    <rect x="40" y="40" width="10" height="10" fill="#ec4899"/>
                  </svg>
                </div>
              </div>
              <div className="animate-bounce" style={{ animationDelay: '600ms', animationDuration: '2s' }}>
                <div className="scale-125">
                  <svg viewBox="0 0 45 60" className="w-12 h-auto">
                    <rect x="5" y="0" width="35" height="10" fill="#fbbf24"/>
                    <rect x="0" y="10" width="45" height="25" fill="#fde047"/>
                    <rect x="8" y="15" width="10" height="8" fill="#fff"/>
                    <rect x="27" y="15" width="10" height="8" fill="#fff"/>
                    <rect x="11" y="17" width="4" height="4" fill="#000"/>
                    <rect x="30" y="17" width="4" height="4" fill="#000"/>
                    <rect x="10" y="26" width="25" height="6" fill="#dc2626"/>
                    <rect x="5" y="35" width="10" height="20" fill="#fde047"/>
                    <rect x="30" y="35" width="10" height="20" fill="#fde047"/>
                    <rect x="5" y="55" width="10" height="5" fill="#fbbf24"/>
                    <rect x="30" y="55" width="10" height="5" fill="#fbbf24"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card del formulario con glassmorphism */}
            <div 
              className="backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 32px rgba(147, 51, 234, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 hover:border-gray-300"
                      style={{ 
                        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)'
                      }}
                      autoFocus
                    />
                  </div>
                </div>
                
                {error && (
                  <div 
                    className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm animate-shake"
                    style={{ 
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                      boxShadow: '0 2px 4px rgba(220, 38, 38, 0.08)'
                    }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{error}</span>
                  </div>
                )}
                
                {/* Botón full width */}
                <button
                  type="submit"
                  className="w-full relative overflow-hidden px-6 py-3.5 bg-gradient-to-r from-purple-600 via-purple-600 to-blue-600 text-white rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0 group"
                  style={{ 
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    boxShadow: '0 4px 14px rgba(147, 51, 234, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Access CMS
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
              
              {/* Footer helper text */}
              <div className="mt-6 pt-6 border-t border-gray-200/50 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Your session will be saved</span>
                </div>
                <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                  You won't need to login again
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <CustomCursor />
      </div>
    );
  }

  return (
    <div className="admin-panel flex min-h-screen relative w-full overflow-x-hidden" style={{ backgroundColor: '#F5F7FA', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      {/* Fondo base */}
      <div className="fixed inset-0 z-0" style={{ backgroundColor: '#F5F7FA' }} />
      
      {/* Grid de puntos decorativo */}
      <div 
        className="fixed inset-0 z-[1]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Sidebar & Navigation */}
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} pendingSubmitsCount={pendingSubmitsCount} />
      
      {/* Main content area */}
      <main className="flex-1 md:ml-16 relative z-10 pb-16 md:pb-8">
        <div className="max-w-7xl mx-auto px-3 md:px-8 py-3 md:py-8">
          {/* Header */}
          <div className="mb-3 md:mb-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                {/* Avatar circular con personaje pixel */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <div className="scale-[0.35] md:scale-[0.42]">
                    <PixelCharacter characterIndex={characterMap[activeTab] || 0} />
                  </div>
                </div>
                <h1 className="text-lg md:text-2xl font-semibold text-gray-900">
                  {tabConfig[activeTab].label}
                  {(activeTab === 'design-systems' || activeTab === 'tools' || activeTab === 'readings' || activeTab === 'jobs' || activeTab === 'submissions') && items.length > 0 && (
                    <span className="text-gray-400 ml-2">({items.length})</span>
                  )}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                {/* Session active badge - only on desktop */}
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-medium">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Session active</span>
                </div>
                
                {/* Utilities Menu (Dropdown) */}
                <div className="relative">
                  <button
                    onClick={() => setIsUtilitiesMenuOpen(!isUtilitiesMenuOpen)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 transition-colors"
                    title="Utilities"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isUtilitiesMenuOpen && (
                    <>
                      {/* Backdrop to close menu */}
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUtilitiesMenuOpen(false)}
                      />
                      
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                        {/* Diagnose Button */}
                        <button
                          onClick={() => {
                            setIsUtilitiesMenuOpen(false);
                            window.location.href = '/diagnose';
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-left text-sm text-gray-700 transition-colors"
                        >
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-medium">Diagnose</div>
                            <div className="text-xs text-gray-500">View database contents</div>
                          </div>
                        </button>
                        
                        {/* Cleanup Button */}
                        <button
                          onClick={() => {
                            setIsUtilitiesMenuOpen(false);
                            window.location.href = '/cleanup';
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-left text-sm text-gray-700 transition-colors"
                        >
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-medium">Cleanup</div>
                            <div className="text-xs text-gray-500">Remove duplicates</div>
                          </div>
                        </button>
                        
                        {/* Conditional Migration Buttons */}
                        {activeTab === 'jobs' && items.length === 0 && !isMigrating && (
                          <>
                            <div className="h-px bg-gray-200 my-2" />
                            <button
                              onClick={() => {
                                setIsUtilitiesMenuOpen(false);
                                migrateJobs();
                              }}
                              disabled={isMigrating}
                              className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-left text-sm text-gray-700 transition-colors disabled:opacity-50"
                            >
                              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                              <div className="flex-1">
                                <div className="font-medium">Migrate Jobs</div>
                                <div className="text-xs text-gray-500">Import job listings</div>
                              </div>
                            </button>
                          </>
                        )}
                        
                        {activeTab === 'design-systems' && !isMigrating && (
                          <>
                            <div className="h-px bg-gray-200 my-2" />
                            <button
                              onClick={() => {
                                setIsUtilitiesMenuOpen(false);
                                migrateDesignSystems();
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-left text-sm text-gray-700 transition-colors"
                            >
                              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                              <div className="flex-1">
                                <div className="font-medium">Migrate Systems</div>
                                <div className="text-xs text-gray-500">Import design systems</div>
                              </div>
                            </button>
                          </>
                        )}
                        
                        {activeTab === 'tools' && items.length === 0 && !isMigrating && (
                          <>
                            <div className="h-px bg-gray-200 my-2" />
                            <button
                              onClick={() => {
                                setIsUtilitiesMenuOpen(false);
                                migrateTools();
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-left text-sm text-gray-700 transition-colors"
                            >
                              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                              <div className="flex-1">
                                <div className="font-medium">Migrate Tools</div>
                                <div className="text-xs text-gray-500">Import {60} AI tools</div>
                              </div>
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Delete selected button */}
                {selectedItems.size > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white transition-colors text-sm font-medium shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete ({selectedItems.size})</span>
                    <span className="sm:hidden">{selectedItems.size}</span>
                  </button>
                )}
                
                {/* Refresh button - Only for submissions */}
                {activeTab === 'submissions' && (
                  <button
                    onClick={() => {
                      setIsLoading(true);
                      loadItems();
                    }}
                    className="flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-colors text-sm font-medium shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                )}
                
                {/* Add button - Hidden for submissions */}
                {activeTab !== 'submissions' && (
                  <button
                    onClick={() => {
                      setIsAdding(true);
                      setEditingItem(getEmptyItem());
                    }}
                    className="flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-colors text-sm font-medium shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Migration Status Message */}
          {migrationStatus && (activeTab === 'jobs' || activeTab === 'design-systems') && (
            <div className={`mb-3 md:mb-4 p-3 rounded-lg text-sm font-medium ${
              migrationStatus.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' :
              migrationStatus.includes('❌') ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              {migrationStatus}
            </div>
          )}

          {/* Search bar */}
          <div className="mb-3 md:mb-4 flex flex-col gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 md:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-sm placeholder:text-gray-400"
                style={{
                  border: '1.5px solid transparent',
                  backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(236, 72, 153, 0.2) 100%)`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }}
              />
            </div>
          </div>

          {/* Items table */}
          <div 
            className="bg-white rounded-xl overflow-hidden"
            style={{
              border: '1.5px solid transparent',
              backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(168, 85, 247, 0.25) 50%, rgba(236, 72, 153, 0.25) 100%)`,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block w-10 h-10 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 text-sm font-medium">Loading...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-xl bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                  <Database className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm font-medium mb-4">
                  {searchQuery ? "No items match your search" : "No items yet"}
                </p>
                
                {/* Recovery button for submissions */}
                {activeTab === 'submissions' && !searchQuery && (
                  <div className="max-w-md mx-auto mt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="text-sm font-semibold text-blue-900 mb-2">
                        ¿Perdiste tus submissions?
                      </h4>
                      <p className="text-xs text-blue-700 mb-4">
                        Si tenías submissions antes y ya no aparecen, puedes intentar recuperarlas.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={runDiagnostic}
                          disabled={isDiagnosing}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-all"
                        >
                          {isDiagnosing ? "Checking..." : "Check data"}
                        </button>
                        <button
                          onClick={runMigration}
                          disabled={isDiagnosing}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-all"
                        >
                          {isDiagnosing ? "Recovering..." : "Recover submissions"}
                        </button>
                      </div>
                      
                      {/* Diagnostic result */}
                      {diagnosticResult && (
                        <div className="mt-4 bg-white border border-blue-200 rounded-lg p-4 text-left">
                          <p className="text-xs font-semibold text-gray-900 mb-2">Diagnostic result:</p>
                          <div className="space-y-1 text-xs text-gray-600">
                            <p><strong>KV Store:</strong> {diagnosticResult.kv?.count || 0} submissions</p>
                            <p><strong>Supabase table:</strong> {diagnosticResult.table?.count || 0} submissions</p>
                            {diagnosticResult.table?.error && (
                              <p className="text-red-600"><strong>Error:</strong> {diagnosticResult.table.error}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Table View - Solo pantallas grandes */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50">
                        <th className="px-6 py-3 text-left">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" checked={allSelected} onChange={(e) => handleSelectAll(e.target.checked)} />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {activeTab === 'design-systems' ? 'Name' : 
                           activeTab === 'tools' ? 'Tool' :
                           activeTab === 'jobs' ? 'Position' :
                           activeTab === 'readings' ? 'Title' : 'Name'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {activeTab === 'design-systems' ? 'Company' : 
                           activeTab === 'tools' ? 'Category' :
                           activeTab === 'jobs' ? 'Company' :
                           activeTab === 'readings' ? 'Author' :
                           activeTab === 'submissions' ? 'Email' : 'Role'}
                        </th>
                        {activeTab === 'readings' && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                        )}
                        {activeTab === 'jobs' && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        )}
                        {activeTab === 'submissions' && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {activeTab === 'readings' ? 'Type' : activeTab === 'submissions' ? 'Status' : 'Category'}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginatedItems.map((item: any) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" checked={selectedItems.has(item.id)} onChange={(e) => handleSelectItem(item.id, e.target.checked)} />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {/* Icon for Design Systems */}
                              {activeTab === 'design-systems' && (item.iconUrl || item.companyDomain) && (
                                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden border border-gray-200/60">
                                  <img 
                                    src={item.iconUrl || `https://www.google.com/s2/favicons?domain=${item.companyDomain}&sz=64`}
                                    alt={`${item.company} icon`}
                                    className="w-4 h-4 object-contain"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              {/* Icon for Tools */}
                              {activeTab === 'tools' && (item.iconUrl || item.domain) && (
                                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden border border-gray-200/60">
                                  <img 
                                    src={item.iconUrl || `https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
                                    alt={`${item.name} icon`}
                                    className="w-4 h-4 object-contain"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              <div className="text-sm font-medium text-gray-900">
                                {item.name || item.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600">
                              {activeTab === 'submissions' ? item.email || '-' : (item.company || item.category || item.author || item.role)}
                            </div>
                          </td>
                          {activeTab === 'readings' && (
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-600">{item.source}</div>
                            </td>
                          )}
                          {activeTab === 'jobs' && (
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-600">{item.location}</div>
                            </td>
                          )}
                          {activeTab === 'submissions' && (
                            <td className="px-6 py-4">
                              <a href={item.resource_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate block max-w-xs">
                                {item.resource_url}
                              </a>
                            </td>
                          )}
                          <td className="px-6 py-4">
                            {activeTab === 'design-systems' && (item.badges?.length > 0 || item.isEditorsChoice) ? (
                              <div className="flex flex-wrap gap-1.5">
                                {/* Show recommended badge if Editor's Choice */}
                                {item.isEditorsChoice && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-normal capitalize border bg-amber-100 text-amber-800 border-amber-200">
                                    recommended
                                  </span>
                                )}
                                {/* Show other badges */}
                                {item.badges?.map((badge: string, index: number) => {
                                  const getColorClasses = (badge: string) => {
                                    switch (badge.toLowerCase()) {
                                      case 'new': return 'bg-green-100 text-green-800 border-green-200';
                                      case 'ai-accessibility': return 'bg-orange-100 text-orange-800 border-orange-200';
                                      case 'mcp-support': return 'bg-purple-100 text-purple-800 border-purple-200';
                                      case 'tokens': return 'bg-blue-100 text-blue-800 border-blue-200';
                                      default: return 'bg-gray-100 text-gray-800 border-gray-200';
                                    }
                                  };
                                  const getBadgeDisplayText = (badge: string) => {
                                    switch (badge.toLowerCase()) {
                                      case 'new': return 'just added';
                                      case 'ai-accessibility': return 'ai in accessibility';
                                      case 'mcp-support': return 'mcp support';
                                      default: return badge;
                                    }
                                  };
                                  return (
                                    <span 
                                      key={index}
                                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-normal capitalize border ${getColorClasses(badge)}`}
                                    >
                                      {getBadgeDisplayText(badge)}
                                    </span>
                                  );
                                })}
                              </div>
                            ) : activeTab === 'tools' && (item.isAuthorPick || item.price) ? (
                              <div className="flex flex-wrap gap-1.5 items-center">
                                {item.isAuthorPick && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-normal capitalize border bg-amber-100 text-amber-800 border-amber-200">
                                    ⭐ Editor's choice
                                  </span>
                                )}
                                {item.price && (
                                  <span className="text-xs text-gray-600 font-medium">
                                    {item.price}
                                  </span>
                                )}
                              </div>
                            ) : activeTab === 'readings' && item.type ? (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                typeColors[item.type] || 'bg-blue-100 text-blue-800 border-blue-200'
                              }`}>
                                {item.type}
                              </span>
                            ) : activeTab === 'submissions' ? (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                item.status === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
                                item.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                                'bg-yellow-100 text-yellow-800 border-yellow-200'
                              }`}>
                                {item.status || 'pending'}
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => setEditingItem(item)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View - Hasta pantallas medianas */}
                <div className="lg:hidden divide-y divide-gray-100">
                  {paginatedItems.map((item: any) => (
                    <div key={item.id} className="p-3 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-start gap-2.5">
                        {/* Checkbox */}
                        <div className="pt-0.5 shrink-0">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-gray-300" 
                            checked={selectedItems.has(item.id)} 
                            onChange={(e) => handleSelectItem(item.id, e.target.checked)} 
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title with icon for design-systems and tools */}
                          <div className="flex items-center gap-2 mb-1">
                            {/* Icon for Design Systems */}
                            {activeTab === 'design-systems' && (item.iconUrl || item.companyDomain) && (
                              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden border border-gray-200/60">
                                <img 
                                  src={item.iconUrl || `https://www.google.com/s2/favicons?domain=${item.companyDomain}&sz=64`}
                                  alt={`${item.company} icon`}
                                  className="w-4 h-4 object-contain"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            {/* Icon for Tools */}
                            {activeTab === 'tools' && (item.iconUrl || item.domain) && (
                              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden border border-gray-200/60">
                                <img 
                                  src={item.iconUrl || `https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
                                  alt={`${item.name} icon`}
                                  className="w-4 h-4 object-contain"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {item.name || item.title}
                            </h3>
                          </div>
                          
                          {/* Subtitle info - compacto */}
                          <p className="text-xs text-gray-600 mb-2 truncate">
                            {item.company || item.author || item.role}
                          </p>
                          
                          {/* Badges - para design-systems y tools */}
                          {(activeTab === 'design-systems' && (item.badges?.length > 0 || item.isEditorsChoice)) && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {/* Show recommended badge if Editor's Choice */}
                              {item.isEditorsChoice && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-normal capitalize border bg-amber-100 text-amber-800 border-amber-200">
                                  recommended
                                </span>
                              )}
                              {/* Show other badges */}
                              {item.badges?.map((badge: string, index: number) => {
                                const getColorClasses = (badge: string) => {
                                  switch (badge.toLowerCase()) {
                                    case 'new': return 'bg-green-100 text-green-800 border-green-200';
                                    case 'ai-accessibility': return 'bg-orange-100 text-orange-800 border-orange-200';
                                    case 'mcp-support': return 'bg-purple-100 text-purple-800 border-purple-200';
                                    case 'tokens': return 'bg-blue-100 text-blue-800 border-blue-200';
                                    default: return 'bg-gray-100 text-gray-800 border-gray-200';
                                  }
                                };
                                const getBadgeDisplayText = (badge: string) => {
                                  switch (badge.toLowerCase()) {
                                    case 'new': return 'just added';
                                    case 'ai-accessibility': return 'ai in accessibility';
                                    case 'mcp-support': return 'mcp support';
                                    default: return badge;
                                  }
                                };
                                return (
                                  <span 
                                    key={index}
                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-normal capitalize border ${getColorClasses(badge)}`}
                                  >
                                    {getBadgeDisplayText(badge)}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                          
                          {/* Badge para Editor's Choice en Tools */}
                          {activeTab === 'tools' && item.isAuthorPick && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-normal capitalize border bg-amber-100 text-amber-800 border-amber-200">
                                ⭐ Editor's choice
                              </span>
                            </div>
                          )}
                          
                          {/* Actions - botones en móvil */}
                          {activeTab === 'submissions' && item.status === 'pending' ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApproveSubmission(item.id)}
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-green-600 bg-green-50 hover:bg-green-100 active:bg-green-200 rounded-lg text-xs font-medium transition-colors"
                              >
                                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleRejectSubmission(item.id)}
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded-lg text-xs font-medium transition-colors"
                              >
                                <X className="w-3.5 h-3.5 shrink-0" />
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingItem(item)}
                              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 rounded-lg text-xs font-medium transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5 shrink-0" />
                              <span>Edit</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Pagination Controls */}
          {!isLoading && filteredItems.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Show:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setItemsPerPage(10);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      itemsPerPage === 10
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    10
                  </button>
                  <button
                    onClick={() => {
                      setItemsPerPage(20);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      itemsPerPage === 20
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    20
                  </button>
                </div>
              </div>

              {/* Page info and navigation */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600">
                  {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
                </span>
                
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Page numbers - solo mostrar en desktop */}
                  <div className="hidden sm:flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit/Add Modal */}
      {(editingItem || isAdding) && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 admin-panel overflow-y-auto">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden my-auto"
            style={{
              border: '1.5px solid transparent',
              backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)`,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 bg-gray-50/50">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                {isAdding ? "Add" : "Edit"} {tabConfig[activeTab].label.toLowerCase().replace(/s$/, '')}
              </h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsAdding(false);
                }}
                className="p-1 hover:bg-gray-200 rounded transition-all"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="p-3 sm:p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 56px)' }}>
              <ItemForm
                item={editingItem!}
                type={activeTab}
                onSave={handleSave}
                onCancel={() => {
                  setEditingItem(null);
                  setIsAdding(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      <CustomCursor />
    </div>
  );
}

// Form component
function ItemForm({ item, type, onSave, onCancel }: {
  item: ContentItem;
  type: ContentType;
  onSave: (item: ContentItem) => void;
  onCancel: () => void;
}) {
  // Initialize form data with badge conversion for design-systems
  const initializeFormData = () => {
    if (type === "design-systems") {
      const ds = item as DesignSystem;
      return {
        ...ds,
        isEditorsChoice: ds.badge === "Recommended" || ds.isEditorsChoice
      };
    }
    return item;
  };
  
  const [formData, setFormData] = useState(initializeFormData());
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  // Reset form data when item changes
  useEffect(() => {
    setFormData(initializeFormData());
  }, [item.id]);

  // Load icon preview when item opens
  useEffect(() => {
    const itemData = item as any;
    if (itemData.iconUrl) {
      setIconPreview(itemData.iconUrl);
    } else {
      setIconPreview(null);
    }
  }, [item]);

  const handleChange = (field: string, value: any) => {
    console.log(`handleChange - field: ${field}, value:`, value);
    const updatedFormData = { ...formData, [field]: value };
    console.log('handleChange - updatedFormData:', updatedFormData);
    setFormData(updatedFormData);
  };

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setIconPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploadingIcon(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms/upload-image`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${publicAnonKey}`,
          "X-Admin-Key": "designsystems2024"
        },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      handleChange("iconUrl", data.url);
    } catch (error) {
      console.error("Icon upload error:", error);
      alert("Failed to upload icon. Please try again.");
      setIconPreview(null);
    } finally {
      setUploadingIcon(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploadingImage(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "X-Admin-Key": "designsystems2024",
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        handleChange("image", data.url);
      } else {
        alert("Error uploading image");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-200/80 rounded-lg mb-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white placeholder:text-gray-400";
  const textareaClass = "w-full px-3 py-2 border border-gray-200/80 rounded-lg mb-3 min-h-[80px] text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none bg-white placeholder:text-gray-400";

  const renderFields = () => {
    switch (type) {
      case "design-systems":
        const ds = formData as DesignSystem;
        return (
          <>
            <input type="text" placeholder="Name" value={ds.name || ""} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} />
            <input type="text" placeholder="Company" value={ds.company || ""} onChange={(e) => handleChange("company", e.target.value)} className={inputClass} />
            <input type="text" placeholder="Company Domain (e.g., salesforce.com)" value={ds.companyDomain || ""} onChange={(e) => handleChange("companyDomain", e.target.value)} className={inputClass} />
            
            {/* Custom Icon Upload */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Custom icon (optional) 
                <span className="text-gray-400 font-normal ml-1">- Upload if favicon API doesn't have it</span>
              </label>
              {(ds.iconUrl || iconPreview) && (
                <div className="mb-2 relative group w-fit">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden border border-gray-200">
                    <img 
                      src={iconPreview || ds.iconUrl} 
                      alt="Icon preview" 
                      className="w-8 h-8 object-contain" 
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => { 
                      handleChange("iconUrl", ""); 
                      setIconPreview(null); 
                    }} 
                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <label className="block">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleIconUpload} 
                  disabled={uploadingIcon} 
                  className="hidden" 
                />
                <div className="w-full px-3 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all bg-white/50">
                  {uploadingIcon ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-600">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">Upload icon</span>
                    </div>
                  )}
                </div>
              </label>
            </div>
            
            <input type="url" placeholder="URL" value={ds.url || ""} onChange={(e) => handleChange("url", e.target.value)} className={inputClass} />
            
            {/* Figma UI kit input with icon */}
            <div className="relative mb-3">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Figma className="w-4 h-4 text-purple-500" />
              </div>
              <input 
                type="url" 
                placeholder="Figma UI kit link (optional)" 
                value={ds.figmaKit || ""} 
                onChange={(e) => handleChange("figmaKit", e.target.value)} 
                className="w-full pl-10 pr-3 py-2 border border-gray-200/80 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Additional URLs field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Additional resources (one URL per line)</label>
              <textarea 
                placeholder="https://example.com/resource-1&#10;https://example.com/resource-2&#10;https://example.com/resource-3"
                value={ds.additionalUrls?.join("\n") || ""} 
                onChange={(e) => {
                  // Split by newlines and trim each URL, but keep the array structure
                  const urls = e.target.value.split("\n").map(url => url.trim());
                  handleChange("additionalUrls", urls);
                }}
                onKeyDown={(e) => {
                  // Allow Enter key for new lines in textarea
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                  }
                }}
                className={textareaClass}
                rows={4}
              />
            </div>
            
            {/* Badges field - Predefined checkboxes */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-2">Badges</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50/50 transition-all cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={ds.badges?.includes('new') || false} 
                    onChange={(e) => {
                      const currentBadges = ds.badges || [];
                      const newBadges = e.target.checked 
                        ? [...currentBadges, 'new']
                        : currentBadges.filter(b => b !== 'new');
                      handleChange("badges", newBadges.length > 0 ? newBadges : undefined);
                    }}
                    className="w-4 h-4 rounded" 
                  />
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-normal capitalize text-green-700 bg-green-100 border border-green-200">just added</span>
                </label>
                
                <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50/50 transition-all cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={ds.badges?.includes('ai-accessibility') || false} 
                    onChange={(e) => {
                      const currentBadges = ds.badges || [];
                      const newBadges = e.target.checked 
                        ? [...currentBadges, 'ai-accessibility']
                        : currentBadges.filter(b => b !== 'ai-accessibility');
                      handleChange("badges", newBadges.length > 0 ? newBadges : null);
                    }}
                    className="w-4 h-4 rounded" 
                  />
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-normal capitalize text-amber-700 bg-amber-100 border border-amber-200">ai in accessibility</span>
                </label>
                
                <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50/50 transition-all cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={ds.badges?.includes('mcp-support') || false} 
                    onChange={(e) => {
                      const currentBadges = ds.badges || [];
                      const newBadges = e.target.checked 
                        ? [...currentBadges, 'mcp-support']
                        : currentBadges.filter(b => b !== 'mcp-support');
                      handleChange("badges", newBadges.length > 0 ? newBadges : null);
                    }}
                    className="w-4 h-4 rounded" 
                  />
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-normal capitalize text-purple-700 bg-purple-100 border border-purple-200">mcp support</span>
                </label>
                
                <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50/50 transition-all cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={ds.badges?.includes('tokens') || false} 
                    onChange={(e) => {
                      const currentBadges = ds.badges || [];
                      const newBadges = e.target.checked 
                        ? [...currentBadges, 'tokens']
                        : currentBadges.filter(b => b !== 'tokens');
                      handleChange("badges", newBadges.length > 0 ? newBadges : null);
                    }}
                    className="w-4 h-4 rounded" 
                  />
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-normal capitalize text-blue-700 bg-blue-100 border border-blue-200">tokens</span>
                </label>
              </div>
            </div>
            
            <label className="flex items-center gap-2 mb-4 p-3 rounded-xl hover:bg-gray-50/50 transition-all cursor-pointer">
              <input type="checkbox" checked={ds.isEditorsChoice || false} onChange={(e) => handleChange("isEditorsChoice", e.target.checked)} className="w-4 h-4 rounded" />
              <span className="flex items-center gap-2">
                Editor's choice ⭐
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-normal capitalize text-teal-700 bg-teal-100 border border-teal-200">recommended</span>
              </span>
            </label>
            
            {/* Contributor field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Contributed by (optional) 
                <span className="text-gray-400 font-normal ml-1">- Name of community contributor</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g., Sarah Johnson" 
                value={ds.contributedBy || ""} 
                onChange={(e) => handleChange("contributedBy", e.target.value)} 
                className={inputClass}
              />
            </div>
            
            {/* Contributor URL field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Contributor URL (optional) 
                <span className="text-gray-400 font-normal ml-1">- Social profile or website</span>
              </label>
              <input 
                type="url" 
                placeholder="https://twitter.com/username or https://linkedin.com/in/username" 
                value={ds.contributorUrl || ""} 
                onChange={(e) => handleChange("contributorUrl", e.target.value)} 
                className={inputClass}
              />
            </div>
          </>
        );
      
      case "tools":
        const tool = formData as Tool;
        return (
          <>
            <input type="text" placeholder="Name" value={tool.name || ""} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} />
            <textarea placeholder="Description" value={tool.description || ""} onChange={(e) => handleChange("description", e.target.value)} className={textareaClass} />
            <input type="url" placeholder="URL" value={tool.url || ""} onChange={(e) => handleChange("url", e.target.value)} className={inputClass} />
            
            {/* Domain field for icon */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Domain (for icon)</label>
              <input 
                type="text" 
                placeholder="example.com" 
                value={tool.domain || ""} 
                onChange={(e) => handleChange("domain", e.target.value)} 
                className={inputClass}
              />
              <p className="text-[10px] text-gray-500 mt-1">Used to fetch favicon automatically (e.g., "figma.com")</p>
            </div>
            
            {/* Custom Icon Upload */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Custom icon (optional) 
                <span className="text-gray-400 font-normal ml-1">- Upload if favicon API doesn't have it</span>
              </label>
              {(tool.iconUrl || iconPreview) && (
                <div className="mb-2 relative group w-fit">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden border border-gray-200">
                    <img 
                      src={iconPreview || tool.iconUrl} 
                      alt="Icon preview" 
                      className="w-8 h-8 object-contain" 
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => { 
                      handleChange("iconUrl", ""); 
                      setIconPreview(null); 
                    }} 
                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <label className="block">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleIconUpload} 
                  disabled={uploadingIcon} 
                  className="hidden" 
                />
                <div className="w-full px-3 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all bg-white/50">
                  {uploadingIcon ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-600">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">Upload icon</span>
                    </div>
                  )}
                </div>
              </label>
            </div>
            
            {/* Category dropdown */}
            <select value={tool.category || "AI Builders & Code Generation"} onChange={(e) => handleChange("category", e.target.value)} className={inputClass}>
              <option value="AI Builders & Code Generation">AI Builders & Code Generation</option>
              <option value="Design Systems Management">Design Systems Management</option>
              <option value="Design to Code">Design to Code</option>
              <option value="Design Generation & AI Tools">Design Generation & AI Tools</option>
              <option value="Documentation">Documentation</option>
              <option value="AI Connectors, Agents, MCPs & Skills">AI Connectors, Agents, MCPs & Skills</option>
              <option value="Other Tools">Other Tools</option>
            </select>
            
            {/* Pricing section */}
            <div className="mb-3">
              <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50/50 transition-all cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={tool.isPaid || false} 
                  onChange={(e) => handleChange("isPaid", e.target.checked)} 
                  className="w-4 h-4 rounded" 
                />
                <span className="text-xs font-medium text-gray-700">Is Paid Tool</span>
              </label>
            </div>
            
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Price</label>
              <input 
                type="text" 
                placeholder="e.g., free, ~€0–30/mo, +€50/mo, contact" 
                value={tool.price || ""} 
                onChange={(e) => handleChange("price", e.target.value)} 
                className={inputClass}
              />
              <p className="text-[10px] text-gray-500 mt-1">Format examples: "free", "~€0–30/mo", "+€50/mo", "free / ~€12–45/mo", "contact"</p>
            </div>
            
            {/* Editor's Choice section */}
            <div className="mb-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
              <label className="flex items-center gap-2 mb-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={tool.isAuthorPick || false} 
                  onChange={(e) => handleChange("isAuthorPick", e.target.checked)} 
                  className="w-4 h-4 rounded" 
                />
                <span className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                  ⭐ Editor's Choice
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-normal text-amber-700 bg-amber-100 border border-amber-200">January</span>
                </span>
              </label>
              
              {tool.isAuthorPick && (
                <div>
                  <label className="block text-xs font-medium text-amber-800 mb-1.5">Personal note from editor</label>
                  <textarea 
                    placeholder="Share why you recommend this tool..." 
                    value={tool.authorNote || ""} 
                    onChange={(e) => handleChange("authorNote", e.target.value)} 
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none bg-white placeholder:text-amber-400 min-h-[80px]"
                    rows={3}
                  />
                  <p className="text-[10px] text-amber-600 mt-1 italic">This note will appear when users hover over the tool card</p>
                </div>
              )}
            </div>
            
            {/* Contributor field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Contributed by (optional) 
                <span className="text-gray-400 font-normal ml-1">- Name of community contributor</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g., María García" 
                value={tool.contributedBy || ""} 
                onChange={(e) => handleChange("contributedBy", e.target.value)} 
                className={inputClass}
              />
            </div>
            
            {/* Contributor URL field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Contributor URL (optional) 
                <span className="text-gray-400 font-normal ml-1">- Social profile or website</span>
              </label>
              <input 
                type="url" 
                placeholder="https://twitter.com/username or https://linkedin.com/in/username" 
                value={tool.contributorUrl || ""} 
                onChange={(e) => handleChange("contributorUrl", e.target.value)} 
                className={inputClass}
              />
            </div>
          </>
        );
      
      case "jobs":
        const job = formData as Job;
        return (
          <>
            <input type="text" placeholder="Job title" value={job.title || ""} onChange={(e) => handleChange("title", e.target.value)} className={inputClass} />
            <input type="text" placeholder="Company" value={job.company || ""} onChange={(e) => handleChange("company", e.target.value)} className={inputClass} />
            <input type="text" placeholder="Location" value={job.location || ""} onChange={(e) => handleChange("location", e.target.value)} className={inputClass} />
            <input type="url" placeholder="URL" value={job.url || ""} onChange={(e) => handleChange("url", e.target.value)} className={inputClass} />
            <select value={job.type || "Full-time"} onChange={(e) => handleChange("type", e.target.value)} className={inputClass}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
            <input type="text" placeholder="Posted date (e.g. 1 week ago)" value={job.postedDate || ""} onChange={(e) => handleChange("postedDate", e.target.value)} className={inputClass} />
            <textarea placeholder="Description" value={job.description || ""} onChange={(e) => handleChange("description", e.target.value)} className={textareaClass} />
            <input type="text" placeholder="Skills (comma separated)" value={job.skills?.join(", ") || ""} onChange={(e) => handleChange("skills", e.target.value.split(",").map(t => t.trim()).filter(t => t))} className={inputClass} />
            
            {/* Contributor field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Contributed by (optional) 
                <span className="text-gray-400 font-normal ml-1">- Name of community contributor</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g., Alex Chen" 
                value={job.contributedBy || ""} 
                onChange={(e) => handleChange("contributedBy", e.target.value)} 
                className={inputClass}
              />
            </div>
            
            {/* Contributor URL field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Contributor URL (optional) 
                <span className="text-gray-400 font-normal ml-1">- Social profile or website</span>
              </label>
              <input 
                type="url" 
                placeholder="https://twitter.com/username or https://linkedin.com/in/username" 
                value={job.contributorUrl || ""} 
                onChange={(e) => handleChange("contributorUrl", e.target.value)} 
                className={inputClass}
              />
            </div>
          </>
        );
      
      case "readings":
        const reading = formData as Reading;
        return (
          <>
            <input type="text" placeholder="Title" value={reading.title || ""} onChange={(e) => handleChange("title", e.target.value)} className={inputClass} />
            <input type="text" placeholder="Author" value={reading.author || ""} onChange={(e) => handleChange("author", e.target.value)} className={inputClass} />
            <input type="text" placeholder="Source (e.g. Medium, UX Collective)" value={reading.source || ""} onChange={(e) => handleChange("source", e.target.value)} className={inputClass} />
            
            {/* Type selector with color preview */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select value={reading.type || "Article"} onChange={(e) => handleChange("type", e.target.value)} className={inputClass}>
                <option value="Article">📘 Article</option>
                <option value="Guide">🧭 Guide</option>
                <option value="Book">📚 Book</option>
                <option value="Paper">📄 Paper</option>
                <option value="Video">🎥 Video</option>
                <option value="Community">👥 Community</option>
              </select>
              {/* Color preview badge */}
              {reading.type && (
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColors[reading.type] || 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                    {reading.type}
                  </span>
                </div>
              )}
            </div>
            
            <input type="url" placeholder="URL" value={reading.url || ""} onChange={(e) => handleChange("url", e.target.value)} className={inputClass} />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              {(reading.image || imagePreview) && (
                <div className="mb-3 relative group">
                  <img src={imagePreview || reading.image} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-gray-200" />
                  <button type="button" onClick={() => { handleChange("image", ""); setImagePreview(null); }} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <label className="block mb-2">
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" />
                <div className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50/50 transition-all bg-white/50">
                  {uploadingImage ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                      <span className="text-gray-600">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="text-gray-600">Click to upload image</span>
                      <span className="text-xs text-gray-400">or drag and drop</span>
                    </div>
                  )}
                </div>
              </label>
              <input type="url" placeholder="Or paste image URL" value={reading.image || ""} onChange={(e) => handleChange("image", e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50" />
            </div>
            
            <input type="text" placeholder="Tags (comma separated)" value={reading.tags?.join(", ") || ""} onChange={(e) => handleChange("tags", e.target.value.split(",").map(t => t.trim()).filter(t => t))} className={inputClass} />
            <textarea placeholder="Description" value={reading.description || ""} onChange={(e) => handleChange("description", e.target.value)} className={textareaClass} />
            
            {/* Contributor field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Contributed by (optional) 
                <span className="text-gray-400 font-normal ml-1">- Name of community contributor</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g., Jordan Smith" 
                value={reading.contributedBy || ""} 
                onChange={(e) => handleChange("contributedBy", e.target.value)} 
                className={inputClass}
              />
            </div>
            
            {/* Contributor URL field */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Contributor URL (optional) 
                <span className="text-gray-400 font-normal ml-1">- Social profile or website</span>
              </label>
              <input 
                type="url" 
                placeholder="https://twitter.com/username or https://linkedin.com/in/username" 
                value={reading.contributorUrl || ""} 
                onChange={(e) => handleChange("contributorUrl", e.target.value)} 
                className={inputClass}
              />
            </div>
          </>
        );
      
      case "contributors":
        const contributor = formData as Contributor;
        return (
          <>
            <input type="text" placeholder="Name" value={contributor.name || ""} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} />
            <input type="text" placeholder="Role" value={contributor.role || ""} onChange={(e) => handleChange("role", e.target.value)} className={inputClass} />
            <input type="url" placeholder="Avatar URL (optional)" value={contributor.avatar || ""} onChange={(e) => handleChange("avatar", e.target.value)} className={inputClass} />
            <input type="text" placeholder="GitHub username (optional)" value={contributor.github || ""} onChange={(e) => handleChange("github", e.target.value)} className={inputClass} />
            <input type="text" placeholder="Twitter handle (optional)" value={contributor.twitter || ""} onChange={(e) => handleChange("twitter", e.target.value)} className={inputClass} />
          </>
        );
      
      case "submissions":
        const submission = formData as Submission;
        return (
          <>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-sm text-blue-800" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                <strong>Note:</strong> Submissions are created by users via the public form. You can only view, update status, or delete them here.
              </p>
            </div>
            <input type="text" placeholder="Name" value={submission.name || ""} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} readOnly />
            <input type="email" placeholder="Email (optional)" value={submission.email || ""} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} readOnly />
            <input type="url" placeholder="Social Profile (optional)" value={submission.social_url || ""} onChange={(e) => handleChange("social_url", e.target.value)} className={inputClass} readOnly />
            <input type="url" placeholder="Resource URL" value={submission.resource_url || ""} onChange={(e) => handleChange("resource_url", e.target.value)} className={inputClass} readOnly />
            <select value={submission.category || "Design System"} onChange={(e) => handleChange("category", e.target.value)} className={inputClass} disabled>
              <option>Design System</option>
              <option>Tool</option>
              <option>Job</option>
              <option>Reading</option>
            </select>
            <textarea placeholder="Description" value={submission.description || ""} onChange={(e) => handleChange("description", e.target.value)} className={textareaClass} readOnly />
            
            {/* Status selector - This is editable */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Status
              </label>
              <select 
                value={submission.status || "pending"} 
                onChange={(e) => handleChange("status", e.target.value)} 
                className={inputClass}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            {submission.created_at && (
              <div className="text-xs text-gray-500" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Submitted: {new Date(submission.created_at).toLocaleString()}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div>
      {renderFields()}
      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => {
            console.log('Save button clicked - formData to save:', JSON.stringify(formData, null, 2));
            onSave(formData);
          }}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-xs font-medium"
        >
          Save
        </button>
        <button 
          onClick={onCancel} 
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all text-xs font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}