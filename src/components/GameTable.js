import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import AttributeCell from './AttributeCell';
import { GAME_CONSTANTS } from '../constants/gameConstants';

const GameTable = ({ guesses, maxGuesses }) => {
  const renderGuessRow = (guess, index) => (
    <View key={index} style={styles.tableRow}>
      <View style={styles.cell}>
        <Image 
          source={{ uri: guess.sprite }} 
          style={styles.pokemonSprite}
          resizeMode="contain"
        />
      </View>
      <AttributeCell value={guess.type1} comparison={guess.comparisons.type1} />
      <AttributeCell value={guess.type2} comparison={guess.comparisons.type2} />
      <AttributeCell value={guess.habitat} comparison={guess.comparisons.habitat} />
      <AttributeCell value={guess.color} comparison={guess.comparisons.color} />
      <AttributeCell value={guess.gen} comparison={guess.comparisons.gen} isNumeric={true} />
      <AttributeCell value={guess.evoStage} comparison={guess.comparisons.evoStage} isNumeric={true} />
      <AttributeCell value={`${guess.height}m`} comparison={guess.comparisons.height} isNumeric={true} />
      <AttributeCell value={`${guess.weight}kg`} comparison={guess.comparisons.weight} isNumeric={true} />
    </View>
  );

  const renderEmptyRow = (index) => (
    <View key={`empty-${index}`} style={styles.tableRow}>
      {Array.from({ length: 9 }).map((_, cellIndex) => (
        <View key={cellIndex} style={[styles.cell, styles.emptyCell]}>
          <Text style={styles.emptyCellText}>?</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView 
      style={styles.tableContainer} 
      vertical={true} 
      showsVerticalScrollIndicator={true}
      nestedScrollEnabled={true}
    >
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        <View style={styles.tableContent}>
          <View style={styles.tableHeader}>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Pokémon</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Tipo 1</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Tipo 2</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Hábitat</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Color</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Generación</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Evolución</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Altura</Text>
            </View>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Peso</Text>
            </View>
          </View>

          {guesses.map((guess, index) => renderGuessRow(guess, index))}

          {Array.from({ length: maxGuesses - guesses.length }).map((_, index) => 
            renderEmptyRow(index)
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    zIndex: 1,
  },
  tableContent: {
    paddingHorizontal: 20,
    minWidth: 900,
    minHeight: 600,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 10,
  },
  headerCell: {
    width: 100,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#555',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  cell: {
    width: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    minHeight: 20,
  },
  pokemonSprite: {
    width: 80,
    height: 80,
  },
  emptyCell: {
    backgroundColor: '#f0f0f0',
  },
  emptyCellText: {
    color: '#999',
    fontSize: 16,
  },
});

export default GameTable; 