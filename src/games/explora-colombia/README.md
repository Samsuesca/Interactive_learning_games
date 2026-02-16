# 🇨🇴 Explora Colombia

Juego educativo interactivo para aprender los 32 departamentos de Colombia, sus capitales y las 6 regiones naturales.

## 📋 Características

### 🗺️ Modo Mapa Interactivo
- **Exploración libre**: Toca cualquier departamento para ver su información detallada
- **Encuéntralo**: Modo de desafío donde debes encontrar departamentos específicos
- Visualización con GeoJSON real de fronteras departamentales
- Labels con departamento, capital y región
- Colores por región natural (Caribe, Andina, Pacífica, Orinoquía, Amazonía, Insular)
- Contador de departamentos explorados (0/32)

### 📚 Modo Aprender
- Flashcards interactivas con animación de flip 3D
- Vista frontal: Departamento + Región
- Vista trasera: Capital + dato de la región
- Navegación con flechas ◀ ▶
- Sistema de marcado "Aprendido" para seguimiento de progreso
- Barra de progreso visual (X/32 aprendidos)

### 🧠 Modo Quiz
- 15 preguntas aleatorias
- Preguntas variadas: "¿Capital de X?" o "¿Departamento de Y?"
- 4 opciones de respuesta por pregunta
- Feedback visual inmediato (verde ✅ / rojo ❌)
- Sistema de racha de aciertos 🔥
- Puntuación final con estrellas ⭐ (1-3 según %)
- Mensajes motivacionales según rendimiento

### ⚡ Modo Desafío Relámpago
- 60 segundos contra reloj ⏱
- Preguntas ilimitadas hasta que se acabe el tiempo
- Timer visual con cambio de color (verde → amarillo → rojo)
- Contador de racha en tiempo real
- Animación de pulsación cuando quedan <10 segundos
- Puntuación final: "¿Cuántas correctas en 60s?"

## 🎯 Objetivos de Aprendizaje

- Identificar los 32 departamentos de Colombia en el mapa
- Memorizar las capitales de cada departamento
- Reconocer las 6 regiones naturales de Colombia
- Asociar departamentos con sus regiones
- Desarrollar conocimiento geográfico de forma lúdica

## 📊 Datos

- **Total departamentos**: 32
- **Total capitales**: 32
- **Regiones naturales**: 6 (Caribe, Andina, Pacífica, Orinoquía, Amazonía, Insular)
- **Fuente de mapa**: GeoJSON con fronteras reales de departamentos
- **Proyección**: Mercator (d3-geo)

### Regiones y sus colores

| Región | Color | Emoji | Departamentos |
|--------|-------|-------|---------------|
| Caribe | `#FF6B6B` (Rojo) | 🏖️ | Atlántico, Bolívar, Cesar, Córdoba, La Guajira, Magdalena, Sucre |
| Andina | `#667eea` (Morado) | 🏔️ | Antioquia, Boyacá, Caldas, Cundinamarca, Huila, Norte de Santander, Quindío, Risaralda, Santander, Tolima |
| Pacífica | `#4ECDC4` (Turquesa) | 🌊 | Cauca, Chocó, Nariño, Valle del Cauca |
| Orinoquía | `#F9A825` (Amarillo) | 🌾 | Arauca, Casanare, Meta, Vichada |
| Amazonía | `#66BB6A` (Verde) | 🌿 | Amazonas, Caquetá, Guainía, Guaviare, Putumayo, Vaupés |
| Insular | `#AB47BC` (Púrpura) | 🏝️ | San Andrés y Providencia |

## 🎨 Paleta de Colores

- **Gradiente principal**: `linear-gradient(135deg,#F9A825,#f12711)` (Naranja-Rojo)
- **Background**: `linear-gradient(180deg,#fef9f0 0%,#fff5f5 50%,#f0f4ff 100%)`
- **Modo Aprender**: `linear-gradient(135deg,#667eea,#764ba2)` (Morado)
- **Modo Quiz**: `linear-gradient(135deg,#f5af19,#f12711)` (Naranja)
- **Modo Desafío**: `linear-gradient(135deg,#f5af19,#f12711)` (Naranja-Rojo)
- **Feedback correcto**: `#c8e6c9` (Verde claro)
- **Feedback incorrecto**: `#ffcdd2` (Rojo claro)

