import { COMPARISON_COLORS, COMPARISON_STATUS } from '../constants/gameConstants';

// Funciones para verificar coincidencia de tipos
export const checkType1Match = (guessType, targetType1, targetType2) => {
  if (guessType === targetType1) return COMPARISON_STATUS.CORRECT;
  
  if (guessType === targetType2) return COMPARISON_STATUS.PARTIAL;
  
  return COMPARISON_STATUS.INCORRECT;
};

export const checkType2Match = (guessType, targetType1, targetType2) => {
  if (guessType === targetType2) return COMPARISON_STATUS.CORRECT;
  
  if (guessType === targetType1) return COMPARISON_STATUS.PARTIAL;
  
  return COMPARISON_STATUS.INCORRECT;
};

// Función para verificar coincidencia de colores
export const checkColor = (guessColor, targetColor) => {
  if (guessColor === targetColor) return COMPARISON_STATUS.CORRECT;
  return COMPARISON_STATUS.INCORRECT;
};

// Función para comparar valores numéricos
export const compareNumericValue = (guessValue, targetValue) => {
  if (guessValue === targetValue) return COMPARISON_STATUS.CORRECT;
  return guessValue > targetValue ? COMPARISON_STATUS.LOWER : COMPARISON_STATUS.HIGHER;
};

// Funcion para verificar nombre
export const compareName = (guessName, targetName) => {
  if (guessName === targetName) return COMPARISON_STATUS.CORRECT;
  return COMPARISON_STATUS.INCORRECT;
}

// Función principal para comparar atributos
export const compareAttributes = (guess, target) => {
  return {
    name: compareName(guess.name, target.name),
    type1: checkType1Match(guess.type1, target.type1, target.type2),
    type2: checkType2Match(guess.type2, target.type1, target.type2),
    habitat: guess.habitat === target.habitat ? COMPARISON_STATUS.CORRECT : COMPARISON_STATUS.INCORRECT,
    color: checkColor(guess.color, target.color),
    gen: compareNumericValue(guess.gen, target.gen),
    evoStage: compareNumericValue(guess.evoStage, target.evoStage),
    height: compareNumericValue(guess.height, target.height),
    weight: compareNumericValue(guess.weight, target.weight),
  };
}; 