<!-- AUTO-GENERATED GIT WORKFLOW HEADER -->
<!-- Version: 1.0.0 | Template: GIT_WORKFLOW_EDUCATIONAL.md | Last Updated: 2026-02-16 -->
<!-- DO NOT EDIT MANUALLY - Run: ~/.claude/scripts/sync-git-workflow.sh -->

---

# Git Workflow & Commit Standards

**Version:** 1.0.0
**Last Updated:** 2026-02-15
**Template Type:** Educational & Interactive Learning Projects

---

## Branch Strategy

### Main Branches

- **`main`** - Production-ready content. Deployed to live site.
  - Only merge via Pull Requests
  - All content must be reviewed for accuracy
  - Mathematical content must be validated

- **`develop`** - Integration branch for new content
  - Merge content branches here first
  - Test interactive components before merging to main
  - Base branch for new lessons/modules

### Supporting Branches

- **`content/*`** - New educational content
  - Branch from: `develop`
  - Merge into: `develop`
  - Naming: `content/game-theory-basics`, `content/supply-demand-interactive`

- **`feature/*`** - New interactive features
  - Branch from: `develop`
  - Merge into: `develop`
  - Naming: `feature/interactive-graph`, `feature/quiz-system`

- **`bugfix/*`** - Content or code fixes
  - Branch from: `develop`
  - Merge into: `develop`
  - Naming: `bugfix/math-rendering`, `bugfix/typo-in-lesson-3`

---

## Commit Convention

### Format

```
<emoji> <type>: <description>

[optional body]

[optional footer]
```

### Commit Types with Emojis

```bash
✨ feat:       New interactive feature or component
🐛 fix:        Bug fix or content correction
♻️ refactor:   Code restructuring
📚 docs:       Documentation or non-content text
✅ test:       Testing interactive components
🔒 security:   Security fixes
⚡ perf:       Performance optimization
🚀 chore:      Dependencies, build config
📝 content:    New educational content (lessons, modules)
🎨 style:      Visual styling, animations
🧮 math:       Mathematical content or LaTeX
🎮 interactive: Interactive exercises, games
♿ a11y:       Accessibility improvements
```

### Examples

**Good commits:**
```bash
✨ feat: add interactive supply and demand graph
📝 content: create microeconomics module 1 - elasticity
🧮 math: add LaTeX equations for utility maximization
🐛 fix: correct formula in consumer surplus example
🎮 interactive: implement drag-and-drop game for market equilibrium
♿ a11y: add ARIA labels to interactive graphs
📚 docs: update README with content guidelines
```

---

## Content Review Process

### Before Committing Educational Content

- [ ] **Mathematical accuracy** - Formulas verified
- [ ] **Conceptual correctness** - Economics/math concepts accurate
- [ ] **Clarity** - Explanations understandable for target audience
- [ ] **Examples tested** - Numerical examples calculated correctly
- [ ] **Citations added** - Sources for definitions/theorems
- [ ] **Accessibility** - Alt text for images, ARIA labels
- [ ] **Mobile responsive** - Works on small screens

### Mathematical Validation Checklist

For any content with math:

- [ ] **LaTeX compiles** - No syntax errors
- [ ] **Formulas correct** - Verified against textbooks
- [ ] **Units consistent** - If applicable (e.g., currency, time)
- [ ] **Edge cases handled** - Division by zero, negative values
- [ ] **Numerical examples** - Manually calculated to verify

Example:
```latex
% BAD - Incorrect formula
\text{Elasticity} = \frac{Q}{P}

% GOOD - Correct formula
\text{Elasticity} = \frac{\% \Delta Q}{\% \Delta P}
```

---

## Standard Workflows

### 1. Creating New Educational Content

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create content branch
git checkout -b content/game-theory-nash-equilibrium

# 3. Write content
# Edit: content/lessons/game-theory/nash-equilibrium.mdx

# 4. Add interactive components
# Edit: components/GameTheoryMatrix.tsx

