import { Layers, Package, BookOpen, Info, Users, History, Menu, X, Settings, Palette, Box } from "lucide-react";
import { Logo } from "./Logo";
import { useState } from "react";
import { FolderSparkleIcon } from "./icons/FolderSparkleIcon";
import { PackageSparkleIcon } from "./icons/PackageSparkleIcon";
import { ClipboardSparkleIcon } from "./icons/ClipboardSparkleIcon";
import { BookSparkleIcon } from "./icons/BookSparkleIcon";
import { RefreshSparkleIcon } from "./icons/RefreshSparkleIcon";
import { ChatSparkleIcon } from "./icons/ChatSparkleIcon";
import { HomeSparkleIcon } from "./icons/HomeSparkleIcon";

// Control de visibilidad del botón CMS - cambiar a true para mostrar
const SHOW_CMS_BUTTON = false;

type Section = "home" | "design-systems" | "tools" | "jobs" | "readings" | "changelog" | "about" | "contributors";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  isAdminMode?: boolean; // Nueva prop para saber si está en modo admin
}

// Componente de estrella individual
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

export function Sidebar({ activeSection, onSectionChange, isAdminMode = false }: SidebarProps) {
  const menuItems = [
    { id: "design-systems" as Section, label: "Systems", icon: FolderSparkleIcon },
    { id: "tools" as Section, label: "Tools", icon: PackageSparkleIcon },
    { id: "jobs" as Section, label: "Jobs", icon: ClipboardSparkleIcon },
    { id: "readings" as Section, label: "Readings", icon: BookSparkleIcon },
    { id: "contributors" as Section, label: "Team", icon: ChatSparkleIcon },
  ];

  const aboutItem = { id: "about" as Section, label: "README", icon: Info };
  const changelogItem = { id: "changelog" as Section, label: "Changelog", icon: RefreshSparkleIcon };
  
  // Solo para mobile - items principales sin Changelog ni README
  const mobileMenuItems = [
    { id: "design-systems" as Section, label: "Systems", icon: FolderSparkleIcon },
    { id: "tools" as Section, label: "Tools", icon: PackageSparkleIcon },
    { id: "readings" as Section, label: "Readings", icon: BookSparkleIcon },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {/* Desktop Sidebar - Vertical en la izquierda */}
      <aside className="hidden md:flex w-16 border-r border-gray-200/50 bg-white/80 backdrop-blur-md fixed h-screen z-20 flex-col" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        {/* Logo/Icon superior - ahora clickeable para ir a home */}
        <button 
          onClick={() => onSectionChange("home")}
          className="h-12 flex items-center justify-center border-b border-gray-200/50 hover:bg-gray-50/50 transition-colors"
          title="Home"
        >
          <Logo />
        </button>
        
        {/* Menu items */}
        <nav className="flex-1 py-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
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
                    
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="text-[10px] font-medium" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* About button - alineado abajo */}
        <div className="border-t border-gray-200/50 space-y-0">
          {/* Version badge */}
          <div className="px-2 py-2 flex items-center justify-center">
            <span 
              className="text-[9px] px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200/40 text-purple-700 font-medium tracking-wide"
              style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            >
              v2.2
            </span>
          </div>
          
          <button
            onClick={() => onSectionChange(changelogItem.id)}
            className={`
              w-full flex flex-col items-center gap-1 px-2 py-3 transition-all relative group
              ${activeSection === changelogItem.id 
                ? "text-blue-600" 
                : "text-gray-500 hover:text-gray-900"
              }
            `}
            title={changelogItem.label}
          >
            {/* Efecto de estrellas para botón activo */}
            {activeSection === changelogItem.id && <StarsEffect />}
            
            <RefreshSparkleIcon className="w-5 h-5" />
            <span className="text-[8px] font-medium text-center leading-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Changelog
            </span>
          </button>
          
          <button
            onClick={() => onSectionChange(aboutItem.id)}
            className={`
              w-full flex flex-col items-center gap-1 px-2 py-3 transition-all relative group
              ${activeSection === aboutItem.id 
                ? "text-blue-600" 
                : "text-gray-500 hover:text-gray-900"
              }
            `}
            title={aboutItem.label}
          >
            {/* Efecto de estrellas para botón activo */}
            {activeSection === aboutItem.id && <StarsEffect />}
            
            <Info className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[9px] font-medium text-center leading-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              {aboutItem.label.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </span>
          </button>
          
          {/* Design System Showcase Link */}
          {SHOW_CMS_BUTTON && (
            <a
              href="/design-system-showcase"
              className="w-full flex flex-col items-center gap-1 px-2 py-3 transition-all relative group text-gray-500 hover:text-blue-600"
              title="Design System"
            >
              <Palette className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[8px] font-medium text-center leading-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Design<br/>System
              </span>
            </a>
          )}
          
          {/* Admin CMS Link - OCULTO TEMPORALMENTE */}
          {SHOW_CMS_BUTTON && (
            <a
              href="/admin"
              className="w-full flex flex-col items-center gap-1 px-2 py-3 transition-all relative group text-gray-500 hover:text-purple-600"
              title="Admin CMS"
            >
              <Settings className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[9px] font-medium text-center leading-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                CMS
              </span>
            </a>
          )}
          
          {/* Components UI Library Link - REMOVIDO del frontend público */}
          {/* El acceso es solo vía URL directa /components */}
        </div>
      </aside>

      {/* Mobile Navigation - Barra horizontal inferior */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200/50 overflow-hidden" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        {/* Degradado animado de fondo */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 8s ease infinite',
          }}
        />
        
        {/* Capa de backdrop blur */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />
        
        {/* Contenido del menú */}
        <div className="relative flex items-center justify-around px-4 py-3">
          {/* Home button en mobile con estilo pill */}
          <button
            onClick={() => onSectionChange("home")}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-500 ease-in-out
              ${activeSection === "home" 
                ? "bg-purple-100 text-purple-700 scale-100" 
                : "text-gray-600 hover:text-gray-900 scale-95"
              }
            `}
            aria-label="Home"
          >
            <HomeSparkleIcon className="w-5 h-5 transition-all duration-500" strokeWidth={2} />
            {activeSection === "home" && (
              <span className="font-semibold text-sm animate-fadeIn" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Home</span>
            )}
          </button>
          
          {mobileMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-500 ease-in-out
                  ${isActive 
                    ? "bg-purple-100 text-purple-700 scale-100" 
                    : "text-gray-600 hover:text-gray-900 scale-95"
                  }
                `}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 transition-all duration-500" strokeWidth={2} />
                {isActive && (
                  <span className="font-semibold text-sm animate-fadeIn" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>{item.label}</span>
                )}
              </button>
            );
          })}
          
          {/* Botón de más opciones en mobile con estilo pill */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-500 ease-in-out
              ${(activeSection === "jobs" || activeSection === "changelog" || activeSection === "about" || activeSection === "contributors")
                ? "bg-purple-100 text-purple-700 scale-100" 
                : "text-gray-600 hover:text-gray-900 scale-95"
              }
            `}
            aria-label="More"
          >
            <Menu className="w-5 h-5 transition-all duration-500" strokeWidth={2} />
            {(activeSection === "jobs" || activeSection === "changelog" || activeSection === "about" || activeSection === "contributors") && (
              <span className="font-semibold text-sm animate-fadeIn" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>More</span>
            )}
          </button>
        </div>
      </nav>
      
      {/* Modal de opciones adicionales para mobile */}
      {isMenuOpen && (
        <div 
          className={`md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm ${
            isClosing ? 'animate-[fadeOutBackdrop_0.3s_ease-out_forwards]' : 'animate-[fadeInBackdrop_0.3s_ease-out_forwards]'
          }`}
          onClick={() => handleCloseMenu()}
        >
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl ${
              isClosing ? 'animate-[slideDownSheet_0.3s_cubic-bezier(0.4,0,1,1)_forwards]' : 'animate-[slideUpSheet_0.3s_cubic-bezier(0,0,0.2,1)_forwards]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              <h3 className="font-semibold text-gray-900">More options</h3>
              <button
                onClick={() => handleCloseMenu()}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Opciones del modal */}
            <div className="p-4 pb-6">
              <button
                onClick={() => {
                  onSectionChange("jobs");
                  handleCloseMenu();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${activeSection === "jobs"
                    ? "bg-purple-50 text-purple-700"
                    : "hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                <ClipboardSparkleIcon className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Jobs</div>
                  <div className="text-xs text-gray-500 mt-0.5">Design Systems positions</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  onSectionChange("changelog");
                  handleCloseMenu();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2
                  ${activeSection === "changelog"
                    ? "bg-purple-50 text-purple-700"
                    : "hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                <RefreshSparkleIcon className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Changelog</div>
                  <div className="text-xs text-gray-500 mt-0.5">View updates and changes</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  onSectionChange("about");
                  handleCloseMenu();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2
                  ${activeSection === "about"
                    ? "bg-purple-50 text-purple-700"
                    : "hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                <Info className="w-5 h-5" strokeWidth={1.5} />
                <div className="flex-1 text-left">
                  <div className="font-medium">README</div>
                  <div className="text-xs text-gray-500 mt-0.5">About this project</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  onSectionChange("contributors");
                  handleCloseMenu();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2
                  ${activeSection === "contributors"
                    ? "bg-purple-50 text-purple-700"
                    : "hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                <ChatSparkleIcon className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Team</div>
                  <div className="text-xs text-gray-500 mt-0.5">Community contributors list</div>
                </div>
              </button>
              
              {/* Design System Showcase Link */}
              {SHOW_CMS_BUTTON && (
                <a
                  href="/design-system-showcase"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2 hover:bg-blue-50 text-gray-700"
                >
                  <Palette className="w-5 h-5" strokeWidth={1.5} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">Design System</div>
                    <div className="text-xs text-gray-500 mt-0.5">Foundations and components showcase</div>
                  </div>
                </a>
              )}
              
              {/* Admin CMS Link in mobile - OCULTO TEMPORALMENTE */}
              {SHOW_CMS_BUTTON && (
                <a
                  href="/admin"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-2 hover:bg-purple-50 text-gray-700"
                >
                  <Settings className="w-5 h-5" strokeWidth={1.5} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">Admin CMS</div>
                    <div className="text-xs text-gray-500 mt-0.5">Content management system</div>
                  </div>
                </a>
              )}
              
              {/* Components UI Library Link - REMOVIDO del frontend público */}
              {/* El acceso es solo vía URL directa /components */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}