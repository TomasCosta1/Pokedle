import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Alert } from "react-native";
import { getPokemonData } from "./src/api/pokemon";
import { usePokedleGame } from "./src/hooks/usePokedleGame";
import { globalStyles } from "./src/styles/globalStyles";
import HomeScreen from "./src/components/Home";
import { Pokedle } from "./src/pages/Pokedle";
import { Screams } from "./src/pages/Screams";

export default function App() {
  const [gameMode, setGameMode] = useState(null);

  const handleGoHome = () => {
    resetToHome();
    setGameMode(null);
  };

  const {
    hiddenPokemon,
    guesses,
    currentGuess,
    loading,
    gameResult,
    suggestions,
    showSuggestions,
    handleInputChange,
    selectSuggestion,
    handleGuess,
    resetGame,
    resetToHome,
  } = usePokedleGame(getPokemonData, gameMode);

  useEffect(() => {
    if (gameResult === "win") {
      Alert.alert(
        "¡Excelente!",
        "Has acertado el Pokémon",
        [{ text: "Aceptar", onPress: handleGoHome }],
        { cancelable: false }
      );
    } else if (gameResult === "lose") {
      Alert.alert(
        "Game Over",
        `Se acabaron los intentos. El Pokémon era ${hiddenPokemon?.name || ""}`,
        [{ text: "Aceptar", onPress: handleGoHome }],
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

      {gameMode === "classic" ? (
        <Pokedle
          resetGame={resetGame}
          setGameMode={handleGoHome}
          gameMode={gameMode}
          currentGuess={currentGuess}
          handleInputChange={handleInputChange}
          handleGuess={handleGuess}
          selectSuggestion={selectSuggestion}
          loading={loading}
          gameResult={gameResult}
          guesses={guesses}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
        />
      ) : (
        <Screams
          resetGame={resetGame}
          setGameMode={handleGoHome}
          gameMode={gameMode}
          currentGuess={currentGuess}
          handleInputChange={handleInputChange}
          handleGuess={handleGuess}
          selectSuggestion={selectSuggestion}
          loading={loading}
          gameResult={gameResult}
          guesses={guesses}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          hiddenPokemon={hiddenPokemon}
        />
      )}
    </View>
  );
}
