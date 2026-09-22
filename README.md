# Portafolio — Fátima Miranda

React + Vite + Tailwind CSS, modo oscuro con paleta Violet/Fuchsia, listo para
GitHub Pages. Incluye transiciones con Framer Motion y un Laboratorio
Interactivo (dashboard, mapa y pipeline) construidos en vivo.

## 1. Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## 2. Qué se agregó en esta iteración

### Transiciones
- **`src/components/Reveal.jsx`** — envuelve cualquier bloque para que aparezca
  con fade + desplazamiento suave al entrar en el viewport (scroll reveal).
  Ya está aplicado a todas las secciones y a cada tarjeta de proyecto.
- **`src/components/ScrollProgress.jsx`** — barra de progreso de scroll fija
  en la parte superior, en degradado fucsia → violeta.
- El Hero tiene una entrada escalonada (stagger) al cargar la página.
- Los orbes de luz del fondo flotan lentamente (`animate-float-slow` /
  `animate-float-slower`, definidas en `src/index.css`).
- Los links del nav tienen un subrayado animado al hacer hover.
- Las tarjetas de proyecto se elevan levemente y ganan un glow sutil al
  pasar el cursor.
- Todo respeta `prefers-reduced-motion`: si el sistema del visitante lo pide,
  las animaciones se desactivan automáticamente.

### Laboratorio Interactivo (`#laboratorio`)
Nueva sección entre "Matriz de Expertise" y "Log de Proyectos", con tres
demos en vivo:

| Componente | Archivo | Qué muestra |
|---|---|---|
| Dashboard | `src/components/InteractiveDashboard.jsx` | KPIs + gráfico de barras (Recharts) con selector de dataset |
| Mapa | `src/components/InteractiveMap.jsx` | Mapa oscuro interactivo (Leaflet) centrado en Yucatán con puntos de muestra |
| Pipeline | `src/components/PipelineShowcase.jsx` | Diagrama de flujo de un pipeline de datos, con conector animado |

**Todos usan datos de muestra claramente marcados.** Busca los comentarios
`👉 INYECTA AQUÍ` dentro de cada archivo para reemplazarlos por datos reales
de un proyecto (métricas de un dashboard real, coordenadas de tu tesis,
pasos de un pipeline que hayas construido, etc.).

El Dashboard y el Mapa se cargan de forma diferida (`React.lazy` +
`Suspense`) porque Recharts y Leaflet son librerías pesadas — así no afectan
el tiempo de carga inicial de la página; se descargan solo cuando el
visitante llega a esa sección.

## 3. Nuevas dependencias

Ya están en `package.json`, `npm install` las instala automáticamente:

- **framer-motion** — animaciones y scroll reveals
- **recharts** — gráficos del dashboard
- **leaflet** + **react-leaflet** — mapa interactivo (usa tiles gratuitos de
  CARTO, sin necesidad de API key)

## 4. Dónde cargar tu información real

Todo el contenido de texto vive en **`src/App.jsx`**, en los arrays
`tecnologias`, `tecnicas` y `proyectos`, más los textos del Hero, Nav y
Footer (busca los comentarios `👉`).

Los datos de las tres demos del Laboratorio viven en sus propios archivos
dentro de `src/components/` (ver tabla arriba).

## 5. Despliegue en GitHub Pages

### Paso 1 — Configura el `base` de Vite
En `vite.config.js`, reemplaza `NOMBRE_DE_TU_REPOSITORIO` por el nombre
exacto de tu repositorio:

```js
base: '/mi-repositorio/',
```

Si tu repo es del tipo `usuario.github.io`, usa `base: '/'`.

### Paso 2 — Despliega con `gh-pages`

```bash
git init
git add .
git commit -m "Portafolio y lab interactivo"
git remote add origin https://github.com/FatimaMirandap/Portfolio-FatimaMiranda.git
git push -u origin main

npm run deploy
```

### Paso 3 — Activa GitHub Pages
**Settings → Pages → Source → Deploy from a branch → `gh-pages` / `root`**.

Tu sitio quedará en: `https://FatimaMirandap.github.io/Portfolio-FatimaMiranda/`

## 6. Estructura del proyecto

```
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Reveal.jsx              ← wrapper de animación scroll-reveal
│   │   ├── ScrollProgress.jsx      ← barra de progreso superior
│   │   ├── InteractiveDashboard.jsx ← demo: dashboard con Recharts
│   │   ├── InteractiveMap.jsx      ← demo: mapa con Leaflet
│   │   └── PipelineShowcase.jsx    ← demo: diagrama de pipeline
│   ├── App.jsx                     ← contenido + maquetación
│   ├── index.css                   ← Tailwind + animaciones + overrides de Leaflet
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js                  ← ajusta el `base` aquí antes de desplegar
```