# 5. Validate math
# Check LaTeX rendering locally
npm run dev

# 6. Commit content
git add content/lessons/game-theory/
git add components/GameTheoryMatrix.tsx
git commit -m "📝 content: add Nash equilibrium lesson with interactive matrix"

# 7. Push and create PR
git push -u origin content/game-theory-nash-equilibrium
```

### 2. Adding Interactive Feature

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/interactive-demand-curve

# 3. Implement component
# Edit: components/InteractiveDemandCurve.tsx

# 4. Test interactivity
npm run dev
# Manually test: drag points, zoom, reset

# 5. Add tests (if applicable)
# Edit: tests/InteractiveDemandCurve.test.tsx

# 6. Commit
git add components/InteractiveDemandCurve.tsx tests/
git commit -m "✨ feat: add interactive demand curve with draggable points"

# 7. Push and create PR
git push -u origin feature/interactive-demand-curve
```

### 3. Fixing Content Errors

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create bugfix branch
git checkout -b bugfix/correct-elasticity-formula

# 3. Fix error
# Edit: content/lessons/elasticity.mdx

# 4. Verify fix
npm run dev
# Check formula renders correctly

# 5. Commit
git add content/lessons/elasticity.mdx
git commit -m "🐛 fix: correct price elasticity of demand formula"

# 6. Push
git push -u origin bugfix/correct-elasticity-formula
```

---

## Accessibility Requirements

### All Interactive Components Must Have:

1. **Keyboard Navigation**
```tsx
// Good - keyboard accessible
<button onClick={handleClick} onKeyPress={handleKeyPress}>
  Calculate
</button>
```

2. **ARIA Labels**
```tsx
// Good - screen reader friendly
<svg aria-label="Supply and demand graph">
  <line aria-label="Supply curve" />
  <line aria-label="Demand curve" />
</svg>
```

3. **Alt Text for Images**
```markdown
![Graph showing consumer surplus as triangle above price](graph.png)
```

4. **Color Contrast**
- Text: Minimum 4.5:1 ratio
- Interactive elements: Minimum 3:1 ratio
- Test with WebAIM Contrast Checker

---

## Content Commit Best Practices

### DO ✅

- **Cite sources** - Reference textbooks, papers for definitions
- **Test math examples** - Calculate manually to verify
- **Use consistent notation** - P for price, Q for quantity, etc.
- **Add context** - Explain WHY a concept matters
- **Progressive difficulty** - Start simple, build complexity
- **Include visuals** - Graphs, diagrams for complex concepts

### DON'T ❌

- **Plagiarize** - Always attribute sources
- **Oversimplify to point of inaccuracy** - Balance simplicity with correctness
- **Use jargon without explanation** - Define technical terms
- **Skip proofreading** - Typos undermine credibility
- **Commit untested interactive components** - Always test manually

---

## Pre-Commit Checklist (Educational)

Before every commit:

- [ ] **Content reviewed** - Checked for accuracy
- [ ] **Math validated** - Formulas correct
- [ ] **Examples tested** - Numerical calculations verified
- [ ] **LaTeX renders** - No compilation errors
- [ ] **Interactive components work** - Tested manually
- [ ] **Accessibility checked** - Keyboard nav, ARIA labels, alt text
- [ ] **Mobile responsive** - Tested on small screens
- [ ] **Linter passes** - `npm run lint`
- [ ] **Build succeeds** - `npm run build`

---

## Pull Request Process

### PR Description Template (Educational)

```markdown
## Summary
Brief description of content/feature

## Content Changes
- Added lesson on X topic
- Updated interactive component Y
- Fixed error in Z explanation

## Mathematical Content
- [ ] All formulas verified against sources
- [ ] LaTeX compiles without errors
- [ ] Numerical examples calculated manually

## Accessibility
- [ ] Keyboard navigation tested
- [ ] ARIA labels added
- [ ] Alt text for all images
- [ ] Color contrast meets WCAG AA

