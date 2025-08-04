import React from "react";
import { Text } from "react-native";
import GameHeader from "../components/GameHeader";
import GuessInput from "../components/GuessInput";
import GameTable from "../components/GameTable";
import { GAME_CONSTANTS } from "../constants/gameConstants";

export const Pokedle = ({
  resetGame,
  setGameMode,
  gameMode,
  currentGuess,
  handleInputChange,
  handleGuess,
  selectSuggestion,
  loading,
  gameResult,
  guesses,
  suggestions,
  showSuggestions
}) => {
  return (
    <>
      <GameHeader onResetGame={resetGame} onGoHome={setGameMode} />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Modo de Juego: {gameMode === "classic" ? "Clásico" : "Gritos"}
      </Text>

      <GuessInput
        currentGuess={currentGuess}
        onInputChange={handleInputChange}
        onGuess={handleGuess}
        onSelectSuggestion={selectSuggestion}
        loading={loading}
        gameWon={gameResult === "win"}
        guesses={guesses}
        maxGuesses={GAME_CONSTANTS.MAX_GUESSES}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
      />

      <GameTable guesses={guesses} maxGuesses={GAME_CONSTANTS.MAX_GUESSES} />
    </>
  );
};
