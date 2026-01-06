'use client';

import React from 'react';

export function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main style={styles.page}>
      <div style={styles.bgGlowA} />
      <div style={styles.bgGlowB} />

      <section style={styles.card}>
        <header style={{ marginBottom: 18 }}>
          <div style={styles.badge}>PetAdopt</div>
          <h1 style={styles.h1}>{title}</h1>
          {subtitle ? <p style={styles.p}>{subtitle}</p> : null}
        </header>

        <div>{children}</div>

        <footer style={styles.footer}>
          <span>© {new Date().getFullYear()} PetAdopt</span>
          <span style={{ opacity: 0.6 }}>Web auxiliar</span>
        </footer>
      </section>
    </main>
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const style = variant === 'primary' ? styles.btnPrimary : styles.btnSecondary;
  return (
    <a href={href} style={style}>
      {children}
    </a>
  );
}

export function StatusPill({
  kind,
  text,
}: {
  kind: 'loading' | 'success' | 'error' | 'info';
  text: string;
}) {
  const base = { ...styles.pill };
  const map: Record<string, React.CSSProperties> = {
    loading: { borderColor: 'rgba(120,120,120,.35)' },
    success: { borderColor: 'rgba(34,197,94,.45)' },
    error: { borderColor: 'rgba(239,68,68,.45)' },
    info: { borderColor: 'rgba(59,130,246,.45)' },
  };
  return <div style={{ ...base, ...map[kind] }}>{text}</div>;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: 20,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    background:
      'radial-gradient(1200px 600px at 20% 10%, rgba(59,130,246,.14), transparent 60%), radial-gradient(1000px 500px at 80% 30%, rgba(34,197,94,.12), transparent 55%), linear-gradient(180deg, #0b1220 0%, #0a0f1a 100%)',
    color: '#e5e7eb',
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlowA: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 9999,
    filter: 'blur(60px)',
    background: 'rgba(59,130,246,.18)',
    top: -180,
    left: -140,
    pointerEvents: 'none',
  },
  bgGlowB: {
    position: 'absolute',
    width: 520,
    height: 520,
    borderRadius: 9999,
    filter: 'blur(70px)',
    background: 'rgba(34,197,94,.16)',
    bottom: -200,
    right: -180,
    pointerEvents: 'none',
  },
  card: {
    width: 'min(560px, 92vw)',
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,.10)',
    background: 'rgba(17,24,39,.72)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 18px 60px rgba(0,0,0,.45)',
    padding: 22,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 10px',
    borderRadius: 9999,
    border: '1px solid rgba(255,255,255,.14)',
    background: 'rgba(255,255,255,.06)',
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    width: 'fit-content',
    marginBottom: 14,
  },
  h1: {
    margin: 0,
    fontSize: 26,
    lineHeight: 1.15,
    letterSpacing: -0.2,
  },
  p: {
    margin: '8px 0 0 0',
    opacity: 0.82,
    lineHeight: 1.5,
  },
  pill: {
    padding: '10px 12px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,.12)',
    background: 'rgba(255,255,255,.06)',
    fontSize: 14,
    lineHeight: 1.4,
    marginBottom: 14,
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 14px',
    borderRadius: 12,
    textDecoration: 'none',
    color: '#0b1220',
    background: 'linear-gradient(180deg, #e5e7eb 0%, #cbd5e1 100%)',
    fontWeight: 600,
    border: '1px solid rgba(255,255,255,.35)',
    width: '100%',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 14px',
    borderRadius: 12,
    textDecoration: 'none',
    color: '#e5e7eb',
    background: 'rgba(255,255,255,.06)',
    fontWeight: 600,
    border: '1px solid rgba(255,255,255,.14)',
    width: '100%',
  },
  footer: {
    marginTop: 18,
    paddingTop: 14,
    borderTop: '1px solid rgba(255,255,255,.08)',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    opacity: 0.8,
  },
};
