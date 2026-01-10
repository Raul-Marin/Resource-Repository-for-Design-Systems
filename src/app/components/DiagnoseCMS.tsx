import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

export function DiagnoseCMS() {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const endpoints = ['design-systems', 'readings', 'tools', 'jobs', 'contributors'];
      const results: any = {};

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          });

          if (response.ok) {
            const jsonData = await response.json();
            results[endpoint] = jsonData;
          } else {
            results[endpoint] = { error: `Status ${response.status}` };
          }
        } catch (err) {
          results[endpoint] = { error: String(err) };
        }
      }

      setData(results);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-surface)', fontFamily: 'var(--font-family-body)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-accent)' }}></div>
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading database info...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8" style={{ backgroundColor: 'var(--color-surface)', fontFamily: 'var(--font-family-body)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border p-6 sm:p-8 mb-6" style={{ 
          borderRadius: 'var(--border-radius-lg)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ 
              fontFamily: 'var(--font-family-heading)', 
              color: 'var(--color-text-primary)' 
            }}>
              CMS Database Diagnosis
            </h1>
            <p style={{ 
              fontFamily: 'var(--font-family-body)',
              color: 'var(--color-text-secondary)' 
            }}>
              View all data in each endpoint
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={loadAllData}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              🔄 Reload
            </button>
            <button
              onClick={() => window.location.href = '/admin'}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
              style={{ fontFamily: 'var(--font-family-body)', color: 'var(--color-text-primary)' }}
            >
              ← Back to admin
            </button>
          </div>

          {/* Data Tables */}
          <div className="space-y-6">
            {Object.entries(data).map(([endpoint, items]: [string, any]) => (
              <div key={endpoint} className="border rounded-lg p-4" style={{ borderColor: 'var(--color-border)' }}>
                <h2 className="text-lg font-semibold mb-3 flex items-center justify-between" style={{ 
                  fontFamily: 'var(--font-family-heading)',
                  color: 'var(--color-text-primary)' 
                }}>
                  <span>/{endpoint}</span>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    Array.isArray(items) && items.length > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {Array.isArray(items) ? `${items.length} items` : 'Error'}
                  </span>
                </h2>

                {items.error ? (
                  <div className="text-red-600 text-sm p-3 bg-red-50 rounded" style={{ fontFamily: 'var(--font-family-body)' }}>
                    Error: {items.error}
                  </div>
                ) : Array.isArray(items) && items.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {items.map((item: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200 text-sm" style={{ fontFamily: 'var(--font-family-body)' }}>
                        <div className="font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
                          {item.name || item.title || item.id || 'Unnamed'}
                        </div>
                        <div className="text-xs space-y-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                          {item.company && <div>Company: {item.company}</div>}
                          {item.author && <div>Author: {item.author}</div>}
                          {item.role && <div>Role: {item.role}</div>}
                          {item.category && <div>Category: {item.category}</div>}
                          {item.type && <div>Type: {item.type}</div>}
                          {item.id && <div className="text-gray-400">ID: {item.id}</div>}
                          {item.createdAt && <div className="text-gray-400">Created: {new Date(item.createdAt).toLocaleString()}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm p-3 bg-gray-50 rounded" style={{ fontFamily: 'var(--font-family-body)' }}>
                    No items found
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}