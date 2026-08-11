'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function GenerarPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [script, setScript] = useState('');
  const [voice, setVoice] = useState('Zephyr (Female)');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'generating' | 'done' | 'error'>('idle');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

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
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      setStatus('generating');
      const res = await fetch('/api/generar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          image: imageUrl,
          voice_script: script,
          voice: voice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Algo falló generando el video.');
        setStatus('error');
        return;
      }

      setVideoUrl(Array.isArray(data.output) ? data.output[0] : data.output);
      setStatus('done');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error inesperado.');
      setStatus('error');
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: 24 }}>
      <h1>Crea tu video</h1>

      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && <img src={preview} alt="preview" style={{ width: '100%', marginTop: 12 }} />}

      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        maxLength={280}
        placeholder="Escribe lo que quieres que diga tu avatar..."
        style={{ width: '100%', minHeight: 100, marginTop: 16 }}
      />

      <select value={voice} onChange={(e) => setVoice(e.target.value)} style={{ width: '100%', marginTop: 12 }}>
        <option value="Zephyr (Female)">Voz femenina — cálida</option>
        <option value="Orion (Male)">Voz masculina — profesional</option>
      </select>

      <button onClick={handleSubmit} disabled={status === 'uploading' || status === 'generating'} style={{ marginTop: 16, width: '100%' }}>
        {status === 'uploading' && 'Subiendo foto...'}
        {status === 'generating' && 'Generando video...'}
        {(status === 'idle' || status === 'done' || status === 'error') && 'Crear mi video'}
      </button>

      {errorMsg && <p style={{ color: 'red', marginTop: 12 }}>{errorMsg}</p>}

      {status === 'done' && videoUrl && (
        <video src={videoUrl} controls style={{ width: '100%', marginTop: 20 }} />
      )}
    </main>
  );
}
