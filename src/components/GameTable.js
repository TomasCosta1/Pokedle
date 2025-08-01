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
    <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContent}>
          <View style={styles.tableHeader}>
            {['Pokémon', 'Tipo 1', 'Tipo 2', 'Hábitat', 'Color', 'Generación', 'Evolución', 'Altura', 'Peso'].map((header, index) => (
              <View key={index} style={styles.headerCell}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
            ))}
          </View>

          {guesses.map((guess, index) => renderGuessRow(guess, index))}
          {Array.from({ length: maxGuesses - guesses.length }).map((_, index) => renderEmptyRow(index))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
  },
  tableContent: {
    paddingHorizontal: 20,
    minWidth: 900,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerCell: {
    width: 100,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 6,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cell: {
    width: 100,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  pokemonSprite: {
    width: 60,
    height: 60,
  },
  emptyCell: {
    backgroundColor: '#fafafa',
  },
  emptyCellText: {
    color: '#bbb',
    fontSize: 18,
  },
});

export default GameTable;