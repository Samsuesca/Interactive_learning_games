# 📐 Figuras Geométricas

**Juego interactivo para aprender figuras 2D, polígonos y volúmenes 3D**

Explora las propiedades, fórmulas y datos curiosos de 16 figuras geométricas a través de múltiples modos de juego.

## Características

- **🔍 Modo Explorar**: Galería visual con filtros por tipo (2D/3D). Toca una figura para ver su ficha completa con fórmulas, propiedades y datos curiosos.
- **📚 Modo Aprender**: Flashcards con animación flip 3D. Frente: figura con nombre y categoría. Reverso: fórmulas de área/volumen y perímetro/superficie.
- **🧠 Modo Quiz**: 15 preguntas variadas — identifica figuras, fórmulas, número de lados/caras y categorías.
- **⚡ Modo Desafío**: 60 segundos para responder la mayor cantidad de preguntas. Acumula rachas de aciertos.

## Objetivos de Aprendizaje

- Reconocer figuras geométricas 2D y sólidos 3D por su forma visual
- Memorizar fórmulas de área, perímetro, volumen y superficie
- Clasificar figuras según su categoría (polígono, poliedro, sólido de revolución)
- Conocer propiedades como número de lados, caras y ángulos

## Datos

- **Total figuras**: 16
  - **Figuras 2D (10)**: Triángulo, Cuadrado, Rectángulo, Rombo, Trapecio, Pentágono, Hexágono, Octágono, Círculo, Paralelogramo
  - **Figuras 3D (6)**: Cubo, Esfera, Cilindro, Cono, Pirámide, Prisma
- **Categorías**: Polígono, Polígono regular, Figura curva, Poliedro, Poliedro regular, Sólido de revolución
- **Tipos de pregunta**: 5 (fórmulas, identificación visual, lados/caras, tipo 2D/3D, categoría)

## Paleta de Colores

- Primary: `#667eea` (Índigo)
- Secondary: `#764ba2` (Púrpura)
- Accent: `#f093fb` (Rosa)
- Gradient del juego: `linear-gradient(180deg, #f0f0ff, #fff5f5, #f0f4ff)`

## Componentes Principales

### ShapeSVG
Renderiza cada figura geométrica como SVG vectorial. Soporta tamaño y color personalizables. Incluye representaciones 3D con perspectiva para cubos, pirámides, prismas, conos, cilindros y esferas.

### ExploreMode
Galería con filtros (Todas / 2D / 3D). Grid de 2 columnas con tarjetas interactivas. Vista detallada con fórmulas, propiedades y datos curiosos.

### LearnMode
Flashcards con flip 3D (perspective 800px). Navegación con flechas. Sistema de "marcar como aprendida" con tracking de progreso.

### QuizMode
15 preguntas con 5 tipos distintos de pregunta generadas aleatoriamente. Feedback visual inmediato (1200ms). Sistema de racha y estrellas.

### ChallengeMode
Temporizador de 60 segundos con feedback visual (verde > naranja > rojo). Feedback rápido (600ms). 96 preguntas pre-generadas.

## Uso

```jsx
import FigurasGeometricas from "./games/figuras-geometricas";

<Route path="/figuras-geometricas" element={<FigurasGeometricas />} />
```

## Notas

- Las figuras se renderizan como SVG puro (sin imágenes externas)
- Las figuras 3D usan polígonos con opacidad diferenciada para simular profundidad
- Los datos curiosos están verificados y son educativos
- Todas las fórmulas siguen la notación matemática estándar
