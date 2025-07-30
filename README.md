# Pokedle - Juego de Adivinanza de Pokémon

Un juego inspirado en Wordle donde debes adivinar un Pokémon oculto basándote en las comparaciones de sus atributos.

## 🏗️ Estructura del Proyecto

```
Pokedle/
├── src/
│   ├── api/
│   │   └── pokemon.js          # Servicios de API para Pokémon
│   ├── components/
│   │   ├── GameHeader.js       # Header del juego con título y botón reset
│   │   ├── GuessInput.js       # Input con autocompletado
│   │   ├── GameTable.js        # Tabla de resultados
│   │   └── AttributeCell.js    # Celda individual de atributo
│   ├── constants/
│   │   └── gameConstants.js    # Constantes del juego
│   ├── hooks/
│   │   └── usePokedleGame.js   # Hook personalizado para la lógica del juego
│   ├── styles/
│   │   └── globalStyles.js     # Estilos globales
│   └── utils/
│       ├── comparisonUtils.js  # Utilidades para comparar atributos
│       └── pokemonUtils.js     # Utilidades para manejo de datos Pokémon
├── App.js                      # Componente principal
└── package.json
```

## 🎯 Características

- **Autocompletado inteligente**: Sugerencias en tiempo real mientras escribes
- **Comparación visual**: Colores que indican si los atributos son correctos, parcialmente correctos o incorrectos
- **Múltiples atributos**: Tipo, hábitat, color, generación, etapa evolutiva, altura y peso
- **6 intentos**: Como Wordle, tienes 6 oportunidades para adivinar, aunque siempre se puede editar desde las constantes del archivo gameConstants.js
- **Reinicio**: Nuevo Pokémon oculto en cada partida

## 🎨 Sistema de Colores

- **🟢 Verde**: Atributo correcto
- **🟠 Naranja**: Atributo parcialmente correcto (ej: tipo1 coincide con tipo2 del objetivo)
- **🔴 Rojo**: Atributo incorrecto
- **🔴↑/↓**: Valor numérico mayor/menor (con flechas)

## 🚀 Cómo Jugar

1. Se genera automáticamente un Pokémon oculto
2. Escribe el nombre de un Pokémon en el input
3. Usa las sugerencias para encontrar el nombre correcto
4. Observa los colores en la tabla para obtener pistas
5. Continúa adivinando hasta encontrar el Pokémon o agotar los intentos

## 🛠️ Tecnologías

- **React Native** con Expo
- **PokeAPI** para datos de Pokémon
- **Hooks personalizados** para lógica reutilizable
- **Componentes modulares** para mejor mantenimiento

## 📱 Instalación

```bash
npm install
npx expo start
```

## 🎮 Lógica del Juego

La lógica principal está en `usePokedleGame.js` que maneja:
- Estado del juego (Pokémon oculto, adivinanzas, etc.)
- Autocompletado y sugerencias
- Comparación de atributos
- Condiciones de victoria/derrota
- Reinicio del juego 