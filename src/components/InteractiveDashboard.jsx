import { useState, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts'
import { useLanguage } from '../i18n/LanguageContext.jsx'


const DATASET_META = [
  { id: 'clasificacion', color: '#e879f9', type: 'bar', data: [{ name: 'LANGDETECT', valor: 95.4 }, { name: 'Naive Bayes', valor: 97.8 }] },
  { id: 'traduccion', color: '#a78bfa', type: 'radial', gaugeValue: 60, gaugeLabel: '-60%' },
  { id: 'riesgo', color: '#818cf8', type: 'radial', gaugeValue: 40, gaugeLabel: '-40%' },
  { id: 'procesamiento', color: '#2dd4bf', type: 'radial', gaugeValue: 30, gaugeLabel: '+30%' },
]

const PUBLICACION_URL = 'https://publications.waset.org/abstracts/193560/detecting-indigenous-languages-a-system-for-maya-text-profiling-and-machine-learning-classification-techniques'

function CustomTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-fuchsia-500/20 bg-[#150f28] px-3 py-2 shadow-lg shadow-black/40">
      <p className="font-mono text-[11px] text-purple-300/70">{label}</p>
      <p className="font-mono text-sm font-semibold text-fuchsia-300">
        {payload[0].value} <span className="text-purple-400/60">{unit}</span>
      </p>
    </div>
  )
}

function GaugeChart({ dataset }) {
  const gaugeData = [{ name: dataset.id, value: dataset.gaugeValue, fill: dataset.color }]
  return (
    <div className="relative h-64 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="72%" outerRadius="100%" data={gaugeData} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} angleAxisId={0} />
          <RadialBar background={{ fill: 'rgba(139,92,246,0.08)' }} dataKey="value" cornerRadius={12} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{dataset.gaugeLabel}</span>
        <span className="mt-1 max-w-[180px] text-center font-mono text-[11px] text-purple-300/60">{dataset.gaugeCaption}</span>
      </div>
    </div>
  )
}

export default function InteractiveDashboard() {
  const { t } = useLanguage()
  const dtxt = t.dashboardData
  const kpis = dtxt.kpis

  // Combina la estructura (colores/valores) con el texto del idioma activo
  const dashboardDatasets = useMemo(
    () => DATASET_META.map((meta) => ({ ...meta, ...dtxt.datasets[meta.id] })),
    [dtxt],
  )

  const [activeId, setActiveId] = useState(dashboardDatasets[0].id)
  const active = useMemo(
    () => dashboardDatasets.find((d) => d.id === activeId) ?? dashboardDatasets[0],
    [activeId, dashboardDatasets],
  )

  return (
    <div className="rounded-2xl border border-purple-950/50 bg-[#0b0816]/90 p-6 backdrop-blur-sm md:p-8">
      {/* KPIs */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-purple-950/50 bg-purple-950/10 p-4 transition-colors hover:border-fuchsia-500/30">
            <p className="font-mono text-[11px] uppercase tracking-wide text-purple-300/50">{kpi.label}</p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">{kpi.value}</span>
              <span className="font-mono text-xs text-emerald-400">{kpi.delta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selector de dataset */}
      <div className="mb-6 flex flex-wrap gap-2">
        {dashboardDatasets.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveId(d.id)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all ${
              activeId === d.id
                ? 'border-fuchsia-500/60 bg-fuchsia-500/10 text-fuchsia-300'
                : 'border-purple-950/60 text-purple-300/60 hover:border-purple-700/60 hover:text-purple-200'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Gráfico: barras para comparación de modelos, gauge para métricas de mejora */}
      {active.type === 'bar' ? (
        <div className="h-64 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={active.data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 6" stroke="rgba(139,92,246,0.12)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#c4b5fd', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace' }} axisLine={{ stroke: 'rgba(139,92,246,0.2)' }} tickLine={false} />
              <YAxis tick={{ fill: '#c4b5fd', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace' }} axisLine={false} tickLine={false} width={40} domain={[90, 100]} />
              <Tooltip content={<CustomTooltip unit={active.unit} />} cursor={{ fill: 'rgba(232,121,249,0.06)' }} />
              <Bar dataKey="valor" fill={active.color} radius={[6, 6, 0, 0]} maxBarSize={64} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <GaugeChart dataset={active} />
      )}

      <p className="mt-4 text-center font-mono text-[11px] text-purple-400/40">
        {dtxt.footerPre}{' '}
        <a href={PUBLICACION_URL} target="_blank" rel="noreferrer" className="text-purple-300/70 underline hover:text-fuchsia-300">
          {dtxt.footerLink}
        </a>.
      </p>
    </div>
  )
}