## 🧩 Componentes Principales

### MapMode
Componente de mapa interactivo con dos submodos:
- **Explorar**: Libre exploración tocando departamentos
- **Encuéntralo**: Desafío de encontrar departamentos específicos

**Características técnicas:**
- Usa `geoMercator` y `geoPath` de d3-geo
- SVG responsive con viewBox 480x560
- Hover tooltips con nombre del departamento
- Labels detallados al seleccionar (departamento, capital, región)
- Filtros SVG para sombras y glow

### LearnMode
Flashcards con animación 3D flip.

**Características:**
- Perspectiva CSS 3D (800px)
- Transform rotateY(180deg) al hacer flip
- Backface-visibility hidden
- Gradientes dinámicos (morado → rosa)

### QuizMode
Quiz interactivo con 15 preguntas.

**Características:**
- Generación aleatoria de preguntas
- Mezcla de opciones (shuffle)
- Timer de 1.2s entre preguntas para ver feedback
- Sistema de estrellas según % de aciertos:
  - ⭐⭐⭐ ≥90% (13+ correctas)
  - ⭐⭐ ≥60% (9-12 correctas)
  - ⭐ >0% (1-8 correctas)

### ChallengeMode
Modo contra reloj de 60 segundos.

**Características:**
- Intervalo de 1 segundo para countdown
- Preguntas ilimitadas (array de 96 elementos)
- Tiempo de feedback reducido (600ms)
- Cambio de color de UI según tiempo restante
- Animación de pulsación en últimos 10 segundos

## 🚀 Uso

```jsx
import ExploraColombia from "./games/explora-colombia";

// En App.jsx
<Route path="/explora-colombia" element={<ExploraColombia />} />
```

## 🏗️ Estructura de Datos

```javascript
const DEPTS = [
  {
    dept: "Antioquia",
    cap: "Medellín",
    r: "andina"  // región
  },
  // ... 31 departamentos más
];

const REGIONS = {
  caribe: { name: "Caribe", color: "#FF6B6B", emoji: "🏖️" },
  // ... 5 regiones más
};
```

## 📝 Notas Técnicas

### GeoJSON Processing
El archivo `colombia-geo.js` contiene un FeatureCollection con 32 features (uno por departamento). Cada feature tiene:
- `properties.name`: Nombre del departamento
- `geometry`: Coordenadas del polígono

### Proyección del Mapa
```javascript
const projection = geoMercator().fitSize([MAP_W, MAP_H], colombiaGeo);
const pathGenerator = geoPath().projection(projection);
```

### Optimización de Renderizado
- `useMemo` para calcular projection y features una sola vez
- Map de departamentos para búsqueda O(1)
- Filtering de features para excluir geometrías inválidas

### Animaciones CSS
```css
@keyframes cFall {
  0% { transform: translateY(0) rotate(0); opacity: 1 }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0 }
}

@keyframes floatUp {
  0% { transform: translateY(0); opacity: 1 }
  100% { transform: translateY(600px); opacity: 0 }
}
```

## 🔮 Futuros Desarrollos

- [ ] Agregar modo "Capitales vs Departamentos" (batalla)
- [ ] Sonidos de feedback (correcto/incorrecto)
- [ ] Guardar progreso en localStorage
- [ ] Modo multijugador (competencia de velocidad)
- [ ] Exportar estadísticas (CSV/PDF)
- [ ] Agregar datos económicos (PIB, población)
- [ ] Modo "dibuja el mapa" (trazar fronteras)

## 📚 Referencias

- GeoJSON de Colombia: Datos oficiales de DANE
- Regiones naturales: IGAC
- Capitales: Constitución Política de Colombia

---

**Última actualización:** 2026-02-15
**Desarrollado por:** Angel Samuel Suesca Ríos
