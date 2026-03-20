# 🪐 Sistema Solar

**Explora los planetas, estrellas y cuerpos celestes de nuestro sistema solar**

## 📋 Características

- 🔭 **Modo Explorar**: Sistema solar interactivo con SVG animado, órbitas y planetas clicables
- 📚 **Modo Aprender**: Tarjetas con datos completos de cada cuerpo celeste (flip animation)
- 🧠 **Modo Quiz**: 12 preguntas de opción múltiple sobre tipos, lunas, temperaturas y órbitas
- ⚡ **Modo Desafío**: 60 segundos para responder la mayor cantidad de preguntas

## 🎯 Objetivos de Aprendizaje

- Aprender los nombres y orden de los planetas del sistema solar
- Conocer las características físicas de cada planeta (tamaño, masa, gravedad)
- Diferenciar entre planetas rocosos, gigantes gaseosos, gigantes helados y planetas enanos
- Memorizar datos curiosos sobre cada cuerpo celeste
- Entender escalas de distancia en unidades astronómicas (AU)

## 📊 Datos

- **Total elementos**: 11 (Sol + 8 planetas + 2 planetas enanos)
- **Categorías**: Estrella, Planeta rocoso, Gigante gaseoso, Gigante helado, Planeta enano
- **Fuente de datos**: NASA Planetary Fact Sheets

### Cuerpos celestes incluidos

| Nombre | Tipo | Distancia (AU) | Lunas |
|--------|------|----------------|-------|
| Sol | Estrella | 0 | 0 |
| Mercurio | Planeta rocoso | 0.39 | 0 |
| Venus | Planeta rocoso | 0.72 | 0 |
| Tierra | Planeta rocoso | 1.0 | 1 |
| Marte | Planeta rocoso | 1.52 | 2 |
| Ceres | Planeta enano | 2.77 | 0 |
| Júpiter | Gigante gaseoso | 5.20 | 95 |
| Saturno | Gigante gaseoso | 9.58 | 146 |
| Urano | Gigante helado | 19.18 | 28 |
| Neptuno | Gigante helado | 30.07 | 16 |
| Plutón | Planeta enano | 39.48 | 5 |

## 🎨 Paleta de Colores

- **Background**: `#0c0c2e` → `#1a1a4e` → `#2d1b69` (deep space gradient)
- **Sun accent**: `#FFD700`, `#FFA500`
- **Title gradient**: `#f39c12` → `#e74c3c` (gold to red)
- **Planet colors**:
  - Mercury: `#b0b0b0`
  - Venus: `#e8c56d`
  - Earth: `#4a90d9`
  - Mars: `#c0392b`
  - Jupiter: `#d4956a`
  - Saturn: `#c9a96e`
  - Uranus: `#73c2c6`
  - Neptune: `#3b5998`

## 🧩 Componentes Principales

### ExploreMode
Sistema solar interactivo renderizado como SVG. Incluye:
- Sol al centro con efecto de resplandor animado
- Planetas orbitando con animación CSS a diferentes velocidades
- Órbitas como círculos punteados
- Anillos de Saturno (SVG ellipse)
- Estrellas de fondo con efecto de parpadeo
- Tarjeta de información al hacer clic en cualquier cuerpo celeste
- Cinturón de asteroides visual para Ceres

### LearnMode (engine)
Tarjetas con flip animation:
- **Frente**: Círculo con color del planeta + nombre + tipo (badge)
- **Reverso**: Distancia, diámetro, lunas, temperatura, órbita, gravedad y dato curioso

### QuizMode (engine)
12 preguntas con 4 tipos:
1. Tipo de cuerpo celeste
2. Número de lunas
3. Temperatura
4. Período orbital

### ChallengeMode (engine)
60 segundos, mismos tipos de preguntas que QuizMode pero contra reloj.

## 🚀 Uso

```jsx
import SistemaSolar from "./games/sistema-solar";

<Route path="/sistema-solar" element={<SistemaSolar />} />
```

## 📝 Notas

- Los datos científicos provienen de NASA Planetary Fact Sheets
- El conteo de lunas de Júpiter (95) y Saturno (146) refleja datos actualizados a 2024
- Las animaciones orbitales no están a escala real pero mantienen proporcionalidad relativa
- El SVG es responsive y se adapta al ancho del contenedor
- Ceres se posiciona en el cinturón de asteroides entre Marte y Júpiter
