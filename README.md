# 🎮 Interactive Learning Games

Plataforma de juegos educativos interactivos enfocados en aprendizaje geográfico. Cada juego ofrece múltiples modos de aprendizaje: exploración con mapas interactivos, flashcards, quizzes y desafíos contra reloj.

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

Todos los juegos incluyen 4 modos complementarios de aprendizaje:

### 🗺️ Modo Mapa Interactivo
- **Exploración libre**: Descubre información tocando el mapa
- **Encuéntralo**: Desafío de localizar lugares específicos
- Feedback visual inmediato
- Contador de progreso

### 📚 Modo Aprender
- Flashcards con animación flip 3D
- Navegación secuencial
- Sistema de marcado "Aprendido"
- Barra de progreso visual
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
- Animaciones de urgencia

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
│   ├── games/                    # Juegos individuales
│   │   ├── explora-colombia/
│   │   │   ├── index.jsx        # Componente principal
│   │   │   ├── colombia-geo.js  # GeoJSON
│   │   │   └── README.md        # Documentación
│   │   └── capitales-sudamerica/
│   │       ├── index.jsx
│   │       ├── southamerica-geo.js
│   │       └── README.md
│   ├── App.jsx                   # Router principal
│   ├── App.css                   # Estilos de app
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Estilos globales
├── public/
│   └── _redirects               # Netlify SPA routing
├── CLAUDE.md                     # Guía para agentes IA
├── README.md                     # Este archivo
├── package.json
├── vite.config.js
└── netlify.toml                  # Config de deployment
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

### En Desarrollo
- 🌍 **Capitales de Europa** (50 países)
- 🏞️ **Ríos del Mundo** (principales ríos)
- ⛰️ **Montañas Famosas** (picos por continente)

### Futuras Características
- 🔊 Audio de pronunciación
- 💾 Persistencia de progreso (localStorage)
- 🏆 Sistema de achievements
- 📈 Estadísticas detalladas
- 🌐 Internacionalización (i18n)
- 🎮 Modo multijugador
- 🎨 Temas personalizables

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
