# CLAUDE.md - Interactive Learning Games

**Proyecto:** Interactive Learning Games
**Owner:** Angel Samuel Suesca Ríos
**Stack:** React 19 + Vite 7 + React Router 7 + d3-geo
**Propósito:** Colección de juegos educativos interactivos enfocados en geografía

---

## RESUMEN DEL PROYECTO

Plataforma de juegos educativos interactivos con enfoque en aprendizaje geográfico. Cada juego es un módulo independiente con múltiples modos de juego (exploración, aprendizaje, quiz, desafíos).

**Juegos implementados:**
- ✅ **Explora Colombia** - Departamentos y capitales de Colombia con mapa interactivo
- ✅ **Capitales de Sudamérica** - 12 países con mapas, datos curiosos y desafíos

**Objetivos:**
- Aprendizaje gamificado de geografía
- Interfaz atractiva y responsive
- Múltiples modos de juego para diferentes estilos de aprendizaje
- Código modular y reutilizable

---

## ESTRUCTURA DEL PROYECTO

```
interactive-learning-games/
├── src/
│   ├── games/
│   │   ├── explora-colombia/
│   │   │   ├── index.jsx              # Componente principal del juego
│   │   │   ├── colombia-geo.js        # GeoJSON de Colombia
│   │   │   └── README.md              # Documentación del juego
│   │   └── capitales-sudamerica/
│   │       ├── index.jsx              # Componente principal del juego
│   │       ├── southamerica-geo.js    # GeoJSON de Sudamérica
│   │       └── README.md              # Documentación del juego
│   ├── App.jsx                        # Router principal
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Estilos globales
├── public/
│   └── _redirects                     # Netlify redirects
├── CLAUDE.md                          # Este archivo
├── README.md                          # Documentación principal
├── package.json
└── vite.config.js
```

---

## PROTOCOLO PARA CREAR NUEVOS JUEGOS

Cuando el usuario solicite crear un nuevo juego con una temática específica, sigue este protocolo EXACTAMENTE:

### 1. CREAR RAMA NUEVA

```bash
# Nombre de la rama: nombre-del-juego (kebab-case)
# Ejemplo: capitales-europa, rios-del-mundo, paises-africanos
git checkout -b nombre-del-juego
```

### 2. CREAR ESTRUCTURA DEL JUEGO

Crea una nueva carpeta en `src/games/nombre-del-juego/` con:

```
src/games/nombre-del-juego/
├── index.jsx              # Componente principal (default export)
├── geo-data.js            # GeoJSON si aplica (opcional)
└── README.md              # Documentación del juego
```

### 3. ESTRUCTURA ESTÁNDAR DE UN JUEGO

Cada juego DEBE seguir esta estructura en `index.jsx`:

```jsx
import { useState, useEffect } from "react";

// 1. DATOS DEL JUEGO
const GAME_DATA = [
  // Array con los elementos del juego
  // Ejemplo: { name: "Argentina", capital: "Buenos Aires", ... }
];

// 2. UTILIDADES COMUNES
const shuffle = (arr) => { /* ... */ };
const pill = (bg, c) => ({ /* estilos de botón */ });
const circ = (bg) => ({ /* estilos de botón circular */ });

// 3. COMPONENTES COMPARTIDOS
function Confetti({ active }) { /* ... */ }
function Stars({ score, total }) { /* ... */ }
function ProgressBar({ value, max }) { /* ... */ }
function OptionButton({ text, selected, correct, onClick }) { /* ... */ }

// 4. MODOS DE JUEGO (mínimo 3)
function MapMode({ onBack }) { /* Modo con mapa interactivo */ }
function LearnMode({ onBack }) { /* Modo de aprendizaje (flashcards) */ }
function QuizMode({ onBack }) { /* Modo de quiz con score */ }
function ChallengeMode({ onBack }) { /* Modo contra reloj */ }

// 5. COMPONENTE PRINCIPAL (MENÚ)
export default function NombreDelJuego() {
  const [screen, setScreen] = useState("menu");

  const screens = {
    map: MapMode,
    learn: LearnMode,
    quiz: QuizMode,
    challenge: ChallengeMode
  };

  const Screen = screens[screen];

  if (Screen) {
    return <div style={gameCtn}><Screen onBack={() => setScreen("menu")} /></div>;
  }

  return (
    <div style={gameCtn}>
      {/* Menú principal con botones para cada modo */}
    </div>
  );
}

// 6. ESTILOS DEL CONTENEDOR
const gameCtn = {
  fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif",
  maxWidth: 480,
  margin: "0 auto",
  padding: "24px 12px",
  minHeight: "100vh",
  background: "linear-gradient(180deg,#color1,#color2,#color3)"
};
```

