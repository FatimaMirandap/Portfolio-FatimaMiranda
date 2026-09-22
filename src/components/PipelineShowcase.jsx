import { useLanguage } from '../i18n/LanguageContext.jsx'

// Tags por etapa: son nombres de tecnología, iguales en ambos idiomas.
const TAGS_POR_ETAPA = {
  1: ['Facebook', 'Google Drive'],
  2: ['YOLOv3', 'Gemini API', 'Google Maps API'],
  3: ['CSV', 'Data Cleaning'],
  4: ['React + TS', 'Firebase'],
}

function ConectorHorizontal({ delay = 0 }) {
  return (
    <div className="relative mx-1 hidden h-px flex-1 bg-purple-900/50 md:block">
      <span
        className="flow-dot absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-fuchsia-400"
        style={{ animationDelay: `${delay}s`, boxShadow: '0 0 8px 2px rgba(232,121,249,0.65)' }}
      />
    </div>
  )
}

function Tag({ children }) {
  return (
    <span className="rounded-md border border-fuchsia-500/20 bg-fuchsia-500/5 px-2 py-0.5 font-mono text-[10px] text-fuchsia-300">
      {children}
    </span>
  )
}

export default function PipelineShowcase() {
  const { t } = useLanguage()
  const ptxt = t.pipelineData

  return (
    <div className="rounded-2xl border border-purple-950/50 bg-[#0b0816]/90 p-6 backdrop-blur-sm md:p-8">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{ptxt.header}</h3>
        <a href="https://peekenos.web.app/" target="_blank" rel="noreferrer" className="font-mono text-xs text-fuchsia-300 underline-offset-4 hover:underline">
          {ptxt.verApp}
        </a>
      </div>

      {/* Pipeline principal */}
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-0">
        {ptxt.etapas.map((etapa, i) => (
          <div key={etapa.id} className={`flex items-stretch md:items-center ${etapa.funciones ? 'md:flex-[1.4]' : 'flex-1'}`}>
            <div className="flex h-full flex-1 flex-col rounded-xl border border-purple-950/40 bg-purple-950/10 p-5 transition-colors hover:border-fuchsia-500/30">
              <span className="clip-hex mb-3 flex h-9 w-9 items-center justify-center bg-gradient-to-br from-fuchsia-600 to-purple-600 font-mono text-sm font-bold text-white">
                {etapa.id}
              </span>
              <h4 className="mb-1.5 text-sm font-semibold text-white">{etapa.titulo}</h4>
              <p className="mb-4 text-xs leading-relaxed text-purple-300/60">{etapa.descripcion}</p>

              {etapa.funciones && (
                <ul className="mb-4 space-y-1">
                  {etapa.funciones.map((f) => (
                    <li key={f.nombre} className={`flex items-center gap-2 text-xs ${f.enDesarrollo ? 'text-purple-300/50' : 'text-purple-100/80'}`}>
                      <span className={`h-1 w-1 shrink-0 rounded-full ${f.enDesarrollo ? 'border border-amber-300/70' : 'bg-teal-400'}`} />
                      {f.nombre}
                      {f.enDesarrollo && (
                        <span className="rounded-full border border-amber-300/30 bg-amber-300/5 px-1.5 py-px font-mono text-[9px] text-amber-200/80">
                          {ptxt.enDesarrolloTag}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap gap-1.5">
                {TAGS_POR_ETAPA[etapa.id].map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
            </div>
            {i < ptxt.etapas.length - 1 && <ConectorHorizontal delay={i * 0.5} />}
          </div>
        ))}
      </div>

      {/* Roadmap */}
      <div className="mt-6 rounded-xl border border-dashed border-purple-800/50 p-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-purple-400/60">{ptxt.roadmapTitulo}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {ptxt.roadmap.map((r) => (
            <div key={r.titulo} className="flex items-start gap-3">
              <span className="mt-0.5 rounded-full border border-purple-700/50 px-2 py-0.5 font-mono text-[9px] text-purple-300/70">{ptxt.planeado}</span>
              <div>
                <p className="text-sm font-medium text-purple-100/90">{r.titulo}</p>
                <p className="text-xs text-purple-300/50">{r.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
