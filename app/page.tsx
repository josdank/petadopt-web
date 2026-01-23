export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
        background:
          'radial-gradient(1200px 600px at 20% 10%, rgba(59,130,246,.15), transparent 60%), radial-gradient(1000px 500px at 80% 30%, rgba(34,197,94,.12), transparent 55%), linear-gradient(180deg, #0b1220 0%, #0a0f1a 100%)',
        color: '#e5e7eb',
      }}
    >
      <section
        style={{
          width: 'min(520px, 92vw)',
          padding: 24,
          borderRadius: 18,
          background: 'rgba(17,24,39,.75)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,.45)',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,.15)',
            background: 'rgba(255,255,255,.06)',
            fontSize: 12,
            letterSpacing: 1,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          LJL - COLIVE
        </div>

        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: -0.3,
          }}
        >
          Web Auxiliar
        </h1>

        {/* Description */}
        <p
          style={{
            marginTop: 10,
            opacity: 0.85,
            lineHeight: 1.6,
          }}
        >
          Este sitio se utiliza para <strong>confirmación de cuentas</strong> y
          <strong> restablecimiento de contraseñas</strong> de la aplicación
          móvil <strong>LJL - COLIVE</strong>.
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,.08)',
            margin: '18px 0',
          }}
        />

        {/* Routes */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: 10,
          }}
        >
          <li
            style={{
              padding: 12,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,.12)',
              background: 'rgba(255,255,255,.05)',
            }}
          >
            🔗 <code>/auth/callback</code> – Confirmación de cuenta
          </li>

          <li
            style={{
              padding: 12,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,.12)',
              background: 'rgba(255,255,255,.05)',
            }}
          >
            🔑 <code>/reset</code> – Restablecer contraseña
          </li>
        </ul>

        {/* Footer */}
        <footer
          style={{
            marginTop: 20,
            paddingTop: 14,
            borderTop: '1px solid rgba(255,255,255,.08)',
            fontSize: 12,
            opacity: 0.7,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>© {new Date().getFullYear()} LJL-COLIVE</span>
          <span>Web de confirmación</span>
        </footer>
      </section>
    </main>
  );
}
