'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function CallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const intentLink = useMemo(
    () =>
      'intent://auth/callback?confirmed=1#Intent;scheme=petadopt;package=com.example.petadopt;end;',
    []
  );
  const deepLink = useMemo(() => 'petadopt://auth/callback?confirmed=1', []);

  useEffect(() => {
    (async () => {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');

        if (!code) {
          setStatus('error');
          return;
        }

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          setStatus('error');
          return;
        }

        setStatus('success');
        window.location.href = intentLink;

        setTimeout(() => {
          window.location.href = deepLink;
        }, 700);
      } catch (e: any) {
        setStatus('error');
      }
    })();
  }, [deepLink, intentLink]);

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
          PetAdopt
        </div>

        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontSize: 26,
            lineHeight: 1.2,
            letterSpacing: -0.3,
          }}
        >
          Confirmación de cuenta
        </h1>

        <p style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.6 }}>
          Validamos tu enlace y luego abrimos automáticamente la aplicación móvil.

        

          Si la app no se abre, pulsa el botón de abajo para intentarlo manualmente.
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,.08)',
            margin: '18px 0',
          }}
        />

        {/* Buttons */}
        <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
          <a
            href={intentLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,.35)',
              background: 'linear-gradient(180deg, #e5e7eb 0%, #cbd5e1 100%)',
              color: '#0b1220',
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            Abrir PetAdopt
          </a>
        </div>

        <p style={{ marginTop: 12, opacity: 0.72, lineHeight: 1.5 }}>
          {/*Nota: En PC el deep link normalmente no abre la app. En Android sí.*/}
        </p>

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
          <span>© {new Date().getFullYear()} PetAdopt</span>
          <span>Web Auxiliar</span>
        </footer>
      </section>
    </main>
  );
}
