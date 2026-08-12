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

  return (
    <main style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h1>{mode === 'signup' ? 'Crea tu cuenta' : 'Inicia sesión'}</h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginTop: 16, padding: 10 }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginTop: 12, padding: 10 }}
      />

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

      <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', marginTop: 16, padding: 12 }}>
        {loading ? 'Cargando...' : mode === 'signup' ? 'Crear cuenta' : 'Entrar'}
      </button>

      <p style={{ marginTop: 16, fontSize: 14 }}>
        {mode === 'signup' ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
        <span
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {mode === 'signup' ? 'Inicia sesión' : 'Regístrate'}
        </span>
      </p>
    </main>
  );
}
