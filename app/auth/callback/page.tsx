'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function CallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  // Ajusta estos valores a tu app real (Android package / scheme)
  const scheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'ljlcolive';
  const androidPackage = process.env.NEXT_PUBLIC_ANDROID_PACKAGE || 'com.example.am_proyectofinal_ljl';

  const intentLink = useMemo(
    () =>
      `intent://auth/callback?confirmed=1#Intent;scheme=${scheme};package=${androidPackage};end;`,
    [scheme, androidPackage]
  );
  const deepLink = useMemo(() => `${scheme}://auth/callback?confirmed=1`, [scheme]);

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

        // Redirección a la app móvil
        window.location.href = intentLink;
        setTimeout(() => {
          window.location.href = deepLink;
        }, 700);
      } catch {
        setStatus('error');
      }
    })();
  }, [deepLink, intentLink]);

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
            <h1 className="font-[var(--font-display)] text-xl font-semibold">Confirmación de cuenta</h1>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
          {status === 'loading' && (
            <p className="text-white/80">Procesando autenticación…</p>
          )}
          {status === 'success' && (
            <p className="text-white/90">
              ¡Listo! Tu cuenta fue confirmada. Estamos abriendo la app…
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-200">
              No se pudo confirmar la cuenta. Verifica el enlace o intenta nuevamente desde la app.
            </p>
          )}
        </div>

        <p className="mt-4 text-xs text-white/60">
          Si la app no se abre automáticamente, vuelve a la aplicación e inicia sesión.
        </p>
      </section>
    </main>
  );
}
