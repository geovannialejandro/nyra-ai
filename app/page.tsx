export default function Home() {
  return (
    <main style={{
      background: '#0B0B0C',
      color: '#F5EFE0',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '24px',
      textAlign: 'center',
    }}>
      <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.4rem', color: '#E8CE7B', marginBottom: '40px' }}>
        Nyra
      </div>

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.1rem', lineHeight: 1.25, marginBottom: '12px' }}>
        Tu avatar. Tu mensaje.<br />
        Tu contenido. <em style={{ color: '#E8CE7B' }}>Creado con IA.</em>
      </h1>

      <p style={{ color: '#8C8A85', fontSize: '0.95rem', maxWidth: '340px', margin: '0 auto 40px' }}>
        Crea un avatar que habla, presenta tus productos o servicios, y genera contenido listo para publicar.
      </p>

      <div style={{ maxWidth: '320px', margin: '0 auto 40px', textAlign: 'left' }}>
        <p style={{ color: '#F5EFE0', fontSize: '0.85rem', marginBottom: '10px' }}>📸 Sube una foto</p>
        <p style={{ color: '#F5EFE0', fontSize: '0.85rem', marginBottom: '10px' }}>✍️ Escribe lo que quieres decir</p>
        <p style={{ color: '#F5EFE0', fontSize: '0.85rem', marginBottom: '10px' }}>🎙️ Elige tu voz</p>
        <p style={{ color: '#F5EFE0', fontSize: '0.85rem' }}>🎬 Nyra crea el video</p>
      </div>

      <a href="/login" style={{
        display: 'inline-block',
        background: '#C9A227',
        color: '#0B0B0C',
        padding: '14px 30px',
        borderRadius: '4px',
        fontWeight: 600,
        textDecoration: 'none',
        fontSize: '0.85rem',
        letterSpacing: '0.05em',
      }}>
        CREAR MI VIDEO
      </a>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: '#8C8A85', marginBottom: '4px' }}>
          contacto.nyraai@gmail.com
        </p>
        <p style={{ fontSize: '0.7rem', color: '#8A6A2F', marginBottom: '10px' }}>
          Un producto de Renace AI Creative Studio
        </p>
        <p style={{ fontSize: '0.65rem' }}>
          <a href="/terminos" style={{ color: '#8C8A85', textDecoration: 'underline', marginRight: '12px' }}>Términos</a>
          <a href="/privacidad" style={{ color: '#8C8A85', textDecoration: 'underline' }}>Privacidad</a>
        </p>
      </div>
    </main>
  );
}
