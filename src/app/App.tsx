import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { FloatingToolbar } from "./components/FloatingToolbar";
import { Rulers } from "./components/Rulers";
import { HomeSection } from "./components/HomeSection";
import { DesignSystemsSection } from "./components/DesignSystemsSection";
import { ToolsSection } from "./components/ToolsSection";
import { JobsSection } from "./components/JobsSection";
import { ReadingsSection } from "./components/ReadingsSection";
import { ChangelogSection } from "./components/ChangelogSection";
import { AboutSection } from "./components/AboutSection";
import { ContributorsSection } from "./components/ContributorsSection";
import { FluidShader } from "./components/FluidShader";
import { PageTransition } from "./components/PageTransition";
import { MachineView } from "./components/MachineView";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { RetroBackground } from "./components/RetroBackground";
import { Admin } from "./components/Admin";
import { MigrateReadings } from "./components/MigrateReadings";
import { MigrateJobs } from "./components/MigrateJobs";
import { MigrateContributors } from "./components/MigrateContributors";
import { MigrateTools } from "./components/MigrateTools";
import { CleanupDuplicates } from "./components/CleanupDuplicates";
import { DiagnoseCMS } from "./components/DiagnoseCMS";
import { SubmissionsDiagnose } from "./components/SubmissionsDiagnose";
import { DesignSystemShowcase } from "./components/DesignSystemShowcase";
import { ComponentsShowcase } from "./components/ComponentsShowcase";
import { UpdateLightning } from "./components/UpdateLightning";
import { QuickTestContributor } from "./components/QuickTestContributor";
import { AuditShowcase } from "./components/AuditShowcase";

type Section = "home" | "design-systems" | "tools" | "jobs" | "readings" | "changelog" | "about" | "contributors";

