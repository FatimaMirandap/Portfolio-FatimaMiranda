/* ============================================================================
   TRADUCCIONES — todo el texto visible del portafolio vive aquí.
   Los componentes nunca deben tener texto fijo en español o inglés:
   siempre lo leen de este archivo a través de useLanguage().
   ============================================================================ */

const stackPorRol_es = [
  { id: 'data-analyst', titulo: 'Data Analyst', items: ['Python (Pandas, NumPy)', 'SQL', 'Power BI', 'Tableau', 'Looker Studio', 'Matplotlib', 'Seaborn', 'Streamlit'] },
  { id: 'data-engineer', titulo: 'Data Engineer', items: ['PostgreSQL', 'MySQL', 'SQLite', 'Snowflake', 'Spark', 'Dataiku', 'REST APIs', 'XML / JSON / GeoJSON', 'Git', 'CI/CD (fundamentos)'] },
  { id: 'data-scientist', titulo: 'Data Scientist', items: ['Scikit-learn', 'Naive Bayes', 'KNN', 'Validación cruzada', 'OpenAI API', 'Gemini API', 'YOLOv3'] },
  { id: 'cloud-web', titulo: 'Cloud y desarrollo web', items: ['AWS (S3, EC2, Lambda, SageMaker)', 'GCP (BigQuery, Cloud Storage)', 'Azure (Data Factory, Blob Storage)', 'Firebase', 'React', 'Node.js / Express.js', 'JavaScript, HTML, CSS'] },
]

const stackPorRol_en = [
  { id: 'data-analyst', titulo: 'Data Analyst', items: stackPorRol_es[0].items },
  { id: 'data-engineer', titulo: 'Data Engineer', items: stackPorRol_es[1].items },
  { id: 'data-scientist', titulo: 'Data Scientist', items: stackPorRol_es[2].items },
  { id: 'cloud-web', titulo: 'Cloud & Web Development', items: stackPorRol_es[3].items },
]

const tecnicas_es = [
  { id: 'nlp', titulo: 'Procesamiento de lenguaje natural', items: ['Lenguas de bajos recursos (maya yucateco)', 'Clasificación de texto con n-gramas', 'Perfiles de idioma (LANGDETECT)', 'Integración de LLMs en flujos de trabajo', 'Extracción de datos de texto no estructurado'] },
  { id: 'geoespacial', titulo: 'Análisis geoespacial', items: ['QGIS', 'Google Earth Engine', 'Percepción remota con drones', 'Geocodificación', 'Cartografía temática y mapas web'] },
  { id: 'geointeligencia', titulo: 'Geointeligencia computacional', items: ['Detección de hotspots espaciales', 'Visión por computadora sobre imágenes', 'Monitoreo ambiental con machine learning', 'Fusión de datos no estructurados con ubicación'] },
  { id: 'optimizacion', titulo: 'Optimización y gestión ágil', items: ['Automatización de flujos de datos', 'Pipelines reproducibles', 'Agile y Lean', 'Gestión de proyectos (Google PM)'] },
]

const tecnicas_en = [
  { id: 'nlp', titulo: 'Natural language processing', items: ['Low-resource languages (Yucatec Maya)', 'N-gram text classification', 'Language profiles (LANGDETECT)', 'Integrating LLMs into workflows', 'Extracting data from unstructured text'] },
  { id: 'geoespacial', titulo: 'Geospatial analysis', items: ['QGIS', 'Google Earth Engine', 'Drone remote sensing', 'Geocoding', 'Thematic cartography and web maps'] },
  { id: 'geointeligencia', titulo: 'Computational geointelligence', items: ['Spatial hotspot detection', 'Computer vision on imagery', 'ML-based environmental monitoring', 'Fusing unstructured data with location'] },
  { id: 'optimizacion', titulo: 'Optimization & agile management', items: ['Data workflow automation', 'Reproducible pipelines', 'Agile & Lean', 'Project management (Google PM)'] },
]

