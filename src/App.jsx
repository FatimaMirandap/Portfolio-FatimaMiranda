import { lazy, Suspense, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './components/Reveal.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import ParallaxBackground from './components/ParallaxBackground.jsx'
import PipelineShowcase from './components/PipelineShowcase.jsx'
import TornDivider from './components/TornDivider.jsx'
import MagneticButton from './components/MagneticButton.jsx'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext.jsx'
// Carga diferida: Recharts y Leaflet son librerías pesadas que solo hacen
// falta cuando el usuario llega al Laboratorio.
const InteractiveDashboard = lazy(() => import('./components/InteractiveDashboard.jsx'))
const InteractiveMap = lazy(() => import('./components/InteractiveMap.jsx'))

/* ============================================================================
   ENLACES VERIFICADOS — no cambian con el idioma
   ============================================================================ */
const LINKS = {
  linkedin: 'https://www.linkedin.com/in/fatimamirandaa/',
  github: 'https://github.com/FatimaMirandap',
  publicacion: 'https://publications.waset.org/abstracts/193560/detecting-indigenous-languages-a-system-for-maya-text-profiling-and-machine-learning-classification-techniques',
  giltia: 'https://giltia.github.io/es/post/',
  peekenos: 'https://peekenos.web.app/',
  aws: 'https://www.credly.com/badges/129d6ddf-5932-48d9-a36b-87b84ae382b3/linked_in_profile',
  itep: 'https://www.iteptest.com/reports/certificate.php?c=4r5mzYh',
  toefl: 'https://drive.google.com/file/d/16U2aKLvFevf8p8dAGd2NJYpzW_kF96mM/view?usp=sharing',
}

// Mapea el id de "enlace" de cada experiencia y logro a su URL real
const ENLACE_URL = { giltia: LINKS.giltia, peekenos: LINKS.peekenos, 'centrogeo-ds': LINKS.publicacion }

const BASE = import.meta.env.BASE_URL
const CV_FILES = {
  es: `${BASE}cv/CV_FATIMAMIRANDA.pdf`,
  en: `${BASE}cv/Resume_FatimaMiranda.pdf`,
}

/* ============================================================================
   ÍCONOS
   ============================================================================ */
function IconLink({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
    </svg>
  )
}

const CATEGORY_ICON_PATHS = {
  'data-analyst': (<><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></>),
  'data-engineer': (<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />),
  'data-scientist': (<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />),
  'cloud-web': (<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />),
  nlp: (<path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />),
  geoespacial: (<><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" /></>),
  geointeligencia: (<path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12s2.015 9 4.5 9Zm-9-9h18" />),
  optimizacion: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
}

function CategoryIcon({ type, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      {CATEGORY_ICON_PATHS[type]}
    </svg>
  )
}

/* ============================================================================
   TOGGLE DE IDIOMA
   ============================================================================ */
function LanguageToggle() {
  const { lang, toggle } = useLanguage()
  return (
    <button
      onClick={toggle}
      aria-label="Cambiar idioma / Switch language"
      className="inline-flex items-center gap-1 rounded-full border border-purple-900/50 bg-purple-950/20 px-3 py-1.5 font-mono text-xs text-purple-200 transition-all hover:border-fuchsia-500 hover:text-fuchsia-400"
    >
      <span className={lang === 'es' ? 'text-fuchsia-400' : ''}>ES</span>
      <span className="text-purple-500/40">/</span>
      <span className={lang === 'en' ? 'text-fuchsia-400' : ''}>EN</span>
    </button>
  )
}

/* ============================================================================
   NAVEGACIÓN
   ============================================================================ */
function Nav() {
  const { t } = useLanguage()
  const NAV_LINKS = [
    { href: '#inicio', label: t.nav.inicio },
    { href: '#stack', label: t.nav.stack },
    { href: '#experiencias', label: t.nav.experiencias },
    { href: '#laboratorio', label: t.nav.laboratorio },
    { href: '#logros', label: t.nav.logros },
    { href: '#cv', label: t.nav.cv },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-purple-950/40 bg-[#07050f]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#inicio" className="text-sm font-bold tracking-tight text-white transition-colors hover:text-fuchsia-400">
          fátima.miranda<span className="text-fuchsia-400">_</span>
        </a>
        <nav className="hidden gap-7 font-mono text-xs uppercase tracking-widest text-purple-300/70 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-fuchsia-400 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-fuchsia-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href={LINKS.linkedin} target="_blank" rel="noreferrer"
            className="shine-on-hover hidden items-center gap-1.5 rounded-full border border-purple-900/50 bg-purple-950/20 px-4 py-1.5 font-mono text-xs text-purple-200 transition-all hover:border-fuchsia-500 hover:text-fuchsia-400 md:inline-flex"
          >
            {t.nav.disponibilidad}
          </a>
        </div>
      </div>
    </header>
  )
}

/* ============================================================================
   1. PRESENTACIÓN
   ============================================================================ */
const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
const heroItem = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }

function Hero() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="inicio" className="relative overflow-hidden py-20 md:py-32">
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 animate-float-slow rounded-full bg-fuchsia-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 animate-float-slower rounded-full bg-violet-600/10 blur-[120px]" />

      <motion.div variants={heroContainer} initial={shouldReduceMotion ? 'show' : 'hidden'} animate="show" className="relative mx-auto max-w-6xl px-6 md:px-10">
        <motion.div variants={heroItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 px-3 py-1 font-mono text-xs tracking-wide text-fuchsia-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400" />
          {t.hero.badge}
        </motion.div>

        <motion.h1 variants={heroItem} className="max-w-4xl text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
          {t.hero.tituloPre}
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            {t.hero.tituloGradiente}
          </span>
          {t.hero.tituloPost}
        </motion.h1>

        <motion.p variants={heroItem} className="mt-6 max-w-2xl text-base leading-relaxed text-purple-200/70 md:text-lg">
          {t.hero.parrafo}
        </motion.p>

        <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton as="a" href={LINKS.linkedin} target="_blank" rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-950/50 transition-all hover:scale-[1.02] hover:brightness-110">
            {t.hero.btnLinkedin}
            <IconLink className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </MagneticButton>
          <MagneticButton as="a" href="#cv"
            className="group inline-flex items-center gap-2 rounded-xl border border-purple-900/60 bg-[#110e22]/40 px-6 py-3 font-mono text-sm text-purple-200 transition-colors hover:border-fuchsia-500 hover:text-fuchsia-400">
            {t.hero.btnCV}
          </MagneticButton>
          <MagneticButton as="a" href={LINKS.github} target="_blank" rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-purple-900/60 bg-[#110e22]/40 px-6 py-3 font-mono text-sm text-purple-200 transition-colors hover:border-fuchsia-500 hover:text-fuchsia-400">
            {t.hero.btnGithub}
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-12 max-w-3xl md:mb-16">
      <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-400">{eyebrow}</p>
      <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-purple-200/60">{description}</p>}
    </div>
  )
}

/* ============================================================================
   2. STACK
   ============================================================================ */
function ExpertiseBlock({ title, description, accent, groups }) {
  const isFuchsia = accent === 'fuchsia'
  const accentClasses = isFuchsia
    ? { icon: 'border border-fuchsia-800/30 bg-fuchsia-950/40 text-fuchsia-400', tag: 'border-fuchsia-950 bg-fuchsia-950/20 text-fuchsia-300' }
    : { icon: 'border border-violet-800/30 bg-violet-950/40 text-violet-400', tag: 'border-purple-950 bg-purple-950/20 text-purple-300' }

  return (
    <div className="p-8 transition-all hover:bg-purple-950/5 md:p-10">
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="mb-8 text-sm leading-relaxed text-purple-300/50">{description}</p>
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.id} className="group/item">
            <div className="mb-3 flex items-center gap-3">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform group-hover/item:scale-110 ${accentClasses.icon}`}>
                <CategoryIcon type={group.id} />
              </span>
              <h4 className="text-sm font-semibold text-purple-100 transition-colors group-hover/item:text-white">{group.titulo}</h4>
            </div>
            <div className="flex flex-wrap gap-2 pl-11">
              {group.items.map((item) => (
                <span key={item} className={`rounded-lg border px-2.5 py-1 font-mono text-xs transition-colors hover:border-purple-500/30 ${accentClasses.tag}`}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StackSection() {
  const { t } = useLanguage()
  return (
    <section id="stack" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow={t.stackSection.eyebrow} title={t.stackSection.titulo} description={t.stackSection.descripcion} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-purple-950/50 bg-purple-950/20 backdrop-blur-sm lg:grid-cols-2">
            <div className="bg-[#0b0816]/90">
              <ExpertiseBlock title={t.stackSection.bloqueHerramientas.titulo} description={t.stackSection.bloqueHerramientas.descripcion} accent="fuchsia" groups={t.stackPorRol} />
            </div>
            <div className="bg-[#0b0816]/90">
              <ExpertiseBlock title={t.stackSection.bloqueTecnicas.titulo} description={t.stackSection.bloqueTecnicas.descripcion} accent="violet" groups={t.tecnicas} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================================
   3. EXPERIENCIAS — línea de tiempo horizontal
   ============================================================================ */
function ExperienceCard({ project }) {
  const url = ENLACE_URL[project.id]
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-purple-950/40 bg-[#100c20]/40 p-6 transition-all duration-500 hover:border-fuchsia-500/30 hover:bg-[#120e26]/60">
      <div className="mb-2 flex flex-col gap-2">
        <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-fuchsia-300">{project.nombre}</h3>
        <span className="w-fit shrink-0 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-fuchsia-400">{project.periodo}</span>
      </div>
      <p className="mb-4 font-mono text-[11px] font-semibold text-purple-300/60">{project.organizacion}</p>
      <p className="mb-4 border-l-2 border-purple-900/50 pl-3 text-xs leading-relaxed text-purple-200/70">{project.rol}</p>
      <ul className="mb-6 space-y-2.5">
        {project.aportes.map((aporte) => (
          <li key={aporte} className="flex gap-2.5 text-xs leading-relaxed text-purple-100">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500" />
            <span>{aporte}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-purple-950/30 pt-3">
        {project.tecnologias.map((tec) => <span key={tec} className="rounded-lg border border-fuchsia-500/20 bg-fuchsia-500/5 px-2 py-0.5 font-mono text-[10px] font-medium text-fuchsia-300">{tec}</span>)}
        {project.tecnicas.map((tec) => <span key={tec} className="rounded-lg border border-dashed border-purple-800/60 bg-purple-950/10 px-2 py-0.5 font-mono text-[10px] text-purple-300">{tec}</span>)}
        {project.enlace && url && (
          <a href={url} target="_blank" rel="noreferrer" className="mt-1 inline-flex w-full items-center gap-1 font-mono text-[11px] text-fuchsia-300 underline-offset-4 hover:underline">
            {project.enlace.label}
            <IconLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </article>
  )
}

function TimelineDot({ isLatest }) {
  return (
    <span
      className={`absolute left-1/2 top-0 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-[#07050f] ${
        isLatest ? 'animate-pulse bg-fuchsia-400' : 'bg-gradient-to-br from-fuchsia-500 to-purple-600'
      }`}
      style={{ boxShadow: isLatest ? '0 0 10px 3px rgba(232,121,249,0.6)' : '0 0 6px 1px rgba(168,85,247,0.35)' }}
    />
  )
}

function ExperiencesSection() {
  const { t } = useLanguage()
  return (
    <section id="experiencias" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow={t.experienciasSection.eyebrow} title={t.experienciasSection.titulo} description={t.experienciasSection.descripcion} />
        </Reveal>

        <p className="mb-4 font-mono text-[11px] text-purple-400/50 md:hidden">← Desliza para ver más →</p>

        <div className="relative">
          {/* Degradados que insinúan que hay más contenido a los lados */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[#07050f] to-transparent md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[#07050f] to-transparent md:w-16" />

          <div className="scrollbar-thin overflow-x-auto pb-8 pt-8">
            <div className="relative inline-flex w-max gap-6 px-4">
              {/* Riel horizontal — atraviesa todo el ancho real del contenido, no solo lo visible */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-fuchsia-500/60 via-purple-600/30 to-transparent" />

              {t.experiencias.map((project, index) => (
                <Reveal key={project.id} delay={Math.min(index * 0.06, 0.24)}>
                  <div className="relative w-[300px] pt-6 sm:w-[340px]">
                    <TimelineDot isLatest={index === 0} />
                    <ExperienceCard project={project} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   4. LABORATORIO
   ============================================================================ */
function LabBlockHeading({ eyebrow, title, description, tags }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">{eyebrow}</p>
        <h3 className="text-lg font-bold text-white md:text-xl">{title}</h3>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-purple-300/55">{description}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-1.5">
        {tags.map((tag) => <span key={tag} className="rounded-full border border-purple-800/50 bg-purple-950/20 px-2.5 py-1 font-mono text-[10px] text-purple-300">{tag}</span>)}
      </div>
    </div>
  )
}

function LabShowcase() {
  const { t } = useLanguage()
  const LabSkeleton = ({ heightClass = 'h-72' }) => (
    <div className={`animate-pulse rounded-2xl border border-purple-950/50 bg-purple-950/10 ${heightClass}`}>
      <div className="flex h-full items-center justify-center">
        <span className="font-mono text-xs text-purple-400/40">{t.laboratorio.cargando}</span>
      </div>
    </div>
  )

  return (
    <section id="laboratorio" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-96 w-96 -translate-y-1/2 animate-float-slower rounded-full bg-violet-600/5 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow={t.laboratorio.eyebrow} title={t.laboratorio.titulo} description={t.laboratorio.descripcion} />
        </Reveal>
        <div className="space-y-16">
          <Reveal delay={0.05}>
            <div>
              <LabBlockHeading {...t.laboratorio.dashboard} />
              <Suspense fallback={<LabSkeleton heightClass="h-[420px]" />}>
                <InteractiveDashboard />
              </Suspense>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <LabBlockHeading {...t.laboratorio.mapa} />
              <Suspense fallback={<LabSkeleton heightClass="h-[430px]" />}>
                <InteractiveMap />
              </Suspense>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <LabBlockHeading {...t.laboratorio.pipeline} />
              <PipelineShowcase />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   5. LOGROS
   ============================================================================ */
function AchievementsSection() {
  const { t } = useLanguage()
  return (
    <section id="logros" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal><SectionHeading eyebrow={t.logrosSection.eyebrow} title={t.logrosSection.titulo} /></Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-purple-950/60 bg-purple-950/30 sm:grid-cols-3">
            {t.logros.map((logro) => {
              const url = logro.urlKey && LINKS[logro.urlKey]
              const contenido = (
                <>
                  <p className={`text-2xl font-bold ${logro.color}`}>{logro.valor}</p>
                  <p className="mt-1 text-xs leading-snug text-purple-300/60">{logro.texto}</p>
                  {url && <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] text-purple-300/50 group-hover:text-fuchsia-300">{t.logrosSection.verCredencial} <IconLink className="h-3 w-3" /></span>}
                </>
              )
              return url ? (
                <a key={logro.texto} href={url} target="_blank" rel="noreferrer" className="group bg-[#0b0816]/90 p-6 transition-colors hover:bg-[#120e26]/90">{contenido}</a>
              ) : (
                <div key={logro.texto} className="bg-[#0b0816]/90 p-6">{contenido}</div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================================
   6. VISOR DE CV
   ============================================================================ */
function ResumeSection() {
  const { t } = useLanguage()
  const [idioma, setIdioma] = useState('es')
  const src = CV_FILES[idioma]

  return (
    <section id="cv" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow={t.cvSection.eyebrow} title={t.cvSection.titulo} description={t.cvSection.descripcion} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-purple-950/50 bg-[#0b0816]/90">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-950/50 px-5 py-4">
              <div className="flex gap-2" role="tablist" aria-label="Idioma del CV / Resume language">
                {Object.entries(CV_FILES).map(([id]) => (
                  <button key={id} role="tab" aria-selected={idioma === id} onClick={() => setIdioma(id)}
                    className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all ${idioma === id ? 'border-fuchsia-500/60 bg-fuchsia-500/10 text-fuchsia-300' : 'border-purple-950/60 text-purple-300/60 hover:border-purple-700/60 hover:text-purple-200'}`}>
                    {t.cvSection.idiomas[id]}
                  </button>
                ))}
                <span className="self-center rounded-full border border-teal-400/30 bg-teal-400/5 px-2.5 py-1 font-mono text-[10px] text-teal-200">{t.cvSection.badge}</span>
              </div>
              <div className="flex gap-2">
                <a href={src} target="_blank" rel="noreferrer" className="rounded-full border border-purple-900/60 px-4 py-1.5 font-mono text-xs text-purple-200 hover:border-fuchsia-500 hover:text-fuchsia-300">{t.cvSection.abrir}</a>
                <a href={src} download className="rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-4 py-1.5 font-mono text-xs text-white hover:brightness-110">{t.cvSection.descargar}</a>
              </div>
            </div>
            <iframe key={src} src={`${src}#view=FitH`} title="CV" className="hidden h-[80vh] w-full bg-white md:block" />
            <div className="p-8 text-center md:hidden">
              <p className="text-sm text-purple-200/70">{t.cvSection.notaMovil}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-[#04030a] px-6 py-12 text-center font-mono text-xs text-purple-400/40">
      © {new Date().getFullYear()} Fátima Miranda Pestaña. {t.footer}
    </footer>
  )
}

/* ============================================================================
   APP
   ============================================================================ */
function AppContent() {
  return (
    <div className="min-h-screen font-sans text-purple-100 antialiased selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
      <ParallaxBackground />
      <div className="relative z-[1]">
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <TornDivider color="#120b22" variant={0} />
          <StackSection />
          <TornDivider color="#170f29" variant={1} flip />
          <ExperiencesSection />
          <TornDivider color="#120b22" variant={0} flip />
          <LabShowcase />
          <TornDivider color="#170f29" variant={1} />
          <AchievementsSection />
          <TornDivider color="#120b22" variant={0} flip />
          <ResumeSection />
        </main>
        <TornDivider color="#0a0712" variant={1} />
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}