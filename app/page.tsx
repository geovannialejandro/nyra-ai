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

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.4rem', lineHeight: 1.2, marginBottom: '12px' }}>
        Convierte una foto<br />
        <em style={{ color: '#E8CE7B' }}>en un video que habla</em>
      </h1>

      <p style={{ color: '#8C8A85', fontSize: '0.95rem', maxWidth: '340px', margin: '0 auto 40px' }}>
        Sube tu foto, escribe lo que quieres decir, y recibe un video con tu rostro hablando en segundos.
      </p>

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
    </main>
  );
}