const experiencias_es = [
  {
    id: 'giltia', periodo: '2025 – Presente',
    nombre: 'Investigación de posgrado en NLP para maya yucateco',
    organizacion: 'CentroGeo · Maestría en Ciencias de la Información Geoespacial',
    rol: 'Trabajo de tesis en procesamiento de lenguaje natural y audio para lenguas de bajos recursos, aplicado al maya yucateco, como miembro del grupo de investigación GILTIA.',
    aportes: ['Miembro del Grupo de Investigación en Lenguas, Territorio e Inteligencia Artificial (GILTIA).', 'Línea de tesis que une tecnologías del lenguaje con análisis geoespacial.'],
    tecnologias: ['Python', 'QGIS', 'Google Earth Engine'], tecnicas: ['NLP', 'Audio', 'Análisis geoespacial'],
    enlace: { label: 'Conocer GILTIA' },
  },
  {
    id: 'peekenos', periodo: 'En desarrollo',
    nombre: 'Peekeños: plataforma para encontrar mascotas extraviadas',
    organizacion: 'Proyecto personal',
    rol: 'Diseño y desarrollo de una app que convierte publicaciones dispersas en redes sociales en reportes georreferenciados que cualquier persona puede consultar.',
    aportes: ['Pipeline de datos con dos ramas en paralelo: recorte de la mascota con YOLOv3 e interpretación del texto con Gemini.', 'Geocodificación de direcciones en texto libre con la API de Google Maps.', 'Reporte por captura de pantalla, mapa, galería y hotspots de extravío; el match por fotografía está en desarrollo.'],
    tecnologias: ['React + TypeScript', 'Firebase', 'Gemini API', 'YOLOv3', 'Google Maps API'], tecnicas: ['Visión por computadora', 'Extracción con LLMs', 'Geocodificación'],
    enlace: { label: 'Abrir la app' },
  },
  {
    id: 'centrogeo-ds', periodo: 'Ago 2024 – Dic 2024',
    nombre: 'Data Scientist',
    organizacion: 'CentroGeo, A.C. · Mérida, Yucatán',
    rol: 'Parte del equipo que desarrolló un clasificador de machine learning para identificar automáticamente textos en español y maya yucateco.',
    aportes: ['Clasificador Naive Bayes con precisión cercana al 98%, validado con validación cruzada y matrices de confusión.', 'Coautora del artículo publicado en el International Journal of Computer and Information Engineering (2025).', 'Despliegue de una demo web para que el público probara el modelo.'],
    tecnologias: ['Python', 'Scikit-learn', 'Pandas'], tecnicas: ['NLP', 'Clasificación de texto', 'Validación de modelos'],
    enlace: { label: 'Leer la publicación' },
  },
  {
    id: 'centrogeo-de', periodo: 'Feb 2024 – Jul 2024',
    nombre: 'Data Engineer Intern',
    organizacion: 'CentroGeo, A.C. · Mérida, Yucatán',
    rol: 'Estructuración de datasets multilingües y automatización de traducción para proyectos de investigación en tecnologías del lenguaje.',
    aportes: ['Integración de la API de OpenAI para traducción español–inglés con pivote en lenguas mayas: 60% menos esfuerzo manual.', 'Parseo y transformación de XML con Python para unificar metadatos entre proyectos.', 'Rutinas optimizadas que mejoraron 30% la velocidad de procesamiento y la compatibilidad de formatos.'],
    tecnologias: ['Python', 'OpenAI API', 'XML'], tecnicas: ['ETL', 'Limpieza de datos', 'Integración de LLMs'],
  },
  {
    id: 'plenumsoft', periodo: 'May 2024 – Ago 2024',
    nombre: 'Data Engineer',
    organizacion: 'PLENUMSOFT',
    rol: 'Automatización de la recolección y el procesamiento de datos de riesgo de EE. UU., Canadá y México, en colaboración con socios académicos.',
    aportes: ['Scripts en Python para automatizar la obtención y el procesamiento de datos de tres países.', 'Flujos escalables en Dataiku que redujeron 40% el tiempo de obtención de datos.'],
    tecnologias: ['Python', 'Dataiku'], tecnicas: ['Automatización', 'Orquestación de flujos'],
  },
  {
    id: 'embsoft', periodo: 'Mar 2023 – Ago 2023',
    nombre: 'Data Science Intern',
    organizacion: 'EMBSOFT Engineering',
    rol: 'Gestión y depuración de datos a gran escala para análisis de negocio.',
    aportes: ['Limpieza de datasets a gran escala en Google Cloud Console para mejorar su precisión y accesibilidad.', 'Automatización de la recolección de datos para adquisición continua.'],
    tecnologias: ['Google Cloud Console', 'Python'], tecnicas: ['Preprocesamiento', 'Automatización'],
  },
  {
    id: 'upy', periodo: 'Sep 2021 – Jul 2025',
    nombre: 'Proyectos académicos',
    organizacion: 'Universidad Politécnica de Yucatán · Ingeniería de Datos',
    rol: 'Proyectos aplicados de machine learning, análisis de redes y análisis geoespacial durante la licenciatura.',
    aportes: ['Sistema de monitoreo de deforestación con imágenes de dron y KNN.', 'Análisis de redes sociales para detectar patrones de influencia.', 'Clasificador de textos en lenguas indígenas.'],
    tecnologias: ['Python', 'Scikit-learn', 'SQL / NoSQL'], tecnicas: ['Percepción remota', 'Análisis de redes', 'Clasificación'],
  },
]

