'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type Video = {
  id: string;
  video_url: string;
  script: string;
  created_at: string;
};

export default function HistorialPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('video_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setVideos(data as Video[]);
    setLoading(false);
  }

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

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', marginBottom: '20px' }}>Tus videos</h1>

      {loading && <p style={{ color: ash, fontSize: '0.85rem' }}>Cargando...</p>}

      {!loading && videos.length === 0 && (
        <p style={{ color: ash, fontSize: '0.85rem' }}>Todavía no has generado ningún video.</p>
      )}

      {videos.map((v) => (
        <div key={v.id} style={{ border: '1px solid #2A2823', borderRadius: '6px', padding: '14px', marginBottom: '16px', background: panel }}>
          <video src={v.video_url} controls style={{ width: '100%', borderRadius: '4px', marginBottom: '10px' }} />
          <p style={{ fontSize: '0.78rem', color: ash, marginBottom: '6px' }}>{v.script}</p>
          <p style={{ fontSize: '0.65rem', color: bronze }}>
            {new Date(v.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
      ))}
    </main>
  );
}
