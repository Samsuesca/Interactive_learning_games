# 🧮 Tablas de Multiplicar

**Juego educativo interactivo para dominar las tablas de multiplicar del 1 al 12.**

## 📋 Características

- 🔢 **Tabla Interactiva**: Cuadrícula 12×12 con colores tipo mapa de calor, filtros por tabla y resaltado interactivo
- 📚 **Modo Aprender**: Flashcards con las multiplicaciones más difíciles (tablas del 6-9, 11, 12) y visualización con puntos
- 🧠 **Modo Quiz**: 15 preguntas con 3 tipos de ejercicios variados
- ⚡ **Modo Desafío**: 60 segundos de multiplicaciones rápidas contra reloj

## 🎯 Objetivos de Aprendizaje

- Memorizar las tablas de multiplicar del 1 al 12
- Desarrollar agilidad mental en cálculo aritmético
- Reconocer patrones en las multiplicaciones
- Completar operaciones con factores faltantes

## 📊 Datos

- **Total operaciones**: 144 (12 × 12)
- **Tablas**: 1 a 12
- **Flashcards de aprendizaje**: 36 (combinaciones difíciles: 6-9, 11, 12)
- **Tipos de pregunta**: 3

### Tipos de Pregunta

1. **Producto directo**: "¿Cuánto es 7 × 8?" → 56
2. **Completar factor**: "Completa: 9 × ___ = 72" → 8
3. **Producto directo (variante)**: "4 × 11 = ?" → 44

## 🎨 Paleta de Colores

- **Fondo**: Deep blue (`#1a237e` → `#283593` → `#3949ab`)
- **Acentos**: Orange/gold (`#FF6F00`, `#F4511E`)
- **Mapa de calor**: Light blue (`rgb(66,165,245)`) → Deep orange (`rgb(255,111,0)`)
- **Feedback correcto**: Green (`#c8e6c9`)
- **Feedback incorrecto**: Red (`#ffcdd2`)

## 🧩 Componentes Principales

### ExploreMode
Cuadrícula interactiva 12×12 con:
- Encabezados de fila/columna clickeables para filtrar tablas
- Mapa de calor cromático basado en el valor del producto
- Resaltado de fila/columna al pasar el mouse
- Vista detallada de cada tabla individual con lista de operaciones

### LearnMode
Flashcards con el subconjunto de multiplicaciones más difíciles:
- Frente: operación grande (ej. "7 × 8")
- Reverso: resultado con grid visual de puntos (filas × columnas)
- Navegación secuencial con marcado de "aprendido"

### QuizMode
15 preguntas aleatorias con tipos variados y opciones múltiples generadas por el motor compartido.

### ChallengeMode
60 segundos, preguntas rápidas con temporizador visual y racha de aciertos.

## 🚀 Uso

```jsx
import TablasMultiplicar from "./games/tablas-multiplicar";

<Route path="/tablas-multiplicar" element={<TablasMultiplicar />} />
```

## 🔧 Motor Compartido

Utiliza los componentes del engine compartido:
- `GameShell` - Menú y navegación
- `QuizMode` - Motor de quiz con opciones múltiples
- `ChallengeMode` - Motor de desafío contra reloj
- `LearnMode` - Motor de flashcards con flip
- `useGameProgress` - Persistencia de progreso en localStorage

## 📝 Notas

- Las flashcards de aprendizaje se limitan a las combinaciones más difíciles (tablas 6-9, 11, 12 cruzadas entre sí) para maximizar el impacto educativo
- La cuadrícula de exploración muestra las 144 operaciones completas
- El mapa de calor ayuda a visualizar patrones (productos grandes = colores cálidos)
- El grid de puntos en el reverso de las flashcards refuerza el concepto visual de multiplicación como "filas × columnas"
