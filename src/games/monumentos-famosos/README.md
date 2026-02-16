# 🏛️ Monumentos Famosos

**Ubica los monumentos más icónicos del mundo en un mapa interactivo**

## 📋 Características

- 🗺️ **Modo Ubicar**: Ve un monumento y haz clic en el mapa mundial donde crees que está. Puntuación basada en la distancia (máximo 5.000 pts por monumento)
- 📚 **Modo Aprender**: Tarjetas con flip 3D que muestran cada monumento, su ubicación, año de construcción y datos curiosos con mini-mapa
- 🧠 **Modo Quiz**: 15 preguntas de opción múltiple sobre países, ciudades y monumentos
- ⚡ **Modo Desafío**: 60 segundos para responder la mayor cantidad de preguntas

## 🎯 Objetivos de Aprendizaje

- Ubicar geográficamente 20 monumentos famosos del mundo
- Conocer el país y la ciudad de cada monumento
- Aprender datos curiosos sobre cada monumento
- Desarrollar sentido de orientación en el mapa mundial

## 📊 Datos

- **Total monumentos**: 20
- **Continentes cubiertos**: 6 (América, Europa, Asia, África, Oceanía)
- **Países**: 16
- **Fuente de datos**: GeoJSON simplificado del mundo + coordenadas reales de cada monumento

## 🏛️ Monumentos Incluidos

| Monumento | Ciudad | País | Continente |
|-----------|--------|------|-----------|
| 🗼 Torre Eiffel | París | Francia | Europa |
| 🗽 Estatua de la Libertad | Nueva York | Estados Unidos | América |
| 🕌 Taj Mahal | Agra | India | Asia |
| 🏛️ Coliseo Romano | Roma | Italia | Europa |
| 🧱 Gran Muralla China | Beijing | China | Asia |
| 🏔️ Machu Picchu | Cusco | Perú | América |
| ✝️ Cristo Redentor | Río de Janeiro | Brasil | América |
| 🔺 Pirámides de Giza | El Cairo | Egipto | África |
| 🕰️ Big Ben | Londres | Reino Unido | Europa |
| 🎭 Ópera de Sídney | Sídney | Australia | Oceanía |
| 🏜️ Petra | Wadi Musa | Jordania | Asia |
| 🏯 Chichén Itzá | Yucatán | México | América |
| ⛪ Sagrada Familia | Barcelona | España | Europa |
| 🏗️ Burj Khalifa | Dubái | Emiratos Árabes | Asia |
| 🗿 Moái | Isla de Pascua | Chile | América |
| 🏛️ Partenón | Atenas | Grecia | Europa |
| 🛕 Angkor Wat | Siem Riep | Camboya | Asia |
| 🪨 Stonehenge | Wiltshire | Reino Unido | Europa |
| 🗼 Torre de Pisa | Pisa | Italia | Europa |
| ⛰️ Monte Rushmore | Dakota del Sur | Estados Unidos | América |

## 🎨 Paleta de Colores

- Primary: `#FF8F00` (Amber)
- Secondary: `#F4511E` (Deep Orange)
- Accent: `#5D4037` (Brown)
- Background: `linear-gradient(180deg, #fff8e1, #ffe0b2, #ffccbc)`

## 🧩 Componentes Principales

### LocateMode (Modo Ubicar)
El modo estrella del juego. Muestra una tarjeta con el monumento y su ícono. El jugador hace clic en el mapa mundial donde cree que está ubicado. Utiliza la fórmula de Haversine para calcular la distancia real en kilómetros y asigna puntuación (0-5.000 pts). Incluye:
- Mapa mundial interactivo con proyección Natural Earth (d3-geo)
- Pin animado para la selección del jugador
- Línea punteada entre el guess y la ubicación real
- Resultado con distancia y puntos

### LearnMode (Modo Aprender)
Flashcards con animación flip 3D. El frente muestra el ícono y nombre del monumento. El reverso muestra la ubicación exacta, coordenadas y un dato curioso. Incluye mini-mapa con la ubicación real.

### QuizMode (Modo Quiz)
15 preguntas aleatorias con 3 tipos de pregunta:
- ¿En qué país está el monumento?
- ¿En qué ciudad está el monumento?
- ¿Qué monumento está en esta ciudad/país?

### ChallengeMode (Modo Desafío)
Contrarreloj de 60 segundos con las mismas preguntas del quiz pero con transiciones más rápidas (600ms vs 1200ms).

## 🗺️ Mapa Mundial

El mapa mundial utiliza:
- **Proyección**: `geoNaturalEarth1` de d3-geo
- **Datos**: GeoJSON simplificado con ~40 países/regiones
- **Gratícula**: Líneas de referencia cada 30°
- **Colores**: Por continente para fácil orientación
- **Interacción**: Click → inversión de proyección → coordenadas [lat, lng]

## 🚀 Uso

```jsx
import MonumentosFamosos from "./games/monumentos-famosos";

<Route path="/monumentos-famosos" element={<MonumentosFamosos />} />
```

## 📝 Notas

- El mapa mundial usa coordenadas simplificadas para mantener el tamaño compacto
- La puntuación del modo Ubicar usa la fórmula de Haversine para distancias precisas
- Los datos curiosos de cada monumento son verificados
- Compatible con dispositivos móviles (max-width: 480px)