### 4. COMPONENTES OBLIGATORIOS

Todo juego DEBE tener:

#### A. Sistema de puntuación visual
- ⭐ **Stars**: Muestra 1-3 estrellas según % de aciertos
- 📊 **ProgressBar**: Barra de progreso animada
- 🎊 **Confetti**: Animación de celebración

#### B. Cuatro modos de juego mínimo
1. **🗺️ Modo Mapa** (si aplica): Exploración interactiva
2. **📚 Modo Aprender**: Flashcards con flip animation
3. **🧠 Modo Quiz**: 10-15 preguntas con opciones múltiples
4. **⚡ Modo Desafío**: Contra reloj (60 segundos)

#### C. Feedback inmediato
- ✅ Feedback visual al responder correctamente (verde)
- ❌ Feedback visual al fallar (rojo)
- 🔥 Racha de aciertos consecutivos
- 🎉 Mensajes de motivación

### 5. PALETA DE COLORES

Usa gradientes vibrantes y consistentes:

```javascript
// Gradientes recomendados
const GRADIENTS = {
  primary: "linear-gradient(135deg,#667eea,#764ba2)",   // Morado
  success: "linear-gradient(135deg,#11998e,#38ef7d)",   // Verde
  danger: "linear-gradient(135deg,#f5af19,#f12711)",    // Naranja-Rojo
  info: "linear-gradient(135deg,#f093fb,#f5576c)",      // Rosa
  warning: "linear-gradient(135deg,#FFA726,#ef5350)",   // Amarillo-Rojo
};

// Colores de feedback
const FEEDBACK_COLORS = {
  correct: { bg: "#c8e6c9", border: "#66BB6A", text: "#2e7d32" },
  incorrect: { bg: "#ffcdd2", border: "#ef5350", text: "#c62828" },
  neutral: { bg: "white", border: "#ddd", text: "#333" },
};
```

### 6. AÑADIR RUTA EN APP.JSX

```jsx
// En src/App.jsx
import NombreDelJuego from "./games/nombre-del-juego";

// En el Route
<Route path="/nombre-del-juego" element={<NombreDelJuego />} />

// En el menú principal
<Link to="/nombre-del-juego">
  <button>🎮 Nombre del Juego</button>
</Link>
```

### 7. CREAR README.md DEL JUEGO

Usa esta plantilla en `src/games/nombre-del-juego/README.md`:

```markdown
# 🎮 Nombre del Juego

**Descripción breve del juego**

## 📋 Características

- 🗺️ **Modo Mapa**: [Descripción]
- 📚 **Modo Aprender**: [Descripción]
- 🧠 **Modo Quiz**: [Descripción]
- ⚡ **Modo Desafío**: [Descripción]

## 🎯 Objetivos de Aprendizaje

- Aprender [tema específico]
- Practicar [habilidad]
- Dominar [conocimiento]

## 📊 Datos

- **Total elementos**: X
- **Categorías**: Y
- **Fuente de datos**: [GeoJSON / API / Manual]

## 🎨 Paleta de Colores

- Primary: `#color1`
- Secondary: `#color2`
- Accent: `#color3`

## 🧩 Componentes Principales

### MapMode
[Descripción del modo mapa]

### LearnMode
[Descripción del modo aprendizaje]

### QuizMode
[Descripción del modo quiz]

### ChallengeMode
[Descripción del modo desafío]

## 🚀 Uso

