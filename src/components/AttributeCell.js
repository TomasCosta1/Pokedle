import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COMPARISON_COLORS } from '../constants/gameConstants';

const AttributeCell = ({ value, comparison, isNumeric = false }) => {
  let backgroundColor = COMPARISON_COLORS.WHITE;
  let arrow = '';

  switch (comparison) {
    case 'green':
      backgroundColor = COMPARISON_COLORS.GREEN;
      break;
    case 'orange':
      backgroundColor = COMPARISON_COLORS.ORANGE;
      break;
    case 'red':
      backgroundColor = COMPARISON_COLORS.RED;
      break;
    case 'red-up':
      backgroundColor = COMPARISON_COLORS.RED;
      arrow = '↑';
      break;
    case 'red-down':
      backgroundColor = COMPARISON_COLORS.RED;
      arrow = '↓';
      break;
  }

  return (
    <View style={[styles.cell, { backgroundColor }]}>
      <Text style={styles.cellText}>
        {value || 'Ninguno'} <Text style={styles.arrow}>{arrow}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 100,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  cellText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AttributeCell;
