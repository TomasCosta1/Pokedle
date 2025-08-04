import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { ScreamTable } from "../components/ScreamTable";
import { GAME_CONSTANTS } from "../constants/gameConstants";
import GameHeader from "../components/GameHeader";
import GuessInput from "../components/GuessInput";

export const Screams = ({
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
  showSuggestions,
  hiddenPokemon,
}) => {
  const [showGenerationHint, setShowGenerationHint] = useState(false);
  const [showDescriptionHint, setShowDescriptionHint] = useState(false);

  // Resetear pistas cuando se reinicia el juego
  useEffect(() => {
    if (guesses.length === 0) {
      setShowGenerationHint(false);
      setShowDescriptionHint(false);
    }
  }, [guesses.length]);

  const playPokemonSound = async () => {
    if (hiddenPokemon) {
      try {
        const baseName = hiddenPokemon.name.toLowerCase().split(/[- ]/)[0];
        const { sound } = await Audio.Sound.createAsync(
          { uri: `https://play.pokemonshowdown.com/audio/cries/${baseName}.ogg` }
        );
        await sound.playAsync();
        
        // Limpiar el sonido después de reproducirlo
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (error) {
        console.log('Error reproduciendo el sonido:', error);
      }
    }
  };

  const showGeneration = () => {
    setShowGenerationHint(true);
  };

  const showDescription = () => {
    setShowDescriptionHint(true);
  };
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
      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          marginVertical: 5,
        }}
      >
        Solo estan disponibles Pokémon desde 7ma generación hacia abajo
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

      <View style={styles.controlsContainer}>
        <View style={styles.playButtonContainer}>
          <TouchableOpacity style={styles.playButton} onPress={playPokemonSound}>
            <Text style={styles.playButtonText}>▶</Text>
          </TouchableOpacity>
          <Text style={styles.playButtonLabel}>Escuchar grito</Text>
        </View>

        <View style={styles.hintsContainer}>
          <TouchableOpacity 
            style={[
              styles.hintButton, 
              guesses.length < 2 && styles.disabledHintButton
            ]} 
            onPress={showGeneration}
            disabled={guesses.length < 2}
          >
            <Text style={styles.hintButtonText}>🎮</Text>
            <Text style={styles.hintButtonLabel}>Generación</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.hintButton, 
              guesses.length < 4 && styles.disabledHintButton
            ]} 
            onPress={showDescription}
            disabled={guesses.length < 4}
          >
            <Text style={styles.hintButtonText}>📖</Text>
            <Text style={styles.hintButtonLabel}>Descripción</Text>
          </TouchableOpacity>
        </View>

        {showGenerationHint && (
          <View style={styles.hintDisplay}>
            <Text style={styles.hintTitle}>Generación:</Text>
            <Text style={styles.hintText}>Generación {hiddenPokemon.gen}</Text>
          </View>
        )}

        {showDescriptionHint && (
          <View style={styles.hintDisplay}>
            <Text style={styles.hintTitle}>Descripción de la Pokédex:</Text>
            <Text style={styles.hintText}>{hiddenPokemon.description}</Text>
          </View>
        )}
      </View>

      <ScreamTable
        guesses={guesses}
        maxGuesses={GAME_CONSTANTS.MAX_GUESSES}
      />
    </>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  playButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    paddingVertical: 10,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playButtonText: {
    fontSize: 20,
    color: 'white',
  },
  playButtonLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  hintsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  hintButton: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    minWidth: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  disabledHintButton: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  hintButtonText: {
    fontSize: 20,
    marginBottom: 5,
  },
  hintButtonLabel: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  hintDisplay: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  hintTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  hintText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