const experiencias_en = [
  {
    id: 'giltia', periodo: '2025 – Present',
    nombre: 'Graduate research in NLP for Yucatec Maya',
    organizacion: "CentroGeo · Master's in Geospatial Information Sciences",
    rol: "Thesis work in natural language processing and audio for low-resource languages, applied to Yucatec Maya, as a member of the GILTIA research group.",
    aportes: ['Member of the Research Group on Languages, Territory, and Artificial Intelligence (GILTIA).', 'Thesis line connecting language technology with geospatial analysis.'],
    tecnologias: ['Python', 'QGIS', 'Google Earth Engine'], tecnicas: ['NLP', 'Audio', 'Geospatial analysis'],
    enlace: { label: 'Learn about GILTIA' },
  },
  {
    id: 'peekenos', periodo: 'In development',
    nombre: 'Peekeños: a platform to find lost pets',
    organizacion: 'Personal project',
    rol: 'Design and development of an app that turns scattered social media posts into geolocated reports anyone can search.',
    aportes: ['Two-branch parallel data pipeline: pet cropping with YOLOv3 and text interpretation with Gemini.', 'Geocoding of free-text addresses via the Google Maps API.', 'Screenshot-based reporting, map, gallery, and loss hotspots; photo matching is still in development.'],
    tecnologias: ['React + TypeScript', 'Firebase', 'Gemini API', 'YOLOv3', 'Google Maps API'], tecnicas: ['Computer vision', 'LLM-based extraction', 'Geocoding'],
    enlace: { label: 'Open the app' },
  },
  {
    id: 'centrogeo-ds', periodo: 'Aug 2024 – Dec 2024',
    nombre: 'Data Scientist',
    organizacion: 'CentroGeo, A.C. · Mérida, Yucatán',
    rol: 'Part of the team that developed a machine learning classifier to automatically identify Spanish and Yucatec Maya text.',
    aportes: ['Naive Bayes classifier reaching close to 98% accuracy, validated with cross-validation and confusion matrices.', 'Co-author of the paper published in the International Journal of Computer and Information Engineering (2025).', 'Deployed a web demo for public testing of the model.'],
    tecnologias: ['Python', 'Scikit-learn', 'Pandas'], tecnicas: ['NLP', 'Text classification', 'Model validation'],
    enlace: { label: 'Read the publication' },
  },
  {
    id: 'centrogeo-de', periodo: 'Feb 2024 – Jul 2024',
    nombre: 'Data Engineer Intern',
    organizacion: 'CentroGeo, A.C. · Mérida, Yucatán',
    rol: 'Structured multilingual datasets and automated translation for language-technology research projects.',
    aportes: ['Integrated the OpenAI API for Spanish–English translation with Mayan-language pivots: 60% less manual effort.', 'Parsed and transformed XML with Python to unify metadata across projects.', 'Optimized routines that improved processing speed and format compatibility by 30%.'],
    tecnologias: ['Python', 'OpenAI API', 'XML'], tecnicas: ['ETL', 'Data cleaning', 'LLM integration'],
  },
  {
    id: 'plenumsoft', periodo: 'May 2024 – Aug 2024',
    nombre: 'Data Engineer',
    organizacion: 'PLENUMSOFT',
    rol: 'Automated the collection and processing of risk data from the US, Canada, and Mexico, in collaboration with academic partners.',
    aportes: ['Python scripts to automate data collection and processing across three countries.', 'Scalable Dataiku workflows that cut data retrieval time by 40%.'],
    tecnologias: ['Python', 'Dataiku'], tecnicas: ['Automation', 'Workflow orchestration'],
  },
  {
    id: 'embsoft', periodo: 'Mar 2023 – Aug 2023',
    nombre: 'Data Science Intern',
    organizacion: 'EMBSOFT Engineering',
    rol: 'Managed and cleansed large-scale data for business analysis.',
    aportes: ['Cleaned large-scale datasets in Google Cloud Console to improve accuracy and accessibility.', 'Automated data collection for continuous acquisition.'],
    tecnologias: ['Google Cloud Console', 'Python'], tecnicas: ['Preprocessing', 'Automation'],
  },
  {
    id: 'upy', periodo: 'Sep 2021 – Jul 2025',
    nombre: 'Academic projects',
    organizacion: 'Universidad Politécnica de Yucatán · Data Engineering',
    rol: "Applied machine learning, network analysis, and geospatial analysis projects during my bachelor's degree.",
    aportes: ['Deforestation monitoring system using drone imagery and KNN.', 'Social network analysis to detect influence patterns.', 'Classifier for indigenous-language texts.'],
    tecnologias: ['Python', 'Scikit-learn', 'SQL / NoSQL'], tecnicas: ['Remote sensing', 'Network analysis', 'Classification'],
  },
]

