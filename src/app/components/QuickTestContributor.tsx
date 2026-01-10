import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;
const ADMIN_PASSWORD = 'designsystems2024';

export function QuickTestContributor() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'not-found'>('loading');
  const [message, setMessage] = useState('');
  const [systemName, setSystemName] = useState('');

  useEffect(() => {
    updateFirstSystem();
  }, []);

  const updateFirstSystem = async () => {
    try {
      setStatus('loading');
      setMessage('Cargando Design Systems...');

      // Get all design systems
      const getResponse = await fetch(`${API_URL}/design-systems`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!getResponse.ok) {
        throw new Error('Error al cargar Design Systems');
      }

      const systems = await getResponse.json();
      console.log('📦 Total sistemas:', systems.length);
      console.log('📋 Sistemas:', systems.map((s: any) => s.name));

      if (systems.length === 0) {
        setStatus('not-found');
        setMessage('No hay Design Systems en la base de datos. Ve al /admin y añade uno primero.');
        return;
      }

      // Take the FIRST system
      const firstSystem = systems[0];
      console.log('✅ Seleccionado:', firstSystem);

      setMessage(`Actualizando "${firstSystem.name}"...`);
      setSystemName(firstSystem.name);

      // Update with contributor
      const updateResponse = await fetch(`${API_URL}/design-systems/${firstSystem.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'X-Admin-Key': ADMIN_PASSWORD,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...firstSystem,
          contributedBy: 'Sarah Johnson'
        }),
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error('❌ Error:', errorText);
        throw new Error(`Error: ${errorText}`);
      }

      console.log('✅ Actualizado exitosamente');
      setStatus('success');
      setMessage(`✅ "${firstSystem.name}" ahora tiene contribuidor "Sarah Johnson"`);

    } catch (err) {
      console.error('❌ Error:', err);
      setStatus('error');
      setMessage(`Error: ${err instanceof Error ? err.message : 'Desconocido'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--color-background, #f0ede8)' }}>
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border" style={{ 
        borderColor: 'var(--color-border, #e5e5e5)',
        fontFamily: 'var(--font-family-primary, Inter, system-ui, sans-serif)'
      }}>
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>
          🧪 Test Contributor System
        </h1>

        <div className="mb-6">
          {status === 'loading' && (
            <div className="flex items-center gap-3 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="w-6 h-6 border-3 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
              <div>
                <p className="font-semibold text-blue-900">{message}</p>
                <p className="text-sm text-blue-700 mt-1">Esto solo toma unos segundos...</p>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
              <h2 className="text-2xl font-bold text-green-900 mb-3">{message}</h2>
              <p className="text-green-800 mb-4">Sistema: <strong>{systemName}</strong></p>
              
              <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                <p className="text-sm text-green-900 font-semibold mb-2">✨ Ahora verás en la card:</p>
                <ul className="text-sm text-green-800 space-y-1 ml-4">
                  <li>• Badge sparkle en esquina superior derecha (con "SJ" o "Sarah")</li>
                  <li>• Signature al final de la card con "✈️ Sarah Johnson"</li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-bold text-lg shadow-lg"
                >
                  🚀 Ver en la página principal
                </a>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-600 text-green-700 rounded-xl hover:bg-green-50 transition-all font-semibold"
                >
                  🔄 Actualizar otro
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
              <h2 className="text-xl font-bold text-red-900 mb-3">❌ Error</h2>
              <p className="text-red-800 mb-4 font-mono text-sm bg-white p-3 rounded border border-red-200">{message}</p>
              <div className="flex gap-3">
                <button
                  onClick={updateFirstSystem}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold"
                >
                  🔄 Reintentar
                </button>
                <a
                  href="/admin"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-red-600 text-red-700 rounded-xl hover:bg-red-50 transition-all font-semibold"
                >
                  ⚙️ Ir al Admin
                </a>
              </div>
            </div>
          )}

          {status === 'not-found' && (
            <div className="p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
              <h2 className="text-xl font-bold text-yellow-900 mb-3">⚠️ No hay datos</h2>
              <p className="text-yellow-800 mb-4">{message}</p>
              <a
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-all font-bold"
              >
                ➕ Añadir Design System en Admin
              </a>
            </div>
          )}
        </div>

        <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
          <h2 className="font-bold text-lg mb-3" style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>
            💡 ¿Qué hace esta página?
          </h2>
          <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary, #666)' }}>
            <p>✅ Toma el <strong>primer Design System</strong> de tu base de datos</p>
            <p>✅ Le añade el campo <code className="px-2 py-1 bg-white rounded border">contributedBy: "Sarah Johnson"</code></p>
            <p>✅ Podrás ver el badge y firma inmediatamente</p>
          </div>
        </div>

        <div className="mt-6 p-4 border-2 border-dashed rounded-xl" style={{ borderColor: 'var(--color-border, #ddd)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary, #666)' }}>
            <strong>💡 Tip:</strong> También puedes editar manualmente cualquier registro desde <a href="/admin" className="text-purple-600 hover:underline font-semibold">/admin</a> y añadir un nombre en el campo "Contributed by".
          </p>
        </div>
      </div>
    </div>
  );
}
