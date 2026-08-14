export default function TerminosPage() {
  const ivory = '#F5EFE0';
  const ash = '#8C8A85';
  const goldSoft = '#E8CE7B';

  return (
    <main style={{ background: '#0B0B0C', color: ivory, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '24px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
      <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.2rem', color: goldSoft, marginBottom: '30px' }}>
        Nyra
      </div>

      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', marginBottom: '8px' }}>Términos y Condiciones</h1>
      <p style={{ color: ash, fontSize: '0.8rem', marginBottom: '30px' }}>Última actualización: agosto 2026</p>

      <div style={{ fontSize: '0.9rem', color: ivory }}>
        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>1. Sobre el servicio</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Nyra AI es un servicio que permite a los usuarios generar videos animados a partir de una fotografía, mediante inteligencia artificial, usando créditos comprados o gratuitos.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>2. Uso de tu foto</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Al subir una foto, declaras que tienes derecho a usarla (es tuya, o cuentas con permiso de la persona que aparece en ella). No está permitido subir fotos de terceros sin su consentimiento, ni contenido que infrinja derechos de autor, sea ofensivo, o viole la ley.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>3. Créditos y pagos</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Cada cuenta nueva recibe créditos gratuitos por única vez. Los créditos adicionales se compran en paquetes y no expiran, pero no son reembolsables una vez usados para generar un video, salvo que el servicio falle en entregarte un resultado, en cuyo caso el crédito se devuelve automáticamente a tu cuenta.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>4. Uso responsable</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          No está permitido usar Nyra AI para crear contenido engañoso, difamatorio, de suplantación de identidad sin consentimiento, ni contenido que promueva violencia, odio, o actividades ilegales. Nos reservamos el derecho de suspender cuentas que violen esta política.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>5. Disponibilidad del servicio</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Nyra AI depende de proveedores externos de inteligencia artificial para generar los videos. Aunque buscamos la mayor disponibilidad posible, no garantizamos que el servicio esté libre de interrupciones o errores en todo momento.
        </p>

        <h2 style={{ fontSize: '1.1rem', marginTop: '24px', marginBottom: '8px' }}>6. Contacto</h2>
        <p style={{ color: ash, marginBottom: '16px' }}>
          Para dudas sobre estos términos, puedes contactarnos a través de los medios indicados en nuestro sitio.
        </p>
      </div>
    </main>
  );
}
