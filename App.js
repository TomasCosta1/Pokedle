import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { getPokemonData } from "./src/api/pokemon";
import { usePokedleGame } from "./src/hooks/usePokedleGame";
import { GAME_CONSTANTS } from "./src/constants/gameConstants";
import { globalStyles } from "./src/styles/globalStyles";
import GameHeader from "./src/components/GameHeader";
import GuessInput from "./src/components/GuessInput";
import GameTable from "./src/components/GameTable";

export default function App() {
  const {
    hiddenPokemon,
    guesses,
    currentGuess,
    loading,
    gameWon,
    suggestions,
    showSuggestions,
    handleInputChange,
    selectSuggestion,
    handleGuess,
    resetGame,
  } = usePokedleGame(getPokemonData);

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
      
      <GameHeader onResetGame={resetGame} />

      <GuessInput
        currentGuess={currentGuess}
        onInputChange={handleInputChange}
        onGuess={handleGuess}
        onSelectSuggestion={selectSuggestion}
        loading={loading}
        gameWon={gameWon}
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
