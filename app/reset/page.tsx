'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ResetPage() {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  const onSubmit = async () => {
    if (password.trim().length < 6) {
      setStatus('error');
      setMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setStatus('loading');
    setMsg('Actualizando contraseña...');

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus('error');
      setMsg('Error: ' + error.message);
    } else {
      setStatus('success');
      setMsg('✅ Contraseña actualizada. Ya puedes volver a la app e iniciar sesión.');
    }
  };

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
          width: 'min(480px, 92vw)',
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
          Restablecer contraseña
        </h1>

        {/* Description */}
        <p
          style={{
            marginTop: 10,
            opacity: 0.85,
            lineHeight: 1.6,
          }}
        >
          Ingresa una nueva contraseña para tu cuenta.  
          Al finalizar podrás volver a la aplicación móvil.
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,.08)',
            margin: '18px 0',
          }}
        />

        {/* Input */}
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,.15)',
            background: 'rgba(255,255,255,.06)',
            color: '#e5e7eb',
            outline: 'none',
            fontSize: 14,
          }}
        />

        {/* Button */}
        <button
          onClick={onSubmit}
          disabled={status === 'loading'}
          style={{
            marginTop: 14,
            width: '100%',
            padding: '14px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,.35)',
            background:
              status === 'loading'
                ? 'rgba(255,255,255,.3)'
                : 'linear-gradient(180deg, #e5e7eb 0%, #cbd5e1 100%)',
            color: '#0b1220',
            fontWeight: 700,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          Guardar contraseña
        </button>

        {/* Message */}
        {msg && (
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 12,
              border:
                status === 'error'
                  ? '1px solid rgba(239,68,68,.45)'
                  : status === 'success'
                  ? '1px solid rgba(34,197,94,.45)'
                  : '1px solid rgba(255,255,255,.15)',
              background: 'rgba(255,255,255,.06)',
              fontSize: 14,
              lineHeight: 1.4,
            }}
          >
            {msg}
          </div>
        )}

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
