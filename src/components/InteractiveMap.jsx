import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const MAX_FILAS = 10
const CENTRO_PENINSULA = [19.8, -89.2]

// Estructura language-independiente (lat/lon/valor); la "nota" se resuelve
// por idioma desde translations.js usando la etiqueta como llave.
const HABLANTES_MAYA_2020 = [
  { etiqueta: 'Yucatán', valor: 482667, lat: 20.9674, lon: -89.5926 },
  { etiqueta: 'Quintana Roo', valor: 190446, lat: 18.5001, lon: -88.2961 },
  { etiqueta: 'Campeche', valor: 84510, lat: 19.8454, lon: -90.5237 },
]

const EJEMPLO_CSV = `valor1,valor2,lat,lon
Mérida,120,20.9674,-89.5926
Valladolid,85,20.6896,-88.2016
Tizimín,60,21.1436,-88.1477`

const aNumero = (s) => (s === undefined || s.trim() === '' ? NaN : Number(s))

function parsearCSV(texto, msgs) {
  const lineas = texto.trim().split(/\r?\n/).filter((l) => l.trim())
  if (!lineas.length) return { filas: [], errores: [msgs.vacio] }

  const sep = lineas[0].includes(';') ? ';' : ','
  const tieneEncabezado = Number.isNaN(aNumero(lineas[0].split(sep)[2]))
  const cuerpo = tieneEncabezado ? lineas.slice(1) : lineas

  const filas = []
  const errores = []
  cuerpo.forEach((linea, i) => {
    const [etiqueta, valorTxt, latTxt, lonTxt] = linea.split(sep).map((s) => s?.trim())
    const valor = aNumero(valorTxt)
    const lat = aNumero(latTxt)
    const lon = aNumero(lonTxt)
    const n = i + (tieneEncabezado ? 2 : 1)

    if (!etiqueta || [valor, lat, lon].some(Number.isNaN)) {
      errores.push(msgs.filaInvalida(n))
    } else if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      errores.push(msgs.fueraDeRango(n))
    } else {
      filas.push({ etiqueta, valor, lat, lon })
    }
  })

  if (filas.length > MAX_FILAS) errores.push(msgs.truncado(MAX_FILAS))
  return { filas: filas.slice(0, MAX_FILAS), errores }
}

const radio = (valor, max) => 6 + 22 * Math.sqrt(Math.max(valor, 0) / (max || 1))

function AjustarVista({ puntos }) {
  const map = useMap()
  useEffect(() => {
    if (!puntos.length) return
    if (puntos.length === 1) map.setView([puntos[0].lat, puntos[0].lon], 10)
    else map.fitBounds(puntos.map((p) => [p.lat, p.lon]), { padding: [40, 40] })
  }, [puntos, map])
  return null
}

