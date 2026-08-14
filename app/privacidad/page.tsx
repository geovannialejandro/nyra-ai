export default function PrivacidadPage() {
  const ivory = '#F5EFE0';
  const ash = '#8C8A85';
  const goldSoft = '#E8CE7B';

  return (
    <main style={{ background: '#0B0B0C', color: ivory, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '24px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
      <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.2rem', color: goldSoft, marginBottom: '30px' }}>
        Nyra
      </div>

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', marginBottom: '8px' }}>Aviso de Privacidad</h1>
      <p style={{ color: ash, fontSize: '0.8rem', marginBottom: '30px' }}>Última actualización: agosto 2026</p>

      <div style={{ fontSize: '0.9rem', color: ivory }}>
        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>1. Qué información recopilamos</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Recopilamos tu correo electrónico al registrarte, la fotografía que subas para generar tu video, el texto o audio que uses como guion, y los videos resultantes. También registramos tus compras a través de nuestro procesador de pagos.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>2. Cómo usamos tu información</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Usamos tu foto y guion únicamente para generar el video que solicitas, a través de un proveedor externo de inteligencia artificial. No usamos tu contenido para entrenar modelos propios ni lo compartimos con terceros salvo lo necesario para prestar el servicio.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>3. Terceros que procesan tu información</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Para operar Nyra AI, tu información pasa por proveedores externos: Supabase (almacenamiento de cuentas y archivos), Replicate (generación de video con IA), y Stripe (procesamiento de pagos). Cada uno cuenta con sus propias políticas de privacidad y seguridad.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>4. Almacenamiento y retención</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Tus fotos y videos generados se conservan en tu cuenta para que puedas acceder a tu historial. Puedes solicitar la eliminación de tu cuenta y datos asociados en cualquier momento contactándonos.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>5. Seguridad</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Aplicamos medidas técnicas razonables para proteger tu información, incluyendo control de acceso a nivel de base de datos para que cada usuario solo pueda ver sus propios datos.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>6. Tus derechos</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Puedes solicitar acceso, corrección o eliminación de tus datos personales en cualquier momento, contactándonos a través de los medios indicados en nuestro sitio.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>7. Contacto</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Para dudas sobre este aviso de privacidad, puedes contactarnos a través de los medios indicados en nuestro sitio.
        </p>
      </div>
    </main>
  );
}
