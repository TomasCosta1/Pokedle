import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { GAME_CONSTANTS } from '../constants/gameConstants';
import { compareAttributes } from '../utils/comparisonUtils';
import { loadAllPokemon, generateHiddenPokemon, filterSuggestions, findPokemonByName } from '../utils/pokemonUtils';

export const usePokedleGame = (getPokemonData) => {
  const [hiddenPokemon, setHiddenPokemon] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [loading, setLoading] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);

  // Inicializar juego
  const initializeGame = async () => {
    try {
      const [pokemonList, hiddenPokemonData] = await Promise.all([
        loadAllPokemon(),
        generateHiddenPokemon(getPokemonData)
      ]);
      
      setAllPokemon(pokemonList);
      setHiddenPokemon(hiddenPokemonData);
    } catch (error) {
      Alert.alert("Error", "No se pudo inicializar el juego");
    }
  };

  // Manejar cambio en el input
  const handleInputChange = (text) => {
    setCurrentGuess(text);
    const filteredSuggestions = filterSuggestions(text, allPokemon);
    setSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0);
  };

  // Seleccionar sugerencia
  const selectSuggestion = (pokemon) => {
    setCurrentGuess(pokemon.originalName);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Manejar adivinanza
  const handleGuess = async () => {
    if (!currentGuess.trim() || loading || gameWon) return;

    setLoading(true);
    try {
      const pokemonInList = findPokemonByName(currentGuess.trim(), allPokemon);
      const pokemonName = pokemonInList ? pokemonInList.originalName : currentGuess.trim();
      const guessData = await getPokemonData(pokemonName.toLowerCase());
      
      const newGuess = {
        ...guessData,
        comparisons: compareAttributes(guessData, hiddenPokemon)
      };

      setGuesses([...guesses, newGuess]);
      setCurrentGuess("");
      setShowSuggestions(false);
      setSuggestions([]);

      // Verificar si ganó
      if (guessData.name === hiddenPokemon.name) {
        setGameWon(true);
        Alert.alert("¡Felicidades!", `¡Adivinaste! El Pokémon era ${hiddenPokemon.name}`);
      } else if (guesses.length + 1 >= GAME_CONSTANTS.MAX_GUESSES) {
        Alert.alert("Game Over", `Se acabaron los intentos. El Pokémon era ${hiddenPokemon.name}`);
      }
    } catch (error) {
      Alert.alert("Error", "Pokémon no encontrado. Intenta con otro nombre.");
    } finally {
      setLoading(false);
    }
  };

  // Reiniciar juego
  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setGameWon(false);
    setSuggestions([]);
    setShowSuggestions(false);
    initializeGame();
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return {
    hiddenPokemon,
    guesses,
    currentGuess,
    loading,
    gameWon,
    suggestions,
    showSuggestions,
    allPokemon,
    
    handleInputChange,
    selectSuggestion,
    handleGuess,
    resetGame,
  };
}; 