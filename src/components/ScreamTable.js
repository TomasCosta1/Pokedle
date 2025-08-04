import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AttributeCell from './AttributeCell';
import { GAME_CONSTANTS } from '../constants/gameConstants';

export const ScreamTable = ({ guesses, maxGuesses }) => {

    const getSpriteBackgroundColor = (comparison) => {
      switch (comparison) {
        case 'green':
          return '#90EE90';
        case 'orange':
          return '#FFB347';
        case 'red':
          return '#FF6B6B';
        default:
          return '#fff';
      }
    };

    const renderGuessRow = (guess, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={[styles.cell, { backgroundColor: getSpriteBackgroundColor(guess.comparisons.name) }]}>
            <Image 
              source={{ uri: guess.sprite }} 
              style={styles.pokemonSprite}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.nameCell, { backgroundColor: getSpriteBackgroundColor(guess.comparisons.name) }]}>
            <Text style={styles.nameCellText}>{guess.name}</Text>
          </View>
        </View>
      );
    
      const renderEmptyRow = (index) => (
        <View key={`empty-${index}`} style={styles.tableRow}>
          <View style={[styles.cell, styles.emptyCell]}>
            <Text style={styles.emptyCellText}>?</Text>
          </View>
          <View style={[styles.nameCell, styles.emptyCell]}>
            <Text style={styles.emptyCellText}>?</Text>
          </View>
        </View>
      );
    
      return (
        <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.tableContent}>
            <View style={styles.tableHeader}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Pokémon</Text>
              </View>
              <View style={styles.headerNameCell}>
                <Text style={styles.headerText}>Nombre</Text>
              </View>
            </View>
  
            {guesses.map((guess, index) => renderGuessRow(guess, index))}
            {Array.from({ length: maxGuesses - guesses.length }).map((_, index) => renderEmptyRow(index))}
          </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      tableContainer: {
        flex: 1,
      },
      tableContent: {
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
      },
      tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        marginBottom: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
        maxWidth: 400,
      },
      headerCell: {
        width: 120,
        paddingVertical: 10,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerNameCell: {
        flex: 1,
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
        width: '100%',
        maxWidth: 400,
      },
      cell: {
        width: 120,
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
      nameCell: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      },
      nameCellText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
      },

    });
