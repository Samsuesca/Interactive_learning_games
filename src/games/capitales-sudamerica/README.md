# 🌎 Capitales de Sudamérica

Juego educativo interactivo para aprender las capitales de los 12 países de Sudamérica con datos culturales y curiosidades.

## 📋 Características

### 🗺️ Modo Mapa Interactivo
- **Exploración libre**: Toca cualquier país para ver información completa
- **Encuéntralo**: Encuentra países específicos en el mapa
- Mapa con GeoJSON real de Sudamérica
- Labels con bandera, capital, idioma y población
- Colores únicos por país (12 colores vibrantes)
- Contador de países explorados (0/12)
- Hover tooltips con nombre y bandera

### 📚 Modo Aprender
- Flashcards con animación flip 3D
- **Vista frontal**: Bandera, nombre del país, idioma y moneda
- **Vista trasera**: Capital, dato curioso y población
- Navegación con flechas
- Sistema de marcado "Aprendido"
- Barra de progreso (X/12)
- Datos curiosos únicos de cada país

### 🧠 Modo Quiz
- 12 preguntas (todos los países)
- Preguntas mixtas: "¿Capital de X?" o "¿De qué país es capital X?"
- 4 opciones de respuesta
- Feedback visual inmediato
- Sistema de racha de aciertos consecutivos
- Estrellas según rendimiento (1-3 ⭐)
- Mensajes motivacionales personalizados

### ⚡ Modo Desafío Relámpago
- 60 segundos contra reloj
- Preguntas ilimitadas
- Timer visual con cambio de color
- Animación pulsante en últimos 10 segundos
- Contador de racha en vivo
- Estadísticas finales

## 🎯 Objetivos de Aprendizaje

- Identificar los 12 países de Sudamérica en el mapa
- Memorizar las capitales de cada país
- Conocer idiomas oficiales y monedas
- Aprender datos curiosos de cada país
- Desarrollar conocimiento cultural y geográfico

## 📊 Datos

- **Total países**: 12
- **Total capitales**: 12
- **Idiomas**: Español (9), Portugués (1), Inglés (1), Neerlandés (1)
- **Fuente de mapa**: GeoJSON de Natural Earth Data
- **Proyección**: Mercator (d3-geo)
- **Población total**: ~430 millones de habitantes

### Países y Datos

| País | Capital | Idioma | Moneda | Población | Dato Curioso |
|------|---------|--------|--------|-----------|--------------|
| 🇦🇷 Argentina | Buenos Aires | Español | Peso argentino | 46M | Cuna del tango y el asado |
| 🇧🇴 Bolivia | Sucre | Español | Boliviano | 12M | Salar de Uyuni, el más grande del mundo |
| 🇧🇷 Brasil | Brasilia | Portugués | Real | 215M | País más grande de Sudamérica |
| 🇨🇱 Chile | Santiago | Español | Peso chileno | 19M | País más largo y angosto del mundo |
| 🇨🇴 Colombia | Bogotá | Español | Peso colombiano | 52M | Segundo país con más biodiversidad |
| 🇪🇨 Ecuador | Quito | Español | Dólar | 18M | Nombrado por la línea del Ecuador |
| 🇬🇾 Guyana | Georgetown | Inglés | Dólar guyanés | 0.8M | Único país sudamericano de habla inglesa |
| 🇵🇾 Paraguay | Asunción | Español/Guaraní | Guaraní | 7M | Su bandera es diferente por cada lado |
| 🇵🇪 Perú | Lima | Español | Sol | 34M | Hogar de Machu Picchu |
| 🇸🇷 Surinam | Paramaribo | Neerlandés | Dólar surinamés | 0.6M | País más pequeño de Sudamérica |
| 🇺🇾 Uruguay | Montevideo | Español | Peso uruguayo | 3.5M | Ganó la primera Copa del Mundo en 1930 |
| 🇻🇪 Venezuela | Caracas | Español | Bolívar | 29M | Salto Ángel, cascada más alta del mundo |

## 🎨 Paleta de Colores

### Colores por País
```javascript
const COUNTRY_COLORS = {
  Argentina: "#74b9ff",    // Azul cielo
  Bolivia: "#fdcb6e",      // Amarillo
  Brasil: "#55efc4",       // Verde menta
  Chile: "#e17055",        // Naranja
  Colombia: "#ffeaa7",     // Amarillo pastel
  Ecuador: "#fab1a0",      // Rosa salmón
  Guyana: "#81ecec",       // Cian
  Paraguay: "#dfe6e9",     // Gris claro
  Perú: "#fd79a8",         // Rosa
  Surinam: "#a29bfe",      // Púrpura
  Uruguay: "#00cec9",      // Turquesa
  Venezuela: "#6c5ce7",    // Morado
};
```

### Gradientes
- **Modo Mapa**: `linear-gradient(135deg,#11998e,#38ef7d)` (Verde)
- **Modo Aprender**: `linear-gradient(135deg,#6c5ce7,#a29bfe)` (Morado)
- **Modo Quiz**: `linear-gradient(135deg,#fd79a8,#e84393)` (Rosa)
- **Modo Desafío**: `linear-gradient(135deg,#e17055,#d63031)` (Naranja-Rojo)
- **Background**: `linear-gradient(180deg,#f0fff4 0%,#f0f8ff 50%,#faf0ff 100%)`

