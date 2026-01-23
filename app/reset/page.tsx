'use client';

import Image from 'next/image';
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

        // 1) Flujo recomendado por Supabase: token_hash + type=recovery
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

        // 2) Flujo alternativo (PKCE): code
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

        setStatus('error');
        setMsg('Enlace inválido o incompleto. Solicita un nuevo restablecimiento desde la app.');
        setReady(false);
      } catch (e: any) {
        setStatus('error');
        setMsg('Ocurrió un error al procesar el enlace. Intenta nuevamente.');
        setReady(false);
      }
    })();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;

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
      setMsg(`No se pudo actualizar la contraseña: ${error.message}`);
      return;
    }

    setStatus('success');
    setMsg('Contraseña actualizada con éxito. Ya puedes iniciar sesión en la app.');
  };

  return (
    <main className="min-h-screen bg-[var(--ljl-dark)] text-white grid place-items-center px-6 py-10">
      <section className="w-full max-w-lg rounded-3xl bg-white/10 p-7 ring-1 ring-white/15 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15">
            <Image
              src="/brand/Logo_app.png"
              alt="LJL – CoLive"
              width={96}
              height={96}
              className="h-full w-full object-contain p-1"
              priority
            />
          </div>
          <div>
            <p className="text-xs text-white/70">LJL – CoLive</p>
            <h1 className="font-[var(--font-display)] text-xl font-semibold">Restablecer contraseña</h1>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
          <p className="text-sm text-white/85">{msg}</p>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <label className="block text-sm text-white/80">
            Nueva contraseña
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              disabled={!ready || status === 'loading' || status === 'success'}
              className="mt-2 w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder:text-white/40 ring-1 ring-white/15 outline-none focus:ring-2 focus:ring-[var(--ljl-gold)]"
            />
          </label>

          <button
            type="submit"
            disabled={!ready || status === 'loading' || status === 'success'}
            className="w-full rounded-xl bg-[var(--ljl-gold)] px-4 py-3 text-sm font-semibold text-[var(--ljl-dark)] hover:brightness-110 disabled:opacity-50"
          >
            Actualizar contraseña
          </button>
        </form>

        <footer className="mt-6 border-t border-white/10 pt-4 text-xs text-white/60 flex items-center justify-between">
          <span>© {year} LJL – CoLive</span>
          <span>Soporte de acceso</span>
        </footer>
      </section>
    </main>
  );
}
