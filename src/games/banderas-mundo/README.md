# 🌍 Banderas del Mundo

**Aprende las banderas, capitales y datos curiosos de 50 países de los 5 continentes.**

## 📋 Características

- 🏳️ **Galería de Banderas**: Explora las 50 banderas con filtro por continente y modo "Encuéntralo"
- 📚 **Modo Aprender**: Tarjetas interactivas con flip 3D mostrando bandera, capital, idioma y datos curiosos
- 🧠 **Modo Quiz**: 15 preguntas aleatorias con 3 tipos: identificar país por bandera, bandera por país, y capitales
- ⚡ **Modo Desafío**: 60 segundos para responder la mayor cantidad de preguntas posibles

## 🎯 Objetivos de Aprendizaje

- Reconocer las banderas de 50 países del mundo
- Aprender las capitales de cada país
- Conocer datos curiosos, idiomas y monedas
- Identificar la distribución geográfica por continentes

## 📊 Datos

- **Total países**: 50
- **Continentes**: 5 (Europa: 14, América: 13, Asia: 12, África: 8, Oceanía: 3)
- **Fuente de datos**: Datos verificados manualmente
- **Tipos de pregunta**: 3 (bandera→país, país→bandera, país→capital)

## 🎨 Paleta de Colores

- Primary: `#0052D4` → `#6FB1FC` (Azul mundo/cielo)
- Learn Back: `#6c5ce7` → `#a29bfe` (Morado)
- Quiz: `#fd79a8` → `#e84393` (Rosa)
- Challenge: `#e17055` → `#d63031` (Naranja-Rojo)
- Background: `#f0f4ff` → `#e8f0ff` → `#f5f0ff`

## 🧩 Componentes Principales

### GalleryMode
Galería interactiva de banderas en grid de 5 columnas. Incluye filtro por continente (Europa, América, Asia, África, Oceanía) y dos sub-modos:
- **Explorar**: Toca banderas para ver información detallada del país
- **Encuéntralo**: Encuentra la bandera del país indicado entre las 50 opciones

### LearnMode
Tarjetas educativas con animación 3D flip:
- **Frente**: Bandera grande + nombre del país + continente + idioma/moneda
- **Reverso**: Capital + dato curioso + información adicional

### QuizMode
Quiz de 15 preguntas con 3 tipos de preguntas variados:
- Identificar país por su bandera
- Identificar bandera por nombre del país
- Identificar capital por país

### ChallengeMode
Desafío contra reloj de 60 segundos con los mismos 3 tipos de preguntas. Timer con cambio de color progresivo y animación de pulso al quedar poco tiempo.

## 🚀 Uso

```jsx
import BanderasMundo from "./games/banderas-mundo";

<Route path="/banderas-mundo" element={<BanderasMundo />} />
```

## 📝 Notas

- Las banderas se muestran como emojis Unicode, compatibles con todos los navegadores modernos
- No requiere d3-geo ni GeoJSON ya que usa galería de banderas en vez de mapa
- El juego es completamente responsive y funciona en dispositivos móviles
- Los datos de los 50 países están embebidos directamente en el componente
