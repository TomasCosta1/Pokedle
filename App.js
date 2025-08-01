import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Alert } from "react-native";
import { getPokemonData } from "./src/api/pokemon";
import { usePokedleGame } from "./src/hooks/usePokedleGame";
import { GAME_CONSTANTS } from "./src/constants/gameConstants";
import { globalStyles } from "./src/styles/globalStyles";
import GameHeader from "./src/components/GameHeader";
import GuessInput from "./src/components/GuessInput";
import GameTable from "./src/components/GameTable";
import HomeScreen from "./src/components/Home";

export default function App() {
  const [gameMode, setGameMode] = useState(null); // null, 'classic' o 'gritos'

  const {
    hiddenPokemon,
    guesses,
    currentGuess,
    loading,
    gameResult,   // <-- Acá uso gameResult
    suggestions,
    showSuggestions,
    handleInputChange,
    selectSuggestion,
    handleGuess,
    resetGame,
  } = usePokedleGame(getPokemonData);

  useEffect(() => {
    if (gameResult === 'win') {
      Alert.alert(
        "¡Excelente!",
        "Has acertado el Pokémon",
        [{ text: "Aceptar", onPress: () => setGameMode(null) }],
        { cancelable: false }
      );
    } else if (gameResult === 'lose') {
      Alert.alert(
        "Game Over",
        `Se acabaron los intentos. El Pokémon era ${hiddenPokemon?.name || ''}`,
        [{ text: "Aceptar", onPress: () => setGameMode(null) }],
        { cancelable: false }
      );
    }
  }, [gameResult, hiddenPokemon]);

  if (!gameMode) {
    return <HomeScreen onSelectMode={(mode) => setGameMode(mode)} />;
  }

  if (!hiddenPokemon) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Text style={globalStyles.loadingText}>Cargando juego...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" />
      
      <GameHeader 
        onResetGame={resetGame} 
        onGoHome={() => setGameMode(null)}
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
        Modo de Juego: {gameMode === 'classic' ? 'Clásico' : 'Gritos'}
      </Text>

      <GuessInput
        currentGuess={currentGuess}
        onInputChange={handleInputChange}
        onGuess={handleGuess}
        onSelectSuggestion={selectSuggestion}
        loading={loading}
        gameWon={gameResult === 'win'}
        guesses={guesses}
        maxGuesses={GAME_CONSTANTS.MAX_GUESSES}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
      />

      <GameTable 
        guesses={guesses} 
        maxGuesses={GAME_CONSTANTS.MAX_GUESSES} 
      />
    </View>
  );
}
