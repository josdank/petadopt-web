"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const DOWNLOAD_URL = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || "#";
const PUBLISHED_URL = process.env.NEXT_PUBLIC_APP_PUBLISHED_URL || "#";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.085, delayChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.965 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease } },
};

export default function HomeAnimated() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="min-h-screen">
      {/* ===== HEADER STICKY (NAV) ===== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--ljl-dark)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          {/* Logo + Nombre */}
          <a href="#inicio" className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/15">
              <Image
                src="/brand/Logo_app.png"
                alt="LJL – CoLive"
                width={80}
                height={80}
                className="h-full w-full object-contain p-1"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className="font-[var(--font-display)] text-sm font-semibold tracking-tight text-white">
                LJL – CoLive
              </div>
              <div className="text-[11px] text-white/70">Comparte · Vive · Conecta</div>
            </div>
          </a>

          {/* Menú */}
          <nav className="hidden items-center gap-5 md:flex">
            <a href="#inicio" className="text-sm font-semibold text-white/80 hover:text-white">
              Inicio
            </a>
            <a href="#proposito" className="text-sm font-semibold text-white/80 hover:text-white">
              Objetivo
            </a>
            <a href="#metricas" className="text-sm font-semibold text-white/80 hover:text-white">
              Métricas
            </a>
            <a href="#como-funciona" className="text-sm font-semibold text-white/80 hover:text-white">
              Cómo funciona
            </a>
            <a href="#faq" className="text-sm font-semibold text-white/80 hover:text-white">
              FAQ
            </a>
          </nav>

          {/* CTA derecha */}
          <div className="flex items-center gap-3">
            <a
              href="#inicio"
              className="hidden rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 sm:inline-flex"
              title="Volver al inicio"
            >
              ↑ Inicio
            </a>

            <a
              href="#descargar"
              className="rounded-xl bg-[var(--ljl-gold)] px-4 py-2 text-xs font-semibold text-[var(--ljl-dark)] shadow-lg shadow-black/20 hover:brightness-110"
            >
              Descargar
            </a>
          </div>
        </div>

        {/* Menú mobile (simple) */}
        <div className="mx-auto max-w-6xl px-6 pb-3 md:hidden">
          <div className="flex flex-wrap gap-2">
            <MobileLink href="#inicio" label="Inicio" />
            <MobileLink href="#proposito" label="Objetivo" />
            <MobileLink href="#metricas" label="Métricas" />
            <MobileLink href="#como-funciona" label="Cómo funciona" />
            <MobileLink href="#faq" label="FAQ" />
            <MobileLink href="#descargar" label="Descargar" />
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <div id="inicio" className="relative overflow-hidden bg-[var(--ljl-dark)] text-white">
        {/* Background blobs */}
        <div className="absolute inset-0 opacity-35">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease }}
            className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--ljl-teal)] blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.12, ease }}
            className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-[var(--ljl-gold)] blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <motion.div variants={container} initial="hidden" animate="visible">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--ljl-teal)]" />
                Plataforma segura de convivencia compartida
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 font-[var(--font-display)] text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
              >
                Encuentra tu espacio ideal para{" "}
                <span className="text-[var(--ljl-gold)]">compartir</span> con confianza.
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
                LJL – CoLive conecta personas compatibles para vivir en armonía.
                Diseñada con enfoque profesional, verificación y una experiencia centrada en el usuario.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={DOWNLOAD_URL}
                  className="rounded-xl bg-[var(--ljl-gold)] px-5 py-3 text-center text-sm font-semibold text-[var(--ljl-dark)] shadow-lg shadow-black/20 hover:brightness-110"
                >
                  Descargar la app
                </motion.a>

                <motion.a
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href={PUBLISHED_URL}
                  className="rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-semibold ring-1 ring-white/20 hover:bg-white/15"
                >
                  Ver app publicada
                </motion.a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 grid grid-cols-3 gap-3 text-center">
                <MiniValue icon="✔" text="Enfoque en seguridad" />
                <MiniValue icon="🤝" text="Convivencia compatible" />
                <MiniValue icon="📍" text="Búsqueda inteligente" />
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={scaleIn} className="relative">
              <div className="rounded-3xl bg-white/6 p-5 ring-1 ring-white/10">
                <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-4">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      src="/brand/Plantilla_final.png"
                      alt="Identidad LJL – CoLive"
                      width={1200}
                      height={800}
                      className="h-auto w-full rounded-xl object-cover"
                      priority
                    />
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== PROPÓSITO ===== */}
      <section id="proposito" className="mx-auto max-w-6xl px-6 py-16">
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-8 md:grid-cols-3">
          <Card
            title="Objetivo"
            icon="🎯"
            text="Conectar personas compatibles para una convivencia segura, confiable y de calidad, reduciendo el riesgo de malas experiencias al compartir hogar."
          />
          <Card
            title="Misión"
            icon="🚀"
            text="Brindar una plataforma profesional que facilite encontrar compañeros de cuarto mediante verificación, transparencia y tecnología centrada en el usuario."
          />
          <Card
            title="Visión"
            icon="🌍"
            text="Ser la aplicación líder en convivencia compartida, reconocida por su seguridad, autoridad y confianza, elevando el estándar de cómo se comparte un hogar."
          />
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--ljl-dark)]">
                Usuarios primero, siempre.
              </h2>
              <p className="mt-3 text-[color:var(--ljl-dark)]/80 leading-relaxed">
                En LJL – CoLive la confianza no es un extra: es el núcleo.
                Diseñamos la experiencia para que cada usuario se sienta seguro en cada decisión:
                desde la publicación hasta el match y la comunicación.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-3xl bg-[color:var(--ljl-light)] p-8 ring-1 ring-black/5">
              <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--ljl-dark)]">
                Diferenciación
              </h3>
              <ul className="mt-4 space-y-3 text-[color:var(--ljl-dark)]/80">
                <li className="flex gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-[var(--ljl-gold)]/90" />
                  <span><strong>Seriedad y profesionalismo</strong> en la experiencia y comunicación.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-[var(--ljl-teal)]/90" />
                  <span><strong>Confianza</strong> como prioridad: procesos y mensajes claros.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-[var(--ljl-dark)]/90" />
                  <span><strong>Diseño consistente</strong> con identidad visual única.</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== METRICAS ===== */}
      <section id="metricas" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <p className="text-sm font-semibold tracking-wide text-[var(--ljl-teal)]">Validación del mercado</p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--ljl-dark)]">
              Métricas que importan
            </h2>
            <p className="mt-3 max-w-2xl text-black/70">
              Estos números muestran la oportunidad de negocio
              y el valor que podemos generar a gran escala.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <MetricCard label="Publicaciones activas" value={120} suffix="+" note="Demo" />
            <MetricCard label="Usuarios verificados" value={75} suffix="%" note="Proyección" />
            <MetricCard label="Tiempo para match" value={3} suffix=" días" note="Objetivo" />
            <MetricCard label="Reducción de riesgo" value={40} suffix="%" note="Proyección" />
          </div>
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA ===== */}
      <section id="como-funciona" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <Reveal>
            <p className="text-sm font-semibold tracking-wide text-[var(--ljl-teal)]">Enfoque Inicial</p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--ljl-dark)]">
              Un problema real. Una solución profesional.
            </h2>
            <p className="mt-3 max-w-2xl text-black/70">
              Encontrar un compañero de cuarto no debería ser un salto de fe.
              LJL – CoLive estandariza el proceso con claridad, confianza y verificación.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <StepCard step="01" title="Explora" text="Busca opciones y perfiles con información clara y presentación profesional." />
            <StepCard step="02" title="Conecta" text="Envía interés y encuentra coincidencias que tienen sentido para ambos." />
            <StepCard step="03" title="Decide" text="Toma decisiones con confianza y reduce el riesgo al compartir hogar." />
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--ljl-dark)]">
            Preguntas frecuentes
          </h2>
          <p className="mt-2 max-w-2xl text-black/70">
            Respuestas rápidas para usuarios nuevos y para presentar con autoridad.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4">
          <FAQ
            q="¿Qué hace diferente a LJL – CoLive?"
            a="El enfoque profesional centrado en confianza: claridad en la información, consistencia visual y un proceso pensado para minimizar riesgo al compartir hogar."
          />
          <FAQ
            q="¿La web afecta a la app?"
            a="No. La web es una landing informativa y mantiene rutas técnicas necesarias para autenticación y reset de contraseña."
          />
          <FAQ
            q="¿Dónde descargo la aplicación?"
            a="Desde el botón 'Descargar la app' o desde 'Ver app publicada' según dónde la suban."
          />
        </div>
      </section>

      {/* ===== DESCARGAR (anchor) ===== */}
      <section id="descargar" className="bg-[var(--ljl-dark)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <Reveal>
            <div className="rounded-3xl bg-white/8 p-8 ring-1 ring-white/12">
              <h2 className="font-[var(--font-display)] text-3xl font-semibold">
                Listos para vivir mejor, con confianza.
              </h2>
              <p className="mt-3 max-w-2xl text-white/80">
                Descarga la app y conoce una experiencia donde el usuario es prioridad.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={DOWNLOAD_URL}
                  className="rounded-xl bg-[var(--ljl-gold)] px-6 py-3 text-center text-sm font-semibold text-[var(--ljl-dark)] hover:brightness-110"
                >
                  Descargar la app
                </motion.a>
                <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={PUBLISHED_URL}
                  className="rounded-xl bg-white/10 px-6 py-3 text-center text-sm font-semibold ring-1 ring-white/20 hover:bg-white/15"
                >
                  Ver app publicada
                </motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-black/70">
            © {year} <span className="font-semibold text-[var(--ljl-dark)]">LJL – CoLive</span>. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* -------------------- UI Helpers -------------------- */

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
    >
      {label}
    </a>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
    >
      {children}
    </motion.div>
  );
}