## Testing
- [ ] Interactive components tested manually
- [ ] Mobile responsive (tested on 375px width)
- [ ] Works in Safari, Chrome, Firefox

## Screenshots/Demo
[Add screenshots or GIF of interactive feature]

## Related Issues
Closes #123
```

---

## Content Structure Guidelines

### Recommended Lesson Structure

```markdown
# Lesson Title

## Learning Objectives
- Objective 1
- Objective 2

## Introduction
[Motivating example or question]

## Core Concept
[Main explanation with math]

$$
\text{Formula}
$$

## Interactive Example
<InteractiveComponent />

## Practice Problems
1. Problem 1
2. Problem 2

## Summary
[Key takeaways]

## Further Reading
- Source 1
- Source 2
```

---

## Math Rendering Best Practices

### Inline Math
```markdown
The price elasticity of demand is $E_d = \frac{\% \Delta Q}{\% \Delta P}$.
```

### Display Math
```markdown
$$
\max_{x, y} U(x, y) \quad \text{subject to} \quad p_x x + p_y y = I
$$
```

### Common Notation
- **Variables:** Italicized (e.g., $P$, $Q$, $\pi$)
- **Functions:** Roman (e.g., $\max$, $\log$, $\exp$)
- **Subscripts:** Descriptive (e.g., $Q_d$ for quantity demanded)

---

## Interactive Component Testing

### Manual Test Checklist

For every interactive component:

- [ ] **Mouse interaction** - Click, drag, hover
- [ ] **Touch interaction** - Works on mobile/tablet
- [ ] **Keyboard interaction** - Tab, Enter, Arrow keys
- [ ] **Reset functionality** - Returns to initial state
- [ ] **Edge cases** - Min/max values, boundary conditions
- [ ] **Performance** - No lag with rapid interactions
- [ ] **Visual feedback** - Clear indication of active state

---

## Deployment Workflow

### Deploying to Production

```bash
# 1. Merge to main
git checkout main
git merge develop

# 2. Tag release
git tag -a v1.2.0 -m "Add game theory module"
git push origin main --tags

# 3. Deploy (Vercel/Netlify auto-deploys from main)
# Verify at production URL

# 4. Announce update
# Update changelog, notify users
```

---

## .gitignore Essentials

```bash
# Dependencies
node_modules/

# Build artifacts
.next/
out/
dist/
build/

# IDE
.vscode/
.idea/
*.swp
.DS_Store

# Logs
*.log

# Testing
coverage/

