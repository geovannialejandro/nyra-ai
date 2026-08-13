'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      router.push('/generar');
    } catch (err: any) {
      setError(err.message || 'Algo salió mal.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#17161A',
    border: '1px solid #2A2823',
    borderRadius: '6px',
    color: '#F5EFE0',
    padding: '14px',
    fontSize: '0.9rem',
    marginTop: '12px',
  };

  return (
    <main style={{
      background: '#0B0B0C',
      color: '#F5EFE0',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '24px',
      maxWidth: '400px',
      margin: '0 auto',
    }}>
      <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.2rem', color: '#E8CE7B', marginBottom: '30px', textAlign: 'center' }}>
        Nyra
      </div>

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', marginBottom: '4px' }}>
        {mode === 'signup' ? 'Crea tu cuenta' : 'Inicia sesión'}
      </h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      {error && <p style={{ color: '#B5473B', marginTop: '10px', fontSize: '0.85rem' }}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%',
          marginTop: '20px',
          padding: '14px',
          background: '#C9A227',
          color: '#0B0B0C',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 600,
          fontSize: '0.85rem',
          letterSpacing: '0.05em',
        }}
      >
        {loading ? 'Cargando...' : mode === 'signup' ? 'CREAR CUENTA' : 'ENTRAR'}
      </button>

      <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#8C8A85', textAlign: 'center' }}>
        {mode === 'signup' ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
        <span
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          style={{ color: '#E8CE7B', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {mode === 'signup' ? 'Inicia sesión' : 'Regístrate'}
        </span>
      </p>
    </main>
  );
}