const logros_es = [
  { valor: '40%', texto: 'menos tiempo de obtención de datos (PLENUMSOFT)', color: 'text-fuchsia-400' },
  { valor: '60%', texto: 'menos esfuerzo manual de traducción con la API de OpenAI', color: 'text-violet-400' },
  { valor: 'AWS', texto: 'Academy Graduate · Cloud Foundations', color: 'text-indigo-400', urlKey: 'aws' },
  { valor: '3er lugar', texto: 'Datathón Yucatán i6 (2024)', color: 'text-pink-400' },
  { valor: 'C1', texto: 'Inglés avanzado · ITEP', color: 'text-teal-300', urlKey: 'itep' },
  { valor: 'B2', texto: 'TOEFL ITP · 560 puntos', color: 'text-teal-300', urlKey: 'toefl' },
]

const logros_en = [
  { valor: '40%', texto: 'less time to retrieve data (PLENUMSOFT)', color: 'text-fuchsia-400' },
  { valor: '60%', texto: 'less manual translation effort with the OpenAI API', color: 'text-violet-400' },
  { valor: 'AWS', texto: 'Academy Graduate · Cloud Foundations', color: 'text-indigo-400', urlKey: 'aws' },
  { valor: '3rd place', texto: 'Yucatán i6 Datathon (2024)', color: 'text-pink-400' },
  { valor: 'C1', texto: 'Advanced English · ITEP', color: 'text-teal-300', urlKey: 'itep' },
  { valor: 'B2', texto: 'TOEFL ITP · 560 points', color: 'text-teal-300', urlKey: 'toefl' },
]