function MiniValue({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
      <div className="text-2xl font-semibold">{icon}</div>
      <div className="mt-1 text-xs text-white/70">{text}</div>
    </div>
  );
}

function Card({ title, text, icon }: { title: string; text: string; icon: string }) {
  return (
    <motion.div variants={fadeUp} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--ljl-light)] text-xl">
          {icon}
        </div>
        <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--ljl-dark)]">{title}</h2>
      </div>
      <p className="mt-3 leading-relaxed text-black/70">{text}</p>
    </motion.div>
  );
}

function StepCard({ step, title, text }: { step: string; title: string; text: string }) {
  return (
    <Reveal>
      <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-[var(--ljl-teal)]">Paso {step}</span>
          <span className="text-xs text-black/40">LJL – CoLive</span>
        </div>
        <h4 className="mt-2 font-[var(--font-display)] text-xl font-semibold text-[var(--ljl-dark)]">{title}</h4>
        <p className="mt-2 text-black/70 leading-relaxed">{text}</p>
      </div>
    </Reveal>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <motion.details
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group rounded-2xl bg-white p-6 ring-1 ring-black/5"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[var(--ljl-dark)]">
        <span>{q}</span>
        <span className="ml-4 rounded-full bg-[color:var(--ljl-light)] px-3 py-1 text-xs text-[var(--ljl-dark)] group-open:bg-[var(--ljl-gold)]/20">
          Ver
        </span>
      </summary>
      <p className="mt-3 text-black/70 leading-relaxed">{a}</p>
    </motion.details>
  );
}

/* --------- Animated Metrics --------- */
function MetricCard({
  label,
  value,
  suffix = "",
  note = "Estimación",
}: {
  label: string;
  value: number;
  suffix?: string;
  note?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = mv.on("change", (latest) => setDisplay(Math.round(latest)));
    return () => unsub();
  }, [mv]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.2, ease });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={scaleIn}
      className="rounded-3xl bg-[color:var(--ljl-light)] p-6 ring-1 ring-black/5"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--ljl-dark)]/60">{label}</span>
        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[var(--ljl-dark)] ring-1 ring-black/5">
          {note}
        </span>
      </div>

      <div className="mt-4 font-[var(--font-display)] text-4xl font-semibold text-[var(--ljl-dark)]">
        {display}
        <span className="text-xl font-semibold text-[var(--ljl-dark)]/80">{suffix}</span>
      </div>

      <div className="mt-2 text-sm text-[var(--ljl-dark)]/70">
        Indicador diseñado para presentación y validación del concepto.
      </div>
    </motion.div>
  );
}
