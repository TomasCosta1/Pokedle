import React from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';

const GuessInput = ({
  currentGuess,
  onInputChange,
  onGuess,
  onSelectSuggestion,
  loading,
  gameWon,
  guesses,
  maxGuesses,
  suggestions,
  showSuggestions,
}) => {
  return (
    <View style={styles.inputSection}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={currentGuess}
            onChangeText={onInputChange}
            placeholder="Ingresa el nombre del Pokémon..."
            onSubmitEditing={onGuess}
            editable={!loading && !gameWon && guesses.length < maxGuesses}
          />
          {showSuggestions && (
            <View style={styles.suggestionsContainer}>
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => onSelectSuggestion(item)}
                  >
                    <Text style={styles.suggestionText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionsList}
                nestedScrollEnabled={true}
              />
            </View>
          )}
        </View>
        <TouchableOpacity 
          style={[styles.guessButton, loading && styles.disabledButton]} 
          onPress={onGuess}
          disabled={loading || gameWon || guesses.length >= maxGuesses}
        >
          <Text style={styles.guessButtonText}>
            {loading ? 'Cargando...' : 'Adivinar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    zIndex: 9999,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
    zIndex: 9999,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 9999,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    maxHeight: 200,
    zIndex: 9999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  guessButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  guessButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default GuessInput; 