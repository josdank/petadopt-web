'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Status = 'idle' | 'loading' | 'error' | 'success';

export default function ResetPage() {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [ready, setReady] = useState(false);

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    (async () => {
      setStatus('loading');
      setMsg('Validando enlace de restablecimiento...');

      try {
        const url = new URL(window.location.href);

        // ─────────────────────────────────────────────
        // 1️⃣ FLUJO RESET CORRECTO (token_hash + recovery)
        // ─────────────────────────────────────────────
        const tokenHash = url.searchParams.get('token_hash');
        const type = url.searchParams.get('type');

        if (tokenHash && type === 'recovery') {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'recovery',
          });

          if (error) {
            setStatus('error');
            setMsg(`Error al validar el enlace: ${error.message}`);
            setReady(false);
            return;
          }

          setStatus('idle');
          setMsg('Ingresa tu nueva contraseña.');
          setReady(true);
          return;
        }

        // ─────────────────────────────────────────────
        // 2️⃣ FLUJO ALTERNATIVO (code + PKCE)
        // ─────────────────────────────────────────────
        const code = url.searchParams.get('code');

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            setStatus('error');
            setMsg(`Error al validar el enlace: ${error.message}`);
            setReady(false);
            return;
          }

          setStatus('idle');
          setMsg('Ingresa tu nueva contraseña.');
          setReady(true);
          return;
        }

        // ─────────────────────────────────────────────
        // ❌ NINGÚN PARÁMETRO VÁLIDO
        // ─────────────────────────────────────────────
        setStatus('error');
        setMsg(
          'Link inválido o incompleto. Asegúrate de abrir el enlace del correo enviado por LJL - COLIVE.'
        );
        setReady(false);
      } catch (e: any) {
        setStatus('error');
        setMsg(`Error inesperado: ${e?.message ?? String(e)}`);
        setReady(false);
      }
    })();
  }, []);

  const onSubmit = async () => {
    if (!ready) {
      setStatus('error');
      setMsg('Primero se debe validar el enlace.');
      return;
    }

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

        <h1 style={{ margin: 0, fontSize: 26 }}>Restablecer contraseña</h1>

        <p style={{ marginTop: 10, opacity: 0.85 }}>
          Ingresa una nueva contraseña para tu cuenta.
        </p>

        <div style={{ height: 1, background: 'rgba(255,255,255,.08)', margin: '18px 0' }} />

        <input
          type="password"
          placeholder={ready ? 'Nueva contraseña' : 'Validando enlace...'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!ready || status === 'loading' || status === 'success'}
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,.15)',
            background: 'rgba(255,255,255,.06)',
            color: '#e5e7eb',
          }}
        />

        <button
          onClick={onSubmit}
          disabled={!ready || status === 'loading' || status === 'success'}
          style={{
            marginTop: 14,
            width: '100%',
            padding: 14,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,.35)',
            background:
              status === 'loading'
                ? 'rgba(255,255,255,.3)'
                : 'linear-gradient(180deg, #e5e7eb 0%, #cbd5e1 100%)',
            color: '#0b1220',
            fontWeight: 700,
          }}
        >
          Guardar contraseña
        </button>

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
            }}
          >
            {msg}
          </div>
        )}

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
          <span>© {year} LJL - COLIVE</span>
          <span>Web Auxiliar</span>
        </footer>
      </section>
    </main>
  );
}
