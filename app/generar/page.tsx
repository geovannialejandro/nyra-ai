'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function GenerarPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [script, setScript] = useState('');
  const [voice, setVoice] = useState('Zephyr (Female)');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'generating' | 'done' | 'error'>('idle');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    fetchCredits();
  }, []);

  async function fetchCredits() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setErrorMsg('DEBUG: no hay usuario logueado');
      return;
    }

    const { data, error } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();

    if (error) {
      setErrorMsg('DEBUG créditos: ' + error.message);
      return;
    }

    if (data) setCredits(data.credits);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit() {
    if (!file || !script.trim()) {
      setErrorMsg('Falta la foto o el texto.');
      return;
    }
    setErrorMsg('');
    setStatus('uploading');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setErrorMsg('Debes iniciar sesión.');
        setStatus('idle');
        return;
      }

      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
      const imageUrl = publicUrlData.publicUrl;

      setStatus('generating');
      const res = await fetch('/api/generar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, image: imageUrl, voice_script: script, voice }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Algo falló generando el video.');
        setStatus('error');
        fetchCredits();
        return;
      }

      setVideoUrl(Array.isArray(data.output) ? data.output[0] : data.output);
      setStatus('done');
      fetchCredits();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error inesperado.');
      setStatus('error');
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.2rem', color: goldSoft }}>
          Nyra
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="/historial" style={{ fontSize: '0.75rem', color: ash, textDecoration: 'underline' }}>
            Mis videos
          </a>
          <div style={{ fontSize: '0.75rem', color: bronze, border: `1px solid ${bronze}`, borderRadius: '20px', padding: '4px 12px' }}>
            {credits === null ? '...' : `${credits} créditos`}
          </div>
        </div>
      </div>

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', marginBottom: '20px' }}>Crea tu video</h1>

      <div style={{ fontSize: '0.65rem', color: bronze, marginBottom: '10px', letterSpacing: '0.05em' }}>01 — TU FOTO</div>
      <label style={{
        display: 'block', border: preview ? `1px solid ${bronze}` : `1px dashed #3A382F`,
        borderRadius: '6px', padding: preview ? 0 : '26px 16px', textAlign: 'center',
        background: panel, marginBottom: '24px', overflow: 'hidden', cursor: 'pointer',
      }}>
        <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        {preview ? (
          <img src={preview} alt="preview" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
        ) : (
          <span style={{ fontSize: '0.82rem', color: ash }}>Toca para subir tu foto</span>
        )}
      </label>

      <div style={{ fontSize: '0.65rem', color: bronze, marginBottom: '10px', letterSpacing: '0.05em' }}>02 — QUÉ DICE</div>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        maxLength={200}
        placeholder="Escribe lo que quieres que diga tu avatar..."
        style={{ width: '100%', minHeight: '100px', background: panel, border: '1px solid #2A2823', borderRadius: '6px', color: ivory, padding: '14px', fontSize: '0.9rem', marginBottom: '16px' }}
      />

      <div style={{ fontSize: '0.65rem', color: bronze, marginBottom: '10px', letterSpacing: '0.05em' }}>03 — VOZ</div>
      <select
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
        style={{ width: '100%', background: panel, border: '1px solid #2A2823', color: ivory, padding: '14px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '24px' }}
      >
        <option value="Zephyr (Female)">Voz femenina — cálida</option>
        <option value="Kore (Female)">Voz femenina — profesional</option>
        <option value="Puck (Male)">Voz masculina — cálida</option>
        <option value="Charon (Male)">Voz masculina — profesional</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={status === 'uploading' || status === 'generating'}
        style={{ width: '100%', background: gold, color: '#0B0B0C', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.05em', padding: '16px', border: 'none', borderRadius: '4px' }}
      >
        {status === 'uploading' && 'SUBIENDO FOTO...'}
        {status === 'generating' && 'GENERANDO VIDEO...'}
        {(status === 'idle' || status === 'done' || status === 'error') && 'CREAR MI VIDEO'}
      </button>

      {errorMsg && <p style={{ color: '#B5473B', marginTop: '12px', fontSize: '0.85rem' }}>{errorMsg}</p>}

      {status === 'done' && videoUrl && (
        <video src={videoUrl} controls style={{ width: '100%', marginTop: '24px', borderRadius: '6px' }} />
      )}
    </main>
  );
}
