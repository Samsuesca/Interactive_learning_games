# 🇪🇺 Capitales de Europa

Juego educativo interactivo para aprender las capitales de 30 países europeos con mapa interactivo, tarjetas educativas, quiz y desafío contrarreloj.

## 📋 Características

### 🗺️ Modo Mapa Interactivo
- **Exploración libre**: Toca cualquier país para ver información completa (capital, población, idioma, moneda, dato curioso)
- **Encuéntralo**: Encuentra países específicos en el mapa
- Mapa con GeoJSON simplificado de Europa (d3-geo con proyección Mercator)
- Labels con bandera, capital, idioma y población
- Colores por región: Nórdicos (azules), Occidentales (verdes), Centrales (amarillos), Sureños (rojos), Orientales (ámbar), Bálticos (púrpura)
- Contador de países explorados (0/30)
- Hover tooltips con nombre y bandera
- Tarjeta de información detallada bajo el mapa

### 📚 Modo Aprender
- Flashcards con animación flip 3D
- **Vista frontal**: Bandera (grande), nombre del país, idioma y moneda
- **Vista trasera**: Capital, dato curioso y población
- Navegación con flechas
- Sistema de marcado "Aprendido"
- Barra de progreso (X/30)
- Datos curiosos únicos de cada país

### 🧠 Modo Quiz
- 12 preguntas aleatorias (de un pool de 30 países)
- 3 tipos de preguntas: "¿Capital de X?", "¿De qué país es capital X?", "¿A qué país pertenece esta bandera?"
- 4 opciones de respuesta
- Feedback visual inmediato (verde/rojo)
- Sistema de racha de aciertos consecutivos
- Estrellas según rendimiento (1-3)

### ⚡ Modo Desafío Relámpago
- 60 segundos contra reloj
- Preguntas ilimitadas
- Timer visual con cambio de color en los últimos 10 segundos
- Contador de racha en vivo
- Estadísticas finales

## 🎯 Objetivos de Aprendizaje

- Identificar 30 países de Europa en el mapa
- Memorizar las capitales de cada país
- Conocer idiomas oficiales y monedas
- Aprender datos curiosos de cada país
- Desarrollar conocimiento geográfico y cultural europeo

## 📊 Datos

- **Total países**: 30
- **Total capitales**: 30
- **Regiones**: Nórdica (5), Occidental (6), Central (5), Sureña (6), Oriental (4), Báltica (3), UK (1)
- **Fuente de mapa**: GeoJSON simplificado basado en Natural Earth Data
- **Proyección**: Mercator centrada en [15, 55] (d3-geo)

### Países y Datos

| País | Capital | Idioma | Moneda | Población |
|------|---------|--------|--------|-----------|
| 🇪🇸 España | Madrid | Español | Euro (€) | 48M |
| 🇫🇷 Francia | París | Francés | Euro (€) | 68M |
| 🇩🇪 Alemania | Berlín | Alemán | Euro (€) | 84M |
| 🇮🇹 Italia | Roma | Italiano | Euro (€) | 59M |
| 🇬🇧 Reino Unido | Londres | Inglés | Libra esterlina (£) | 67M |
| 🇵🇹 Portugal | Lisboa | Portugués | Euro (€) | 10M |
| 🇳🇱 Países Bajos | Ámsterdam | Neerlandés | Euro (€) | 18M |
| 🇧🇪 Bélgica | Bruselas | Francés / Neerlandés / Alemán | Euro (€) | 12M |
| 🇨🇭 Suiza | Berna | Alemán / Francés / Italiano / Romanche | Franco suizo (CHF) | 9M |
| 🇦🇹 Austria | Viena | Alemán | Euro (€) | 9M |
| 🇵🇱 Polonia | Varsovia | Polaco | Złoty (PLN) | 38M |
| 🇨🇿 República Checa | Praga | Checo | Corona checa (CZK) | 11M |
| 🇸🇪 Suecia | Estocolmo | Sueco | Corona sueca (SEK) | 10M |
| 🇳🇴 Noruega | Oslo | Noruego | Corona noruega (NOK) | 5M |
| 🇩🇰 Dinamarca | Copenhague | Danés | Corona danesa (DKK) | 6M |
| 🇫🇮 Finlandia | Helsinki | Finés / Sueco | Euro (€) | 6M |
| 🇮🇪 Irlanda | Dublín | Inglés / Irlandés | Euro (€) | 5M |
| 🇬🇷 Grecia | Atenas | Griego | Euro (€) | 10M |
| 🇷🇴 Rumanía | Bucarest | Rumano | Leu rumano (RON) | 19M |
| 🇭🇺 Hungría | Budapest | Húngaro | Forinto (HUF) | 10M |
| 🇧🇬 Bulgaria | Sofía | Búlgaro | Lev búlgaro (BGN) | 7M |
| 🇭🇷 Croacia | Zagreb | Croata | Euro (€) | 4M |
| 🇷🇸 Serbia | Belgrado | Serbio | Dinar serbio (RSD) | 7M |
| 🇺🇦 Ucrania | Kiev | Ucraniano | Grivna (UAH) | 44M |
| 🇹🇷 Turquía | Ankara | Turco | Lira turca (TRY) | 85M |
| 🇮🇸 Islandia | Reikiavik | Islandés | Corona islandesa (ISK) | 0.4M |
| 🇱🇺 Luxemburgo | Luxemburgo | Francés / Alemán / Luxemburgués | Euro (€) | 0.7M |
| 🇪🇪 Estonia | Tallin | Estonio | Euro (€) | 1.3M |
| 🇱🇻 Letonia | Riga | Letón | Euro (€) | 1.8M |
| 🇱🇹 Lituania | Vilna | Lituano | Euro (€) | 2.8M |