## 🧩 Componentes Principales

### SouthAmericaMapSVG
Componente de mapa SVG con interactividad completa.

**Props:**
- `sel`: País seleccionado
- `found`: Set de países explorados
- `hovered`: País sobre el que está el cursor
- `setHovered`: Función para actualizar hover
- `onClickCountry`: Callback al hacer clic
- `mode`: "explore" | "findIt"

**Características técnicas:**
- ViewBox 480x580
- Stroke dinámico según estado (selected/hover/found)
- Labels con punta de flecha (pointer)
- Tooltips al hacer hover
- Colores degradados por país

### MapMode
Dos submodos integrados:
1. **Explorar**: Descubrir países libremente
2. **Encuéntralo**: Desafío de encontrar países en orden aleatorio

**Estados:**
- `sel`: País actualmente seleccionado
- `found`: Set de países ya explorados
- `target`: País objetivo en modo "Encuéntralo"
- `fScore`: Puntuación en modo desafío
- `queue`: Cola de países por encontrar

### LearnMode
Flashcards educativas con información completa.

**Datos mostrados:**
- Bandera (emoji)
- Nombre del país
- Capital
- Idioma oficial
- Moneda
- Población
- Dato curioso

**Animación:**
```css
.card {
  perspective: 800px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}
.card.flipped {
  transform: rotateY(180deg);
}
```

### QuizMode
12 preguntas sobre capitales.

**Lógica de preguntas:**
```javascript
// 50% "¿Capital de X?"
// 50% "¿De qué país es capital X?"
const askCapital = Math.random() > 0.5;
```

**Sistema de estrellas:**
- 🏆 ≥11 correctas (>90%): "Geógrafa experta"
- 💪 8-10 correctas (≥66%): "Muy bien"
- 📚 <8 correctas: "Sigue practicando"

### ChallengeMode
Modo de velocidad de 60 segundos.

**Características:**
- Array de 96 preguntas (permite responder rápido sin quedarse sin preguntas)
- Feedback reducido a 600ms
- Timer con interpolación de color
- Mensajes según rendimiento:
  - ≥15: "¡Increíble!"
  - ≥10: "¡Muy rápida!"
  - ≥5: "¡Bien!"
  - <5: "¡Practica más!"

## 🚀 Uso

```jsx
import CapitalesSudamerica from "./games/capitales-sudamerica";

// En App.jsx
<Route path="/capitales-sudamerica" element={<CapitalesSudamerica />} />
```

## 🏗️ Estructura de Datos

```javascript
const COUNTRIES = [
  {
    name: "Argentina",
    cap: "Buenos Aires",
    flag: "🇦🇷",
    currency: "Peso argentino",
    lang: "Español",
    pop: "46M",
    fun: "Cuna del tango y el asado"
  },
  // ... 11 países más
];
```

## 📝 Notas Técnicas

### GeoJSON Processing
`southamerica-geo.js` contiene un FeatureCollection simplificado con:
- 12 features (una por país)
- Propiedades mínimas (solo nombre)
- Geometrías simplificadas para rendimiento

### Mapeo de Datos
```javascript
const countryMap = new Map();
COUNTRIES.forEach(c => countryMap.set(c.name, c));

// Lookup O(1)
const info = countryMap.get(featureName);
```

### Responsive Design
```javascript
const MAP_W = 480;
const MAP_H = 580;

<svg viewBox={`0 0 ${MAP_W} ${MAP_H}`}
     style={{ width:"100%", height:"auto", maxHeight:"62vh" }}>
```

### Optimizaciones
- `useMemo` para cálculos de proyección
- Filtrado de features sin info asociada
- Throttling de animaciones
- Event delegation en SVG

## 🎮 Experiencia de Usuario

### Feedback Visual
- ✅ **Correcto**: Background verde `#c8e6c9`, borde `#66BB6A`
- ❌ **Incorrecto**: Background rojo `#ffcdd2`, borde `#ef5350`
- 🔥 **Racha**: Contador visible en esquina superior

### Animaciones
- Confetti al responder correctamente
- Flip 3D en flashcards
- Scale hover en botones (1.03x)
- Pulsación en timer crítico

### Accesibilidad
- Botones mínimo 44x44px
- Contraste WCAG AA
- Textos legibles (≥14px)
- Feedback multi-sensorial (color + iconos)

## 🔮 Futuros Desarrollos

- [ ] Agregar banderas oficiales (imágenes SVG)
- [ ] Modo "Dibuja las fronteras"
- [ ] Comparación de países (tamaño, población)
- [ ] Modo "Viaje por Sudamérica" (ruta optimizada)
- [ ] Datos de PIB y economía
- [ ] Audio de pronunciación de capitales
- [ ] Modo offline con Service Worker
- [ ] Estadísticas históricas de usuario
- [ ] Achievements y badges

## 📚 Referencias

- GeoJSON: Natural Earth Data
- Datos demográficos: Banco Mundial (2023)
- Datos curiosos: Wikipedia
- Banderas emoji: Unicode Consortium

---

**Última actualización:** 2026-02-15
**Desarrollado por:** Angel Samuel Suesca Ríos
