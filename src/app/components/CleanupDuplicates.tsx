import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

export function CleanupDuplicates() {
  const [readings, setReadings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const [duplicates, setDuplicates] = useState<any[]>([]);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/readings`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReadings(data);
        findDuplicates(data);
      }
    } catch (err) {
      console.error("Error loading readings:", err);
      setStatus("Error loading readings");
    } finally {
      setIsLoading(false);
    }
  };

  const findDuplicates = (readingsData: any[]) => {
    const seen = new Map<string, any[]>();
    
    // Group by title to find duplicates
    readingsData.forEach(reading => {
      const key = reading.title?.toLowerCase().trim() || '';
      if (!seen.has(key)) {
        seen.set(key, []);
      }
      seen.get(key)!.push(reading);
    });

    // Find groups with more than one item
    const dupes: any[] = [];
    seen.forEach((group, title) => {
      if (group.length > 1) {
        dupes.push({
          title,
          count: group.length,
          items: group.sort((a, b) => {
            // Sort by createdAt, oldest first
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateA - dateB;
          })
        });
      }
    });

    setDuplicates(dupes);
    setStatus(`Found ${dupes.length} groups of duplicates (${dupes.reduce((sum, d) => sum + d.count - 1, 0)} items to remove)`);
  };

  const keepOldestRemoveDuplicates = async () => {
    if (!window.confirm(`This will keep the OLDEST version of each reading and delete the newer duplicates. Continue?`)) {
      return;
    }

    setIsProcessing(true);
    setStatus("Removing duplicates...");

    try {
      let deletedCount = 0;

      for (const group of duplicates) {
        // Keep the first item (oldest), delete the rest
        const toDelete = group.items.slice(1);
        
        for (const item of toDelete) {
          try {
            const response = await fetch(`${API_URL}/readings/${item.id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${publicAnonKey}`,
                "X-Admin-Key": "designsystems2024",
              },
            });

            if (response.ok) {
              deletedCount++;
              setStatus(`Deleted ${deletedCount} duplicates...`);
            }
            
            // Small delay
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (err) {
            console.error(`Error deleting ${item.title}:`, err);
          }
        }
      }

      setStatus(`✅ Cleanup complete! Deleted ${deletedCount} duplicate readings.`);
      
      // Reload
      await loadReadings();
    } catch (err) {
      console.error("Cleanup error:", err);
      setStatus(`❌ Error: ${err}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteAllReadings = async () => {
    if (!window.confirm(`⚠️ WARNING: This will delete ALL ${readings.length} readings. This cannot be undone. Are you absolutely sure?`)) {
      return;
    }

    if (!window.confirm(`FINAL CONFIRMATION: Delete all ${readings.length} readings?`)) {
      return;
    }

    setIsProcessing(true);
    setStatus("Deleting all readings...");

    try {
      let deletedCount = 0;

      for (const reading of readings) {
        try {
          const response = await fetch(`${API_URL}/readings/${reading.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
              "X-Admin-Key": "designsystems2024",
            },
          });

          if (response.ok) {
            deletedCount++;
            setStatus(`Deleted ${deletedCount}/${readings.length}...`);
          }
          
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (err) {
          console.error(`Error deleting reading:`, err);
        }
      }

      setStatus(`✅ Deleted ${deletedCount} readings.`);
      await loadReadings();
    } catch (err) {
      console.error("Delete error:", err);
      setStatus(`❌ Error: ${err}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-surface)', fontFamily: 'var(--font-family-body)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-accent)' }}></div>
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading readings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8" style={{ backgroundColor: 'var(--color-surface)', fontFamily: 'var(--font-family-body)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border p-6 sm:p-8" style={{ 
          borderRadius: 'var(--border-radius-lg)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ 
              fontFamily: 'var(--font-family-heading)', 
              color: 'var(--color-text-primary)' 
            }}>
              Cleanup duplicate readings
            </h1>
            <p style={{ 
              fontFamily: 'var(--font-family-body)',
              color: 'var(--color-text-secondary)' 
            }}>
              Total readings: {readings.length}
            </p>
          </div>

          {/* Status */}
          {status && (
            <div className={`mb-6 p-4 rounded-[var(--border-radius-md)] text-sm font-medium ${
              status.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' :
              status.includes('❌') ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`} style={{ fontFamily: 'var(--font-family-body)' }}>
              {status}
            </div>
          )}

          {/* Duplicates List */}
          {duplicates.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-family-heading)', color: 'var(--color-text-primary)' }}>
                Duplicate groups ({duplicates.length})
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-[var(--color-surface)] rounded-[var(--border-radius-md)]">
                {duplicates.map((group, index) => (
                  <div key={index} className="border border-[var(--color-border)] rounded-[var(--border-radius-md)] p-3 bg-white">
                    <div className="font-medium mb-2" style={{ fontFamily: 'var(--font-family-body)', color: 'var(--color-text-primary)' }}>
                      {group.items[0].title} ({group.count} copies)
                    </div>
                    <div className="space-y-1 text-sm" style={{ fontFamily: 'var(--font-family-body)' }}>
                      {group.items.map((item: any, idx: number) => (
                        <div key={item.id} className={`flex items-center gap-2 ${idx === 0 ? 'text-green-600 font-medium' : 'text-red-600'}`}>
                          <span>{idx === 0 ? '✓ KEEP' : '✗ DELETE'}</span>
                          <span className="text-[var(--color-text-tertiary)]">
                            {item.author} • {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'No date'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Duplicates */}
          {duplicates.length === 0 && !isLoading && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[var(--border-radius-md)] text-green-700" style={{ fontFamily: 'var(--font-family-body)' }}>
              ✅ No duplicates found!
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.location.href = '/admin'}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-white hover:bg-gray-50 text-[var(--color-text-primary)] transition-colors text-sm font-medium"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              ← Back to admin
            </button>

            {duplicates.length > 0 && (
              <button
                onClick={keepOldestRemoveDuplicates}
                disabled={isProcessing}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-colors text-sm font-medium disabled:bg-gray-400"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                {isProcessing ? 'Processing...' : 'Remove duplicates (keep oldest)'}
              </button>
            )}

            <button
              onClick={deleteAllReadings}
              disabled={isProcessing || readings.length === 0}
              className="ml-auto px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white transition-colors text-sm font-medium disabled:bg-gray-400"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              {isProcessing ? 'Deleting...' : 'Delete ALL readings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}