export const translations = {
  es: {
    nav: { inicio: 'Inicio', stack: 'Stack', experiencias: 'Experiencias', laboratorio: 'Laboratorio', logros: 'Logros', cv: 'CV', disponibilidad: 'Disponibilidad inmediata' },
    hero: {
      badge: 'Data Engineer & Data Scientist',
      tituloPre: 'Transformo datos complejos en ',
      tituloGradiente: 'arquitecturas e impactos medibles',
      tituloPost: '.',
      parrafo: 'Ingeniera de Datos y Científica de Datos. Diseño pipelines reproducibles, modelos de machine learning y soluciones de NLP y análisis geoespacial, uniendo la investigación científica con soluciones reales en la nube (AWS, GCP y Azure).',
      btnLinkedin: 'Conectar en LinkedIn', btnCV: 'Ver mi CV', btnGithub: 'Repositorios GitHub',
    },
    stackSection: {
      eyebrow: 'Stack', titulo: 'Con qué construyo y en qué me especializo',
      descripcion: 'A la izquierda, las herramientas que uso según el rol. A la derecha, las áreas en las que tengo formación y experiencia especializada.',
      bloqueHerramientas: { titulo: 'Herramientas por rol', descripcion: 'Ordenadas de análisis a ciencia de datos, más la infraestructura que las sostiene.' },
      bloqueTecnicas: { titulo: 'Técnicas especializadas', descripcion: 'Donde se cruzan mi investigación en CentroGeo y mi trabajo aplicado.' },
    },
    stackPorRol: stackPorRol_es,
    tecnicas: tecnicas_es,
    experienciasSection: { eyebrow: 'Experiencias', titulo: 'Dónde he trabajado y qué he construido', descripcion: 'Investigación, industria y proyectos propios, del más reciente al más antiguo.' },
    experiencias: experiencias_es,
    laboratorio: {
      eyebrow: 'Laboratorio', titulo: 'Pruébalo tú mismo',
      descripcion: 'Demos interactivas que construí para este portafolio. No son extractos de los sistemas de mis empleadores: muestran cómo trabajo con datos. El dashboard resume métricas reales de mi experiencia, el mapa usa datos abiertos del INEGI y te deja cargar los tuyos, y el pipeline es el de Peekeños, un proyecto propio.',
      dashboard: { eyebrow: 'Business Intelligence', titulo: 'Dashboard de resultados', descripcion: 'Las métricas de mi CV convertidas en KPIs y gráficos que puedes explorar.', tags: ['Recharts', 'React'] },
      mapa: { eyebrow: 'Análisis geoespacial', titulo: 'Mapa interactivo', descripcion: 'Hablantes de maya por estado según el Censo 2020, o sube un CSV con tus propios puntos.', tags: ['Leaflet', 'OpenStreetMap', 'CSV'] },
      pipeline: { eyebrow: 'Data Engineering', titulo: 'Pipeline de Peekeños', descripcion: 'Cómo convierto publicaciones dispersas en redes sociales en datos georreferenciados y utilizables.', tags: ['YOLOv3', 'Gemini API', 'Google Maps API'] },
      cargando: 'Cargando demo interactiva…',
    },
    logrosSection: { eyebrow: 'Logros', titulo: 'Resultados y certificaciones', verCredencial: 'Ver credencial' },
    logros: logros_es,
    cvSection: {
      eyebrow: 'Currículum', titulo: 'Mi CV completo', descripcion: 'Actualizado a 2026. Disponible en español e inglés.',
      badge: 'Actualizado 2026', abrir: 'Abrir en otra pestaña', descargar: 'Descargar PDF',
      notaMovil: 'Tu navegador móvil abre el PDF mejor en una pestaña aparte. Usa los botones de arriba para verlo o descargarlo.',
      idiomas: { es: 'Español', en: 'English' },
    },
    footer: 'Hecho en React + Tailwind.',

    dashboardData: {
      kpis: [
        { label: 'Precisión del clasificador (Maya vs. Español)', value: '97.8%', delta: 'vs. 95.4% LANGDETECT' },
        { label: 'Reducción de esfuerzo en traducción', value: '60%', delta: 'API de OpenAI · CentroGeo' },
        { label: 'Reducción en tiempo de obtención de datos', value: '40%', delta: 'Automatización con Dataiku' },
      ],
      datasets: {
        clasificacion: { label: 'Detección de Idioma (Maya vs. Español)', unit: '% de precisión' },
        traduccion: { label: 'Automatización de Traducción (OpenAI API)', unit: 'reducción en esfuerzo manual', gaugeCaption: 'menos esfuerzo manual de traducción' },
        riesgo: { label: 'Pipeline de Datos de Riesgo (PLENUMSOFT)', unit: 'reducción en tiempo de obtención', gaugeCaption: 'menos tiempo de obtención de datos' },
        procesamiento: { label: 'Optimización de Pipeline (CentroGeo)', unit: 'mejora en velocidad y compatibilidad', gaugeCaption: 'más velocidad y compatibilidad de formatos' },
      },
      footerPre: 'Resultados reales de proyectos aplicados en CentroGeo y PLENUMSOFT — ver',
      footerLink: 'publicación completa',
    },

    mapaData: {
      modos: { maya: 'Maya en la península (INEGI 2020)', propios: 'Carga tus datos' },
      sitiosNotas: { Yucatán: 'Referencia: Mérida', 'Quintana Roo': 'Referencia: Chetumal', Campeche: 'Referencia: San Francisco de Campeche' },
      csvFormato: (max) => `Formato: valor1,valor2,lat,lon · máximo ${max} filas · valor1 = etiqueta, valor2 = número (define el tamaño del círculo)`,
      btnMostrar: 'Mostrar en el mapa', btnSubir: 'Subir .csv',
      errores: {
        vacio: 'El CSV está vacío.',
        filaInvalida: (n) => `Fila ${n}: faltan datos o valor2/lat/lon no son números.`,
        fueraDeRango: (n) => `Fila ${n}: coordenadas fuera de rango.`,
        truncado: (max) => `Solo se muestran las primeras ${max} filas válidas.`,
      },
      overlay: 'Haz clic para interactuar con el mapa',
      popupSufijo: 'hablantes de maya',
      footerFuente: 'Fuente: INEGI, Censo de Población y Vivienda 2020 (vía',
      footerFuenteLink: 'La Jornada Maya',
      footerFuentePost: '). Un punto por estado, ubicado en su capital.',
      footerPrivacidad: 'Tus datos se procesan solo en tu navegador; no se envían ni se guardan en ningún servidor.',
    },

    pipelineData: {
      header: 'Peekeños · de posts dispersos a una plataforma de búsqueda',
      verApp: 'Ver la app →',
      etapas: [
        { id: 1, titulo: 'Captura', descripcion: 'Posts de grupos de Facebook de mascotas extraviadas, organizados en lotes.' },
        { id: 2, titulo: 'Extracción con IA', descripcion: 'Se recorta a la mascota, se interpreta el texto del post y la dirección se convierte en coordenadas.' },
        { id: 3, titulo: 'Dataset', descripcion: 'Ambas fuentes convergen en un CSV unificado, limpio y listo para la app.' },
        {
          id: 4, titulo: 'Plataforma', descripcion: 'Los datos se vuelven herramientas que cualquier persona puede usar para encontrar a una mascota.',
          funciones: [
            { nombre: 'Reportes de extravío y avistamiento' },
            { nombre: 'Mapa georreferenciado' },
            { nombre: 'Galería de imágenes' },
            { nombre: 'Hotspots de extravío' },
            { nombre: 'Match por fotografía', enDesarrollo: true },
          ],
        },
      ],
      roadmapTitulo: 'Roadmap · próximamente',
      planeado: 'Planeado',
      enDesarrolloTag: '*en desarrollo',
      roadmap: [
        { titulo: 'Predicción de zona', descripcion: 'Estimar dónde podría encontrarse la mascota.' },
        { titulo: 'Predicción de trayectorias', descripcion: 'Rutas probables considerando el tráfico.' },
      ],
    },
  },

  en: {
    nav: { inicio: 'Home', stack: 'Stack', experiencias: 'Experience', laboratorio: 'Lab', logros: 'Highlights', cv: 'Resume', disponibilidad: 'Available now' },
    hero: {
      badge: 'Data Engineer & Data Scientist',
      tituloPre: 'Turning complex data into ',
      tituloGradiente: 'architectures and measurable impact',
      tituloPost: '.',
      parrafo: 'Data Engineer and Data Scientist. I design reproducible pipelines, machine learning models, and NLP and geospatial analysis solutions, bridging scientific research with real-world cloud solutions (AWS, GCP, and Azure).',
      btnLinkedin: 'Connect on LinkedIn', btnCV: 'View my resume', btnGithub: 'GitHub repositories',
    },
    stackSection: {
      eyebrow: 'Stack', titulo: 'What I build with, and where I specialize',
      descripcion: 'On the left, the tools I use by role. On the right, the areas where I have specialized training and experience.',
      bloqueHerramientas: { titulo: 'Tools by role', descripcion: 'Ordered from analytics to data science, plus the infrastructure behind them.' },
      bloqueTecnicas: { titulo: 'Specialized techniques', descripcion: 'Where my research at CentroGeo meets my applied work.' },
    },
    stackPorRol: stackPorRol_en,
    tecnicas: tecnicas_en,
    experienciasSection: { eyebrow: 'Experience', titulo: "Where I've worked and what I've built", descripcion: 'Research, industry, and personal projects, from most recent to oldest.' },
    experiencias: experiencias_en,
    laboratorio: {
      eyebrow: 'Lab', titulo: 'Try it yourself',
      descripcion: "Interactive demos I built for this portfolio. They aren't excerpts from my employers' systems — they show how I work with data. The dashboard summarizes real metrics from my experience, the map uses open INEGI data and lets you upload your own, and the pipeline is Peekeños, a personal project.",
      dashboard: { eyebrow: 'Business Intelligence', titulo: 'Results dashboard', descripcion: 'My resume metrics turned into KPIs and charts you can explore.', tags: ['Recharts', 'React'] },
      mapa: { eyebrow: 'Geospatial analysis', titulo: 'Interactive map', descripcion: 'Maya speakers by state per the 2020 Census, or upload a CSV with your own points.', tags: ['Leaflet', 'OpenStreetMap', 'CSV'] },
      pipeline: { eyebrow: 'Data Engineering', titulo: 'Peekeños pipeline', descripcion: 'How I turn scattered social media posts into usable, geolocated data.', tags: ['YOLOv3', 'Gemini API', 'Google Maps API'] },
      cargando: 'Loading interactive demo…',
    },
    logrosSection: { eyebrow: 'Highlights', titulo: 'Results & certifications', verCredencial: 'View credential' },
    logros: logros_en,
    cvSection: {
      eyebrow: 'Resume', titulo: 'Resume', descripcion: 'Updated for 2026. Available in Spanish and English.',
      badge: 'Updated 2026', abrir: 'Open in a new tab', descargar: 'Download PDF',
      notaMovil: "Your mobile browser handles PDFs better in a separate tab. Use the buttons above to view or download it.",
      idiomas: { es: 'Español', en: 'English' },
    },
    footer: 'Built with React + Tailwind.',

    dashboardData: {
      kpis: [
        { label: 'Classifier accuracy (Maya vs. Spanish)', value: '97.8%', delta: 'vs. 95.4% LANGDETECT' },
        { label: 'Translation effort reduction', value: '60%', delta: 'OpenAI API · CentroGeo' },
        { label: 'Data retrieval time reduction', value: '40%', delta: 'Automation with Dataiku' },
      ],
      datasets: {
        clasificacion: { label: 'Language Detection (Maya vs. Spanish)', unit: '% accuracy' },
        traduccion: { label: 'Translation Automation (OpenAI API)', unit: 'reduction in manual effort', gaugeCaption: 'less manual translation effort' },
        riesgo: { label: 'Risk Data Pipeline (PLENUMSOFT)', unit: 'reduction in retrieval time', gaugeCaption: 'less time to retrieve data' },
        procesamiento: { label: 'Pipeline Optimization (CentroGeo)', unit: 'improvement in speed and compatibility', gaugeCaption: 'more speed and format compatibility' },
      },
      footerPre: 'Real results from projects at CentroGeo and PLENUMSOFT — see',
      footerLink: 'full publication',
    },

    mapaData: {
      modos: { maya: 'Maya speakers in the peninsula (INEGI 2020)', propios: 'Upload your data' },
      sitiosNotas: { Yucatán: 'Reference: Mérida', 'Quintana Roo': 'Reference: Chetumal', Campeche: 'Reference: San Francisco de Campeche' },
      csvFormato: (max) => `Format: value1,value2,lat,lon · up to ${max} rows · value1 = label, value2 = number (sets the circle size)`,
      btnMostrar: 'Show on map', btnSubir: 'Upload .csv',
      errores: {
        vacio: 'The CSV is empty.',
        filaInvalida: (n) => `Row ${n}: missing data or value2/lat/lon are not numbers.`,
        fueraDeRango: (n) => `Row ${n}: coordinates out of range.`,
        truncado: (max) => `Only the first ${max} valid rows are shown.`,
      },
      overlay: 'Click to interact with the map',
      popupSufijo: 'Maya speakers',
      footerFuente: 'Source: INEGI, 2020 Population and Housing Census (via',
      footerFuenteLink: 'La Jornada Maya',
      footerFuentePost: '). One point per state, placed at its capital.',
      footerPrivacidad: "Your data is processed only in your browser; it isn't sent to or stored on any server.",
    },

    pipelineData: {
      header: 'Peekeños · from scattered posts to a search platform',
      verApp: 'Open the app →',
      etapas: [
        { id: 1, titulo: 'Capture', descripcion: 'Posts from Facebook groups for lost pets, organized in batches.' },
        { id: 2, titulo: 'AI Extraction', descripcion: 'The pet is cropped out, the post text is interpreted, and the address is converted into coordinates.' },
        { id: 3, titulo: 'Dataset', descripcion: 'Both sources converge into a single clean CSV ready for the app.' },
        {
          id: 4, titulo: 'Platform', descripcion: 'The data becomes tools anyone can use to find a pet.',
          funciones: [
            { nombre: 'Lost and sighting reports' },
            { nombre: 'Georeferenced map' },
            { nombre: 'Photo gallery' },
            { nombre: 'Loss hotspots' },
            { nombre: 'Photo matching', enDesarrollo: true },
          ],
        },
      ],
      roadmapTitulo: 'Roadmap · coming soon',
      planeado: 'Planned',
      enDesarrolloTag: '*in progress',
      roadmap: [
        { titulo: 'Zone prediction', descripcion: 'Estimate where the pet might be found.' },
        { titulo: 'Trajectory prediction', descripcion: 'Likely routes based on traffic.' },
      ],
    },
  },
}