# Environment
.env
.env.local
```

---

## Emergency Commands

### Revert Content Change

```bash
# Restore previous version of lesson
git checkout <commit-hash> content/lessons/elasticity.mdx
git commit -m "🐛 fix: revert incorrect elasticity formula"
```

### Hotfix for Live Site

```bash
# If critical error in production
git checkout main
git checkout -b hotfix/fix-broken-graph
# ... fix issue ...
git commit -m "🐛 fix: repair broken interactive graph"
git push origin hotfix/fix-broken-graph
# Create PR to main (fast-track review)
```

---

## Resources

- **KaTeX Documentation:** https://katex.org/docs/supported.html
- **MDX:** https://mdxjs.com
- **WCAG Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/
- **Framer Motion:** https://www.framer.com/motion/

---

**Note:** This workflow header is auto-generated from `~/.claude/templates/GIT_WORKFLOW_EDUCATIONAL.md`.
To update across all projects, run: `~/.claude/scripts/sync-git-workflow.sh`

---

<!-- END AUTO-GENERATED GIT WORKFLOW HEADER -->
# CLAUDE.md - Interactive Learning Games

**Proyecto:** Interactive Learning Games
**Owner:** Angel Samuel Suesca Ríos
**Stack:** React 19 + Vite 7 + React Router 7 + d3-geo
**Propósito:** Colección de juegos educativos interactivos enfocados en geografía

---

## RESUMEN DEL PROYECTO

Plataforma de juegos educativos interactivos con enfoque en aprendizaje geográfico. Cada juego es un módulo independiente con múltiples modos de juego (exploración, aprendizaje, quiz, desafíos).

**Juegos implementados:**
- ✅ **Explora Colombia** - Departamentos y capitales de Colombia con mapa interactivo
- ✅ **Capitales de Sudamérica** - 12 países con mapas, datos curiosos y desafíos

**Objetivos:**
- Aprendizaje gamificado de geografía
- Interfaz atractiva y responsive
- Múltiples modos de juego para diferentes estilos de aprendizaje
- Código modular y reutilizable

---

## ESTRUCTURA DEL PROYECTO

```
interactive-learning-games/
├── src/
│   ├── games/
│   │   ├── explora-colombia/
│   │   │   ├── index.jsx              # Componente principal del juego
│   │   │   ├── colombia-geo.js        # GeoJSON de Colombia
│   │   │   └── README.md              # Documentación del juego
│   │   └── capitales-sudamerica/
│   │       ├── index.jsx              # Componente principal del juego
│   │       ├── southamerica-geo.js    # GeoJSON de Sudamérica
│   │       └── README.md              # Documentación del juego
│   ├── App.jsx                        # Router principal
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Estilos globales
├── public/
│   └── _redirects                     # Netlify redirects
├── CLAUDE.md                          # Este archivo
├── README.md                          # Documentación principal
├── package.json
└── vite.config.js
```

---

## PROTOCOLO PARA CREAR NUEVOS JUEGOS

Cuando el usuario solicite crear un nuevo juego con una temática específica, sigue este protocolo EXACTAMENTE:

### 1. CREAR RAMA NUEVA

```bash
# Nombre de la rama: nombre-del-juego (kebab-case)
# Ejemplo: capitales-europa, rios-del-mundo, paises-africanos
git checkout -b nombre-del-juego
```

### 2. CREAR ESTRUCTURA DEL JUEGO

Crea una nueva carpeta en `src/games/nombre-del-juego/` con:

```
src/games/nombre-del-juego/
├── index.jsx              # Componente principal (default export)
├── geo-data.js            # GeoJSON si aplica (opcional)
└── README.md              # Documentación del juego
```

### 3. ESTRUCTURA ESTÁNDAR DE UN JUEGO

Cada juego DEBE seguir esta estructura en `index.jsx`:

```jsx
import { useState, useEffect } from "react";

// 1. DATOS DEL JUEGO
const GAME_DATA = [
  // Array con los elementos del juego
  // Ejemplo: { name: "Argentina", capital: "Buenos Aires", ... }
];

// 2. UTILIDADES COMUNES
const shuffle = (arr) => { /* ... */ };
const pill = (bg, c) => ({ /* estilos de botón */ });
const circ = (bg) => ({ /* estilos de botón circular */ });

// 3. COMPONENTES COMPARTIDOS
function Confetti({ active }) { /* ... */ }
function Stars({ score, total }) { /* ... */ }
function ProgressBar({ value, max }) { /* ... */ }
function OptionButton({ text, selected, correct, onClick }) { /* ... */ }

// 4. MODOS DE JUEGO (mínimo 3)
function MapMode({ onBack }) { /* Modo con mapa interactivo */ }
function LearnMode({ onBack }) { /* Modo de aprendizaje (flashcards) */ }
function QuizMode({ onBack }) { /* Modo de quiz con score */ }
function ChallengeMode({ onBack }) { /* Modo contra reloj */ }

// 5. COMPONENTE PRINCIPAL (MENÚ)
export default function NombreDelJuego() {
  const [screen, setScreen] = useState("menu");

  const screens = {
    map: MapMode,
    learn: LearnMode,
    quiz: QuizMode,
    challenge: ChallengeMode
  };

  const Screen = screens[screen];

  if (Screen) {
    return <div style={gameCtn}><Screen onBack={() => setScreen("menu")} /></div>;
  }

  return (
    <div style={gameCtn}>
      {/* Menú principal con botones para cada modo */}
    </div>
  );
}

