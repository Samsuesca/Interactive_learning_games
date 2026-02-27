# 🎮 Interactive Learning Games

Plataforma de juegos educativos interactivos para niños y jóvenes. Cada juego ofrece múltiples modos de aprendizaje: exploración interactiva, flashcards, quizzes y desafíos contra reloj. Cubre geografía, ciencias naturales, matemáticas y lenguaje.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3.1-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Juegos Disponibles

### 🇨🇴 Explora Colombia
Aprende los 32 departamentos de Colombia, sus capitales y las 6 regiones naturales.

**Características:**
- Mapa interactivo con GeoJSON real de fronteras departamentales
- 32 departamentos · 32 capitales · 6 regiones
- Colores por región natural (Caribe, Andina, Pacífica, Orinoquía, Amazonía, Insular)
- 4 modos de juego completos

[📖 Ver documentación completa](./src/games/explora-colombia/README.md)

### 🌎 Capitales de Sudamérica
Domina las capitales de los 12 países sudamericanos con datos culturales y curiosidades.

**Características:**
- Mapa de Sudamérica con colores únicos por país
- 12 países · 12 capitales · Datos curiosos
- Información de idiomas, monedas y poblaciones
- Modo desafío de 60 segundos

[📖 Ver documentación completa](./src/games/capitales-sudamerica/README.md)

### 🌍 Banderas del Mundo
Aprende las banderas, capitales y datos curiosos de 50 países de todo el mundo.

**Características:**
- Galería visual con filtro por continente
- 50 países · Banderas · Capitales · Idiomas · Monedas
- Datos curiosos por país
- 4 modos de juego completos

[📖 Ver documentación completa](./src/games/banderas-mundo/README.md)

### 🐾 ¿Qué Animal Soy?
Adivina el animal con 5 pistas progresivas. ¡Menos pistas usas, más puntos ganas!

**Características:**
- 20 animales con 5 pistas cada uno
- Sistema de puntuación progresivo (50→10 puntos)
- Hábitats, alimentación y curiosidades
- Modo desafío de 60 segundos

[📖 Ver documentación completa](./src/games/que-animal-soy/README.md)

### 📐 Figuras Geométricas
Aprende figuras 2D, polígonos y volúmenes 3D con fórmulas, propiedades y quiz interactivos.

**Características:**
- 16 figuras geométricas (10 2D + 6 3D)
- Renderizado SVG con perspectiva 3D
- Fórmulas de área, perímetro y volumen
- Galería con filtro 2D/3D

[📖 Ver documentación completa](./src/games/figuras-geometricas/README.md)

### 🏛️ Monumentos Famosos
Ubica los monumentos más icónicos del mundo en un mapa interactivo.

**Características:**
- 20 monumentos famosos con mapa mundial
- Modo "Localizar" con puntuación por distancia (Haversine)
- Año de construcción, país y datos históricos
- GeoJSON simplificado del mundo

[📖 Ver documentación completa](./src/games/monumentos-famosos/README.md)

### 🔤 Palabras Revueltas
Ordena las letras desordenadas para formar la palabra correcta.

**Características:**
- 72 palabras en 6 categorías (animales, frutas, países, profesiones, deportes, colores)
- Mecánica de arrastrar letras para ordenar
- Temporizador por palabra (30 segundos)
- Modo exploración por categoría

[📖 Ver documentación completa](./src/games/palabras-revueltas/README.md)

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Clonar e instalar

```bash
# Clonar repositorio
git clone <repository-url>
cd interactive-learning-games

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:5173
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con HMR

# Producción
npm run build        # Compila para producción en /dist
npm run preview      # Preview del build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🎯 Modos de Juego

Cada juego ofrece modos complementarios adaptados a su temática:

### 🗺️ Modo Exploración
- **Mapas interactivos** (juegos geográficos): Exploración libre y modo "Encuéntralo"
- **Galerías visuales** (banderas, figuras): Navegación con filtros por categoría
- **Pistas progresivas** (animales): 5 pistas con puntuación decreciente
- Feedback visual inmediato en todos los modos

### 📚 Modo Aprender
- Flashcards con animación flip 3D
- Navegación secuencial con barra de progreso
- Sistema de marcado "Aprendido"
- Información completa y datos curiosos

### 🧠 Modo Quiz
- 10-15 preguntas de opción múltiple
- Preguntas mixtas (bidireccionales)
- Sistema de racha de aciertos 🔥
- Puntuación con estrellas (1-3 ⭐)
- Mensajes motivacionales

### ⚡ Modo Desafío Relámpago
- 60 segundos contra el reloj
- Preguntas ilimitadas
- Timer visual con cambio de color
- Estadísticas de velocidad

## 🛠️ Stack Tecnológico

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Routing**: React Router 7.13.0
- **Mapas**: d3-geo 3.1.1
- **Linter**: ESLint 9.39.1
- **Estilos**: CSS-in-JS (inline styles)

## 📁 Estructura del Proyecto

```
interactive-learning-games/
├── src/
│   ├── games/                        # Juegos individuales
│   │   ├── explora-colombia/         # 🇨🇴 Departamentos de Colombia
│   │   │   ├── index.jsx
│   │   │   ├── colombia-geo.js       # GeoJSON departamentos
│   │   │   └── README.md
│   │   ├── capitales-sudamerica/     # 🌎 Capitales sudamericanas
│   │   │   ├── index.jsx
│   │   │   ├── southamerica-geo.js   # GeoJSON países
│   │   │   └── README.md
│   │   ├── banderas-mundo/           # 🌍 Banderas de 50 países
│   │   │   ├── index.jsx
│   │   │   └── README.md
│   │   ├── que-animal-soy/           # 🐾 Adivina el animal
│   │   │   ├── index.jsx
│   │   │   └── README.md
│   │   ├── figuras-geometricas/      # 📐 Figuras 2D y 3D
│   │   │   ├── index.jsx
│   │   │   └── README.md
│   │   ├── monumentos-famosos/       # 🏛️ Monumentos del mundo
│   │   │   ├── index.jsx
│   │   │   ├── world-geo.js          # GeoJSON mundial
│   │   │   └── README.md
│   │   └── palabras-revueltas/       # 🔤 Ordena las letras
│   │       ├── index.jsx
│   │       └── README.md
│   ├── App.jsx                       # Router principal + lazy loading
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Estilos globales
├── public/
│   └── _redirects                    # Netlify SPA routing
├── CLAUDE.md                         # Guía para agentes IA
├── README.md                         # Este archivo
├── package.json
├── vite.config.js
└── netlify.toml                      # Config de deployment
```

## 🎨 Características de Diseño

### Paleta de Colores
- **Gradientes vibrantes** para cada modo de juego
- **Feedback visual** con colores semánticos:
  - Verde (`#66BB6A`) para respuestas correctas
  - Rojo (`#ef5350`) para respuestas incorrectas
  - Amarillo/Naranja para warnings
