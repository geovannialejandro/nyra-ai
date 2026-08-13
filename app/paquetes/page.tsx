'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const PAQUETES = [
  { id: 'basico', nombre: 'Paquete Básico', creditos: 5, precio: 199, priceId: 'PENDIENTE_BASICO' },
  { id: 'pro', nombre: 'Paquete Pro', creditos: 20, precio: 649, priceId: 'PENDIENTE_PRO' },
];

export default function PaquetesPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function handleComprar(priceId: string) {
    setError('');
    setLoading(priceId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Debes iniciar sesión primero.');
        setLoading(null);
        return;
      }

      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId: user.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo iniciar el pago.');
        setLoading(null);
        return;
      }

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || 'Error inesperado.');
      setLoading(null);
    }
  }

  const gold = '#C9A227';
  const goldSoft = '#E8CE7B';
  const bronze = '#8A6A2F';
  const ivory = '#F5EFE0';
  const ash = '#8C8A85';
  const panel = '#17161A';

  return (
    <main style={{ background: '#0B0B0C', color: ivory, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '24px', maxWidth: '420px', margin: '0 auto' }}>
      <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.2rem', color: goldSoft, marginBottom: '20px' }}>
        Nyra
      </div>

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', marginBottom: '8px' }}>Elige tu paquete</h1>
      <p style={{ color: ash, fontSize: '0.85rem', marginBottom: '30px' }}>Cada crédito equivale a un video generado.</p>

      {PAQUETES.map((p) => (
        <div key={p.id} style={{ border: `1px solid #2A2823`, borderRadius: '6px', padding: '22px', marginBottom: '16px', background: panel }}>
          <div style={{ fontSize: '0.62rem', color: goldSoft, letterSpacing: '0.05em', marginBottom: '8px' }}>
            {p.creditos} VIDEOS
          </div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', marginBottom: '6px' }}>{p.nombre}</h3>
          <p style={{ color: ash, fontSize: '0.85rem', marginBottom: '18px' }}>${p.precio} MXN</p>
          <button
            onClick={() => handleComprar(p.priceId)}
            disabled={loading === p.priceId}
            style={{
              width: '100%', background: gold, color: '#0B0B0C', fontWeight: 600,
              fontSize: '0.78rem', letterSpacing: '0.05em', padding: '14px', border: 'none', borderRadius: '4px',
            }}
          >
            {loading === p.priceId ? 'CARGANDO...' : 'COMPRAR'}
          </button>
        </div>
      ))}

      {error && <p style={{ color: '#B5473B', marginTop: '12px', fontSize: '0.85rem' }}>{error}</p>}
    </main>
  );
}