// 6. ESTILOS DEL CONTENEDOR
const gameCtn = {
  fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif",
  maxWidth: 480,
  margin: "0 auto",
  padding: "24px 12px",
  minHeight: "100vh",
  background: "linear-gradient(180deg,#color1,#color2,#color3)"
};
```

### 4. COMPONENTES OBLIGATORIOS

Todo juego DEBE tener:

#### A. Sistema de puntuación visual
- ⭐ **Stars**: Muestra 1-3 estrellas según % de aciertos
- 📊 **ProgressBar**: Barra de progreso animada
- 🎊 **Confetti**: Animación de celebración

#### B. Cuatro modos de juego mínimo
1. **🗺️ Modo Mapa** (si aplica): Exploración interactiva
2. **📚 Modo Aprender**: Flashcards con flip animation
3. **🧠 Modo Quiz**: 10-15 preguntas con opciones múltiples
4. **⚡ Modo Desafío**: Contra reloj (60 segundos)

#### C. Feedback inmediato
- ✅ Feedback visual al responder correctamente (verde)
- ❌ Feedback visual al fallar (rojo)
- 🔥 Racha de aciertos consecutivos
- 🎉 Mensajes de motivación

### 5. PALETA DE COLORES

Usa gradientes vibrantes y consistentes:

```javascript
// Gradientes recomendados
const GRADIENTS = {
  primary: "linear-gradient(135deg,#667eea,#764ba2)",   // Morado
  success: "linear-gradient(135deg,#11998e,#38ef7d)",   // Verde
  danger: "linear-gradient(135deg,#f5af19,#f12711)",    // Naranja-Rojo
  info: "linear-gradient(135deg,#f093fb,#f5576c)",      // Rosa
  warning: "linear-gradient(135deg,#FFA726,#ef5350)",   // Amarillo-Rojo
};

// Colores de feedback
const FEEDBACK_COLORS = {
  correct: { bg: "#c8e6c9", border: "#66BB6A", text: "#2e7d32" },
  incorrect: { bg: "#ffcdd2", border: "#ef5350", text: "#c62828" },
  neutral: { bg: "white", border: "#ddd", text: "#333" },
};
```

### 6. AÑADIR RUTA EN APP.JSX

```jsx
// En src/App.jsx
import NombreDelJuego from "./games/nombre-del-juego";

// En el Route
<Route path="/nombre-del-juego" element={<NombreDelJuego />} />

// En el menú principal
<Link to="/nombre-del-juego">
  <button>🎮 Nombre del Juego</button>
</Link>
```

### 7. CREAR README.md DEL JUEGO

Usa esta plantilla en `src/games/nombre-del-juego/README.md`:

```markdown
# 🎮 Nombre del Juego

**Descripción breve del juego**

## 📋 Características

- 🗺️ **Modo Mapa**: [Descripción]
- 📚 **Modo Aprender**: [Descripción]
- 🧠 **Modo Quiz**: [Descripción]
- ⚡ **Modo Desafío**: [Descripción]

## 🎯 Objetivos de Aprendizaje

- Aprender [tema específico]
- Practicar [habilidad]
- Dominar [conocimiento]

## 📊 Datos

- **Total elementos**: X
- **Categorías**: Y
- **Fuente de datos**: [GeoJSON / API / Manual]

## 🎨 Paleta de Colores

- Primary: `#color1`
- Secondary: `#color2`
- Accent: `#color3`

## 🧩 Componentes Principales

### MapMode
[Descripción del modo mapa]

### LearnMode
[Descripción del modo aprendizaje]

### QuizMode
[Descripción del modo quiz]

### ChallengeMode
[Descripción del modo desafío]

## 🚀 Uso

```jsx
import NombreDelJuego from "./games/nombre-del-juego";

<Route path="/nombre-del-juego" element={<NombreDelJuego />} />
```

## 📝 Notas

- [Consideraciones especiales]
- [Futuros desarrollos]
```

### 8. CONVENCIONES DE CÓDIGO

#### Variables y funciones
```javascript
// PascalCase para componentes
function MapMode() { }
function LearnMode() { }

