import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

// Initial team/contributors data
const contributors = [
  {
    name: "Sarah Johnson",
    role: "Design Systems Lead",
    github: "sarahjohnson",
    twitter: "sarahjohnson"
  },
  {
    name: "Alex Chen",
    role: "Frontend Engineer",
    github: "alexchen",
  },
  {
    name: "Maria García",
    role: "UX Designer",
    twitter: "mariagarcia"
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    github: "jameswilson",
    twitter: "jameswilson"
  },
  {
    name: "Emily Brown",
    role: "Content Strategist",
  },
  {
    name: "David Kim",
    role: "Developer Advocate",
    github: "davidkim",
    twitter: "davidkim"
  }
];

export function MigrateContributors() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string>("");
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [existingContributors, setExistingContributors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;

  // Check existing contributors on load
  useEffect(() => {
    const checkExistingContributors = async () => {
      try {
        const response = await fetch(`${API_URL}/contributors`, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setExistingContributors(data);
          if (data.length > 0) {
            setMigrationComplete(true);
            setMigrationStatus(`Found ${data.length} existing contributors in the database.`);
          }
        }
      } catch (err) {
        console.error("Error checking existing contributors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingContributors();
  }, []);

  const handleMigrate = async () => {
    setIsMigrating(true);
    setMigrationStatus("Starting migration...");

    try {
      let successCount = 0;
      let errorCount = 0;

      for (const contributor of contributors) {
        try {
          setMigrationStatus(`Migrating: ${contributor.name}...`);
          
          const response = await fetch(`${API_URL}/contributors`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${publicAnonKey}`,
              "X-Admin-Key": "designsystems2024",
            },
            body: JSON.stringify(contributor),
          });

          if (response.ok) {
            successCount++;
            setMigrationStatus(`✓ Migrated: ${contributor.name} (${successCount}/${contributors.length})`);
          } else {
            errorCount++;
            const errorData = await response.json();
            console.error(`Failed to migrate ${contributor.name}:`, errorData);
          }
          
          // Small delay to avoid overwhelming the server
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (err) {
          errorCount++;
          console.error(`Error migrating ${contributor.name}:`, err);
        }
      }

      setMigrationStatus(
        `Migration complete! ✨\n${successCount} contributors migrated successfully${errorCount > 0 ? `, ${errorCount} errors` : ''}`
      );
      setMigrationComplete(true);

      // Reload to show migrated contributors
      const response = await fetch(`${API_URL}/contributors`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setExistingContributors(data);
      }

    } catch (err) {
      console.error("Migration error:", err);
      setMigrationStatus(`Migration failed: ${err}`);
    } finally {
      setIsMigrating(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm(`Are you sure you want to delete all ${existingContributors.length} contributors? This cannot be undone.`)) {
      return;
    }

    setIsMigrating(true);
    setMigrationStatus("Clearing all contributors...");

    try {
      let deletedCount = 0;

      for (const contributor of existingContributors) {
        try {
          const response = await fetch(`${API_URL}/contributors/${contributor.id}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${publicAnonKey}`,
              "X-Admin-Key": "designsystems2024",
            },
          });

          if (response.ok) {
            deletedCount++;
            setMigrationStatus(`Deleted ${deletedCount}/${existingContributors.length} contributors...`);
          }
          
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (err) {
          console.error(`Error deleting contributor ${contributor.id}:`, err);
        }
      }

      setMigrationStatus(`Cleared ${deletedCount} contributors`);
      setExistingContributors([]);
      setMigrationComplete(false);

    } catch (err) {
      console.error("Clear error:", err);
      setMigrationStatus(`Clear failed: ${err}`);
    } finally {
      setIsMigrating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)] mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-family-body)' }}>Checking database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[var(--border-radius-lg)] border border-[var(--color-border)] p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-family-heading)', color: 'var(--color-text-primary)' }}>
              Migrate contributors to CMS
            </h1>
            <p className="text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-family-body)' }}>
              This tool will migrate {contributors.length} contributors to the CMS database.
            </p>
          </div>

          {/* Existing Contributors Info */}
          {existingContributors.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-[var(--border-radius-md)]">
              <h3 className="font-semibold text-blue-900 mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
                Existing contributors: {existingContributors.length}
              </h3>
              <div className="space-y-1 text-sm text-blue-800 max-h-40 overflow-y-auto" style={{ fontFamily: 'var(--font-family-body)' }}>
                {existingContributors.map((contributor, index) => (
                  <div key={index}>• {contributor.name} - {contributor.role}</div>
                ))}
              </div>
            </div>
          )}

          {/* Contributors to Migrate */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-family-heading)', color: 'var(--color-text-primary)' }}>
              Contributors to migrate:
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto p-4 bg-[var(--color-surface)] rounded-[var(--border-radius-md)]">
              {contributors.map((contributor, index) => (
                <div key={index} className="text-sm py-1.5 border-b border-[var(--color-border)] last:border-0" style={{ fontFamily: 'var(--font-family-body)' }}>
                  <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{contributor.name}</div>
                  <div className="text-[var(--color-text-secondary)]">{contributor.role}</div>
                  {(contributor.github || contributor.twitter) && (
                    <div className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                      {contributor.github && `GitHub: @${contributor.github}`}
                      {contributor.github && contributor.twitter && ' • '}
                      {contributor.twitter && `Twitter: @${contributor.twitter}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          {migrationStatus && (
            <div className={`mb-6 p-4 rounded-[var(--border-radius-md)] whitespace-pre-line ${
              migrationComplete 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`} style={{ fontFamily: 'var(--font-family-body)' }}>
              {migrationStatus}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleMigrate}
              disabled={isMigrating}
              className={`flex-1 px-6 py-3 rounded-[var(--border-radius-md)] font-medium transition-all ${
                isMigrating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[var(--color-accent)] text-white hover:opacity-90'
              }`}
              style={{ fontFamily: 'var(--font-family-body)', boxShadow: isMigrating ? 'none' : 'var(--shadow-sm)' }}
            >
              {isMigrating ? 'Migrating...' : migrationComplete ? 'Migrate again' : 'Start migration'}
            </button>

            {existingContributors.length > 0 && (
              <button
                onClick={handleClearAll}
                disabled={isMigrating}
                className={`flex-1 px-6 py-3 rounded-[var(--border-radius-md)] font-medium transition-all ${
                  isMigrating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
                style={{ fontFamily: 'var(--font-family-body)', boxShadow: isMigrating ? 'none' : 'var(--shadow-sm)' }}
              >
                Clear all contributors
              </button>
            )}

            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 rounded-[var(--border-radius-md)] font-medium border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-all"
              style={{ fontFamily: 'var(--font-family-body)', color: 'var(--color-text-primary)' }}
            >
              Back to site
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-[var(--color-surface)] rounded-[var(--border-radius-md)] border border-[var(--color-border)]">
            <h4 className="font-semibold mb-2 text-sm" style={{ fontFamily: 'var(--font-family-heading)', color: 'var(--color-text-primary)' }}>Instructions:</h4>
            <ol className="text-sm text-[var(--color-text-secondary)] space-y-1 list-decimal list-inside" style={{ fontFamily: 'var(--font-family-body)' }}>
              <li>Click "Start migration" to add all contributors to the CMS</li>
              <li>Go to <code className="px-1.5 py-0.5 bg-white rounded text-xs">/admin</code> to manage contributors</li>
              <li>Use "Clear all" if you need to reset and start over</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
