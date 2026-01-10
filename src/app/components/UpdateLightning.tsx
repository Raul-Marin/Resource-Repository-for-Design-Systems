import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;
const ADMIN_PASSWORD = 'designsystems2024';

export function UpdateLightning() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'not-found'>('loading');
  const [message, setMessage] = useState('');
  const [updatedId, setUpdatedId] = useState<string>('');

  useEffect(() => {
    updateLightning();
  }, []);

  const updateLightning = async () => {
    try {
      setStatus('loading');
      setMessage('Buscando Lightning Design System...');

      // First, get all design systems
      const getResponse = await fetch(`${API_URL}/design-systems`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!getResponse.ok) {
        throw new Error('Error al cargar Design Systems');
      }

      const systems = await getResponse.json();
      console.log('Design Systems encontrados:', systems);
      console.log('Total de sistemas:', systems.length);
      
      // List all system names for debugging
      const systemNames = systems.map((s: any) => s.name || 'Sin nombre').join(', ');
      console.log('Nombres:', systemNames);

      // Find Lightning Design System (búsqueda más flexible)
      const lightning = systems.find((s: any) => 
        s.name && (
          s.name.toLowerCase().includes('lightning') ||
          s.company?.toLowerCase().includes('salesforce')
        )
      );

      if (!lightning) {
        setStatus('not-found');
        setMessage(`No se encontró Lightning Design System en la base de datos.\n\nSistemas disponibles (${systems.length}):\n${systemNames}`);
        console.log('Lightning NO encontrado. Buscando por salesforce o lightning en:', systems);
        return;
      }

      console.log('Lightning encontrado:', lightning);
      setMessage(`Encontrado: ${lightning.name} (ID: ${lightning.id}). Actualizando...`);

      // Update with contributor
      const updateData = {
        ...lightning,
        contributedBy: 'Sarah Johnson'
      };
      
      console.log('Enviando actualización:', updateData);

      const updateResponse = await fetch(`${API_URL}/design-systems/${lightning.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'X-Admin-Key': ADMIN_PASSWORD,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error('Error response:', errorText);
        throw new Error(`Error al actualizar: ${errorText}`);
      }

      const updatedSystem = await updateResponse.json();
      console.log('Sistema actualizado:', updatedSystem);

      setStatus('success');
      setMessage(`✅ ${lightning.name} actualizado exitosamente con contribuidor "Sarah Johnson"`);
      setUpdatedId(lightning.id);

    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
      setMessage(`❌ Error: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--color-background, #f0ede8)' }}>
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 border-2" style={{ 
        borderColor: 'var(--color-border, #e5e5e5)',
        fontFamily: 'var(--font-family-primary, system-ui, -apple-system, sans-serif)'
      }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>
          Actualizar Lightning Design System
        </h1>

        <div className="mb-6">
          {status === 'loading' && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border" style={{ borderColor: 'var(--color-border, #e5e5e5)' }}>
              <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <span style={{ color: 'var(--color-text-secondary, #666)' }}>{message}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium mb-3">{message}</p>
              <p className="text-sm text-green-700 mb-4">ID del registro: {updatedId}</p>
              <div className="flex gap-3">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
                >
                  Ver en la página principal
                </a>
                <a
                  href="/admin"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 rounded-lg hover:bg-gray-50 transition-all font-medium"
                  style={{ 
                    borderColor: 'var(--color-border, #e5e5e5)',
                    color: 'var(--color-text-primary, #1a1a1a)'
                  }}
                >
                  Ir al Admin
                </a>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-800 font-medium mb-3">{message}</p>
              <button
                onClick={updateLightning}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium"
              >
                Reintentar
              </button>
            </div>
          )}

          {status === 'not-found' && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 font-medium mb-3">{message}</p>
              <p className="text-sm text-yellow-700 mb-4">
                Puedes añadir "Lightning Design System" desde el Admin, o actualizar cualquier otro Design System manualmente.
              </p>
              <a
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all font-medium"
              >
                Ir al Admin
              </a>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border" style={{ borderColor: 'var(--color-border, #e5e5e5)' }}>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>
            ℹ️ Qué hace esta página:
          </h2>
          <ul className="text-sm space-y-1" style={{ color: 'var(--color-text-secondary, #666)' }}>
            <li>• Busca "Lightning Design System" en tu base de datos</li>
            <li>• Le añade el campo <code className="px-1 py-0.5 bg-white rounded">contributedBy: "Sarah Johnson"</code></li>
            <li>• Luego podrás ver el badge sparkle y la signature en la card</li>
          </ul>
        </div>

        <div className="mt-6 p-4 border-2 border-dashed rounded-lg" style={{ borderColor: 'var(--color-border, #e5e5e5)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary, #666)' }}>
            <strong>Alternativa:</strong> También puedes ir a <a href="/admin" className="text-blue-600 hover:underline">/admin</a>, 
            editar cualquier Design System, y añadir un nombre en el campo "Contributed by".
          </p>
        </div>
      </div>
    </div>
  );
}