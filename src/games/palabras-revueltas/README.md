# 🔤 Palabras Revueltas

**Ordena las letras desordenadas y forma la palabra correcta antes de que se acabe el tiempo.**

## Caracteriticas

- 🗂️ **Modo Explorar**: Navega por categorias con tarjetas tipo flashcard para conocer todas las palabras y sus pistas
- 📚 **Modo Aprender**: Practica ordenando letras con pistas y 30 segundos por palabra (8 palabras por categoria)
- 🧠 **Modo Quiz**: 12 palabras aleatorias de todas las categorias con pistas, racha de aciertos y puntuacion
- ⚡ **Modo Desafio**: 60 segundos contrarreloj sin pistas. ¿Cuantas palabras puedes resolver?

## Objetivos de Aprendizaje

- Mejorar el vocabulario en espanol reconociendo palabras desordenadas
- Practicar ortografia y composicion de palabras
- Desarrollar agilidad mental bajo presion de tiempo
- Aprender palabras organizadas por categorias tematicas

## Datos

- **Total palabras**: 72
- **Categorias**: 6 (Animales, Frutas, Paises, Profesiones, Deportes, Colores)
- **Palabras por categoria**: 12
- **Fuente de datos**: Manual (vocabulario comun en espanol)

## Paleta de Colores

- Animales: `#FF6B6B` (Rojo coral)
- Frutas: `#4ECDC4` (Turquesa)
- Paises: `#667eea` (Azul-morado)
- Profesiones: `#F9A825` (Amarillo)
- Deportes: `#AB47BC` (Purpura)
- Colores: `#e84393` (Rosa)

## Componentes Principales

### ExploreMode
Navegacion por categorias con tarjetas flip que muestran la palabra en el frente y la pista en el reverso. Permite marcar palabras como aprendidas con barra de progreso.

### LearnMode
Practica guiada por categoria. Presenta 8 palabras con letras desordenadas, 30 segundos por palabra, con pista visible. Muestra resultado con sistema de estrellas.

### QuizMode
12 palabras aleatorias de todas las categorias. 30 segundos por palabra, con pista y categoria visible. Sistema de racha de aciertos consecutivos y puntuacion final con estrellas.

### ChallengeMode
Modo contrarreloj de 60 segundos globales. Las palabras aparecen sin pista. Cada palabra individual tiene 30 segundos de limite. Cuenta las palabras resueltas correctamente.

### WordPuzzle
Componente central del juego. Muestra letras desordenadas como botones interactivos (tiles). El jugador toca las letras en orden para formar la palabra en los slots de respuesta. Incluye temporizador individual, boton de borrar, y feedback visual (verde/rojo).

### LetterTile / AnswerSlot
Componentes de UI para las letras disponibles y los espacios de respuesta. Feedback visual con colores y animaciones.

## Uso

```jsx
import PalabrasRevueltas from "./games/palabras-revueltas";

<Route path="/palabras-revueltas" element={<PalabrasRevueltas />} />
```

## Notas

- Las palabras se desordean aleatoriamente con verificacion de que no queden en el orden original
- El jugador puede tocar letras para colocarlas o tocar slots para remover letras
- El modo Desafio no muestra pistas para mayor dificultad
- Las categorias son extensibles: agregar nuevas categorias solo requiere anadir un objeto al array CATEGORIES
