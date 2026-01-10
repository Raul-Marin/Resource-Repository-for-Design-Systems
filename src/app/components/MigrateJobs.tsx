import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

// Data from the current JobsSection.tsx
const jobs = [
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

export function MigrateJobs() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string>("");
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [existingJobs, setExistingJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;

  // Check existing jobs on load
  useEffect(() => {
    const checkExistingJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/jobs`, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setExistingJobs(data);
        }
      } catch (err) {
        console.error("Error loading existing jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingJobs();
  }, []);

  const migrateJobs = async () => {
    setIsMigrating(true);
    setMigrationStatus("Starting migration...");

    try {
      // Migrate each job
      let count = 0;
      for (const job of jobs) {
        setMigrationStatus(`Migrating job ${count + 1} of ${jobs.length}: ${job.title}...`);
        
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
          throw new Error(`Failed to migrate job: ${job.title} - ${errorText}`);
        }

        count++;
      }

      setMigrationStatus(`✅ Migration complete! Migrated ${jobs.length} jobs.`);
      setMigrationComplete(true);
      
      // Reload existing jobs
      const response = await fetch(`${API_URL}/jobs`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setExistingJobs(data);
      }
    } catch (error) {
      console.error("Migration error:", error);
      setMigrationStatus(`❌ Error during migration: ${error}`);
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8" style={{ backgroundColor: '#f0ede8' }}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200/50 shadow-sm">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Migrate Jobs to CMS
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              This will migrate {jobs.length} job listings from hardcoded data to the CMS database.
            </p>
          </div>

          {/* Existing Jobs Status */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Current CMS Status
            </h3>
            {isLoading ? (
              <p className="text-sm text-blue-700">Loading...</p>
            ) : (
              <p className="text-sm text-blue-700" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                {existingJobs.length === 0 
                  ? "✨ No jobs in CMS yet. Ready to migrate!"
                  : `📊 ${existingJobs.length} jobs currently in CMS`}
              </p>
            )}
          </div>

          {/* Migration Button */}
          {!migrationComplete ? (
            <button
              onClick={migrateJobs}
              disabled={isMigrating}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
              style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            >
              {isMigrating ? "Migrating..." : "Start Migration"}
            </button>
          ) : (
            <div className="space-y-3">
              <a
                href="/admin"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                Go to CMS Admin
              </a>
              <a
                href="/"
                className="inline-block ml-3 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
                style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
              >
                View Jobs Page
              </a>
            </div>
          )}

          {/* Migration Status */}
          {migrationStatus && (
            <div className={`mt-6 p-4 rounded-lg ${migrationComplete ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`${migrationComplete ? 'text-green-800' : 'text-blue-800'} font-medium`} style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                {migrationStatus}
              </p>
              {migrationComplete && (
                <p className="text-green-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                  Ahora puedes ir a /admin y ver todos los jobs en el CMS.
                </p>
              )}
            </div>
          )}

          {/* Jobs to Migrate */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Jobs a migrar ({jobs.length}):
            </h2>
            <ul className="space-y-2 text-sm text-gray-600 max-h-96 overflow-y-auto">
              {jobs.map((job, index) => (
                <li key={index} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded">
                  <span className="text-blue-600 mt-1">•</span>
                  <div className="flex-1">
                    <strong className="text-gray-900">{job.title}</strong>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {job.company} • {job.location} • {job.type}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Back Link */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <a 
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            >
              ← Back to home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