- **Backgrounds** con gradientes suaves multi-color

### Animaciones
- ✨ Confetti al responder correctamente
- 🔄 Flip 3D en flashcards
- 📊 Barras de progreso animadas
- 🎯 Scale effects en hover
- ⏱️ Pulsaciones en timer crítico

### Responsive Design
- **Mobile-first** approach
- Ancho máximo: 480px (optimizado para móviles)
- SVG responsive con viewBox
- Botones táctiles mínimo 44x44px

## 🌐 Deployment

### Netlify (Configurado)

El proyecto está configurado para deployment automático en Netlify.

```bash
# Build de producción
npm run build

# Los archivos compilados estarán en /dist
```

**Configuración de SPA routing:**
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Otras plataformas
- **Vercel**: Compatible (Zero config)
- **GitHub Pages**: Requiere configuración de base path
- **AWS S3 + CloudFront**: Requiere configuración de redirects

## 🧪 Testing

```bash
# Linting
npm run lint

# Test manual
npm run dev
# Verificar todos los modos de cada juego
```

### Checklist de Testing Manual
- [ ] Todos los modos funcionan correctamente
- [ ] Navegación fluida entre screens
- [ ] No hay errores en consola
- [ ] Animaciones funcionan
- [ ] Responsive en mobile (Chrome DevTools)
- [ ] Datos correctos (sin typos)

## 🤖 Desarrollo con IA (Claude)

Este proyecto tiene documentación especial para agentes de IA en [`CLAUDE.md`](./CLAUDE.md).

**Para crear un nuevo juego:**
1. Lee [`CLAUDE.md`](./CLAUDE.md) completamente
2. Sigue el protocolo de creación de juegos
3. Crea rama nueva con nombre del juego
4. Sigue estructura estándar de componentes
5. Documenta en README del juego

Ver [CLAUDE.md](./CLAUDE.md) para guía completa.

## 📊 Roadmap

### Ideas para Nuevos Juegos
- 🌍 **Capitales de Europa** (50 países)
- 🏞️ **Ríos del Mundo** (principales ríos)
- ⛰️ **Montañas Famosas** (picos por continente)
- 🌊 **Océanos y Mares** (profundidad, fauna)
- 🧬 **Sistema Solar** (planetas, datos)

### Futuras Características
- 🔊 Audio de pronunciación
- 💾 Persistencia de progreso (localStorage)
- 🏆 Sistema de achievements
- 📈 Estadísticas detalladas
- 🌐 Internacionalización (i18n)
- 🎮 Modo multijugador

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios mayores:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m '✨ feat: add nueva caracteristica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

**Convención de commits:**
```
✨ feat: Nueva funcionalidad
🐛 fix: Corrección de bug
♻️ refactor: Cambios de estructura
📚 docs: Actualización de documentación
✅ test: Nuevos tests
🎨 style: Mejoras visuales
⚡ perf: Optimización
```

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Angel Samuel Suesca Ríos**
- Email: suescapsam@gmail.com
- GitHub: [@suescapsam](https://github.com/suescapsam)

## 🙏 Agradecimientos

- **Natural Earth Data** - GeoJSON de mapas
- **d3-geo** - Proyecciones cartográficas
- **React Team** - Framework increíble
- **Vite Team** - Build tool ultra-rápido

---

**Desarrollado con ❤️ para el aprendizaje interactivo**

¿Quieres agregar un nuevo juego? Lee [`CLAUDE.md`](./CLAUDE.md) para comenzar.