```jsx
import NombreDelJuego from "./games/nombre-del-juego";

<Route path="/nombre-del-juego" element={<NombreDelJuego />} />
```

## 📝 Notas

- [Consideraciones especiales]
- [Futuros desarrollos]
```

### 8. CONVENCIONES DE CÓDIGO

#### Variables y funciones
```javascript
// PascalCase para componentes
function MapMode() { }
function LearnMode() { }

// camelCase para variables y funciones
const gameData = [];
const handleClick = () => { };

// UPPER_SNAKE_CASE para constantes
const GAME_DATA = [];
const MAX_QUESTIONS = 15;
```

#### Nombres de archivos
- Componentes: `index.jsx`
- Datos: `nombre-geo.js`, `game-data.js`
- Docs: `README.md`

#### Estructura de commits
Sigue la convención de emojis del proyecto:

```bash
✨ feat: add [nombre-del-juego] game with interactive map
📚 docs: create README for [nombre-del-juego]
♻️ refactor: extract common components to utils
🎨 style: improve color palette in [nombre-del-juego]
🐛 fix: correct map rendering in [nombre-del-juego]
```

### 9. CHECKLIST ANTES DE COMMIT

Antes de hacer commit, verifica:

- [ ] El juego tiene los 4 modos completos (Map, Learn, Quiz, Challenge)
- [ ] README.md del juego está completo
- [ ] Ruta añadida en App.jsx
- [ ] Estilos consistentes con otros juegos
- [ ] Componentes compartidos extraídos si hay duplicación
- [ ] Feedback visual implementado (confetti, stars, colores)
- [ ] Responsive design (funciona en mobile)
- [ ] No hay errores en consola
- [ ] Los datos son correctos (verificados)

### 10. WORKFLOW DE COMMITS

⚠️ **IMPORTANTE - NO USAR CO-AUTORÍA DE CLAUDE**

**NUNCA incluyas "Co-Authored-By: Claude" en los commits.** Los commits deben ser solo del autor humano del proyecto (Angel Samuel Suesca Ríos). Claude es una herramienta de asistencia, no un co-autor.

❌ **INCORRECTO:**
```bash
git commit -m "feat: add game

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

✅ **CORRECTO:**
```bash
git commit -m "✨ feat: add game"
```

**Workflow de commits estándar:**

```bash
# 1. Crear estructura
git add src/games/nombre-del-juego/
git commit -m "✨ feat: create [nombre-del-juego] game structure"

# 2. Implementar modos
git add src/games/nombre-del-juego/index.jsx
git commit -m "✨ feat: implement Map and Learn modes for [nombre-del-juego]"

git add src/games/nombre-del-juego/index.jsx
git commit -m "✨ feat: implement Quiz and Challenge modes for [nombre-del-juego]"

# 3. Documentar
git add src/games/nombre-del-juego/README.md
git commit -m "📚 docs: add README for [nombre-del-juego]"

# 4. Integrar en app
git add src/App.jsx
git commit -m "♻️ refactor: add [nombre-del-juego] route to main app"

# 5. Finalizar
git add .
git commit -m "🎨 style: polish UI and fix responsive issues in [nombre-del-juego]"
```

---

## COMPONENTES REUTILIZABLES

Estos componentes están disponibles en cada juego (copiar si es necesario):

### Confetti
Animación de celebración al responder correctamente.

```jsx
function Confetti({ active }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    if (!active) { setParticles([]); return; }
    setParticles(Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ["#FFD700","#FF6B6B","#4ECDC4","#45B7D1","#F9A825","#AB47BC"][i % 6],
      size: Math.random() * 8 + 4
    })));
    const timeout = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(timeout);
  }, [active]);
  // ... render
}
```

### Stars
Sistema de 3 estrellas según puntuación.

```jsx
function Stars({ score, total }) {
  const stars = total > 0 ? (score / total >= 0.9 ? 3 : score / total >= 0.6 ? 2 : score / total > 0 ? 1 : 0) : 0;
  return (
    <div style={{ display:"flex", gap:4, justifyContent:"center", fontSize:32 }}>
      {[0,1,2].map(i => (
        <span key={i} style={{ opacity: i < stars ? 1 : 0.25 }}>
          {i < stars ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}
```