## 🎨 Paleta de Colores

### Colores por Región
```javascript
const REGION_COLORS = {
  // Nordic - cool blues
  Sweden: "#74b9ff", Norway: "#0984e3", Denmark: "#6c5ce7",
  Finland: "#a29bfe", Iceland: "#81ecec",
  // Western - greens
  France: "#55efc4", Belgium: "#00b894", Netherlands: "#00cec9",
  Luxembourg: "#00b894", Switzerland: "#2ed573", Ireland: "#26de81",
  // Central - warm yellows/oranges
  Germany: "#ffeaa7", Austria: "#fdcb6e", "Czech Republic": "#fab1a0",
  Poland: "#f9ca24", Hungary: "#f0932b",
  // Southern - reds/pinks
  Spain: "#e17055", Portugal: "#fd79a8", Italy: "#ff7675",
  Greece: "#d63031", Croatia: "#e84393", Turkey: "#eb4d4b",
  // Eastern - ambers/teals
  Romania: "#f39c12", Bulgaria: "#e67e22", Serbia: "#d35400",
  Ukraine: "#1abc9c",
  // Baltic - purples
  Estonia: "#9b59b6", Latvia: "#8e44ad", Lithuania: "#6c5ce7",
  // UK
  "United Kingdom": "#636e72",
};
```

### Gradientes
- **Primary**: `linear-gradient(135deg,#003399,#1a5276)` (Azul europeo)
- **Modo Mapa**: `linear-gradient(135deg,#003399,#1a5276)`
- **Modo Aprender**: `linear-gradient(135deg,#11998e,#38ef7d)` (Verde)
- **Modo Quiz**: `linear-gradient(135deg,#6c5ce7,#a29bfe)` (Morado)
- **Modo Desafío**: `linear-gradient(135deg,#e17055,#d63031)` (Rojo)
- **Background**: `linear-gradient(180deg,#003399 0%,#1a5276 50%,#0e6655 100%)`

## 🧩 Componentes Principales

### EuropeMapSVG
Componente de mapa SVG con interactividad completa.

**Props:**
- `sel`: País seleccionado (nameGeo)
- `found`: Set de países explorados
- `hovered`: País sobre el que está el cursor
- `setHovered`: Función para actualizar hover
- `onClickCountry`: Callback al hacer clic
- `mode`: "explore" | "findIt"

**Características técnicas:**
- ViewBox 520x580
- Proyección Mercator centrada en Europa
- Colores por región geográfica
- Labels con punta de flecha
- Tooltips al hacer hover

### EuropeMapMode
Dos submodos integrados:
1. **Explorar**: Descubrir países libremente con tarjeta de info
2. **Encuéntralo**: Desafío de encontrar 30 países en el mapa

### EuropeLearnMode
Flashcards educativas con flag, nombre, capital, datos curiosos.

### EuropeQuizMode
12 preguntas con 3 tipos de preguntas diferentes.

### EuropeChallengeMode
Desafío de 60 segundos con preguntas mixtas.

## 🚀 Uso

```jsx
import CapitalesEuropa from "./games/capitales-europa";

// En App.jsx
<Route path="/capitales-europa" element={<CapitalesEuropa />} />
```

## 🏗️ Estructura de Datos

```javascript
const COUNTRIES = [
  {
    name: "España",        // Nombre en español (para UI)
    nameGeo: "Spain",      // Nombre en inglés (para match con GeoJSON)
    flag: "🇪🇸",
    cap: "Madrid",
    pop: "48M",
    lang: "Español",
    currency: "Euro (€)",
    fun: "Tiene el segundo mayor número de Patrimonios de la Humanidad UNESCO"
  },
  // ... 29 países más
];
```

## 📝 Notas Técnicas

### GeoJSON Processing
`europe-geo.js` contiene un FeatureCollection simplificado con:
- 30 features (una por país)
- Propiedades: `name` (inglés) y `name_es` (español)
- Geometrías simplificadas para rendimiento
- Turquía solo incluye la parte europea (Tracia)

### Mapeo de Datos
Los datos usan `nameGeo` para hacer match con los features del GeoJSON:
```javascript
const countryMap = new Map();
COUNTRIES.forEach(c => countryMap.set(c.nameGeo, c));
```

### Responsive Design
```javascript
const MAP_W = 520;
const MAP_H = 580;

<svg viewBox={`0 0 ${MAP_W} ${MAP_H}`}
     style={{ width:"100%", height:"auto", maxHeight:"62vh" }}>
```

## 📚 Referencias

- GeoJSON: Natural Earth Data (simplificado)
- Datos demográficos: Eurostat / Banco Mundial (2024)
- Datos curiosos: Wikipedia
- Banderas emoji: Unicode Consortium

---

**Última actualización:** 2026-03-20
**Desarrollado por:** Angel Samuel Suesca Ríos