// camelCase para variables y funciones
const gameData = [];
const handleClick = () => { };

// UPPER_SNAKE_CASE para constantes
const GAME_DATA = [];
const MAX_QUESTIONS = 15;
```

#### Nombres de archivos
- Componentes: `index.jsx`
- Datos: `nombre-geo.js`, `game-data.js`
- Docs: `README.md`

#### Estructura de commits
Sigue la convención de emojis del proyecto:

```bash
✨ feat: add [nombre-del-juego] game with interactive map
📚 docs: create README for [nombre-del-juego]
♻️ refactor: extract common components to utils
🎨 style: improve color palette in [nombre-del-juego]
🐛 fix: correct map rendering in [nombre-del-juego]
```

### 9. CHECKLIST ANTES DE COMMIT

Antes de hacer commit, verifica:

- [ ] El juego tiene los 4 modos completos (Map, Learn, Quiz, Challenge)
- [ ] README.md del juego está completo
- [ ] Ruta añadida en App.jsx
- [ ] Estilos consistentes con otros juegos
- [ ] Componentes compartidos extraídos si hay duplicación
- [ ] Feedback visual implementado (confetti, stars, colores)
- [ ] Responsive design (funciona en mobile)
- [ ] No hay errores en consola
- [ ] Los datos son correctos (verificados)

### 10. WORKFLOW DE COMMITS

⚠️ **IMPORTANTE - NO USAR CO-AUTORÍA DE CLAUDE**

**NUNCA incluyas "Co-Authored-By: Claude" en los commits.** Los commits deben ser solo del autor humano del proyecto (Angel Samuel Suesca Ríos). Claude es una herramienta de asistencia, no un co-autor.

❌ **INCORRECTO:**
```bash
git commit -m "feat: add game

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

✅ **CORRECTO:**
```bash
git commit -m "✨ feat: add game"
```

**Workflow de commits estándar:**

```bash
# 1. Crear estructura
git add src/games/nombre-del-juego/
git commit -m "✨ feat: create [nombre-del-juego] game structure"

# 2. Implementar modos
git add src/games/nombre-del-juego/index.jsx
git commit -m "✨ feat: implement Map and Learn modes for [nombre-del-juego]"

git add src/games/nombre-del-juego/index.jsx
git commit -m "✨ feat: implement Quiz and Challenge modes for [nombre-del-juego]"

# 3. Documentar
git add src/games/nombre-del-juego/README.md
git commit -m "📚 docs: add README for [nombre-del-juego]"

# 4. Integrar en app
git add src/App.jsx
git commit -m "♻️ refactor: add [nombre-del-juego] route to main app"

# 5. Finalizar
git add .
git commit -m "🎨 style: polish UI and fix responsive issues in [nombre-del-juego]"
```

---

## COMPONENTES REUTILIZABLES

Estos componentes están disponibles en cada juego (copiar si es necesario):

### Confetti
Animación de celebración al responder correctamente.

```jsx
function Confetti({ active }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    if (!active) { setParticles([]); return; }
    setParticles(Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ["#FFD700","#FF6B6B","#4ECDC4","#45B7D1","#F9A825","#AB47BC"][i % 6],
      size: Math.random() * 8 + 4
    })));
    const timeout = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(timeout);
  }, [active]);
  // ... render
}
```

### Stars
Sistema de 3 estrellas según puntuación.

```jsx
function Stars({ score, total }) {
  const stars = total > 0 ? (score / total >= 0.9 ? 3 : score / total >= 0.6 ? 2 : score / total > 0 ? 1 : 0) : 0;
  return (
    <div style={{ display:"flex", gap:4, justifyContent:"center", fontSize:32 }}>
      {[0,1,2].map(i => (
        <span key={i} style={{ opacity: i < stars ? 1 : 0.25 }}>
          {i < stars ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}
```

### ProgressBar
Barra de progreso animada.