### ProgressBar
Barra de progreso animada.

```jsx
function ProgressBar({ value, max }) {
  return (
    <div style={{ width:"100%", height:10, background:"#e0e0e0", borderRadius:5, overflow:"hidden" }}>
      <div style={{
        width:`${max > 0 ? (value/max)*100 : 0}%`,
        height:"100%",
        background:"linear-gradient(90deg,#F9A825,#FF6B6B)",
        borderRadius:5,
        transition:"width 0.5s"
      }} />
    </div>
  );
}
```

### OptionButton
Botón de opción con feedback visual.

```jsx
function OptionButton({ text, selected, correct, onClick }) {
  const isCorrect = text === correct;
  const isSelected = selected === text;

  let bg = "white", border = "#ddd", color = "#333";
  if (selected !== null) {
    if (isCorrect) {
      bg = "#c8e6c9";
      border = "#66BB6A";
      color = "#2e7d32";
    } else if (isSelected) {
      bg = "#ffcdd2";
      border = "#ef5350";
      color = "#c62828";
    }
  }

  return (
    <button onClick={onClick} style={{
      background: bg,
      border: `2px solid ${border}`,
      borderRadius: 16,
      padding: "14px 10px",
      fontSize: 15,
      fontWeight: 600,
      color: color,
      cursor: selected !== null ? "default" : "pointer",
      transition: "all 0.3s",
      transform: isSelected ? "scale(1.04)" : "scale(1)",
      boxShadow: isSelected ? "0 4px 15px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      {selected !== null && isCorrect && "✅ "}
      {selected !== null && isSelected && !isCorrect && "❌ "}
      {text}
    </button>
  );
}
```

---

## PATRONES DE DISEÑO

### Sistema de Navegación
```jsx
const [screen, setScreen] = useState("menu");

// Screens map
const screens = {
  map: MapMode,
  learn: LearnMode,
  quiz: QuizMode,
  challenge: ChallengeMode
};

const Screen = screens[screen];

if (Screen) {
  return <div style={gameCtn}><Screen onBack={() => setScreen("menu")} /></div>;
}

// Menu
return <div>...</div>;
```

### Generación de Preguntas
```jsx
function makeQuestions(count) {
  return shuffle(GAME_DATA).slice(0, count).map(item => {
    const askProperty = Math.random() > 0.5;
    const correct = askProperty ? item.property1 : item.property2;

    let options = [correct];
    const pool = GAME_DATA.filter(d => d.id !== item.id);

    while (options.length < 4) {
      const random = pool[Math.floor(Math.random() * pool.length)];
      const value = askProperty ? random.property1 : random.property2;
      if (!options.includes(value)) options.push(value);
    }

    return { item, askProperty, correct, options: shuffle(options) };
  });
}
```

### Manejo de Respuestas
```jsx
const pick = (option) => {
  if (selected !== null) return; // Ya respondió

  setSelected(option);
  const isCorrect = option === questions[currentIndex].correct;

  if (isCorrect) {
    setScore(s => s + 1);
    setStreak(s => s + 1);
    setConfetti(c => c + 1); // Trigger confetti
  } else {
    setStreak(0);
  }

  setTimeout(() => {
    if (currentIndex + 1 >= TOTAL_QUESTIONS) {
      setDone(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelected(null);
    }
  }, 1200); // Delay para ver feedback
};
```

### Temporizador (Challenge Mode)
```jsx
const [time, setTime] = useState(60);
const timerRef = useRef(null);

const start = () => {
  setTime(60);
  setStatus("playing");
};

useEffect(() => {
  if (status !== "playing") return;

  timerRef.current = setInterval(() => {
    setTime(t => {
      if (t <= 1) {
        clearInterval(timerRef.current);
        setStatus("done");
        return 0;
      }
      return t - 1;
    });
  }, 1000);

  return () => clearInterval(timerRef.current);
}, [status]);
```

---

## DATOS GEOGRÁFICOS

### Obtener GeoJSON