function App() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [machineMode, setMachineMode] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showMigrate, setShowMigrate] = useState(false);
  const [showMigrateJobs, setShowMigrateJobs] = useState(false);
  const [showMigrateContributors, setShowMigrateContributors] = useState(false);
  const [showMigrateTools, setShowMigrateTools] = useState(false);
  const [showCleanup, setShowCleanup] = useState(false);
  const [showDiagnose, setShowDiagnose] = useState(false);
  const [showSubmissionsDiagnose, setShowSubmissionsDiagnose] = useState(false);
  const [showDesignSystemShowcase, setShowDesignSystemShowcase] = useState(false);
  const [showComponentsShowcase, setShowComponentsShowcase] = useState(false);
  const [showUpdateLightning, setShowUpdateLightning] = useState(false);
  const [showQuickTest, setShowQuickTest] = useState(false);
  const [showAuditShowcase, setShowAuditShowcase] = useState(false);
  
  // Detectar si estamos en modo admin (cualquier página de CMS)
  const isAdminMode = showAdmin || showMigrate || showMigrateJobs || showMigrateContributors || 
                      showMigrateTools || showCleanup || showDiagnose || showSubmissionsDiagnose ||
                      showDesignSystemShowcase || showComponentsShowcase || showUpdateLightning || showQuickTest || showAuditShowcase;

  // Check for admin mode or migrate mode via URL
  useEffect(() => {
    const checkSpecialModes = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      const pathname = window.location.pathname;
      
      // Check for admin mode
      if (hash === '#admin' || search.includes('admin') || pathname.includes('/admin')) {
        setShowAdmin(true);
      }
      
      // Check for migrate mode (readings)
      if (hash === '#migrate' || search.includes('migrate') || pathname.includes('/migrate')) {
        setShowMigrate(true);
      }
      
      // Check for migrate-jobs mode
      if (hash === '#migrate-jobs' || search.includes('migrate-jobs') || pathname.includes('/migrate-jobs')) {
        setShowMigrateJobs(true);
      }
      
      // Check for migrate-contributors mode
      if (hash === '#migrate-contributors' || search.includes('migrate-contributors') || pathname.includes('/migrate-contributors')) {
        setShowMigrateContributors(true);
      }
      
      // Check for migrate-tools mode
      if (hash === '#migrate-tools' || search.includes('migrate-tools') || pathname.includes('/migrate-tools')) {
        setShowMigrateTools(true);
      }
      
      // Check for cleanup mode
      if (hash === '#cleanup' || search.includes('cleanup') || pathname.includes('/cleanup')) {
        setShowCleanup(true);
      }
      
      // Check for diagnose mode
      if (hash === '#diagnose' || search.includes('diagnose') || pathname.includes('/diagnose')) {
        setShowDiagnose(true);
      }
      
      // Check for submissions diagnose mode
      if (hash === '#submissions-diagnose' || search.includes('submissions-diagnose') || pathname.includes('/submissions-diagnose')) {
        setShowSubmissionsDiagnose(true);
      }
      
      // Check for design system showcase mode
      if (hash === '#design-system-showcase' || search.includes('design-system-showcase') || pathname.includes('/design-system-showcase')) {
        setShowDesignSystemShowcase(true);
      }
      
      // Check for components showcase mode
      if (hash === '#components-showcase' || search.includes('components-showcase') || pathname.includes('/components-showcase') || pathname === '/components') {
        setShowComponentsShowcase(true);
      }
      
      // Check for update lightning mode
      if (hash === '#update-lightning' || search.includes('update-lightning') || pathname.includes('/update-lightning')) {
        setShowUpdateLightning(true);
      }
      
      // Check for quick test mode
      if (hash === '#quick-test' || search.includes('quick-test') || pathname.includes('/quick-test')) {
        setShowQuickTest(true);
      }
      
      if (hash === '#audit' || search.includes('audit') || pathname.includes('/audit') || pathname.includes('/audit-showcase')) {
        setShowAuditShowcase(true);
      }
    };
    
    checkSpecialModes();
    window.addEventListener('hashchange', checkSpecialModes);
    
    return () => window.removeEventListener('hashchange', checkSpecialModes);
  }, []);

  // Scroll to top cuando cambia la sección - múltiples intentos para asegurar
  useEffect(() => {
    if (!isAdminMode) {
      // Intento 1: Inmediato
      window.scrollTo(0, 0);
      
      // Intento 2: En el siguiente frame
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
      
      // Intento 3: Después de 100ms (durante fade-out de PageTransition)
      const timer1 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      
      // Intento 4: Después de 450ms (cuando PageTransition cambia contenido)
      const timer2 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 450);
      
      // Intento 5: Después de 500ms (durante fade-in de PageTransition)
      const timer3 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [activeSection, isAdminMode]);

  // If admin mode, show admin panel
  if (showAdmin) {
    return <Admin />;
  }

  // If migrate mode, show migrate panel
  if (showMigrate) {
    return <MigrateReadings />;
  }
  
  // If migrate jobs mode, show migrate jobs panel
  if (showMigrateJobs) {
    return <MigrateJobs />;
  }
  
  // If migrate contributors mode, show migrate contributors panel
  if (showMigrateContributors) {
    return <MigrateContributors />;
  }
  
  // If migrate tools mode, show migrate tools panel
  if (showMigrateTools) {
    return <MigrateTools />;
  }
  
  // If cleanup mode, show cleanup panel
  if (showCleanup) {
    return <CleanupDuplicates />;
  }
  
  // If diagnose mode, show diagnose panel
  if (showDiagnose) {
    return <DiagnoseCMS />;
  }
  
  // If submissions diagnose mode, show submissions diagnose panel
  if (showSubmissionsDiagnose) {
    return <SubmissionsDiagnose />;
  }
  
  // If design system showcase mode, show design system showcase panel
  if (showDesignSystemShowcase) {
    return <DesignSystemShowcase />;
  }
  
  // If components showcase mode, show components showcase panel
  if (showComponentsShowcase) {
    return <ComponentsShowcase onBack={() => {
      setShowComponentsShowcase(false);
      window.history.pushState({}, '', '/');
    }} />;
  }

  // If update lightning mode, show update lightning panel
  if (showUpdateLightning) {
    return <UpdateLightning />;
  }

  // If quick test mode, show quick test panel
  if (showQuickTest) {
    return <QuickTestContributor />;
  }

  // If audit showcase mode, show audit showcase panel
  if (showAuditShowcase) {
    return <AuditShowcase onBack={() => {
      setShowAuditShowcase(false);
      window.history.pushState({}, '', '/');
    }} />;
  }

  return (
    <div className="flex min-h-screen relative overflow-x-hidden bg-white">
      {/* Fondo base - condicional según modo */}
      <div className={`fixed inset-0 z-0 transition-colors duration-500 ${
        machineMode ? 'bg-black' : 'bg-white'
      }`} />
      
      {/* Retro Background - solo en home y modo human */}
      {!machineMode && activeSection === "home" && <RetroBackground />}
      
      {/* Shader fluido animado - solo en modo human */}
      {!machineMode && (
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <FluidShader />
        </div>
      )}
      
      {/* Grid de puntos decorativo - condicional según modo */}
      <div 
        className="fixed inset-0 z-[2]"
        style={{
          backgroundImage: machineMode 
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Sidebar - oculto en modo machine */}
      {!machineMode && (
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />
      )}
      
      {/* Rulers - ocultos en modo machine */}
      {!machineMode && (
        <div className="hidden md:block">
          <Rulers />
        </div>
      )}
      
      <main className={`flex-1 relative z-10 transition-all duration-500 ${ 
        machineMode 
          ? 'ml-0 pb-0 text-white font-mono' 
          : 'ml-0 md:ml-16 pb-24 md:pb-20'
      }`}>
        <div className={`mx-auto py-4 md:py-12 transition-all duration-500 ${ 
          machineMode 
            ? 'max-w-2xl px-8' 
            : 'max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16'
        }`}>
          {machineMode ? (
            <MachineView activeSection={activeSection} />
          ) : (
            <PageTransition sectionKey={activeSection}>
              {activeSection === "home" && <HomeSection onSectionChange={setActiveSection} />}
              {activeSection === "design-systems" && <DesignSystemsSection />}
              {activeSection === "tools" && <ToolsSection />}
              {activeSection === "jobs" && <JobsSection />}
              {activeSection === "readings" && <ReadingsSection />}
              {activeSection === "changelog" && <ChangelogSection />}
              {activeSection === "about" && <AboutSection />}
              {activeSection === "contributors" && <ContributorsSection />}
            </PageTransition>
          )}
        </div>
      </main>

      <FloatingToolbar 
        machineMode={machineMode}
        onMachineModeToggle={() => setMachineMode(!machineMode)}
      />
      
      <Footer 
        machineMode={machineMode} 
        onChangelogClick={() => setActiveSection("changelog")}
      />
      <CustomCursor />
    </div>
  );
}

export default App;