```jsx
function ProgressBar({ value, max }) {
  return (
    <div style={{ width:"100%", height:10, background:"#e0e0e0", borderRadius:5, overflow:"hidden" }}>
      <div style={{
        width:`${max > 0 ? (value/max)*100 : 0}%`,
        height:"100%",
        background:"linear-gradient(90deg,#F9A825,#FF6B6B)",
        borderRadius:5,
        transition:"width 0.5s"
      }} />
    </div>
  );
}
```

### OptionButton
Botón de opción con feedback visual.

```jsx
function OptionButton({ text, selected, correct, onClick }) {
  const isCorrect = text === correct;
  const isSelected = selected === text;

  let bg = "white", border = "#ddd", color = "#333";
  if (selected !== null) {
    if (isCorrect) {
      bg = "#c8e6c9";
      border = "#66BB6A";
      color = "#2e7d32";
    } else if (isSelected) {
      bg = "#ffcdd2";
      border = "#ef5350";
      color = "#c62828";
    }
  }

  return (
    <button onClick={onClick} style={{
      background: bg,
      border: `2px solid ${border}`,
      borderRadius: 16,
      padding: "14px 10px",
      fontSize: 15,
      fontWeight: 600,
      color: color,
      cursor: selected !== null ? "default" : "pointer",
      transition: "all 0.3s",
      transform: isSelected ? "scale(1.04)" : "scale(1)",
      boxShadow: isSelected ? "0 4px 15px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      {selected !== null && isCorrect && "✅ "}
      {selected !== null && isSelected && !isCorrect && "❌ "}
      {text}
    </button>
  );
}
```

---

## PATRONES DE DISEÑO

### Sistema de Navegación
```jsx
const [screen, setScreen] = useState("menu");

// Screens map
const screens = {
  map: MapMode,
  learn: LearnMode,
  quiz: QuizMode,
  challenge: ChallengeMode
};

const Screen = screens[screen];

if (Screen) {
  return <div style={gameCtn}><Screen onBack={() => setScreen("menu")} /></div>;
}

// Menu
return <div>...</div>;
```

### Generación de Preguntas
```jsx
function makeQuestions(count) {
  return shuffle(GAME_DATA).slice(0, count).map(item => {
    const askProperty = Math.random() > 0.5;
    const correct = askProperty ? item.property1 : item.property2;

    let options = [correct];
    const pool = GAME_DATA.filter(d => d.id !== item.id);

    while (options.length < 4) {
      const random = pool[Math.floor(Math.random() * pool.length)];
      const value = askProperty ? random.property1 : random.property2;
      if (!options.includes(value)) options.push(value);
    }

    return { item, askProperty, correct, options: shuffle(options) };
  });
}
```

### Manejo de Respuestas
```jsx
const pick = (option) => {
  if (selected !== null) return; // Ya respondió

  setSelected(option);
  const isCorrect = option === questions[currentIndex].correct;

  if (isCorrect) {
    setScore(s => s + 1);
    setStreak(s => s + 1);
    setConfetti(c => c + 1); // Trigger confetti
  } else {
    setStreak(0);
  }

  setTimeout(() => {
    if (currentIndex + 1 >= TOTAL_QUESTIONS) {
      setDone(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelected(null);
    }
  }, 1200); // Delay para ver feedback
};
```

### Temporizador (Challenge Mode)
```jsx
const [time, setTime] = useState(60);
const timerRef = useRef(null);

const start = () => {
  setTime(60);
  setStatus("playing");
};

useEffect(() => {
  if (status !== "playing") return;

  timerRef.current = setInterval(() => {
    setTime(t => {
      if (t <= 1) {
        clearInterval(timerRef.current);
        setStatus("done");
        return 0;
      }
      return t - 1;
    });
  }, 1000);

  return () => clearInterval(timerRef.current);
}, [status]);
```

---

## DATOS GEOGRÁFICOS

### Obtener GeoJSON

Para mapas, usa fuentes confiables:

