# 🐾 ¿Qué Animal Soy?

**Adivina el animal a partir de pistas progresivas. ¡Mientras menos pistas uses, más puntos ganas!**

## Características

- 🔍 **Modo ¿Qué animal soy?**: 5 pistas progresivas de difícil a fácil. Puntuación: 50, 40, 30, 20, 10 según la pista usada. 3 opciones de respuesta por ronda.
- 📚 **Modo Aprender**: Tarjetas interactivas con datos de cada animal, sus pistas y datos curiosos.
- 🧠 **Modo Quiz**: 15 preguntas variadas sobre animales, categorías y hábitats.
- ⚡ **Modo Desafío**: 60 segundos para adivinar la mayor cantidad de animales con el sistema de pistas.

## Objetivos de Aprendizaje

- Conocer características únicas de 20 animales de todo el mundo
- Aprender sobre hábitats, categorías y curiosidades del reino animal
- Desarrollar razonamiento deductivo a partir de pistas

## Datos

- **Total animales**: 20
- **Categorías**: Mamíferos, aves, reptiles, anfibios, insectos, moluscos, marsupiales, mamíferos marinos
- **Pistas por animal**: 5 (de difícil a fácil)
- **Fuente de datos**: Datos verificados de zoología general

## Paleta de Colores

- Primary: `#f5af19` → `#f12711` (naranja-rojo)
- Secondary: `#6c5ce7` → `#a29bfe` (morado)
- Accent: `#e17055` → `#d63031` (rojo)

## Mecánica Principal

### Sistema de Pistas Progresivas

Cada ronda muestra pistas de difícil a fácil:

| Pista | Dificultad | Puntos |
|-------|-----------|--------|
| #1    | Muy difícil | 50 pts |
| #2    | Difícil    | 40 pts |
| #3    | Media      | 30 pts |
| #4    | Fácil      | 20 pts |
| #5    | Muy fácil  | 10 pts |

El jugador puede responder en cualquier momento o pedir más pistas. Si falla, obtiene 0 puntos en esa ronda.

## Componentes Principales

### ClueMode
Modo principal con 10 rondas. Se revelan pistas una a una. 3 opciones de respuesta. Feedback con dato curioso al responder.

### LearnMode
Tarjetas flip con el animal al frente y sus 5 pistas + dato curioso en el reverso. Sistema de marcado "aprendido".

### QuizMode
15 preguntas aleatorias mezclando identificación por pista, categoría y hábitat. 4 opciones, racha de aciertos.

### ChallengeMode
Versión contrarreloj (60s) del sistema de pistas. Feedback rápido (500ms). Acumula puntos según pista usada.

## Uso

```jsx
import QueAnimalSoy from "./games/que-animal-soy";

<Route path="/que-animal-soy" element={<QueAnimalSoy />} />
```

## Animales Incluidos

| Animal | Categoría | Hábitat |
|--------|-----------|---------|
| 🦁 León | Mamífero | Sabana africana |
| 🐬 Delfín | Mamífero marino | Océanos y mares |
| 🐘 Elefante | Mamífero | África y Asia |
| 🐧 Pingüino | Ave | Antártida |
| 🦅 Águila | Ave rapaz | Montañas y bosques |
| 🐙 Pulpo | Molusco | Fondos marinos |
| 🦎 Camaleón | Reptil | Bosques tropicales |
| 🐝 Abeja | Insecto | Prados y jardines |
| 🦈 Tiburón | Pez cartilaginoso | Océanos |
| 🐨 Koala | Marsupial | Australia |
| 🦒 Jirafa | Mamífero | Sabana africana |
| 🦘 Canguro | Marsupial | Australia |
| 🐻‍❄️ Oso polar | Mamífero | Ártico |
| 🐢 Tortuga | Reptil | Todo el mundo |
| 🦇 Murciélago | Mamífero volador | Cuevas y bosques |
| 🦜 Loro | Ave | Bosques tropicales |
| 🐸 Rana | Anfibio | Zonas húmedas |
| 🐋 Ballena azul | Mamífero marino | Todos los océanos |
| 🐊 Cocodrilo | Reptil | Ríos y pantanos |
| 🦋 Mariposa | Insecto | Jardines y prados |
