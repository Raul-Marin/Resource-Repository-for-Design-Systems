import { useState } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1`;
const ADMIN_PASSWORD = "designsystems2024";

export function SubmissionsDiagnose() {
  const [diagnosticData, setDiagnosticData] = useState<any>(null);
  const [migrationResult, setMigrationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDiagnostic = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/submissions/diagnose`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setDiagnosticData(data);
      console.log("Diagnostic data:", data);
    } catch (err) {
      console.error("Error running diagnostic:", err);
    } finally {
      setLoading(false);
    }
  };

  const runMigration = async () => {
    if (!confirm("¿Migrar datos de la tabla de Supabase al KV Store?")) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/submissions/migrate-from-table`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "X-Admin-Key": ADMIN_PASSWORD,
        },
      });
      const data = await response.json();
      setMigrationResult(data);
      console.log("Migration result:", data);
      
      // Refresh diagnostic after migration
      await runDiagnostic();
    } catch (err) {
      console.error("Error running migration:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0ede8] p-8" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Submissions diagnostic
        </h1>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="flex gap-4">
            <button
              onClick={runDiagnostic}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Run diagnostic"}
            </button>
            <button
              onClick={runMigration}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Migrate from Supabase table"}
            </button>
          </div>
        </div>

        {migrationResult && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-green-900">Migration result</h2>
            <pre className="bg-white p-4 rounded border border-green-200 overflow-auto text-sm">
              {JSON.stringify(migrationResult, null, 2)}
            </pre>
          </div>
        )}

        {diagnosticData && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">KV Store data</h2>
              <p className="mb-2">
                <strong>Count:</strong> {diagnosticData.kv.count}
              </p>
              <pre className="bg-gray-50 p-4 rounded border border-gray-200 overflow-auto text-sm max-h-96">
                {JSON.stringify(diagnosticData.kv.data, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Supabase table data</h2>
              {diagnosticData.table.error ? (
                <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                  <p className="text-red-800">
                    <strong>Error:</strong> {diagnosticData.table.error}
                  </p>
                </div>
              ) : (
                <p className="mb-2">
                  <strong>Count:</strong> {diagnosticData.table.count}
                </p>
              )}
              <pre className="bg-gray-50 p-4 rounded border border-gray-200 overflow-auto text-sm max-h-96">
                {JSON.stringify(diagnosticData.table.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