Para mapas, usa fuentes confiables:

1. **Natural Earth Data**: https://www.naturalearthdata.com/
2. **GeoJSON.xyz**: https://geojson.xyz/
3. **GitHub repos**: Busca "country-geojson" o similar

### Formato GeoJSON estándar

```javascript
export default {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Argentina",
        // Otras propiedades
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[lng, lat], [lng, lat], ...]]
      }
    }
  ]
};
```

### Renderizado con d3-geo

```javascript
import { geoMercator, geoPath } from "d3-geo";

function useMapProjection(geoData, width, height) {
  return useMemo(() => {
    const projection = geoMercator().fitSize([width, height], geoData);
    const pathGenerator = geoPath().projection(projection);

    const features = geoData.features.map(feature => ({
      name: feature.properties.name,
      path: pathGenerator(feature),
      centroid: pathGenerator.centroid(feature),
      // ...
    }));

    return { features };
  }, [geoData, width, height]);
}
```

---

## TESTING Y VALIDACIÓN

Antes de crear PR:

### 1. Pruebas Manuales
- [ ] Todos los modos funcionan correctamente
- [ ] Navegación fluida entre screens
- [ ] No hay errores en consola
- [ ] Animaciones funcionan
- [ ] Responsive en mobile (Chrome DevTools)

### 2. Validación de Datos
- [ ] Nombres correctos (sin typos)
- [ ] Datos actualizados (capitales, poblaciones, etc.)
- [ ] Coordenadas GeoJSON correctas

### 3. Performance
- [ ] No hay lag al interactuar
- [ ] Mapas renderizan rápido (<500ms)
- [ ] Transiciones suaves (60fps)

### 4. Accesibilidad
- [ ] Contraste de colores adecuado
- [ ] Botones con tamaño mínimo 44x44px
- [ ] Textos legibles (min 14px)

---

## DEPLOYMENT

El proyecto está configurado para Netlify con SPA routing.

### Build
```bash
npm run build
```

### Preview local
```bash
npm run preview
```

### Netlify Config
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## EJEMPLOS DE NUEVOS JUEGOS

### Ideas implementables

1. **🌍 Capitales de Europa**
   - 50 países europeos
   - Flags, monedas, idiomas
   - Mapa interactivo detallado

2. **🏞️ Ríos del Mundo**
   - 20 ríos principales
   - Longitud, países que atraviesan
   - Modo "traza el río"

3. **⛰️ Montañas Famosas**
   - Picos más altos por continente
   - Altura, ubicación, primera ascensión
   - Quiz con comparaciones

4. **🌊 Océanos y Mares**
   - Profundidad, área, temperatura
   - Fauna característica
   - Mapa de corrientes

5. **🗺️ Banderas del Mundo**
   - 195 banderas
   - Significado de colores
   - Quiz de reconocimiento

---

## TROUBLESHOOTING

### Error: "Cannot read property 'features' of undefined"
**Causa**: GeoJSON no cargado correctamente
**Solución**: Verificar export default en archivo geo.js

### Error: "Map not rendering"
**Causa**: Dimensiones de SVG incorrectas
**Solución**: Usar useMemo para projection y verificar viewBox

### Error: "Confetti no aparece"
**Causa**: Estado `active` no cambia
**Solución**: Incrementar contador en lugar de boolean

### Performance lento en mobile
**Causa**: Demasiados elementos en mapa
**Solución**: Simplificar GeoJSON con mapshaper.org

---

## RECURSOS

### Documentación
- React: https://react.dev
- Vite: https://vitejs.dev
- d3-geo: https://github.com/d3/d3-geo

### Herramientas
- GeoJSON.io: Editor visual de GeoJSON
- Mapshaper: Simplificar GeoJSON
- ColorHunt: Paletas de colores

### Inspiración
- Seterra: https://www.seterra.com
- GeoGuessr: https://www.geoguessr.com

---

**Última actualización:** 2026-02-15
**Versión:** 1.0.0

Este documento es la guía definitiva para trabajar en el proyecto. Cualquier nuevo agente debe leerlo completamente antes de empezar.