export default function InteractiveMap() {
  const { t } = useLanguage()
  const mtxt = t.mapaData

  const [activo, setActivo] = useState(false)
  const [modo, setModo] = useState('maya')
  const [textoCSV, setTextoCSV] = useState(EJEMPLO_CSV)
  const [filasPropias, setFilasPropias] = useState([])
  const [errores, setErrores] = useState([])

  const puntosMaya = useMemo(
    () => HABLANTES_MAYA_2020.map((p) => ({ ...p, nota: mtxt.sitiosNotas[p.etiqueta] })),
    [mtxt],
  )
  const puntos = modo === 'maya' ? puntosMaya : filasPropias
  const color = modo === 'maya' ? '#e879f9' : '#2dd4bf'
  const max = useMemo(() => Math.max(...puntos.map((p) => p.valor), 1), [puntos])

  const procesar = (texto) => {
    const { filas, errores } = parsearCSV(texto, mtxt.errores)
    setFilasPropias(filas)
    setErrores(errores)
  }

  const subirArchivo = (e) => {
    const archivo = e.target.files?.[0]
    if (!archivo) return
    const lector = new FileReader()
    lector.onload = () => {
      const texto = String(lector.result)
      setTextoCSV(texto)
      procesar(texto)
    }
    lector.readAsText(archivo)
    e.target.value = ''
  }

  const botonModo = (id, texto) => (
    <button
      onClick={() => setModo(id)}
      className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all ${
        modo === id
          ? 'border-fuchsia-500/60 bg-fuchsia-500/10 text-fuchsia-300'
          : 'border-purple-950/60 text-purple-300/60 hover:border-purple-700/60 hover:text-purple-200'
      }`}
    >
      {texto}
    </button>
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-purple-950/50 bg-[#0b0816]/90 backdrop-blur-sm">
      <div className="flex flex-wrap gap-2 px-6 pt-5">
        {botonModo('maya', mtxt.modos.maya)}
        {botonModo('propios', mtxt.modos.propios)}
      </div>

      {modo === 'propios' && (
        <div className="grid gap-3 px-6 pt-4">
          <p className="font-mono text-[11px] text-purple-300/60">{mtxt.csvFormato(MAX_FILAS)}</p>
          <textarea
            value={textoCSV}
            onChange={(e) => setTextoCSV(e.target.value)}
            rows={5}
            spellCheck={false}
            className="w-full rounded-xl border border-purple-950/60 bg-[#07050f] p-3 font-mono text-xs text-purple-100 outline-none focus:border-fuchsia-500/50"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => procesar(textoCSV)} className="rounded-full border border-teal-400/50 bg-teal-400/10 px-4 py-1.5 font-mono text-xs text-teal-200 hover:bg-teal-400/20">
              {mtxt.btnMostrar}
            </button>
            <label className="cursor-pointer rounded-full border border-purple-950/60 px-4 py-1.5 font-mono text-xs text-purple-300/70 hover:border-purple-700/60">
              {mtxt.btnSubir}
              <input type="file" accept=".csv,text/csv" onChange={subirArchivo} className="hidden" />
            </label>
          </div>
          {errores.length > 0 && (
            <ul className="space-y-0.5 font-mono text-[11px] text-rose-300/80">
              {errores.map((err) => <li key={err}>• {err}</li>)}
            </ul>
          )}
        </div>
      )}

      <div className="relative mt-4 h-80 w-full sm:h-96" onClick={() => setActivo(true)} onMouseLeave={() => setActivo(false)}>
        <MapContainer center={CENTRO_PENINSULA} zoom={7} scrollWheelZoom={activo} className="h-full w-full" style={{ background: '#0b0816' }}>
          <TileLayer
  attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
/>
          <AjustarVista puntos={puntos} />
          {puntos.map((p, i) => (
            <CircleMarker key={`${p.etiqueta}-${i}`} center={[p.lat, p.lon]} radius={radio(p.valor, max)} pathOptions={{ color, fillColor: color, fillOpacity: 0.35, weight: 1.5 }}>
              <Popup>
                <p className="font-semibold text-fuchsia-200">{p.etiqueta}</p>
                <p className="text-xs text-purple-200/80">
                  {p.valor.toLocaleString()} {modo === 'maya' ? mtxt.popupSufijo : ''}
                </p>
                {p.nota && <p className="text-[11px] text-purple-300/60">{p.nota}</p>}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {!activo && (
          <button onClick={() => setActivo(true)} className="absolute inset-0 z-[500] flex items-center justify-center bg-[#07050f]/30 font-mono text-xs text-purple-100 backdrop-blur-[1px] transition-opacity hover:bg-[#07050f]/20">
            <span className="rounded-full border border-fuchsia-500/30 bg-[#150f28]/90 px-4 py-2">{mtxt.overlay}</span>
          </button>
        )}
      </div>

      <p className="px-6 pb-5 pt-4 text-center font-mono text-[11px] text-purple-400/40">
        {modo === 'maya' ? (
          <>
            {mtxt.footerFuente}{' '}
            <a
              href="https://www.lajornadamaya.mx/nacional/259176/la-peninsula-de-yucatan-concentra-la-mayor-parte-de-la-poblacion-mayahablante-del-pais-inegi-dia-internacional-de-las-lenguas-maternas-21-de-febrero"
              target="_blank" rel="noreferrer" className="text-purple-300/70 underline hover:text-fuchsia-300"
            >
              {mtxt.footerFuenteLink}
            </a>
            {mtxt.footerFuentePost}
          </>
        ) : (
          mtxt.footerPrivacidad
        )}
      </p>
    </div>
  )
}
