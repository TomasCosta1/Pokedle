import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GameHeader = ({ onResetGame, onGoHome }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onGoHome}>
        <Text style={styles.title}>Pokedle</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.resetButton} onPress={onResetGame}>
        <Text style={styles.resetButtonText}>Nuevo Juego</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GameHeader;