1. **Natural Earth Data**: https://www.naturalearthdata.com/
2. **GeoJSON.xyz**: https://geojson.xyz/
3. **GitHub repos**: Busca "country-geojson" o similar

### Formato GeoJSON estándar

```javascript
export default {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Argentina",
        // Otras propiedades
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[lng, lat], [lng, lat], ...]]
      }
    }
  ]
};
```

### Renderizado con d3-geo

```javascript
import { geoMercator, geoPath } from "d3-geo";

function useMapProjection(geoData, width, height) {
  return useMemo(() => {
    const projection = geoMercator().fitSize([width, height], geoData);
    const pathGenerator = geoPath().projection(projection);

    const features = geoData.features.map(feature => ({
      name: feature.properties.name,
      path: pathGenerator(feature),
      centroid: pathGenerator.centroid(feature),
      // ...
    }));

    return { features };
  }, [geoData, width, height]);
}
```

---

## TESTING Y VALIDACIÓN

Antes de crear PR:

### 1. Pruebas Manuales
- [ ] Todos los modos funcionan correctamente
- [ ] Navegación fluida entre screens
- [ ] No hay errores en consola
- [ ] Animaciones funcionan
- [ ] Responsive en mobile (Chrome DevTools)

### 2. Validación de Datos
- [ ] Nombres correctos (sin typos)
- [ ] Datos actualizados (capitales, poblaciones, etc.)
- [ ] Coordenadas GeoJSON correctas

### 3. Performance
- [ ] No hay lag al interactuar
- [ ] Mapas renderizan rápido (<500ms)
- [ ] Transiciones suaves (60fps)

### 4. Accesibilidad
- [ ] Contraste de colores adecuado
- [ ] Botones con tamaño mínimo 44x44px
- [ ] Textos legibles (min 14px)

---

## DEPLOYMENT

El proyecto está configurado para Netlify con SPA routing.

### Build
```bash
npm run build
```

### Preview local
```bash
npm run preview
```

### Netlify Config
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## EJEMPLOS DE NUEVOS JUEGOS

### Ideas implementables

1. **🌍 Capitales de Europa**
   - 50 países europeos
   - Flags, monedas, idiomas
   - Mapa interactivo detallado

2. **🏞️ Ríos del Mundo**
   - 20 ríos principales
   - Longitud, países que atraviesan
   - Modo "traza el río"

3. **⛰️ Montañas Famosas**
   - Picos más altos por continente
   - Altura, ubicación, primera ascensión
   - Quiz con comparaciones

4. **🌊 Océanos y Mares**
   - Profundidad, área, temperatura
   - Fauna característica
   - Mapa de corrientes

5. **🗺️ Banderas del Mundo**
   - 195 banderas
   - Significado de colores
   - Quiz de reconocimiento

---

## TROUBLESHOOTING

### Error: "Cannot read property 'features' of undefined"
**Causa**: GeoJSON no cargado correctamente
**Solución**: Verificar export default en archivo geo.js

### Error: "Map not rendering"
**Causa**: Dimensiones de SVG incorrectas
**Solución**: Usar useMemo para projection y verificar viewBox

### Error: "Confetti no aparece"
**Causa**: Estado `active` no cambia
**Solución**: Incrementar contador en lugar de boolean

### Performance lento en mobile
**Causa**: Demasiados elementos en mapa
**Solución**: Simplificar GeoJSON con mapshaper.org

---

## RECURSOS

### Documentación
- React: https://react.dev
- Vite: https://vitejs.dev
- d3-geo: https://github.com/d3/d3-geo

### Herramientas
- GeoJSON.io: Editor visual de GeoJSON
- Mapshaper: Simplificar GeoJSON
- ColorHunt: Paletas de colores

### Inspiración
- Seterra: https://www.seterra.com
- GeoGuessr: https://www.geoguessr.com

---

**Última actualización:** 2026-02-15
**Versión:** 1.0.0

Este documento es la guía definitiva para trabajar en el proyecto. Cualquier nuevo agente debe leerlo completamente antes de empezar.
